var HID = require('node-hid');

dev_list = HID.devices(1523, "");

if(dev_list.length) {
  device = HID.HID(1523, dev_list[0].productId);
  console.log('device opened');
  HID.close();
} else {
  console.log('No XKeys found');
}
