function claim(creep) {
    if (Game.flags.Claim) {
        targetRoom = Game.flags.Claim.room

        if (creep.room != targetRoom || targetRoom == undefined) creep.moveTo(Game.flags.Claim, {ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50});
        else {
            if (creep.room.controller && !creep.room.controller.my) {
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller); 
            }
            if (creep.room.controller && !creep.room.controller == Memory.code) {
                if (creep.signController(creep.room.controller, Memory.code) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller); 
            }
        }
    }
}

const DroneClaimer = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
        } else {
            claim(creep);
        }
    }
}
module.exports = DroneClaimer;