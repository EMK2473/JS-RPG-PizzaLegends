window.Actions = {
  slice: {
    name: "Slice!",
    description: "Katana this b****.",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 10 },
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
    description: "Warming up removes statuses",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} used a {ACTION}!" },
      { type: "stateChange", status: null },
      { type: "textMessage", text: "{CASTER} is all warmed up!" },

    ],
  },
  item_recoverHp: {
    name: "Grated Parmesean and Mozzarella",
    description: "Being this cheesy never felt so good",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} sprinkles some {ACTION}!" },
      { type: "stateChange", recover: 15 },
      { type: "textMessage", text: "{CASTER} recovered some HP!" },
      { type: "stateChange", status: { type: "saucy", expires: 3 } },

    ],
  },
  gigaFlare: {
    name: "Gigaflare",
    description: "Smack dough across their face",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "glob", color: "#3c1361" },
      { type: "stateChange", damage: 5  },
      { type: "animation", animation: "glob", color: "#52307c" },
      { type: "stateChange", damage: 10  },
      { type: "animation", animation: "glob", color: "#bca0dc" },
      { type: "stateChange", damage: 15  },

    ],
  },
  extraCrispy: {
    name: "Extra Crispy",
    description: "🥓🥓🥓",

    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 15,  },
      // { type: "stateChange", recover: 25  },

    ],
  },
  smokedApplewood: {
    name: "Smoked Applewood",
    description: "Perfectly undercooked.",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      // { type: "animation", animation: "spin" },
      { type: "stateChange", recover: 25,  },
      // { type: "stateChange", recover: 25  },

    ],
  },
};

// Items
