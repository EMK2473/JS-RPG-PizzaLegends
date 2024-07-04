// contains gamestate
// top level parent component. keeps track of states and send those states down to child components
// contains cutscene array/queue
// contains key binds for "enter" and "escape" keys

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
      
      

      if(!this.map.isPaused){

      // console.log("stepping");
      requestAnimationFrame(() => {
        step();
      });
    }
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
    new KeyPressListener("Escape", () => {
      if(!this.map.isCutscenePlaying) {
        this.map.startCutscene([
          { type: "pause" }
        ])
      }
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


  // sets overworld to be itself, no longer null
  startMap(mapConfig){
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();
  }
  
  init() {

    this.hud = new Hud();
    this.hud.init(document.querySelector(".game-container"));


    this.startMap(window.OverworldMaps.DemoRoom)

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    // firing cutscene
    // this.map.startCutscene([
      // {type: "battle", enemyId: "beth"},

    //   {type: "textMessage", text: "This is the first cutscene!!!!!"},
    //   {type: "changeMap", map: "WorldBase"}
    // ])
  }
}
