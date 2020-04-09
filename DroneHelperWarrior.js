function killCreeps(creep) {
    const hostileTarget = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
        filter: (crps) => {
            return (!Memory.friends.includes(crps.owner.username));
        }
    });
    if (hostileTarget) {
        if (creep.attack(hostileTarget) == ERR_NOT_IN_RANGE) creep.moveTo(hostileTarget);
    } else {
        destroyStructures(creep)
    }
}

function destroyStructures(creep) {
    const hostileTargetStr = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
        filter: (strc) => {
            return !Memory.friends.includes(strc.owner.username) && strc.structureType != "rampart" && strc.structureType != "controller" && strc.structureType != "storage";
        }
    });
    if (creep.attack(hostileTargetStr) == ERR_NOT_IN_RANGE) creep.moveTo(hostileTargetStr);
    else {
        creep.moveTo(Game.flags.Attack)
    }
}

function attackRoom(creep) {

    killCreeps(creep);

}

let DroneHelperWarrior = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (creep.room != Game.flags.Attack.room) {
                creep.moveTo(Game.flags.Attack)
            } else {
                attackRoom(creep)
            }

        }
    }
};
module.exports = DroneHelperWarrior;
