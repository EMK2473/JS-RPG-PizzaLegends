class RevealingText {
  constructor(config) {
    this.element = config.element;
    this.text = config.text;
    this.speed = config.speed || 60;

    this.timeout = null;
    this.isDone = false;
  }

  // Methods
  revealOneCharacter(list){
    const next = list.splice(0,1)[0];
    next.span.classList.add("revealed");

    if(list.length > 0) {
        this.timeout = setTimeout(()=> {
            this.revealOneCharacter(list)

        }, next.delayAfter)
    } else {
        this.isDone = true;
    }
  }

  warpToDone() {
    clearTimeout(this.timeout);
    this.isDone = true;
    this.element.querySelectorAll("span").forEach( s => {
        s.classList.add("revealed")
    })
  }
  
  init() {
    let characters = [];

    this.text.split("").forEach(character => {

      let span = document.createElement("span");

      span.textContent = character;

      this.element.appendChild(span);

      characters.push({
        span,
        delayAfter: character === " " ? 0 : this.speed,
      });
    });

    this.revealOneCharacter(characters);
  }
}

// If you hit enter key while text is revealing, and it's not done revealing, then we jump to the end and reveal it all;

// But if you hit the enter key, and the text is already revealed, then end the overworld event and proceed to next
