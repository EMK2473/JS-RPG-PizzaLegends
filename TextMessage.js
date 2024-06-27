class TextMessage {
    constructor({text, onComplete}){
    this.text = text;
    this.onComplete = onComplete;
    this.element = null;
    }

    createElement() {
        // create Text element on document
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
            <p classs="TextMessage_p"> ${this.text}</p>
            <button class="TextMessage_button">Next</button>
            `)

            this.element.querySelector("button").addEventListener("click", () => {
                // Close the next Text Message
                this.done();
            })
    }

    done() {
        this.element.remove();
        this.onComplete();
    }

    // init method for text message object
    init(container){
        this.createElement();
        container.appendChild(this.element)
    }
}