"use client";
import Link from "next/link";
import Header from "../components/Header";
import Image from "next/image";

export default function SignInPage() {
  // Placeholder for sign-in logic
  const handleGoogleSignIn = () => {
    // Add your Google sign-in logic here (e.g., NextAuth, Firebase, etc.)
    //alert("Google sign-in not yet implemented.");
  };

  return (
    <div className="min-h-screen w-full bg-[#faf8f8] font-sans">
      <Header />
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <div className="bg-white border border-[#ffe036] rounded-2xl shadow-lg p-8 flex flex-col items-center max-w-md w-full">
          <h2 className="text-3xl font-extrabold text-[#ff7a01] mb-6 text-center">Sign in to your account</h2>
          <Link href="/user-onboarding">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center gap-3 bg-[#ff7a01] hover:bg-[#ff9333] text-white font-semibold py-3 px-6 rounded-md shadow transition text-lg w-full justify-center"
            >
              <Image src="/google.svg" alt="Google" width={24} height={24} />
              Sign in with Google
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}