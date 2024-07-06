class Pokemon {
    constructor(name, type, level = 1, hp = null, moves = []) {
        this.name = name;
        this.type = type;
        this.level = level;
        this.hp = hp !== null ? hp : this.calculateHp();
        this.moves = moves;
    }

    // moethod for calculating hp based on level
    // adds 10 hp per level
    calculateHp() {
        const baseHp = 50; // Starting HP for a level 1 Pokémon
        return baseHp + (this.level - 1) * 10;
    }

    // method to display pokemon details
    toString() {
        return `Pokemon(${this.name}, Type: ${this.type}, Level: ${this.level}, HP: ${this.hp}, Moves: ${this.moves.join(", ")})`;
    }
}


// create a new instance of pokemon class, defined as pikachu
const pikachu = new Pokemon("Pikachu", "Electric", 5, null, ["Thunder Shock", "Quick Attack"]);


//npm Pokemon.js for consoleexample
console.log(pikachu.toString());
