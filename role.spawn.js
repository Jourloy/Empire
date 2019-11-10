var roleSpawn = {
    run(spawn) {
        /**********************************************************************************************************\
       |                                               Переменные                                                   |
        \**********************************************************************************************************/
        var originSpawn = Game.spawns["SP-R1"];
        var originRoom = originSpawn.room;
        var sources = originRoom.find(FIND_SOURCES);

        if (Game.spawns["SP-R2"]) {
            var originSpawn1 = Game.spawns["SP-R2"];
            var originRoom1 = originSpawn1.room;
            var sources1 = originRoom1.find(FIND_SOURCES);
            var extensions1 = originRoom1.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION);
                }
            });
            var amountEnergy1 = originRoom1.energyCapacityAvailable;
        }

        if (Game.spawns["SP-R3"]) {
            var originSpawn2 = Game.spawns["SP-R3"];
            var originRoom2 = originSpawn2.room;
            var sources2 = originRoom2.find(FIND_SOURCES);
            var extensions2 = originRoom2.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION);
                }
            });
            var amountEnergy2 = originRoom2.energyCapacityAvailable;
        }

        if (Game.spawns["Spawn4"]) {
            var originSpawn3 = Game.spawns["Spawn4"];
            var originRoom3 = originSpawn3.room;
            var sources3 = originRoom3.find(FIND_SOURCES);
            var extensions3 = originRoom3.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION);
                }
            });
            var amountEnergy3 = originRoom3.energyCapacityAvailable;
        }

        var numberCreep = Game.time;
        var extensions = originRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION);
            }
        });
        var amountEnergy = originRoom.energyCapacityAvailable;

        Memory.stats["room." + originRoom.name + ".energyCapacityAvailable"] = amountEnergy;
        Memory.stats["room." + originRoom.name + ".energyAvailable"] = originRoom.energyAvailable;
        Memory.stats["room." + originRoom.name + ".controllerProgress"] = originRoom.controller.progress;
        Memory.stats["room." + originRoom.name + ".controllerProgressTotal"] = originRoom.controller.progressTotal;
        Memory.stats["room." + originRoom.name + ".controllerLevel"] = originRoom.controller.level;
        if (originRoom.storage) {
          Memory.stats["room." + originRoom.name + ".storageCapacityEnergy"] = originRoom.storage.store[RESOURCE_ENERGY];
        } else {
          Memory.stats["room." + originRoom.name + ".storageCapacityEnergy"] = 0;
        }

        Memory.stats["room." + originRoom1.name + ".energyCapacityAvailable"] = amountEnergy1;
        Memory.stats["room." + originRoom1.name + ".energyAvailable"] = originRoom1.energyAvailable;
        Memory.stats["room." + originRoom1.name + ".controllerProgress"] = originRoom1.controller.progress;
        Memory.stats["room." + originRoom1.name + ".controllerProgressTotal"] = originRoom1.controller.progressTotal;
        Memory.stats["room." + originRoom1.name + ".controllerLevel"] = originRoom1.controller.level;
        if (originRoom1.storage) {
          Memory.stats["room." + originRoom1.name + ".storageCapacityEnergy"] = originRoom1.storage.store[RESOURCE_ENERGY];
        } else {
          Memory.stats["room." + originRoom1.name + ".storageCapacityEnergy"] = 0;
        }

        Memory.stats["room." + originRoom2.name + ".energyCapacityAvailable"] = amountEnergy2;
        Memory.stats["room." + originRoom2.name + ".energyAvailable"] = originRoom2.energyAvailable;
        Memory.stats["room." + originRoom2.name + ".controllerProgress"] = originRoom2.controller.progress;
        Memory.stats["room." + originRoom2.name + ".controllerProgressTotal"] = originRoom2.controller.progressTotal;
        Memory.stats["room." + originRoom2.name + ".controllerLevel"] = originRoom2.controller.level;
        if (originRoom2.storage) {
          Memory.stats["room." + originRoom2.name + ".storageCapacityEnergy"] = originRoom2.storage.store[RESOURCE_ENERGY];
        } else {
          Memory.stats["room." + originRoom2.name + ".storageCapacityEnergy"] = 0;
        }

        Memory.stats["room." + "W49S26" + ".energyCapacityAvailable"] = 0;
        Memory.stats["room." + "W49S26" + ".energyAvailable"] = 0;
        Memory.stats["room." + "W49S26" + ".controllerProgress"] = 0;
        Memory.stats["room." + "W49S26" + ".controllerProgressTotal"] = 0;
        Memory.stats["room." + "W49S26" + ".controllerLevel"] = 0;
        //if (originRoom3.storage) {
        //  Memory.stats["room." + "W49S26" + ".storageCapacityEnergy"] = originRoom.storage.store[RESOURCE_ENERGY];
        //} else {
        Memory.stats["room." + "W49S26" + ".storageCapacityEnergy"] = 0;
        //}


        /**********************************************************************************************************\
       |                                         Спаун: меньше 550 энергии                                          |
        \**********************************************************************************************************/
        if (amountEnergy <= 549) {
            if (Memory.room.W49S28.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW49S28) {
                var newName = "miner0 | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, MOVE, MOVE], newName,
                    { memory: { role: "miner0", sourceId: sources[0].id } });
            } else if (Memory.room.W49S28.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW49S28) {
                var newName = "transporter | " + numberCreep;
                originSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
                    { memory: { role: "transporter" } });
            } else if (Memory.room.W49S28.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW49S28) {
                var newName = "miner1 | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, MOVE, MOVE], newName,
                    { memory: { role: "miner1", sourceId: sources[1].id } });
            } else if (Memory.room.W49S28.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW49S28) {
                var newName = "builder | " + numberCreep;
                originSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
                    { memory: { role: "builder" } });
            } else if (Memory.room.W49S28.amountWarriorsIsLive < Memory.amountCreeps.amountWarriorsInW49S28) {
                var newName = "warrior | " + numberCreep;
                originSpawn.spawnCreep([RANGED_ATTACK, MOVE], newName,
                    { memory: { role: "warrior" } });
            }
            /**********************************************************************************************************\
           |                                   Спаун: меньше 799 энергии и больше 549                                   |
            \**********************************************************************************************************/
        } else if (amountEnergy > 549 && amountEnergy <= 799) {
            if (Memory.room.W49S28.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW49S28) {
                var newName = "miner0 | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, WORK, WORK, MOVE], newName,
                    { memory: { role: "miner0", sourceId: sources[0].id } });
            } else if (Memory.room.W49S28.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW49S28) {
                var newName = "transporter | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY], newName,
                    { memory: { role: "transporter" } });
            } else if (Memory.room.W49S28.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW49S28) {
                var newName = "miner1" + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, WORK, WORK, MOVE], newName,
                    { memory: { role: "miner1", sourceId: sources[1].id } });
            } else if (Memory.room.W49S28.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW49S28) {
                var newName = "builder | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, CARRY, MOVE], newName,
                    { memory: { role: "builder" } });
            } else if (Memory.room.W49S28.amountWarriorsIsLive < Memory.amountCreeps.amountWarriorsInW49S28) {
                var newName = "warrior | " + numberCreep;
                originSpawn.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE], newName,
                    { memory: { role: "warrior" } });
            } else if (Memory.room.W49S28.amountClaimersIsLive < Memory.amountCreeps.amountClaimersInW49S28) {
                var newName = "claimer | " + numberCreep;
                originSpawn.spawnCreep([CLAIM, MOVE, MOVE], newName,
                    { memory: { role: "claimer" } });
            } else if (Memory.room.W49S28.amountFarBuildersIsLive < Memory.amountCreeps.amountFarBuildersInW49S28) {
                var newName = "farBuilder | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
                    { memory: { role: "farBuilder" } });
            }
            /**********************************************************************************************************\
           |                                          Спаун: больше 800 энергии                                         |
            \**********************************************************************************************************/
        } else if (amountEnergy > 799 && amountEnergy < 1299) {
            if (Memory.room.W49S28.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW49S28) {
                var newName = "miner0 | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                    { memory: { role: "miner0", sourceId: sources[0].id } });
            } else if (Memory.room.W49S28.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW49S28) {
                var newName = "transporter | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE], newName,
                    { memory: { role: "transporter" } });
            } else if (Memory.room.W49S28.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW49S28) {
                var newName = "miner1 | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                    { memory: { role: "miner1", sourceId: sources[1].id } });
            } else if (Memory.room.W49S28.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW49S28) {
                var newName = "builder | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
                    { memory: { role: "builder" } });
            } else if (Memory.room.W49S28.amountWarriorsIsLive < Memory.amountCreeps.amountWarriorsInW49S28) {
                var newName = "warrior | " + numberCreep;
                originSpawn.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE], newName,
                    { memory: { role: "warrior" } });
            } else if (Memory.room.W49S28.amountClaimersIsLive < Memory.amountCreeps.amountClaimersInW49S28) {
                var newName = "claimer | " + numberCreep;
                originSpawn.spawnCreep([CLAIM, MOVE, MOVE], newName,
                    { memory: { role: "claimer" } });
            } else if (Memory.room.W49S28.amountFarBuildersIsLive < Memory.amountCreeps.amountFarBuildersInW49S28) {
                var newName = "farBuilder | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, CARRY, MOVE, MOVE], newName,
                    { memory: { role: "farBuilder" } });
            }
        } else if (amountEnergy > 1299) {
            if (Memory.room.W49S28.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW49S28) {
                var newName = "miner0 | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                    { memory: { role: "miner0", sourceId: sources[0].id } });
            } else if (Memory.room.W49S28.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW49S28) {
                var newName = "transporter | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName,
                    { memory: { role: "transporter" } });
            } else if (Memory.room.W49S28.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW49S28) {
                var newName = "miner1 | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                    { memory: { role: "miner1", sourceId: sources[1].id } });
            } else if (Memory.room.W49S28.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW49S28) {
                var newName = "builder | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, WORK, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName,
                    { memory: { role: "builder" } });
            } else if (Memory.room.W49S28.amountWarriorsIsLive < Memory.amountCreeps.amountWarriorsInW49S28) {
                var newName = "warrior | " + numberCreep;
                originSpawn.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE], newName,
                    { memory: { role: "warrior" } });
            } else if (Memory.room.W49S28.amountClaimersIsLive < Memory.amountCreeps.amountClaimersInW49S28) {
                var newName = "claimer | " + numberCreep;
                originSpawn.spawnCreep([CLAIM, CLAIM, MOVE, MOVE], newName,
                    { memory: { role: "claimer" } });
            } else if (Memory.room.W49S28.amountFarBuildersIsLive < Memory.amountCreeps.amountFarBuildersInW49S28) {
                var newName = "farBuilder | " + numberCreep;
                originSpawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
                    { memory: { role: "farBuilder" } });
            }
        }
        if (Game.spawns["SP-R2"]) {
            /**********************************************************************************************************\
           |                                         Спаун: меньше 550 энергии                                          |
            \**********************************************************************************************************/
            if (amountEnergy1 <= 549) {
                if (Memory.room.W49S27.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW49S27) {
                    var newName = "miner0 | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, MOVE, MOVE], newName,
                        { memory: { role: "miner0", sourceId: sources1[0].id } });
                } else if (Memory.room.W49S27.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW49S27) {
                    var newName = "transporter | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
                        { memory: { role: "transporter" } });
                } else if (Memory.room.W49S27.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW49S27) {
                    var newName = "miner1 | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, MOVE, MOVE], newName,
                        { memory: { role: "miner1", sourceId: sources1[1].id } });
                } else if (Memory.room.W49S27.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW49S27) {
                    var newName = "builder | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
                        { memory: { role: "builder" } });
                } else if (Memory.room.W49S27.amountWarriorsIsLive < Memory.amountCreeps.amountWarriorsInW49S27) {
                    var newName = "warrior | " + numberCreep;
                    originSpawn1.spawnCreep([RANGED_ATTACK, MOVE], newName,
                        { memory: { role: "warrior" } });
                }
                /**********************************************************************************************************\
               |                                   Спаун: меньше 799 энергии и больше 549                                   |
                \**********************************************************************************************************/
            } else if (amountEnergy1 > 549 && amountEnergy1 <= 799) {
                if (Memory.room.W49S27.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW49S27) {
                    var newName = "miner0 | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner0", sourceId: sources1[0].id } });
                } else if (Memory.room.W49S27.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW49S27) {
                    var newName = "transporter | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY], newName,
                        { memory: { role: "transporter" } });
                } else if (Memory.room.W49S27.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW49S27) {
                    var newName = "miner1" + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner1", sourceId: sources1[1].id } });
                } else if (Memory.room.W49S27.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW49S27) {
                    var newName = "builder | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, CARRY, MOVE, CARRY, MOVE, MOVE, MOVE], newName,
                        { memory: { role: "builder" } });
                } else if (Memory.room.W49S27.amountWarriorsIsLive < Memory.amountCreeps.amountWarriorsInW49S27) {
                    var newName = "warrior | " + numberCreep;
                    originSpawn1.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE], newName,
                        { memory: { role: "warrior" } });
                } else if (Memory.room.W49S27.amountClaimersIsLive < Memory.amountCreeps.amountClaimersInW49S27) {
                    var newName = "claimer | " + numberCreep;
                    originSpawn1.spawnCreep([CLAIM, MOVE, MOVE], newName,
                        { memory: { role: "claimer" } });
                }
                /**********************************************************************************************************\
               |                                          Спаун: больше 800 энергии                                         |
                \**********************************************************************************************************/
            } else if (amountEnergy1 >= 800 && amountEnergy1 < 1200) {
                if (Memory.room.W49S27.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW49S27) {
                    var newName = "miner0 | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner0", sourceId: sources1[0].id } });
                } else if (Memory.room.W49S27.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW49S27) {
                    var newName = "transporter | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE], newName,
                        { memory: { role: "transporter" } });
                } else if (Memory.room.W49S27.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW49S27) {
                    var newName = "miner1 | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner1", sourceId: sources1[1].id } });
                } else if (Memory.room.W49S27.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW49S27) {
                    var newName = "builder | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
                        { memory: { role: "builder" } });
                } else if (Memory.room.W49S27.amountWarriorsIsLive < Memory.amountCreeps.amountWarriorsInW49S27) {
                    var newName = "warrior | " + numberCreep;
                    originSpawn1.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE], newName,
                        { memory: { role: "warrior" } });
                } else if (Memory.room.W49S27.amountClaimersIsLive < Memory.amountCreeps.amountClaimersInW49S27) {
                    var newName = "claimer | " + numberCreep;
                    originSpawn1.spawnCreep([CLAIM, MOVE, MOVE], newName,
                        { memory: { role: "claimer" } });
                } else if (Memory.room.W49S27.amountFarBuildersIsLive < Memory.amountCreeps.amountFarBuildersInW49S27) {
                    var newName = "farBuilder | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY], newName,
                        { memory: { role: "farBuilder" } });
                }
            } else if (amountEnergy1 >= 1200) {
                if (Memory.room.W49S27.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW49S27) {
                    var newName = "miner0 | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner0", sourceId: sources1[0].id } });
                } else if (Memory.room.W49S27.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW49S27) {
                    var newName = "transporter | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName,
                        { memory: { role: "transporter" } });
                } else if (Memory.room.W49S27.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW49S27) {
                    var newName = "miner1 | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner1", sourceId: sources1[1].id } });
                } else if (Memory.room.W49S27.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW49S27) {
                    var newName = "builder | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, WORK, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName,
                        { memory: { role: "builder" } });
                } else if (Memory.room.W49S27.amountWarriorsIsLive < Memory.amountCreeps.amountWarriorsInW49S27) {
                    var newName = "warrior | " + numberCreep;
                    originSpawn1.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE], newName,
                        { memory: { role: "warrior" } });
                } else if (Memory.room.W49S27.amountClaimersIsLive < Memory.amountCreeps.amountClaimersInW49S27) {
                    var newName = "claimer | " + numberCreep;
                    originSpawn1.spawnCreep([CLAIM, MOVE, MOVE], newName,
                        { memory: { role: "claimer" } });
                } else if (Memory.room.W49S27.amountFarBuildersIsLive < Memory.amountCreeps.amountFarBuildersInW49S27) {
                    var newName = "farBuilder | " + numberCreep;
                    originSpawn1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY], newName,
                        { memory: { role: "farBuilder" } });
                }
            }
        }

        if (Game.spawns["SP-R3"]) {
            /**********************************************************************************************************\
           |                                         Спаун: меньше 550 энергии                                          |
            \**********************************************************************************************************/
            if (amountEnergy2 <= 549) {
                if (Memory.room.W48S27.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW48S27) {
                    var newName = "miner0 | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, MOVE, MOVE], newName,
                        { memory: { role: "miner0", sourceId: sources2[0].id } });
                } else if (Memory.room.W48S27.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW48S27) {
                    var newName = "transporter | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
                        { memory: { role: "transporter" } });
                } else if (Memory.room.W48S27.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW48S27) {
                    var newName = "miner1 | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, MOVE, MOVE], newName,
                        { memory: { role: "miner1", sourceId: sources2[1].id } });
                } else if (Memory.room.W48S27.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW48S27) {
                    var newName = "builder | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
                        { memory: { role: "builder" } });
                }
                /**********************************************************************************************************\
               |                                   Спаун: меньше 799 энергии и больше 549                                   |
                \**********************************************************************************************************/
            } else if (amountEnergy2 > 549 && amountEnergy2 <= 799) {
                if (Memory.room.W48S27.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW48S27) {
                    var newName = "miner0 | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner0", sourceId: sources2[0].id } });
                } else if (Memory.room.W48S27.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW48S27) {
                    var newName = "transporter | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY], newName,
                        { memory: { role: "transporter" } });
                } else if (Memory.room.W48S27.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW48S27) {
                    var newName = "miner1" + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner1", sourceId: sources2[1].id } });
                } else if (Memory.room.W48S27.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW48S27) {
                    var newName = "builder | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, CARRY, MOVE], newName,
                        { memory: { role: "builder" } });
                } else if (Memory.room.W48S27.amountWarriorsIsLive < Memory.amountCreeps.amountWarriorsInW48S27) {
                    var newName = "warrior | " + numberCreep;
                    originSpawn2.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE], newName,
                        { memory: { role: "warrior" } });
                } else if (Memory.room.W48S27.amountClaimersIsLive < Memory.amountCreeps.amountClaimersInW48S27) {
                    var newName = "claimer | " + numberCreep;
                    originSpawn2.spawnCreep([CLAIM, MOVE, MOVE], newName,
                        { memory: { role: "claimer" } });
                }
                /**********************************************************************************************************\
               |                                          Спаун: больше 800 энергии                                         |
                \**********************************************************************************************************/
            } else if (amountEnergy2 >= 800 && amountEnergy2 < 1200) {
                if (Memory.room.W48S27.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW48S27) {
                    var newName = "miner0 | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner0", sourceId: sources2[0].id } });
                } else if (Memory.room.W48S27.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW48S27) {
                    var newName = "transporter | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE], newName,
                        { memory: { role: "transporter" } });
                } else if (Memory.room.W48S27.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW48S27) {
                    var newName = "miner1 | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner1", sourceId: sources2[1].id } });
                } else if (Memory.room.W48S27.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW48S27) {
                    var newName = "builder | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
                        { memory: { role: "builder" } });
                } else if (Memory.room.W48S27.amountWarriorsIsLive < Memory.amountCreeps.amountWarriorsInW48S27) {
                    var newName = "warrior | " + numberCreep;
                    originSpawn2.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE], newName,
                        { memory: { role: "warrior" } });
                } else if (Memory.room.W48S27.amountClaimersIsLive < Memory.amountCreeps.amountClaimersInW48S27) {
                    var newName = "claimer | " + numberCreep;
                    originSpawn2.spawnCreep([CLAIM, MOVE, MOVE], newName,
                        { memory: { role: "claimer" } });
                } else if (Memory.room.W48S27.amountFarBuildersIsLive < Memory.amountCreeps.amountFarBuildersInW48S27) {
                    var newName = "farBuilder | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY], newName,
                        { memory: { role: "farBuilder" } });
                }
            } else if (amountEnergy2 >= 1200) {
                if (Memory.room.W48S27.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW48S27) {
                    var newName = "miner0 | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner0", sourceId: sources2[0].id } });
                } else if (Memory.room.W48S27.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW48S27) {
                    var newName = "transporter | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName,
                        { memory: { role: "transporter" } });
                } else if (Memory.room.W48S27.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW48S27) {
                    var newName = "miner1 | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner1", sourceId: sources2[1].id } });
                } else if (Memory.room.W48S27.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW48S27) {
                    var newName = "builder | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, WORK, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName,
                        { memory: { role: "builder" } });
                } else if (Memory.room.W48S27.amountWarriorsIsLive < Memory.amountCreeps.amountWarriorsInW48S27) {
                    var newName = "warrior | " + numberCreep;
                    originSpawn2.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE], newName,
                        { memory: { role: "warrior" } });
                } else if (Memory.room.W48S27.amountClaimersIsLive < Memory.amountCreeps.amountClaimersInW48S27) {
                    var newName = "claimer | " + numberCreep;
                    originSpawn2.spawnCreep([CLAIM, MOVE, MOVE], newName,
                        { memory: { role: "claimer" } });
                } else if (Memory.room.W48S27.amountFarBuildersIsLive < Memory.amountCreeps.amountFarBuildersInW48S27) {
                    var newName = "farBuilder | " + numberCreep;
                    originSpawn2.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY], newName,
                        { memory: { role: "farBuilder" } });
                }
            }
        }

        if (Game.spawns["Spawn4"]) {
            /**********************************************************************************************************\
           |                                         Спаун: меньше 550 энергии                                          |
            \**********************************************************************************************************/
            if (amountEnergy3 <= 549) {
                if (Memory.room.W49S26.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW49S26) {
                    var newName = "miner0 | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, MOVE, MOVE], newName,
                        { memory: { role: "miner0", sourceId: sources3[0].id } });
                } else if (Memory.room.W49S26.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW49S26) {
                    var newName = "transporter | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
                        { memory: { role: "transporter" } });
                } else if (Memory.room.W49S26.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW49S26) {
                    var newName = "miner1 | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, MOVE, MOVE], newName,
                        { memory: { role: "miner1", sourceId: sources3[1].id } });
                } else if (Memory.room.W49S26.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW49S26) {
                    var newName = "builder | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
                        { memory: { role: "builder" } });
                }
                /**********************************************************************************************************\
               |                                   Спаун: меньше 799 энергии и больше 549                                   |
                \**********************************************************************************************************/
            } else if (amountEnergy3 > 549 && amountEnergy3 <= 799) {
                if (Memory.room.W49S26.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW49S26) {
                    var newName = "miner0 | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner0", sourceId: sources3[0].id } });
                } else if (Memory.room.W49S26.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW49S26) {
                    var newName = "transporter | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY], newName,
                        { memory: { role: "transporter" } });
                } else if (Memory.room.W49S26.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW49S26) {
                    var newName = "miner1" + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner1", sourceId: sources3[1].id } });
                } else if (Memory.room.W49S26.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW49S26) {
                    var newName = "builder | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, CARRY, MOVE], newName,
                        { memory: { role: "builder" } });
                } else if (Memory.room.W49S26.amountWarriorsIsLive < Memory.amountCreeps.amountWarriorsInW49S26) {
                    var newName = "warrior | " + numberCreep;
                    originSpawn3.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE], newName,
                        { memory: { role: "warrior" } });
                } else if (Memory.room.W49S26.amountClaimersIsLive < Memory.amountCreeps.amountClaimersInW49S26) {
                    var newName = "claimer | " + numberCreep;
                    originSpawn3.spawnCreep([CLAIM, MOVE, MOVE], newName,
                        { memory: { role: "claimer" } });
                }
                /**********************************************************************************************************\
               |                                          Спаун: больше 800 энергии                                         |
                \**********************************************************************************************************/
            } else if (amountEnergy3 >= 800 && amountEnergy3 < 1200) {
                if (Memory.room.W49S26.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW49S26) {
                    var newName = "miner0 | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner0", sourceId: sources3[0].id } });
                } else if (Memory.room.W49S26.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW49S26) {
                    var newName = "transporter | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE], newName,
                        { memory: { role: "transporter" } });
                } else if (Memory.room.W49S26.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW49S26) {
                    var newName = "miner1 | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner1", sourceId: sources3[1].id } });
                } else if (Memory.room.W49S26.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW49S26) {
                    var newName = "builder | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
                        { memory: { role: "builder" } });
                } else if (Memory.room.W49S26.amountWarriorsIsLive < Memory.amountCreeps.amountWarriorsInW49S26) {
                    var newName = "warrior | " + numberCreep;
                    originSpawn3.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE], newName,
                        { memory: { role: "warrior" } });
                } else if (Memory.room.W49S26.amountClaimersIsLive < Memory.amountCreeps.amountClaimersInW49S26) {
                    var newName = "claimer | " + numberCreep;
                    originSpawn3.spawnCreep([CLAIM, MOVE, MOVE], newName,
                        { memory: { role: "claimer" } });
                } else if (Memory.room.W49S26.amountFarBuildersIsLive < Memory.amountCreeps.amountFarBuildersInW49S26) {
                    var newName = "farBuilder | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY], newName,
                        { memory: { role: "farBuilder" } });
                }
            } else if (amountEnergy3 >= 1200) {
                if (Memory.room.W49S26.amountMiners0IsLive < Memory.amountCreeps.amountMiners0InW49S26) {
                    var newName = "miner0 | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner0", sourceId: sources3[0].id } });
                } else if (Memory.room.W49S26.amountTransportersIsLive < Memory.amountCreeps.amountTransportersInW49S26) {
                    var newName = "transporter | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName,
                        { memory: { role: "transporter" } });
                } else if (Memory.room.W49S26.amountMiners1IsLive < Memory.amountCreeps.amountMiners1InW49S26) {
                    var newName = "miner1 | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                        { memory: { role: "miner1", sourceId: sources3[1].id } });
                } else if (Memory.room.W49S26.amountBuildersIsLive < Memory.amountCreeps.amountBuildersInW49S26) {
                    var newName = "builder | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, WORK, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName,
                        { memory: { role: "builder" } });
                } else if (Memory.room.W49S26.amountWarriorsIsLive < Memory.amountCreeps.amountWarriorsInW49S26) {
                    var newName = "warrior | " + numberCreep;
                    originSpawn3.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE], newName,
                        { memory: { role: "warrior" } });
                } else if (Memory.room.W49S26.amountClaimersIsLive < Memory.amountCreeps.amountClaimersInW49S26) {
                    var newName = "claimer | " + numberCreep;
                    originSpawn3.spawnCreep([CLAIM, MOVE, MOVE], newName,
                        { memory: { role: "claimer" } });
                } else if (Memory.room.W49S26.amountFarBuildersIsLive < Memory.amountCreeps.amountFarBuildersInW49S26) {
                    var newName = "farBuilder | " + numberCreep;
                    originSpawn3.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY], newName,
                        { memory: { role: "farBuilder" } });
                }
            }
        }


    }
};
module.exports = roleSpawn;
