class TextMessage {
  constructor({ text, onComplete }) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null;
  }



  // Methods
  createElement() {
    // create Text element on document
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");

    this.element.innerHTML = `
            <p class="TextMessage_p"></p>
            <button class="TextMessage_button">Next</button>
            `;

    // init typewriter effect
    this.revealingText = new RevealingText({
      element: this.element.querySelector(".TextMessage_p"),
      text: this.text,
    });

    this.element.querySelector("button").addEventListener("click", () => {
      // Close the next Text Message
      this.done();
    });

    // text message events listen for enter keydown
    this.actionListener = new KeyPressListener("Enter", () => {
      console.log("enter working");
      this.done();
    });
  }

  done() {
    if (this.revealingText.isDone) {
      this.element.remove();
      this.actionListener.unbind();
      this.onComplete();
    } else {
      this.revealingText.warpToDone();
    }
  }

  // init method for text message object
  init(container) {
    this.createElement();
    container.appendChild(this.element);
    this.revealingText.init();
  }
}
