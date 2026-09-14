"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../services/auth";

export default function SignupPage() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const router = useRouter();

  const handleSignup =
    async () => {
      try {
        setLoading(true);

        await signup(
          name,
          email,
          password
        );

        alert(
          "Signup successful. Please log in."
        );

        router.push("/login");

      } catch (error) {
        console.log(error);
        alert(
          "Signup failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-slate-950 p-8 shadow-xl border border-slate-800">
        <h1 className="mb-6 text-3xl font-bold">
          Signup
        </h1>

        <div className="space-y-4">
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            disabled={loading}
            onClick={handleSignup}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing up…" : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}