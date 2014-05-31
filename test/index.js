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

var should = require('should'),
  xkeys = require('../index');

describe('#devices', function() {
  it('Should be a function', function() {
    var device_list = xkeys.devices("");
    device_list.should.be.an.Array;
  });
});

describe('#XK_24', function() {
  it('should equal the product id of 1029', function() {
    xkeys.XK_24.should.eql(1029);
  });

  it('should not change', function() {
    xkeys.XK_24 = 1234;
    xkeys.XK_24.should.not.eql(1234);
  });
});

describe('#XK_80', function() {
  it('should equal the product id of 1089', function() {
    xkeys.XK_80.should.eql(1089);
  });

  it('should not change', function() {
    var value = 1234;
    xkeys.XK_80 = value;
    xkeys.XK_80.should.not.eql(value);
  });
});

describe('#XK_24_BUTTONS', function() {

  it('should have 24 elements', function() {
    xkeys.XK_24_BUTTONS.length.should.eql(24);
  });

  it('should not change', function() {
    xkeys.XK_24_BUTTONS = [];
    xkeys.XK_24_BUTTONS.should.not.eql([]);
  });

  it('should not have elements with a value of 6,7,14,15,22,23', function() {
    var test_list = [6,7,14,15,22,23];
    test_list.forEach(function(item) {
      xkeys.XK_24_BUTTONS.indexOf(item).should.eql(-1);
    });
  });

});

describe('#XK_80_BUTTONS', function() {
  it('should have 80 elements', function() {
    xkeys.XK_80_BUTTONS.length.should.eql(80);
  });
  it('should not change', function() {
    xkeys.XK_80_BUTTONS = [];
    xkeys.XK_80_BUTTONS.should.not.eql([]);
  });
});

describe('#open', function() {
  it('should return and error if path is empty', function() {
    xkeys.open.should.throwError('The path is required');
    xkeys.open.bind(null, 'testing123').should.not.throwError('The path is required');
  });

  it('should connect to a device if one is connected', function() {
    var dev_list = xkeys.devices("");
    if(dev_list.length) {
      xkeys.open(dev_list[0].path).should.be.true;
    } else {
      return true.should.be.true;
    }
  });
});

describe('#openFirst', function() {
  it('should require a type to open', function() {
    xkeys.openFirst.should.throwError();
  });
});

describe('#close', function() {
  it('should return an error if the device is null', function() {
    xkeys.close.should.throwError('No device was open');
  });
  
  it('should close a device if one is connected', function() {
    var dev_list = xkeys.devices("");
    if(dev_list.length) {
      xkeys.open(dev_list[0].path)
      xkeys.close.should.be.true;
    } else {
      return true.should.be.true;
    }
  });
});

describe('#toggleAllBacklights', function() {
  it('should return true if a device is found', function() {
    var dev_list = xkeys.devices("");
    if(dev_list.length) {
      xkeys.open(dev_list[0].path);
      xkeys.toggleAllBacklights();
      xkeys.close();
    } else {
      return true.should.be.true;
    }
  });
});

