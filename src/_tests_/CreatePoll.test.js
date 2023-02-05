import { fireEvent, screen } from '@testing-library/react'
import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import CreatePoll from '../pages/CreatePoll'
import { renderWithProviders } from './test-utils'

describe('CreatePoll unit tests', () => {
  test('renders Create Poll', () => {
    renderWithProviders(
      <MemoryRouter>
        <CreatePoll />
      </MemoryRouter>
    )
    expect(screen.getByText(/Create Your Own Poll/i)).toBeInTheDocument()
  })
  it('will show error message if both options have no input', async () => {
    const promise = Promise.resolve()
    renderWithProviders(
      <MemoryRouter>
        <CreatePoll />
      </MemoryRouter>
    )
    var submitButton = screen.getByRole('button', {
      name: /submit question/i,
    })
    fireEvent.click(submitButton)
    jest.setTimeout(10000)
    var errorMessage = screen.queryAllByTestId('error-message')
    expect(errorMessage).toBeTruthy()
    await act(() => promise)
  })
})
