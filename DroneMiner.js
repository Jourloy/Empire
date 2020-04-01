function doMine(creep) {
    const containerNear = creep.pos.findInRange(FIND_STRUCTURES, 1, { filter: s => s.structureType == STRUCTURE_CONTAINER });
    const sourceInRoom = creep.room.find(FIND_SOURCES);

    if (creep.memory.role == "DroneMiner1" && (!creep.memory.source || creep.memory.source == null)) {
        creep.memory.source = sourceInRoom[0].id;
    } else if (creep.memory.role == "DroneMiner2" && sourceInRoom.length == 2 && (!creep.memory.source || creep.memory.source == null)) {
        creep.memory.source = sourceInRoom[1].id;
    }

    const source = Game.getObjectById(creep.memory.source);

    if (containerNear.length == 1 && creep.pos.isNearTo(source)) {
        if (!creep.pos.isEqualTo(containerNear[0].pos)) {
            creep.moveTo(containerNear[0].pos, { ignoreCreeps: false, reusePath: 20 });
        } else if (containerNear[0].store[RESOURCE_ENERGY] < 1950) {
            creep.harvest(source);
        } else {
            creep.moveTo(source, { ignoreCreeps: false, reusePath: 20 });
        }
    } else {
        if (containerNear.length == 2 && creep.pos.isNearTo(source)) {
            creep.moveTo(containerNear[1], { ignoreCreeps: false, reusePath: 20 });
        } else creep.moveTo(source, { ignoreCreeps: false, reusePath: 20 });
    }
}

const DroneMiner = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (creep.room.name == creep.memory.room) {
                if (creep.ticksToLive <= Math.ceil(1500-(600/(creep.hitsMax/50))-100-800)) creep.memory.renew = true;
                else if (creep.ticksToLive > 1480) creep.memory.renew = false;

                if (creep.memory.renew) GoRenew(creep);
                else doMine(creep);
            } else {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
            }
        }
    }
}
module.exports = DroneMiner;
