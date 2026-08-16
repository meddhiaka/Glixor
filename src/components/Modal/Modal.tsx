import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { CyberFx } from '../CyberFx'

export type ModalSize = 'sm' | 'md' | 'lg'
export type ModalTone = 'default' | 'alert'

export interface ModalProps {
  open: boolean
  onClose: () => void
  /** Renders the standard header row (title + close button). Omit it for a fully custom body — see the danger-modal story. */
  title?: ReactNode
  size?: ModalSize
  /** 'alert' reddens the border/glow and the shared glitch engine — for destructive confirmations. */
  tone?: ModalTone
  /** Plays the 1.5s fullscreen pre-modal screen-tear before the dialog appears, matching the reference exactly. Turn off for routine, frequent modals. */
  glitchIntro?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  /** Action row — layout (row, stacked, full-width) is entirely up to what you put in here. */
  footer?: ReactNode
  children: ReactNode
}

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
}

const DIALOG_TONE_CLASSES: Record<ModalTone, string> = {
  default: 'border-slate-900 dark:border-white shadow-2xl',
  alert: 'border-brand-alert shadow-[0_0_30px_rgba(255,0,60,0.15)]',
}

const GLITCH_INTRO_MS = 1500

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

type Phase = 'closed' | 'tearing' | 'open'

export function Modal({
  open,
  onClose,
  title,
  size = 'md',
  tone = 'default',
  glitchIntro = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  footer,
  children,
}: ModalProps) {
  const [phase, setPhase] = useState<Phase>('closed')
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) {
      setPhase('closed')
      return
    }
    if (!glitchIntro) {
      setPhase('open')
      return
    }
    setPhase('tearing')
    const timer = setTimeout(() => setPhase('open'), GLITCH_INTRO_MS)
    return () => clearTimeout(timer)
  }, [open, glitchIntro])

  useEffect(() => {
    if (phase === 'closed') return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'open') return

    previousFocusRef.current = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (closeOnEscape && event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [phase, closeOnEscape, onClose])

  if (phase === 'closed') return null

  return createPortal(
    <>
      {phase === 'tearing' && (
        <div
          className="animate-screen-tear fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-slate-900/90 dark:bg-brand-dark/95"
          aria-hidden="true"
        >
          <div className="absolute left-0 top-[20%] h-4 w-full bg-brand-primary/50 mix-blend-overlay" />
          <div className="absolute left-0 top-[70%] h-8 w-full bg-brand-secondary/50 mix-blend-overlay" />
          <div className="absolute right-0 top-[40%] h-1 w-1/2 bg-white" />
          <div className="absolute left-[20%] top-[10%] h-2 w-[30%] bg-brand-primary mix-blend-overlay" />
          <div className="absolute bottom-[20%] right-[10%] h-3 w-[40%] bg-brand-secondary mix-blend-overlay" />
        </div>
      )}

      {phase === 'open' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="animate-backdrop-enter absolute inset-0 bg-slate-900/60 backdrop-blur-sm dark:bg-black/80"
            onClick={closeOnBackdropClick ? onClose : undefined}
            aria-hidden="true"
          />

          <CyberFx tone={tone} className={`flex w-full ${SIZE_CLASSES[size]}`}>
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId : undefined}
              tabIndex={-1}
              className={`animate-modal-enter relative z-10 flex w-full flex-col rounded-xl border-2 bg-white dark:bg-brand-darkSurface ${DIALOG_TONE_CLASSES[tone]}`}
            >
              {title && (
                <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
                  <h2 id={titleId} className="text-lg font-bold">
                    {title}
                  </h2>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="text-slate-400 transition-colors hover:text-brand-secondary"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              <div className="p-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{children}</div>

              {footer && (
                <div className="rounded-b-xl border-t border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/50">
                  {footer}
                </div>
              )}
            </div>
          </CyberFx>
        </div>
      )}
    </>,
    document.body,
  )
}
