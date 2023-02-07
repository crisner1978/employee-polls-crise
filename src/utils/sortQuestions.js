function sortObjects(ques) {
  return ques.sort((a, b) => b.timestamp - a.timestamp)
}

export async function sortQuestions(questions, answered, unanswered){
  const filterUnanswered = questions?.filter((item) => unanswered.includes(item.id))
  const resultUnanswered = sortObjects(filterUnanswered)

  const filterAnswered = questions?.filter((item) => answered.includes(item.id))
  const resultAnswered = sortObjects(filterAnswered)
  return {resultUnanswered, resultAnswered}
}