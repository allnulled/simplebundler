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
  --output dist/file.js
  --ignore file4.js file7.js file9.js
  --id MyCoolAPI
  --module false
```

## Usage by API

```js
require(__dirname + "/simplebundler.js").bundle({
    dir: "test/lib1",
    output: "test/lib1.browser.js",
    module: true,
    id: "Lib1",
    ignore: [],
}).bundle({
    dir: "test/lib1",
    output: "test/lib1.node.js",
    module: true,
    id: "Lib1",
    ignore: ["only-browser.js"],
});
```

# simplebundler
