import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Components/Skeletons',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['laser', 'bitmap', 'stripes', 'hazard'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'md', 'lg', 'xl', '2xl', 'full'],
    },
  },
  args: {
    variant: 'laser',
    rounded: 'md',
    className: 'h-3 w-48',
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Laser: Story = {
  args: { variant: 'laser' },
}

export const Bitmap: Story = {
  args: { variant: 'bitmap' },
}

export const Stripes: Story = {
  args: { variant: 'stripes' },
}

export const Hazard: Story = {
  args: { variant: 'hazard' },
}

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Skeleton {...args} variant="laser" />
      <Skeleton {...args} variant="bitmap" />
      <Skeleton {...args} variant="stripes" />
      <Skeleton {...args} variant="hazard" />
    </div>
  ),
}

export const CompactCards: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {[0, 1].map((i) => (
        <div key={i} className="flex w-64 flex-col gap-3">
          <div className="flex items-center gap-3">
            <Skeleton variant="laser" rounded="lg" className="h-8 w-8 shrink-0" />
            <div className="flex w-full flex-col gap-1.5">
              <Skeleton variant="laser" className="h-2.5 w-3/4" />
              <Skeleton variant="laser" className="h-2 w-1/2 opacity-60" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Skeleton variant="laser" className="h-2 w-full" />
            <Skeleton variant="laser" className="h-2 w-full" />
            <Skeleton variant="laser" className="h-2 w-2/3" />
          </div>
          <Skeleton variant="laser" className="mt-1 h-6 w-full" />
        </div>
      ))}
    </div>
  ),
}

export const StandardBlock: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex max-w-md flex-col gap-5">
      <div className="flex items-center gap-4">
        <Skeleton variant="bitmap" rounded="xl" className="h-12 w-12 shrink-0" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton variant="bitmap" className="h-3.5 w-2/5" />
          <Skeleton variant="bitmap" className="h-2.5 w-1/4 opacity-60" />
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <Skeleton variant="bitmap" className="h-2.5 w-full" />
        <Skeleton variant="bitmap" className="h-2.5 w-5/6" />
        <Skeleton variant="bitmap" className="h-2.5 w-4/6" />
      </div>
      <Skeleton variant="bitmap" rounded="lg" className="mt-2 h-8 w-28" />
    </div>
  ),
}

export const HorizontalList: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex max-w-2xl flex-col items-start gap-6 sm:flex-row sm:items-center">
      <Skeleton variant="stripes" rounded="2xl" className="h-16 w-16 shrink-0" />
      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Skeleton variant="stripes" className="h-3.5 w-1/3" />
          <Skeleton variant="stripes" className="h-2.5 w-1/4 opacity-60" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton variant="stripes" className="h-2.5 w-full max-w-md" />
          <Skeleton variant="stripes" className="h-2.5 w-4/5 max-w-sm" />
          <Skeleton variant="stripes" className="h-2.5 w-3/5 max-w-xs" />
        </div>
      </div>
      <Skeleton variant="stripes" rounded="lg" className="h-10 w-full shrink-0 sm:w-32" />
    </div>
  ),
}

export const HeroFeatured: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Skeleton variant="hazard" rounded="2xl" className="h-40 w-full sm:h-64" />
        <div className="mt-2 flex w-full flex-col gap-3">
          <Skeleton variant="hazard" className="h-5 w-3/4 sm:w-1/2" />
          <Skeleton variant="hazard" className="h-3.5 w-1/2 opacity-60 sm:w-1/3" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton variant="hazard" className="h-3 w-full" />
        <Skeleton variant="hazard" className="h-3 w-11/12" />
        <Skeleton variant="hazard" className="h-3 w-4/5" />
      </div>
      <Skeleton variant="hazard" rounded="xl" className="mt-4 h-12 w-full sm:w-48" />
    </div>
  ),
}
