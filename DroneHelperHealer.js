function healCreeps(creep) {
    const target = creep.pos.findClosestByPath(FIND_CREEPS, {
        filter: (crps) => {
            return crps.owner.username != "kotyara" && crps.owner.username != "JOURLOY";
        }
    });
    if (target) {
        if (creep.heal(target) == ERR_NOT_IN_RANGE) {
            creep.rangedHeal(target)
            creep.moveTo(target);
        }
    }
}

let DroneHelperWarrior = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
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
                        healCreeps(creep);
                    } else {
                        creep.moveTo(Game.flags.Claim);
                    }
                }
            }

        }
    }
};
module.exports = DroneHelperWarrior;