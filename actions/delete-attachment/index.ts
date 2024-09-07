"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import {  DeleteAttachment } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { deleteObject } from "@/lib/r2";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  let attachment;

  try {
    attachment = await db.attachment.delete({
      where: {
        id,
        
      },
    });

    await deleteObject(attachment.name)


    await createAuditLog({
      entityTitle: attachment.name,
      entityId: attachment.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.DELETE,
    })
  } catch (error) {
    return {
      error: "Failed to delete."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return { data: attachment };
};

export const deleteAttachment = createSafeAction(DeleteAttachment, handler);
