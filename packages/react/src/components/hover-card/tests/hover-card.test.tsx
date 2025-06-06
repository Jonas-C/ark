import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic'

describe('HoverCard', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should open on hover', async () => {
    render(<ComponentUnderTest />)

    const target = screen.getByText('Hover me')
    await user.hover(target)

    const hoverContent = screen.getByText('Content')
    await waitFor(() => expect(hoverContent).toBeVisible())

    await user.unhover(target)
    await waitFor(() => expect(hoverContent).not.toBeVisible())
  })

  it('should invoke onOpenChange', async () => {
    const onOpenChange = vi.fn()
    render(<ComponentUnderTest onOpenChange={onOpenChange} />)

    await user.hover(screen.getByText('Hover me'))

    await waitFor(() => expect(screen.getByText('Content')).toBeVisible())
    expect(onOpenChange).toHaveBeenCalledTimes(1)
  })

  it('should lazy mount', async () => {
    render(<ComponentUnderTest lazyMount />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.hover(screen.getByText('Hover me'))
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeInTheDocument())
  })

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.hover(screen.getByText('Hover me'))
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeInTheDocument())

    await user.unhover(screen.getByText('Hover me'))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })

  it('should open by default', async () => {
    render(<ComponentUnderTest defaultOpen />)

    const hoverContent = screen.getByText('Content')
    await waitFor(() => expect(hoverContent).toBeVisible())
  })
})
