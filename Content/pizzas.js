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
    description: "Supreme Slicer",
    type: PizzaTypes.spicy,
    src: "./images/characters/pizzas/sliceSamurai.png",
    icon: "./images/icons/spicy.png",
    actions: ["slice", "clumsyStatus", "saucyStatus"],
  },
  s002: {
    name: "Bacon Fighter",
    description: "Big ol' bacon lover who fears no pizza",
    type: PizzaTypes.chill,
    src: "./images/characters/pizzas/baconFighter.png",
    icon: "./images/icons/defender.png",
    actions: ["extraCrispy", "smokedApplewood",],
  },
  bahamut: {
    name: "Supreme Bahamut",
    description: "A literal god. You should be kneeling right now.",
    type: PizzaTypes.spicy,
    src: "./images/characters/pizzas/bahamut.png",
    icon: "./images/icons/fighter.png",
    actions: ["gigaFlare", "clumsyStatus", "saucyStatus"],
  },
  v001: {
    name: "Call Me Kale",
    description: "Very Vegetarian",
    type: PizzaTypes.veggie,
    src: "./images/characters/pizzas/v001.png",
    icon: "./images/icons/veggie.png",
    actions: ["slice"],
  },
  f001: {
    name: "Portobella Express",
    description: "A fun guy pizza",
    type: PizzaTypes.fungi,
    src: "./images/characters/pizzas/f001.png",
    icon: "./images/icons/fungi.png",
    actions: ["slice"],
  },
  c001: {
    name: "Bahamut 'za",
    description: "Radiation Supreme",
    type: PizzaTypes.spicy,
    src: "./images/characters/pizzas/bahamutLeft.png",
    icon: "./images/icons/spicy.png",
    actions: ["gigaFlare", "clumsyStatus", "saucyStatus"],
  },
};
