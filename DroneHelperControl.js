let DroneHelperDismantler = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (Game.flags.Attack) {
                if (Game.flags.Attack.room != creep.room) {
                    creep.moveTo(Game.flags.Attack);
                } else {
                    dismantleStructure(creep);
                }
            }

        }
    }
};
module.exports = DroneHelperDismantler;
