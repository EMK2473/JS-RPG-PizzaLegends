// Window level Object, contains different enemies and their properties


window.Enemies = {
    "erio": {
      name: "Erio",
      src: "./images/characters/people/erio.png",
      pizzas: {
        "a": {
          pizzaId: "s001",
          maxHp: 50,
          level: 1,
        },
        "b": {
          pizzaId: "s002",
          maxHp: 50,
          level: 1,
        },
      }
    },
    "beth": {
      name: "Beth",
      src: "./images/characters/people/npc1.png",
      pizzas: {
        "a": {
          hp: 100,
          pizzaId: "s001",
          maxHp: 100,
          level: 1,
        },
      }
    },
    "lyle": {
      name: "Lyle",
      src: "./images/characters/people/gunSlinger12.png",
      pizzas: {
        "a": {
          pizzaId: "elderDruid",hp: 160,
          maxHp: 160,
          level: 100,
        },
      }
    }
  }