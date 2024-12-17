# simplebundler

Pack JS universal modules from CLI or API. But no webpack or shit. Simple.

## Install

```sh
npm i -g @allnulled/simplebundler
```

## Usage by CLI

```sh
simplebundler
  --dir directory
  --outputFile dist/file.js
  --ignoreFiles file4.js file7.js file9.js
  --globalId MyCoolAPI
  --exportAsModule false
```

## Usage by API

```js
require(__dirname + "/simplebundler.js").bundle({
    dir: "test/lib1",
    outputFile: "test/lib1.browser.js",
    exportAsModule: true,
    globalId: "Lib1",
    ignoredFiles: [],
}).bundle({
    dir: "test/lib1",
    outputFile: "test/lib1.node.js",
    exportAsModule: true,
    globalId: "Lib1",
    ignoredFiles: ["only-browser.js"],
});
```

# simplebundler
