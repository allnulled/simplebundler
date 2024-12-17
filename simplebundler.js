class SimpleBundler {

  static create(...args) {
    return new this(...args);
  }

  static bundle(...args) {
    return this.create().bundle(...args);
  }

  static defaultOptions = {
    ignore: [],
    _module: true
  };

  constructor(options = {}) {
    Object.assign(this, options);
  }

  _opener(id, _module = true) {
    let js = "";
    js += "(function(factory) {\n";
    js += "  const mod = factory();\n";
    js += "  if(typeof window !== 'undefined') {\n";
    js += "    window[" + JSON.stringify(id) + "] = mod;\n";
    js += "  }\n";
    js += "  if(typeof global !== 'undefined') {\n";
    js += "    global[" + JSON.stringify(id) + "] = mod;\n";
    js += "  }\n";
    if(_module) {
      js += "  if(typeof module !== 'undefined') {\n";
      js += "    module.exports = mod;\n";
      js += "  }\n";
    }
    js += "})(function() {\n";
    return js;
  }

  _closer() {
    let js = "";
    js += "});\n";
    return js;
  }

  bundle(optionsInput = {}) {
    const options = Object.assign({}, this.constructor.defaultOptions, optionsInput);
    const { dir, output, id, ignore = [], module:_module = true } = options;
    if(typeof dir !== "string") {
      throw new Error("Required parameter «dir» to be a string");
    }
    if(typeof output !== "string") {
      throw new Error("Required parameter «output» to be a string");
    }
    if(typeof id !== "string") {
      throw new Error("Required parameter «id» to be a string");
    }
    if(!Array.isArray(ignore)) {
      throw new Error("Required parameter «ignore» to be an array");
    }
    if(typeof _module !== "boolean") {
      throw new Error("Required parameter «module» to be a boolean");
    }
    const fs = require("fs");
    const path = require("path");
    const dirpath = path.resolve(dir);
    const outputpath = path.resolve(output);
    const files = fs.readdirSync(dirpath);
    let bundling = "";
    bundling += this._opener(id, _module);
    IteratingFiles:
    for(let index=0; index<files.length; index++) {
      const file = files[index];
      if(ignore.indexOf(file) !== -1) {
        continue IteratingFiles;
      }
      const filepath = path.resolve(dirpath, file);
      if(ignore.indexOf(filepath) !== -1) {
        continue IteratingFiles;
      }
      const filename = path.basename(filepath);
      if(ignore.indexOf(filename) !== -1) {
        continue IteratingFiles;
      }
      const content = fs.readFileSync(filepath).toString();
      bundling += content + "\n";
    }
    bundling += this._closer();
    fs.writeFileSync(output, bundling, "utf8");
    return this;
  }

}

module.exports = SimpleBundler;