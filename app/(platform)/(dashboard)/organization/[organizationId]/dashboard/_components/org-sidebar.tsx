"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { LayoutDashboard, Star } from "lucide-react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const router = usePathname();

 console.log(router.split("/")[2]);

  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 mr-5">
      
      
      <div className="space-y-1 w-full">
        <Button
          variant={favorites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link href={"/organization/"+router.split("/")[2]+"/dashboard"}>
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team boards
          </Link>
        </Button>
        <Button
          variant={favorites ? "secondary" : "ghost"}
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link href={{
            pathname: "",
            query: { favorites: true }
          }}>
            <Star className="h-4 w-4 mr-2" />
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  );
};
