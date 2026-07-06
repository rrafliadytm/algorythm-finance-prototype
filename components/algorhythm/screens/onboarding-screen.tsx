'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Logo } from '../logo'
import { StatusBar } from '../ui'
import type { ScreenId } from '../screens'
import { Swords, Flame, ShieldCheck } from 'lucide-react'

const slides = [
  {
    icon: Swords,
    title: 'Kontrol Nafsu Belanja',
    body: 'Taklukkan belanja impulsif lewat misi harian yang seru dan bikin nagih.',
  },
  {
    icon: Flame,
    title: 'Jaga Daily Streak',
    body: 'Pertahankan konsistensi menabung untuk melipatgandakan XP dan naik level.',
  },
  {
    icon: ShieldCheck,
    title: 'Privasi 100% Aman',
    body: 'Data keuanganmu terlindungi penuh sesuai regulasi nasional UU PDP.',
  },
]

export function OnboardingScreen({ nav }: { nav: (id: ScreenId) => void }) {
  const [i, setI] = useState(0)

  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />

      <div className="flex flex-1 flex-col items-center px-7 pt-6">
        {/* Logo */}
        <div className="mt-4 flex flex-col items-center">
          <div className="rounded-full bg-primary/5 p-4 glow-green">
            <Logo size={104} />
          </div>
          <h1 className="mt-6 text-3xl font-black tracking-tight text-glow-green">Algorhythm</h1>
          <p className="text-sm font-medium tracking-[0.35em] text-primary">FINANCE</p>
        </div>

        {/* Tagline */}
        <p className="mt-6 max-w-[18rem] text-center text-[15px] font-medium leading-relaxed text-muted-foreground text-balance">
          Level Up Your Finance, Game On Your Savings!
        </p>

        {/* Carousel card */}
        <div className="mt-8 w-full flex-1">
          <div className="relative rounded-3xl border border-border bg-card p-6 glow-green">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
              {(() => {
                const Icon = slides[i].icon
                return <Icon className="h-8 w-8 text-primary" strokeWidth={2.2} />
              })()}
            </div>
            <h2 className="mt-5 text-center text-xl font-bold">{slides[i].title}</h2>
            <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground text-pretty">
              {slides[i].body}
            </p>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  idx === i ? 'w-7 bg-primary' : 'w-2 bg-secondary',
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-7 pb-10 pt-4">
        {i < slides.length - 1 ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => nav('home')}
              className="flex-1 rounded-2xl border border-border bg-secondary py-4 text-sm font-semibold text-secondary-foreground"
            >
              Lewati
            </button>
            <button
              type="button"
              onClick={() => setI((v) => v + 1)}
              className="flex-1 rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground glow-green"
            >
              Lanjut
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => nav('home')}
            className="w-full rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground glow-green-strong transition-transform active:scale-[0.98]"
          >
            Mulai Sekarang
          </button>
        )}
      </div>
    </div>
  )
}
