import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import SignUp from '../pages/SignUp'

describe('SignUp', () => {
  it('will match snapshot', () => {
    var view = render(<SignUp />)
    expect(view).toMatchSnapshot()
  })
})

describe('SignUp Events', () => {
  it('will display an error message if username is less than 5 characters', async() => {
    render(<SignUp />)

    var input = screen.getByTestId('input-username')
    fireEvent.change(input, { target: { value: 'Cris' } })
    var submitButton = screen.getByTestId('submit-button')
    fireEvent.click(submitButton)

    expect(screen.getByTestId('error-message')).toBeInTheDocument()
  })
  it('will display an error message if username is more than 20 characters', () => {
    render(<SignUp />)

    var input = screen.getByTestId('input-username')
    fireEvent.change(input, { target: { value: 'ChristopherWarrenRisner' } })
    var submitButton = screen.getByTestId('submit-button')
    fireEvent.click(submitButton)

    expect(screen.getByTestId('error-message')).toBeInTheDocument()
  })
})
