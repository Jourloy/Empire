function goGetResource(creep) {
    if (Game.flags.Clear.room == undefined || Game.flags.Clear.room != undefined && Game.flags.Clear.room == creep.room) {
        if (creep.memory.step == 0) {
            if (creep.room.name == "W49S29") creep.memory.step = 1;
            creep.moveTo(new RoomPosition(25, 25, "W49S29"), {ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
        }
        else creep.moveTo(Game.flags.Clear, {heuristicWeight: 1.2, range: 1, reusePath: 50 })
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
            if (creep.withdraw(ruins, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(ruins, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
        } else {
            const tombstones = creep.room.find(FIND_TOMBSTONES, {
                filter: (structure) => {
                    return structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            if (tombstones.length > 0) {
                tombstones.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
                if (creep.withdraw(tombstones[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(tombstones[0], { heuristicWeight: 1.2, range: 1, reusePath: 50 });
            }
        }
    }
}

function doWork(creep) {
    if (creep.room.name == creep.memory.room) {
        gR = require("BasicFunctions")
        gR.run(creep, "refill");
    } else {
        if (creep.memory.step == 1) {
            if (creep.room.name == "W49S29") creep.memory.step = 0;
            creep.moveTo(new RoomPosition(25, 25, "W49S29"), {ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
        }
        else creep.moveTo(new RoomPosition(25, 25, creep.memory.room), {ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
    }
}

function goRenew(creep) {
    gR = require("BasicFunctions")
    gR.run(creep, "renew");
}

const DroneHelperTransporter = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
            creep.memory.step = 0;
        } else {
            if (creep.memory.step == undefined) creep.memory.step = 0;
            creep.say(creep.memory.step)
            if (creep.store.getUsedCapacity() == 0) creep.memory.state = "getResource";
            if (creep.store.getUsedCapacity() == creep.store.getCapacity() || creep.store[RESOURCE_HYDROGEN] > 0) creep.memory.state = "doWork";

            if (creep.memory.state == 'getResource') {
                if (Game.flags.Clear) {
                    goGetResource(creep);
                }
            } else if (creep.memory.state == 'doWork') {
                if (creep.room.name == creep.memory.room) {
                    if (creep.ticksToLive <= Math.ceil(1500 - (600 / (creep.hitsMax / 50)) - 100 - 800) && creep.room.energyAvailable > creep.room.energyCapacityAvailable / 2) creep.memory.renew = true;
                    else if (creep.ticksToLive > 1480 || creep.room.energyAvailable < creep.room.energyCapacityAvailable / 2) creep.memory.renew = false;
    
                    if (creep.memory.renew) goRenew(creep);
                    else {
                        doWork(creep);
                    }
                } else {
                    doWork(creep);
                }
            }
        }
    }
}
module.exports = DroneHelperTransporter;