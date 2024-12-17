#!/usr/bin/env node

const SimpleBundler = require(__dirname + "/simplebundler.js");
const args = process.argv;
const inputParameters = {};
const nodePath = args.shift();
const binPath = args.shift();
const validParameters = {
  "--dir": "dir",
  "--output": "output",
  "--ignore": "ignore",
  "--id": "id",
  "--module": "module",
};
const typeParameters = {
  "dir": "string",
  "output": "string",
  "id": "string",
  "ignore": "array",
  "module": "boolean"
};
CollectParameters: {
  let currentParameter = "_";
  IteratingParameters:
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg in validParameters) {
      currentParameter = validParameters[arg];
      continue IteratingParameters;
    }
    if (!(currentParameter in inputParameters)) {
      inputParameters[currentParameter] = [];
    }
    const currentType = typeParameters[currentParameter];
    if(currentType === "string") {
      inputParameters[currentParameter] = arg;
    } else if(currentType === "array") {
      inputParameters[currentParameter].push(arg);
    } else if(currentType === "boolean") {
      inputParameters[currentParameter] = arg === "0" ? false : arg === "false" ? false : true;
    }
  }
}
SimpleBundler.bundle(inputParameters);