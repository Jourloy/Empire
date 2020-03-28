const DroneUpgrader = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (Game.flags.Claim && Game.flags.Claim.room && creep.room.name == Game.flags.Claim.room.name) {
                if (creep.store.getUsedCapacity() == 0) creep.memory.state = "getResource";
                else if (creep.store.getUsedCapacity() == creep.store.getCapacity()) creep.memory.state = "doWork";

                if (creep.memory.state == "getResource") GetResource(creep);
                if (creep.memory.state == "doWork") DoUpgrade(creep);
            } else {
                creep.moveTo(Game.flags.Claim, { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
            }
        }
    }
}
module.exports = DroneUpgrader;