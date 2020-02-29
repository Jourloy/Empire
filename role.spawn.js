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
    getBody(spawn, role, pattern) {
        let count = 50;

        if (role == "DroneBuilder" || role == "DroneUpgrader" || role == "DroneHelperBuilder" || role == "DroneHelperUpgrader") pattern = [WORK, CARRY];
        if (role == "DroneRefiller" || role == "DroneHelperTransporter") {
            pattern = [CARRY]; 
            count = 30;
        }
        if (role == "DroneMiner1" || role == "DroneMiner2") {
            pattern = [WORK]; 
            count = 20;
        }
        if (role == 'DroneWarrior' || role == "DroneHelperWarrior") {
            pattern = [ATTACK];
            count = 6;
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
            pattern = [CARRY]; 
            count = 8;
        }
        if (role == "DroneHelperHealer") pattern = [HEAL];
        if (role == "DroneHelperArcher") pattern = [RANGED_ATTACK];

        let body = getBodyParts(spawn, pattern, count)
        return body
    },

    run(spawn, role) {
        
        let names = ['Arne', 'Birger', 'Bjørn', 'Bo', 'Erik', 'Frode', 'Gorm', 'Halfdan', 'Harald', 'Knud', 'Kåre', 'Leif', 'Njal', 'Roar', 'Rune', 'Sten', 'Skarde', 'Sune', 'Svend', 'Troels', 'Toke', 'Torsten', 'Trygve', 'Ulf', 'Ødger', 'Åge', 'Astrid', 'Bodil', 'Frida', 'Gertrud', 'Gro', 'Estrid', 'Hilda', 'Gudrun', 'Gunhild', 'Helga', 'Inga', 'Liv', 'Randi', 'Signe', 'Sigrid', 'Revna', 'Sif', 'Tora', 'Tove', 'Thyra', 'Thurid', 'Yrsa', 'Ulfhild', 'Åse']
        let newName = names[Game.time%names.length];
        let pattern = null;
        let count = 50;

        if (role == "DroneBuilder" || role == "DroneUpgrader" || role == "DroneHelperBuilder" || role == "DroneHelperUpgrader") {
            pattern = [WORK, CARRY];
            count = 20
        }
        if (role == "DroneRefiller" || role == "DroneHelperTransporter") {
            pattern = [CARRY]; 
            count = 30;
        }
        if (role == "DroneMiner1" || role == "DroneMiner2") {
            pattern = [WORK];
            count = 10;
        }
        if (role == 'DroneWarrior' || role == "DroneHelperWarrior") {
            pattern = [ATTACK];
            count = 6;
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
            pattern = [CARRY]; 
            count = 8;
        }
        if (role == "DroneHelperHealer") pattern = [HEAL];
        if (role == "DroneHelperArcher") pattern = [RANGED_ATTACK];

        if (spawn.spawning == null) spawn.spawnCreep(getBodyParts(spawn, pattern, count), newName, { memory: { role: role } });
    }
};
module.exports = roleSpawn;
