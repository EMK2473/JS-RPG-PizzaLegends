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


  // Methods
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


  // on init, startMap sets overworld to be itself(mapConfig ), no longer null
  startMap(mapConfig, heroInitialState=null){
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();

    if(heroInitialState) {
      const { hero } = this.map.gameObjects;
      this.map.removeWall(hero.x, hero.y)
      hero.y = heroInitialState.y;
      hero.x = heroInitialState.x;
      hero.direction = heroInitialState.direction;
      this.map.addWall(hero.x, hero.y)
    }

    this.progress.mapId = mapConfig.id;
    this.progress.startingHeroX = this.map.gameObjects.hero.x;
    this.progress.startingHeroY = this.map.gameObjects.hero.y;
    this.progress.startingHeroDirection = this.map.gameObjects.hero.direction;

    console.log(this.map.walls)
  }
  
  async init() {

    const container = document.querySelector(".game-container")

    // Create a new progress tracker
    this.progress = new Progress();

    // Display Title Screen
    this.titleScreen = new TitleScreen({
      progress: this.progress
    })
    const useSaveFile = await this.titleScreen.init(container)

    // Check for saved data
      let initialHeroState = null;
      // const saveFile = this.progress.getSaveFile();
      if(useSaveFile){
 
        // boots up game with a save file
        // comment in to run with save file
        this.progress.load();
        initialHeroState = {
          x: this.progress.startingHeroX,
          y: this.progress.startingHeroY,
          direction: this.progress.startingHeroDirection,
        }
      }


    // load the hud
    this.hud = new Hud();
    this.hud.init(container);



    // start the first map
    // checking for initialHeroState (saveFile)
    this.startMap(window.OverworldMaps[this.progress.mapId], initialHeroState)

    // binds action inputs/ creates controls
    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    // fire game
    this.startGameLoop();

    // firing cutscene
    // this.map.startCutscene([
      // {type: "battle", enemyId: "lyle"},

    //   {type: "textMessage", text: "This is the first cutscene!!!!!"},
    //   {type: "changeMap", map: "WorldBase"}
    // ])
  }
}
