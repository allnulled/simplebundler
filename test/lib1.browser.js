(function(factory) {
  const mod = factory();
  if(typeof window !== 'undefined') {
    window["Lib1"] = mod;
  }
  if(typeof global !== 'undefined') {
    global["Lib1"] = mod;
  }
})(function() {
class One {}
class Two {}
class Three {}
if(typeof window !== "undefined") {
  window.Lib1Polyfill = 1;
}
if(typeof global !== "undefined") {
  global.Lib1Polyfill = 1;
}
return {
  One,
  Two,
  Three
};
});
