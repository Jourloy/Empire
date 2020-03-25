function getResourceSeller(creep) {
    if (Memory.room[creep.room.name + ".amountIsLive.DroneRefiller"] == 0) {
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
    } else {
        if (creep.room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity + 50000) {
            if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
        } else if (creep.room.terminal.store[RESOURCE_ENERGY] < 10000 && creep.room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity + 10000) {
            if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
        } else {
            for (y in RESOURCES_ALL) {
                if (creep.room.storage.store[RESOURCES_ALL[y]] > 10000 && RESOURCES_ALL[y] !=  RESOURCE_ENERGY) {
                    if (creep.withdraw(creep.room.storage, RESOURCES_ALL[y]) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
                } else {
                    if (RESOURCES_ALL[y] != RESOURCE_ENERGY) {
                        const container = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCES_ALL[y]] > 0});
    
                        if (container) {
                            if (creep.withdraw(container, RESOURCES_ALL[y]) == ERR_NOT_IN_RANGE) creep.moveTo(container, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
                        }
                    }
                }
            }
        }
    }
}


function sell(creep) {
    if (creep.store[RESOURCE_ENERGY] > 0) {
        if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.terminal, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
    } else {
        for (y in RESOURCES_ALL) {
            if (creep.store[RESOURCES_ALL[y]] > 0) {
                if (creep.transfer(creep.room.terminal, RESOURCES_ALL[y]) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.terminal, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
            }
        }
    }
}

const DroneSeller = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (creep.room.name == creep.memory.room) {
                if (creep.store.getUsedCapacity() == 0) creep.memory.state = "getResource";
                else if (creep.store.getUsedCapacity() == creep.store.getCapacity()) creep.memory.state = "doWork";

                if (creep.memory.state == "getResource") getResourceSeller(creep);   
                if (Memory.room[creep.room.name + ".amountIsLive.DroneRefiller"] == 0) {
                    if (creep.memory.state == "doWork") GoRefill(creep);
                } else {
                    if (creep.memory.state == "doWork") sell(creep);
                }
            } else {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
            }
        }
    }
}
module.exports = DroneSeller;