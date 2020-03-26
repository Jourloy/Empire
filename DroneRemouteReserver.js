const DroneRemouteReserver = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            let target = FindRemouteTarget(creep)

            if (creep.room != target.room) {
                creep.moveTo(target);
            } else {
                const controller = creep.room.controller;
                if (creep.reserveController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller)
                if (!creep.room.controller.sign || (creep.room.controller.sign && creep.room.controller.sign.text != Memory.code)) {
                    if (creep.signController(creep.room.controller, Memory.code) == ERR_NOT_IN_RANGE) {}
                }

                if (FindHostileCreeps(creep.room.name).length > 0) {
                    let room = creep.memory.room;
                    Memory.room[room.name + ".amount.DroneRemouteWarrior"] = FindHostileCreeps(creep.room.name).length + 1;
                }
            }
        }
    }
}
module.exports = DroneRemouteReserver;