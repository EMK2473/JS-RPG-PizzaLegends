class SubmissionMenu {
  constructor({ caster, enemy, onComplete }) {
    this.caster = caster;
    this.enemy = enemy;
    this.onComplete = onComplete;
  }

  getPages() {
    const backOption = {
      label: "Back",
      description: "Return to previous page",
      handler: () => {
        this.keyboardMenu.setOptions(this.getPages().root);
      },
    };
    return {
      root: [
        {
          label: "Attack",
          description: "Choose an attack",
          handler: () => {
            // Go to attacks
            this.keyboardMenu.setOptions(this.getPages().attacks);
          },
        },
        {
          label: "Items",
          description: "Choose an item",
          handler: () => {
            // Go to items
            this.keyboardMenu.setOptions(this.getPages().items);
          },
        },
        {
          label: "Swap",
          description: "Swap to another pizza",
          handler: () => {
            // Go to pizzas
          },
        },
      ],
      attacks: [
        ...this.caster.actions.map((key) => {
          const action = Actions[key];
          return {
            label: action.name,
            description: action.description,
            handler: () => {
              this.menuSubmit(action);
            },
          };
        }),
        backOption,
      ],
      items: [
        // items will go here
        backOption,
      ],
    };
  }

  menuSubmit(action, instanceId = null) {


    this.keyboardMenu?.end();

    this.onComplete({
      action,
      target: action.targetType === "friendly" ? this.caster : this.enemy,
    });
  }

  // caster/enemy ai method
  // can be used for targeting any combatant
  decide() {
    this.menuSubmit(Actions[this.caster.actions[0]]);
  }

  showMenu(container) {
    this.keyboardMenu = new KeyboardMenu();
    this.keyboardMenu.init(container);
    this.keyboardMenu.setOptions(this.getPages().root);
  }

  // inits with containers are for initializing objects in dom elements (aka the container)
  init(container) {
    if (this.caster.isPlayerControlled) {
      this.showMenu(container);
    } else {
      this.decide();
    }
  }
}
