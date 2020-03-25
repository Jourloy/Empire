function killCreeps(creep) {
    const hostileTarget = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
        filter: (crps) => {
            return crps.owner.username != "kotyara";
        }
    });
    if (hostileTarget) {
        if (creep.attack(hostileTarget) == ERR_NOT_IN_RANGE) creep.moveTo(hostileTarget);
    } else {
        const spawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_SPAWN } });
        if (spawn) {
            if (creep.pos.isNearTo(spawn)) spawn.recycleCreep(creep);
            else creep.moveTo(spawn, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
        }
    }
}

let DroneWarrior = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            const hostileCreep = creep.room.find(FIND_HOSTILE_CREEPS, {
                filter: (creep) => {
                    return (creep.owner.username != "kotyara");
                }
            });
            if (hostileCreep.length > 1) {
                killCreeps(creep)
            } else {
                const spawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_SPAWN } });
                if (spawn) {
                    if (creep.pos.isNearTo(spawn)) spawn.recycleCreep(creep);
                    else creep.moveTo(spawn, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
                }
            }
        }
    }
};
module.exports = DroneWarrior;
