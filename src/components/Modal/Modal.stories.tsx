import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from './Modal'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'

const meta = {
  title: 'Components/Modals',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    open: false,
    onClose: () => {},
    children: null,
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

function StandardModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Standard Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="System Update Available"
        size="lg"
        footer={
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Cancel
            </button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Initialize
            </Button>
          </div>
        }
      >
        <p>
          A new firmware version <span className="font-mono font-bold text-brand-primary">v3.1.4</span> is
          ready to be installed. This update contains critical stability improvements for your neural link
          connection.
        </p>
      </Modal>
    </>
  )
}

export const Standard: Story = {
  render: () => <StandardModalDemo />,
}

function FormModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Form Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 bg-brand-primary" aria-hidden="true" />
            Configure Node
          </span>
        }
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Cancel
            </button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Save Params
            </Button>
          </div>
        }
      >
        <div className="space-y-5">
          <Input label="Node Alias" placeholder="e.g. Alpha-Sector" />
          <Input label="Access Key" type="password" placeholder="••••••••" />
        </div>
      </Modal>
    </>
  )
}

export const WithForm: Story = {
  render: () => <FormModalDemo />,
}

function DangerModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="alert" onClick={() => setOpen(true)}>
        ⚠ Danger Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size="sm"
        tone="alert"
        footer={
          <div className="flex flex-col gap-3">
            <Button variant="alert" fullWidth onClick={() => setOpen(false)}>
              Yes, Purge Data
            </Button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Cancel Process
            </button>
          </div>
        }
      >
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-brand-alert dark:bg-red-500/20">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Purge Core Data?</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              This action is irreversible. All cached memory and neural link protocols will be destroyed.
            </p>
          </div>
        </div>
      </Modal>
    </>
  )
}

export const Danger: Story = {
  render: () => <DangerModalDemo />,
}

function NoIntroModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Instantly</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Quick Confirm"
        glitchIntro={false}
        footer={
          <div className="flex justify-end gap-3">
            <Button size="sm" onClick={() => setOpen(false)}>
              Got it
            </Button>
          </div>
        }
      >
        <p>Frequent, routine modals should skip the 1.5s glitch intro — set glitchIntro to false.</p>
      </Modal>
    </>
  )
}

export const WithoutGlitchIntro: Story = {
  render: () => <NoIntroModalDemo />,
}
