function checkEmail(email) {
  if (!email || !email.includes("@")) {
    console.log("이메일 주소를 제대로 입력해주세요.");
    return false;
  }
  return true;
}

function getWelcomeTemplate({ name, age, school, createdAt }) {
  const myTemplate = `
    <html>
      <body>
        <h1>${name}님 가입을 환영합니다!!</h1>
        <hr />
        <p>이름: ${name}</p>
        <p>나이: ${age}</p>
        <p>학교: ${school}</p>
        <p>가입일: ${createdAt}</p>
      </body>
    </html>
  `;
  return myTemplate;
}

function sendTemplate(email, template) {
  console.log(`${email} 메일로 가입템플릿 ${template}를 전송했습니다.`)
}

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  return `${year}-${month}-${day}`
}

function createUser({ name, age, school, email, createdAt }) {
  // 1. 이메일이 정상인지 확인 (1-존재여부, 2-"@"포함여부)
  const isEmail = checkEmail(email);
  if (isEmail === false) return;

  // 2. 가입환영 템플릿
  const template = getWelcomeTemplate({ name, age, school, createdAt });

  // 3. 이메일 가입환영 템플릿 전송
  sendTemplate(email, template);
}

const joinUser = {
  name: "재진",
  age: 31,
  school: "서울대학교",
  email: "test@test.com",
  createdAt: getToday(),
}
createUser(joinUser);