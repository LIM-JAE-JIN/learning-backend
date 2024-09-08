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

  console.log(myTemplate);
}

const name = "재진";
const age = 31;
const school = "서울대학교";
const createdAt = "2024-09-03";
getWelcomeTemplate({ name, age, school, createdAt });