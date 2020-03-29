function getResourceSeller(creep) {
    if (creep.room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity) {
        if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
    } else {
        for (i in RESOURCES_ALL) {
            if (!Memory.bannedResource.includes(RESOURCES_ALL[i])) {
                if (creep.room.storage.store[RESOURCES_ALL[i]] > 10000) {
                    if (creep.withdraw(creep.room.storage, RESOURCES_ALL[i]) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
                }
            }
        }
    }
}

function sell(creep) {
    if (creep.room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity) {
        if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.terminal, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
    } else {
        for (i in RESOURCES_ALL) {
            if (!Memory.bannedResource.includes(RESOURCES_ALL[i])) {
                if (creep.room.terminal) {
                    if (creep.transfer(creep.room.terminal, RESOURCES_ALL[i]) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.terminal, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
                }
            } else {
                if (creep.room.storage) {
                    if (creep.transfer(creep.room.storage, RESOURCES_ALL[i]) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.terminal, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
                }
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
                let room = creep.room
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
