class SubmissionMenu {
  constructor({ caster, enemy, onComplete }) {
    this.caster = caster;
    this.enemy = enemy;
    this.onComplete = onComplete;
  }

  // caster/enemy ai method
  // can be used for targeting any combatant
  decide() {
    this.onComplete({
      action: Actions[this.caster.actions[0]],
      target: this.enemy,
    });
  }

  // inits with containers are for initializing objects in dom elements (aka the container)
  init(container) {
    this.decide();
  }
}
