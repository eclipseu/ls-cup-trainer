"use client";

import { login, signup } from "./actions";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  HiEye,
  HiEyeOff,
  HiArrowRight,
  HiMail,
  HiLockClosed,
} from "react-icons/hi";

function LoginInner() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupInstructions, setShowSignupInstructions] = useState(false);

  const isError =
    message &&
    (message.toLowerCase().includes("could not") ||
      message.toLowerCase().includes("invalid") ||
      message.toLowerCase().includes("password") ||
      message.toLowerCase().includes("registered"));

  const signupSteps = [
    {
      step: 1,
      title: "Enter Details",
      description: "Fill in your email and create a secure password",
      icon: "📝",
    },
    {
      step: 2,
      title: "Sign Up",
      description: "Click the Sign Up button to create your account",
      icon: "✍️",
    },
    {
      step: 3,
      title: "Confirm Email",
      description: "Check your email and click the confirmation link",
      icon: "📧",
    },
    {
      step: 4,
      title: "Login",
      description: "Return here and sign in with your credentials",
      icon: "🔐",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Desktop Layout */}
      <div className="hidden md:flex justify-center items-center min-h-screen pt-16">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">
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
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 placeholder-gray-400 text-gray-900 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
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
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-10 py-2 placeholder-gray-400 text-gray-900 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <HiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <HiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Password must be at least 6 characters long.
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                formAction={login}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Sign In
              </button>
              <button
                formAction={signup}
                className="w-full px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Sign Up Instructions Toggle */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowSignupInstructions(!showSignupInstructions)}
              className="w-full text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center justify-center space-x-1"
            >
              <span>New to LS-Cup Trainer?</span>
              <HiArrowRight
                className={`h-4 w-4 transition-transform ${
                  showSignupInstructions ? "rotate-90" : ""
                }`}
              />
            </button>

            {showSignupInstructions && (
              <div className="mt-4 space-y-3 animate-fadeInUp">
                <h3 className="text-sm font-semibold text-gray-800 text-center">
                  How to get started:
                </h3>
                <div className="space-y-2">
                  {signupSteps.map((step) => (
                    <div
                      key={step.step}
                      className="flex items-start space-x-3 p-2 rounded-lg bg-gray-50"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-xs font-semibold text-red-600">
                        {step.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{step.icon}</span>
                          <p className="text-sm font-medium text-gray-800">
                            {step.title}
                          </p>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-6 text-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold">LS-Cup Trainer</h1>
            <p className="text-sm text-red-100 mt-1">
              Leadership Training Platform
            </p>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 px-4 py-6">
          <div className="max-w-sm mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Sign in to continue your training
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

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="mobile-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="mobile-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 placeholder-gray-400 text-gray-900 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="mobile-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiLockClosed className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="mobile-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10 pr-10 py-3 placeholder-gray-400 text-gray-900 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <HiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <HiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 6 characters long.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  formAction={login}
                  className="w-full px-4 py-3 text-base font-medium text-white bg-red-600 border border-transparent rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Sign In
                </button>
                <button
                  formAction={signup}
                  className="w-full px-4 py-3 text-base font-medium text-red-700 bg-red-100 border border-transparent rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </form>

            {/* Mobile Sign Up Instructions */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() =>
                  setShowSignupInstructions(!showSignupInstructions)
                }
                className="w-full text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center justify-center space-x-1 py-2"
              >
                <span>New to LS-Cup Trainer?</span>
                <HiArrowRight
                  className={`h-4 w-4 transition-transform ${
                    showSignupInstructions ? "rotate-90" : ""
                  }`}
                />
              </button>

              {showSignupInstructions && (
                <div className="mt-4 space-y-3 animate-fadeInUp">
                  <h3 className="text-sm font-semibold text-gray-800 text-center">
                    How to get started:
                  </h3>
                  <div className="space-y-3">
                    {signupSteps.map((step) => (
                      <div
                        key={step.step}
                        className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-sm font-semibold text-red-600">
                          {step.step}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{step.icon}</span>
                            <p className="text-sm font-medium text-gray-800">
                              {step.title}
                            </p>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
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
