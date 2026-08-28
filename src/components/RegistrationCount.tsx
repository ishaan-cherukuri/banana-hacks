"use client";

import { useRegistrationCount } from "@/lib/useRegistrationCount";

export default function RegistrationCount() {
  return <>{useRegistrationCount()}</>;
}
