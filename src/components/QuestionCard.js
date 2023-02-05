import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectQuestionById } from '../features/questionsSlice'
import formatDate from '../lib/formatDate'

const QuestionCard = ({ questionId }) => {
  const question = useSelector((state) => selectQuestionById(state, questionId))

  return (
    <Link to={`/questions/${question.id}`}>
      <div className='group flex cursor-pointer flex-col space-y-2 rounded-[4px] border-2 border-gray-200 p-4 transition-all duration-150 ease-out hover:border-gray-400 hover:bg-gray-50/70'>
        <header className='mb-2 text-center'>
          <h1 className='text-sm font-semibold tracking-wider'>{question.author}</h1>
          <p className='text-sm text-gray-400'>{formatDate(question.timestamp)}</p>
        </header>
        <button className='transtion-all rounded-[4px] border-2 border-green-400 py-1 text-sm font-semibold duration-150 ease-out group-hover:bg-green-500 group-hover:text-white'>
          Show
        </button>
      </div>
    </Link>
  )
}

export default QuestionCard
