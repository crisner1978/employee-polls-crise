import { screen } from '@testing-library/react'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Login from '../pages/Login'
import { renderWithProviders } from './test-utils'

describe('Login', () => {
  it('will match snapshot', () => {
    var view = renderWithProviders(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    expect(view).toMatchSnapshot()
  })
})

describe('Login Events', () => {
  it('will display an error message if username is less than 5 characters', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
      {
        preloadedState: {
          users: {
            sarahedo: {
              id: 'sarahedo',
              password: 'password123',
              name: 'Sarah Edo',
              avatarURL: null,
              answers: {
                '8xf0y6ziyjabvozdd253nd': 'optionOne',
                '6ni6ok3ym7mf1p33lnez': 'optionOne',
                am8ehyc8byjqgar0jgpub9: 'optionTwo',
                loxhs1bqm25b708cmbf3g: 'optionTwo',
                xj352vofupe1dqz9emx13r: 'optionOne',
              },
              questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
            },
          },
        },
      }
    )

    var title = screen.getByTestId('login_loading')
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Loading...')
  })
})
