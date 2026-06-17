"use client";

import { useState, useEffect } from "react";

/**
 * Returns true on phone-sized viewports. SSR-safe: starts false on the server
 * and the first client render, then updates after mount via matchMedia.
 */
export function useIsMobile(query = "(max-width: 768px)") {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return isMobile;
}
