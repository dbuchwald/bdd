const pesel = require('../lib/pesel');

test('When no data passed, function should return false', () => {
  expect(pesel.verifyPESEL()).toBe(false);
})

test('When empty PESEL passed, result should be false', () => {
  expect(pesel.verifyPESEL('')).toBe(false);
})

test('When spaces passed, function should return false', () => {
  expect(pesel.verifyPESEL('         ')).toBe(false);
})

test('When PESEL is not 11 characters long, function should return false', () => {
  expect(pesel.verifyPESEL('1234567890')).toBe(false);
})

test('When non-digits are passed, function should return false', () => {
  expect(pesel.verifyPESEL('abcdefghijk')).toBe(false);
})

test('When passing PESEL with invalid checksum function should return false', () => {
  expect(pesel.verifyPESEL('44051401459')).toBe(false);
})

test('When passing valid PESEL it should return true', () => {
  expect(pesel.verifyPESEL('44051401458')).toBe(true);
})

test('Function should trim leading spaces', () => {
  expect(pesel.verifyPESEL('   44051401458')).toBe(true);
})

test('Function should trim trailing spaces', () => {
  expect(pesel.verifyPESEL('44051401458   ')).toBe(true);
})