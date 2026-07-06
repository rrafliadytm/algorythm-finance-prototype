import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

/* Phone status bar (fake iOS-style) */
export function StatusBar({ dark }: { dark?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold',
        dark ? 'text-foreground' : 'text-foreground',
      )}
    >
      <span className="tabular-nums">9:41</span>
      <div className="flex items-center gap-1.5">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  )
}

function SignalIcon() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="none" aria-hidden="true">
      <rect x="0" y="7" width="3" height="4" rx="1" fill="currentColor" />
      <rect x="4.5" y="5" width="3" height="6" rx="1" fill="currentColor" />
      <rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="currentColor" />
      <rect x="13.5" y="0" width="3" height="11" rx="1" fill="currentColor" />
    </svg>
  )
}
function WifiIcon() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path
        d="M8 10.5 5.5 8a3.5 3.5 0 0 1 5 0L8 10.5ZM8 3a8 8 0 0 1 5.7 2.4l1.4-1.4A10 10 0 0 0 8 1a10 10 0 0 0-7.1 3l1.4 1.4A8 8 0 0 1 8 3Z"
        fill="currentColor"
      />
    </svg>
  )
}
function BatteryIcon() {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.5" />
      <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
      <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

/* Section card */
export function Card({
  children,
  className,
  glow,
}: {
  children: ReactNode
  className?: string
  glow?: 'green' | 'red' | 'none'
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card p-4',
        glow === 'green' && 'glow-green',
        glow === 'red' && 'glow-red',
        className,
      )}
    >
      {children}
    </div>
  )
}

/* Pill badge */
export function Pill({
  children,
  tone = 'muted',
  className,
}: {
  children: ReactNode
  tone?: 'green' | 'red' | 'yellow' | 'muted'
  className?: string
}) {
  const tones: Record<string, string> = {
    green: 'bg-primary/15 text-primary border-primary/30',
    red: 'bg-destructive/15 text-destructive border-destructive/30',
    yellow: 'bg-warning/15 text-warning border-warning/30',
    muted: 'bg-secondary text-secondary-foreground border-border',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/* Progress bar */
export function ProgressBar({
  value,
  tone = 'green',
  className,
}: {
  value: number
  tone?: 'green' | 'red' | 'yellow'
  className?: string
}) {
  const tones: Record<string, string> = {
    green: 'bg-primary',
    red: 'bg-destructive',
    yellow: 'bg-warning',
  }
  return (
    <div className={cn('h-2.5 w-full overflow-hidden rounded-full bg-secondary', className)}>
      <div
        className={cn('h-full rounded-full transition-all', tones[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

/* Circular progress ring */
export function ProgressRing({
  value,
  size = 200,
  stroke = 14,
  children,
}: {
  value: number
  size?: number
  stroke?: number
  children?: ReactNode
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--secondary)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--primary)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ filter: 'drop-shadow(0 0 6px var(--primary))', transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  )
}

/* Screen header with back button */
export function ScreenHeader({
  title,
  onBack,
  right,
}: {
  title: string
  onBack?: () => void
  right?: ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-3">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Kembali"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-colors hover:bg-muted"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <h1 className="text-lg font-bold text-balance">{title}</h1>
      </div>
      {right}
    </div>
  )
}
