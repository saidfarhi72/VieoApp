"use client";

import { Plus, Users } from "lucide-react";
import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { FormPopover } from "@/components/form/form-popover";

import { MobileSidebar } from "./mobile-sidebar";
import { UserAvatar } from "@/app/whiteboard/[boardId]/_components/user-avatar";
import { connectionIdToColor } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
const MAX_SHOWN_USERS = 50;

export const Navbar = () => {
  const pathname = usePathname();

  const { memberships } = useOrganization({
    memberships: {
      infinite: true, // Append new data to the existing list
      keepPreviousData: true, // Persist the cached data until the new data has been fetched
    },
  });
  console.log(memberships);
  if (!memberships) {
    return null;
  }
  const hasMoreUsers = memberships.data?.length ?? 0 > MAX_SHOWN_USERS;

  console.log('memberships',memberships.data)
  const cuurenPath = pathname.split("/")[1];
  console.log(pathname);

  return (
    <nav className="fixed px-8 z-50 top-0  w-full h-16 border-b shadow-sm bg-white flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>

        <FormPopover>
          <Button
            variant="primary"
            size="sm"
            className="rounded-sm block md:hidden"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        {cuurenPath !== "board" ? (
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                },
                organizationSwitcherTrigger: {
                  padding: "6px",
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                },
              },
            }}
          />
        ) : ''}

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};
