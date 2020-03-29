function killCreeps(creep) {
    const speak = ['ODIN,', "MY", "FATHER!", "I", "BEG", "YOU!", "BLAST", "ME!"]
    creep.say(speak[Game.time%speak.length], true);

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
            return strc.owner.username != "kotyara" && strc.owner.username != "JOURLOY" && strc.structureType != "controller" && strc.structureType != "storage";
        }
    });
    if (creep.attack(hostileTarget) == ERR_NOT_IN_RANGE) creep.moveTo(hostileTarget);
    else if (creep.room.controller && !creep.room.controller.my || !creep.room.controller) {
        const structuresContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (strc) => {
                return strc.structureType == "spawn";
            }
        });
        if (creep.attack(structuresContainer) == ERR_NOT_IN_RANGE) creep.moveTo(structuresContainer);
    }
}

function attackRoom(creep, HealRole) {

    if (Game.flags.Heal) {
        if (creep.hits < (creep.hitsMax-(creep.hitsMax/4)) && Game.flags.Heal) creep.memory.selfHeal = true;
        else if (creep.hits == creep.hitsMax) creep.memory.selfHeal = false;
    } else {
        creep.memory.selfHeal = false;
    }

    if (Game.flags.Attack.room == creep.room && !creep.memory.selfHeal) {
        const towers = creep.room.find(FIND_HOSTILE_STRUCTURES, {
            filter: (strc) => {
                return strc.owner.username != "kotyara" && strc.owner.username != "JOURLOY" && strc.structureType == "tower";
            }
        });

        if (towers.length > 0) {
            let healers = creep.pos.findInRange(FIND_MY_CREEPS, 5, {
                filter: (crps) => {
                    return (crps.memory.role == HealRole);
                }
            });

            if (healers) {
                killCreeps(creep);
            } else {
                creep.moveTo(Game.flags.Heal);
            }
        } else {
            killCreeps(creep);
        }
    } else {
        if (creep.memory.selfHeal) {
            creep.moveTo(Game.flags.Heal);
        } else {
            creep.moveTo(Game.flags.Attack);
        }
    }
}

let DroneHelperWarrior = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {

            const HealRole = "DroneHelperHealer"
            
            attackRoom(creep, HealRole)

        }
    }
};
module.exports = DroneHelperWarrior;