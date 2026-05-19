"use client";

import { useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/auth";
import { User } from "@/lib/types";
import { Eye } from "lucide-react";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPaasword] = useState("");

  const { createNewAccount } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Check the password again!");
      return;
    }

    const data = {
      username,
      email,
      password,
    } as User;

    createNewAccount(data);
  };

  return (
    <div className="min-h-screen bg-[#f7f7fb] flex items-center justify-center px-4 py-10">

      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm px-7 py-8">

        {/* Background Circle */}
        <div className="absolute -right-20 top-32 w-56 h-56 rounded-full bg-purple-100/40" />

        {/* Logo */}
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-[#1f1f1f]">
            Blogy<span className="text-purple-600">.</span>
          </h1>
        </div>

        {/* Heading */}
        <div className="relative z-10 mt-8">
          <h2 className="text-4xl font-bold tracking-tight text-[#1f1f1f] leading-tight">
            Create your account
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Join us and start sharing your stories
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 mt-10 space-y-5"
        >

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-[#1f1f1f] mb-2">
              Full name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              onChange={(e) => setUsername(e.target.value)}
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
            <label className="block text-sm font-semibold text-[#1f1f1f] mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type="password"
                placeholder="Create a password"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-[#1f1f1f] mb-2">
              Confirm password
            </label>

            <div className="relative">

              <input
                type="password"
                placeholder="Confirm your password"
                onChange={(e) => setConfirmPaasword(e.target.value)}
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

          {/* Submit */}
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
            Sign Up
          </button>

        </form>

        {/* Footer */}
        <p className="relative z-10 mt-7 text-center text-sm text-gray-500">
          Already have an account?

          <Link
            href="/signin"
            className="ml-1 font-semibold text-purple-600 hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>

    </div>
  );
};

export default SignUpPage;