window.Actions = {
  damage1: {
    name: "Smack!",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 5 },
    ],
  },
  saucyStatus: {
    name: "Tomato Squeeze!",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "stateChange", status: { type: "saucy", expires: 1 } },
      { type: "textMessage", text: "{CASTER} gained {STATUS}!" },
    ],
  },
  clumsyStatus: {
    name: "Olive oil",
    targetType: "enemy",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "stateChange", status: { type: "clumsy", expires: 3 } },
      { type: "textMessage", text: "{TARGET} became clumsy!" },

    ],
  },
  saucyStatus2: {
    name: "SUPER TOMATO SQUEEEEZE!!!!!",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "stateChange", status: { type: "saucy", expires: 3 } },
    ],
  },
};
