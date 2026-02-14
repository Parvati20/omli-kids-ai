"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const seededRandom = (seed: number) => {
    let t = seed + 0x6d2b79f5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const clouds = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        size: 1.5 + seededRandom(i * 5 + 1) * 1.5,
        left: seededRandom(i * 5 + 2) * 100,
        top: seededRandom(i * 5 + 3) * 100,
        duration: 20 + seededRandom(i * 5 + 4) * 15,
        delay: seededRandom(i * 5 + 5) * 5,
      })),
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        left: seededRandom(i * 5 + 101) * 100,
        top: seededRandom(i * 5 + 102) * 100,
        duration: 2 + seededRandom(i * 5 + 103) * 3,
        delay: seededRandom(i * 5 + 104) * 2,
        size: 0.8 + seededRandom(i * 5 + 105) * 0.8,
      })),
    []
  );

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/tool");
    }
  }, [router, status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-indigo-300 px-4 relative overflow-hidden">
      {/* Floating Clouds */}
      {clouds.map((cloud, i) => (
        <div
          key={`cloud-${i}`}
          className="floating-cloud"
          style={{
            fontSize: `${cloud.size}rem`,
            left: `${cloud.left}%`,
            top: `${cloud.top}%`,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          ☁️
        </div>
      ))}

      {/* Twinkling Stars */}
      {stars.map((star, i) => (
        <div
          key={`star-${i}`}
          className="floating-star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            fontSize: `${star.size}rem`,
          }}
        >
          ⭐
        </div>
      ))}

      {/* Main Card - Premium Glassmorphism */}
      <div className="w-full max-w-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 backdrop-blur-3xl rounded-[40px] shadow-2xl hover:shadow-3xl p-16 text-center relative z-10 animate-float-in border-2 border-white/90 transition-all duration-500">
        {/* Layered Depth Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-blue-400/30 rounded-[40px] blur-3xl opacity-80 -z-10"></div>

        {/* Character Illustration - Profile Pic Size Circle with Blue Background */}
        <div className="mb-8 flex justify-center relative h-44 w-44 mx-auto">
          {/* Perfect Circular Background - Vibrant Gradient */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-600 border-3 border-white/80 overflow-hidden shadow-xl"></div>
          
          {/* Animated Rotating Gradient Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 animate-spin-slow opacity-30 blur-lg"></div>
          
          {/* Character Image - Fills Small Circle */}
          <div className="absolute inset-0 rounded-full overflow-hidden z-10">
            <img
              src="/cartoon-little (1).png"
              alt="Jenny"
              className="w-full h-full object-cover drop-shadow-lg"
            />
          </div>
        </div>

        {/* Heading - Big Playful Gradient */}
        <h1 className="text-8xl font-extrabold bg-gradient-to-r from-purple-700 via-pink-600 to-blue-700 bg-clip-text text-transparent mb-2 animate-gradient drop-shadow-2xl" style={{ backgroundSize: '200% 200%', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          JENNY
        </h1>
        
        {/* Subtitle with Animated Emoji */}
        <div className="mb-10">
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-800 via-pink-700 to-blue-800 bg-clip-text text-transparent drop-shadow-md mb-3">
            Fun Learning Adventure with AI
          </p>
          <div className="text-4xl animate-bounce inline-block" style={{ animationDuration: '1.5s' }}>✨</div>
        </div>
        
        <p className="text-lg text-gray-800 mb-12 font-semibold drop-shadow-sm">
          Sign in to start your magical journey! 🚀
        </p>

        {error && (
          <div className="mb-8 p-5 bg-red-50/80 backdrop-blur-md border-2 border-red-300/50 rounded-3xl text-base text-red-700 font-medium shadow-lg">
            Oops! Sign-in didn't work. Try again! 😊
          </div>
        )}

        {/* Google Login Button - Premium */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/tool" })}
          className="group w-full rounded-full bg-gradient-to-r from-purple-700 via-pink-600 to-blue-700 text-white text-2xl font-extrabold py-5 px-10 hover:scale-110 active:scale-100 transition-all duration-300 flex items-center justify-center gap-4 shadow-2xl hover:shadow-4xl relative overflow-hidden border-2 border-white/50"
          style={{
            boxShadow: '0 20px 60px rgba(168, 85, 247, 0.8)',
          }}
        >
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-800 via-purple-800 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          
          {/* Shine Animation */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"></div>
          
          <div className="relative flex items-center gap-4 z-10">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center p-1.5 group-hover:scale-125 transition-transform">
              <img src="/google.png" alt="Google" className="w-6 h-6" />
            </div>
            <span>Continue with Google</span>
          </div>
        </button>

        {/* Decorative Bouncing Emojis */}
        <div className="mt-14 flex justify-center gap-8 text-5xl">
          <span className="animate-bounce hover:scale-150 transition-transform cursor-pointer" style={{ animationDelay: '0s' }}>🎨</span>
          <span className="animate-bounce hover:scale-150 transition-transform cursor-pointer" style={{ animationDelay: '0.1s' }}>📚</span>
          <span className="animate-bounce hover:scale-150 transition-transform cursor-pointer" style={{ animationDelay: '0.2s' }}>🎮</span>
          <span className="animate-bounce hover:scale-125 transition-transform cursor-pointer" style={{ animationDelay: '0.3s' }}>🌟</span>
        </div>
      </div>
    </div>
  );
}
