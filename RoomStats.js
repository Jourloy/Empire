function RoomLevel(room) {
    if (room.controller) return room.controller.level;
    else return 0
}

function StateRoomEnergy(room) {
    if (room.storage && room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity) return true
    else return false
}

function AmountRoomEnergy(room) {
    if (room.storage) return room.storage.store[RESOURCE_ENERGY]
    else return 0
}

function AmountEnergySources(room) {
    const source = room.find(FIND_SOURCES);
    return source.length;
}

function RoomMineral(room) {
    const sourceInRoom = room.find(FIND_MINERALS);
    return sourceInRoom[0].mineralType
}

const RoomStats = {
    info() {
        if (Game.time % 21 == 20) {
            Memory.information = [];
            let information = []
            let Info;
            console.log(`[LOG] Collecting data about rooms`)
            for (i in Game.rooms) {
                if (Game.rooms[i].controller && Game.rooms[i].controller.my) {
                    let room = Game.rooms[i]
                    Info = {
                        RoomName:room.name,
                        RoomLevel:RoomLevel(room),
                        EnergyState:StateRoomEnergy(room),
                        AmountEnergy:AmountRoomEnergy(room),
                        AmountEnergySources:AmountEnergySources(room),
                        RoomMineral:RoomMineral(room)
                    }
                    information.push(Info);
                }
            }

            Memory.information = information;
        }
    }
}
module.exports = RoomStats;