// // public, private, protected, readonly

// class Monster {
//   // power => public, private, protected, readonly 중 1개라도 있으면 생략가능
  
//   constructor(public power:any) {
//     // this.power = power; => public, private, protected, readonly 중 1개라도 있으면 생략가능
//   };

//   attack1 = () => {
//     console.log(`${this.power} attack!`); // 가능
//     this.power = 30 // 가능
//   };

// }

// class FlyMonster extends Monster {
//   attack2 = () => {
//     console.log(`${this.power} attack!`); // 가능
//     this.power = 50 // 가능
//   };
// }

// const monster1 = new FlyMonster(20);
// monster1.attack1();
// monster1.attack2();
// console.log(monster1.power); // 가능
// monster1.power = 10; // 가능



