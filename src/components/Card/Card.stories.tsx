import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardMedia, CardTitle, CardDescription, CardFooter } from './Card'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'

const meta = {
  title: 'Components/Cards',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    surface: {
      control: 'select',
      options: ['transparent', 'default', 'secondary', 'tertiary'],
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rounded: {
      control: 'select',
      options: ['lg', 'xl', '2xl'],
    },
  },
  args: {
    children: 'Card content',
    surface: 'default',
    padding: 'md',
    rounded: '2xl',
    glitch: true,
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const ProfileCard: Story = {
  render: (args) => (
    <Card {...args} className="max-w-xs">
      <CardMedia>🌵</CardMedia>
      <div>
        <CardTitle>Indie Hackers</CardTitle>
        <CardDescription>148 members</CardDescription>
      </div>
      <CardFooter>
        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-red-400 to-amber-500 shadow-sm" />
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">By Martha</span>
      </CardFooter>
    </Card>
  ),
}

export const ProfileGrid: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <div className="grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
      <Card {...args}>
        <CardMedia>🌵</CardMedia>
        <div>
          <CardTitle>Indie Hackers</CardTitle>
          <CardDescription>148 members</CardDescription>
        </div>
        <CardFooter>
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-red-400 to-amber-500 shadow-sm" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">By Martha</span>
        </CardFooter>
      </Card>
      <Card {...args}>
        <CardMedia>👩‍💻</CardMedia>
        <div>
          <CardTitle>AI Builders</CardTitle>
          <CardDescription>362 members</CardDescription>
        </div>
        <CardFooter>
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-sm" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">By John</span>
        </CardFooter>
      </Card>
    </div>
  ),
}

export const LoginCard: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Card padding="lg" className="max-w-md">
      <div>
        <CardTitle as="h2" size="lg">
          Login
        </CardTitle>
        <CardDescription className="mt-1 text-sm">
          Enter your credentials to access your account
        </CardDescription>
      </div>
      <div className="space-y-5">
        <Input label="Email" type="email" placeholder="email@example.com" />
        <Input label="Password" type="password" placeholder="••••••••" />
      </div>
      <Button fullWidth>SIGN_IN</Button>
      <div className="pt-2 text-center">
        <a
          href="#"
          className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-primary dark:text-slate-400"
        >
          Forgot password?
        </a>
      </div>
    </Card>
  ),
}

export const SurfaceTransparent: Story = {
  render: (args) => (
    <Card {...args} surface="transparent" padding="sm" rounded="xl" className="max-w-sm">
      <CardTitle size="sm">Transparent</CardTitle>
      <CardDescription>Minimal prominence with transparent background</CardDescription>
    </Card>
  ),
}

export const SurfaceDefault: Story = {
  render: (args) => (
    <Card {...args} surface="default" padding="sm" rounded="xl" className="max-w-sm">
      <CardTitle size="sm">Default</CardTitle>
      <CardDescription>Standard card appearance</CardDescription>
    </Card>
  ),
}

export const SurfaceSecondary: Story = {
  render: (args) => (
    <Card {...args} surface="secondary" padding="sm" rounded="xl" className="max-w-sm">
      <CardTitle size="sm">Secondary</CardTitle>
      <CardDescription>Medium prominence</CardDescription>
    </Card>
  ),
}

export const SurfaceTertiary: Story = {
  render: (args) => (
    <Card {...args} surface="tertiary" padding="sm" rounded="xl" className="max-w-sm">
      <CardTitle size="sm">Tertiary</CardTitle>
      <CardDescription>Higher prominence</CardDescription>
    </Card>
  ),
}
