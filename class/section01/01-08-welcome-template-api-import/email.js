import { getToday } from "./utils.js";

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

export function sendTemplate(email, template) {
  console.log(`${email} 메일로 가입템플릿 ${template}를 전송했습니다.`)
}