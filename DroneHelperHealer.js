function healCreeps(creep) {
    const target = creep.pos.findClosestByPath(FIND_CREEPS, {
        filter: (crps) => {
            return (crps.owner.username == "kotyara" || crps.owner.username == "JOURLOY") && crps.hits < crps.hitsMax;
        }
    });
    if (target) {
        if (creep.heal(target) == ERR_NOT_IN_RANGE) {
            creep.rangedHeal(target)
            //creep.moveTo(target);
        }
    } else {
        creep.heal(creep)
    }
}

let DroneHelperHealer = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (Game.flags.Attack && creep.hits == creep.hitsMax) {
                creep.moveTo(Game.flags.Attack);
                healCreeps(creep);
            } else if (creep.hits < creep.hitsMax && Game.flags.Heal) {
                creep.moveTo(Game.flags.Heal);
                healCreeps(creep);
            }

        }
    }
};
module.exports = DroneHelperHealer;