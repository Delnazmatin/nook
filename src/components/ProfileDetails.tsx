"use client";

import type { ReactElement } from "react";
import { useProfile, type ProfileUser } from "@/context/ProfileContext";

type ProfileDetailsProps = {
  user: ProfileUser;
};

type DetailRow = {
  label: string;
  value: string;
  muted?: boolean;
};

export default function ProfileDetails({
  user,
}: ProfileDetailsProps): ReactElement {
  const { signOut } = useProfile();

  const rows: DetailRow[] = [
    { label: "First name", value: user.firstName },
    { label: "Last name", value: user.lastName },
    { label: "Email", value: user.email },
    { label: "Phone number", value: user.phone },
    { label: "Password", value: "Not shown", muted: true },
  ];

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
        Welcome back, {user.firstName}
      </h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        These are the details saved in this browser.
      </p>

      <dl className="divide-y divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr] sm:items-center sm:gap-4"
          >
            <dt className="text-sm text-zinc-500">{row.label}</dt>
            <dd
              className={
                row.muted
                  ? "text-sm text-zinc-500"
                  : "text-sm font-medium text-zinc-950"
              }
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={signOut}
        className="mt-8 inline-flex items-center justify-center self-start border border-zinc-950 px-8 py-3 text-sm font-medium tracking-wide text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
      >
        Sign out
      </button>
    </div>
  );
}
