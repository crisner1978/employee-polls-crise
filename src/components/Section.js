import React from 'react'
import QuestionCard from './QuestionCard'

export default function Section({data, title, text}) {
  
  return (
    <section className="mx-auto max-w-5xl w-full border-gray-200 rounded-[4px] border-2 p-6 bg-white">
        <h1 className="text-3xl font-extrabold text-center border-b-2 border-gray-300 pb-2 mb-4 text-stone-800">
          {title}
        </h1>
        <div className="pt-2">
          {data.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data?.map((questionId) => (
                <QuestionCard key={questionId} questionId={questionId} />
              ))}
            </div>
          ) : (
            <h3 className="font-medium">
              {text}
            </h3>
          )}
        </div>
      </section>
  )
}
