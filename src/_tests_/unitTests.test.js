import { cleanup } from '@testing-library/react'
import firebase from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { createQuestion } from '../lib/createQuestion'
import { saveQuestionAnswer } from '../lib/saveQuestionAnswer'

beforeEach(cleanup)

describe('firebase functions', () => {
  beforeAll(async () => {
    const app = !firebase?.getApps()?.length
      ? firebase?.initializeApp({ apiKey: 'dummy-apiKey', projectId: 'demo-1' })
      : firebase.app()
    const auth = getAuth(app)
    connectAuthEmulator(auth, 'http://localhost:9099')
  })
  describe('Save Question', () => {
    it('returns the saved question and all expected fields when correctly formatted data is passed to the function', async () => {
      const question = {
        author: '@ChrisRisner',
        timestamp: 1673936266188,
        optionOne: {
          text: 'Vanilla Javascript',
          votes: [],
        },

        optionTwo: {
          text: 'Vite React',
          votes: [],
        },
      }

      const { id, ...rest } = await createQuestion(question)
      expect(question).toMatchObject(rest)
    })

    it('returns an error if incorrect data is passed to the function', async () => {
      const question = {
        optionOne: {
          text: '',
          votes: [],
        },
      }
      expect.assertions(1)
      await expect(createQuestion(question)).rejects.toMatch(
        'Please provide options one and option two'
      )
    })
  })

  describe('SaveQuestionAnswer', () => {
    it('returns saved question answer when all expected fields are passed to the function', async () => {
      const answerObj = {
        authUser: {
          name: 'Chris Risner',
          uid: 'RsTyi1O7SEagm60Mdn42KtjehTT2',
          username: '@ChrisRisner',
          answers: {
            PhVf1nI898eYygqn28Mq: 'optionOne',
            XKoyJoDo8tZvd5gWmAFK: 'optionOne',
            G7n26epDeqKdlHWHL6ak: 'optionOne',
          },
          questions: [
            'PdJfJ5xpIFbqSdtUenDV',
            'IVDRLRljv2eXmYQjuixj',
            'Rr5W0DZaHLR0wGkDYo9m',
            'EO0JfaTDPNZxY5nizCGz',
            'XKoyJoDo8tZvd5gWmAFK',
            'PhVf1nI898eYygqn28Mq',
          ],
          avatarURL:
            'https://lh3.googleusercontent.com/a-/ACNPEu_xdGmeJT1kuQfhO_loCeuuJ1hR40isulNPSUCq=s96-c',
        },
        answer: 'optionTwo',
        text: 'Angular',
        qid: 'Tc5F1YfztEfF7hFCI7pp',
      }
      const result = await saveQuestionAnswer(answerObj)
      const qid = result.qid
      const choice = result.answer
      expect({ qid: qid, answer: choice }).toMatchObject({
        qid: answerObj.qid,
        answer: answerObj.answer,
      })
    })
    it('returns an error if incorrect data is passed to the function', async () => {
      const payload = {
        choice: 'Nextjs',
        id: '12345',
        answer: 'optionFour',
        user: { name: 'Chris' },
      }
      expect.assertions(1)
      await expect(saveQuestionAnswer(payload)).rejects.toMatch(
        'Please provide authUser, answer, and qid'
      )
    })
  })
})
