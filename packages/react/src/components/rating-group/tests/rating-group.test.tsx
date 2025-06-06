import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { WithField } from '../examples/with-field'
import { ComponentUnderTest } from './basic'

describe('Rating Group', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should apply default value', async () => {
    render(<ComponentUnderTest defaultValue={2} count={5} />)

    const input = screen.getByRole('textbox', { hidden: true })

    expect(input).toHaveValue('2')
  })

  it('should apply value', async () => {
    render(<ComponentUnderTest value={1} defaultValue={2} count={5} />)

    const input = screen.getByRole('textbox', { hidden: true })

    expect(input).toHaveValue('1')
  })

  it('should trigger onValueChange on click', async () => {
    const onValueChange = vi.fn()
    render(<ComponentUnderTest value={1} onValueChange={onValueChange} count={5} />)

    const maxStarRadio = screen.getByRole('radio', { name: '5 stars' })
    fireEvent.click(maxStarRadio)

    await waitFor(() => expect(onValueChange).toHaveBeenNthCalledWith(1, { value: 5 }))
  })

  it('should update rating on click', async () => {
    render(<ComponentUnderTest defaultValue={0} count={5} />)

    const input = screen.getByRole('textbox', { hidden: true })
    const maxStarRadio = screen.getByRole('radio', { name: '5 stars' })
    fireEvent.click(maxStarRadio)

    await waitFor(() => expect(input).toHaveValue('5'))
  })
})

describe('Rating Group / Field', () => {
  it('should set rating group as required', async () => {
    render(<WithField required />)
    expect(screen.getByRole('textbox', { hidden: true })).toBeRequired()
  })

  it('should set rating group as disabled', async () => {
    render(<WithField disabled />)
    expect(screen.getByRole('textbox', { hidden: true })).toBeDisabled()
  })

  it('should set rating group as readonly', async () => {
    render(<WithField readOnly />)
    expect(screen.getByRole('textbox', { hidden: true })).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(<WithField />)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(<WithField invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on rating group when label is clicked', async () => {
    render(<WithField />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('radio', { name: /3 stars/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(<WithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
