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

                if (room.storage && room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity + 50000)  Memory.room[room.name + ".amount.DroneSeller"] = 1;
                else if (room.storage && room.storage.store[RESOURCE_HYDROGEN] > 18000) Memory.room[room.name + ".amount.DroneSeller"] = 1;
                else if (room.terminal && room.terminal.store[RESOURCE_ENERGY] < 5000 && room.storage && room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity + 5000)  Memory.room[room.name + ".amount.DroneSeller"] = 1;

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
                    Memory.room[room.name + ".amount.DroneHelperTransporter"] = 1;
                    Memory.room[room.name + ".amount.DroneHelperDismantler"] = 1;
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

                if (room.terminal && room.storage && room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity)  Memory.room[room.name + ".amount.DroneSeller"] = 1;
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
            spawns = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN);
                }
            });
    
            for (i in spawns) {
                if (spawns[i].spawning != null && spawns[i].spawning.remainingTime > spawns[i].spawning.needTime - 10) Memory.room[room.name + ".amountIsLive." + spawns[i].memory.spawningCreep]++;
            }
        }
    }
}

function runCreep() {
    let droneTask = null;
    for (let i in Game.creeps) {
        let creep = Game.creeps[i];
        if (creep.memory.role == "DroneMiner1" || creep.memory.role == "DroneMiner2") droneTask = require("DroneMiner");
        else droneTask = require(creep.memory.role);
        if(droneTask) droneTask.control(creep);
        else console.log(`Invalid creep role ${creep.memory.role}`);
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