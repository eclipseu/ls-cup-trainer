"use client";

import { login, signup } from "./actions";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginInner() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const isError =
    message &&
    (message.toLowerCase().includes("could not") ||
      message.toLowerCase().includes("invalid") ||
      message.toLowerCase().includes("password") ||
      message.toLowerCase().includes("registered"));

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">LS-Cup Trainer</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in or create your account
          </p>
        </div>

        {message && (
          <div
            className={`p-4 text-center text-sm font-medium rounded-lg border ${
              isError
                ? "text-red-800 bg-red-100 border-red-200"
                : "text-green-800 bg-green-100 border-green-200"
            }`}
          >
            {message}
          </div>
        )}

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-3 py-2 placeholder-gray-400 text-gray-900 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full px-3 py-2 placeholder-gray-400 text-gray-900 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Password must be at least 6 characters long.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              formAction={login}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign In
            </button>
            <button
              formAction={signup}
              className="w-full px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
}
