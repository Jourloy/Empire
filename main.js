/*
@ Author: Jourloy
@ Repository: https://github.com/Jourloy/VIKING
@ How to use: Will be soon
*/

const Console = require("Console");
const Control = require("Control");
const roleSpawn = require("role.spawn");
const roleTower = require("role.tower");
const Nydus = require("Nydus");
const Terminal = require("Terminal");

Memory.room = {};

module.exports.loop = function () {
    Control.control()
    Console.setting();
    Nydus.run();
    roleTower.control();

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
            spawn = spawns[Game.time%spawns.length];
        }

        if (room.terminal) Terminal.control(room);

        for (i in Memory.rolies) {
            if (spawn != undefined && Memory.room[room.name + ".amount." + Memory.rolies[i]] > Memory.room[room.name + ".amountIsLive." + Memory.rolies[i]]) {
                roleSpawn.run(spawn, Memory.rolies[i]);
            }
        }
    }
};
