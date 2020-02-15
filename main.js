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
        
        if (Game.time%5 < 2) spawn = spawns[0];
        else spawn = spawns[1] || spawns[0];
        if (room.terminal) require("Terminal").control(room);

        for (i in Memory.roles) {
            if (spawn != undefined && Memory.room[room.name + ".amount." + Memory.roles[i]] > Memory.room[room.name + ".amountIsLive." + Memory.roles[i]]) {
                require("role.spawn").run(spawn, Memory.roles[i]);
            }
        }
    }

    if (Game.time%51 == 20) {
        console.log("==============");
        for (z in rooms) {
            console.log("-------------");
            room = rooms[z]
            for (i in Memory.roles) {
                console.log("ROOM: " + room.name + " | ROLE: " + Memory.roles[i] + " | AMOUNT: " + Memory.room[room.name + ".amountIsLive." + Memory.roles[i]] + " / " + Memory.room[room.name + ".amount." + Memory.roles[i]])
            }
        }
    }
};
