class CraftingMenu {
  constructor({ pizzas, onComplete }) {
    this.pizzas = pizzas;
    this.onComplete = onComplete;
  }

  getOptions() {
    return this.pizzas.map((id) => {
      const base = Pizzas[id];
      return {
        label: base.name,
        description: base.description,
        handler: () => {
          playerState.addPizza(id);
          // get the pizza's name
          const pizzaName = base.name; 
          // pass pizzaName to close method
          this.close(pizzaName); 
        },
      };
    });
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("CraftingMenu");
    this.element.classList.add("overlayMenu");
    this.element.innerHTML = `
      <h2> Absorb lost soul.</h2>
    `;
  }

  close(pizzaName) {
    this.keyboardMenu.end();
    this.element.remove();
    this.onComplete(`${pizzaName}'s soul was absorbed.`); 
  }

  init(container) {
    this.createElement();
    this.keyboardMenu = new KeyboardMenu({
      descriptionContainer: container,
    });
    this.keyboardMenu.init(this.element);
    this.keyboardMenu.setOptions(this.getOptions());

    container.appendChild(this.element);
  }
}
