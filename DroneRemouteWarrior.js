function killCreeps(creep) {
    const hostileTarget = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
        filter: (crps) => {
            return crps.owner.username != "kotyara";
        }
    });
    if (hostileTarget) {
        if (creep.attack(hostileTarget) == ERR_NOT_IN_RANGE) creep.moveTo(hostileTarget);
    }
}

const DroneRemouteWarrior = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            let target = FindRemouteTarget(creep)

            if (creep.room != target.room) {
                creep.moveTo(target);
            } else {
                let hostileCreeps = FindHostileCreeps(creep.room.name);

                if (hostileCreeps.length > 0) {
                    killCreeps(creep)
                }
            }
        }
    }
}
module.exports = DroneRemouteWarrior;