# Screeps Console
[![GitHub package.json version](https://img.shields.io/github/package-json/v/jourloy/Screeps-console?style=flat-square)](https://github.com/Jourloy/Screeps-console/releases) [![GitHub issues](https://img.shields.io/github/issues/jourloy/Screeps-console?style=flat-square)](https://github.com/Jourloy/Screeps-console/issues/new)
## How run it
* Create *Console.js* and copy code into or download repository and move file
* Add in your main loop this code:
```
const jourloyConsole = require('Console.js').run();
```
* Now you can use commands

## Commands

### Help

`help`

Print information about all commands

### Information

`info.help()`

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

---