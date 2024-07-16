// map containers
// contains map objects and map state
// contains wall methods
// contains cutscene methods
// contains behavior loops
// contains events (talking)
// contains check for if space is taken

class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.gameObjects = config.gameObjects;

    this.cutsceneSpaces = config.cutsceneSpaces || {};

    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc; // floor

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc; // ceiling

    this.isCutscenePlaying = false;

    this.isPaused = false;
  }

  // Methods
  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      let object = this.gameObjects[key];
      object.id = key;
      // TODO: determine if this object should actually mount
      object.mount(this);
    });
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;

    // start a loop of async events
    // await each one
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      });
      const result = await eventHandler.init();
      if (result === "LOST_BATTLE") {
        break;
      }
    }

    this.isCutscenePlaying = false;

    // Reset NPCs to do their idle behavior
    Object.values(this.gameObjects).forEach((object) =>
      object.doBehaviorEvent(this)
    );
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find((object) => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
    });
    console.log({ match });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      const relevantScenario = match.talking.find((scenario) => {
        return (scenario.required || []).every((sf) => {
          return playerState.storyFlags[sf];
        });
      });

      relevantScenario && this.startCutscene(relevantScenario.events);
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    console.log({ match });
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events);
    }
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }

  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }

  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }

  // mountObjects() {
  //   Object.keys(this.gameObjects).forEach((key) => {
  //     let object = this.gameObjects[key];
  //     object.id = key;

  //     // TODO: determine if this object should actually mount
  //     object.mount(this);
  //   });
  // }
}

