import { User } from "@/lib/types";

export const checkEmail = (user: User) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return {
    name: "email",
    isValid: emailRegex.test(user.email),
  };
};

export const checkRequiredFields = (user: User) => {
  for (const key in user) {
    const value = user[key as keyof User];

    if (!value) {
      return {
        field: key,
        isValid: false,
      };
    }
  }

  return {
    isValid: true,
  };
};