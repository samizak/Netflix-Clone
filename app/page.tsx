"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  return (
    <main>
      <h1 className="text-white">Netflix Clone</h1>
      <p className="text-white">Logged in as: {session?.user?.name}</p>
      <button className="w-full h-10 bg-white" onClick={() => signOut()}>
        Logout
      </button>
    </main>
  );
}
