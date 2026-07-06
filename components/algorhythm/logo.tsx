import { cn } from '@/lib/utils'

export function Logo({ size = 96, className }: { size?: number; className?: string }) {
  return (
    <div
      className={cn('relative flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        role="img"
        aria-label="Logo Algorhythm Finance"
        style={{ filter: 'drop-shadow(0 0 14px color-mix(in oklch, #00ff66 60%, transparent))' }}
      >
        {/* Shield */}
        <path
          d="M50 6 84 18v28c0 22-15 38-34 48C31 84 16 68 16 46V18L50 6Z"
          fill="color-mix(in oklch, #00ff66 12%, transparent)"
          stroke="#00ff66"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Equalizer bars */}
        <g fill="#00ff66">
          <rect x="33" y="46" width="7" height="18" rx="3" />
          <rect x="46.5" y="34" width="7" height="30" rx="3" />
          <rect x="60" y="42" width="7" height="22" rx="3" />
        </g>
      </svg>
    </div>
  )
}
