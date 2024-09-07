"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { ca } from "date-fns/locale";
import { CreateAttachement } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { name, url, cardId,boardId } = data;
  let attachment;

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

 

    attachment = await db.attachment.create({
      data: {
        url,
        cardId,
        name,
      },
    });

    await createAuditLog({
      entityId: attachment.id,
      entityTitle: attachment.name,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create."
    }
  }

  revalidatePath(`/board/${boardId}`);


  return { data: attachment };
};

export const createAttachement = createSafeAction(CreateAttachement, handler);
