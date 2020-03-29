/*
 * @ Author: Jourloy
 * @ Repository: https://github.com/Jourloy/VIKING
 * @ How to use: Will be soon
 */

module.exports.loop = function () {
    require("RoomStats").info();
    require("BasicFunctions").run()
    require("Console").setting();
    require("Control").control()
    require("role.tower").control();

    let spawn;
    let room;
    let role;
    let spawns;

    for (z in Game.rooms) {
        room = Game.rooms[z];

        if (room.controller && room.controller.my) {
            if (room.terminal) require("Terminal").control(room);
        }
    }

    if (Memory.queue.length > 1) {
        if (Game.time % 21 == 20) {
            let result = [];
            let rooms = [];
            let room;
            let len;

            result.push("[INFO] Queue length: " + Memory.queue.length);
            for (i in Game.rooms) {
                rooms.push({ Room: Game.rooms[i].name, Len: 0 })
                for (z in Memory.queue) {
                    if (Game.rooms[i].name == Memory.queue[z].Room) {
                        for (y in rooms) {
                            if (rooms[y].Room == Memory.queue[z].Room) rooms[y].Len++;
                        }
                    }
                }
            }
            room = rooms[0].Room;
            len = rooms[0].Len;
            for (i in rooms) {
                if (room != rooms[i].Room) {
                    if (rooms[i].Len > len) {
                        len = rooms[i].Len;
                        room = rooms[i].Room;
                    }
                }
            }
            result.push("[INFO] Most busy room: " + room + " (" + len + ")");
            result = result.join("\n");
            console.log(result)
        }
    }

    if (Game.time % 2 == 1) {
        if (Memory.queue.length > 0) {
            for (i in Game.rooms) {
                for (z in Memory.queue) {
                    if (Game.rooms[i] && Game.rooms[i].controller && Game.rooms[i].controller.my && Game.rooms[i].name == Memory.queue[z].Room) {
                        room = Game.rooms[Memory.queue[z].Room];
                        role = Memory.queue[z].Role;

                        spawns = room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_SPAWN);
                            }
                        });

                        if (spawns[0] && spawns[0].room == room && spawns.length > 1) {
                            if (spawns[0] && spawns[0].spawning == null) {
                                spawn = spawns[0];

                                require("role.spawn").run(spawn, role);
                            } else if (spawns[1] && spawns[1].spawning == null) {
                                spawn = spawns[1];

                                require("role.spawn").run(spawn, role);
                            } else if (spawns[2] && spawns[2].spawning == null) {
                                spawn = spawns[2];

                                require("role.spawn").run(spawn, role);
                            }
                        } else if (spawns[0] && spawns[0].room == room && spawns[0] && spawns[0].spawning == null) {
                            spawn = spawns[0];
                            require("role.spawn").run(spawn, role);
                        }
                    }
                }
            }
        }
    }
};
