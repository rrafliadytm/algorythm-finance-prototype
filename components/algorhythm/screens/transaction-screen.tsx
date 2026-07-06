'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ScreenHeader, Pill } from '../ui'
import type { ScreenId } from '../screens'
import { UtensilsCrossed, ShoppingBag, Gamepad2, Settings, Delete, Sparkles } from 'lucide-react'

const categories = [
  { id: 'food', label: 'Makan', icon: UtensilsCrossed },
  { id: 'shop', label: 'Belanja', icon: ShoppingBag },
  { id: 'fun', label: 'Hiburan', icon: Gamepad2 },
  { id: 'other', label: 'Lain-lain', icon: Settings },
]

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '000', '0', 'del']

export function TransactionScreen({ nav }: { nav: (id: ScreenId) => void }) {
  const [amount, setAmount] = useState('50000')
  const [cat, setCat] = useState('food')
  const [note, setNote] = useState('')

  const press = (k: string) => {
    if (k === 'del') {
      setAmount((v) => (v.length <= 1 ? '0' : v.slice(0, -1)))
    } else {
      setAmount((v) => {
        const next = v === '0' ? k : v + k
        return next.length > 12 ? v : next
      })
    }
  }

  const formatted = Number(amount || '0').toLocaleString('id-ID')

  return (
    <div className="flex h-full flex-col bg-background">
      <ScreenHeader
        title="Catat Transaksi Baru"
        onBack={() => nav('home')}
        right={
          <Pill tone="green" className="text-[10px]">
            <Sparkles className="h-3 w-3" /> Potensi +10 XP
          </Pill>
        }
      />

      <div className="flex flex-1 flex-col overflow-hidden px-5">
        {/* Amount display */}
        <div className="flex flex-col items-center justify-center py-6">
          <p className="text-xs text-muted-foreground">Nominal pengeluaran</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-bold text-muted-foreground">Rp</span>
            <span className="text-[2rem] font-black tabular-nums leading-none">{formatted}</span>
          </div>
        </div>

        {/* Category chips */}
        <p className="mb-2 text-xs font-semibold text-muted-foreground">Kategori Cepat</p>
        <div className="grid grid-cols-4 gap-2.5">
          {categories.map((c) => {
            const Icon = c.icon
            const active = cat === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-2xl border py-3 transition-all',
                  active
                    ? 'border-primary/50 bg-primary/15 text-primary glow-green'
                    : 'border-border bg-card text-muted-foreground',
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={2.2} />
                <span className="text-[11px] font-semibold">{c.label}</span>
              </button>
            )
          })}
        </div>

        {/* Optional note */}
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Catatan (opsional)…"
          className="mt-4 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
        />

        {/* Numpad */}
        <div className="mt-auto grid grid-cols-3 gap-2 pb-3 pt-4">
          {keys.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => press(k)}
              className={cn(
                'flex h-12 items-center justify-center rounded-xl border border-border bg-card text-xl font-bold transition-colors active:bg-secondary',
                k === 'del' && 'text-destructive',
              )}
            >
              {k === 'del' ? <Delete className="h-5 w-5" /> : k}
            </button>
          ))}
        </div>

        {/* Save */}
        <button
          type="button"
          onClick={() => nav('reward-claim')}
          className="mb-8 w-full rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground glow-green-strong transition-transform active:scale-[0.98]"
        >
          Klaim XP &amp; Simpan Transaksi
        </button>
      </div>
    </div>
  )
}
