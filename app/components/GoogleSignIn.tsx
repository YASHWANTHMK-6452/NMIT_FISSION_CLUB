"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function GoogleSignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <button className="google-signin">
        Loading...
      </button>
    );
  }

  if (session?.user) {
    return (
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="google-signin"
      >
        {session.user.name || "Account"} · Sign out
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="google-signin"
    >
      Continue with Google
    </button>
  );
}