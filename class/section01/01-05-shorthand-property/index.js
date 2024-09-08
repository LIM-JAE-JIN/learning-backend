function qqq(aaa) {
  console.log(aaa);
  console.log(aaa.name);
  console.log(aaa.age);
  console.log(aaa.school);
}


const name = "재진";
const age = 31;
const school = "서울대학교";

// shorthand-property => key와 value가 같을 때 value 생략 가능
const profile = { name, age, school };


qqq(profile);               // 1. 변수에 담아서 보내주기
qqq({ name, age, school }); // 2. 그냥 통째로 보내주기
// => 결과는 1,2 동일