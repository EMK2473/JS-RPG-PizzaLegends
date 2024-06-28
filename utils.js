const utils = {

    // function to assign grid
    withGrid(n) {
        return n * 16;
    },

    // function to assign grid coordinates
    asGridCoord(x,y) {
        return`${x*16}, ${y*16}`
    },

    // collision util function
    // figures out what is infront of someone 
    // accepts position and direction going
    nextPosition(initialX, initialY, direction) {
        let x =  initialX;
        let y = initialY;
        const size = 16;
        if (direction === "left") {
            x -= size;
        } else if (direction === "right") {
            x += size;
        } else if (direction === "up") {
            y -= size;
        } else if (direction === "down") {
            y += size;
        } 
        return {x, y};
    },
    

    emitEvent(name, detail){
        const event = new CustomEvent(name, {
            detail
        });
        document.dispatchEvent(event);
    }
}