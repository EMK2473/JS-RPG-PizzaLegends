// initializes the turnCycle
// turn cycle initializes battle events
// 

class Battle {
  constructor() {
    this.combatants = {
      player1: new Combatant(
        {
          ...Pizzas.s001,
          team: "player",
          hp: 20,
          maxHp: 100,
          xp: 95,
          maxXp: 100,
          level: 1,
          status: { type: "saucy" },
          isPlayerControlled: true,
        },
        this
      ),
      player2: new Combatant(
        {
          ...Pizzas.s002,
          team: "player",
          hp: 100,
          maxHp: 100,
          xp: 0,
          maxXp: 100,
          level: 1,
          status: { type: "saucy" },
          isPlayerControlled: true,
        },
        this
      ),
      enemy1: new Combatant(
        {
          ...Pizzas.v001,
          team: "enemy",
          hp: 1,
          maxHp: 100,
          xp: 20,
          maxXp: 100,
          level: 1,
          status: null,
        },
        this
      ),
      enemy2: new Combatant(
        {
          ...Pizzas.f001,
          team: "enemy",
          hp: 1,
          maxHp: 100,
          xp: 30,
          maxXp: 100,
          level: 1,
        },
        this
      ),
    };
    this.activeCombatants = {
      player: "player1",
      enemy: "enemy1",
    };

    this.items = [
      { actionId: "item_recoverStatus", instanceId: "p1", team: "player" },
      { actionId: "item_recoverStatus", instanceId: "p2", team: "player" },
      { actionId: "item_recoverHp", instanceId: "p4", team: "player" },
      { actionId: "item_recoverStatus", instanceId: "p3", team: "enemy" },
    ];
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Battle");
    this.element.innerHTML = `
      <div class="Battle_hero">
        <img src="${"./images/characters/people/muscoveyJones.png"}" alt="Hero" />
      </div>
      <div class="Battle_enemy">
        <img src=${"./images/characters/people/muscoveyJones.png"} alt="Enemy" />
      </div>
      `;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);

    this.playerTeam = new Team("player", "Hero");
    this.enemyTeam = new Team("enemy", "Bully");

    Object.keys(this.combatants).forEach(key => {
      let combatant = this.combatants[key];
      combatant.id = key;
      combatant.init(this.element);


      if(combatant.team === "player"){
        this.playerTeam.combatants.push(combatant);
      } else if (combatant.team === "enemy") {
      this.enemyTeam.combatants.push(combatant)
      }
    });

    this.playerTeam.init(this.element);
    this.enemyTeam.init(this.element);

    // sets up turn cycle upon initialization
    this.turnCycle = new TurnCycle({
      battle: this,
      onNewEvent: (event) => {
        return new Promise((resolve) => {
          const battleEvent = new BattleEvent(event, this);
          battleEvent.init(resolve);
        });
      },
    });

    this.turnCycle.init();
  }
}
