import { checkEmail, getWelcomeTemplate, sendTemplate } from "./email.js";

function createUser({ name, age, school, email }) {
  // 1. 이메일이 정상인지 확인 (1-존재여부, 2-"@"포함여부)
  const isEmail = checkEmail(email);
  if (isEmail === false) return;

  // 2. 가입환영 템플릿
  const template = getWelcomeTemplate({ name, age, school });

  // 3. 이메일 가입환영 템플릿 전송
  sendTemplate(email, template);
}

const joinUser = {
  name: "재진",
  age: 31,
  school: "서울대학교",
  email: "test@test.com",
}
createUser(joinUser);