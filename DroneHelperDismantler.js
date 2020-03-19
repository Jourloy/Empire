function dismantleStructure(creep) {

    const wall = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_WALL);
        }
    });

    if (creep.dismantle(wall) == ERR_NOT_IN_RANGE) creep.moveTo(wall)

    const hostileStrInRoom = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_RAMPART ||
                structure.structureType == STRUCTURE_EXTENSION);
        }
    });

    const dangerHostileStrInRoom = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER ||
                    structure.structureType == STRUCTURE_SPAWN);
        }
    });

    if (dangerHostileStrInRoom.length > 0) {
        const dangerHostileStr = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_SPAWN);
            }
        });

        if (dangerHostileStr) {
            if (creep.dismantle(dangerHostileStr) == ERR_NOT_IN_RANGE) creep.moveTo(dangerHostileStr)
        } else {
            const hostileStr = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_RAMPART ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_TOWER);
                }
            });
            if (creep.dismantle(hostileStr) == ERR_NOT_IN_RANGE) creep.moveTo(hostileStr)
        }
    } else if (hostileStrInRoom.length > 0) {
        const hostileStr = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_RAMPART ||
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_TOWER);
            }
        });
        if (creep.dismantle(hostileStr) == ERR_NOT_IN_RANGE) creep.moveTo(hostileStr)
    } else creep.moveTo(Game.flags.Attack);
}

let DroneHelperDismantler = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (Game.flags.Flag1) creep.moveTo(Game.flags.Flag1);
            else if (Game.flags.Attack) {
                if (Game.flags.Attack.room != creep.room) {
                    creep.moveTo(Game.flags.Attack);
                } else {
                    dismantleStructure(creep);
                }
            }

        }
    }
};
module.exports = DroneHelperDismantler;