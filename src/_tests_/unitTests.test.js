import { cleanup } from '@testing-library/react'
import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'

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
