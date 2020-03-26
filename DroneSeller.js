function getResourceSeller(creep) {
    for (i in RESOURCES_ALL) {
        if (!Memory.bannedResource.includes(RESOURCES_ALL[i])) {
            if (creep.room.storage.store[RESOURCES_ALL[i]] > 10000) {
                if (creep.withdraw(creep.room.storage, RESOURCES_ALL[i]) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
            }
        }
    }
}

function sell(creep) {
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

const DroneSeller = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (creep.room.name == creep.memory.room) {
                let room = creep.room
                if (Memory.room[room.name + ".amount.DroneSeller"] > 0) {
                    if (creep.store.getUsedCapacity() == 0) creep.memory.state = "getResource";
                    else if (creep.store.getUsedCapacity() == creep.store.getCapacity()) creep.memory.state = "doWork";

                    if (creep.memory.state == "getResource") getResourceSeller(creep);   
                    if (Memory.room[creep.room.name + ".amountIsLive.DroneRefiller"] == 0) {
                        if (creep.memory.state == "doWork") GoRefill(creep);
                    } else {
                        if (creep.memory.state == "doWork") sell(creep);
                    }
                } else {
                    const spawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_SPAWN } });
                    if (spawn) {
                        if (creep.pos.isNearTo(spawn)) spawn.recycleCreep(creep);
                        else creep.moveTo(spawn, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
                    }
                }
            } else {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
            }
        }
    }
}
module.exports = DroneSeller;