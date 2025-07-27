"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const index = require("./index-BpoGZlgj.cjs");
function loadLegacyVideoPlugins(analytics) {
  return index.__awaiter(this, void 0, void 0, function() {
    var plugins;
    return index.__generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [
            4,
            Promise.resolve().then(() => require(
              // @ts-expect-error
              "./index.umd-BZMBMOcg.cjs"
            )).then((n) => n.index_umd)
            // This is super gross, but we need to support the `window.analytics.plugins` namespace
            // that is linked in the segment docs in order to be backwards compatible with ajs-classic
            // @ts-expect-error
          ];
        case 1:
          plugins = _a.sent();
          analytics._plugins = plugins;
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
exports.loadLegacyVideoPlugins = loadLegacyVideoPlugins;
