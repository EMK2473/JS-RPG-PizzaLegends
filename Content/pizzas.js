// Pizzas are essentially "units", or "pokemon"
// Content is where we define properties for each unit
// This will not include default and base values, as those are defined in the constructor
// This will include individual properties, such as icons, img src, types, and name

window.PizzaTypes = {
  normal: "normal",
  spicy: "spicy",
  veggie: "veggie",
  fungi: "fungi",
  chill: "chill",
};

window.Pizzas = {
  s001: {
    name: "Slice Samurai",
    description: "Classic Supreme",
    type: PizzaTypes.spicy,
    src: "./images/characters/pizzas/s001.png",
    icon: "./images/icons/spicy.png",
    actions: ["damage1", "clumsyStatus", "saucyStatus",],
  },
  s002: {
    name: "Bacon Fighter",
    description: "Big ol' bacon lover who fears no pizza",
    type: PizzaTypes.spicy,
    src: "./images/characters/pizzas/s002.png",
    icon: "./images/icons/spicy.png",
    actions: ["clumsyStatus", "saucyStatus", "damage1"],
  },
  v001: {
    name: "Call Me Kale",
    description: "Very Vegetarian",
    type: PizzaTypes.veggie,
    src: "./images/characters/pizzas/v001.png",
    icon: "./images/icons/veggie.png",
    actions: ["damage1"],
  },
  f001: {
    name: "Portobella Express",
    description: "A fun guy pizza",
    type: PizzaTypes.fungi,
    src: "./images/characters/pizzas/f001.png",
    icon: "./images/icons/fungi.png",
    actions: ["damage1"],
  },
};
