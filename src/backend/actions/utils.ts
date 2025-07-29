import { auth } from "@clerk/nextjs/server";

export const verifyAuth = async () => {
  const user = await auth();

  if (!user) {
    throw new Error("User not authenticated");
  }

  return user?.userId;
};
