function killCreeps(creep) {
    const hostileTarget = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
        filter: (crps) => {
            return crps.owner.username != "kotyara";
        }
    });
    if (hostileTarget) {
        if (creep.attack(hostileTarget) == ERR_NOT_IN_RANGE) creep.moveTo(hostileTarget);
    } else creep.memory.attack = false;
}

const DroneRemouteWarrior = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
            creep.memory.attack = true;
        } else {
            let target = FindRemouteTarget(creep)

            if (creep.room != target.room && creep.memory.attack) {
                creep.moveTo(target);
            } else if (creep.room == target.room && creep.memory.attack) {
                let hostileCreeps = FindHostileCreeps(creep.room.name);

                if (hostileCreeps.length > 0) {
                    killCreeps(creep)
                }
            } else if (!creep.memory.attack) {
                if (creep.room != creep.memory.room) creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
                else {
                    const spawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_SPAWN } });
                if (spawn) {
                    if (creep.pos.isNearTo(spawn)) spawn.recycleCreep(creep);
                    else creep.moveTo(spawn, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
                }
                }
            }
        }
    }
}
module.exports = DroneRemouteWarrior;