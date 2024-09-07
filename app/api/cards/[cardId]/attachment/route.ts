import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

  

    const card = await db.card.findUnique({
        where: { id: params.cardId },
        include: {
            attachments: {
              select: {
                name: true,
                id: true,
                url: true,
              },
            },
          } ,
      });
    
    

    console.log(card)


    return NextResponse.json(card?.attachments ?? []);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}