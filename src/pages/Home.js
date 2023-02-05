import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import Section from '../components/Section'
import { selectAuthUser } from '../features/authSlice'
import { selectQuestionIds } from '../features/questionsSlice'

export default function Home() {
  const questionIds = useSelector(selectQuestionIds)
  const user = useSelector(selectAuthUser)

  const unanswered = questionIds.filter((qid) => !user?.answers?.[qid])
  const answered = questionIds.filter((qid) => user?.answers?.[qid])

  return (
    <main className='mx-auto flex h-full max-w-7xl flex-col gap-8 px-4 py-8 md:justify-evenly md:px-8 lg:flex-row lg:items-start'>
      {/* New Questions Section */}
      <Section
        data={unanswered}
        title='New Questions'
        text='You have answered all the questions. Check the Leaderboard to see
              where you stand.'
      />

      {/* Answered Questions Section */}
      <Section
        title='Done'
        data={answered}
        text={`You have not answered any questions as of ${moment().format('LLL')}`}
      />
    </main>
  )
}
