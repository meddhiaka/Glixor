import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { CyberFx } from '../CyberFx'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'alert'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type ButtonChamfer = 'none' | 'chamfer' | 'chamfer-tl-br' | 'tag'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color/fill treatment */
  variant?: ButtonVariant
  /** Padding/text scale */
  size?: ButtonSize
  /** Geometric corner cut */
  chamfer?: ButtonChamfer
  /** Wraps the button in the .cyber-fx glitch engine */
  glitch?: boolean
  /** Shows a spinner and blocks interaction without the muted "disabled" look. */
  loading?: boolean
  fullWidth?: boolean
  /** Square aspect ratio for a single-glyph child — remember an aria-label. */
  iconOnly?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-primary text-slate-950 border-2 border-slate-900 dark:border-white hover:brightness-105',
  secondary: 'bg-brand-secondary text-white border-2 border-transparent hover:opacity-90',
  outline:
    'bg-transparent border-2 border-brand-primary text-slate-900 dark:text-brand-primary hover:bg-brand-primary hover:text-slate-950',
  ghost:
    'bg-transparent border border-slate-900 dark:border-white text-slate-900 dark:text-white hover:border-brand-primary hover:text-brand-primary',
  alert: 'bg-brand-alert text-white border-2 border-transparent hover:opacity-90',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: 'px-3.5 py-1.5 text-xs gap-1.5',
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-6 py-3 text-xs gap-2',
  lg: 'px-8 py-4 text-sm gap-2.5',
}

const ICON_ONLY_SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: 'w-8 h-8',
  sm: 'w-9 h-9',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

const CHAMFER_CLASSES: Record<ButtonChamfer, string> = {
  none: '',
  chamfer: 'clip-chamfer',
  'chamfer-tl-br': 'clip-chamfer-tl-br',
  tag: 'clip-tag pr-3',
}

function Spinner({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`h-3.5 w-3.5 animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    chamfer = 'none',
    glitch = true,
    loading = false,
    fullWidth = false,
    iconOnly = false,
    leftIcon,
    rightIcon,
    disabled = false,
    type = 'button',
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading
  const showMuted = disabled && !loading

  const buttonClasses = [
    'relative z-10 inline-flex items-center justify-center',
    'font-mono font-bold uppercase tracking-wider whitespace-nowrap',
    'transition-all duration-150',
    isDisabled ? 'cursor-not-allowed pointer-events-none select-none' : 'active:translate-y-0.5',
    showMuted
      ? 'bg-striped border-2 border-slate-300 text-slate-400 dark:border-slate-800 dark:text-slate-600'
      : VARIANT_CLASSES[variant],
    CHAMFER_CLASSES[chamfer],
    iconOnly ? ICON_ONLY_SIZE_CLASSES[size] : SIZE_CLASSES[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={buttonClasses}
      {...rest}
    >
      {loading ? <Spinner /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )

  if (!glitch) return content

  return (
    <CyberFx disabled={isDisabled} className={fullWidth ? 'flex w-full' : undefined}>
      {content}
    </CyberFx>
  )
})
