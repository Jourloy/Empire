function killCreeps(creep) {
    const hostileTarget = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
        filter: (crps) => {
            return crps.owner.username != "kotyara";
        }
    });
    if (hostileTarget) {
        if (creep.attack(hostileTarget) == ERR_NOT_IN_RANGE) creep.moveTo(hostileTarget);
    } else {
        destroyStructures(creep)
    }
}

function destroyStructures(creep) {
    const hostileTarget = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
        filter: (strc) => {
            return strc.owner.username != "kotyara" && strc.structureType != "controller";
        }
    });
    if (creep.attack(hostileTarget) == ERR_NOT_IN_RANGE) creep.moveTo(hostileTarget);
}

let DroneWarrior = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (Game.flags.attack) {
                if (Game.flags.attack.room != creep.room) {
                    creep.moveTo(Game.flags.attack);
                } else {
                    
                    const hostileCreeps = creep.room.find(FIND_HOSTILE_CREEPS, {
                        filter: (crps) => {
                            return crps.owner.username != "kotyara";
                        }
                    });
                    if (hostileCreeps.length > 0) {
                        killCreeps(creep);
                    } else {
                        const hostileStructures = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                            filter: (strc) => {
                                return strc.owner.username != "kotyara" && strc.structureType != "controller";
                            }
                        });
                        if (hostileStructures.length > 0) {
                            destroyStructures(creep);
                        } else {
                            creep.moveTo(Game.flags.Attack);
                        }
                    }
                }
            }
        }
    }
};
module.exports = DroneWarrior;
