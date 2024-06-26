class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc; // floor

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc; // ceiling
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage, 
            utils.withGrid(10.5) - cameraPerson.x, 
            utils.withGrid(6) - cameraPerson.y
        )
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage, 
            utils.withGrid(10.5) - cameraPerson.x, 
            utils.withGrid(6) - cameraPerson.y
        )
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "./images/maps/DemoLower.png",
        upperSrc: "./images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person ({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            npcA: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "./images/characters/people/npc1.png"
            }),
        }
    },
    Kitchen: {
        lowerSrc: "./images/maps/KitchenLower.png",
        upperSrc: "./images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person ({
                x: utils.withGrid(1),
                y: utils.withGrid(8),
                isPlayerControlled: true,
            }),
            npcA: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(6),
                src: "./images/characters/people/npc2.png"
            }),
        }
    },
    Office: {
        lowerSrc: "./images/maps/office-cubicles.png",
        upperSrc: "./images/maps/KitchenUpper.png",
        gameObjects: {

            npcB: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(8),
                src: "./images/characters/people/death.png"
            }),
            npcF: new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                src: "./images/characters/people/oKnight128-Sheet.png"
            }),
        }
    },
    StartScreen: {
        lowerSrc: "./images/maps/StartScreen2.png",
        upperSrc: "./images/maps/KitchenUpper.png",
        gameObjects: {
            npcD: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(4),
                src: "./images/characters/people/employee-sheet-Sheet.png"
            }),
            npcC: new Person({
                x: utils.withGrid(4),
                y: utils.withGrid(4),
                src: "./images/characters/people/janitor-sheet-Sheet.png"
            }),
            npcE: new Person({
                x: utils.withGrid(6.5),
                y: utils.withGrid(4),
                src: "./images/characters/people/firefighterSmall-Sheet.png"
            }),
            npcF: new Person({
                isPlayerControlled: true,

                x: utils.withGrid(8.5),
                y: utils.withGrid(7),
                src: "./images/characters/people/oKnight128-Sheet.png"
            }),
        }
    }
}


