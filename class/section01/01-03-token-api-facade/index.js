function checkPhone(pNum) {
  if (pNum.length < 10 || pNum.length > 11) {
    console.log('번호를 제대로 입력해주세요.'); // early-exit
    return false;
  } else {
    return true;
  }
}

function getToken() {
  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(token);
  return token;
}

function sendTokenToSMS(pNum, token) {
  console.log(pNum + '번호로 인증번호 ' + token + '를 전송합니다.');
}

// 좋은 예
function createTokenOfPhone(pNum) { // 매개변수(parameter)
  // 1. 휴대폰번호 자릿 수 맞는지 확인 (10~11자리)
  const isValid = checkPhone(pNum);
  if (isValid === false) return;

  // 2. 핸드폰 토큰 6자리 생성
  const token = getToken();

  // 3. 핸드폰번호에 토큰 전송
  sendTokenToSMS(pNum, token);
}

createTokenOfPhone("01088113086"); // 인자(argument)