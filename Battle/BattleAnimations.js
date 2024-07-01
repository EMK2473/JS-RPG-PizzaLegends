window.BattleAnimations = {
    async spin(event, onComplete) {

        // add class for animation
        const element = event.caster.pizzaElement;
        const animationClassName = event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";
        element.classList.add(animationClassName);

        //remove class when animation ends
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
        }, { once: true});

        // async timing to cycle battle during animation collosion
        await utils.wait(100);
        onComplete();
    }
}