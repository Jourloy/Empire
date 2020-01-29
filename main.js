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

    let spawns = [];
    for (let i in Game.rooms) {
        let room = Game.rooms[i];
        if (room.terminal) Terminal.control(room);
        let roomSpawns = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_SPAWN } });
        spawns = spawns.concat(roomSpawns);
    }
    for (let i in spawns) {
        let spawn = spawns[i];
        let amountEnergy = spawn.room.energyCapacityAvailable;

        for (let i in Memory.rolies) {
            if (spawn.spawning == null) {
                if ((!Memory.room[spawn.room.name + ".amountIsLive." + Memory.rolies[i]] && Memory.room[spawn.room.name + ".amount." + Memory.rolies[i]] > 0) || Memory.room[spawn.room.name + ".amountIsLive." + Memory.rolies[i]] < Memory.room[spawn.room.name + ".amount." + Memory.rolies[i]]) {
                    roleSpawn.run(spawn, amountEnergy, Memory.rolies[i]);
                }
            }
        }
    }
};
