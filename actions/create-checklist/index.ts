"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateCheckList } from "./schema";
import { InputType, ReturnType } from "./types";
import { ca } from "date-fns/locale";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, cardId,boardId } = data;
  let checklist;

  try {
    const list = await db.card.findUnique({
      where: {
        id:  cardId,
        
      },
    });

    if (!list) {
      return {
        error: " card not found",
      };
    }

 

    checklist = await db.checklist.create({
      data: {
        title,
        cardId
      },
    });

    await createAuditLog({
      entityId: checklist.id,
      entityTitle: checklist.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create."
    }
  }

  revalidatePath(`/board/${boardId}`);


  return { data: checklist };
};

export const createCheckList = createSafeAction(CreateCheckList, handler);
