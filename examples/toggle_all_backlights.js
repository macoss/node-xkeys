var xkeys = require('../index');

xkeys.openFirst(xkeys.XK_24);
xkeys.toggleAllBacklights();
console.log('Backlights where toggled');
xkeys.close();

