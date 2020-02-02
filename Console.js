function params() {
    global.help = function (com) {
        let help = [];
        if (!com) {
            help.push("info()                              - Print information about all your rooms")
            help.push("calculateTime(time, tickRate)       - Convert ticks to real time")
            help.push("  * time                            - amount TICKS.")
            help.push("  * tickRate                        - Tick rate of server. NOT NECESSARY. Default: 2.69")
            help.push("Creeps(body, bodyString, creepRole) - Calculate cost and time of build creep")
            help.push("  * body                            - List with creep's body")
            help.push("  * bodyString                      - String with creep's body")
            help.push("  * creepRole                       - Only for my code")
            help.push("CreepBuilder(body, stringBody)      - Build creep");
            help.push("  * body, stringBody                - help(\"CreepBuilder\") for learn about this parameter");
            help.push("marketInfo()                        - Output information about basic resources at market");
        }

        if (com == "CreepBuilder") {
            help.push("CreepBuilder");
            help.push("\nGet amount BODY PARTS:");
            help.push("MOVE {move:N}");
            help.push("CARRY {carry:N}");
            help.push("WORK {work:N}");
            help.push("ATTACK {attack:N}");
            help.push("RANGED_ATTACK {rangedAttack:N}");
            help.push("HEAL {heal:N}");
            help.push("TOUGH {tough:N}");
            help.push("CLAIM {claim:N}");
            help.push("Default all parameters is 0. \nN - amount.");
            help.push("\nSo, if you want create creep with 2 WORK and 2 MOVE, you need write in console: CreepBuilder({work:2, move:2})");
            help.push("\nOr you can type:");
            help.push("m = move");
            help.push("c = carry");
            help.push("w = work");
            help.push("a = attack");
            help.push("r = rangedAttack");
            help.push("h = heal");
            help.push("t = tough");
            help.push("x = claim");
            help.push("\nSo, if you want create creep with 2 WORK and 2 MOVE, you need write in console: CreepBuilder(null, \"2w2m\") or CreepBuilder(null, \"wwmm\") or CreepBuilder(null, \"2(mw)\")");
        }

        help = help.join("\n");
        return help
    };

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
    }

    global.marketInfo = function() {
        const resources = [RESOURCE_ENERGY, RESOURCE_POWER, RESOURCE_OPS, RESOURCE_HYDROGEN, RESOURCE_OXYGEN, RESOURCE_UTRIUM, RESOURCE_LEMERGIUM, RESOURCE_KEANIUM, RESOURCE_ZYNTHIUM, RESOURCE_CATALYST, RESOURCE_GHODIUM];

        result = [];
        result.push("<table border=\"1\">");
        result.push('<caption> MARKET\n</caption>');
        result.push("<tr>");
        result.push("<th></th>");
        result.push("<th> MIN SELL PRICE </th>");
        result.push("<th> AMOUNT ON SELL, K </th>");
        result.push("<th> AVG SELL PRICE </th>");
        result.push("<th> MAX SELL PRICE </th>");
        result.push("<th> AMOUNT SELL ORDERS </th>");
        result.push("<th></th>");
        result.push("<th> MIN BUY PRICE </th>");
        result.push("<th> AMOUNT ON BUY, K </th>");
        result.push("<th> AVG BUY PRICE </th>");
        result.push("<th> MAX BUY PRICE </th>");
        result.push("<th> AMOUNT BUY ORDERS </th>");
        result.push("</tr>");

        for (i in resources) {
            const ordersSell = Game.market.getAllOrders(order => order.resourceType == resources[i] && order.type == ORDER_SELL);
            const ordersBuy = Game.market.getAllOrders(order => order.resourceType == resources[i] && order.type == ORDER_BUY)

            let averageSellPrice = 0;
            let averageBuyPrice = 0;

            for (z in ordersSell) {
                averageSellPrice += ordersSell[z].price;
            }

            for (z in ordersBuy) {
                averageBuyPrice += ordersBuy[z].price;
            }

            averageSellPrice = Math.round((averageSellPrice/ordersSell.length)*10000)/10000;
            averageBuyPrice = Math.round((averageBuyPrice/ordersBuy.length)*10000)/10000;

            ordersSell.sort((a,b) => a.price - b.price);
            ordersBuy.sort((a,b) => a.price - b.price);

            result.push("<tr>"); 
            result.push("<td> " + resourceImg(resources[i]) + " </td>"); 
            result.push("<td> " + ordersSell[0].price + " </td>");
            result.push("<td> " + ordersSell[0].amount/1000 + " </td>"); 
            result.push("<td> " + averageSellPrice + " </td>");
            result.push("<td> " + ordersSell[ordersSell.length-1].price + " </td>");
            result.push("<td> " + ordersSell.length + " </td>");
            result.push("<td> " + resourceImg(resources[i]) + " </td>"); 
            result.push("<td> " + ordersBuy[0].price + " </td>");
            result.push("<td> " + ordersBuy[0].amount/1000 + " </td>"); 
            result.push("<td> " + averageBuyPrice + " </td>");
            result.push("<td> " + ordersBuy[ordersBuy.length-1].price + " </td>");
            result.push("<td> " + ordersBuy.length + " </td>"); 
            result.push("</tr>");
        }

        result = result.join("");
        return result
    }

    global.expandBodyArrayString = function(bodyString) {
        var preg = /(\d+)\(([0-9a-zA-Z]+)\)/;
        var match; 
        do
        {
            m = preg.exec(bodyString);
            if (m)
            {
                let times = parseInt(m[1]);
                let replace = "";
                
                for (let i = 0; i < times; i++)
                    replace += m[2];
                
                bodyString = bodyString.replace(m[0], replace);
            }
        }
        while (m);
        
        return bodyString;
    },
    
    /*
     * Unpack a bodypart string into creep body part array
     *
     *  MOVE - "M"
     *  WORK - "W"
     *  CARRY - "C"
     *  ATTACK - "A"
     *  RANGED_ATTACK - "R"
     *  HEAL - "H"
     *  CLAIM - "X" or "K" --- note the special character
     *  TOUGH - "T"
     *
     * Example 1: let body = Game.utils.createCreepBodyArray("6W1C1M");
     * Example 2: let body = Game.utils.createCreepBodyArray("WWWWWWCM");
     * Example 3: let body = Game.utils.createCreepBodyArray("6WCM");
     *
     * And using the expandBodyArrayString format:
     * Example 3: let body = Game.utils.createCreepBodyArray("5(WCM)");
     */
    global.createCreepBodyArray = function(bodyString) {
        // pre-convert to lowercase
        bodyString = bodyString.toLowerCase();
        
        // it's a group expando string? (f.ex.: "5(WCM)")
        if (bodyString.indexOf('(') !== -1)
            bodyString = this.expandBodyArrayString(bodyString);
        
        // body object LUT
        var bodyObject =
        {
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
        
        // parse and expand the string into array of body bits
        var bodyArray = new Array();
        var partCounter = 0;
        
        for (let i = 0; i < bodyString.length; i++)
        {
            if (isNaN(bodyString[i]))
            {
                // it's a letter
                if (partCounter === 0)
                    partCounter = 1;
                
                let part = bodyObject[bodyString[i]];
            
                // error?
                if (part === undefined)
                {
                    partCounter = 0;
                    continue;
                }
                
                // expand!
                for (let j = 0; j < partCounter; j++)
                    bodyArray.push(part);
                
                partCounter = 0;
            }
            else
            {
                // it's a number
                partCounter = partCounter*10 + parseInt(bodyString[i]);
            }
        }
        
        return bodyArray;
    }

    global.playerLink = function() {
        let nickName = null;
        for(var i in Game.spawns) {
            nickName = Game.spawns[i].owner.username
        }
        return 'https://screeps.com/api/user/badge-svg?username=' + nickName;
    };

    global.progressBar = function(num = 0) {
        let width = 128;
        let height = 10;

        let progressBar = '<svg width="' + (width+2) + '" height="' + (height+2) + '"> <rect x="1" y="1" fill="#F93842" width="' + (width/100*num) + '" height="' + height + '"/> <rect x="1" y="1" stroke="#777777" stroke-width="2" fill="transparent" width="' + width + '" height="' + height + '"/> </svg>';
        return progressBar;
    }

    global.resourceImg = function(resourceType) {
        return '<a target="_blank" href="https://screeps.com/a/#!/market/all/' + Game.shard.name + '/' + resourceType + '"><img src ="https://s3.amazonaws.com/static.screeps.com/upload/mineral-icons/' + resourceType + '.png" /></a>';
    };

    global.calculateTime = function (time, tickRate) {
        if (tickRate) {
            ticks = tickRate;
        } else {
            ticks = 2.69;
        }
        outTime = [];
        outTime.push("Amount TICKS: " + time);
        outTime.push("Amount seconds: " + Math.round(time * ticks));
        if (time * ticks > 60) {
            outTime.push("Amount minutes: " + Math.round(time * ticks / 60));
            if (time * ticks / 60 > 60) {
                outTime.push("Amount hours: " + Math.round(time * ticks / 60 / 60));
                if (time * ticks / 60 / 60 > 24) {
                    outTime.push("Amount days: " + Math.round(time * ticks / 60 / 60 / 24));
                }
            }
        }
        outTime = outTime.join("\n");
        return outTime
    }

    global.svgBody = function (color, count = 1, width = 16, height = 16) {
        const cx = width / 2;
        const cy = height / 2;
        const r = cx;

        body = [];
        for (let i = 0; i < count; i += 1) {
            body.push('<svg width="' + width + '" height="' + height + '"> <circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" stroke="black" stroke-width="1" fill="' + color + '"/></svg>');
        }
        body = body.join("");
        return body;
    };

    global.svgCreep = function (body, width = 48, height = 48) {

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
            if (body[i] == "move" || body[i] == "carry") {
                if (body[i] == "move") {
                    moveCount++;
                } else {
                    carryCount++;
                }
            } else if (body[i] == "work") {
                workCount++;
            } else if (body[i] == "attack") {
                attackCount++
            } else if (body[i] == "ranged_attack") {
                rangedAttackCount++;
            } else if (body[i] == "heal") {
                healCount++;
            } else if (body[i] == "tough") {
                toughCount++;
            } else if (body[i] == "claim") {
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
        //body.push('<svg viewBox="0 0 ' + width + ' ' + height + '"> <circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" stroke="black" stroke-width="1" fill="#202020"/>')
        bodySvg.push('<image x="-5.7" y="-5.7" width="11.5" height="11.5" xlink:href="' + playerLink() + '"/> <circle cx="0" cy="0" r="5.8" stroke-width="0.6" stroke="black" fill="none"/>')
        body.push('</svg>');
        bodySvg = bodySvg.join("");
        return bodySvg;
    };
    
    global.CreepBuilder = function (bodyBuild, bodyString) {

        let tough = 0;
        let attack = 0;
        let rangedAttack = 0;
        let move = 0;
        let carry = 0;
        let work = 0;
        let heal = 0;
        let claim = 0;

        if (bodyBuild != null) {
            tough = bodyBuild.tough || 0;
            attack = bodyBuild.attack || 0;
            rangedAttack = bodyBuild.rangedAttack || 0;
            move = bodyBuild.move || 0;
            carry = bodyBuild.carry || 0;
            work = bodyBuild.work || 0;
            heal = bodyBuild.heal || 0;
            claim = bodyBuild.claim || 0;
        }

        if (bodyString != null) {
            body = createCreepBodyArray(bodyString);
            for (let i in body) {
                if (body[i] == "move" || body[i] == "carry") {
                    if (body[i] == "move") {
                        move++;
                    } else {
                        carry++;
                    }
                } else if (body[i] == "work") {
                    work++;
                } else if (body[i] == "attack") {
                    attack++
                } else if (body[i] == "ranged_attack") {
                    rangedAttack++;
                } else if (body[i] == "heal") {
                    heal++;
                } else if (body[i] == "tough") {
                    tough++;
                } else if (body[i] == "claim") {
                    claim++;
                }
            }
        }

        let bodyCount = tough + attack + rangedAttack + move + carry + work + heal + claim;
        if (bodyCount > 50) return "Your creep's body have more parts than can have. (" +bodyCount + " | 50)";

        body = [];
        if (tough > 0) {
            for (var i = 0; i < tough; i++) {
                body.push(TOUGH);
            }
        }
        if (attack > 0) {
            for (var i = 0; i < attack; i++) {
                body.push(ATTACK);
            }
        }
        if (rangedAttack > 0) {
            for (var i = 0; i < rangedAttack; i++) {
                body.push(RANGED_ATTACK);
            }
        }
        if (move > 0) {
            for (var i = 0; i < move; i++) {
                body.push(MOVE);
            }
        }
        if (carry > 0) {
            for (var i = 0; i < carry; i++) {
                body.push(CARRY);
            }
        }
        if (work > 0) {
            for (var i = 0; i < work; i++) {
                body.push(WORK);
            }
        }
        if (heal > 0) {
            for (var i = 0; i < heal; i++) {
                body.push(HEAL);
            }
        }
        if (claim > 0) {
            for (var i = 0; i < claim; i++) {
                body.push(CLAIM);
            }
        }
        return Creeps(body)
    }

    global.Creeps = function (body = null, bodyString = null, creepRole = null) {
        if (body || bodyString || creepRole) {
            if (bodyString) {
                body = createCreepBodyArray(bodyString);
            }
            if (creepRole && !body) {
                spawnFile = require("role.spawn");
                energy = 9999999999
                body = spawnFile.getBody(energy, creepRole);
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
                if (body[i] == "move" || body[i] == "carry") {
                    price = price + 50;
                    if (body[i] == "move") {
                        moveCount++;
                    } else {
                        carryCount++;
                        capacity = capacity + 50;
                    }
                } else if (body[i] == "work") {
                    price = price + 100;
                    workCount++;
                    harvEnergy = harvEnergy + 2;
                    harvMineral = harvMineral + 1;
                    build = build + 5;
                    upgrade++;
                } else if (body[i] == "attack") {
                    price = price + 80;
                    attackCount++
                    damageAttack += 30;
                } else if (body[i] == "ranged_attack") {
                    price = price + 150;
                    rangedAttackCount++;
                    damageRangedAttack += 10;
                } else if (body[i] == "heal") {
                    price = price + 250;
                    healCount++;
                    healShort += 12;
                    healDistance += 4;
                } else if (body[i] == "tough") {
                    price = price + 10;
                    toughCount++;
                } else if (body[i] == "claim") {
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
                if (body[i] == "move") result.push(svgBody('#A9B7C6'))
                if (body[i] == "carry") result.push(svgBody('#777777'))
                if (body[i] == "work") result.push(svgBody('#FFE56D'))
                if (body[i] == "attack") result.push(svgBody('#F93842'))
                if (body[i] == "ranged_attack") result.push(svgBody('#5D80B2'))
                if (body[i] == "heal") result.push(svgBody('#65FD62'))
                if (body[i] == "tough") result.push(svgBody('#FFFFFF'))
                if (body[i] == "claim") result.push(svgBody('#B99CFB'))
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
            return "Body undefined"
        }
    };
    global.info = function () {

        const resources = [RESOURCE_ENERGY, RESOURCE_POWER, RESOURCE_OPS, RESOURCE_HYDROGEN, RESOURCE_OXYGEN, RESOURCE_UTRIUM, RESOURCE_LEMERGIUM, RESOURCE_LEMERGIUM, RESOURCE_KEANIUM, RESOURCE_ZYNTHIUM, RESOURCE_CATALYST, RESOURCE_GHODIUM];

        let info = [];

        let spawns = [];
        for (let i in Game.rooms) {
            let room = Game.rooms[i];
            let roomSpawns = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_SPAWN } });
            spawns = spawns.concat(roomSpawns);
        }
        for (let i in spawns) {
            let spawn = spawns[i];
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
                info.push('<caption>STORAGE\n' + progressBar(Math.round(spawn.room.storage.store.getUsedCapacity() / spawn.room.storage.store.getFreeCapacity() * 100)) + '\n(' + (Math.round(spawn.room.storage.store.getUsedCapacity() / spawn.room.storage.store.getFreeCapacity() * 100)) + '%)\n\n</caption>');
                info.push("<tr>");
                info.push("<th></th>");
                info.push("<th> USED CAPACITY </th>");
                info.push("<th> FREE CAPACITY </th>");
                info.push("</tr>");

                for (z in resources) {
                    if (spawn.room.storage.store[resources[z]] > 0) {
                        info.push("<tr>"); info.push("<td> " + resourceImg(resources[z]) + "</td>"); 
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
                info.push('<caption>TERMINAL\n' + progressBar(Math.round(spawn.room.storage.store.getUsedCapacity() / spawn.room.storage.store.getFreeCapacity() * 100)) + '\n(' + (Math.round(spawn.room.storage.store.getUsedCapacity() / spawn.room.storage.store.getFreeCapacity() * 100)) + '%)\n\n</caption>');
                info.push("<tr>");
                info.push("<th></th>");
                info.push("<th> USED CAPACITY </th>");
                info.push("<th> FREE CAPACITY </th>");
                info.push("</tr>");

                for (z in resources) {
                    if (spawn.room.terminal.store[resources[z]] > 0) {
                        info.push("<tr>"); info.push("<td> " + resourceImg(resources[z]) + "</td>"); 
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
    }
}

let ConsoleSetting = {
    setting(console) {

        params();

    }
}

module.exports = ConsoleSetting;
