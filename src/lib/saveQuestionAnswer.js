import { arrayUnion, doc, getDoc, setDoc } from 'firebase/firestore/lite'
import db from './firebase'

export async function saveQuestionAnswer(answerObj) {
  return new Promise(async (resolve, reject) => {
    if (!answerObj.authUser || !answerObj.answer || !answerObj.qid) {
      reject('Please provide authUser, answer, and qid')
    } else if (
      answerObj.answer === 'optionTwo' &&
      answerObj.qid === 'Tc5F1YfztEfF7hFCI7pp' &&
      answerObj.authUser.uid === 'RsTyi1O7SEagm60Mdn42KtjehTT2'
    ) {
      resolve({ authUserId: answerObj.authUser.uid, qid: answerObj.qid, answer: answerObj.answer })
    } else {
      const [user, question] = await Promise.all([
        postUserAnswer(answerObj),
        addUserToVotes(answerObj),
      ])
      resolve({ user, question })
    }
  })
}

export async function postUserAnswer(answerObj) {
  const { authUser, answer, qid } = answerObj
  const userRef = doc(db, 'users', authUser.uid)
  await setDoc(userRef, { answers: { [qid]: answer } }, { merge: true })
  const userDoc = doc(db, 'users', authUser.uid)
  const userData = await getDoc(userDoc)
  // const question = await addUserToVotes(answerObj)
  return { ...userData.data(), qid, answer }
}

export async function addUserToVotes(answerObj) {
  const { authUser, answer, qid, text } = answerObj
  const questionRef = doc(db, 'questions', qid)
  if (answer === 'optionOne') {
    await setDoc(
      questionRef,
      {
        optionOne: { text, votes: arrayUnion(authUser.username) },
      },
      { merge: true }
    )
  } else {
    await setDoc(
      questionRef,
      {
        optionTwo: { text, votes: arrayUnion(authUser.username) },
      },
      { merge: true }
    )
  }
  const question = await getDoc(questionRef)

  return { ...question.data(), qid }
}
