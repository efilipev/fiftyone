import { an as p, ao as v, az as g, aq as M, ap as N } from "./index-DhESz6lu.mjs";
function j(s, w, h) {
  var i;
  return p(this, void 0, void 0, function() {
    var o, c, l, d, a, b = this;
    return v(this, function(u) {
      switch (u.label) {
        case 0:
          return g() ? [2, []] : (o = M(), c = (i = w.enabledMiddleware) !== null && i !== void 0 ? i : {}, l = Object.entries(c).filter(function(r) {
            r[0];
            var e = r[1];
            return e;
          }).map(function(r) {
            var e = r[0];
            return e;
          }), d = l.map(function(r) {
            return p(b, void 0, void 0, function() {
              var e, n, m, f;
              return v(this, function(t) {
                switch (t.label) {
                  case 0:
                    e = r.replace("@segment/", ""), n = e, h && (n = btoa(e).replace(/=/g, "")), m = "".concat(o, "/middleware/").concat(n, "/latest/").concat(n, ".js.gz"), t.label = 1;
                  case 1:
                    return t.trys.push([1, 3, , 4]), [
                      4,
                      N(m)
                      // @ts-ignore
                    ];
                  case 2:
                    return t.sent(), [2, window["".concat(e, "Middleware")]];
                  case 3:
                    return f = t.sent(), s.log("error", f), s.stats.increment("failed_remote_middleware"), [3, 4];
                  case 4:
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          }), [4, Promise.all(d)]);
        case 1:
          return a = u.sent(), a = a.filter(Boolean), [2, a];
      }
    });
  });
}
export {
  j as remoteMiddlewares
};
