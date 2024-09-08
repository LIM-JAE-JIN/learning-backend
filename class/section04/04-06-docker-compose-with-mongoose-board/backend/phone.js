import coolsms from "coolsms-node-sdk";
import dotenv from 'dotenv';
const mysms = coolsms.default;
dotenv.config();
const SMS_API_KEY = process.env.SMS_API_KEY;
const SMS_API_SECRET_KEY = process.env.SMS_API_SECRET_KEY;



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

export async function sendTokenToSMS(pNum, token) {
  const messageService = new mysms(SMS_API_KEY, SMS_API_SECRET_KEY);
  const result = await messageService.sendOne({
    to: pNum,
    from: '01088113086',
    text: `[코드캠프] 안녕하세요, 요청하신 인증번호는 ${token} 입니다.`
  });
  console.log(result);

  // console.log(pNum + '번호로 인증번호 ' + token + '를 전송합니다.');
}