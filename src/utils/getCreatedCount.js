export function getCreatedCount(user) {
  return user?.questions?.length || 0;
}