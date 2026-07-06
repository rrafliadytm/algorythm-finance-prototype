'use client'

import { useEffect, useState } from 'react'
import { ScreenHeader, Card, Pill } from '../ui'
import type { ScreenId } from '../screens'
import { Bot, ShieldOff, Clock } from 'lucide-react'

function useCountdown(initial: number) {
  const [t, setT] = useState(initial)
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v > 0 ? v - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const s = t % 60
  return { h, m, s }
}

const pad = (n: number) => String(n).padStart(2, '0')

export function QuestDetailScreen({ nav }: { nav: (id: ScreenId) => void }) {
  const { h, m, s } = useCountdown(22 * 3600 + 14 * 60 + 5)

  return (
    <div className="flex h-full flex-col bg-background">
      <ScreenHeader
        title="Detail Misi"
        onBack={() => nav('quests')}
        right={<Pill tone="red">Aktif</Pill>}
      />

      <div className="no-scrollbar flex-1 space-y-5 overflow-y-auto px-5 pb-10 pt-1">
        {/* Mission header */}
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-destructive/15">
            <ShieldOff className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <h2 className="text-lg font-black leading-tight text-balance">
              Tantangan Kalahkan Nafsu Checkout E-Commerce
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">Imbalan: +150 Points &amp; +50 XP</p>
          </div>
        </div>

        {/* Countdown */}
        <Card glow="red" className="border-destructive/30">
          <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold text-destructive">
            <Clock className="h-4 w-4" /> Sisa waktu penyelesaian misi
          </div>
          <div className="flex items-center justify-center gap-2">
            <TimeBlock value={pad(h)} label="Jam" />
            <span className="text-2xl font-black text-destructive">:</span>
            <TimeBlock value={pad(m)} label="Menit" />
            <span className="text-2xl font-black text-destructive">:</span>
            <TimeBlock value={pad(s)} label="Detik" />
          </div>
        </Card>

        {/* AI tips */}
        <Card glow="green" className="border-primary/30">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary">AI Psychological Tips</p>
              <p className="text-[11px] text-muted-foreground">Asisten Algorhythm</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-pretty">
            &ldquo;Rayyan, kamu sudah berhasil bertahan 2 hari penuh! Pindahkan barang impianmu dari
            keranjang ke Wishlist, dan tunggu 48 jam sebelum memutuskan membelinya.&rdquo;
          </p>
        </Card>

        {/* Trend chart */}
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-bold">Tren Belanja Mingguan</p>
            <span className="flex items-center gap-1 text-[10px] font-medium text-destructive">
              <span className="h-0.5 w-4 rounded bg-destructive" /> Batas maks.
            </span>
          </div>
          <TrendChart />
          <p className="mt-2 text-[11px] text-muted-foreground text-pretty">
            Jaga garis tetap di bawah batas merah agar misi tidak gugur.
          </p>
        </Card>
      </div>
    </div>
  )
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-3xl font-black tabular-nums text-destructive">
        {value}
      </div>
      <span className="mt-1 text-[10px] font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

function TrendChart() {
  const w = 300
  const h = 120
  const data = [30, 45, 38, 60, 52, 70, 58]
  const max = 100
  const limitY = h - (75 / max) * h
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (w - 16) + 8
    const y = h - (d / max) * h
    return `${x},${y}`
  })
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-28 w-full" aria-label="Grafik tren belanja mingguan">
      {/* limit line */}
      <line x1="0" y1={limitY} x2={w} y2={limitY} stroke="var(--destructive)" strokeWidth="2" strokeDasharray="6 5" />
      {/* area */}
      <polyline points={`8,${h} ${pts.join(' ')} ${w - 8},${h}`} fill="var(--primary)" opacity="0.12" />
      {/* line */}
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 4px var(--primary))' }}
      />
      {pts.map((p, i) => {
        const [x, y] = p.split(',')
        return <circle key={i} cx={x} cy={y} r="3.5" fill="var(--primary)" />
      })}
    </svg>
  )
}
