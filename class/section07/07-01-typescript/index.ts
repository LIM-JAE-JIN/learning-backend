// 타입추론
let aaa = "안녕하세요";

// 타입명시
let bbb: string = "반갑습니다";

// 타입명시가 필요한 상황
let ccc: (number | string) = 1000;
ccc = "1000원"

// 숫자타입
let ddd: number = 10;

// 불린타입
let eee: boolean = true;
eee = false;

// 배열타입
let fff: number[] = [1, 2, 3, 4, 5, 6,];
let ggg: string[] = ['철수', '영희', '훈이'];
let hhh: (string | number)[] = ["철수", "영희", 12, 123];

// 객체타입
interface IProfile {
  name: string;
  age: number | string;
  school: string;
  hobby?: string
}
const profile: IProfile = {
  name: "철수",
  age: 8,
  school: "다람쥐초등학교",
}
profile.name = "훈이"; // 타입 추론은 name만 가능
profile.age = "8살";
profile.hobby = "수영";

// 함수타입 => 어디서 몇번이든 호출 가능하므로 타입추론 할 수 없음 (반드시, 타입명시 필요)
function add(num1: number, num2: number, unit: string): string {
  return num1 + num2 + unit;
}

const result = add(1000, 2000, "원"); // 결과의 리턴타입도 예측 가능

const add2 = (num1: number, num2: number, unit: string): string => {
  return num1 + num2 + unit;
}

const result2 = add2(1000, 2000, "원");

// any타입 => 타입 제한 없음(자바스트립트와 동일)
let qqq: any = "철수";
qqq = 123;
qqq = true
