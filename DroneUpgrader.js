const DroneUpgrader = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (creep.room.name == creep.memory.room) {
                if (Memory.room[creep.memory.room + ".amount.DroneUpgrader"] >= Memory.room[creep.memory.room + ".amountIsLive.DroneUpgrader"]) {
                    if (creep.ticksToLive <= Math.ceil(1500-(600/(creep.hitsMax/50))-100-800)) creep.memory.renew = true;
                    else if (creep.ticksToLive > 1480) creep.memory.renew = false;

                    if (creep.memory.renew) GoRenew(creep);
                    else {
                        if (creep.store.getUsedCapacity() == 0) creep.memory.state = "getResource";
                        else if (creep.store.getUsedCapacity() == creep.store.getCapacity()) creep.memory.state = "doWork";

                        if (creep.memory.state == "getResource") GetResource(creep)
                        if (creep.memory.state == "doWork") DoUpgrade(creep);
                    }
                } else {
                    const spawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_SPAWN } });
                    if (spawn) {
                        //if (creep.pos.isNearTo(spawn)) spawn.recycleCreep(creep);
                        //else creep.moveTo(spawn, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
                    }
                }
            } else {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
            }
        }
    }
}
module.exports = DroneUpgrader;
