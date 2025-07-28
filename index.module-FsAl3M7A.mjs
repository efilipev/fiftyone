import { aa as ge, R as me, d as pe, D as ye, a8 as he, ab as F, ac as ve, ad as _e, ae as C, I as R, af as be, ag as we, ah as Ae, ai as Ee, aj as V, V as Se, ak as Oe, al as P, am as Te, r as Y } from "./index-DhESz6lu.mjs";
import l, { useCallback as D, useMemo as K, useEffect as Z, useState as B } from "react";
import "react-dom";
const Ce = {
  dev: "MrAGfUuvQq2FOJIgAgbwgjMQgRNgruRa",
  // oss-dev
  prod: "SjCRPH72QTHlVhFZIT5067V9rhuq80Dl"
  // oss-prod
}, Ie = `import fiftyone as fo

# Name of an existing dataset
name = "quickstart"

dataset = fo.load_dataset(name)

# Launch a new App session
session = fo.launch_app(dataset)

# If you already have an active App session
# session.dataset = dataset`, Le = `import fiftyone as fo

dataset = fo.load_dataset("$CURRENT_DATASET_NAME")

samples = []
for filepath, label in zip(filepaths, labels):
    sample = fo.Sample(filepath=filepath)
    sample["ground_truth"] = fo.Classification(label=label)
    samples.append(sample)

dataset.add_samples(samples)`, Pe = `import fiftyone as fo

# A name for the dataset
name = "my-dataset"

# The directory containing the data to import
dataset_dir = "/path/to/data"

# The type of data being imported
dataset_type = fo.types.COCODetectionDataset

dataset = fo.Dataset.from_dir(
    dataset_dir=dataset_dir,
    dataset_type=dataset_type,
    name=name,
)`, De = {
  SELECT_DATASET: {
    title: "No dataset selected",
    code: Ie,
    subtitle: "Select a dataset with dataset selector above or",
    codeTitle: "Select a dataset with code",
    codeSubtitle: "Use Python or command line tools to set dataset for the current session",
    learnMoreLink: "https://docs.voxel51.com/user_guide/app.html",
    learnMoreLabel: "about using the Fiftyone App"
  },
  ADD_SAMPLE: {
    title: "No samples yet",
    code: Le,
    subtitle: "Add samples to this dataset with code or",
    codeTitle: "Add samples with code",
    codeSubtitle: "Use Python or command line tools to add sample to this dataset",
    learnMoreLink: "https://docs.voxel51.com/user_guide/dataset_creation/index.html#custom-formats",
    learnMoreLabel: "about loading data into FiftyOne"
  },
  ADD_DATASET: {
    title: "No datasets yet",
    code: Pe,
    subtitle: "Add a dataset to FiftyOne with code or",
    codeTitle: "Create dataset with code",
    codeSubtitle: "Use Python or command line tools to add dataset to FiftyOne",
    learnMoreLink: "https://docs.voxel51.com/user_guide/dataset_creation/index.html",
    learnMoreLabel: "about loading data into FiftyOne"
  }
}, Q = "@voxel51/utils/create_dataset", H = "@voxel51/io/import_samples", ke = "https://github.com/voxel51/fiftyone-plugins/tree/main/plugins/utils", xe = "https://github.com/voxel51/fiftyone-plugins/tree/main/plugins/io", Fe = "@voxel51/utils", Me = "@voxel51/io";
function Je(o) {
  const { mode: u } = o, { isLoading: d } = ge(!0), m = me(pe);
  if (!u) return null;
  if (d) return /* @__PURE__ */ l.createElement(ye, null, "Pixelating...");
  const { code: p, codeTitle: h, learnMoreLabel: _, learnMoreLink: s, title: g } = De[u], f = p.replace("$CURRENT_DATASET_NAME", m), c = u === "SELECT_DATASET";
  return /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(he, null), /* @__PURE__ */ l.createElement(
    F,
    {
      spacing: 6,
      divider: /* @__PURE__ */ l.createElement(ve, { sx: { width: "100%" } }),
      sx: {
        fontWeight: "normal",
        alignItems: "center",
        width: "100%",
        py: 8,
        overflow: "auto"
      },
      className: _e
    },
    /* @__PURE__ */ l.createElement(F, { alignItems: "center", spacing: 1 }, /* @__PURE__ */ l.createElement(C, { sx: { fontSize: 16 } }, g), c && /* @__PURE__ */ l.createElement(C, { color: "text.secondary" }, "You can use the selector above to open an existing dataset"), /* @__PURE__ */ l.createElement(Ge, { ...o }), !c && /* @__PURE__ */ l.createElement(C, { color: "text.secondary" }, /* @__PURE__ */ l.createElement(
      R,
      {
        href: s,
        target: "_blank",
        sx: {
          textDecoration: "underline",
          ":hover": { textDecoration: "none" }
        }
      },
      "Learn more"
    ), " ", _)),
    /* @__PURE__ */ l.createElement(F, { alignItems: "center" }, /* @__PURE__ */ l.createElement(C, { sx: { fontSize: 16 } }, h), /* @__PURE__ */ l.createElement(C, { sx: { pb: 2 }, color: "text.secondary" }, "You can use Python to ", u === "ADD_DATASET" && /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(G, { href: s, target: "_blank" }, "load data"), " into FiftyOne"), c && /* @__PURE__ */ l.createElement(l.Fragment, null, "load a dataset in the App"), u === "ADD_SAMPLE" && /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(G, { href: s, target: "_blank" }, "add samples"), " to this dataset")), /* @__PURE__ */ l.createElement(
      be,
      {
        tabs: [{ id: "python", label: "Python", code: f }]
      }
    ))
  ));
}
function Ge(o) {
  const { mode: u } = o, d = we(), m = u === "ADD_SAMPLE", p = D(
    (T) => Array.isArray(d.choices) ? d.choices.some((L) => (L == null ? void 0 : L.value) === T) : !1,
    [d]
  ), h = K(() => m ? !1 : p(Q), [m, p]), _ = K(() => m ? p(H) : !1, [m, p]), s = m ? _ : h, g = m ? xe : ke, f = m ? Me : Fe, c = m ? "add samples to this dataset" : "create a new dataset", I = m ? "add samples to datasets" : "create datasets", O = m ? H : Q;
  return /* @__PURE__ */ l.createElement(C, { color: "text.secondary" }, s ? /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(Re, { uri: O }), "to ", c) : /* @__PURE__ */ l.createElement(l.Fragment, null, "Did you know? You can ", I, " in the App by installing the ", /* @__PURE__ */ l.createElement(G, { href: g, target: "_blank" }, f), " plugin"), ", or ", /* @__PURE__ */ l.createElement(J, { onClick: d.toggle }, "browse operations"), " for other options");
}
function Re(o) {
  const { uri: u, prompt: d = !0 } = o, m = Ae(), { execute: p } = Ee(u), h = D(() => {
    d ? m(u) : p({});
  }, [d, m, u, p]);
  return /* @__PURE__ */ l.createElement(J, { onClick: h }, "Click here");
}
function J(o) {
  return /* @__PURE__ */ l.createElement(
    V,
    {
      ...o,
      sx: {
        p: 0,
        textTransform: "none",
        fontSize: "inherit",
        lineHeight: "inherit",
        verticalAlign: "baseline",
        color: (u) => u.palette.text.primary,
        textDecoration: "underline",
        ...(o == null ? void 0 : o.sx) || {}
      }
    }
  );
}
function G(o) {
  return /* @__PURE__ */ l.createElement(
    R,
    {
      ...o,
      sx: {
        textDecoration: "underline",
        ":hover": { textDecoration: "none" },
        ...(o == null ? void 0 : o.sx) || {}
      }
    }
  );
}
const X = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "NavFragment",
  selections: [
    {
      args: null,
      kind: "FragmentSpread",
      name: "Analytics"
    },
    {
      args: null,
      kind: "FragmentSpread",
      name: "NavDatasets"
    }
  ],
  type: "Query",
  abstractKey: null
};
X.hash = "b4c1e5cfb810c869d7f48d036fc48cad";
const $ = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "Analytics",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "context",
      storageKey: null
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "dev",
      storageKey: null
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "doNotTrack",
      storageKey: null
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "uid",
      storageKey: null
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "version",
      storageKey: null
    }
  ],
  type: "Query",
  abstractKey: null
};
$.hash = "042d0c5e3b5c588fc852e8a26d260126";
var ee = {}, te = {}, ne = {};
(function(o) {
  Object.defineProperty(o, "__esModule", {
    value: !0
  }), o.default = void 0;
  var u = function() {
    for (var p = arguments.length, h = new Array(p), _ = 0; _ < p; _++)
      h[_] = arguments[_];
    if (typeof window < "u") {
      var s;
      typeof window.gtag > "u" && (window.dataLayer = window.dataLayer || [], window.gtag = function() {
        window.dataLayer.push(arguments);
      }), (s = window).gtag.apply(s, h);
    }
  }, d = u;
  o.default = d;
})(ne);
var ae = {};
(function(o) {
  Object.defineProperty(o, "__esModule", {
    value: !0
  }), o.default = _;
  var u = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
  function d(s) {
    return s.toString().trim().replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(g, f, c) {
      return f > 0 && f + g.length !== c.length && g.search(u) > -1 && c.charAt(f - 2) !== ":" && (c.charAt(f + g.length) !== "-" || c.charAt(f - 1) === "-") && c.charAt(f - 1).search(/[^\s-]/) < 0 ? g.toLowerCase() : g.substr(1).search(/[A-Z]|\../) > -1 ? g : g.charAt(0).toUpperCase() + g.substr(1);
    });
  }
  function m(s) {
    return typeof s == "string" && s.indexOf("@") !== -1;
  }
  var p = "REDACTED (Potential Email Address)";
  function h(s) {
    return m(s) ? (console.warn("This arg looks like an email address, redacting."), p) : s;
  }
  function _() {
    var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, f = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, c = s || "";
    return g && (c = d(s)), f && (c = h(c)), c;
  }
})(ae);
(function(o) {
  Object.defineProperty(o, "__esModule", {
    value: !0
  }), o.default = o.GA4 = void 0;
  var u = _(ne), d = _(ae), m = ["eventCategory", "eventAction", "eventLabel", "eventValue", "hitType"], p = ["title", "location"], h = ["page", "hitType"];
  function _(a) {
    return a && a.__esModule ? a : { default: a };
  }
  function s(a, e) {
    if (a == null) return {};
    var t = g(a, e), n, r;
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(a);
      for (r = 0; r < i.length; r++)
        n = i[r], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(a, n) && (t[n] = a[n]);
    }
    return t;
  }
  function g(a, e) {
    if (a == null) return {};
    var t = {}, n = Object.keys(a), r, i;
    for (i = 0; i < n.length; i++)
      r = n[i], !(e.indexOf(r) >= 0) && (t[r] = a[r]);
    return t;
  }
  function f(a) {
    "@babel/helpers - typeof";
    return f = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
      return typeof e;
    } : function(e) {
      return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, f(a);
  }
  function c(a) {
    return T(a) || O(a) || N(a) || I();
  }
  function I() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function O(a) {
    if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null) return Array.from(a);
  }
  function T(a) {
    if (Array.isArray(a)) return x(a);
  }
  function L(a, e) {
    var t = Object.keys(a);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(a);
      e && (n = n.filter(function(r) {
        return Object.getOwnPropertyDescriptor(a, r).enumerable;
      })), t.push.apply(t, n);
    }
    return t;
  }
  function S(a) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e] != null ? arguments[e] : {};
      e % 2 ? L(Object(t), !0).forEach(function(n) {
        b(a, n, t[n]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : L(Object(t)).forEach(function(n) {
        Object.defineProperty(a, n, Object.getOwnPropertyDescriptor(t, n));
      });
    }
    return a;
  }
  function re(a, e) {
    return le(a) || ie(a, e) || N(a, e) || oe();
  }
  function oe() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function N(a, e) {
    if (a) {
      if (typeof a == "string") return x(a, e);
      var t = Object.prototype.toString.call(a).slice(8, -1);
      if (t === "Object" && a.constructor && (t = a.constructor.name), t === "Map" || t === "Set") return Array.from(a);
      if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return x(a, e);
    }
  }
  function x(a, e) {
    (e == null || e > a.length) && (e = a.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = a[t];
    return n;
  }
  function ie(a, e) {
    var t = a == null ? null : typeof Symbol < "u" && a[Symbol.iterator] || a["@@iterator"];
    if (t != null) {
      var n, r, i, y, v = [], w = !0, A = !1;
      try {
        if (i = (t = t.call(a)).next, e !== 0) for (; !(w = (n = i.call(t)).done) && (v.push(n.value), v.length !== e); w = !0) ;
      } catch (E) {
        A = !0, r = E;
      } finally {
        try {
          if (!w && t.return != null && (y = t.return(), Object(y) !== y)) return;
        } finally {
          if (A) throw r;
        }
      }
      return v;
    }
  }
  function le(a) {
    if (Array.isArray(a)) return a;
  }
  function se(a, e) {
    if (!(a instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function ue(a, e) {
    for (var t = 0; t < e.length; t++) {
      var n = e[t];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(a, U(n.key), n);
    }
  }
  function ce(a, e, t) {
    return e && ue(a.prototype, e), Object.defineProperty(a, "prototype", { writable: !1 }), a;
  }
  function b(a, e, t) {
    return e = U(e), e in a ? Object.defineProperty(a, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : a[e] = t, a;
  }
  function U(a) {
    var e = de(a, "string");
    return f(e) === "symbol" ? e : String(e);
  }
  function de(a, e) {
    if (f(a) !== "object" || a === null) return a;
    var t = a[Symbol.toPrimitive];
    if (t !== void 0) {
      var n = t.call(a, e || "default");
      if (f(n) !== "object") return n;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (e === "string" ? String : Number)(a);
  }
  var q = /* @__PURE__ */ function() {
    function a() {
      var e = this;
      se(this, a), b(this, "reset", function() {
        e.isInitialized = !1, e._testMode = !1, e._currentMeasurementId, e._hasLoadedGA = !1, e._isQueuing = !1, e._queueGtag = [];
      }), b(this, "_gtag", function() {
        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
          n[r] = arguments[r];
        e._testMode || e._isQueuing ? e._queueGtag.push(n) : u.default.apply(void 0, n);
      }), b(this, "_loadGA", function(t, n) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "https://www.googletagmanager.com/gtag/js";
        if (!(typeof window > "u" || typeof document > "u") && !e._hasLoadedGA) {
          var i = document.createElement("script");
          i.async = !0, i.src = "".concat(r, "?id=").concat(t), n && i.setAttribute("nonce", n), document.body.appendChild(i), window.dataLayer = window.dataLayer || [], window.gtag = function() {
            window.dataLayer.push(arguments);
          }, e._hasLoadedGA = !0;
        }
      }), b(this, "_toGtagOptions", function(t) {
        if (t) {
          var n = {
            // Old https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#cookieUpdate
            // New https://developers.google.com/analytics/devguides/collection/gtagjs/cookies-user-id#cookie_update
            cookieUpdate: "cookie_update",
            cookieExpires: "cookie_expires",
            cookieDomain: "cookie_domain",
            cookieFlags: "cookie_flags",
            // must be in set method?
            userId: "user_id",
            clientId: "client_id",
            anonymizeIp: "anonymize_ip",
            // https://support.google.com/analytics/answer/2853546?hl=en#zippy=%2Cin-this-article
            contentGroup1: "content_group1",
            contentGroup2: "content_group2",
            contentGroup3: "content_group3",
            contentGroup4: "content_group4",
            contentGroup5: "content_group5",
            // https://support.google.com/analytics/answer/9050852?hl=en
            allowAdFeatures: "allow_google_signals",
            allowAdPersonalizationSignals: "allow_ad_personalization_signals",
            nonInteraction: "non_interaction",
            page: "page_path",
            hitCallback: "event_callback"
          }, r = Object.entries(t).reduce(function(i, y) {
            var v = re(y, 2), w = v[0], A = v[1];
            return n[w] ? i[n[w]] = A : i[w] = A, i;
          }, {});
          return r;
        }
      }), b(this, "initialize", function(t) {
        var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        if (!t)
          throw new Error("Require GA_MEASUREMENT_ID");
        var r = typeof t == "string" ? [{
          trackingId: t
        }] : t;
        e._currentMeasurementId = r[0].trackingId;
        var i = n.gaOptions, y = n.gtagOptions, v = n.nonce, w = n.testMode, A = w === void 0 ? !1 : w, E = n.gtagUrl;
        if (e._testMode = A, A || e._loadGA(e._currentMeasurementId, v, E), e.isInitialized || (e._gtag("js", /* @__PURE__ */ new Date()), r.forEach(function(k) {
          var z = S(S(S({}, e._toGtagOptions(S(S({}, i), k.gaOptions))), y), k.gtagOptions);
          Object.keys(z).length ? e._gtag("config", k.trackingId, z) : e._gtag("config", k.trackingId);
        })), e.isInitialized = !0, !A) {
          var j = c(e._queueGtag);
          for (e._queueGtag = [], e._isQueuing = !1; j.length; ) {
            var W = j.shift();
            e._gtag.apply(e, c(W)), W[0] === "get" && (e._isQueuing = !0);
          }
        }
      }), b(this, "set", function(t) {
        if (!t) {
          console.warn("`fieldsObject` is required in .set()");
          return;
        }
        if (f(t) !== "object") {
          console.warn("Expected `fieldsObject` arg to be an Object");
          return;
        }
        Object.keys(t).length === 0 && console.warn("empty `fieldsObject` given to .set()"), e._gaCommand("set", t);
      }), b(this, "_gaCommandSendEvent", function(t, n, r, i, y) {
        e._gtag("event", n, S(S({
          event_category: t,
          event_label: r,
          value: i
        }, y && {
          non_interaction: y.nonInteraction
        }), e._toGtagOptions(y)));
      }), b(this, "_gaCommandSendEventParameters", function() {
        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
          n[r] = arguments[r];
        if (typeof n[0] == "string")
          e._gaCommandSendEvent.apply(e, c(n.slice(1)));
        else {
          var i = n[0], y = i.eventCategory, v = i.eventAction, w = i.eventLabel, A = i.eventValue;
          i.hitType;
          var E = s(i, m);
          e._gaCommandSendEvent(y, v, w, A, E);
        }
      }), b(this, "_gaCommandSendTiming", function(t, n, r, i) {
        e._gtag("event", "timing_complete", {
          name: n,
          value: r,
          event_category: t,
          event_label: i
        });
      }), b(this, "_gaCommandSendPageview", function(t, n) {
        if (n && Object.keys(n).length) {
          var r = e._toGtagOptions(n), i = r.title, y = r.location, v = s(r, p);
          e._gtag("event", "page_view", S(S(S(S({}, t && {
            page_path: t
          }), i && {
            page_title: i
          }), y && {
            page_location: y
          }), v));
        } else t ? e._gtag("event", "page_view", {
          page_path: t
        }) : e._gtag("event", "page_view");
      }), b(this, "_gaCommandSendPageviewParameters", function() {
        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
          n[r] = arguments[r];
        if (typeof n[0] == "string")
          e._gaCommandSendPageview.apply(e, c(n.slice(1)));
        else {
          var i = n[0], y = i.page;
          i.hitType;
          var v = s(i, h);
          e._gaCommandSendPageview(y, v);
        }
      }), b(this, "_gaCommandSend", function() {
        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
          n[r] = arguments[r];
        var i = typeof n[0] == "string" ? n[0] : n[0].hitType;
        switch (i) {
          case "event":
            e._gaCommandSendEventParameters.apply(e, n);
            break;
          case "pageview":
            e._gaCommandSendPageviewParameters.apply(e, n);
            break;
          case "timing":
            e._gaCommandSendTiming.apply(e, c(n.slice(1)));
            break;
          case "screenview":
          case "transaction":
          case "item":
          case "social":
          case "exception":
            console.warn("Unsupported send command: ".concat(i));
            break;
          default:
            console.warn("Send command doesn't exist: ".concat(i));
        }
      }), b(this, "_gaCommandSet", function() {
        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
          n[r] = arguments[r];
        typeof n[0] == "string" && (n[0] = b({}, n[0], n[1])), e._gtag("set", e._toGtagOptions(n[0]));
      }), b(this, "_gaCommand", function(t) {
        for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
          r[i - 1] = arguments[i];
        switch (t) {
          case "send":
            e._gaCommandSend.apply(e, r);
            break;
          case "set":
            e._gaCommandSet.apply(e, r);
            break;
          default:
            console.warn("Command doesn't exist: ".concat(t));
        }
      }), b(this, "ga", function() {
        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
          n[r] = arguments[r];
        if (typeof n[0] == "string")
          e._gaCommand.apply(e, n);
        else {
          var i = n[0];
          e._gtag("get", e._currentMeasurementId, "client_id", function(y) {
            e._isQueuing = !1;
            var v = e._queueGtag;
            for (i({
              get: function(E) {
                return E === "clientId" ? y : E === "trackingId" ? e._currentMeasurementId : E === "apiVersion" ? "1" : void 0;
              }
            }); v.length; ) {
              var w = v.shift();
              e._gtag.apply(e, c(w));
            }
          }), e._isQueuing = !0;
        }
        return e.ga;
      }), b(this, "event", function(t, n) {
        if (typeof t == "string")
          e._gtag("event", t, e._toGtagOptions(n));
        else {
          var r = t.action, i = t.category, y = t.label, v = t.value, w = t.nonInteraction, A = t.transport;
          if (!i || !r) {
            console.warn("args.category AND args.action are required in event()");
            return;
          }
          var E = {
            hitType: "event",
            eventCategory: (0, d.default)(i),
            eventAction: (0, d.default)(r)
          };
          y && (E.eventLabel = (0, d.default)(y)), typeof v < "u" && (typeof v != "number" ? console.warn("Expected `args.value` arg to be a Number.") : E.eventValue = v), typeof w < "u" && (typeof w != "boolean" ? console.warn("`args.nonInteraction` must be a boolean.") : E.nonInteraction = w), typeof A < "u" && (typeof A != "string" ? console.warn("`args.transport` must be a string.") : (["beacon", "xhr", "image"].indexOf(A) === -1 && console.warn("`args.transport` must be either one of these values: `beacon`, `xhr` or `image`"), E.transport = A)), e._gaCommand("send", E);
        }
      }), b(this, "send", function(t) {
        e._gaCommand("send", t);
      }), this.reset();
    }
    return ce(a, [{
      key: "gtag",
      value: function() {
        this._gtag.apply(this, arguments);
      }
    }]), a;
  }();
  o.GA4 = q;
  var fe = new q();
  o.default = fe;
})(te);
(function(o) {
  function u(s) {
    "@babel/helpers - typeof";
    return u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(g) {
      return typeof g;
    } : function(g) {
      return g && typeof Symbol == "function" && g.constructor === Symbol && g !== Symbol.prototype ? "symbol" : typeof g;
    }, u(s);
  }
  Object.defineProperty(o, "__esModule", {
    value: !0
  }), o.default = o.ReactGAImplementation = void 0;
  var d = p(te);
  function m(s) {
    if (typeof WeakMap != "function") return null;
    var g = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap();
    return (m = function(I) {
      return I ? f : g;
    })(s);
  }
  function p(s, g) {
    if (s && s.__esModule)
      return s;
    if (s === null || u(s) !== "object" && typeof s != "function")
      return { default: s };
    var f = m(g);
    if (f && f.has(s))
      return f.get(s);
    var c = {}, I = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var O in s)
      if (O !== "default" && Object.prototype.hasOwnProperty.call(s, O)) {
        var T = I ? Object.getOwnPropertyDescriptor(s, O) : null;
        T && (T.get || T.set) ? Object.defineProperty(c, O, T) : c[O] = s[O];
      }
    return c.default = s, f && f.set(s, c), c;
  }
  var h = d.GA4;
  o.ReactGAImplementation = h;
  var _ = d.default;
  o.default = _;
})(ee);
const Ne = /* @__PURE__ */ Se(ee), Ue = {
  app_ids: {
    prod: "G-NT3FLN0QHF",
    dev: "G-7TMZEFFWB7"
  },
  dimensions: {
    dev: "dimension1",
    version: "dimension2",
    context: "dimension3"
  }
}, M = "fiftyone-do-not-track";
function qe(o) {
  const [u, d] = B(!1), [m, p] = B(!1), h = window.localStorage.getItem(M);
  Z(() => {
    o || h === "true" || h === "false" ? (p(!1), d(!0)) : p(!0);
  }, [o, h]);
  const _ = D(() => {
    window.localStorage.setItem(M, "true"), p(!1), d(!0);
  }, []), s = D(() => {
    window.localStorage.setItem(M, "false"), d(!0), p(!1);
  }, []);
  return {
    doNotTrack: h === "true" || o,
    handleDisable: _,
    handleEnable: s,
    ready: u,
    show: m
  };
}
function je({
  callGA: o,
  info: u
}) {
  const [d, m] = Oe(), { doNotTrack: p, handleDisable: h, handleEnable: _, ready: s, show: g } = qe(u.doNotTrack);
  return Z(() => {
    if (!s)
      return;
    const f = u.dev ? "dev" : "prod", c = Ce[f];
    m({
      userId: u.uid,
      userGroup: "fiftyone-oss",
      writeKey: c,
      doNotTrack: p,
      debug: u.dev
    }), !p && o();
  }, [o, p, u, s, m]), g ? /* @__PURE__ */ l.createElement(We, null, /* @__PURE__ */ l.createElement(
    P,
    {
      container: !0,
      direction: "column",
      alignItems: "center",
      borderTop: (f) => `1px solid ${f.palette.divider}`,
      backgroundColor: "background.paper"
    },
    /* @__PURE__ */ l.createElement(P, { padding: 2 }, /* @__PURE__ */ l.createElement(C, { variant: "h6", marginBottom: 1 }, "Help us improve FiftyOne"), /* @__PURE__ */ l.createElement(C, { marginBottom: 1 }, "We use cookies to understand how FiftyOne is used and improve the product. You can help us by enabling anonymous analytics."), /* @__PURE__ */ l.createElement(P, { container: !0, gap: 2, justifyContent: "end", direction: "row" }, /* @__PURE__ */ l.createElement(P, { item: !0, alignContent: "center" }, /* @__PURE__ */ l.createElement(R, { style: { cursor: "pointer" }, onClick: h }, "Disable")), /* @__PURE__ */ l.createElement(P, { item: !0 }, /* @__PURE__ */ l.createElement(V, { variant: "contained", onClick: _ }, "Enable"))))
  )) : null;
}
function We({ children: o }) {
  return /* @__PURE__ */ l.createElement(Te, { position: "fixed", bottom: 0, width: "100%", zIndex: 51 }, o);
}
const ze = (o) => D(() => {
  const d = o.dev ? "dev" : "prod";
  Ne.initialize(Ue.app_ids[d], {
    testMode: !1,
    gaOptions: {
      storage: "none",
      cookieDomain: "none",
      clientId: o.uid,
      page_location: "omitted",
      page_path: "omitted",
      version: o.version,
      context: o.context,
      checkProtocolTask: null
      // disable check, allow file:// URLs
    }
  });
}, [o]);
function Ke({
  fragment: o
}) {
  const u = Y.useFragment($, o), d = ze(u);
  return /* @__PURE__ */ l.createElement(je, {
    callGA: d,
    info: u
  });
}
const Xe = ({
  children: o,
  fragment: u
}) => {
  const d = Y.useFragment(X, u);
  return /* @__PURE__ */ l.createElement(l.Fragment, null, o, /* @__PURE__ */ l.createElement(Ke, {
    fragment: d
  }));
}, Be = "_page_8fb7q_1", Qe = "_rest_8fb7q_8", He = "_icons_8fb7q_13", $e = {
  page: Be,
  rest: Qe,
  icons: He
};
export {
  Xe as N,
  Je as S,
  $e as s
};
