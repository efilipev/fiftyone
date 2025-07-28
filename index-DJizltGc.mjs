import { an as e, ao as o } from "./index-DhESz6lu.mjs";
function s(i) {
  return e(this, void 0, void 0, function() {
    var n;
    return o(this, function(t) {
      switch (t.label) {
        case 0:
          return [
            4,
            import(
              // @ts-expect-error
              "./index.umd-C1s4NvFf.mjs"
            ).then((r) => r.i)
            // This is super gross, but we need to support the `window.analytics.plugins` namespace
            // that is linked in the segment docs in order to be backwards compatible with ajs-classic
            // @ts-expect-error
          ];
        case 1:
          return n = t.sent(), i._plugins = n, [
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
