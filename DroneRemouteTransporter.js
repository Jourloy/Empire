function getResourceRefiller(creep) {
    let target = FindRemouteTarget(creep)

    if (creep.room != target.room) {
        creep.moveTo(target);
    } else {
        const containerInRoom = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 20;
            }
        });
        if (containerInRoom.length == 1) {
            if (creep.withdraw(containerInRoom[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(containerInRoom[0], { heuristicWeight: 1.2, range: 1, reusePath: 20 });
        } else {
            const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: (d) => {
                    return (d.resourceType == "energy");
                }
            });
            if (droppedEnergy.length > 0) {
                if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) creep.moveTo(droppedEnergy[0]);
            } else {

            }
        }
    }
}

function doWork(creep) {
    if (creep.room.name != creep.memory.room) {
        creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
    } else {
        if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] < 900001) {
            if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
            }
        }
    }
}

const DroneRemoteTransporter = {
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
    
                if (creep.memory.state == "getResource") getResourceRefiller(creep);
                if (creep.memory.state == "doWork") doWork(creep);
            }
        }
    }
}
module.exports = DroneRemoteTransporter;