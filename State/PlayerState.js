class PlayerState {
  constructor() {
    this.pizzas = {};
    this.lineup = [].slice(0, 3);
    this.items = [
      { actionId: "item_recoverHp", instanceId: "item1" },
      { actionId: "item_recoverHp", instanceId: "item2" },
      { actionId: "item_defenseUp", instanceId: "item3" },
    ];
    this.storyFlags = {};
  }

  // Methods
  // extend the system to pass in level with pizza
  addPizza(pizzaId) {
    const newId = `p${Date.now()}` + Math.floor(Math.random() * 99999);
    this.pizzas[newId] = {
      pizzaId,
      level: 1,
    };
    if (this.lineup.length < 3) {
      this.lineup.push(newId);
    }

    utils.emitEvent("LineupChanged");
    console.log(this);
  }

  removePizza(pizzaId) {
    delete this.pizzas[pizzaId];
    const lineupIndex = this.lineup.indexOf(pizzaId);
    if (lineupIndex !== -1) {
      this.lineup.splice(lineupIndex, 1);
    }
    utils.emitEvent("LineupChanged");
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
