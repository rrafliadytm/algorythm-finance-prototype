"use client";

import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      id="phone-frame-container"
      className="relative mx-auto w-full max-w-[390px]"
    >
      <div className="relative overflow-hidden rounded-[3rem] border-[10px] border-black bg-background shadow-2xl shadow-black/60 ring-1 ring-white/10">
        {/* Notch */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-30 h-7 w-36 -translate-x-1/2 rounded-b-3xl bg-black" />
        {/* Screen viewport */}
        <div className="relative h-[820px] w-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
