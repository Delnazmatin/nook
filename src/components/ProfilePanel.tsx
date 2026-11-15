"use client";

import type { ReactElement } from "react";
import ProfileDetails from "@/components/ProfileDetails";
import ProfileForm from "@/components/ProfileForm";
import { useProfile } from "@/context/ProfileContext";

export default function ProfilePanel(): ReactElement {
  const { user, isRegistered, isReady } = useProfile();

  if (!isReady) {
    return <div className="min-h-40" aria-hidden />;
  }

  if (user) {
    return <ProfileDetails user={user} />;
  }

  const mode = isRegistered ? "sign-in" : "register";

  return <ProfileForm key={mode} mode={mode} />;
}
