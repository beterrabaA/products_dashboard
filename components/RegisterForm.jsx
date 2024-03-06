"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(process.env.NEXT_PUBLIC_API_URL + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => router.push("/"))
      .catch((err) => setError("Error Registering"));
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name-input"
            className="input-login"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email-input"
            className="input-login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          <input
            type="password"
            name="pass-input"
            className="input-login"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Password"
          />

          <button
            className="bg-green-600 cursor-pointer text-white font-bold px-6 py-2"
            type="submit"
          >
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};
