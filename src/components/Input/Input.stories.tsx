import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'
import { CyberFx } from '../CyberFx'

const meta = {
  title: 'Components/Inputs',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    look: {
      control: 'select',
      options: ['default', 'subtle', 'outline', 'flushed'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
  args: {
    placeholder: 'Enter your email',
    look: 'default',
    size: 'md',
    glitch: true,
    required: false,
    fullWidth: false,
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  args: { label: 'Email', type: 'email' },
}

export const Subtle: Story = {
  args: { look: 'subtle', placeholder: 'Subtle' },
}

export const Outline: Story = {
  args: { look: 'outline', placeholder: 'Outline' },
}

export const Flushed: Story = {
  args: { look: 'flushed', placeholder: 'Flushed' },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Input {...args} size="xs" placeholder="size (xs)" />
      <Input {...args} size="sm" placeholder="size (sm)" />
      <Input {...args} size="md" placeholder="size (md)" />
      <Input {...args} size="lg" placeholder="size (lg)" />
    </div>
  ),
}

export const ErrorState: Story = {
  args: {
    label: 'Email',
    required: true,
    type: 'email',
    defaultValue: 'not-an-email',
    error: 'This field is required',
  },
}

export const WithHint: Story = {
  args: { label: 'Username', hint: 'Letters, numbers and underscores only' },
}

export const SearchWithShortcut: Story = {
  args: {
    placeholder: 'Search contacts',
    leftIcon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth={2.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    rightAdornment: (
      <kbd className="border border-brand-primary bg-slate-900 px-2 py-1 text-[10px] font-black tracking-widest text-brand-primary dark:bg-brand-dark">
        ⌘K
      </kbd>
    ),
  },
}

export const SegmentedCard: Story = {
  render: () => (
    <CyberFx>
      <div className="relative z-10 border-2 border-slate-900 bg-white transition-colors focus-within:border-brand-primary dark:border-white dark:bg-brand-darkInput">
        <div className="flex items-center border-b-2 border-slate-900 dark:border-white">
          <Input bare placeholder="Card number" size="md" className="tracking-wider" />
          <div className="pr-4 text-brand-primary dark:text-brand-secondary">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="5" width="20" height="14" strokeWidth={2} />
              <line x1="2" y1="10" x2="22" y2="10" strokeWidth={2} />
            </svg>
          </div>
        </div>
        <div className="flex items-center divide-x-2 divide-slate-900 dark:divide-white">
          <div className="w-1/2">
            <Input bare placeholder="MM/YY" size="md" />
          </div>
          <div className="relative w-1/2">
            <Input bare placeholder="CVC" size="md" />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-brand-primary">
              [3_DIG]
            </span>
          </div>
        </div>
      </div>
    </CyberFx>
  ),
}
