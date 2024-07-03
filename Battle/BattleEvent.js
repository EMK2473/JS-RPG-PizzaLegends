// battle event class
// handles battle messages
// handles state changes
// handles giving xp

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
    const { caster, target, damage, recover, status, action } = this.event;
    let who = this.event.onCaster ? caster : target;

    if (damage) {
      // modify hp when hit and blink
      target.update({
        hp: target.hp - damage,
      });

      target.pizzaElement.classList.add("battle-damage-blink");
      console.log(`Adding class: ${"battle-damage-blink"} to element`);
    }

    if (recover) {
      // const who = this.event.onCaster ? caster : target;
      let newHp = who.hp + recover;
      if (newHp > who.maxHp) {
        newHp = who.maxHp;
      }
      who.update({
        hp: newHp,
      });
    }

    if (status) {
      who.update({
        status: { ...status },
      });
    }

    if (status === null) {
      who.update({
        status: null,
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

  // handles submission menu => battle events
  submissionMenu(resolve) {
    const { caster } = this.event;
    const menu = new SubmissionMenu({
      caster: this.event.caster,
      enemy: this.event.enemy,
      items: this.battle.items,
      replacements: Object.values(this.battle.combatants).filter((c) => {
        return c.id !== caster.id && c.team === caster.team && c.hp > 0;
      }),
      onComplete: (submission) => {
        // submission = what move to use and who to use it on
        resolve(submission);
      },
    });
    menu.init(this.battle.element);
  }

  replacementMenu(resolve) {
    const menu = new ReplacementMenu({
      replacements: Object.values(this.battle.combatants).filter((c) => {
        return c.team === this.event.team && c.hp > 0;
      }),
      onComplete: (replacement) => {
        resolve(replacement);
      },
    });
    menu.init(this.battle.element);
  }

  // handles checking prev Combatant
  // active combatants object on Battle.js
  async replace(resolve) {
    const { replacement } = this.event;

    // clear out old combatant, set to null
    const prevCombatant =
      this.battle.combatants[this.battle.activeCombatants[replacement.team]];
    this.battle.activeCombatants[replacement.team] = null;
    prevCombatant.update();
    await utils.wait(400);

    // in with the new combatant
    this.battle.activeCombatants[replacement.team] = replacement.id;
    replacement.update();
    await utils.wait(400);

    this.battle.playerTeam.update();
    this.battle.enemyTeam.update();

    resolve();
  }

  giveXp(resolve) {
    let amount = this.event.xp;
    const { combatant } = this.event;
    const step = () => {
      if (amount > 0) {
        amount -= 1;
        combatant.xp += 1;

        if(combatant.xp === combatant.maxXp){
          combatant.xp = 0;
          combatant.maxXp = 100;
          combatant.level += 1
        }
        // check if xp levels up (hits max xp)

        combatant.update();
        requestAnimationFrame(step);
        return;
      }
      resolve();
    console.log(combatant.xp)

    };
    requestAnimationFrame(step);
  }

  animation(resolve) {
    const fn = BattleAnimations[this.event.animation];
    fn(this.event, resolve);
  }

  init(resolve) {
    this[this.event.type](resolve);
  }
}
