import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,

) {
  try {
    const {  orgId } = auth();

    console.log("orgId",)
 

    if (!orgId) {
      throw new Error("Unauthorized");
      }
    
      const orgLimit = await db.orgLimit.findUnique({
        where: { orgId }
      });
    
      if (!orgLimit) {
        return NextResponse.json({ count: 0 });
      }

    


    return NextResponse.json({ count: orgLimit?.WhiteBoardcount ?? 0 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}