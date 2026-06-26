"use client";

import { useEffect, useState } from "react";

/** True after mount — defer localStorage reads until then to match SSR HTML. */
export function useClientReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}
