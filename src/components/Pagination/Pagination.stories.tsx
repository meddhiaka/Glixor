import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination, PaginationStepper, PaginationJumpTo, PaginationLoadMore } from './Pagination'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    currentPage: 1,
    totalPages: 12,
    onPageChange: () => {},
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

function StandardDemo() {
  const [page, setPage] = useState(1)
  return (
    <div className="w-[600px]">
      <Pagination currentPage={page} totalPages={12} totalItems={120} pageSize={10} onPageChange={setPage} />
    </div>
  )
}

export const Standard: Story = {
  render: () => <StandardDemo />,
}

function MiddleOfRangeDemo() {
  const [page, setPage] = useState(6)
  return (
    <div className="w-[600px]">
      <Pagination currentPage={page} totalPages={20} totalItems={200} pageSize={10} onPageChange={setPage} />
    </div>
  )
}

export const MiddleOfRange: Story = {
  render: () => <MiddleOfRangeDemo />,
}

function StepperDemo() {
  const [page, setPage] = useState(4)
  return <PaginationStepper currentPage={page} totalPages={12} onPageChange={setPage} />
}

export const Stepper: Story = {
  render: () => <StepperDemo />,
}

function JumpToDemo() {
  const [page, setPage] = useState(4)
  return <PaginationJumpTo currentPage={page} totalPages={12} onPageChange={setPage} />
}

export const JumpTo: Story = {
  render: () => <JumpToDemo />,
}

export const LoadMore: Story = {
  render: () => (
    <div className="w-96">
      <PaginationLoadMore />
    </div>
  ),
}

export const LoadMoreLoading: Story = {
  render: () => (
    <div className="w-96">
      <PaginationLoadMore loading>Loading...</PaginationLoadMore>
    </div>
  ),
}
