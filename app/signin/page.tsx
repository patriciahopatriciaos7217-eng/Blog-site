"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import useAuth from "@/hooks/auth";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#f7f7fb] flex items-center justify-center px-4 py-10">

      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm px-7 py-8">

        {/* Background Circle */}
        <div className="absolute -right-20 top-28 w-56 h-56 rounded-full bg-purple-100/40" />

        <div className="absolute -left-24 bottom-[-90px] w-72 h-40 rounded-full bg-yellow-50/70" />

        {/* Logo */}
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-[#1f1f1f]">
            Blogy<span className="text-purple-600">.</span>
          </h1>
        </div>

        {/* Heading */}
        <div className="relative z-10 mt-8">
          <h2 className="text-4xl font-bold tracking-tight text-[#1f1f1f]">
            Welcome back
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Sign in to continue to your account
          </p>
        </div>

        {/* Form */}
        <form className="relative z-10 mt-10 space-y-5" onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#1f1f1f] mb-2">
              Email address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                h-12
                rounded-lg
                border
                border-gray-200
                bg-white
                px-4
                text-sm
                outline-none
                transition
                focus:border-purple-500
                focus:ring-4
                focus:ring-purple-100
              "
            />
          </div>

          {/* Password */}
          <div>

            <div className="flex items-center justify-between mb-2">

              <label className="text-sm font-semibold text-[#1f1f1f]">
                Password
              </label>

              <button
                type="button"
                className="text-xs font-medium text-purple-600 hover:underline"
              >
                Forgot password?
              </button>

            </div>

            <div className="relative">

              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full
                  h-12
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-4
                  pr-11
                  text-sm
                  outline-none
                  transition
                  focus:border-purple-500
                  focus:ring-4
                  focus:ring-purple-100
                "
              />

              <Eye
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

            </div>

          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full
              h-12
              rounded-lg
              bg-gradient-to-r
              from-purple-600
              to-indigo-500
              text-white
              text-sm
              font-medium
              shadow-md
              hover:opacity-95
              transition
              cursor-pointer
            "
          >
            Sign In
          </button>

        </form>

        {/* Footer */}
        <p className="relative z-10 mt-7 text-center text-sm text-gray-500">
          Don&apos;t have an account?

          <Link
            href="/signup"
            className="ml-1 font-semibold text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>

    </div>
  );
};

export default SignInPage;