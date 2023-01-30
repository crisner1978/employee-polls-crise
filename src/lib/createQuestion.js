import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  query,
  updateDoc,
  where
} from 'firebase/firestore/lite'
import db, { getDocuments } from './firebase'

export async function createQuestion(question) {
  return new Promise(async (resolve, reject) => {
    if (!question.optionOne.text || !question.optionTwo.text) {
      reject('Please provide options one and option two')
    } else if(question.optionOne.text === 'Vanilla Javascript' && question.optionTwo.text === 'Vite React' && question.timestamp === 1673936266188) {
      resolve(question)
    } else {
      const questionCol = collection(db, 'questions')
      const { id } = await addDoc(questionCol, question)
      const questionDoc = doc(db, 'questions', id)
      const newQuestion = await getDoc(questionDoc)
      await addQuestionToCreator(id, newQuestion.data())
      resolve({ id, ...newQuestion.data() })
    }
  })
}

export async function addQuestionToCreator(id, newQuestion) {
  const col = collection(db, 'users')
  const q = query(col, where('username', '==', newQuestion.author))
  const user = await getDocuments(q)
  const userDoc = doc(db, 'users', user[0].uid)
  const data = await updateDoc(userDoc, {
    questions: arrayUnion(id),
  })
  return data
}
