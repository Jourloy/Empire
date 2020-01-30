function killCreeps(creep) {
    const hostileTarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter: (crps) => {
            return crps.owner.username != "kotyara";
        }
    });
    creep.moveTo(hostileTarget)
    if (hostileTarget && hostileTarget.pos.inRangeTo(creep, 3)) {
        creep.rangedAttack(hostileTarget)
    } else {
        destroyStructures(creep)
    }
}

function destroyStructures(creep) {
    const hostileTarget = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
        filter: (strc) => {
            return strc.owner.username != "kotyara" && strc.structureType != "controller" && strc.structureType != "wall";
        }
    });
    if (creep.rangedAttack(hostileTarget) == ERR_NOT_IN_RANGE) creep.moveTo(hostileTarget);
    const hostileTargetCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter: (crps) => {
            return crps.owner.username != "kotyara";
        }
    });
    if (hostileTargetCreep && hostileTargetCreep.pos.inRangeTo(creep, 3)) creep.rangedAttack(hostileTargetCreep)
}

let DroneHelperArcher = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {

            const hostileCreeps = creep.room.find(FIND_HOSTILE_CREEPS, {
                filter: (crps) => {
                    return crps.owner.username != "kotyara";
                }
            });
            const hostileStructures = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                filter: (strc) => {
                    return strc.owner.username != "kotyara" && strc.structureType != "controller";
                }
            });

            if (!creep.memory.room) creep.memory.room = creep.room.name;
            if (Game.flags.Attack) {
                if (Game.flags.Attack.room != creep.room && !hostileCreeps && !hostileStructures) {
                    creep.moveTo(Game.flags.Attack);
                } else {
                    if (hostileCreeps.length > 0 && false) {
                        const speak = ['ODIN,', "MY", "FATHER!", "I", "BEG", "YOU!", "BLAST", "ME!"]
                        creep.say(speak[Game.time%speak.length], true);
                        killCreeps(creep);
                    } else {
                        if (hostileStructures.length > 0) {
                            const speak = ['ODIN,', "MY", "FATHER!", "I", "BEG", "YOU!", "BLAST", "ME!"]
                            
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
module.exports = DroneHelperArcher;