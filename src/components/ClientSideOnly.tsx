"use client";

import { useEffect, useState } from "react";

export function ClientSideOnly({ children }: any) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? children : null;
}
