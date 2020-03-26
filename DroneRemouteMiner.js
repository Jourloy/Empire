const DroneRemoteMiner = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            let target = FindRemouteTarget(creep)

            if (creep.room != target.room) {
                creep.moveTo(target);
            } else {
                const source = creep.pos.findClosestByPath(FIND_SOURCES);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source)
            }
        }
    }
}
module.exports = DroneRemoteMiner;