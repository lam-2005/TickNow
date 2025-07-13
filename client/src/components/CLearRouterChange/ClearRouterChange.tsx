"use client";

import { clearTicket } from "@/utils/saveTicket";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ClearTicketOnRouteChange = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/checkout" && !pathname.startsWith("/detail")) {
      clearTicket();
    }
  }, [pathname]);

  return null;
};

export default ClearTicketOnRouteChange;
