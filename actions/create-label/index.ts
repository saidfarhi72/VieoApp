"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateLabel } from "./schema";
import { InputType, ReturnType } from "./types";
import { ca } from "date-fns/locale";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { name, color, cardId,boardId } = data;
  let label;

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

 

    label = await db.label.create({
      data: {
        color,
        cardId,
        name,
      },
    });

    await createAuditLog({
      entityId: label.id,
      entityTitle: label.name,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create."
    }
  }

  revalidatePath(`/board/${boardId}`);


  return { data: label };
};

export const createLabel = createSafeAction(CreateLabel, handler);
