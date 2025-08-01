var H = { exports: {} };
(function(I, P) {
  /*! For license information please see tsub.js.LICENSE.txt */
  (function(S, E) {
    I.exports = E();
  })(self, function() {
    return function() {
      var S = { 2870: function(r, t, n) {
        var e = this && this.__importDefault || function(u) {
          return u && u.__esModule ? u : { default: u };
        };
        Object.defineProperty(t, "__esModule", { value: !0 }), t.Store = t.matches = t.transform = void 0;
        var i = n(4303);
        Object.defineProperty(t, "transform", { enumerable: !0, get: function() {
          return e(i).default;
        } });
        var o = n(2370);
        Object.defineProperty(t, "matches", { enumerable: !0, get: function() {
          return e(o).default;
        } });
        var f = n(1444);
        Object.defineProperty(t, "Store", { enumerable: !0, get: function() {
          return e(f).default;
        } });
      }, 2370: function(r, t, n) {
        var e = this && this.__importDefault || function(a) {
          return a && a.__esModule ? a : { default: a };
        };
        Object.defineProperty(t, "__esModule", { value: !0 });
        var i = e(n(7843));
        function o(a, c) {
          if (!Array.isArray(a))
            return f(a, c) === !0;
          var l, A, v, g, b = a[0];
          switch (b) {
            case "!":
              return !o(a[1], c);
            case "or":
              for (var y = 1; y < a.length; y++)
                if (o(a[y], c))
                  return !0;
              return !1;
            case "and":
              for (y = 1; y < a.length; y++)
                if (!o(a[y], c))
                  return !1;
              return !0;
            case "=":
            case "!=":
              return function(p, h, w, _) {
                switch (u(p) && (p = o(p, _)), u(h) && (h = o(h, _)), typeof p == "object" && typeof h == "object" && (p = JSON.stringify(p), h = JSON.stringify(h)), w) {
                  case "=":
                    return p === h;
                  case "!=":
                    return p !== h;
                  default:
                    throw new Error("Invalid operator in compareItems: ".concat(w));
                }
              }(f(a[1], c), f(a[2], c), b, c);
            case "<=":
            case "<":
            case ">":
            case ">=":
              return function(p, h, w, _) {
                if (u(p) && (p = o(p, _)), u(h) && (h = o(h, _)), typeof p != "number" || typeof h != "number")
                  return !1;
                switch (w) {
                  case "<=":
                    return p <= h;
                  case ">=":
                    return p >= h;
                  case "<":
                    return p < h;
                  case ">":
                    return p > h;
                  default:
                    throw new Error("Invalid operator in compareNumbers: ".concat(w));
                }
              }(f(a[1], c), f(a[2], c), b, c);
            case "in":
              return function(p, h, w) {
                return h.find(function(_) {
                  return f(_, w) === p;
                }) !== void 0;
              }(f(a[1], c), f(a[2], c), c);
            case "contains":
              return v = f(a[1], c), g = f(a[2], c), typeof v == "string" && typeof g == "string" && v.indexOf(g) !== -1;
            case "match":
              return l = f(a[1], c), A = f(a[2], c), typeof l == "string" && typeof A == "string" && function(p, h) {
                var w, _;
                n: for (; p.length > 0; ) {
                  var j, k;
                  if (j = (w = s(p)).star, k = w.chunk, p = w.pattern, j && k === "")
                    return !0;
                  var N = d(k, h), U = N.t, M = N.ok, F = N.err;
                  if (F)
                    return !1;
                  if (!M || !(U.length === 0 || p.length > 0)) {
                    if (j)
                      for (var T = 0; T < h.length; T++) {
                        if (U = (_ = d(k, h.slice(T + 1))).t, M = _.ok, F = _.err, M) {
                          if (p.length === 0 && U.length > 0)
                            continue;
                          h = U;
                          continue n;
                        }
                        if (F)
                          return !1;
                      }
                    return !1;
                  }
                  h = U;
                }
                return h.length === 0;
              }(A, l);
            case "lowercase":
              var x = f(a[1], c);
              return typeof x != "string" ? null : x.toLowerCase();
            case "typeof":
              return typeof f(a[1], c);
            case "length":
              return function(p) {
                return p === null ? 0 : Array.isArray(p) || typeof p == "string" ? p.length : NaN;
              }(f(a[1], c));
            default:
              throw new Error("FQL IR could not evaluate for token: ".concat(b));
          }
        }
        function f(a, c) {
          return Array.isArray(a) ? a : typeof a == "object" ? a.value : (0, i.default)(c, a);
        }
        function u(a) {
          return !!Array.isArray(a) && ((a[0] === "lowercase" || a[0] === "length" || a[0] === "typeof") && a.length === 2 || (a[0] === "contains" || a[0] === "match") && a.length === 3);
        }
        function s(a) {
          for (var c = { star: !1, chunk: "", pattern: "" }; a.length > 0 && a[0] === "*"; )
            a = a.slice(1), c.star = !0;
          var l, A = !1;
          n: for (l = 0; l < a.length; l++)
            switch (a[l]) {
              case "\\":
                l + 1 < a.length && l++;
                break;
              case "[":
                A = !0;
                break;
              case "]":
                A = !1;
                break;
              case "*":
                if (!A)
                  break n;
            }
          return c.chunk = a.slice(0, l), c.pattern = a.slice(l), c;
        }
        function d(a, c) {
          for (var l, A, v = { t: "", ok: !1, err: !1 }; a.length > 0; ) {
            if (c.length === 0)
              return v;
            switch (a[0]) {
              case "[":
                var g = c[0];
                c = c.slice(1);
                var b = !0;
                (a = a.slice(1)).length > 0 && a[0] === "^" && (b = !1, a = a.slice(1));
                for (var y = !1, x = 0; ; ) {
                  if (a.length > 0 && a[0] === "]" && x > 0) {
                    a = a.slice(1);
                    break;
                  }
                  var p, h = "";
                  if (p = (l = m(a)).char, a = l.newChunk, l.err || (h = p, a[0] === "-" && (h = (A = m(a.slice(1))).char, a = A.newChunk, A.err)))
                    return v;
                  p <= g && g <= h && (y = !0), x++;
                }
                if (y !== b)
                  return v;
                break;
              case "?":
                c = c.slice(1), a = a.slice(1);
                break;
              case "\\":
                if ((a = a.slice(1)).length === 0)
                  return v.err = !0, v;
              default:
                if (a[0] !== c[0])
                  return v;
                c = c.slice(1), a = a.slice(1);
            }
          }
          return v.t = c, v.ok = !0, v.err = !1, v;
        }
        function m(a) {
          var c = { char: "", newChunk: "", err: !1 };
          return a.length === 0 || a[0] === "-" || a[0] === "]" || a[0] === "\\" && (a = a.slice(1)).length === 0 ? (c.err = !0, c) : (c.char = a[0], c.newChunk = a.slice(1), c.newChunk.length === 0 && (c.err = !0), c);
        }
        t.default = function(a, c) {
          if (!c)
            throw new Error("No matcher supplied!");
          switch (c.type) {
            case "all":
              return !0;
            case "fql":
              return function(l, A) {
                if (!l)
                  return !1;
                try {
                  l = JSON.parse(l);
                } catch (g) {
                  throw new Error('Failed to JSON.parse FQL intermediate representation "'.concat(l, '": ').concat(g));
                }
                var v = o(l, A);
                return typeof v == "boolean" && v;
              }(c.ir, a);
            default:
              throw new Error("Matcher of type ".concat(c.type, " unsupported."));
          }
        };
      }, 1444: function(r, t) {
        Object.defineProperty(t, "__esModule", { value: !0 });
        var n = function() {
          function e(i) {
            this.rules = [], this.rules = i || [];
          }
          return e.prototype.getRulesByDestinationName = function(i) {
            for (var o = [], f = 0, u = this.rules; f < u.length; f++) {
              var s = u[f];
              s.destinationName !== i && s.destinationName !== void 0 || o.push(s);
            }
            return o;
          }, e;
        }();
        t.default = n;
      }, 4303: function(r, t, n) {
        var e = this && this.__importDefault || function(v) {
          return v && v.__esModule ? v : { default: v };
        };
        Object.defineProperty(t, "__esModule", { value: !0 });
        var i = e(n(374)), o = e(n(7843)), f = e(n(5500)), u = n(9014), s = n(4966);
        function d(v, g) {
          a(v, g.drop, function(b, y) {
            y.forEach(function(x) {
              return delete b[x];
            });
          });
        }
        function m(v, g) {
          a(v, g.allow, function(b, y) {
            Object.keys(b).forEach(function(x) {
              y.includes(x) || delete b[x];
            });
          });
        }
        function a(v, g, b) {
          Object.entries(g).forEach(function(y) {
            var x = y[0], p = y[1], h = function(_) {
              typeof _ == "object" && _ !== null && b(_, p);
            }, w = x === "" ? v : (0, o.default)(v, x);
            Array.isArray(w) ? w.forEach(h) : h(w);
          });
        }
        function c(v, g) {
          var b = JSON.parse(JSON.stringify(v));
          for (var y in g.map)
            if (g.map.hasOwnProperty(y)) {
              var x = g.map[y], p = y.split("."), h = void 0;
              if (p.length > 1 ? (p.pop(), h = (0, o.default)(b, p.join("."))) : h = v, typeof h == "object") {
                if (x.copy) {
                  var w = (0, o.default)(b, x.copy);
                  w !== void 0 && (0, u.dset)(v, y, w);
                } else if (x.move) {
                  var _ = (0, o.default)(b, x.move);
                  _ !== void 0 && (0, u.dset)(v, y, _), (0, s.unset)(v, x.move);
                } else
                  x.hasOwnProperty("set") && (0, u.dset)(v, y, x.set);
                if (x.to_string) {
                  var j = (0, o.default)(v, y);
                  if (typeof j == "string" || typeof j == "object" && j !== null)
                    continue;
                  j !== void 0 ? (0, u.dset)(v, y, JSON.stringify(j)) : (0, u.dset)(v, y, "undefined");
                }
              }
            }
        }
        function l(v, g) {
          return !(g.sample.percent <= 0) && (g.sample.percent >= 1 || (g.sample.path ? function(y, x) {
            var p = (0, o.default)(y, x.sample.path), h = (0, i.default)(JSON.stringify(p)), w = -64, _ = [];
            A(h.slice(0, 8), _);
            for (var j = 0, k = 0; k < 64 && _[k] !== 1; k++)
              j++;
            if (j !== 0) {
              var N = [];
              A(h.slice(9, 16), N), w -= j, _.splice(0, j), N.splice(64 - j), _ = _.concat(N);
            }
            return _[63] = _[63] === 0 ? 1 : 0, (0, f.default)(parseInt(_.join(""), 2), w) < x.sample.percent;
          }(v, g) : (b = g.sample.percent, Math.random() <= b)));
          var b;
        }
        function A(v, g) {
          for (var b = 0; b < 8; b++)
            for (var y = v[b], x = 128; x >= 1; x /= 2)
              y - x >= 0 ? (y -= x, g.push(1)) : g.push(0);
        }
        t.default = function(v, g) {
          for (var b = v, y = 0, x = g; y < x.length; y++) {
            var p = x[y];
            switch (p.type) {
              case "drop":
                return null;
              case "drop_properties":
                d(b, p.config);
                break;
              case "allow_properties":
                m(b, p.config);
                break;
              case "sample_event":
                if (l(b, p.config))
                  break;
                return null;
              case "map_properties":
                c(b, p.config);
                break;
              case "hash_properties":
                break;
              default:
                throw new Error('Transformer of type "'.concat(p.type, '" is unsupported.'));
            }
          }
          return b;
        };
      }, 4966: function(r, t, n) {
        var e = this && this.__importDefault || function(o) {
          return o && o.__esModule ? o : { default: o };
        };
        Object.defineProperty(t, "__esModule", { value: !0 }), t.unset = void 0;
        var i = e(n(7843));
        t.unset = function(o, f) {
          if ((0, i.default)(o, f)) {
            for (var u = f.split("."), s = u.pop(); u.length && u[u.length - 1].slice(-1) === "\\"; )
              s = u.pop().slice(0, -1) + "." + s;
            for (; u.length; )
              o = o[f = u.shift()];
            return delete o[s];
          }
          return !0;
        };
      }, 9014: function(r, t) {
        t.dset = function(n, e, i) {
          e.split && (e = e.split("."));
          for (var o, f, u = 0, s = e.length, d = n; u < s && (f = e[u++]) !== "__proto__" && f !== "constructor" && f !== "prototype"; )
            d = d[f] = u === s ? i : typeof (o = d[f]) == typeof e ? o : 0 * e[u] != 0 || ~("" + e[u]).indexOf(".") ? {} : [];
        };
      }, 3304: function(r) {
        var t = typeof Float64Array == "function" ? Float64Array : void 0;
        r.exports = t;
      }, 7382: function(r, t, n) {
        var e, i = n(5569), o = n(3304), f = n(8482);
        e = i() ? o : f, r.exports = e;
      }, 8482: function(r) {
        r.exports = function() {
          throw new Error("not implemented");
        };
      }, 6322: function(r, t, n) {
        var e, i = n(2508), o = n(5679), f = n(882);
        e = i() ? o : f, r.exports = e;
      }, 882: function(r) {
        r.exports = function() {
          throw new Error("not implemented");
        };
      }, 5679: function(r) {
        var t = typeof Uint16Array == "function" ? Uint16Array : void 0;
        r.exports = t;
      }, 4773: function(r, t, n) {
        var e, i = n(9773), o = n(3004), f = n(3078);
        e = i() ? o : f, r.exports = e;
      }, 3078: function(r) {
        r.exports = function() {
          throw new Error("not implemented");
        };
      }, 3004: function(r) {
        var t = typeof Uint32Array == "function" ? Uint32Array : void 0;
        r.exports = t;
      }, 7980: function(r, t, n) {
        var e, i = n(8114), o = n(6737), f = n(3357);
        e = i() ? o : f, r.exports = e;
      }, 3357: function(r) {
        r.exports = function() {
          throw new Error("not implemented");
        };
      }, 6737: function(r) {
        var t = typeof Uint8Array == "function" ? Uint8Array : void 0;
        r.exports = t;
      }, 2684: function(r) {
        var t = typeof Float64Array == "function" ? Float64Array : null;
        r.exports = t;
      }, 5569: function(r, t, n) {
        var e = n(3876);
        r.exports = e;
      }, 3876: function(r, t, n) {
        var e = n(1448), i = n(2684);
        r.exports = function() {
          var o, f;
          if (typeof i != "function")
            return !1;
          try {
            f = new i([1, 3.14, -3.14, NaN]), o = e(f) && f[0] === 1 && f[1] === 3.14 && f[2] === -3.14 && f[3] != f[3];
          } catch {
            o = !1;
          }
          return o;
        };
      }, 9048: function(r, t, n) {
        var e = n(3763);
        r.exports = e;
      }, 3763: function(r) {
        var t = Object.prototype.hasOwnProperty;
        r.exports = function(n, e) {
          return n != null && t.call(n, e);
        };
      }, 7009: function(r, t, n) {
        var e = n(6784);
        r.exports = e;
      }, 6784: function(r) {
        r.exports = function() {
          return typeof Symbol == "function" && typeof Symbol("foo") == "symbol";
        };
      }, 3123: function(r, t, n) {
        var e = n(8481);
        r.exports = e;
      }, 8481: function(r, t, n) {
        var e = n(7009)();
        r.exports = function() {
          return e && typeof Symbol.toStringTag == "symbol";
        };
      }, 2508: function(r, t, n) {
        var e = n(3403);
        r.exports = e;
      }, 3403: function(r, t, n) {
        var e = n(768), i = n(9668), o = n(187);
        r.exports = function() {
          var f, u;
          if (typeof o != "function")
            return !1;
          try {
            u = new o(u = [1, 3.14, -3.14, i + 1, i + 2]), f = e(u) && u[0] === 1 && u[1] === 3 && u[2] === i - 2 && u[3] === 0 && u[4] === 1;
          } catch {
            f = !1;
          }
          return f;
        };
      }, 187: function(r) {
        var t = typeof Uint16Array == "function" ? Uint16Array : null;
        r.exports = t;
      }, 9773: function(r, t, n) {
        var e = n(2822);
        r.exports = e;
      }, 2822: function(r, t, n) {
        var e = n(2744), i = n(3899), o = n(746);
        r.exports = function() {
          var f, u;
          if (typeof o != "function")
            return !1;
          try {
            u = new o(u = [1, 3.14, -3.14, i + 1, i + 2]), f = e(u) && u[0] === 1 && u[1] === 3 && u[2] === i - 2 && u[3] === 0 && u[4] === 1;
          } catch {
            f = !1;
          }
          return f;
        };
      }, 746: function(r) {
        var t = typeof Uint32Array == "function" ? Uint32Array : null;
        r.exports = t;
      }, 8114: function(r, t, n) {
        var e = n(8066);
        r.exports = e;
      }, 8066: function(r, t, n) {
        var e = n(8279), i = n(3443), o = n(2731);
        r.exports = function() {
          var f, u;
          if (typeof o != "function")
            return !1;
          try {
            u = new o(u = [1, 3.14, -3.14, i + 1, i + 2]), f = e(u) && u[0] === 1 && u[1] === 3 && u[2] === i - 2 && u[3] === 0 && u[4] === 1;
          } catch {
            f = !1;
          }
          return f;
        };
      }, 2731: function(r) {
        var t = typeof Uint8Array == "function" ? Uint8Array : null;
        r.exports = t;
      }, 1448: function(r, t, n) {
        var e = n(1453);
        r.exports = e;
      }, 1453: function(r, t, n) {
        var e = n(6208), i = typeof Float64Array == "function";
        r.exports = function(o) {
          return i && o instanceof Float64Array || e(o) === "[object Float64Array]";
        };
      }, 9331: function(r, t, n) {
        var e = n(7980), i = { uint16: n(6322), uint8: e };
        r.exports = i;
      }, 5902: function(r, t, n) {
        var e = n(4106);
        r.exports = e;
      }, 4106: function(r, t, n) {
        var e, i, o = n(9331);
        (i = new o.uint16(1))[0] = 4660, e = new o.uint8(i.buffer)[0] === 52, r.exports = e;
      }, 768: function(r, t, n) {
        var e = n(3823);
        r.exports = e;
      }, 3823: function(r, t, n) {
        var e = n(6208), i = typeof Uint16Array == "function";
        r.exports = function(o) {
          return i && o instanceof Uint16Array || e(o) === "[object Uint16Array]";
        };
      }, 2744: function(r, t, n) {
        var e = n(2326);
        r.exports = e;
      }, 2326: function(r, t, n) {
        var e = n(6208), i = typeof Uint32Array == "function";
        r.exports = function(o) {
          return i && o instanceof Uint32Array || e(o) === "[object Uint32Array]";
        };
      }, 8279: function(r, t, n) {
        var e = n(208);
        r.exports = e;
      }, 208: function(r, t, n) {
        var e = n(6208), i = typeof Uint8Array == "function";
        r.exports = function(o) {
          return i && o instanceof Uint8Array || e(o) === "[object Uint8Array]";
        };
      }, 6315: function(r) {
        r.exports = 1023;
      }, 1686: function(r) {
        r.exports = 2147483647;
      }, 3105: function(r) {
        r.exports = 2146435072;
      }, 3449: function(r) {
        r.exports = 2147483648;
      }, 6988: function(r) {
        r.exports = -1023;
      }, 9777: function(r) {
        r.exports = 1023;
      }, 3690: function(r) {
        r.exports = -1074;
      }, 2918: function(r, t, n) {
        var e = n(4772).NEGATIVE_INFINITY;
        r.exports = e;
      }, 4165: function(r) {
        var t = Number.POSITIVE_INFINITY;
        r.exports = t;
      }, 6488: function(r) {
        r.exports = 22250738585072014e-324;
      }, 9668: function(r) {
        r.exports = 65535;
      }, 3899: function(r) {
        r.exports = 4294967295;
      }, 3443: function(r) {
        r.exports = 255;
      }, 7011: function(r, t, n) {
        var e = n(812);
        r.exports = e;
      }, 812: function(r, t, n) {
        var e = n(4165), i = n(2918);
        r.exports = function(o) {
          return o === e || o === i;
        };
      }, 1883: function(r, t, n) {
        var e = n(1797);
        r.exports = e;
      }, 1797: function(r) {
        r.exports = function(t) {
          return t != t;
        };
      }, 513: function(r, t, n) {
        var e = n(5760);
        r.exports = e;
      }, 5760: function(r) {
        r.exports = function(t) {
          return Math.abs(t);
        };
      }, 5848: function(r, t, n) {
        var e = n(677);
        r.exports = e;
      }, 677: function(r, t, n) {
        var e = n(3449), i = n(1686), o = n(7838), f = n(1921), u = n(2490), s = [0, 0];
        r.exports = function(d, m) {
          var a, c;
          return o.assign(d, s, 1, 0), a = s[0], a &= i, c = f(m), u(a |= c &= e, s[1]);
        };
      }, 5500: function(r, t, n) {
        var e = n(8397);
        r.exports = e;
      }, 8397: function(r, t, n) {
        var e = n(4165), i = n(2918), o = n(6315), f = n(9777), u = n(6988), s = n(3690), d = n(1883), m = n(7011), a = n(5848), c = n(4948), l = n(8478), A = n(7838), v = n(2490), g = [0, 0], b = [0, 0];
        r.exports = function(y, x) {
          var p, h;
          return y === 0 || d(y) || m(y) ? y : (c(g, y), x += g[1], (x += l(y = g[0])) < s ? a(0, y) : x > f ? y < 0 ? i : e : (x <= u ? (x += 52, h = 2220446049250313e-31) : h = 1, A(b, y), p = b[0], p &= 2148532223, h * v(p |= x + o << 20, b[1])));
        };
      }, 4772: function(r, t, n) {
        var e = n(7548);
        r.exports = e;
      }, 7548: function(r) {
        r.exports = Number;
      }, 8478: function(r, t, n) {
        var e = n(4500);
        r.exports = e;
      }, 4500: function(r, t, n) {
        var e = n(1921), i = n(3105), o = n(6315);
        r.exports = function(f) {
          var u = e(f);
          return (u = (u & i) >>> 20) - o | 0;
        };
      }, 2490: function(r, t, n) {
        var e = n(9639);
        r.exports = e;
      }, 4445: function(r, t, n) {
        var e, i, o;
        n(5902) === !0 ? (i = 1, o = 0) : (i = 0, o = 1), e = { HIGH: i, LOW: o }, r.exports = e;
      }, 9639: function(r, t, n) {
        var e = n(4773), i = n(7382), o = n(4445), f = new i(1), u = new e(f.buffer), s = o.HIGH, d = o.LOW;
        r.exports = function(m, a) {
          return u[s] = m, u[d] = a, f[0];
        };
      }, 5646: function(r, t, n) {
        var e;
        e = n(5902) === !0 ? 1 : 0, r.exports = e;
      }, 1921: function(r, t, n) {
        var e = n(6285);
        r.exports = e;
      }, 6285: function(r, t, n) {
        var e = n(4773), i = n(7382), o = n(5646), f = new i(1), u = new e(f.buffer);
        r.exports = function(s) {
          return f[0] = s, u[o];
        };
      }, 9024: function(r, t, n) {
        var e = n(6488), i = n(7011), o = n(1883), f = n(513);
        r.exports = function(u, s, d, m) {
          return o(u) || i(u) ? (s[m] = u, s[m + d] = 0, s) : u !== 0 && f(u) < e ? (s[m] = 4503599627370496 * u, s[m + d] = -52, s) : (s[m] = u, s[m + d] = 0, s);
        };
      }, 4948: function(r, t, n) {
        var e = n(7576), i = n(9422);
        e(i, "assign", n(9024)), r.exports = i;
      }, 9422: function(r, t, n) {
        var e = n(9024);
        r.exports = function(i) {
          return e(i, [0, 0], 1, 0);
        };
      }, 5239: function(r, t, n) {
        var e = n(4773), i = n(7382), o = n(5782), f = new i(1), u = new e(f.buffer), s = o.HIGH, d = o.LOW;
        r.exports = function(m, a, c, l) {
          return f[0] = m, a[l] = u[s], a[l + c] = u[d], a;
        };
      }, 7838: function(r, t, n) {
        var e = n(7576), i = n(4010);
        e(i, "assign", n(5239)), r.exports = i;
      }, 5782: function(r, t, n) {
        var e, i, o;
        n(5902) === !0 ? (i = 1, o = 0) : (i = 0, o = 1), e = { HIGH: i, LOW: o }, r.exports = e;
      }, 4010: function(r, t, n) {
        var e = n(5239);
        r.exports = function(i) {
          return e(i, [0, 0], 1, 0);
        };
      }, 7576: function(r, t, n) {
        var e = n(7063);
        r.exports = e;
      }, 7063: function(r, t, n) {
        var e = n(6691);
        r.exports = function(i, o, f) {
          e(i, o, { configurable: !1, enumerable: !1, writable: !1, value: f });
        };
      }, 2073: function(r) {
        var t = Object.defineProperty;
        r.exports = t;
      }, 1680: function(r) {
        var t = typeof Object.defineProperty == "function" ? Object.defineProperty : null;
        r.exports = t;
      }, 1471: function(r, t, n) {
        var e = n(1680);
        r.exports = function() {
          try {
            return e({}, "x", {}), !0;
          } catch {
            return !1;
          }
        };
      }, 6691: function(r, t, n) {
        var e, i = n(1471), o = n(2073), f = n(1309);
        e = i() ? o : f, r.exports = e;
      }, 1309: function(r) {
        var t = Object.prototype, n = t.toString, e = t.__defineGetter__, i = t.__defineSetter__, o = t.__lookupGetter__, f = t.__lookupSetter__;
        r.exports = function(u, s, d) {
          var m, a, c, l;
          if (typeof u != "object" || u === null || n.call(u) === "[object Array]")
            throw new TypeError("invalid argument. First argument must be an object. Value: `" + u + "`.");
          if (typeof d != "object" || d === null || n.call(d) === "[object Array]")
            throw new TypeError("invalid argument. Property descriptor must be an object. Value: `" + d + "`.");
          if ((a = "value" in d) && (o.call(u, s) || f.call(u, s) ? (m = u.__proto__, u.__proto__ = t, delete u[s], u[s] = d.value, u.__proto__ = m) : u[s] = d.value), c = "get" in d, l = "set" in d, a && (c || l))
            throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");
          return c && e && e.call(u, s, d.get), l && i && i.call(u, s, d.set), u;
        };
      }, 6208: function(r, t, n) {
        var e, i = n(3123), o = n(7407), f = n(4210);
        e = i() ? f : o, r.exports = e;
      }, 7407: function(r, t, n) {
        var e = n(173);
        r.exports = function(i) {
          return e.call(i);
        };
      }, 4210: function(r, t, n) {
        var e = n(9048), i = n(1403), o = n(173);
        r.exports = function(f) {
          var u, s, d;
          if (f == null)
            return o.call(f);
          s = f[i], u = e(f, i);
          try {
            f[i] = void 0;
          } catch {
            return o.call(f);
          }
          return d = o.call(f), u ? f[i] = s : delete f[i], d;
        };
      }, 173: function(r) {
        var t = Object.prototype.toString;
        r.exports = t;
      }, 1403: function(r) {
        var t = typeof Symbol == "function" ? Symbol.toStringTag : "";
        r.exports = t;
      }, 7843: function(r) {
        r.exports = function(t, n, e, i, o) {
          for (n = n.split ? n.split(".") : n, i = 0; i < n.length; i++)
            t = t ? t[n[i]] : o;
          return t === o ? e : t;
        };
      }, 374: function(r, t, n) {
        n.r(t), n.d(t, { default: function() {
          return o;
        } });
        for (var e = [], i = 0; i < 64; )
          e[i] = 0 | 4294967296 * Math.sin(++i % Math.PI);
        function o(f) {
          var u, s, d, m = [u = 1732584193, s = 4023233417, ~u, ~s], a = [], c = unescape(encodeURI(f)) + "", l = c.length;
          for (f = --l / 4 + 2 | 15, a[--f] = 8 * l; ~l; )
            a[l >> 2] |= c.charCodeAt(l) << 8 * l--;
          for (i = c = 0; i < f; i += 16) {
            for (l = m; c < 64; l = [d = l[3], u + ((d = l[0] + [u & s | ~u & d, d & u | ~d & s, u ^ s ^ d, s ^ (u | ~d)][l = c >> 4] + e[c] + ~~a[i | 15 & [c, 5 * c + 1, 3 * c + 5, 7 * c][l]]) << (l = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * l + c++ % 4]) | d >>> -l), u, s])
              u = 0 | l[1], s = l[2];
            for (c = 4; c; )
              m[--c] += l[c];
          }
          for (f = ""; c < 32; )
            f += (m[c >> 3] >> 4 * (1 ^ c++) & 15).toString(16);
          return f;
        }
      } }, E = {};
      function O(r) {
        var t = E[r];
        if (t !== void 0)
          return t.exports;
        var n = E[r] = { exports: {} };
        return S[r].call(n.exports, n, n.exports, O), n.exports;
      }
      return O.d = function(r, t) {
        for (var n in t)
          O.o(t, n) && !O.o(r, n) && Object.defineProperty(r, n, { enumerable: !0, get: t[n] });
      }, O.o = function(r, t) {
        return Object.prototype.hasOwnProperty.call(r, t);
      }, O.r = function(r) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
      }, O(2870);
    }();
  });
})(H);
var C = H.exports, J = function(I) {
  return function(P) {
    var S = P.payload, E = P.integration, O = P.next, r = new C.Store(I), t = r.getRulesByDestinationName(E);
    t.forEach(function(n) {
      for (var e = n.matchers, i = n.transformers, o = 0; o < e.length; o++)
        if (C.matches(S.obj, e[o]) && (S.obj = C.transform(S.obj, i[o]), S.obj === null))
          return O(null);
    }), O(S);
  };
};
export {
  J as tsubMiddleware
};
