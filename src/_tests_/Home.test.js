import { screen } from '@testing-library/react'
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
  it('renders Done section', () => {
    renderWithProviders(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByText('Done')).toBeInTheDocument()
  })
})
