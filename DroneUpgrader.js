function getResource(creep) {
    gR = require("BasicFunctions")
    gR.run(creep, creep.memory.state);
}

function doWork(creep) {
    gR = require("BasicFunctions")
    gR.run(creep, "upgrade");
}

function goRenew(creep) {
    gR = require("BasicFunctions")
    gR.run(creep, "renew");
}

const DroneUpgrader = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (creep.room.name == creep.memory.room) {
                if (creep.ticksToLive <= Math.ceil(1500-(600/(creep.hitsMax/50))-100-800)) creep.memory.renew = true;
                else if (creep.ticksToLive > 1480) creep.memory.renew = false;

                if (creep.memory.renew) goRenew(creep);
                else {
                    if (creep.store.getUsedCapacity() == 0) creep.memory.state = "getResource";
                    else if (creep.store.getUsedCapacity() == creep.store.getCapacity()) creep.memory.state = "doWork";
    
                    if (creep.memory.state == "getResource") getResource(creep);
                    if (creep.memory.state == "doWork") doWork(creep);
                }
            } else {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
            }
        }
    }
}
module.exports = DroneUpgrader;