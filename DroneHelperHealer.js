function healCreeps(creep, state = false) {
    if (!state) {
        const target = creep.pos.findClosestByPath(FIND_CREEPS, {
            filter: (crps) => {
                return (crps.owner.username == "kotyara" || crps.owner.username == "JOURLOY") && crps.hits < crps.hitsMax;
            }
        });
        if (target) {
            if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                creep.rangedHeal(target)
            }
        } else {
            creep.heal(creep)
        }
    } else {
        const target = creep.pos.findClosestByPath(FIND_CREEPS, {
            filter: (crps) => {
                return (crps.owner.username == "kotyara" || crps.owner.username == "JOURLOY") && crps.hits < crps.hitsMax;
            }
        });
        if (target) {
            if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                creep.rangedHeal(target)
                creep.moveTo(target);
            }
        } else {
            if (Memory.room[creep.memory.room + ".amountIsLive." + "DroneHelperWarrior"] > 0) {
                let tarCreep = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                    filter: (crps) => {
                        return (crps.memory.role == "DroneHelperWarrior");
                    }
                });
                if (tarCreep) {
                    creep.moveTo(tarCreep, {range: 1});
                    healCreeps(creep)
                }
                else creep.moveTo(Game.flags.Attack);
            }
            else creep.moveTo(Game.flags.Attack);
            creep.heal(creep)
        }
    }
    
}

let DroneHelperHealer = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {

            if (creep.hits < ((creep.hitsMax/2)+50) && Game.flags.Heal) creep.memory.selfHeal = true;
            else if (creep.hits == creep.hitsMax) creep.memory.selfHeal = false;
            
            if (Game.flags.Heal && creep.memory.selfHeal) {
                creep.moveTo(Game.flags.Heal);
                healCreeps(creep);
            } else if (Game.flags.Heal && !creep.memory.selfHeal) {
                healCreeps(creep, true);
            } else {
                healCreeps(creep, true);
            }
        }
    }
};
module.exports = DroneHelperHealer;