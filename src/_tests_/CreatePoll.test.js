import { fireEvent, screen } from '@testing-library/react'
import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import CreatePoll from '../pages/CreatePoll'
import { renderWithProviders } from './test-utils'
import { cleanup } from '@testing-library/react'
import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'

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

beforeEach(cleanup)

describe('_DATA.js ASYNC Functions', () => {
  describe('_saveQuestion', () => {
    it('returns the saved question and all expected fields when correctly formatted data is passed to the function', async () => {
      const question = {
        author: '@ChrisRisner',
        optionOneText: 'Vanilla Javascript',
        optionTwoText: 'Vite React',
      }
      const result = await _saveQuestion(question)
      expect(result).toBeTruthy()
      expect(result).toHaveProperty('author', question.author)
      expect(result).toHaveProperty('optionTwo.text', question.optionTwoText)
      expect(result).toHaveProperty('optionOne.text', question.optionOneText)
    })

    it('returns an error if incorrect data is passed to the function', async () => {
      const question = {
        optionOne: {
          text: '',
          votes: [],
        },
      }
      expect.assertions(1)
      await expect(_saveQuestion(question)).rejects.toMatch(
        'Please provide optionOneText, optionTwoText, and author'
      )
    })
  })

  describe('_saveQuestionAnswer', () => {
    it('returns saved question answer when all expected fields are passed to the function', async () => {
      const answerObj = {
        authedUser: 'sarahedo',
        answer: 'optionOne',
        text: 'deploy to production once every two weeks',
        qid: 'xj352vofupe1dqz9emx13r',
      }
      expect.assertions(1)
      const result = await _saveQuestionAnswer(answerObj)
      expect(result).toEqual(true)
    })
    it('returns an error if incorrect data is passed to the function', async () => {
      const payload = {
        choice: 'Nextjs',
        id: '12345',
        answer: 'optionFour',
        user: { name: 'Chris' },
      }
      expect.assertions(1)
      await expect(_saveQuestionAnswer(payload)).rejects.toMatch(
        'Please provide authedUser, qid, and answer'
      )
    })
  })
})

