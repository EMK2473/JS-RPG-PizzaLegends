class BattleEvent {
  constructor(event, battle) {
    this.event = event;
    this.battle = battle;
  }

  // adds text messages to events
  textMessage(resolve) {
    console.log("Message Test Success!");

    const text = this.event.text
      .replace("{CASTER}", this.event.caster?.name)
      .replace("{TARGET}", this.event.target?.name)
      .replace("{ACTION}", this.event.action?.name);

    const message = new TextMessage({
      text,
      onComplete: () => {
        resolve();
      },
    });
    message.init(this.battle.element);
  }

  async stateChange(resolve) {
    const { caster, target, damage, recover } = this.event;
    if (damage) {
      // modify hp when hit and blink
      target.update({
        hp: target.hp - damage,
      });

      target.pizzaElement.classList.add("battle-damage-blink");
      console.log(`Adding class: ${"battle-damage-blink"} to element`);
    }

    if (recover) {
      const who = this.event.onCaster ? caster : target;
      let newHp = who.hp + recover;
      if (newHp > who.maxHp) {
        newHp = who.maxHp;
      }
      who.update({
        hp: newHp,
      });
    }

    // give time in between
    await utils.wait(600);

    // stop animation
    target.pizzaElement.classList.remove("battle-damage-blink");
    console.log(`Removing class: ${"battle-damage-blink"} from element`);

    // resolve event
    resolve();
  }

  submissionMenu(resolve) {
    const menu = new SubmissionMenu({
      caster: this.event.caster,
      enemy: this.event.enemy,
      onComplete: (submission) => {
        // submission = what move to use and who to use it on
        resolve(submission);
      },
    });
    menu.init(this.battle.element);
  }

  animation(resolve) {
    const fn = BattleAnimations[this.event.animation];
    fn(this.event, resolve);
  }

  init(resolve) {
    this[this.event.type](resolve);
  }
}
