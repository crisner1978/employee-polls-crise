import { fireEvent, screen } from '@testing-library/react'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '../pages'
import { renderWithProviders } from './test-utils'


describe('Home Page unit tests', () => {
  it('renders the home page', () => {
    renderWithProviders(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByText('New Questions')).toBeInTheDocument()
  })
  it('test toggle button on Home Page', async() => {
    renderWithProviders(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    const toggleButton = screen.getByTestId('toggle-button')
    fireEvent.click(toggleButton)
    expect(toggleButton).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })
})
