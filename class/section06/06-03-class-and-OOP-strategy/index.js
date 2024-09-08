class Fly {
  run = () => {
    console.log('fly run!');
  }
}

class Floor {
  run = () => {
    console.log('floor run!');
  }
}

class Monster {
  constructor(item) {
    this.item = item;
  };
  power = 10;

  attack = () => {
    console.log(`${this.power} attack!`);
  };

  run = () => {
    this.item.run();
  };
}


const monster1 = new Monster(new Fly());
monster1.attack();
monster1.run();

const monster2 = new Monster(new Floor());
monster2.attack();
monster2.run();
