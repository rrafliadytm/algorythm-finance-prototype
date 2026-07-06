"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScreenHeader, Card, Pill, StatusBar } from "../ui";
import type { ScreenId } from "../screens";
import { Coins, Fingerprint, Plus, CheckCircle2 } from "lucide-react";

const wallets = [
  { name: "GoPay", phone: "0812 •••• 4821", color: "#00AED6" },
  { name: "DANA", phone: "0857 •••• 1290", color: "#118EEA" },
  { name: "ShopeePay", phone: "0821 •••• 7754", color: "#EE4D2D" },
];

export function EwalletScreen({ nav }: { nav: (id: ScreenId) => void }) {
  const [points, setPoints] = useState("2000");
  const [selected, setSelected] = useState(0);
  const balance = (Number(points || "0") * 10).toLocaleString("id-ID");

  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />
      <ScreenHeader
        title="E-Wallet Hub"
        onBack={() => nav("quests")}
        right={
          <Pill tone="green">
            <Coins className="h-3 w-3 text-warning" /> 2.450
          </Pill>
        }
      />

      <div className="no-scrollbar flex-1 space-y-5 overflow-y-auto px-5 pb-10 pt-1">
        {/* Connection cards */}
        <div>
          <p className="mb-2 text-xs font-semibold text-muted-foreground">
            Dompet Tersinkronisasi
          </p>
          <div className="space-y-2.5">
            {wallets.map((w, i) => (
              <button
                key={w.name}
                type="button"
                onClick={() => setSelected(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all",
                  selected === i
                    ? "border-primary/50 bg-primary/10 glow-green"
                    : "border-border bg-card",
                )}
              >
                <div
                  className="flex h-11 w-11 flex-none items-center justify-center rounded-xl text-sm font-black text-white"
                  style={{ backgroundColor: w.color }}
                >
                  {w.name[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{w.name}</p>
                  <p className="text-[11px] text-muted-foreground tabular-nums">
                    {w.phone}
                  </p>
                </div>
                {selected === i && (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                )}
              </button>
            ))}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-3 text-xs font-semibold text-muted-foreground"
            >
              <Plus className="h-4 w-4" /> Hubungkan Dompet Baru
            </button>
          </div>
        </div>

        {/* Conversion form */}
        <Card>
          <p className="text-sm font-bold">Konversi Penarikan</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            1.000 Gold Points = Rp10.000 saldo riil
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-3">
            <Coins className="h-5 w-5 flex-none text-warning" />
            <input
              inputMode="numeric"
              value={points}
              onChange={(e) => setPoints(e.target.value.replace(/\D/g, ""))}
              className="w-full bg-transparent text-lg font-bold tabular-nums outline-none"
            />
            <span className="text-xs font-medium text-muted-foreground">
              pts
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-primary/10 px-4 py-3">
            <span className="text-xs text-muted-foreground">
              Saldo diterima
            </span>
            <span className="text-lg font-black text-primary text-glow-green">
              Rp{balance}
            </span>
          </div>
          <div className="mt-2 flex gap-2">
            {["1000", "2000", "2450"].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setPoints(q)}
                className="flex-1 rounded-lg border border-border bg-secondary py-1.5 text-[11px] font-semibold text-muted-foreground"
              >
                {Number(q).toLocaleString("id-ID")}
              </button>
            ))}
          </div>
        </Card>

        {/* Security gate */}
        <button
          type="button"
          onClick={() => nav("reward-claim")}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground glow-green-strong transition-transform active:scale-[0.98]"
        >
          <Fingerprint className="h-5 w-5" />
          Cairkan dengan Sidik Jari
        </button>
        <p className="text-center text-[11px] text-muted-foreground text-pretty">
          Dilindungi otentikasi ganda (Biometrik / PIN) untuk mencegah fraud
          finansial.
        </p>
      </div>
    </div>
  );
}
