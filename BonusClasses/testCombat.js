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
      this.power = 10;

  
      // Override default values with values from characterConfig
      Object.keys(characterConfig).forEach((key) => {
        this[key] = characterConfig[key];
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
  
    // Example method to calculate XP needed for next level
    calculateNextLevelXp() {
      return this.level * 100; // Example formula, you can adjust as needed
    }
  
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
  
    // Method to attack 
    attack(target) {
      let damage = this.calculateDamage() - (target.armor + target.defense);
      if (damage < 0) damage = 0;
      target.takeDamage(damage);
      console.log(`${this.name} attacks ${target.name} for ${damage} damage.`);
    }
  }
  
  // Example usage
  const heroConfig = {
    name: 'Hero',
    // level: 5,
    // hp: 200,
    // maxHP: 200,
    // attackPower: 15,
    // armor: 7,
    // defense: 7,
    // speed: 12,
    // power: 12,
    // dexterity: 11,
    // intelligence: 11
  };
  
  const villainConfig = {
    name: 'Villain',
    // level: 5,
    // hp: 200,
    // maxHP: 200,
    // attackPower: 15,
    // armor: 7,
    // defense: 7,
    // speed: 12,
    // power: 12,
    // dexterity: 11,
    // intelligence: 11
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
  
  villain.gainXp(1000)
  hero.gainXp(100);
    console.log("level2:", hero.displayStats());
    hero.gainXp(200);
    console.log("level3:",hero.displayStats());
    hero.gainXp(300);
    console.log("level4:",hero.displayStats());
    hero.gainXp(400);
    console.log("level5:",hero.displayStats());
    hero.gainXp(500);
    console.log("level6:",hero.displayStats());
    hero.gainXp(600);
    console.log("level7:",hero.displayStats());
    hero.gainXp(700);
    console.log(hero.displayStats());


  combatEncounter(hero, villain);
  const winner = combatEncounter(hero, villain);

console.log(`Winner's Final HP: ${winner.hp}`);
  console.log(hero.displayStats());
  console.log(villain.displayStats());
  