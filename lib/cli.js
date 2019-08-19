const arg = require('arg');
const chalk = require('chalk');
const dateformat = require('dateformat');
const { verifyPESEL, decodePESEL } = require('../lib/pesel');

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--verify': Boolean,
      '-v': '--verify',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    verify: args['--verify'] || false,
    pesel: args._[0],
  };
 }

const cli = function(args) {
  try {
    var options = parseArgumentsIntoOptions(args);
    if (options.verify) {
      if (verifyPESEL(options.pesel)) {
        console.log(`Provided PESEL is ${chalk.green('valid')}`);
      } else {
        console.log(`Provided PESEL is ${chalk.red('invalid')}`);
      }     
      
    } else {
      var decoded = decodePESEL(options.pesel);
      if (decoded.valid) {
        console.log(`Provided PESEL is ${chalk.green('valid')}`);
        console.log(`Decoded date of birth is: ${chalk.green(dateformat(decoded.dateOfBirth, 'dd-mm-yyyy'))}`);
        console.log(`Decoded gender is: ${chalk.green(decoded.gender)}`);
      } else {
        console.log(`Provided PESEL is ${chalk.red('invalid')}`);
      }
    }
  } catch (err) {
    if (err.code === 'ARG_UNKNOWN_OPTION') {
      console.log(err.message)
    } else {
      throw err;
    }
  }
}

module.exports = {
  cli
}