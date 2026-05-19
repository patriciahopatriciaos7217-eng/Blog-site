"use client";

import Link from "next/link";

import { Search, PenSquare } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearSession } from "@/lib/auth";
import { useRouter } from "next/navigation";

type Props = {
  user: {
    name: string;
    avatar: string;
  };
};

const HeaderClient = ({ user }: Props) => {
  const router = useRouter();
  const handleLogout = async () => {
    await clearSession()
    router.push("/signin");
    router.refresh();
    console.log("logout");

    // logout logic
  };

  return (
    <header className="w-full border-b bg-white">

      <div
        className="
          max-w-7xl
          mx-auto
          h-16
          px-6
          flex
          items-center
          justify-between
        "
      >

        {/* LEFT */}
        <div className="flex items-center gap-10">

          <Link
            href="/dashboard"
            className="
              text-3xl
              font-black
              tracking-tight
              text-[#1d1d35]
            "
          >
            ✒ Blogly.
          </Link>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <DropdownMenu>

            <DropdownMenuTrigger asChild>

              <button className="rounded-full outline-none">

                <Avatar className="w-11 h-11">

                  <AvatarImage src={user.avatar} />

                  <AvatarFallback>
                    {user.name.slice(0, 2)}
                  </AvatarFallback>

                </Avatar>

              </button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

              <div className="px-2 py-2">

                <p className="text-sm font-semibold">
                  {user.name}
                </p>

              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>

                <Link href="/profile">
                  Profile
                </Link>

              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="
                  text-red-500
                  focus:text-red-500
                "
              >
                Logout
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

        </div>

      </div>

    </header>
  );
};

export default HeaderClient;