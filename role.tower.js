var roleTower = {

    control(tower) {
        var towers = [];
        for (var i in Game.rooms){
            var room = Game.rooms[i];
            var roomTowers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers = towers.concat(roomTowers);
        }
        for (var i in towers){
            var tower = towers[i];
            var hostileCreeps = tower.room.find(FIND_HOSTILE_CREEPS, {
                filter: (creep) => {
                    return (creep.owner.username != "kotyara");
                }
            });

            var friendsCreeps = tower.room.find(FIND_MY_CREEPS, {
                filter: (creep) => {
                    return creep.hits < creep.hitsMax;
                }
            });

            var roads = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_ROAD ||
                            structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;
                }
            });

            var walls = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL ||
                            structure.structureType == STRUCTURE_RAMPART) && structure.hits < 100000;
                }
            });

            if (hostileCreeps.length == 0) {
                if (tower.store[RESOURCE_ENERGY] > 699) {
                    if (roads.length > 0) {
                        roads.sort((a,b) => a.hits - b.hits);
                        tower.repair(roads[0]);
                    } else if (walls.length > 0) {
                        walls.sort((a,b) => a.hits - b.hits);
                        tower.repair(walls[0]);
                    }
                }
                if (friendsCreeps.length > 0) tower.heal(friendsCreeps[0]);
            } else {
                if (hostileCreeps.length > 0) {
                    tower.attack(hostileCreeps[0]);
                }
            }
        }
    }
};

module.exports = roleTower;
