class Character {
    constructor(characterConfig = {}) {
      // Set default values for all properties
      this.name = characterConfig.name || 'Unknown';
      this.level = characterConfig.level || 1;
      this.hp = characterConfig.hp || 100;
      this.maxHP = characterConfig.maxHP || 100;
      this.xp = characterConfig.xp || 0;
      this.maxXp = this.calculateNextLevelXp();
      this.attackPower = characterConfig.attackPower || 10;
      this.armor = characterConfig.armor || 5;
      this.defense = characterConfig.defense || 5;
      this.speed = characterConfig.speed || 10;
      this.power = characterConfig.power || 10;
  
      this.stats = {
        DEF: 0,
        SPD: 0,
        PWR: 0,
        VIT: 0
      };
  
      // Override default values with values from characterConfig
      Object.keys(characterConfig).forEach((key) => {
        if (key === 'stats') {
          Object.keys(characterConfig.stats).forEach((statKey) => {
            this.stats[statKey] = characterConfig.stats[statKey];
          });
        }
      });
  
      // Calculate initial effective attack power
      this.calculateAttackPower();
    }
  
    // Method to calculate effective attack power based on power
    calculateAttackPower() {
      this.effectiveAttackPower = this.attackPower + this.power * 0.5; // Example formula, adjust as needed
    }
  
    // Method to take damage
    takeDamage(damage) {
      this.hp -= damage;
      if (this.hp < 0) {
        this.hp = 0;
      }
    }
  
    // Method to gain experience
    gainXp(amount) {
      this.xp += amount;
      while (this.xp >= this.maxXp) {
        this.xp -= this.maxXp;
        this.levelUp();
      }
    }
  
    // Method to level up
    levelUp() {
      this.level += 1;
      this.maxXp = this.calculateNextLevelXp();
      // Increase stats on level up
      this.hp += 20;
      this.maxHP += 20;
      this.attackPower += 2;
      this.armor += 1.5;
      this.defense += 1;
      this.speed += 2.5;
      this.power += 2;
  
      // Recalculate effective attack power after leveling up
      this.calculateAttackPower();
    }
  
    // Method to invest stats points
    investStats(defIncrease, spdIncrease, pwrIncrease, vitIncrease) {
      if (defIncrease + spdIncrease + pwrIncrease + vitIncrease !== 4) {
        throw new Error("You must distribute exactly 4 points among DEF, SPD, PWR, and VIT.");
      }
  
      // Update stats object
      this.stats.DEF += defIncrease;
      this.stats.SPD += spdIncrease;
      this.stats.PWR += pwrIncrease;
      this.stats.VIT += vitIncrease;
  
      // Update character properties based on stats
      this.defense = 5 + 2 * this.stats.DEF;
      this.speed = 10 + 2 * this.stats.SPD;
      this.power = 10 + 2 * this.stats.PWR;
      this.maxHP = this.maxHP + 20 * this.stats.VIT;
  
      // Optionally, you may want to recalculate other dependent stats here
      // For example:
      // this.calculateAttackPower();
    }
  
    // Example method to calculate XP needed for next level
    calculateNextLevelXp() {
      return this.level * 100; // Example formula, you can adjust as needed
    }
  
    // Method to calculate damage
    calculateDamage() {
      let baseDamage = this.attackPower * (this.effectiveAttackPower * 0.1);
  
      // Calculate random modifier based on current power
      let randomModifier = Math.floor(Math.random() * (this.power + 1));
  
      // Add the random modifier to the base damage
      let totalDamage = baseDamage + randomModifier;
  
      // Round the total damage based on the decimal part
      let decimalPart = totalDamage - Math.floor(totalDamage);
      if (decimalPart > 0.66) {
        return Math.ceil(totalDamage);
      } else {
        return Math.floor(totalDamage);
        
      }
    }
  
    // Method to display character stats
    displayStats() {
      return `Name: ${this.name}
  Level: ${this.level}
  HP: ${this.hp}/${this.maxHP}
  XP: ${this.xp}/${this.maxXp}
  Attack Power: ${this.attackPower}
  Effective Attack Power: ${this.effectiveAttackPower}
  Armor: ${this.armor}
  Defense: ${this.defense}
  Speed: ${this.speed}
  Power: ${this.power}
  Damage Before Armor: ${this.calculateDamage()}`;
    }
  
    // Method to attack another character
    attack(target) {
      let damage = this.calculateDamage() - (target.armor + Math.floor(target.defense * 0.5));
      if (damage < 0) damage = 0;
      target.takeDamage(damage);
      console.log(`${this.name} attacks ${target.name} for ${damage} damage.`);
    }
  }
  
  // Example usage
  const heroConfig = {
    name: 'Hero',
    level: 1,
    hp: 100,
    maxHP: 100,
    attackPower: 10,
    armor: 5,
    defense: 5,
    speed: 10,
    power: 10,
    stats: {
      DEF: 0,
      SPD: 0,
      PWR: 0,
      VIT: 0
    }
  };
  
  const villainConfig = {
    name: 'Villain',
    level: 1,
    hp: 100,
    maxHP: 100,
    attackPower: 10,
    armor: 5,
    defense: 5,
    speed: 10,
    power: 10,
    stats: {
      DEF: 0,
      SPD: 0,
      PWR: 0,
      VIT: 0
    }
  };
  
  const hero = new Character(heroConfig);
  const villain = new Character(villainConfig);
  
  // Simulate a combat encounter
  function combatEncounter(character1, character2) {
    while (character1.hp > 0 && character2.hp > 0) {
      character1.attack(character2);
      if (character2.hp > 0) {
        character2.attack(character1);
      }
    }
  
    if (character1.hp > 0) {
      console.log(`${character1.name} wins!`);
      return character1;
    } else {
      console.log(`${character2.name} wins!`);
      return character2;
    }
  }
  
  // Example: Level up and invest stats for hero
  hero.gainXp(1000); // Gain enough XP to level up multiple times
  hero.investStats(0, 0, 4, 0); // Invest 1 point each in DEF, SPD, PWR, and VIT

  villain.gainXp(1000); // Gain enough XP to level up multiple times
  villain.investStats(4, 0, 0, 0); // Invest 1 point each in DEF, SPD, PWR, and VIT
  
  // Display stats after leveling up and investing stats
  console.log(hero.displayStats());
  
  // Example: Combat encounter
  combatEncounter(hero, villain);
  const winner = combatEncounter(hero, villain);
  console.log(`Winner's Final HP: ${winner.hp}`);
  // Display final stats after combat
  console.log(hero.displayStats());
  console.log(villain.displayStats());
  