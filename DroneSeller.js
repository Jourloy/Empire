function getResource(creep) {
    const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
        filter: (resource) => {
            return resource.amount > 0 && resource.resourceType == 'energy';
        }
    });
    if (droppedEnergy.length > 0) {
        if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) creep.moveTo(droppedEnergy[0], { heuristicWeight: 1.2, range: 1, reusePath: 50 });
    } else {
        if (creep.room.terminal.store[RESOURCE_ENERGY] < 5000) {
            if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
        } else if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 100000+creep.store.getCapacity()) {
            if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
        } else if (creep.room.storage && creep.room.storage.store[RESOURCE_HYDROGEN] > 10000+creep.store.getCapacity()) {
            if (creep.withdraw(creep.room.storage, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
        }
    }
}


function sell(creep) {
    if (creep.room.terminal) {
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.terminal, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
            }
        } else if (creep.store.getUsedCapacity(RESOURCE_HYDROGEN) > 0) {
            if (creep.transfer(creep.room.terminal, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.terminal, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
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

                if (creep.memory.state == "getResource") getResource(creep);
                if (creep.memory.state == "doWork") sell(creep);
            } else {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
            }
        }
    }
}
module.exports = DroneSeller;