import { aK as k, aB as O } from "./index-DhESz6lu.mjs";
function f(a, i) {
  return Object.keys(i).reduce(function(e, s) {
    if (s.startsWith(a)) {
      var r = s.substr(a.length);
      e[r] = i[s];
    }
    return e;
  }, {});
}
function q(a, i) {
  var e = document.createElement("a");
  e.href = i;
  var s = e.search.slice(1), r = s.split("&").reduce(function(o, P) {
    var j = P.split("="), b = j[0], S = j[1];
    return o[b] = k(S), o;
  }, {}), t = [], p = r.ajs_uid, c = r.ajs_event, m = r.ajs_aid, n = O(a.options.useQueryString) ? a.options.useQueryString : {}, u = n.aid, l = u === void 0 ? /.+/ : u, _ = n.uid, A = _ === void 0 ? /.+/ : _;
  if (m) {
    var d = Array.isArray(r.ajs_aid) ? r.ajs_aid[0] : r.ajs_aid;
    l.test(d) && a.setAnonymousId(d);
  }
  if (p) {
    var v = Array.isArray(r.ajs_uid) ? r.ajs_uid[0] : r.ajs_uid;
    if (A.test(v)) {
      var h = f("ajs_trait_", r);
      t.push(a.identify(v, h));
    }
  }
  if (c) {
    var y = Array.isArray(r.ajs_event) ? r.ajs_event[0] : r.ajs_event, g = f("ajs_prop_", r);
    t.push(a.track(y, g));
  }
  return Promise.all(t);
}
export {
  q as queryString
};
