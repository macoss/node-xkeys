var xkeys = require('../index');

dev_list = xkeys.devices();

if(dev_list.length) {
  xkeys.open(dev_list[0].path);
  console.log('device opened');
  xkeys.close();
} else {
  console.log('No XKeys found');
}
