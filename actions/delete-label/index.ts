"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import {  DeleteLabel } from "./schema";
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

  const { id, boardId } = data;
  let label;

  try {
    label = await db.label.delete({
      where: {
        id,
        
      },
    });

    await createAuditLog({
      entityTitle: label.name,
      entityId: label.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.DELETE,
    })
  } catch (error) {
    return {
      error: "Failed to delete."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return { data: label };
};

export const deleteLabel = createSafeAction(DeleteLabel, handler);
