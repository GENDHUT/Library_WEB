
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();

  const handleReveal = () => {
    if (isNavigating) return;

    setIsNavigating(true);
    setIsRevealed(true);

    setTimeout(() => {
      router.push("/lib");
    }, 700);
  };

  return (
    <main className="fixed inset-0 z-50 h-dvh w-screen overflow-hidden bg-[#f5f3ee] text-[#24231f]">

      {/* Background decoration */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${isRevealed
            ? "scale-110 blur-xl opacity-30"
            : "scale-100 blur-0 opacity-100"
          }`}
      >
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#d9d3c5] opacity-40 blur-3xl" />

        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-[#c9c2b2] opacity-40 blur-3xl" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#24231f_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Dark overlay */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 bg-black/75 backdrop-blur-md transition-opacity duration-700 ${isRevealed ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* Main content */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center transition-all duration-700 ${isRevealed
            ? "scale-[0.98] text-white"
            : "scale-100 text-[#24231f]"
          }`}
      >

        {/* Header */}
        <header className="absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-7 sm:px-10 md:px-12">
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full transition-colors ${isRevealed ? "bg-white" : "bg-[#77715f]"
                }`}
            />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.25em]">
              Open Knowledge Library
            </span>
          </div>

          <span className="text-[9px] uppercase tracking-[0.2em] opacity-60 sm:text-[10px]">
            EST. 2026
          </span>
        </header>

        {/* Center content */}
        <section className="w-full max-w-3xl">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.35em] opacity-60 sm:mb-6 sm:text-xs sm:tracking-[0.45em]">
            A place for knowledge
          </p>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-8xl">
            Something
            <br />
            <span className="font-serif font-normal italic">
              is growing.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 opacity-65 sm:mt-8 sm:text-base">
            We are building a space to collect, explore, and share
            knowledge. A library without boundaries, made for everyone.
          </p>

          {/* Eye button */}
          <div className="mt-10 flex flex-col items-center sm:mt-14">
            <button
              type="button"
              aria-label="Reveal the hidden page"
              aria-pressed={isRevealed}
              disabled={isNavigating}
              onMouseEnter={() => {
                if (!isNavigating) setIsRevealed(true);
              }}
              onMouseLeave={() => {
                if (!isNavigating) setIsRevealed(false);
              }}
              onFocus={() => {
                if (!isNavigating) setIsRevealed(true);
              }}
              onBlur={() => {
                if (!isNavigating) setIsRevealed(false);
              }}
              onClick={handleReveal}
              className={`group flex h-20 w-20 items-center justify-center rounded-full border transition-all duration-500 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4 disabled:cursor-wait ${isRevealed
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-[#24231f]/20 bg-white/50 text-[#24231f] shadow-lg shadow-black/5"
                }`}
            >
              <svg
                viewBox="0 0 64 64"
                className="h-9 w-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Closed eye */}
                <path
                  d="M5 32 Q32 32 59 32"
                  className={`transition-all duration-500 ${isRevealed ? "opacity-0" : "opacity-100"
                    }`}
                />

                <path
                  d="M5 32 Q32 52 59 32"
                  className={`transition-all duration-500 ${isRevealed ? "opacity-0" : "opacity-100"
                    }`}
                />

                {/* Open eye */}
                <path
                  d="M5 32 C13 18 22 12 32 12 C42 12 51 18 59 32 C51 46 42 52 32 52 C22 52 13 46 5 32Z"
                  className={`transition-all duration-500 ${isRevealed
                      ? "scale-100 opacity-100"
                      : "scale-75 opacity-0"
                    }`}
                  style={{ transformOrigin: "center" }}
                />

                {/* Pupil */}
                <circle
                  cx="32"
                  cy="32"
                  r="9"
                  fill="currentColor"
                  stroke="none"
                  className={`transition-all duration-500 ${isRevealed
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                    }`}
                  style={{ transformOrigin: "center" }}
                />

                {/* Eye highlight */}
                <circle
                  cx="35"
                  cy="29"
                  r="2.5"
                  fill="white"
                  stroke="none"
                  className={`transition-opacity duration-500 ${isRevealed ? "opacity-100" : "opacity-0"
                    }`}
                />
              </svg>
            </button>

            <span className="mt-5 text-[9px] uppercase tracking-[0.3em] opacity-50 sm:text-[10px]">
              {isNavigating ? "Entering library..." : "Hover to reveal"}
            </span>
          </div>
        </section>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-between gap-3 px-6 py-6 text-[9px] uppercase tracking-[0.15em] opacity-50 sm:flex-row sm:px-10 sm:text-[10px] sm:tracking-[0.2em] md:px-12">
          <span>Knowledge belongs to everyone.</span>
          <span>Currently under construction</span>
        </footer>

      </div>
    </main>
  );
}
