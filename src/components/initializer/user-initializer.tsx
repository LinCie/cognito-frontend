"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/api/services/profile.service";
import { useUserStore } from "@/providers/user.provider";

export default function UserInitializer() {
  const router = useRouter();
  const { updateUser, updateProfile, updateInitialized } = useUserStore(
    (state) => state,
  );

  useEffect(() => {
    async function fetchProfile() {
      const response = await getMe();
      if (!response.ok) {
        return router.push("/onboarding");
      }

      const me = await response.json();
      updateUser(me.user);
      updateProfile(me.profile);
      updateInitialized(true);
    }

    fetchProfile();
  }, [router, updateProfile, updateUser, updateInitialized]);

  return <></>;
}
