import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

const DAY_IN_MS = 86_400_000;

export async function GET(
  req: Request,

) {
  try {
    const {  orgId } = auth();

    if (!orgId) {
        throw new Error("Unauthorized");
    }
    
      const orgSubscription = await db.orgSubscription.findUnique({
        where: {
          orgId,
        },
        select: {
          stripeSubscriptionId: true,
          stripeCurrentPeriodEnd: true,
          stripeCustomerId: true,
          stripePriceId: true,
        },
      });
    
      if (!orgSubscription) {
        return NextResponse.json({ valid: false});
      }
    
      const isValid =
        orgSubscription.stripePriceId &&
        orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()
        


    return NextResponse.json({ valid:!!isValid });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}