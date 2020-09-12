global.resources = RESOURCES_ALL;

Memory.JourloyConsole = {};
Memory.JourloyConsole.timer = 'off';
Memory.JourloyConsole.ticks = 1;
Memory.JourloyConsole.num = 0;
Memory.JourloyConsole.nowDate = 0;

/**
 * Return body array
 * @param {Object} info 
 * @return Array
 */
function ConvertBodyArray(info) {
    body = [];
    let tough = 0;
    let attack = 0;
    let rangedAttack = 0;
    let move = 0;
    let carry = 0;
    let work = 0;
    let heal = 0;
    let claim = 0;
    if (info != null) {
        tough = info.tough || 0;
        attack = info.attack || 0;
        rangedAttack = info.rangedAttack || 0;
        move = info.move || 0;
        carry = info.carry || 0;
        work = info.work || 0;
        heal = info.heal || 0;
        claim = info.claim || 0;
    }
    for (i = 0;i < tough; i++) body.push(TOUGH);
    for (i = 0;i < attack; i++) body.push(ATTACK);
    for (i = 0;i < rangedAttack; i++) body.push(RANGED_ATTACK);
    for (i = 0;i < move; i++) body.push(MOVE);
    for (i = 0;i < carry; i++) body.push(CARRY);
    for (i = 0;i < work; i++) body.push(WORK);
    for (i = 0;i < heal; i++) body.push(HEAL);
    for (i = 0;i < claim; i++) body.push(CLAIM);
    return body;
}

/**
 * Return body circle
 * @param {String} color 
 * @param {Number} count 
 * @param {Number} width 
 * @param {Number} height
 * @return String
 */
function svgBody(color, count = 1, width = 16, height = 16) {
    const cx = width / 2;
    const cy = height / 2;
    const r = cx;
    bodySvg = [];
    for (let i = 0; i < count; i += 1) bodySvg.push('<svg width="' + width + '" height="' + height + '"> <circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" stroke="black" stroke-width="1" fill="' + color + '"/></svg>');
    bodySvg = bodySvg.join("");
    return bodySvg;
};

/* 
 * Not used. Will be delete
global.pushNotification = function(room) {
    let notification = [];
    notification = `<script>
    if (!pushNotifications) {
        var pushNotifications = {};
    }
    if (!pushNotifications['${room}']) {
        pushNotifications['${room}'] = true;
        alert('${room} is in trouble. Look into the console for the link.');
    }
    </script>`;
    notification = notification.replace(/\r?\n|\r/g, ' ');
    console.log(`<a target="_blank" href="https://screeps.com/a/#!/room/${Game.shard.name}/${room}">${room} is in trouble. Click on me to open this room!</a>`);
    return notification;
} */

/**
 * Help function for createCreepBodyArray()
 * @param {String} bodyString
 * @return Array
 * @author Orlet from Screeps Slack. Thank you
 */
function expandBodyArrayString(bodyString) {
    var preg = /(\d+)\(([0-9a-zA-Z]+)\)/;
    var match;
    do {
        m = preg.exec(bodyString);
        if (m) {
            let times = parseInt(m[1]);
            let replace = "";
            for (let i = 0; i < times; i++) replace += m[2];
            bodyString = bodyString.replace(m[0], replace);
        }
    } while (m);

    return bodyString;
};

/**
 * Unpack a bodypart string into creep body part array
 * MOVE - "M"
 * WORK - "W"
 * CARRY - "C"
 * ATTACK - "A"
 * RANGED_ATTACK - "R"
 * HEAL - "H"
 * CLAIM - "X" or "K" --- note the special character
 * TOUGH - "T"
 * @param {String} bodyString 
 * @return Array
 * @author Orlet from Screeps Slack. Thank you
 */
function createCreepBodyArray(bodyString) {
    bodyString = bodyString.toLowerCase();
    if (bodyString.indexOf('(') !== -1) bodyString = this.expandBodyArrayString(bodyString);
    let bodyObject = {
        m: MOVE,
        w: WORK,
        c: CARRY,
        a: ATTACK,
        r: RANGED_ATTACK,
        h: HEAL,
        x: CLAIM,
        k: CLAIM,
        t: TOUGH
    }
    let bodyArray = new Array();
    let partCounter = 0;
    for (let i = 0; i < bodyString.length; i++) {
        if (isNaN(bodyString[i])) {
            if (partCounter === 0) partCounter = 1;
            let part = bodyObject[bodyString[i]];
            if (part === undefined) {
                partCounter = 0;
                continue;
            }
            for (let j = 0; j < partCounter; j++) bodyArray.push(part);
            partCounter = 0;
        } else partCounter = partCounter*10 + parseInt(bodyString[i]);
    }
    return bodyArray;
}

