var HID = require('node-hid');
var device = null;
var message = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var clearMessage = function() {
  message.forEach(function(item) {
    item = 0;
  });
};

module.exports = {
  devices: function(type) {
    device_list = HID.devices(1523,type);
    
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
      device = new HID.HID(path);
      return true;

    } else {
      throw Error("The path is required");
    }
  },

  close: function() {
    if(device) {
      device.close();
      return true;
    } else {
      throw Error("No device was open");
    }
  },

  // Open the first device of the passed in product id
  openFirst: function(type) {
    var device_list = HID.devices(1523,type);

    if(device_list.length) {
      device = new HID.HID(device_list[0].path);
    } else {
      throw Error("No devices of the type specified was found");
    }
  },

  //Toggle all the backlights
  toggleAllBacklights: function() {
    clearMessage();
    message[1] = 184;
    device.write(message);
    return true;
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
