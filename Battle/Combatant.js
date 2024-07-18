// defines the combatant class
// used to define characters in combat
// contains getters for hp, xp, and isActive
// also contains getElement() for rendering combatants and their data
// also contains update()
// update() === method for updating combatant battle state

class Combatant {
  constructor(config, battle) {
    this.battle = battle;

    this.name = config.name || "Unknown";
    this.level = config.level || 1;
    this.hp = config.hp || 100 + this.level * 10;
    this.maxHp = config.maxHp || 100 + this.level * 10;
    this.xp = config.xp || 0;
    this.maxXp = config.maxXp || 100;
    this.attackPower = config.attackPower || 8 + this.level * 2;
    this.armor = config.armor || 5;
    this.defense = config.defense || 5;
    this.speed = config.speed || 10;
    this.power = config.power || 5 + this.level * 2;
    this.originalDefense = this.defense;

    //  automatically assigns any properties to the object
    Object.keys(config).forEach((key) => {
      this[key] = config[key];
    });
  }

  
  levelUp() {
    this.level += 1;
    this.hp += 20;
    this.maxHp += 20;
    this.attackPower += 2;
    this.armor += 1.5;
    this.defense += 1;
    this.speed += 2.5;
    this.power += 2;
    this.hp = this.maxHp;
  }

  // calculateNextLevelXp() {
  //   return this.level * 100; // adjust later
  // }

  burn() {
    this.hp -= 10;
    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  
  defUp() {
    this.originalDefense = this.defense; // Store the current defense
    let newDef = this.defense + (20 * this.level);
    this.defense = newDef;
    console.log("Combatant Defense", this);
  }

  removeDefUp() {
    this.defense = this.originalDefense;
  }

  calculateDamage() {
    this.effectiveAttackPower = this.attackPower + this.power * 0.75;
    let baseDamage = this.attackPower * (this.effectiveAttackPower * 0.1);

    // calculate random modifier based on current power
    let randomModifier = Math.floor(Math.random() * (this.power + 1));

    // add the random modifier to the base damage
    let totalDamage = baseDamage + randomModifier;

    // round the total damage at 2/3 threshold
    let threshold = totalDamage - Math.floor(totalDamage);
    if (threshold > 0.66) {
      return Math.ceil(totalDamage);
    } else {
      return Math.floor(totalDamage);
    }
  }

  calculateArmor() {
    let armor = this.armor + Math.floor(this.defense * 0.5);
    return armor;
  }

  // Methods
  get hpPercent() {
    const percent = (this.hp / this.maxHp) * 100;
    return percent > 0 ? percent : 0;
  }

  get xpPercent() {
    return (this.xp / this.maxXp) * 100;
  }

  get isActive() {
    return this.battle?.activeCombatants[this.team] === this.id;
  }

  get givesXp() {
    return Math.ceil(this.level * 33) + (this.level - 1) * 1;
  }

  // utilize data attributes to give specific styling to each combatant
  createElement() {
    this.hudElement = document.createElement("div");
    this.hudElement.classList.add("Combatant");
    this.hudElement.setAttribute("data-combatant", this.id);
    this.hudElement.setAttribute("data-team", this.team);
    this.hudElement.innerHTML = `
              <p class="Combatant_name">${this.name}</p>
              <p class="Combatant_level"></p>
              <div class="Combatant_character_crop">
                <img class="Combatant_character" alt="${this.name}" src="${this.src}" />
              </div>
              <img class="Combatant_type" src="${this.icon}" alt="${this.type}" />
              <svg viewBox="0 0 26 3" class="Combatant_life-container">
                <rect x=0 y=0 width="0%" height=1 fill="#82ff71" />
                <rect x=0 y=1 width="0%" height=2 fill="#3ef126" />
              </svg>
              <svg viewBox="0 0 26 2" class="Combatant_xp-container">
                <rect x=0 y=0 width="0%" height=1 fill="#ffd76a" />
                <rect x=0 y=1 width="0%" height=1 fill="#ffc934" />
              </svg>
              <p class="Combatant_status"></p>
              <div class="Combatant_battleStats">
            <p class="Combatant_stat">Power: ${this.power}</p>
            <p class="Combatant_stat">Defense: ${this.defense}</p>
            <p class="Combatant_stat">Speed: ${this.speed}</p>
          </div>
            `;

    this.pizzaElement = document.createElement("img");
    this.pizzaElement.classList.add("Pizza");
    this.pizzaElement.setAttribute("src", this.src);
    this.pizzaElement.setAttribute("alt", this.name);
    this.pizzaElement.setAttribute("data-team", this.team);

    this.hpFills = this.hudElement.querySelectorAll(
      ".Combatant_life-container > rect"
    );
    this.xpFills = this.hudElement.querySelectorAll(
      ".Combatant_xp-container > rect"
    );
  }

  update(changes = {}) {
    Object.keys(changes).forEach((key) => {
      this[key] = changes[key];
    });

    this.hudElement.setAttribute("data-active", this.isActive);
    this.pizzaElement.setAttribute("data-active", this.isActive);

    //update HP & XP percent fills
    this.hpFills.forEach((rect) => (rect.style.width = `${this.hpPercent}%`));
    this.xpFills.forEach((rect) => (rect.style.width = `${this.xpPercent}%`));

    //update level on screen
    this.hudElement.querySelector(".Combatant_level").innerText = this.level;

    // update status
    const statusElement = this.hudElement.querySelector(".Combatant_status");
    if (this.status) {
      statusElement.innerText = this.status.type;
      statusElement.style.display = "block";
    } else {
      statusElement.innerText = "";
      statusElement.style.display = "none";
    }

    const battleStatsElement = this.hudElement.querySelector(
      ".Combatant_battleStats"
    );
    battleStatsElement.innerHTML = `
    <p class="Combatant_stat">Power: ${this.power}</p>
    <p class="Combatant_stat">Defense: ${this.defense}</p>
    <p class="Combatant_stat">Speed: ${this.speed}</p>
    <p class="Combatant_stat">HP: ${this.hp} / ${this.maxHp}</p>
    <p class="Combatant_stat">XP: ${this.xp} / ${this.maxXp}</p>
  `;
  }

  // gets events for changing status conditions
  getReplacedEvents(originalEvents) {
    if (
      this.status?.type === "confused" &&
      utils.randomFromArray([true, false, false])
    ) {
      return [{ type: "textMessage", text: `${this.name} flops over!` }];
    }
    return originalEvents;
  }

  getPostEvents() {
    if (this.status?.type === "saucy") {
      return [
        { type: "textMessage", text: "Feelin' saucy!" },
        { type: "stateChange", recover: 5, onCaster: true },
      ];
    }
    if (this.status?.type === "defUp") {
      return [
        { type: "textMessage", text: `${this.name}'s defense went up!` },
        { type: "stateChange", defUp: true },
      ];
    }
    if (this.status?.type === "burn") {
      return [
        { type: "textMessage", text: `${this.name} is burning!` },
        { type: "stateChange", burn: true },
      ];
    }
    return [];
  }

  decrementStatus() {
    if (this.status?.expiresIn > 0) {
      this.status.expiresIn -= 1;
      if (this.status.expiresIn === 0) {
        if (this.status.type === "defUp") {
        }
        this.update({
          status: null,
        });
        this.removeDefUp();
        return {
          type: "textMessage",
          text: "Status expired!",
        };
      }
      
    }
    return null;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.hudElement);
    container.appendChild(this.pizzaElement);
    this.update();
  }
}
