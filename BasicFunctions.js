function functions() {

    /*
     *  ------------------------------------------------------------------------------
     * | This code was given by Kotyara on Screeps Slack. Thank you very much :)      |
     *  ------------------------------------------------------------------------------
     */
    for(let name in Game.flags){
        let flag = Game.flags[name]
        if(flag.color == COLOR_BROWN){
            let room = flag.pos.roomName
            new RoomVisual(room).rect(flag.pos.x - 5.5,flag.pos.y - 5.5,11,11,{opacity:0.035});
            new RoomVisual(room).line(flag.pos.x,flag.pos.y - 5.5, flag.pos.x,flag.pos.y + 5.5,{opacity:0.1});
            new RoomVisual(room).line(flag.pos.x - 5.5,flag.pos.y, flag.pos.x + 5.5,flag.pos.y,{opacity:0.1});
            new RoomVisual(room).line(flag.pos.x + 4,flag.pos.y - 4, flag.pos.x - 4,flag.pos.y + 4,{opacity:0.1});
            new RoomVisual(room).line(flag.pos.x - 4,flag.pos.y - 4, flag.pos.x + 4,flag.pos.y + 4,{opacity:0.1});
            new RoomVisual(room).line(flag.pos.x + 4,flag.pos.y - 2, flag.pos.x + 2,flag.pos.y - 4,{opacity:0.1});
            new RoomVisual(room).line(flag.pos.x + 4,flag.pos.y + 2, flag.pos.x + 2,flag.pos.y + 4,{opacity:0.1});
            new RoomVisual(room).line(flag.pos.x - 4,flag.pos.y - 2, flag.pos.x - 2,flag.pos.y - 4,{opacity:0.1});
        }
    }
    
    global.GetInformationAboutRoom = function(creep) {
        for (i in Memory.information) {
            if (creep.room.name == Memory.information[i].RoomName) {
                return Memory.information[i]
            }
        }
    }
    
    global.FindHostileCreeps = function(info) {
        room = Game.rooms[info]
        const hostileCreep = room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return (!Memory.friends.includes(creep.owner.username));
            }
        });
        return hostileCreep;
    };

    global.FindRemouteTarget = function(creep) {
        if (creep.memory.room == "W49S28") return Game.flags.Remoute1;
        if (creep.memory.room == "W49S29") return Game.flags.Remoute2;
        if (creep.memory.room == "W48S27") return Game.flags.Remoute3;
    }
    
    global.GetResource = function(creep) {
        if (creep.room.storage) {
            if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
        } else {
            const containerInRoom = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 20;
                }
            });
            if (containerInRoom.length == 1) {
                if (creep.withdraw(containerInRoom[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(containerInRoom[0], { heuristicWeight: 1.2, range: 1, reusePath: 20 });
            } else if (containerInRoom.length >= 2) {
                containerInRoom.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
                if (creep.withdraw(containerInRoom[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(containerInRoom[0], { heuristicWeight: 1.2, range: 1, reusePath: 20 });
            } else {
                const source = creep.room.find(FIND_SOURCES);
                if (creep.room.storage && (creep.room.storage.store[RESOURCE_ENERGY] > 100000 && source.length == 2) || creep.room.storage && (creep.room.storage.store[RESOURCE_ENERGY] > 20000 && source.length == 1)) {
                    if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                } else {
                    const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                        filter: (d) => {
                            return (d.resourceType == "energy");
                        }
                    });
                    if (droppedEnergy.length > 0) {
                        const droppedEnergyNear = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                            filter: (d) => {
                                return (d.resourceType == "energy");
                            }
                        });
                        if (creep.pickup(droppedEnergyNear) == ERR_NOT_IN_RANGE) creep.moveTo(droppedEnergyNear);
                    } else {
                        const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source);
                    }
                }
            }
        }
    }
    
    global.DoRepair = function(creep) {
        const structures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_TOWER ||
                    structure.structureType == STRUCTURE_ROAD ||
                    structure.structureType == STRUCTURE_STORAGE ||
                    structure.structureType == STRUCTURE_RAMPART ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;
            }
        });
        if (structures.length > 0) {
            structures.sort((a, b) => a.hits - b.hits);
            if (creep.repair(structures[0]) == ERR_NOT_IN_RANGE) creep.moveTo(structures[0])
        } else {
            DoUpgrade(creep);
        }
    }
    
    global.DoRefill = function(creep) {
        const spawnEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
            }
        });
        if (spawnEnergy) {
            if (creep.transfer(spawnEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawnEnergy, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
            }
        } else if (creep.memory.role == "DroneRefiller") {
            const towerWithoutEnergy = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) && structure.store[RESOURCE_ENERGY] <= 750;
                }
            });
            if (towerWithoutEnergy.length > 0 && creep.room.controller.level > 2) {
                towerWithoutEnergy.sort((a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY]);
                if (creep.transfer(towerWithoutEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towerWithoutEnergy[0], { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                }
            } else {
                const labs = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LAB) && structure.store[RESOURCE_ENERGY] < 2000;
                    }
                });
                if (labs.length > 0) {
                    const labsInRoom = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_LAB) && structure.store[RESOURCE_ENERGY] < 2000;
                        }
                    });
    
                    if (creep.transfer(labsInRoom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(labsInRoom, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                    }
                } else {
                    if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] < 900001) {
                        if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                        }
                    } else if (creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] < 100000) {
                        if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                        }
                    }
                }
            }
        }
    }
    
    global.DoUpgrade = function(creep) {
        const spawnEnergy = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
            }
        });
        if (spawnEnergy.length > 0 && (!Memory.room[creep.room.name + ".amountIsLive." + "DroneRefiller"] || !Memory.room[creep.room.name + ".amountIsLive." + "DroneMiner1"])) DoRefill(creep)
        else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller, { heuristicWeight: 1.2 });
    }
    
    global.GoRenew = function(creep) {
        const spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
    
        if (spawn) {
            if (spawn.renewCreep(creep) == ERR_NOT_IN_RANGE) creep.moveTo(spawn)
        }
    }
}

const BasicFunctions = {
    run() {
        functions();
    }
}
module.exports = BasicFunctions;