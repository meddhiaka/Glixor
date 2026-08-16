import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
  title: 'Components/Buttons',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'alert'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    chamfer: {
      control: 'select',
      options: ['none', 'chamfer', 'chamfer-tl-br', 'tag'],
    },
  },
  args: {
    children: 'EXECUTE_PROTOCOL',
    variant: 'primary',
    size: 'md',
    chamfer: 'none',
    glitch: true,
    loading: false,
    disabled: false,
    fullWidth: false,
    iconOnly: false,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary', children: 'PRIMARY_SOLID' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'SECONDARY_TAG' },
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'PRIMARY_VERIFIED' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', glitch: false, size: 'sm', children: 'TAG_SM' },
}

export const Alert: Story = {
  args: { variant: 'alert', children: 'SECONDARY_ALERT' },
}

export const Chamfered: Story = {
  args: { variant: 'primary', chamfer: 'chamfer-tl-br', size: 'lg', children: 'EXECUTE_PROTOCOL >>' },
}

export const TagCut: Story = {
  args: { variant: 'secondary', chamfer: 'tag', children: 'SECONDARY_TAG >' },
}

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'DECRYPTING...' },
}

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: 'SIGNAL_OFFLINE' },
}

export const WithIcons: Story = {
  args: {
    variant: 'primary',
    leftIcon: <span aria-hidden="true">✓</span>,
    rightIcon: <span aria-hidden="true">→</span>,
    children: 'VERIFIED',
  },
}

export const IconOnly: Story = {
  args: {
    variant: 'ghost',
    chamfer: 'chamfer',
    iconOnly: true,
    children: '⚙',
    'aria-label': 'Settings',
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="xs">
        XS
      </Button>
      <Button {...args} size="sm">
        SM
      </Button>
      <Button {...args} size="md">
        MD
      </Button>
      <Button {...args} size="lg">
        LG
      </Button>
    </div>
  ),
}
