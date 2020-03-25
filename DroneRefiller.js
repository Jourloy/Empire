function getResourceRefiller(creep) {
    const mineralDropped = creep.room.find(FIND_DROPPED_RESOURCES, {
        filter: (resource) => {
            return resource.amount > 0 && (resource.resourceType == 'H' || resource.resourceType == 'L');
        }
    });

    if (mineralDropped.length > 0) {
        if (creep.pickup(mineralDropped[0]) == ERR_NOT_IN_RANGE) creep.moveTo(mineralDropped[0], { heuristicWeight: 1.2, range: 1, reusePath: 20 });
    } else {
        const mineralTombstones = creep.room.find(FIND_TOMBSTONES, {
            filter: (structure) => {
                return (structure.store[RESOURCE_HYDROGEN] > 0 || structure.store[RESOURCE_LEMERGIUM] > 0);
            }
        });
        if (mineralTombstones.length > 0) {
            let mineral = null
            if (mineralTombstones[0].store[RESOURCE_HYDROGEN] > 0) mineral = RESOURCE_HYDROGEN;
            else if (mineralTombstones[0].store[RESOURCE_LEMERGIUM] > 0) mineral = RESOURCE_LEMERGIUM;
            if (creep.withdraw(mineralTombstones[0], mineral) == ERR_NOT_IN_RANGE) creep.moveTo(mineralTombstones[0], { heuristicWeight: 1.2, range: 1, reusePath: 20 });
        } else {
            const mineralContainer = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_HYDROGEN] > 1500|| structure.store[RESOURCE_LEMERGIUM] > 1500);
                }
            });
            if (mineralContainer.length > 0) {
                let mineral = null
                if (mineralContainer[0].store[RESOURCE_HYDROGEN] > 0) mineral = RESOURCE_HYDROGEN;
                else if (mineralContainer[0].store[RESOURCE_LEMERGIUM] > 0) mineral = RESOURCE_LEMERGIUM;
                if (creep.withdraw(mineralContainer[0], mineral) == ERR_NOT_IN_RANGE) creep.moveTo(mineralContainer[0], { heuristicWeight: 1.2, range: 1, reusePath: 20 });
            } else {
                if (creep.room.energyAvailable < creep.room.energyCapacityAvailable / 2 && creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] >= (Memory.storageEnergyCapacity - 10000)) {
                    if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                } else {
                    const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                        filter: (resource) => {
                            return resource.amount > 0 && resource.resourceType == 'energy';
                        }
                    });
                    if (droppedEnergy.length > 0) {
                        if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) creep.moveTo(droppedEnergy[0], { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                    } else {
                        const tombstones = creep.room.find(FIND_TOMBSTONES, {
                            filter: (structure) => {
                                return structure.store[RESOURCE_ENERGY] > 0;
                            }
                        });
                        if (tombstones.length > 0) {
                            tombstones.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
                            if (creep.withdraw(tombstones[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(tombstones[0], { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                        } else {
                            const ruinsInRoom = creep.room.find(FIND_RUINS, {
                                filter: (structure) => {
                                    return structure.store[RESOURCE_ENERGY] > 0;
                                }
                            });
                            if (ruinsInRoom.length > 0) {
                                const ruins = creep.pos.findClosestByPath(FIND_RUINS, {
                                    filter: (structure) => {
                                        return structure.store[RESOURCE_ENERGY] > 0;
                                    }
                                });
                                if (creep.withdraw(ruins, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(ruins, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                            } else {
                                if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] < Memory.storageEnergyCapacity / 3 && creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] > 5000) {
                                    if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.terminal, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                                } else {
                                    const containerInRoom = creep.room.find(FIND_STRUCTURES, {
                                        filter: (structure) => {
                                            return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 20;
                                        }
                                    });
                                    if (containerInRoom.length == 1) {
                                        if (creep.withdraw(containerInRoom[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(containerInRoom[0], { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                                    } else if (containerInRoom.length >= 2) {
                                        containerInRoom.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
                                        if (creep.withdraw(containerInRoom[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(containerInRoom[0], { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                                    } else {
                                        if (creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] > 100000) {
                                            if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.terminal, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                                        } else {
                                            if (creep.room.storage && (creep.room.storage.store[RESOURCE_ENERGY] > 20)) {
                                                if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}

function doWork(creep) {
    if (creep.store[RESOURCE_HYDROGEN] > 0) {
        if (creep.room.storage) {
            if (creep.transfer(creep.room.storage, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
            }
        }
    } else if (creep.store[RESOURCE_LEMERGIUM] > 0) {
        if (creep.room.storage) {
            if (creep.transfer(creep.room.storage, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
            }
        }
    } else {
        DoRefill(creep);
    }
}

const DroneRefiller = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (creep.room.name == creep.memory.room) {
                if (creep.ticksToLive <= Math.ceil(1500 - (600 / (creep.hitsMax / 50)) - 100 - 800) && creep.room.energyAvailable > creep.room.energyCapacityAvailable / 2) creep.memory.renew = true;
                else if (creep.ticksToLive > 1480 || creep.room.energyAvailable < creep.room.energyCapacityAvailable / 2) creep.memory.renew = false;

                if (creep.memory.renew) GoRenew(creep);
                else {
                    if (creep.store.getUsedCapacity() == 0) creep.memory.state = "getResource";
                    if (creep.store.getUsedCapacity() == creep.store.getCapacity() || creep.store[RESOURCE_HYDROGEN] > 0 || creep.store[RESOURCE_LEMERGIUM] > 0) creep.memory.state = "doWork";
                    if (creep.memory.state == "getResource") getResourceRefiller(creep);
                    if (creep.memory.state == "doWork") doWork(creep);
                }
            } else {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 20 });
            }
        }
    }
}
module.exports = DroneRefiller;