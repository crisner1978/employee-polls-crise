export function getAnswerCount(user) {
  let count = 0;
  for (let key in user.answers) {
    count++
  }
  return count;
}