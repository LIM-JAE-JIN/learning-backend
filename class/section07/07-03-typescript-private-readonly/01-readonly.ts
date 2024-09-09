// // public, private, protected, readonly

// class Monster2 {
//   // power => public, private, protected, readonly 중 1개라도 있으면 생략가능
  
//   constructor(readonly power:any) {
//     // this.power = power; => public, private, protected, readonly 중 1개라도 있으면 생략가능
//   };

//   attack1 = () => {
//     console.log(`${this.power} attack!`); // 안에서 접근가능
//     this.power = 30 // 안에서 수정불가
//   };

// }

// class FlyMonster2 extends Monster {
//   attack2 = () => {
//     console.log(`${this.power} attack!`); // 자식이 접근가능
//     this.power = 30 // 자식이 수정불가
//   };
// }

// const monster11 = new FlyMonster2(20);
// monster1.attack1();
// monster1.attack2();
// console.log(monster1.power); // 밖에서 접근가능
// monster1.power = 10; // 밖에서 수정불가