/**
 * DEPRECATED. Use creeps(body)
 */
function CreepBuilder(bodyBuild, bodyString) { return 'DEPRECATED. Use creeps(body)' }

/**
 * Return html circle of creep's body (how in game)
 * @param {BODY} body 
 * @param {Number} width 
 * @param {Number} height
 * @return String
 */
function svgCreep(body, width = 48, height = 48) {
    const cx = width / 2;
    const cy = height / 2;
    const r = cx;
    let bodyCount = 0;
    let moveCount = 0;
    let carryCount = 0;
    let workCount = 0;
    let attackCount = 0;
    let rangedAttackCount = 0;
    let healCount = 0;
    let toughCount = 0;
    let claimCount = 0;
    for (let i in body) {
        bodyCount++;
        if (body[i] == MOVE || body[i] == CARRY) {
            if (body[i] == MOVE) {
                moveCount++;
            } else {
                carryCount++;
            }
        } else if (body[i] == WORK) {
            workCount++;
        } else if (body[i] == ATTACK) {
            attackCount++
        } else if (body[i] == RANGED_ATTACK) {
            rangedAttackCount++;
        } else if (body[i] == HEAL) {
            healCount++;
        } else if (body[i] == TOUGH) {
            toughCount++;
        } else if (body[i] == CLAIM) {
            claimCount++;
        }
    }
    bodySvg = [];
    bodySvg.push('<svg viewBox="-9 -9 18 18">');
    if (toughCount > 0) bodySvg.push('<circle cx="0" cy="0" r="9" fill="#5e5e5e"/>');
    bodySvg.push('<circle cx="0" cy="0" r="8" fill="#202020"/>');

    let percentMove = 25.1/50*moveCount;
    let rotateMove = Math.ceil(90-(180/50*moveCount-180/50)-5);

    let percentWork = 25.1/50*workCount;
    let rotateWork = Math.ceil((90-(180/50*workCount-180/50)-5))-180;

    if (workCount > 0 && attackCount > 0) attackCount += workCount;
    let percentAttack = 25.1/50*attackCount;
    let rotateAttack = Math.ceil((90-(180/50*attackCount-180/50)-5))-180;

    if (attackCount > 0 && rangedAttackCount > 0) rangedAttackCount += attackCount;
    if (rangedAttackCount > 0 && attackCount < 1 && workCount > 0) rangedAttackCount += workCount
    let percentRangedAttack = 25.1/50*rangedAttackCount;
    let rotateRangedAttack = Math.ceil((90-(180/50*rangedAttackCount-180/50)-5))-180;

    if (rangedAttackCount > 0 && healCount > 0) healCount += rangedAttackCount;
    if (healCount > 0 && rangedAttackCount < 1 && attackCount > 0) healCount += attackCount
    else if (healCount > 0 && rangedAttackCount < 1 && workCount > 0) healCount += workCount
    let percentHeal = 25.1/50*healCount;
    let rotateHeal = Math.ceil((90-(180/50*healCount-180/50)-5))-180;

    if (rangedAttackCount > 0 && claimCount > 0) claimCount += rangedAttackCount;
    if (claimCount > 0 && rangedAttackCount < 1 && attackCount > 0) claimCount += attackCount
    else if (claimCount > 0 && rangedAttackCount < 1 && workCount > 0) claimCount += workCount
    else if (claimCount > 0 && rangedAttackCount < 1 && attackCount < 1 && workCount < 1 && healCount > 0) claimCount += workCount
    let percentClaim = 25.1/50*claimCount;
    let rotateClaim = Math.ceil((90-(180/50*claimCount-180/50)-5))-180;

    if (moveCount > 0) bodySvg.push('<circle cx="0" cy="0" r="4" transform="rotate('+rotateMove+')" stroke-width="8" stroke-dasharray="'+percentMove+', 26" stroke="#A9B7C6" fill="none" />')
    if (claimCount > 0) bodySvg.push('<circle cx="0" cy="0" r="4" transform="rotate('+rotateClaim+')" stroke-width="8" stroke-dasharray="'+percentClaim+', 26" stroke="#B99CFB" fill="none" />')
    if (healCount > 0) bodySvg.push('<circle cx="0" cy="0" r="4" transform="rotate('+rotateHeal+')" stroke-width="8" stroke-dasharray="'+percentHeal+', 26" stroke="#65FD62" fill="none" />')
    if (rangedAttackCount > 0) bodySvg.push('<circle cx="0" cy="0" r="4" transform="rotate('+rotateRangedAttack+')" stroke-width="8" stroke-dasharray="'+percentRangedAttack+', 26" stroke="#5D80B2" fill="none" />')
    if (attackCount > 0) bodySvg.push('<circle cx="0" cy="0" r="4" transform="rotate('+rotateAttack+')" stroke-width="8" stroke-dasharray="'+percentAttack+', 26" stroke="#F93842" fill="none" />')
    if (workCount > 0) bodySvg.push('<circle cx="0" cy="0" r="4" transform="rotate('+rotateWork+')" stroke-width="8" stroke-dasharray="'+percentWork+', 26" stroke="#FFE56D" fill="none" />')
    bodySvg.push('<image x="-5.7" y="-5.7" width="11.5" height="11.5" xlink:href="' + PlayerLink() + '"/> <circle cx="0" cy="0" r="5.8" stroke-width="0.6" stroke="black" fill="none"/>')
    bodySvg.push('</svg>');
    bodySvg = bodySvg.join("");
    return bodySvg;
};

