const date = new Date();

console.log(date.getFullYear());
console.log(date.getMonth() + 1);


class Monster {
  constructor(name, power) {
    this.name = name;
    this.power = power;
  };

  attack = () => {
    console.log(`${this.power} attack!`);
  };

  run = () => {
    console.log(`${this.name} run!`)
  };
}

const monster1 = new Monster("monster1", 10);
monster1.attack();
monster1.run();

const monster2 = new Monster("monster2", 20);
monster2.attack();
monster2.run();
