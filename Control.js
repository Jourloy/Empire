function amountCreeps() {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    Memory.rolies = ["DroneBuilder", "DroneMiner1", "DroneMiner2", "DroneMineralMiner", "DroneRefiller", "DroneSeller", "DroneUpgrader", "DroneWarrior", "DroneRenamer", "DroneClaimer", "DroneHelperBuilder", "DroneHelperUpgrader", "DroneHelperWarrior", "DroneHelperHealer", "DroneHelperArcher"];
    Memory.code = "VIKING"

    if (!Memory.storageEnergyCapacity) Memory.storageEnergyCapacity = 300000;
    else Memory.storageEnergyCapacity = Memory.storageEnergyCapacity;

    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        const sourceInRoom = room.find(FIND_MINERALS);
        const extractor = room.find(FIND_STRUCTURES, { filter: s => s.structureType == STRUCTURE_EXTRACTOR });

        if (room.controller && room.controller.my) {

            if (room.name == "W49S28") {
                if (Game.flags.Attack) {
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperWarrior"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperHealer"] = 1;
                    Memory.room[room.name + ".amount.DroneHelperArcher"] = 1;
                } else {
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperWarrior"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperHealer"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperArcher"] = 0;
                }
            } else {
                if (Game.flags.Attack) {
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperWarrior"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperHealer"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperArcher"] = 0;
                }
            }

            for (let i in Memory.rolies) {

                if ("DroneBuilder" == Memory.rolies[i]) {
                    const constructionSite = room.find(FIND_CONSTRUCTION_SITES);
                    if (constructionSite.length > 0) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;
                    else Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
                }

                if ("DroneMiner1" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;
                if ("DroneMiner2" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;
                if ("DroneUpgrader" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;

                if ("DroneRefiller" == Memory.rolies[i]) {
                    const containersInRoom = room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 1000;
                        }
                    });
                    if (containersInRoom.length > 1) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 2;
                    else Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;
                }

                if ("DroneSeller" == Memory.rolies[i]) {
                    if (room.storage && room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity + 10000) {
                        if (room.terminal.store[RESOURCE_ENERGY] < 100000 || room.storage.store[RESOURCE_HYDROGEN] > 20000 && room.terminal.store[RESOURCE_HYDROGEN] < 100000 || room.terminal.store[RESOURCE_ENERGY] < 5000) {
                            Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;
                        } else Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
                    } else Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
                }

                if ("DroneWarrior" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
                if (!sourceInRoom[0].ticksToRegeneration && extractor.length > 0) {
                    if ("DroneMineralMiner" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;
                } else {
                    if ("DroneMineralMiner" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
                }
                if (!room.controller.sign || (room.controller.sign && room.controller.sign.text != Memory.code)) {
                    if ("DroneRenamer" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;
                } else {
                    if ("DroneRenamer" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
                }
                if (Game.flags.Claim && (Game.flags.Claim.room != undefined && !Game.flags.Claim.room.controller.my || Game.flags.Claim.room == undefined)) {
                    if ("DroneClaimer" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;
                } else {
                    if ("DroneClaimer" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
                }
                if (Game.flags.Claim && Game.flags.Claim.room != undefined && Game.flags.Claim.room.controller.my) {
                    const spawn = Game.flags.Claim.room.find(FIND_MY_SPAWNS);
                    if (spawn.length == 0) {
                        if ("DroneHelperBuilder" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 2;
                        if ("DroneHelperUpgrader" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;
                        if ("DroneHelperWarrior" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;
                        if ("DroneHelperHealer" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;
                    } else {
                        if ("DroneHelperBuilder" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
                        if ("DroneHelperUpgrader" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
                        if ("DroneHelperWarrior" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
                        if ("DroneHelperHealer" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
                    }
                }
            }
        }
    }
}
function amountCreepsIsLive() {
    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (let i in Memory.rolies) {
                Memory.room[room.name + ".amountIsLive." + Memory.rolies[i]] = 0
            }
        }
    }
    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (let i in Game.creeps) {
                let creep = Game.creeps[i];
                if (room.name == creep.memory.room) Memory.room[room.name + ".amountIsLive." + creep.memory.role]++;
            }
        }
    }
}

function runCreep() {
    let droneTask = null;
    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (let i in Game.creeps) {
                let creep = Game.creeps[i];
                switch (creep.memory.role) {
                    case "DroneBuilder":
                        droneTask = require("DroneBuilder");
                        droneTask.control(creep);
                        break;
                    case "DroneMiner1":
                        droneTask = require("DroneMiner");
                        droneTask.control(creep);
                        break;
                    case "DroneMiner2":
                        droneTask = require("DroneMiner");
                        droneTask.control(creep);
                        break;
                    case "DroneRefiller":
                        droneTask = require("DroneRefiller");
                        droneTask.control(creep);
                        break;
                    case "DroneUpgrader":
                        droneTask = require("DroneUpgrader");
                        droneTask.control(creep);
                        break;
                    case "DroneWarrior":
                        droneTask = require("DroneWarrior");
                        droneTask.control(creep);
                        break;
                    case "DroneRenamer":
                        droneTask = require("DroneRenamer");
                        droneTask.control(creep);
                        break;
                    case "DroneMineralMiner":
                        droneTask = require("DroneMineralMiner");
                        droneTask.control(creep);
                        break;
                    case "DroneSeller":
                        droneTask = require("DroneSeller");
                        droneTask.control(creep);
                        break;
                    case "DroneClaimer":
                        droneTask = require("DroneClaimer");
                        droneTask.control(creep);
                        break;
                    case "DroneHelperBuilder":
                        droneTask = require("DroneHelperBuilder");
                        droneTask.control(creep);
                        break;
                    case "DroneHelperUpgrader":
                        droneTask = require("DroneHelperUpgrader");
                        droneTask.control(creep);
                        break;
                    case "DroneHelperWarrior":
                        droneTask = require("DroneHelperWarrior");
                        droneTask.control(creep);
                        break;
                    case "DroneHelperHealer":
                        droneTask = require("DroneHelperHealer");
                        droneTask.control(creep);
                        break;
                    case "DroneHelperArcher":
                        droneTask = require("DroneHelperArcher");
                        droneTask.control(creep);
                        break;
                }
            }
        }
    }
}
const Control = {
    control() {
        amountCreeps();
        amountCreepsIsLive();
        runCreep();
    }
}
module.exports = Control;