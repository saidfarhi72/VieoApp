"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdatechecklistItem } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { completed, id,boardId } = data;
  let checklistItem;

  try {
    checklistItem = await db.checklistItem.update({
      where: {
        id,
      },
      data: {
        completed,
      },
    });

    await createAuditLog({
      entityTitle: checklistItem.title,
      entityId: checklistItem.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
    })
  } catch (error) {
    return {
      error: "Failed to update."
    }
  }

  revalidatePath(`/board/${id}`);
  return { data: checklistItem };
};

export const updatechecklistItem = createSafeAction(UpdatechecklistItem, handler);
