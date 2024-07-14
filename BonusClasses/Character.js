class Character {
  constructor(characterConfig = {}) {
    // Set default values for all properties
    this.name = 'Unknown';
    this.level = 1;
    this.maxHP = 100;
    this.xp = 0;
    this.maxXp = 100;
    
    this.attackPower = 10;
    this.defensePower = 5;
    // 6 Core Stats
    // Hp, Def, Speed, Str, Dex, Int
    this.hp = 100; // Raw value of having more hp
    this.defense = 5; // Raw value of mitigation from Attack Power, contributes to defensePower
    this.speed = 10; // Raw value determining Turn order in Combat, and contributes to Attack and Defense Power
    this.strength = 10; // Raw Value that contributes to Attack Power and Defense Power
    this.dexterity = 10; // Raw value that contributes to Attack Power and Defense Power
    this.intelligence = 10; // Raw value that contributes to Attack Power and Defense Power

    // Override default values with values from characterConfig
    Object.keys(characterConfig).forEach((key) => {
      this[key] = characterConfig[key];
    });
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
    if (this.xp >= this.maxXp) {
      this.levelUp();
    }
  }

  // Method to level up
  levelUp() {
    this.level += 1;
    this.xp = 0;
    this.maxXp = this.calculateNextLevelXp();

    
    // Increase stats on level up
    // Example incrementation
    this.maxHP += 10; 
    this.attackPower += 2;
    this.defensePower += 2;
    this.defense += 1;
    this.speed += 1;
    this.strength += 1;
    this.dexterity += 1;
    this.intelligence += 1;
  }

  // Method to calculate XP needed for next level
  calculateNextLevelXp() {
    // Example Formula
    return this.level * 100; 
  }

  // Method to display character stats
  displayStats() {
    return `Name: ${this.name}
Level: ${this.level}
HP: ${this.hp}/${this.maxHP}
XP: ${this.xp}/${this.maxXp}
Attack Power: ${this.attackPower}
Defense Power: ${this.defensePower}
Defense: ${this.defense}
Speed: ${this.speed}
Strength: ${this.strength}
Dexterity: ${this.dexterity}
Intelligence: ${this.intelligence}`;
  }
}

// Example usage
const heroConfig = {
  name: 'Hero'
};

const hero = new Character(heroConfig);
console.log(hero.displayStats());
