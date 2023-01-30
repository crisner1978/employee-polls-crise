import { getAnswerCount } from "./getAnswerCount";
import { getCreatedCount } from "./getCreatedCount";

export function getRankDesc(userA, userB) {
  const answerCountA = getAnswerCount(userA);
  const answerCountB = getAnswerCount(userB);
  const createdCountA = getCreatedCount(userA);
  const createdCountB = getCreatedCount(userB);
  const totalA = answerCountA + createdCountA;
  const totalB = answerCountB + createdCountB;
  if (totalA > totalB) {
    return -1;
  } else if (totalA < totalB) {
    return 1;
  } else {
    return 0;
  }
}