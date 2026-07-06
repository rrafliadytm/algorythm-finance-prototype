'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { StatusBar, Card } from '../ui'
import { Coffee, ShoppingBag, UtensilsCrossed, Lock } from 'lucide-react'

const leaks = [
  { icon: Coffee, label: 'Kopi & Boba Kekinian', count: 8, amount: 'Rp180.000' },
  { icon: UtensilsCrossed, label: 'Jajan Makanan Ringan', count: 12, amount: 'Rp96.000' },
  { icon: ShoppingBag, label: 'Checkout Marketplace', count: 4, amount: 'Rp310.000' },
]

export function AnalyticsScreen() {
  const [range, setRange] = useState<'week' | 'month'>('week')

  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />

      <div className="no-scrollbar flex-1 space-y-5 overflow-y-auto px-5 pb-28 pt-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black">Analisis Mendalam</h1>
          {/* Range filter */}
          <div className="flex rounded-full border border-border bg-secondary p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRange('week')}
              className={cn('rounded-full px-3 py-1.5', range === 'week' && 'bg-primary text-primary-foreground')}
            >
              Mingguan
            </button>
            <button
              type="button"
              onClick={() => setRange('month')}
              className={cn('rounded-full px-3 py-1.5', range === 'month' && 'bg-primary text-primary-foreground')}
            >
              Bulanan
            </button>
          </div>
        </div>

        {/* Impulse gauge */}
        <Card glow="red" className="flex flex-col items-center border-destructive/25 py-5">
          <p className="text-xs font-semibold text-muted-foreground">Impulse Gauge Matrix</p>
          <Speedometer value={78} />
          <p className="-mt-2 text-lg font-black text-destructive">Level Boros Berbahaya</p>
          <p className="text-[11px] text-muted-foreground text-pretty text-center">
            Intensitas transaksi {range === 'week' ? 'mingguan' : 'bulanan'} kamu berada di zona merah.
          </p>
        </Card>

        {/* Micro leaks */}
        <div>
          <h2 className="mb-2 text-sm font-bold">Uraian Kebocoran Mikro</h2>
          <Card className="divide-y divide-border p-0">
            {leaks.map((l, i) => {
              const Icon = l.icon
              return (
                <div key={i} className="flex items-center gap-3 p-3.5">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-destructive/12">
                    <Icon className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{l.label}</p>
                    <p className="text-[11px] text-muted-foreground">{l.count}x transaksi periode ini</p>
                  </div>
                  <span className="text-sm font-bold text-destructive tabular-nums">{l.amount}</span>
                </div>
              )
            })}
          </Card>
        </div>

        {/* Privacy law banner */}
        <div className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/8 p-4">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-primary/15">
            <Lock className="h-4.5 w-4.5 text-primary" />
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground text-pretty">
            Analitik dilindungi enkripsi lokal menyeluruh sesuai mandat{' '}
            <span className="font-semibold text-primary">UU PDP No. 27 Tahun 2022</span>. Seluruh data
            adalah hak privasi Anda dan tidak diekspos ke pihak eksternal mana pun.
          </p>
        </div>
      </div>
    </div>
  )
}

function Speedometer({ value }: { value: number }) {
  const w = 240
  const h = 140
  const cx = w / 2
  const cy = h - 10
  const r = 100
  // angle from 180deg (left) to 0deg (right)
  const angle = Math.PI - (value / 100) * Math.PI
  const nx = cx + r * 0.82 * Math.cos(angle)
  const ny = cy - r * 0.82 * Math.sin(angle)

  const arc = (start: number, end: number, color: string) => {
    const a0 = Math.PI - (start / 100) * Math.PI
    const a1 = Math.PI - (end / 100) * Math.PI
    const x0 = cx + r * Math.cos(a0)
    const y0 = cy - r * Math.sin(a0)
    const x1 = cx + r * Math.cos(a1)
    const y1 = cy - r * Math.sin(a1)
    return <path d={`M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`} stroke={color} strokeWidth="16" fill="none" strokeLinecap="round" />
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-36 w-full max-w-[240px]" aria-label="Speedometer tingkat boros">
      {arc(0, 40, 'var(--primary)')}
      {arc(42, 68, 'var(--warning)')}
      {arc(70, 100, 'var(--destructive)')}
      {/* needle */}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="var(--foreground)" strokeWidth="4" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="8" fill="var(--foreground)" />
      <text x={cx} y={cy - 26} textAnchor="middle" className="fill-destructive" style={{ fontSize: 26, fontWeight: 900 }}>
        {value}%
      </text>
    </svg>
  )
}