/**
 * Return link of player who use this command
 * @return String
 */
function PlayerLink() {
    let nickName = null;
    for (let i in Game.spawns) {
        nickName = Game.spawns[i].owner.username;
        break;
    }
    return 'https://screeps.com/api/user/badge-svg?username=' + nickName;
};

/**
 * Return html image of resource
 * @param {String} resource 
 * @return String
 */
function ResourceImg(resource) {
    return '<a target="_blank" href="https://screeps.com/a/#!/market/all/' + Game.shard.name + '/' + resource + '"><img src ="https://s3.amazonaws.com/static.screeps.com/upload/mineral-icons/' + resource + '.png" /></a>';
};

/**
 * Return infromaint about resources in room(s)
 * @param {Object} info 
 */
function AmountResource(info) {
    let room = info.room || null
    const resource = info.resource || null;
    let amount = 0;
    let storeStr = [];
    let allStr = [];
    if (resource) {
        if (room != null) {
            storeStr = Game.rooms[room].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.store);
                }
            });
            if (storeStr.length > 0) {
                for (i in storeStr) {
                    amount += storeStr[i].store[resource];
                }
            }
            return amount;
        } else {
            for (i in Game.rooms) {
                room = Game.rooms[i];
                storeStr = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.store);
                    }
                });
                allStr = allStr.concat(storeStr);
            }
            for (i in allStr) {
                if (allStr[i].store[resource] > 0) amount += allStr[i].store[resource];
            }
            return amount;
        }
    } else {
        return 0;
    }
};

/**
 * return progress bar (from 0 to num when 100 is max)
 * @param {Number} num 
 */
function progressBar(num = 0) {
    let width = 128;
    let height = 10;
    let progressBar = '<svg width="' + (width+2) + '" height="' + (height+2) + '"> <rect x="1" y="1" fill="#F93842" width="' + (width/100*num) + '" height="' + height + '"/> <rect x="1" y="1" stroke="#777777" stroke-width="2" fill="transparent" width="' + width + '" height="' + height + '"/> </svg>';
    return progressBar;
};

