import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { CyberFx } from '../CyberFx'

export type InputLook = 'default' | 'subtle' | 'outline' | 'flushed'
export type InputSize = 'xs' | 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode
  /** Box treatment. Ignored (falls back to the error styling) when `error` is set. */
  look?: InputLook
  size?: InputSize
  /** Presence puts the field in its error state and shows this message below it. */
  error?: string
  /** Helper text shown below the field when there's no error. */
  hint?: string
  /** Shows a "// REQUIRED" marker next to the label. */
  required?: boolean
  /** Wraps the field in the shared .cyber-fx glitch engine. */
  glitch?: boolean
  leftIcon?: ReactNode
  /** Trailing slot — a `<kbd>` shortcut badge, an icon, anything. */
  rightAdornment?: ReactNode
  fullWidth?: boolean
  /** Renders just the bare `<input>` with no border/box of its own, for composing into a shared container — see the segmented-input story. */
  bare?: boolean
  containerClassName?: string
}

const SIZE_CLASSES: Record<InputSize, string> = {
  xs: 'px-2.5 py-1 text-xs',
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-4 py-3.5 text-base',
}

const LOOK_CLASSES: Record<InputLook, string> = {
  default: 'border-2 border-slate-900 bg-white dark:border-white dark:bg-brand-darkInput',
  subtle: 'border-2 border-transparent bg-slate-100 dark:bg-slate-800/80',
  outline: 'border-2 border-slate-900 bg-transparent dark:border-white',
  flushed: 'border-b-2 border-slate-900 bg-transparent dark:border-white',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    look = 'default',
    size = 'md',
    error,
    hint,
    required = false,
    glitch = true,
    leftIcon,
    rightAdornment,
    fullWidth = false,
    bare = false,
    className = '',
    containerClassName = '',
    id,
    ...rest
  },
  ref,
) {
  const inputClasses = [
    'w-full bg-transparent font-bold tracking-wider text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white dark:placeholder-slate-500',
    SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (bare) {
    return <input ref={ref} id={id} className={inputClasses} {...rest} />
  }

  const boxClasses = [
    'group relative z-10 flex items-center transition-colors',
    error
      ? 'border-2 border-brand-alert bg-red-500/10 shadow-[0_0_10px_rgba(255,0,60,0.2)]'
      : `${LOOK_CLASSES[look]} focus-within:border-brand-primary`,
    fullWidth ? 'w-full' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const box = (
    <div className={boxClasses}>
      {leftIcon && (
        <div className="flex items-center pl-3.5 pr-2 text-slate-900 transition-transform duration-300 group-focus-within:rotate-90 dark:text-brand-primary">
          {leftIcon}
        </div>
      )}
      <input ref={ref} id={id} className={inputClasses} {...rest} />
      {rightAdornment && <div className="flex items-center pr-3">{rightAdornment}</div>}
    </div>
  )

  return (
    <div className={[fullWidth ? 'w-full' : 'inline-block', containerClassName].filter(Boolean).join(' ')}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white"
        >
          <span>{label}</span>
          {required && <span className="font-mono text-[9px] font-bold text-brand-alert">// REQUIRED</span>}
        </label>
      )}

      {glitch ? <CyberFx tone={error ? 'alert' : 'default'}>{box}</CyberFx> : box}

      {error ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-alert">
          <span className="bg-brand-alert px-1 text-[9px] text-white">ERR</span>
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      ) : null}
    </div>
  )
})
