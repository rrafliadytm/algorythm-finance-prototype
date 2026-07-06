'use client'

import Image from 'next/image'
import { StatusBar, Card, ProgressRing, ProgressBar, Pill } from '../ui'
import type { ScreenId } from '../screens'
import { Flame, UtensilsCrossed, ShoppingBag, ChevronRight, Bell } from 'lucide-react'

export function HomeScreen({ nav }: { nav: (id: ScreenId) => void }) {
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />

      <div className="no-scrollbar flex-1 space-y-5 overflow-y-auto px-5 pb-28 pt-2">
        {/* Header: gamer status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border-2 border-primary/60 glow-green">
              <Image src="/avatar-rayyan.png" alt="Avatar Raditya Rayyan" fill sizes="48px" className="object-cover" />
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">Halo, selamat datang</p>
              <p className="text-base font-bold leading-tight">Raditya Rayyan</p>
              <Pill tone="green" className="mt-1 px-2 py-0.5 text-[10px]">
                Lv. 4 · Intermediate Saver
              </Pill>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2.5 py-1.5">
              <Flame className="h-4 w-4 text-warning" fill="currentColor" />
              <span className="text-xs font-bold text-warning">7</span>
            </div>
            <button
              type="button"
              aria-label="Notifikasi"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary"
            >
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="text-xs font-semibold text-warning">7 Hari Konsisten. Pertahankan streak-mu!</p>

        {/* Main budget card */}
        <Card glow="green" className="flex flex-col items-center py-6">
          <ProgressRing value={64} size={200} stroke={14}>
            <p className="text-xs text-muted-foreground">Sisa saldo bulan ini</p>
            <p className="mt-1 text-3xl font-black text-glow-green">Rp1.450.000</p>
            <p className="mt-1 text-[11px] text-muted-foreground">64% anggaran tersisa</p>
          </ProgressRing>
          <div className="mt-4 w-full rounded-xl border border-primary/25 bg-primary/10 px-4 py-2.5 text-center">
            <p className="text-[13px] font-semibold text-primary">
              Batas Aman Jajan Hari Ini: Rp50.000
            </p>
          </div>
        </Card>

        {/* Impulsive alert widget */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold">Impulsive Alert</h2>
            <button
              type="button"
              onClick={() => nav('analytics')}
              className="flex items-center text-xs font-medium text-muted-foreground"
            >
              Lihat detail <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <Card className="space-y-4">
            <AlertBar
              icon={<UtensilsCrossed className="h-4 w-4" />}
              label="Makanan & Minuman"
              amount="Rp420.000 / Rp450.000"
              value={93}
              tone="yellow"
              note="Hampir mencapai limit harian"
            />
            <AlertBar
              icon={<ShoppingBag className="h-4 w-4" />}
              label="Belanja Online"
              amount="Rp180.000 / Rp600.000"
              value={30}
              tone="green"
              note="Masih aman terkendali"
            />
          </Card>
        </div>

        {/* Quick quest teaser */}
        <button
          type="button"
          onClick={() => nav('quests')}
          className="flex w-full items-center justify-between rounded-2xl border border-primary/25 bg-primary/10 p-4 text-left"
        >
          <div>
            <p className="text-sm font-bold text-primary">Misi harian menunggu!</p>
            <p className="text-xs text-muted-foreground">2 quest aktif · klaim hingga +150 poin</p>
          </div>
          <ChevronRight className="h-5 w-5 text-primary" />
        </button>
      </div>
    </div>
  )
}

function AlertBar({
  icon,
  label,
  amount,
  value,
  tone,
  note,
}: {
  icon: React.ReactNode
  label: string
  amount: string
  value: number
  tone: 'green' | 'yellow' | 'red'
  note: string
}) {
  const toneText =
    tone === 'yellow' ? 'text-warning' : tone === 'red' ? 'text-destructive' : 'text-primary'
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={toneText}>{icon}</span>
          <span className="text-sm font-semibold">{label}</span>
        </div>
        <span className="text-xs font-medium text-muted-foreground tabular-nums">{amount}</span>
      </div>
      <ProgressBar value={value} tone={tone} />
      <p className={`mt-1 text-[11px] font-medium ${toneText}`}>{note}</p>
    </div>
  )
}
