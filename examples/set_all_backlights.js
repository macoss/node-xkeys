/*
 *   node-xkeys is a helper library that is designed to make using a PI Engineering XKeys
 *   controller easy in Node.js applications.
 *
 *   Copyright (C) 2014 Rick Russell
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License along
 *   with this program; if not, write to the Free Software Foundation, Inc.,
 *   51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

var xkeys = require('../index');
var sleep = require('sleep');

xkeys.openFirst(xkeys.XK_24);
xkeys.setAllBlueBackLights(true);
console.log("All Blue Lights On");
sleep.sleep(2);
xkeys.setAllBlueBackLights(false);
console.log("All Blue Lights Off");
sleep.sleep(2);
xkeys.setAllRedBackLights(true);
console.log("All Red Lights On");
sleep.sleep(2);
xkeys.setAllRedBackLights(false);
console.log("All Red Lights Off");
sleep.sleep(2);
xkeys.close();

