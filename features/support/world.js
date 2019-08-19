const { setWorldConstructor } = require("cucumber");

class CustomWorld {
  constructor() {
    this.greeting = undefined;
    this.pesel = undefined;
    this.validPESEL = undefined;
    this.decodedPESEL = undefined;
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
}

setWorldConstructor(CustomWorld);