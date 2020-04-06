const SIGN  = '╔══════════════════╗”\n“║.....Attacked by VIKINGS......║”\n“╚══════════════════╝'

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
                    if (creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller)
                    if (creep.signController(creep.room.controller, SIGN) == ERR_NOT_IN_RANGE) {}
                }
            }

        }
    }
};
module.exports = DroneHelperDismantler;
