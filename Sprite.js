class Sprite {
  constructor(config) {
    // Set up the image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    this.shadow = new Image();
    this.useShadow = true;
    if (this.useShadow) {
      this.shadow.src = "./images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };
    this.useShadow = true;

    // config animation and initial state
    this.animations = config.animations || {
      "idle-down": [[0, 0]],
      "walk-down": [[1,0], [0,0], [3,0], [0,0]]
    };
    this.currentAnimation =  "walk-down" 
    // config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit =  config.animationFrameLimit || 16;
    this.animationFrameProgress = this.animationFrameLimit;

    // reference the game object
    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }
  
  updateAnimationProgress(){
    // Downtick frame progress
    if(this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    // reset the counter
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame  +=1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx) {
    const x = this.gameObject.x - 8;
    const y = this.gameObject.y - 18;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);


    const [frameX, frameY] = this.frame;

    // config for sprite sheet @ 32 x 32 sheet from Aseprite
    this.isLoaded && ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32);

    this.updateAnimationProgress();
  }

}
