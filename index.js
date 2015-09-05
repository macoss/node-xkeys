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

var HID = require('node-hid');
var device = null;
var device_type = null; // Assign the device type on open
var message = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var xk24_type = 1029;
var xk24_buttons = [0,1,2,3,4,5,8,9,10,11,12,13,16,17,18,19,20,21,24,25,26,27,28,29];
var xk24_backlight_offset = 32;
var xk80_type = 1089;
var xk80_buttons = Array.apply(null, Array(80)).map(function (_, i) {return i;});
var xk80_backlight_offset = 80;
var buttons = null; // Stores the current buttons based on the device_type.

var clearMessage = function() {
  message.forEach(function(item) {
    item = 0;
  });
};

var setButtons = function() {
	switch(device_type) {
		case xk24_type:
			buttons = xk24_buttons;
			break;
		case xk80_type:
			buttons = xk80_buttons;
	}
};

var set_blue_backlight = function(device,button, on, flash) {
	  clearMessage();
	  message[1] = 181;
	  message[2] = button;
	  if(on) {
		  if(flash) {
			  message[3] = 2; //flash
		  } else {
			  message[3] = 1; //on
		  }
	  } else {
		 message[3] = 0;
	  }
	  device.write(message);
	  return true;
};

var set_red_backlight = function(device, button, on, flash) {
	  clearMessage();
	  message[1] = 181;
	  
	  var offset = 0;
	  // Which device do we have?
	  switch(device_type) {
		 case xk24_type:
			 offset = xk24_backlight_offset;
		 	 break;
		 case xk80_type:
			 offset = xk80_backlight_offset;
	  }
	  message[2] = button + offset;

	  if(on) {
		  if(flash) {
			  message[3] = 2; //flash
		  } else {
			  message[3] = 1; //on
		  }
	  } else {
		 message[3] = 0;
	  }
	  device.write(message);
	  return true;
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
		device_list = HID.devices();
		device_list.forEach(function(entry) {
			if(entry.path == path) {
				device_type = entry.productId;
			}
		});
		if(!device_type) {
			throw Error("Device not found with that path");
		}
      device = new HID.HID(path);
	  setButtons();
      return true;

    } else {
      throw Error("The path is required");
    }
  },

  close: function() {
    if(device) {
      device.close();
      device = null;
      return true;
    } else {
      throw Error("No device was open");
    }
  },

  // Open the first device of the passed in product id
  openFirst: function(type) {
    
    if(!type) {
      throw Error('Please specify an XKeys type of either xkeys.XK_24 of xkeys.XK_80');
    }
    
    var device_list = HID.devices(1523,type);

    if(device_list.length) {
      this.open(device_list[0].path);

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
  },

  //Save EEPROM backlight state to the EEPROM
  saveEepromBacklightState: function() {
    clearMessage();
    message[1] = 199;
    message[2] = 1;
    device.write(message);
    return true;
  },

  //Set the LED state
  setLedState: function(green, red) {
    var mask = 0;
    clearMessage();
    message[1] = 186;
    //flip the bits in the mask if the LEDs are true
    if(green) {
      mask = mask | 64;
    }
    
    if(red) {
      mask = mask | 128;
    }
    message[2] = mask;
    device.write(message);
    return true;
  },

  //Set the Green LED state
  setGreenLed: function(on, flash) {
    clearMessage();
    message[1] = 179;
    message[2] = 6;
    if(on) {
      if(flash) {
        message[3] = 2;
      } else {
        message[3] = 1;
      }
    } else {
      message[3] = 0;
    }
    device.write(message);
    return true;
  },

  //Set the Red LED state
  setRedLed: function(on, flash) {
    clearMessage();
    message[1] = 179;
    message[2] = 7;
    if(on) {
      if(flash) {
        message[3] = 2;
      } else {
        message[3] = 1;
      }
    } else {
      message[3] = 0;
    }
    device.write(message);
    return true;
  },
 
  	setBlueBackLight: function(button, on, flash) {
	   set_blue_backlight(device, button, on, flash);
   	},	   

  	setRedBackLight: function(button, on, flash) {
		set_red_backlight(device, button, on, flash);
	},
	
	setAllBlueBackLights: function(on, flash) {
		buttons.forEach( function(button) {
			set_blue_backlight(device, button, on, flash);
		});
	},

	setAllRedBackLights: function(on, flash) {
		buttons.forEach( function(button) {
			set_red_backlight(device, button, on, flash);
		});
	}


};

Object.defineProperty(module.exports, "XK_24", {
  value: xk24_type,
  enumerable: true,
  writable: false,
  configurable: false
});

Object.defineProperty(module.exports, "XK_24_BUTTONS", {
  value: xk24_buttons,
  enumerable: true,
  writeable: false,
  configurable: false
});

Object.defineProperty(module.exports, "XK_80", {
  value: xk80_type,
  enumerable: true,
  writable: false,
  configurable: false
});

Object.defineProperty(module.exports, "XK_80_BUTTONS", {
  value: xk80_buttons,
  enumerable: true,
  writeable: false,
  configurable: false
});
