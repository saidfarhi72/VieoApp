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

    const card = await db.board.findMany({
      where: {
        orgId: orgId,
    },
    include: {
        lists:{
            include:{
                cards:{
                  
                  
                   

                }
            }
        }
    }
    

});

let modifiedResponse:any[] = [];

card.forEach((board) => {
  board.lists.forEach((list) => {
    list.cards.forEach((card) => {
      modifiedResponse.push({
        title: card.title+'/'+list.title,
        end: card.endDate, 
        start: card.createdAt
      });
    });
  });
});



console.log("cardcardcardcardcardcard",modifiedResponse)

    return NextResponse.json(modifiedResponse);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}