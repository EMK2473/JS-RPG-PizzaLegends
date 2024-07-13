// Window level Object, contains different Pizzas/Units/Types
// Pizzas are essentially "units", or "pokemon"
// This will not include default and base values, as those are defined in the constructor
// This will include individual properties, such as icons, img src, types, and name

window.PizzaTypes = {
  normal: "normal",
  offensive: "offensive",
  defensive: "defensive",
  support: "support",
  spicy: "spicy",
  veggie: "veggie",
  fungi: "fungi",
  chill: "chill",
};

window.Pizzas = {
  s001: {
    name: "Slice Samurai",
    description: "Supreme Slicer",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/sliceSamurai.png",
    icon: "./images/icons/fighter.png",
    actions: ["slice", "confusedStatus", "saucyStatus"],
  },
  s002: {
    name: "Bacon Fighter",
    description: "Big ol' bacon lover who fears no pizza",
    type: PizzaTypes.defensive,
    src: "./images/characters/pizzas/baconFighter.png",
    icon: "./images/icons/defender.png",
    actions: ["extraCrispy", "smokedApplewood"],
  },
  cerberus: {
    name: "Cerberus",
    description: "Three Headed Guard Dog of Hell.",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/cerberus.png",
    icon: "./images/icons/defender.png",
    actions: ["tripleBite", "confusedStatus", ],
  },
  thanatos: {
    name: "Thanatos",
    description: "Death personified.",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/thanatos32.png",
    icon: "./images/icons/fighter.png",
    actions: ["gigaFlare", "confusedStatus", ],
  },
  bahamut: {
    name: "Bahamut",
    description: "A literal god. You should be kneeling right now.",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/bahamut.png",
    icon: "./images/icons/fighter.png",
    actions: ["gigaFlare", "confusedStatus",],
  },
  mageUnit: {
    name: "Mage",
    description: "An arcane mage.",
    type: PizzaTypes.support,
    src: "./images/characters/pizzas/mageUnit.png",
    icon: "./images/icons/defender.png",
    actions: ["slice"],
  },
  samuraiUnit: {
    name: "Samurai",
    description: "A samurai with a Katana.",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/samuraiUnit.png",
    icon: "./images/icons/fighter.png",
    actions: ["slice"],
  },
  warriorUnit: {
    name: "Warrior",
    description: "A warrior dual wielding axes.",
    type: PizzaTypes.defensive,
    src: "./images/characters/pizzas/warriorUnit.png",
    icon: "./images/icons/defender.png",
    actions: ["slice"],
  },
  c001: {
    name: "Bahamut 'za",
    description: "Radiation Supreme",
    type: PizzaTypes.spicy,
    src: "./images/characters/pizzas/bahamutLeft.png",
    icon: "./images/icons/spicy.png",
    actions: ["gigaFlare", "confusedStatus", "saucyStatus"],
  },
  elderDruid: {
    name: "Thantos",
    description: "Very old druid.",
    type: PizzaTypes.spicy,
    src: "./images/characters/pizzas/thanatosRight.png",
    icon: "./images/icons/spicy.png",
    actions: ["gigaFlare"],
  },
};
