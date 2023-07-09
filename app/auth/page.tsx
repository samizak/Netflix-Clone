"use client";

import { useCallback, useState } from "react";
import Input from "../components/input";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === "login" ? "register" : "login"));
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="w-full h-full bg-black md:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="./images/logo.png" alt="logo" className="h-12" />
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

            <button className="w-full py-3 mt-10 text-white transition bg-red-700 rounded-md hover:bg-red-800">
              {variant === "register" ? "Sign in" : "Register"}
            </button>

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
