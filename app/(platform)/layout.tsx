import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProviderTril } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ConvexClientProvider } from "@/providers/convex-client-provider";

const PlatformLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
        {children}
        
    </>
  
      
  );
};

export default PlatformLayout;
