const { setWorldConstructor } = require("cucumber");

class CustomWorld {
  constructor() {
    this.greeting = undefined;
    this.pesel = undefined;
    this.validPESEL = undefined;
    this.decodedPESEL = undefined;
    this.args = ['node', 'pesel'];
    this.result = undefined;
  }

  setGreeting(text) {
    this.greeting = text;
  }

  setPESEL(pesel) {
    this.pesel = pesel;
  }

  setValid(flag) {
    this.validPESEL = flag;
  }

  setDecoded(decoded) {
    this.decodedPESEL = decoded;
  }

  addParameter(arg) {
    this.args.push(arg);
  }

  setResult(result) {
    this.result = result;
  }
}

setWorldConstructor(CustomWorld);