"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/auth";
import { Session } from "@/lib/types";

const ProfilePage = () => {
  const [name, setName] = useState("Takeshita");

  const [userInfo, setUserInfo] = useState<Session | null>(null);

  const { changeAvatar, changeName, changePassword, getUserData } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      console.log("Fetched user data:", data);
      setUserInfo(data as Session);
      setName(data?.username as string);
    };
    fetchUserData();
  }, []);

  const [avatarPreview, setAvatarPreview] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");


  const handleAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    changeAvatar(file);

    const imageUrl = URL.createObjectURL(file);

    setAvatarPreview(imageUrl);
  };

  const handleProfileUpdate = () => {
    console.log("Update Name:", name);
    changeName(name);

    // API call here
  };

  const handlePasswordUpdate = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }



    console.log({
      currentPassword,
      newPassword,
    });
    changePassword(currentPassword, newPassword);
    // API call here
  };

  return (
    <div
      className="
        min-h-screen
        bg-gray-50
        flex
        items-center
        justify-center
        px-4
        py-10
      "
    >
      <Card className="w-full max-w-2xl rounded-3xl shadow-xl border-0">

        <CardHeader className="space-y-2">

          <CardTitle className="text-3xl font-bold">
            Profile Settings
          </CardTitle>

          <CardDescription>
            Manage your profile information and security settings.
          </CardDescription>

        </CardHeader>

        <CardContent className="space-y-8">

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-5">

            <Avatar className="w-40 h-40 border-4 border-white shadow-lg">

              <AvatarImage src={avatarPreview ? avatarPreview : userInfo?.avatar as string} />

              <AvatarFallback>
                TK
              </AvatarFallback>

            </Avatar>

            <div className="space-y-2 text-center">

              <Label htmlFor="avatar">
                Change Avatar
              </Label>

              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="max-w-xs cursor-pointer"
              />

            </div>

          </div>

          <Separator />

          {/* Name Section */}
          <div className="space-y-4">

            <div className="space-y-2">

              <Label htmlFor="name">
                Name
              </Label>

              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />

            </div>

            <Button
              onClick={handleProfileUpdate}
              className="h-12 px-6 rounded-xl bg-gradient-to-r w-full from-purple-600 to-indigo-500 text-white text-sm font-medium shadow-md hover:opacity-95 transition"
            >
              Save Profile
            </Button>

          </div>

          <Separator />

          {/* Password Section */}
          <div className="space-y-4">

            <h3 className="text-lg font-semibold">
              Change Password
            </h3>

            <div className="space-y-2">

              <Label htmlFor="currentPassword">
                Current Password
              </Label>

              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                placeholder="Enter current password"
              />

            </div>

            <div className="space-y-2">

              <Label htmlFor="newPassword">
                New Password
              </Label>

              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
              />

            </div>

            <div className="space-y-2">

              <Label htmlFor="confirmPassword">
                Confirm Password
              </Label>

              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
              />

            </div>

            <Button
              onClick={handlePasswordUpdate}
              className="w-full h-12 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-sm font-medium shadow-md hover:opacity-95 transition"
            >
              Update Password
            </Button>

          </div>

        </CardContent>

      </Card>
    </div>
  );
};

export default ProfilePage;