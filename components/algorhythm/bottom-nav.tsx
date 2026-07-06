"use client";

import { cn } from "@/lib/utils";
import { Home, Trophy, Plus, BarChart3, User } from "lucide-react";
import type { ScreenId } from "./screens";

const items: { id: ScreenId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "quests", label: "Quest", icon: Trophy },
  { id: "analytics", label: "Analitik", icon: BarChart3 },
  { id: "profile", label: "Profil", icon: User },
];

export function BottomNav({
  active,
  onNavigate,
}: {
  active: ScreenId;
  onNavigate: (id: ScreenId) => void;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20">
      {/* FAB */}
      <button
        type="button"
        onClick={() => onNavigate("transaction")}
        aria-label="Catat transaksi baru"
        className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground glow-green-strong transition-transform active:scale-95 z-50"
      >
        <Plus className="h-7 w-7" strokeWidth={3} />
      </button>

      <nav className="flex items-end justify-between border-t border-border bg-card/95 px-5 pb-6 pt-3 backdrop-blur">
        {items.slice(0, 2).map((it) => (
          <NavButton
            key={it.id}
            {...it}
            active={active === it.id}
            onClick={() => onNavigate(it.id)}
          />
        ))}
        <div className="w-14" aria-hidden="true" />
        {items.slice(2).map((it) => (
          <NavButton
            key={it.id}
            {...it}
            active={active === it.id}
            onClick={() => onNavigate(it.id)}
          />
        ))}
      </nav>
    </div>
  );
}

function NavButton({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: typeof Home;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-14 flex-col items-center gap-1 text-[10px] font-medium transition-colors",
        active ? "text-primary" : "text-muted-foreground",
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={active ? 2.6 : 2} />
      {label}
    </button>
  );
}
