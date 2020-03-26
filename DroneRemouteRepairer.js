function getResourceRepairer(creep) {
    if (creep.room.name == creep.memory.room) {
        if (creep.room.storage) {
            if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.terminal, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
        }
    } else {
        const containerInRoom = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 20;
            }
        });
        if (containerInRoom.length == 1 && containerInRoom[0].store[RESOURCE_ENERGY] > 750) {
            if (creep.withdraw(containerInRoom[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(containerInRoom[0], { heuristicWeight: 1.2, range: 1, reusePath: 20 });
        } else {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
        }
    }
}

function doWork(creep) {
    let target = FindRemouteTarget(creep)

    if (creep.room != target.room) {
        creep.moveTo(target);
    } else {
        var maxStructures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_ROAD ||
                        structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;
            }
        });

        if (maxStructures.length > 0) {
            maxStructures.sort((a,b) => a.hits - b.hits);
            if (creep.repair(maxStructures[0]) == ERR_NOT_IN_RANGE) creep.moveTo(maxStructures[0]);
        } else {
            const constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

            if (constructionSite) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) creep.moveTo(constructionSite, { heuristicWeight: 1.2, range: 3, reusePath: 20 });
            } else {
                creep.moveTo(target)
            }
        }
    }
}

const DroneRemoteRepairer = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (creep.room.name == creep.memory.room && creep.ticksToLive <= Math.ceil(1500 - (600 / (creep.hitsMax / 50)) - 100 - 800) && creep.room.energyAvailable > creep.room.energyCapacityAvailable / 2) creep.memory.renew = true;
            else if (creep.ticksToLive > 1480 || creep.room.energyAvailable < creep.room.energyCapacityAvailable / 2 || creep.room.name != creep.memory.room) creep.memory.renew = false;

            if (creep.memory.renew) GoRenew(creep);
            else {
                if (creep.store.getUsedCapacity() == 0) creep.memory.state = "getResource";
                if (creep.store.getUsedCapacity() == creep.store.getCapacity()) creep.memory.state = "doWork";
    
                if (creep.memory.state == "getResource") getResourceRepairer(creep);
                if (creep.memory.state == "doWork") doWork(creep);
            }
        }
    }
}
module.exports = DroneRemoteRepairer;