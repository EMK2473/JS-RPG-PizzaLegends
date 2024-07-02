window.Actions = {
  damage1: {
    name: "Smack!",
    description: "Smack dough across their face",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 5 },
    ],
  },
  saucyStatus: {
    name: "Tomato Squeeze!",
    description: "Covers you in sauce",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "stateChange", status: { type: "saucy", expires: 2 } },
      { type: "textMessage", text: "{CASTER} gained {STATUS}!" },
    ],
  },
  clumsyStatus: {
    name: "Olive oil",
    description: "Slippery and Dangerous",
    targetType: "enemy",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "glob", color: "#dafd2a" },
      { type: "stateChange", status: { type: "clumsy", expires: 3 } },
      { type: "textMessage", text: "{TARGET} became clumsy!" },
    ],
  },
  saucyStatus2: {
    name: "SUPER TOMATO SQUEEEEZE!!!!!",
    description: "Super Powerful Tomato squeeze",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "stateChange", status: { type: "saucy", expires: 3 } },
    ],
  },
  item_recoverStatus: {
    name: "Heating Lamp",
    description: "Feeling fresh and warm",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} used a {ACTION}!" },
      { type: "stateChange", status: null },
      { type: "textMessage", text: "{CASTER} is all warmed up!" },

    ],
  },
};

// Items
