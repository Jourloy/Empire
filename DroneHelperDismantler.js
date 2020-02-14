function dismantleStructure(creep) {
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
            return (structure.structureType == STRUCTURE_TOWER);
        }
    });

    if (dangerHostileStrInRoom.length > 0) {
        const dangerHostileStr = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
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
    }
}

let DroneHelperDismantler = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (Game.flags.Attack) {
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