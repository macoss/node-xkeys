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
