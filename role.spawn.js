function getBodyParts(spawn, pattern, count, optional) {

    if (!spawn) return 'Need parameter [Spawn]';
    if (!pattern) return 'Need parameter [Pattern]';
    if (!count || count == null) count = 50;

    let body = [];
    let prepareBody = [];
    let amountEnergy = spawn.room.energyCapacityAvailable;
    let bodyCost = 0;

    for (let i = 0; i < count/2; i++) {
        prepareBody.push(pattern[i%pattern.length]);
        prepareBody.push(MOVE);
    }

    for (i in prepareBody) {
        if (prepareBody[i] != MOVE && bodyCost + BODYPART_COST[prepareBody[i]] + 50 < amountEnergy) {
            body.push(prepareBody[i]);
            body.push(MOVE)
            bodyCost += BODYPART_COST[prepareBody[i]] + 50;
        }
    }
    return body
}

let roleSpawn = {
    run(spawn, role) {
        let names = ['Arne', 'Birger', 'Bjørn', 'Bo', 'Erik', 'Frode', 'Gorm', 'Halfdan', 'Harald', 'Knud', 'Kåre', 'Leif', 'Njal', 'Roar', 'Rune', 'Sten', 'Skarde', 'Sune', 'Svend', 'Troels', 'Toke', 'Torsten', 'Trygve', 'Ulf', 'Ødger', 'Åge', 'Astrid', 'Bodil', 'Frida', 'Gertrud', 'Gro', 'Estrid', 'Hilda', 'Gudrun', 'Gunhild', 'Helga', 'Inga', 'Liv', 'Randi', 'Signe', 'Sigrid', 'Revna', 'Sif', 'Tora', 'Tove', 'Thyra', 'Thurid', 'Yrsa', 'Ulfhild', 'Åse']
        let newName = names[Game.time%names.length] + " | " + Game.time%names.length + " | " + Game.time%1001;
        let pattern = null;
        let count = 50;

        if (role == "DroneBuilder" || role == "DroneUpgrader" || role == "DroneHelperBuilder" || role == "DroneHelperUpgrader" || role == "DroneRemouteRepairer") {
            pattern = [WORK, CARRY];
        }
        if (role == "DroneHelperTransporter" || role == "DroneRemouteTransporter") {
            pattern = [CARRY];
            count = 30;
        }
        if (role == "DroneRefiller") {
            pattern = [CARRY];
        }
        if (role == "DroneMiner1" || role == "DroneMiner2" || role == "DroneRemouteMiner") {
            pattern = [WORK];
            count = 12;
        }
        if (role == "DroneHelperWarrior") {
            pattern = [ATTACK];
        }
        if (role == "DroneWarrior") {
            pattern = [ATTACK];
        }
        if (role == "DroneRemouteWarrior") {
            pattern = [ATTACK];
            count = 10;
        }
        if (role == "DroneRemouteHealer") {
            pattern = [HEAL];
            count = 10;
        }
        if (role == "DroneSeller") {
            pattern = [CARRY];
            count = 10;
        }
        if (role == "DroneMineralMiner" || role == "DroneHelperDismantler") pattern = [WORK];
        if (role == "DroneRenamer") {
            pattern = [CARRY];
            count = 2;
        }
        if (role == "DroneClaimer") {
            pattern = [CLAIM];
            count = 2;
        }
        if (role == "DroneRemouteReserver") {
            pattern = [CLAIM];
            count = 4;
        }
        if (role == "DroneHelperHealer") {
            pattern = [HEAL];
        }
        if (role == "DroneHelperControl") {
            pattern = [CLAIM];
            count = 4;
        }
        if (role == "DroneHelperArcher") pattern = [RANGED_ATTACK];

        if (spawn.spawning == null) {
            if (spawn.spawnCreep(getBodyParts(spawn, pattern, count), newName, { memory: { role: role } }) == 0) {
                console.log("[INFO] Spawn start spawn creep [" + role + "] in " + spawn.room.name)
                for (i in Memory.queue) {
                    if (Memory.queue[i] && Memory.queue[i].Role == role && Memory.queue[i].Room == spawn.room.name) {
                        let CreepSpawn = Memory.queue.slice(i, i+1);
                        let newList = [];
                        for (i in Memory.queue) {
                            if (Memory.queue[i] != CreepSpawn[0]) newList.push(Memory.queue[i])
                        }
                        Memory.queue = newList;
                    }
                }
                for (i in Memory.queue) {
                }
            }
        }
    }
};
module.exports = roleSpawn;
