"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

interface AuthGuardProps {
  signedInContent: React.ReactNode;
  signedOutContent: React.ReactNode;
}
const AuthGuard = ({ signedInContent, signedOutContent }: AuthGuardProps) => {
  return (
    <>
      <SignedOut>
        <SignInButton forceRedirectUrl="/" mode="modal">
          {signedOutContent}
        </SignInButton>
      </SignedOut>
      <SignedIn>{signedInContent}</SignedIn>
    </>
  );
};

export default AuthGuard;
