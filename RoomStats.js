const RoomStats = {
    info() {
        for (i in Game.rooms) {
            if (Game.rooms[i].controller && Game.rooms[i].controller.my) {
                let room = Game.rooms[i];
                if (room.storage && room.storage.store[RESOURCE_ENERGY] < 250000) room.memory.EnergyStore = false;
                else room.memory.EnergyStore = true;
            }
        }
    }
}
module.exports = RoomStats;