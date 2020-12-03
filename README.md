# Screeps Console
[![GitHub package.json version](https://img.shields.io/github/package-json/v/jourloy/Screeps-console?style=flat-square)](https://github.com/Jourloy/Screeps-console/releases) [![GitHub issues](https://img.shields.io/github/issues/jourloy/Screeps-console?style=flat-square)](https://github.com/Jourloy/Screeps-console/issues/new)
## How run it
* Create *Console.js* and copy code into or download repository and move file
* Add in your main loop this code:
```
const jourloyConsole = require('Console').run();
```
* Now you can use commands

## Commands

### Help

`help`

Print information about all commands

### Information

`info.help()`

Print information how to use this tool

---

`info.room()`

Print information about all your rooms. You can get information about only one room by use room name as parameter: `info.room('W0N0')`
Information about storage capacity, level and progress of controller, etc.

---

`info.resources()`

Print information about all your resources in all rooms. You can hide empty resources by use parameters: `info.resources({hide:true})`. Also you can print information about resources in only one room by use room name as oarameters: `info.resources({room:'W0N0'})`

---

`info.market()`

Print information about all resources on market (price). For example:
|RESOURCE|MIN PRICE|AMOUNT|MAX PRICE|AMOUNT|
|---|---|---|---|---|
|ENERGY|0.1|1|0.2|1|

### Creep builder

`creeps.help()`

Print information how to use this tool

---

`creeps.build()`

Print information about your creep. You need type body of this creep as:

**1 method:** array

`creeps.build({bodyArray:[]})");`

In [] you need write creep's body. For example:
creeps.build({bodyArray:[MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM]})

**2 method** object

`creeps.build({body:{}})`

In {} you need write creep's body. For example:
creeps.build({body:{move:10, claim:2}})

BODY PARTS:
* MOVE - move
* WORK - work
* CARRY - carry
* ATTACK - attack
* RANGED_ATTACK - rangedAttack
* HEAL - heal
* CLAIM - claim
* TOUGH - tough

**3 method** string (Thank you, Orlet)

`creeps.build({bodyString:""})`

In "" you must write creep's body. For example:
creeps.build({bodyString:"15m3c"})

* BODY PARTS:
* MOVE - M
* WORK - W
* CARRY - C
* ATTACK - A
* RANGED_ATTACK - R
* HEAL - H
* CLAIM - X or K
* TOUGH - T

### Convert

`convert.help()`

Print information how to use this tool

---

`convert.ticksToTime()`

Convert to real time and print result. You need write amount ticks in (). For example: `convert.ticksToTime(1000)`.