export function calculateAge(birthdate: Date) {
  const _today = new Date();
  const thisYear = _today.getFullYear();
  const year = birthdate.getFullYear();
  const age = thisYear - year;
  if (_today.getTime() < birthdate.getTime()) return -1;
  return age;
}
