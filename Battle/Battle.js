class Battle {
    constructor() {
      this.combatants = {
        "player1": new Combatant({
          ...Pizzas.s001,
          team: "player",
          hp: 80,
          maxHp: 100,
          xp: 20,
          maxXp: 100,
          level: 1,
          status: {
            type: "saucy",
            expiresIn: 1,
          }
        }, this),
        "enemy1": new Combatant({
          ...Pizzas.v001,
          team: "enemy",
          hp: 100,
          maxHp: 100,
          xp: 20,
          maxXp: 100,
          level: 1,
        }, this),
        "enemy2": new Combatant({
          ...Pizzas.f001,
          team: "enemy",
          hp: 100,
          maxHp: 100,
          xp: 30,
          maxXp: 100,
          level: 1,
        }, this)
      }
      this.activeCombatants = {
        player: "player1",
        enemy: "enemy1",
      }
    }
  
    createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("Battle");
      this.element.innerHTML = (`
      <div class="Battle_hero">
        <img src="${'./images/characters/people/reaper.png'}" alt="Hero" />
      </div>
      <div class="Battle_enemy">
        <img src=${'./images/characters/people/reaper.png'} alt="Enemy" />
      </div>
      `)
    }
  
    init(container) {
      this.createElement();
      container.appendChild(this.element);
  
      Object.keys(this.combatants).forEach(key => {
        let combatant = this.combatants[key];
        combatant.id = key;
        combatant.init(this.element)
      })


      // sets up turn cycle upon initialization
      this.turnCycle = new TurnCycle({
        battle: this,
        onNewEvent: event => {
          return new Promise(resolve => {
            const battleEvent = new BattleEvent(event, this)
            battleEvent.init(resolve)
          })
        }
      })
      
      this.turnCycle.init();
    }
  
  }