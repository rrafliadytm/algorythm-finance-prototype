'use client'

import { StatusBar, Card, ProgressBar, Pill } from '../ui'
import type { ScreenId } from '../screens'
import { Coins, ShieldOff, Coffee, Ticket, Wallet, LineChart, ChevronRight } from 'lucide-react'

export function QuestsScreen({ nav }: { nav: (id: ScreenId) => void }) {
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />

      <div className="no-scrollbar flex-1 space-y-5 overflow-y-auto px-5 pb-28 pt-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black">Quest &amp; Reward</h1>
          <Pill tone="green">Lv. 4</Pill>
        </div>

        {/* Points panel */}
        <Card glow="green" className="overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning/15">
                <Coins className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Gold Points</p>
                <p className="text-2xl font-black text-glow-green">2.450</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => nav('ewallet')}
              className="rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"
            >
              Cairkan
            </button>
          </div>
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-[11px] font-medium text-muted-foreground">
              <span>XP menuju Lv. 5 — Advanced Saver</span>
              <span className="text-primary">2.450 / 3.000</span>
            </div>
            <ProgressBar value={82} tone="green" />
          </div>
        </Card>

        {/* Active quests */}
        <div>
          <h2 className="mb-2 text-sm font-bold">Misi Aktif</h2>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => nav('quest-detail')}
              className="w-full text-left"
            >
              <Card className="transition-colors hover:border-primary/40">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-destructive/15">
                    <ShieldOff className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold">Tantangan Anti-Checkout</p>
                      <Pill tone="green" className="flex-none px-2 py-0.5 text-[10px]">
                        +150
                      </Pill>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground text-pretty">
                      Tahan belanja e-commerce non-kebutuhan selama 3 hari berturut-turut.
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="font-medium text-primary">Hari ke-2 / 3</span>
                      <span className="flex items-center text-muted-foreground">
                        Detail <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                    <ProgressBar value={66} tone="green" className="mt-1" />
                  </div>
                </div>
              </Card>
            </button>

            <Card>
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-warning/15">
                  <Coffee className="h-5 w-5 text-warning" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold">Streak Penghematan 15%</p>
                    <Pill tone="yellow" className="flex-none px-2 py-0.5 text-[10px]">
                      +100
                    </Pill>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground text-pretty">
                    Pangkas anggaran kopi/boba mingguan sebesar 15%.
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="font-medium text-warning">80% selesai</span>
                    <span className="text-muted-foreground">Hampir tercapai!</span>
                  </div>
                  <ProgressBar value={80} tone="yellow" className="mt-1" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Reward store */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold">Katalog Hadiah</h2>
            <span className="text-[11px] text-muted-foreground">Tukar Gold Points</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <RewardCard
              icon={<Ticket className="h-5 w-5 text-primary" />}
              title="Voucher Kuliah"
              sub="Mitra keperluan kampus"
              cost={1500}
              affordable
            />
            <RewardCard
              icon={<Wallet className="h-5 w-5 text-primary" />}
              title="Saldo GoPay/DANA"
              sub="Dompet digital lokal"
              cost={2000}
              affordable
            />
            <RewardCard
              icon={<LineChart className="h-5 w-5 text-warning" />}
              title="Analitik Premium"
              sub="Buka fitur gratis"
              cost={3000}
              affordable={false}
            />
            <RewardCard
              icon={<Ticket className="h-5 w-5 text-primary" />}
              title="Diskon Belanja"
              sub="Voucher mitra"
              cost={1200}
              affordable
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function RewardCard({
  icon,
  title,
  sub,
  cost,
  affordable,
}: {
  icon: React.ReactNode
  title: string
  sub: string
  cost: number
  affordable: boolean
}) {
  return (
    <Card className="flex flex-col p-3.5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">{icon}</div>
      <p className="mt-2.5 text-sm font-bold leading-tight">{title}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
      <div className="mt-2 flex items-center gap-1">
        <Coins className="h-3.5 w-3.5 text-warning" />
        <span className="text-xs font-bold tabular-nums">{cost.toLocaleString('id-ID')}</span>
      </div>
      <button
        type="button"
        disabled={!affordable}
        className={
          affordable
            ? 'mt-2.5 rounded-lg bg-primary py-2 text-xs font-bold text-primary-foreground'
            : 'mt-2.5 rounded-lg border border-border bg-secondary py-2 text-xs font-semibold text-muted-foreground'
        }
      >
        {affordable ? 'Tukar Hadiah' : 'Poin kurang'}
      </button>
    </Card>
  )
}
