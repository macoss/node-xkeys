var HID = require('node-hid');
var device;

module.exports = {
  devices: function(product_id) {
    device_list = HID.devices(1523,product_id);
    
    var xkeys_list = [];

    device_list.forEach(function(entry) {
      xkeys_list.push({
        path: entry.path,
        type: entry.productId
      });
    });

    return xkeys_list;
  },
  
  open: function(path) {
    if(path)
    {
      device = HID.HID(path);
      return true;

    } else {
      throw Error("The path is required");
    }
  }


};

Object.defineProperty(module.exports, "XK_24", {
  value: 1029,
  enumerable: true,
  writable: false,
  configurable: false
});

Object.defineProperty(module.exports, "XK_80", {
  value: 1089,
  enumerable: true,
  writable: false,
  configurable: false
});
