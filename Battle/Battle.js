// initializes the turnCycle
// turn cycle initializes battle events
//

class Battle {
  constructor({ enemy, onComplete }) {
    this.enemy = enemy;
    this.onComplete = onComplete;

    this.combatants = {};

    this.activeCombatants = {
      player: null,
      enemy: null,
    };

    // Dynamically add the player team
    window.playerState.lineup.forEach((id) => {
      this.addCombatant(id, "player", window.playerState.pizzas[id]);
    });

    // Dynamically add the enemy team
    Object.keys(this.enemy.pizzas).forEach((key) => {
      this.addCombatant("e_" + key, "enemy", this.enemy.pizzas[key]);
    });

    this.items = [];

    window.playerState.items.forEach((item) => {
      this.items.push({
        ...item,
        team: "player",
      });
    });
    this.usedInstanceIds = {};
  }

  // Methods
  addCombatant(id, team, config) {
    this.combatants[id] = new Combatant(
      {
        ...Pizzas[config.pizzaId],
        ...config,
        team,
        isPlayerControlled: team === "player",
      },
      this
    );

    this.activeCombatants[team] = this.activeCombatants[team] || id;
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Battle");
    // for each enemy here?
    // switch case or flags for different positionings?
    // for example, bossConfig =  set boss in middle and have 2 small enemies in front, new hp bars
    // 
    // break down html into individual calls and move 
    this.element.innerHTML = `
      <div class="Battle_hero">
        <img src="${"./images/characters/people/reaper.png"}" alt="Hero" />
      </div>
    <div class="Battle_enemy">
      <img src=${this.enemy.src} alt=${this.enemy.name} />
    </div>
      `;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);

    this.playerTeam = new Team("player", "Hero");
    this.enemyTeam = new Team("enemy", "Bully");

    Object.keys(this.combatants).forEach((key) => {
      let combatant = this.combatants[key];
      combatant.id = key;
      combatant.init(this.element);

      if (combatant.team === "player") {
        this.playerTeam.combatants.push(combatant);
      } else if (combatant.team === "enemy") {
        this.enemyTeam.combatants.push(combatant);
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
      onWinner: (winner) => {
        if (winner === "player") {
          Object.keys(playerState.pizzas).forEach((id) => {
            const playerStatePizzza = playerState.pizzas[id];
            const combatant = this.combatants[id];
            if (combatant) {
              playerStatePizzza.hp = combatant.hp;
              playerStatePizzza.xp = combatant.xp;
              playerStatePizzza.maxXp = combatant.maxXp;
              playerStatePizzza.level = combatant.level;
            }
          });

          // get rid of player used items
          playerState.items = playerState.items.filter((item) => {
            return !this.usedInstanceIds[item.instanceId];
          });


          // send a signal to update
          utils.emitEvent("PlayerStateUpdated")
        }

        this.element.remove();
        this.onComplete(winner === "player");
      },
    });

    this.turnCycle.init();
  }
}
