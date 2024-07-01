const utils = {

    // function to assign grid
    withGrid(n) {
        return n * 16;
    },

    // function to assign grid coordinates
    // strict no space req for passing coordinates
    asGridCoord(x,y) {
        return`${x*16},${y*16}`
    },

    // collision util function
    // figures out what is infront  
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
    
    // more optimal code
    // oppositeDirection(direction) {
    //     const opposites = {
    //         left: "right",
    //         right: "left",
    //         up: "down",
    //         down: "up"
    //     };
        
    //     return opposites[direction] || null; 
    // Return null or another default if the direction is invalid
    // },

    // multiple conditional checks hinders performance
    oppositeDirection(direction){
        if(direction === "left"){return "right"}
        if(direction === "right"){return "left"}
        if(direction === "up"){return "down"}
        return "up"

    },

    // set timeout as a util function
    wait(ms){
        return new Promise(resolve => {
            setTimeout( () =>{
                resolve()
            }, ms )
        })
    },
    
    emitEvent(name, detail){
        const event = new CustomEvent(name, {
            detail
        });
        document.dispatchEvent(event);
    }
}