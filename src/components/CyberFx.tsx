import type { ReactNode } from 'react'

export interface CyberFxProps {
  disabled?: boolean
  children: ReactNode
}

export function CyberFx({ disabled = false, children }: CyberFxProps) {
  return (
    <span className="cyber-fx group" data-disabled={disabled}>
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
