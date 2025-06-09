import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="place-items-center grid w-screen h-screen">
      <SignIn />
    </div>
  );
}
