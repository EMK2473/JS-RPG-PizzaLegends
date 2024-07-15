// Window level Object, contains different actions


// {
//   type: "stateChange",
//   damage: (caster, target) => window.calculateDamage(10, 1.2) // Example multiplier
// },

window.Actions = {
  slice: {
    name: "Slice!",
    description: "Katana this b****.",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", calculateDamage:true },
    ],
  },
  saucyStatus: {
    name: "Tomato Squeeze!",
    description: "Covers you in sauce",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "stateChange", status: { type: "saucy", expiresIn: 4 } },
      { type: "textMessage", text: "{CASTER} gained {STATUS}!" },
    ],
  },
  confusedStatus: {
    name: "Confusion",
    description: "Confuse your enemy",
    targetType: "enemy",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "glob", color: "#dafd2a" },
      { type: "stateChange", status: { type: "confused", expiresIn: 5 } },
      { type: "textMessage", text: "{TARGET} became confused!" },
    ],
  },
  burnStatus: {
    name: "Burn",
    description: "Burning damage over time",
    targetType: "enemy",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "fastGlob", color: "#dafd2a" },
      { type: "stateChange",status: { type: "burn", expiresIn: 3 }, },
    ],
  },
  defenseUpStatus: {
    name: "DEF ^",
    description: "Increase your def",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "stateChange", status: { type: "DEF ^", expiresIn: 4 } },
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
      { type: "stateChange", status: { type: "saucy", expiresIn: 3 } },

    ],
  },
  item_defenseUp: {
    name: "Defense Up",
    description: "Increase your defense for 4 turns",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} {ACTION}!" },
      { type: "stateChange", status: { type: "DEF ^", expiresIn: 4 } },

    ],
  },
  gigaFlare: {
    name: "Gigaflare",
    description: "Smack dough across their face",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "glob", color: "#3c1361" },
      { type: "stateChange", calculateDamage: true },
      { type: "animation", animation: "glob", color: "#52307c" },
      { type: "stateChange", calculateDamage: true },
      { type: "animation", animation: "glob", color: "#bca0dc" },
      { type: "stateChange", calculateDamage: true },

    ],
  },
  tripleBite: {
    name: "Triple Bite",
    description: "Three times the bite!",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "triple_Bite"},
      { type: "stateChange", damage: 5  },
      { type: "animation", animation: "triple_Bite"},
      { type: "stateChange", damage: 10  },
      { type: "animation", animation: "triple_Bite"},
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
