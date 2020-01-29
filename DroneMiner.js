function doMine(creep) {
    const linkInRoom = creep.room.find(FIND_STRUCTURES, { filter: s => s.structureType == STRUCTURE_LINK });
    if (linkInRoom.length > 0) {
        var linkIsNear = creep.pos.findInRange(FIND_STRUCTURES, 1, { filter: s => s.structureType == STRUCTURE_LINK });
    }
    const containerNear = creep.pos.findInRange(FIND_STRUCTURES, 1, { filter: s => s.structureType == STRUCTURE_CONTAINER });
    const sourceInRoom = creep.room.find(FIND_SOURCES);

    if (creep.memory.role == "DroneMiner1" && (!creep.memory.source || creep.memory.source == null)) {
        creep.memory.source = sourceInRoom[0].id;
    } else if (creep.memory.role == "DroneMiner2" && sourceInRoom.length == 2 && (!creep.memory.source || creep.memory.source == null)) {
        creep.memory.source = sourceInRoom[1].id;
    }

    const source = Game.getObjectById(creep.memory.source);

    if (creep.store[RESOURCE_ENERGY] == 0) creep.memory.repair = false;
    else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()) creep.memory.repair = true;

    if (containerNear.length == 1) {
        if (containerNear[0].hits < containerNear[0].hitsMax && creep.memory.repair) {
            creep.repair(containerNear[0]);
        } else if (containerNear[0].hits < containerNear[0].hitsMax && !creep.memory.repair) {
            creep.harvest(source);
        }
    }

    if (linkInRoom && linkInRoom.length > 1 && linkIsNear && linkIsNear.length > 0) {

        if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            if (containerNear.length == 1 && creep.pos.isNearTo(source)) {
                if (!creep.pos.isEqualTo(containerNear[0].pos)) {
                    creep.moveTo(containerNear[0].pos, { ignoreCreeps: false, reusePath: 50 });
                } else if (containerNear[0].store[RESOURCE_ENERGY] < 1950 || linkIsNear[0].store[RESOURCE_ENERGY] < 800) {
                    creep.harvest(source);
                }
            } else {
                creep.moveTo(source, { ignoreCreeps: false, reusePath: 50 });
            }
        } else {
            if (linkIsNear[0].store[RESOURCE_ENERGY] < 800) {
                creep.transfer(linkIsNear[0], RESOURCE_ENERGY);
                creep.harvest(source);
            } else {
                if (containerNear[0].store[RESOURCE_ENERGY] < 1950) {
                    creep.harvest(source);
                }
            }
        }

    } else {
        if (containerNear.length == 1 && creep.pos.isNearTo(source)) {
            if (!creep.pos.isEqualTo(containerNear[0].pos)) {
                creep.moveTo(containerNear[0].pos, { ignoreCreeps: false, reusePath: 50 });
            } else if (containerNear[0].store[RESOURCE_ENERGY] < 1950) {
                creep.harvest(source);
            }
        } else {
            creep.moveTo(source, { ignoreCreeps: false, reusePath: 10 });
        }
    }
}

function goRenew(creep) {
    gR = require("BasicFunctions")
    gR.run(creep, "renew");
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

                if (creep.memory.renew) goRenew(creep);
                else doMine(creep);
            } else {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
            }
        }
    }
}
module.exports = DroneMiner;