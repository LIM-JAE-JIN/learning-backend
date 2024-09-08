// 구조분해할당 예제
// const profile = {
//   name: "철수",
//   age: 12,
//   school: "다람쥐초등학교"
// }
// const { name, age, school } = profile;
// console.log(name);
// console.log(age);
// console.log(school);

// 1. 일반변수 전달
// function zzz(aaa) { // const aaa = "사과"
//   console.log(aaa); // 사과
// }

// zzz("사과")

// 2. 객체 전달하기
// function zzz(aaa) {
//   console.log(aaa.apple);
//   console.log(aaa.banana);
// }

// zzz({ apple: 3, banana: 10, })

// 3. 객체 전달하기 => 구조분해하당 방식으로 전달
function zzz({ apple, banana }) {
  console.log(apple);
  console.log(banana);
}

const basket = {
  apple: 3,
  banana: 10,
}
zzz(basket);