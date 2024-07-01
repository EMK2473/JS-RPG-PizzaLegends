// turn cycle object that receives instructions as new events 
// battle event handler will handle each different event in sequences

class TurnCycle {
    constructor({ battle, onNewEvent}) {
        this.battle = battle;
        this.onNewEvent = onNewEvent;

        this.currentTeam = "player";
        //  or "enemy"
    }

    // will create promises and wait for them to resolve
    async turn(){
        // caster -  reference to combatant class. 
        // Who's the caster rn?
        const casterId = this.battle.activeCombatants[this.currentTeam];
        const caster = this.battle.combatants[casterId];

        // figure out who the enemy is during the turn
        // caster team is either player or enemy, defaults to player
        // who's on what team rn?
        const enemyId = this.battle.activeCombatants[caster.team === "player" ? "enemy" : "player"]
        const enemy =  this.battle.combatants[enemyId];

        // input
        const submission = await this.onNewEvent({
            type: "submissionMenu",
            caster, 
            enemy
        }) 


        // for loop to iterate through each event in event array for handling events
        const resultingEvents = submission.action.success;
        for(let i=0; i < resultingEvents.length; i++){
            const event = {
                ...resultingEvents[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target,
            }
            await this.onNewEvent(event)
        }

        this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
        this.turn();

    }


    async init(){
        await this.onNewEvent({
            type: "textMessage",
            text: "Battle is starting!"
        })

        // starts the first turn
        this.turn();
    }
}