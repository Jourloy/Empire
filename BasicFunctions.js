function getResource(creep) {
    if (creep.room.storage) {
        if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
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
            const source = creep.room.find(FIND_SOURCES);
            if (creep.room.storage && (creep.room.storage.store[RESOURCE_ENERGY] > 100000 && source.length == 2) || creep.room.storage && (creep.room.storage.store[RESOURCE_ENERGY] > 20000 && source.length == 1)) {
                if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
            } else {
                const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                    filter: (d) => {
                        return (d.resourceType == "energy");
                    }
                });
                if (droppedEnergy.length > 0) {
                    const droppedEnergyNear = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                        filter: (d) => {
                            return (d.resourceType == "energy");
                        }
                    });
                    if (creep.pickup(droppedEnergyNear) == ERR_NOT_IN_RANGE) creep.moveTo(droppedEnergyNear);
                } else {
                    const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source);
                }
            }
        }
    }
}

function doRepair(creep) {
    const structures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_TOWER ||
                structure.structureType == STRUCTURE_ROAD ||
                structure.structureType == STRUCTURE_STORAGE ||
                structure.structureType == STRUCTURE_RAMPART ||
                structure.structureType == STRUCTURE_SPAWN) && structure.hits < structure.hitsMax;
        }
    });
    if (structures.length > 0) {
        structures.sort((a,b) => a.hits - b.hits);
        if (creep.repair(structures[0]) == ERR_NOT_IN_RANGE) creep.moveTo(structures[0])
    } else {
        doUpgrade();
    }
}

function doRefill(creep) {
    const spawnEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
        }
    });
    if (spawnEnergy) {
        if (creep.transfer(spawnEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawnEnergy, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
        }
    } else if (creep.memory.role == "DroneRefiller") {
        const towerWithoutEnergy = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER) && structure.store[RESOURCE_ENERGY] <= 750;
            }
        });
        if (towerWithoutEnergy.length > 0 && creep.room.controller.level > 2) {
            towerWithoutEnergy.sort((a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY]);
            if (creep.transfer(towerWithoutEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(towerWithoutEnergy[0], { heuristicWeight: 1.2, range: 1, reusePath: 20 });
            }
        } else {
            const labs= creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LAB) && structure.store[RESOURCE_ENERGY] < 2000;
                }
            });
            if (labs.length > 0) {
                const labsInRoom = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LAB) && structure.store[RESOURCE_ENERGY] < 2000;
                    }
                });

                if (creep.transfer(labsInRoom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(labsInRoom, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                }
            } else {
                if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] < 500001) {
                    if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                    }
                } else if (creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] < 100000) {
                    if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.terminal, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                    }
                }
            }
        }
    }
}

function doUpgrade(creep) {
    const spawnEnergy = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
        }
    });
    if (spawnEnergy.length > 0 && !Memory.room[creep.room.name + ".amountIsLive." + "DroneRefiller"]) doRefill(creep)
    else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller, { heuristicWeight: 1.2, range: 3, reusePath: 20 });
}

const BasicFunctions = {
    run(creep, aim) {
        if (aim == "getResource") getResource(creep);
        if (aim == "upgrade") doUpgrade(creep);
        if (aim == "refill") doRefill(creep);
        if (aim == "repair") doRepair(creep);
    }
}
module.exports = BasicFunctions;