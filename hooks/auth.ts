"use client";

import { getSession } from "@/lib/auth";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useAuth = () => {
  const router = useRouter();
  const [userData, setUserData] = useState();


  const createNewAccount = async (userInfo: User) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error || "Sign up failed.");
        return;
      }

      console.log("Account created:", data);

      router.push("/signin");
      router.refresh();

    } catch (err: unknown) {
      console.error("Signup error:", err);

      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Something went wrong.");
      }
    }
  };

  const login = async (userInfo: { email: string; password: string }) => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(userInfo)
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        return;
      }

      console.log(data.success)
      router.push("/blogList");
      router.refresh();
    } catch (error) {
      console.error("Signin error:", error);

      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Something went wrong.");
      }

    }
  }

  const getUserData = async () => {
    try {
      const session = await getSession();
      console.log(session);

      return session;
    } catch (error) {
      console.error("Auth error:", error);

      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Something went wrong.");
      }
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const response = await fetch("/api/auth/profile/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error || "Failed to change password.");
        return;
      }

      console.log("Password changed successfully:", data);
    } catch (error) {
      console.error("Change password error:", error);

      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Something went wrong.");
      }
    }
  };

  const changeAvatar = async (avatarFile: File) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const response = await fetch("/api/auth/profile/avatar", {
        method: "PUT",
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error || "Failed to change avatar.");
        return;
      }

      console.log("Avatar changed successfully:", data);
    } catch (error) {
      console.error("Change avatar error:", error);

      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Something went wrong.");
      }
    }
  };
  const changeName = async (name: string) => {
    try {
      const response = await fetch("/api/auth/profile/name", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error || "Failed to change profile.");
        return;
      }

      console.log("Profile changed successfully:", data);
    } catch (error) {
      console.error("Change profile error:", error);

      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Something went wrong.");
      }
    }
  };

  return {
    createNewAccount,
    login,
    getUserData,
    changePassword,
    changeAvatar,
    changeName,
    userData,
  };
};

export default useAuth;