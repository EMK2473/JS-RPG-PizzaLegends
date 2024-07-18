// turn cycle object that receives instructions as new events
// battle event handler will handle each different event in sequences
// use caster and target to specify when building actions

class TurnCycle {
  constructor({ battle, onNewEvent, onWinner }) {
    this.battle = battle;
    this.onNewEvent = onNewEvent;
    this.onWinner = onWinner;
    this.currentTeam = "player"; //or "enemy"

    this.turnCounter = 0;
    this.turnCounterElement = this.createTurnCounterElement();
    this.updateTurnCounterDisplay();
  }

  // Methods
  createTurnCounterElement() {
    // create the turn counter element
    const turnCounterElement = document.createElement("div");
    turnCounterElement.id = "turn-counter";

    // find the game-container element and append the turn counter to it
    const gameContainer = document.querySelector(".game-container");
    if (gameContainer) {
      gameContainer.appendChild(turnCounterElement);
    } else {
      // fallback: if .game-container is not found, append to body
      document.body.appendChild(turnCounterElement);
    }
    return turnCounterElement;
  }

  updateTurnCounterDisplay() {
    // update the turn counter element
    if (this.turnCounterElement) {
      this.turnCounterElement.textContent = `Turn: ${this.turnCounter}`;
    }
  }

  removeTurnCounterElement() {
    if (this.turnCounterElement && this.turnCounterElement.parentNode) {
      this.turnCounterElement.parentNode.removeChild(this.turnCounterElement);
    }
  }

  async turn() {
    // check if the current team is player and then increment the TurnCounter

    if (this.currentTeam === "player") {
      this.turnCounter += 1;
      this.updateTurnCounterDisplay();
      // await this.onNewEvent({
      //   type: "textMessage",
      //   text: `Turn ${this.turnCounter} begins!`,
      // });
    }

    //get the caster, enemy, and target,
    const casterId = this.battle.activeCombatants[this.currentTeam];
    const caster = this.battle.combatants[casterId];
    const enemyId =
      this.battle.activeCombatants[
        caster.team === "player" ? "enemy" : "player"
      ];
    const enemy = this.battle.combatants[enemyId];
    const targetTeam = this.currentTeam === "player" ? "enemy" : "player";
    const targetId = this.battle.activeCombatants[targetTeam];
    const target = this.battle.combatants[targetId];

    // check for statuses
    caster.logStatus();
    target.logStatus();



    // check for status expire
    const expiredEvent = caster.decrementStatus();
    if (expiredEvent) {
      await this.onNewEvent(expiredEvent);
      caster.update()
    }

    // new submission event
    const submission = await this.onNewEvent({
      type: "submissionMenu",
      caster,
      target,
      enemy,
    });

    // stop here if we are replacing this pizza
    if (submission.replacement) {
      await this.onNewEvent({
        type: "replace",
        replacement: submission.replacement,
      });
      await this.onNewEvent({
        type: "textMessage",
        text: `Go get 'em", ${submission.replacement.name}!`,
      });
      this.nextTurn();
      return;
    }

    if (submission.instanceId) {
      // add to list to persist to player state post battle
      this.battle.usedInstanceIds[submission.instanceId] = true;

      // removing item from battle state
      this.battle.items = this.battle.items.filter(
        (i) => i.instanceId !== submission.instanceId
      );
    }

    const resultingEvents = caster.getReplacedEvents(submission.action.success);

    for (let i = 0; i < resultingEvents.length; i++) {
      const event = {
        ...resultingEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target,
      };
      await this.onNewEvent(event);
    }

    // check if target died?
    const targetDead = submission.target.hp <= 0;
    if (targetDead) {
      await this.onNewEvent({
        type: "textMessage",
        text: `${submission.target.name} died X_X !`,
      });

      if (submission.target.team === "enemy") {
        const playerActivePizzaId = this.battle.activeCombatants.player;
        const xp = submission.target.givesXp;

        await this.onNewEvent({
          type: "textMessage",
          text: `${this.currentTeam} Gained ${xp} XP!`,
        });
        await this.onNewEvent({
          type: "giveXp",
          xp,
          combatant: this.battle.combatants[playerActivePizzaId],
        });
      }
    }

    // check if a team won?
    const winner = this.getWinningTeam();
    if (winner) {
      this.removeTurnCounterElement();
      await this.onNewEvent({
        type: "textMessage",
        text: `Winner!`,
      });
      this.onWinner(winner);
      return;
    }

    // if dead target and no winner, then bring in replacement
    if (targetDead) {
      const replacement = await this.onNewEvent({
        type: "replacementMenu",
        team: submission.target.team,
      });
      await this.onNewEvent({
        type: "replace",
        replacement: replacement,
      });
      await this.onNewEvent({
        type: "textMessage",
        text: `${replacement.name} appears!`,
      });
    }

    if (caster.status?.type === "burn") {
      caster.burn();
      await this.onNewEvent({
        type: "textMessage",
        text: `${caster.name} takes burn damage!`,
      });
      caster.update();
    }

    if (caster.status?.type === "defUp") {
      caster.update();
    }

    // check for post events
    //(do things AFTER original turn submission)
    // apply post events after the action
    const postEvents = caster.getPostEvents();
    for (let i = 0; i < postEvents.length; i++) {
      const event = {
        ...postEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target,
      };
      await this.onNewEvent(event);
    }

    this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
    this.turn();
  }

  getWinningTeam() {
    let aliveTeams = {};
    Object.values(this.battle.combatants).forEach((c) => {
      if (c.hp > 0) {
        aliveTeams[c.team] = true;
      }
    });

    if (!aliveTeams["player"]) {
      return "enemy";
    }
    if (!aliveTeams["enemy"]) {
      return "player";
    }
    return null;
  }

  // next turn method for when mid turn events happen (swapping/replacement)
  nextTurn() {
    this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
    this.turn();
  }

  async init() {
    await this.onNewEvent({
      type: "textMessage",
      text: `${this.battle.enemy.name} wants to throw down!`,
    });

    // start the first turn
    this.turn();
  }
}
