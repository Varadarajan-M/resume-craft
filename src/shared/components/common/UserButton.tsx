"use client";

import { UserButton as UserAvatar, useUser } from "@clerk/nextjs";

const UserButton = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center break-all wrap-break-word">
      <UserAvatar />
      <div className="flex flex-col ml-2">
        <span className="text-xs font-semibold">
          {user?.fullName || user?.firstName || ""}
        </span>
        <span className="text-xs text-muted-foreground">
          {user?.emailAddresses[0]?.emailAddress || ""}
        </span>
      </div>
    </div>
  );
};

export default UserButton;
