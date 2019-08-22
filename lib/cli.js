const arg = require('arg');

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
  var result = {
    error: false,
    errorMessage: undefined,
    verifyOnly: false,
    pesel: undefined
  }
  try {
    var options = parseArgumentsIntoOptions(args);
    result.verifyOnly = options.verify;
    result.pesel = options.pesel;
  } catch (err) {
    if (err.code === 'ARG_UNKNOWN_OPTION') {
      result.error = true;
      result.errorMessage = err.message;
    } else {
      throw err;
    }
  }
  return result;
}

module.exports = {
  cli
}