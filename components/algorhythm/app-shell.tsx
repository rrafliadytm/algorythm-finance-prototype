'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { PhoneFrame } from './phone-frame'
import { BottomNav } from './bottom-nav'
import { screenList, type ScreenId } from './screens'

import { OnboardingScreen } from './screens/onboarding-screen'
import { HomeScreen } from './screens/home-screen'
import { QuestsScreen } from './screens/quests-screen'
import { TransactionScreen } from './screens/transaction-screen'
import { ProfileScreen } from './screens/profile-screen'
import { QuestDetailScreen } from './screens/quest-detail-screen'
import { RewardClaimScreen } from './screens/reward-claim-screen'
import { AnalyticsScreen } from './screens/analytics-screen'
import { EwalletScreen } from './screens/ewallet-screen'

// Screens that show the app bottom navigation bar
const withNav: ScreenId[] = ['home', 'quests', 'analytics', 'profile']

export function AppShell() {
  const [screen, setScreen] = useState<ScreenId>('onboarding')
  const nav = (id: ScreenId) => setScreen(id)

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <OnboardingScreen nav={nav} />
      case 'home':
        return <HomeScreen nav={nav} />
      case 'quests':
        return <QuestsScreen nav={nav} />
      case 'transaction':
        return <TransactionScreen nav={nav} />
      case 'profile':
        return <ProfileScreen nav={nav} />
      case 'quest-detail':
        return <QuestDetailScreen nav={nav} />
      case 'reward-claim':
        return <RewardClaimScreen nav={nav} />
      case 'analytics':
        return <AnalyticsScreen />
      case 'ewallet':
        return <EwalletScreen nav={nav} />
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 lg:flex-row lg:items-start lg:py-14">
        {/* Sidebar / screen selector */}
        <aside className="lg:sticky lg:top-14 lg:w-72 lg:flex-none">
          <div className="mb-6 flex items-center gap-3">
            <Logo size={48} />
            <div>
              <h1 className="text-lg font-black leading-tight">Algorhythm Finance</h1>
              <p className="text-xs text-muted-foreground">Prototipe UI · 9 Layar</p>
            </div>
          </div>

          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Navigasi Layar
          </p>
          <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {screenList.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setScreen(s.id)}
                className={cn(
                  'rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors',
                  screen === s.id
                    ? 'border-primary/50 bg-primary/15 text-primary'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground',
                )}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <p className="mt-4 hidden text-[11px] leading-relaxed text-muted-foreground lg:block text-pretty">
            Tip: gunakan tombol di dalam layar (CTA, FAB, kartu misi) untuk berpindah antar-layar
            layaknya prototipe interaktif.
          </p>
        </aside>

        {/* Phone preview */}
        <div className="flex flex-1 justify-center">
          <div className="relative">
            <PhoneFrame>
              {renderScreen()}
              {withNav.includes(screen) && <BottomNav active={screen} onNavigate={nav} />}
            </PhoneFrame>
          </div>
        </div>
      </div>
    </main>
  )
}
