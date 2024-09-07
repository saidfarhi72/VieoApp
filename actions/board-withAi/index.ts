"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateBoardWithAi } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { 
  incrementAvailableCount, 
  hasAvailableCount
} from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { getObjectCreation } from "@/lib/ai";
import { getGroqChatCompletion } from "@/lib/groqAi";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  
  const canCreate = await hasAvailableCount();
  const isPro = await checkSubscription();
  
  if (!canCreate && !isPro) {
    return {
      error: "You have reached your limit of free boards. Please upgrade to create more."
    }
  }
  
  const { prompt, image } = data;
  
  //const projectData = await getObjectCreation(prompt);
  const projectData =  await getGroqChatCompletion(prompt);

  const [
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName
  ] = image.split("|");

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
    return {
      error: "Missing fields. Failed to create board."
    };
  }

  const { board } = projectData;
  if(!board) {
    return {
      error: "Failed to create board."
    };
  }

  // Create the board
  const createdBoard = await db.board.create({
    data: {
      orgId: orgId,
      title: board.title,
      imageId, // Assuming these fields are not provided in the JSON
      imageThumbUrl,
      imageFullUrl,
      imageUserName,
      imageLinkHTML,
    },
  });
  if (!isPro) {
    await incrementAvailableCount();
   }
  for (const list of board.lists) {
    // Create each list
    const lastList = await db.list.findFirst({
      where: { boardId: createdBoard.id },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;
    const createdList = await db.list.create({
      data: {
        title: list.title,
        order: newOrder,
        boardId: createdBoard.id,
      },
    });

    for (const card of list.cards) {
      const lastCard = await db.card.findFirst({
        where: { listId: createdList.id},
        orderBy: { order: "desc" },
        select: { order: true },
      });
  
      const newOrderCard = lastCard ? lastCard.order + 1 : 1;
      // Create each card
      const createdCard = await db.card.create({
        data: {
          title: card.title,
          order: newOrderCard,
          description: card.description,
          listId: createdList.id,
        },
      });

      // Create attachments for the card
      

      // Create labels for the card
      if (card.labels) {
        for (const label of card.labels) {
          await db.label.create({
            data: {
              name: label.name,
              color: label.color,
              cardId: createdCard.id,
            },
          });
        }
      }

      // Create checklists for the card
      if (card.checklists) {
        for (const checklist of card.checklists) {
          const createdChecklist = await db.checklist.create({
            data: {
              title: checklist.title,
              cardId: createdCard.id,
            },
          });

          // Create checklist items
          for (const item of checklist.items) {
            await db.checklistItem.create({
              data: {
                title: item.title,
                completed: item.completed,
                checklistId: createdChecklist.id,
              },
            });
          }
        }
      }
    }
  }

  


  revalidatePath(`/board/${createdBoard.id}`);
  return { data: createdBoard };
};

export const createBoardWithAi = createSafeAction(CreateBoardWithAi, handler);
