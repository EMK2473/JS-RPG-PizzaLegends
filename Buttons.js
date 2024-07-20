class Buttons {
    constructor() {
        this.createElement();
    }

    createElement() {
        // create container for buttons
        this.element = document.createElement("div");
        this.element.classList.add("ButtonsContainer");

        // create buttton directions for input values
        this.upButton = this.createButton("Up", "up");
        this.leftButton = this.createButton("Left", "left");
        this.rightButton = this.createButton("Right", "right");
        this.downButton = this.createButton("Down", "down");
        this.enterButton = this.createButton("Enter", "enter");

        // append buttons to container
        this.element.appendChild(this.upButton);
        this.element.appendChild(this.leftButton);
        this.element.appendChild(this.enterButton);
        this.element.appendChild(this.rightButton);
        this.element.appendChild(this.downButton);

        // append the container to the document
        document.body.appendChild(this.element);

        // call method to handle setting up event listeners
        this.setupListeners();
    }

    // Methods
    // method to create a button
    createButton(label, action) {
        const button = document.createElement("button");
        button.innerText = label;
        button.dataset.action = action;
        button.classList.add("DirectionButton");
        return button;
    }

    // sets event listeners for clicking on buttons
    setupListeners() {
        this.element.addEventListener("click", (event) => {
            const action = event.target.dataset.action;
            if (action) {
                this.handleButtonClick(action);
            }
        });
    }

    // create object to simulate keydown press
    handleButtonClick(action) {
        const event = new KeyboardEvent("keydown", { code: this.getKeyCode(action) });
        document.dispatchEvent(event);

    // create object to simulate keyup release with timing
        setTimeout(() => {
            const event = new KeyboardEvent("keyup", { code: this.getKeyCode(action) });
            document.dispatchEvent(event);
        }, 100); 
    }

    // method to handle mapped buttons to KeyPressListeners
    getKeyCode(action) {
        const keyMap = {
            "up": "ArrowUp",
            "down": "ArrowDown",
            "left": "ArrowLeft",
            "right": "ArrowRight",
            "enter": "Enter"
        };
        return keyMap[action];
    }
}

const buttons = new Buttons();
