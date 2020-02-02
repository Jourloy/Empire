function amountCreeps() {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    Memory.rolies = ["DroneBuilder", "DroneMiner1", "DroneMiner2", "DroneMineralMiner", "DroneRefiller", "DroneSeller", "DroneUpgrader", "DroneWarrior", "DroneRenamer", "DroneClaimer", "DroneHelperBuilder", "DroneHelperUpgrader", "DroneHelperWarrior", "DroneHelperHealer", "DroneHelperArcher", "DroneHelperTransporter", "DroneHelperDismantler"];
    Memory.code = "VIKING";

    if (!Memory.storageEnergyCapacity) Memory.storageEnergyCapacity = 200000;
    else Memory.storageEnergyCapacity = Memory.storageEnergyCapacity;

    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (i in Memory.rolies) {
                Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
            }
        }
    }

    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        const sourceInRoom = room.find(FIND_MINERALS);
        const extractor = room.find(FIND_STRUCTURES, { filter: s => s.structureType == STRUCTURE_EXTRACTOR });
        const constructionSite = room.find(FIND_CONSTRUCTION_SITES);
        const containersInRoom = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 1500;
            }
        });

        if (room.controller && room.controller.my) {

            if (room.name == "W49S28") {

                if (room.storage && room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity)  Memory.room[room.name + ".amount.DroneSeller"] = 0;
                else if (room.terminal && room.terminal.store[RESOURCE_ENERGY] < 5000)  Memory.room[room.name + ".amount.DroneSeller"] = 0;

                if (!sourceInRoom[0].ticksToRegeneration && extractor.length > 0) Memory.room[room.name + ".amount.DroneMineralMiner"] = 1;
                if (constructionSite.length > 0) Memory.room[room.name + ".amount.DroneBuilder"] = 1;
                Memory.room[room.name + ".amount.DroneRefiller"] = 1;
                Memory.room[room.name + ".amount.DroneMiner1"] = 1;
                Memory.room[room.name + ".amount.DroneMiner2"] = 1;

                if (Game.flags.Attack) {
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperWarrior"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperHealer"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperArcher"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperTransporter"] = 2;
                    Memory.room[room.name + ".amount.DroneHelperDismantler"] = 3;
                }
                if (Game.flags.Clear) {
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperWarrior"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperHealer"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperArcher"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperTransporter"] = 5;
                }
            } else if (room.name == "W49S29") {

                if (room.storage && room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity)  Memory.room[room.name + ".amount.DroneSeller"] = 1;
                else if (room.terminal && room.terminal.store[RESOURCE_ENERGY] < 5000)  Memory.room[room.name + ".amount.DroneSeller"] = 1;

                if (!sourceInRoom[0].ticksToRegeneration && extractor.length > 0) Memory.room[room.name + ".amount.DroneMineralMiner"] = 1;
                if (constructionSite.length > 0) Memory.room[room.name + ".amount.DroneBuilder"] = 1;
                Memory.room[room.name + ".amount.DroneRefiller"] = 1;
                Memory.room[room.name + ".amount.DroneMiner1"] = 1;
                Memory.room[room.name + ".amount.DroneMiner2"] = 1;
                Memory.room[room.name + ".amount.DroneUpgrader"] = 1;

                if (Game.flags.Attack) {
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperWarrior"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperHealer"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperArcher"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperTransporter"] = 0;
                }
                if (Game.flags.Clear) {
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperWarrior"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperHealer"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperArcher"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperTransporter"] = 3;
                }
            }

            for (let i in Memory.rolies) {

                if ("DroneSeller" == Memory.rolies[i]) {
                    
                }

                if ("DroneWarrior" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
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
                    case "DroneHelperTransporter":
                        droneTask = require("DroneHelperTransporter");
                        droneTask.control(creep);
                        break;
                    case "DroneHelperDismantler":
                        droneTask = require("DroneHelperDismantler");
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