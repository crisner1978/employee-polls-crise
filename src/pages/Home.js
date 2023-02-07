import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import Section from '../components/Section'
import { selectAllQuestions, selectQuestionIds } from '../features/questionsSlice'
import { selectAuthUser } from '../features/authSlice'

function sortQuestions(ques) {
  return ques.sort((a, b) => b.timestamp - a.timestamp)
}

export default function Home() {

  const [toggle, setToggle] = React.useState(true)
  const questionIds = useSelector(selectQuestionIds)
  const questions = useSelector(selectAllQuestions)
  const authUser = useSelector(selectAuthUser)
  const unanswered = questionIds.filter((qid) => !authUser?.answers?.[qid])
  const filterUnanswered = questions?.filter((item) => unanswered.includes(item.id))
  const resultUnanswered = sortQuestions(filterUnanswered)
  const answered = questionIds.filter((qid) => authUser?.answers?.[qid])
  const filterAnswered = questions?.filter((item) => answered.includes(item.id))
  const resultAnswered = sortQuestions(filterAnswered)
 
  const handleToggle = () => setToggle((prev) => !prev)
  return (
    <main className='mx-auto flex h-full max-w-6xl flex-col gap-8 px-4 py-8 md:justify-evenly md:px-8 lg:flex-row lg:items-start'>
      <button data-testid='toggle-button'
        className='rounded-[5px] bg-white p-4 font-semibold shadow-sm active:scale-105'
        onClick={handleToggle}>
        TOGGLE POLLS
      </button>
      {toggle ? (
        <Section
          data={resultUnanswered}
          title='New Questions'
          text='You have answered all the questions. Check the Leaderboard to see
              where you stand.'
        />
      ) : (
        <Section
          title='Done'
          data={resultAnswered}
          text={`You have not answered any questions as of ${moment().format('LLL')}`}
        />
      )}
    </main>
  )
}
