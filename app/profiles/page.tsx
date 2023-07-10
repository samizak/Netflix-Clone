"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

export default function Profiles() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col">
        <h1 className="text-3xl text-center text-white md:text-6xl">Who is watching?</h1>

        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => router.push("/")}>
            <div className="flex-row mx-auto group w-44">
              <div className="flex items-center justify-center overflow-hidden border-transparent rounded-md w-44 h-44 borer-2 group-hover:cursor-pointer group-hover:border-white">
                <Image src="/images/default-blue.png" alt="Profile" width="100" height="100" />
              </div>

              <div className="mt-4 text-2xl text-center text-gray-400 group-hover:text-white">
                {session?.user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
