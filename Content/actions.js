window.Actions = {
    damage1: {
        name: "Whomp!",
        success: [
            { type: "textMessage", text: "{CASTER} used {ACTION}!"},
            { type: "animation", animation: "spin"},
            { type: "stateChange", damage: 5}, 
        ]    
    }

}