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
        creep.heal(heal)
    }
}

let DroneHelperWarrior = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            if (Game.flags.Attack) {
                creep.moveTo(Game.flags.Attack);
                healCreeps(creep);
            }

        }
    }
};
module.exports = DroneHelperWarrior;