"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response.error) {
        setError("Invalid credentials");
        return;
      }

      router.replace("dashboad");
    } catch (error) {}
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            name="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id=""
            required
            placeholder="Email"
          />
          <input
            name="pass-input"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            type="password"
            value={password}
          />

          <button
            className="bg-green-600 cursor-pointer text-white font-bold px-6 py-2"
            disabled
            type="submit"
          >
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {erro}
            </div>
          )}
          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don&apos;t have an account?{" "}
            <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};
