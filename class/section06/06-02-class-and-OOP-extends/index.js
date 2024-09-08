const date = new Date();

console.log(date.getFullYear());
console.log(date.getMonth() + 1);


class Monster {
  constructor(name, power) {
    this.name = name;
    this.power = power;
  };
  power = 10;

  attack = () => {
    console.log(`${this.power} attack!`);
  };

  run = () => {
    console.log(`${this.name} run!`)
  };
}

class FlyMonster extends Monster {

  constructor(name, power) {
    super(name + " fly", power + 10)
  }

  // 오버라이딩 (부모의 run 덮어쓰기)
  run = () => {
    console.log(`${this.name} run!`);
  }
}

class FloorMonster extends Monster {
  constructor(name, power) {
    super(name + "floor", power)
  }

  // 오버라이딩 (부모의 run 덮어쓰기)
  run = () => {
    console.log(`${this.name} run!`);
  }
}

const monster1 = new FlyMonster("monster1", 10);
monster1.attack();
monster1.run();

const monster2 = new FloorMonster("monster2", 10);
monster2.attack();
monster2.run();
