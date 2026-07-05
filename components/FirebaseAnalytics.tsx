"use client";

import { useEffect } from "react";

export default function FirebaseAnalytics() {
  useEffect(() => {
    import("@/lib/firebase");
  }, []);

  return null;
}
