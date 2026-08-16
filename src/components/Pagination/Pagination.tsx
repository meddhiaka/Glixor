import { useEffect, useState } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { CyberFx } from '../CyberFx'
import { Spinner } from '../Spinner'

interface PaginationBaseProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function ChevronLeftIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`h-3.5 w-3.5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="square" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`h-3.5 w-3.5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="square" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function getPageRange(current: number, total: number, siblingCount: number): (number | 'ellipsis')[] {
  const windowSize = siblingCount * 2 + 5
  if (total <= windowSize) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(current - siblingCount, 1)
  const rightSibling = Math.min(current + siblingCount, total)
  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < total - 1

  const pages: (number | 'ellipsis')[] = [1]
  if (showLeftEllipsis) pages.push('ellipsis')
  for (let page = Math.max(leftSibling, 2); page <= Math.min(rightSibling, total - 1); page++) {
    pages.push(page)
  }
  if (showRightEllipsis) pages.push('ellipsis')
  if (total > 1) pages.push(total)
  return pages
}

function PageButton({
  page,
  active,
  glitch,
  onClick,
}: {
  page: number
  active: boolean
  glitch: boolean
  onClick: () => void
}) {
  const button = (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={[
        'relative z-10 flex h-8 w-8 items-center justify-center border-2 text-xs transition-colors',
        active
          ? 'border-brand-primary bg-transparent font-black text-slate-900 dark:text-white'
          : 'border-transparent font-bold text-slate-600 hover:border-slate-900 hover:text-slate-900 dark:text-slate-400 dark:hover:border-white dark:hover:text-white',
      ].join(' ')}
    >
      {page}
    </button>
  )
  if (!glitch) return button
  return <CyberFx active={active}>{button}</CyberFx>
}

export interface PaginationProps extends PaginationBaseProps {
  /** Total item count — combined with `pageSize`, renders the "Showing X-Y of Z results" summary. */
  totalItems?: number
  pageSize?: number
  /** How many page numbers to show on each side of the current page before collapsing into an ellipsis. */
  siblingCount?: number
  glitch?: boolean
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  siblingCount = 1,
  glitch = true,
  className = '',
}: PaginationProps) {
  const pages = getPageRange(currentPage, totalPages, siblingCount)

  const start = pageSize !== undefined ? (currentPage - 1) * pageSize + 1 : undefined
  const end = pageSize !== undefined && totalItems !== undefined ? Math.min(currentPage * pageSize, totalItems) : undefined

  return (
    <div
      className={[
        'flex flex-col items-center justify-between gap-4 border-2 border-slate-900 bg-brand-lightSurface p-5 font-mono dark:border-white dark:bg-brand-darkSurface sm:flex-row',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {totalItems !== undefined && start !== undefined && end !== undefined && (
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Showing <span className="text-brand-primary">{start}-{end}</span> of{' '}
          <span className="text-brand-secondary">{totalItems}</span> results
        </div>
      )}

      <nav className="flex items-center gap-2" aria-label="Pagination">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-900 transition-colors hover:text-brand-primary disabled:cursor-not-allowed disabled:text-slate-400 disabled:opacity-50 disabled:hover:text-slate-400 dark:text-white dark:disabled:text-slate-600"
        >
          <ChevronLeftIcon />
          Prev
        </button>

        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-8 w-6 items-center justify-center text-xs font-bold tracking-widest text-slate-500"
            >
              ...
            </span>
          ) : (
            <PageButton key={page} page={page} active={page === currentPage} glitch={glitch} onClick={() => onPageChange(page)} />
          ),
        )}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="group flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-900 transition-colors hover:text-brand-primary disabled:cursor-not-allowed disabled:text-slate-400 disabled:opacity-50 dark:text-white dark:disabled:text-slate-600"
        >
          Next
          <ChevronRightIcon className="transition-transform group-hover:translate-x-1" />
        </button>
      </nav>
    </div>
  )
}

export interface PaginationStepperProps extends PaginationBaseProps {
  glitch?: boolean
  className?: string
}

