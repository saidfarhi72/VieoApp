"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";

import {  CreateCheckListItem } from "./schema";
import { InputType, ReturnType } from "./types";
import { ca } from "date-fns/locale";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, checklistId,boardId } = data;
  let checklistItem;

  try {
    const list = await db.checklist.findUnique({
      where: {
        id: checklistId,
        
      },
    });

    if (!list) {
      return {
        error: " card not found",
      };
    }

 

    checklistItem = await db.checklistItem.create({
      data: {
        title,
        checklistId,
        completed: false,

      },
    });

    await createAuditLog({
      entityId: checklistItem.id,
      entityTitle: checklistItem.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create."
    }
  }

  revalidatePath(`/board/${boardId}`);


  return { data: checklistItem };
};

export const createCheckListItem = createSafeAction(CreateCheckListItem, handler);
