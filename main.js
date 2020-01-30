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

    for (z in Game.rooms) {
        room = Game.rooms[z];

        if (room.controller && room.controller.my) {

            if (room.terminal) Terminal.control(room);

            for (i in Memory.rolies) {
                if ((!Memory.room[room.name + ".amountIsLive." + Memory.rolies[i]] && Memory.room[room.name + ".amount." + Memory.rolies[i]] > 0) || Memory.room[room.name + ".amountIsLive." + Memory.rolies[i]] < Memory.room[room.name + ".amount." + Memory.rolies[i]]) {
                    const spawns = room.find(FIND_MY_SPAWNS);
                    if (spawns[0] && spawns[0].spawning == null) {
                        const amountEnergy = spawns[0].room.energyCapacityAvailable;
                        roleSpawn.run(spawns[0], amountEnergy, Memory.rolies[i]);
                    } else if (spawns[1] && spawns[1].spawning == null) {
                        const amountEnergy = spawns[1].room.energyCapacityAvailable;
                        roleSpawn.run(spawns[1], amountEnergy, Memory.rolies[i]);
                    } else if (spawns[2] && spawns[2].spawning == null) {
                        const amountEnergy = spawns[2].room.energyCapacityAvailable;
                        roleSpawn.run(spawns[2], amountEnergy, Memory.rolies[i]);
                    }
                }
            }
        }
    }
};
