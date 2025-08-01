import { aN as wn, aO as Tn, aP as Fn, aQ as Cn, aR as An, aS as Dn, aT as Wr, aU as En, aV as Mn, aW as Rn, aX as Gn, aY as on, aZ as On, a_ as Bt, a$ as zr, b0 as vr, b1 as Ln, b2 as pr, b3 as Bn, b4 as gr, b5 as Pn, b6 as In, b7 as Nn, b8 as Wn, b9 as mr } from "./index-DhESz6lu.mjs";
function zn() {
  var c = /* @__PURE__ */ Object.create(null);
  function r(t, e) {
    var a = t.id, o = t.name, n = t.dependencies;
    n === void 0 && (n = []);
    var i = t.init;
    i === void 0 && (i = function() {
    });
    var s = t.getTransferables;
    if (s === void 0 && (s = null), !c[a])
      try {
        n = n.map(function(l) {
          return l && l.isWorkerModule && (r(l, function(h) {
            if (h instanceof Error)
              throw h;
          }), l = c[l.id].value), l;
        }), i = u("<" + o + ">.init", i), s && (s = u("<" + o + ">.getTransferables", s));
        var f = null;
        typeof i == "function" ? f = i.apply(void 0, n) : console.error("worker module init function failed to rehydrate"), c[a] = {
          id: a,
          value: f,
          getTransferables: s
        }, e(f);
      } catch (l) {
        l && l.noLog || console.error(l), e(l);
      }
  }
  function d(t, e) {
    var a, o = t.id, n = t.args;
    (!c[o] || typeof c[o].value != "function") && e(new Error("Worker module " + o + ": not found or its 'init' did not return a function"));
    try {
      var i = (a = c[o]).value.apply(a, n);
      i && typeof i.then == "function" ? i.then(s, function(f) {
        return e(f instanceof Error ? f : new Error("" + f));
      }) : s(i);
    } catch (f) {
      e(f);
    }
    function s(f) {
      try {
        var l = c[o].getTransferables && c[o].getTransferables(f);
        (!l || !Array.isArray(l) || !l.length) && (l = void 0), e(f, l);
      } catch (h) {
        console.error(h), e(h);
      }
    }
  }
  function u(t, e) {
    var a = void 0;
    self.troikaDefine = function(n) {
      return a = n;
    };
    var o = URL.createObjectURL(
      new Blob(
        ["/** " + t.replace(/\*/g, "") + ` **/

troikaDefine(
` + e + `
)`],
        { type: "application/javascript" }
      )
    );
    try {
      importScripts(o);
    } catch (n) {
      console.error(n);
    }
    return URL.revokeObjectURL(o), delete self.troikaDefine, a;
  }
  self.addEventListener("message", function(t) {
    var e = t.data, a = e.messageId, o = e.action, n = e.data;
    try {
      o === "registerModule" && r(n, function(i) {
        i instanceof Error ? postMessage({
          messageId: a,
          success: !1,
          error: i.message
        }) : postMessage({
          messageId: a,
          success: !0,
          result: { isCallable: typeof i == "function" }
        });
      }), o === "callModule" && d(n, function(i, s) {
        i instanceof Error ? postMessage({
          messageId: a,
          success: !1,
          error: i.message
        }) : postMessage({
          messageId: a,
          success: !0,
          result: i
        }, s || void 0);
      });
    } catch (i) {
      postMessage({
        messageId: a,
        success: !1,
        error: i.stack
      });
    }
  });
}
function jn(c) {
  var r = function() {
    for (var d = [], u = arguments.length; u--; ) d[u] = arguments[u];
    return r._getInitResult().then(function(t) {
      if (typeof t == "function")
        return t.apply(void 0, d);
      throw new Error("Worker module function was called but `init` did not return a callable function");
    });
  };
  return r._getInitResult = function() {
    var d = c.dependencies, u = c.init;
    d = Array.isArray(d) ? d.map(
      function(e) {
        return e && e._getInitResult ? e._getInitResult() : e;
      }
    ) : [];
    var t = Promise.all(d).then(function(e) {
      return u.apply(null, e);
    });
    return r._getInitResult = function() {
      return t;
    }, t;
  }, r;
}
var sn = function() {
  var c = !1;
  if (typeof window < "u" && typeof window.document < "u")
    try {
      var r = new Worker(
        URL.createObjectURL(new Blob([""], { type: "application/javascript" }))
      );
      r.terminate(), c = !0;
    } catch (d) {
      typeof process < "u", console.log(
        "Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: [" + d.message + "]"
      );
    }
  return sn = function() {
    return c;
  }, c;
}, Vn = 0, Hn = 0, ir = !1, yt = /* @__PURE__ */ Object.create(null), bt = /* @__PURE__ */ Object.create(null), ur = /* @__PURE__ */ Object.create(null);
function it(c) {
  if ((!c || typeof c.init != "function") && !ir)
    throw new Error("requires `options.init` function");
  var r = c.dependencies, d = c.init, u = c.getTransferables, t = c.workerId;
  if (!sn())
    return jn(c);
  t == null && (t = "#default");
  var e = "workerModule" + ++Vn, a = c.name || e, o = null;
  r = r && r.map(function(i) {
    return typeof i == "function" && !i.workerModuleData && (ir = !0, i = it({
      workerId: t,
      name: "<" + a + "> function dependency: " + i.name,
      init: `function(){return (
` + Ot(i) + `
)}`
    }), ir = !1), i && i.workerModuleData && (i = i.workerModuleData), i;
  });
  function n() {
    for (var i = [], s = arguments.length; s--; ) i[s] = arguments[s];
    if (!o) {
      o = jr(t, "registerModule", n.workerModuleData);
      var f = function() {
        o = null, bt[t].delete(f);
      };
      (bt[t] || (bt[t] = /* @__PURE__ */ new Set())).add(f);
    }
    return o.then(function(l) {
      var h = l.isCallable;
      if (h)
        return jr(t, "callModule", { id: e, args: i });
      throw new Error("Worker module function was called but `init` did not return a callable function");
    });
  }
  return n.workerModuleData = {
    isWorkerModule: !0,
    id: e,
    name: a,
    dependencies: r,
    init: Ot(d),
    getTransferables: u && Ot(u)
  }, n;
}
function Xn(c) {
  bt[c] && bt[c].forEach(function(r) {
    r();
  }), yt[c] && (yt[c].terminate(), delete yt[c]);
}
function Ot(c) {
  var r = c.toString();
  return !/^function/.test(r) && /^\w+\s*\(/.test(r) && (r = "function " + r), r;
}
function Yn(c) {
  var r = yt[c];
  if (!r) {
    var d = Ot(zn);
    r = yt[c] = new Worker(
      URL.createObjectURL(
        new Blob(
          ["/** Worker Module Bootstrap: " + c.replace(/\*/g, "") + ` **/

;(` + d + ")()"],
          { type: "application/javascript" }
        )
      )
    ), r.onmessage = function(u) {
      var t = u.data, e = t.messageId, a = ur[e];
      if (!a)
        throw new Error("WorkerModule response with empty or unknown messageId");
      delete ur[e], a(t);
    };
  }
  return r;
}
function jr(c, r, d) {
  return new Promise(function(u, t) {
    var e = ++Hn;
    ur[e] = function(a) {
      a.success ? u(a.result) : t(new Error("Error in worker " + r + " call: " + a.error));
    }, Yn(c).postMessage({
      messageId: e,
      action: r,
      data: d
    });
  });
}
function fn() {
  var c = function(r) {
    function d(B, M, v, b, k, A, _, N) {
      var E = 1 - _;
      N.x = E * E * B + 2 * E * _ * v + _ * _ * k, N.y = E * E * M + 2 * E * _ * b + _ * _ * A;
    }
    function u(B, M, v, b, k, A, _, N, E, P) {
      var X = 1 - E;
      P.x = X * X * X * B + 3 * X * X * E * v + 3 * X * E * E * k + E * E * E * _, P.y = X * X * X * M + 3 * X * X * E * b + 3 * X * E * E * A + E * E * E * N;
    }
    function t(B, M) {
      for (var v = /([MLQCZ])([^MLQCZ]*)/g, b, k, A, _, N; b = v.exec(B); ) {
        var E = b[2].replace(/^\s*|\s*$/g, "").split(/[,\s]+/).map(function(P) {
          return parseFloat(P);
        });
        switch (b[1]) {
          case "M":
            _ = k = E[0], N = A = E[1];
            break;
          case "L":
            (E[0] !== _ || E[1] !== N) && M("L", _, N, _ = E[0], N = E[1]);
            break;
          case "Q": {
            M("Q", _, N, _ = E[2], N = E[3], E[0], E[1]);
            break;
          }
          case "C": {
            M("C", _, N, _ = E[4], N = E[5], E[0], E[1], E[2], E[3]);
            break;
          }
          case "Z":
            (_ !== k || N !== A) && M("L", _, N, k, A);
            break;
        }
      }
    }
    function e(B, M, v) {
      v === void 0 && (v = 16);
      var b = { x: 0, y: 0 };
      t(B, function(k, A, _, N, E, P, X, $, V) {
        switch (k) {
          case "L":
            M(A, _, N, E);
            break;
          case "Q": {
            for (var W = A, pe = _, ue = 1; ue < v; ue++)
              d(
                A,
                _,
                P,
                X,
                N,
                E,
                ue / (v - 1),
                b
              ), M(W, pe, b.x, b.y), W = b.x, pe = b.y;
            break;
          }
          case "C": {
            for (var Q = A, ee = _, se = 1; se < v; se++)
              u(
                A,
                _,
                P,
                X,
                $,
                V,
                N,
                E,
                se / (v - 1),
                b
              ), M(Q, ee, b.x, b.y), Q = b.x, ee = b.y;
            break;
          }
        }
      });
    }
    var a = "precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}", o = "precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}", n = /* @__PURE__ */ new WeakMap(), i = {
      premultipliedAlpha: !1,
      preserveDrawingBuffer: !0,
      antialias: !1,
      depth: !1
    };
    function s(B, M) {
      var v = B.getContext ? B.getContext("webgl", i) : B, b = n.get(v);
      if (!b) {
        let X = function(Q) {
          var ee = A[Q];
          if (!ee && (ee = A[Q] = v.getExtension(Q), !ee))
            throw new Error(Q + " not supported");
          return ee;
        }, $ = function(Q, ee) {
          var se = v.createShader(ee);
          return v.shaderSource(se, Q), v.compileShader(se), se;
        }, V = function(Q, ee, se, j) {
          if (!_[Q]) {
            var te = {}, q = {}, L = v.createProgram();
            v.attachShader(L, $(ee, v.VERTEX_SHADER)), v.attachShader(L, $(se, v.FRAGMENT_SHADER)), v.linkProgram(L), _[Q] = {
              program: L,
              transaction: function(K) {
                v.useProgram(L), K({
                  setUniform: function(Y, be) {
                    for (var ne = [], oe = arguments.length - 2; oe-- > 0; ) ne[oe] = arguments[oe + 2];
                    var le = q[be] || (q[be] = v.getUniformLocation(L, be));
                    v["uniform" + Y].apply(v, [le].concat(ne));
                  },
                  setAttribute: function(Y, be, ne, oe, le) {
                    var de = te[Y];
                    de || (de = te[Y] = {
                      buf: v.createBuffer(),
                      // TODO should we destroy our buffers?
                      loc: v.getAttribLocation(L, Y),
                      data: null
                    }), v.bindBuffer(v.ARRAY_BUFFER, de.buf), v.vertexAttribPointer(de.loc, be, v.FLOAT, !1, 0, 0), v.enableVertexAttribArray(de.loc), k ? v.vertexAttribDivisor(de.loc, oe) : X("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(de.loc, oe), le !== de.data && (v.bufferData(v.ARRAY_BUFFER, le, ne), de.data = le);
                  }
                });
              }
            };
          }
          _[Q].transaction(j);
        }, W = function(Q, ee) {
          E++;
          try {
            v.activeTexture(v.TEXTURE0 + E);
            var se = N[Q];
            se || (se = N[Q] = v.createTexture(), v.bindTexture(v.TEXTURE_2D, se), v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MIN_FILTER, v.NEAREST), v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MAG_FILTER, v.NEAREST)), v.bindTexture(v.TEXTURE_2D, se), ee(se, E);
          } finally {
            E--;
          }
        }, pe = function(Q, ee, se) {
          var j = v.createFramebuffer();
          P.push(j), v.bindFramebuffer(v.FRAMEBUFFER, j), v.activeTexture(v.TEXTURE0 + ee), v.bindTexture(v.TEXTURE_2D, Q), v.framebufferTexture2D(v.FRAMEBUFFER, v.COLOR_ATTACHMENT0, v.TEXTURE_2D, Q, 0);
          try {
            se(j);
          } finally {
            v.deleteFramebuffer(j), v.bindFramebuffer(v.FRAMEBUFFER, P[--P.length - 1] || null);
          }
        }, ue = function() {
          A = {}, _ = {}, N = {}, E = -1, P.length = 0;
        };
        var k = typeof WebGL2RenderingContext < "u" && v instanceof WebGL2RenderingContext, A = {}, _ = {}, N = {}, E = -1, P = [];
        v.canvas.addEventListener("webglcontextlost", function(Q) {
          ue(), Q.preventDefault();
        }, !1), n.set(v, b = {
          gl: v,
          isWebGL2: k,
          getExtension: X,
          withProgram: V,
          withTexture: W,
          withTextureFramebuffer: pe,
          handleContextLoss: ue
        });
      }
      M(b);
    }
    function f(B, M, v, b, k, A, _, N) {
      _ === void 0 && (_ = 15), N === void 0 && (N = null), s(B, function(E) {
        var P = E.gl, X = E.withProgram, $ = E.withTexture;
        $("copy", function(V, W) {
          P.texImage2D(P.TEXTURE_2D, 0, P.RGBA, k, A, 0, P.RGBA, P.UNSIGNED_BYTE, M), X("copy", a, o, function(pe) {
            var ue = pe.setUniform, Q = pe.setAttribute;
            Q("aUV", 2, P.STATIC_DRAW, 0, new Float32Array([0, 0, 2, 0, 0, 2])), ue("1i", "image", W), P.bindFramebuffer(P.FRAMEBUFFER, N || null), P.disable(P.BLEND), P.colorMask(_ & 8, _ & 4, _ & 2, _ & 1), P.viewport(v, b, k, A), P.scissor(v, b, k, A), P.drawArrays(P.TRIANGLES, 0, 3);
          });
        });
      });
    }
    function l(B, M, v) {
      var b = B.width, k = B.height;
      s(B, function(A) {
        var _ = A.gl, N = new Uint8Array(b * k * 4);
        _.readPixels(0, 0, b, k, _.RGBA, _.UNSIGNED_BYTE, N), B.width = M, B.height = v, f(_, N, 0, 0, b, k);
      });
    }
    var h = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      withWebGLContext: s,
      renderImageData: f,
      resizeWebGLCanvasWithoutClearing: l
    });
    function p(B, M, v, b, k, A) {
      A === void 0 && (A = 1);
      var _ = new Uint8Array(B * M), N = b[2] - b[0], E = b[3] - b[1], P = [];
      e(v, function(Q, ee, se, j) {
        P.push({
          x1: Q,
          y1: ee,
          x2: se,
          y2: j,
          minX: Math.min(Q, se),
          minY: Math.min(ee, j),
          maxX: Math.max(Q, se),
          maxY: Math.max(ee, j)
        });
      }), P.sort(function(Q, ee) {
        return Q.maxX - ee.maxX;
      });
      for (var X = 0; X < B; X++)
        for (var $ = 0; $ < M; $++) {
          var V = pe(
            b[0] + N * (X + 0.5) / B,
            b[1] + E * ($ + 0.5) / M
          ), W = Math.pow(1 - Math.abs(V) / k, A) / 2;
          V < 0 && (W = 1 - W), W = Math.max(0, Math.min(255, Math.round(W * 255))), _[$ * B + X] = W;
        }
      return _;
      function pe(Q, ee) {
        for (var se = 1 / 0, j = 1 / 0, te = P.length; te--; ) {
          var q = P[te];
          if (q.maxX + j <= Q)
            break;
          if (Q + j > q.minX && ee - j < q.maxY && ee + j > q.minY) {
            var L = O(Q, ee, q.x1, q.y1, q.x2, q.y2);
            L < se && (se = L, j = Math.sqrt(se));
          }
        }
        return ue(Q, ee) && (j = -j), j;
      }
      function ue(Q, ee) {
        for (var se = 0, j = P.length; j--; ) {
          var te = P[j];
          if (te.maxX <= Q)
            break;
          var q = te.y1 > ee != te.y2 > ee && Q < (te.x2 - te.x1) * (ee - te.y1) / (te.y2 - te.y1) + te.x1;
          q && (se += te.y1 < te.y2 ? 1 : -1);
        }
        return se !== 0;
      }
    }
    function g(B, M, v, b, k, A, _, N, E, P) {
      A === void 0 && (A = 1), N === void 0 && (N = 0), E === void 0 && (E = 0), P === void 0 && (P = 0), y(B, M, v, b, k, A, _, null, N, E, P);
    }
    function y(B, M, v, b, k, A, _, N, E, P, X) {
      A === void 0 && (A = 1), E === void 0 && (E = 0), P === void 0 && (P = 0), X === void 0 && (X = 0);
      for (var $ = p(B, M, v, b, k, A), V = new Uint8Array($.length * 4), W = 0; W < $.length; W++)
        V[W * 4 + X] = $[W];
      f(_, V, E, P, B, M, 1 << 3 - X, N);
    }
    function O(B, M, v, b, k, A) {
      var _ = k - v, N = A - b, E = _ * _ + N * N, P = E ? Math.max(0, Math.min(1, ((B - v) * _ + (M - b) * N) / E)) : 0, X = B - (v + P * _), $ = M - (b + P * N);
      return X * X + $ * $;
    }
    var x = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      generate: p,
      generateIntoCanvas: g,
      generateIntoFramebuffer: y
    }), F = "precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}", U = "precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}", w = "precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}", G = new Float32Array([0, 0, 2, 0, 0, 2]), S = null, C = !1, I = {}, R = /* @__PURE__ */ new WeakMap();
    function J(B) {
      if (!C && !H(B))
        throw new Error("WebGL generation not supported");
    }
    function m(B, M, v, b, k, A, _) {
      if (A === void 0 && (A = 1), _ === void 0 && (_ = null), !_ && (_ = S, !_)) {
        var N = typeof OffscreenCanvas == "function" ? new OffscreenCanvas(1, 1) : typeof document < "u" ? document.createElement("canvas") : null;
        if (!N)
          throw new Error("OffscreenCanvas or DOM canvas not supported");
        _ = S = N.getContext("webgl", { depth: !1 });
      }
      J(_);
      var E = new Uint8Array(B * M * 4);
      s(_, function(V) {
        var W = V.gl, pe = V.withTexture, ue = V.withTextureFramebuffer;
        pe("readable", function(Q, ee) {
          W.texImage2D(W.TEXTURE_2D, 0, W.RGBA, B, M, 0, W.RGBA, W.UNSIGNED_BYTE, null), ue(Q, ee, function(se) {
            T(
              B,
              M,
              v,
              b,
              k,
              A,
              W,
              se,
              0,
              0,
              0
              // red channel
            ), W.readPixels(0, 0, B, M, W.RGBA, W.UNSIGNED_BYTE, E);
          });
        });
      });
      for (var P = new Uint8Array(B * M), X = 0, $ = 0; X < E.length; X += 4)
        P[$++] = E[X];
      return P;
    }
    function D(B, M, v, b, k, A, _, N, E, P) {
      A === void 0 && (A = 1), N === void 0 && (N = 0), E === void 0 && (E = 0), P === void 0 && (P = 0), T(B, M, v, b, k, A, _, null, N, E, P);
    }
    function T(B, M, v, b, k, A, _, N, E, P, X) {
      A === void 0 && (A = 1), E === void 0 && (E = 0), P === void 0 && (P = 0), X === void 0 && (X = 0), J(_);
      var $ = [];
      e(v, function(V, W, pe, ue) {
        $.push(V, W, pe, ue);
      }), $ = new Float32Array($), s(_, function(V) {
        var W = V.gl, pe = V.isWebGL2, ue = V.getExtension, Q = V.withProgram, ee = V.withTexture, se = V.withTextureFramebuffer, j = V.handleContextLoss;
        if (ee("rawDistances", function(te, q) {
          (B !== te._lastWidth || M !== te._lastHeight) && W.texImage2D(
            W.TEXTURE_2D,
            0,
            W.RGBA,
            te._lastWidth = B,
            te._lastHeight = M,
            0,
            W.RGBA,
            W.UNSIGNED_BYTE,
            null
          ), Q("main", F, U, function(L) {
            var he = L.setAttribute, K = L.setUniform, ae = !pe && ue("ANGLE_instanced_arrays"), Y = !pe && ue("EXT_blend_minmax");
            he("aUV", 2, W.STATIC_DRAW, 0, G), he("aLineSegment", 4, W.DYNAMIC_DRAW, 1, $), K.apply(void 0, ["4f", "uGlyphBounds"].concat(b)), K("1f", "uMaxDistance", k), K("1f", "uExponent", A), se(te, q, function(be) {
              W.enable(W.BLEND), W.colorMask(!0, !0, !0, !0), W.viewport(0, 0, B, M), W.scissor(0, 0, B, M), W.blendFunc(W.ONE, W.ONE), W.blendEquationSeparate(W.FUNC_ADD, pe ? W.MAX : Y.MAX_EXT), W.clear(W.COLOR_BUFFER_BIT), pe ? W.drawArraysInstanced(W.TRIANGLES, 0, 3, $.length / 4) : ae.drawArraysInstancedANGLE(W.TRIANGLES, 0, 3, $.length / 4);
            });
          }), Q("post", a, w, function(L) {
            L.setAttribute("aUV", 2, W.STATIC_DRAW, 0, G), L.setUniform("1i", "tex", q), W.bindFramebuffer(W.FRAMEBUFFER, N), W.disable(W.BLEND), W.colorMask(X === 0, X === 1, X === 2, X === 3), W.viewport(E, P, B, M), W.scissor(E, P, B, M), W.drawArrays(W.TRIANGLES, 0, 3);
          });
        }), W.isContextLost())
          throw j(), new Error("webgl context lost");
      });
    }
    function H(B) {
      var M = !B || B === S ? I : B.canvas || B, v = R.get(M);
      if (v === void 0) {
        C = !0;
        var b = null;
        try {
          var k = [
            97,
            106,
            97,
            61,
            99,
            137,
            118,
            80,
            80,
            118,
            137,
            99,
            61,
            97,
            106,
            97
          ], A = m(
            4,
            4,
            "M8,8L16,8L24,24L16,24Z",
            [0, 0, 32, 32],
            24,
            1,
            B
          );
          v = A && k.length === A.length && A.every(function(_, N) {
            return _ === k[N];
          }), v || (b = "bad trial run results", console.info(k, A));
        } catch (_) {
          v = !1, b = _.message;
        }
        b && console.warn("WebGL SDF generation not supported:", b), C = !1, R.set(M, v);
      }
      return v;
    }
    var z = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      generate: m,
      generateIntoCanvas: D,
      generateIntoFramebuffer: T,
      isSupported: H
    });
    function Z(B, M, v, b, k, A) {
      k === void 0 && (k = Math.max(b[2] - b[0], b[3] - b[1]) / 2), A === void 0 && (A = 1);
      try {
        return m.apply(z, arguments);
      } catch (_) {
        return console.info("WebGL SDF generation failed, falling back to JS", _), p.apply(x, arguments);
      }
    }
    function re(B, M, v, b, k, A, _, N, E, P) {
      k === void 0 && (k = Math.max(b[2] - b[0], b[3] - b[1]) / 2), A === void 0 && (A = 1), N === void 0 && (N = 0), E === void 0 && (E = 0), P === void 0 && (P = 0);
      try {
        return D.apply(z, arguments);
      } catch (X) {
        return console.info("WebGL SDF generation failed, falling back to JS", X), g.apply(x, arguments);
      }
    }
    return r.forEachPathCommand = t, r.generate = Z, r.generateIntoCanvas = re, r.javascript = x, r.pathToLineSegments = e, r.webgl = z, r.webglUtils = h, Object.defineProperty(r, "__esModule", { value: !0 }), r;
  }({});
  return c;
}
function Jn() {
  var c = function(r) {
    var d = {
      R: "13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",
      EN: "1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",
      ES: "17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",
      ET: "z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",
      AN: "16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",
      CS: "18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",
      B: "a,3,f+2,2v,690",
      S: "9,2,k",
      WS: "c,k,4f4,1vk+a,u,1j,335",
      ON: "x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",
      BN: "0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",
      NSM: "lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",
      AL: "16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",
      LRO: "6ct",
      RLO: "6cu",
      LRE: "6cq",
      RLE: "6cr",
      PDF: "6cs",
      LRI: "6ee",
      RLI: "6ef",
      FSI: "6eg",
      PDI: "6eh"
    }, u = {}, t = {};
    u.L = 1, t[1] = "L", Object.keys(d).forEach(function(j, te) {
      u[j] = 1 << te + 1, t[u[j]] = j;
    }), Object.freeze(u);
    var e = u.LRI | u.RLI | u.FSI, a = u.L | u.R | u.AL, o = u.B | u.S | u.WS | u.ON | u.FSI | u.LRI | u.RLI | u.PDI, n = u.BN | u.RLE | u.LRE | u.RLO | u.LRO | u.PDF, i = u.S | u.WS | u.B | e | u.PDI | n, s = null;
    function f() {
      if (!s) {
        s = /* @__PURE__ */ new Map();
        var j = function(q) {
          if (d.hasOwnProperty(q)) {
            var L = 0;
            d[q].split(",").forEach(function(he) {
              var K = he.split("+"), ae = K[0], Y = K[1];
              ae = parseInt(ae, 36), Y = Y ? parseInt(Y, 36) : 0, s.set(L += ae, u[q]);
              for (var be = 0; be < Y; be++)
                s.set(++L, u[q]);
            });
          }
        };
        for (var te in d) j(te);
      }
    }
    function l(j) {
      return f(), s.get(j.codePointAt(0)) || u.L;
    }
    function h(j) {
      return t[l(j)];
    }
    var p = {
      pairs: "14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",
      canonical: "6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"
    };
    function g(j, te) {
      var q = 36, L = 0, he = /* @__PURE__ */ new Map(), K = te && /* @__PURE__ */ new Map(), ae;
      return j.split(",").forEach(function Y(be) {
        if (be.indexOf("+") !== -1)
          for (var ne = +be; ne--; )
            Y(ae);
        else {
          ae = be;
          var oe = be.split(">"), le = oe[0], de = oe[1];
          le = String.fromCodePoint(L += parseInt(le, q)), de = String.fromCodePoint(L += parseInt(de, q)), he.set(le, de), te && K.set(de, le);
        }
      }), { map: he, reverseMap: K };
    }
    var y, O, x;
    function F() {
      if (!y) {
        var j = g(p.pairs, !0), te = j.map, q = j.reverseMap;
        y = te, O = q, x = g(p.canonical, !1).map;
      }
    }
    function U(j) {
      return F(), y.get(j) || null;
    }
    function w(j) {
      return F(), O.get(j) || null;
    }
    function G(j) {
      return F(), x.get(j) || null;
    }
    var S = u.L, C = u.R, I = u.EN, R = u.ES, J = u.ET, m = u.AN, D = u.CS, T = u.B, H = u.S, z = u.ON, Z = u.BN, re = u.NSM, B = u.AL, M = u.LRO, v = u.RLO, b = u.LRE, k = u.RLE, A = u.PDF, _ = u.LRI, N = u.RLI, E = u.FSI, P = u.PDI;
    function X(j, te) {
      for (var q = 125, L = new Uint32Array(j.length), he = 0; he < j.length; he++)
        L[he] = l(j[he]);
      var K = /* @__PURE__ */ new Map();
      function ae(Le, We) {
        var Be = L[Le];
        L[Le] = We, K.set(Be, K.get(Be) - 1), Be & o && K.set(o, K.get(o) - 1), K.set(We, (K.get(We) || 0) + 1), We & o && K.set(o, (K.get(o) || 0) + 1);
      }
      for (var Y = new Uint8Array(j.length), be = /* @__PURE__ */ new Map(), ne = [], oe = null, le = 0; le < j.length; le++)
        oe || ne.push(oe = {
          start: le,
          end: j.length - 1,
          // 3.3.1 P2-P3: Determine the paragraph level
          level: te === "rtl" ? 1 : te === "ltr" ? 0 : Ir(le, !1)
        }), L[le] & T && (oe.end = le, oe = null);
      for (var de = k | b | v | M | e | P | A | T, Se = function(Le) {
        return Le + (Le & 1 ? 1 : 2);
      }, Fe = function(Le) {
        return Le + (Le & 1 ? 2 : 1);
      }, ge = 0; ge < ne.length; ge++) {
        oe = ne[ge];
        var me = [{
          _level: oe.level,
          _override: 0,
          //0=neutral, 1=L, 2=R
          _isolate: 0
          //bool
        }], fe = void 0, Ce = 0, ke = 0, Oe = 0;
        K.clear();
        for (var xe = oe.start; xe <= oe.end; xe++) {
          var ce = L[xe];
          if (fe = me[me.length - 1], K.set(ce, (K.get(ce) || 0) + 1), ce & o && K.set(o, (K.get(o) || 0) + 1), ce & de)
            if (ce & (k | b)) {
              Y[xe] = fe._level;
              var Ue = (ce === k ? Fe : Se)(fe._level);
              Ue <= q && !Ce && !ke ? me.push({
                _level: Ue,
                _override: 0,
                _isolate: 0
              }) : Ce || ke++;
            } else if (ce & (v | M)) {
              Y[xe] = fe._level;
              var He = (ce === v ? Fe : Se)(fe._level);
              He <= q && !Ce && !ke ? me.push({
                _level: He,
                _override: ce & v ? C : S,
                _isolate: 0
              }) : Ce || ke++;
            } else if (ce & e) {
              ce & E && (ce = Ir(xe + 1, !0) === 1 ? N : _), Y[xe] = fe._level, fe._override && ae(xe, fe._override);
              var _e = (ce === N ? Fe : Se)(fe._level);
              _e <= q && Ce === 0 && ke === 0 ? (Oe++, me.push({
                _level: _e,
                _override: 0,
                _isolate: 1,
                _isolInitIndex: xe
              })) : Ce++;
            } else if (ce & P) {
              if (Ce > 0)
                Ce--;
              else if (Oe > 0) {
                for (ke = 0; !me[me.length - 1]._isolate; )
                  me.pop();
                var ye = me[me.length - 1]._isolInitIndex;
                ye != null && (be.set(ye, xe), be.set(xe, ye)), me.pop(), Oe--;
              }
              fe = me[me.length - 1], Y[xe] = fe._level, fe._override && ae(xe, fe._override);
            } else ce & A ? (Ce === 0 && (ke > 0 ? ke-- : !fe._isolate && me.length > 1 && (me.pop(), fe = me[me.length - 1])), Y[xe] = fe._level) : ce & T && (Y[xe] = oe.level);
          else
            Y[xe] = fe._level, fe._override && ce !== Z && ae(xe, fe._override);
        }
        for (var Ae = [], we = null, ve = oe.start; ve <= oe.end; ve++) {
          var Te = L[ve];
          if (!(Te & n)) {
            var Re = Y[ve], Me = Te & e, De = Te === P;
            we && Re === we._level ? (we._end = ve, we._endsWithIsolInit = Me) : Ae.push(we = {
              _start: ve,
              _end: ve,
              _level: Re,
              _startsWithPDI: De,
              _endsWithIsolInit: Me
            });
          }
        }
        for (var Ie = [], Xe = 0; Xe < Ae.length; Xe++) {
          var je = Ae[Xe];
          if (!je._startsWithPDI || je._startsWithPDI && !be.has(je._start)) {
            for (var Ye = [we = je], Qe = void 0; we && we._endsWithIsolInit && (Qe = be.get(we._end)) != null; )
              for (var Ve = Xe + 1; Ve < Ae.length; Ve++)
                if (Ae[Ve]._start === Qe) {
                  Ye.push(we = Ae[Ve]);
                  break;
                }
            for (var Ge = [], Ze = 0; Ze < Ye.length; Ze++)
              for (var br = Ye[Ze], Nt = br._start; Nt <= br._end; Nt++)
                Ge.push(Nt);
            for (var bn = Y[Ge[0]], Ur = oe.level, Ut = Ge[0] - 1; Ut >= 0; Ut--)
              if (!(L[Ut] & n)) {
                Ur = Y[Ut];
                break;
              }
            var Wt = Ge[Ge.length - 1], Un = Y[Wt], _r = oe.level;
            if (!(L[Wt] & e)) {
              for (var _t = Wt + 1; _t <= oe.end; _t++)
                if (!(L[_t] & n)) {
                  _r = Y[_t];
                  break;
                }
            }
            Ie.push({
              _seqIndices: Ge,
              _sosType: Math.max(Ur, bn) % 2 ? C : S,
              _eosType: Math.max(_r, Un) % 2 ? C : S
            });
          }
        }
        for (var zt = 0; zt < Ie.length; zt++) {
          var jt = Ie[zt], ie = jt._seqIndices, st = jt._sosType, _n = jt._eosType, tt = Y[ie[0]] & 1 ? C : S;
          if (K.get(re))
            for (var St = 0; St < ie.length; St++) {
              var Sr = ie[St];
              if (L[Sr] & re) {
                for (var Vt = st, xt = St - 1; xt >= 0; xt--)
                  if (!(L[ie[xt]] & n)) {
                    Vt = L[ie[xt]];
                    break;
                  }
                ae(Sr, Vt & (e | P) ? z : Vt);
              }
            }
          if (K.get(I))
            for (var kt = 0; kt < ie.length; kt++) {
              var xr = ie[kt];
              if (L[xr] & I)
                for (var wt = kt - 1; wt >= -1; wt--) {
                  var kr = wt === -1 ? st : L[ie[wt]];
                  if (kr & a) {
                    kr === B && ae(xr, m);
                    break;
                  }
                }
            }
          if (K.get(B))
            for (var Ht = 0; Ht < ie.length; Ht++) {
              var wr = ie[Ht];
              L[wr] & B && ae(wr, C);
            }
          if (K.get(R) || K.get(D))
            for (var ft = 1; ft < ie.length - 1; ft++) {
              var Xt = ie[ft];
              if (L[Xt] & (R | D)) {
                for (var rt = 0, Yt = 0, Jt = ft - 1; Jt >= 0 && (rt = L[ie[Jt]], !!(rt & n)); Jt--)
                  ;
                for (var Kt = ft + 1; Kt < ie.length && (Yt = L[ie[Kt]], !!(Yt & n)); Kt++)
                  ;
                rt === Yt && (L[Xt] === R ? rt === I : rt & (I | m)) && ae(Xt, rt);
              }
            }
          if (K.get(I))
            for (var ze = 0; ze < ie.length; ze++) {
              var Sn = ie[ze];
              if (L[Sn] & I) {
                for (var Tt = ze - 1; Tt >= 0 && L[ie[Tt]] & (J | n); Tt--)
                  ae(ie[Tt], I);
                for (ze++; ze < ie.length && L[ie[ze]] & (J | n | I); ze++)
                  L[ie[ze]] !== I && ae(ie[ze], I);
              }
            }
          if (K.get(J) || K.get(R) || K.get(D))
            for (var lt = 0; lt < ie.length; lt++) {
              var Tr = ie[lt];
              if (L[Tr] & (J | R | D)) {
                ae(Tr, z);
                for (var Ft = lt - 1; Ft >= 0 && L[ie[Ft]] & n; Ft--)
                  ae(ie[Ft], z);
                for (var Ct = lt + 1; Ct < ie.length && L[ie[Ct]] & n; Ct++)
                  ae(ie[Ct], z);
              }
            }
          if (K.get(I))
            for (var Qt = 0, Fr = st; Qt < ie.length; Qt++) {
              var Cr = ie[Qt], Zt = L[Cr];
              Zt & I ? Fr === S && ae(Cr, S) : Zt & a && (Fr = Zt);
            }
          if (K.get(o)) {
            var ut = C | I | m, Ar = ut | S, At = [];
            {
              for (var nt = [], at = 0; at < ie.length; at++)
                if (L[ie[at]] & o) {
                  var ct = j[ie[at]], Dr = void 0;
                  if (U(ct) !== null)
                    if (nt.length < 63)
                      nt.push({ char: ct, seqIndex: at });
                    else
                      break;
                  else if ((Dr = w(ct)) !== null)
                    for (var ht = nt.length - 1; ht >= 0; ht--) {
                      var qt = nt[ht].char;
                      if (qt === Dr || qt === w(G(ct)) || U(G(qt)) === ct) {
                        At.push([nt[ht].seqIndex, at]), nt.length = ht;
                        break;
                      }
                    }
                }
              At.sort(function(Le, We) {
                return Le[0] - We[0];
              });
            }
            for (var $t = 0; $t < At.length; $t++) {
              for (var Er = At[$t], Dt = Er[0], er = Er[1], Mr = !1, Ne = 0, tr = Dt + 1; tr < er; tr++) {
                var Rr = ie[tr];
                if (L[Rr] & Ar) {
                  Mr = !0;
                  var Gr = L[Rr] & ut ? C : S;
                  if (Gr === tt) {
                    Ne = Gr;
                    break;
                  }
                }
              }
              if (Mr && !Ne) {
                Ne = st;
                for (var rr = Dt - 1; rr >= 0; rr--) {
                  var Or = ie[rr];
                  if (L[Or] & Ar) {
                    var Lr = L[Or] & ut ? C : S;
                    Lr !== tt ? Ne = Lr : Ne = tt;
                    break;
                  }
                }
              }
              if (Ne) {
                if (L[ie[Dt]] = L[ie[er]] = Ne, Ne !== tt) {
                  for (var dt = Dt + 1; dt < ie.length; dt++)
                    if (!(L[ie[dt]] & n)) {
                      l(j[ie[dt]]) & re && (L[ie[dt]] = Ne);
                      break;
                    }
                }
                if (Ne !== tt) {
                  for (var vt = er + 1; vt < ie.length; vt++)
                    if (!(L[ie[vt]] & n)) {
                      l(j[ie[vt]]) & re && (L[ie[vt]] = Ne);
                      break;
                    }
                }
              }
            }
            for (var Je = 0; Je < ie.length; Je++)
              if (L[ie[Je]] & o) {
                for (var Br = Je, nr = Je, ar = st, pt = Je - 1; pt >= 0; pt--)
                  if (L[ie[pt]] & n)
                    Br = pt;
                  else {
                    ar = L[ie[pt]] & ut ? C : S;
                    break;
                  }
                for (var Pr = _n, gt = Je + 1; gt < ie.length; gt++)
                  if (L[ie[gt]] & (o | n))
                    nr = gt;
                  else {
                    Pr = L[ie[gt]] & ut ? C : S;
                    break;
                  }
                for (var or = Br; or <= nr; or++)
                  L[ie[or]] = ar === Pr ? ar : tt;
                Je = nr;
              }
          }
        }
        for (var Pe = oe.start; Pe <= oe.end; Pe++) {
          var xn = Y[Pe], Et = L[Pe];
          if (xn & 1 ? Et & (S | I | m) && Y[Pe]++ : Et & C ? Y[Pe]++ : Et & (m | I) && (Y[Pe] += 2), Et & n && (Y[Pe] = Pe === 0 ? oe.level : Y[Pe - 1]), Pe === oe.end || l(j[Pe]) & (H | T))
            for (var Mt = Pe; Mt >= 0 && l(j[Mt]) & i; Mt--)
              Y[Mt] = oe.level;
        }
      }
      return {
        levels: Y,
        paragraphs: ne
      };
      function Ir(Le, We) {
        for (var Be = Le; Be < j.length; Be++) {
          var Ke = L[Be];
          if (Ke & (C | B))
            return 1;
          if (Ke & (T | S) || We && Ke === P)
            return 0;
          if (Ke & e) {
            var Nr = kn(Be);
            Be = Nr === -1 ? j.length : Nr;
          }
        }
        return 0;
      }
      function kn(Le) {
        for (var We = 1, Be = Le + 1; Be < j.length; Be++) {
          var Ke = L[Be];
          if (Ke & T)
            break;
          if (Ke & P) {
            if (--We === 0)
              return Be;
          } else Ke & e && We++;
        }
        return -1;
      }
    }
    var $ = "14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1", V;
    function W() {
      if (!V) {
        var j = g($, !0), te = j.map, q = j.reverseMap;
        q.forEach(function(L, he) {
          te.set(he, L);
        }), V = te;
      }
    }
    function pe(j) {
      return W(), V.get(j) || null;
    }
    function ue(j, te, q, L) {
      var he = j.length;
      q = Math.max(0, q == null ? 0 : +q), L = Math.min(he - 1, L == null ? he - 1 : +L);
      for (var K = /* @__PURE__ */ new Map(), ae = q; ae <= L; ae++)
        if (te[ae] & 1) {
          var Y = pe(j[ae]);
          Y !== null && K.set(ae, Y);
        }
      return K;
    }
    function Q(j, te, q, L) {
      var he = j.length;
      q = Math.max(0, q == null ? 0 : +q), L = Math.min(he - 1, L == null ? he - 1 : +L);
      var K = [];
      return te.paragraphs.forEach(function(ae) {
        var Y = Math.max(q, ae.start), be = Math.min(L, ae.end);
        if (Y < be) {
          for (var ne = te.levels.slice(Y, be + 1), oe = be; oe >= Y && l(j[oe]) & i; oe--)
            ne[oe] = ae.level;
          for (var le = ae.level, de = 1 / 0, Se = 0; Se < ne.length; Se++) {
            var Fe = ne[Se];
            Fe > le && (le = Fe), Fe < de && (de = Fe | 1);
          }
          for (var ge = le; ge >= de; ge--)
            for (var me = 0; me < ne.length; me++)
              if (ne[me] >= ge) {
                for (var fe = me; me + 1 < ne.length && ne[me + 1] >= ge; )
                  me++;
                me > fe && K.push([fe + Y, me + Y]);
              }
        }
      }), K;
    }
    function ee(j, te, q, L) {
      var he = se(j, te, q, L), K = [].concat(j);
      return he.forEach(function(ae, Y) {
        K[Y] = (te.levels[ae] & 1 ? pe(j[ae]) : null) || j[ae];
      }), K.join("");
    }
    function se(j, te, q, L) {
      for (var he = Q(j, te, q, L), K = [], ae = 0; ae < j.length; ae++)
        K[ae] = ae;
      return he.forEach(function(Y) {
        for (var be = Y[0], ne = Y[1], oe = K.slice(be, ne + 1), le = oe.length; le--; )
          K[ne - le] = oe[le];
      }), K;
    }
    return r.closingToOpeningBracket = w, r.getBidiCharType = l, r.getBidiCharTypeName = h, r.getCanonicalBracket = G, r.getEmbeddingLevels = X, r.getMirroredCharacter = pe, r.getMirroredCharactersMap = ue, r.getReorderSegments = Q, r.getReorderedIndices = se, r.getReorderedString = ee, r.openingToClosingBracket = U, Object.defineProperty(r, "__esModule", { value: !0 }), r;
  }({});
  return c;
}
const ln = /\bvoid\s+main\s*\(\s*\)\s*{/g;
function cr(c) {
  const r = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function d(u, t) {
    let e = An[t];
    return e ? cr(e) : u;
  }
  return c.replace(r, d);
}
const Ee = [];
for (let c = 0; c < 256; c++)
  Ee[c] = (c < 16 ? "0" : "") + c.toString(16);
function Kn() {
  const c = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0, d = Math.random() * 4294967295 | 0, u = Math.random() * 4294967295 | 0;
  return (Ee[c & 255] + Ee[c >> 8 & 255] + Ee[c >> 16 & 255] + Ee[c >> 24 & 255] + "-" + Ee[r & 255] + Ee[r >> 8 & 255] + "-" + Ee[r >> 16 & 15 | 64] + Ee[r >> 24 & 255] + "-" + Ee[d & 63 | 128] + Ee[d >> 8 & 255] + "-" + Ee[d >> 16 & 255] + Ee[d >> 24 & 255] + Ee[u & 255] + Ee[u >> 8 & 255] + Ee[u >> 16 & 255] + Ee[u >> 24 & 255]).toUpperCase();
}
const qe = Object.assign || function() {
  let c = arguments[0];
  for (let r = 1, d = arguments.length; r < d; r++) {
    let u = arguments[r];
    if (u)
      for (let t in u)
        Object.prototype.hasOwnProperty.call(u, t) && (c[t] = u[t]);
  }
  return c;
}, Qn = Date.now(), Vr = /* @__PURE__ */ new WeakMap(), Hr = /* @__PURE__ */ new Map();
let Zn = 1e10;
function hr(c, r) {
  const d = ta(r);
  let u = Vr.get(c);
  if (u || Vr.set(c, u = /* @__PURE__ */ Object.create(null)), u[d])
    return new u[d]();
  const t = `_onBeforeCompile${d}`, e = function(i, s) {
    c.onBeforeCompile.call(this, i, s);
    const f = this.customProgramCacheKey() + "|" + i.vertexShader + "|" + i.fragmentShader;
    let l = Hr[f];
    if (!l) {
      const h = qn(this, i, r, d);
      l = Hr[f] = h;
    }
    i.vertexShader = l.vertexShader, i.fragmentShader = l.fragmentShader, qe(i.uniforms, this.uniforms), r.timeUniform && (i.uniforms[r.timeUniform] = {
      get value() {
        return Date.now() - Qn;
      }
    }), this[t] && this[t](i);
  }, a = function() {
    return o(r.chained ? c : c.clone());
  }, o = function(i) {
    const s = Object.create(i, n);
    return Object.defineProperty(s, "baseMaterial", { value: c }), Object.defineProperty(s, "id", { value: Zn++ }), s.uuid = Kn(), s.uniforms = qe({}, i.uniforms, r.uniforms), s.defines = qe({}, i.defines, r.defines), s.defines[`TROIKA_DERIVED_MATERIAL_${d}`] = "", s.extensions = qe({}, i.extensions, r.extensions), s._listeners = void 0, s;
  }, n = {
    constructor: { value: a },
    isDerivedMaterial: { value: !0 },
    customProgramCacheKey: {
      writable: !0,
      configurable: !0,
      value: function() {
        return c.customProgramCacheKey() + "|" + d;
      }
    },
    onBeforeCompile: {
      get() {
        return e;
      },
      set(i) {
        this[t] = i;
      }
    },
    copy: {
      writable: !0,
      configurable: !0,
      value: function(i) {
        return c.copy.call(this, i), !c.isShaderMaterial && !c.isDerivedMaterial && (qe(this.extensions, i.extensions), qe(this.defines, i.defines), qe(this.uniforms, wn.clone(i.uniforms))), this;
      }
    },
    clone: {
      writable: !0,
      configurable: !0,
      value: function() {
        const i = new c.constructor();
        return o(i).copy(this);
      }
    },
    /**
     * Utility to get a MeshDepthMaterial that will honor this derived material's vertex
     * transformations and discarded fragments.
     */
    getDepthMaterial: {
      writable: !0,
      configurable: !0,
      value: function() {
        let i = this._depthMaterial;
        return i || (i = this._depthMaterial = hr(
          c.isDerivedMaterial ? c.getDepthMaterial() : new Tn({ depthPacking: Fn }),
          r
        ), i.defines.IS_DEPTH_MATERIAL = "", i.uniforms = this.uniforms), i;
      }
    },
    /**
     * Utility to get a MeshDistanceMaterial that will honor this derived material's vertex
     * transformations and discarded fragments.
     */
    getDistanceMaterial: {
      writable: !0,
      configurable: !0,
      value: function() {
        let i = this._distanceMaterial;
        return i || (i = this._distanceMaterial = hr(
          c.isDerivedMaterial ? c.getDistanceMaterial() : new Cn(),
          r
        ), i.defines.IS_DISTANCE_MATERIAL = "", i.uniforms = this.uniforms), i;
      }
    },
    dispose: {
      writable: !0,
      configurable: !0,
      value() {
        const { _depthMaterial: i, _distanceMaterial: s } = this;
        i && i.dispose(), s && s.dispose(), c.dispose.call(this);
      }
    }
  };
  return u[d] = a, new a();
}
function qn(c, { vertexShader: r, fragmentShader: d }, u, t) {
  let {
    vertexDefs: e,
    vertexMainIntro: a,
    vertexMainOutro: o,
    vertexTransform: n,
    fragmentDefs: i,
    fragmentMainIntro: s,
    fragmentMainOutro: f,
    fragmentColorTransform: l,
    customRewriter: h,
    timeUniform: p
  } = u;
  if (e = e || "", a = a || "", o = o || "", i = i || "", s = s || "", f = f || "", (n || h) && (r = cr(r)), (l || h) && (d = d.replace(
    /^[ \t]*#include <((?:tonemapping|encodings|fog|premultiplied_alpha|dithering)_fragment)>/gm,
    `
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`
  ), d = cr(d)), h) {
    let g = h({ vertexShader: r, fragmentShader: d });
    r = g.vertexShader, d = g.fragmentShader;
  }
  if (l) {
    let g = [];
    d = d.replace(
      /^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,
      // [^]+? = non-greedy match of any chars including newlines
      (y) => (g.push(y), "")
    ), f = `${l}
${g.join(`
`)}
${f}`;
  }
  if (p) {
    const g = `
uniform float ${p};
`;
    e = g + e, i = g + i;
  }
  return n && (r = `vec3 troika_position_${t};
vec3 troika_normal_${t};
vec2 troika_uv_${t};
${r}
`, e = `${e}
void troikaVertexTransform${t}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${n}
}
`, a = `
troika_position_${t} = vec3(position);
troika_normal_${t} = vec3(normal);
troika_uv_${t} = vec2(uv);
troikaVertexTransform${t}(troika_position_${t}, troika_normal_${t}, troika_uv_${t});
${a}
`, r = r.replace(/\b(position|normal|uv)\b/g, (g, y, O, x) => /\battribute\s+vec[23]\s+$/.test(x.substr(0, O)) ? y : `troika_${y}_${t}`), c.map && c.map.channel > 0 || (r = r.replace(/\bMAP_UV\b/g, `troika_uv_${t}`))), r = Xr(r, t, e, a, o), d = Xr(d, t, i, s, f), {
    vertexShader: r,
    fragmentShader: d
  };
}
function Xr(c, r, d, u, t) {
  return (u || t || d) && (c = c.replace(
    ln,
    `
${d}
void troikaOrigMain${r}() {`
  ), c += `
void main() {
  ${u}
  troikaOrigMain${r}();
  ${t}
}`), c;
}
function $n(c, r) {
  return c === "uniforms" ? void 0 : typeof r == "function" ? r.toString() : r;
}
let ea = 0;
const Yr = /* @__PURE__ */ new Map();
function ta(c) {
  const r = JSON.stringify(c, $n);
  let d = Yr.get(r);
  return d == null && Yr.set(r, d = ++ea), d;
}
/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/
function ra() {
  return typeof window > "u" && (self.window = self), function(c) {
    var r = { parse: function(t) {
      var e = r._bin, a = new Uint8Array(t);
      if (e.readASCII(a, 0, 4) == "ttcf") {
        var o = 4;
        e.readUshort(a, o), o += 2, e.readUshort(a, o), o += 2;
        var n = e.readUint(a, o);
        o += 4;
        for (var i = [], s = 0; s < n; s++) {
          var f = e.readUint(a, o);
          o += 4, i.push(r._readFont(a, f));
        }
        return i;
      }
      return [r._readFont(a, 0)];
    }, _readFont: function(t, e) {
      var a = r._bin, o = e;
      a.readFixed(t, e), e += 4;
      var n = a.readUshort(t, e);
      e += 2, a.readUshort(t, e), e += 2, a.readUshort(t, e), e += 2, a.readUshort(t, e), e += 2;
      for (var i = ["cmap", "head", "hhea", "maxp", "hmtx", "name", "OS/2", "post", "loca", "glyf", "kern", "CFF ", "GDEF", "GPOS", "GSUB", "SVG "], s = { _data: t, _offset: o }, f = {}, l = 0; l < n; l++) {
        var h = a.readASCII(t, e, 4);
        e += 4, a.readUint(t, e), e += 4;
        var p = a.readUint(t, e);
        e += 4;
        var g = a.readUint(t, e);
        e += 4, f[h] = { offset: p, length: g };
      }
      for (l = 0; l < i.length; l++) {
        var y = i[l];
        f[y] && (s[y.trim()] = r[y.trim()].parse(t, f[y].offset, f[y].length, s));
      }
      return s;
    }, _tabOffset: function(t, e, a) {
      for (var o = r._bin, n = o.readUshort(t, a + 4), i = a + 12, s = 0; s < n; s++) {
        var f = o.readASCII(t, i, 4);
        i += 4, o.readUint(t, i), i += 4;
        var l = o.readUint(t, i);
        if (i += 4, o.readUint(t, i), i += 4, f == e) return l;
      }
      return 0;
    } };
    r._bin = { readFixed: function(t, e) {
      return (t[e] << 8 | t[e + 1]) + (t[e + 2] << 8 | t[e + 3]) / 65540;
    }, readF2dot14: function(t, e) {
      return r._bin.readShort(t, e) / 16384;
    }, readInt: function(t, e) {
      return r._bin._view(t).getInt32(e);
    }, readInt8: function(t, e) {
      return r._bin._view(t).getInt8(e);
    }, readShort: function(t, e) {
      return r._bin._view(t).getInt16(e);
    }, readUshort: function(t, e) {
      return r._bin._view(t).getUint16(e);
    }, readUshorts: function(t, e, a) {
      for (var o = [], n = 0; n < a; n++) o.push(r._bin.readUshort(t, e + 2 * n));
      return o;
    }, readUint: function(t, e) {
      return r._bin._view(t).getUint32(e);
    }, readUint64: function(t, e) {
      return 4294967296 * r._bin.readUint(t, e) + r._bin.readUint(t, e + 4);
    }, readASCII: function(t, e, a) {
      for (var o = "", n = 0; n < a; n++) o += String.fromCharCode(t[e + n]);
      return o;
    }, readUnicode: function(t, e, a) {
      for (var o = "", n = 0; n < a; n++) {
        var i = t[e++] << 8 | t[e++];
        o += String.fromCharCode(i);
      }
      return o;
    }, _tdec: typeof window < "u" && window.TextDecoder ? new window.TextDecoder() : null, readUTF8: function(t, e, a) {
      var o = r._bin._tdec;
      return o && e == 0 && a == t.length ? o.decode(t) : r._bin.readASCII(t, e, a);
    }, readBytes: function(t, e, a) {
      for (var o = [], n = 0; n < a; n++) o.push(t[e + n]);
      return o;
    }, readASCIIArray: function(t, e, a) {
      for (var o = [], n = 0; n < a; n++) o.push(String.fromCharCode(t[e + n]));
      return o;
    }, _view: function(t) {
      return t._dataView || (t._dataView = t.buffer ? new DataView(t.buffer, t.byteOffset, t.byteLength) : new DataView(new Uint8Array(t).buffer));
    } }, r._lctf = {}, r._lctf.parse = function(t, e, a, o, n) {
      var i = r._bin, s = {}, f = e;
      i.readFixed(t, e), e += 4;
      var l = i.readUshort(t, e);
      e += 2;
      var h = i.readUshort(t, e);
      e += 2;
      var p = i.readUshort(t, e);
      return e += 2, s.scriptList = r._lctf.readScriptList(t, f + l), s.featureList = r._lctf.readFeatureList(t, f + h), s.lookupList = r._lctf.readLookupList(t, f + p, n), s;
    }, r._lctf.readLookupList = function(t, e, a) {
      var o = r._bin, n = e, i = [], s = o.readUshort(t, e);
      e += 2;
      for (var f = 0; f < s; f++) {
        var l = o.readUshort(t, e);
        e += 2;
        var h = r._lctf.readLookupTable(t, n + l, a);
        i.push(h);
      }
      return i;
    }, r._lctf.readLookupTable = function(t, e, a) {
      var o = r._bin, n = e, i = { tabs: [] };
      i.ltype = o.readUshort(t, e), e += 2, i.flag = o.readUshort(t, e), e += 2;
      var s = o.readUshort(t, e);
      e += 2;
      for (var f = i.ltype, l = 0; l < s; l++) {
        var h = o.readUshort(t, e);
        e += 2;
        var p = a(t, f, n + h, i);
        i.tabs.push(p);
      }
      return i;
    }, r._lctf.numOfOnes = function(t) {
      for (var e = 0, a = 0; a < 32; a++) t >>> a & 1 && e++;
      return e;
    }, r._lctf.readClassDef = function(t, e) {
      var a = r._bin, o = [], n = a.readUshort(t, e);
      if (e += 2, n == 1) {
        var i = a.readUshort(t, e);
        e += 2;
        var s = a.readUshort(t, e);
        e += 2;
        for (var f = 0; f < s; f++) o.push(i + f), o.push(i + f), o.push(a.readUshort(t, e)), e += 2;
      }
      if (n == 2) {
        var l = a.readUshort(t, e);
        for (e += 2, f = 0; f < l; f++) o.push(a.readUshort(t, e)), e += 2, o.push(a.readUshort(t, e)), e += 2, o.push(a.readUshort(t, e)), e += 2;
      }
      return o;
    }, r._lctf.getInterval = function(t, e) {
      for (var a = 0; a < t.length; a += 3) {
        var o = t[a], n = t[a + 1];
        if (t[a + 2], o <= e && e <= n) return a;
      }
      return -1;
    }, r._lctf.readCoverage = function(t, e) {
      var a = r._bin, o = {};
      o.fmt = a.readUshort(t, e), e += 2;
      var n = a.readUshort(t, e);
      return e += 2, o.fmt == 1 && (o.tab = a.readUshorts(t, e, n)), o.fmt == 2 && (o.tab = a.readUshorts(t, e, 3 * n)), o;
    }, r._lctf.coverageIndex = function(t, e) {
      var a = t.tab;
      if (t.fmt == 1) return a.indexOf(e);
      if (t.fmt == 2) {
        var o = r._lctf.getInterval(a, e);
        if (o != -1) return a[o + 2] + (e - a[o]);
      }
      return -1;
    }, r._lctf.readFeatureList = function(t, e) {
      var a = r._bin, o = e, n = [], i = a.readUshort(t, e);
      e += 2;
      for (var s = 0; s < i; s++) {
        var f = a.readASCII(t, e, 4);
        e += 4;
        var l = a.readUshort(t, e);
        e += 2;
        var h = r._lctf.readFeatureTable(t, o + l);
        h.tag = f.trim(), n.push(h);
      }
      return n;
    }, r._lctf.readFeatureTable = function(t, e) {
      var a = r._bin, o = e, n = {}, i = a.readUshort(t, e);
      e += 2, i > 0 && (n.featureParams = o + i);
      var s = a.readUshort(t, e);
      e += 2, n.tab = [];
      for (var f = 0; f < s; f++) n.tab.push(a.readUshort(t, e + 2 * f));
      return n;
    }, r._lctf.readScriptList = function(t, e) {
      var a = r._bin, o = e, n = {}, i = a.readUshort(t, e);
      e += 2;
      for (var s = 0; s < i; s++) {
        var f = a.readASCII(t, e, 4);
        e += 4;
        var l = a.readUshort(t, e);
        e += 2, n[f.trim()] = r._lctf.readScriptTable(t, o + l);
      }
      return n;
    }, r._lctf.readScriptTable = function(t, e) {
      var a = r._bin, o = e, n = {}, i = a.readUshort(t, e);
      e += 2, i > 0 && (n.default = r._lctf.readLangSysTable(t, o + i));
      var s = a.readUshort(t, e);
      e += 2;
      for (var f = 0; f < s; f++) {
        var l = a.readASCII(t, e, 4);
        e += 4;
        var h = a.readUshort(t, e);
        e += 2, n[l.trim()] = r._lctf.readLangSysTable(t, o + h);
      }
      return n;
    }, r._lctf.readLangSysTable = function(t, e) {
      var a = r._bin, o = {};
      a.readUshort(t, e), e += 2, o.reqFeature = a.readUshort(t, e), e += 2;
      var n = a.readUshort(t, e);
      return e += 2, o.features = a.readUshorts(t, e, n), o;
    }, r.CFF = {}, r.CFF.parse = function(t, e, a) {
      var o = r._bin;
      (t = new Uint8Array(t.buffer, e, a))[e = 0], t[++e], t[++e], t[++e], e++;
      var n = [];
      e = r.CFF.readIndex(t, e, n);
      for (var i = [], s = 0; s < n.length - 1; s++) i.push(o.readASCII(t, e + n[s], n[s + 1] - n[s]));
      e += n[n.length - 1];
      var f = [];
      e = r.CFF.readIndex(t, e, f);
      var l = [];
      for (s = 0; s < f.length - 1; s++) l.push(r.CFF.readDict(t, e + f[s], e + f[s + 1]));
      e += f[f.length - 1];
      var h = l[0], p = [];
      e = r.CFF.readIndex(t, e, p);
      var g = [];
      for (s = 0; s < p.length - 1; s++) g.push(o.readASCII(t, e + p[s], p[s + 1] - p[s]));
      if (e += p[p.length - 1], r.CFF.readSubrs(t, e, h), h.CharStrings) {
        e = h.CharStrings, p = [], e = r.CFF.readIndex(t, e, p);
        var y = [];
        for (s = 0; s < p.length - 1; s++) y.push(o.readBytes(t, e + p[s], p[s + 1] - p[s]));
        h.CharStrings = y;
      }
      if (h.ROS) {
        e = h.FDArray;
        var O = [];
        for (e = r.CFF.readIndex(t, e, O), h.FDArray = [], s = 0; s < O.length - 1; s++) {
          var x = r.CFF.readDict(t, e + O[s], e + O[s + 1]);
          r.CFF._readFDict(t, x, g), h.FDArray.push(x);
        }
        e += O[O.length - 1], e = h.FDSelect, h.FDSelect = [];
        var F = t[e];
        if (e++, F != 3) throw F;
        var U = o.readUshort(t, e);
        for (e += 2, s = 0; s < U + 1; s++) h.FDSelect.push(o.readUshort(t, e), t[e + 2]), e += 3;
      }
      return h.Encoding && (h.Encoding = r.CFF.readEncoding(t, h.Encoding, h.CharStrings.length)), h.charset && (h.charset = r.CFF.readCharset(t, h.charset, h.CharStrings.length)), r.CFF._readFDict(t, h, g), h;
    }, r.CFF._readFDict = function(t, e, a) {
      var o;
      for (var n in e.Private && (o = e.Private[1], e.Private = r.CFF.readDict(t, o, o + e.Private[0]), e.Private.Subrs && r.CFF.readSubrs(t, o + e.Private.Subrs, e.Private)), e) ["FamilyName", "FontName", "FullName", "Notice", "version", "Copyright"].indexOf(n) != -1 && (e[n] = a[e[n] - 426 + 35]);
    }, r.CFF.readSubrs = function(t, e, a) {
      var o = r._bin, n = [];
      e = r.CFF.readIndex(t, e, n);
      var i, s = n.length;
      i = s < 1240 ? 107 : s < 33900 ? 1131 : 32768, a.Bias = i, a.Subrs = [];
      for (var f = 0; f < n.length - 1; f++) a.Subrs.push(o.readBytes(t, e + n[f], n[f + 1] - n[f]));
    }, r.CFF.tableSE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 0, 111, 112, 113, 114, 0, 115, 116, 117, 118, 119, 120, 121, 122, 0, 123, 0, 124, 125, 126, 127, 128, 129, 130, 131, 0, 132, 133, 0, 134, 135, 136, 137, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 138, 0, 139, 0, 0, 0, 0, 140, 141, 142, 143, 0, 0, 0, 0, 0, 144, 0, 0, 0, 145, 0, 0, 146, 147, 148, 149, 0, 0, 0, 0], r.CFF.glyphByUnicode = function(t, e) {
      for (var a = 0; a < t.charset.length; a++) if (t.charset[a] == e) return a;
      return -1;
    }, r.CFF.glyphBySE = function(t, e) {
      return e < 0 || e > 255 ? -1 : r.CFF.glyphByUnicode(t, r.CFF.tableSE[e]);
    }, r.CFF.readEncoding = function(t, e, a) {
      r._bin;
      var o = [".notdef"], n = t[e];
      if (e++, n != 0) throw "error: unknown encoding format: " + n;
      var i = t[e];
      e++;
      for (var s = 0; s < i; s++) o.push(t[e + s]);
      return o;
    }, r.CFF.readCharset = function(t, e, a) {
      var o = r._bin, n = [".notdef"], i = t[e];
      if (e++, i == 0) for (var s = 0; s < a; s++) {
        var f = o.readUshort(t, e);
        e += 2, n.push(f);
      }
      else {
        if (i != 1 && i != 2) throw "error: format: " + i;
        for (; n.length < a; ) {
          f = o.readUshort(t, e), e += 2;
          var l = 0;
          for (i == 1 ? (l = t[e], e++) : (l = o.readUshort(t, e), e += 2), s = 0; s <= l; s++) n.push(f), f++;
        }
      }
      return n;
    }, r.CFF.readIndex = function(t, e, a) {
      var o = r._bin, n = o.readUshort(t, e) + 1, i = t[e += 2];
      if (e++, i == 1) for (var s = 0; s < n; s++) a.push(t[e + s]);
      else if (i == 2) for (s = 0; s < n; s++) a.push(o.readUshort(t, e + 2 * s));
      else if (i == 3) for (s = 0; s < n; s++) a.push(16777215 & o.readUint(t, e + 3 * s - 1));
      else if (n != 1) throw "unsupported offset size: " + i + ", count: " + n;
      return (e += n * i) - 1;
    }, r.CFF.getCharString = function(t, e, a) {
      var o = r._bin, n = t[e], i = t[e + 1];
      t[e + 2], t[e + 3], t[e + 4];
      var s = 1, f = null, l = null;
      n <= 20 && (f = n, s = 1), n == 12 && (f = 100 * n + i, s = 2), 21 <= n && n <= 27 && (f = n, s = 1), n == 28 && (l = o.readShort(t, e + 1), s = 3), 29 <= n && n <= 31 && (f = n, s = 1), 32 <= n && n <= 246 && (l = n - 139, s = 1), 247 <= n && n <= 250 && (l = 256 * (n - 247) + i + 108, s = 2), 251 <= n && n <= 254 && (l = 256 * -(n - 251) - i - 108, s = 2), n == 255 && (l = o.readInt(t, e + 1) / 65535, s = 5), a.val = l ?? "o" + f, a.size = s;
    }, r.CFF.readCharString = function(t, e, a) {
      for (var o = e + a, n = r._bin, i = []; e < o; ) {
        var s = t[e], f = t[e + 1];
        t[e + 2], t[e + 3], t[e + 4];
        var l = 1, h = null, p = null;
        s <= 20 && (h = s, l = 1), s == 12 && (h = 100 * s + f, l = 2), s != 19 && s != 20 || (h = s, l = 2), 21 <= s && s <= 27 && (h = s, l = 1), s == 28 && (p = n.readShort(t, e + 1), l = 3), 29 <= s && s <= 31 && (h = s, l = 1), 32 <= s && s <= 246 && (p = s - 139, l = 1), 247 <= s && s <= 250 && (p = 256 * (s - 247) + f + 108, l = 2), 251 <= s && s <= 254 && (p = 256 * -(s - 251) - f - 108, l = 2), s == 255 && (p = n.readInt(t, e + 1) / 65535, l = 5), i.push(p ?? "o" + h), e += l;
      }
      return i;
    }, r.CFF.readDict = function(t, e, a) {
      for (var o = r._bin, n = {}, i = []; e < a; ) {
        var s = t[e], f = t[e + 1];
        t[e + 2], t[e + 3], t[e + 4];
        var l = 1, h = null, p = null;
        if (s == 28 && (p = o.readShort(t, e + 1), l = 3), s == 29 && (p = o.readInt(t, e + 1), l = 5), 32 <= s && s <= 246 && (p = s - 139, l = 1), 247 <= s && s <= 250 && (p = 256 * (s - 247) + f + 108, l = 2), 251 <= s && s <= 254 && (p = 256 * -(s - 251) - f - 108, l = 2), s == 255) throw p = o.readInt(t, e + 1) / 65535, l = 5, "unknown number";
        if (s == 30) {
          var g = [];
          for (l = 1; ; ) {
            var y = t[e + l];
            l++;
            var O = y >> 4, x = 15 & y;
            if (O != 15 && g.push(O), x != 15 && g.push(x), x == 15) break;
          }
          for (var F = "", U = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "e", "e-", "reserved", "-", "endOfNumber"], w = 0; w < g.length; w++) F += U[g[w]];
          p = parseFloat(F);
        }
        s <= 21 && (h = ["version", "Notice", "FullName", "FamilyName", "Weight", "FontBBox", "BlueValues", "OtherBlues", "FamilyBlues", "FamilyOtherBlues", "StdHW", "StdVW", "escape", "UniqueID", "XUID", "charset", "Encoding", "CharStrings", "Private", "Subrs", "defaultWidthX", "nominalWidthX"][s], l = 1, s == 12 && (h = ["Copyright", "isFixedPitch", "ItalicAngle", "UnderlinePosition", "UnderlineThickness", "PaintType", "CharstringType", "FontMatrix", "StrokeWidth", "BlueScale", "BlueShift", "BlueFuzz", "StemSnapH", "StemSnapV", "ForceBold", 0, 0, "LanguageGroup", "ExpansionFactor", "initialRandomSeed", "SyntheticBase", "PostScript", "BaseFontName", "BaseFontBlend", 0, 0, 0, 0, 0, 0, "ROS", "CIDFontVersion", "CIDFontRevision", "CIDFontType", "CIDCount", "UIDBase", "FDArray", "FDSelect", "FontName"][f], l = 2)), h != null ? (n[h] = i.length == 1 ? i[0] : i, i = []) : i.push(p), e += l;
      }
      return n;
    }, r.cmap = {}, r.cmap.parse = function(t, e, a) {
      t = new Uint8Array(t.buffer, e, a), e = 0;
      var o = r._bin, n = {};
      o.readUshort(t, e), e += 2;
      var i = o.readUshort(t, e);
      e += 2;
      var s = [];
      n.tables = [];
      for (var f = 0; f < i; f++) {
        var l = o.readUshort(t, e);
        e += 2;
        var h = o.readUshort(t, e);
        e += 2;
        var p = o.readUint(t, e);
        e += 4;
        var g = "p" + l + "e" + h, y = s.indexOf(p);
        if (y == -1) {
          var O;
          y = n.tables.length, s.push(p);
          var x = o.readUshort(t, p);
          x == 0 ? O = r.cmap.parse0(t, p) : x == 4 ? O = r.cmap.parse4(t, p) : x == 6 ? O = r.cmap.parse6(t, p) : x == 12 ? O = r.cmap.parse12(t, p) : console.debug("unknown format: " + x, l, h, p), n.tables.push(O);
        }
        if (n[g] != null) throw "multiple tables for one platform+encoding";
        n[g] = y;
      }
      return n;
    }, r.cmap.parse0 = function(t, e) {
      var a = r._bin, o = {};
      o.format = a.readUshort(t, e), e += 2;
      var n = a.readUshort(t, e);
      e += 2, a.readUshort(t, e), e += 2, o.map = [];
      for (var i = 0; i < n - 6; i++) o.map.push(t[e + i]);
      return o;
    }, r.cmap.parse4 = function(t, e) {
      var a = r._bin, o = e, n = {};
      n.format = a.readUshort(t, e), e += 2;
      var i = a.readUshort(t, e);
      e += 2, a.readUshort(t, e), e += 2;
      var s = a.readUshort(t, e);
      e += 2;
      var f = s / 2;
      n.searchRange = a.readUshort(t, e), e += 2, n.entrySelector = a.readUshort(t, e), e += 2, n.rangeShift = a.readUshort(t, e), e += 2, n.endCount = a.readUshorts(t, e, f), e += 2 * f, e += 2, n.startCount = a.readUshorts(t, e, f), e += 2 * f, n.idDelta = [];
      for (var l = 0; l < f; l++) n.idDelta.push(a.readShort(t, e)), e += 2;
      for (n.idRangeOffset = a.readUshorts(t, e, f), e += 2 * f, n.glyphIdArray = []; e < o + i; ) n.glyphIdArray.push(a.readUshort(t, e)), e += 2;
      return n;
    }, r.cmap.parse6 = function(t, e) {
      var a = r._bin, o = {};
      o.format = a.readUshort(t, e), e += 2, a.readUshort(t, e), e += 2, a.readUshort(t, e), e += 2, o.firstCode = a.readUshort(t, e), e += 2;
      var n = a.readUshort(t, e);
      e += 2, o.glyphIdArray = [];
      for (var i = 0; i < n; i++) o.glyphIdArray.push(a.readUshort(t, e)), e += 2;
      return o;
    }, r.cmap.parse12 = function(t, e) {
      var a = r._bin, o = {};
      o.format = a.readUshort(t, e), e += 2, e += 2, a.readUint(t, e), e += 4, a.readUint(t, e), e += 4;
      var n = a.readUint(t, e);
      e += 4, o.groups = [];
      for (var i = 0; i < n; i++) {
        var s = e + 12 * i, f = a.readUint(t, s + 0), l = a.readUint(t, s + 4), h = a.readUint(t, s + 8);
        o.groups.push([f, l, h]);
      }
      return o;
    }, r.glyf = {}, r.glyf.parse = function(t, e, a, o) {
      for (var n = [], i = 0; i < o.maxp.numGlyphs; i++) n.push(null);
      return n;
    }, r.glyf._parseGlyf = function(t, e) {
      var a = r._bin, o = t._data, n = r._tabOffset(o, "glyf", t._offset) + t.loca[e];
      if (t.loca[e] == t.loca[e + 1]) return null;
      var i = {};
      if (i.noc = a.readShort(o, n), n += 2, i.xMin = a.readShort(o, n), n += 2, i.yMin = a.readShort(o, n), n += 2, i.xMax = a.readShort(o, n), n += 2, i.yMax = a.readShort(o, n), n += 2, i.xMin >= i.xMax || i.yMin >= i.yMax) return null;
      if (i.noc > 0) {
        i.endPts = [];
        for (var s = 0; s < i.noc; s++) i.endPts.push(a.readUshort(o, n)), n += 2;
        var f = a.readUshort(o, n);
        if (n += 2, o.length - n < f) return null;
        i.instructions = a.readBytes(o, n, f), n += f;
        var l = i.endPts[i.noc - 1] + 1;
        for (i.flags = [], s = 0; s < l; s++) {
          var h = o[n];
          if (n++, i.flags.push(h), (8 & h) != 0) {
            var p = o[n];
            n++;
            for (var g = 0; g < p; g++) i.flags.push(h), s++;
          }
        }
        for (i.xs = [], s = 0; s < l; s++) {
          var y = (2 & i.flags[s]) != 0, O = (16 & i.flags[s]) != 0;
          y ? (i.xs.push(O ? o[n] : -o[n]), n++) : O ? i.xs.push(0) : (i.xs.push(a.readShort(o, n)), n += 2);
        }
        for (i.ys = [], s = 0; s < l; s++)
          y = (4 & i.flags[s]) != 0, O = (32 & i.flags[s]) != 0, y ? (i.ys.push(O ? o[n] : -o[n]), n++) : O ? i.ys.push(0) : (i.ys.push(a.readShort(o, n)), n += 2);
        var x = 0, F = 0;
        for (s = 0; s < l; s++) x += i.xs[s], F += i.ys[s], i.xs[s] = x, i.ys[s] = F;
      } else {
        var U;
        i.parts = [];
        do {
          U = a.readUshort(o, n), n += 2;
          var w = { m: { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 }, p1: -1, p2: -1 };
          if (i.parts.push(w), w.glyphIndex = a.readUshort(o, n), n += 2, 1 & U) {
            var G = a.readShort(o, n);
            n += 2;
            var S = a.readShort(o, n);
            n += 2;
          } else
            G = a.readInt8(o, n), n++, S = a.readInt8(o, n), n++;
          2 & U ? (w.m.tx = G, w.m.ty = S) : (w.p1 = G, w.p2 = S), 8 & U ? (w.m.a = w.m.d = a.readF2dot14(o, n), n += 2) : 64 & U ? (w.m.a = a.readF2dot14(o, n), n += 2, w.m.d = a.readF2dot14(o, n), n += 2) : 128 & U && (w.m.a = a.readF2dot14(o, n), n += 2, w.m.b = a.readF2dot14(o, n), n += 2, w.m.c = a.readF2dot14(o, n), n += 2, w.m.d = a.readF2dot14(o, n), n += 2);
        } while (32 & U);
        if (256 & U) {
          var C = a.readUshort(o, n);
          for (n += 2, i.instr = [], s = 0; s < C; s++) i.instr.push(o[n]), n++;
        }
      }
      return i;
    }, r.GDEF = {}, r.GDEF.parse = function(t, e, a, o) {
      var n = e;
      e += 4;
      var i = r._bin.readUshort(t, e);
      return { glyphClassDef: i === 0 ? null : r._lctf.readClassDef(t, n + i) };
    }, r.GPOS = {}, r.GPOS.parse = function(t, e, a, o) {
      return r._lctf.parse(t, e, a, o, r.GPOS.subt);
    }, r.GPOS.subt = function(t, e, a, o) {
      var n = r._bin, i = a, s = {};
      if (s.fmt = n.readUshort(t, a), a += 2, e == 1 || e == 2 || e == 3 || e == 7 || e == 8 && s.fmt <= 2) {
        var f = n.readUshort(t, a);
        a += 2, s.coverage = r._lctf.readCoverage(t, f + i);
      }
      if (e == 1 && s.fmt == 1) {
        var l = n.readUshort(t, a);
        a += 2, l != 0 && (s.pos = r.GPOS.readValueRecord(t, a, l));
      } else if (e == 2 && s.fmt >= 1 && s.fmt <= 2) {
        l = n.readUshort(t, a), a += 2;
        var h = n.readUshort(t, a);
        a += 2;
        var p = r._lctf.numOfOnes(l), g = r._lctf.numOfOnes(h);
        if (s.fmt == 1) {
          s.pairsets = [];
          var y = n.readUshort(t, a);
          a += 2;
          for (var O = 0; O < y; O++) {
            var x = i + n.readUshort(t, a);
            a += 2;
            var F = n.readUshort(t, x);
            x += 2;
            for (var U = [], w = 0; w < F; w++) {
              var G = n.readUshort(t, x);
              x += 2, l != 0 && (m = r.GPOS.readValueRecord(t, x, l), x += 2 * p), h != 0 && (D = r.GPOS.readValueRecord(t, x, h), x += 2 * g), U.push({ gid2: G, val1: m, val2: D });
            }
            s.pairsets.push(U);
          }
        }
        if (s.fmt == 2) {
          var S = n.readUshort(t, a);
          a += 2;
          var C = n.readUshort(t, a);
          a += 2;
          var I = n.readUshort(t, a);
          a += 2;
          var R = n.readUshort(t, a);
          for (a += 2, s.classDef1 = r._lctf.readClassDef(t, i + S), s.classDef2 = r._lctf.readClassDef(t, i + C), s.matrix = [], O = 0; O < I; O++) {
            var J = [];
            for (w = 0; w < R; w++) {
              var m = null, D = null;
              l != 0 && (m = r.GPOS.readValueRecord(t, a, l), a += 2 * p), h != 0 && (D = r.GPOS.readValueRecord(t, a, h), a += 2 * g), J.push({ val1: m, val2: D });
            }
            s.matrix.push(J);
          }
        }
      } else if (e == 4 && s.fmt == 1) s.markCoverage = r._lctf.readCoverage(t, n.readUshort(t, a) + i), s.baseCoverage = r._lctf.readCoverage(t, n.readUshort(t, a + 2) + i), s.markClassCount = n.readUshort(t, a + 4), s.markArray = r.GPOS.readMarkArray(t, n.readUshort(t, a + 6) + i), s.baseArray = r.GPOS.readBaseArray(t, n.readUshort(t, a + 8) + i, s.markClassCount);
      else if (e == 6 && s.fmt == 1) s.mark1Coverage = r._lctf.readCoverage(t, n.readUshort(t, a) + i), s.mark2Coverage = r._lctf.readCoverage(t, n.readUshort(t, a + 2) + i), s.markClassCount = n.readUshort(t, a + 4), s.mark1Array = r.GPOS.readMarkArray(t, n.readUshort(t, a + 6) + i), s.mark2Array = r.GPOS.readBaseArray(t, n.readUshort(t, a + 8) + i, s.markClassCount);
      else {
        if (e == 9 && s.fmt == 1) {
          var T = n.readUshort(t, a);
          a += 2;
          var H = n.readUint(t, a);
          if (a += 4, o.ltype == 9) o.ltype = T;
          else if (o.ltype != T) throw "invalid extension substitution";
          return r.GPOS.subt(t, o.ltype, i + H);
        }
        console.debug("unsupported GPOS table LookupType", e, "format", s.fmt);
      }
      return s;
    }, r.GPOS.readValueRecord = function(t, e, a) {
      var o = r._bin, n = [];
      return n.push(1 & a ? o.readShort(t, e) : 0), e += 1 & a ? 2 : 0, n.push(2 & a ? o.readShort(t, e) : 0), e += 2 & a ? 2 : 0, n.push(4 & a ? o.readShort(t, e) : 0), e += 4 & a ? 2 : 0, n.push(8 & a ? o.readShort(t, e) : 0), e += 8 & a ? 2 : 0, n;
    }, r.GPOS.readBaseArray = function(t, e, a) {
      var o = r._bin, n = [], i = e, s = o.readUshort(t, e);
      e += 2;
      for (var f = 0; f < s; f++) {
        for (var l = [], h = 0; h < a; h++) l.push(r.GPOS.readAnchorRecord(t, i + o.readUshort(t, e))), e += 2;
        n.push(l);
      }
      return n;
    }, r.GPOS.readMarkArray = function(t, e) {
      var a = r._bin, o = [], n = e, i = a.readUshort(t, e);
      e += 2;
      for (var s = 0; s < i; s++) {
        var f = r.GPOS.readAnchorRecord(t, a.readUshort(t, e + 2) + n);
        f.markClass = a.readUshort(t, e), o.push(f), e += 4;
      }
      return o;
    }, r.GPOS.readAnchorRecord = function(t, e) {
      var a = r._bin, o = {};
      return o.fmt = a.readUshort(t, e), o.x = a.readShort(t, e + 2), o.y = a.readShort(t, e + 4), o;
    }, r.GSUB = {}, r.GSUB.parse = function(t, e, a, o) {
      return r._lctf.parse(t, e, a, o, r.GSUB.subt);
    }, r.GSUB.subt = function(t, e, a, o) {
      var n = r._bin, i = a, s = {};
      if (s.fmt = n.readUshort(t, a), a += 2, e != 1 && e != 2 && e != 4 && e != 5 && e != 6) return null;
      if (e == 1 || e == 2 || e == 4 || e == 5 && s.fmt <= 2 || e == 6 && s.fmt <= 2) {
        var f = n.readUshort(t, a);
        a += 2, s.coverage = r._lctf.readCoverage(t, i + f);
      }
      if (e == 1 && s.fmt >= 1 && s.fmt <= 2) {
        if (s.fmt == 1) s.delta = n.readShort(t, a), a += 2;
        else if (s.fmt == 2) {
          var l = n.readUshort(t, a);
          a += 2, s.newg = n.readUshorts(t, a, l), a += 2 * s.newg.length;
        }
      } else if (e == 2 && s.fmt == 1) {
        l = n.readUshort(t, a), a += 2, s.seqs = [];
        for (var h = 0; h < l; h++) {
          var p = n.readUshort(t, a) + i;
          a += 2;
          var g = n.readUshort(t, p);
          s.seqs.push(n.readUshorts(t, p + 2, g));
        }
      } else if (e == 4)
        for (s.vals = [], l = n.readUshort(t, a), a += 2, h = 0; h < l; h++) {
          var y = n.readUshort(t, a);
          a += 2, s.vals.push(r.GSUB.readLigatureSet(t, i + y));
        }
      else if (e == 5 && s.fmt == 2) {
        if (s.fmt == 2) {
          var O = n.readUshort(t, a);
          a += 2, s.cDef = r._lctf.readClassDef(t, i + O), s.scset = [];
          var x = n.readUshort(t, a);
          for (a += 2, h = 0; h < x; h++) {
            var F = n.readUshort(t, a);
            a += 2, s.scset.push(F == 0 ? null : r.GSUB.readSubClassSet(t, i + F));
          }
        }
      } else if (e == 6 && s.fmt == 3) {
        if (s.fmt == 3) {
          for (h = 0; h < 3; h++) {
            l = n.readUshort(t, a), a += 2;
            for (var U = [], w = 0; w < l; w++) U.push(r._lctf.readCoverage(t, i + n.readUshort(t, a + 2 * w)));
            a += 2 * l, h == 0 && (s.backCvg = U), h == 1 && (s.inptCvg = U), h == 2 && (s.ahedCvg = U);
          }
          l = n.readUshort(t, a), a += 2, s.lookupRec = r.GSUB.readSubstLookupRecords(t, a, l);
        }
      } else {
        if (e == 7 && s.fmt == 1) {
          var G = n.readUshort(t, a);
          a += 2;
          var S = n.readUint(t, a);
          if (a += 4, o.ltype == 9) o.ltype = G;
          else if (o.ltype != G) throw "invalid extension substitution";
          return r.GSUB.subt(t, o.ltype, i + S);
        }
        console.debug("unsupported GSUB table LookupType", e, "format", s.fmt);
      }
      return s;
    }, r.GSUB.readSubClassSet = function(t, e) {
      var a = r._bin.readUshort, o = e, n = [], i = a(t, e);
      e += 2;
      for (var s = 0; s < i; s++) {
        var f = a(t, e);
        e += 2, n.push(r.GSUB.readSubClassRule(t, o + f));
      }
      return n;
    }, r.GSUB.readSubClassRule = function(t, e) {
      var a = r._bin.readUshort, o = {}, n = a(t, e), i = a(t, e += 2);
      e += 2, o.input = [];
      for (var s = 0; s < n - 1; s++) o.input.push(a(t, e)), e += 2;
      return o.substLookupRecords = r.GSUB.readSubstLookupRecords(t, e, i), o;
    }, r.GSUB.readSubstLookupRecords = function(t, e, a) {
      for (var o = r._bin.readUshort, n = [], i = 0; i < a; i++) n.push(o(t, e), o(t, e + 2)), e += 4;
      return n;
    }, r.GSUB.readChainSubClassSet = function(t, e) {
      var a = r._bin, o = e, n = [], i = a.readUshort(t, e);
      e += 2;
      for (var s = 0; s < i; s++) {
        var f = a.readUshort(t, e);
        e += 2, n.push(r.GSUB.readChainSubClassRule(t, o + f));
      }
      return n;
    }, r.GSUB.readChainSubClassRule = function(t, e) {
      for (var a = r._bin, o = {}, n = ["backtrack", "input", "lookahead"], i = 0; i < n.length; i++) {
        var s = a.readUshort(t, e);
        e += 2, i == 1 && s--, o[n[i]] = a.readUshorts(t, e, s), e += 2 * o[n[i]].length;
      }
      return s = a.readUshort(t, e), e += 2, o.subst = a.readUshorts(t, e, 2 * s), e += 2 * o.subst.length, o;
    }, r.GSUB.readLigatureSet = function(t, e) {
      var a = r._bin, o = e, n = [], i = a.readUshort(t, e);
      e += 2;
      for (var s = 0; s < i; s++) {
        var f = a.readUshort(t, e);
        e += 2, n.push(r.GSUB.readLigature(t, o + f));
      }
      return n;
    }, r.GSUB.readLigature = function(t, e) {
      var a = r._bin, o = { chain: [] };
      o.nglyph = a.readUshort(t, e), e += 2;
      var n = a.readUshort(t, e);
      e += 2;
      for (var i = 0; i < n - 1; i++) o.chain.push(a.readUshort(t, e)), e += 2;
      return o;
    }, r.head = {}, r.head.parse = function(t, e, a) {
      var o = r._bin, n = {};
      return o.readFixed(t, e), e += 4, n.fontRevision = o.readFixed(t, e), e += 4, o.readUint(t, e), e += 4, o.readUint(t, e), e += 4, n.flags = o.readUshort(t, e), e += 2, n.unitsPerEm = o.readUshort(t, e), e += 2, n.created = o.readUint64(t, e), e += 8, n.modified = o.readUint64(t, e), e += 8, n.xMin = o.readShort(t, e), e += 2, n.yMin = o.readShort(t, e), e += 2, n.xMax = o.readShort(t, e), e += 2, n.yMax = o.readShort(t, e), e += 2, n.macStyle = o.readUshort(t, e), e += 2, n.lowestRecPPEM = o.readUshort(t, e), e += 2, n.fontDirectionHint = o.readShort(t, e), e += 2, n.indexToLocFormat = o.readShort(t, e), e += 2, n.glyphDataFormat = o.readShort(t, e), e += 2, n;
    }, r.hhea = {}, r.hhea.parse = function(t, e, a) {
      var o = r._bin, n = {};
      return o.readFixed(t, e), e += 4, n.ascender = o.readShort(t, e), e += 2, n.descender = o.readShort(t, e), e += 2, n.lineGap = o.readShort(t, e), e += 2, n.advanceWidthMax = o.readUshort(t, e), e += 2, n.minLeftSideBearing = o.readShort(t, e), e += 2, n.minRightSideBearing = o.readShort(t, e), e += 2, n.xMaxExtent = o.readShort(t, e), e += 2, n.caretSlopeRise = o.readShort(t, e), e += 2, n.caretSlopeRun = o.readShort(t, e), e += 2, n.caretOffset = o.readShort(t, e), e += 2, e += 8, n.metricDataFormat = o.readShort(t, e), e += 2, n.numberOfHMetrics = o.readUshort(t, e), e += 2, n;
    }, r.hmtx = {}, r.hmtx.parse = function(t, e, a, o) {
      for (var n = r._bin, i = { aWidth: [], lsBearing: [] }, s = 0, f = 0, l = 0; l < o.maxp.numGlyphs; l++) l < o.hhea.numberOfHMetrics && (s = n.readUshort(t, e), e += 2, f = n.readShort(t, e), e += 2), i.aWidth.push(s), i.lsBearing.push(f);
      return i;
    }, r.kern = {}, r.kern.parse = function(t, e, a, o) {
      var n = r._bin, i = n.readUshort(t, e);
      if (e += 2, i == 1) return r.kern.parseV1(t, e - 2, a, o);
      var s = n.readUshort(t, e);
      e += 2;
      for (var f = { glyph1: [], rval: [] }, l = 0; l < s; l++) {
        e += 2, a = n.readUshort(t, e), e += 2;
        var h = n.readUshort(t, e);
        e += 2;
        var p = h >>> 8;
        if ((p &= 15) != 0) throw "unknown kern table format: " + p;
        e = r.kern.readFormat0(t, e, f);
      }
      return f;
    }, r.kern.parseV1 = function(t, e, a, o) {
      var n = r._bin;
      n.readFixed(t, e), e += 4;
      var i = n.readUint(t, e);
      e += 4;
      for (var s = { glyph1: [], rval: [] }, f = 0; f < i; f++) {
        n.readUint(t, e), e += 4;
        var l = n.readUshort(t, e);
        e += 2, n.readUshort(t, e), e += 2;
        var h = l >>> 8;
        if ((h &= 15) != 0) throw "unknown kern table format: " + h;
        e = r.kern.readFormat0(t, e, s);
      }
      return s;
    }, r.kern.readFormat0 = function(t, e, a) {
      var o = r._bin, n = -1, i = o.readUshort(t, e);
      e += 2, o.readUshort(t, e), e += 2, o.readUshort(t, e), e += 2, o.readUshort(t, e), e += 2;
      for (var s = 0; s < i; s++) {
        var f = o.readUshort(t, e);
        e += 2;
        var l = o.readUshort(t, e);
        e += 2;
        var h = o.readShort(t, e);
        e += 2, f != n && (a.glyph1.push(f), a.rval.push({ glyph2: [], vals: [] }));
        var p = a.rval[a.rval.length - 1];
        p.glyph2.push(l), p.vals.push(h), n = f;
      }
      return e;
    }, r.loca = {}, r.loca.parse = function(t, e, a, o) {
      var n = r._bin, i = [], s = o.head.indexToLocFormat, f = o.maxp.numGlyphs + 1;
      if (s == 0) for (var l = 0; l < f; l++) i.push(n.readUshort(t, e + (l << 1)) << 1);
      if (s == 1) for (l = 0; l < f; l++) i.push(n.readUint(t, e + (l << 2)));
      return i;
    }, r.maxp = {}, r.maxp.parse = function(t, e, a) {
      var o = r._bin, n = {}, i = o.readUint(t, e);
      return e += 4, n.numGlyphs = o.readUshort(t, e), e += 2, i == 65536 && (n.maxPoints = o.readUshort(t, e), e += 2, n.maxContours = o.readUshort(t, e), e += 2, n.maxCompositePoints = o.readUshort(t, e), e += 2, n.maxCompositeContours = o.readUshort(t, e), e += 2, n.maxZones = o.readUshort(t, e), e += 2, n.maxTwilightPoints = o.readUshort(t, e), e += 2, n.maxStorage = o.readUshort(t, e), e += 2, n.maxFunctionDefs = o.readUshort(t, e), e += 2, n.maxInstructionDefs = o.readUshort(t, e), e += 2, n.maxStackElements = o.readUshort(t, e), e += 2, n.maxSizeOfInstructions = o.readUshort(t, e), e += 2, n.maxComponentElements = o.readUshort(t, e), e += 2, n.maxComponentDepth = o.readUshort(t, e), e += 2), n;
    }, r.name = {}, r.name.parse = function(t, e, a) {
      var o = r._bin, n = {};
      o.readUshort(t, e), e += 2;
      var i = o.readUshort(t, e);
      e += 2, o.readUshort(t, e);
      for (var s, f = ["copyright", "fontFamily", "fontSubfamily", "ID", "fullName", "version", "postScriptName", "trademark", "manufacturer", "designer", "description", "urlVendor", "urlDesigner", "licence", "licenceURL", "---", "typoFamilyName", "typoSubfamilyName", "compatibleFull", "sampleText", "postScriptCID", "wwsFamilyName", "wwsSubfamilyName", "lightPalette", "darkPalette"], l = e += 2, h = 0; h < i; h++) {
        var p = o.readUshort(t, e);
        e += 2;
        var g = o.readUshort(t, e);
        e += 2;
        var y = o.readUshort(t, e);
        e += 2;
        var O = o.readUshort(t, e);
        e += 2;
        var x = o.readUshort(t, e);
        e += 2;
        var F = o.readUshort(t, e);
        e += 2;
        var U, w = f[O], G = l + 12 * i + F;
        if (p == 0) U = o.readUnicode(t, G, x / 2);
        else if (p == 3 && g == 0) U = o.readUnicode(t, G, x / 2);
        else if (g == 0) U = o.readASCII(t, G, x);
        else if (g == 1) U = o.readUnicode(t, G, x / 2);
        else if (g == 3) U = o.readUnicode(t, G, x / 2);
        else {
          if (p != 1) throw "unknown encoding " + g + ", platformID: " + p;
          U = o.readASCII(t, G, x), console.debug("reading unknown MAC encoding " + g + " as ASCII");
        }
        var S = "p" + p + "," + y.toString(16);
        n[S] == null && (n[S] = {}), n[S][w !== void 0 ? w : O] = U, n[S]._lang = y;
      }
      for (var C in n) if (n[C].postScriptName != null && n[C]._lang == 1033) return n[C];
      for (var C in n) if (n[C].postScriptName != null && n[C]._lang == 0) return n[C];
      for (var C in n) if (n[C].postScriptName != null && n[C]._lang == 3084) return n[C];
      for (var C in n) if (n[C].postScriptName != null) return n[C];
      for (var C in n) {
        s = C;
        break;
      }
      return console.debug("returning name table with languageID " + n[s]._lang), n[s];
    }, r["OS/2"] = {}, r["OS/2"].parse = function(t, e, a) {
      var o = r._bin.readUshort(t, e);
      e += 2;
      var n = {};
      if (o == 0) r["OS/2"].version0(t, e, n);
      else if (o == 1) r["OS/2"].version1(t, e, n);
      else if (o == 2 || o == 3 || o == 4) r["OS/2"].version2(t, e, n);
      else {
        if (o != 5) throw "unknown OS/2 table version: " + o;
        r["OS/2"].version5(t, e, n);
      }
      return n;
    }, r["OS/2"].version0 = function(t, e, a) {
      var o = r._bin;
      return a.xAvgCharWidth = o.readShort(t, e), e += 2, a.usWeightClass = o.readUshort(t, e), e += 2, a.usWidthClass = o.readUshort(t, e), e += 2, a.fsType = o.readUshort(t, e), e += 2, a.ySubscriptXSize = o.readShort(t, e), e += 2, a.ySubscriptYSize = o.readShort(t, e), e += 2, a.ySubscriptXOffset = o.readShort(t, e), e += 2, a.ySubscriptYOffset = o.readShort(t, e), e += 2, a.ySuperscriptXSize = o.readShort(t, e), e += 2, a.ySuperscriptYSize = o.readShort(t, e), e += 2, a.ySuperscriptXOffset = o.readShort(t, e), e += 2, a.ySuperscriptYOffset = o.readShort(t, e), e += 2, a.yStrikeoutSize = o.readShort(t, e), e += 2, a.yStrikeoutPosition = o.readShort(t, e), e += 2, a.sFamilyClass = o.readShort(t, e), e += 2, a.panose = o.readBytes(t, e, 10), e += 10, a.ulUnicodeRange1 = o.readUint(t, e), e += 4, a.ulUnicodeRange2 = o.readUint(t, e), e += 4, a.ulUnicodeRange3 = o.readUint(t, e), e += 4, a.ulUnicodeRange4 = o.readUint(t, e), e += 4, a.achVendID = [o.readInt8(t, e), o.readInt8(t, e + 1), o.readInt8(t, e + 2), o.readInt8(t, e + 3)], e += 4, a.fsSelection = o.readUshort(t, e), e += 2, a.usFirstCharIndex = o.readUshort(t, e), e += 2, a.usLastCharIndex = o.readUshort(t, e), e += 2, a.sTypoAscender = o.readShort(t, e), e += 2, a.sTypoDescender = o.readShort(t, e), e += 2, a.sTypoLineGap = o.readShort(t, e), e += 2, a.usWinAscent = o.readUshort(t, e), e += 2, a.usWinDescent = o.readUshort(t, e), e += 2;
    }, r["OS/2"].version1 = function(t, e, a) {
      var o = r._bin;
      return e = r["OS/2"].version0(t, e, a), a.ulCodePageRange1 = o.readUint(t, e), e += 4, a.ulCodePageRange2 = o.readUint(t, e), e += 4;
    }, r["OS/2"].version2 = function(t, e, a) {
      var o = r._bin;
      return e = r["OS/2"].version1(t, e, a), a.sxHeight = o.readShort(t, e), e += 2, a.sCapHeight = o.readShort(t, e), e += 2, a.usDefault = o.readUshort(t, e), e += 2, a.usBreak = o.readUshort(t, e), e += 2, a.usMaxContext = o.readUshort(t, e), e += 2;
    }, r["OS/2"].version5 = function(t, e, a) {
      var o = r._bin;
      return e = r["OS/2"].version2(t, e, a), a.usLowerOpticalPointSize = o.readUshort(t, e), e += 2, a.usUpperOpticalPointSize = o.readUshort(t, e), e += 2;
    }, r.post = {}, r.post.parse = function(t, e, a) {
      var o = r._bin, n = {};
      return n.version = o.readFixed(t, e), e += 4, n.italicAngle = o.readFixed(t, e), e += 4, n.underlinePosition = o.readShort(t, e), e += 2, n.underlineThickness = o.readShort(t, e), e += 2, n;
    }, r == null && (r = {}), r.U == null && (r.U = {}), r.U.codeToGlyph = function(t, e) {
      var a = t.cmap, o = -1;
      if (a.p0e4 != null ? o = a.p0e4 : a.p3e1 != null ? o = a.p3e1 : a.p1e0 != null ? o = a.p1e0 : a.p0e3 != null && (o = a.p0e3), o == -1) throw "no familiar platform and encoding!";
      var n = a.tables[o];
      if (n.format == 0) return e >= n.map.length ? 0 : n.map[e];
      if (n.format == 4) {
        for (var i = -1, s = 0; s < n.endCount.length; s++) if (e <= n.endCount[s]) {
          i = s;
          break;
        }
        return i == -1 || n.startCount[i] > e ? 0 : 65535 & (n.idRangeOffset[i] != 0 ? n.glyphIdArray[e - n.startCount[i] + (n.idRangeOffset[i] >> 1) - (n.idRangeOffset.length - i)] : e + n.idDelta[i]);
      }
      if (n.format == 12) {
        if (e > n.groups[n.groups.length - 1][1]) return 0;
        for (s = 0; s < n.groups.length; s++) {
          var f = n.groups[s];
          if (f[0] <= e && e <= f[1]) return f[2] + (e - f[0]);
        }
        return 0;
      }
      throw "unknown cmap table format " + n.format;
    }, r.U.glyphToPath = function(t, e) {
      var a = { cmds: [], crds: [] };
      if (t.SVG && t.SVG.entries[e]) {
        var o = t.SVG.entries[e];
        return o == null ? a : (typeof o == "string" && (o = r.SVG.toPath(o), t.SVG.entries[e] = o), o);
      }
      if (t.CFF) {
        var n = { x: 0, y: 0, stack: [], nStems: 0, haveWidth: !1, width: t.CFF.Private ? t.CFF.Private.defaultWidthX : 0, open: !1 }, i = t.CFF, s = t.CFF.Private;
        if (i.ROS) {
          for (var f = 0; i.FDSelect[f + 2] <= e; ) f += 2;
          s = i.FDArray[i.FDSelect[f + 1]].Private;
        }
        r.U._drawCFF(t.CFF.CharStrings[e], n, i, s, a);
      } else t.glyf && r.U._drawGlyf(e, t, a);
      return a;
    }, r.U._drawGlyf = function(t, e, a) {
      var o = e.glyf[t];
      o == null && (o = e.glyf[t] = r.glyf._parseGlyf(e, t)), o != null && (o.noc > -1 ? r.U._simpleGlyph(o, a) : r.U._compoGlyph(o, e, a));
    }, r.U._simpleGlyph = function(t, e) {
      for (var a = 0; a < t.noc; a++) {
        for (var o = a == 0 ? 0 : t.endPts[a - 1] + 1, n = t.endPts[a], i = o; i <= n; i++) {
          var s = i == o ? n : i - 1, f = i == n ? o : i + 1, l = 1 & t.flags[i], h = 1 & t.flags[s], p = 1 & t.flags[f], g = t.xs[i], y = t.ys[i];
          if (i == o) if (l) {
            if (!h) {
              r.U.P.moveTo(e, g, y);
              continue;
            }
            r.U.P.moveTo(e, t.xs[s], t.ys[s]);
          } else h ? r.U.P.moveTo(e, t.xs[s], t.ys[s]) : r.U.P.moveTo(e, (t.xs[s] + g) / 2, (t.ys[s] + y) / 2);
          l ? h && r.U.P.lineTo(e, g, y) : p ? r.U.P.qcurveTo(e, g, y, t.xs[f], t.ys[f]) : r.U.P.qcurveTo(e, g, y, (g + t.xs[f]) / 2, (y + t.ys[f]) / 2);
        }
        r.U.P.closePath(e);
      }
    }, r.U._compoGlyph = function(t, e, a) {
      for (var o = 0; o < t.parts.length; o++) {
        var n = { cmds: [], crds: [] }, i = t.parts[o];
        r.U._drawGlyf(i.glyphIndex, e, n);
        for (var s = i.m, f = 0; f < n.crds.length; f += 2) {
          var l = n.crds[f], h = n.crds[f + 1];
          a.crds.push(l * s.a + h * s.b + s.tx), a.crds.push(l * s.c + h * s.d + s.ty);
        }
        for (f = 0; f < n.cmds.length; f++) a.cmds.push(n.cmds[f]);
      }
    }, r.U._getGlyphClass = function(t, e) {
      var a = r._lctf.getInterval(e, t);
      return a == -1 ? 0 : e[a + 2];
    }, r.U._applySubs = function(t, e, a, o) {
      for (var n = t.length - e - 1, i = 0; i < a.tabs.length; i++) if (a.tabs[i] != null) {
        var s, f = a.tabs[i];
        if (!f.coverage || (s = r._lctf.coverageIndex(f.coverage, t[e])) != -1) {
          if (a.ltype == 1) t[e], f.fmt == 1 ? t[e] = t[e] + f.delta : t[e] = f.newg[s];
          else if (a.ltype == 4) for (var l = f.vals[s], h = 0; h < l.length; h++) {
            var p = l[h], g = p.chain.length;
            if (!(g > n)) {
              for (var y = !0, O = 0, x = 0; x < g; x++) {
                for (; t[e + O + (1 + x)] == -1; ) O++;
                p.chain[x] != t[e + O + (1 + x)] && (y = !1);
              }
              if (y) {
                for (t[e] = p.nglyph, x = 0; x < g + O; x++) t[e + x + 1] = -1;
                break;
              }
            }
          }
          else if (a.ltype == 5 && f.fmt == 2) for (var F = r._lctf.getInterval(f.cDef, t[e]), U = f.cDef[F + 2], w = f.scset[U], G = 0; G < w.length; G++) {
            var S = w[G], C = S.input;
            if (!(C.length > n)) {
              for (y = !0, x = 0; x < C.length; x++) {
                var I = r._lctf.getInterval(f.cDef, t[e + 1 + x]);
                if (F == -1 && f.cDef[I + 2] != C[x]) {
                  y = !1;
                  break;
                }
              }
              if (y) {
                var R = S.substLookupRecords;
                for (h = 0; h < R.length; h += 2) R[h], R[h + 1];
              }
            }
          }
          else if (a.ltype == 6 && f.fmt == 3) {
            if (!r.U._glsCovered(t, f.backCvg, e - f.backCvg.length) || !r.U._glsCovered(t, f.inptCvg, e) || !r.U._glsCovered(t, f.ahedCvg, e + f.inptCvg.length)) continue;
            var J = f.lookupRec;
            for (G = 0; G < J.length; G += 2) {
              F = J[G];
              var m = o[J[G + 1]];
              r.U._applySubs(t, e + F, m, o);
            }
          }
        }
      }
    }, r.U._glsCovered = function(t, e, a) {
      for (var o = 0; o < e.length; o++)
        if (r._lctf.coverageIndex(e[o], t[a + o]) == -1) return !1;
      return !0;
    }, r.U.glyphsToPath = function(t, e, a) {
      for (var o = { cmds: [], crds: [] }, n = 0, i = 0; i < e.length; i++) {
        var s = e[i];
        if (s != -1) {
          for (var f = i < e.length - 1 && e[i + 1] != -1 ? e[i + 1] : 0, l = r.U.glyphToPath(t, s), h = 0; h < l.crds.length; h += 2) o.crds.push(l.crds[h] + n), o.crds.push(l.crds[h + 1]);
          for (a && o.cmds.push(a), h = 0; h < l.cmds.length; h++) o.cmds.push(l.cmds[h]);
          a && o.cmds.push("X"), n += t.hmtx.aWidth[s], i < e.length - 1 && (n += r.U.getPairAdjustment(t, s, f));
        }
      }
      return o;
    }, r.U.P = {}, r.U.P.moveTo = function(t, e, a) {
      t.cmds.push("M"), t.crds.push(e, a);
    }, r.U.P.lineTo = function(t, e, a) {
      t.cmds.push("L"), t.crds.push(e, a);
    }, r.U.P.curveTo = function(t, e, a, o, n, i, s) {
      t.cmds.push("C"), t.crds.push(e, a, o, n, i, s);
    }, r.U.P.qcurveTo = function(t, e, a, o, n) {
      t.cmds.push("Q"), t.crds.push(e, a, o, n);
    }, r.U.P.closePath = function(t) {
      t.cmds.push("Z");
    }, r.U._drawCFF = function(t, e, a, o, n) {
      for (var i = e.stack, s = e.nStems, f = e.haveWidth, l = e.width, h = e.open, p = 0, g = e.x, y = e.y, O = 0, x = 0, F = 0, U = 0, w = 0, G = 0, S = 0, C = 0, I = 0, R = 0, J = { val: 0, size: 0 }; p < t.length; ) {
        r.CFF.getCharString(t, p, J);
        var m = J.val;
        if (p += J.size, m == "o1" || m == "o18") i.length % 2 != 0 && !f && (l = i.shift() + o.nominalWidthX), s += i.length >> 1, i.length = 0, f = !0;
        else if (m == "o3" || m == "o23")
          i.length % 2 != 0 && !f && (l = i.shift() + o.nominalWidthX), s += i.length >> 1, i.length = 0, f = !0;
        else if (m == "o4") i.length > 1 && !f && (l = i.shift() + o.nominalWidthX, f = !0), h && r.U.P.closePath(n), y += i.pop(), r.U.P.moveTo(n, g, y), h = !0;
        else if (m == "o5") for (; i.length > 0; ) g += i.shift(), y += i.shift(), r.U.P.lineTo(n, g, y);
        else if (m == "o6" || m == "o7") for (var D = i.length, T = m == "o6", H = 0; H < D; H++) {
          var z = i.shift();
          T ? g += z : y += z, T = !T, r.U.P.lineTo(n, g, y);
        }
        else if (m == "o8" || m == "o24") {
          D = i.length;
          for (var Z = 0; Z + 6 <= D; ) O = g + i.shift(), x = y + i.shift(), F = O + i.shift(), U = x + i.shift(), g = F + i.shift(), y = U + i.shift(), r.U.P.curveTo(n, O, x, F, U, g, y), Z += 6;
          m == "o24" && (g += i.shift(), y += i.shift(), r.U.P.lineTo(n, g, y));
        } else {
          if (m == "o11") break;
          if (m == "o1234" || m == "o1235" || m == "o1236" || m == "o1237") m == "o1234" && (x = y, F = (O = g + i.shift()) + i.shift(), R = U = x + i.shift(), G = U, C = y, g = (S = (w = (I = F + i.shift()) + i.shift()) + i.shift()) + i.shift(), r.U.P.curveTo(n, O, x, F, U, I, R), r.U.P.curveTo(n, w, G, S, C, g, y)), m == "o1235" && (O = g + i.shift(), x = y + i.shift(), F = O + i.shift(), U = x + i.shift(), I = F + i.shift(), R = U + i.shift(), w = I + i.shift(), G = R + i.shift(), S = w + i.shift(), C = G + i.shift(), g = S + i.shift(), y = C + i.shift(), i.shift(), r.U.P.curveTo(n, O, x, F, U, I, R), r.U.P.curveTo(n, w, G, S, C, g, y)), m == "o1236" && (O = g + i.shift(), x = y + i.shift(), F = O + i.shift(), R = U = x + i.shift(), G = U, S = (w = (I = F + i.shift()) + i.shift()) + i.shift(), C = G + i.shift(), g = S + i.shift(), r.U.P.curveTo(n, O, x, F, U, I, R), r.U.P.curveTo(n, w, G, S, C, g, y)), m == "o1237" && (O = g + i.shift(), x = y + i.shift(), F = O + i.shift(), U = x + i.shift(), I = F + i.shift(), R = U + i.shift(), w = I + i.shift(), G = R + i.shift(), S = w + i.shift(), C = G + i.shift(), Math.abs(S - g) > Math.abs(C - y) ? g = S + i.shift() : y = C + i.shift(), r.U.P.curveTo(n, O, x, F, U, I, R), r.U.P.curveTo(n, w, G, S, C, g, y));
          else if (m == "o14") {
            if (i.length > 0 && !f && (l = i.shift() + a.nominalWidthX, f = !0), i.length == 4) {
              var re = i.shift(), B = i.shift(), M = i.shift(), v = i.shift(), b = r.CFF.glyphBySE(a, M), k = r.CFF.glyphBySE(a, v);
              r.U._drawCFF(a.CharStrings[b], e, a, o, n), e.x = re, e.y = B, r.U._drawCFF(a.CharStrings[k], e, a, o, n);
            }
            h && (r.U.P.closePath(n), h = !1);
          } else if (m == "o19" || m == "o20")
            i.length % 2 != 0 && !f && (l = i.shift() + o.nominalWidthX), s += i.length >> 1, i.length = 0, f = !0, p += s + 7 >> 3;
          else if (m == "o21") i.length > 2 && !f && (l = i.shift() + o.nominalWidthX, f = !0), y += i.pop(), g += i.pop(), h && r.U.P.closePath(n), r.U.P.moveTo(n, g, y), h = !0;
          else if (m == "o22") i.length > 1 && !f && (l = i.shift() + o.nominalWidthX, f = !0), g += i.pop(), h && r.U.P.closePath(n), r.U.P.moveTo(n, g, y), h = !0;
          else if (m == "o25") {
            for (; i.length > 6; ) g += i.shift(), y += i.shift(), r.U.P.lineTo(n, g, y);
            O = g + i.shift(), x = y + i.shift(), F = O + i.shift(), U = x + i.shift(), g = F + i.shift(), y = U + i.shift(), r.U.P.curveTo(n, O, x, F, U, g, y);
          } else if (m == "o26") for (i.length % 2 && (g += i.shift()); i.length > 0; ) O = g, x = y + i.shift(), g = F = O + i.shift(), y = (U = x + i.shift()) + i.shift(), r.U.P.curveTo(n, O, x, F, U, g, y);
          else if (m == "o27") for (i.length % 2 && (y += i.shift()); i.length > 0; ) x = y, F = (O = g + i.shift()) + i.shift(), U = x + i.shift(), g = F + i.shift(), y = U, r.U.P.curveTo(n, O, x, F, U, g, y);
          else if (m == "o10" || m == "o29") {
            var A = m == "o10" ? o : a;
            if (i.length == 0) console.debug("error: empty stack");
            else {
              var _ = i.pop(), N = A.Subrs[_ + A.Bias];
              e.x = g, e.y = y, e.nStems = s, e.haveWidth = f, e.width = l, e.open = h, r.U._drawCFF(N, e, a, o, n), g = e.x, y = e.y, s = e.nStems, f = e.haveWidth, l = e.width, h = e.open;
            }
          } else if (m == "o30" || m == "o31") {
            var E = i.length, P = (Z = 0, m == "o31");
            for (Z += E - (D = -3 & E); Z < D; ) P ? (x = y, F = (O = g + i.shift()) + i.shift(), y = (U = x + i.shift()) + i.shift(), D - Z == 5 ? (g = F + i.shift(), Z++) : g = F, P = !1) : (O = g, x = y + i.shift(), F = O + i.shift(), U = x + i.shift(), g = F + i.shift(), D - Z == 5 ? (y = U + i.shift(), Z++) : y = U, P = !0), r.U.P.curveTo(n, O, x, F, U, g, y), Z += 4;
          } else {
            if ((m + "").charAt(0) == "o") throw console.debug("Unknown operation: " + m, t), m;
            i.push(m);
          }
        }
      }
      e.x = g, e.y = y, e.nStems = s, e.haveWidth = f, e.width = l, e.open = h;
    };
    var d = r, u = { Typr: d };
    return c.Typr = d, c.default = u, Object.defineProperty(c, "__esModule", { value: !0 }), c;
  }({}).Typr;
}
/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/
function na() {
  return function(c) {
    var r = Uint8Array, d = Uint16Array, u = Uint32Array, t = new r([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), e = new r([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), a = new r([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), o = function(m, D) {
      for (var T = new d(31), H = 0; H < 31; ++H) T[H] = D += 1 << m[H - 1];
      var z = new u(T[30]);
      for (H = 1; H < 30; ++H) for (var Z = T[H]; Z < T[H + 1]; ++Z) z[Z] = Z - T[H] << 5 | H;
      return [T, z];
    }, n = o(t, 2), i = n[0], s = n[1];
    i[28] = 258, s[258] = 28;
    for (var f = o(e, 0)[0], l = new d(32768), h = 0; h < 32768; ++h) {
      var p = (43690 & h) >>> 1 | (21845 & h) << 1;
      p = (61680 & (p = (52428 & p) >>> 2 | (13107 & p) << 2)) >>> 4 | (3855 & p) << 4, l[h] = ((65280 & p) >>> 8 | (255 & p) << 8) >>> 1;
    }
    var g = function(m, D, T) {
      for (var H = m.length, z = 0, Z = new d(D); z < H; ++z) ++Z[m[z] - 1];
      var re, B = new d(D);
      for (z = 0; z < D; ++z) B[z] = B[z - 1] + Z[z - 1] << 1;
      {
        re = new d(1 << D);
        var M = 15 - D;
        for (z = 0; z < H; ++z) if (m[z]) for (var v = z << 4 | m[z], b = D - m[z], k = B[m[z] - 1]++ << b, A = k | (1 << b) - 1; k <= A; ++k) re[l[k] >>> M] = v;
      }
      return re;
    }, y = new r(288);
    for (h = 0; h < 144; ++h) y[h] = 8;
    for (h = 144; h < 256; ++h) y[h] = 9;
    for (h = 256; h < 280; ++h) y[h] = 7;
    for (h = 280; h < 288; ++h) y[h] = 8;
    var O = new r(32);
    for (h = 0; h < 32; ++h) O[h] = 5;
    var x = g(y, 9), F = g(O, 5), U = function(m) {
      for (var D = m[0], T = 1; T < m.length; ++T) m[T] > D && (D = m[T]);
      return D;
    }, w = function(m, D, T) {
      var H = D / 8 | 0;
      return (m[H] | m[H + 1] << 8) >> (7 & D) & T;
    }, G = function(m, D) {
      var T = D / 8 | 0;
      return (m[T] | m[T + 1] << 8 | m[T + 2] << 16) >> (7 & D);
    }, S = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"], C = function(m, D, T) {
      var H = new Error(D || S[m]);
      if (H.code = m, Error.captureStackTrace && Error.captureStackTrace(H, C), !T) throw H;
      return H;
    }, I = function(m, D, T) {
      var H = m.length;
      if (!H || T && !T.l && H < 5) return D || new r(0);
      var z = !D || T, Z = !T || T.i;
      T || (T = {}), D || (D = new r(3 * H));
      var re, B = function(fe) {
        var Ce = D.length;
        if (fe > Ce) {
          var ke = new r(Math.max(2 * Ce, fe));
          ke.set(D), D = ke;
        }
      }, M = T.f || 0, v = T.p || 0, b = T.b || 0, k = T.l, A = T.d, _ = T.m, N = T.n, E = 8 * H;
      do {
        if (!k) {
          T.f = M = w(m, v, 1);
          var P = w(m, v + 1, 3);
          if (v += 3, !P) {
            var X = m[(q = ((re = v) / 8 | 0) + (7 & re && 1) + 4) - 4] | m[q - 3] << 8, $ = q + X;
            if ($ > H) {
              Z && C(0);
              break;
            }
            z && B(b + X), D.set(m.subarray(q, $), b), T.b = b += X, T.p = v = 8 * $;
            continue;
          }
          if (P == 1) k = x, A = F, _ = 9, N = 5;
          else if (P == 2) {
            var V = w(m, v, 31) + 257, W = w(m, v + 10, 15) + 4, pe = V + w(m, v + 5, 31) + 1;
            v += 14;
            for (var ue = new r(pe), Q = new r(19), ee = 0; ee < W; ++ee) Q[a[ee]] = w(m, v + 3 * ee, 7);
            v += 3 * W;
            var se = U(Q), j = (1 << se) - 1, te = g(Q, se);
            for (ee = 0; ee < pe; ) {
              var q, L = te[w(m, v, j)];
              if (v += 15 & L, (q = L >>> 4) < 16) ue[ee++] = q;
              else {
                var he = 0, K = 0;
                for (q == 16 ? (K = 3 + w(m, v, 3), v += 2, he = ue[ee - 1]) : q == 17 ? (K = 3 + w(m, v, 7), v += 3) : q == 18 && (K = 11 + w(m, v, 127), v += 7); K--; ) ue[ee++] = he;
              }
            }
            var ae = ue.subarray(0, V), Y = ue.subarray(V);
            _ = U(ae), N = U(Y), k = g(ae, _), A = g(Y, N);
          } else C(1);
          if (v > E) {
            Z && C(0);
            break;
          }
        }
        z && B(b + 131072);
        for (var be = (1 << _) - 1, ne = (1 << N) - 1, oe = v; ; oe = v) {
          var le = (he = k[G(m, v) & be]) >>> 4;
          if ((v += 15 & he) > E) {
            Z && C(0);
            break;
          }
          if (he || C(2), le < 256) D[b++] = le;
          else {
            if (le == 256) {
              oe = v, k = null;
              break;
            }
            var de = le - 254;
            if (le > 264) {
              var Se = t[ee = le - 257];
              de = w(m, v, (1 << Se) - 1) + i[ee], v += Se;
            }
            var Fe = A[G(m, v) & ne], ge = Fe >>> 4;
            if (Fe || C(3), v += 15 & Fe, Y = f[ge], ge > 3 && (Se = e[ge], Y += G(m, v) & (1 << Se) - 1, v += Se), v > E) {
              Z && C(0);
              break;
            }
            z && B(b + 131072);
            for (var me = b + de; b < me; b += 4) D[b] = D[b - Y], D[b + 1] = D[b + 1 - Y], D[b + 2] = D[b + 2 - Y], D[b + 3] = D[b + 3 - Y];
            b = me;
          }
        }
        T.l = k, T.p = oe, T.b = b, k && (M = 1, T.m = _, T.d = A, T.n = N);
      } while (!M);
      return b == D.length ? D : function(fe, Ce, ke) {
        (ke == null || ke > fe.length) && (ke = fe.length);
        var Oe = new (fe instanceof d ? d : fe instanceof u ? u : r)(ke - Ce);
        return Oe.set(fe.subarray(Ce, ke)), Oe;
      }(D, 0, b);
    }, R = new r(0), J = typeof TextDecoder < "u" && new TextDecoder();
    try {
      J.decode(R, { stream: !0 });
    } catch {
    }
    return c.convert_streams = function(m) {
      var D = new DataView(m), T = 0;
      function H() {
        var V = D.getUint16(T);
        return T += 2, V;
      }
      function z() {
        var V = D.getUint32(T);
        return T += 4, V;
      }
      function Z(V) {
        X.setUint16($, V), $ += 2;
      }
      function re(V) {
        X.setUint32($, V), $ += 4;
      }
      for (var B = { signature: z(), flavor: z(), length: z(), numTables: H(), reserved: H(), totalSfntSize: z(), majorVersion: H(), minorVersion: H(), metaOffset: z(), metaLength: z(), metaOrigLength: z(), privOffset: z(), privLength: z() }, M = 0; Math.pow(2, M) <= B.numTables; ) M++;
      M--;
      for (var v = 16 * Math.pow(2, M), b = 16 * B.numTables - v, k = 12, A = [], _ = 0; _ < B.numTables; _++) A.push({ tag: z(), offset: z(), compLength: z(), origLength: z(), origChecksum: z() }), k += 16;
      var N, E = new Uint8Array(12 + 16 * A.length + A.reduce(function(V, W) {
        return V + W.origLength + 4;
      }, 0)), P = E.buffer, X = new DataView(P), $ = 0;
      return re(B.flavor), Z(B.numTables), Z(v), Z(M), Z(b), A.forEach(function(V) {
        re(V.tag), re(V.origChecksum), re(k), re(V.origLength), V.outOffset = k, (k += V.origLength) % 4 != 0 && (k += 4 - k % 4);
      }), A.forEach(function(V) {
        var W, pe = m.slice(V.offset, V.offset + V.compLength);
        if (V.compLength != V.origLength) {
          var ue = new Uint8Array(V.origLength);
          W = new Uint8Array(pe, 2), I(W, ue);
        } else ue = new Uint8Array(pe);
        E.set(ue, V.outOffset);
        var Q = 0;
        (k = V.outOffset + V.origLength) % 4 != 0 && (Q = 4 - k % 4), E.set(new Uint8Array(Q).buffer, V.outOffset + V.origLength), N = k + Q;
      }), P.slice(0, N);
    }, Object.defineProperty(c, "__esModule", { value: !0 }), c;
  }({}).convert_streams;
}
function aa(c, r) {
  const d = {
    M: 2,
    L: 2,
    Q: 4,
    C: 6,
    Z: 0
  }, u = { C: "18g,ca,368,1kz", D: "17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v", R: "17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6", L: "x9u,jff,a,fd,jv", T: "4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n" }, t = 1, e = 2, a = 4, o = 8, n = 16, i = 32;
  let s;
  function f(S) {
    if (!s) {
      const C = {
        R: e,
        L: t,
        D: a,
        C: n,
        U: i,
        T: o
      };
      s = /* @__PURE__ */ new Map();
      for (let I in u) {
        let R = 0;
        u[I].split(",").forEach((J) => {
          let [m, D] = J.split("+");
          m = parseInt(m, 36), D = D ? parseInt(D, 36) : 0, s.set(R += m, C[I]);
          for (let T = D; T--; )
            s.set(++R, C[I]);
        });
      }
    }
    return s.get(S) || i;
  }
  const l = 1, h = 2, p = 3, g = 4, y = [null, "isol", "init", "fina", "medi"];
  function O(S) {
    const C = new Uint8Array(S.length);
    let I = i, R = l, J = -1;
    for (let m = 0; m < S.length; m++) {
      const D = S.codePointAt(m);
      let T = f(D) | 0, H = l;
      T & o || (I & (t | a | n) ? T & (e | a | n) ? (H = p, (R === l || R === p) && C[J]++) : T & (t | i) && (R === h || R === g) && C[J]-- : I & (e | i) && (R === h || R === g) && C[J]--, R = C[m] = H, I = T, J = m, D > 65535 && m++);
    }
    return C;
  }
  function x(S, C) {
    const I = [];
    for (let J = 0; J < C.length; J++) {
      const m = C.codePointAt(J);
      m > 65535 && J++, I.push(c.U.codeToGlyph(S, m));
    }
    const R = S.GSUB;
    if (R) {
      const { lookupList: J, featureList: m } = R;
      let D;
      const T = /^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/, H = [];
      m.forEach((z) => {
        if (T.test(z.tag))
          for (let Z = 0; Z < z.tab.length; Z++) {
            if (H[z.tab[Z]]) continue;
            H[z.tab[Z]] = !0;
            const re = J[z.tab[Z]], B = /^(isol|init|fina|medi)$/.test(z.tag);
            B && !D && (D = O(C));
            for (let M = 0; M < I.length; M++)
              (!D || !B || y[D[M]] === z.tag) && c.U._applySubs(I, M, re, J);
          }
      });
    }
    return I;
  }
  function F(S, C) {
    const I = new Int16Array(C.length * 3);
    let R = 0;
    for (; R < C.length; R++) {
      const T = C[R];
      if (T === -1) continue;
      I[R * 3 + 2] = S.hmtx.aWidth[T];
      const H = S.GPOS;
      if (H) {
        const z = H.lookupList;
        for (let Z = 0; Z < z.length; Z++) {
          const re = z[Z];
          for (let B = 0; B < re.tabs.length; B++) {
            const M = re.tabs[B];
            if (re.ltype === 1) {
              if (c._lctf.coverageIndex(M.coverage, T) !== -1 && M.pos) {
                D(M.pos, R);
                break;
              }
            } else if (re.ltype === 2) {
              let v = null, b = J();
              if (b !== -1) {
                const k = c._lctf.coverageIndex(M.coverage, C[b]);
                if (k !== -1) {
                  if (M.fmt === 1) {
                    const A = M.pairsets[k];
                    for (let _ = 0; _ < A.length; _++)
                      A[_].gid2 === T && (v = A[_]);
                  } else if (M.fmt === 2) {
                    const A = c.U._getGlyphClass(C[b], M.classDef1), _ = c.U._getGlyphClass(T, M.classDef2);
                    v = M.matrix[A][_];
                  }
                  if (v) {
                    v.val1 && D(v.val1, b), v.val2 && D(v.val2, R);
                    break;
                  }
                }
              }
            } else if (re.ltype === 4) {
              const v = c._lctf.coverageIndex(M.markCoverage, T);
              if (v !== -1) {
                const b = J(m), k = b === -1 ? -1 : c._lctf.coverageIndex(M.baseCoverage, C[b]);
                if (k !== -1) {
                  const A = M.markArray[v], _ = M.baseArray[k][A.markClass];
                  I[R * 3] = _.x - A.x + I[b * 3] - I[b * 3 + 2], I[R * 3 + 1] = _.y - A.y + I[b * 3 + 1];
                  break;
                }
              }
            } else if (re.ltype === 6) {
              const v = c._lctf.coverageIndex(M.mark1Coverage, T);
              if (v !== -1) {
                const b = J();
                if (b !== -1) {
                  const k = C[b];
                  if (U(S, k) === 3) {
                    const A = c._lctf.coverageIndex(M.mark2Coverage, k);
                    if (A !== -1) {
                      const _ = M.mark1Array[v], N = M.mark2Array[A][_.markClass];
                      I[R * 3] = N.x - _.x + I[b * 3] - I[b * 3 + 2], I[R * 3 + 1] = N.y - _.y + I[b * 3 + 1];
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      } else if (S.kern && !S.cff) {
        const z = J();
        if (z !== -1) {
          const Z = S.kern.glyph1.indexOf(C[z]);
          if (Z !== -1) {
            const re = S.kern.rval[Z].glyph2.indexOf(T);
            re !== -1 && (I[z * 3 + 2] += S.kern.rval[Z].vals[re]);
          }
        }
      }
    }
    return I;
    function J(T) {
      for (let H = R - 1; H >= 0; H--)
        if (C[H] !== -1 && (!T || T(C[H])))
          return H;
      return -1;
    }
    function m(T) {
      return U(S, T) === 1;
    }
    function D(T, H) {
      for (let z = 0; z < 3; z++)
        I[H * 3 + z] += T[z] || 0;
    }
  }
  function U(S, C) {
    const I = S.GDEF && S.GDEF.glyphClassDef;
    return I ? c.U._getGlyphClass(C, I) : 0;
  }
  function w(...S) {
    for (let C = 0; C < S.length; C++)
      if (typeof S[C] == "number")
        return S[C];
  }
  function G(S) {
    const C = /* @__PURE__ */ Object.create(null), I = S["OS/2"], R = S.hhea, J = S.head.unitsPerEm, m = w(I && I.sTypoAscender, R && R.ascender, J), D = {
      unitsPerEm: J,
      ascender: m,
      descender: w(I && I.sTypoDescender, R && R.descender, 0),
      capHeight: w(I && I.sCapHeight, m),
      xHeight: w(I && I.sxHeight, m),
      lineGap: w(I && I.sTypoLineGap, R && R.lineGap),
      supportsCodePoint(T) {
        return c.U.codeToGlyph(S, T) > 0;
      },
      forEachGlyph(T, H, z, Z) {
        let re = 0;
        const B = 1 / D.unitsPerEm * H, M = x(S, T);
        let v = 0;
        const b = F(S, M);
        return M.forEach((k, A) => {
          if (k !== -1) {
            let _ = C[k];
            if (!_) {
              const { cmds: N, crds: E } = c.U.glyphToPath(S, k);
              let P = "", X = 0;
              for (let ue = 0, Q = N.length; ue < Q; ue++) {
                const ee = d[N[ue]];
                P += N[ue];
                for (let se = 1; se <= ee; se++)
                  P += (se > 1 ? "," : "") + E[X++];
              }
              let $, V, W, pe;
              if (E.length) {
                $ = V = 1 / 0, W = pe = -1 / 0;
                for (let ue = 0, Q = E.length; ue < Q; ue += 2) {
                  let ee = E[ue], se = E[ue + 1];
                  ee < $ && ($ = ee), se < V && (V = se), ee > W && (W = ee), se > pe && (pe = se);
                }
              } else
                $ = W = V = pe = 0;
              _ = C[k] = {
                index: k,
                advanceWidth: S.hmtx.aWidth[k],
                xMin: $,
                yMin: V,
                xMax: W,
                yMax: pe,
                path: P
              };
            }
            Z.call(
              null,
              _,
              re + b[A * 3] * B,
              b[A * 3 + 1] * B,
              v
            ), re += b[A * 3 + 2] * B, z && (re += z * H);
          }
          v += T.codePointAt(v) > 65535 ? 2 : 1;
        }), re;
      }
    };
    return D;
  }
  return function(C) {
    const I = new Uint8Array(C, 0, 4), R = c._bin.readASCII(I, 0, 4);
    if (R === "wOFF")
      C = r(C);
    else if (R === "wOF2")
      throw new Error("woff2 fonts not supported");
    return G(c.parse(C)[0]);
  };
}
const oa = /* @__PURE__ */ it({
  name: "Typr Font Parser",
  dependencies: [ra, na, aa],
  init(c, r, d) {
    const u = c(), t = r();
    return d(u, t);
  }
});
/*!
Custom bundle of @unicode-font-resolver/client v1.0.2 (https://github.com/lojjic/unicode-font-resolver)
for use in Troika text rendering. 
Original MIT license applies
*/
function ia() {
  return function(c) {
    var r = function() {
      this.buckets = /* @__PURE__ */ new Map();
    };
    r.prototype.add = function(F) {
      var U = F >> 5;
      this.buckets.set(U, (this.buckets.get(U) || 0) | 1 << (31 & F));
    }, r.prototype.has = function(F) {
      var U = this.buckets.get(F >> 5);
      return U !== void 0 && (U & 1 << (31 & F)) != 0;
    }, r.prototype.serialize = function() {
      var F = [];
      return this.buckets.forEach(function(U, w) {
        F.push((+w).toString(36) + ":" + U.toString(36));
      }), F.join(",");
    }, r.prototype.deserialize = function(F) {
      var U = this;
      this.buckets.clear(), F.split(",").forEach(function(w) {
        var G = w.split(":");
        U.buckets.set(parseInt(G[0], 36), parseInt(G[1], 36));
      });
    };
    var d = Math.pow(2, 8), u = d - 1, t = ~u;
    function e(F) {
      var U = function(G) {
        return G & t;
      }(F).toString(16), w = function(G) {
        return (G & t) + d - 1;
      }(F).toString(16);
      return "codepoint-index/plane" + (F >> 16) + "/" + U + "-" + w + ".json";
    }
    function a(F, U) {
      var w = F & u, G = U.codePointAt(w / 6 | 0);
      return ((G = (G || 48) - 48) & 1 << w % 6) != 0;
    }
    function o(F, U) {
      var w;
      (w = F, w.replace(/U\+/gi, "").replace(/^,+|,+$/g, "").split(/,+/).map(function(G) {
        return G.split("-").map(function(S) {
          return parseInt(S.trim(), 16);
        });
      })).forEach(function(G) {
        var S = G[0], C = G[1];
        C === void 0 && (C = S), U(S, C);
      });
    }
    function n(F, U) {
      o(F, function(w, G) {
        for (var S = w; S <= G; S++) U(S);
      });
    }
    var i = {}, s = {}, f = /* @__PURE__ */ new WeakMap(), l = "https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";
    function h(F) {
      var U = f.get(F);
      return U || (U = new r(), n(F.ranges, function(w) {
        return U.add(w);
      }), f.set(F, U)), U;
    }
    var p, g = /* @__PURE__ */ new Map();
    function y(F, U, w) {
      return F[U] ? U : F[w] ? w : function(G) {
        for (var S in G) return S;
      }(F);
    }
    function O(F, U) {
      var w = U;
      if (!F.includes(w)) {
        w = 1 / 0;
        for (var G = 0; G < F.length; G++) Math.abs(F[G] - U) < Math.abs(w - U) && (w = F[G]);
      }
      return w;
    }
    function x(F) {
      return p || (p = /* @__PURE__ */ new Set(), n("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000", function(U) {
        p.add(U);
      })), p.has(F);
    }
    return c.CodePointSet = r, c.clearCache = function() {
      i = {}, s = {};
    }, c.getFontsForString = function(F, U) {
      U === void 0 && (U = {});
      var w, G = U.lang;
      G === void 0 && (G = new RegExp("\\p{Script=Hangul}", "u").test(w = F) ? "ko" : new RegExp("\\p{Script=Hiragana}|\\p{Script=Katakana}", "u").test(w) ? "ja" : "en");
      var S = U.category;
      S === void 0 && (S = "sans-serif");
      var C = U.style;
      C === void 0 && (C = "normal");
      var I = U.weight;
      I === void 0 && (I = 400);
      var R = (U.dataUrl || l).replace(/\/$/g, ""), J = /* @__PURE__ */ new Map(), m = new Uint8Array(F.length), D = {}, T = {}, H = new Array(F.length), z = /* @__PURE__ */ new Map(), Z = !1;
      function re(v) {
        var b = g.get(v);
        return b || (b = fetch(R + "/" + v).then(function(k) {
          if (!k.ok) throw new Error(k.statusText);
          return k.json().then(function(A) {
            if (!Array.isArray(A) || A[0] !== 1) throw new Error("Incorrect schema version; need 1, got " + A[0]);
            return A[1];
          });
        }).catch(function(k) {
          if (R !== l) return Z || (console.error('unicode-font-resolver: Failed loading from dataUrl "' + R + '", trying default CDN. ' + k.message), Z = !0), R = l, g.delete(v), re(v);
          throw k;
        }), g.set(v, b)), b;
      }
      for (var B = function(v) {
        var b = F.codePointAt(v), k = e(b);
        H[v] = k, i[k] || z.has(k) || z.set(k, re(k).then(function(A) {
          i[k] = A;
        })), b > 65535 && (v++, M = v);
      }, M = 0; M < F.length; M++) B(M);
      return Promise.all(z.values()).then(function() {
        z.clear();
        for (var v = function(k) {
          var A = F.codePointAt(k), _ = null, N = i[H[k]], E = void 0;
          for (var P in N) {
            var X = T[P];
            if (X === void 0 && (X = T[P] = new RegExp(P).test(G || "en")), X) {
              for (var $ in E = P, N[P]) if (a(A, N[P][$])) {
                _ = $;
                break;
              }
              break;
            }
          }
          if (!_) {
            e: for (var V in N) if (V !== E) {
              for (var W in N[V]) if (a(A, N[V][W])) {
                _ = W;
                break e;
              }
            }
          }
          _ || (console.debug("No font coverage for U+" + A.toString(16)), _ = "latin"), H[k] = _, s[_] || z.has(_) || z.set(_, re("font-meta/" + _ + ".json").then(function(pe) {
            s[_] = pe;
          })), A > 65535 && (k++, b = k);
        }, b = 0; b < F.length; b++) v(b);
        return Promise.all(z.values());
      }).then(function() {
        for (var v, b = null, k = 0; k < F.length; k++) {
          var A = F.codePointAt(k);
          if (b && (x(A) || h(b).has(A))) m[k] = m[k - 1];
          else {
            b = s[H[k]];
            var _ = D[b.id];
            if (!_) {
              var N = b.typeforms, E = y(N, S, "sans-serif"), P = y(N[E], C, "normal"), X = O((v = N[E]) === null || v === void 0 ? void 0 : v[P], I);
              _ = D[b.id] = R + "/font-files/" + b.id + "/" + E + "." + P + "." + X + ".woff";
            }
            var $ = J.get(_);
            $ == null && ($ = J.size, J.set(_, $)), m[k] = $;
          }
          A > 65535 && (k++, m[k] = m[k - 1]);
        }
        return { fontUrls: Array.from(J.keys()), chars: m };
      });
    }, Object.defineProperty(c, "__esModule", { value: !0 }), c;
  }({});
}
function sa(c, r) {
  const d = /* @__PURE__ */ Object.create(null), u = /* @__PURE__ */ Object.create(null);
  function t(a, o) {
    const n = (i) => {
      console.error(`Failure loading font ${a}`, i);
    };
    try {
      const i = new XMLHttpRequest();
      i.open("get", a, !0), i.responseType = "arraybuffer", i.onload = function() {
        if (i.status >= 400)
          n(new Error(i.statusText));
        else if (i.status > 0)
          try {
            const s = c(i.response);
            s.src = a, o(s);
          } catch (s) {
            n(s);
          }
      }, i.onerror = n, i.send();
    } catch (i) {
      n(i);
    }
  }
  function e(a, o) {
    let n = d[a];
    n ? o(n) : u[a] ? u[a].push(o) : (u[a] = [o], t(a, (i) => {
      i.src = a, d[a] = i, u[a].forEach((s) => s(i)), delete u[a];
    }));
  }
  return function(a, o, {
    lang: n,
    fonts: i = [],
    style: s = "normal",
    weight: f = "normal",
    unicodeFontsURL: l
  } = {}) {
    const h = new Uint8Array(a.length), p = [];
    a.length || x();
    const g = /* @__PURE__ */ new Map(), y = [];
    if (s !== "italic" && (s = "normal"), typeof f != "number" && (f = f === "bold" ? 700 : 400), i && !Array.isArray(i) && (i = [i]), i = i.slice().filter((U) => !U.lang || U.lang.test(n)).reverse(), i.length) {
      let S = 0;
      (function C(I = 0) {
        for (let R = I, J = a.length; R < J; R++) {
          const m = a.codePointAt(R);
          if (S === 1 && p[h[R - 1]].supportsCodePoint(m) || /\s/.test(a[R]))
            h[R] = h[R - 1], S === 2 && (y[y.length - 1][1] = R);
          else
            for (let D = h[R], T = i.length; D <= T; D++)
              if (D === T) {
                const H = S === 2 ? y[y.length - 1] : y[y.length] = [R, R];
                H[1] = R, S = 2;
              } else {
                h[R] = D;
                const { src: H, unicodeRange: z } = i[D];
                if (!z || F(m, z)) {
                  const Z = d[H];
                  if (!Z) {
                    e(H, () => {
                      C(R);
                    });
                    return;
                  }
                  if (Z.supportsCodePoint(m)) {
                    let re = g.get(Z);
                    typeof re != "number" && (re = p.length, p.push(Z), g.set(Z, re)), h[R] = re, S = 1;
                    break;
                  }
                }
              }
          m > 65535 && R + 1 < J && (h[R + 1] = h[R], R++, S === 2 && (y[y.length - 1][1] = R));
        }
        O();
      })();
    } else
      y.push([0, a.length - 1]), O();
    function O() {
      if (y.length) {
        const U = y.map((w) => a.substring(w[0], w[1] + 1)).join(`
`);
        r.getFontsForString(U, {
          lang: n || void 0,
          style: s,
          weight: f,
          dataUrl: l
        }).then(({ fontUrls: w, chars: G }) => {
          const S = p.length;
          let C = 0;
          y.forEach((R) => {
            for (let J = 0, m = R[1] - R[0]; J <= m; J++)
              h[R[0] + J] = G[C++] + S;
            C++;
          });
          let I = 0;
          w.forEach((R, J) => {
            e(R, (m) => {
              p[J + S] = m, ++I === w.length && x();
            });
          });
        });
      } else
        x();
    }
    function x() {
      o({
        chars: h,
        fonts: p
      });
    }
    function F(U, w) {
      for (let G = 0; G < w.length; G++) {
        const [S, C = S] = w[G];
        if (S <= U && U <= C)
          return !0;
      }
      return !1;
    }
  };
}
const fa = /* @__PURE__ */ it({
  name: "FontResolver",
  dependencies: [
    sa,
    oa,
    ia
  ],
  init(c, r, d) {
    return c(r, d());
  }
});
function la(c, r) {
  const u = /[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/, t = "[^\\S\\u00A0]", e = new RegExp(`${t}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);
  function a({ text: p, lang: g, fonts: y, style: O, weight: x, preResolvedFonts: F, unicodeFontsURL: U }, w) {
    const G = ({ chars: S, fonts: C }) => {
      let I, R;
      const J = [];
      for (let m = 0; m < S.length; m++)
        S[m] !== R ? (R = S[m], J.push(I = { start: m, end: m, fontObj: C[S[m]] })) : I.end = m;
      w(J);
    };
    F ? G(F) : c(
      p,
      G,
      { lang: g, fonts: y, style: O, weight: x, unicodeFontsURL: U }
    );
  }
  function o({
    text: p = "",
    font: g,
    lang: y,
    sdfGlyphSize: O = 64,
    fontSize: x = 400,
    fontWeight: F = 1,
    fontStyle: U = "normal",
    letterSpacing: w = 0,
    lineHeight: G = "normal",
    maxWidth: S = 1 / 0,
    direction: C,
    textAlign: I = "left",
    textIndent: R = 0,
    whiteSpace: J = "normal",
    overflowWrap: m = "normal",
    anchorX: D = 0,
    anchorY: T = 0,
    metricsOnly: H = !1,
    unicodeFontsURL: z,
    preResolvedFonts: Z = null,
    includeCaretPositions: re = !1,
    chunkedBoundsSize: B = 8192,
    colorRanges: M = null
  }, v) {
    const b = f(), k = { fontLoad: 0, typesetting: 0 };
    p.indexOf("\r") > -1 && (console.info("Typesetter: got text with \\r chars; normalizing to \\n"), p = p.replace(/\r\n/g, `
`).replace(/\r/g, `
`)), x = +x, w = +w, S = +S, G = G || "normal", R = +R, a({
      text: p,
      lang: y,
      style: U,
      weight: F,
      fonts: typeof g == "string" ? [{ src: g }] : g,
      unicodeFontsURL: z,
      preResolvedFonts: Z
    }, (A) => {
      k.fontLoad = f() - b;
      const _ = isFinite(S);
      let N = null, E = null, P = null, X = null, $ = null, V = null, W = null, pe = null, ue = 0, Q = 0, ee = J !== "nowrap";
      const se = /* @__PURE__ */ new Map(), j = f();
      let te = R, q = 0, L = new l();
      const he = [L];
      A.forEach((ne) => {
        const { fontObj: oe } = ne, { ascender: le, descender: de, unitsPerEm: Se, lineGap: Fe, capHeight: ge, xHeight: me } = oe;
        let fe = se.get(oe);
        if (!fe) {
          const ce = x / Se, Ue = G === "normal" ? (le - de + Fe) * ce : G * x, He = (Ue - (le - de) * ce) / 2, _e = Math.min(Ue, (le - de) * ce), ye = (le + de) / 2 * ce + _e / 2;
          fe = {
            index: se.size,
            src: oe.src,
            fontObj: oe,
            fontSizeMult: ce,
            unitsPerEm: Se,
            ascender: le * ce,
            descender: de * ce,
            capHeight: ge * ce,
            xHeight: me * ce,
            lineHeight: Ue,
            baseline: -He - le * ce,
            // baseline offset from top of line height
            // cap: -halfLeading - capHeight * fontSizeMult, // cap from top of line height
            // ex: -halfLeading - xHeight * fontSizeMult, // ex from top of line height
            caretTop: (le + de) / 2 * ce + _e / 2,
            caretBottom: ye - _e
          }, se.set(oe, fe);
        }
        const { fontSizeMult: Ce } = fe, ke = p.slice(ne.start, ne.end + 1);
        let Oe, xe;
        oe.forEachGlyph(ke, x, w, (ce, Ue, He, _e) => {
          Ue += q, _e += ne.start, Oe = Ue, xe = ce;
          const ye = p.charAt(_e), Ae = ce.advanceWidth * Ce, we = L.count;
          let ve;
          if ("isEmpty" in ce || (ce.isWhitespace = !!ye && new RegExp(t).test(ye), ce.canBreakAfter = !!ye && e.test(ye), ce.isEmpty = ce.xMin === ce.xMax || ce.yMin === ce.yMax || u.test(ye)), !ce.isWhitespace && !ce.isEmpty && Q++, ee && _ && !ce.isWhitespace && Ue + Ae + te > S && we) {
            if (L.glyphAt(we - 1).glyphObj.canBreakAfter)
              ve = new l(), te = -Ue;
            else
              for (let Re = we; Re--; )
                if (Re === 0 && m === "break-word") {
                  ve = new l(), te = -Ue;
                  break;
                } else if (L.glyphAt(Re).glyphObj.canBreakAfter) {
                  ve = L.splitAt(Re + 1);
                  const Me = ve.glyphAt(0).x;
                  te -= Me;
                  for (let De = ve.count; De--; )
                    ve.glyphAt(De).x -= Me;
                  break;
                }
            ve && (L.isSoftWrapped = !0, L = ve, he.push(L), ue = S);
          }
          let Te = L.glyphAt(L.count);
          Te.glyphObj = ce, Te.x = Ue + te, Te.y = He, Te.width = Ae, Te.charIndex = _e, Te.fontData = fe, ye === `
` && (L = new l(), he.push(L), te = -(Ue + Ae + w * x) + R);
        }), q = Oe + xe.advanceWidth * Ce + w * x;
      });
      let K = 0;
      he.forEach((ne) => {
        let oe = !0;
        for (let le = ne.count; le--; ) {
          const de = ne.glyphAt(le);
          oe && !de.glyphObj.isWhitespace && (ne.width = de.x + de.width, ne.width > ue && (ue = ne.width), oe = !1);
          let { lineHeight: Se, capHeight: Fe, xHeight: ge, baseline: me } = de.fontData;
          Se > ne.lineHeight && (ne.lineHeight = Se);
          const fe = me - ne.baseline;
          fe < 0 && (ne.baseline += fe, ne.cap += fe, ne.ex += fe), ne.cap = Math.max(ne.cap, ne.baseline + Fe), ne.ex = Math.max(ne.ex, ne.baseline + ge);
        }
        ne.baseline -= K, ne.cap -= K, ne.ex -= K, K += ne.lineHeight;
      });
      let ae = 0, Y = 0;
      if (D && (typeof D == "number" ? ae = -D : typeof D == "string" && (ae = -ue * (D === "left" ? 0 : D === "center" ? 0.5 : D === "right" ? 1 : i(D)))), T && (typeof T == "number" ? Y = -T : typeof T == "string" && (Y = T === "top" ? 0 : T === "top-baseline" ? -he[0].baseline : T === "top-cap" ? -he[0].cap : T === "top-ex" ? -he[0].ex : T === "middle" ? K / 2 : T === "bottom" ? K : T === "bottom-baseline" ? he[he.length - 1].baseline : i(T) * K)), !H) {
        const ne = r.getEmbeddingLevels(p, C);
        N = new Uint16Array(Q), E = new Uint8Array(Q), P = new Float32Array(Q * 2), X = {}, W = [1 / 0, 1 / 0, -1 / 0, -1 / 0], pe = [], re && (V = new Float32Array(p.length * 4)), M && ($ = new Uint8Array(Q * 3));
        let oe = 0, le = -1, de = -1, Se, Fe;
        if (he.forEach((ge, me) => {
          let { count: fe, width: Ce } = ge;
          if (fe > 0) {
            let ke = 0;
            for (let _e = fe; _e-- && ge.glyphAt(_e).glyphObj.isWhitespace; )
              ke++;
            let Oe = 0, xe = 0;
            if (I === "center")
              Oe = (ue - Ce) / 2;
            else if (I === "right")
              Oe = ue - Ce;
            else if (I === "justify" && ge.isSoftWrapped) {
              let _e = 0;
              for (let ye = fe - ke; ye--; )
                ge.glyphAt(ye).glyphObj.isWhitespace && _e++;
              xe = (ue - Ce) / _e;
            }
            if (xe || Oe) {
              let _e = 0;
              for (let ye = 0; ye < fe; ye++) {
                let Ae = ge.glyphAt(ye);
                const we = Ae.glyphObj;
                Ae.x += Oe + _e, xe !== 0 && we.isWhitespace && ye < fe - ke && (_e += xe, Ae.width += xe);
              }
            }
            const ce = r.getReorderSegments(
              p,
              ne,
              ge.glyphAt(0).charIndex,
              ge.glyphAt(ge.count - 1).charIndex
            );
            for (let _e = 0; _e < ce.length; _e++) {
              const [ye, Ae] = ce[_e];
              let we = 1 / 0, ve = -1 / 0;
              for (let Te = 0; Te < fe; Te++)
                if (ge.glyphAt(Te).charIndex >= ye) {
                  let Re = Te, Me = Te;
                  for (; Me < fe; Me++) {
                    let De = ge.glyphAt(Me);
                    if (De.charIndex > Ae)
                      break;
                    Me < fe - ke && (we = Math.min(we, De.x), ve = Math.max(ve, De.x + De.width));
                  }
                  for (let De = Re; De < Me; De++) {
                    const Ie = ge.glyphAt(De);
                    Ie.x = ve - (Ie.x + Ie.width - we);
                  }
                  break;
                }
            }
            let Ue;
            const He = (_e) => Ue = _e;
            for (let _e = 0; _e < fe; _e++) {
              const ye = ge.glyphAt(_e);
              Ue = ye.glyphObj;
              const Ae = Ue.index, we = ne.levels[ye.charIndex] & 1;
              if (we) {
                const ve = r.getMirroredCharacter(p[ye.charIndex]);
                ve && ye.fontData.fontObj.forEachGlyph(ve, 0, 0, He);
              }
              if (re) {
                const { charIndex: ve, fontData: Te } = ye, Re = ye.x + ae, Me = ye.x + ye.width + ae;
                V[ve * 4] = we ? Me : Re, V[ve * 4 + 1] = we ? Re : Me, V[ve * 4 + 2] = ge.baseline + Te.caretBottom + Y, V[ve * 4 + 3] = ge.baseline + Te.caretTop + Y;
                const De = ve - le;
                De > 1 && s(V, le, De), le = ve;
              }
              if (M) {
                const { charIndex: ve } = ye;
                for (; ve > de; )
                  de++, M.hasOwnProperty(de) && (Fe = M[de]);
              }
              if (!Ue.isWhitespace && !Ue.isEmpty) {
                const ve = oe++, { fontSizeMult: Te, src: Re, index: Me } = ye.fontData, De = X[Re] || (X[Re] = {});
                De[Ae] || (De[Ae] = {
                  path: Ue.path,
                  pathBounds: [Ue.xMin, Ue.yMin, Ue.xMax, Ue.yMax]
                });
                const Ie = ye.x + ae, Xe = ye.y + ge.baseline + Y;
                P[ve * 2] = Ie, P[ve * 2 + 1] = Xe;
                const je = Ie + Ue.xMin * Te, Ye = Xe + Ue.yMin * Te, Qe = Ie + Ue.xMax * Te, Ve = Xe + Ue.yMax * Te;
                je < W[0] && (W[0] = je), Ye < W[1] && (W[1] = Ye), Qe > W[2] && (W[2] = Qe), Ve > W[3] && (W[3] = Ve), ve % B === 0 && (Se = { start: ve, end: ve, rect: [1 / 0, 1 / 0, -1 / 0, -1 / 0] }, pe.push(Se)), Se.end++;
                const Ge = Se.rect;
                if (je < Ge[0] && (Ge[0] = je), Ye < Ge[1] && (Ge[1] = Ye), Qe > Ge[2] && (Ge[2] = Qe), Ve > Ge[3] && (Ge[3] = Ve), N[ve] = Ae, E[ve] = Me, M) {
                  const Ze = ve * 3;
                  $[Ze] = Fe >> 16 & 255, $[Ze + 1] = Fe >> 8 & 255, $[Ze + 2] = Fe & 255;
                }
              }
            }
          }
        }), V) {
          const ge = p.length - le;
          ge > 1 && s(V, le, ge);
        }
      }
      const be = [];
      se.forEach(({ index: ne, src: oe, unitsPerEm: le, ascender: de, descender: Se, lineHeight: Fe, capHeight: ge, xHeight: me }) => {
        be[ne] = { src: oe, unitsPerEm: le, ascender: de, descender: Se, lineHeight: Fe, capHeight: ge, xHeight: me };
      }), k.typesetting = f() - j, v({
        glyphIds: N,
        //id for each glyph, specific to that glyph's font
        glyphFontIndices: E,
        //index into fontData for each glyph
        glyphPositions: P,
        //x,y of each glyph's origin in layout
        glyphData: X,
        //dict holding data about each glyph appearing in the text
        fontData: be,
        //data about each font used in the text
        caretPositions: V,
        //startX,endX,bottomY caret positions for each char
        // caretHeight, //height of cursor from bottom to top - todo per glyph?
        glyphColors: $,
        //color for each glyph, if color ranges supplied
        chunkedBounds: pe,
        //total rects per (n=chunkedBoundsSize) consecutive glyphs
        fontSize: x,
        //calculated em height
        topBaseline: Y + he[0].baseline,
        //y coordinate of the top line's baseline
        blockBounds: [
          //bounds for the whole block of text, including vertical padding for lineHeight
          ae,
          Y - K,
          ae + ue,
          Y
        ],
        visibleBounds: W,
        //total bounds of visible text paths, may be larger or smaller than blockBounds
        timings: k
      });
    });
  }
  function n(p, g) {
    o({ ...p, metricsOnly: !0 }, (y) => {
      const [O, x, F, U] = y.blockBounds;
      g({
        width: F - O,
        height: U - x
      });
    });
  }
  function i(p) {
    let g = p.match(/^([\d.]+)%$/), y = g ? parseFloat(g[1]) : NaN;
    return isNaN(y) ? 0 : y / 100;
  }
  function s(p, g, y) {
    const O = p[g * 4], x = p[g * 4 + 1], F = p[g * 4 + 2], U = p[g * 4 + 3], w = (x - O) / y;
    for (let G = 0; G < y; G++) {
      const S = (g + G) * 4;
      p[S] = O + w * G, p[S + 1] = O + w * (G + 1), p[S + 2] = F, p[S + 3] = U;
    }
  }
  function f() {
    return (self.performance || Date).now();
  }
  function l() {
    this.data = [];
  }
  const h = ["glyphObj", "x", "y", "width", "charIndex", "fontData"];
  return l.prototype = {
    width: 0,
    lineHeight: 0,
    baseline: 0,
    cap: 0,
    ex: 0,
    isSoftWrapped: !1,
    get count() {
      return Math.ceil(this.data.length / h.length);
    },
    glyphAt(p) {
      let g = l.flyweight;
      return g.data = this.data, g.index = p, g;
    },
    splitAt(p) {
      let g = new l();
      return g.data = this.data.splice(p * h.length), g;
    }
  }, l.flyweight = h.reduce((p, g, y, O) => (Object.defineProperty(p, g, {
    get() {
      return this.data[this.index * h.length + y];
    },
    set(x) {
      this.data[this.index * h.length + y] = x;
    }
  }), p), { data: null, index: 0 }), {
    typeset: o,
    measure: n
  };
}
const et = () => (self.performance || Date).now(), It = /* @__PURE__ */ fn();
let Jr;
function ua(c, r, d, u, t, e, a, o, n, i, s = !0) {
  return s ? ha(c, r, d, u, t, e, a, o, n, i).then(
    null,
    (f) => (Jr || (console.warn("WebGL SDF generation failed, falling back to JS", f), Jr = !0), Qr(c, r, d, u, t, e, a, o, n, i))
  ) : Qr(c, r, d, u, t, e, a, o, n, i);
}
const Lt = [], ca = 5;
let dr = 0;
function un() {
  const c = et();
  for (; Lt.length && et() - c < ca; )
    Lt.shift()();
  dr = Lt.length ? setTimeout(un, 0) : 0;
}
const ha = (...c) => new Promise((r, d) => {
  Lt.push(() => {
    const u = et();
    try {
      It.webgl.generateIntoCanvas(...c), r({ timing: et() - u });
    } catch (t) {
      d(t);
    }
  }), dr || (dr = setTimeout(un, 0));
}), da = 4, va = 2e3, Kr = {};
let pa = 0;
function Qr(c, r, d, u, t, e, a, o, n, i) {
  const s = "TroikaTextSDFGenerator_JS_" + pa++ % da;
  let f = Kr[s];
  return f || (f = Kr[s] = {
    workerModule: it({
      name: s,
      workerId: s,
      dependencies: [
        fn,
        et
      ],
      init(l, h) {
        const p = l().javascript.generate;
        return function(...g) {
          const y = h();
          return {
            textureData: p(...g),
            timing: h() - y
          };
        };
      },
      getTransferables(l) {
        return [l.textureData.buffer];
      }
    }),
    requests: 0,
    idleTimer: null
  }), f.requests++, clearTimeout(f.idleTimer), f.workerModule(c, r, d, u, t, e).then(({ textureData: l, timing: h }) => {
    const p = et(), g = new Uint8Array(l.length * 4);
    for (let y = 0; y < l.length; y++)
      g[y * 4 + i] = l[y];
    return It.webglUtils.renderImageData(a, g, o, n, c, r, 1 << 3 - i), h += et() - p, --f.requests === 0 && (f.idleTimer = setTimeout(() => {
      Xn(s);
    }, va)), { timing: h };
  });
}
function ga(c) {
  c._warm || (It.webgl.isSupported(c), c._warm = !0);
}
const ma = It.webglUtils.resizeWebGLCanvasWithoutClearing, $e = {
  defaultFontURL: null,
  unicodeFontsURL: null,
  sdfGlyphSize: 64,
  sdfMargin: 1 / 16,
  sdfExponent: 9,
  textureWidth: 2048
}, ya = /* @__PURE__ */ new vr();
let cn = !1;
function ot() {
  return (self.performance || Date).now();
}
function Pa(c) {
  cn ? console.warn("configureTextBuilder called after first font request; will be ignored.") : vn($e, c);
}
const Pt = /* @__PURE__ */ Object.create(null);
function hn(c, r) {
  cn = !0, c = vn({}, c);
  const d = ot(), { defaultFontURL: u } = $e, t = [];
  if (u && t.push({ label: "default", src: Zr(u) }), c.font && t.push({ label: "user", src: Zr(c.font) }), c.font = t, c.text = "" + c.text, c.sdfGlyphSize = c.sdfGlyphSize || $e.sdfGlyphSize, c.unicodeFontsURL = c.unicodeFontsURL || $e.unicodeFontsURL, c.colorRanges != null) {
    let l = {};
    for (let h in c.colorRanges)
      if (c.colorRanges.hasOwnProperty(h)) {
        let p = c.colorRanges[h];
        typeof p != "number" && (p = ya.set(p).getHex()), l[h] = p;
      }
    c.colorRanges = l;
  }
  Object.freeze(c);
  const { textureWidth: e, sdfExponent: a } = $e, { sdfGlyphSize: o } = c, n = e / o * 4;
  let i = Pt[o];
  if (!i) {
    const l = document.createElement("canvas");
    l.width = e, l.height = o * 256 / n, i = Pt[o] = {
      glyphCount: 0,
      sdfGlyphSize: o,
      sdfCanvas: l,
      sdfTexture: new Dn(
        l,
        void 0,
        void 0,
        void 0,
        Wr,
        Wr
      ),
      contextLost: !1,
      glyphsByFont: /* @__PURE__ */ new Map()
    }, i.sdfTexture.generateMipmaps = !1, ba(i);
  }
  const { sdfTexture: s, sdfCanvas: f } = i;
  _a(c).then((l) => {
    const { glyphIds: h, glyphFontIndices: p, fontData: g, glyphPositions: y, fontSize: O, timings: x } = l, F = [], U = new Float32Array(h.length * 4);
    let w = 0, G = 0;
    const S = ot(), C = g.map((D) => {
      let T = i.glyphsByFont.get(D.src);
      return T || i.glyphsByFont.set(D.src, T = /* @__PURE__ */ new Map()), T;
    });
    h.forEach((D, T) => {
      const H = p[T], { src: z, unitsPerEm: Z } = g[H];
      let re = C[H].get(D);
      if (!re) {
        const { path: k, pathBounds: A } = l.glyphData[z][D], _ = Math.max(A[2] - A[0], A[3] - A[1]) / o * ($e.sdfMargin * o + 0.5), N = i.glyphCount++, E = [
          A[0] - _,
          A[1] - _,
          A[2] + _,
          A[3] + _
        ];
        C[H].set(D, re = { path: k, atlasIndex: N, sdfViewBox: E }), F.push(re);
      }
      const { sdfViewBox: B } = re, M = y[G++], v = y[G++], b = O / Z;
      U[w++] = M + B[0] * b, U[w++] = v + B[1] * b, U[w++] = M + B[2] * b, U[w++] = v + B[3] * b, h[T] = re.atlasIndex;
    }), x.quads = (x.quads || 0) + (ot() - S);
    const I = ot();
    x.sdf = {};
    const R = f.height, J = Math.ceil(i.glyphCount / n), m = Math.pow(2, Math.ceil(Math.log2(J * o)));
    m > R && (console.info(`Increasing SDF texture size ${R}->${m}`), ma(f, e, m), s.dispose()), Promise.all(F.map(
      (D) => dn(D, i, c.gpuAccelerateSDF).then(({ timing: T }) => {
        x.sdf[D.atlasIndex] = T;
      })
    )).then(() => {
      F.length && !i.contextLost && (pn(i), s.needsUpdate = !0), x.sdfTotal = ot() - I, x.total = ot() - d, r(Object.freeze({
        parameters: c,
        sdfTexture: s,
        sdfGlyphSize: o,
        sdfExponent: a,
        glyphBounds: U,
        glyphAtlasIndices: h,
        glyphColors: l.glyphColors,
        caretPositions: l.caretPositions,
        chunkedBounds: l.chunkedBounds,
        ascender: l.ascender,
        descender: l.descender,
        lineHeight: l.lineHeight,
        capHeight: l.capHeight,
        xHeight: l.xHeight,
        topBaseline: l.topBaseline,
        blockBounds: l.blockBounds,
        visibleBounds: l.visibleBounds,
        timings: l.timings
      }));
    });
  }), Promise.resolve().then(() => {
    i.contextLost || ga(f);
  });
}
function dn({ path: c, atlasIndex: r, sdfViewBox: d }, { sdfGlyphSize: u, sdfCanvas: t, contextLost: e }, a) {
  if (e)
    return Promise.resolve({ timing: -1 });
  const { textureWidth: o, sdfExponent: n } = $e, i = Math.max(d[2] - d[0], d[3] - d[1]), s = Math.floor(r / 4), f = s % (o / u) * u, l = Math.floor(s / (o / u)) * u, h = r % 4;
  return ua(u, u, c, d, i, n, t, f, l, h, a);
}
function ba(c) {
  const r = c.sdfCanvas;
  r.addEventListener("webglcontextlost", (d) => {
    console.log("Context Lost", d), d.preventDefault(), c.contextLost = !0;
  }), r.addEventListener("webglcontextrestored", (d) => {
    console.log("Context Restored", d), c.contextLost = !1;
    const u = [];
    c.glyphsByFont.forEach((t) => {
      t.forEach((e) => {
        u.push(dn(e, c, !0));
      });
    }), Promise.all(u).then(() => {
      pn(c), c.sdfTexture.needsUpdate = !0;
    });
  });
}
function Ia({ font: c, characters: r, sdfGlyphSize: d }, u) {
  let t = Array.isArray(r) ? r.join(`
`) : "" + r;
  hn({ font: c, sdfGlyphSize: d, text: t }, u);
}
function vn(c, r) {
  for (let d in r)
    r.hasOwnProperty(d) && (c[d] = r[d]);
  return c;
}
let Rt;
function Zr(c) {
  return Rt || (Rt = typeof document > "u" ? {} : document.createElement("a")), Rt.href = c, Rt.href;
}
function pn(c) {
  if (typeof createImageBitmap != "function") {
    console.info("Safari<15: applying SDF canvas workaround");
    const { sdfCanvas: r, sdfTexture: d } = c, { width: u, height: t } = r, e = c.sdfCanvas.getContext("webgl");
    let a = d.image.data;
    (!a || a.length !== u * t * 4) && (a = new Uint8Array(u * t * 4), d.image = { width: u, height: t, data: a }, d.flipY = !1, d.isDataTexture = !0), e.readPixels(0, 0, u, t, e.RGBA, e.UNSIGNED_BYTE, a);
  }
}
const Ua = /* @__PURE__ */ it({
  name: "Typesetter",
  dependencies: [
    la,
    fa,
    Jn
  ],
  init(c, r, d) {
    return c(r, d());
  }
}), _a = /* @__PURE__ */ it({
  name: "Typesetter",
  dependencies: [
    Ua
  ],
  init(c) {
    return function(r) {
      return new Promise((d) => {
        c.typeset(r, d);
      });
    };
  },
  getTransferables(c) {
    const r = [];
    for (let d in c)
      c[d] && c[d].buffer && r.push(c[d].buffer);
    return r;
  }
});
function Na() {
  Object.keys(Pt).forEach((c) => {
    const r = Pt[c].sdfCanvas, { width: d, height: u } = r;
    console.log("%c.", `
      background: url(${r.toDataURL()});
      background-size: ${d}px ${u}px;
      color: transparent;
      font-size: 0;
      line-height: ${u}px;
      padding-left: ${d}px;
    `);
  });
}
const qr = {};
function Sa(c) {
  let r = qr[c];
  if (!r) {
    const d = new gr(1, 1, c, c), u = d.clone(), t = d.attributes, e = u.attributes, a = new Pn(), o = t.uv.count;
    for (let n = 0; n < o; n++)
      e.position.array[n * 3] *= -1, e.normal.array[n * 3 + 2] *= -1;
    ["position", "normal", "uv"].forEach((n) => {
      a.setAttribute(
        n,
        new In(
          [...t[n].array, ...e[n].array],
          t[n].itemSize
        )
      );
    }), a.setIndex([...d.index.array, ...u.index.array.map((n) => n + o)]), a.translate(0.5, 0.5, 0), r = qr[c] = a;
  }
  return r;
}
const xa = "aTroikaGlyphBounds", $r = "aTroikaGlyphIndex", ka = "aTroikaGlyphColor";
class wa extends En {
  constructor() {
    super(), this.detail = 1, this.curveRadius = 0, this.groups = [
      { start: 0, count: 1 / 0, materialIndex: 0 },
      { start: 0, count: 1 / 0, materialIndex: 1 }
    ], this.boundingSphere = new Mn(), this.boundingBox = new Rn();
  }
  computeBoundingSphere() {
  }
  computeBoundingBox() {
  }
  // Since our base geometry contains triangles for both front and back sides, we can emulate
  // the "side" by restricting the draw range.
  setSide(r) {
    const d = this.getIndex().count;
    this.setDrawRange(r === Gn ? d / 2 : 0, r === on ? d : d / 2);
  }
  set detail(r) {
    if (r !== this._detail) {
      this._detail = r, (typeof r != "number" || r < 1) && (r = 1);
      let d = Sa(r);
      ["position", "normal", "uv"].forEach((u) => {
        this.attributes[u] = d.attributes[u].clone();
      }), this.setIndex(d.getIndex().clone());
    }
  }
  get detail() {
    return this._detail;
  }
  set curveRadius(r) {
    r !== this._curveRadius && (this._curveRadius = r, this._updateBounds());
  }
  get curveRadius() {
    return this._curveRadius;
  }
  /**
   * Update the geometry for a new set of glyphs.
   * @param {Float32Array} glyphBounds - An array holding the planar bounds for all glyphs
   *        to be rendered, 4 entries for each glyph: x1,x2,y1,y1
   * @param {Float32Array} glyphAtlasIndices - An array holding the index of each glyph within
   *        the SDF atlas texture.
   * @param {Array} blockBounds - An array holding the [minX, minY, maxX, maxY] across all glyphs
   * @param {Array} [chunkedBounds] - An array of objects describing bounds for each chunk of N
   *        consecutive glyphs: `{start:N, end:N, rect:[minX, minY, maxX, maxY]}`. This can be
   *        used with `applyClipRect` to choose an optimized `instanceCount`.
   * @param {Uint8Array} [glyphColors] - An array holding r,g,b values for each glyph.
   */
  updateGlyphs(r, d, u, t, e) {
    sr(this, xa, r, 4), sr(this, $r, d, 1), sr(this, ka, e, 3), this._blockBounds = u, this._chunkedBounds = t, this.instanceCount = d.length, this._updateBounds();
  }
  _updateBounds() {
    const r = this._blockBounds;
    if (r) {
      const { curveRadius: d, boundingBox: u } = this;
      if (d) {
        const { PI: t, floor: e, min: a, max: o, sin: n, cos: i } = Math, s = t / 2, f = t * 2, l = Math.abs(d), h = r[0] / l, p = r[2] / l, g = e((h + s) / f) !== e((p + s) / f) ? -l : a(n(h) * l, n(p) * l), y = e((h - s) / f) !== e((p - s) / f) ? l : o(n(h) * l, n(p) * l), O = e((h + t) / f) !== e((p + t) / f) ? l * 2 : o(l - i(h) * l, l - i(p) * l);
        u.min.set(g, r[1], d < 0 ? -O : 0), u.max.set(y, r[3], d < 0 ? 0 : O);
      } else
        u.min.set(r[0], r[1], 0), u.max.set(r[2], r[3], 0);
      u.getBoundingSphere(this.boundingSphere);
    }
  }
  /**
   * Given a clipping rect, and the chunkedBounds from the last updateGlyphs call, choose the lowest
   * `instanceCount` that will show all glyphs within the clipped view. This is an optimization
   * for long blocks of text that are clipped, to skip vertex shader evaluation for glyphs that would
   * be clipped anyway.
   *
   * Note that since `drawElementsInstanced[ANGLE]` only accepts an instance count and not a starting
   * offset, this optimization becomes less effective as the clipRect moves closer to the end of the
   * text block. We could fix that by switching from instancing to a full geometry with a drawRange,
   * but at the expense of much larger attribute buffers (see classdoc above.)
   *
   * @param {Vector4} clipRect
   */
  applyClipRect(r) {
    let d = this.getAttribute($r).count, u = this._chunkedBounds;
    if (u)
      for (let t = u.length; t--; ) {
        d = u[t].end;
        let e = u[t].rect;
        if (e[1] < r.w && e[3] > r.y && e[0] < r.z && e[2] > r.x)
          break;
      }
    this.instanceCount = d;
  }
}
function sr(c, r, d, u) {
  const t = c.getAttribute(r);
  d ? t && t.array.length === d.length ? (t.array.set(d), t.needsUpdate = !0) : (c.setAttribute(r, new On(d, u)), delete c._maxInstanceCount, c.dispose()) : t && c.deleteAttribute(r);
}
const Ta = `
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaDistanceOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`, Fa = `
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaDistanceOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaDistanceOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);


float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`, Ca = `
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaDistanceOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaOutlineOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`, Aa = `
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaDistanceOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;
function Da(c) {
  const r = hr(c, {
    chained: !0,
    extensions: {
      derivatives: !0
    },
    uniforms: {
      uTroikaSDFTexture: { value: null },
      uTroikaSDFTextureSize: { value: new Bt() },
      uTroikaSDFGlyphSize: { value: 0 },
      uTroikaSDFExponent: { value: 0 },
      uTroikaTotalBounds: { value: new zr(0, 0, 0, 0) },
      uTroikaClipRect: { value: new zr(0, 0, 0, 0) },
      uTroikaDistanceOffset: { value: 0 },
      uTroikaOutlineOpacity: { value: 0 },
      uTroikaFillOpacity: { value: 1 },
      uTroikaPositionOffset: { value: new Bt() },
      uTroikaCurveRadius: { value: 0 },
      uTroikaBlurRadius: { value: 0 },
      uTroikaStrokeWidth: { value: 0 },
      uTroikaStrokeColor: { value: new vr() },
      uTroikaStrokeOpacity: { value: 1 },
      uTroikaOrient: { value: new Ln() },
      uTroikaUseGlyphColors: { value: !0 },
      uTroikaSDFDebug: { value: !1 }
    },
    vertexDefs: Ta,
    vertexTransform: Fa,
    fragmentDefs: Ca,
    fragmentColorTransform: Aa,
    customRewriter({ vertexShader: d, fragmentShader: u }) {
      let t = /\buniform\s+vec3\s+diffuse\b/;
      return t.test(u) && (u = u.replace(t, "varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g, "vTroikaGlyphColor"), t.test(d) || (d = d.replace(
        ln,
        `uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`
      ))), { vertexShader: d, fragmentShader: u };
    }
  });
  return r.transparent = !0, Object.defineProperties(r, {
    isTroikaTextMaterial: { value: !0 },
    // WebGLShadowMap reverses the side of the shadow material by default, which fails
    // for planes, so here we force the `shadowSide` to always match the main side.
    shadowSide: {
      get() {
        return this.side;
      },
      set() {
      }
    }
  }), r;
}
const yr = /* @__PURE__ */ new Nn({
  color: 16777215,
  side: on,
  transparent: !0
}), en = 8421504, tn = /* @__PURE__ */ new Wn(), Gt = /* @__PURE__ */ new mr(), fr = /* @__PURE__ */ new mr(), mt = [], Ea = /* @__PURE__ */ new mr(), lr = "+x+y";
function rn(c) {
  return Array.isArray(c) ? c[0] : c;
}
let gn = () => {
  const c = new pr(
    new gr(1, 1),
    yr
  );
  return gn = () => c, c;
}, mn = () => {
  const c = new pr(
    new gr(1, 1, 32, 1),
    yr
  );
  return mn = () => c, c;
};
const Ma = { type: "syncstart" }, Ra = { type: "synccomplete" }, yn = [
  "font",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "lang",
  "letterSpacing",
  "lineHeight",
  "maxWidth",
  "overflowWrap",
  "text",
  "direction",
  "textAlign",
  "textIndent",
  "whiteSpace",
  "anchorX",
  "anchorY",
  "colorRanges",
  "sdfGlyphSize"
], Ga = yn.concat(
  "material",
  "color",
  "depthOffset",
  "clipRect",
  "curveRadius",
  "orientation",
  "glyphGeometryDetail"
);
class Oa extends pr {
  constructor() {
    const r = new wa();
    super(r, null), this.text = "", this.anchorX = 0, this.anchorY = 0, this.curveRadius = 0, this.direction = "auto", this.font = null, this.unicodeFontsURL = null, this.fontSize = 0.1, this.fontWeight = "normal", this.fontStyle = "normal", this.lang = null, this.letterSpacing = 0, this.lineHeight = "normal", this.maxWidth = 1 / 0, this.overflowWrap = "normal", this.textAlign = "left", this.textIndent = 0, this.whiteSpace = "normal", this.material = null, this.color = null, this.colorRanges = null, this.outlineWidth = 0, this.outlineColor = 0, this.outlineOpacity = 1, this.outlineBlur = 0, this.outlineOffsetX = 0, this.outlineOffsetY = 0, this.strokeWidth = 0, this.strokeColor = en, this.strokeOpacity = 1, this.fillOpacity = 1, this.depthOffset = 0, this.clipRect = null, this.orientation = lr, this.glyphGeometryDetail = 1, this.sdfGlyphSize = null, this.gpuAccelerateSDF = !0, this.debugSDF = !1;
  }
  /**
   * Updates the text rendering according to the current text-related configuration properties.
   * This is an async process, so you can pass in a callback function to be executed when it
   * finishes.
   * @param {function} [callback]
   */
  sync(r) {
    this._needsSync && (this._needsSync = !1, this._isSyncing ? (this._queuedSyncs || (this._queuedSyncs = [])).push(r) : (this._isSyncing = !0, this.dispatchEvent(Ma), hn({
      text: this.text,
      font: this.font,
      lang: this.lang,
      fontSize: this.fontSize || 0.1,
      fontWeight: this.fontWeight || "normal",
      fontStyle: this.fontStyle || "normal",
      letterSpacing: this.letterSpacing || 0,
      lineHeight: this.lineHeight || "normal",
      maxWidth: this.maxWidth,
      direction: this.direction || "auto",
      textAlign: this.textAlign,
      textIndent: this.textIndent,
      whiteSpace: this.whiteSpace,
      overflowWrap: this.overflowWrap,
      anchorX: this.anchorX,
      anchorY: this.anchorY,
      colorRanges: this.colorRanges,
      includeCaretPositions: !0,
      //TODO parameterize
      sdfGlyphSize: this.sdfGlyphSize,
      gpuAccelerateSDF: this.gpuAccelerateSDF,
      unicodeFontsURL: this.unicodeFontsURL
    }, (d) => {
      this._isSyncing = !1, this._textRenderInfo = d, this.geometry.updateGlyphs(
        d.glyphBounds,
        d.glyphAtlasIndices,
        d.blockBounds,
        d.chunkedBounds,
        d.glyphColors
      );
      const u = this._queuedSyncs;
      u && (this._queuedSyncs = null, this._needsSync = !0, this.sync(() => {
        u.forEach((t) => t && t());
      })), this.dispatchEvent(Ra), r && r();
    })));
  }
  /**
   * Initiate a sync if needed - note it won't complete until next frame at the
   * earliest so if possible it's a good idea to call sync() manually as soon as
   * all the properties have been set.
   * @override
   */
  onBeforeRender(r, d, u, t, e, a) {
    this.sync(), e.isTroikaTextMaterial && this._prepareForRender(e), e._hadOwnSide = e.hasOwnProperty("side"), this.geometry.setSide(e._actualSide = e.side), e.side = Bn;
  }
  onAfterRender(r, d, u, t, e, a) {
    e._hadOwnSide ? e.side = e._actualSide : delete e.side;
  }
  /**
   * Shortcut to dispose the geometry specific to this instance.
   * Note: we don't also dispose the derived material here because if anything else is
   * sharing the same base material it will result in a pause next frame as the program
   * is recompiled. Instead users can dispose the base material manually, like normal,
   * and we'll also dispose the derived material at that time.
   */
  dispose() {
    this.geometry.dispose();
  }
  /**
   * @property {TroikaTextRenderInfo|null} textRenderInfo
   * @readonly
   * The current processed rendering data for this TextMesh, returned by the TextBuilder after
   * a `sync()` call. This will be `null` initially, and may be stale for a short period until
   * the asynchrous `sync()` process completes.
   */
  get textRenderInfo() {
    return this._textRenderInfo || null;
  }
  // Handler for automatically wrapping the base material with our upgrades. We do the wrapping
  // lazily on _read_ rather than write to avoid unnecessary wrapping on transient values.
  get material() {
    let r = this._derivedMaterial;
    const d = this._baseMaterial || this._defaultMaterial || (this._defaultMaterial = yr.clone());
    if ((!r || r.baseMaterial !== d) && (r = this._derivedMaterial = Da(d), d.addEventListener("dispose", function u() {
      d.removeEventListener("dispose", u), r.dispose();
    })), this.outlineWidth || this.outlineBlur || this.outlineOffsetX || this.outlineOffsetY) {
      let u = r._outlineMtl;
      return u || (u = r._outlineMtl = Object.create(r, {
        id: { value: r.id + 0.1 }
      }), u.isTextOutlineMaterial = !0, u.depthWrite = !1, u.map = null, r.addEventListener("dispose", function t() {
        r.removeEventListener("dispose", t), u.dispose();
      })), [
        u,
        r
      ];
    } else
      return r;
  }
  set material(r) {
    r && r.isTroikaTextMaterial ? (this._derivedMaterial = r, this._baseMaterial = r.baseMaterial) : this._baseMaterial = r;
  }
  get glyphGeometryDetail() {
    return this.geometry.detail;
  }
  set glyphGeometryDetail(r) {
    this.geometry.detail = r;
  }
  get curveRadius() {
    return this.geometry.curveRadius;
  }
  set curveRadius(r) {
    this.geometry.curveRadius = r;
  }
  // Create and update material for shadows upon request:
  get customDepthMaterial() {
    return rn(this.material).getDepthMaterial();
  }
  get customDistanceMaterial() {
    return rn(this.material).getDistanceMaterial();
  }
  _prepareForRender(r) {
    const d = r.isTextOutlineMaterial, u = r.uniforms, t = this.textRenderInfo;
    if (t) {
      const { sdfTexture: o, blockBounds: n } = t;
      u.uTroikaSDFTexture.value = o, u.uTroikaSDFTextureSize.value.set(o.image.width, o.image.height), u.uTroikaSDFGlyphSize.value = t.sdfGlyphSize, u.uTroikaSDFExponent.value = t.sdfExponent, u.uTroikaTotalBounds.value.fromArray(n), u.uTroikaUseGlyphColors.value = !d && !!t.glyphColors;
      let i = 0, s = 0, f = 0, l, h, p, g = 0, y = 0;
      if (d) {
        let { outlineWidth: x, outlineOffsetX: F, outlineOffsetY: U, outlineBlur: w, outlineOpacity: G } = this;
        i = this._parsePercent(x) || 0, s = Math.max(0, this._parsePercent(w) || 0), l = G, g = this._parsePercent(F) || 0, y = this._parsePercent(U) || 0;
      } else
        f = Math.max(0, this._parsePercent(this.strokeWidth) || 0), f && (p = this.strokeColor, u.uTroikaStrokeColor.value.set(p ?? en), h = this.strokeOpacity, h == null && (h = 1)), l = this.fillOpacity;
      u.uTroikaDistanceOffset.value = i, u.uTroikaPositionOffset.value.set(g, y), u.uTroikaBlurRadius.value = s, u.uTroikaStrokeWidth.value = f, u.uTroikaStrokeOpacity.value = h, u.uTroikaFillOpacity.value = l ?? 1, u.uTroikaCurveRadius.value = this.curveRadius || 0;
      let O = this.clipRect;
      if (O && Array.isArray(O) && O.length === 4)
        u.uTroikaClipRect.value.fromArray(O);
      else {
        const x = (this.fontSize || 0.1) * 100;
        u.uTroikaClipRect.value.set(
          n[0] - x,
          n[1] - x,
          n[2] + x,
          n[3] + x
        );
      }
      this.geometry.applyClipRect(u.uTroikaClipRect.value);
    }
    u.uTroikaSDFDebug.value = !!this.debugSDF, r.polygonOffset = !!this.depthOffset, r.polygonOffsetFactor = r.polygonOffsetUnits = this.depthOffset || 0;
    const e = d ? this.outlineColor || 0 : this.color;
    if (e == null)
      delete r.color;
    else {
      const o = r.hasOwnProperty("color") ? r.color : r.color = new vr();
      (e !== o._input || typeof e == "object") && o.set(o._input = e);
    }
    let a = this.orientation || lr;
    if (a !== r._orientation) {
      let o = u.uTroikaOrient.value;
      a = a.replace(/[^-+xyz]/g, "");
      let n = a !== lr && a.match(/^([-+])([xyz])([-+])([xyz])$/);
      if (n) {
        let [, i, s, f, l] = n;
        Gt.set(0, 0, 0)[s] = i === "-" ? 1 : -1, fr.set(0, 0, 0)[l] = f === "-" ? -1 : 1, tn.lookAt(Ea, Gt.cross(fr), fr), o.setFromMatrix4(tn);
      } else
        o.identity();
      r._orientation = a;
    }
  }
  _parsePercent(r) {
    if (typeof r == "string") {
      let d = r.match(/^(-?[\d.]+)%$/), u = d ? parseFloat(d[1]) : NaN;
      r = (isNaN(u) ? 0 : u / 100) * this.fontSize;
    }
    return r;
  }
  /**
   * Translate a point in local space to an x/y in the text plane.
   */
  localPositionToTextCoords(r, d = new Bt()) {
    d.copy(r);
    const u = this.curveRadius;
    return u && (d.x = Math.atan2(r.x, Math.abs(u) - Math.abs(r.z)) * Math.abs(u)), d;
  }
  /**
   * Translate a point in world space to an x/y in the text plane.
   */
  worldPositionToTextCoords(r, d = new Bt()) {
    return Gt.copy(r), this.localPositionToTextCoords(this.worldToLocal(Gt), d);
  }
  /**
   * @override Custom raycasting to test against the whole text block's max rectangular bounds
   * TODO is there any reason to make this more granular, like within individual line or glyph rects?
   */
  raycast(r, d) {
    const { textRenderInfo: u, curveRadius: t } = this;
    if (u) {
      const e = u.blockBounds, a = t ? mn() : gn(), o = a.geometry, { position: n, uv: i } = o.attributes;
      for (let s = 0; s < i.count; s++) {
        let f = e[0] + i.getX(s) * (e[2] - e[0]);
        const l = e[1] + i.getY(s) * (e[3] - e[1]);
        let h = 0;
        t && (h = t - Math.cos(f / t) * t, f = Math.sin(f / t) * t), n.setXYZ(s, f, l, h);
      }
      o.boundingSphere = this.geometry.boundingSphere, o.boundingBox = this.geometry.boundingBox, a.matrixWorld = this.matrixWorld, a.material.side = this.material.side, mt.length = 0, a.raycast(r, mt);
      for (let s = 0; s < mt.length; s++)
        mt[s].object = this, d.push(mt[s]);
    }
  }
  copy(r) {
    const d = this.geometry;
    return super.copy(r), this.geometry = d, Ga.forEach((u) => {
      this[u] = r[u];
    }), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
yn.forEach((c) => {
  const r = "_private_" + c;
  Object.defineProperty(Oa.prototype, c, {
    get() {
      return this[r];
    },
    set(d) {
      d !== this[r] && (this[r] = d, this._needsSync = !0);
    }
  });
});
function Wa(c, r, d) {
  let u = null;
  const t = La(c);
  let e = null;
  return t.forEach((a) => {
    (!e || Math.abs(d - (a.top + a.bottom) / 2) < Math.abs(d - (e.top + e.bottom) / 2)) && (e = a);
  }), e.carets.forEach((a) => {
    (!u || Math.abs(r - a.x) < Math.abs(r - u.x)) && (u = a);
  }), u;
}
const nn = /* @__PURE__ */ new WeakMap();
function za(c, r, d) {
  let u;
  if (c) {
    let t = nn.get(c);
    if (t && t.start === r && t.end === d)
      return t.rects;
    const { caretPositions: e } = c;
    if (d < r) {
      const o = r;
      r = d, d = o;
    }
    r = Math.max(r, 0), d = Math.min(d, e.length + 1), u = [];
    let a = null;
    for (let o = r; o < d; o++) {
      const n = e[o * 4], i = e[o * 4 + 1], s = Math.min(n, i), f = Math.max(n, i), l = e[o * 4 + 2], h = e[o * 4 + 3];
      (!a || l !== a.bottom || h !== a.top || s > a.right || f < a.left) && (a = {
        left: 1 / 0,
        right: -1 / 0,
        bottom: l,
        top: h
      }, u.push(a)), a.left = Math.min(s, a.left), a.right = Math.max(f, a.right);
    }
    u.sort((o, n) => n.bottom - o.bottom || o.left - n.left);
    for (let o = u.length - 1; o-- > 0; ) {
      const n = u[o], i = u[o + 1];
      n.bottom === i.bottom && n.top === i.top && n.left <= i.right && n.right >= i.left && (i.left = Math.min(i.left, n.left), i.right = Math.max(i.right, n.right), u.splice(o, 1));
    }
    nn.set(c, { start: r, end: d, rects: u });
  }
  return u;
}
const an = /* @__PURE__ */ new WeakMap();
function La(c) {
  let r = an.get(c);
  if (!r) {
    r = [];
    const { caretPositions: d } = c;
    let u;
    const t = (a, o, n, i) => {
      (!u || n < (u.top + u.bottom) / 2) && r.push(u = { bottom: o, top: n, carets: [] }), n > u.top && (u.top = n), o < u.bottom && (u.bottom = o), u.carets.push({
        x: a,
        y: o,
        height: n - o,
        charIndex: i
      });
    };
    let e = 0;
    for (; e < d.length; e += 4)
      t(d[e], d[e + 2], d[e + 3], e / 4);
    t(d[e - 3], d[e - 2], d[e - 1], e / 4);
  }
  return an.set(c, r), r;
}
export {
  wa as GlyphsGeometry,
  Oa as Text,
  Pa as configureTextBuilder,
  Da as createTextDerivedMaterial,
  Na as dumpSDFTextures,
  fa as fontResolverWorkerModule,
  Wa as getCaretAtPoint,
  za as getSelectionRects,
  hn as getTextRenderInfo,
  Ia as preloadFont,
  Ua as typesetterWorkerModule
};