export function PaginationStepper({
  currentPage,
  totalPages,
  onPageChange,
  glitch = true,
  className = '',
}: PaginationStepperProps) {
  const prev = (
    <button
      type="button"
      disabled={currentPage <= 1}
      onClick={() => onPageChange(currentPage - 1)}
      className="relative z-10 flex items-center gap-2 border-2 border-slate-900 bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-900 transition-colors hover:bg-slate-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-900 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900"
    >
      <ChevronLeftIcon className="h-3 w-3" />
      Prev
    </button>
  )
  const next = (
    <button
      type="button"
      disabled={currentPage >= totalPages}
      onClick={() => onPageChange(currentPage + 1)}
      className="relative z-10 flex items-center gap-2 border-2 border-slate-900 bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-900 transition-colors hover:bg-slate-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-900 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900"
    >
      Next
      <ChevronRightIcon className="h-3 w-3" />
    </button>
  )

  return (
    <div
      className={[
        'flex max-w-md items-center justify-between border-2 border-slate-900 bg-brand-lightSurface p-4 font-mono dark:border-white dark:bg-brand-darkSurface',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {glitch ? <CyberFx>{prev}</CyberFx> : prev}
      <div className="px-4 text-xs font-bold uppercase tracking-widest text-slate-500">
        Page <span className="font-black text-slate-900 dark:text-white">{currentPage}</span> of {totalPages}
      </div>
      {glitch ? <CyberFx>{next}</CyberFx> : next}
    </div>
  )
}

export interface PaginationJumpToProps extends PaginationBaseProps {
  glitch?: boolean
  className?: string
}

export function PaginationJumpTo({
  currentPage,
  totalPages,
  onPageChange,
  glitch = true,
  className = '',
}: PaginationJumpToProps) {
  const [value, setValue] = useState(String(currentPage))

  useEffect(() => {
    setValue(String(currentPage))
  }, [currentPage])

  function commit() {
    const parsed = Number.parseInt(value, 10)
    if (Number.isFinite(parsed)) {
      const clamped = Math.min(Math.max(parsed, 1), totalPages)
      onPageChange(clamped)
      setValue(String(clamped))
    } else {
      setValue(String(currentPage))
    }
  }

  const inputBox = (
    <div className="relative z-10 flex items-center border-2 border-slate-900 bg-white transition-colors focus-within:border-brand-primary dark:border-white dark:bg-brand-darkSurface">
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') event.currentTarget.blur()
        }}
        aria-label={`Page, ${totalPages} total`}
        className="w-12 bg-transparent py-1.5 text-center text-sm font-bold text-slate-900 focus:outline-none dark:text-white"
      />
    </div>
  )

  return (
    <div className={['flex items-center gap-2 font-mono', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center border-2 border-slate-300 text-slate-500 transition-colors hover:border-brand-primary hover:text-brand-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
      >
        <ChevronLeftIcon />
      </button>

      {glitch ? <CyberFx>{inputBox}</CyberFx> : inputBox}

      <span className="px-2 text-xs font-bold tracking-widest text-slate-500">/ {totalPages}</span>

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center border-2 border-slate-300 text-slate-900 transition-colors hover:border-brand-primary hover:text-brand-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-white"
      >
        <ChevronRightIcon />
      </button>
    </div>
  )
}

export interface PaginationLoadMoreProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  glitch?: boolean
  children?: ReactNode
}

export function PaginationLoadMore({
  loading = false,
  glitch = true,
  className = '',
  children = 'Load More Data Nodes',
  disabled = false,
  ...rest
}: PaginationLoadMoreProps) {
  const isDisabled = disabled || loading

  const button = (
    <button
      type="button"
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={[
        'relative z-10 flex w-full items-center justify-center gap-3 border-2 border-dashed border-slate-900 bg-transparent px-6 py-3 font-mono text-xs font-black uppercase tracking-widest text-slate-900 transition-all hover:border-solid hover:border-brand-primary hover:text-brand-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-dashed disabled:hover:border-slate-900 disabled:hover:text-slate-900 dark:border-white dark:text-white dark:disabled:hover:border-white dark:disabled:hover:text-white',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {loading ? (
        <Spinner />
      ) : (
        <svg className="h-4 w-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      )}
      {children}
    </button>
  )

  if (!glitch) return button
  return <CyberFx className="flex w-full">{button}</CyberFx>
}
