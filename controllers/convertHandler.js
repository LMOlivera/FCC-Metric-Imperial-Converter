/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }
  
  this.getNum = function(input) {
    let numStr = "";
    let regex = /\d/;
    let fractions = 0;
    for(let i = 0; i < input.length; i++) {
      if((regex.test(input[i])) ||input[i] == "." || input[i] == "/"){
        numStr += input[i];        
        if(input[i] == "/"){
          fractions++;
        };
      }
    }
    if (numStr == ""){
      //11 - 1 if no parameter given
      return parseInt("1");
    }
    
    try{
      //12 - Round to 5 decimals
      if(fractions > 1) return "ERROR";
      let result = round(parseFloat(eval(numStr)),5);
      return result;    
    }catch(e){
      return "ERROR";
    }
  };
  
  this.getUnit = function(input) {
    let unit = "";
    let regex = /\d/;
    for(let i = 0; i < input.length; i++) {
      if (!((regex.test(input[i])) ||
         input[i] == "." || input[i] == "/")){
        unit += input[i];        
      }
    }
    
    //Check unit is correct
    if((((unit[0] == "g" & unit[1] == "a" & unit[2] == "l") & unit.length == 3)
       || ((unit[0] == "l" & unit[1] == "b" & unit[2] == "s") & unit.length == 3)
       || ((unit[0] == "m" & unit[1] == "i") & unit.length == 2)
       || ((unit[0] == "k" & unit[1] == "g") & unit.length == 2)
       || ((unit[0] == "k" & unit[1] == "m") & unit.length == 2)
       || ((unit[0] == "l" || unit[0] == "L") & unit.length == 1))){
      return unit;
    }
    return "ERROR";
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit) {
      case "gal":
        result = "l";
        break;
      case "lbs":
        result = "kg";
        break;
      case "mi":
        result = "km";
        break;
      case "kg":
        result = "lbs"; 
        break;
      case "km":
        result = "mi"; 
        break;
      case "l":
      case "L":
        result = "gal";
        break;
      default:
        throw "Invalid unit";
        break;
    }  
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    if(initNum == "ERROR" && initUnit == "ERROR"){
      //10 - Double error
      throw "Invalid number and unit";
    }else if (initNum == "ERROR")
    {
      //9 - Invalid number
      throw "Invalid number";
    }else if (initUnit == "ERROR"){
      // 8 - Invalid Unit
      throw "Invalid unit";
    }
    
    let result;
    switch(initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "kg":
        result = initNum / lbsToKg; 
        break;
      case "km":
        result = initNum / miToKm; 
        break;
      case "l":
      case "L":
        result = initNum / galToL;
        break;
      default:
        throw "Invalid unit";
        break;
    }        
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    //12 - Round to 5 decimals
    return (initNum + " " + initUnit + " converts to " + round(parseFloat(returnNum), 5) + " " + returnUnit);
  };
  
}

module.exports = ConvertHandler;