window.OverworldMaps = {
  DemoRoom: {
    id: "DemoRoom",
    lowerSrc: "./images/maps/shores.png",
    upperSrc: "./images/maps/blankUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(21),
        y: utils.withGrid(14),
        direction: "down",
      }),
      fire: new Person({
        x: utils.withGrid(34),
        y: utils.withGrid(7),
        direction: "down",
        src: "./images/characters/people/fire.png",
        behaviorLoop: [
          { type: "idle"},
        ],
      }),
      fire2: new Person({
        x: utils.withGrid(30),
        y: utils.withGrid(4),
        direction: "down",
        src: "./images/characters/people/fire.png",
        behaviorLoop: [
          { type: "idle"},
        ],
      }),
      fire3: new Person({
        x: utils.withGrid(29),
        y: utils.withGrid(4),
        direction: "down",
        src: "./images/characters/people/fire.png",
        behaviorLoop: [
          { type: "idle"},
        ],
      }),
      fire4: new Person({
        x: utils.withGrid(33),
        y: utils.withGrid(5),
        direction: "down",
        src: "./images/characters/people/fire.png",
        behaviorLoop: [
          { type: "idle"},
        ],
      }),
      cerberus: new Person({
        x: utils.withGrid(37),
        y: utils.withGrid(5),
        src: "./images/maps/blankUpper.png",
        direction: "down",
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Frozen skeletal remains of a hell-hound.",
              },
            ],
          },
        ],
      }),
      objectStone1: new ObjectStone({
        x: utils.withGrid(33),
        y: utils.withGrid(6),
        storyFlag: "USED_OBJECT_STONE1",
        src: "./images/characters/blue-stone.png",
        pizzas: ["sadness", "empathy"],
      }),
      objectStone2: new ObjectStone({
        x: utils.withGrid(32),
        y: utils.withGrid(7),
        storyFlag: "USED_OBJECT_STONE2",
        src: "./images/characters/green-stone.png",
        pizzas: [ "memorial", "growth"],
      }),
      objectStone3: new ObjectStone({
        x: utils.withGrid(31),
        y: utils.withGrid(8),
        storyFlag: "USED_OBJECT_STONE3",
        src: "./images/characters/gold-stone.png",
        pizzas: ["closure", "reflection"],
      }),
    },
    walls: {
      //Beach Spikes
      [utils.asGridCoord(18, 0)]: true,
      [utils.asGridCoord(18, 1)]: true,
      [utils.asGridCoord(18, 2)]: true,
      [utils.asGridCoord(18, 3)]: true,
      [utils.asGridCoord(19, 3)]: true,
      [utils.asGridCoord(21, 4)]: true,
      [utils.asGridCoord(20, 5)]: true,
      [utils.asGridCoord(21, 6)]: true,
      [utils.asGridCoord(21, 7)]: true,
      [utils.asGridCoord(21, 8)]: true,
      [utils.asGridCoord(20, 8)]: true,
      [utils.asGridCoord(20, 3)]: true,
      [utils.asGridCoord(21, 8)]: true,
      [utils.asGridCoord(22, 9)]: true,
      [utils.asGridCoord(22, 10)]: true,
      [utils.asGridCoord(23, 10)]: true,
      [utils.asGridCoord(23, 9)]: true,
      [utils.asGridCoord(24, 8)]: true,
      [utils.asGridCoord(25, 8)]: true,
      [utils.asGridCoord(26, 8)]: true,
      [utils.asGridCoord(27, 8)]: true,
      [utils.asGridCoord(28, 5)]: true,
      [utils.asGridCoord(29, 5)]: true,
      [utils.asGridCoord(29, 4)]: true,
      // Cave Entrance
      [utils.asGridCoord(30, 4)]: true,
      [utils.asGridCoord(31, 4)]: true,
      [utils.asGridCoord(31, 3)]: true,
      [utils.asGridCoord(32, 2)]: true,
      [utils.asGridCoord(33, 2)]: true,
      [utils.asGridCoord(34, 3)]: true,
      [utils.asGridCoord(34, 4)]: true,
      [utils.asGridCoord(34, 5)]: true,
      [utils.asGridCoord(34, 15)]: true,
      [utils.asGridCoord(35, 5)]: true,
      [utils.asGridCoord(36, 5)]: true,
      [utils.asGridCoord(34, 7)]: true,
      [utils.asGridCoord(35, 7)]: true,
      [utils.asGridCoord(36, 7)]: true,
      [utils.asGridCoord(37, 18)]: true,
      [utils.asGridCoord(39, 18)]: true,
      [utils.asGridCoord(38, 7)]: true,
      [utils.asGridCoord(37, 5)]: true,
      [utils.asGridCoord(38, 5)]: true,
      [utils.asGridCoord(39, 5)]: true,
      [utils.asGridCoord(38, 7)]: true,
      [utils.asGridCoord(39, 7)]: true,
      [utils.asGridCoord(40, 6)]: true,
      // Spikes right side
      [utils.asGridCoord(33, 7)]: true,
      [utils.asGridCoord(32, 8)]: true,
      [utils.asGridCoord(33, 9)]: true,
      [utils.asGridCoord(32, 10)]: true,
      [utils.asGridCoord(31, 10)]: true,
      [utils.asGridCoord(30, 10)]: true,
      [utils.asGridCoord(30, 11)]: true,
      [utils.asGridCoord(29, 12)]: true,
      [utils.asGridCoord(29, 13)]: true,
      [utils.asGridCoord(28, 14)]: true,
      [utils.asGridCoord(28, 15)]: true,
      [utils.asGridCoord(29, 15)]: true,
      [utils.asGridCoord(30, 15)]: true,
      [utils.asGridCoord(31, 16)]: true,
      [utils.asGridCoord(32, 16)]: true,
      [utils.asGridCoord(33, 16)]: true,
      [utils.asGridCoord(35, 16)]: true,
      [utils.asGridCoord(35, 17)]: true,
      [utils.asGridCoord(36, 17)]: true,
      [utils.asGridCoord(38, 18)]: true,
      [utils.asGridCoord(38, 17)]: true,
    },
    cutsceneSpaces: {
      [utils.asGridCoord(32, 4)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "Ruins",
              x: utils.withGrid(8),
              y: utils.withGrid(18),
              direction: "right",
            },
          ],
        },
      ],
    },
  },
  Ruins: {
    id: "Ruins",
    lowerSrc: "./images/maps/shoresTest.png",
    upperSrc: "./images/maps/blankUpper.png",
    gameObjects: {
      hero: new Person({
        x: utils.withGrid(0),
        y: utils.withGrid(0),
        isPlayerControlled: true,
      }),
      npcB: new Person({
        x: utils.withGrid(2),
        y: utils.withGrid(36),
        src: "./images/characters/people/gunSlinger12.png",
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Ahh, you made it.",
                faceHero: "npcB",
              },
              {
                type: "textMessage",
                text: "Prepare to die!",
                faceHero: "npcB",
              },
              { type: "battle", enemyId: "lyle" },
            ],
          },
        ],
      }),
      objectStone3: new ObjectStone({
        x: utils.withGrid(19),
        y: utils.withGrid(37),
        storyFlag: "USED_OBJECT_STONE3",
        src: "./images/characters/gold-stone.png",
        pizzas: ["cerberus"],
      }),
      objectStone4: new ObjectStone({
        x: utils.withGrid(19),
        y: utils.withGrid(38),
        storyFlag: "USED_OBJECT_STONE4",
        src: "./images/characters/white-stone.png",
        pizzas: ["thanatos"],
      }),
    },
    walls: {
      [utils.asGridCoord(-1, 2)]: true,

      [utils.asGridCoord(0, 1)]: true,
      [utils.asGridCoord(1, 1)]: true,
      [utils.asGridCoord(2, 1)]: true,
      [utils.asGridCoord(3, 1)]: true,
      [utils.asGridCoord(4, 1)]: true,
      [utils.asGridCoord(5, 1)]: true,
      [utils.asGridCoord(6, 1)]: true,
      [utils.asGridCoord(7, 1)]: true,
      [utils.asGridCoord(8, 1)]: true,
      [utils.asGridCoord(9, 1)]: true,
      [utils.asGridCoord(10, 1)]: true,
      [utils.asGridCoord(11, 1)]: true,
      [utils.asGridCoord(12, 1)]: true,
      [utils.asGridCoord(13, 1)]: true,
      [utils.asGridCoord(14, 1)]: true,
      [utils.asGridCoord(15, 1)]: true,
      [utils.asGridCoord(16, 1)]: true,
      [utils.asGridCoord(17, 1)]: true,
      [utils.asGridCoord(18, 1)]: true,
      [utils.asGridCoord(19, 1)]: true,
      [utils.asGridCoord(20, 1)]: true,
      [utils.asGridCoord(21, 1)]: true,
      [utils.asGridCoord(22, 1)]: true,
      [utils.asGridCoord(23, 1)]: true,
      [utils.asGridCoord(24, 1)]: true,
      [utils.asGridCoord(25, 1)]: true,
      [utils.asGridCoord(26, 1)]: true,
      [utils.asGridCoord(27, 1)]: true,
      [utils.asGridCoord(28, 1)]: true,
      [utils.asGridCoord(29, 1)]: true,
      [utils.asGridCoord(30, 1)]: true,
      [utils.asGridCoord(31, 1)]: true,
      [utils.asGridCoord(32, 1)]: true,
      [utils.asGridCoord(33, 1)]: true,
      [utils.asGridCoord(34, 1)]: true,
      [utils.asGridCoord(35, 1)]: true,
      [utils.asGridCoord(36, 1)]: true,
      [utils.asGridCoord(37, 1)]: true,
      [utils.asGridCoord(38, 2)]: true,
      //
      [utils.asGridCoord(0, 3)]: true,
      [utils.asGridCoord(1, 3)]: true,
      [utils.asGridCoord(2, 3)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(5, 3)]: true,
      [utils.asGridCoord(6, 3)]: true,
      [utils.asGridCoord(7, 3)]: true,
      [utils.asGridCoord(8, 3)]: true,
      [utils.asGridCoord(9, 3)]: true,
      [utils.asGridCoord(10, 3)]: true,
      [utils.asGridCoord(11, 3)]: true,
      [utils.asGridCoord(12, 3)]: true,
      [utils.asGridCoord(13, 3)]: true,
      [utils.asGridCoord(14, 3)]: true,
      [utils.asGridCoord(15, 3)]: true,
      [utils.asGridCoord(16, 3)]: true,
      [utils.asGridCoord(17, 3)]: true,
      [utils.asGridCoord(18, 3)]: true,
      [utils.asGridCoord(19, 3)]: true,
      [utils.asGridCoord(20, 3)]: true,
      [utils.asGridCoord(21, 3)]: true,
      [utils.asGridCoord(22, 3)]: true,
      [utils.asGridCoord(23, 3)]: true,
      [utils.asGridCoord(24, 3)]: true,
      [utils.asGridCoord(25, 3)]: true,
      [utils.asGridCoord(26, 3)]: true,
      [utils.asGridCoord(27, 3)]: true,
      [utils.asGridCoord(28, 3)]: true,
      [utils.asGridCoord(29, 3)]: true,
      [utils.asGridCoord(30, 3)]: true,
      [utils.asGridCoord(31, 3)]: true,
      [utils.asGridCoord(32, 3)]: true,
      [utils.asGridCoord(33, 3)]: true,
      [utils.asGridCoord(34, 3)]: true,
      [utils.asGridCoord(34, 4)]: true,
      [utils.asGridCoord(34, 5)]: true,
      [utils.asGridCoord(34, 6)]: true,
      [utils.asGridCoord(34, 7)]: true,
      [utils.asGridCoord(34, 8)]: true,
      [utils.asGridCoord(34, 9)]: true,
      [utils.asGridCoord(34, 10)]: true,
      //
      [utils.asGridCoord(34, 10)]: true,
      [utils.asGridCoord(33, 10)]: true,
      [utils.asGridCoord(32, 10)]: true,
      [utils.asGridCoord(31, 10)]: true,
      [utils.asGridCoord(30, 10)]: true,
      [utils.asGridCoord(29, 10)]: true,
      [utils.asGridCoord(28, 10)]: true,
      [utils.asGridCoord(27, 10)]: true,
      [utils.asGridCoord(26, 10)]: true,
      [utils.asGridCoord(25, 10)]: true,
      [utils.asGridCoord(24, 10)]: true,
      [utils.asGridCoord(23, 10)]: true,
      [utils.asGridCoord(22, 10)]: true,
      [utils.asGridCoord(21, 10)]: true,
      [utils.asGridCoord(20, 10)]: true,
      [utils.asGridCoord(19, 10)]: true,
      [utils.asGridCoord(18, 10)]: true,
      [utils.asGridCoord(17, 10)]: true,
      [utils.asGridCoord(16, 10)]: true,
      [utils.asGridCoord(15, 10)]: true,
      [utils.asGridCoord(14, 10)]: true,
      [utils.asGridCoord(13, 10)]: true,
      [utils.asGridCoord(12, 10)]: true,
      [utils.asGridCoord(11, 10)]: true,
      [utils.asGridCoord(10, 10)]: true,
      [utils.asGridCoord(9, 10)]: true,
      [utils.asGridCoord(8, 10)]: true,
      [utils.asGridCoord(7, 10)]: true,
      [utils.asGridCoord(6, 10)]: true,
      [utils.asGridCoord(5, 10)]: true,
      [utils.asGridCoord(4, 10)]: true,
      [utils.asGridCoord(3, 10)]: true,
      [utils.asGridCoord(2, 10)]: true,
      [utils.asGridCoord(1, 10)]: true,
      [utils.asGridCoord(0, 10)]: true,
      [utils.asGridCoord(0, 11)]: true,
      //
      [utils.asGridCoord(0, 38)]: true,
      [utils.asGridCoord(0, 37)]: true,
      //
      [utils.asGridCoord(1, 12)]: true,
      [utils.asGridCoord(1, 13)]: true,
      [utils.asGridCoord(1, 14)]: true,
      [utils.asGridCoord(1, 15)]: true,
      [utils.asGridCoord(1, 16)]: true,
      [utils.asGridCoord(1, 17)]: true,
      [utils.asGridCoord(1, 18)]: true,
      [utils.asGridCoord(1, 19)]: true,
      [utils.asGridCoord(1, 20)]: true,
      [utils.asGridCoord(1, 21)]: true,
      [utils.asGridCoord(1, 22)]: true,
      [utils.asGridCoord(1, 23)]: true,
      //
      [utils.asGridCoord(1, 22)]: true,
      [utils.asGridCoord(2, 22)]: true,
      [utils.asGridCoord(3, 22)]: true,
      [utils.asGridCoord(4, 22)]: true,
      [utils.asGridCoord(5, 22)]: true,
      [utils.asGridCoord(6, 22)]: true,
      [utils.asGridCoord(7, 22)]: true,
      [utils.asGridCoord(8, 22)]: true,
      [utils.asGridCoord(9, 22)]: true,
      [utils.asGridCoord(10, 22)]: true,
      [utils.asGridCoord(11, 22)]: true,
      [utils.asGridCoord(12, 22)]: true,
      [utils.asGridCoord(13, 22)]: true,
      [utils.asGridCoord(14, 22)]: true,
      [utils.asGridCoord(15, 22)]: true,
      [utils.asGridCoord(16, 22)]: true,
      [utils.asGridCoord(17, 22)]: true,
      [utils.asGridCoord(18, 22)]: true,
      [utils.asGridCoord(19, 22)]: true,
      [utils.asGridCoord(20, 22)]: true,
      [utils.asGridCoord(21, 22)]: true,
      [utils.asGridCoord(22, 22)]: true,
      [utils.asGridCoord(23, 22)]: true,
      [utils.asGridCoord(24, 22)]: true,
      [utils.asGridCoord(25, 22)]: true,
      [utils.asGridCoord(26, 22)]: true,
      [utils.asGridCoord(27, 22)]: true,
      [utils.asGridCoord(28, 22)]: true,
      [utils.asGridCoord(29, 22)]: true,
      [utils.asGridCoord(30, 22)]: true,
      [utils.asGridCoord(31, 22)]: true,

      //
      [utils.asGridCoord(38, 3)]: true,
      [utils.asGridCoord(38, 4)]: true,
      [utils.asGridCoord(38, 5)]: true,
      [utils.asGridCoord(38, 6)]: true,
      [utils.asGridCoord(38, 7)]: true,
      [utils.asGridCoord(38, 8)]: true,
      [utils.asGridCoord(38, 9)]: true,
      [utils.asGridCoord(38, 10)]: true,
      [utils.asGridCoord(38, 11)]: true,
      [utils.asGridCoord(38, 12)]: true,
      [utils.asGridCoord(6, 12)]: true,
      [utils.asGridCoord(7, 12)]: true,
      [utils.asGridCoord(8, 12)]: true,
      [utils.asGridCoord(9, 12)]: true,
      [utils.asGridCoord(10, 12)]: true,
      [utils.asGridCoord(11, 12)]: true,
      [utils.asGridCoord(12, 12)]: true,
      [utils.asGridCoord(13, 12)]: true,
      [utils.asGridCoord(14, 12)]: true,
      [utils.asGridCoord(15, 12)]: true,
      [utils.asGridCoord(16, 12)]: true,
      [utils.asGridCoord(17, 12)]: true,
      [utils.asGridCoord(18, 12)]: true,
      [utils.asGridCoord(19, 12)]: true,
      [utils.asGridCoord(20, 12)]: true,
      [utils.asGridCoord(21, 12)]: true,
      [utils.asGridCoord(22, 12)]: true,
      [utils.asGridCoord(23, 12)]: true,
      [utils.asGridCoord(24, 12)]: true,
      [utils.asGridCoord(25, 12)]: true,
      [utils.asGridCoord(26, 12)]: true,
      [utils.asGridCoord(27, 12)]: true,
      [utils.asGridCoord(28, 12)]: true,
      [utils.asGridCoord(29, 12)]: true,
      [utils.asGridCoord(30, 12)]: true,
      [utils.asGridCoord(31, 12)]: true,
      [utils.asGridCoord(32, 12)]: true,
      [utils.asGridCoord(33, 12)]: true,
      [utils.asGridCoord(34, 12)]: true,
      [utils.asGridCoord(35, 12)]: true,
      [utils.asGridCoord(36, 12)]: true,
      [utils.asGridCoord(37, 12)]: true,
      //
      [utils.asGridCoord(6, 12)]: true,
      [utils.asGridCoord(6, 13)]: true,
      [utils.asGridCoord(6, 14)]: true,
      [utils.asGridCoord(6, 15)]: true,
      [utils.asGridCoord(6, 16)]: true,
      [utils.asGridCoord(6, 17)]: true,
      [utils.asGridCoord(6, 18)]: true,
      [utils.asGridCoord(6, 19)]: true,
      //
      [utils.asGridCoord(7, 19)]: true,
      [utils.asGridCoord(8, 19)]: true,
      [utils.asGridCoord(9, 19)]: true,
      [utils.asGridCoord(10, 19)]: true,
      [utils.asGridCoord(11, 19)]: true,
      [utils.asGridCoord(12, 19)]: true,
      [utils.asGridCoord(13, 19)]: true,
      [utils.asGridCoord(14, 19)]: true,
      [utils.asGridCoord(15, 19)]: true,
      [utils.asGridCoord(16, 19)]: true,
      [utils.asGridCoord(17, 19)]: true,
      [utils.asGridCoord(18, 19)]: true,
      [utils.asGridCoord(19, 19)]: true,
      [utils.asGridCoord(20, 19)]: true,
      [utils.asGridCoord(21, 19)]: true,
      [utils.asGridCoord(22, 19)]: true,
      [utils.asGridCoord(23, 19)]: true,
      [utils.asGridCoord(24, 19)]: true,
      [utils.asGridCoord(25, 19)]: true,
      [utils.asGridCoord(26, 19)]: true,
      [utils.asGridCoord(27, 19)]: true,
      [utils.asGridCoord(28, 19)]: true,
      [utils.asGridCoord(29, 19)]: true,
      [utils.asGridCoord(30, 19)]: true,
      [utils.asGridCoord(31, 19)]: true,
      [utils.asGridCoord(32, 19)]: true,
      [utils.asGridCoord(33, 19)]: true,
      [utils.asGridCoord(34, 19)]: true,
      [utils.asGridCoord(35, 19)]: true,
      [utils.asGridCoord(36, 19)]: true,
      [utils.asGridCoord(37, 19)]: true,
      [utils.asGridCoord(38, 19)]: true,
      [utils.asGridCoord(38, 20)]: true,
      [utils.asGridCoord(38, 21)]: true,
      //
      [utils.asGridCoord(38, 22)]: true,
      [utils.asGridCoord(38, 23)]: true,
      [utils.asGridCoord(38, 24)]: true,
      [utils.asGridCoord(38, 25)]: true,
      [utils.asGridCoord(38, 26)]: true,
      [utils.asGridCoord(38, 27)]: true,
      [utils.asGridCoord(38, 28)]: true,
      [utils.asGridCoord(38, 29)]: true,
      [utils.asGridCoord(38, 30)]: true,
      [utils.asGridCoord(38, 31)]: true,
      [utils.asGridCoord(38, 32)]: true,
      [utils.asGridCoord(38, 33)]: true,
      [utils.asGridCoord(38, 34)]: true,
      [utils.asGridCoord(38, 35)]: true,
      [utils.asGridCoord(38, 36)]: true,
      [utils.asGridCoord(38, 37)]: true,
      [utils.asGridCoord(38, 38)]: true,
      [utils.asGridCoord(38, 39)]: true,
      [utils.asGridCoord(37, 39)]: true,
      //
      [utils.asGridCoord(34, 39)]: true,
      [utils.asGridCoord(33, 39)]: true,
      [utils.asGridCoord(32, 39)]: true,
      [utils.asGridCoord(31, 39)]: true,
      [utils.asGridCoord(30, 39)]: true,
      [utils.asGridCoord(29, 39)]: true,
      [utils.asGridCoord(28, 39)]: true,
      [utils.asGridCoord(27, 39)]: true,
      [utils.asGridCoord(26, 39)]: true,
      [utils.asGridCoord(25, 39)]: true,
      [utils.asGridCoord(24, 39)]: true,
      [utils.asGridCoord(23, 39)]: true,
      [utils.asGridCoord(22, 39)]: true,
      [utils.asGridCoord(21, 39)]: true,
      [utils.asGridCoord(20, 39)]: true,
      [utils.asGridCoord(19, 39)]: true,
      [utils.asGridCoord(18, 39)]: true,
      [utils.asGridCoord(17, 39)]: true,
      [utils.asGridCoord(16, 39)]: true,
      [utils.asGridCoord(15, 39)]: true,
      [utils.asGridCoord(14, 39)]: true,
      [utils.asGridCoord(13, 39)]: true,
      [utils.asGridCoord(12, 39)]: true,
      [utils.asGridCoord(11, 39)]: true,
      [utils.asGridCoord(10, 39)]: true,
      [utils.asGridCoord(9, 39)]: true,
      [utils.asGridCoord(8, 39)]: true,
      [utils.asGridCoord(7, 39)]: true,
      [utils.asGridCoord(6, 39)]: true,
      [utils.asGridCoord(5, 39)]: true,
      [utils.asGridCoord(4, 39)]: true,
      [utils.asGridCoord(3, 39)]: true,
      [utils.asGridCoord(2, 39)]: true,
      [utils.asGridCoord(1, 39)]: true,
      [utils.asGridCoord(0, 39)]: true,
      //
      [utils.asGridCoord(32, 22)]: true,
      [utils.asGridCoord(32, 23)]: true,
      [utils.asGridCoord(32, 24)]: true,
      [utils.asGridCoord(32, 25)]: true,
      [utils.asGridCoord(32, 26)]: true,
      [utils.asGridCoord(32, 27)]: true,
      [utils.asGridCoord(32, 28)]: true,
      [utils.asGridCoord(32, 29)]: true,
      [utils.asGridCoord(32, 30)]: true,
      [utils.asGridCoord(32, 31)]: true,
      [utils.asGridCoord(32, 32)]: true,
      [utils.asGridCoord(32, 33)]: true,
      [utils.asGridCoord(32, 34)]: true,
      [utils.asGridCoord(32, 35)]: true,
      [utils.asGridCoord(32, 36)]: true,
      //
      [utils.asGridCoord(31, 36)]: true,
      [utils.asGridCoord(30, 36)]: true,
      [utils.asGridCoord(29, 36)]: true,
      [utils.asGridCoord(28, 36)]: true,
      [utils.asGridCoord(27, 36)]: true,
      [utils.asGridCoord(26, 36)]: true,
      [utils.asGridCoord(25, 36)]: true,
      [utils.asGridCoord(24, 36)]: true,
      [utils.asGridCoord(23, 36)]: true,
      [utils.asGridCoord(22, 36)]: true,
      [utils.asGridCoord(21, 36)]: true,
      [utils.asGridCoord(20, 36)]: true,
      [utils.asGridCoord(19, 36)]: true,
      [utils.asGridCoord(18, 36)]: true,
      [utils.asGridCoord(17, 36)]: true,
      [utils.asGridCoord(16, 36)]: true,
      [utils.asGridCoord(15, 36)]: true,
      [utils.asGridCoord(14, 36)]: true,
      [utils.asGridCoord(13, 36)]: true,
      [utils.asGridCoord(12, 36)]: true,
      [utils.asGridCoord(11, 36)]: true,
      [utils.asGridCoord(10, 36)]: true,
      [utils.asGridCoord(9, 36)]: true,
      [utils.asGridCoord(8, 36)]: true,
      [utils.asGridCoord(7, 36)]: true,
      [utils.asGridCoord(6, 36)]: true,
      [utils.asGridCoord(5, 36)]: true,
      [utils.asGridCoord(4, 36)]: true,
      [utils.asGridCoord(3, 36)]: true,
      [utils.asGridCoord(2, 36)]: true,
      [utils.asGridCoord(1, 36)]: true,
      [utils.asGridCoord(0, 36)]: true,
    },
    cutsceneSpaces: {
      [utils.asGridCoord(10, 16)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "Crypt",
              x: utils.withGrid(1),
              y: utils.withGrid(11),
              direction: "up",
            },
          ],
        },
      ],
      [utils.asGridCoord(11, 16)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "Crypt",
              x: utils.withGrid(2),
              y: utils.withGrid(11),
              direction: "up",
            },
          ],
        }
      ]
    },
  },
  WorldBase: {
    id: "WorldBase",
    lowerSrc: "./images/maps/shores.png",
    upperSrc: "./images/maps/blankUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(7),
        src: "./images/characters/people/hero.png",
      }),
      npcReaper: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(6),
        src: "./images/characters/people/reaper.png",
        behaviorLoop: [
          // { type: "walk", direction: "left" },
          // { type: "stand", direction: "right", time: 800 },
          // { type: "walk", direction: "up" },
          // { type: "walk", direction: "right" },
          // { type: "walk", direction: "down" },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "I'm busy", faceHero: "npcReaper" },
              { type: "textMessage", text: "Now, go away..." },
              // { who: "hero", type: "walk", direction: "up" },
            ],
          },
        ],
      }),
    },
    walls: {
      // // top doorway
      // [utils.asGridCoord(6,4)]: true,
      // [utils.asGridCoord(6,3)]: true,
      // [utils.asGridCoord(8,4)]: true,
      // [utils.asGridCoord(8,3)]: true,
      // // top wall
      // [utils.asGridCoord(5,3)]: true,
      // [utils.asGridCoord(4,3)]: true,
      // [utils.asGridCoord(3,3)]: true,
      // [utils.asGridCoord(2,3)]: true,
      // [utils.asGridCoord(1,3)]: true,
      // // right wall
      // [utils.asGridCoord(8,3)]: true,
      // [utils.asGridCoord(9,3)]: true,
      // [utils.asGridCoord(10,3)]: true,
      // [utils.asGridCoord(11,4)]: true,
      // [utils.asGridCoord(11,5)]: true,
      // [utils.asGridCoord(11,6)]: true,
      // [utils.asGridCoord(11,7)]: true,
      // [utils.asGridCoord(11,8)]: true,
      // [utils.asGridCoord(11,9)]: true,
      // // bottom wall
      // [utils.asGridCoord(10,10)]: true,
      // [utils.asGridCoord(9,10)]: true,
      // [utils.asGridCoord(8,10)]: true,
      // [utils.asGridCoord(7,10)]: true,
      // [utils.asGridCoord(6,10)]: true,
      // [utils.asGridCoord(5,10)]: false,
      // [utils.asGridCoord(4,10)]: true,
      // [utils.asGridCoord(3,10)]: true,
      // [utils.asGridCoord(2,10)]: true,
      // [utils.asGridCoord(1,10)]: true,
      // // left wall
      // [utils.asGridCoord(0,9)]: true,
      // [utils.asGridCoord(0,8)]: true,
      // [utils.asGridCoord(0,7)]: true,
      // [utils.asGridCoord(0,6)]: true,
      // [utils.asGridCoord(0,5)]: true,
      // [utils.asGridCoord(0,4)]: true,
    },
    cutsceneSpaces: {
      [utils.asGridCoord(11, 2)]: [
        {
          events: [
            { who: "npcReaper", type: "stand", direction: "up", time: 500 },
            { who: "npcReaper", type: "walk", direction: "left" },
            { type: "textMessage", text: "...", time: 500 },
            { type: "textMessage", text: "...", time: 500 },
            {
              type: "textMessage",
              text: "You're not welcome inside the tree",
              time: 500,
            },

            { who: "npcReaper", type: "walk", direction: "right" },
            { who: "hero", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "down" },
          ],
        },
      ],
      [utils.asGridCoord(12, 23)]: [
        {
          events: [{ type: "changeMap", map: "SouthernPath" }],
        },
      ],
    },
  },
  SouthernPath: {
    id: "SouthernPath",
    lowerSrc: "./images/maps/southernPath.png",
    upperSrc: "./images/maps/blankUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(1),
        src: "./images/characters/people/hero.png",
      }),
    },
    walls: {
      // left wall
      [utils.asGridCoord(4, 0)]: true,
      [utils.asGridCoord(4, 1)]: true,
      [utils.asGridCoord(4, 2)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(4, 4)]: true,
      [utils.asGridCoord(4, 5)]: true,
      [utils.asGridCoord(4, 6)]: true,
      [utils.asGridCoord(4, 7)]: true,
      [utils.asGridCoord(4, 8)]: true,
      [utils.asGridCoord(4, 9)]: true,
      [utils.asGridCoord(4, 10)]: true,
      [utils.asGridCoord(4, 11)]: true,
      // right wall
      [utils.asGridCoord(6, 0)]: true,
      [utils.asGridCoord(6, 1)]: true,
      [utils.asGridCoord(6, 2)]: true,
      [utils.asGridCoord(6, 3)]: true,
      [utils.asGridCoord(6, 4)]: true,
      [utils.asGridCoord(6, 5)]: true,
      [utils.asGridCoord(6, 6)]: true,
      [utils.asGridCoord(6, 7)]: true,
      [utils.asGridCoord(6, 8)]: true,
      [utils.asGridCoord(6, 9)]: false,
      [utils.asGridCoord(6, 10)]: true,
      [utils.asGridCoord(6, 11)]: true,
    },
    cutsceneSpaces: {
      [utils.asGridCoord(5, 11)]: [
        {
          events: [{ type: "changeMap", map: "WorldBase" }],
        },
      ],
      [utils.asGridCoord(5, 0)]: [
        {
          events: [{ type: "changeMap", map: "WorldBase" }],
        },
      ],
      [utils.asGridCoord(6, 9)]: [
        {
          events: [{ type: "changeMap", map: "SouthernSecretPath" }],
        },
      ],
    },
  },
  SouthernSecretPath: {
    id: "SouthernSecretPath",
    lowerSrc: "./images/maps/southernSecretPath.png",
    upperSrc: "./images/maps/blankUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        src: "./images/characters/people/hero.png",
      }),
    },
    walls: {
      // left wall
      [utils.asGridCoord(4, 0)]: true,
      [utils.asGridCoord(4, 1)]: true,
      [utils.asGridCoord(4, 2)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(4, 4)]: true,
      [utils.asGridCoord(4, 5)]: true,
      [utils.asGridCoord(4, 6)]: true,
      [utils.asGridCoord(4, 7)]: true,
      [utils.asGridCoord(4, 8)]: true,
      [utils.asGridCoord(4, 9)]: true,
      [utils.asGridCoord(4, 10)]: true,
      [utils.asGridCoord(4, 11)]: true,
      // right wall
      [utils.asGridCoord(6, 0)]: true,
      [utils.asGridCoord(6, 1)]: true,
      [utils.asGridCoord(6, 2)]: true,
      [utils.asGridCoord(6, 3)]: true,
      [utils.asGridCoord(6, 4)]: true,
      [utils.asGridCoord(6, 5)]: true,
      [utils.asGridCoord(6, 6)]: true,
      [utils.asGridCoord(6, 7)]: true,
      [utils.asGridCoord(6, 8)]: true,
      [utils.asGridCoord(6, 9)]: false,
      [utils.asGridCoord(6, 10)]: true,
      [utils.asGridCoord(6, 11)]: true,
    },
    cutsceneSpaces: {
      [utils.asGridCoord(6, 9)]: [
        {
          events: [{ type: "changeMap", map: "WorldBase" }],
        },
      ],
      [utils.asGridCoord(5, 0)]: [
        {
          events: [{ type: "changeMap", map: "WorldBase" }],
        },
      ],
      [utils.asGridCoord(11, 9)]: [
        {
          events: [{ type: "changeMap", map: "WorldBase" }],
        },
      ],
    },
  },
  Crypt: {
    id: "Crypt",
    lowerSrc: "./images/maps/crypt.png",
    upperSrc: "./images/maps/blankUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(0),
        y: utils.withGrid(4),
      }),
      lyle: new Person({
        x: utils.withGrid(2),
        y: utils.withGrid(4),
        src: "./images/maps/blankUpper.png",
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "You feel a deadly cold chill...",
              },
              { type: "battle", enemyId: "lyle" },
            ],
          },
        ],
      }),
      objectStone34: new ObjectStone({
        x: utils.withGrid(4),
        y: utils.withGrid(5),
        storyFlag: "USED_OBJECT_STONE4",
        src: "./images/characters/gold-stone.png",
        pizzas: ["cerberus"],
      }),
      objectStone5: new ObjectStone({
        x: utils.withGrid(4),
        y: utils.withGrid(6),
        storyFlag: "USED_OBJECT_STONE5",
        src: "./images/characters/white-stone.png",
        pizzas: ["thanatos"],
      }),
    },
    cutsceneSpaces: {
      [utils.asGridCoord(1, 11)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "Ruins",
              x: utils.withGrid(8),
              y: utils.withGrid(18),
              direction: "up",
            },
          ],
        },
      ],
      [utils.asGridCoord(2, 11)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "Ruins",
              x: utils.withGrid(8),
              y: utils.withGrid(18),
              direction: "up",
            },
          ],
        },
      ],
    },
  },
};
