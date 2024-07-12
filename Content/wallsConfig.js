const walls = {
    DemoRoom: {
      // Define walls for DemoRoom
      walls: {
        //Beach Spikes
        [utils.asGridCoord(18, 0)]: true,
        [utils.asGridCoord(18, 1)]: true,
        [utils.asGridCoord(18, 2)]: true,
        [utils.asGridCoord(18, 3)]: true,
        [utils.asGridCoord(19, 3)]: true,
        [utils.asGridCoord(21, 4)]: true,
        [utils.asGridCoord(20, 5)]: true,
        [utils.asGridCoord(21, 6)]: true,
        [utils.asGridCoord(21, 7)]: true,
        [utils.asGridCoord(21, 8)]: true,
        [utils.asGridCoord(20, 8)]: true,
        [utils.asGridCoord(21, 8)]: true,
        [utils.asGridCoord(22, 9)]: true,
        [utils.asGridCoord(22, 10)]: true,
        [utils.asGridCoord(23, 10)]: true,
        [utils.asGridCoord(23, 9)]: true,
        [utils.asGridCoord(24, 8)]: true,
        [utils.asGridCoord(25, 8)]: true,
        [utils.asGridCoord(26, 8)]: true,
        [utils.asGridCoord(27, 8)]: true,
        [utils.asGridCoord(28, 5)]: true,
        [utils.asGridCoord(29, 5)]: true,
        [utils.asGridCoord(29, 4)]: true,
        // Cave Entrance
        [utils.asGridCoord(30, 4)]: true,
        [utils.asGridCoord(31, 4)]: true,
        [utils.asGridCoord(31, 3)]: true,
        [utils.asGridCoord(32, 2)]: true,
        [utils.asGridCoord(33, 2)]: true,
        [utils.asGridCoord(34, 3)]: true,
        [utils.asGridCoord(34, 4)]: true,
        [utils.asGridCoord(34, 5)]: true,
        [utils.asGridCoord(34, 15)]: true,
        [utils.asGridCoord(35, 5)]: true,
        [utils.asGridCoord(36, 5)]: true,
        [utils.asGridCoord(34, 7)]: true,
        [utils.asGridCoord(35, 7)]: true,
        [utils.asGridCoord(36, 7)]: true,
        [utils.asGridCoord(37, 18)]: true,
        [utils.asGridCoord(39, 18)]: true,
        [utils.asGridCoord(38, 7)]: true,
        [utils.asGridCoord(37, 5)]: true,
        [utils.asGridCoord(38, 5)]: true,
        [utils.asGridCoord(39, 5)]: true,
        [utils.asGridCoord(38, 7)]: true,
        [utils.asGridCoord(39, 7)]: true,
        [utils.asGridCoord(40, 6)]: true,
        // Spikes right side
        [utils.asGridCoord(33, 7)]: true,
        [utils.asGridCoord(32, 8)]: true,
        [utils.asGridCoord(33, 9)]: true,
        [utils.asGridCoord(32, 10)]: true,
        [utils.asGridCoord(31, 10)]: true,
        [utils.asGridCoord(30, 10)]: true,
        [utils.asGridCoord(30, 11)]: true,
        [utils.asGridCoord(29, 12)]: true,
        [utils.asGridCoord(29, 13)]: true,
        [utils.asGridCoord(28, 14)]: true,
        [utils.asGridCoord(28, 15)]: true,
        [utils.asGridCoord(29, 15)]: true,
        [utils.asGridCoord(30, 15)]: true,
        [utils.asGridCoord(31, 16)]: true,
        [utils.asGridCoord(32, 16)]: true,
        [utils.asGridCoord(33, 16)]: true,
        [utils.asGridCoord(35, 16)]: true,
        [utils.asGridCoord(35, 17)]: true,
        [utils.asGridCoord(36, 17)]: true,
        [utils.asGridCoord(38, 18)]: true,
        [utils.asGridCoord(38, 17)]: true,
        
      },
      // Add more walls as needed for DemoRoom
    },
    Ruins: {
      // Define walls for Ruins
      [utils.asGridCoord(30, 20)]: true,
      [utils.asGridCoord(31, 20)]: true,
      // Add more walls as needed for Ruins
    },
    // Add more maps as needed
  };
  
  export default walls;
  