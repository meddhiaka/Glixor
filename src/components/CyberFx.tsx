import type { ReactNode } from 'react'

export interface CyberFxProps {
  disabled?: boolean
  tone?: 'default' | 'alert'
  /** Keeps the hover/focus glitch treatment persistently on — for a "this is the current one" indicator (e.g. the active page in Pagination) rather than an interaction state. */
  active?: boolean
  className?: string
  children: ReactNode
}

export function CyberFx({
  disabled = false,
  tone = 'default',
  active = false,
  className = '',
  children,
}: CyberFxProps) {
  return (
    <span
      className={`cyber-fx group ${className}`}
      data-disabled={disabled}
      data-tone={tone}
      data-active={active}
    >
      <span className="cyber-bar-top" aria-hidden="true" />
      <span className="cyber-bar-bottom" aria-hidden="true" />
      <span className="cyber-pip-left" aria-hidden="true" />
      <span className="cyber-pip-right" aria-hidden="true" />
      <span className="chromatic-cyan" aria-hidden="true" />
      <span className="chromatic-magenta" aria-hidden="true" />
      {children}
    </span>
  )
}
