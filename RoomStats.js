function RoomLevel(room) {
    if (room.controller) return room.controller.level;
    else return 0
}

function StateRoomEnergy(room) {
    if (room.storage && room.storage.store[RESOURCE_ENERGY] > Memory.storageEnergyCapacity) return true
    else return false
}

function AmountRoomEnergyInStorage(room) {
    if (room.storage) return room.storage.store[RESOURCE_ENERGY]
    else return 0
}

function AmountRoomEnergyInTerminal(room) {
    if (room.terminal) return room.terminal.store[RESOURCE_ENERGY]
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

function CheckHostileCreeps(room) {
    const HostileCreeps = room.find(FIND_HOSTILE_CREEPS, {
        filter: (creep) => {
            return (!Memory.friends.includes(creep.owner.username));
        }
    });
    if (HostileCreeps.length > 0) return true;
    else return false;
}

function CheckTerminal(room) {
    if (room.terminal) return true;
    else return false;
}

const RoomStats = {
    info() {
            Memory.information = [];
            let information = []
            let Info;
            let informationAboutRooms;
            for (i in Game.rooms) {

                if (Game.rooms[i].controller && Game.rooms[i].controller.my) {
                    let room = Game.rooms[i]
                    Info = {
                        RoomName:room.name,
                        RoomLevel:RoomLevel(room),
                        EnergyState:StateRoomEnergy(room),
                        AmountEnergyInStorage:AmountRoomEnergyInStorage(room),
                        TerminalState:CheckTerminal(room),
                        AmountEnergyInTerminal:AmountRoomEnergyInTerminal(room),
                        AmountEnergySources:AmountEnergySources(room),
                        RoomMineral:RoomMineral(room),
                        HostileCreeps:CheckHostileCreeps(room)
                    }
                    information.push(Info);
                } else if (Game.rooms[i].controller && Game.rooms[i].controller.reservation && Game.rooms[i].controller.reservation.username == "JOURLOY") {
                    let room = Game.rooms[i]
                    Info = {
                        RoomName:room.name,
                        RoomReservation:true,
                        TiksToEnd:Game.rooms[i].controller.reservation.tiksToEnd,
                        AmountEnergySources:AmountEnergySources(room),
                        RoomMineral:RoomMineral(room),
                        HostileCreeps:CheckHostileCreeps(room)
                    }
                    information.push(Info);
                } else if (Game.rooms[i].controller) {
                    let room = Game.rooms[i]
                    Info = {
                        RoomName:room.name,
                        RoomMineral:RoomMineral(room),
                        HostileCreeps:CheckHostileCreeps(room)
                    }
                    information.push(Info);
                }
            }

            Memory.information = information;
        }
    
}
module.exports = RoomStats;
