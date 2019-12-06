var Drone = {
	/** @param {Creep} creep **/
  	control(creep) {

        if (creep.spawning) {

            creep.memory.room = creep.room.name;

        } else {

            if (creep.store.getUsedCapacity() == 0) {
                creep.memory.work = "getResource";
            } else if (creep.store.getUsedCapacity() == creep.store.getCapacity()) {
                creep.memory.work = "doWork"
            }

            if (creep.memory.work == "getResource") {
                const droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                    filter: (droppedEnergy) => {
                        return droppedEnergy.amout >= creep.store.getFreeCapacity();
                    }
                });
                const ruin = creep.pos.findClosestByPath(FIND_RUINS, {
                    filter: (ruin) => {
                        return ruin.store[RESOURCE_ENERGY] >= creep.store.getFreeCapacity();
                    }
                });
                const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] >= creep.store.getFreeCapacity();
                    }
                });
            
                if (droppedEnergy) {
                    if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droppedEnergy, {reusePath: 50});
                    }
                } else if (ruin) {
                    if(creep.withdraw(ruin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(ruin, {reusePath: 50});
                    }
                } else if (container) {
                    if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, {reusePath: 50});
                    }
                } else if (creep.room.storage.store[RESOURCE_ENERGY] >= creep.store.getFreeCapacity()) {
                    if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, {reusePath: 50});
                    }
                } else if (creep.room.terminal.store[RESOURCE_ENERGY] > creep.store.getFreeCapacity()) {
                    if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.terminal, {reusePath: 50});
                    }
                } else {
                    const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, {reusePath: 50});
                    }
                }
            } else if (creep.memory.work == "doWork") {
                const spawnEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) && structure.store[RESOURCE_ENERGY] < structure.store.getCapacity();
                    }
                });
                const tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) && structure.store[RESOURCE_ENERGY] < structure.store.getCapacity();
                    }
                });
                const constructionSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
            
                if (spawnEnergy) {
                    if (creep.transfer(spawnEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(spawnEnergy, {reusePath: 50});
                    } else {
                        creep.transfer(spawnEnergy, RESOURCE_ENERGY)
                    }
                } else if (creep.room.controller.ticsToDowngrade < 10000) {
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {reusePath: 50});
                    }
                } else if (tower) {
                    if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tower, {reusePath: 50});
                    }
                } else if (creep.room.storage.store[RESOURCE_ENERGY] < 100000) {
                    if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, {reusePath: 50});
                    }
                } else if (constructionSite) {
                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite, {reusePath: 50});
                    }
                } else {
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {reusePath: 50});
                    }
                }
            }

        }

    }
};
module.exports = Drone;