class ObjectStone extends GameObject {
    constructor(config) {
        super(config);
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src,
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
                {type: "textMessage", text: "There is nothing left."}
            ]
           },
           {
            events: [
                { type: "textMessage", text: "Use this to help you on your journey..."},
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