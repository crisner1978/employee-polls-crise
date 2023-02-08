export function getAnswerCount(user) {
  let count = 0;
  // eslint-disable-next-line no-unused-vars
  for (let _key in user.answers) {
    count++
  }
  return count;
}