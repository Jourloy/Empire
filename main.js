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
    require("RoomStats").info();

    let spawn;

    for (z in Game.rooms) {
        room = Game.rooms[z];

        if (room.controller && room.controller.my) {
            if (room.terminal) require("Terminal").control(room);
        }
    }

    if (Memory.queue.length > 0) {
        let room;
        let role;
        let spawns;

        for (i in Game.rooms) {
            for (z in Memory.queue) {
                if (Game.rooms[i] && Game.rooms[i].controller && Game.rooms[i].controller.my && Game.rooms[i].name == Memory.queue[z].Room) {
                    room = Game.rooms[i];
                    role = Memory.queue[z].Role;

                    spawns = room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_SPAWN);
                        }
                    });

                    if (spawns.length > 1) {
                        if (spawns[0] && spawns[0].spawning == null) {
                            spawn = spawns[0];
                            role = Memory.queue[0].Role;
            
                            require("role.spawn").run(spawn, role);
                        } else if (spawns[1] && spawns[1].spawning == null) {
                            spawn = spawns[1];
                            role = Memory.queue[0].Role;
            
                            require("role.spawn").run(spawn, role);
                        } else if (spawns[2] && spawns[2].spawning == null) {
                            spawn = spawns[2];
                            role = Memory.queue[0].Role;
            
                            require("role.spawn").run(spawn, role);
                        } else {
                            if (Game.time % 11 == 10) console.log("[ERROR] In " + spawns[0].room.name + " all spawns are busy! In order " + Memory.queue.length + " creep(s)")
                        }
                    } else if (spawns[0].spawning == null) {
                        spawn = spawns[0];
                        role = Memory.queue[0].Role;
            
                        require("role.spawn").run(spawn, role);
                    } else {
                        if (Game.time % 11 == 10) console.log("[ERROR] In " + room.name + " all spawns are busy! In order " + Memory.queue.length + " creep(s)")
                    }
                }
            }
        }
    }
};
