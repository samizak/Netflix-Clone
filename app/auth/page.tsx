"use client";

import { useCallback, useState } from "react";
import Input from "../components/input";
import axios from "axios";
import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Image from "next/image";

export default function Auth() {
  // const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === "login" ? "register" : "login"));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        // redirect: false,
        callbackUrl: "/profiles",
      });

      // router.push("/");
    } catch (error) {
      console.error(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        username,
        email,
        password,
      });

      login();
    } catch (error) {
      console.error(error);
    }
  }, [email, username, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="w-full h-full bg-black md:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="logo" className="w-auto h-12" width="0" height="0" />
        </nav>

        <div className="flex justify-center">
          <div className="self-center w-full px-16 py-16 mt-2 bg-black rounded-md bg-opacity-70 lg:w-2/5 md:max-w-md">
            <h2 className="mb-8 text-4xl font-semibold text-white">{variant === "login" ? "Sign In" : "Register"}</h2>

            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  id="username"
                  type="username"
                  value={username}
                />
              )}

              <Input
                label="Email or phone number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />

              <Input
                label="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>

            <button
              onClick={variant === "login" ? login : register}
              className="w-full py-3 mt-10 text-white transition bg-red-700 rounded-md hover:bg-red-800"
            >
              {variant === "login" ? "Sign in" : "Register"}
            </button>

            <div className="flex flex-row items-center justify-center gap-4 mt-8">
              <div
                onClick={() => {
                  signIn("google", { callbackUrl: "/profiles" });
                }}
                className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80"
              >
                <FcGoogle size={30} />
              </div>

              <div
                onClick={() => {
                  signIn("github", { callbackUrl: "/profiles" });
                }}
                className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80"
              >
                <FaGithub size={30} />
              </div>
            </div>

            {variant === "login" ? (
              <p onClick={toggleVariant} className="mt-12 text-neutral-500">
                New to Netflix?
                <span className="ml-1 text-white hover:cursor-pointer hover:underline">Sign up now.</span>
              </p>
            ) : (
              <p onClick={toggleVariant} className="mt-12 text-neutral-500">
                Already have an account?
                <span className="ml-1 text-white hover:cursor-pointer hover:underline">Log in.</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
