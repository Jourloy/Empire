function killCreeps(creep) {
    const hostileTarget = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
        filter: (crps) => {
            return crps.owner.username != "kotyara";
        }
    });
    if (hostileTarget) {
        if (creep.attack(hostileTarget) == ERR_NOT_IN_RANGE) creep.moveTo(hostileTarget);
    } else {
        destroyStructures(creep)
    }
}

function destroyStructures(creep) {
    const hostileTarget = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
        filter: (strc) => {
            return strc.owner.username != "kotyara" && strc.owner.username != "JOURLOY" && strc.structureType != "controller";
        }
    });
    if (creep.attack(hostileTarget) == ERR_NOT_IN_RANGE) creep.moveTo(hostileTarget);
    else if (creep.room.controller && !creep.room.controller.my || !creep.room.controller) {
        const structuresContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (strc) => {
                return strc.structureType == "container" || strc.structureType == "road";
            }
        });
        if (creep.attack(structuresContainer) == ERR_NOT_IN_RANGE) creep.moveTo(structuresContainer);
    }
}

let DroneHelperWarrior = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {

            
            if (Game.flags.Heal) {
                if (creep.hits < (creep.hitsMax-(creep.hitsMax/4)) && Game.flags.Heal) creep.memory.selfHeal = true;
                else if (creep.hits == creep.hitsMax) creep.memory.selfHeal = false;

                if (creep.memory.selfHeal) {
                    creep.moveTo(Game.flags.Heal);
                } else {
                    if (Game.flags.Attack.room != creep.room) {
                        creep.moveTo(Game.flags.Attack);
                    } else {
                        
                        const hostileCreeps = creep.room.find(FIND_HOSTILE_CREEPS, {
                            filter: (crps) => {
                                return crps.owner.username != "kotyara";
                            }
                        });
                        if (hostileCreeps.length > 0) {
                            const speak = ['ODIN,', "MY", "FATHER!", "I", "BEG", "YOU!", "BLAST", "ME!"]
                            creep.say(speak[Game.time%speak.length], true);
                            killCreeps(creep);
                        } else {
                            const hostileStructures = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                                filter: (strc) => {
                                    return strc.owner.username != "kotyara" && strc.structureType != "controller";
                                }
                            });
                            const structuresContainer = creep.room.find(FIND_STRUCTURES, {
                                filter: (strc) => {
                                    return strc.structureType == "container";
                                }
                            });
                            if (hostileStructures.length > 0 || (structuresContainer.length > 0 && (creep.room.controller && !creep.room.controller.my) || !creep.room.controller)) {
                                destroyStructures(creep);
                            } else {
                                creep.moveTo(Game.flags.Attack);
                            }
                        }
                    }
                }
            } else if (Game.flags.Attack) {
                if (Game.flags.Attack.room != creep.room) {
                    creep.moveTo(Game.flags.Attack);
                } else {
                    
                    const hostileCreeps = creep.room.find(FIND_HOSTILE_CREEPS, {
                        filter: (crps) => {
                            return crps.owner.username != "kotyara";
                        }
                    });
                    if (hostileCreeps.length > 0) {
                        const speak = ['ODIN,', "MY", "FATHER!", "I", "BEG", "YOU!", "BLAST", "ME!"]
                        creep.say(speak[Game.time%speak.length], true);
                        killCreeps(creep);
                    } else {
                        const hostileStructures = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                            filter: (strc) => {
                                return strc.owner.username != "kotyara" && strc.structureType != "controller";
                            }
                        });
                        const structuresContainer = creep.room.find(FIND_STRUCTURES, {
                            filter: (strc) => {
                                return strc.structureType == "container" || strc.structureType == "road";
                            }
                        });
                        if (hostileStructures.length > 0 || (structuresContainer.length > 0 && (creep.room.controller && !creep.room.controller.my) || !creep.room.controller)) {
                            destroyStructures(creep);
                        } else {
                            creep.moveTo(Game.flags.Attack);
                        }
                    }
                }
            }

            if (Game.flags.Claim) {
                if (Game.flags.Claim.room != creep.room) {
                    creep.moveTo(Game.flags.Claim);
                } else {
                    
                    const hostileCreeps = creep.room.find(FIND_HOSTILE_CREEPS, {
                        filter: (crps) => {
                            return crps.owner.username != "kotyara";
                        }
                    });
                    if (hostileCreeps.length > 0) {
                        const speak = ['ODIN,', "MY", "FATHER!", "I", "BEG", "YOU!", "BLAST", "ME!"]
                        creep.say(speak[Game.time%speak.length], true);
                        killCreeps(creep);
                    } else {
                        const hostileStructures = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                            filter: (strc) => {
                                return strc.owner.username != "kotyara" && strc.structureType != "controller";
                            }
                        });
                        if (hostileStructures.length > 0) {
                            destroyStructures(creep);
                        } else {
                            creep.moveTo(Game.flags.Claim);
                        }
                    }
                }
            }

        }
    }
};
module.exports = DroneHelperWarrior;