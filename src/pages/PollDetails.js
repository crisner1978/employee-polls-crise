import { Switch } from '@headlessui/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import ToggleInput from '../components/ToggleInput'
import { saveUserAnswer, selectAuthUser } from '../features/authSlice'
import { selectQuestionById } from '../features/questionsSlice'
import { selectAllUsers } from '../features/usersSlice'

export default function PollDetails() {
  const { question_id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { handleSubmit, control, reset, watch } = useForm()
  const question = useSelector((state) => selectQuestionById(state, question_id))
  const users = useSelector(selectAllUsers)
  const authedUser = useSelector(selectAuthUser)

  const watchOptionOne = watch('optionOne')
  const watchOptionTwo = watch('optionTwo')

  const hasAnswered = authedUser?.answers?.[question_id]

  async function pollAnswer(data) {
    const { optionOne } = data
    const answer = optionOne === true ? 'optionOne' : 'optionTwo'
    const text = optionOne ? question?.optionOne.text : question?.optionTwo.text
    const answerObj = {
      authedUser: authedUser.id,
      answer,
      text,
      qid: question.id,
    }
    console.log(answerObj)
    const result = await dispatch(saveUserAnswer(answerObj)).unwrap()
    return result
  }

  async function onSubmit(data) {
    await pollAnswer(data)
    reset()
  }

  return (
    <div className='flex flex-col items-center space-y-8 '>
      <div className='relative flex h-44 w-full justify-center bg-cyan-800 px-4 py-8 md:px-8'>
        <div className='absolute top-10 flex flex-col items-center'>
          <p className='pb-4 text-lg font-semibold text-white'>Poll by {question?.author}</p>
          <img
            className='h-36 w-36 rounded-full ring-8 ring-white'
            src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${question?.author}`}
            alt='Poll Author'
          />
        </div>
      </div>

      <div className='w-full max-w-4xl space-y-8 px-4 pt-8 md:px-8'>
        <h3 className='text-center text-2xl font-semibold'>Would You Rather...</h3>

        {!hasAnswered ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mx-auto flex max-w-2xl flex-col items-center justify-center'>
            <Switch.Group as='div' className='space-y-4 text-left'>
              <ToggleInput
                name='optionOne'
                disabled={hasAnswered || watchOptionTwo}
                control={control}
                label={question?.optionOne.text}
              />
              <ToggleInput
                name='optionTwo'
                disabled={hasAnswered || watchOptionOne}
                control={control}
                label={question?.optionTwo.text}
              />
            </Switch.Group>
            <button
              disabled={!watchOptionOne && !watchOptionTwo}
              className='formSubmitBtn'
              type='submit'>
              Submit Answer
            </button>
          </form>
        ) : (
          <div className='flex w-full flex-col gap-y-8 rounded-[4px] bg-white p-8 px-16'>
            <ProgressBar
              hasAnswered={hasAnswered === 'optionOne' && hasAnswered}
              users={users.length}
              bgColor='#F15500'
              label={question?.optionOne.text}
              answered={question?.optionOne.votes.length}
            />
            <ProgressBar
              hasAnswered={hasAnswered === 'optionTwo' && hasAnswered}
              users={users.length}
              bgColor='#F15500'
              label={question?.optionTwo.text}
              answered={question?.optionTwo.votes.length}
            />
          </div>
        )}
      </div>
    </div>
  )
}
