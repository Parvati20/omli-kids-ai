"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SpeechComponent from "@/components/SpeechComponent";
import { signOut, useSession } from "next-auth/react";

export default function ToolPage() {
  if (typeof window === "undefined") {
    return null;
  }

  const router = useRouter();
  const { data: session, status } = useSession();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [logoutCount, setLogoutCount] = useState(0);

  useLayoutEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      setAuthorized(false);
      return;
    }
    if (status === "authenticated") {
      setAuthorized(true);
    }
  }, [router, status]);

  useEffect(() => {
    if (logoutCount === 0) return;
    signOut({ callbackUrl: "/login" });
  }, [logoutCount, router]);

  if (authorized !== true) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <SpeechComponent isAuthorized={authorized === true} onLogout={() => setLogoutCount((count) => count + 1)} />
    </div>
  );
}
