function clearMemory() {
    Memory.room = {};
    Memory.friends = ["JOURLOY", "kotyara", "Kartinka", "SystemParadox"]
    Memory.roles = ["DroneRefiller", "DroneBuilder", "DroneMiner1", "DroneMiner2", "DroneMineralMiner", "DroneSeller", "DroneUpgrader", "DroneWarrior", "DroneRenamer", "DroneClaimer", "DroneHelperBuilder", "DroneHelperUpgrader", "DroneHelperWarrior", "DroneHelperHealer", "DroneHelperArcher", "DroneHelperTransporter", "DroneHelperDismantler", "DroneRemouteMiner", "DroneRemouteRepairer", "DroneRemouteTransporter", "DroneRemouteReserver", "DroneRemouteWarrior", "DroneRemouteHealer"];
    Memory.code = '╔══════════════════╗”\n“║................VIKINGS...............║”\n“╚══════════════════╝';
    Memory.storageEnergyCapacity = 250000;

    Memory.bannedResource = [RESOURCE_ENERGY]
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
        const hostileCreep = room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return (creep.owner.username != "kotyara");
            }
        });

        if (room.controller && room.controller.my) {

            if (room.controller.sign != Memory.code) Memory.room[room.name + ".amount.DroneRenamer"] = 1;

            Memory.room[room.name + ".amount.DroneSeller"] = 0;
            if (room.storage && room.terminal) {
                if (room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity && room.terminal.store.getUsedCapacity() < room.terminal.store.getCapacity()) {
                    Memory.room[room.name + ".amount.DroneSeller"] = 1
                }
                if (room.terminal.store.getUsedCapacity() <= room.terminal.store.getCapacity()/2) {
                    for (i in RESOURCES_ALL) {
                        if (!Memory.bannedResource.includes(RESOURCES_ALL[i])) {
                            if (room.storage && room.storage.store[RESOURCES_ALL[i]] > 12000) Memory.room[room.name + ".amount.DroneSeller"] = 1;
                            else if (room.storage.store[RESOURCE_ENERGY] >= Memory.storageEnergyCapacity && room.terminal.store[RESOURCE_ENERGY] < 5000) Memory.room[room.name + ".amount.DroneSeller"] = 1;
                        }
                    }
                }
            }
            //console.log(Memory.room[room.name + ".amount.DroneSeller"])
            if (!sourceInRoom[0].ticksToRegeneration && extractor.length > 0) Memory.room[room.name + ".amount.DroneMineralMiner"] = 1;
            if (constructionSite.length > 0) Memory.room[room.name + ".amount.DroneBuilder"] = 1;
            Memory.room[room.name + ".amount.DroneRefiller"] = 1;
            Memory.room[room.name + ".amount.DroneMiner1"] = 1;
            Memory.room[room.name + ".amount.DroneMiner2"] = 1;
            Memory.room[room.name + ".amount.DroneUpgrader"] = 1;

            if (hostileCreep.length > 1) {
                Memory.room[room.name + ".amount.DroneWarrior"] = 1;
            }
        }

        if (room.name == "W49S28") {
            if (Game.flags.Remoute1) {
                Memory.room[room.name + ".amount.DroneRemouteMiner"] = 1;
                Memory.room[room.name + ".amount.DroneRemouteTransporter"] = 2;
                Memory.room[room.name + ".amount.DroneRemouteReserver"] = 1;
                Memory.room[room.name + ".amount.DroneRemouteRepairer"] = 1;
                Memory.room[room.name + ".amount.DroneRemouteWarrior"] = 0;
                if (Game.flags.Remoute1.room && FindHostileCreeps(Game.flags.Remoute1.room.name).length > 0) {
                    Memory.room[room.name + ".amount.DroneRemouteWarrior"] = 1;
                    Memory.room[room.name + ".amount.DroneRemouteHealer"] = 0;
                }
            }
            if (Game.flags.Attack) {
                Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                Memory.room[room.name + ".amount.DroneHelperWarrior"] = 1;
                Memory.room[room.name + ".amount.DroneHelperHealer"] = 0;
                Memory.room[room.name + ".amount.DroneHelperArcher"] = 0;
                Memory.room[room.name + ".amount.DroneHelperTransporter"] = 0;
                Memory.room[room.name + ".amount.DroneHelperDismantler"] = 0;
                Memory.room[room.name + ".amount.DroneHelperControl"] = 0;
            }
            if (Game.flags.Clear) {
                Memory.room[room.name + ".amount.DroneHelperTransporter"] = 2;
            }
            if (Game.flags.Claim) {
                Memory.room[room.name + ".amount.DroneClaimer"] = 0;
                Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
            }
        } else if (room.name == "W49S29") {
            Memory.room[room.name + ".amount.DroneBuilder"] = 1;
            if (Game.flags.Remoute2) {
                Memory.room[room.name + ".amount.DroneRemouteMiner"] = 1;
                Memory.room[room.name + ".amount.DroneRemouteTransporter"] = 2;
                Memory.room[room.name + ".amount.DroneRemouteReserver"] = 1;
                Memory.room[room.name + ".amount.DroneRemouteRepairer"] = 0;
                Memory.room[room.name + ".amount.DroneRemouteWarrior"] = 0;
                if (Game.flags.Remoute2.room && FindHostileCreeps(Game.flags.Remoute2.room.name).length > 0) {
                    Memory.room[room.name + ".amount.DroneRemouteWarrior"] = 1;
                    Memory.room[room.name + ".amount.DroneRemouteHealer"] = 0;
                }
            }
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
        } else if (room.name == "W48S27") {
            Memory.room[room.name + ".amount.DroneUpgrader"] = 1;
            Memory.room[room.name + ".amount.DroneBuilder"] = 1;
            Memory.room[room.name + ".amount.DroneRefiller"] = 2;
            if (Game.flags.Remoute3) {
                Memory.room[room.name + ".amount.DroneRemouteMiner"] = 1;
                Memory.room[room.name + ".amount.DroneRemouteTransporter"] = 3;
                Memory.room[room.name + ".amount.DroneRemouteReserver"] = 1;
                Memory.room[room.name + ".amount.DroneRemouteRepairer"] = 0;
                Memory.room[room.name + ".amount.DroneRemouteWarrior"] = 0;
                if (Game.flags.Remoute3.room && FindHostileCreeps(Game.flags.Remoute3.room.name).length > 0) {
                    Memory.room[room.name + ".amount.DroneRemouteWarrior"] = 1;
                    Memory.room[room.name + ".amount.DroneRemouteHealer"] = 0;
                }
            }
            if (Game.flags.Attack) {
                Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
                Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                Memory.room[room.name + ".amount.DroneHelperWarrior"] = 1;
                Memory.room[room.name + ".amount.DroneHelperHealer"] = 0;
                Memory.room[room.name + ".amount.DroneHelperArcher"] = 0;
                Memory.room[room.name + ".amount.DroneHelperTransporter"] = 0;
                Memory.room[room.name + ".amount.DroneHelperDismantler"] = 0;
            }
            if (Game.flags.Clear) {
                Memory.room[room.name + ".amount.DroneHelperTransporter"] = 0;
            }
            if (Game.flags.Claim) {
                Memory.room[room.name + ".amount.DroneClaimer"] = 1;
                Memory.room[room.name + ".amount.DroneHelperUpgrader"] = 0;
                Memory.room[room.name + ".amount.DroneHelperBuilder"] = 0;
            }
        } else if (room.name == "W47S29") {
            Memory.room[room.name + ".amount.DroneUpgrader"] = 1;
            Memory.room[room.name + ".amount.DroneBuilder"] = 1;
            Memory.room[room.name + ".amount.DroneRefiller"] = 2;
            if (Game.flags.Remoute4) {
                Memory.room[room.name + ".amount.DroneRemouteMiner"] = 1;
                Memory.room[room.name + ".amount.DroneRemouteTransporter"] = 2;
                Memory.room[room.name + ".amount.DroneRemouteReserver"] = 1;
                Memory.room[room.name + ".amount.DroneRemouteRepairer"] = 0;
                Memory.room[room.name + ".amount.DroneRemouteWarrior"] = 0;
                if (Game.flags.Remoute4.room && FindHostileCreeps(Game.flags.Remoute4.room.name).length > 0) {
                    Memory.room[room.name + ".amount.DroneRemouteWarrior"] = 1;
                    Memory.room[room.name + ".amount.DroneRemouteHealer"] = 0;
                }
            }
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
        if (droneTask) {
            droneTask.control(creep);
        } else console.log(`Invalid creep role ${creep.memory.role}`);
    }
}

function Calculate_creeps() {
    if (Game.time % 2 == 1) {
        Memory.queue = [];
        for (i in Memory.roles) {
            for (z in Game.rooms) {
                if (Game.rooms[z].controller && Game.rooms[z].controller.my) {
                    let roomName = Game.rooms[z].name;
                    let role = Memory.roles[i];
                    let room = Game.rooms[z];
                    if ((!Memory.room[room.name + ".amountIsLive." + Memory.roles[i]] && Memory.room[room.name + ".amount." + Memory.roles[i]] > 0) || (Memory.room[room.name + ".amountIsLive." + Memory.roles[i]] < Memory.room[room.name + ".amount." + Memory.roles[i]])) {
                        Memory.queue.push({ Role: role, Room: roomName });
                    }
                }
            }
        }
    }
}

const Control = {
    control() {
        clearMemory();
        //remouteRooms();
        amountCreeps();
        amountCreepsIsLive();
        Calculate_creeps();
        runCreep();
    }
}
module.exports = Control;
