"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

const COUNT_EVENT = "banana-hacks-registration-count";

export function publishRegistrationCount(count: number) {
  window.dispatchEvent(new CustomEvent<number>(COUNT_EVENT, { detail: count }));
}

export function useRegistrationCount() {
  const [registrationCount, setRegistrationCount] = useState<number>(
    siteConfig.registrationCount,
  );

  useEffect(() => {
    let active = true;

    fetch("/api/registrations/count", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        const result = data as { count?: unknown };
        if (active && typeof result.count === "number") {
          setRegistrationCount(result.count);
        }
      })
      .catch(() => undefined);

    const update = (event: Event) => {
      const next = (event as CustomEvent<number>).detail;
      if (typeof next === "number") setRegistrationCount(next);
    };

    window.addEventListener(COUNT_EVENT, update);
    return () => {
      active = false;
      window.removeEventListener(COUNT_EVENT, update);
    };
  }, []);

  return registrationCount;
}
