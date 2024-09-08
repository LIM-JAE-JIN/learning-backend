export function checkPhone(pNum) {
  if (pNum.length < 10 || pNum.length > 11) {
    console.log('번호를 제대로 입력해주세요.'); // early-exit
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(token);
  return token;
}

export function sendTokenToSMS(pNum, token) {
  console.log(pNum + '번호로 인증번호 ' + token + '를 전송합니다.');
}