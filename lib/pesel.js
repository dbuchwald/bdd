const multipliers = '9731973197';

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
  return true;
}

module.exports = {
  verifyPESEL
}