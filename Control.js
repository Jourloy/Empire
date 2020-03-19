function clearMemory() {
    Memory.room = {};
    Memory.friends = ["JOURLOY", "EgorKluch", "kotyara"]
    Memory.roles = ["DroneBuilder", "DroneMiner1", "DroneMiner2", "DroneMineralMiner", "DroneRefiller", "DroneSeller", "DroneUpgrader", "DroneWarrior", "DroneRenamer", "DroneClaimer", "DroneHelperBuilder", "DroneHelperUpgrader", "DroneHelperWarrior", "DroneHelperHealer", "DroneHelperArcher", "DroneHelperTransporter", "DroneHelperDismantler"];
    Memory.code = "VIKING";
    Memory.storageEnergyCapacity = 300000;
}

function amountCreeps() {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (i in Memory.roles) {
                Memory.room[room.name + ".amount." + Memory.roles[i]] = 0;
            }
        }
    }

    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        const sourceInRoom = room.find(FIND_MINERALS);
        const extractor = room.find(FIND_STRUCTURES, { filter: s => s.structureType == STRUCTURE_EXTRACTOR });
        const constructionSite = room.find(FIND_CONSTRUCTION_SITES);

        if (room.controller && room.controller.my) {

            for (i in Memory.roles) {
                if (Memory.roles[i] == "DroneSeller") {
                    if (room.storage && room.terminal) {
                        if (room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity + 50000) Memory.room[room.name + ".amount.DroneSeller"] = 1;
                        if (room.terminal.store[RESOURCE_ENERGY] < 10000 && room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity + 10000) Memory.room[room.name + ".amount.DroneSeller"] = 1;
                        for (y in RESOURCES_ALL) {
                            if (room.storage.store[RESOURCES_ALL[y]] > 12000) Memory.room[room.name + ".amount.DroneSeller"] = 1;
                        }
                    }
                }

                if (!sourceInRoom[0].ticksToRegeneration && extractor.length > 0) Memory.room[room.name + ".amount.DroneMineralMiner"] = 1;
                if (constructionSite.length > 0) Memory.room[room.name + ".amount.DroneBuilder"] = 1;
                Memory.room[room.name + ".amount.DroneRefiller"] = 1;
                Memory.room[room.name + ".amount.DroneMiner1"] = 1;
                Memory.room[room.name + ".amount.DroneMiner2"] = 1;
                Memory.room[room.name + ".amount.DroneUpgrader"] = 1;
            }

            if (room.name == "W49S28") {
                if (Game.flags.Attack) {
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperWarrior"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperHealer"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperArcher"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperTransporter"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperDismantler"] = 0;
                }
                if (Game.flags.Clear) {
                    Memory.room[room.name + ".amount.DroneHelperTransporter"] = 0;
                }
                if (Game.flags.Claim) {
                    Memory.room[room.name + ".amount.DroneClaimer"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                }
            } else if (room.name == "W49S29") {
                if (Game.flags.Attack) {
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperWarrior"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperHealer"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperArcher"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperTransporter"] = 0;
                }
                if (Game.flags.Clear) {
                    Memory.room[room.name + ".amount.DroneHelperTransporter"] = 0;
                }
                if (Game.flags.Claim) {
                    Memory.room[room.name + ".amount.DroneClaimer"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                }
            } else if (room.name == "W48S27") {
                if (Game.flags.Attack) {
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperWarrior"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperHealer"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperArcher"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperTransporter"] = 0;
                }
                if (Game.flags.Clear) {
                    Memory.room[room.name + ".amount.DroneHelperTransporter"] = 0;
                }
                if (Game.flags.Claim) {
                    Memory.room[room.name + ".amount.DroneClaimer"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                }
            } else if (room.name == "W49S21") {
                if (Game.flags.Attack) {
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperWarrior"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperHealer"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperArcher"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperTransporter"] = 0;
                }
                if (Game.flags.Clear) {
                    Memory.room[room.name + ".amount.DroneHelperTransporter"] = 5;
                }
                if (Game.flags.Claim) {
                    Memory.room[room.name + ".amount.DroneClaimer"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                    Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                }
            }
        }
    }
}
function amountCreepsIsLive() {
    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (let i in Memory.roles) {
                Memory.room[room.name + ".amountIsLive." + Memory.roles[i]] = 0
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
                if (spawns[i].spawning != null && spawns[i].spawning.remainingTime > spawns[i].spawning.needTime - 10) {
                    Memory.room[room.name + ".amountIsLive." + spawns[i].memory.spawningCreep]++;
                }
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
        //let cpu1 = Game.cpu.getUsed();
        //console.log(`Role: ${creep.memory.role}\nUsed by creep: ${Game.cpu.getUsed() - cpu1}`)
        if(droneTask) {
            droneTask.control(creep);
        } else console.log(`Invalid creep role ${creep.memory.role}`);
    }
}

function Calculate_creeps() {
    if (Game.time%2 == 1) {
        Memory.queue = [];
        for (i in Memory.roles) {
            for (z in Game.rooms) {
                if (Game.rooms[z].controller && Game.rooms[z].controller.my) {
                    let roomName = Game.rooms[z].name;
                    let role = Memory.roles[i];
                    let room = Game.rooms[z];
                    if ((!Memory.room[room.name + ".amountIsLive." + Memory.roles[i]] && Memory.room[room.name + ".amount." + Memory.roles[i]] > 0) || (Memory.room[room.name + ".amountIsLive." + Memory.roles[i]] < Memory.room[room.name + ".amount." + Memory.roles[i]])) {
                        Memory.queue.push({Role: role, Room: roomName});
                    }
                }
            }
        }
    }
}

const Control = {
    control() {
        clearMemory();
        amountCreeps();
        amountCreepsIsLive();
        Calculate_creeps();
        runCreep();
    }
}
module.exports = Control;