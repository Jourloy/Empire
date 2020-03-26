var roleTower = {

    control(tower) {
        let towers = [];
        for (var i in Game.rooms){
            let room = Game.rooms[i];
            let roomTowers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers = towers.concat(roomTowers);
        }
        for (var i in towers){
            let tower = towers[i];

            let hostileCreeps = FindHostileCreeps(tower.room.name);

            let hitsOnCurrentLevel = 100000
            if (tower.room.controller.level == 4) hitsOnCurrentLevel = 2000000
            if (tower.room.controller.level == 5) hitsOnCurrentLevel = 4000000
            if (tower.room.controller.level == 6) hitsOnCurrentLevel = 6000000
            if (tower.room.controller.level == 7) hitsOnCurrentLevel = 7000000
            if (tower.room.controller.level == 4) hitsOnCurrentLevel = 8000000

            if (tower.room.storage.store[RESOURCE_ENERGY] > 350000) {
                let structures = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL ||
                                structure.structureType == STRUCTURE_RAMPART) && structure.hits < hitsOnCurrentLevel;
                    }
                });
                var maxStructures = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_ROAD ||
                                structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;
                    }
                });
                if (hostileCreeps.length == 0) {
                    if (tower.store[RESOURCE_ENERGY] > 699) {
                        if (maxStructures.length > 0) {
                            maxStructures.sort((a,b) => a.hits - b.hits);
                            tower.repair(maxStructures[0]);
                        } else if (structures.length > 0) {
                            structures.sort((a,b) => a.hits - b.hits);
                            tower.repair(structures[0]);
                        }
                    }
                } else {
                    if (hostileCreeps.length > 0) {
                        if (hostileCreeps.length >= 2) {
                            if (tower.store[RESOURCE_ENERGY] > 299) {
                                tower.attack(hostileCreeps[0]);
                            } else if (tower.store[RESOURCE_ENERGY] > 0) {
                                var friendsCreeps = tower.room.find(FIND_MY_CREEPS, {
                                    filter: (creep) => {
                                        return creep.hits < creep.hitsMax;
                                    }
                                });
                                if (friendsCreeps.length > 0) tower.heal(friendsCreeps[0]);
                            }
                        } else {
                            tower.attack(hostileCreeps[0]);
                        }
                    }
                }
            } else {
                var maxStructures = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_ROAD ||
                                structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;
                    }
                });
                let structures = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL ||
                                structure.structureType == STRUCTURE_RAMPART) && structure.hits < 100000;
                    }
                });

                if (hostileCreeps.length == 0) {
                    if (tower.store[RESOURCE_ENERGY] > 699) {
                        if (maxStructures.length > 0) {
                            maxStructures.sort((a,b) => a.hits - b.hits);
                            tower.repair(maxStructures[0]);
                        } else if (structures.length > 0) {
                            structures.sort((a,b) => a.hits - b.hits);
                            tower.repair(structures[0]);
                        }
                    }
                } else {
                    if (hostileCreeps.length > 0) {
                        if (hostileCreeps.length >= 2) {
                            if (tower.store[RESOURCE_ENERGY] > 299) {
                                tower.attack(hostileCreeps[0]);
                            } else if (tower.store[RESOURCE_ENERGY] > 0) {
                                var friendsCreeps = tower.room.find(FIND_MY_CREEPS, {
                                    filter: (creep) => {
                                        return creep.hits < creep.hitsMax;
                                    }
                                });
                                if (friendsCreeps.length > 0) tower.heal(friendsCreeps[0]);
                            }
                        } else {
                            tower.attack(hostileCreeps[0]);
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleTower;