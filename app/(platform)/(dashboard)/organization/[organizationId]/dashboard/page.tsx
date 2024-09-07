"use client";

import { useOrganization } from "@clerk/nextjs";

import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
};

interface Count {
  count: number;

}

const DashboardPage = ({
  searchParams,
}: DashboardPageProps) => {
  const { organization } = useOrganization();




  return ( 
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        'loading...'
      ) : (
        <BoardList
          orgId={organization.id}
          query={searchParams}
        />
      )}
    </div>
   );
};
 
export default DashboardPage;