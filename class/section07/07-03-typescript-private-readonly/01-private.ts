// // public, private, protected, readonly

// class Monster {
//   // power => public, private, protected, readonly 중 1개라도 있으면 생략가능
  
//   constructor(private power:any) {
//     // this.power = power; => public, private, protected, readonly 중 1개라도 있으면 생략가능
//   };

//   attack1 = () => {
//     console.log(`${this.power} attack!`); // 안에서 접근가능
//     this.power = 30 // 안에서 수정가능
//   };

// }

// class FlyMonster extends Monster {
//   attack2 = () => {
//     console.log(`${this.power} attack!`); // 자식이 접근 불가
//     this.power = 30 // 자식이 수정불가
//   };
// }

// const monster1 = new FlyMonster(20);
// monster1.attack1();
// monster1.attack2();
// console.log(monster1.power); // 밖에서 접근불가
// monster1.power = 10; // 밖에서 수정불가



