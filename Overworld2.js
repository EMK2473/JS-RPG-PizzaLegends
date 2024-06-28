// contains gamestate
// top level parent component. keeps track of states and send those states down to child components
// contains cutscene array/queue

class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  // recursive game loop
  startGameLoop() {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      

      // establish camera person
      const cameraPerson = this.map.gameObjects.hero;
      
      // update all objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      })
      
      
      // draw lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      // draw game objects
      Object.values(this.map.gameObjects).sort((a,b)=> {
        return a.y - b.y

      }).forEach((object) => {
        object.sprite.draw(this.ctx, cameraPerson);
      });

      // draw upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);
      
      
      // console.log("stepping");
      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      // checks for cutscene at a postion, 
      // look through the map's game objects 
      
      this.map.checkForActionCutscene()
      // is there a person here to talk to ?
    })
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", e => {
      if (e.detail.whoId === "hero") {
        console.log("New Hero Position!")
        // the hero's position has changed
        // defined on OverworldMap.js
        this.map.checkForFootstepCutscene();
      }
    })
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.map.mountObjects();

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    // firing cutscene
    // this.map.startCutscene([
    //   { who: "hero", type: "walk", direction: "down" },
    //   { who: "hero", type: "walk", direction: "down" },
    //   { who: "npcA", type: "walk", direction: "left" },
    //   { who: "npcA", type: "walk", direction: "left" },
    //   { who: "npcA", type: "stand", direction: "up", time: 200 },
    //   {type: "textMessage", text: "Wassup!? Click next."},
    // ])
  }
}
