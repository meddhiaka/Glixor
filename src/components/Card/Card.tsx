import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { CyberFx } from '../CyberFx'

export type CardSurface = 'transparent' | 'default' | 'secondary' | 'tertiary'
export type CardPadding = 'sm' | 'md' | 'lg'
export type CardRounding = 'lg' | 'xl' | '2xl'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Elevation tier, from foundations.md's surface hierarchy:
   * - transparent: dashed border, solidifies to brand-primary on hover — least prominent, nested content
   * - default: solid border + base surface — the standard card
   * - secondary: no border, mid-tone surface, brand-primary border on hover
   * - tertiary: no border, highest-contrast surface, brand-secondary border on hover
   */
  surface?: CardSurface
  /** Padding scale — also drives the vertical rhythm between direct children. */
  padding?: CardPadding
  rounded?: CardRounding
  /** Wraps the card in the shared .cyber-fx glitch engine. */
  glitch?: boolean
  children: ReactNode
}

const SURFACE_CLASSES: Record<CardSurface, string> = {
  transparent:
    'border-2 border-dashed border-slate-300 bg-transparent hover:border-solid hover:border-brand-primary dark:border-slate-700',
  default: 'border-2 border-slate-900 bg-brand-lightSurface dark:border-white dark:bg-brand-darkSurface',
  secondary:
    'border-2 border-transparent bg-brand-lightSurfaceSub hover:border-brand-primary dark:bg-brand-darkSurfaceSub',
  tertiary:
    'border-2 border-transparent bg-brand-lightSurfaceTert hover:border-brand-secondary dark:bg-brand-darkSurfaceTert',
}

const PADDING_CLASSES: Record<CardPadding, string> = {
  sm: 'p-5 space-y-3',
  md: 'p-6 space-y-4',
  lg: 'p-8 space-y-6',
}

const ROUNDED_CLASSES: Record<CardRounding, string> = {
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
}

export function Card({
  surface = 'default',
  padding = 'md',
  rounded = '2xl',
  glitch = true,
  className = '',
  children,
  ...rest
}: CardProps) {
  const boxClasses = [
    'relative z-10 w-full transition-colors',
    PADDING_CLASSES[padding],
    ROUNDED_CLASSES[rounded],
    SURFACE_CLASSES[surface],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const box = (
    <div className={boxClasses} {...rest}>
      {children}
    </div>
  )

  if (!glitch) return box

  return <CyberFx className="flex w-full">{box}</CyberFx>
}

export type CardMediaSize = 'sm' | 'md' | 'lg'
export type CardMediaShape = 'square' | 'rounded' | 'circle'

export interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
  size?: CardMediaSize
  shape?: CardMediaShape
  children: ReactNode
}

const MEDIA_SIZE_CLASSES: Record<CardMediaSize, string> = {
  sm: 'h-12 w-12 text-xl',
  md: 'h-16 w-16 text-2xl',
  lg: 'h-20 w-20 text-3xl',
}

const MEDIA_SHAPE_CLASSES: Record<CardMediaShape, string> = {
  square: 'rounded-none',
  rounded: 'rounded-2xl',
  circle: 'rounded-full',
}

export function CardMedia({ size = 'md', shape = 'rounded', className = '', children, ...rest }: CardMediaProps) {
  return (
    <div
      className={[
        'flex items-center justify-center border border-slate-200 bg-slate-100 shadow-inner dark:border-slate-700 dark:bg-slate-800',
        MEDIA_SIZE_CLASSES[size],
        MEDIA_SHAPE_CLASSES[shape],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}

export type CardTitleSize = 'sm' | 'base' | 'lg'

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level — pick based on the surrounding document outline, not visual size. */
  as?: 'h2' | 'h3' | 'h4'
  size?: CardTitleSize
  children: ReactNode
}

const TITLE_SIZE_CLASSES: Record<CardTitleSize, string> = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-xl',
}

export function CardTitle({ as = 'h3', size = 'base', className = '', children, ...rest }: CardTitleProps) {
  const Tag: ElementType = as
  return (
    <Tag
      className={['font-bold text-slate-900 dark:text-white', TITLE_SIZE_CLASSES[size], className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

export function CardDescription({ className = '', children, ...rest }: CardDescriptionProps) {
  return (
    <p className={['text-xs text-slate-500 dark:text-slate-400', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </p>
  )
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function CardFooter({ className = '', children, ...rest }: CardFooterProps) {
  return (
    <div className={['flex items-center gap-2 pt-1', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}
