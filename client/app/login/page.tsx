"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../services/auth";

export default function LoginPage() {

  const [email, setEmail] =
    useState("");
  const [password,
    setPassword] =
    useState("");
  const [loading,
    setLoading] =
    useState(false);

  const router = useRouter();

  const handleLogin =
    async () => {
      try {
        setLoading(true);

        const data =
          await login(
            email,
            password
          );

        localStorage.setItem(
          "token",
          data.token
        );

        router.push("/dashboard");
      } catch (error) {
        console.log(error);
        alert(
          "Login failed. Check your credentials."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-slate-950 p-8 shadow-xl border border-slate-800">
        <h1 className="mb-6 text-3xl font-bold">
          Login
        </h1>

        <div className="space-y-4">
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
            onClick={handleLogin}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}