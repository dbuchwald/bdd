const convertStringToVector = function(string) {
  var digits = [];
  for (var i=0; i<string.length; i++) {
    digits.push(string.charCodeAt(i) - '0'.charCodeAt(0));
  }
  return digits;
}

const calculateVectorMultiplication = function(pesel) {
  const multipliers = [9,7,3,1,9,7,3,1,9,7,3];
  var result=0;
  for (var i=0; i<11; i++) {
    result += pesel[i] * multipliers[i];
  }
  result = result % 10;
  return result;
}

const verifyPESELChecksum = function(pesel) {
  const peselVector = convertStringToVector(pesel.trim());
  const sum = calculateVectorMultiplication(peselVector);
  if ((sum === 0 && peselVector[10] === 0) ||
      (sum !== 0 && peselVector[10] === 10-sum)) {
    return true;
  } else {
    return false;
  }
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
  return verifyPESELChecksum(pesel);
}

module.exports = {
  verifyPESEL
}