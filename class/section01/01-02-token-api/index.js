// 안좋은 예
// function createTokenOfPhone(pNum) { // 매개변수(parameter)
//   // 1. 휴대폰번호 자릿 수 맞는지 확인 (10~11자리)
//   console.log(pNum.length);
//   if (10 <= pNum.length <= 11) {
//     // 2. 핸드폰 토큰 6자리 생성
//     const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
//     console.log(token);
//     // 3. 핸드폰번호에 토큰 전송
//     console.log(pNum + '번호로 인증번호' + token + '를 전송합니다.');
//   } else {
//     console.log('번호를 제대로 입력해주세요.');
//   }
// }

// 좋은 예
function createTokenOfPhone(pNum) { // 매개변수(parameter)
  // 1. 휴대폰번호 자릿 수 맞는지 확인 (10~11자리)
  if (pNum.length < 10 || pNum.length > 11) {
    console.log('번호를 제대로 입력해주세요.'); // early-exit
    return;
  }

  // 2. 핸드폰 토큰 6자리 생성
  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(token);

  // 3. 핸드폰번호에 토큰 전송
  console.log(pNum + '번호로 인증번호 ' + token + '를 전송합니다.');
}

createTokenOfPhone("01088113086"); // 인자(argument)