Prepare_test: {
  try {
    require("fs").unlinkSync(__dirname + "/lib1.browser.js");
    require("fs").unlinkSync(__dirname + "/lib1.node.js");
  } catch (error) {
    
  }
}
Test_api: {
  require(__dirname + "/../simplebundler.js").bundle({
    dir: __dirname + "/lib1",
    output: __dirname + "/lib1.browser.js",
    module: true,
    id: "Lib1",
    ignore: [],
  }).bundle({
    dir: __dirname + "/lib1",
    output: __dirname + "/lib1.node.js",
    module: true,
    id: "Lib1",
    ignore: ["only-browser.js"],
  });
  delete require.cache[__dirname + "/lib1.node.js"];
  const lib1node = require(__dirname + "/lib1.node.js");
  if (typeof Lib1Polyfill !== "undefined") {
    throw new Error("TestError: Not ignoring ignore");
  }
  delete require.cache[__dirname + "/lib1.browser.js"];
  const lib1browser = require(__dirname + "/lib1.browser.js");
  if (typeof Lib1Polyfill === "undefined") {
    throw new Error("TestError: Not imported correctly");
  }
  console.log("[*] API tests passed correctly.");
}

Prepare_test: {
  require("fs").unlinkSync(__dirname + "/lib1.browser.js");
  require("fs").unlinkSync(__dirname + "/lib1.node.js");
  delete global.Lib1Polyfill;
}

Test_cli: {
  const child_process = require("child_process");
  const command1 = `simplebundler --dir "lib1" --output "lib1.node.js" --global-id "Lib1" --ignored-files "only-browser.js" --export-as-module 0`;
  child_process.execSync(command1, { cwd: __dirname, stdio: [process.stdin, process.stdout, process.stderr] });
  delete require.cache[__dirname + "/lib1.node.js"];
  const lib1node = require(__dirname + "/lib1.node.js");
  if (typeof Lib1Polyfill !== "undefined") {
    throw new Error("TestError: Not ignoring ignore");
  }
  const command2 = `simplebundler --dir "lib1" --output "lib1.browser.js" --global-id "Lib1" --ignored-files 0 --export-as-module 0`;
  child_process.execSync(command2, { cwd: __dirname, stdio: [process.stdin, process.stdout, process.stderr] });
  delete require.cache[__dirname + "/lib1.browser.js"];
  const lib1browser = require(__dirname + "/lib1.browser.js");
  if (typeof Lib1Polyfill === "undefined") {
    throw new Error("TestError: Not imported correctly");
  }
  console.log("[*] CLI tests passed correctly.");
}