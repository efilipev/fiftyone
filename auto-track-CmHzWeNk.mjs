import { aJ as d } from "./index-DhESz6lu.mjs";
function b(t) {
  var r = t;
  return !!(r.ctrlKey || r.shiftKey || r.metaKey || r.button && r.button == 1);
}
function w(t, r) {
  return !!(t.target === "_blank" && r);
}
function g(t, r, e, a) {
  var f = this, o = [];
  return t ? (t instanceof Element ? o = [t] : "toArray" in t ? o = t.toArray() : o = t, o.forEach(function(n) {
    n.addEventListener("click", function(i) {
      var c, u, s = r instanceof Function ? r(n) : r, v = e instanceof Function ? e(n) : e, h = n.getAttribute("href") || n.getAttributeNS("http://www.w3.org/1999/xlink", "href") || n.getAttribute("xlink:href") || ((c = n.getElementsByTagName("a")[0]) === null || c === void 0 ? void 0 : c.getAttribute("href")), l = d(f.track(s, v, a ?? {}), (u = f.settings.timeout) !== null && u !== void 0 ? u : 500);
      !w(n, h) && !b(i) && h && (i.preventDefault ? i.preventDefault() : i.returnValue = !1, l.catch(console.error).then(function() {
        window.location.href = h;
      }).catch(console.error));
    }, !1);
  }), this) : this;
}
function y(t, r, e, a) {
  var f = this;
  if (!t)
    return this;
  t instanceof HTMLFormElement && (t = [t]);
  var o = t;
  return o.forEach(function(n) {
    if (!(n instanceof Element))
      throw new TypeError("Must pass HTMLElement to trackForm/trackSubmit.");
    var i = function(u) {
      var s;
      u.preventDefault ? u.preventDefault() : u.returnValue = !1;
      var v = r instanceof Function ? r(n) : r, h = e instanceof Function ? e(n) : e, l = d(f.track(v, h, a ?? {}), (s = f.settings.timeout) !== null && s !== void 0 ? s : 500);
      l.catch(console.error).then(function() {
        n.submit();
      }).catch(console.error);
    }, c = window.jQuery || window.Zepto;
    c ? c(n).submit(i) : n.addEventListener("submit", i, !1);
  }), this;
}
export {
  y as form,
  g as link
};
