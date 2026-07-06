'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { StatusBar, Card, Pill } from '../ui'
import type { ScreenId } from '../screens'
import {
  ShieldCheck,
  PiggyBank,
  Trophy,
  UtensilsCrossed,
  ShoppingBag,
  Wallet,
  EyeOff,
} from 'lucide-react'

const history = [
  { icon: Wallet, label: 'Tarik Saldo DANA', time: 'Hari ini · 14:20', amount: '-2.000 pts', tone: 'green' as const },
  { icon: UtensilsCrossed, label: 'Kopi Kekinian', time: 'Kemarin · 09:15', amount: '-Rp25.000', tone: 'red' as const },
  { icon: ShoppingBag, label: 'Belanja Marketplace', time: '2 hari lalu', amount: '-Rp120.000', tone: 'red' as const },
  { icon: Trophy, label: 'Bonus Misi Selesai', time: '3 hari lalu', amount: '+150 pts', tone: 'green' as const },
]

export function ProfileScreen({ nav }: { nav: (id: ScreenId) => void }) {
  const [privacy, setPrivacy] = useState(true)
  const mask = (v: string) => (privacy ? '••••••' : v)

  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />

      <div className="no-scrollbar flex-1 space-y-5 overflow-y-auto px-5 pb-28 pt-2">
        <h1 className="text-xl font-black">Profil &amp; Privasi</h1>

        {/* Identity card */}
        <Card glow="green" className="flex items-center gap-4">
          <div className="relative h-16 w-16 flex-none overflow-hidden rounded-2xl border-2 border-primary/60">
            <Image src="/avatar-rayyan.png" alt="Avatar Raditya Rayyan" fill sizes="64px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-bold">Raditya Rayyan</p>
            <p className="text-xs text-muted-foreground">S1 Sistem Informasi</p>
            <Pill tone="green" className="mt-1.5 px-2 py-0.5 text-[10px]">
              Lv. 4 · Intermediate Saver
            </Pill>
          </div>
        </Card>

        {/* Achievement stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
              <PiggyBank className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Total Dihemat</p>
              <p className="text-sm font-bold">{mask('Rp450.000')}</p>
            </div>
          </Card>
          <Card className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/15">
              <Trophy className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Misi Sukses</p>
              <p className="text-sm font-bold">12 Kali</p>
            </div>
          </Card>
        </div>

        {/* Privacy control */}
        <Card glow={privacy ? 'green' : 'none'} className={cn(privacy && 'border-primary/40')}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold">Mode Privasi Finansial Penuh</p>
                <p className={cn('text-xs font-semibold', privacy ? 'text-primary' : 'text-muted-foreground')}>
                  {privacy ? 'AKTIF' : 'NONAKTIF'}
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={privacy}
              aria-label="Mode Privasi Finansial Penuh"
              onClick={() => setPrivacy((v) => !v)}
              className={cn(
                'relative h-7 w-12 flex-none rounded-full transition-colors',
                privacy ? 'bg-primary' : 'bg-secondary',
              )}
            >
              <span
                className={cn(
                  'absolute top-1 h-5 w-5 rounded-full bg-background transition-all',
                  privacy ? 'left-6' : 'left-1',
                )}
              />
            </button>
          </div>
          {privacy && (
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-primary/10 p-3">
              <EyeOff className="mt-0.5 h-4 w-4 flex-none text-primary" />
              <p className="text-[11px] leading-relaxed text-muted-foreground text-pretty">
                Nominal uang &amp; grafik disembunyikan dari Leaderboard publik dan komunitas aplikasi.
              </p>
            </div>
          )}
        </Card>

        {/* History */}
        <div>
          <h2 className="mb-2 text-sm font-bold">Riwayat Kronologis</h2>
          <Card className="divide-y divide-border p-0">
            {history.map((h, i) => {
              const Icon = h.icon
              return (
                <div key={i} className="flex items-center gap-3 p-3.5">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-secondary">
                    <Icon className="h-4.5 w-4.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{h.label}</p>
                    <p className="text-[11px] text-muted-foreground">{h.time}</p>
                  </div>
                  <span
                    className={cn(
                      'text-sm font-bold tabular-nums',
                      h.tone === 'green' ? 'text-primary' : 'text-destructive',
                    )}
                  >
                    {h.tone === 'red' ? mask(h.amount) : h.amount}
                  </span>
                </div>
              )
            })}
          </Card>
        </div>
      </div>
    </div>
  )
}
