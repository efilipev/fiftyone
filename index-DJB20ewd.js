import { ao as __awaiter, ap as __generator } from "./index-CvS5YflC.js";
function loadLegacyVideoPlugins(analytics) {
  return __awaiter(this, void 0, void 0, function() {
    var plugins;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [
            4,
            import(
              // @ts-expect-error
              "./index.umd-ChgqCrIx.js"
            ).then((n) => n.i)
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
export {
  loadLegacyVideoPlugins
};
