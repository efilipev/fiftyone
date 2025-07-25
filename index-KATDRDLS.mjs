import { aq as e, ar as a } from "./index-CP_g3VwS.mjs";
function s(i) {
  return e(this, void 0, void 0, function() {
    var r;
    return a(this, function(t) {
      switch (t.label) {
        case 0:
          return [
            4,
            import(
              // @ts-expect-error
              "./index.umd-CZ9wc5rP.mjs"
            ).then((n) => n.i)
            // This is super gross, but we need to support the `window.analytics.plugins` namespace
            // that is linked in the segment docs in order to be backwards compatible with ajs-classic
            // @ts-expect-error
          ];
        case 1:
          return r = t.sent(), i._plugins = r, [
            2
            /*return*/
          ];
      }
    });
  });
}
export {
  s as loadLegacyVideoPlugins
};
