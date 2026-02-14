"use client";

import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-purple-50 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-extrabold text-purple-deep">Google Sign-in Only</h1>
        <p className="mt-2 text-gray-600">Please use Continue with Google.</p>
        <button
          type="button"
          onClick={() => router.replace("/login")}
          className="mt-6 w-full rounded-full bg-purple-deep text-white text-lg font-bold py-3 hover:bg-purple-700 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
