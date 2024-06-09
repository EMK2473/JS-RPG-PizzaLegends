class Overworld {
  // top level parent component. keeps track of states and send those states down to child components
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
      // draw lower layer
      this.map.drawLowerImage(this.ctx);

      // draw game objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
        });
        object.sprite.draw(this.ctx);
      });
      // draw upper layer
      this.map.drawUpperImage(this.ctx);
      // console.log("stepping");
      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.Kitchen);

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
  }
}
