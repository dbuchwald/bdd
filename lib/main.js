const chalk = require('chalk');
const dateformat = require('dateformat');
const { cli } = require('../lib/cli');
const { verifyPESEL, decodePESEL } = require('../lib/pesel');

const main = function(args) {
  const result = cli(args);
  if (result.error) {
    console.log(result.errorMessage);
  } else {
    if (result.verifyOnly) {
      if (verifyPESEL(result.pesel)) {
        console.log(`Provided PESEL is ${chalk.green('valid')}`);  
      } else {
        console.log(`Provided PESEL is ${chalk.red('invalid')}`);
      }
    } else {
      const decoded = decodePESEL(result.pesel);
      if (decoded.valid) {
        console.log(`Provided PESEL is ${chalk.green('valid')}`);
        console.log(`Decoded date of birth is: ${chalk.green(dateformat(decoded.dateOfBirth, 'dd-mm-yyyy'))}`);
        console.log(`Decoded gender is: ${chalk.green(decoded.gender)}`);
      } else {
        console.log(`Provided PESEL is ${chalk.red('invalid')}`);
      }
    }
  }
}

main(process.argv);