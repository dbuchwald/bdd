const multipliers = [9,7,3,1,9,7,3,1,9,7,3];

const convertStringToVector = function(string) {
  var digits = [];
  for (var i=0; i<string.length; i++) {
    digits.push(string.charCodeAt(i) - '0'.charCodeAt(0));
  }
  return digits;
}

const calculateVectorMultiplication = function(pesel, multipliers) {
  var result=0;
  for (var i=0; i<11; i++) {
    result += pesel[i] * multipliers[i];
  }
  result = result % 10;
  return result;
}

const verifyPESEL = function(pesel) {
  if (pesel === undefined) {
    return false;
  }
  if (pesel.trim().length != 11) {
    return false;
  }
  if (!pesel.trim().match('[0-9]{11}')) {
    return false;
  }
  const peselVector = convertStringToVector(pesel.trim());
  //console.log(peselVector);
  //console.log(multipliers);
  const sum = calculateVectorMultiplication(peselVector, multipliers);
  //console.log(sum);
  if (sum === 0 ) {
    if (peselVector[10] === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    if (peselVector[10] === 10-sum) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = {
  verifyPESEL
}