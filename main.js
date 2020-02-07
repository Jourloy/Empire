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

    let room = 0;
    let spawns;
    let spawn;
    let rooms = []

    for (z in Game.rooms) {
        room = Game.rooms[z];

        if (room.controller && room.controller.my) {
            rooms.push(room);
        }
    }
    for (z in rooms) {
        room = rooms[z]
        spawns = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN);
            }
        });

        for (i in spawns) {
            if (spawns[i].spawning == null) spawns[i].memory.spawningCreep = null;
        }
        
        spawn = spawns[Game.time%spawns.length];
        if (room.terminal) require("Terminal").control(room);

        for (i in Memory.rolies) {
            if (spawn != undefined && Memory.room[room.name + ".amount." + Memory.rolies[i]] > Memory.room[room.name + ".amountIsLive." + Memory.rolies[i]]) {
                require("role.spawn").run(spawn, Memory.rolies[i]);
            }
        }
    }

    if (Game.time%51 == 20) {
        for (z in rooms) {
            console.log("-------------");
            room = rooms[z]
            for (i in Memory.rolies) {
                console.log("ROOM: " + room.name + " | ROLE: " + Memory.rolies[i] + " | AMOUNT: " + Memory.room[room.name + ".amountIsLive." + Memory.rolies[i]] + " / " + Memory.room[room.name + ".amount." + Memory.rolies[i]])
            }
        }
    }
};
