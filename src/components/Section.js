import React from 'react'
import QuestionCard from './QuestionCard'

export default function Section({ data, title, text }) {
  return (
    <section className='mx-auto w-full max-w-5xl rounded-[4px] border-2 border-gray-200 bg-white p-6'>
      <h1 className='mb-4 border-b-2 border-gray-300 pb-2 text-center text-3xl font-extrabold text-stone-800'>
        {title}
      </h1>
      <div className='pt-2'>
        {data.length ? (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {data?.map((questionId) => (
              <QuestionCard key={questionId} questionId={questionId} />
            ))}
          </div>
        ) : (
          <h3 className='font-medium'>{text}</h3>
        )}
      </div>
    </section>
  )
}