function creeps(info = null) {
    if (info) {
        if (info.bodyString) {
            body = createCreepBodyArray(info.bodyString);
        } else if (info.bodyArray) {
            body = info.bodyArray
        } else if (info.body) {
            body = ConvertBodyArray(info.body)
        }

        let bodyCount = 0;
        let moveCount = 0;
        let carryCount = 0;
        let workCount = 0;
        let attackCount = 0;
        let rangedAttackCount = 0;
        let healCount = 0;
        let toughCount = 0;
        let claimCount = 0;

        let capacity = 0;
        let harvEnergy = 0;
        let harvMineral = 0;
        let build = 0;
        let upgrade = 0;
        let damageAttack = 0;
        let damageRangedAttack = 0;
        let healShort = 0;
        let healDistance = 0;
        let hits = 0;

        let price = 0;
        let time = body.length * 3;

        for (let i in body) {
            bodyCount++;
            hits += 100;
            if (body[i] == MOVE || body[i] == CARRY) {
                price = price + 50;
                if (body[i] == MOVE) {
                    moveCount++;
                } else {
                    carryCount++;
                    capacity = capacity + 50;
                }
            } else if (body[i] == WORK) {
                price = price + 100;
                workCount++;
                harvEnergy = harvEnergy + 2;
                harvMineral = harvMineral + 1;
                build = build + 5;
                upgrade++;
            } else if (body[i] == ATTACK) {
                price = price + 80;
                attackCount++
                damageAttack += 30;
            } else if (body[i] == RANGED_ATTACK) {
                price = price + 150;
                rangedAttackCount++;
                damageRangedAttack += 10;
            } else if (body[i] == HEAL) {
                price = price + 250;
                healCount++;
                healShort += 12;
                healDistance += 4;
            } else if (body[i] == TOUGH) {
                price = price + 10;
                toughCount++;
            } else if (body[i] == CLAIM) {
                price = price + 600;
                claimCount++;
            }
        }

        let liveTime = 1500;

        if (claimCount > 0) liveTime = 600;

        const badBodyParts = carryCount + workCount + attackCount + rangedAttackCount + healCount + toughCount + claimCount;

        let movePlain = 0;
        let moveRoad = 0;
        let moveSwamp = 0;

        let movePlainCarry = 0;
        let moveRoadCarry = 0
        let moveSwampCarry = 0

        if (moveCount == 0) {
            movePlain = "-";
            moveRoad = bodyCount;
            moveSwamp = "-";

            if (carryCount > 0) {
                movePlainCarry = "-";
                moveRoadCarry = 1;
                moveSwampCarry = "-";
            }
        } else {
            movePlain = Math.ceil((badBodyParts * 2) / (moveCount * 2));
            moveRoad = Math.ceil((badBodyParts * 1) / (moveCount * 2));
            moveSwamp = Math.ceil((badBodyParts * 10) / (moveCount * 2));

            if (carryCount > 0) {
                badBodyPartsWithoutCarry = workCount + attackCount + rangedAttackCount + healCount + toughCount + claimCount
                movePlainCarry = Math.ceil((badBodyPartsWithoutCarry * 2) / (moveCount * 2));
                moveRoadCarry = Math.ceil((badBodyPartsWithoutCarry * 1) / (moveCount * 2));
                moveSwampCarry = Math.ceil((badBodyPartsWithoutCarry * 10) / (moveCount * 2));
            }
        }

        if (movePlain < 1) movePlain = 1;
        if (moveRoad < 1) moveRoad = 1;
        if (moveSwamp < 1) moveSwamp = 1

        if (movePlainCarry < 1) movePlainCarry = 1;
        if (moveRoadCarry < 1) moveRoadCarry = 1;
        if (moveSwampCarry < 1) moveSwampCarry = 1

        result = [];
        result.push("[" + body.toString().toUpperCase() + "]\n\n");
        result.push("<table border=\"1\" bordercolor=\"#2b2b2b\">");
        result.push('<caption>CREEP\n\n</caption>');
        result.push("<tr>");
        result.push("<th> BODY </th>");
        result.push("<th> APPEARANCE </th>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>");
        for (var i = 0; i < bodyCount; i++) {
            if (i == 10 || i == 20 || i == 30 || i == 40 || i == 50) result.push(" \n")
            if (body[i] == MOVE) result.push(svgBody('#A9B7C6'))
            if (body[i] == CARRY) result.push(svgBody('#777777'))
            if (body[i] == WORK) result.push(svgBody('#FFE56D'))
            if (body[i] == ATTACK) result.push(svgBody('#F93842'))
            if (body[i] == RANGED_ATTACK) result.push(svgBody('#5D80B2'))
            if (body[i] == HEAL) result.push(svgBody('#65FD62'))
            if (body[i] == TOUGH) result.push(svgBody('#FFFFFF'))
            if (body[i] == CLAIM) result.push(svgBody('#B99CFB'))
        }
        result.push("</td>");
        result.push("<td>  \n " + svgCreep(body) + " \n\n</td>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>Live </td>");
        result.push('<td> ' + liveTime + ' TICKS </td>');
        result.push("</tr>");
        result.push("<td>Cost build creep </td>");
        result.push('<td> ' + price + ' ENERGY </td>');
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>Time build creep </td>");
        result.push('<td> ' + time + ' TICKS </td>');
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>Amount HITS of creep </td>");
        result.push("<td> " + hits + " HITS </td>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>Amount BODY PARTS: </td>");
        result.push("<td> " + bodyCount + " PARTS </td>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>Fatigue at PLAIN </td>");
        if (carryCount > 0) result.push('<td> ' + movePlain + ' / ' + movePlainCarry + ' TICKS </td>');
        else result.push('<td> ' + movePlain + ' TICKS </td>');
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>Fatigue at ROAD </td>");
        if (carryCount > 0) result.push('<td> ' + moveRoad + ' / ' + moveRoadCarry + ' TICKS </td>');
        else result.push('<td> ' + moveRoad + ' TICKS </td>');
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>Fatigue at SWAMP </td>");
        if (carryCount > 0) result.push('<td> ' + moveSwamp + ' / ' + moveSwampCarry + ' TICKS </td>');
        else result.push('<td> ' + moveSwamp + ' TICKS </td>');
        result.push("</tr>");
        result.push("</table>");
        result.push("\n\n<table border=\"1\" bordercolor=\"grey\">");
        if (badBodyParts > moveCount) result.push('<caption>Creep\'s parameters\n<p><font color="#FF0000">Creep will go with fatigue\nNeed add ' + (badBodyParts - moveCount) + ' MOVE part(s)</font></p></caption>');
        else result.push('<caption>Creep\'s parameters\n\n</caption>');
        result.push("<tr>");
        result.push("<th></th>");
        result.push("<th> " + svgBody("#A9B7C6") + " </th>");
        result.push("<th> " + svgBody("#777777") + " </th>");
        result.push("<th> " + svgBody("#FFE56D") + " </th>");
        result.push("<th> " + svgBody("#F93842") + " </th>");
        result.push("<th> " + svgBody("#5D80B2") + " </th>");
        result.push("<th> " + svgBody("#65FD62") + " </th>");
        result.push("<th> " + svgBody("#FFFFFF") + " </th>");
        result.push("<th> " + svgBody("#B99CFB") + " </th>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>AMOUNT </td>");
        result.push("<td> " + moveCount + " </td>");
        result.push("<td> " + carryCount + " </td>");
        result.push("<td> " + workCount + " </td>");
        result.push("<td> " + attackCount + " </td>");
        result.push("<td> " + rangedAttackCount + " </td>");
        result.push("<td> " + healCount + " </td>");
        result.push("<td> " + toughCount + " </td>");
        result.push("<td> " + claimCount + " </td>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>CAPACITY </td>");
        result.push("<td>  </td>");
        result.push("<td> " + capacity + " </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>HARVEST ENERGY </td>");
        result.push("<td>  </td>");
        result.push("<td> " + "" + " </td>");
        result.push("<td> " + harvEnergy + " </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>HARVEST MINERAL </td>");
        result.push("<td>  </td>");
        result.push("<td> " + "" + " </td>");
        result.push("<td> " + harvMineral + " </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>BUILD </td>");
        result.push("<td>  </td>");
        result.push("<td> " + "" + " </td>");
        result.push("<td> " + build + " </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>UPGRADE </td>");
        result.push("<td>  </td>");
        result.push("<td> " + "" + " </td>");
        result.push("<td> " + upgrade + " </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>REPAIR </td>");
        result.push("<td>  </td>");
        result.push("<td> " + "" + " </td>");
        result.push("<td> " + workCount*100 + " </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>DISMANTLE </td>");
        result.push("<td>  </td>");
        result.push("<td> " + Math.floor(workCount*0.25) + " </td>");
        result.push("<td> " + workCount*50 + " </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>ATTACK </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>" + damageAttack + "</td>");
        result.push("<td>" + damageRangedAttack + "</td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>HEAL (short)</td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>" + healShort + "</td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("</tr>");
        result.push("<tr>");
        result.push("<td>HEAL (distance)</td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>" + healDistance + "</td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("</tr>");
        result.push("<td>RESERVE</td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td> " + claimCount + " </td>");
        result.push("</tr>");
        result.push("<td>ATTACK HOSTILE ROOM CONTOLLER</td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td> " + claimCount*300 + " </td>");
        result.push("</tr>");
        result.push("<td>ATTACK NEUTRAL ROOM CONTOLLER</td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td>  </td>");
        result.push("<td> " + claimCount + " </td>");
        result.push("</tr>");
        result.push("</table>");

        result = result.join("");
        return result
    } else {
        return `Info about creep is undefined`
    }
};

function convertTicksToTime(opt) {
    const time = opt.ticks;
    const tickRateFunc = opt.rate;

    let info = [];
    info.push("Amount TICKS: " + time);
    info.push("Amount seconds: " + Math.round(time * tickRateFunc));
    if (time * tickRateFunc > 60) {
        info.push("Amount minutes: " + Math.round(time * tickRateFunc / 60));
        if (time * tickRateFunc / 60 > 60) {
            info.push("Amount hours: " + Math.round(time * tickRateFunc / 60 / 60));
            if (time * tickRateFunc / 60 / 60 > 24) info.push("Amount days: " + Math.round(time * tickRateFunc / 60 / 60 / 24));
        }
    }
    info = info.join("\n");
    return info
}

const help = {
    mem() {
        return `
mem
.reset() - Reset all console memory
        `
    },
    info() {
        return `
info
.room() - Print information about all rooms.
    'string'  - Print information about only this room.
.resources() - Print information about all your resources.
    {hide: boolean} - Default: false. Print information about all your resources and hide if you not store this resource
    {room: string} - Print information about all your resources in this room
.market() - Print information about sell and buy orders on market
        `;
    },
    convert() {
        return `
convert
.ticksToTime() - Convert ticks to time.
    ticks - Amount of ticks.
        `;
    },
    creeps() {
        return `
If you want create creep, you can use 3 methods:

=========================

1. creeps({bodyArray:[]})");
In [] you must write creep's body. For example:
Creeps({bodyArray:[MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM]})

=========================

2. creeps({body:{}})
In {} you must write creep's body. For example:
Creeps({body:{move:10, claim:2}})
-------------------------
BODY PARTS:
-------------------------
MOVE - move
WORK - work
CARRY - carry
ATTACK - attack
RANGED_ATTACK - rangedAttack
HEAL - heal
CLAIM - claim
TOUGH - tough

=========================

3. creeps({bodyString:\"\"})
In \"\" you must write creep's body. For example:
Creeps({bodyString:\"15m3c\"})
-------------------------
BODY PARTS:
-------------------------
MOVE - M
WORK - W
CARRY - C
ATTACK - A
RANGED_ATTACK - R
HEAL - H
CLAIM - X or K
TOUGH - T
        `
    }
}

const mem = {
    /**
     * Reset console memory
     */
    reset() {
        Memory.JourloyConsole = {};
        Memory.JourloyConsole.timer = 'off';
        Memory.JourloyConsole.ticks = 1;
        Memory.JourloyConsole.num = 0;
        return `DONE`
    }
}

const info = {
    /**
     * Return infromation about room(s)
     * @param {String} roomName 
     */
    room(roomName) {
        const room_name = roomName || true;
        let info = [];
        let myRooms = [];

        for (let i in Game.rooms) {
            let room = Game.rooms[i];
            if (room.controller && room.controller.my && (room_name == true || room.name == room_name)) myRooms.push(room);
        }
        for (let i in myRooms) {
            const spawn = myRooms[i].find(FIND_MY_SPAWNS)[0];
            info.push("\n\n--------------------------")
            info.push('\nRoom name: ' + spawn.room.name );
            //
            info.push("\n\n")
            //
            info.push("<table align=\"center\" border=\"1\">");
            info.push('<caption>ENERGY FOR SPAWN\n' + progressBar(Math.round(spawn.room.energyAvailable/spawn.room.energyCapacityAvailable*100)) + '\n(' + (Math.round(spawn.room.energyAvailable/spawn.room.energyCapacityAvailable*100)) + '%)\n\n</caption>');
            info.push("<tr>");
            info.push("<th> AVAILABLE </th>");
            info.push("<th> CAPACITY </th>");
            info.push("</tr>");
            info.push("<tr>");
            info.push("<td> " + spawn.room.energyAvailable + "</td>");
            info.push("<td> " + spawn.room.energyCapacityAvailable + "</td>");
            info.push("</tr>");
            info.push("</table>");
            //
            info.push("\n")
            //
            info.push("<table align=\"center\" border=\"1\">");
            info.push('<caption>CONTROLLER\n' + progressBar(Math.round(spawn.room.controller.progress / spawn.room.controller.progressTotal * 100)) + '\n(' + (Math.round(spawn.room.controller.progress / spawn.room.controller.progressTotal * 100)) + '%)\n\n</caption>');
            info.push("<tr>");
            info.push("<th> LEVEL </th>");
            info.push("<th> SAFE MODE AVAILABLE </th>");
            info.push("</tr>");
            info.push("<tr>");
            info.push("<td> " + spawn.room.controller.level + "</td>");
            info.push("<td> " + spawn.room.controller.safeModeAvailable + "</td>");
            info.push("</tr>");
            info.push("</table>");
            //
            info.push("\n")
            //
            if (spawn.room.storage) {
                info.push("<table align=\"center\" border=\"1\">");
                info.push('<caption>STORAGE\n' + progressBar(Math.round(spawn.room.storage.store.getUsedCapacity() / spawn.room.storage.store.getCapacity() * 100)) + '\n(' + (Math.round(spawn.room.storage.store.getUsedCapacity() / spawn.room.storage.store.getCapacity() * 100)) + '%)\n\n</caption>');
                info.push("<tr>");
                info.push("<th></th>");
                info.push("<th> USED CAPACITY </th>");
                info.push("<th> FREE CAPACITY </th>");
                info.push("</tr>");

                for (z in resources) {
                    if (spawn.room.storage.store[resources[z]] > 0) {
                        info.push("<tr>"); info.push("<td> " + ResourceImg(resources[z]) + "</td>");
                        info.push("<td> " + spawn.room.storage.store[resources[z]]/1000 + "</td>"); i
                        info.push("<td> " + spawn.room.storage.store.getFreeCapacity()/1000 + "</td>");
                        info.push("</tr>");
                    }
                }
                info.push("</table>");
            }
            //
            info.push("\n")
            //
            if (spawn.room.terminal) {
                info.push("<table align=\"center\" border=\"1\">");
                info.push('<caption>TERMINAL\n' + progressBar(Math.round(spawn.room.terminal.store.getUsedCapacity() / spawn.room.terminal.store.getCapacity() * 100)) + '\n(' + (Math.round(spawn.room.terminal.store.getUsedCapacity() / spawn.room.terminal.store.getCapacity() * 100)) + '%)\n\n</caption>');
                info.push("<tr>");
                info.push("<th></th>");
                info.push("<th> USED CAPACITY </th>");
                info.push("<th> FREE CAPACITY </th>");
                info.push("</tr>");

                for (z in resources) {
                    if (spawn.room.terminal.store[resources[z]] > 0) {
                        info.push("<tr>"); info.push("<td> " + ResourceImg(resources[z]) + "</td>");
                        info.push("<td> " + spawn.room.terminal.store[resources[z]]/1000 + "</td>"); i
                        info.push("<td> " + spawn.room.terminal.store.getFreeCapacity()/1000 + "</td>");
                        info.push("</tr>");
                    }
                }
                info.push("</table>");
            }
        }
        info = info.join("");
        return info
    },
    /**
     * Return infromation about all resources in room(s)
     * @param {Object} opt 
     */
    resources(opt) {
        const hide = opt.hide || false;
        const room = opt.room || null;
        let info = [];
        info.push("<table border=\"1\">");
        info.push('<caption> RESOURCE\n</caption>');
        info.push("<tr>");
        info.push("<th></th>");
        info.push("<th> AMOUNT </th>");
        info.push("</tr>");

        for (i in RESOURCES_ALL) {
            const resource = RESOURCES_ALL[i]
            if (!hide) {
                info.push("<tr>");
                info.push("<td> " + ResourceImg(resource) + " </td>");
                info.push("<td> " + AmountResource({room: room, resource: resource}) + " </td>");
                info.push("</tr>");
            } else {
                if (AmountResource({room: room, resource: resource}) > 0) {
                    info.push("<tr>");
                    info.push("<td> " + ResourceImg(resource) + " </td>");
                    info.push("<td> " + AmountResource({room: room, resource: resource}) + " </td>");
                    info.push("</tr>");
                }
            }
        }
        info = table.join("");
        return info;
    },
    /**
     * Return information about sell and buy orders on market
     */
    market() {
        const orders = Game.market.getAllOrders();
        let amountSell
        let amountBuy
        let priceSell
        let lastPriceSell
        let priceBuy
        let lastPriceBuy;

        /* 
         * TODO: test code for use less cpu

        let test;
        test = _.groupBy(orders,o=>o.type); 
        */

        result = [];
        result.push("<table border=\"1\">");
        result.push('<caption> MARKET\n</caption>');
        result.push("<tr>");
        result.push("<th></th>");
        result.push("<th> MIN SELL PRICE </th>");
        result.push("<th> AMOUNT ON SELL </th>");
        result.push("<th> MAX SELL PRICE </th>");
        result.push("<th> AMOUNT SELL ORDERS </th>");
        result.push("<th></th>");
        result.push("<th> MIN BUY PRICE </th>");
        result.push("<th> AMOUNT ON BUY </th>");
        result.push("<th> MAX BUY PRICE </th>");
        result.push("<th> AMOUNT BUY ORDERS </th>");
        result.push("</tr>");

        for (i in RESOURCES_ALL) {
            let resources = RESOURCES_ALL[i]
            let orderMinerals = orders.filter(order => order.resourceType == resources)
            let ordersSell = orderMinerals.filter(order => order.type == "sell");
            let ordersBuy = orderMinerals.filter(order => order.type == "buy");
            ordersSell.sort((a,b) => a.price - b.price);
            ordersBuy.sort((a,b) => a.price - b.price);
            if (ordersSell[0] && ordersSell[0].price) {
                priceSell = ordersSell[0].price;
                lastPriceSell = ordersSell[ordersSell.length-1].price
            } else {
                priceSell = " - ";
                lastPriceSell = " - ";
            }
            if (ordersBuy[0] && ordersBuy[0].price) {
                priceBuy = ordersBuy[0].price;
                lastPriceBuy = ordersBuy[ordersBuy.length-1].price
            } else {
                priceBuy = " - ";
                lastPriceBuy = " - ";
            }
            if (ordersSell[0] && ordersSell[0].amount) {
                amountSell = ordersSell[0].amount;
                if (amountSell > 1000) amountSell = amountSell / 1000 + "K"
            }
            else amountSell = " - ";
            if (ordersBuy[0] && ordersBuy[0].amount) {
                amountBuy = ordersBuy[ordersBuy.length-1].amount;
                if (amountBuy > 1000) amountBuy = amountBuy / 1000 + "K"

            } else amountBuy = " - ";
            result.push("<tr>");
            result.push("<td> " + ResourceImg(resources) + " </td>");
            result.push("<td> " + priceSell + " </td>");
            result.push("<td> " + amountSell + " </td>");
            result.push("<td> " + lastPriceSell + " </td>");
            result.push("<td> " + ordersSell.length + " </td>");
            result.push("<td> " + ResourceImg(resources) + " </td>");
            result.push("<td> " + priceBuy + " </td>");
            result.push("<td> " + amountBuy + " </td>");
            result.push("<td> " + lastPriceBuy + " </td>");
            result.push("<td> " + ordersBuy.length + " </td>");
            result.push("</tr>");
        }
        result = result.join("");
        return result
    }
}

/**
 * Log in game console
 */
Object.defineProperty(global, 'logger', {
    get: function() {
        return {
            err(text) { return text },
            warn(text) { return text },
            log(text) { return text }
        }
    }
});

/**
 * Print help information
 */
Object.defineProperty(global, 'help', {
    get: function() { 
        return `
         help - Print this information
         info - Print information about all your rooms. Add '.help()' to get more information.
 convert(opt) - Convert ticks to real time. Add '.help()' to get more information.
creeps({opt}) - Calculate cost and time of build creep. Add '.help()' to get more information.
        `
    }
});

/**
 * Print some king information
 */
Object.defineProperty(global, 'info', {
    get: function() { 
        return {
            help() { return help.info() },
            room(roomName) { return info.room(roomName) },
            resources(opt) { return info.resources(opt) },
            market() { return info.market() }
        }
    }
});

/**
 * Convert ticks to real time
 * TODO: add converter for real time to ticks
 */
Object.defineProperty(global, 'convert', {
    get: function() { 
        return {
            help() { return help.convert() },
            /**
             * Convert ticks to time
             * @param {Number} ticks 
             * @author Kotyara from Screeps Slack. Thank you
             */
            ticksToTime(ticks) { 
                Memory.JourloyConsole.ticks = ticks;
                Memory.JourloyConsole.timer = 'on'
                Memory.JourloyConsole.num == Game.time%1;
                return 'Wait 1 tick';
            }
        }
    }
});

/**
 * Build creeps and print information in console
 */
Object.defineProperty(global, 'creeps', {
    get: function() { 
        return {
            help() { return help.creeps() },
            build(opt) { return creeps(opt) }
        }
    }
});

/**
 * Reset console memory
 */
Object.defineProperty(global, 'memory', {
    get: function() { 
        return {
            help() { return help.mem() },
            reset() { return mem.reset() }
        }
    }
});


exports.run = function() {
    if (Memory.JourloyConsole.timer != 'off') {
        if (Game.time == Memory.JourloyConsole.num) Memory.JourloyConsole.nowDate = parseFloat(new Date().getSeconds() + '.' + new Date().getMilliseconds())
        else if (Game.time != Memory.JourloyConsole.num) {
            const tickRate = parseFloat(new Date().getSeconds() + '.' + new Date().getMilliseconds()) - Memory.JourloyConsole.nowDate;
            console.log(convertTicksToTime({ticks: Memory.JourloyConsole.ticks, rate: tickRate}));
            mem.reset();
        }
    }
};
