'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }
  
  var convertHandler = new ConvertHandler();
  
  //3 & 4 - GET with number and unit
  app.route('/api/convert')
    .get(function (req, res){
    try{
      //3 & 4 - GET with number and unit
      var input = req.query.input;    
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      /////////////////////////////////
      
      //5, 6 & 7
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      //////////
      
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      //////////
      
      //12 - numbers rounded to 5 decimals, fix the round
      res.json({initNum: round(parseFloat(initNum), 5),
                initUnit: initUnit,
                returnNum: round(parseFloat(returnNum), 5),
                returnUnit: returnUnit,
                string: toString});
      
    }catch(e){
      res.json({error: e});
    }})   
};
