function getResource(creep) {
    if (creep.room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity + 50000) {
        if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
    } else if (creep.room.terminal.store[RESOURCE_ENERGY] < 10000 && creep.room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity + 10000) {
        if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
    } else {
        for (y in RESOURCES_ALL) {
            if (creep.room.storage.store[RESOURCES_ALL[y]] > 10000 && RESOURCES_ALL[y] !=  RESOURCE_ENERGY) {
                if (creep.withdraw(creep.room.storage, RESOURCES_ALL[y]) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
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
                if (creep.transfer(creep.room.terminal, RESOURCES_ALL[y]) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
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