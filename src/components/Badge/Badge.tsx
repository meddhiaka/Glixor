import type { HTMLAttributes, ReactNode } from 'react'
import { CyberFx } from '../CyberFx'

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'alert' | 'warning' | 'success'
export type BadgeLook = 'pill' | 'outline' | 'solid' | 'micro'
export type BadgeSize = 'xs' | 'sm' | 'md'
export type BadgeChamfer = 'none' | 'chamfer' | 'chamfer-tl-br' | 'tag'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color/fill treatment. In `pill` look this only colors the dot — the container stays neutral. */
  variant?: BadgeVariant
  /** Structural style: status pill, outlined box, filled box, or a tiny inline tag. */
  look?: BadgeLook
  /** Padding/text scale */
  size?: BadgeSize
  /** Geometric corner cut */
  chamfer?: BadgeChamfer
  /** Wraps the badge in the shared .cyber-fx glitch engine. */
  glitch?: boolean
  /** Small leading status dot, colored by variant (circular in `pill`, square otherwise). */
  dot?: boolean
  /** Animates the dot. Only has an effect together with `dot`. */
  pulse?: boolean
  /** Renders as bare `[ children ]` text with no box — for the smallest bracket-style tags. */
  bracket?: boolean
  rounded?: boolean
  children: ReactNode
}

const SIZE_CLASSES: Record<BadgeSize, string> = {
  xs: 'px-1.5 py-0.5 text-[9px] gap-1',
  sm: 'px-3 py-1 text-xs gap-1.5',
  md: 'px-3.5 py-1.5 text-xs gap-2',
}

const CHAMFER_CLASSES: Record<BadgeChamfer, string> = {
  none: '',
  chamfer: 'clip-chamfer',
  'chamfer-tl-br': 'clip-chamfer-tl-br',
  tag: 'clip-tag pr-2.5',
}

const LOOK_BASE: Record<BadgeLook, string> = {
  pill: 'border border-slate-300 bg-white shadow-sm text-slate-800 dark:border-slate-700 dark:bg-brand-darkSurface dark:text-slate-100',
  outline: 'border-2 bg-transparent',
  solid: '',
  micro: 'border bg-transparent',
}

const DOT_COLORS: Record<BadgeVariant, string> = {
  default: 'bg-slate-400 dark:bg-slate-500',
  primary: 'bg-brand-primary',
  secondary: 'bg-brand-secondary',
  alert: 'bg-brand-alert',
  warning: 'bg-brand-warning',
  success: 'bg-brand-success',
}

const OUTLINE_COLORS: Record<BadgeVariant, string> = {
  default: 'border-slate-900 text-slate-900 dark:border-white dark:text-white',
  primary: 'border-brand-primary text-brand-primary',
  secondary: 'border-brand-secondary text-brand-secondary',
  alert: 'border-brand-alert text-brand-alert',
  warning: 'border-brand-warning text-brand-warning',
  success: 'border-brand-success text-brand-success',
}

const SOLID_COLORS: Record<BadgeVariant, string> = {
  default: 'bg-slate-900 text-white dark:bg-white dark:text-slate-950',
  primary: 'bg-brand-primary text-slate-950',
  secondary: 'bg-brand-secondary text-white',
  alert: 'bg-brand-alert text-white',
  warning: 'bg-brand-warning text-slate-950',
  success: 'bg-brand-success text-slate-950',
}

const BRACKET_COLORS: Record<BadgeVariant, string> = {
  default: 'text-slate-700 dark:text-slate-300',
  primary: 'text-brand-primary',
  secondary: 'text-brand-secondary',
  alert: 'text-brand-alert',
  warning: 'text-brand-warning',
  success: 'text-brand-success',
}

export function Badge({
  variant = 'default',
  look = 'pill',
  size = 'sm',
  chamfer = 'none',
  glitch = false,
  dot = false,
  pulse = false,
  bracket = false,
  rounded = false,
  className = '',
  children,
  ...rest
}: BadgeProps) {
  const base = 'inline-flex items-center font-mono font-bold uppercase tracking-wider whitespace-nowrap'

  if (bracket) {
    return (
      <span className={[base, 'text-[10px]', BRACKET_COLORS[variant], className].filter(Boolean).join(' ')} {...rest}>
        [{children}]
      </span>
    )
  }

  const roundedClass = rounded ? 'rounded-full' : look === 'pill' ? 'rounded-lg' : 'rounded-none'

  const colorClasses = look === 'pill' ? '' : look === 'solid' ? SOLID_COLORS[variant] : OUTLINE_COLORS[variant]

  const badgeClasses = [
    base,
    SIZE_CLASSES[size],
    roundedClass,
    CHAMFER_CLASSES[chamfer],
    LOOK_BASE[look],
    colorClasses,
    look === 'pill' ? 'text-glitch-static' : '',
    glitch ? 'relative z-10' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const dotEl = dot ? (
    <span
      className={[
        'h-1.5 w-1.5',
        look === 'pill' ? 'rounded-full' : '',
        DOT_COLORS[variant],
        pulse ? 'animate-pulse' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    />
  ) : null

  const content = (
    <span className={badgeClasses} {...rest}>
      {dotEl}
      {children}
    </span>
  )

  if (!glitch) return content

  return <CyberFx>{content}</CyberFx>
}
