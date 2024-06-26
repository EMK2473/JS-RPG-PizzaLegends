// map containers
// contains map objects
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
  }

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
      await eventHandler.init();
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
      this.startCutscene(match.talking[0].events);
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
    const { x,y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x,y);
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
    lowerSrc: "./images/maps/DemoLower.png",
    upperSrc: "./images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),

      }),
      npcA: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        src: "./images/characters/people/npc1.png",
        behaviorLoop: [
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "up", time: 800 },
          { type: "stand", direction: "right", time: 1200 },
          { type: "stand", direction: "down", time: 300 },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "I'm busy", faceHero: "npcA" },
              { type: "textMessage", text: "Now, go away..." },
              { who: "hero", type: "walk", direction: "up" },
            ],
          },
        ],
      }),
      npcB: new Person({
        x: utils.withGrid(8),
        y: utils.withGrid(5),
        src: "./images/characters/people/npc2.png",
        // behaviorLoop: [
        //   { type: "walk", direction: "left" },
        //   { type: "stand", direction: "right", time: 800 },
        //   { type: "walk", direction: "up" },
        //   { type: "walk", direction: "right" },
        //   { type: "walk", direction: "down" },
        // ],
      }),
    },
    walls: {
      // table
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true,
      // top doorway
      [utils.asGridCoord(6, 4)]: true,
      [utils.asGridCoord(6, 3)]: true,
      [utils.asGridCoord(8, 4)]: true,
      [utils.asGridCoord(8, 3)]: true,
      // top wall
      [utils.asGridCoord(5, 3)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(2, 3)]: true,
      [utils.asGridCoord(1, 3)]: true,
      // right wall
      [utils.asGridCoord(8, 3)]: true,
      [utils.asGridCoord(9, 3)]: true,
      [utils.asGridCoord(10, 3)]: true,
      [utils.asGridCoord(11, 4)]: true,
      [utils.asGridCoord(11, 5)]: true,
      [utils.asGridCoord(11, 6)]: true,
      [utils.asGridCoord(11, 7)]: true,
      [utils.asGridCoord(11, 8)]: true,
      [utils.asGridCoord(11, 9)]: true,
      // bottom wall
      [utils.asGridCoord(10, 10)]: true,
      [utils.asGridCoord(9, 10)]: true,
      [utils.asGridCoord(8, 10)]: true,
      [utils.asGridCoord(7, 10)]: true,
      [utils.asGridCoord(6, 10)]: true,
      [utils.asGridCoord(5, 10)]: false,
      [utils.asGridCoord(4, 10)]: true,
      [utils.asGridCoord(3, 10)]: true,
      [utils.asGridCoord(2, 10)]: true,
      [utils.asGridCoord(1, 10)]: true,
      // left wall
      [utils.asGridCoord(0, 9)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(0, 4)]: true,
    },
    cutsceneSpaces: {
      [utils.asGridCoord(7, 4)]: [
        {
          events: [
            { who: "npcB", type: "walk", direction: "left" },
            { who: "npcB", type: "stand", direction: "up", time: 500 },
            { type: "textMessage", text: "You can't be in there!" },
            { who: "npcB", type: "walk", direction: "right" },
            { who: "hero", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "left" },
          ],
        },
      ],
      [utils.asGridCoord(5, 10)]: [
        {
          events: [{ type: "changeMap", map: "Kitchen" }],
        },
      ],
    },
  },
  Kitchen: {
    lowerSrc: "./images/maps/KitchenLower.png",
    upperSrc: "./images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(5),
        isPlayerControlled: true,
      }),
      npcB: new Person({
        x: utils.withGrid(10),
        y: utils.withGrid(8),
        src: "./images/characters/people/npc3.png",
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Ahh, you made it.",
                faceHero: "npcB",
              },
            ],
          },
        ],
      }),
    },
  },
  WorldBase: {
    lowerSrc: "./images/maps/worldBaseLower.png",
    upperSrc: "./images/maps/worldBaseUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(7),
        src: "./images/characters/people/reaper.png",
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
      // top doorway
      [utils.asGridCoord(6,4)]: true,
      [utils.asGridCoord(6,3)]: true,
      [utils.asGridCoord(8,4)]: true,
      [utils.asGridCoord(8,3)]: true,
      // top wall
      [utils.asGridCoord(5,3)]: true,
      [utils.asGridCoord(4,3)]: true,
      [utils.asGridCoord(3,3)]: true,
      [utils.asGridCoord(2,3)]: true,
      [utils.asGridCoord(1,3)]: true,
      // right wall
      [utils.asGridCoord(8,3)]: true,
      [utils.asGridCoord(9,3)]: true,
      [utils.asGridCoord(10,3)]: true,
      [utils.asGridCoord(11,4)]: true,
      [utils.asGridCoord(11,5)]: true,
      [utils.asGridCoord(11,6)]: true,
      [utils.asGridCoord(11,7)]: true,
      [utils.asGridCoord(11,8)]: true,
      [utils.asGridCoord(11,9)]: true,
      // bottom wall
      [utils.asGridCoord(10,10)]: true,
      [utils.asGridCoord(9,10)]: true,
      [utils.asGridCoord(8,10)]: true,
      [utils.asGridCoord(7,10)]: true,
      [utils.asGridCoord(6,10)]: true,
      [utils.asGridCoord(5,10)]: false,
      [utils.asGridCoord(4,10)]: true,
      [utils.asGridCoord(3,10)]: true,
      [utils.asGridCoord(2,10)]: true,
      [utils.asGridCoord(1,10)]: true,
      // left wall
      [utils.asGridCoord(0,9)]: true,
      [utils.asGridCoord(0,8)]: true,
      [utils.asGridCoord(0,7)]: true,
      [utils.asGridCoord(0,6)]: true,
      [utils.asGridCoord(0,5)]: true,
      [utils.asGridCoord(0,4)]: true,
    },
    cutsceneSpaces: {
      [utils.asGridCoord(7,4)]: [
        {
          events: [
            { who: "npcReaper", type: "stand", direction: "up", time: 500 },
            { who: "npcReaper", type: "walk", direction: "left" },
            { type: "textMessage", text: "...", time: 500 },
            { type: "textMessage", text: "...", time: 500 },
            {
              type: "textMessage",
              text: "I wouldn't, if I were you...",
              time: 500,
            },

            { who: "npcReaper", type: "walk", direction: "right" },
            { who: "hero", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "left" },
          ],
        },
      ],
      [utils.asGridCoord(5,11)]: [
        {
          events: [{ type: "changeMap", map: "SouthernPath" }],
        },
      ],
    },
  },
  SouthernPath: {
    lowerSrc: "./images/maps/southernPath.png",
    upperSrc: "./images/maps/blankUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(1),
        src: "./images/characters/people/reaper.png",
      }),
    },
    walls: {
      // left wall
      [utils.asGridCoord(4,0)]: true,
      [utils.asGridCoord(4,1)]: true,
      [utils.asGridCoord(4,2)]: true,
      [utils.asGridCoord(4,3)]: true,
      [utils.asGridCoord(4,4)]: true,
      [utils.asGridCoord(4,5)]: true,
      [utils.asGridCoord(4,6)]: true,
      [utils.asGridCoord(4,7)]: true,
      [utils.asGridCoord(4,8)]: true,
      [utils.asGridCoord(4,9)]: true,
      [utils.asGridCoord(4,10)]: true,
      [utils.asGridCoord(4,11)]: true,
      // right wall
      [utils.asGridCoord(6,0)]: true,
      [utils.asGridCoord(6,1)]: true,
      [utils.asGridCoord(6,2)]: true,
      [utils.asGridCoord(6,3)]: true,
      [utils.asGridCoord(6,4)]: true,
      [utils.asGridCoord(6,5)]: true,
      [utils.asGridCoord(6,6)]: true,
      [utils.asGridCoord(6,7)]: true,
      [utils.asGridCoord(6,8)]: true,
      [utils.asGridCoord(6,9)]: false,
      [utils.asGridCoord(6,10)]: true,
      [utils.asGridCoord(6,11)]: true,
    },
    cutsceneSpaces: {
      [utils.asGridCoord(5,11)]: [
        {
          events: [{ type: "changeMap", map: "WorldBase" }],
        },
      ],
      [utils.asGridCoord(5,0)]: [
        {
          events: [{ type: "changeMap", map: "WorldBase" }],
        },
      ],
      [utils.asGridCoord(6,9)]: [
        {
          events: [{ type: "changeMap", map: "SouthernSecretPath" }],
        },
      ]
    },
  },
  SouthernSecretPath: {
    lowerSrc: "./images/maps/southernSecretPath.png",
    upperSrc: "./images/maps/blankUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        src: "./images/characters/people/reaper.png",
      }),
    },
    walls: {
      // left wall
      [utils.asGridCoord(4,0)]: true,
      [utils.asGridCoord(4,1)]: true,
      [utils.asGridCoord(4,2)]: true,
      [utils.asGridCoord(4,3)]: true,
      [utils.asGridCoord(4,4)]: true,
      [utils.asGridCoord(4,5)]: true,
      [utils.asGridCoord(4,6)]: true,
      [utils.asGridCoord(4,7)]: true,
      [utils.asGridCoord(4,8)]: true,
      [utils.asGridCoord(4,9)]: true,
      [utils.asGridCoord(4,10)]: true,
      [utils.asGridCoord(4,11)]: true,
      // right wall
      [utils.asGridCoord(6,0)]: true,
      [utils.asGridCoord(6,1)]: true,
      [utils.asGridCoord(6,2)]: true,
      [utils.asGridCoord(6,3)]: true,
      [utils.asGridCoord(6,4)]: true,
      [utils.asGridCoord(6,5)]: true,
      [utils.asGridCoord(6,6)]: true,
      [utils.asGridCoord(6,7)]: true,
      [utils.asGridCoord(6,8)]: true,
      [utils.asGridCoord(6,9)]: false,
      [utils.asGridCoord(6,10)]: true,
      [utils.asGridCoord(6,11)]: true,
    },
    cutsceneSpaces: {
      [utils.asGridCoord(6,9)]: [
        {
          events: [{ type: "changeMap", map: "WorldBase" }],
        },
      ],
      [utils.asGridCoord(5,0)]: [
        {
          events: [{ type: "changeMap", map: "WorldBase" }],
        },
      ],
      [utils.asGridCoord(11,9)]: [
        {
          events: [{ type: "changeMap", map: "WorldBase" }],
        },
      ],
    },
  },
};
