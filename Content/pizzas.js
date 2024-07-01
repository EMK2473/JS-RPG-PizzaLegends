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
}

window.Pizzas = {
    "s001": {
        name: "Slice Samurai",
        type: PizzaTypes.spicy,
        src: "./images/characters/pizzas/s001.png",
        icon: "./images/icons/spicy.png"
    },
    "v001": {
        name: "Call Me Kale",
        type: PizzaTypes.veggie,
        src: "./images/characters/pizzas/v001.png",
        icon: "./images/icons/veggie.png"
    },
    "f001": {
        name: "Portobella Express",
        type: PizzaTypes.fungi,
        src: "./images/characters/pizzas/f001.png",
        icon: "./images/icons/fungi.png"
    }
}