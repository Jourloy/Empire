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
                const target = creep.pos.findClosestByPath(FIND_CREEPS, {
                    filter: (crps) => {
                        return (crps.owner.username == "kotyara" || crps.owner.username == "JOURLOY") && crps.hits < crps.hitsMax;
                    }
                });
                if (target) {
                    if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                        creep.rangedHeal(target)
                        creep.moveTo(target);
                    }
                }
            }
        }
    }
}
module.exports = DroneRemouteWarrior;