import { av as s } from "./index-DhESz6lu.mjs";
import { i as c } from "./is-plan-event-enabled-B0hQno8y.mjs";
function l(r, u) {
  var i, n;
  if (!r || !Object.keys(r))
    return {};
  var o = r.integrations ? Object.keys(r.integrations).filter(function(e) {
    return r.integrations[e] === !1;
  }) : [], a = [];
  return ((i = u.remotePlugins) !== null && i !== void 0 ? i : []).forEach(function(e) {
    o.forEach(function(t) {
      e.creationName == t && a.push(e.name);
    });
  }), ((n = u.remotePlugins) !== null && n !== void 0 ? n : []).reduce(function(e, t) {
    return t.settings.subscriptions && a.includes(t.name) && t.settings.subscriptions.forEach(
      // @ts-expect-error parameter 'sub' implicitly has an 'any' type
      function(f) {
        return e["".concat(t.name, " ").concat(f.partnerAction)] = !1;
      }
    ), e;
  }, {});
}
function g(r, u) {
  function i(n) {
    var o = r, a = n.event.event;
    if (o && a) {
      var e = o[a];
      if (c(o, e)) {
        var t = l(e, u);
        n.updateEvent("integrations", s(s(s({}, n.event.integrations), e == null ? void 0 : e.integrations), t));
      } else
        return n.updateEvent("integrations", s(s({}, n.event.integrations), { All: !1, "Segment.io": !0 })), n;
    }
    return n;
  }
  return {
    name: "Schema Filter",
    version: "0.1.0",
    isLoaded: function() {
      return !0;
    },
    load: function() {
      return Promise.resolve();
    },
    type: "before",
    page: i,
    alias: i,
    track: i,
    identify: i,
    group: i
  };
}
export {
  g as schemaFilter
};
