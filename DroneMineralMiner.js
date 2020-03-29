function doMine(creep) {
    const extractor = creep.room.find(FIND_STRUCTURES, { filter: s => s.structureType == STRUCTURE_EXTRACTOR });
    
    if (extractor.length > 0 && extractor[0].cooldown && extractor[0].cooldown > 0) {

    } else if (extractor.length > 0 && (!extractor[0].cooldown || extractor[0].cooldown == 0)) {
        const source = creep.room.find(FIND_MINERALS);
        const containerNear = creep.pos.findInRange(FIND_STRUCTURES, 1, { filter: s => s.structureType == STRUCTURE_CONTAINER });


        if (source[0].ticksToRegeneration > 300) {
            const spawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_SPAWN } });
            if (spawn) {
                if (creep.pos.isNearTo(spawn)) spawn.recycleCreep(creep);
                else creep.moveTo(spawn, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
            }
        } else {

            if (containerNear.length == 1 && creep.pos.isNearTo(source[0])) {
                if (!creep.pos.isEqualTo(containerNear[0].pos)) {
                    creep.moveTo(containerNear[0].pos, { ignoreCreeps: false, reusePath: 50 });
                } else {
                    if (containerNear[0].store.getUsedCapacity() < 1950) creep.memory.harvest = true;
                    if (containerNear[0].store.getUsedCapacity() >= 1950) creep.memory.harvest = false;

                    if (creep.memory.harvest) creep.harvest(source[0])
                }
            } else {
                creep.moveTo(source[0], { ignoreCreeps: false, reusePath: 10 });
            }
        }
    }
}

const DroneMiner = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (creep.ticksToLive <= Math.ceil(1500-(600/(creep.hitsMax/50))-100-800)) creep.memory.renew = true;
            else if (creep.ticksToLive > 1480) creep.memory.renew = false;

            if (creep.memory.renew) GoRenew(creep);
            else {
                if (creep.room.name == creep.memory.room) {
                    doMine(creep);
                } else {
                    creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
                }
            }

        }
    }
}
module.exports = DroneMiner;