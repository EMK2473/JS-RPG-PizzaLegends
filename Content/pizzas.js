// window level Object, contains different Pizzas/Units/Types
// pizzas are essentially "units", or "pokemon"
// this will not include default and base values, as those are defined in the constructor
// this will include individual properties, such as icons, img src, types, and name

window.PizzaTypes = {
  normal: "normal",
  offensive: "offensive",
  defensive: "defensive",
  support: "support",
  brawler: "brawler",
  ruinic: "ruinic",
  arcane: "arcane",
  spicy: "spicy",
  veggie: "veggie",
  fungi: "fungi",
  chill: "chill",
};

const fighterIcon = "./images/icons/fighter.png"
const defenderIcon = "./images/icons/defender.png"
const supportIcon = "./images/icons/support.png"

window.Pizzas = {
  acceptance: {
    name: "Acceptance",
    description: "What's left",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/acceptance.png",
    icon: fighterIcon,
    actions: ["slice", "confusedStatus"],
  },closure: {
    name: "Closure",
    description: "What's left",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/closure.png",
    icon: fighterIcon,
    actions: ["burnStatus", "confusedStatus", "saucyStatus"],
  },empathy: {
    name: "Empathy",
    description: "What's left",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/empathy.png",
    icon: fighterIcon,
    actions: ["slice", "confusedStatus", "saucyStatus"],
  },growth: {
    name: "Growth",
    description: "What's left",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/growth.png",
    icon: fighterIcon,
    actions: ["slice", "confusedStatus", "saucyStatus"],
  },memorial: {
    name: "Memory",
    description: "What's left",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/memorial.png",
    icon: fighterIcon,
    actions: ["slice", "confusedStatus", "saucyStatus"],
  },reflection: {
    name: "Reflection",
    description: "What's left",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/reflection.png",
    icon: fighterIcon,
    actions: ["slice", "confusedStatus", "saucyStatus"],
  },sadness: {
    name: "Sadness",
    description: "What's left",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/sadness.png",
    icon: fighterIcon,
    actions: ["slice", "confusedStatus", "saucyStatus"],
  },
  cerberus: {
    name: "Cerberus",
    description: "Three Headed Guard Dog of Hell.",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/cerberus.png",
    icon: defenderIcon,
    actions: ["tripleBite", "confusedStatus", ],
  },
  thanatos: {
    name: "Thanatos",
    description: "Death personified.",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/thanatos32.png",
    icon: fighterIcon,
    actions: ["gigaFlare", "confusedStatus", ],
  },
  bahamut: {
    name: "Bahamut",
    description: "A literal god. You should be kneeling right now.",
    type: PizzaTypes.offensive,
    src: "./images/characters/pizzas/bahamut.png",
    icon: fighterIcon,
    actions: ["gigaFlare", "confusedStatus",],
  },
  mageUnit: {
    name: "Mage",
    description: "An arcane mage.",
    type: PizzaTypes.support,
    src: "./images/characters/pizzas/mageUnit.png",
    icon: supportIcon,
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
