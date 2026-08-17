import type { BodyCondition } from '@/lib/types'

interface BodyConditionIconProps {
  condition: BodyCondition
  className?: string
}

function DogSilhouette({
  bodyWidth,
  bellyCurve,
  ribLines = false,
  className,
}: {
  bodyWidth: number
  bellyCurve: number
  ribLines?: boolean
  className?: string
}) {
  const cx = 32
  const cy = 28

  return (
    <svg
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <ellipse cx={cx} cy={cy + bellyCurve} rx={bodyWidth} ry={10 + bellyCurve * 0.4} fill="currentColor" opacity="0.15" />
      <path
        d={`M ${cx - bodyWidth - 6} ${cy + 2}
           Q ${cx - bodyWidth - 10} ${cy - 6} ${cx - bodyWidth - 2} ${cy - 8}
           L ${cx - 4} ${cy - 10}
           Q ${cx + 2} ${cy - 12} ${cx + 8} ${cy - 8}
           L ${cx + bodyWidth + 4} ${cy - 4}
           Q ${cx + bodyWidth + 10} ${cy + 2} ${cx + bodyWidth + 6} ${cy + 8}
           L ${cx + bodyWidth - 2} ${cy + 10 + bellyCurve}
           Q ${cx} ${cy + 14 + bellyCurve} ${cx - bodyWidth + 2} ${cy + 10 + bellyCurve}
           Z`}
        fill="currentColor"
      />
      <circle cx={cx - bodyWidth - 4} cy={cy - 4} r="5" fill="currentColor" />
      <ellipse cx={cx - bodyWidth - 7} cy={cy - 5} rx="1.5" ry="2" fill="white" opacity="0.9" />
      <path
        d={`M ${cx + bodyWidth + 4} ${cy + 2} Q ${cx + bodyWidth + 12} ${cy + 4} ${cx + bodyWidth + 10} ${cy + 10}`}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {ribLines && (
        <>
          <path d={`M ${cx - 6} ${cy - 2} L ${cx - 4} ${cy + 6}`} stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
          <path d={`M ${cx - 1} ${cy - 3} L ${cx + 1} ${cy + 7}`} stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
          <path d={`M ${cx + 4} ${cy - 2} L ${cx + 6} ${cy + 6}`} stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
        </>
      )}
    </svg>
  )
}

const iconConfig: Record<
  BodyCondition,
  { bodyWidth: number; bellyCurve: number; ribLines?: boolean }
> = {
  delicate: { bodyWidth: 10, bellyCurve: -2 },
  thin: { bodyWidth: 11, bellyCurve: -1, ribLines: true },
  normal: { bodyWidth: 14, bellyCurve: 0 },
  overweight: { bodyWidth: 17, bellyCurve: 3 },
  obese: { bodyWidth: 20, bellyCurve: 6 },
}

export function BodyConditionIcon({ condition, className = 'h-12 w-12' }: BodyConditionIconProps) {
  const config = iconConfig[condition]
  return (
    <DogSilhouette
      bodyWidth={config.bodyWidth}
      bellyCurve={config.bellyCurve}
      ribLines={config.ribLines}
      className={className}
    />
  )
}
