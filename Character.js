class Character {
    constructor() {
      this.level = 1;
      this.strength = 0; // Base STR
      this.vitality = 0; // Base VIT
      this.intelligence = 0;
      this.defense = 0;
      this.dexterity = 0;
      this.availablePoints = 0; // Points to invest
    }
  
    // Method to level up the character
    levelUp() {
      this.level += 1;
      this.availablePoints += 3;
      console.log(`Leveled up to level ${this.level}. You have ${this.availablePoints} points to invest.`);
    }
  
    // Method to invest points into a stat
    investPoints(stat, points) {
      if (points > this.availablePoints) {
        console.log(`Not enough points. You have ${this.availablePoints} points available.`);
        return;
      }
  
      this.availablePoints -= points;
  
      if (stat === "strength") {
        this.strength += points;
        console.log(`Invested ${points} points into Strength. Strength is now ${this.strength}.`);
      } else if (stat === "vitality") {
        this.vitality += points;
        console.log(`Invested ${points} points into Vitality. Vitality is now ${this.vitality}.`);
      } else {
        console.log(`Unknown stat: ${stat}`);
      }
    }
  
    // Method to calculate the effective value of a stat considering bonuses
    // if base value is 10, pass 10
    // 10/2 rounded down =  even count
    calculateEffectiveStat(baseValue) {
      let evenCount = Math.floor(baseValue / 2);
      return baseValue + evenCount;
    }
  
    // Method to display the character's stats with bonuses
    displayStats() {
      let effectiveStrength = this.calculateEffectiveStat(this.strength);
      let effectiveVitality = this.calculateEffectiveStat(this.vitality);
  
      console.log(`Effective Strength: ${effectiveStrength} (Base: ${this.strength})`);
      console.log(`Effective Vitality: ${effectiveVitality} (Base: ${this.vitality})`);
    }
  }
  
  // Example Usage
  let myCharacter = new Character();
  
  myCharacter.levelUp(); // Level 2, 3 points available
  myCharacter.investPoints("strength", 2); // STR increases to 2
  myCharacter.displayStats(); // Effective STR = 2 + 1 (bonus) = 3
  
  myCharacter.levelUp(); // Level 3, 3 more points available
  myCharacter.investPoints("strength", 3); // STR increases to 5
  myCharacter.displayStats(); // Effective STR = 5 + 2 (bonus) = 7
  
  myCharacter.levelUp(); // Level 4, 3 more points available
  myCharacter.investPoints("vitality", 4); // VIT increases to 4
  myCharacter.displayStats(); // Effective VIT = 4 + 2 (bonus) = 6
  