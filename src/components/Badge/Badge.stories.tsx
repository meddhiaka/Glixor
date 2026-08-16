import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badges',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'alert', 'warning', 'success'],
    },
    look: {
      control: 'select',
      options: ['pill', 'outline', 'solid', 'micro'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
    },
    chamfer: {
      control: 'select',
      options: ['none', 'chamfer', 'chamfer-tl-br', 'tag'],
    },
  },
  args: {
    children: 'Active',
    variant: 'default',
    look: 'pill',
    size: 'sm',
    chamfer: 'none',
    glitch: false,
    dot: false,
    pulse: false,
    bracket: false,
    rounded: false,
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const StatusActive: Story = {
  args: { look: 'pill', variant: 'success', dot: true, children: 'Active' },
}

export const StatusOffline: Story = {
  args: { look: 'pill', variant: 'default', dot: true, children: 'Offline' },
}

export const StatusAlert: Story = {
  args: { look: 'pill', variant: 'alert', dot: true, pulse: true, children: 'Alert' },
}

export const StatusWarning: Story = {
  args: { look: 'pill', variant: 'warning', dot: true, children: 'Warning' },
}

export const OutlineDefault: Story = {
  args: { look: 'outline', variant: 'default', glitch: true, children: 'Default' },
}

export const OutlinePrimary: Story = {
  args: { look: 'outline', variant: 'primary', glitch: true, children: 'Primary_Node' },
}

export const OutlineSecondary: Story = {
  args: { look: 'outline', variant: 'secondary', glitch: true, children: 'Secondary_Sec' },
}

export const SolidDefault: Story = {
  args: { look: 'solid', variant: 'default', children: 'Core_SYS' },
}

export const SolidPrimary: Story = {
  args: { look: 'solid', variant: 'primary', dot: true, children: 'Verified' },
}

export const SolidSecondary: Story = {
  args: { look: 'solid', variant: 'secondary', rounded: true, children: 'Beta_v2' },
}

export const SolidAlert: Story = {
  args: { look: 'solid', variant: 'alert', chamfer: 'tag', children: '⚠ Blocked' },
}

export const Micro: Story = {
  args: { look: 'micro', variant: 'default', size: 'xs', children: 'v3.9.4' },
}

export const MicroPrimary: Story = {
  args: { look: 'micro', variant: 'primary', size: 'xs', children: 'NEW' },
}

export const Bracket: Story = {
  args: { bracket: true, variant: 'secondary', children: 'PRO' },
}

export const DotTag: Story = {
  args: { look: 'micro', variant: 'primary', size: 'xs', dot: true, children: 'Updated' },
}

export const AllStatuses: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge {...args} variant="success" dot>
        Active
      </Badge>
      <Badge {...args} variant="default" dot>
        Offline
      </Badge>
      <Badge {...args} variant="alert" dot pulse>
        Alert
      </Badge>
      <Badge {...args} variant="warning" dot>
        Warning
      </Badge>
    </div>
  ),
}
