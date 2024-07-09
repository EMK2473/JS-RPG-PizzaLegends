// must accept all objects
// loads the sprite for characters
class GameObject {
  constructor(config) {
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "./images/characters/people/reaper.png",
    });

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;

    this.talking = config.talking || [];
  }

  // Methods
  mount(map) {
    console.log("mounting!");
    this.isMounted = true;
    map.addWall(this.x, this.y);


    // if we have a behavior, fire after short delay
    setTimeout(() => {
        this.doBehaviorEvent(map);
    }, 10)
  }

  update() {

  }

  async doBehaviorEvent(map) {

    // don't do anything if there is a more important cutscene or i don't have config to do anything with anyway
    if(map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
        return;
    }

    // set up even with relevant info
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    // creating an event instance from event config
    const eventHandler = new OverworldEvent({map, event: eventConfig});
    await eventHandler.init();

    // setting the next event to fire
    this.behaviorLoopIndex += 1;
    if(this.behaviorLoopIndex === this.behaviorLoop.length) {
        this.behaviorLoopIndex = 0;
    }

    this.doBehaviorEvent(map)

  }
}
