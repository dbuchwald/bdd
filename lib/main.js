const chalk = require('chalk');
const dateformat = require('dateformat');
const { cli } = require('../lib/cli');
const { processPESEL } = require('../lib/pesel');

const main = function(args) {
  const result = cli(args);
  if (result.error) {
    console.log(result.errorMessage);
  } else {
    var processed = processPESEL(result.pesel, result.verifyOnly);
    if (processed.valid) {
      console.log(`Provided PESEL is ${chalk.green('valid')}`);
      if (!result.verifyOnly) {
        console.log(`Decoded date of birth is: ${chalk.green(dateformat(processed.dateOfBirth, 'dd-mm-yyyy'))}`);
        console.log(`Decoded gender is: ${chalk.green(processed.gender)}`);
      }
    } else {
      console.log(`Provided PESEL is ${chalk.red('invalid')}`);
    }
  }
}

main(process.argv);