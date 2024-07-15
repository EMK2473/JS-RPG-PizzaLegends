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
        this.hp +=20;
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
    
        // Method to calculate damage before armor with custom rounding
        calculateDamage() {
        let damageBeforeArmor = (this.attackPower * (this.effectiveAttackPower * 0.1) + ((this.effectiveAttackPower * 0.1)-1));
        let decimalPart = damageBeforeArmor - Math.floor(damageBeforeArmor);
    
        if (decimalPart > 0.66) {
            return Math.ceil(damageBeforeArmor);
        } else {
            return Math.floor(damageBeforeArmor);
        }
        }
    
        // Example method to display character stats
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
    }
    
    // Example usage
    const heroConfig = {
        name: 'Hero'
    };
    
    const hero = new Character(heroConfig);
    console.log(hero.displayStats());
    
    // Simulate gaining XP and leveling up
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
    
    hero.gainXp(900);
    console.log(hero.displayStats());
    