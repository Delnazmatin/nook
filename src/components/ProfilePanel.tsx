"use client";

import type { ReactElement } from "react";
import ProfileDetails from "@/components/ProfileDetails";
import ProfileForm from "@/components/ProfileForm";
import { useProfile } from "@/context/ProfileContext";

export default function ProfilePanel(): ReactElement {
  const { user, isRegistered, isReady } = useProfile();

  if (!isReady) {
    return (
      <div className="flex min-h-40 items-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Loading your account…
        </p>
      </div>
    );
  }

  if (user) {
    return <ProfileDetails user={user} />;
  }

  // Signing out keeps the saved accounts, so the page reopens on sign-in; the
  // form itself can switch to registration from there.
  const mode = isRegistered ? "sign-in" : "register";

  return <ProfileForm key={mode} initialMode={mode} />;
}
