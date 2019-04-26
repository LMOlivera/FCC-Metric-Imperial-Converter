var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

//13 - The 15 unit tests
suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '3.2kg';
      assert.equal(convertHandler.getNum(input),3.2);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '4/2gal';
      assert.equal(convertHandler.getNum(input),2);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '10.5/2mi';
      assert.equal(convertHandler.getNum(input), 5.25);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '2/2/2mi';
      assert.equal(convertHandler.getNum(input), "ERROR");
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'mi';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      //var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      assert.equal(convertHandler.getUnit("gal"), "gal");
      assert.equal(convertHandler.getUnit("l"), "l");
      assert.equal(convertHandler.getUnit("L"), "L");
      assert.equal(convertHandler.getUnit("mi"), "mi");
      assert.equal(convertHandler.getUnit("km"), "km");
      assert.equal(convertHandler.getUnit("lbs"), "lbs");
      assert.equal(convertHandler.getUnit("kg"), "kg");
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = 'thisIsAnError';
      assert.equal(convertHandler.getUnit(input), "ERROR");
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });  
  
  //ERROR
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    test('For Each Valid Unit Inputs', function(done) {
      assert.equal(convertHandler.getNum("1km"), "1");
      assert.equal(convertHandler.getNum("200l"), "200");
      assert.equal(convertHandler.getNum("0.65L"), "0.65");
      assert.equal(convertHandler.getNum("1/2mi"), "0.5");
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [5, 'L'];
      var expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [5, 'mi'];
      var expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [5, 'km'];
      var expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [5, 'lbs'];
      var expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [5, 'kg'];
      var expected = 11.02312;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();    
  })
})});