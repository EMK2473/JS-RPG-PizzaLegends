class Character {
    constructor(characterConfig = {}) {
      // Set default values for all properties
      this.name = 'Unknown';
      this.level = 1;
      this.hp = 100;
      this.maxHP = 100;
      this.xp = 0;
      this.maxXp = 100;
      this.attackPower = 10;
      this.armor = 5;
      this.defense = 5;
      this.speed = 10;
      this.strength = 10;
      this.dexterity = 10;
      this.intelligence = 10;
  
      // Override default values with values from characterConfig
      Object.keys(characterConfig).forEach((key) => {
        this[key] = characterConfig[key];
      });
  
      // Calculate initial effective attack power
      this.calculateAttackPower();
    }
  
    // Method to calculate effective attack power based on strength
    calculateAttackPower() {
      this.effectiveAttackPower = this.attackPower + this.strength * 0.5; // Example formula, adjust as needed
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
      this.maxHP += 20; // Example increment, you can adjust as needed
      this.attackPower += 2;
      this.armor += 2;
      this.defense += 1;
      this.speed += 1;
      this.strength += 2; // Increase strength more significantly
      this.dexterity += 1;
      this.intelligence += 1;
  
      // Recalculate effective attack power after leveling up
      this.calculateAttackPower();
    }
  
    // Example method to calculate XP needed for next level
    calculateNextLevelXp() {
      return this.level * 100; // Example formula, you can adjust as needed
    }
  
    calculateDamage() {
        let baseDamage = this.attackPower * (this.effectiveAttackPower * 0.1);
      
        // Calculate random modifier based on current strength
        let randomModifier = Math.floor(Math.random() * (this.strength + 1));
      
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
  Strength: ${this.strength}
  Dexterity: ${this.dexterity}
  Intelligence: ${this.intelligence}
  Damage Before Armor: ${this.calculateDamage()}`;
    }
  
    // Method to attack another character
    attack(target) {
      let damage = this.calculateDamage() - target.armor;
      if (damage < 0) damage = 0;
      target.takeDamage(damage);
      console.log(`${this.name} attacks ${target.name} for ${damage} damage.`);
    }
  }
  
  // Example usage
  const heroConfig = {
    name: 'Hero',
    level: 5,
    hp: 120,
    maxHP: 120,
    attackPower: 15,
    armor: 7,
    defense: 7,
    speed: 12,
    strength: 12,
    dexterity: 11,
    intelligence: 11
  };
  
  const villainConfig = {
    name: 'Villain',
    level: 5,
    hp: 120,
    maxHP: 120,
    attackPower: 15,
    armor: 7,
    defense: 7,
    speed: 12,
    strength: 12,
    dexterity: 11,
    intelligence: 11
  };
  
  const hero = new Character(heroConfig);
  const villain = new Character(villainConfig);
  

// Simulate a combat encounter
// While loop!
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
  
  combatEncounter(hero, villain);
  const winner = combatEncounter(hero, villain);

console.log(`Winner's Final HP: ${winner.hp}`);
  console.log(hero.displayStats());
  console.log(villain.displayStats());
  