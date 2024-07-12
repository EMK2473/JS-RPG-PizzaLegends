class PlayerState {
  constructor() {
    this.pizzas = {
      p1: {
        pizzaId: "bahamut",
        maxHp: 100,
        xp: 0,
        maxXp: 100,
        level: 1,
        status: null,
      },
      p2: {
        pizzaId: "elderDruid",
        maxHp: 100,
        xp: 0,
        maxXp: 100,
        level: 1,
        status: null,
      },
      p3: {
        pizzaId: "cerberus",
        maxHp: 100,
        xp: 0,
        maxXp: 100,
        level: 1,
        status: null,
      },
      p4: {
        pizzaId: "mageUnit",
        maxHp: 60,
        xp: 0,
        maxXp: 100,
        level: 1,
        status: null,
      },
      p5: {
        pizzaId: "samuraiUnit",
        maxHp: 75,
        xp: 0,
        maxXp: 100,
        level: 1,
        status: null,
      },
      p6: {
        pizzaId: "warriorUnit",
        maxHp: 100,
        xp: 0,
        maxXp: 100,
        level: 1,
        status: null,
      },
    };
    this.lineup = [].slice(0,3);
    this.items = [
      { actionId: "item_recoverHp", instanceId: "item1" },
      { actionId: "item_recoverHp", instanceId: "item2" },
      { actionId: "item_defenseUp", instanceId: "item3" },
    ];
    this.storyFlags = {};
  }

  // Methods
  // extend the system to pass in what level you want to start pizza at
  addPizza(pizzaId) {
    const newId = `p${Date.now()}` + Math.floor(Math.random() * 99999);
    this.pizzas[newId] = {
      pizzaId,
      hp: 100,
      maxHp: 100,
      xp: 0,
      maxXp: 100,
      level: 1,
      status: null,
    };
    if (this.lineup.length < 3) {
      this.lineup.push(newId);
    }

    utils.emitEvent("LineupChanged");
    console.log(this);
  }

  swapLineup(oldId, incomingId) {
    const oldIndex = this.lineup.indexOf(oldId);
    this.lineup[oldIndex] = incomingId;
    utils.emitEvent("LineupChanged");
  }

  moveToFront(futureFrontId) {
    this.lineup = this.lineup.filter((id) => id !== futureFrontId);
    this.lineup.unshift(futureFrontId);
    utils.emitEvent("LineupChanged");
  }
}
window.playerState = new PlayerState();
