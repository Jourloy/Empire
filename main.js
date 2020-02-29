/*
@ Author: Jourloy
@ Repository: https://github.com/Jourloy/VIKING
@ How to use: Will be soon
*/

Memory.room = {};

module.exports.loop = function () {
    require("Control").control()
    require("Console").setting();
    //require("Nydus").run();
    require("role.tower").control();

    let spawns;
    let spawn;

    for (z in Game.rooms) {
        room = Game.rooms[z];

        if (room.controller && room.controller.my) {
            if (room.terminal) require("Terminal").control(room);
        }
    }

    if (Memory.order.length > 0) {
        let room = Memory.order[0].Room;
        spawns = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN);
            }
        });
        if (spawns.length > 0) {
            console.log(spawns[0].spawning)
            if (spawns[0].spawning == null) {
                spawn = spawns[0];
                role = Memory.order[0].Role;

                require("role.spawn").run(spawn, role);
            } else if (spawns[1].spawning == null) {
                spawn = spawns[1];
                role = Memory.order[0].Role;

                require("role.spawn").run(spawn, role);
            } else {
                spawn = spawns[2];
                role = Memory.order[0].Role;

                require("role.spawn").run(spawn, role);
            }
        } else {
            spawn = spawns[0];
            role = Memory.order[0].Role;

            require("role.spawn").run(spawn, role);
        }
    }
};
