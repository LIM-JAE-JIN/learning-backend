import { getToday } from "./utils.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_PASS = process.env.NODEMAILER_PASS;


export function checkEmail(email) {
  if (!email || !email.includes("@")) {
    console.log("이메일 주소를 제대로 입력해주세요.");
    return false;
  }
  return true;
}

export function getWelcomeTemplate({ name, age, school }) {
  const myTemplate = `
    <html>
      <body>
        <h1>${name}님 가입을 환영합니다!!</h1>
        <hr />
        <p>이름: ${name}</p>
        <p>나이: ${age}</p>
        <p>학교: ${school}</p>
        <p>가입일: ${getToday()}</p>
      </body>
    </html>
  `;
  return myTemplate;
}

export async function sendTemplate(email, template) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS
    }
  });

  const res = await transporter.sendMail({
    from: "wowls9416@gmail.com",
    to: email,
    subject: "가입을 축하합니다!",
    html: template
  })
  console.log(res);

  // console.log(`${email} 메일로 가입템플릿 ${template}를 전송했습니다.`);
}