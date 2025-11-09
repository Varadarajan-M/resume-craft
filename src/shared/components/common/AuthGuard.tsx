"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

interface AuthGuardProps {
  signedInContent: React.ReactNode;
  signedOutContent: React.ReactNode;
  redirectUrl?: string;
}
const AuthGuard = ({ signedInContent, signedOutContent, redirectUrl="/" }: AuthGuardProps) => {
  return (
    <>
      <SignedOut>
        <SignInButton oauthFlow="popup" forceRedirectUrl={redirectUrl} mode="modal" >
          {signedOutContent}
        </SignInButton>
      </SignedOut>
      <SignedIn>{signedInContent}</SignedIn>
    </>
  );
};

export default AuthGuard;
