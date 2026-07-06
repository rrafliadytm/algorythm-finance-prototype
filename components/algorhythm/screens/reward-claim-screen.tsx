"use client";

import { useMemo } from "react";
import { StatusBar } from "../ui";
import type { ScreenId } from "../screens";
import { Gift, Coins, Zap } from "lucide-react";

export function RewardClaimScreen({ nav }: { nav: (id: ScreenId) => void }) {
  const coins = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0,
        duration: 2.5 + Math.random() * 2,
        size: 10 + Math.random() * 14,
      })),
    [],
  );

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background/95">
      {/* Dimmed dashboard backdrop hint */}
      <div className="pointer-events-none absolute inset-0 bg-background/70 backdrop-blur-sm" />

      {/* Falling coins */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {coins.map((c, i) => (
          <div
            key={i}
            className="animate-coin-fall absolute top-0"
            style={{
              left: `${c.left}%`,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
            }}
          >
            <Coins
              style={{ width: c.size, height: c.size }}
              className="text-warning"
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <StatusBar />

        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          {/* Open treasure chest */}
          <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-primary/15 glow-green-strong">
            <Gift className="h-16 w-16 text-primary" strokeWidth={2} />
          </div>

          <h1 className="mt-7 text-3xl font-black tracking-tight text-glow-green">
            MISSION
          </h1>
          <h1 className="text-3xl font-black tracking-tight text-glow-green">
            ACCOMPLISHED!
          </h1>
          <p className="mt-3 max-w-[16rem] text-sm text-muted-foreground text-pretty">
            Kedisiplinanmu terbayar. Ini hadiah yang berhasil kamu amankan!
          </p>

          {/* Rewards */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-warning/30 bg-warning/10 px-4 py-3">
              <Coins className="h-5 w-5 text-warning" />
              <span className="text-lg font-black text-warning">+150</span>
              <span className="text-[11px] font-medium text-muted-foreground">
                Gold
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3">
              <Zap className="h-5 w-5 text-primary" fill="currentColor" />
              <span className="text-lg font-black text-primary">+50</span>
              <span className="text-[11px] font-medium text-muted-foreground">
                XP
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="relative z-10 space-y-3 px-7 pb-10">
          <button
            type="button"
            onClick={() => nav("ewallet")}
            className="w-full rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground glow-green-strong transition-transform active:scale-[0.98]"
          >
            Tukarkan Jadi Saldo E-Wallet
          </button>
          <button
            type="button"
            onClick={() => nav("home")}
            className="w-full rounded-2xl border border-border bg-secondary py-4 text-sm font-semibold text-secondary-foreground"
          >
            Simpan Ke Inventory
          </button>
        </div>
      </div>
    </div>
  );
}
