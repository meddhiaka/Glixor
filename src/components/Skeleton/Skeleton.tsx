import type { HTMLAttributes } from 'react'

export type SkeletonVariant = 'laser' | 'bitmap' | 'stripes' | 'hazard'
export type SkeletonRounding = 'none' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Sweep treatment layered over the block. Width/height are entirely up to `className` (e.g. `h-3 w-2/3`). */
  variant?: SkeletonVariant
  rounded?: SkeletonRounding
}

const VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  laser: 'skel-laser',
  bitmap: 'skel-bitmap',
  stripes: 'skel-stripes',
  hazard: 'skel-hazard',
}

const ROUNDED_CLASSES: Record<SkeletonRounding, string> = {
  none: 'rounded-none',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
}

export function Skeleton({ variant = 'laser', rounded = 'md', className = '', ...rest }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={['skel-block', ROUNDED_CLASSES[rounded], VARIANT_CLASSES[variant], className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  )
}
