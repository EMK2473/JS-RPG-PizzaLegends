// turn cycle object that receives instructions as new events
// battle event handler will handle each different event in sequences

class TurnCycle {
  constructor({ battle, onNewEvent }) {
    this.battle = battle;
    this.onNewEvent = onNewEvent;
    this.currentTeam = "player";
    //  or "enemy"
  }

  // will create promises and wait for them to resolve
  async turn() {
    // caster -  reference to combatant class.
    // Who's the caster rn?
    const casterId = this.battle.activeCombatants[this.currentTeam];
    const caster = this.battle.combatants[casterId];
    const enemyId =
      this.battle.activeCombatants[
        caster.team === "player" ? "enemy" : "player"
      ];
    const enemy = this.battle.combatants[enemyId];
    const submission = await this.onNewEvent({
      type: "submissionMenu",
      caster,
      enemy,
    });
    
    const resultingEvents = submission.action.success;
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


    // check for post action events
    // (Do things after your original turn submission)
    const postEvents = caster.getPostEvents();
    for (let i = 0; i <postEvents.length; i++){
      const event = {
        ...postEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target,
      }
      await this.onNewEvent(event)
    }

    const expiredEvent = caster.decrementStatus();
    if(expiredEvent){
      await this.onNewEvent(expiredEvent)
    }

    this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
    this.turn();
  }

  async init() {
    await this.onNewEvent({
      type: "textMessage",
      text: "The battle is starting!",
    });

    // starts the first turn
    this.turn();
  }
}
