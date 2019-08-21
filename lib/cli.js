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
  if (args._.length !== 1) {
    throw {
      code: 'ARG_UNKNOWN_OPTION',
      message: 'Incorrect number of parameters given'
    }
  }
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
        return 0;
      } else {
        console.log(`Provided PESEL is ${chalk.red('invalid')}`);
        return 1;
      }     
    } else {
      var decoded = decodePESEL(options.pesel);
      if (decoded.valid) {
        console.log(`Provided PESEL is ${chalk.green('valid')}`);
        console.log(`Decoded date of birth is: ${chalk.green(dateformat(decoded.dateOfBirth, 'dd-mm-yyyy'))}`);
        console.log(`Decoded gender is: ${chalk.green(decoded.gender)}`);
        return 0;
      } else {
        console.log(`Provided PESEL is ${chalk.red('invalid')}`);
        return 1;
      }
    }
  } catch (err) {
    if (err.code === 'ARG_UNKNOWN_OPTION') {
      console.log(err.message)
      return 1;
    } else {
      throw err;
    }
  }
}

module.exports = {
  cli
}