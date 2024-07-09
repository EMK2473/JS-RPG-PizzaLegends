class ObjectStone extends GameObject {
    constructor(config) {
        super(config);
        this.sprite = new Sprite({
            gameObject: this,
            src: "./images/characters/purple-stone.png",
            // frame for used
            // frame for unused
            animations: {
                "used-down" : [ [1,0] ],
                "unused-down": [ [0,0] ]
            },
            currentAnimation: "used-down"
        });
        this.storyFlag = config.storyFlag;
        this.pizzas = config.pizzas;


        this.talking = [
           {
            required: [this.storyFlag],
            events: [
                {type: "textMessage", text: "There is nothing there."}
            ]
           },
           {
            events: [
                { type: "textMessage", text: "An orb resonating with energy..."},
                { type: "textMessage", text: "It's warm to the touch."},
                { type: "craftingMenu", pizzas: this.pizzas},
                {type: "addStoryFlag", flag: this.storyFlag }
            ]
           }
        ]
    }

    // Methods
    update(){
        this.sprite.currentAnimation = playerState.storyFlags[this.storyFlag]
        ? "used-down" : "unused-down"
    }
}