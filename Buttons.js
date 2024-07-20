class Buttons {
    constructor() {
        this.createElement();
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("ButtonsContainer");

        this.upButton = this.createButton("Up", "up");
        this.leftButton = this.createButton("Left", "left");
        this.rightButton = this.createButton("Right", "right");
        this.downButton = this.createButton("Down", "down");
        this.enterButton = this.createButton("Enter", "enter");

        this.element.appendChild(this.upButton);
        this.element.appendChild(this.leftButton);
        this.element.appendChild(this.enterButton);
        this.element.appendChild(this.rightButton);
        this.element.appendChild(this.downButton);

        document.body.appendChild(this.element);

        this.setupListeners();
    }

    createButton(label, action) {
        const button = document.createElement("button");
        button.innerText = label;
        button.dataset.action = action;
        button.classList.add("DirectionButton");
        return button;
    }

    setupListeners() {
        this.element.addEventListener("click", (event) => {
            const action = event.target.dataset.action;
            if (action) {
                this.handleButtonClick(action);
            }
        });
    }

    handleButtonClick(action) {
        const event = new KeyboardEvent("keydown", { code: this.getKeyCode(action) });
        document.dispatchEvent(event);

        setTimeout(() => {
            const event = new KeyboardEvent("keyup", { code: this.getKeyCode(action) });
            document.dispatchEvent(event);
        }, 100); 
    }

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
