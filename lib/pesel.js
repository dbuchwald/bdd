const convertStringToVector = function(string) {
  var digits = [];
  for (var i=0; i<string.length; i++) {
    digits.push(string.charCodeAt(i) - '0'.charCodeAt(0));
  }
  return digits;
}

const calculateVectorMultiplication = function(pesel) {
  const multipliers = [1,3,7,9,1,3,7,9,1,3,1];
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
  return (sum === 0);
}

const decodeDateOfBirth = function(pesel) {
  var day = pesel.substring(4,6);
  var century = pesel.substring(2,3);
  var monthNum = pesel.substring(3,4);
  var yearNum = pesel.substring(0,2);
  var month;
  var year;
  switch (century) {
    case '0':
      month = '0' + monthNum;
      year = '19' + yearNum;
      break;
    case '1':
      month = '1' + monthNum;
      year = '19' + yearNum;
      break;
    case '2':
      month = '0' + monthNum;
      year = '20' + yearNum;
      break;
    case '3':
      month = '1' + monthNum;
      year = '20' + yearNum;
      break;
    case '4':
      month = '0' + monthNum;
      year = '21' + yearNum;
      break;
    case '5':
      month = '1' + monthNum;
      year = '21' + yearNum;
      break;
    case '6':
      month = '0' + monthNum;
      year = '22' + yearNum;
      break;
    case '7':
      month = '1' + monthNum;
      year = '22' + yearNum;
      break;
    case '8':
      month = '0' + monthNum;
      year = '18' + yearNum;
      break;
    case '9':
      month = '1' + monthNum;
      year = '18' + yearNum;
      break;
  }

  return new Date(year + '-' + month + '-' + day);
}

const decodeGender = function(pesel) {
  const genderDigit = pesel.charCodeAt(9) - '0'.charCodeAt(0);

  if (genderDigit % 2 === 0) {
    return 'F';
  } else {
    return 'M';
  }
}

const verifyPESEL = function(pesel) {
  if (pesel === undefined || pesel === null) {
    return false;
  }
  if (pesel.trim().length !== 11) {
    return false;
  }
  if (!pesel.trim().match('[0-9]{11}')) {
    return false;
  }
  return verifyPESELChecksum(pesel);
}

const decodePESEL = function(pesel) {
  var result = {
    dateOfBirth: undefined,
    gender: undefined,
    valid: undefined
  }

  result.valid = verifyPESEL(pesel)

  if (result.valid) {
    result.dateOfBirth = decodeDateOfBirth(pesel.trim());
    result.gender = decodeGender(pesel.trim());
  }

  return result;
}

module.exports = {
  verifyPESEL,
  decodePESEL
}