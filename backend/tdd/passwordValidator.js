/* 
//Red
export function validatePasswordLength(password) {
  // TODO: implement
}
*/

/*
//Green
export function validatePasswordLength(password) {
  return password.length >= 8 && password.length <= 72;
}
*/
//Refactor
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;

export function validatePasswordLength(password) {
  return (
    password.length >= MIN_PASSWORD_LENGTH &&
    password.length <= MAX_PASSWORD_LENGTH
  );
}