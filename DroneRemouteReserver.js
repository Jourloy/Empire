const DroneRemouteReserver = {
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            let information = GetInformationAboutRoom(creep);
            if (information.HostileCreeps) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { heuristicWeight: 1.2, range: 1, reusePath: 50 });
            } else {
                let target = FindRemouteTarget(creep)
                if (creep.room != target.room) {
                    creep.moveTo(target);
                } else {
                    const controller = creep.room.controller;
                    if (creep.reserveController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller)
                    if (!creep.room.controller.sign || (creep.room.controller.sign && creep.room.controller.sign.text != "Reserved by VIKINGS")) {
                        if (creep.signController(creep.room.controller, "Reserved by VIKINGS") == ERR_NOT_IN_RANGE) {}
                    }
                }
            }
        }
    }
}
module.exports = DroneRemouteReserver;
