!function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.echarts = {});
}(this, function (t) {
  "use strict";

  function e(t) {
    var e = {},
        n = {},
        i = t.match(/Firefox\/([\d.]+)/),
        r = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/),
        a = t.match(/Edge\/([\d.]+)/),
        o = /micromessenger/i.test(t);
    return i && (n.firefox = !0, n.version = i[1]), r && (n.ie = !0, n.version = r[1]), a && (n.edge = !0, n.version = a[1]), o && (n.weChat = !0), {
      browser: n,
      os: e,
      node: !1,
      canvasSupported: !!document.createElement("canvas").getContext,
      svgSupported: "undefined" != typeof SVGRect,
      touchEventsSupported: "ontouchstart" in window && !n.ie && !n.edge,
      pointerEventsSupported: "onpointerdown" in window && (n.edge || n.ie && n.version >= 11),
      domSupported: "undefined" != typeof document
    };
  }

  function n(t, e) {
    "createCanvas" === t && (Su = null), wu[t] = e;
  }

  function i(t) {
    if (null == t || "object" != typeof t) return t;
    var e = t,
        n = pu.call(t);

    if ("[object Array]" === n) {
      if (!O(t)) {
        e = [];

        for (var r = 0, a = t.length; a > r; r++) e[r] = i(t[r]);
      }
    } else if (fu[n]) {
      if (!O(t)) {
        var o = t.constructor;
        if (t.constructor.from) e = o.from(t);else {
          e = new o(t.length);

          for (var r = 0, a = t.length; a > r; r++) e[r] = i(t[r]);
        }
      }
    } else if (!du[n] && !O(t) && !M(t)) {
      e = {};

      for (var s in t) t.hasOwnProperty(s) && (e[s] = i(t[s]));
    }

    return e;
  }

  function r(t, e, n) {
    if (!w(e) || !w(t)) return n ? i(e) : t;

    for (var a in e) if (e.hasOwnProperty(a)) {
      var o = t[a],
          s = e[a];
      !w(s) || !w(o) || _(s) || _(o) || M(s) || M(o) || b(s) || b(o) || O(s) || O(o) ? !n && a in t || (t[a] = i(e[a], !0)) : r(o, s, n);
    }

    return t;
  }

  function a(t, e) {
    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);

    return t;
  }

  function o(t, e, n) {
    for (var i in e) e.hasOwnProperty(i) && (n ? null != e[i] : null == t[i]) && (t[i] = e[i]);

    return t;
  }

  function s() {
    return Su || (Su = bu().getContext("2d")), Su;
  }

  function l(t, e) {
    if (t) {
      if (t.indexOf) return t.indexOf(e);

      for (var n = 0, i = t.length; i > n; n++) if (t[n] === e) return n;
    }

    return -1;
  }

  function h(t, e) {
    function n() {}

    var i = t.prototype;
    n.prototype = e.prototype, t.prototype = new n();

    for (var r in i) i.hasOwnProperty(r) && (t.prototype[r] = i[r]);

    t.prototype.constructor = t, t.superClass = e;
  }

  function u(t, e, n) {
    t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, o(t, e, n);
  }

  function c(t) {
    return t ? "string" == typeof t ? !1 : "number" == typeof t.length : void 0;
  }

  function d(t, e, n) {
    if (t && e) if (t.forEach && t.forEach === vu) t.forEach(e, n);else if (t.length === +t.length) for (var i = 0, r = t.length; r > i; i++) e.call(n, t[i], i, t);else for (var a in t) t.hasOwnProperty(a) && e.call(n, t[a], a, t);
  }

  function f(t, e, n) {
    if (t && e) {
      if (t.map && t.map === yu) return t.map(e, n);

      for (var i = [], r = 0, a = t.length; a > r; r++) i.push(e.call(n, t[r], r, t));

      return i;
    }
  }

  function p(t, e, n, i) {
    if (t && e) {
      if (t.reduce && t.reduce === xu) return t.reduce(e, n, i);

      for (var r = 0, a = t.length; a > r; r++) n = e.call(i, n, t[r], r, t);

      return n;
    }
  }

  function g(t, e, n) {
    if (t && e) {
      if (t.filter && t.filter === mu) return t.filter(e, n);

      for (var i = [], r = 0, a = t.length; a > r; r++) e.call(n, t[r], r, t) && i.push(t[r]);

      return i;
    }
  }

  function v(t, e) {
    var n = _u.call(arguments, 2);

    return function () {
      return t.apply(e, n.concat(_u.call(arguments)));
    };
  }

  function m(t) {
    var e = _u.call(arguments, 1);

    return function () {
      return t.apply(this, e.concat(_u.call(arguments)));
    };
  }

  function _(t) {
    return "[object Array]" === pu.call(t);
  }

  function y(t) {
    return "function" == typeof t;
  }

  function x(t) {
    return "[object String]" === pu.call(t);
  }

  function w(t) {
    var e = typeof t;
    return "function" === e || !!t && "object" === e;
  }

  function b(t) {
    return !!du[pu.call(t)];
  }

  function S(t) {
    return !!fu[pu.call(t)];
  }

  function M(t) {
    return "object" == typeof t && "number" == typeof t.nodeType && "object" == typeof t.ownerDocument;
  }

  function T(t, e) {
    return null != t ? t : e;
  }

  function I(t, e, n) {
    return null != t ? t : null != e ? e : n;
  }

  function C() {
    return Function.call.apply(_u, arguments);
  }

  function k(t) {
    if ("number" == typeof t) return [t, t, t, t];
    var e = t.length;
    return 2 === e ? [t[0], t[1], t[0], t[1]] : 3 === e ? [t[0], t[1], t[2], t[1]] : t;
  }

  function D(t, e) {
    if (!t) throw new Error(e);
  }

  function A(t) {
    return null == t ? null : "function" == typeof t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  }

  function P(t) {
    t[Mu] = !0;
  }

  function O(t) {
    return t[Mu];
  }

  function L(t) {
    function e(t, e) {
      n ? i.set(t, e) : i.set(e, t);
    }

    var n = _(t);

    this.data = {};
    var i = this;
    t instanceof L ? t.each(e) : t && d(t, e);
  }

  function E(t) {
    return new L(t);
  }

  function B() {}

  function R(t, e) {
    var n = new Tu(2);
    return null == t && (t = 0), null == e && (e = 0), n[0] = t, n[1] = e, n;
  }

  function z(t) {
    var e = new Tu(2);
    return e[0] = t[0], e[1] = t[1], e;
  }

  function N(t, e, n) {
    return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t;
  }

  function F(t, e, n) {
    return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t;
  }

  function H(t) {
    return Math.sqrt(V(t));
  }

  function V(t) {
    return t[0] * t[0] + t[1] * t[1];
  }

  function W(t, e, n) {
    return t[0] = e[0] * n, t[1] = e[1] * n, t;
  }

  function G(t, e) {
    var n = H(e);
    return 0 === n ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / n, t[1] = e[1] / n), t;
  }

  function U(t, e) {
    return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]));
  }

  function X(t, e) {
    return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]);
  }

  function Y(t, e, n) {
    var i = e[0],
        r = e[1];
    return t[0] = n[0] * i + n[2] * r + n[4], t[1] = n[1] * i + n[3] * r + n[5], t;
  }

  function q(t, e, n) {
    return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t;
  }

  function j(t, e, n) {
    return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t;
  }

  function Z() {
    this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), this.on("mouseup", this._dragEnd, this);
  }

  function $(t, e) {
    return {
      target: t,
      topTarget: e && e.topTarget
    };
  }

  function Q(t, e) {
    var n = t._$eventProcessor;
    return null != e && n && n.normalizeQuery && (e = n.normalizeQuery(e)), e;
  }

  function K(t, e, n, i, r, a) {
    var o = t._$handlers;
    if ("function" == typeof n && (r = i, i = n, n = null), !i || !e) return t;
    n = Q(t, n), o[e] || (o[e] = []);

    for (var s = 0; s < o[e].length; s++) if (o[e][s].h === i) return t;

    var l = {
      h: i,
      one: a,
      query: n,
      ctx: r || t,
      callAtLast: i.zrEventfulCallAtLast
    },
        h = o[e].length - 1,
        u = o[e][h];
    return u && u.callAtLast ? o[e].splice(h, 0, l) : o[e].push(l), t;
  }

  function J(t, e, n, i, r, a) {
    var o = i + "-" + r,
        s = t.length;
    if (a.hasOwnProperty(o)) return a[o];

    if (1 === e) {
      var l = Math.round(Math.log((1 << s) - 1 & ~r) / Au);
      return t[n][l];
    }

    for (var h = i | 1 << n, u = n + 1; i & 1 << u;) u++;

    for (var c = 0, d = 0, f = 0; s > d; d++) {
      var p = 1 << d;
      p & r || (c += (f % 2 ? -1 : 1) * t[n][d] * J(t, e - 1, u, h, r | p, a), f++);
    }

    return a[o] = c, c;
  }

  function te(t, e) {
    var n = [[t[0], t[1], 1, 0, 0, 0, -e[0] * t[0], -e[0] * t[1]], [0, 0, 0, t[0], t[1], 1, -e[1] * t[0], -e[1] * t[1]], [t[2], t[3], 1, 0, 0, 0, -e[2] * t[2], -e[2] * t[3]], [0, 0, 0, t[2], t[3], 1, -e[3] * t[2], -e[3] * t[3]], [t[4], t[5], 1, 0, 0, 0, -e[4] * t[4], -e[4] * t[5]], [0, 0, 0, t[4], t[5], 1, -e[5] * t[4], -e[5] * t[5]], [t[6], t[7], 1, 0, 0, 0, -e[6] * t[6], -e[6] * t[7]], [0, 0, 0, t[6], t[7], 1, -e[7] * t[6], -e[7] * t[7]]],
        i = {},
        r = J(n, 8, 0, 0, 0, i);

    if (0 !== r) {
      for (var a = [], o = 0; 8 > o; o++) for (var s = 0; 8 > s; s++) null == a[s] && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * J(n, 7, 0 === o ? 1 : 0, 1 << o, 1 << s, i) / r * e[o];

      return function (t, e, n) {
        var i = e * a[6] + n * a[7] + 1;
        t[0] = (e * a[0] + n * a[1] + a[2]) / i, t[1] = (e * a[3] + n * a[4] + a[5]) / i;
      };
    }
  }

  function ee(t, e, n, i, r) {
    if (e.getBoundingClientRect && cu.domSupported && !re(e)) {
      var a = e[Pu] || (e[Pu] = {}),
          o = ne(e, a),
          s = ie(o, a, r);
      if (s) return s(t, n, i), !0;
    }

    return !1;
  }

  function ne(t, e) {
    var n = e.markers;
    if (n) return n;
    n = e.markers = [];

    for (var i = ["left", "right"], r = ["top", "bottom"], a = 0; 4 > a; a++) {
      var o = document.createElement("div"),
          s = o.style,
          l = a % 2,
          h = (a >> 1) % 2;
      s.cssText = ["position: absolute", "visibility: hidden", "padding: 0", "margin: 0", "border-width: 0", "user-select: none", "width:0", "height:0", i[l] + ":0", r[h] + ":0", i[1 - l] + ":auto", r[1 - h] + ":auto", ""].join("!important;"), t.appendChild(o), n.push(o);
    }

    return n;
  }

  function ie(t, e, n) {
    for (var i = n ? "invTrans" : "trans", r = e[i], a = e.srcCoords, o = !0, s = [], l = [], h = 0; 4 > h; h++) {
      var u = t[h].getBoundingClientRect(),
          c = 2 * h,
          d = u.left,
          f = u.top;
      s.push(d, f), o = o && a && d === a[c] && f === a[c + 1], l.push(t[h].offsetLeft, t[h].offsetTop);
    }

    return o && r ? r : (e.srcCoords = s, e[i] = n ? te(l, s) : te(s, l));
  }

  function re(t) {
    return "CANVAS" === t.nodeName.toUpperCase();
  }

  function ae(t, e, n, i) {
    return n = n || {}, i || !cu.canvasSupported ? oe(t, e, n) : cu.browser.firefox && null != e.layerX && e.layerX !== e.offsetX ? (n.zrX = e.layerX, n.zrY = e.layerY) : null != e.offsetX ? (n.zrX = e.offsetX, n.zrY = e.offsetY) : oe(t, e, n), n;
  }

  function oe(t, e, n) {
    if (cu.domSupported && t.getBoundingClientRect) {
      var i = e.clientX,
          r = e.clientY;

      if (re(t)) {
        var a = t.getBoundingClientRect();
        return n.zrX = i - a.left, void (n.zrY = r - a.top);
      }

      if (ee(Eu, t, i, r)) return n.zrX = Eu[0], void (n.zrY = Eu[1]);
    }

    n.zrX = n.zrY = 0;
  }

  function se(t) {
    return t || window.event;
  }

  function le(t, e, n) {
    if (e = se(e), null != e.zrX) return e;
    var i = e.type,
        r = i && i.indexOf("touch") >= 0;

    if (r) {
      var a = "touchend" !== i ? e.targetTouches[0] : e.changedTouches[0];
      a && ae(t, a, e, n);
    } else ae(t, e, e, n), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;

    var o = e.button;
    return null == e.which && void 0 !== o && Lu.test(e.type) && (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e;
  }

  function he(t, e, n, i) {
    Ou ? t.addEventListener(e, n, i) : t.attachEvent("on" + e, n);
  }

  function ue(t, e, n, i) {
    Ou ? t.removeEventListener(e, n, i) : t.detachEvent("on" + e, n);
  }

  function ce(t) {
    var e = t[1][0] - t[0][0],
        n = t[1][1] - t[0][1];
    return Math.sqrt(e * e + n * n);
  }

  function de(t) {
    return [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2];
  }

  function fe(t, e, n) {
    return {
      type: t,
      event: n,
      target: e.target,
      topTarget: e.topTarget,
      cancelBubble: !1,
      offsetX: n.zrX,
      offsetY: n.zrY,
      gestureEvent: n.gestureEvent,
      pinchX: n.pinchX,
      pinchY: n.pinchY,
      pinchScale: n.pinchScale,
      wheelDelta: n.zrDelta,
      zrByTouch: n.zrByTouch,
      which: n.which,
      stop: pe
    };
  }

  function pe() {
    Bu(this.event);
  }

  function ge() {}

  function ve(t, e, n) {
    if (t[t.rectHover ? "rectContain" : "contain"](e, n)) {
      for (var i, r = t; r;) {
        if (r.clipPath && !r.clipPath.contain(e, n)) return !1;
        r.silent && (i = !0), r = r.parent;
      }

      return i ? Nu : !0;
    }

    return !1;
  }

  function me(t, e, n) {
    var i = t.painter;
    return 0 > e || e > i.getWidth() || 0 > n || n > i.getHeight();
  }

  function _e() {
    var t = new Vu(6);
    return ye(t), t;
  }

  function ye(t) {
    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
  }

  function xe(t, e) {
    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t;
  }

  function we(t, e, n) {
    var i = e[0] * n[0] + e[2] * n[1],
        r = e[1] * n[0] + e[3] * n[1],
        a = e[0] * n[2] + e[2] * n[3],
        o = e[1] * n[2] + e[3] * n[3],
        s = e[0] * n[4] + e[2] * n[5] + e[4],
        l = e[1] * n[4] + e[3] * n[5] + e[5];
    return t[0] = i, t[1] = r, t[2] = a, t[3] = o, t[4] = s, t[5] = l, t;
  }

  function be(t, e, n) {
    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + n[0], t[5] = e[5] + n[1], t;
  }

  function Se(t, e, n) {
    var i = e[0],
        r = e[2],
        a = e[4],
        o = e[1],
        s = e[3],
        l = e[5],
        h = Math.sin(n),
        u = Math.cos(n);
    return t[0] = i * u + o * h, t[1] = -i * h + o * u, t[2] = r * u + s * h, t[3] = -r * h + u * s, t[4] = u * a + h * l, t[5] = u * l - h * a, t;
  }

  function Me(t, e, n) {
    var i = n[0],
        r = n[1];
    return t[0] = e[0] * i, t[1] = e[1] * r, t[2] = e[2] * i, t[3] = e[3] * r, t[4] = e[4] * i, t[5] = e[5] * r, t;
  }

  function Te(t, e) {
    var n = e[0],
        i = e[2],
        r = e[4],
        a = e[1],
        o = e[3],
        s = e[5],
        l = n * o - a * i;
    return l ? (l = 1 / l, t[0] = o * l, t[1] = -a * l, t[2] = -i * l, t[3] = n * l, t[4] = (i * s - o * r) * l, t[5] = (a * r - n * s) * l, t) : null;
  }

  function Ie(t) {
    return t > Gu || -Gu > t;
  }

  function Ce(t) {
    this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, this._initialized = !1, this.loop = null == t.loop ? !1 : t.loop, this.gap = t.gap || 0, this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, this.onrestart = t.onrestart, this._pausedTime = 0, this._paused = !1;
  }

  function ke(t) {
    return t = Math.round(t), 0 > t ? 0 : t > 255 ? 255 : t;
  }

  function De(t) {
    return 0 > t ? 0 : t > 1 ? 1 : t;
  }

  function Ae(t) {
    return ke(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 * 255 : parseInt(t, 10));
  }

  function Pe(t) {
    return De(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 : parseFloat(t));
  }

  function Oe(t, e, n) {
    return 0 > n ? n += 1 : n > 1 && (n -= 1), 1 > 6 * n ? t + (e - t) * n * 6 : 1 > 2 * n ? e : 2 > 3 * n ? t + (e - t) * (2 / 3 - n) * 6 : t;
  }

  function Le(t, e, n, i, r) {
    return t[0] = e, t[1] = n, t[2] = i, t[3] = r, t;
  }

  function Ee(t, e) {
    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
  }

  function Be(t, e) {
    ic && Ee(ic, e), ic = nc.put(t, ic || e.slice());
  }

  function Re(t, e) {
    if (t) {
      e = e || [];
      var n = nc.get(t);
      if (n) return Ee(e, n);
      t += "";
      var i = t.replace(/ /g, "").toLowerCase();
      if (i in ec) return Ee(e, ec[i]), Be(t, e), e;

      if ("#" !== i.charAt(0)) {
        var r = i.indexOf("("),
            a = i.indexOf(")");

        if (-1 !== r && a + 1 === i.length) {
          var o = i.substr(0, r),
              s = i.substr(r + 1, a - (r + 1)).split(","),
              l = 1;

          switch (o) {
            case "rgba":
              if (4 !== s.length) return void Le(e, 0, 0, 0, 1);
              l = Pe(s.pop());

            case "rgb":
              return 3 !== s.length ? void Le(e, 0, 0, 0, 1) : (Le(e, Ae(s[0]), Ae(s[1]), Ae(s[2]), l), Be(t, e), e);

            case "hsla":
              return 4 !== s.length ? void Le(e, 0, 0, 0, 1) : (s[3] = Pe(s[3]), ze(s, e), Be(t, e), e);

            case "hsl":
              return 3 !== s.length ? void Le(e, 0, 0, 0, 1) : (ze(s, e), Be(t, e), e);

            default:
              return;
          }
        }

        Le(e, 0, 0, 0, 1);
      } else {
        if (4 === i.length) {
          var h = parseInt(i.substr(1), 16);
          return h >= 0 && 4095 >= h ? (Le(e, (3840 & h) >> 4 | (3840 & h) >> 8, 240 & h | (240 & h) >> 4, 15 & h | (15 & h) << 4, 1), Be(t, e), e) : void Le(e, 0, 0, 0, 1);
        }

        if (7 === i.length) {
          var h = parseInt(i.substr(1), 16);
          return h >= 0 && 16777215 >= h ? (Le(e, (16711680 & h) >> 16, (65280 & h) >> 8, 255 & h, 1), Be(t, e), e) : void Le(e, 0, 0, 0, 1);
        }
      }
    }
  }

  function ze(t, e) {
    var n = (parseFloat(t[0]) % 360 + 360) % 360 / 360,
        i = Pe(t[1]),
        r = Pe(t[2]),
        a = .5 >= r ? r * (i + 1) : r + i - r * i,
        o = 2 * r - a;
    return e = e || [], Le(e, ke(255 * Oe(o, a, n + 1 / 3)), ke(255 * Oe(o, a, n)), ke(255 * Oe(o, a, n - 1 / 3)), 1), 4 === t.length && (e[3] = t[3]), e;
  }

  function Ne(t, e) {
    var n = Re(t);

    if (n) {
      for (var i = 0; 3 > i; i++) n[i] = 0 > e ? n[i] * (1 - e) | 0 : (255 - n[i]) * e + n[i] | 0, n[i] > 255 ? n[i] = 255 : t[i] < 0 && (n[i] = 0);

      return He(n, 4 === n.length ? "rgba" : "rgb");
    }
  }

  function Fe(t) {
    var e = Re(t);
    return e ? ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1) : void 0;
  }

  function He(t, e) {
    if (t && t.length) {
      var n = t[0] + "," + t[1] + "," + t[2];
      return ("rgba" === e || "hsva" === e || "hsla" === e) && (n += "," + t[3]), e + "(" + n + ")";
    }
  }

  function Ve(t, e) {
    return t[e];
  }

  function We(t, e, n) {
    t[e] = n;
  }

  function Ge(t, e, n) {
    return (e - t) * n + t;
  }

  function Ue(t, e, n) {
    return n > .5 ? e : t;
  }

  function Xe(t, e, n, i, r) {
    var a = t.length;
    if (1 === r) for (var o = 0; a > o; o++) i[o] = Ge(t[o], e[o], n);else for (var s = a && t[0].length, o = 0; a > o; o++) for (var l = 0; s > l; l++) i[o][l] = Ge(t[o][l], e[o][l], n);
  }

  function Ye(t, e, n) {
    var i = t.length,
        r = e.length;

    if (i !== r) {
      var a = i > r;
      if (a) t.length = r;else for (var o = i; r > o; o++) t.push(1 === n ? e[o] : rc.call(e[o]));
    }

    for (var s = t[0] && t[0].length, o = 0; o < t.length; o++) if (1 === n) isNaN(t[o]) && (t[o] = e[o]);else for (var l = 0; s > l; l++) isNaN(t[o][l]) && (t[o][l] = e[o][l]);
  }

  function qe(t, e, n) {
    if (t === e) return !0;
    var i = t.length;
    if (i !== e.length) return !1;

    if (1 === n) {
      for (var r = 0; i > r; r++) if (t[r] !== e[r]) return !1;
    } else for (var a = t[0].length, r = 0; i > r; r++) for (var o = 0; a > o; o++) if (t[r][o] !== e[r][o]) return !1;

    return !0;
  }

  function je(t, e, n, i, r, a, o, s, l) {
    var h = t.length;
    if (1 === l) for (var u = 0; h > u; u++) s[u] = Ze(t[u], e[u], n[u], i[u], r, a, o);else for (var c = t[0].length, u = 0; h > u; u++) for (var d = 0; c > d; d++) s[u][d] = Ze(t[u][d], e[u][d], n[u][d], i[u][d], r, a, o);
  }

  function Ze(t, e, n, i, r, a, o) {
    var s = .5 * (n - t),
        l = .5 * (i - e);
    return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e;
  }

  function $e(t) {
    if (c(t)) {
      var e = t.length;

      if (c(t[0])) {
        for (var n = [], i = 0; e > i; i++) n.push(rc.call(t[i]));

        return n;
      }

      return rc.call(t);
    }

    return t;
  }

  function Qe(t) {
    return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), "rgba(" + t.join(",") + ")";
  }

  function Ke(t) {
    var e = t[t.length - 1].value;
    return c(e && e[0]) ? 2 : 1;
  }

  function Je(t, e, n, i, r, a) {
    var o = t._getter,
        s = t._setter,
        l = "spline" === e,
        h = i.length;

    if (h) {
      var u,
          d = i[0].value,
          f = c(d),
          p = !1,
          g = !1,
          v = f ? Ke(i) : 0;
      i.sort(function (t, e) {
        return t.time - e.time;
      }), u = i[h - 1].time;

      for (var m = [], _ = [], y = i[0].value, x = !0, w = 0; h > w; w++) {
        m.push(i[w].time / u);
        var b = i[w].value;

        if (f && qe(b, y, v) || !f && b === y || (x = !1), y = b, "string" == typeof b) {
          var S = Re(b);
          S ? (b = S, p = !0) : g = !0;
        }

        _.push(b);
      }

      if (a || !x) {
        for (var M = _[h - 1], w = 0; h - 1 > w; w++) f ? Ye(_[w], M, v) : !isNaN(_[w]) || isNaN(M) || g || p || (_[w] = M);

        f && Ye(o(t._target, r), M, v);
        var T,
            I,
            C,
            k,
            D,
            A,
            P = 0,
            O = 0;
        if (p) var L = [0, 0, 0, 0];

        var E = function (t, e) {
          var n;
          if (0 > e) n = 0;else if (O > e) {
            for (T = Math.min(P + 1, h - 1), n = T; n >= 0 && !(m[n] <= e); n--);

            n = Math.min(n, h - 2);
          } else {
            for (n = P; h > n && !(m[n] > e); n++);

            n = Math.min(n - 1, h - 2);
          }
          P = n, O = e;
          var i = m[n + 1] - m[n];
          if (0 !== i) if (I = (e - m[n]) / i, l) {
            if (k = _[n], C = _[0 === n ? n : n - 1], D = _[n > h - 2 ? h - 1 : n + 1], A = _[n > h - 3 ? h - 1 : n + 2], f) je(C, k, D, A, I, I * I, I * I * I, o(t, r), v);else {
              var a;
              if (p) a = je(C, k, D, A, I, I * I, I * I * I, L, 1), a = Qe(L);else {
                if (g) return Ue(k, D, I);
                a = Ze(C, k, D, A, I, I * I, I * I * I);
              }
              s(t, r, a);
            }
          } else if (f) Xe(_[n], _[n + 1], I, o(t, r), v);else {
            var a;
            if (p) Xe(_[n], _[n + 1], I, L, 1), a = Qe(L);else {
              if (g) return Ue(_[n], _[n + 1], I);
              a = Ge(_[n], _[n + 1], I);
            }
            s(t, r, a);
          }
        },
            B = new Ce({
          target: t._target,
          life: u,
          loop: t._loop,
          delay: t._delay,
          onframe: E,
          ondestroy: n
        });

        return e && "spline" !== e && (B.easing = e), B;
      }
    }
  }

  function tn(t, e, n, i, r, a, o, s) {
    function l() {
      u--, u || a && a();
    }

    x(i) ? (a = r, r = i, i = 0) : y(r) ? (a = r, r = "linear", i = 0) : y(i) ? (a = i, i = 0) : y(n) ? (a = n, n = 500) : n || (n = 500), t.stopAnimation(), en(t, "", t, e, n, i, s);
    var h = t.animators.slice(),
        u = h.length;
    u || a && a();

    for (var c = 0; c < h.length; c++) h[c].done(l).start(r, o);
  }

  function en(t, e, n, i, r, a, o) {
    var s = {},
        l = 0;

    for (var h in i) i.hasOwnProperty(h) && (null != n[h] ? w(i[h]) && !c(i[h]) ? en(t, e ? e + "." + h : h, n[h], i[h], r, a, o) : (o ? (s[h] = n[h], nn(t, e, h, i[h])) : s[h] = i[h], l++) : null == i[h] || o || nn(t, e, h, i[h]));

    l > 0 && t.animate(e, !1).when(null == r ? 500 : r, s).delay(a || 0);
  }

  function nn(t, e, n, i) {
    if (e) {
      var r = {};
      r[e] = {}, r[e][n] = i, t.attr(r);
    } else t.attr(n, i);
  }

  function rn(t, e, n, i) {
    0 > n && (t += n, n = -n), 0 > i && (e += i, i = -i), this.x = t, this.y = e, this.width = n, this.height = i;
  }

  function an(t) {
    for (var e = 0; t >= mc;) e |= 1 & t, t >>= 1;

    return t + e;
  }

  function on(t, e, n, i) {
    var r = e + 1;
    if (r === n) return 1;

    if (i(t[r++], t[e]) < 0) {
      for (; n > r && i(t[r], t[r - 1]) < 0;) r++;

      sn(t, e, r);
    } else for (; n > r && i(t[r], t[r - 1]) >= 0;) r++;

    return r - e;
  }

  function sn(t, e, n) {
    for (n--; n > e;) {
      var i = t[e];
      t[e++] = t[n], t[n--] = i;
    }
  }

  function ln(t, e, n, i, r) {
    for (i === e && i++; n > i; i++) {
      for (var a, o = t[i], s = e, l = i; l > s;) a = s + l >>> 1, r(o, t[a]) < 0 ? l = a : s = a + 1;

      var h = i - s;

      switch (h) {
        case 3:
          t[s + 3] = t[s + 2];

        case 2:
          t[s + 2] = t[s + 1];

        case 1:
          t[s + 1] = t[s];
          break;

        default:
          for (; h > 0;) t[s + h] = t[s + h - 1], h--;

      }

      t[s] = o;
    }
  }

  function hn(t, e, n, i, r, a) {
    var o = 0,
        s = 0,
        l = 1;

    if (a(t, e[n + r]) > 0) {
      for (s = i - r; s > l && a(t, e[n + r + l]) > 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);

      l > s && (l = s), o += r, l += r;
    } else {
      for (s = r + 1; s > l && a(t, e[n + r - l]) <= 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);

      l > s && (l = s);
      var h = o;
      o = r - l, l = r - h;
    }

    for (o++; l > o;) {
      var u = o + (l - o >>> 1);
      a(t, e[n + u]) > 0 ? o = u + 1 : l = u;
    }

    return l;
  }

  function un(t, e, n, i, r, a) {
    var o = 0,
        s = 0,
        l = 1;

    if (a(t, e[n + r]) < 0) {
      for (s = r + 1; s > l && a(t, e[n + r - l]) < 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);

      l > s && (l = s);
      var h = o;
      o = r - l, l = r - h;
    } else {
      for (s = i - r; s > l && a(t, e[n + r + l]) >= 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);

      l > s && (l = s), o += r, l += r;
    }

    for (o++; l > o;) {
      var u = o + (l - o >>> 1);
      a(t, e[n + u]) < 0 ? l = u : o = u + 1;
    }

    return l;
  }

  function cn(t, e) {
    function n(t, e) {
      l[c] = t, h[c] = e, c += 1;
    }

    function i() {
      for (; c > 1;) {
        var t = c - 2;
        if (t >= 1 && h[t - 1] <= h[t] + h[t + 1] || t >= 2 && h[t - 2] <= h[t] + h[t - 1]) h[t - 1] < h[t + 1] && t--;else if (h[t] > h[t + 1]) break;
        a(t);
      }
    }

    function r() {
      for (; c > 1;) {
        var t = c - 2;
        t > 0 && h[t - 1] < h[t + 1] && t--, a(t);
      }
    }

    function a(n) {
      var i = l[n],
          r = h[n],
          a = l[n + 1],
          u = h[n + 1];
      h[n] = r + u, n === c - 3 && (l[n + 1] = l[n + 2], h[n + 1] = h[n + 2]), c--;
      var d = un(t[a], t, i, r, 0, e);
      i += d, r -= d, 0 !== r && (u = hn(t[i + r - 1], t, a, u, u - 1, e), 0 !== u && (u >= r ? o(i, r, a, u) : s(i, r, a, u)));
    }

    function o(n, i, r, a) {
      var o = 0;

      for (o = 0; i > o; o++) d[o] = t[n + o];

      var s = 0,
          l = r,
          h = n;

      if (t[h++] = t[l++], 0 !== --a) {
        if (1 === i) {
          for (o = 0; a > o; o++) t[h + o] = t[l + o];

          return void (t[h + a] = d[s]);
        }

        for (var c, f, p, g = u;;) {
          c = 0, f = 0, p = !1;

          do if (e(t[l], d[s]) < 0) {
            if (t[h++] = t[l++], f++, c = 0, 0 === --a) {
              p = !0;
              break;
            }
          } else if (t[h++] = d[s++], c++, f = 0, 1 === --i) {
            p = !0;
            break;
          } while (g > (c | f));

          if (p) break;

          do {
            if (c = un(t[l], d, s, i, 0, e), 0 !== c) {
              for (o = 0; c > o; o++) t[h + o] = d[s + o];

              if (h += c, s += c, i -= c, 1 >= i) {
                p = !0;
                break;
              }
            }

            if (t[h++] = t[l++], 0 === --a) {
              p = !0;
              break;
            }

            if (f = hn(d[s], t, l, a, 0, e), 0 !== f) {
              for (o = 0; f > o; o++) t[h + o] = t[l + o];

              if (h += f, l += f, a -= f, 0 === a) {
                p = !0;
                break;
              }
            }

            if (t[h++] = d[s++], 1 === --i) {
              p = !0;
              break;
            }

            g--;
          } while (c >= _c || f >= _c);

          if (p) break;
          0 > g && (g = 0), g += 2;
        }

        if (u = g, 1 > u && (u = 1), 1 === i) {
          for (o = 0; a > o; o++) t[h + o] = t[l + o];

          t[h + a] = d[s];
        } else {
          if (0 === i) throw new Error();

          for (o = 0; i > o; o++) t[h + o] = d[s + o];
        }
      } else for (o = 0; i > o; o++) t[h + o] = d[s + o];
    }

    function s(n, i, r, a) {
      var o = 0;

      for (o = 0; a > o; o++) d[o] = t[r + o];

      var s = n + i - 1,
          l = a - 1,
          h = r + a - 1,
          c = 0,
          f = 0;

      if (t[h--] = t[s--], 0 !== --i) {
        if (1 === a) {
          for (h -= i, s -= i, f = h + 1, c = s + 1, o = i - 1; o >= 0; o--) t[f + o] = t[c + o];

          return void (t[h] = d[l]);
        }

        for (var p = u;;) {
          var g = 0,
              v = 0,
              m = !1;

          do if (e(d[l], t[s]) < 0) {
            if (t[h--] = t[s--], g++, v = 0, 0 === --i) {
              m = !0;
              break;
            }
          } else if (t[h--] = d[l--], v++, g = 0, 1 === --a) {
            m = !0;
            break;
          } while (p > (g | v));

          if (m) break;

          do {
            if (g = i - un(d[l], t, n, i, i - 1, e), 0 !== g) {
              for (h -= g, s -= g, i -= g, f = h + 1, c = s + 1, o = g - 1; o >= 0; o--) t[f + o] = t[c + o];

              if (0 === i) {
                m = !0;
                break;
              }
            }

            if (t[h--] = d[l--], 1 === --a) {
              m = !0;
              break;
            }

            if (v = a - hn(t[s], d, 0, a, a - 1, e), 0 !== v) {
              for (h -= v, l -= v, a -= v, f = h + 1, c = l + 1, o = 0; v > o; o++) t[f + o] = d[c + o];

              if (1 >= a) {
                m = !0;
                break;
              }
            }

            if (t[h--] = t[s--], 0 === --i) {
              m = !0;
              break;
            }

            p--;
          } while (g >= _c || v >= _c);

          if (m) break;
          0 > p && (p = 0), p += 2;
        }

        if (u = p, 1 > u && (u = 1), 1 === a) {
          for (h -= i, s -= i, f = h + 1, c = s + 1, o = i - 1; o >= 0; o--) t[f + o] = t[c + o];

          t[h] = d[l];
        } else {
          if (0 === a) throw new Error();

          for (c = h - (a - 1), o = 0; a > o; o++) t[c + o] = d[o];
        }
      } else for (c = h - (a - 1), o = 0; a > o; o++) t[c + o] = d[o];
    }

    var l,
        h,
        u = _c,
        c = 0,
        d = [];
    l = [], h = [], this.mergeRuns = i, this.forceMergeRuns = r, this.pushRun = n;
  }

  function dn(t, e, n, i) {
    n || (n = 0), i || (i = t.length);
    var r = i - n;

    if (!(2 > r)) {
      var a = 0;
      if (mc > r) return a = on(t, n, i, e), void ln(t, n, i, n + a, e);
      var o = new cn(t, e),
          s = an(r);

      do {
        if (a = on(t, n, i, e), s > a) {
          var l = r;
          l > s && (l = s), ln(t, n, n + l, n + a, e), a = l;
        }

        o.pushRun(n, a), o.mergeRuns(), r -= a, n += a;
      } while (0 !== r);

      o.forceMergeRuns();
    }
  }

  function fn(t, e) {
    return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel;
  }

  function pn(t, e, n) {
    var i = null == e.x ? 0 : e.x,
        r = null == e.x2 ? 1 : e.x2,
        a = null == e.y ? 0 : e.y,
        o = null == e.y2 ? 0 : e.y2;
    e.global || (i = i * n.width + n.x, r = r * n.width + n.x, a = a * n.height + n.y, o = o * n.height + n.y), i = isNaN(i) ? 0 : i, r = isNaN(r) ? 1 : r, a = isNaN(a) ? 0 : a, o = isNaN(o) ? 0 : o;
    var s = t.createLinearGradient(i, a, r, o);
    return s;
  }

  function gn(t, e, n) {
    var i = n.width,
        r = n.height,
        a = Math.min(i, r),
        o = null == e.x ? .5 : e.x,
        s = null == e.y ? .5 : e.y,
        l = null == e.r ? .5 : e.r;
    e.global || (o = o * i + n.x, s = s * r + n.y, l *= a);
    var h = t.createRadialGradient(o, s, 0, o, s, l);
    return h;
  }

  function vn() {
    return !1;
  }

  function mn(t, e, n) {
    var i = bu(),
        r = e.getWidth(),
        a = e.getHeight(),
        o = i.style;
    return o && (o.position = "absolute", o.left = 0, o.top = 0, o.width = r + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", t)), i.width = r * n, i.height = a * n, i;
  }

  function _n(t) {
    if ("string" == typeof t) {
      var e = Oc.get(t);
      return e && e.image;
    }

    return t;
  }

  function yn(t, e, n, i, r) {
    if (t) {
      if ("string" == typeof t) {
        if (e && e.__zrImageSrc === t || !n) return e;
        var a = Oc.get(t),
            o = {
          hostEl: n,
          cb: i,
          cbPayload: r
        };
        return a ? (e = a.image, !wn(e) && a.pending.push(o)) : (e = new Image(), e.onload = e.onerror = xn, Oc.put(t, e.__cachedImgObj = {
          image: e,
          pending: [o]
        }), e.src = e.__zrImageSrc = t), e;
      }

      return t;
    }

    return e;
  }

  function xn() {
    var t = this.__cachedImgObj;
    this.onload = this.onerror = this.__cachedImgObj = null;

    for (var e = 0; e < t.pending.length; e++) {
      var n = t.pending[e],
          i = n.cb;
      i && i(this, n.cbPayload), n.hostEl.dirty();
    }

    t.pending.length = 0;
  }

  function wn(t) {
    return t && t.width && t.height;
  }

  function bn(t, e) {
    e = e || zc;
    var n = t + ":" + e;
    if (Lc[n]) return Lc[n];

    for (var i = (t + "").split("\n"), r = 0, a = 0, o = i.length; o > a; a++) r = Math.max(En(i[a], e).width, r);

    return Ec > Bc && (Ec = 0, Lc = {}), Ec++, Lc[n] = r, r;
  }

  function Sn(t, e, n, i, r, a, o, s) {
    return o ? Tn(t, e, n, i, r, a, o, s) : Mn(t, e, n, i, r, a, s);
  }

  function Mn(t, e, n, i, r, a, o) {
    var s = Bn(t, e, r, a, o),
        l = bn(t, e);
    r && (l += r[1] + r[3]);
    var h = s.outerHeight,
        u = In(0, l, n),
        c = Cn(0, h, i),
        d = new rn(u, c, l, h);
    return d.lineHeight = s.lineHeight, d;
  }

  function Tn(t, e, n, i, r, a, o, s) {
    var l = Rn(t, {
      rich: o,
      truncate: s,
      font: e,
      textAlign: n,
      textPadding: r,
      textLineHeight: a
    }),
        h = l.outerWidth,
        u = l.outerHeight,
        c = In(0, h, n),
        d = Cn(0, u, i);
    return new rn(c, d, h, u);
  }

  function In(t, e, n) {
    return "right" === n ? t -= e : "center" === n && (t -= e / 2), t;
  }

  function Cn(t, e, n) {
    return "middle" === n ? t -= e / 2 : "bottom" === n && (t -= e), t;
  }

  function kn(t, e, n) {
    var i = e.textPosition,
        r = e.textDistance,
        a = n.x,
        o = n.y;
    r = r || 0;
    var s = n.height,
        l = n.width,
        h = s / 2,
        u = "left",
        c = "top";

    switch (i) {
      case "left":
        a -= r, o += h, u = "right", c = "middle";
        break;

      case "right":
        a += r + l, o += h, c = "middle";
        break;

      case "top":
        a += l / 2, o -= r, u = "center", c = "bottom";
        break;

      case "bottom":
        a += l / 2, o += s + r, u = "center";
        break;

      case "inside":
        a += l / 2, o += h, u = "center", c = "middle";
        break;

      case "insideLeft":
        a += r, o += h, c = "middle";
        break;

      case "insideRight":
        a += l - r, o += h, u = "right", c = "middle";
        break;

      case "insideTop":
        a += l / 2, o += r, u = "center";
        break;

      case "insideBottom":
        a += l / 2, o += s - r, u = "center", c = "bottom";
        break;

      case "insideTopLeft":
        a += r, o += r;
        break;

      case "insideTopRight":
        a += l - r, o += r, u = "right";
        break;

      case "insideBottomLeft":
        a += r, o += s - r, c = "bottom";
        break;

      case "insideBottomRight":
        a += l - r, o += s - r, u = "right", c = "bottom";
    }

    return t = t || {}, t.x = a, t.y = o, t.textAlign = u, t.textVerticalAlign = c, t;
  }

  function Dn(t, e, n, i, r) {
    if (!e) return "";
    var a = (t + "").split("\n");
    r = An(e, n, i, r);

    for (var o = 0, s = a.length; s > o; o++) a[o] = Pn(a[o], r);

    return a.join("\n");
  }

  function An(t, e, n, i) {
    i = a({}, i), i.font = e;
    var n = T(n, "...");
    i.maxIterations = T(i.maxIterations, 2);
    var r = i.minChar = T(i.minChar, 0);
    i.cnCharWidth = bn("国", e);
    var o = i.ascCharWidth = bn("a", e);
    i.placeholder = T(i.placeholder, "");

    for (var s = t = Math.max(0, t - 1), l = 0; r > l && s >= o; l++) s -= o;

    var h = bn(n, e);
    return h > s && (n = "", h = 0), s = t - h, i.ellipsis = n, i.ellipsisWidth = h, i.contentWidth = s, i.containerWidth = t, i;
  }

  function Pn(t, e) {
    var n = e.containerWidth,
        i = e.font,
        r = e.contentWidth;
    if (!n) return "";
    var a = bn(t, i);
    if (n >= a) return t;

    for (var o = 0;; o++) {
      if (r >= a || o >= e.maxIterations) {
        t += e.ellipsis;
        break;
      }

      var s = 0 === o ? On(t, r, e.ascCharWidth, e.cnCharWidth) : a > 0 ? Math.floor(t.length * r / a) : 0;
      t = t.substr(0, s), a = bn(t, i);
    }

    return "" === t && (t = e.placeholder), t;
  }

  function On(t, e, n, i) {
    for (var r = 0, a = 0, o = t.length; o > a && e > r; a++) {
      var s = t.charCodeAt(a);
      r += s >= 0 && 127 >= s ? n : i;
    }

    return a;
  }

  function Ln(t) {
    return bn("国", t);
  }

  function En(t, e) {
    return Nc.measureText(t, e);
  }

  function Bn(t, e, n, i, r) {
    null != t && (t += "");
    var a = T(i, Ln(e)),
        o = t ? t.split("\n") : [],
        s = o.length * a,
        l = s,
        h = !0;

    if (n && (l += n[0] + n[2]), t && r) {
      h = !1;
      var u = r.outerHeight,
          c = r.outerWidth;
      if (null != u && l > u) t = "", o = [];else if (null != c) for (var d = An(c - (n ? n[1] + n[3] : 0), e, r.ellipsis, {
        minChar: r.minChar,
        placeholder: r.placeholder
      }), f = 0, p = o.length; p > f; f++) o[f] = Pn(o[f], d);
    }

    return {
      lines: o,
      height: s,
      outerHeight: l,
      lineHeight: a,
      canCacheByTextString: h
    };
  }

  function Rn(t, e) {
    var n = {
      lines: [],
      width: 0,
      height: 0
    };
    if (null != t && (t += ""), !t) return n;

    for (var i, r = Rc.lastIndex = 0; null != (i = Rc.exec(t));) {
      var a = i.index;
      a > r && zn(n, t.substring(r, a)), zn(n, i[2], i[1]), r = Rc.lastIndex;
    }

    r < t.length && zn(n, t.substring(r, t.length));
    var o = n.lines,
        s = 0,
        l = 0,
        h = [],
        u = e.textPadding,
        c = e.truncate,
        d = c && c.outerWidth,
        f = c && c.outerHeight;
    u && (null != d && (d -= u[1] + u[3]), null != f && (f -= u[0] + u[2]));

    for (var p = 0; p < o.length; p++) {
      for (var g = o[p], v = 0, m = 0, _ = 0; _ < g.tokens.length; _++) {
        var y = g.tokens[_],
            x = y.styleName && e.rich[y.styleName] || {},
            w = y.textPadding = x.textPadding,
            b = y.font = x.font || e.font,
            S = y.textHeight = T(x.textHeight, Ln(b));
        if (w && (S += w[0] + w[2]), y.height = S, y.lineHeight = I(x.textLineHeight, e.textLineHeight, S), y.textAlign = x && x.textAlign || e.textAlign, y.textVerticalAlign = x && x.textVerticalAlign || "middle", null != f && s + y.lineHeight > f) return {
          lines: [],
          width: 0,
          height: 0
        };
        y.textWidth = bn(y.text, b);
        var M = x.textWidth,
            C = null == M || "auto" === M;
        if ("string" == typeof M && "%" === M.charAt(M.length - 1)) y.percentWidth = M, h.push(y), M = 0;else {
          if (C) {
            M = y.textWidth;
            var k = x.textBackgroundColor,
                D = k && k.image;
            D && (D = _n(D), wn(D) && (M = Math.max(M, D.width * S / D.height)));
          }

          var A = w ? w[1] + w[3] : 0;
          M += A;
          var P = null != d ? d - m : null;
          null != P && M > P && (!C || A > P ? (y.text = "", y.textWidth = M = 0) : (y.text = Dn(y.text, P - A, b, c.ellipsis, {
            minChar: c.minChar
          }), y.textWidth = bn(y.text, b), M = y.textWidth + A));
        }
        m += y.width = M, x && (v = Math.max(v, y.lineHeight));
      }

      g.width = m, g.lineHeight = v, s += v, l = Math.max(l, m);
    }

    n.outerWidth = n.width = T(e.textWidth, l), n.outerHeight = n.height = T(e.textHeight, s), u && (n.outerWidth += u[1] + u[3], n.outerHeight += u[0] + u[2]);

    for (var p = 0; p < h.length; p++) {
      var y = h[p],
          O = y.percentWidth;
      y.width = parseInt(O, 10) / 100 * l;
    }

    return n;
  }

  function zn(t, e, n) {
    for (var i = "" === e, r = e.split("\n"), a = t.lines, o = 0; o < r.length; o++) {
      var s = r[o],
          l = {
        styleName: n,
        text: s,
        isLineHolder: !s && !i
      };
      if (o) a.push({
        tokens: [l]
      });else {
        var h = (a[a.length - 1] || (a[0] = {
          tokens: []
        })).tokens,
            u = h.length;
        1 === u && h[0].isLineHolder ? h[0] = l : (s || !u || i) && h.push(l);
      }
    }
  }

  function Nn(t) {
    var e = (t.fontSize || t.fontFamily) && [t.fontStyle, t.fontWeight, (t.fontSize || 12) + "px", t.fontFamily || "sans-serif"].join(" ");
    return e && A(e) || t.textFont || t.font;
  }

  function Fn(t, e) {
    var n,
        i,
        r,
        a,
        o = e.x,
        s = e.y,
        l = e.width,
        h = e.height,
        u = e.r;
    0 > l && (o += l, l = -l), 0 > h && (s += h, h = -h), "number" == typeof u ? n = i = r = a = u : u instanceof Array ? 1 === u.length ? n = i = r = a = u[0] : 2 === u.length ? (n = r = u[0], i = a = u[1]) : 3 === u.length ? (n = u[0], i = a = u[1], r = u[2]) : (n = u[0], i = u[1], r = u[2], a = u[3]) : n = i = r = a = 0;
    var c;
    n + i > l && (c = n + i, n *= l / c, i *= l / c), r + a > l && (c = r + a, r *= l / c, a *= l / c), i + r > h && (c = i + r, i *= h / c, r *= h / c), n + a > h && (c = n + a, n *= h / c, a *= h / c), t.moveTo(o + n, s), t.lineTo(o + l - i, s), 0 !== i && t.arc(o + l - i, s + i, i, -Math.PI / 2, 0), t.lineTo(o + l, s + h - r), 0 !== r && t.arc(o + l - r, s + h - r, r, 0, Math.PI / 2), t.lineTo(o + a, s + h), 0 !== a && t.arc(o + a, s + h - a, a, Math.PI / 2, Math.PI), t.lineTo(o, s + n), 0 !== n && t.arc(o + n, s + n, n, Math.PI, 1.5 * Math.PI);
  }

  function Hn(t) {
    return Vn(t), d(t.rich, Vn), t;
  }

  function Vn(t) {
    if (t) {
      t.font = Nn(t);
      var e = t.textAlign;
      "middle" === e && (e = "center"), t.textAlign = null == e || Hc[e] ? e : "left";
      var n = t.textVerticalAlign || t.textBaseline;
      "center" === n && (n = "middle"), t.textVerticalAlign = null == n || Vc[n] ? n : "top";
      var i = t.textPadding;
      i && (t.textPadding = k(t.textPadding));
    }
  }

  function Wn(t, e, n, i, r, a) {
    i.rich ? Un(t, e, n, i, r, a) : Gn(t, e, n, i, r, a);
  }

  function Gn(t, e, n, i, r, a) {
    var o,
        s = jn(i),
        l = !1,
        h = e.__attrCachedBy === bc.PLAIN_TEXT;
    a !== Sc ? (a && (o = a.style, l = !s && h && o), e.__attrCachedBy = s ? bc.NONE : bc.PLAIN_TEXT) : h && (e.__attrCachedBy = bc.NONE);
    var u = i.font || Fc;
    l && u === (o.font || Fc) || (e.font = u);
    var c = t.__computedFont;
    t.__styleFont !== u && (t.__styleFont = u, c = t.__computedFont = e.font);
    var d = i.textPadding,
        f = i.textLineHeight,
        p = t.__textCotentBlock;
    (!p || t.__dirtyText) && (p = t.__textCotentBlock = Bn(n, c, d, f, i.truncate));

    var g = p.outerHeight,
        v = p.lines,
        m = p.lineHeight,
        _ = Qn(Uc, t, i, r),
        y = _.baseX,
        x = _.baseY,
        w = _.textAlign || "left",
        b = _.textVerticalAlign;

    Yn(e, i, r, y, x);
    var S = Cn(x, g, b),
        M = y,
        T = S;

    if (s || d) {
      var I = bn(n, c),
          C = I;
      d && (C += d[1] + d[3]);
      var k = In(y, C, w);
      s && Zn(t, e, i, k, S, C, g), d && (M = ni(y, w, d), T += d[0]);
    }

    e.textAlign = w, e.textBaseline = "middle", e.globalAlpha = i.opacity || 1;

    for (var D = 0; D < Wc.length; D++) {
      var A = Wc[D],
          P = A[0],
          O = A[1],
          L = i[P];
      l && L === o[P] || (e[O] = wc(e, O, L || A[2]));
    }

    T += m / 2;
    var E = i.textStrokeWidth,
        B = l ? o.textStrokeWidth : null,
        R = !l || E !== B,
        z = !l || R || i.textStroke !== o.textStroke,
        N = Jn(i.textStroke, E),
        F = ti(i.textFill);
    if (N && (R && (e.lineWidth = E), z && (e.strokeStyle = N)), F && (l && i.textFill === o.textFill || (e.fillStyle = F)), 1 === v.length) N && e.strokeText(v[0], M, T), F && e.fillText(v[0], M, T);else for (var D = 0; D < v.length; D++) N && e.strokeText(v[D], M, T), F && e.fillText(v[D], M, T), T += m;
  }

  function Un(t, e, n, i, r, a) {
    a !== Sc && (e.__attrCachedBy = bc.NONE);
    var o = t.__textCotentBlock;
    (!o || t.__dirtyText) && (o = t.__textCotentBlock = Rn(n, i)), Xn(t, e, o, i, r);
  }

  function Xn(t, e, n, i, r) {
    var a = n.width,
        o = n.outerWidth,
        s = n.outerHeight,
        l = i.textPadding,
        h = Qn(Uc, t, i, r),
        u = h.baseX,
        c = h.baseY,
        d = h.textAlign,
        f = h.textVerticalAlign;
    Yn(e, i, r, u, c);
    var p = In(u, o, d),
        g = Cn(c, s, f),
        v = p,
        m = g;
    l && (v += l[3], m += l[0]);

    var _ = v + a;

    jn(i) && Zn(t, e, i, p, g, o, s);

    for (var y = 0; y < n.lines.length; y++) {
      for (var x, w = n.lines[y], b = w.tokens, S = b.length, M = w.lineHeight, T = w.width, I = 0, C = v, k = _, D = S - 1; S > I && (x = b[I], !x.textAlign || "left" === x.textAlign);) qn(t, e, x, i, M, m, C, "left"), T -= x.width, C += x.width, I++;

      for (; D >= 0 && (x = b[D], "right" === x.textAlign);) qn(t, e, x, i, M, m, k, "right"), T -= x.width, k -= x.width, D--;

      for (C += (a - (C - v) - (_ - k) - T) / 2; D >= I;) x = b[I], qn(t, e, x, i, M, m, C + x.width / 2, "center"), C += x.width, I++;

      m += M;
    }
  }

  function Yn(t, e, n, i, r) {
    if (n && e.textRotation) {
      var a = e.textOrigin;
      "center" === a ? (i = n.width / 2 + n.x, r = n.height / 2 + n.y) : a && (i = a[0] + n.x, r = a[1] + n.y), t.translate(i, r), t.rotate(-e.textRotation), t.translate(-i, -r);
    }
  }

  function qn(t, e, n, i, r, a, o, s) {
    var l = i.rich[n.styleName] || {};
    l.text = n.text;
    var h = n.textVerticalAlign,
        u = a + r / 2;
    "top" === h ? u = a + n.height / 2 : "bottom" === h && (u = a + r - n.height / 2), !n.isLineHolder && jn(l) && Zn(t, e, l, "right" === s ? o - n.width : "center" === s ? o - n.width / 2 : o, u - n.height / 2, n.width, n.height);
    var c = n.textPadding;
    c && (o = ni(o, s, c), u -= n.height / 2 - c[2] - n.textHeight / 2), Kn(e, "shadowBlur", I(l.textShadowBlur, i.textShadowBlur, 0)), Kn(e, "shadowColor", l.textShadowColor || i.textShadowColor || "transparent"), Kn(e, "shadowOffsetX", I(l.textShadowOffsetX, i.textShadowOffsetX, 0)), Kn(e, "shadowOffsetY", I(l.textShadowOffsetY, i.textShadowOffsetY, 0)), Kn(e, "textAlign", s), Kn(e, "textBaseline", "middle"), Kn(e, "font", n.font || Fc);
    var d = Jn(l.textStroke || i.textStroke, p),
        f = ti(l.textFill || i.textFill),
        p = T(l.textStrokeWidth, i.textStrokeWidth);
    d && (Kn(e, "lineWidth", p), Kn(e, "strokeStyle", d), e.strokeText(n.text, o, u)), f && (Kn(e, "fillStyle", f), e.fillText(n.text, o, u));
  }

  function jn(t) {
    return !!(t.textBackgroundColor || t.textBorderWidth && t.textBorderColor);
  }

  function Zn(t, e, n, i, r, a, o) {
    var s = n.textBackgroundColor,
        l = n.textBorderWidth,
        h = n.textBorderColor,
        u = x(s);

    if (Kn(e, "shadowBlur", n.textBoxShadowBlur || 0), Kn(e, "shadowColor", n.textBoxShadowColor || "transparent"), Kn(e, "shadowOffsetX", n.textBoxShadowOffsetX || 0), Kn(e, "shadowOffsetY", n.textBoxShadowOffsetY || 0), u || l && h) {
      e.beginPath();
      var c = n.textBorderRadius;
      c ? Fn(e, {
        x: i,
        y: r,
        width: a,
        height: o,
        r: c
      }) : e.rect(i, r, a, o), e.closePath();
    }

    if (u) {
      if (Kn(e, "fillStyle", s), null != n.fillOpacity) {
        var d = e.globalAlpha;
        e.globalAlpha = n.fillOpacity * n.opacity, e.fill(), e.globalAlpha = d;
      } else e.fill();
    } else if (w(s)) {
      var f = s.image;
      f = yn(f, null, t, $n, s), f && wn(f) && e.drawImage(f, i, r, a, o);
    }
    if (l && h) if (Kn(e, "lineWidth", l), Kn(e, "strokeStyle", h), null != n.strokeOpacity) {
      var d = e.globalAlpha;
      e.globalAlpha = n.strokeOpacity * n.opacity, e.stroke(), e.globalAlpha = d;
    } else e.stroke();
  }

  function $n(t, e) {
    e.image = t;
  }

  function Qn(t, e, n, i) {
    var r = n.x || 0,
        a = n.y || 0,
        o = n.textAlign,
        s = n.textVerticalAlign;

    if (i) {
      var l = n.textPosition;
      if (l instanceof Array) r = i.x + ei(l[0], i.width), a = i.y + ei(l[1], i.height);else {
        var h = e && e.calculateTextPosition ? e.calculateTextPosition(Gc, n, i) : kn(Gc, n, i);
        r = h.x, a = h.y, o = o || h.textAlign, s = s || h.textVerticalAlign;
      }
      var u = n.textOffset;
      u && (r += u[0], a += u[1]);
    }

    return t = t || {}, t.baseX = r, t.baseY = a, t.textAlign = o, t.textVerticalAlign = s, t;
  }

  function Kn(t, e, n) {
    return t[e] = wc(t, e, n), t[e];
  }

  function Jn(t, e) {
    return null == t || 0 >= e || "transparent" === t || "none" === t ? null : t.image || t.colorStops ? "#000" : t;
  }

  function ti(t) {
    return null == t || "none" === t ? null : t.image || t.colorStops ? "#000" : t;
  }

  function ei(t, e) {
    return "string" == typeof t ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t;
  }

  function ni(t, e, n) {
    return "right" === e ? t - n[1] : "center" === e ? t + n[3] / 2 - n[1] / 2 : t + n[3];
  }

  function ii(t, e) {
    return null != t && (t || e.textBackgroundColor || e.textBorderWidth && e.textBorderColor || e.textPadding);
  }

  function ri(t) {
    t = t || {}, dc.call(this, t);

    for (var e in t) t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);

    this.style = new Tc(t.style, this), this._rect = null, this.__clipPaths = null;
  }

  function ai(t) {
    ri.call(this, t);
  }

  function oi(t) {
    return parseInt(t, 10);
  }

  function si(t) {
    return t ? t.__builtin__ ? !0 : "function" != typeof t.resize || "function" != typeof t.refresh ? !1 : !0 : !1;
  }

  function li(t, e, n) {
    return Qc.copy(t.getBoundingRect()), t.transform && Qc.applyTransform(t.transform), Kc.width = e, Kc.height = n, !Qc.intersect(Kc);
  }

  function hi(t, e) {
    if (t === e) return !1;
    if (!t || !e || t.length !== e.length) return !0;

    for (var n = 0; n < t.length; n++) if (t[n] !== e[n]) return !0;

    return !1;
  }

  function ui(t, e) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.setTransform(e), e.beginPath(), i.buildPath(e, i.shape), e.clip(), i.restoreTransform(e);
    }
  }

  function ci(t, e) {
    var n = document.createElement("div");
    return n.style.cssText = ["position:relative", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0", "border-width:0"].join(";") + ";", n;
  }

  function di(t) {
    return "mousewheel" === t && cu.browser.firefox ? "DOMMouseScroll" : t;
  }

  function fi(t) {
    var e = t.pointerType;
    return "pen" === e || "touch" === e;
  }

  function pi(t) {
    t.touching = !0, null != t.touchTimer && (clearTimeout(t.touchTimer), t.touchTimer = null), t.touchTimer = setTimeout(function () {
      t.touching = !1, t.touchTimer = null;
    }, 700);
  }

  function gi(t) {
    t && (t.zrByTouch = !0);
  }

  function vi(t, e) {
    return le(t.dom, new _i(t, e), !0);
  }

  function mi(t, e) {
    for (var n = e, i = !1; n && 9 !== n.nodeType && !(i = n.domBelongToZr || n !== e && n === t.painterRoot);) n = n.parentNode;

    return i;
  }

  function _i(t, e) {
    this.type = e.type, this.target = this.currentTarget = t.dom, this.pointerType = e.pointerType, this.clientX = e.clientX, this.clientY = e.clientY;
  }

  function yi(t, e) {
    var n = e.domHandlers;
    cu.pointerEventsSupported ? d(id.pointer, function (i) {
      wi(e, i, function (e) {
        n[i].call(t, e);
      });
    }) : (cu.touchEventsSupported && d(id.touch, function (i) {
      wi(e, i, function (r) {
        n[i].call(t, r), pi(e);
      });
    }), d(id.mouse, function (i) {
      wi(e, i, function (r) {
        r = se(r), e.touching || n[i].call(t, r);
      });
    }));
  }

  function xi(t, e) {
    function n(n) {
      function i(i) {
        i = se(i), mi(t, i.target) || (i = vi(t, i), e.domHandlers[n].call(t, i));
      }

      wi(e, n, i, {
        capture: !0
      });
    }

    cu.pointerEventsSupported ? d(rd.pointer, n) : cu.touchEventsSupported || d(rd.mouse, n);
  }

  function wi(t, e, n, i) {
    t.mounted[e] = n, t.listenerOpts[e] = i, he(t.domTarget, di(e), n, i);
  }

  function bi(t) {
    var e = t.mounted;

    for (var n in e) e.hasOwnProperty(n) && ue(t.domTarget, di(n), e[n], t.listenerOpts[n]);

    t.mounted = {};
  }

  function Si(t, e) {
    if (t._mayPointerCapture = null, nd && t._pointerCapturing ^ e) {
      t._pointerCapturing = e;
      var n = t._globalHandlerScope;
      e ? xi(t, n) : bi(n);
    }
  }

  function Mi(t, e) {
    this.domTarget = t, this.domHandlers = e, this.mounted = {}, this.listenerOpts = {}, this.touchTimer = null, this.touching = !1;
  }

  function Ti(t, e) {
    Du.call(this), this.dom = t, this.painterRoot = e, this._localHandlerScope = new Mi(t, od), nd && (this._globalHandlerScope = new Mi(document, sd)), this._pointerCapturing = !1, this._mayPointerCapture = null, yi(this, this._localHandlerScope);
  }

  function Ii(t, e) {
    var n = new cd(hu(), t, e);
    return n;
  }

  function Ci(t, e) {
    ud[t] = e;
  }

  function ki(t) {
    return t instanceof Array ? t : null == t ? [] : [t];
  }

  function Di(t, e, n) {
    if (t) {
      t[e] = t[e] || {}, t.emphasis = t.emphasis || {}, t.emphasis[e] = t.emphasis[e] || {};

      for (var i = 0, r = n.length; r > i; i++) {
        var a = n[i];
        !t.emphasis[e].hasOwnProperty(a) && t[e].hasOwnProperty(a) && (t.emphasis[e][a] = t[e][a]);
      }
    }
  }

  function Ai(t) {
    return !fd(t) || pd(t) || t instanceof Date ? t : t.value;
  }

  function Pi(t) {
    return fd(t) && !(t instanceof Array);
  }

  function Oi(t, e) {
    e = (e || []).slice();
    var n = f(t || [], function (t) {
      return {
        exist: t
      };
    });
    return dd(e, function (t, i) {
      if (fd(t)) {
        for (var r = 0; r < n.length; r++) if (!n[r].option && null != t.id && n[r].exist.id === t.id + "") return n[r].option = t, void (e[i] = null);

        for (var r = 0; r < n.length; r++) {
          var a = n[r].exist;
          if (!(n[r].option || null != a.id && null != t.id || null == t.name || Bi(t) || Bi(a) || a.name !== t.name + "")) return n[r].option = t, void (e[i] = null);
        }
      }
    }), dd(e, function (t) {
      if (fd(t)) {
        for (var e = 0; e < n.length; e++) {
          var i = n[e].exist;

          if (!n[e].option && !Bi(i) && null == t.id) {
            n[e].option = t;
            break;
          }
        }

        e >= n.length && n.push({
          option: t
        });
      }
    }), n;
  }

  function Li(t) {
    var e = E();
    dd(t, function (t) {
      var n = t.exist;
      n && e.set(n.id, t);
    }), dd(t, function (t) {
      var n = t.option;
      D(!n || null == n.id || !e.get(n.id) || e.get(n.id) === t, "id duplicates: " + (n && n.id)), n && null != n.id && e.set(n.id, t), !t.keyInfo && (t.keyInfo = {});
    }), dd(t, function (t, n) {
      var i = t.exist,
          r = t.option,
          a = t.keyInfo;

      if (fd(r)) {
        if (a.name = null != r.name ? r.name + "" : i ? i.name : gd + n, i) a.id = i.id;else if (null != r.id) a.id = r.id + "";else {
          var o = 0;

          do a.id = "\x00" + a.name + "\x00" + o++; while (e.get(a.id));
        }
        e.set(a.id, t);
      }
    });
  }

  function Ei(t) {
    var e = t.name;
    return !(!e || !e.indexOf(gd));
  }

  function Bi(t) {
    return fd(t) && t.id && 0 === (t.id + "").indexOf("\x00_ec_\x00");
  }

  function Ri(t, e) {
    return null != e.dataIndexInside ? e.dataIndexInside : null != e.dataIndex ? _(e.dataIndex) ? f(e.dataIndex, function (e) {
      return t.indexOfRawIndex(e);
    }) : t.indexOfRawIndex(e.dataIndex) : null != e.name ? _(e.name) ? f(e.name, function (e) {
      return t.indexOfName(e);
    }) : t.indexOfName(e.name) : void 0;
  }

  function zi() {
    var t = "__\x00ec_inner_" + md++ + "_" + Math.random().toFixed(5);
    return function (e) {
      return e[t] || (e[t] = {});
    };
  }

  function Ni(t, e, n) {
    if (x(e)) {
      var i = {};
      i[e + "Index"] = 0, e = i;
    }

    var r = n && n.defaultMainType;
    !r || Fi(e, r + "Index") || Fi(e, r + "Id") || Fi(e, r + "Name") || (e[r + "Index"] = 0);
    var a = {};
    return dd(e, function (i, r) {
      var i = e[r];
      if ("dataIndex" === r || "dataIndexInside" === r) return void (a[r] = i);
      var o = r.match(/^(\w+)(Index|Id|Name)$/) || [],
          s = o[1],
          h = (o[2] || "").toLowerCase();

      if (!(!s || !h || null == i || "index" === h && "none" === i || n && n.includeMainTypes && l(n.includeMainTypes, s) < 0)) {
        var u = {
          mainType: s
        };
        ("index" !== h || "all" !== i) && (u[h] = i);
        var c = t.queryComponents(u);
        a[s + "Models"] = c, a[s + "Model"] = c[0];
      }
    }), a;
  }

  function Fi(t, e) {
    return t && t.hasOwnProperty(e);
  }

  function Hi(t, e, n) {
    t.setAttribute ? t.setAttribute(e, n) : t[e] = n;
  }

  function Vi(t, e) {
    return t.getAttribute ? t.getAttribute(e) : t[e];
  }

  function Wi(t) {
    return "auto" === t ? cu.domSupported ? "html" : "richText" : t || "html";
  }

  function Gi(t) {
    var e = {
      main: "",
      sub: ""
    };
    return t && (t = t.split(_d), e.main = t[0] || "", e.sub = t[1] || ""), e;
  }

  function Ui(t) {
    D(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal');
  }

  function Xi(t) {
    t.$constructor = t, t.extend = function (t) {
      var e = this,
          n = function () {
        t.$constructor ? t.$constructor.apply(this, arguments) : e.apply(this, arguments);
      };

      return a(n.prototype, t), n.extend = this.extend, n.superCall = qi, n.superApply = ji, h(n, this), n.superClass = e, n;
    };
  }

  function Yi(t) {
    var e = ["__\x00is_clz", xd++, Math.random().toFixed(3)].join("_");
    t.prototype[e] = !0, t.isInstance = function (t) {
      return !(!t || !t[e]);
    };
  }

  function qi(t, e) {
    var n = C(arguments, 2);
    return this.superClass.prototype[e].apply(t, n);
  }

  function ji(t, e, n) {
    return this.superClass.prototype[e].apply(t, n);
  }

  function Zi(t, e) {
    function n(t) {
      var e = i[t.main];
      return e && e[yd] || (e = i[t.main] = {}, e[yd] = !0), e;
    }

    e = e || {};
    var i = {};

    if (t.registerClass = function (t, e) {
      if (e) if (Ui(e), e = Gi(e), e.sub) {
        if (e.sub !== yd) {
          var r = n(e);
          r[e.sub] = t;
        }
      } else i[e.main] = t;
      return t;
    }, t.getClass = function (t, e, n) {
      var r = i[t];
      if (r && r[yd] && (r = e ? r[e] : null), n && !r) throw new Error(e ? "Component " + t + "." + (e || "") + " not exists. Load it first." : t + ".type should be specified.");
      return r;
    }, t.getClassesByMainType = function (t) {
      t = Gi(t);
      var e = [],
          n = i[t.main];
      return n && n[yd] ? d(n, function (t, n) {
        n !== yd && e.push(t);
      }) : e.push(n), e;
    }, t.hasClass = function (t) {
      return t = Gi(t), !!i[t.main];
    }, t.getAllClassMainTypes = function () {
      var t = [];
      return d(i, function (e, n) {
        t.push(n);
      }), t;
    }, t.hasSubTypes = function (t) {
      t = Gi(t);
      var e = i[t.main];
      return e && e[yd];
    }, t.parseClassType = Gi, e.registerWhenExtend) {
      var r = t.extend;
      r && (t.extend = function (e) {
        var n = r.call(this, e);
        return t.registerClass(n, e.type);
      });
    }

    return t;
  }

  function $i(t) {
    return t > -kd && kd > t;
  }

  function Qi(t) {
    return t > kd || -kd > t;
  }

  function Ki(t, e, n, i, r) {
    var a = 1 - r;
    return a * a * (a * t + 3 * r * e) + r * r * (r * i + 3 * a * n);
  }

  function Ji(t, e, n, i, r) {
    var a = 1 - r;
    return 3 * (((e - t) * a + 2 * (n - e) * r) * a + (i - n) * r * r);
  }

  function tr(t, e, n, i, r, a) {
    var o = i + 3 * (e - n) - t,
        s = 3 * (n - 2 * e + t),
        l = 3 * (e - t),
        h = t - r,
        u = s * s - 3 * o * l,
        c = s * l - 9 * o * h,
        d = l * l - 3 * s * h,
        f = 0;
    if ($i(u) && $i(c)) {
      if ($i(s)) a[0] = 0;else {
        var p = -l / s;
        p >= 0 && 1 >= p && (a[f++] = p);
      }
    } else {
      var g = c * c - 4 * u * d;

      if ($i(g)) {
        var v = c / u,
            p = -s / o + v,
            m = -v / 2;
        p >= 0 && 1 >= p && (a[f++] = p), m >= 0 && 1 >= m && (a[f++] = m);
      } else if (g > 0) {
        var _ = Cd(g),
            y = u * s + 1.5 * o * (-c + _),
            x = u * s + 1.5 * o * (-c - _);

        y = 0 > y ? -Id(-y, Pd) : Id(y, Pd), x = 0 > x ? -Id(-x, Pd) : Id(x, Pd);
        var p = (-s - (y + x)) / (3 * o);
        p >= 0 && 1 >= p && (a[f++] = p);
      } else {
        var w = (2 * u * s - 3 * o * c) / (2 * Cd(u * u * u)),
            b = Math.acos(w) / 3,
            S = Cd(u),
            M = Math.cos(b),
            p = (-s - 2 * S * M) / (3 * o),
            m = (-s + S * (M + Ad * Math.sin(b))) / (3 * o),
            T = (-s + S * (M - Ad * Math.sin(b))) / (3 * o);
        p >= 0 && 1 >= p && (a[f++] = p), m >= 0 && 1 >= m && (a[f++] = m), T >= 0 && 1 >= T && (a[f++] = T);
      }
    }
    return f;
  }

  function er(t, e, n, i, r) {
    var a = 6 * n - 12 * e + 6 * t,
        o = 9 * e + 3 * i - 3 * t - 9 * n,
        s = 3 * e - 3 * t,
        l = 0;

    if ($i(o)) {
      if (Qi(a)) {
        var h = -s / a;
        h >= 0 && 1 >= h && (r[l++] = h);
      }
    } else {
      var u = a * a - 4 * o * s;
      if ($i(u)) r[0] = -a / (2 * o);else if (u > 0) {
        var c = Cd(u),
            h = (-a + c) / (2 * o),
            d = (-a - c) / (2 * o);
        h >= 0 && 1 >= h && (r[l++] = h), d >= 0 && 1 >= d && (r[l++] = d);
      }
    }

    return l;
  }

  function nr(t, e, n, i, r, a) {
    var o = (e - t) * r + t,
        s = (n - e) * r + e,
        l = (i - n) * r + n,
        h = (s - o) * r + o,
        u = (l - s) * r + s,
        c = (u - h) * r + h;
    a[0] = t, a[1] = o, a[2] = h, a[3] = c, a[4] = c, a[5] = u, a[6] = l, a[7] = i;
  }

  function ir(t, e, n, i, r, a, o, s, l, h, u) {
    var c,
        d,
        f,
        p,
        g,
        v = .005,
        m = 1 / 0;
    Od[0] = l, Od[1] = h;

    for (var _ = 0; 1 > _; _ += .05) Ld[0] = Ki(t, n, r, o, _), Ld[1] = Ki(e, i, a, s, _), p = Cu(Od, Ld), m > p && (c = _, m = p);

    m = 1 / 0;

    for (var y = 0; 32 > y && !(Dd > v); y++) d = c - v, f = c + v, Ld[0] = Ki(t, n, r, o, d), Ld[1] = Ki(e, i, a, s, d), p = Cu(Ld, Od), d >= 0 && m > p ? (c = d, m = p) : (Ed[0] = Ki(t, n, r, o, f), Ed[1] = Ki(e, i, a, s, f), g = Cu(Ed, Od), 1 >= f && m > g ? (c = f, m = g) : v *= .5);

    return u && (u[0] = Ki(t, n, r, o, c), u[1] = Ki(e, i, a, s, c)), Cd(m);
  }

  function rr(t, e, n, i) {
    var r = 1 - i;
    return r * (r * t + 2 * i * e) + i * i * n;
  }

  function ar(t, e, n, i) {
    return 2 * ((1 - i) * (e - t) + i * (n - e));
  }

  function or(t, e, n, i, r) {
    var a = t - 2 * e + n,
        o = 2 * (e - t),
        s = t - i,
        l = 0;

    if ($i(a)) {
      if (Qi(o)) {
        var h = -s / o;
        h >= 0 && 1 >= h && (r[l++] = h);
      }
    } else {
      var u = o * o - 4 * a * s;

      if ($i(u)) {
        var h = -o / (2 * a);
        h >= 0 && 1 >= h && (r[l++] = h);
      } else if (u > 0) {
        var c = Cd(u),
            h = (-o + c) / (2 * a),
            d = (-o - c) / (2 * a);
        h >= 0 && 1 >= h && (r[l++] = h), d >= 0 && 1 >= d && (r[l++] = d);
      }
    }

    return l;
  }

  function sr(t, e, n) {
    var i = t + n - 2 * e;
    return 0 === i ? .5 : (t - e) / i;
  }

  function lr(t, e, n, i, r) {
    var a = (e - t) * i + t,
        o = (n - e) * i + e,
        s = (o - a) * i + a;
    r[0] = t, r[1] = a, r[2] = s, r[3] = s, r[4] = o, r[5] = n;
  }

  function hr(t, e, n, i, r, a, o, s, l) {
    var h,
        u = .005,
        c = 1 / 0;
    Od[0] = o, Od[1] = s;

    for (var d = 0; 1 > d; d += .05) {
      Ld[0] = rr(t, n, r, d), Ld[1] = rr(e, i, a, d);
      var f = Cu(Od, Ld);
      c > f && (h = d, c = f);
    }

    c = 1 / 0;

    for (var p = 0; 32 > p && !(Dd > u); p++) {
      var g = h - u,
          v = h + u;
      Ld[0] = rr(t, n, r, g), Ld[1] = rr(e, i, a, g);
      var f = Cu(Ld, Od);
      if (g >= 0 && c > f) h = g, c = f;else {
        Ed[0] = rr(t, n, r, v), Ed[1] = rr(e, i, a, v);
        var m = Cu(Ed, Od);
        1 >= v && c > m ? (h = v, c = m) : u *= .5;
      }
    }

    return l && (l[0] = rr(t, n, r, h), l[1] = rr(e, i, a, h)), Cd(c);
  }

  function ur(t, e, n, i, r, a) {
    r[0] = Bd(t, n), r[1] = Bd(e, i), a[0] = Rd(t, n), a[1] = Rd(e, i);
  }

  function cr(t, e, n, i, r, a, o, s, l, h) {
    var u,
        c = er,
        d = Ki,
        f = c(t, n, r, o, Gd);

    for (l[0] = 1 / 0, l[1] = 1 / 0, h[0] = -1 / 0, h[1] = -1 / 0, u = 0; f > u; u++) {
      var p = d(t, n, r, o, Gd[u]);
      l[0] = Bd(p, l[0]), h[0] = Rd(p, h[0]);
    }

    for (f = c(e, i, a, s, Ud), u = 0; f > u; u++) {
      var g = d(e, i, a, s, Ud[u]);
      l[1] = Bd(g, l[1]), h[1] = Rd(g, h[1]);
    }

    l[0] = Bd(t, l[0]), h[0] = Rd(t, h[0]), l[0] = Bd(o, l[0]), h[0] = Rd(o, h[0]), l[1] = Bd(e, l[1]), h[1] = Rd(e, h[1]), l[1] = Bd(s, l[1]), h[1] = Rd(s, h[1]);
  }

  function dr(t, e, n, i, r, a, o, s) {
    var l = sr,
        h = rr,
        u = Rd(Bd(l(t, n, r), 1), 0),
        c = Rd(Bd(l(e, i, a), 1), 0),
        d = h(t, n, r, u),
        f = h(e, i, a, c);
    o[0] = Bd(t, r, d), o[1] = Bd(e, a, f), s[0] = Rd(t, r, d), s[1] = Rd(e, a, f);
  }

  function fr(t, e, n, i, r, a, o, s, l) {
    var h = q,
        u = j,
        c = Math.abs(r - a);
    if (1e-4 > c % Fd && c > 1e-4) return s[0] = t - n, s[1] = e - i, l[0] = t + n, void (l[1] = e + i);

    if (Hd[0] = Nd(r) * n + t, Hd[1] = zd(r) * i + e, Vd[0] = Nd(a) * n + t, Vd[1] = zd(a) * i + e, h(s, Hd, Vd), u(l, Hd, Vd), r %= Fd, 0 > r && (r += Fd), a %= Fd, 0 > a && (a += Fd), r > a && !o ? a += Fd : a > r && o && (r += Fd), o) {
      var d = a;
      a = r, r = d;
    }

    for (var f = 0; a > f; f += Math.PI / 2) f > r && (Wd[0] = Nd(f) * n + t, Wd[1] = zd(f) * i + e, h(s, Wd, s), u(l, Wd, l));
  }

  function pr(t, e, n, i, r, a, o) {
    if (0 === r) return !1;
    var s = r,
        l = 0,
        h = t;
    if (o > e + s && o > i + s || e - s > o && i - s > o || a > t + s && a > n + s || t - s > a && n - s > a) return !1;
    if (t === n) return Math.abs(a - t) <= s / 2;
    l = (e - i) / (t - n), h = (t * i - n * e) / (t - n);
    var u = l * a - o + h,
        c = u * u / (l * l + 1);
    return s / 2 * s / 2 >= c;
  }

  function gr(t, e, n, i, r, a, o, s, l, h, u) {
    if (0 === l) return !1;
    var c = l;
    if (u > e + c && u > i + c && u > a + c && u > s + c || e - c > u && i - c > u && a - c > u && s - c > u || h > t + c && h > n + c && h > r + c && h > o + c || t - c > h && n - c > h && r - c > h && o - c > h) return !1;
    var d = ir(t, e, n, i, r, a, o, s, h, u, null);
    return c / 2 >= d;
  }

  function vr(t, e, n, i, r, a, o, s, l) {
    if (0 === o) return !1;
    var h = o;
    if (l > e + h && l > i + h && l > a + h || e - h > l && i - h > l && a - h > l || s > t + h && s > n + h && s > r + h || t - h > s && n - h > s && r - h > s) return !1;
    var u = hr(t, e, n, i, r, a, s, l, null);
    return h / 2 >= u;
  }

  function mr(t) {
    return t %= af, 0 > t && (t += af), t;
  }

  function _r(t, e, n, i, r, a, o, s, l) {
    if (0 === o) return !1;
    var h = o;
    s -= t, l -= e;
    var u = Math.sqrt(s * s + l * l);
    if (u - h > n || n > u + h) return !1;
    if (Math.abs(i - r) % of < 1e-4) return !0;

    if (a) {
      var c = i;
      i = mr(r), r = mr(c);
    } else i = mr(i), r = mr(r);

    i > r && (r += of);
    var d = Math.atan2(l, s);
    return 0 > d && (d += of), d >= i && r >= d || d + of >= i && r >= d + of;
  }

  function yr(t, e, n, i, r, a) {
    if (a > e && a > i || e > a && i > a) return 0;
    if (i === e) return 0;
    var o = e > i ? 1 : -1,
        s = (a - e) / (i - e);
    (1 === s || 0 === s) && (o = e > i ? .5 : -.5);
    var l = s * (n - t) + t;
    return l === r ? 1 / 0 : l > r ? o : 0;
  }

  function xr(t, e) {
    return Math.abs(t - e) < hf;
  }

  function wr() {
    var t = cf[0];
    cf[0] = cf[1], cf[1] = t;
  }

  function br(t, e, n, i, r, a, o, s, l, h) {
    if (h > e && h > i && h > a && h > s || e > h && i > h && a > h && s > h) return 0;
    var u = tr(e, i, a, s, h, uf);
    if (0 === u) return 0;

    for (var c, d, f = 0, p = -1, g = 0; u > g; g++) {
      var v = uf[g],
          m = 0 === v || 1 === v ? .5 : 1,
          _ = Ki(t, n, r, o, v);

      l > _ || (0 > p && (p = er(e, i, a, s, cf), cf[1] < cf[0] && p > 1 && wr(), c = Ki(e, i, a, s, cf[0]), p > 1 && (d = Ki(e, i, a, s, cf[1]))), f += 2 === p ? v < cf[0] ? e > c ? m : -m : v < cf[1] ? c > d ? m : -m : d > s ? m : -m : v < cf[0] ? e > c ? m : -m : c > s ? m : -m);
    }

    return f;
  }

  function Sr(t, e, n, i, r, a, o, s) {
    if (s > e && s > i && s > a || e > s && i > s && a > s) return 0;
    var l = or(e, i, a, s, uf);
    if (0 === l) return 0;
    var h = sr(e, i, a);

    if (h >= 0 && 1 >= h) {
      for (var u = 0, c = rr(e, i, a, h), d = 0; l > d; d++) {
        var f = 0 === uf[d] || 1 === uf[d] ? .5 : 1,
            p = rr(t, n, r, uf[d]);
        o > p || (u += uf[d] < h ? e > c ? f : -f : c > a ? f : -f);
      }

      return u;
    }

    var f = 0 === uf[0] || 1 === uf[0] ? .5 : 1,
        p = rr(t, n, r, uf[0]);
    return o > p ? 0 : e > a ? f : -f;
  }

  function Mr(t, e, n, i, r, a, o, s) {
    if (s -= e, s > n || -n > s) return 0;
    var l = Math.sqrt(n * n - s * s);
    uf[0] = -l, uf[1] = l;
    var h = Math.abs(i - r);
    if (1e-4 > h) return 0;

    if (1e-4 > h % lf) {
      i = 0, r = lf;
      var u = a ? 1 : -1;
      return o >= uf[0] + t && o <= uf[1] + t ? u : 0;
    }

    if (a) {
      var l = i;
      i = mr(r), r = mr(l);
    } else i = mr(i), r = mr(r);

    i > r && (r += lf);

    for (var c = 0, d = 0; 2 > d; d++) {
      var f = uf[d];

      if (f + t > o) {
        var p = Math.atan2(s, f),
            u = a ? 1 : -1;
        0 > p && (p = lf + p), (p >= i && r >= p || p + lf >= i && r >= p + lf) && (p > Math.PI / 2 && p < 1.5 * Math.PI && (u = -u), c += u);
      }
    }

    return c;
  }

  function Tr(t, e, n, i, r) {
    for (var a = 0, o = 0, s = 0, l = 0, h = 0, u = 0; u < t.length;) {
      var c = t[u++];

      switch (c === sf.M && u > 1 && (n || (a += yr(o, s, l, h, i, r))), 1 === u && (o = t[u], s = t[u + 1], l = o, h = s), c) {
        case sf.M:
          l = t[u++], h = t[u++], o = l, s = h;
          break;

        case sf.L:
          if (n) {
            if (pr(o, s, t[u], t[u + 1], e, i, r)) return !0;
          } else a += yr(o, s, t[u], t[u + 1], i, r) || 0;

          o = t[u++], s = t[u++];
          break;

        case sf.C:
          if (n) {
            if (gr(o, s, t[u++], t[u++], t[u++], t[u++], t[u], t[u + 1], e, i, r)) return !0;
          } else a += br(o, s, t[u++], t[u++], t[u++], t[u++], t[u], t[u + 1], i, r) || 0;

          o = t[u++], s = t[u++];
          break;

        case sf.Q:
          if (n) {
            if (vr(o, s, t[u++], t[u++], t[u], t[u + 1], e, i, r)) return !0;
          } else a += Sr(o, s, t[u++], t[u++], t[u], t[u + 1], i, r) || 0;

          o = t[u++], s = t[u++];
          break;

        case sf.A:
          var d = t[u++],
              f = t[u++],
              p = t[u++],
              g = t[u++],
              v = t[u++],
              m = t[u++];
          u += 1;

          var _ = 1 - t[u++],
              y = Math.cos(v) * p + d,
              x = Math.sin(v) * g + f;

          u > 1 ? a += yr(o, s, y, x, i, r) : (l = y, h = x);
          var w = (i - d) * g / p + d;

          if (n) {
            if (_r(d, f, g, v, v + m, _, e, w, r)) return !0;
          } else a += Mr(d, f, g, v, v + m, _, w, r);

          o = Math.cos(v + m) * p + d, s = Math.sin(v + m) * g + f;
          break;

        case sf.R:
          l = o = t[u++], h = s = t[u++];
          var b = t[u++],
              S = t[u++],
              y = l + b,
              x = h + S;

          if (n) {
            if (pr(l, h, y, h, e, i, r) || pr(y, h, y, x, e, i, r) || pr(y, x, l, x, e, i, r) || pr(l, x, l, h, e, i, r)) return !0;
          } else a += yr(y, h, y, x, i, r), a += yr(l, x, l, h, i, r);

          break;

        case sf.Z:
          if (n) {
            if (pr(o, s, l, h, e, i, r)) return !0;
          } else a += yr(o, s, l, h, i, r);

          o = l, s = h;
      }
    }

    return n || xr(s, h) || (a += yr(o, s, l, h, i, r) || 0), 0 !== a;
  }

  function Ir(t, e, n) {
    return Tr(t, 0, !1, e, n);
  }

  function Cr(t, e, n, i) {
    return Tr(t, e, !0, n, i);
  }

  function kr(t) {
    ri.call(this, t), this.path = null;
  }

  function Dr(t, e, n, i, r, a, o, s, l, h, u) {
    var c = l * (Sf / 180),
        d = bf(c) * (t - n) / 2 + wf(c) * (e - i) / 2,
        f = -1 * wf(c) * (t - n) / 2 + bf(c) * (e - i) / 2,
        p = d * d / (o * o) + f * f / (s * s);
    p > 1 && (o *= xf(p), s *= xf(p));

    var g = (r === a ? -1 : 1) * xf((o * o * s * s - o * o * f * f - s * s * d * d) / (o * o * f * f + s * s * d * d)) || 0,
        v = g * o * f / s,
        m = g * -s * d / o,
        _ = (t + n) / 2 + bf(c) * v - wf(c) * m,
        y = (e + i) / 2 + wf(c) * v + bf(c) * m,
        x = If([1, 0], [(d - v) / o, (f - m) / s]),
        w = [(d - v) / o, (f - m) / s],
        b = [(-1 * d - v) / o, (-1 * f - m) / s],
        S = If(w, b);

    Tf(w, b) <= -1 && (S = Sf), Tf(w, b) >= 1 && (S = 0), 0 === a && S > 0 && (S -= 2 * Sf), 1 === a && 0 > S && (S += 2 * Sf), u.addData(h, _, y, o, s, x, S, c, a);
  }

  function Ar(t) {
    if (!t) return new rf();

    for (var e, n = 0, i = 0, r = n, a = i, o = new rf(), s = rf.CMD, l = t.match(Cf), h = 0; h < l.length; h++) {
      for (var u, c = l[h], d = c.charAt(0), f = c.match(kf) || [], p = f.length, g = 0; p > g; g++) f[g] = parseFloat(f[g]);

      for (var v = 0; p > v;) {
        var m,
            _,
            y,
            x,
            w,
            b,
            S,
            M = n,
            T = i;

        switch (d) {
          case "l":
            n += f[v++], i += f[v++], u = s.L, o.addData(u, n, i);
            break;

          case "L":
            n = f[v++], i = f[v++], u = s.L, o.addData(u, n, i);
            break;

          case "m":
            n += f[v++], i += f[v++], u = s.M, o.addData(u, n, i), r = n, a = i, d = "l";
            break;

          case "M":
            n = f[v++], i = f[v++], u = s.M, o.addData(u, n, i), r = n, a = i, d = "L";
            break;

          case "h":
            n += f[v++], u = s.L, o.addData(u, n, i);
            break;

          case "H":
            n = f[v++], u = s.L, o.addData(u, n, i);
            break;

          case "v":
            i += f[v++], u = s.L, o.addData(u, n, i);
            break;

          case "V":
            i = f[v++], u = s.L, o.addData(u, n, i);
            break;

          case "C":
            u = s.C, o.addData(u, f[v++], f[v++], f[v++], f[v++], f[v++], f[v++]), n = f[v - 2], i = f[v - 1];
            break;

          case "c":
            u = s.C, o.addData(u, f[v++] + n, f[v++] + i, f[v++] + n, f[v++] + i, f[v++] + n, f[v++] + i), n += f[v - 2], i += f[v - 1];
            break;

          case "S":
            m = n, _ = i;
            var I = o.len(),
                C = o.data;
            e === s.C && (m += n - C[I - 4], _ += i - C[I - 3]), u = s.C, M = f[v++], T = f[v++], n = f[v++], i = f[v++], o.addData(u, m, _, M, T, n, i);
            break;

          case "s":
            m = n, _ = i;
            var I = o.len(),
                C = o.data;
            e === s.C && (m += n - C[I - 4], _ += i - C[I - 3]), u = s.C, M = n + f[v++], T = i + f[v++], n += f[v++], i += f[v++], o.addData(u, m, _, M, T, n, i);
            break;

          case "Q":
            M = f[v++], T = f[v++], n = f[v++], i = f[v++], u = s.Q, o.addData(u, M, T, n, i);
            break;

          case "q":
            M = f[v++] + n, T = f[v++] + i, n += f[v++], i += f[v++], u = s.Q, o.addData(u, M, T, n, i);
            break;

          case "T":
            m = n, _ = i;
            var I = o.len(),
                C = o.data;
            e === s.Q && (m += n - C[I - 4], _ += i - C[I - 3]), n = f[v++], i = f[v++], u = s.Q, o.addData(u, m, _, n, i);
            break;

          case "t":
            m = n, _ = i;
            var I = o.len(),
                C = o.data;
            e === s.Q && (m += n - C[I - 4], _ += i - C[I - 3]), n += f[v++], i += f[v++], u = s.Q, o.addData(u, m, _, n, i);
            break;

          case "A":
            y = f[v++], x = f[v++], w = f[v++], b = f[v++], S = f[v++], M = n, T = i, n = f[v++], i = f[v++], u = s.A, Dr(M, T, n, i, b, S, y, x, w, u, o);
            break;

          case "a":
            y = f[v++], x = f[v++], w = f[v++], b = f[v++], S = f[v++], M = n, T = i, n += f[v++], i += f[v++], u = s.A, Dr(M, T, n, i, b, S, y, x, w, u, o);
        }
      }

      ("z" === d || "Z" === d) && (u = s.Z, o.addData(u), n = r, i = a), e = u;
    }

    return o.toStatic(), o;
  }

  function Pr(t, e) {
    var n = Ar(t);
    return e = e || {}, e.buildPath = function (t) {
      if (t.setData) {
        t.setData(n.data);
        var e = t.getContext();
        e && t.rebuildPath(e);
      } else {
        var e = t;
        n.rebuildPath(e);
      }
    }, e.applyTransform = function (t) {
      yf(n, t), this.dirty(!0);
    }, e;
  }

  function Or(t, e) {
    return new kr(Pr(t, e));
  }

  function Lr(t, e, n, i, r, a, o) {
    var s = .5 * (n - t),
        l = .5 * (i - e);
    return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e;
  }

  function Er(t, e, n) {
    var i = e.points,
        r = e.smooth;

    if (i && i.length >= 2) {
      if (r && "spline" !== r) {
        var a = Rf(i, r, n, e.smoothConstraint);
        t.moveTo(i[0][0], i[0][1]);

        for (var o = i.length, s = 0; (n ? o : o - 1) > s; s++) {
          var l = a[2 * s],
              h = a[2 * s + 1],
              u = i[(s + 1) % o];
          t.bezierCurveTo(l[0], l[1], h[0], h[1], u[0], u[1]);
        }
      } else {
        "spline" === r && (i = Bf(i, n)), t.moveTo(i[0][0], i[0][1]);

        for (var s = 1, c = i.length; c > s; s++) t.lineTo(i[s][0], i[s][1]);
      }

      n && t.closePath();
    }
  }

  function Br(t, e, n) {
    if (e) {
      var i = e.x1,
          r = e.x2,
          a = e.y1,
          o = e.y2;
      t.x1 = i, t.x2 = r, t.y1 = a, t.y2 = o;
      var s = n && n.lineWidth;
      s && (Ff(2 * i) === Ff(2 * r) && (t.x1 = t.x2 = zr(i, s, !0)), Ff(2 * a) === Ff(2 * o) && (t.y1 = t.y2 = zr(a, s, !0)));
    }
  }

  function Rr(t, e, n) {
    if (e) {
      var i = e.x,
          r = e.y,
          a = e.width,
          o = e.height;
      t.x = i, t.y = r, t.width = a, t.height = o;
      var s = n && n.lineWidth;
      s && (t.x = zr(i, s, !0), t.y = zr(r, s, !0), t.width = Math.max(zr(i + a, s, !1) - t.x, 0 === a ? 0 : 1), t.height = Math.max(zr(r + o, s, !1) - t.y, 0 === o ? 0 : 1));
    }
  }

  function zr(t, e, n) {
    if (!e) return t;
    var i = Ff(2 * t);
    return (i + Ff(e)) % 2 === 0 ? i / 2 : (i + (n ? 1 : -1)) / 2;
  }

  function Nr(t, e, n) {
    var i = t.cpx2,
        r = t.cpy2;
    return null === i || null === r ? [(n ? Ji : Ki)(t.x1, t.cpx1, t.cpx2, t.x2, e), (n ? Ji : Ki)(t.y1, t.cpy1, t.cpy2, t.y2, e)] : [(n ? ar : rr)(t.x1, t.cpx1, t.x2, e), (n ? ar : rr)(t.y1, t.cpy1, t.y2, e)];
  }

  function Fr(t) {
    ri.call(this, t), this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.notClear = !0;
  }

  function Hr(t) {
    return kr.extend(t);
  }

  function Vr(t, e) {
    ip[t] = e;
  }

  function Wr(t) {
    return ip.hasOwnProperty(t) ? ip[t] : void 0;
  }

  function Gr(t, e, n, i) {
    var r = Or(t, e);
    return n && ("center" === i && (n = Xr(n, r.getBoundingRect())), Yr(r, n)), r;
  }

  function Ur(t, e, n) {
    var i = new ai({
      style: {
        image: t,
        x: e.x,
        y: e.y,
        width: e.width,
        height: e.height
      },
      onload: function (t) {
        if ("center" === n) {
          var r = {
            width: t.width,
            height: t.height
          };
          i.setStyle(Xr(e, r));
        }
      }
    });
    return i;
  }

  function Xr(t, e) {
    var n,
        i = e.width / e.height,
        r = t.height * i;
    r <= t.width ? n = t.height : (r = t.width, n = r / i);
    var a = t.x + t.width / 2,
        o = t.y + t.height / 2;
    return {
      x: a - r / 2,
      y: o - n / 2,
      width: r,
      height: n
    };
  }

  function Yr(t, e) {
    if (t.applyTransform) {
      var n = t.getBoundingRect(),
          i = n.calculateTransform(e);
      t.applyTransform(i);
    }
  }

  function qr(t) {
    return null != t && "none" !== t;
  }

  function jr(t) {
    if ("string" != typeof t) return t;
    var e = rp.get(t);
    return e || (e = Ne(t, -.1), 1e4 > ap && (rp.set(t, e), ap++)), e;
  }

  function Zr(t) {
    if (t.__hoverStlDirty) {
      t.__hoverStlDirty = !1;
      var e = t.__hoverStl;
      if (!e) return void (t.__cachedNormalStl = t.__cachedNormalZ2 = null);
      var n = t.__cachedNormalStl = {};
      t.__cachedNormalZ2 = t.z2;
      var i = t.style;

      for (var r in e) null != e[r] && (n[r] = i[r]);

      n.fill = i.fill, n.stroke = i.stroke;
    }
  }

  function $r(t) {
    var e = t.__hoverStl;

    if (e && !t.__highlighted) {
      var n = t.__zr,
          i = t.useHoverLayer && n && "canvas" === n.painter.type;

      if (t.__highlighted = i ? "layer" : "plain", !(t.isGroup || !n && t.useHoverLayer)) {
        var r = t,
            a = t.style;
        i && (r = n.addHover(t), a = r.style), ma(a), i || Zr(r), a.extendFrom(e), Qr(a, e, "fill"), Qr(a, e, "stroke"), va(a), i || (t.dirty(!1), t.z2 += Kf);
      }
    }
  }

  function Qr(t, e, n) {
    !qr(e[n]) && qr(t[n]) && (t[n] = jr(t[n]));
  }

  function Kr(t) {
    var e = t.__highlighted;
    if (e && (t.__highlighted = !1, !t.isGroup)) if ("layer" === e) t.__zr && t.__zr.removeHover(t);else {
      var n = t.style,
          i = t.__cachedNormalStl;
      i && (ma(n), t.setStyle(i), va(n));
      var r = t.__cachedNormalZ2;
      null != r && t.z2 - r === Kf && (t.z2 = r);
    }
  }

  function Jr(t, e, n) {
    var i,
        r = tp,
        a = tp;
    t.__highlighted && (r = Jf, i = !0), e(t, n), t.__highlighted && (a = Jf, i = !0), t.isGroup && t.traverse(function (t) {
      !t.isGroup && e(t, n);
    }), i && t.__highDownOnUpdate && t.__highDownOnUpdate(r, a);
  }

  function ta(t, e) {
    e = t.__hoverStl = e !== !1 && (t.hoverStyle || e || {}), t.__hoverStlDirty = !0, t.__highlighted && (t.__cachedNormalStl = null, Kr(t), $r(t));
  }

  function ea(t) {
    !aa(this, t) && !this.__highByOuter && Jr(this, $r);
  }

  function na(t) {
    !aa(this, t) && !this.__highByOuter && Jr(this, Kr);
  }

  function ia(t) {
    this.__highByOuter |= 1 << (t || 0), Jr(this, $r);
  }

  function ra(t) {
    !(this.__highByOuter &= ~(1 << (t || 0))) && Jr(this, Kr);
  }

  function aa(t, e) {
    return t.__highDownSilentOnTouch && e.zrByTouch;
  }

  function oa(t, e) {
    sa(t, !0), Jr(t, ta, e);
  }

  function sa(t, e) {
    var n = e === !1;

    if (t.__highDownSilentOnTouch = t.highDownSilentOnTouch, t.__highDownOnUpdate = t.highDownOnUpdate, !n || t.__highDownDispatcher) {
      var i = n ? "off" : "on";
      t[i]("mouseover", ea)[i]("mouseout", na), t[i]("emphasis", ia)[i]("normal", ra), t.__highByOuter = t.__highByOuter || 0, t.__highDownDispatcher = !n;
    }
  }

  function la(t) {
    return !(!t || !t.__highDownDispatcher);
  }

  function ha(t) {
    var e = np[t];
    return null == e && 32 >= ep && (e = np[t] = ep++), e;
  }

  function ua(t, e, n, i, r, a, o) {
    r = r || Qf;
    var s,
        l = r.labelFetcher,
        h = r.labelDataIndex,
        u = r.labelDimIndex,
        c = n.getShallow("show"),
        d = i.getShallow("show");
    (c || d) && (l && (s = l.getFormattedLabel(h, "normal", null, u)), null == s && (s = y(r.defaultText) ? r.defaultText(h, r) : r.defaultText));
    var f = c ? s : null,
        p = d ? T(l ? l.getFormattedLabel(h, "emphasis", null, u) : null, s) : null;
    (null != f || null != p) && (ca(t, n, a, r), ca(e, i, o, r, !0)), t.text = f, e.text = p;
  }

  function ca(t, e, n, i, r) {
    return da(t, e, i, r), n && a(t, n), t;
  }

  function da(t, e, n, i) {
    if (n = n || Qf, n.isRectText) {
      var r;
      n.getTextPosition ? r = n.getTextPosition(e, i) : (r = e.getShallow("position") || (i ? null : "inside"), "outside" === r && (r = "top")), t.textPosition = r, t.textOffset = e.getShallow("offset");
      var a = e.getShallow("rotate");
      null != a && (a *= Math.PI / 180), t.textRotation = a, t.textDistance = T(e.getShallow("distance"), i ? null : 5);
    }

    var o,
        s = e.ecModel,
        l = s && s.option.textStyle,
        h = fa(e);

    if (h) {
      o = {};

      for (var u in h) if (h.hasOwnProperty(u)) {
        var c = e.getModel(["rich", u]);
        pa(o[u] = {}, c, l, n, i);
      }
    }

    return t.rich = o, pa(t, e, l, n, i, !0), n.forceRich && !n.textStyle && (n.textStyle = {}), t;
  }

  function fa(t) {
    for (var e; t && t !== t.ecModel;) {
      var n = (t.option || Qf).rich;

      if (n) {
        e = e || {};

        for (var i in n) n.hasOwnProperty(i) && (e[i] = 1);
      }

      t = t.parentModel;
    }

    return e;
  }

  function pa(t, e, n, i, r, a) {
    n = !r && n || Qf, t.textFill = ga(e.getShallow("color"), i) || n.color, t.textStroke = ga(e.getShallow("textBorderColor"), i) || n.textBorderColor, t.textStrokeWidth = T(e.getShallow("textBorderWidth"), n.textBorderWidth), r || (a && (t.insideRollbackOpt = i, va(t)), null == t.textFill && (t.textFill = i.autoColor)), t.fontStyle = e.getShallow("fontStyle") || n.fontStyle, t.fontWeight = e.getShallow("fontWeight") || n.fontWeight, t.fontSize = e.getShallow("fontSize") || n.fontSize, t.fontFamily = e.getShallow("fontFamily") || n.fontFamily, t.textAlign = e.getShallow("align"), t.textVerticalAlign = e.getShallow("verticalAlign") || e.getShallow("baseline"), t.textLineHeight = e.getShallow("lineHeight"), t.textWidth = e.getShallow("width"), t.textHeight = e.getShallow("height"), t.textTag = e.getShallow("tag"), a && i.disableBox || (t.textBackgroundColor = ga(e.getShallow("backgroundColor"), i), t.textPadding = e.getShallow("padding"), t.textBorderColor = ga(e.getShallow("borderColor"), i), t.textBorderWidth = e.getShallow("borderWidth"), t.textBorderRadius = e.getShallow("borderRadius"), t.textBoxShadowColor = e.getShallow("shadowColor"), t.textBoxShadowBlur = e.getShallow("shadowBlur"), t.textBoxShadowOffsetX = e.getShallow("shadowOffsetX"), t.textBoxShadowOffsetY = e.getShallow("shadowOffsetY")), t.textShadowColor = e.getShallow("textShadowColor") || n.textShadowColor, t.textShadowBlur = e.getShallow("textShadowBlur") || n.textShadowBlur, t.textShadowOffsetX = e.getShallow("textShadowOffsetX") || n.textShadowOffsetX, t.textShadowOffsetY = e.getShallow("textShadowOffsetY") || n.textShadowOffsetY;
  }

  function ga(t, e) {
    return "auto" !== t ? t : e && e.autoColor ? e.autoColor : null;
  }

  function va(t) {
    var e,
        n = t.textPosition,
        i = t.insideRollbackOpt;

    if (i && null == t.textFill) {
      var r = i.autoColor,
          a = i.isRectText,
          o = i.useInsideStyle,
          s = o !== !1 && (o === !0 || a && n && "string" == typeof n && n.indexOf("inside") >= 0),
          l = !s && null != r;
      (s || l) && (e = {
        textFill: t.textFill,
        textStroke: t.textStroke,
        textStrokeWidth: t.textStrokeWidth
      }), s && (t.textFill = "#fff", null == t.textStroke && (t.textStroke = r, null == t.textStrokeWidth && (t.textStrokeWidth = 2))), l && (t.textFill = r);
    }

    t.insideRollback = e;
  }

  function ma(t) {
    var e = t.insideRollback;
    e && (t.textFill = e.textFill, t.textStroke = e.textStroke, t.textStrokeWidth = e.textStrokeWidth, t.insideRollback = null);
  }

  function _a(t, e) {
    var n = e && e.getModel("textStyle");
    return A([t.fontStyle || n && n.getShallow("fontStyle") || "", t.fontWeight || n && n.getShallow("fontWeight") || "", (t.fontSize || n && n.getShallow("fontSize") || 12) + "px", t.fontFamily || n && n.getShallow("fontFamily") || "sans-serif"].join(" "));
  }

  function ya(t, e, n, i, r, a) {
    "function" == typeof r && (a = r, r = null);
    var o = i && i.isAnimationEnabled();

    if (o) {
      var s = t ? "Update" : "",
          l = i.getShallow("animationDuration" + s),
          h = i.getShallow("animationEasing" + s),
          u = i.getShallow("animationDelay" + s);
      "function" == typeof u && (u = u(r, i.getAnimationDelayParams ? i.getAnimationDelayParams(e, r) : null)), "function" == typeof l && (l = l(r)), l > 0 ? e.animateTo(n, l, u || 0, h, a, !!a) : (e.stopAnimation(), e.attr(n), a && a());
    } else e.stopAnimation(), e.attr(n), a && a();
  }

  function xa(t, e, n, i, r) {
    ya(!0, t, e, n, i, r);
  }

  function wa(t, e, n, i, r) {
    ya(!1, t, e, n, i, r);
  }

  function ba(t, e, n) {
    e = a({
      rectHover: !0
    }, e);
    var i = e.style = {
      strokeNoScale: !0
    };
    return n = n || {
      x: -1,
      y: -1,
      width: 2,
      height: 2
    }, t ? 0 === t.indexOf("image://") ? (i.image = t.slice(8), o(i, n), new ai(e)) : Gr(t.replace("path://", ""), e, n, "center") : void 0;
  }

  function Sa(t, e, n) {
    this.parentModel = e, this.ecModel = n, this.option = t;
  }

  function Ma(t, e, n) {
    for (var i = 0; i < e.length && (!e[i] || (t = t && "object" == typeof t ? t[e[i]] : null, null != t)); i++);

    return null == t && n && (t = n.get(e)), t;
  }

  function Ta(t, e) {
    var n = cp(t).getParent;
    return n ? n.call(t, e) : t.parentModel;
  }

  function Ia(t) {
    return [t || "", dp++, Math.random().toFixed(5)].join("_");
  }

  function Ca(t) {
    var e = {};
    return t.registerSubTypeDefaulter = function (t, n) {
      t = Gi(t), e[t.main] = n;
    }, t.determineSubType = function (n, i) {
      var r = i.type;

      if (!r) {
        var a = Gi(n).main;
        t.hasSubTypes(n) && e[a] && (r = e[a](i));
      }

      return r;
    }, t;
  }

  function ka(t, e) {
    function n(t) {
      var n = {},
          a = [];
      return d(t, function (o) {
        var s = i(n, o),
            h = s.originalDeps = e(o),
            u = r(h, t);
        s.entryCount = u.length, 0 === s.entryCount && a.push(o), d(u, function (t) {
          l(s.predecessor, t) < 0 && s.predecessor.push(t);
          var e = i(n, t);
          l(e.successor, t) < 0 && e.successor.push(o);
        });
      }), {
        graph: n,
        noEntryList: a
      };
    }

    function i(t, e) {
      return t[e] || (t[e] = {
        predecessor: [],
        successor: []
      }), t[e];
    }

    function r(t, e) {
      var n = [];
      return d(t, function (t) {
        l(e, t) >= 0 && n.push(t);
      }), n;
    }

    t.topologicalTravel = function (t, e, i, r) {
      function a(t) {
        l[t].entryCount--, 0 === l[t].entryCount && h.push(t);
      }

      function o(t) {
        u[t] = !0, a(t);
      }

      if (t.length) {
        var s = n(e),
            l = s.graph,
            h = s.noEntryList,
            u = {};

        for (d(t, function (t) {
          u[t] = !0;
        }); h.length;) {
          var c = h.pop(),
              f = l[c],
              p = !!u[c];
          p && (i.call(r, c, f.originalDeps.slice()), delete u[c]), d(f.successor, p ? o : a);
        }

        d(u, function () {
          throw new Error("Circle dependency may exists");
        });
      }
    };
  }

  function Da(t) {
    return t.replace(/^\s+|\s+$/g, "");
  }

  function Aa(t, e, n, i) {
    var r = e[1] - e[0],
        a = n[1] - n[0];
    if (0 === r) return 0 === a ? n[0] : (n[0] + n[1]) / 2;
    if (i) {
      if (r > 0) {
        if (t <= e[0]) return n[0];
        if (t >= e[1]) return n[1];
      } else {
        if (t >= e[0]) return n[0];
        if (t <= e[1]) return n[1];
      }
    } else {
      if (t === e[0]) return n[0];
      if (t === e[1]) return n[1];
    }
    return (t - e[0]) / r * a + n[0];
  }

  function Pa(t, e) {
    switch (t) {
      case "center":
      case "middle":
        t = "50%";
        break;

      case "left":
      case "top":
        t = "0%";
        break;

      case "right":
      case "bottom":
        t = "100%";
    }

    return "string" == typeof t ? Da(t).match(/%$/) ? parseFloat(t) / 100 * e : parseFloat(t) : null == t ? 0 / 0 : +t;
  }

  function Oa(t, e, n) {
    return null == e && (e = 10), e = Math.min(Math.max(0, e), 20), t = (+t).toFixed(e), n ? t : +t;
  }

  function La(t) {
    var e = t.toString(),
        n = e.indexOf("e");

    if (n > 0) {
      var i = +e.slice(n + 1);
      return 0 > i ? -i : 0;
    }

    var r = e.indexOf(".");
    return 0 > r ? 0 : e.length - 1 - r;
  }

  function Ea(t, e, n) {
    if (!t[e]) return 0;
    var i = p(t, function (t, e) {
      return t + (isNaN(e) ? 0 : e);
    }, 0);
    if (0 === i) return 0;

    for (var r = Math.pow(10, n), a = f(t, function (t) {
      return (isNaN(t) ? 0 : t) / i * r * 100;
    }), o = 100 * r, s = f(a, function (t) {
      return Math.floor(t);
    }), l = p(s, function (t, e) {
      return t + e;
    }, 0), h = f(a, function (t, e) {
      return t - s[e];
    }); o > l;) {
      for (var u = Number.NEGATIVE_INFINITY, c = null, d = 0, g = h.length; g > d; ++d) h[d] > u && (u = h[d], c = d);

      ++s[c], h[c] = 0, ++l;
    }

    return s[e] / r;
  }

  function Ba(t) {
    if (t instanceof Date) return t;

    if ("string" == typeof t) {
      var e = fp.exec(t);
      if (!e) return new Date(0 / 0);

      if (e[8]) {
        var n = +e[4] || 0;
        return "Z" !== e[8].toUpperCase() && (n -= e[8].slice(0, 3)), new Date(Date.UTC(+e[1], +(e[2] || 1) - 1, +e[3] || 1, n, +(e[5] || 0), +e[6] || 0, +e[7] || 0));
      }

      return new Date(+e[1], +(e[2] || 1) - 1, +e[3] || 1, +e[4] || 0, +(e[5] || 0), +e[6] || 0, +e[7] || 0);
    }

    return new Date(null == t ? 0 / 0 : Math.round(t));
  }

  function Ra(t) {
    return Math.pow(10, za(t));
  }

  function za(t) {
    if (0 === t) return 0;
    var e = Math.floor(Math.log(t) / Math.LN10);
    return t / Math.pow(10, e) >= 10 && e++, e;
  }

  function Na(t, e) {
    var n,
        i = za(t),
        r = Math.pow(10, i),
        a = t / r;
    return n = e ? 1.5 > a ? 1 : 2.5 > a ? 2 : 4 > a ? 3 : 7 > a ? 5 : 10 : 1 > a ? 1 : 2 > a ? 2 : 3 > a ? 3 : 5 > a ? 5 : 10, t = n * r, i >= -20 ? +t.toFixed(0 > i ? -i : 0) : t;
  }

  function Fa(t) {
    return isNaN(t) ? "-" : (t = (t + "").split("."), t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : ""));
  }

  function Ha(t) {
    return null == t ? "" : (t + "").replace(gp, function (t, e) {
      return vp[e];
    });
  }

  function Va(t, e, n) {
    _(e) || (e = [e]);
    var i = e.length;
    if (!i) return "";

    for (var r = e[0].$vars || [], a = 0; a < r.length; a++) {
      var o = mp[a];
      t = t.replace(_p(o), _p(o, 0));
    }

    for (var s = 0; i > s; s++) for (var l = 0; l < r.length; l++) {
      var h = e[s][r[l]];
      t = t.replace(_p(mp[l], s), n ? Ha(h) : h);
    }

    return t;
  }

  function Wa(t, e) {
    t = x(t) ? {
      color: t,
      extraCssText: e
    } : t || {};
    var n = t.color,
        i = t.type,
        e = t.extraCssText,
        r = t.renderMode || "html",
        a = t.markerId || "X";
    return n ? "html" === r ? "subItem" === i ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Ha(n) + ";" + (e || "") + '"></span>' : '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + Ha(n) + ";" + (e || "") + '"></span>' : {
      renderMode: r,
      content: "{marker" + a + "|}  ",
      style: {
        color: n
      }
    } : "";
  }

  function Ga(t, e) {
    return t += "", "0000".substr(0, e - t.length) + t;
  }

  function Ua(t, e, n) {
    ("week" === t || "month" === t || "quarter" === t || "half-year" === t || "year" === t) && (t = "MM-dd\nyyyy");
    var i = Ba(e),
        r = n ? "UTC" : "",
        a = i["get" + r + "FullYear"](),
        o = i["get" + r + "Month"]() + 1,
        s = i["get" + r + "Date"](),
        l = i["get" + r + "Hours"](),
        h = i["get" + r + "Minutes"](),
        u = i["get" + r + "Seconds"](),
        c = i["get" + r + "Milliseconds"]();
    return t = t.replace("MM", Ga(o, 2)).replace("M", o).replace("yyyy", a).replace("yy", a % 100).replace("dd", Ga(s, 2)).replace("d", s).replace("hh", Ga(l, 2)).replace("h", l).replace("mm", Ga(h, 2)).replace("m", h).replace("ss", Ga(u, 2)).replace("s", u).replace("SSS", Ga(c, 3));
  }

  function Xa(t, e, n, i, r) {
    var a = 0,
        o = 0;
    null == i && (i = 1 / 0), null == r && (r = 1 / 0);
    var s = 0;
    e.eachChild(function (l, h) {
      var u,
          c,
          d = l.position,
          f = l.getBoundingRect(),
          p = e.childAt(h + 1),
          g = p && p.getBoundingRect();

      if ("horizontal" === t) {
        var v = f.width + (g ? -g.x + f.x : 0);
        u = a + v, u > i || l.newline ? (a = 0, u = v, o += s + n, s = f.height) : s = Math.max(s, f.height);
      } else {
        var m = f.height + (g ? -g.y + f.y : 0);
        c = o + m, c > r || l.newline ? (a += s + n, o = 0, c = m, s = f.width) : s = Math.max(s, f.width);
      }

      l.newline || (d[0] = a, d[1] = o, "horizontal" === t ? a = u + n : o = c + n);
    });
  }

  function Ya(t, e, n) {
    n = pp(n || 0);
    var i = e.width,
        r = e.height,
        a = Pa(t.left, i),
        o = Pa(t.top, r),
        s = Pa(t.right, i),
        l = Pa(t.bottom, r),
        h = Pa(t.width, i),
        u = Pa(t.height, r),
        c = n[2] + n[0],
        d = n[1] + n[3],
        f = t.aspect;

    switch (isNaN(h) && (h = i - s - d - a), isNaN(u) && (u = r - l - c - o), null != f && (isNaN(h) && isNaN(u) && (f > i / r ? h = .8 * i : u = .8 * r), isNaN(h) && (h = f * u), isNaN(u) && (u = h / f)), isNaN(a) && (a = i - s - h - d), isNaN(o) && (o = r - l - u - c), t.left || t.right) {
      case "center":
        a = i / 2 - h / 2 - n[3];
        break;

      case "right":
        a = i - h - d;
    }

    switch (t.top || t.bottom) {
      case "middle":
      case "center":
        o = r / 2 - u / 2 - n[0];
        break;

      case "bottom":
        o = r - u - c;
    }

    a = a || 0, o = o || 0, isNaN(h) && (h = i - d - a - (s || 0)), isNaN(u) && (u = r - c - o - (l || 0));
    var p = new rn(a + n[3], o + n[0], h, u);
    return p.margin = n, p;
  }

  function qa(t, e, n, i, r) {
    var a = !r || !r.hv || r.hv[0],
        s = !r || !r.hv || r.hv[1],
        l = r && r.boundingMode || "all";

    if (a || s) {
      var h;
      if ("raw" === l) h = "group" === t.type ? new rn(0, 0, +e.width || 0, +e.height || 0) : t.getBoundingRect();else if (h = t.getBoundingRect(), t.needLocalTransform()) {
        var u = t.getLocalTransform();
        h = h.clone(), h.applyTransform(u);
      }
      e = Ya(o({
        width: h.width,
        height: h.height
      }, e), n, i);
      var c = t.position,
          d = a ? e.x - h.x : 0,
          f = s ? e.y - h.y : 0;
      t.attr("position", "raw" === l ? [d, f] : [c[0] + d, c[1] + f]);
    }
  }

  function ja(t, e, n) {
    function i(n, i) {
      var o = {},
          l = 0,
          h = {},
          u = 0,
          c = 2;
      if (yp(n, function (e) {
        h[e] = t[e];
      }), yp(n, function (t) {
        r(e, t) && (o[t] = h[t] = e[t]), a(o, t) && l++, a(h, t) && u++;
      }), s[i]) return a(e, n[1]) ? h[n[2]] = null : a(e, n[2]) && (h[n[1]] = null), h;

      if (u !== c && l) {
        if (l >= c) return o;

        for (var d = 0; d < n.length; d++) {
          var f = n[d];

          if (!r(o, f) && r(t, f)) {
            o[f] = t[f];
            break;
          }
        }

        return o;
      }

      return h;
    }

    function r(t, e) {
      return t.hasOwnProperty(e);
    }

    function a(t, e) {
      return null != t[e] && "auto" !== t[e];
    }

    function o(t, e, n) {
      yp(t, function (t) {
        e[t] = n[t];
      });
    }

    !w(n) && (n = {});
    var s = n.ignoreSize;
    !_(s) && (s = [s, s]);
    var l = i(wp[0], 0),
        h = i(wp[1], 1);
    o(wp[0], t, l), o(wp[1], t, h);
  }

  function Za(t) {
    return $a({}, t);
  }

  function $a(t, e) {
    return e && t && yp(xp, function (n) {
      e.hasOwnProperty(n) && (t[n] = e[n]);
    }), t;
  }

  function Qa(t) {
    var e = [];
    return d(Tp.getClassesByMainType(t), function (t) {
      e = e.concat(t.prototype.dependencies || []);
    }), e = f(e, function (t) {
      return Gi(t).main;
    }), "dataset" !== t && l(e, "dataset") <= 0 && e.unshift("dataset"), e;
  }

  function Ka(t, e) {
    for (var n = t.length, i = 0; n > i; i++) if (t[i].length > e) return t[i];

    return t[n - 1];
  }

  function Ja(t) {
    this.fromDataset = t.fromDataset, this.data = t.data || (t.sourceFormat === Lp ? {} : []), this.sourceFormat = t.sourceFormat || Ep, this.seriesLayoutBy = t.seriesLayoutBy || Rp, this.dimensionsDefine = t.dimensionsDefine, this.encodeDefine = t.encodeDefine && E(t.encodeDefine), this.startIndex = t.startIndex || 0, this.dimensionsDetectCount = t.dimensionsDetectCount;
  }

  function to(t) {
    var e = t.option.source,
        n = Ep;
    if (S(e)) n = Bp;else if (_(e)) {
      0 === e.length && (n = Pp);

      for (var i = 0, r = e.length; r > i; i++) {
        var a = e[i];

        if (null != a) {
          if (_(a)) {
            n = Pp;
            break;
          }

          if (w(a)) {
            n = Op;
            break;
          }
        }
      }
    } else if (w(e)) {
      for (var o in e) if (e.hasOwnProperty(o) && c(e[o])) {
        n = Lp;
        break;
      }
    } else if (null != e) throw new Error("Invalid data");
    Fp(t).sourceFormat = n;
  }

  function eo(t) {
    return Fp(t).source;
  }

  function no(t) {
    Fp(t).datasetMap = E();
  }

  function io(t) {
    var e = t.option,
        n = e.data,
        i = S(n) ? Bp : Ap,
        r = !1,
        a = e.seriesLayoutBy,
        o = e.sourceHeader,
        s = e.dimensions,
        l = ho(t);

    if (l) {
      var h = l.option;
      n = h.source, i = Fp(l).sourceFormat, r = !0, a = a || h.seriesLayoutBy, null == o && (o = h.sourceHeader), s = s || h.dimensions;
    }

    var u = ro(n, i, a, o, s);
    Fp(t).source = new Ja({
      data: n,
      fromDataset: r,
      seriesLayoutBy: a,
      sourceFormat: i,
      dimensionsDefine: u.dimensionsDefine,
      startIndex: u.startIndex,
      dimensionsDetectCount: u.dimensionsDetectCount,
      encodeDefine: e.encode
    });
  }

  function ro(t, e, n, i, r) {
    if (!t) return {
      dimensionsDefine: ao(r)
    };
    var a, o;
    if (e === Pp) "auto" === i || null == i ? oo(function (t) {
      null != t && "-" !== t && (x(t) ? null == o && (o = 1) : o = 0);
    }, n, t, 10) : o = i ? 1 : 0, r || 1 !== o || (r = [], oo(function (t, e) {
      r[e] = null != t ? t : "";
    }, n, t)), a = r ? r.length : n === zp ? t.length : t[0] ? t[0].length : null;else if (e === Op) r || (r = so(t));else if (e === Lp) r || (r = [], d(t, function (t, e) {
      r.push(e);
    }));else if (e === Ap) {
      var s = Ai(t[0]);
      a = _(s) && s.length || 1;
    }
    return {
      startIndex: o,
      dimensionsDefine: ao(r),
      dimensionsDetectCount: a
    };
  }

  function ao(t) {
    if (t) {
      var e = E();
      return f(t, function (t) {
        if (t = a({}, w(t) ? t : {
          name: t
        }), null == t.name) return t;
        t.name += "", null == t.displayName && (t.displayName = t.name);
        var n = e.get(t.name);
        return n ? t.name += "-" + n.count++ : e.set(t.name, {
          count: 1
        }), t;
      });
    }
  }

  function oo(t, e, n, i) {
    if (null == i && (i = 1 / 0), e === zp) for (var r = 0; r < n.length && i > r; r++) t(n[r] ? n[r][0] : null, r);else for (var a = n[0] || [], r = 0; r < a.length && i > r; r++) t(a[r], r);
  }

  function so(t) {
    for (var e, n = 0; n < t.length && !(e = t[n++]););

    if (e) {
      var i = [];
      return d(e, function (t, e) {
        i.push(e);
      }), i;
    }
  }

  function lo(t, e, n) {
    var i = {},
        r = ho(t);
    if (!r) return i;
    var a,
        o = e.sourceFormat,
        s = e.dimensionsDefine;
    (o === Op || o === Lp) && d(s, function (t, e) {
      "name" === (w(t) ? t.name : t) && (a = e);
    });

    var l = function () {
      function t(t) {
        return null != t.v && null != t.n;
      }

      for (var i = {}, r = {}, l = [], h = 0, u = Math.min(5, n); u > h; h++) {
        var c = co(e.data, o, e.seriesLayoutBy, s, e.startIndex, h);
        l.push(c);
        var d = c === Np.Not;
        if (d && null == i.v && h !== a && (i.v = h), (null == i.n || i.n === i.v || !d && l[i.n] === Np.Not) && (i.n = h), t(i) && l[i.n] !== Np.Not) return i;
        d || (c === Np.Might && null == r.v && h !== a && (r.v = h), (null == r.n || r.n === r.v) && (r.n = h));
      }

      return t(i) ? i : t(r) ? r : null;
    }();

    if (l) {
      i.value = l.v;
      var h = null != a ? a : l.n;
      i.itemName = [h], i.seriesName = [h];
    }

    return i;
  }

  function ho(t) {
    var e = t.option,
        n = e.data;
    return n ? void 0 : t.ecModel.getComponent("dataset", e.datasetIndex || 0);
  }

  function uo(t, e) {
    return co(t.data, t.sourceFormat, t.seriesLayoutBy, t.dimensionsDefine, t.startIndex, e);
  }

  function co(t, e, n, i, r, a) {
    function o(t) {
      var e = x(t);
      return null != t && isFinite(t) && "" !== t ? e ? Np.Might : Np.Not : e && "-" !== t ? Np.Must : void 0;
    }

    var s,
        l = 5;
    if (S(t)) return Np.Not;
    var h, u;

    if (i) {
      var c = i[a];
      w(c) ? (h = c.name, u = c.type) : x(c) && (h = c);
    }

    if (null != u) return "ordinal" === u ? Np.Must : Np.Not;
    if (e === Pp) {
      if (n === zp) {
        for (var d = t[a], f = 0; f < (d || []).length && l > f; f++) if (null != (s = o(d[r + f]))) return s;
      } else for (var f = 0; f < t.length && l > f; f++) {
        var p = t[r + f];
        if (p && null != (s = o(p[a]))) return s;
      }
    } else if (e === Op) {
      if (!h) return Np.Not;

      for (var f = 0; f < t.length && l > f; f++) {
        var g = t[f];
        if (g && null != (s = o(g[h]))) return s;
      }
    } else if (e === Lp) {
      if (!h) return Np.Not;
      var d = t[h];
      if (!d || S(d)) return Np.Not;

      for (var f = 0; f < d.length && l > f; f++) if (null != (s = o(d[f]))) return s;
    } else if (e === Ap) for (var f = 0; f < t.length && l > f; f++) {
      var g = t[f],
          v = Ai(g);
      if (!_(v)) return Np.Not;
      if (null != (s = o(v[a]))) return s;
    }
    return Np.Not;
  }

  function fo(t, e) {
    if (e) {
      var n = e.seiresIndex,
          i = e.seriesId,
          r = e.seriesName;
      return null != n && t.componentIndex !== n || null != i && t.id !== i || null != r && t.name !== r;
    }
  }

  function po(t, e) {
    var n = t.color && !t.colorLayer;
    d(e, function (e, a) {
      "colorLayer" === a && n || Tp.hasClass(a) || ("object" == typeof e ? t[a] = t[a] ? r(t[a], e, !1) : i(e) : null == t[a] && (t[a] = e));
    });
  }

  function go(t) {
    t = t, this.option = {}, this.option[Hp] = 1, this._componentsMap = E({
      series: []
    }), this._seriesIndices, this._seriesIndicesMap, po(t, this._theme.option), r(t, Cp, !1), this.mergeOption(t);
  }

  function vo(t, e) {
    _(e) || (e = e ? [e] : []);
    var n = {};
    return d(e, function (e) {
      n[e] = (t.get(e) || []).slice();
    }), n;
  }

  function mo(t, e, n) {
    var i = e.type ? e.type : n ? n.subType : Tp.determineSubType(t, e);
    return i;
  }

  function _o(t, e) {
    t._seriesIndicesMap = E(t._seriesIndices = f(e, function (t) {
      return t.componentIndex;
    }) || []);
  }

  function yo(t, e) {
    return e.hasOwnProperty("subType") ? g(t, function (t) {
      return t.subType === e.subType;
    }) : t;
  }

  function xo(t) {
    d(Wp, function (e) {
      this[e] = v(t[e], t);
    }, this);
  }

  function wo() {
    this._coordinateSystems = [];
  }

  function bo(t) {
    this._api = t, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, this._currentMediaIndices = [], this._optionBackup, this._newBaseOption;
  }

  function So(t, e, n) {
    var i,
        r,
        a = [],
        o = [],
        s = t.timeline;

    if (t.baseOption && (r = t.baseOption), (s || t.options) && (r = r || {}, a = (t.options || []).slice()), t.media) {
      r = r || {};
      var l = t.media;
      Up(l, function (t) {
        t && t.option && (t.query ? o.push(t) : i || (i = t));
      });
    }

    return r || (r = t), r.timeline || (r.timeline = s), Up([r].concat(a).concat(f(o, function (t) {
      return t.option;
    })), function (t) {
      Up(e, function (e) {
        e(t, n);
      });
    }), {
      baseOption: r,
      timelineOptions: a,
      mediaDefault: i,
      mediaList: o
    };
  }

  function Mo(t, e, n) {
    var i = {
      width: e,
      height: n,
      aspectratio: e / n
    },
        r = !0;
    return d(t, function (t, e) {
      var n = e.match(jp);

      if (n && n[1] && n[2]) {
        var a = n[1],
            o = n[2].toLowerCase();
        To(i[o], t, a) || (r = !1);
      }
    }), r;
  }

  function To(t, e, n) {
    return "min" === n ? t >= e : "max" === n ? e >= t : t === e;
  }

  function Io(t, e) {
    return t.join(",") === e.join(",");
  }

  function Co(t, e) {
    e = e || {}, Up(e, function (e, n) {
      if (null != e) {
        var i = t[n];

        if (Tp.hasClass(n)) {
          e = ki(e), i = ki(i);
          var r = Oi(i, e);
          t[n] = Yp(r, function (t) {
            return t.option && t.exist ? qp(t.exist, t.option, !0) : t.exist || t.option;
          });
        } else t[n] = qp(i, e, !0);
      }
    });
  }

  function ko(t) {
    var e = t && t.itemStyle;
    if (e) for (var n = 0, i = Qp.length; i > n; n++) {
      var a = Qp[n],
          o = e.normal,
          s = e.emphasis;
      o && o[a] && (t[a] = t[a] || {}, t[a].normal ? r(t[a].normal, o[a]) : t[a].normal = o[a], o[a] = null), s && s[a] && (t[a] = t[a] || {}, t[a].emphasis ? r(t[a].emphasis, s[a]) : t[a].emphasis = s[a], s[a] = null);
    }
  }

  function Do(t, e, n) {
    if (t && t[e] && (t[e].normal || t[e].emphasis)) {
      var i = t[e].normal,
          r = t[e].emphasis;
      i && (n ? (t[e].normal = t[e].emphasis = null, o(t[e], i)) : t[e] = i), r && (t.emphasis = t.emphasis || {}, t.emphasis[e] = r);
    }
  }

  function Ao(t) {
    Do(t, "itemStyle"), Do(t, "lineStyle"), Do(t, "areaStyle"), Do(t, "label"), Do(t, "labelLine"), Do(t, "upperLabel"), Do(t, "edgeLabel");
  }

  function Po(t, e) {
    var n = $p(t) && t[e],
        i = $p(n) && n.textStyle;
    if (i) for (var r = 0, a = vd.length; a > r; r++) {
      var e = vd[r];
      i.hasOwnProperty(e) && (n[e] = i[e]);
    }
  }

  function Oo(t) {
    t && (Ao(t), Po(t, "label"), t.emphasis && Po(t.emphasis, "label"));
  }

  function Lo(t) {
    if ($p(t)) {
      ko(t), Ao(t), Po(t, "label"), Po(t, "upperLabel"), Po(t, "edgeLabel"), t.emphasis && (Po(t.emphasis, "label"), Po(t.emphasis, "upperLabel"), Po(t.emphasis, "edgeLabel"));
      var e = t.markPoint;
      e && (ko(e), Oo(e));
      var n = t.markLine;
      n && (ko(n), Oo(n));
      var i = t.markArea;
      i && Oo(i);
      var r = t.data;

      if ("graph" === t.type) {
        r = r || t.nodes;
        var a = t.links || t.edges;
        if (a && !S(a)) for (var o = 0; o < a.length; o++) Oo(a[o]);
        d(t.categories, function (t) {
          Ao(t);
        });
      }

      if (r && !S(r)) for (var o = 0; o < r.length; o++) Oo(r[o]);
      var e = t.markPoint;
      if (e && e.data) for (var s = e.data, o = 0; o < s.length; o++) Oo(s[o]);
      var n = t.markLine;
      if (n && n.data) for (var l = n.data, o = 0; o < l.length; o++) _(l[o]) ? (Oo(l[o][0]), Oo(l[o][1])) : Oo(l[o]);
      "gauge" === t.type ? (Po(t, "axisLabel"), Po(t, "title"), Po(t, "detail")) : "treemap" === t.type ? (Do(t.breadcrumb, "itemStyle"), d(t.levels, function (t) {
        Ao(t);
      })) : "tree" === t.type && Ao(t.leaves);
    }
  }

  function Eo(t) {
    return _(t) ? t : t ? [t] : [];
  }

  function Bo(t) {
    return (_(t) ? t[0] : t) || {};
  }

  function Ro(t, e) {
    e = e.split(",");

    for (var n = t, i = 0; i < e.length && (n = n && n[e[i]], null != n); i++);

    return n;
  }

  function zo(t, e, n, i) {
    e = e.split(",");

    for (var r, a = t, o = 0; o < e.length - 1; o++) r = e[o], null == a[r] && (a[r] = {}), a = a[r];

    (i || null == a[e[o]]) && (a[e[o]] = n);
  }

  function No(t) {
    d(Jp, function (e) {
      e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]]);
    });
  }

  function Fo(t) {
    d(t, function (e, n) {
      var i = [],
          r = [0 / 0, 0 / 0],
          a = [e.stackResultDimension, e.stackedOverDimension],
          o = e.data,
          s = e.isStackedByIndex,
          l = o.map(a, function (a, l, h) {
        var u = o.get(e.stackedDimension, h);
        if (isNaN(u)) return r;
        var c, d;
        s ? d = o.getRawIndex(h) : c = o.get(e.stackedByDimension, h);

        for (var f = 0 / 0, p = n - 1; p >= 0; p--) {
          var g = t[p];

          if (s || (d = g.data.rawIndexOf(g.stackedByDimension, c)), d >= 0) {
            var v = g.data.getByRawIndex(g.stackResultDimension, d);

            if (u >= 0 && v > 0 || 0 >= u && 0 > v) {
              u += v, f = v;
              break;
            }
          }
        }

        return i[0] = u, i[1] = f, i;
      });
      o.hostModel.setData(l), e.data = l;
    });
  }

  function Ho(t, e) {
    Ja.isInstance(t) || (t = Ja.seriesDataToSource(t)), this._source = t;
    var n = this._data = t.data,
        i = t.sourceFormat;
    i === Bp && (this._offset = 0, this._dimSize = e, this._data = n);
    var r = rg[i === Pp ? i + "_" + t.seriesLayoutBy : i];
    a(this, r);
  }

  function Vo() {
    return this._data.length;
  }

  function Wo(t) {
    return this._data[t];
  }

  function Go(t) {
    for (var e = 0; e < t.length; e++) this._data.push(t[e]);
  }

  function Uo(t, e, n) {
    return null != n ? t[n] : t;
  }

  function Xo(t, e, n, i) {
    return Yo(t[i], this._dimensionInfos[e]);
  }

  function Yo(t, e) {
    var n = e && e.type;

    if ("ordinal" === n) {
      var i = e && e.ordinalMeta;
      return i ? i.parseAndCollect(t) : t;
    }

    return "time" === n && "number" != typeof t && null != t && "-" !== t && (t = +Ba(t)), null == t || "" === t ? 0 / 0 : +t;
  }

  function qo(t, e, n) {
    if (t) {
      var i = t.getRawDataItem(e);

      if (null != i) {
        var r,
            a,
            o = t.getProvider().getSource().sourceFormat,
            s = t.getDimensionInfo(n);
        return s && (r = s.name, a = s.index), ag[o](i, e, a, r);
      }
    }
  }

  function jo(t, e, n) {
    if (t) {
      var i = t.getProvider().getSource().sourceFormat;

      if (i === Ap || i === Op) {
        var r = t.getRawDataItem(e);
        return i !== Ap || w(r) || (r = null), r ? r[n] : void 0;
      }
    }
  }

  function Zo(t) {
    return new $o(t);
  }

  function $o(t) {
    t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !0, this.context;
  }

  function Qo(t, e, n, i, r, a) {
    ug.reset(n, i, r, a), t._callingProgress = e, t._callingProgress({
      start: n,
      end: i,
      count: i - n,
      next: ug.next
    }, t.context);
  }

  function Ko(t, e) {
    t._dueIndex = t._outputDueEnd = t._dueEnd = 0, t._settedOutputEnd = null;
    var n, i;
    !e && t._reset && (n = t._reset(t.context), n && n.progress && (i = n.forceFirstProgress, n = n.progress), _(n) && !n.length && (n = null)), t._progress = n, t._modBy = t._modDataCount = null;
    var r = t._downstream;
    return r && r.dirty(), i;
  }

  function Jo(t) {
    var e = t.name;
    Ei(t) || (t.name = ts(t) || e);
  }

  function ts(t) {
    var e = t.getRawData(),
        n = e.mapDimension("seriesName", !0),
        i = [];
    return d(n, function (t) {
      var n = e.getDimensionInfo(t);
      n.displayName && i.push(n.displayName);
    }), i.join(" ");
  }

  function es(t) {
    return t.model.getRawData().count();
  }

  function ns(t) {
    var e = t.model;
    return e.setData(e.getRawData().cloneShallow()), is;
  }

  function is(t, e) {
    t.end > e.outputData.count() && e.model.getRawData().cloneShallow(e.outputData);
  }

  function rs(t, e) {
    d(t.CHANGABLE_METHODS, function (n) {
      t.wrapMethod(n, m(as, e));
    });
  }

  function as(t) {
    var e = os(t);
    e && e.setOutputEnd(this.count());
  }

  function os(t) {
    var e = (t.ecModel || {}).scheduler,
        n = e && e.getPipeline(t.uid);

    if (n) {
      var i = n.currentTask;

      if (i) {
        var r = i.agentStubMap;
        r && (i = r.get(t.uid));
      }

      return i;
    }
  }

  function ss() {
    this.group = new vc(), this.uid = Ia("viewChart"), this.renderTask = Zo({
      plan: us,
      reset: cs
    }), this.renderTask.context = {
      view: this
    };
  }

  function ls(t, e, n) {
    if (t && (t.trigger(e, n), t.isGroup && !la(t))) for (var i = 0, r = t.childCount(); r > i; i++) ls(t.childAt(i), e, n);
  }

  function hs(t, e, n) {
    var i = Ri(t, e),
        r = e && null != e.highlightKey ? ha(e.highlightKey) : null;
    null != i ? d(ki(i), function (e) {
      ls(t.getItemGraphicEl(e), n, r);
    }) : t.eachItemGraphicEl(function (t) {
      ls(t, n, r);
    });
  }

  function us(t) {
    return mg(t.model);
  }

  function cs(t) {
    var e = t.model,
        n = t.ecModel,
        i = t.api,
        r = t.payload,
        a = e.pipelineContext.progressiveRender,
        o = t.view,
        s = r && vg(r).updateMethod,
        l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
    return "render" !== l && o[l](e, n, i, r), yg[l];
  }

  function ds(t, e, n) {
    function i() {
      u = new Date().getTime(), c = null, t.apply(o, s || []);
    }

    var r,
        a,
        o,
        s,
        l,
        h = 0,
        u = 0,
        c = null;
    e = e || 0;

    var d = function () {
      r = new Date().getTime(), o = this, s = arguments;
      var t = l || e,
          d = l || n;
      l = null, a = r - (d ? h : u) - t, clearTimeout(c), d ? c = setTimeout(i, t) : a >= 0 ? i() : c = setTimeout(i, -a), h = r;
    };

    return d.clear = function () {
      c && (clearTimeout(c), c = null);
    }, d.debounceNextCall = function (t) {
      l = t;
    }, d;
  }

  function fs(t, e, n, i) {
    this.ecInstance = t, this.api = e, this.unfinished;
    var n = this._dataProcessorHandlers = n.slice(),
        i = this._visualHandlers = i.slice();
    this._allHandlers = n.concat(i), this._stageTaskMap = E();
  }

  function ps(t, e, n, i, r) {
    function a(t, e) {
      return t.setDirty && (!t.dirtyMap || t.dirtyMap.get(e.__pipeline.id));
    }

    r = r || {};
    var o;
    d(e, function (e) {
      if (!r.visualType || r.visualType === e.visualType) {
        var s = t._stageTaskMap.get(e.uid),
            l = s.seriesTaskMap,
            h = s.overallTask;

        if (h) {
          var u,
              c = h.agentStubMap;
          c.each(function (t) {
            a(r, t) && (t.dirty(), u = !0);
          }), u && h.dirty(), Ig(h, i);
          var d = t.getPerformArgs(h, r.block);
          c.each(function (t) {
            t.perform(d);
          }), o |= h.perform(d);
        } else l && l.each(function (s) {
          a(r, s) && s.dirty();
          var l = t.getPerformArgs(s, r.block);
          l.skip = !e.performRawSeries && n.isSeriesFiltered(s.context.model), Ig(s, i), o |= s.perform(l);
        });
      }
    }), t.unfinished |= o;
  }

  function gs(t, e, n, i, r) {
    function a(n) {
      var a = n.uid,
          s = o.get(a) || o.set(a, Zo({
        plan: ws,
        reset: bs,
        count: Ms
      }));
      s.context = {
        model: n,
        ecModel: i,
        api: r,
        useClearVisual: e.isVisual && !e.isLayout,
        plan: e.plan,
        reset: e.reset,
        scheduler: t
      }, Ts(t, n, s);
    }

    var o = n.seriesTaskMap || (n.seriesTaskMap = E()),
        s = e.seriesType,
        l = e.getTargetSeries;
    e.createOnAllSeries ? i.eachRawSeries(a) : s ? i.eachRawSeriesByType(s, a) : l && l(i, r).each(a);
    var h = t._pipelineMap;
    o.each(function (t, e) {
      h.get(e) || (t.dispose(), o.removeKey(e));
    });
  }

  function vs(t, e, n, i, r) {
    function a(e) {
      var n = e.uid,
          i = s.get(n);
      i || (i = s.set(n, Zo({
        reset: _s,
        onDirty: xs
      })), o.dirty()), i.context = {
        model: e,
        overallProgress: u,
        modifyOutputEnd: c
      }, i.agent = o, i.__block = u, Ts(t, e, i);
    }

    var o = n.overallTask = n.overallTask || Zo({
      reset: ms
    });
    o.context = {
      ecModel: i,
      api: r,
      overallReset: e.overallReset,
      scheduler: t
    };
    var s = o.agentStubMap = o.agentStubMap || E(),
        l = e.seriesType,
        h = e.getTargetSeries,
        u = !0,
        c = e.modifyOutputEnd;
    l ? i.eachRawSeriesByType(l, a) : h ? h(i, r).each(a) : (u = !1, d(i.getSeries(), a));
    var f = t._pipelineMap;
    s.each(function (t, e) {
      f.get(e) || (t.dispose(), o.dirty(), s.removeKey(e));
    });
  }

  function ms(t) {
    t.overallReset(t.ecModel, t.api, t.payload);
  }

  function _s(t) {
    return t.overallProgress && ys;
  }

  function ys() {
    this.agent.dirty(), this.getDownstream().dirty();
  }

  function xs() {
    this.agent && this.agent.dirty();
  }

  function ws(t) {
    return t.plan && t.plan(t.model, t.ecModel, t.api, t.payload);
  }

  function bs(t) {
    t.useClearVisual && t.data.clearAllVisual();
    var e = t.resetDefines = ki(t.reset(t.model, t.ecModel, t.api, t.payload));
    return e.length > 1 ? f(e, function (t, e) {
      return Ss(e);
    }) : Cg;
  }

  function Ss(t) {
    return function (e, n) {
      var i = n.data,
          r = n.resetDefines[t];
      if (r && r.dataEach) for (var a = e.start; a < e.end; a++) r.dataEach(i, a);else r && r.progress && r.progress(e, i);
    };
  }

  function Ms(t) {
    return t.data.count();
  }

  function Ts(t, e, n) {
    var i = e.uid,
        r = t._pipelineMap.get(i);

    !r.head && (r.head = n), r.tail && r.tail.pipe(n), r.tail = n, n.__idxInPipeline = r.count++, n.__pipeline = r;
  }

  function Is(t) {
    kg = null;

    try {
      t(Dg, Ag);
    } catch (e) {}

    return kg;
  }

  function Cs(t, e) {
    for (var n in e.prototype) t[n] = B;
  }

  function ks(t) {
    if (x(t)) {
      var e = new DOMParser();
      t = e.parseFromString(t, "text/xml");
    }

    for (9 === t.nodeType && (t = t.firstChild); "svg" !== t.nodeName.toLowerCase() || 1 !== t.nodeType;) t = t.nextSibling;

    return t;
  }

  function Ds() {
    this._defs = {}, this._root = null, this._isDefine = !1, this._isText = !1;
  }

  function As(t, e) {
    for (var n = t.firstChild; n;) {
      if (1 === n.nodeType) {
        var i = n.getAttribute("offset");
        i = i.indexOf("%") > 0 ? parseInt(i, 10) / 100 : i ? parseFloat(i) : 0;
        var r = n.getAttribute("stop-color") || "#000000";
        e.addColorStop(i, r);
      }

      n = n.nextSibling;
    }
  }

  function Ps(t, e) {
    t && t.__inheritedStyle && (e.__inheritedStyle || (e.__inheritedStyle = {}), o(e.__inheritedStyle, t.__inheritedStyle));
  }

  function Os(t) {
    for (var e = A(t).split(Ng), n = [], i = 0; i < e.length; i += 2) {
      var r = parseFloat(e[i]),
          a = parseFloat(e[i + 1]);
      n.push([r, a]);
    }

    return n;
  }

  function Ls(t, e, n, i) {
    var r = e.__inheritedStyle || {},
        o = "text" === e.type;
    if (1 === t.nodeType && (Bs(t, e), a(r, Rs(t)), !i)) for (var s in Vg) if (Vg.hasOwnProperty(s)) {
      var l = t.getAttribute(s);
      null != l && (r[Vg[s]] = l);
    }
    var h = o ? "textFill" : "fill",
        u = o ? "textStroke" : "stroke";
    e.style = e.style || new Tc();
    var c = e.style;
    null != r.fill && c.set(h, Es(r.fill, n)), null != r.stroke && c.set(u, Es(r.stroke, n)), d(["lineWidth", "opacity", "fillOpacity", "strokeOpacity", "miterLimit", "fontSize"], function (t) {
      var e = "lineWidth" === t && o ? "textStrokeWidth" : t;
      null != r[t] && c.set(e, parseFloat(r[t]));
    }), r.textBaseline && "auto" !== r.textBaseline || (r.textBaseline = "alphabetic"), "alphabetic" === r.textBaseline && (r.textBaseline = "bottom"), "start" === r.textAlign && (r.textAlign = "left"), "end" === r.textAlign && (r.textAlign = "right"), d(["lineDashOffset", "lineCap", "lineJoin", "fontWeight", "fontFamily", "fontStyle", "textAlign", "textBaseline"], function (t) {
      null != r[t] && c.set(t, r[t]);
    }), r.lineDash && (e.style.lineDash = A(r.lineDash).split(Ng)), c[u] && "none" !== c[u] && (e[u] = !0), e.__inheritedStyle = r;
  }

  function Es(t, e) {
    var n = e && t && t.match(Wg);

    if (n) {
      var i = A(n[1]),
          r = e[i];
      return r;
    }

    return t;
  }

  function Bs(t, e) {
    var n = t.getAttribute("transform");

    if (n) {
      n = n.replace(/,/g, " ");
      var i = null,
          r = [];
      n.replace(Gg, function (t, e, n) {
        r.push(e, n);
      });

      for (var a = r.length - 1; a > 0; a -= 2) {
        var o = r[a],
            s = r[a - 1];

        switch (i = i || _e(), s) {
          case "translate":
            o = A(o).split(Ng), be(i, i, [parseFloat(o[0]), parseFloat(o[1] || 0)]);
            break;

          case "scale":
            o = A(o).split(Ng), Me(i, i, [parseFloat(o[0]), parseFloat(o[1] || o[0])]);
            break;

          case "rotate":
            o = A(o).split(Ng), Se(i, i, parseFloat(o[0]));
            break;

          case "skew":
            o = A(o).split(Ng), console.warn("Skew transform is not supported yet");
            break;

          case "matrix":
            var o = A(o).split(Ng);
            i[0] = parseFloat(o[0]), i[1] = parseFloat(o[1]), i[2] = parseFloat(o[2]), i[3] = parseFloat(o[3]), i[4] = parseFloat(o[4]), i[5] = parseFloat(o[5]);
        }
      }

      e.setLocalTransform(i);
    }
  }

  function Rs(t) {
    var e = t.getAttribute("style"),
        n = {};
    if (!e) return n;
    var i = {};
    Ug.lastIndex = 0;

    for (var r; null != (r = Ug.exec(e));) i[r[1]] = r[2];

    for (var a in Vg) Vg.hasOwnProperty(a) && null != i[a] && (n[Vg[a]] = i[a]);

    return n;
  }

  function zs(t, e, n) {
    var i = e / t.width,
        r = n / t.height,
        a = Math.min(i, r),
        o = [a, a],
        s = [-(t.x + t.width / 2) * a + e / 2, -(t.y + t.height / 2) * a + n / 2];
    return {
      scale: o,
      position: s
    };
  }

  function Ns(t, e) {
    return function (n, i, r) {
      (e || !this._disposed) && (n = n && n.toLowerCase(), Du.prototype[t].call(this, n, i, r));
    };
  }

  function Fs() {
    Du.call(this);
  }

  function Hs(t, e, n) {
    function r(t, e) {
      return t.__prio - e.__prio;
    }

    n = n || {}, "string" == typeof e && (e = Iv[e]), this.id, this.group, this._dom = t;
    var a = "canvas",
        o = this._zr = Ii(t, {
      renderer: n.renderer || a,
      devicePixelRatio: n.devicePixelRatio,
      width: n.width,
      height: n.height
    });
    this._throttledZrFlush = ds(v(o.flush, o), 17);
    var e = i(e);
    e && eg(e, !0), this._theme = e, this._chartsViews = [], this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, this._coordSysMgr = new wo();
    var s = this._api = rl(this);
    dn(Tv, r), dn(bv, r), this._scheduler = new fs(this, s, bv, Tv), Du.call(this, this._ecEventProcessor = new al()), this._messageCenter = new Fs(), this._initEvents(), this.resize = v(this.resize, this), this._pendingActions = [], o.animation.on("frame", this._onframe, this), js(o, this), P(this);
  }

  function Vs(t, e, n) {
    if (!this._disposed) {
      var i,
          r = this._model,
          a = this._coordSysMgr.getCoordinateSystems();

      e = Ni(r, e);

      for (var o = 0; o < a.length; o++) {
        var s = a[o];
        if (s[t] && null != (i = s[t](r, e, n))) return i;
      }
    }
  }

  function Ws(t) {
    var e = t._model,
        n = t._scheduler;
    n.restorePipelines(e), n.prepareStageTasks(), Zs(t, "component", e, n), Zs(t, "chart", e, n), n.plan();
  }

  function Gs(t, e, n, i, r) {
    function a(i) {
      i && i.__alive && i[e] && i[e](i.__model, o, t._api, n);
    }

    var o = t._model;
    if (!i) return void Zg(t._componentsViews.concat(t._chartsViews), a);
    var s = {};
    s[i + "Id"] = n[i + "Id"], s[i + "Index"] = n[i + "Index"], s[i + "Name"] = n[i + "Name"];
    var l = {
      mainType: i,
      query: s
    };
    r && (l.subType = r);
    var h = n.excludeSeriesId;
    null != h && (h = E(ki(h))), o && o.eachComponent(l, function (e) {
      h && null != h.get(e.id) || a(t["series" === i ? "_chartsMap" : "_componentsMap"][e.__viewId]);
    }, t);
  }

  function Us(t, e) {
    var n = t._chartsMap,
        i = t._scheduler;
    e.eachSeries(function (t) {
      i.updateStreamModes(t, n[t.__viewId]);
    });
  }

  function Xs(t, e) {
    var n = t.type,
        i = t.escapeConnect,
        r = xv[n],
        s = r.actionInfo,
        l = (s.update || "update").split(":"),
        h = l.pop();
    l = null != l[0] && Kg(l[0]), this[pv] = !0;
    var u = [t],
        c = !1;
    t.batch && (c = !0, u = f(t.batch, function (e) {
      return e = o(a({}, e), t), e.batch = null, e;
    }));
    var d,
        p = [],
        g = "highlight" === n || "downplay" === n;
    Zg(u, function (t) {
      d = r.action(t, this._model, this._api), d = d || a({}, t), d.type = s.event || d.type, p.push(d), g ? Gs(this, h, t, "series") : l && Gs(this, h, t, l.main, l.sub);
    }, this), "none" === h || g || l || (this[gv] ? (Ws(this), _v.update.call(this, t), this[gv] = !1) : _v[h].call(this, t)), d = c ? {
      type: s.event || n,
      escapeConnect: i,
      batch: p
    } : p[0], this[pv] = !1, !e && this._messageCenter.trigger(d.type, d);
  }

  function Ys(t) {
    for (var e = this._pendingActions; e.length;) {
      var n = e.shift();
      Xs.call(this, n, t);
    }
  }

  function qs(t) {
    !t && this.trigger("updated");
  }

  function js(t, e) {
    t.on("rendered", function () {
      e.trigger("rendered"), !t.animation.isFinished() || e[gv] || e._scheduler.unfinished || e._pendingActions.length || e.trigger("finished");
    });
  }

  function Zs(t, e, n, i) {
    function r(t) {
      var e = "_ec_" + t.id + "_" + t.type,
          r = s[e];

      if (!r) {
        var u = Kg(t.type),
            c = a ? fg.getClass(u.main, u.sub) : ss.getClass(u.sub);
        r = new c(), r.init(n, h), s[e] = r, o.push(r), l.add(r.group);
      }

      t.__viewId = r.__id = e, r.__alive = !0, r.__model = t, r.group.__ecComponentInfo = {
        mainType: t.mainType,
        index: t.componentIndex
      }, !a && i.prepareView(r, t, n, h);
    }

    for (var a = "component" === e, o = a ? t._componentsViews : t._chartsViews, s = a ? t._componentsMap : t._chartsMap, l = t._zr, h = t._api, u = 0; u < o.length; u++) o[u].__alive = !1;

    a ? n.eachComponent(function (t, e) {
      "series" !== t && r(e);
    }) : n.eachSeries(r);

    for (var u = 0; u < o.length;) {
      var c = o[u];
      c.__alive ? u++ : (!a && c.renderTask.dispose(), l.remove(c.group), c.dispose(n, h), o.splice(u, 1), delete s[c.__id], c.__id = c.group.__ecComponentInfo = null);
    }
  }

  function $s(t) {
    t.clearColorPalette(), t.eachSeries(function (t) {
      t.clearColorPalette();
    });
  }

  function Qs(t, e, n, i) {
    Ks(t, e, n, i), Zg(t._chartsViews, function (t) {
      t.__alive = !1;
    }), Js(t, e, n, i), Zg(t._chartsViews, function (t) {
      t.__alive || t.remove(e, n);
    });
  }

  function Ks(t, e, n, i, r) {
    Zg(r || t._componentsViews, function (t) {
      var r = t.__model;
      t.render(r, e, n, i), il(r, t);
    });
  }

  function Js(t, e, n, i, r) {
    var a,
        o = t._scheduler;
    e.eachSeries(function (e) {
      var n = t._chartsMap[e.__viewId];
      n.__alive = !0;
      var s = n.renderTask;
      o.updatePayload(s, i), r && r.get(e.uid) && s.dirty(), a |= s.perform(o.getPerformArgs(s)), n.group.silent = !!e.get("silent"), il(e, n), nl(e, n);
    }), o.unfinished |= a, el(t, e), bg(t._zr.dom, e);
  }

  function tl(t, e) {
    Zg(Mv, function (n) {
      n(t, e);
    });
  }

  function el(t, e) {
    var n = t._zr,
        i = n.storage,
        r = 0;
    i.traverse(function () {
      r++;
    }), r > e.get("hoverLayerThreshold") && !cu.node && e.eachSeries(function (e) {
      if (!e.preventUsingHoverLayer) {
        var n = t._chartsMap[e.__viewId];
        n.__alive && n.group.traverse(function (t) {
          t.useHoverLayer = !0;
        });
      }
    });
  }

  function nl(t, e) {
    var n = t.get("blendMode") || null;
    e.group.traverse(function (t) {
      t.isGroup || t.style.blend !== n && t.setStyle("blend", n), t.eachPendingDisplayable && t.eachPendingDisplayable(function (t) {
        t.setStyle("blend", n);
      });
    });
  }

  function il(t, e) {
    var n = t.get("z"),
        i = t.get("zlevel");
    e.group.traverse(function (t) {
      "group" !== t.type && (null != n && (t.z = n), null != i && (t.zlevel = i));
    });
  }

  function rl(t) {
    var e = t._coordSysMgr;
    return a(new xo(t), {
      getCoordinateSystems: v(e.getCoordinateSystems, e),
      getComponentByElement: function (e) {
        for (; e;) {
          var n = e.__ecComponentInfo;
          if (null != n) return t._model.getComponent(n.mainType, n.index);
          e = e.parent;
        }
      }
    });
  }

  function al() {
    this.eventInfo;
  }

  function ol(t) {
    function e(t, e) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        i[a] = e;
      }
    }

    var n = 0,
        i = 1,
        r = 2,
        a = "__connectUpdateStatus";
    Zg(wv, function (o, s) {
      t._messageCenter.on(s, function (o) {
        if (Dv[t.group] && t[a] !== n) {
          if (o && o.escapeConnect) return;
          var s = t.makeActionFromEvent(o),
              l = [];
          Zg(kv, function (e) {
            e !== t && e.group === t.group && l.push(e);
          }), e(l, n), Zg(l, function (t) {
            t[a] !== i && t.dispatchAction(s);
          }), e(l, r);
        }
      });
    });
  }

  function sl(t, e, n) {
    var i = cl(t);
    if (i) return i;
    var r = new Hs(t, e, n);
    return r.id = "ec_" + Av++, kv[r.id] = r, Hi(t, Ov, r.id), ol(r), r;
  }

  function ll(t) {
    if (_(t)) {
      var e = t;
      t = null, Zg(e, function (e) {
        null != e.group && (t = e.group);
      }), t = t || "g_" + Pv++, Zg(e, function (e) {
        e.group = t;
      });
    }

    return Dv[t] = !0, t;
  }

  function hl(t) {
    Dv[t] = !1;
  }

  function ul(t) {
    "string" == typeof t ? t = kv[t] : t instanceof Hs || (t = cl(t)), t instanceof Hs && !t.isDisposed() && t.dispose();
  }

  function cl(t) {
    return kv[Vi(t, Ov)];
  }

  function dl(t) {
    return kv[t];
  }

  function fl(t, e) {
    Iv[t] = e;
  }

  function pl(t) {
    Sv.push(t);
  }

  function gl(t, e) {
    bl(bv, t, e, nv);
  }

  function vl(t) {
    Mv.push(t);
  }

  function ml(t, e, n) {
    "function" == typeof e && (n = e, e = "");
    var i = Qg(t) ? t.type : [t, t = {
      event: e
    }][0];
    t.event = (t.event || i).toLowerCase(), e = t.event, jg(vv.test(i) && vv.test(e)), xv[i] || (xv[i] = {
      action: n,
      actionInfo: t
    }), wv[e] = i;
  }

  function _l(t, e) {
    wo.register(t, e);
  }

  function yl(t) {
    var e = wo.get(t);
    return e ? e.getDimensionsInfo ? e.getDimensionsInfo() : e.dimensions.slice() : void 0;
  }

  function xl(t, e) {
    bl(Tv, t, e, ov, "layout");
  }

  function wl(t, e) {
    bl(Tv, t, e, hv, "visual");
  }

  function bl(t, e, n, i, r) {
    ($g(e) || Qg(e)) && (n = e, e = i);
    var a = fs.wrapStageHandler(n, r);
    return a.__prio = e, a.__raw = n, t.push(a), a;
  }

  function Sl(t, e) {
    Cv[t] = e;
  }

  function Ml(t) {
    return Tp.extend(t);
  }

  function Tl(t) {
    return fg.extend(t);
  }

  function Il(t) {
    return dg.extend(t);
  }

  function Cl(t) {
    return ss.extend(t);
  }

  function kl(t) {
    n("createCanvas", t);
  }

  function Dl(t, e, n) {
    Yg.registerMap(t, e, n);
  }

  function Al(t) {
    var e = Yg.retrieveMap(t);
    return e && e[0] && {
      geoJson: e[0].geoJSON,
      specialAreas: e[0].specialAreas
    };
  }

  function Pl(t) {
    var e = {},
        n = e.encode = {},
        i = E(),
        r = [],
        a = [],
        o = e.userOutput = {
      dimensionNames: t.dimensions.slice(),
      encode: {}
    };
    d(t.dimensions, function (e) {
      var s = t.getDimensionInfo(e),
          l = s.coordDim;

      if (l) {
        var h = s.coordDimIndex;
        Ol(n, l)[h] = e, s.isExtraCoord || (i.set(l, 1), Ll(s.type) && (r[0] = e), Ol(o.encode, l)[h] = s.index), s.defaultTooltip && a.push(e);
      }

      Bv.each(function (t, e) {
        var i = Ol(n, e),
            r = s.otherDims[e];
        null != r && r !== !1 && (i[r] = s.name);
      });
    });
    var s = [],
        l = {};
    i.each(function (t, e) {
      var i = n[e];
      l[e] = i[0], s = s.concat(i);
    }), e.dataDimsOnCoord = s, e.encodeFirstDimNotExtra = l;
    var h = n.label;
    h && h.length && (r = h.slice());
    var u = n.tooltip;
    return u && u.length ? a = u.slice() : a.length || (a = r.slice()), n.defaultedLabel = r, n.defaultedTooltip = a, e;
  }

  function Ol(t, e) {
    return t.hasOwnProperty(e) || (t[e] = []), t[e];
  }

  function Ll(t) {
    return !("ordinal" === t || "time" === t);
  }

  function El(t) {
    null != t && a(this, t), this.otherDims = {};
  }

  function Bl(t, e, n) {
    function r(t, e, n) {
      null != Bv.get(e) ? t.otherDims[e] = n : (t.coordDim = e, t.coordDimIndex = n, h.set(e, !0));
    }

    Ja.isInstance(e) || (e = Ja.seriesDataToSource(e)), n = n || {}, t = (t || []).slice();

    for (var s = (n.dimsDef || []).slice(), l = E(), h = E(), u = [], c = Rl(e, t, s, n.dimCount), f = 0; c > f; f++) {
      var p = s[f] = a({}, w(s[f]) ? s[f] : {
        name: s[f]
      }),
          g = p.name,
          v = u[f] = new El();
      null != g && null == l.get(g) && (v.name = v.displayName = g, l.set(g, f)), null != p.type && (v.type = p.type), null != p.displayName && (v.displayName = p.displayName);
    }

    var m = n.encodeDef;
    !m && n.encodeDefaulter && (m = n.encodeDefaulter(e, c)), m = E(m), m.each(function (t, e) {
      if (t = ki(t).slice(), 1 === t.length && !x(t[0]) && t[0] < 0) return void m.set(e, !1);
      var n = m.set(e, []);
      d(t, function (t, i) {
        x(t) && (t = l.get(t)), null != t && c > t && (n[i] = t, r(u[t], e, i));
      });
    });
    var _ = 0;
    d(t, function (t) {
      var e, t, n, a;
      if (x(t)) e = t, t = {};else {
        e = t.name;
        var s = t.ordinalMeta;
        t.ordinalMeta = null, t = i(t), t.ordinalMeta = s, n = t.dimsDef, a = t.otherDims, t.name = t.coordDim = t.coordDimIndex = t.dimsDef = t.otherDims = null;
      }
      var l = m.get(e);

      if (l !== !1) {
        var l = ki(l);
        if (!l.length) for (var h = 0; h < (n && n.length || 1); h++) {
          for (; _ < u.length && null != u[_].coordDim;) _++;

          _ < u.length && l.push(_++);
        }
        d(l, function (i, s) {
          var l = u[i];

          if (r(o(l, t), e, s), null == l.name && n) {
            var h = n[s];
            !w(h) && (h = {
              name: h
            }), l.name = l.displayName = h.name, l.defaultTooltip = h.defaultTooltip;
          }

          a && o(l.otherDims, a);
        });
      }
    });
    var y = n.generateCoord,
        b = n.generateCoordCount,
        S = null != b;
    b = y ? b || 1 : 0;

    for (var M = y || "value", T = 0; c > T; T++) {
      var v = u[T] = u[T] || new El(),
          I = v.coordDim;
      null == I && (v.coordDim = zl(M, h, S), v.coordDimIndex = 0, (!y || 0 >= b) && (v.isExtraCoord = !0), b--), null == v.name && (v.name = zl(v.coordDim, l)), null != v.type || uo(e, T, v.name) !== Np.Must && (!v.isExtraCoord || null == v.otherDims.itemName && null == v.otherDims.seriesName) || (v.type = "ordinal");
    }

    return u;
  }

  function Rl(t, e, n, i) {
    var r = Math.max(t.dimensionsDetectCount || 1, e.length, n.length, i || 0);
    return d(e, function (t) {
      var e = t.dimsDef;
      e && (r = Math.max(r, e.length));
    }), r;
  }

  function zl(t, e, n) {
    if (n || null != e.get(t)) {
      for (var i = 0; null != e.get(t + i);) i++;

      t += i;
    }

    return e.set(t, !0), t;
  }

  function Nl(t) {
    return t;
  }

  function Fl(t, e, n, i, r) {
    this._old = t, this._new = e, this._oldKeyGetter = n || Nl, this._newKeyGetter = i || Nl, this.context = r;
  }

  function Hl(t, e, n, i, r) {
    for (var a = 0; a < t.length; a++) {
      var o = "_ec_" + r[i](t[a], a),
          s = e[o];
      null == s ? (n.push(o), e[o] = a) : (s.length || (e[o] = s = [s]), s.push(a));
    }
  }

  function Vl(t) {
    return t._rawCount > 65535 ? Wv : Uv;
  }

  function Wl(t) {
    var e = t.constructor;
    return e === Array ? t.slice() : new e(t);
  }

  function Gl(t, e) {
    d(Xv.concat(e.__wrappedMethods || []), function (n) {
      e.hasOwnProperty(n) && (t[n] = e[n]);
    }), t.__wrappedMethods = e.__wrappedMethods, d(Yv, function (n) {
      t[n] = i(e[n]);
    }), t._calculationInfo = a(e._calculationInfo);
  }

  function Ul(t, e, n, i, r) {
    var a = Vv[e.type],
        o = i - 1,
        s = e.name,
        l = t[s][o];

    if (l && l.length < n) {
      for (var h = new a(Math.min(r - o * n, n)), u = 0; u < l.length; u++) h[u] = l[u];

      t[s][o] = h;
    }

    for (var c = i * n; r > c; c += n) t[s].push(new a(Math.min(r - c, n)));
  }

  function Xl(t) {
    var e = t._invertedIndicesMap;
    d(e, function (n, i) {
      var r = t._dimensionInfos[i],
          a = r.ordinalMeta;

      if (a) {
        n = e[i] = new Gv(a.categories.length);

        for (var o = 0; o < n.length; o++) n[o] = Fv;

        for (var o = 0; o < t._count; o++) n[t.get(i, o)] = o;
      }
    });
  }

  function Yl(t, e, n) {
    var i;

    if (null != e) {
      var r = t._chunkSize,
          a = Math.floor(n / r),
          o = n % r,
          s = t.dimensions[e],
          l = t._storage[s][a];

      if (l) {
        i = l[o];
        var h = t._dimensionInfos[s].ordinalMeta;
        h && h.categories.length && (i = h.categories[i]);
      }
    }

    return i;
  }

  function ql(t) {
    return t;
  }

  function jl(t) {
    return t < this._count && t >= 0 ? this._indices[t] : -1;
  }

  function Zl(t, e) {
    var n = t._idList[e];
    return null == n && (n = Yl(t, t._idDimIdx, e)), null == n && (n = Hv + e), n;
  }

  function $l(t) {
    return _(t) || (t = [t]), t;
  }

  function Ql(t, e) {
    var n = t.dimensions,
        i = new qv(f(n, t.getDimensionInfo, t), t.hostModel);
    Gl(i, t);

    for (var r = i._storage = {}, a = t._storage, o = 0; o < n.length; o++) {
      var s = n[o];
      a[s] && (l(e, s) >= 0 ? (r[s] = Kl(a[s]), i._rawExtent[s] = Jl(), i._extent[s] = null) : r[s] = a[s]);
    }

    return i;
  }

  function Kl(t) {
    for (var e = new Array(t.length), n = 0; n < t.length; n++) e[n] = Wl(t[n]);

    return e;
  }

  function Jl() {
    return [1 / 0, -1 / 0];
  }

  function th(t, e) {
    this.getAllNames = function () {
      var t = e();
      return t.mapArray(t.getName);
    }, this.containName = function (t) {
      var n = e();
      return n.indexOfName(t) >= 0;
    }, this.indexOfName = function (e) {
      var n = t();
      return n.indexOfName(e);
    }, this.getItemVisual = function (e, n) {
      var i = t();
      return i.getItemVisual(e, n);
    };
  }

  function eh(t, e, n, i) {
    var r = e.getData(),
        a = this.dataIndex,
        o = r.getName(a),
        s = e.get("selectedOffset");
    i.dispatchAction({
      type: "pieToggleSelect",
      from: t,
      name: o,
      seriesId: e.id
    }), r.each(function (t) {
      nh(r.getItemGraphicEl(t), r.getItemLayout(t), e.isSelected(r.getName(t)), s, n);
    });
  }

  function nh(t, e, n, i, r) {
    var a = (e.startAngle + e.endAngle) / 2,
        o = Math.cos(a),
        s = Math.sin(a),
        l = n ? i : 0,
        h = [o * l, s * l];
    r ? t.animate().when(200, {
      position: h
    }).start("bounceOut") : t.attr("position", h);
  }

  function ih(t, e) {
    vc.call(this);
    var n = new Lf({
      z2: 2
    }),
        i = new Nf(),
        r = new Df();
    this.add(n), this.add(i), this.add(r), this.updateData(t, e, !0);
  }

  function rh(t, e, n, i, r, a, o, s, l, h) {
    function u(e, n, i) {
      for (var r = e; n > r && !(t[r].y + i > l + o); r++) if (t[r].y += i, r > e && n > r + 1 && t[r + 1].y > t[r].y + t[r].height) return void c(r, i / 2);

      c(n - 1, i / 2);
    }

    function c(e, n) {
      for (var i = e; i >= 0 && !(t[i].y - n < l) && (t[i].y -= n, !(i > 0 && t[i].y > t[i - 1].y + t[i - 1].height)); i--);
    }

    function d(t, e, n, i, r, a) {
      for (var o = a > 0 ? e ? Number.MAX_VALUE : 0 : e ? Number.MAX_VALUE : 0, s = 0, l = t.length; l > s; s++) if ("none" === t[s].labelAlignTo) {
        var h = Math.abs(t[s].y - i),
            u = t[s].len,
            c = t[s].len2,
            d = r + u > h ? Math.sqrt((r + u + c) * (r + u + c) - h * h) : Math.abs(t[s].x - n);
        e && d >= o && (d = o - 10), !e && o >= d && (d = o + 10), t[s].x = n + d * a, o = d;
      }
    }

    t.sort(function (t, e) {
      return t.y - e.y;
    });

    for (var f, p = 0, g = t.length, v = [], m = [], _ = 0; g > _; _++) {
      if ("outer" === t[_].position && "labelLine" === t[_].labelAlignTo) {
        var y = t[_].x - h;
        t[_].linePoints[1][0] += y, t[_].x = h;
      }

      f = t[_].y - p, 0 > f && u(_, g, -f, r), p = t[_].y + t[_].height;
    }

    0 > o - p && c(g - 1, p - o);

    for (var _ = 0; g > _; _++) t[_].y >= n ? m.push(t[_]) : v.push(t[_]);

    d(v, !1, e, n, i, r), d(m, !0, e, n, i, r);
  }

  function ah(t, e, n, i, r, a, o, s) {
    for (var l = [], h = [], u = Number.MAX_VALUE, c = -Number.MAX_VALUE, d = 0; d < t.length; d++) oh(t[d]) || (t[d].x < e ? (u = Math.min(u, t[d].x), l.push(t[d])) : (c = Math.max(c, t[d].x), h.push(t[d])));

    rh(h, e, n, i, 1, r, a, o, s, c), rh(l, e, n, i, -1, r, a, o, s, u);

    for (var d = 0; d < t.length; d++) {
      var f = t[d];

      if (!oh(f)) {
        var p = f.linePoints;

        if (p) {
          var g,
              v = "edge" === f.labelAlignTo,
              m = f.textRect.width;
          g = v ? f.x < e ? p[2][0] - f.labelDistance - o - f.labelMargin : o + r - f.labelMargin - p[2][0] - f.labelDistance : f.x < e ? f.x - o - f.bleedMargin : o + r - f.x - f.bleedMargin, g < f.textRect.width && (f.text = Dn(f.text, g, f.font), "edge" === f.labelAlignTo && (m = bn(f.text, f.font)));

          var _ = p[1][0] - p[2][0];

          v ? p[2][0] = f.x < e ? o + f.labelMargin + m + f.labelDistance : o + r - f.labelMargin - m - f.labelDistance : (p[2][0] = f.x < e ? f.x + f.labelDistance : f.x - f.labelDistance, p[1][0] = p[2][0] + _), p[1][1] = p[2][1] = f.y;
        }
      }
    }
  }

  function oh(t) {
    return "center" === t.position;
  }

  function sh(t, e) {
    return Ya(t.getBoxLayoutParams(), {
      width: e.getWidth(),
      height: e.getHeight()
    });
  }

  function lh(t, e, n) {
    var i,
        r = {},
        a = "toggleSelected" === t;
    return n.eachComponent("legend", function (n) {
      a && null != i ? n[i ? "select" : "unSelect"](e.name) : "allSelect" === t || "inverseSelect" === t ? n[t]() : (n[t](e.name), i = n.isSelected(e.name));
      var o = n.getData();
      d(o, function (t) {
        var e = t.get("name");

        if ("\n" !== e && "" !== e) {
          var i = n.isSelected(e);
          r[e] = r.hasOwnProperty(e) ? r[e] && i : i;
        }
      });
    }), "allSelect" === t || "inverseSelect" === t ? {
      selected: r
    } : {
      name: e.name,
      selected: r
    };
  }

  function hh(t, e) {
    if ("image" !== this.type) {
      var n = this.style,
          i = this.shape;
      i && "line" === i.symbolType ? n.stroke = t : this.__isEmptyBrush ? (n.stroke = t, n.fill = e || "#fff") : (n.fill && (n.fill = t), n.stroke && (n.stroke = t)), this.dirty(!1);
    }
  }

  function uh(t, e, n, i, r, a, o) {
    var s = 0 === t.indexOf("empty");
    s && (t = t.substr(5, 1).toLowerCase() + t.substr(6));
    var l;
    return l = 0 === t.indexOf("image://") ? Ur(t.slice(8), new rn(e, n, i, r), o ? "center" : "cover") : 0 === t.indexOf("path://") ? Gr(t.slice(7), {}, new rn(e, n, i, r), o ? "center" : "cover") : new _m({
      shape: {
        symbolType: t,
        x: e,
        y: n,
        width: i,
        height: r
      }
    }), l.__isEmptyBrush = s, l.setColor = hh, l.setColor(a), l;
  }

  function ch(t, e) {
    var n = pp(e.get("padding")),
        i = e.getItemStyle(["color", "opacity"]);
    i.fill = e.get("backgroundColor");
    var t = new Vf({
      shape: {
        x: t.x - n[3],
        y: t.y - n[0],
        width: t.width + n[1] + n[3],
        height: t.height + n[0] + n[2],
        r: e.get("borderRadius")
      },
      style: i,
      silent: !0,
      z2: -1
    });
    return t;
  }

  function dh(t, e, n, i, r, a) {
    var o;
    return "line" !== e && e.indexOf("empty") < 0 ? (o = n.getItemStyle(), t.style.stroke = i, a || (o.stroke = r)) : o = n.getItemStyle(["borderWidth", "borderColor"]), t.setStyle(o);
  }

  function fh(t, e, n, i) {
    gh(t, e, n, i), n.dispatchAction({
      type: "legendToggleSelect",
      name: null != t ? t : e
    }), ph(t, e, n, i);
  }

  function ph(t, e, n, i) {
    var r = n.getZr().storage.getDisplayList()[0];
    r && r.useHoverLayer || n.dispatchAction({
      type: "highlight",
      seriesName: t,
      name: e,
      excludeSeriesId: i
    });
  }

  function gh(t, e, n, i) {
    var r = n.getZr().storage.getDisplayList()[0];
    r && r.useHoverLayer || n.dispatchAction({
      type: "downplay",
      seriesName: t,
      name: e,
      excludeSeriesId: i
    });
  }

  function vh(t, e, n) {
    var i = t.getOrient(),
        r = [1, 1];
    r[i.index] = 0, ja(e, n, {
      type: "box",
      ignoreSize: r
    });
  }

  function mh(t, e, n, i) {
    var r = n.type,
        a = Dm.hasOwnProperty(r) ? Dm[r] : Wr(r),
        o = new a(n);
    e.add(o), i.set(t, o), o.__ecGraphicId = t;
  }

  function _h(t, e) {
    var n = t && t.parent;
    n && ("group" === t.type && t.traverse(function (t) {
      _h(t, e);
    }), e.removeKey(t.__ecGraphicId), n.remove(t));
  }

  function yh(t) {
    return t = a({}, t), d(["id", "parentId", "$action", "hv", "bounding"].concat(xp), function (e) {
      delete t[e];
    }), t;
  }

  function xh(t, e) {
    var n;
    return d(e, function (e) {
      null != t[e] && "auto" !== t[e] && (n = !0);
    }), n;
  }

  function wh(t, e) {
    var n = t.exist;

    if (e.id = t.keyInfo.id, !e.type && n && (e.type = n.type), null == e.parentId) {
      var i = e.parentOption;
      i ? e.parentId = i.id : n && (e.parentId = n.parentId);
    }

    e.parentOption = null;
  }

  function bh(t, e, n) {
    var i = a({}, n),
        o = t[e],
        s = n.$action || "merge";
    "merge" === s ? o ? (r(o, i, !0), ja(o, i, {
      ignoreSize: !0
    }), $a(n, o)) : t[e] = i : "replace" === s ? t[e] = i : "remove" === s && o && (t[e] = null);
  }

  function Sh(t, e) {
    t && (t.hv = e.hv = [xh(e, ["left", "right"]), xh(e, ["top", "bottom"])], "group" === t.type && (null == t.width && (t.width = e.width = 0), null == t.height && (t.height = e.height = 0)));
  }

  function Mh(t, e) {
    var n = t.eventData;
    t.silent || t.ignore || n || (n = t.eventData = {
      componentType: "graphic",
      componentIndex: e.componentIndex,
      name: t.name
    }), n && (n.info = t.info);
  }

  function Th(t) {
    return document.createElementNS(Pm, t);
  }

  function Ih(t) {
    return Bm(1e4 * t) / 1e4;
  }

  function Ch(t) {
    return Vm > t && t > -Vm;
  }

  function kh(t, e) {
    var n = e ? t.textFill : t.fill;
    return null != n && n !== Em;
  }

  function Dh(t, e) {
    var n = e ? t.textStroke : t.stroke;
    return null != n && n !== Em;
  }

  function Ah(t, e) {
    e && Ph(t, "transform", "matrix(" + Lm.call(e, ",") + ")");
  }

  function Ph(t, e, n) {
    (!n || "linear" !== n.type && "radial" !== n.type) && t.setAttribute(e, n);
  }

  function Oh(t, e, n) {
    t.setAttributeNS("http://www.w3.org/1999/xlink", e, n);
  }

  function Lh(t, e, n, i) {
    if (kh(e, n)) {
      var r = n ? e.textFill : e.fill;
      r = "transparent" === r ? Em : r, Ph(t, "fill", r), Ph(t, "fill-opacity", null != e.fillOpacity ? e.fillOpacity * e.opacity : e.opacity);
    } else Ph(t, "fill", Em);

    if (Dh(e, n)) {
      var a = n ? e.textStroke : e.stroke;
      a = "transparent" === a ? Em : a, Ph(t, "stroke", a);
      var o = n ? e.textStrokeWidth : e.lineWidth,
          s = !n && e.strokeNoScale ? i.getLineScale() : 1;
      Ph(t, "stroke-width", o / s), Ph(t, "paint-order", n ? "stroke" : "fill"), Ph(t, "stroke-opacity", null != e.strokeOpacity ? e.strokeOpacity : e.opacity);
      var l = e.lineDash;
      l ? (Ph(t, "stroke-dasharray", e.lineDash.join(",")), Ph(t, "stroke-dashoffset", Bm(e.lineDashOffset || 0))) : Ph(t, "stroke-dasharray", ""), e.lineCap && Ph(t, "stroke-linecap", e.lineCap), e.lineJoin && Ph(t, "stroke-linejoin", e.lineJoin), e.miterLimit && Ph(t, "stroke-miterlimit", e.miterLimit);
    } else Ph(t, "stroke", Em);
  }

  function Eh(t) {
    for (var e = [], n = t.data, i = t.len(), r = 0; i > r;) {
      var a = n[r++],
          o = "",
          s = 0;

      switch (a) {
        case Om.M:
          o = "M", s = 2;
          break;

        case Om.L:
          o = "L", s = 2;
          break;

        case Om.Q:
          o = "Q", s = 4;
          break;

        case Om.C:
          o = "C", s = 6;
          break;

        case Om.A:
          var l = n[r++],
              h = n[r++],
              u = n[r++],
              c = n[r++],
              d = n[r++],
              f = n[r++],
              p = n[r++],
              g = n[r++],
              v = Math.abs(f),
              m = Ch(v - Fm) || (g ? f >= Fm : -f >= Fm),
              _ = f > 0 ? f % Fm : f % Fm + Fm,
              y = !1;

          y = m ? !0 : Ch(v) ? !1 : _ >= Nm == !!g;
          var x = Ih(l + u * zm(d)),
              w = Ih(h + c * Rm(d));
          m && (f = g ? Fm - 1e-4 : -Fm + 1e-4, y = !0, 9 === r && e.push("M", x, w));
          var b = Ih(l + u * zm(d + f)),
              S = Ih(h + c * Rm(d + f));
          e.push("A", Ih(u), Ih(c), Bm(p * Hm), +y, +g, b, S);
          break;

        case Om.Z:
          o = "Z";
          break;

        case Om.R:
          var b = Ih(n[r++]),
              S = Ih(n[r++]),
              M = Ih(n[r++]),
              T = Ih(n[r++]);
          e.push("M", b, S, "L", b + M, S, "L", b + M, S + T, "L", b, S + T, "L", b, S);
      }

      o && e.push(o);

      for (var I = 0; s > I; I++) e.push(Ih(n[r++]));
    }

    return e.join(" ");
  }

  function Bh(t, e, n, i, r, a, o) {
    ye(qm), e && n && xe(qm, n);
    var s = i.textRotation;

    if (r && s) {
      var l = i.textOrigin;
      "center" === l ? (a = r.width / 2 + r.x, o = r.height / 2 + r.y) : l && (a = l[0] + r.x, o = l[1] + r.y), qm[4] -= a, qm[5] -= o, Se(qm, qm, s), qm[4] += a, qm[5] += o;
    }

    Ah(t, qm);
  }

  function Rh(t, e, n) {
    return "right" === e ? t - n[1] : "center" === e ? t + n[3] / 2 - n[1] / 2 : t + n[3];
  }

  function zh(t, e, n, i) {
    Ph(t, "dominant-baseline", "middle"), Ph(t, "text-anchor", jm[e]), Ph(t, "x", n), Ph(t, "y", i);
  }

  function Nh(t) {
    t && t.__textSvgEl && (t.__textSvgEl.parentNode && t.__textSvgEl.parentNode.removeChild(t.__textSvgEl), t.__textSvgEl = null, t.__tspanList = [], t.__text = null);
  }

  function Fh() {}

  function Hh(t, e) {
    for (var n = 0, i = e.length, r = 0, a = 0; i > n; n++) {
      var o = e[n];

      if (o.removed) {
        for (var s = [], l = a; l < a + o.count; l++) s.push(l);

        o.indices = s, a += o.count;
      } else {
        for (var s = [], l = r; l < r + o.count; l++) s.push(l);

        o.indices = s, r += o.count, o.added || (a += o.count);
      }
    }

    return e;
  }

  function Vh(t) {
    return {
      newPos: t.newPos,
      components: t.components.slice(0)
    };
  }

  function Wh(t, e, n, i, r) {
    this._zrId = t, this._svgRoot = e, this._tagNames = "string" == typeof n ? [n] : n, this._markLabel = i, this._domName = r || "_dom", this.nextId = 0;
  }

  function Gh(t, e) {
    Wh.call(this, t, e, ["linearGradient", "radialGradient"], "__gradient_in_use__");
  }

  function Uh(t, e) {
    Wh.call(this, t, e, "clipPath", "__clippath_in_use__");
  }

  function Xh(t, e) {
    Wh.call(this, t, e, ["filter"], "__filter_in_use__", "_shadowDom");
  }

  function Yh(t) {
    return t && (t.shadowBlur || t.shadowOffsetX || t.shadowOffsetY || t.textShadowBlur || t.textShadowOffsetX || t.textShadowOffsetY);
  }

  function qh(t) {
    return parseInt(t, 10);
  }

  function jh(t) {
    return t instanceof kr ? Wm : t instanceof ai ? Gm : t instanceof Df ? Um : Wm;
  }

  function Zh(t, e) {
    return e && t && e.parentNode !== t;
  }

  function $h(t, e, n) {
    if (Zh(t, e) && n) {
      var i = n.nextSibling;
      i ? t.insertBefore(e, i) : t.appendChild(e);
    }
  }

  function Qh(t, e) {
    if (Zh(t, e)) {
      var n = t.firstChild;
      n ? t.insertBefore(e, n) : t.appendChild(e);
    }
  }

  function Kh(t, e) {
    e && t && e.parentNode === t && t.removeChild(e);
  }

  function Jh(t) {
    return t.__textSvgEl;
  }

  function tu(t) {
    return t.__svgEl;
  }

  function eu(t) {
    return function () {
      uc('In SVG mode painter not support method "' + t + '"');
    };
  }

  function nu(t, e, n, i) {
    var r = {},
        a = t[1] - t[0],
        o = r.interval = Na(a / e, !0);
    null != n && n > o && (o = r.interval = n), null != i && o > i && (o = r.interval = i);
    var s = r.intervalPrecision = iu(o),
        l = r.niceTickExtent = [e_(Math.ceil(t[0] / o) * o, s), e_(Math.floor(t[1] / o) * o, s)];
    return au(l, t), r;
  }

  function iu(t) {
    return La(t) + 2;
  }

  function ru(t, e, n) {
    t[e] = Math.max(Math.min(t[e], n[1]), n[0]);
  }

  function au(t, e) {
    !isFinite(t[0]) && (t[0] = e[0]), !isFinite(t[1]) && (t[1] = e[1]), ru(t, 0, e), ru(t, 1, e), t[0] > t[1] && (t[0] = t[1]);
  }

  function ou(t) {
    this._setting = t || {}, this._extent = [1 / 0, -1 / 0], this._interval = 0, this.init && this.init.apply(this, arguments);
  }

  function su(t, e) {
    return m_(t, v_(e));
  }

  var lu = 2311,
      hu = function () {
    return lu++;
  },
      uu = {};

  uu = "object" == typeof wx && "function" == typeof wx.getSystemInfoSync ? {
    browser: {},
    os: {},
    node: !1,
    wxa: !0,
    canvasSupported: !0,
    svgSupported: !1,
    touchEventsSupported: !0,
    domSupported: !1
  } : "undefined" == typeof document && "undefined" != typeof self ? {
    browser: {},
    os: {},
    node: !1,
    worker: !0,
    canvasSupported: !0,
    domSupported: !1
  } : "undefined" == typeof navigator ? {
    browser: {},
    os: {},
    node: !0,
    worker: !1,
    canvasSupported: !0,
    svgSupported: !0,
    domSupported: !1
  } : e(navigator.userAgent);

  var cu = uu,
      du = {
    "[object Function]": 1,
    "[object RegExp]": 1,
    "[object Date]": 1,
    "[object Error]": 1,
    "[object CanvasGradient]": 1,
    "[object CanvasPattern]": 1,
    "[object Image]": 1,
    "[object Canvas]": 1
  },
      fu = {
    "[object Int8Array]": 1,
    "[object Uint8Array]": 1,
    "[object Uint8ClampedArray]": 1,
    "[object Int16Array]": 1,
    "[object Uint16Array]": 1,
    "[object Int32Array]": 1,
    "[object Uint32Array]": 1,
    "[object Float32Array]": 1,
    "[object Float64Array]": 1
  },
      pu = Object.prototype.toString,
      gu = Array.prototype,
      vu = gu.forEach,
      mu = gu.filter,
      _u = gu.slice,
      yu = gu.map,
      xu = gu.reduce,
      wu = {},
      bu = function () {
    return wu.createCanvas();
  };

  wu.createCanvas = function () {
    return document.createElement("canvas");
  };

  var Su,
      Mu = "__ec_primitive__";
  L.prototype = {
    constructor: L,
    get: function (t) {
      return this.data.hasOwnProperty(t) ? this.data[t] : null;
    },
    set: function (t, e) {
      return this.data[t] = e;
    },
    each: function (t, e) {
      void 0 !== e && (t = v(t, e));

      for (var n in this.data) this.data.hasOwnProperty(n) && t(this.data[n], n);
    },
    removeKey: function (t) {
      delete this.data[t];
    }
  };
  var Tu = "undefined" == typeof Float32Array ? Array : Float32Array,
      Iu = U,
      Cu = X;
  Z.prototype = {
    constructor: Z,
    _dragStart: function (t) {
      for (var e = t.target; e && !e.draggable;) e = e.parent;

      e && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.dispatchToElement($(e, t), "dragstart", t.event));
    },
    _drag: function (t) {
      var e = this._draggingTarget;

      if (e) {
        var n = t.offsetX,
            i = t.offsetY,
            r = n - this._x,
            a = i - this._y;
        this._x = n, this._y = i, e.drift(r, a, t), this.dispatchToElement($(e, t), "drag", t.event);
        var o = this.findHover(n, i, e).target,
            s = this._dropTarget;
        this._dropTarget = o, e !== o && (s && o !== s && this.dispatchToElement($(s, t), "dragleave", t.event), o && o !== s && this.dispatchToElement($(o, t), "dragenter", t.event));
      }
    },
    _dragEnd: function (t) {
      var e = this._draggingTarget;
      e && (e.dragging = !1), this.dispatchToElement($(e, t), "dragend", t.event), this._dropTarget && this.dispatchToElement($(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
    }
  };

  var ku = Array.prototype.slice,
      Du = function (t) {
    this._$handlers = {}, this._$eventProcessor = t;
  };

  Du.prototype = {
    constructor: Du,
    one: function (t, e, n, i) {
      return K(this, t, e, n, i, !0);
    },
    on: function (t, e, n, i) {
      return K(this, t, e, n, i, !1);
    },
    isSilent: function (t) {
      var e = this._$handlers;
      return !e[t] || !e[t].length;
    },
    off: function (t, e) {
      var n = this._$handlers;
      if (!t) return this._$handlers = {}, this;

      if (e) {
        if (n[t]) {
          for (var i = [], r = 0, a = n[t].length; a > r; r++) n[t][r].h !== e && i.push(n[t][r]);

          n[t] = i;
        }

        n[t] && 0 === n[t].length && delete n[t];
      } else delete n[t];

      return this;
    },
    trigger: function (t) {
      var e = this._$handlers[t],
          n = this._$eventProcessor;

      if (e) {
        var i = arguments,
            r = i.length;
        r > 3 && (i = ku.call(i, 1));

        for (var a = e.length, o = 0; a > o;) {
          var s = e[o];
          if (n && n.filter && null != s.query && !n.filter(t, s.query)) o++;else {
            switch (r) {
              case 1:
                s.h.call(s.ctx);
                break;

              case 2:
                s.h.call(s.ctx, i[1]);
                break;

              case 3:
                s.h.call(s.ctx, i[1], i[2]);
                break;

              default:
                s.h.apply(s.ctx, i);
            }

            s.one ? (e.splice(o, 1), a--) : o++;
          }
        }
      }

      return n && n.afterTrigger && n.afterTrigger(t), this;
    },
    triggerWithContext: function (t) {
      var e = this._$handlers[t],
          n = this._$eventProcessor;

      if (e) {
        var i = arguments,
            r = i.length;
        r > 4 && (i = ku.call(i, 1, i.length - 1));

        for (var a = i[i.length - 1], o = e.length, s = 0; o > s;) {
          var l = e[s];
          if (n && n.filter && null != l.query && !n.filter(t, l.query)) s++;else {
            switch (r) {
              case 1:
                l.h.call(a);
                break;

              case 2:
                l.h.call(a, i[1]);
                break;

              case 3:
                l.h.call(a, i[1], i[2]);
                break;

              default:
                l.h.apply(a, i);
            }

            l.one ? (e.splice(s, 1), o--) : s++;
          }
        }
      }

      return n && n.afterTrigger && n.afterTrigger(t), this;
    }
  };

  var Au = Math.log(2),
      Pu = "___zrEVENTSAVED",
      Ou = "undefined" != typeof window && !!window.addEventListener,
      Lu = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      Eu = [],
      Bu = Ou ? function (t) {
    t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0;
  } : function (t) {
    t.returnValue = !1, t.cancelBubble = !0;
  },
      Ru = function () {
    this._track = [];
  };

  Ru.prototype = {
    constructor: Ru,
    recognize: function (t, e, n) {
      return this._doTrack(t, e, n), this._recognize(t);
    },
    clear: function () {
      return this._track.length = 0, this;
    },
    _doTrack: function (t, e, n) {
      var i = t.touches;

      if (i) {
        for (var r = {
          points: [],
          touches: [],
          target: e,
          event: t
        }, a = 0, o = i.length; o > a; a++) {
          var s = i[a],
              l = ae(n, s, {});
          r.points.push([l.zrX, l.zrY]), r.touches.push(s);
        }

        this._track.push(r);
      }
    },
    _recognize: function (t) {
      for (var e in zu) if (zu.hasOwnProperty(e)) {
        var n = zu[e](this._track, t);
        if (n) return n;
      }
    }
  };
  var zu = {
    pinch: function (t, e) {
      var n = t.length;

      if (n) {
        var i = (t[n - 1] || {}).points,
            r = (t[n - 2] || {}).points || i;

        if (r && r.length > 1 && i && i.length > 1) {
          var a = ce(i) / ce(r);
          !isFinite(a) && (a = 1), e.pinchScale = a;
          var o = de(i);
          return e.pinchX = o[0], e.pinchY = o[1], {
            type: "pinch",
            target: t[0].target,
            event: e
          };
        }
      }
    }
  },
      Nu = "silent";

  ge.prototype.dispose = function () {};

  var Fu = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
      Hu = function (t, e, n, i) {
    Du.call(this), this.storage = t, this.painter = e, this.painterRoot = i, n = n || new ge(), this.proxy = null, this._hovered = {}, this._lastTouchMoment, this._lastX, this._lastY, this._gestureMgr, Z.call(this), this.setHandlerProxy(n);
  };

  Hu.prototype = {
    constructor: Hu,
    setHandlerProxy: function (t) {
      this.proxy && this.proxy.dispose(), t && (d(Fu, function (e) {
        t.on && t.on(e, this[e], this);
      }, this), t.handler = this), this.proxy = t;
    },
    mousemove: function (t) {
      var e = t.zrX,
          n = t.zrY,
          i = me(this, e, n),
          r = this._hovered,
          a = r.target;
      a && !a.__zr && (r = this.findHover(r.x, r.y), a = r.target);
      var o = this._hovered = i ? {
        x: e,
        y: n
      } : this.findHover(e, n),
          s = o.target,
          l = this.proxy;
      l.setCursor && l.setCursor(s ? s.cursor : "default"), a && s !== a && this.dispatchToElement(r, "mouseout", t), this.dispatchToElement(o, "mousemove", t), s && s !== a && this.dispatchToElement(o, "mouseover", t);
    },
    mouseout: function (t) {
      var e = t.zrEventControl,
          n = t.zrIsToLocalDOM;
      "only_globalout" !== e && this.dispatchToElement(this._hovered, "mouseout", t), "no_globalout" !== e && !n && this.trigger("globalout", {
        type: "globalout",
        event: t
      });
    },
    resize: function () {
      this._hovered = {};
    },
    dispatch: function (t, e) {
      var n = this[t];
      n && n.call(this, e);
    },
    dispose: function () {
      this.proxy.dispose(), this.storage = this.proxy = this.painter = null;
    },
    setCursorStyle: function (t) {
      var e = this.proxy;
      e.setCursor && e.setCursor(t);
    },
    dispatchToElement: function (t, e, n) {
      t = t || {};
      var i = t.target;

      if (!i || !i.silent) {
        for (var r = "on" + e, a = fe(e, t, n); i && (i[r] && (a.cancelBubble = i[r].call(i, a)), i.trigger(e, a), i = i.parent, !a.cancelBubble););

        a.cancelBubble || (this.trigger(e, a), this.painter && this.painter.eachOtherLayer(function (t) {
          "function" == typeof t[r] && t[r].call(t, a), t.trigger && t.trigger(e, a);
        }));
      }
    },
    findHover: function (t, e, n) {
      for (var i = this.storage.getDisplayList(), r = {
        x: t,
        y: e
      }, a = i.length - 1; a >= 0; a--) {
        var o;

        if (i[a] !== n && !i[a].ignore && (o = ve(i[a], t, e)) && (!r.topTarget && (r.topTarget = i[a]), o !== Nu)) {
          r.target = i[a];
          break;
        }
      }

      return r;
    },
    processGesture: function (t, e) {
      this._gestureMgr || (this._gestureMgr = new Ru());
      var n = this._gestureMgr;
      "start" === e && n.clear();
      var i = n.recognize(t, this.findHover(t.zrX, t.zrY, null).target, this.proxy.dom);

      if ("end" === e && n.clear(), i) {
        var r = i.type;
        t.gestureEvent = r, this.dispatchToElement({
          target: i.target
        }, r, i.event);
      }
    }
  }, d(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (t) {
    Hu.prototype[t] = function (e) {
      var n,
          i,
          r = e.zrX,
          a = e.zrY,
          o = me(this, r, a);
      if ("mouseup" === t && o || (n = this.findHover(r, a), i = n.target), "mousedown" === t) this._downEl = i, this._downPoint = [e.zrX, e.zrY], this._upEl = i;else if ("mouseup" === t) this._upEl = i;else if ("click" === t) {
        if (this._downEl !== this._upEl || !this._downPoint || Iu(this._downPoint, [e.zrX, e.zrY]) > 4) return;
        this._downPoint = null;
      }
      this.dispatchToElement(n, t, e);
    };
  }), u(Hu, Du), u(Hu, Z);

  var Vu = "undefined" == typeof Float32Array ? Array : Float32Array,
      Wu = ye,
      Gu = 5e-5,
      Uu = function (t) {
    t = t || {}, t.position || (this.position = [0, 0]), null == t.rotation && (this.rotation = 0), t.scale || (this.scale = [1, 1]), this.origin = this.origin || null;
  },
      Xu = Uu.prototype;

  Xu.transform = null, Xu.needLocalTransform = function () {
    return Ie(this.rotation) || Ie(this.position[0]) || Ie(this.position[1]) || Ie(this.scale[0] - 1) || Ie(this.scale[1] - 1);
  };
  var Yu = [];
  Xu.updateTransform = function () {
    var t = this.parent,
        e = t && t.transform,
        n = this.needLocalTransform(),
        i = this.transform;
    if (!n && !e) return void (i && Wu(i));
    i = i || _e(), n ? this.getLocalTransform(i) : Wu(i), e && (n ? we(i, t.transform, i) : xe(i, t.transform)), this.transform = i;
    var r = this.globalScaleRatio;

    if (null != r && 1 !== r) {
      this.getGlobalScale(Yu);
      var a = Yu[0] < 0 ? -1 : 1,
          o = Yu[1] < 0 ? -1 : 1,
          s = ((Yu[0] - a) * r + a) / Yu[0] || 0,
          l = ((Yu[1] - o) * r + o) / Yu[1] || 0;
      i[0] *= s, i[1] *= s, i[2] *= l, i[3] *= l;
    }

    this.invTransform = this.invTransform || _e(), Te(this.invTransform, i);
  }, Xu.getLocalTransform = function (t) {
    return Uu.getLocalTransform(this, t);
  }, Xu.setTransform = function (t) {
    var e = this.transform,
        n = t.dpr || 1;
    e ? t.setTransform(n * e[0], n * e[1], n * e[2], n * e[3], n * e[4], n * e[5]) : t.setTransform(n, 0, 0, n, 0, 0);
  }, Xu.restoreTransform = function (t) {
    var e = t.dpr || 1;
    t.setTransform(e, 0, 0, e, 0, 0);
  };

  var qu = [],
      ju = _e();

  Xu.setLocalTransform = function (t) {
    if (t) {
      var e = t[0] * t[0] + t[1] * t[1],
          n = t[2] * t[2] + t[3] * t[3],
          i = this.position,
          r = this.scale;
      Ie(e - 1) && (e = Math.sqrt(e)), Ie(n - 1) && (n = Math.sqrt(n)), t[0] < 0 && (e = -e), t[3] < 0 && (n = -n), i[0] = t[4], i[1] = t[5], r[0] = e, r[1] = n, this.rotation = Math.atan2(-t[1] / n, t[0] / e);
    }
  }, Xu.decomposeTransform = function () {
    if (this.transform) {
      var t = this.parent,
          e = this.transform;
      t && t.transform && (we(qu, t.invTransform, e), e = qu);
      var n = this.origin;
      n && (n[0] || n[1]) && (ju[4] = n[0], ju[5] = n[1], we(qu, e, ju), qu[4] -= n[0], qu[5] -= n[1], e = qu), this.setLocalTransform(e);
    }
  }, Xu.getGlobalScale = function (t) {
    var e = this.transform;
    return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, Xu.transformCoordToLocal = function (t, e) {
    var n = [t, e],
        i = this.invTransform;
    return i && Y(n, n, i), n;
  }, Xu.transformCoordToGlobal = function (t, e) {
    var n = [t, e],
        i = this.transform;
    return i && Y(n, n, i), n;
  }, Uu.getLocalTransform = function (t, e) {
    e = e || [], Wu(e);
    var n = t.origin,
        i = t.scale || [1, 1],
        r = t.rotation || 0,
        a = t.position || [0, 0];
    return n && (e[4] -= n[0], e[5] -= n[1]), Me(e, e, i), r && Se(e, e, r), n && (e[4] += n[0], e[5] += n[1]), e[4] += a[0], e[5] += a[1], e;
  };
  var Zu = {
    linear: function (t) {
      return t;
    },
    quadraticIn: function (t) {
      return t * t;
    },
    quadraticOut: function (t) {
      return t * (2 - t);
    },
    quadraticInOut: function (t) {
      return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
    },
    cubicIn: function (t) {
      return t * t * t;
    },
    cubicOut: function (t) {
      return --t * t * t + 1;
    },
    cubicInOut: function (t) {
      return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
    },
    quarticIn: function (t) {
      return t * t * t * t;
    },
    quarticOut: function (t) {
      return 1 - --t * t * t * t;
    },
    quarticInOut: function (t) {
      return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
    },
    quinticIn: function (t) {
      return t * t * t * t * t;
    },
    quinticOut: function (t) {
      return --t * t * t * t * t + 1;
    },
    quinticInOut: function (t) {
      return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
    },
    sinusoidalIn: function (t) {
      return 1 - Math.cos(t * Math.PI / 2);
    },
    sinusoidalOut: function (t) {
      return Math.sin(t * Math.PI / 2);
    },
    sinusoidalInOut: function (t) {
      return .5 * (1 - Math.cos(Math.PI * t));
    },
    exponentialIn: function (t) {
      return 0 === t ? 0 : Math.pow(1024, t - 1);
    },
    exponentialOut: function (t) {
      return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
    },
    exponentialInOut: function (t) {
      return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2);
    },
    circularIn: function (t) {
      return 1 - Math.sqrt(1 - t * t);
    },
    circularOut: function (t) {
      return Math.sqrt(1 - --t * t);
    },
    circularInOut: function (t) {
      return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    elasticIn: function (t) {
      var e,
          n = .1,
          i = .4;
      return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), -(n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i)));
    },
    elasticOut: function (t) {
      var e,
          n = .1,
          i = .4;
      return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), n * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / i) + 1);
    },
    elasticInOut: function (t) {
      var e,
          n = .1,
          i = .4;
      return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i) : n * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i) * .5 + 1);
    },
    backIn: function (t) {
      var e = 1.70158;
      return t * t * ((e + 1) * t - e);
    },
    backOut: function (t) {
      var e = 1.70158;
      return --t * t * ((e + 1) * t + e) + 1;
    },
    backInOut: function (t) {
      var e = 2.5949095;
      return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
    },
    bounceIn: function (t) {
      return 1 - Zu.bounceOut(1 - t);
    },
    bounceOut: function (t) {
      return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
    },
    bounceInOut: function (t) {
      return .5 > t ? .5 * Zu.bounceIn(2 * t) : .5 * Zu.bounceOut(2 * t - 1) + .5;
    }
  };
  Ce.prototype = {
    constructor: Ce,
    step: function (t, e) {
      if (this._initialized || (this._startTime = t + this._delay, this._initialized = !0), this._paused) return void (this._pausedTime += e);
      var n = (t - this._startTime - this._pausedTime) / this._life;

      if (!(0 > n)) {
        n = Math.min(n, 1);
        var i = this.easing,
            r = "string" == typeof i ? Zu[i] : i,
            a = "function" == typeof r ? r(n) : n;
        return this.fire("frame", a), 1 === n ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0, "destroy") : null;
      }
    },
    restart: function (t) {
      var e = (t - this._startTime - this._pausedTime) % this._life;
      this._startTime = t - e + this.gap, this._pausedTime = 0, this._needsRemove = !1;
    },
    fire: function (t, e) {
      t = "on" + t, this[t] && this[t](this._target, e);
    },
    pause: function () {
      this._paused = !0;
    },
    resume: function () {
      this._paused = !1;
    }
  };

  var $u = function () {
    this.head = null, this.tail = null, this._len = 0;
  },
      Qu = $u.prototype;

  Qu.insert = function (t) {
    var e = new Ku(t);
    return this.insertEntry(e), e;
  }, Qu.insertEntry = function (t) {
    this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++;
  }, Qu.remove = function (t) {
    var e = t.prev,
        n = t.next;
    e ? e.next = n : this.head = n, n ? n.prev = e : this.tail = e, t.next = t.prev = null, this._len--;
  }, Qu.len = function () {
    return this._len;
  }, Qu.clear = function () {
    this.head = this.tail = null, this._len = 0;
  };

  var Ku = function (t) {
    this.value = t, this.next, this.prev;
  },
      Ju = function (t) {
    this._list = new $u(), this._map = {}, this._maxSize = t || 10, this._lastRemovedEntry = null;
  },
      tc = Ju.prototype;

  tc.put = function (t, e) {
    var n = this._list,
        i = this._map,
        r = null;

    if (null == i[t]) {
      var a = n.len(),
          o = this._lastRemovedEntry;

      if (a >= this._maxSize && a > 0) {
        var s = n.head;
        n.remove(s), delete i[s.key], r = s.value, this._lastRemovedEntry = s;
      }

      o ? o.value = e : o = new Ku(e), o.key = t, n.insertEntry(o), i[t] = o;
    }

    return r;
  }, tc.get = function (t) {
    var e = this._map[t],
        n = this._list;
    return null != e ? (e !== n.tail && (n.remove(e), n.insertEntry(e)), e.value) : void 0;
  }, tc.clear = function () {
    this._list.clear(), this._map = {};
  };

  var ec = {
    transparent: [0, 0, 0, 0],
    aliceblue: [240, 248, 255, 1],
    antiquewhite: [250, 235, 215, 1],
    aqua: [0, 255, 255, 1],
    aquamarine: [127, 255, 212, 1],
    azure: [240, 255, 255, 1],
    beige: [245, 245, 220, 1],
    bisque: [255, 228, 196, 1],
    black: [0, 0, 0, 1],
    blanchedalmond: [255, 235, 205, 1],
    blue: [0, 0, 255, 1],
    blueviolet: [138, 43, 226, 1],
    brown: [165, 42, 42, 1],
    burlywood: [222, 184, 135, 1],
    cadetblue: [95, 158, 160, 1],
    chartreuse: [127, 255, 0, 1],
    chocolate: [210, 105, 30, 1],
    coral: [255, 127, 80, 1],
    cornflowerblue: [100, 149, 237, 1],
    cornsilk: [255, 248, 220, 1],
    crimson: [220, 20, 60, 1],
    cyan: [0, 255, 255, 1],
    darkblue: [0, 0, 139, 1],
    darkcyan: [0, 139, 139, 1],
    darkgoldenrod: [184, 134, 11, 1],
    darkgray: [169, 169, 169, 1],
    darkgreen: [0, 100, 0, 1],
    darkgrey: [169, 169, 169, 1],
    darkkhaki: [189, 183, 107, 1],
    darkmagenta: [139, 0, 139, 1],
    darkolivegreen: [85, 107, 47, 1],
    darkorange: [255, 140, 0, 1],
    darkorchid: [153, 50, 204, 1],
    darkred: [139, 0, 0, 1],
    darksalmon: [233, 150, 122, 1],
    darkseagreen: [143, 188, 143, 1],
    darkslateblue: [72, 61, 139, 1],
    darkslategray: [47, 79, 79, 1],
    darkslategrey: [47, 79, 79, 1],
    darkturquoise: [0, 206, 209, 1],
    darkviolet: [148, 0, 211, 1],
    deeppink: [255, 20, 147, 1],
    deepskyblue: [0, 191, 255, 1],
    dimgray: [105, 105, 105, 1],
    dimgrey: [105, 105, 105, 1],
    dodgerblue: [30, 144, 255, 1],
    firebrick: [178, 34, 34, 1],
    floralwhite: [255, 250, 240, 1],
    forestgreen: [34, 139, 34, 1],
    fuchsia: [255, 0, 255, 1],
    gainsboro: [220, 220, 220, 1],
    ghostwhite: [248, 248, 255, 1],
    gold: [255, 215, 0, 1],
    goldenrod: [218, 165, 32, 1],
    gray: [128, 128, 128, 1],
    green: [0, 128, 0, 1],
    greenyellow: [173, 255, 47, 1],
    grey: [128, 128, 128, 1],
    honeydew: [240, 255, 240, 1],
    hotpink: [255, 105, 180, 1],
    indianred: [205, 92, 92, 1],
    indigo: [75, 0, 130, 1],
    ivory: [255, 255, 240, 1],
    khaki: [240, 230, 140, 1],
    lavender: [230, 230, 250, 1],
    lavenderblush: [255, 240, 245, 1],
    lawngreen: [124, 252, 0, 1],
    lemonchiffon: [255, 250, 205, 1],
    lightblue: [173, 216, 230, 1],
    lightcoral: [240, 128, 128, 1],
    lightcyan: [224, 255, 255, 1],
    lightgoldenrodyellow: [250, 250, 210, 1],
    lightgray: [211, 211, 211, 1],
    lightgreen: [144, 238, 144, 1],
    lightgrey: [211, 211, 211, 1],
    lightpink: [255, 182, 193, 1],
    lightsalmon: [255, 160, 122, 1],
    lightseagreen: [32, 178, 170, 1],
    lightskyblue: [135, 206, 250, 1],
    lightslategray: [119, 136, 153, 1],
    lightslategrey: [119, 136, 153, 1],
    lightsteelblue: [176, 196, 222, 1],
    lightyellow: [255, 255, 224, 1],
    lime: [0, 255, 0, 1],
    limegreen: [50, 205, 50, 1],
    linen: [250, 240, 230, 1],
    magenta: [255, 0, 255, 1],
    maroon: [128, 0, 0, 1],
    mediumaquamarine: [102, 205, 170, 1],
    mediumblue: [0, 0, 205, 1],
    mediumorchid: [186, 85, 211, 1],
    mediumpurple: [147, 112, 219, 1],
    mediumseagreen: [60, 179, 113, 1],
    mediumslateblue: [123, 104, 238, 1],
    mediumspringgreen: [0, 250, 154, 1],
    mediumturquoise: [72, 209, 204, 1],
    mediumvioletred: [199, 21, 133, 1],
    midnightblue: [25, 25, 112, 1],
    mintcream: [245, 255, 250, 1],
    mistyrose: [255, 228, 225, 1],
    moccasin: [255, 228, 181, 1],
    navajowhite: [255, 222, 173, 1],
    navy: [0, 0, 128, 1],
    oldlace: [253, 245, 230, 1],
    olive: [128, 128, 0, 1],
    olivedrab: [107, 142, 35, 1],
    orange: [255, 165, 0, 1],
    orangered: [255, 69, 0, 1],
    orchid: [218, 112, 214, 1],
    palegoldenrod: [238, 232, 170, 1],
    palegreen: [152, 251, 152, 1],
    paleturquoise: [175, 238, 238, 1],
    palevioletred: [219, 112, 147, 1],
    papayawhip: [255, 239, 213, 1],
    peachpuff: [255, 218, 185, 1],
    peru: [205, 133, 63, 1],
    pink: [255, 192, 203, 1],
    plum: [221, 160, 221, 1],
    powderblue: [176, 224, 230, 1],
    purple: [128, 0, 128, 1],
    red: [255, 0, 0, 1],
    rosybrown: [188, 143, 143, 1],
    royalblue: [65, 105, 225, 1],
    saddlebrown: [139, 69, 19, 1],
    salmon: [250, 128, 114, 1],
    sandybrown: [244, 164, 96, 1],
    seagreen: [46, 139, 87, 1],
    seashell: [255, 245, 238, 1],
    sienna: [160, 82, 45, 1],
    silver: [192, 192, 192, 1],
    skyblue: [135, 206, 235, 1],
    slateblue: [106, 90, 205, 1],
    slategray: [112, 128, 144, 1],
    slategrey: [112, 128, 144, 1],
    snow: [255, 250, 250, 1],
    springgreen: [0, 255, 127, 1],
    steelblue: [70, 130, 180, 1],
    tan: [210, 180, 140, 1],
    teal: [0, 128, 128, 1],
    thistle: [216, 191, 216, 1],
    tomato: [255, 99, 71, 1],
    turquoise: [64, 224, 208, 1],
    violet: [238, 130, 238, 1],
    wheat: [245, 222, 179, 1],
    white: [255, 255, 255, 1],
    whitesmoke: [245, 245, 245, 1],
    yellow: [255, 255, 0, 1],
    yellowgreen: [154, 205, 50, 1]
  },
      nc = new Ju(20),
      ic = null,
      rc = Array.prototype.slice,
      ac = function (t, e, n, i) {
    this._tracks = {}, this._target = t, this._loop = e || !1, this._getter = n || Ve, this._setter = i || We, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = [];
  };

  ac.prototype = {
    when: function (t, e) {
      var n = this._tracks;

      for (var i in e) if (e.hasOwnProperty(i)) {
        if (!n[i]) {
          n[i] = [];

          var r = this._getter(this._target, i);

          if (null == r) continue;
          0 !== t && n[i].push({
            time: 0,
            value: $e(r)
          });
        }

        n[i].push({
          time: t,
          value: e[i]
        });
      }

      return this;
    },
    during: function (t) {
      return this._onframeList.push(t), this;
    },
    pause: function () {
      for (var t = 0; t < this._clipList.length; t++) this._clipList[t].pause();

      this._paused = !0;
    },
    resume: function () {
      for (var t = 0; t < this._clipList.length; t++) this._clipList[t].resume();

      this._paused = !1;
    },
    isPaused: function () {
      return !!this._paused;
    },
    _doneCallback: function () {
      this._tracks = {}, this._clipList.length = 0;

      for (var t = this._doneList, e = t.length, n = 0; e > n; n++) t[n].call(this);
    },
    start: function (t, e) {
      var n,
          i = this,
          r = 0,
          a = function () {
        r--, r || i._doneCallback();
      };

      for (var o in this._tracks) if (this._tracks.hasOwnProperty(o)) {
        var s = Je(this, t, a, this._tracks[o], o, e);
        s && (this._clipList.push(s), r++, this.animation && this.animation.addClip(s), n = s);
      }

      if (n) {
        var l = n.onframe;

        n.onframe = function (t, e) {
          l(t, e);

          for (var n = 0; n < i._onframeList.length; n++) i._onframeList[n](t, e);
        };
      }

      return r || this._doneCallback(), this;
    },
    stop: function (t) {
      for (var e = this._clipList, n = this.animation, i = 0; i < e.length; i++) {
        var r = e[i];
        t && r.onframe(this._target, 1), n && n.removeClip(r);
      }

      e.length = 0;
    },
    delay: function (t) {
      return this._delay = t, this;
    },
    done: function (t) {
      return t && this._doneList.push(t), this;
    },
    getClips: function () {
      return this._clipList;
    }
  };
  var oc = 1;
  "undefined" != typeof window && (oc = Math.max(window.devicePixelRatio || 1, 1));

  var sc = 0,
      lc = oc,
      hc = function () {};

  1 === sc && (hc = console.error);

  var uc = hc,
      cc = function () {
    this.animators = [];
  };

  cc.prototype = {
    constructor: cc,
    animate: function (t, e) {
      var n,
          i = !1,
          r = this,
          a = this.__zr;

      if (t) {
        var o = t.split("."),
            s = r;
        i = "shape" === o[0];

        for (var h = 0, u = o.length; u > h; h++) s && (s = s[o[h]]);

        s && (n = s);
      } else n = r;

      if (!n) return void uc('Property "' + t + '" is not existed in element ' + r.id);
      var c = r.animators,
          d = new ac(n, e);
      return d.during(function () {
        r.dirty(i);
      }).done(function () {
        c.splice(l(c, d), 1);
      }), c.push(d), a && a.animation.addAnimator(d), d;
    },
    stopAnimation: function (t) {
      for (var e = this.animators, n = e.length, i = 0; n > i; i++) e[i].stop(t);

      return e.length = 0, this;
    },
    animateTo: function (t, e, n, i, r, a) {
      tn(this, t, e, n, i, r, a);
    },
    animateFrom: function (t, e, n, i, r, a) {
      tn(this, t, e, n, i, r, a, !0);
    }
  };

  var dc = function (t) {
    Uu.call(this, t), Du.call(this, t), cc.call(this, t), this.id = t.id || hu();
  };

  dc.prototype = {
    type: "element",
    name: "",
    __zr: null,
    ignore: !1,
    clipPath: null,
    isGroup: !1,
    drift: function (t, e) {
      switch (this.draggable) {
        case "horizontal":
          e = 0;
          break;

        case "vertical":
          t = 0;
      }

      var n = this.transform;
      n || (n = this.transform = [1, 0, 0, 1, 0, 0]), n[4] += t, n[5] += e, this.decomposeTransform(), this.dirty(!1);
    },
    beforeUpdate: function () {},
    afterUpdate: function () {},
    update: function () {
      this.updateTransform();
    },
    traverse: function () {},
    attrKV: function (t, e) {
      if ("position" === t || "scale" === t || "origin" === t) {
        if (e) {
          var n = this[t];
          n || (n = this[t] = []), n[0] = e[0], n[1] = e[1];
        }
      } else this[t] = e;
    },
    hide: function () {
      this.ignore = !0, this.__zr && this.__zr.refresh();
    },
    show: function () {
      this.ignore = !1, this.__zr && this.__zr.refresh();
    },
    attr: function (t, e) {
      if ("string" == typeof t) this.attrKV(t, e);else if (w(t)) for (var n in t) t.hasOwnProperty(n) && this.attrKV(n, t[n]);
      return this.dirty(!1), this;
    },
    setClipPath: function (t) {
      var e = this.__zr;
      e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), this.clipPath = t, t.__zr = e, t.__clipTarget = this, this.dirty(!1);
    },
    removeClipPath: function () {
      var t = this.clipPath;
      t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, this.clipPath = null, this.dirty(!1));
    },
    addSelfToZr: function (t) {
      this.__zr = t;
      var e = this.animators;
      if (e) for (var n = 0; n < e.length; n++) t.animation.addAnimator(e[n]);
      this.clipPath && this.clipPath.addSelfToZr(t);
    },
    removeSelfFromZr: function (t) {
      this.__zr = null;
      var e = this.animators;
      if (e) for (var n = 0; n < e.length; n++) t.animation.removeAnimator(e[n]);
      this.clipPath && this.clipPath.removeSelfFromZr(t);
    }
  }, u(dc, cc), u(dc, Uu), u(dc, Du);
  var fc = Y,
      pc = Math.min,
      gc = Math.max;
  rn.prototype = {
    constructor: rn,
    union: function (t) {
      var e = pc(t.x, this.x),
          n = pc(t.y, this.y);
      this.width = gc(t.x + t.width, this.x + this.width) - e, this.height = gc(t.y + t.height, this.y + this.height) - n, this.x = e, this.y = n;
    },
    applyTransform: function () {
      var t = [],
          e = [],
          n = [],
          i = [];
      return function (r) {
        if (r) {
          t[0] = n[0] = this.x, t[1] = i[1] = this.y, e[0] = i[0] = this.x + this.width, e[1] = n[1] = this.y + this.height, fc(t, t, r), fc(e, e, r), fc(n, n, r), fc(i, i, r), this.x = pc(t[0], e[0], n[0], i[0]), this.y = pc(t[1], e[1], n[1], i[1]);
          var a = gc(t[0], e[0], n[0], i[0]),
              o = gc(t[1], e[1], n[1], i[1]);
          this.width = a - this.x, this.height = o - this.y;
        }
      };
    }(),
    calculateTransform: function (t) {
      var e = this,
          n = t.width / e.width,
          i = t.height / e.height,
          r = _e();

      return be(r, r, [-e.x, -e.y]), Me(r, r, [n, i]), be(r, r, [t.x, t.y]), r;
    },
    intersect: function (t) {
      if (!t) return !1;
      t instanceof rn || (t = rn.create(t));
      var e = this,
          n = e.x,
          i = e.x + e.width,
          r = e.y,
          a = e.y + e.height,
          o = t.x,
          s = t.x + t.width,
          l = t.y,
          h = t.y + t.height;
      return !(o > i || n > s || l > a || r > h);
    },
    contain: function (t, e) {
      var n = this;
      return t >= n.x && t <= n.x + n.width && e >= n.y && e <= n.y + n.height;
    },
    clone: function () {
      return new rn(this.x, this.y, this.width, this.height);
    },
    copy: function (t) {
      this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height;
    },
    plain: function () {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
    }
  }, rn.create = function (t) {
    return new rn(t.x, t.y, t.width, t.height);
  };

  var vc = function (t) {
    t = t || {}, dc.call(this, t);

    for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);

    this._children = [], this.__storage = null, this.__dirty = !0;
  };

  vc.prototype = {
    constructor: vc,
    isGroup: !0,
    type: "group",
    silent: !1,
    children: function () {
      return this._children.slice();
    },
    childAt: function (t) {
      return this._children[t];
    },
    childOfName: function (t) {
      for (var e = this._children, n = 0; n < e.length; n++) if (e[n].name === t) return e[n];
    },
    childCount: function () {
      return this._children.length;
    },
    add: function (t) {
      return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), this;
    },
    addBefore: function (t, e) {
      if (t && t !== this && t.parent !== this && e && e.parent === this) {
        var n = this._children,
            i = n.indexOf(e);
        i >= 0 && (n.splice(i, 0, t), this._doAdd(t));
      }

      return this;
    },
    _doAdd: function (t) {
      t.parent && t.parent.remove(t), t.parent = this;
      var e = this.__storage,
          n = this.__zr;
      e && e !== t.__storage && (e.addToStorage(t), t instanceof vc && t.addChildrenToStorage(e)), n && n.refresh();
    },
    remove: function (t) {
      var e = this.__zr,
          n = this.__storage,
          i = this._children,
          r = l(i, t);
      return 0 > r ? this : (i.splice(r, 1), t.parent = null, n && (n.delFromStorage(t), t instanceof vc && t.delChildrenFromStorage(n)), e && e.refresh(), this);
    },
    removeAll: function () {
      var t,
          e,
          n = this._children,
          i = this.__storage;

      for (e = 0; e < n.length; e++) t = n[e], i && (i.delFromStorage(t), t instanceof vc && t.delChildrenFromStorage(i)), t.parent = null;

      return n.length = 0, this;
    },
    eachChild: function (t, e) {
      for (var n = this._children, i = 0; i < n.length; i++) {
        var r = n[i];
        t.call(e, r, i);
      }

      return this;
    },
    traverse: function (t, e) {
      for (var n = 0; n < this._children.length; n++) {
        var i = this._children[n];
        t.call(e, i), "group" === i.type && i.traverse(t, e);
      }

      return this;
    },
    addChildrenToStorage: function (t) {
      for (var e = 0; e < this._children.length; e++) {
        var n = this._children[e];
        t.addToStorage(n), n instanceof vc && n.addChildrenToStorage(t);
      }
    },
    delChildrenFromStorage: function (t) {
      for (var e = 0; e < this._children.length; e++) {
        var n = this._children[e];
        t.delFromStorage(n), n instanceof vc && n.delChildrenFromStorage(t);
      }
    },
    dirty: function () {
      return this.__dirty = !0, this.__zr && this.__zr.refresh(), this;
    },
    getBoundingRect: function (t) {
      for (var e = null, n = new rn(0, 0, 0, 0), i = t || this._children, r = [], a = 0; a < i.length; a++) {
        var o = i[a];

        if (!o.ignore && !o.invisible) {
          var s = o.getBoundingRect(),
              l = o.getLocalTransform(r);
          l ? (n.copy(s), n.applyTransform(l), e = e || n.clone(), e.union(n)) : (e = e || s.clone(), e.union(s));
        }
      }

      return e || n;
    }
  }, h(vc, dc);

  var mc = 32,
      _c = 7,
      yc = function () {
    this._roots = [], this._displayList = [], this._displayListLen = 0;
  };

  yc.prototype = {
    constructor: yc,
    traverse: function (t, e) {
      for (var n = 0; n < this._roots.length; n++) this._roots[n].traverse(t, e);
    },
    getDisplayList: function (t, e) {
      return e = e || !1, t && this.updateDisplayList(e), this._displayList;
    },
    updateDisplayList: function (t) {
      this._displayListLen = 0;

      for (var e = this._roots, n = this._displayList, i = 0, r = e.length; r > i; i++) this._updateAndAddDisplayable(e[i], null, t);

      n.length = this._displayListLen, cu.canvasSupported && dn(n, fn);
    },
    _updateAndAddDisplayable: function (t, e, n) {
      if (!t.ignore || n) {
        t.beforeUpdate(), t.__dirty && t.update(), t.afterUpdate();
        var i = t.clipPath;

        if (i) {
          e = e ? e.slice() : [];

          for (var r = i, a = t; r;) r.parent = a, r.updateTransform(), e.push(r), a = r, r = r.clipPath;
        }

        if (t.isGroup) {
          for (var o = t._children, s = 0; s < o.length; s++) {
            var l = o[s];
            t.__dirty && (l.__dirty = !0), this._updateAndAddDisplayable(l, e, n);
          }

          t.__dirty = !1;
        } else t.__clipPaths = e, this._displayList[this._displayListLen++] = t;
      }
    },
    addRoot: function (t) {
      t.__storage !== this && (t instanceof vc && t.addChildrenToStorage(this), this.addToStorage(t), this._roots.push(t));
    },
    delRoot: function (t) {
      if (null == t) {
        for (var e = 0; e < this._roots.length; e++) {
          var n = this._roots[e];
          n instanceof vc && n.delChildrenFromStorage(this);
        }

        return this._roots = [], this._displayList = [], void (this._displayListLen = 0);
      }

      if (t instanceof Array) for (var e = 0, i = t.length; i > e; e++) this.delRoot(t[e]);else {
        var r = l(this._roots, t);
        r >= 0 && (this.delFromStorage(t), this._roots.splice(r, 1), t instanceof vc && t.delChildrenFromStorage(this));
      }
    },
    addToStorage: function (t) {
      return t && (t.__storage = this, t.dirty(!1)), this;
    },
    delFromStorage: function (t) {
      return t && (t.__storage = null), this;
    },
    dispose: function () {
      this._renderList = this._roots = null;
    },
    displayableSortFunc: fn
  };

  var xc = {
    shadowBlur: 1,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    textShadowBlur: 1,
    textShadowOffsetX: 1,
    textShadowOffsetY: 1,
    textBoxShadowBlur: 1,
    textBoxShadowOffsetX: 1,
    textBoxShadowOffsetY: 1
  },
      wc = function (t, e, n) {
    return xc.hasOwnProperty(e) ? n *= t.dpr : n;
  },
      bc = {
    NONE: 0,
    STYLE_BIND: 1,
    PLAIN_TEXT: 2
  },
      Sc = 9,
      Mc = [["shadowBlur", 0], ["shadowOffsetX", 0], ["shadowOffsetY", 0], ["shadowColor", "#000"], ["lineCap", "butt"], ["lineJoin", "miter"], ["miterLimit", 10]],
      Tc = function (t) {
    this.extendFrom(t, !1);
  };

  Tc.prototype = {
    constructor: Tc,
    fill: "#000",
    stroke: null,
    opacity: 1,
    fillOpacity: null,
    strokeOpacity: null,
    lineDash: null,
    lineDashOffset: 0,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    lineWidth: 1,
    strokeNoScale: !1,
    text: null,
    font: null,
    textFont: null,
    fontStyle: null,
    fontWeight: null,
    fontSize: null,
    fontFamily: null,
    textTag: null,
    textFill: "#000",
    textStroke: null,
    textWidth: null,
    textHeight: null,
    textStrokeWidth: 0,
    textLineHeight: null,
    textPosition: "inside",
    textRect: null,
    textOffset: null,
    textAlign: null,
    textVerticalAlign: null,
    textDistance: 5,
    textShadowColor: "transparent",
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0,
    textBoxShadowColor: "transparent",
    textBoxShadowBlur: 0,
    textBoxShadowOffsetX: 0,
    textBoxShadowOffsetY: 0,
    transformText: !1,
    textRotation: 0,
    textOrigin: null,
    textBackgroundColor: null,
    textBorderColor: null,
    textBorderWidth: 0,
    textBorderRadius: 0,
    textPadding: null,
    rich: null,
    truncate: null,
    blend: null,
    bind: function (t, e, n) {
      var i = this,
          r = n && n.style,
          a = !r || t.__attrCachedBy !== bc.STYLE_BIND;
      t.__attrCachedBy = bc.STYLE_BIND;

      for (var o = 0; o < Mc.length; o++) {
        var s = Mc[o],
            l = s[0];
        (a || i[l] !== r[l]) && (t[l] = wc(t, l, i[l] || s[1]));
      }

      if ((a || i.fill !== r.fill) && (t.fillStyle = i.fill), (a || i.stroke !== r.stroke) && (t.strokeStyle = i.stroke), (a || i.opacity !== r.opacity) && (t.globalAlpha = null == i.opacity ? 1 : i.opacity), (a || i.blend !== r.blend) && (t.globalCompositeOperation = i.blend || "source-over"), this.hasStroke()) {
        var h = i.lineWidth;
        t.lineWidth = h / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1);
      }
    },
    hasFill: function () {
      var t = this.fill;
      return null != t && "none" !== t;
    },
    hasStroke: function () {
      var t = this.stroke;
      return null != t && "none" !== t && this.lineWidth > 0;
    },
    extendFrom: function (t, e) {
      if (t) for (var n in t) !t.hasOwnProperty(n) || e !== !0 && (e === !1 ? this.hasOwnProperty(n) : null == t[n]) || (this[n] = t[n]);
    },
    set: function (t, e) {
      "string" == typeof t ? this[t] = e : this.extendFrom(t, !0);
    },
    clone: function () {
      var t = new this.constructor();
      return t.extendFrom(this, !0), t;
    },
    getGradient: function (t, e, n) {
      for (var i = "radial" === e.type ? gn : pn, r = i(t, e, n), a = e.colorStops, o = 0; o < a.length; o++) r.addColorStop(a[o].offset, a[o].color);

      return r;
    }
  };

  for (var Ic = Tc.prototype, Cc = 0; Cc < Mc.length; Cc++) {
    var kc = Mc[Cc];
    kc[0] in Ic || (Ic[kc[0]] = kc[1]);
  }

  Tc.getGradient = Ic.getGradient;

  var Dc = function (t, e) {
    this.image = t, this.repeat = e, this.type = "pattern";
  };

  Dc.prototype.getCanvasPattern = function (t) {
    return t.createPattern(this.image, this.repeat || "repeat");
  };

  var Ac = function (t, e, n) {
    var i;
    n = n || lc, "string" == typeof t ? i = mn(t, e, n) : w(t) && (i = t, t = i.id), this.id = t, this.dom = i;
    var r = i.style;
    r && (i.onselectstart = vn, r["-webkit-user-select"] = "none", r["user-select"] = "none", r["-webkit-touch-callout"] = "none", r["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", r.padding = 0, r.margin = 0, r["border-width"] = 0), this.domBack = null, this.ctxBack = null, this.painter = e, this.config = null, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.dpr = n;
  };

  Ac.prototype = {
    constructor: Ac,
    __dirty: !0,
    __used: !1,
    __drawIndex: 0,
    __startIndex: 0,
    __endIndex: 0,
    incremental: !1,
    getElementCount: function () {
      return this.__endIndex - this.__startIndex;
    },
    initContext: function () {
      this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
    },
    createBackBuffer: function () {
      var t = this.dpr;
      this.domBack = mn("back-" + this.id, this.painter, t), this.ctxBack = this.domBack.getContext("2d"), 1 !== t && this.ctxBack.scale(t, t);
    },
    resize: function (t, e) {
      var n = this.dpr,
          i = this.dom,
          r = i.style,
          a = this.domBack;
      r && (r.width = t + "px", r.height = e + "px"), i.width = t * n, i.height = e * n, a && (a.width = t * n, a.height = e * n, 1 !== n && this.ctxBack.scale(n, n));
    },
    clear: function (t, e) {
      var n = this.dom,
          i = this.ctx,
          r = n.width,
          a = n.height,
          e = e || this.clearColor,
          o = this.motionBlur && !t,
          s = this.lastFrameAlpha,
          l = this.dpr;

      if (o && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(n, 0, 0, r / l, a / l)), i.clearRect(0, 0, r, a), e && "transparent" !== e) {
        var h;
        e.colorStops ? (h = e.__canvasGradient || Tc.getGradient(i, e, {
          x: 0,
          y: 0,
          width: r,
          height: a
        }), e.__canvasGradient = h) : e.image && (h = Dc.prototype.getCanvasPattern.call(e, i)), i.save(), i.fillStyle = h || e, i.fillRect(0, 0, r, a), i.restore();
      }

      if (o) {
        var u = this.domBack;
        i.save(), i.globalAlpha = s, i.drawImage(u, 0, 0, r, a), i.restore();
      }
    }
  };

  var Pc = "undefined" != typeof window && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function (t) {
    setTimeout(t, 16);
  },
      Oc = new Ju(50),
      Lc = {},
      Ec = 0,
      Bc = 5e3,
      Rc = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,
      zc = "12px sans-serif",
      Nc = {};

  Nc.measureText = function (t, e) {
    var n = s();
    return n.font = e || zc, n.measureText(t);
  };

  var Fc = zc,
      Hc = {
    left: 1,
    right: 1,
    center: 1
  },
      Vc = {
    top: 1,
    bottom: 1,
    middle: 1
  },
      Wc = [["textShadowBlur", "shadowBlur", 0], ["textShadowOffsetX", "shadowOffsetX", 0], ["textShadowOffsetY", "shadowOffsetY", 0], ["textShadowColor", "shadowColor", "transparent"]],
      Gc = {},
      Uc = {},
      Xc = new rn(),
      Yc = function () {};

  Yc.prototype = {
    constructor: Yc,
    drawRectText: function (t, e) {
      var n = this.style;
      e = n.textRect || e, this.__dirty && Hn(n, !0);
      var i = n.text;

      if (null != i && (i += ""), ii(i, n)) {
        t.save();
        var r = this.transform;
        n.transformText ? this.setTransform(t) : r && (Xc.copy(e), Xc.applyTransform(r), e = Xc), Wn(this, t, i, n, e, Sc), t.restore();
      }
    }
  }, ri.prototype = {
    constructor: ri,
    type: "displayable",
    __dirty: !0,
    invisible: !1,
    z: 0,
    z2: 0,
    zlevel: 0,
    draggable: !1,
    dragging: !1,
    silent: !1,
    culling: !1,
    cursor: "pointer",
    rectHover: !1,
    progressive: !1,
    incremental: !1,
    globalScaleRatio: 1,
    beforeBrush: function () {},
    afterBrush: function () {},
    brush: function () {},
    getBoundingRect: function () {},
    contain: function (t, e) {
      return this.rectContain(t, e);
    },
    traverse: function (t, e) {
      t.call(e, this);
    },
    rectContain: function (t, e) {
      var n = this.transformCoordToLocal(t, e),
          i = this.getBoundingRect();
      return i.contain(n[0], n[1]);
    },
    dirty: function () {
      this.__dirty = this.__dirtyText = !0, this._rect = null, this.__zr && this.__zr.refresh();
    },
    animateStyle: function (t) {
      return this.animate("style", t);
    },
    attrKV: function (t, e) {
      "style" !== t ? dc.prototype.attrKV.call(this, t, e) : this.style.set(e);
    },
    setStyle: function (t, e) {
      return this.style.set(t, e), this.dirty(!1), this;
    },
    useStyle: function (t) {
      return this.style = new Tc(t, this), this.dirty(!1), this;
    },
    calculateTextPosition: null
  }, h(ri, dc), u(ri, Yc), ai.prototype = {
    constructor: ai,
    type: "image",
    brush: function (t, e) {
      var n = this.style,
          i = n.image;
      n.bind(t, this, e);
      var r = this._image = yn(i, this._image, this, this.onload);

      if (r && wn(r)) {
        var a = n.x || 0,
            o = n.y || 0,
            s = n.width,
            l = n.height,
            h = r.width / r.height;

        if (null == s && null != l ? s = l * h : null == l && null != s ? l = s / h : null == s && null == l && (s = r.width, l = r.height), this.setTransform(t), n.sWidth && n.sHeight) {
          var u = n.sx || 0,
              c = n.sy || 0;
          t.drawImage(r, u, c, n.sWidth, n.sHeight, a, o, s, l);
        } else if (n.sx && n.sy) {
          var u = n.sx,
              c = n.sy,
              d = s - u,
              f = l - c;
          t.drawImage(r, u, c, d, f, a, o, s, l);
        } else t.drawImage(r, a, o, s, l);

        null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()));
      }
    },
    getBoundingRect: function () {
      var t = this.style;
      return this._rect || (this._rect = new rn(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), this._rect;
    }
  }, h(ai, ri);

  var qc = 1e5,
      jc = 314159,
      Zc = .01,
      $c = .001,
      Qc = new rn(0, 0, 0, 0),
      Kc = new rn(0, 0, 0, 0),
      Jc = function (t, e, n) {
    this.type = "canvas";
    var i = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();
    this._opts = n = a({}, n || {}), this.dpr = n.devicePixelRatio || lc, this._singleCanvas = i, this.root = t;
    var r = t.style;
    r && (r["-webkit-tap-highlight-color"] = "transparent", r["-webkit-user-select"] = r["user-select"] = r["-webkit-touch-callout"] = "none", t.innerHTML = ""), this.storage = e;
    var o = this._zlevelList = [],
        s = this._layers = {};

    if (this._layerConfig = {}, this._needsManuallyCompositing = !1, i) {
      var l = t.width,
          h = t.height;
      null != n.width && (l = n.width), null != n.height && (h = n.height), this.dpr = n.devicePixelRatio || 1, t.width = l * this.dpr, t.height = h * this.dpr, this._width = l, this._height = h;
      var u = new Ac(t, this, this.dpr);
      u.__builtin__ = !0, u.initContext(), s[jc] = u, u.zlevel = jc, o.push(jc), this._domRoot = t;
    } else {
      this._width = this._getSize(0), this._height = this._getSize(1);
      var c = this._domRoot = ci(this._width, this._height);
      t.appendChild(c);
    }

    this._hoverlayer = null, this._hoverElements = [];
  };

  Jc.prototype = {
    constructor: Jc,
    getType: function () {
      return "canvas";
    },
    isSingleCanvas: function () {
      return this._singleCanvas;
    },
    getViewportRoot: function () {
      return this._domRoot;
    },
    getViewportRootOffset: function () {
      var t = this.getViewportRoot();
      return t ? {
        offsetLeft: t.offsetLeft || 0,
        offsetTop: t.offsetTop || 0
      } : void 0;
    },
    refresh: function (t) {
      var e = this.storage.getDisplayList(!0),
          n = this._zlevelList;
      this._redrawId = Math.random(), this._paintList(e, t, this._redrawId);

      for (var i = 0; i < n.length; i++) {
        var r = n[i],
            a = this._layers[r];

        if (!a.__builtin__ && a.refresh) {
          var o = 0 === i ? this._backgroundColor : null;
          a.refresh(o);
        }
      }

      return this.refreshHover(), this;
    },
    addHover: function (t, e) {
      if (!t.__hoverMir) {
        var n = new t.constructor({
          style: t.style,
          shape: t.shape,
          z: t.z,
          z2: t.z2,
          silent: t.silent
        });
        return n.__from = t, t.__hoverMir = n, e && n.setStyle(e), this._hoverElements.push(n), n;
      }
    },
    removeHover: function (t) {
      var e = t.__hoverMir,
          n = this._hoverElements,
          i = l(n, e);
      i >= 0 && n.splice(i, 1), t.__hoverMir = null;
    },
    clearHover: function () {
      for (var t = this._hoverElements, e = 0; e < t.length; e++) {
        var n = t[e].__from;
        n && (n.__hoverMir = null);
      }

      t.length = 0;
    },
    refreshHover: function () {
      var t = this._hoverElements,
          e = t.length,
          n = this._hoverlayer;

      if (n && n.clear(), e) {
        dn(t, this.storage.displayableSortFunc), n || (n = this._hoverlayer = this.getLayer(qc));
        var i = {};
        n.ctx.save();

        for (var r = 0; e > r;) {
          var a = t[r],
              o = a.__from;
          o && o.__zr ? (r++, o.invisible || (a.transform = o.transform, a.invTransform = o.invTransform, a.__clipPaths = o.__clipPaths, this._doPaintEl(a, n, !0, i))) : (t.splice(r, 1), o.__hoverMir = null, e--);
        }

        n.ctx.restore();
      }
    },
    getHoverLayer: function () {
      return this.getLayer(qc);
    },
    _paintList: function (t, e, n) {
      if (this._redrawId === n) {
        e = e || !1, this._updateLayerStatus(t);

        var i = this._doPaintList(t, e);

        if (this._needsManuallyCompositing && this._compositeManually(), !i) {
          var r = this;
          Pc(function () {
            r._paintList(t, e, n);
          });
        }
      }
    },
    _compositeManually: function () {
      var t = this.getLayer(jc).ctx,
          e = this._domRoot.width,
          n = this._domRoot.height;
      t.clearRect(0, 0, e, n), this.eachBuiltinLayer(function (i) {
        i.virtual && t.drawImage(i.dom, 0, 0, e, n);
      });
    },
    _doPaintList: function (t, e) {
      for (var n = [], i = 0; i < this._zlevelList.length; i++) {
        var r = this._zlevelList[i],
            a = this._layers[r];
        a.__builtin__ && a !== this._hoverlayer && (a.__dirty || e) && n.push(a);
      }

      for (var o = !0, s = 0; s < n.length; s++) {
        var a = n[s],
            l = a.ctx,
            h = {};
        l.save();
        var u = e ? a.__startIndex : a.__drawIndex,
            c = !e && a.incremental && Date.now,
            f = c && Date.now(),
            p = a.zlevel === this._zlevelList[0] ? this._backgroundColor : null;
        if (a.__startIndex === a.__endIndex) a.clear(!1, p);else if (u === a.__startIndex) {
          var g = t[u];
          g.incremental && g.notClear && !e || a.clear(!1, p);
        }
        -1 === u && (console.error("For some unknown reason. drawIndex is -1"), u = a.__startIndex);

        for (var v = u; v < a.__endIndex; v++) {
          var m = t[v];

          if (this._doPaintEl(m, a, e, h), m.__dirty = m.__dirtyText = !1, c) {
            var _ = Date.now() - f;

            if (_ > 15) break;
          }
        }

        a.__drawIndex = v, a.__drawIndex < a.__endIndex && (o = !1), h.prevElClipPaths && l.restore(), l.restore();
      }

      return cu.wxa && d(this._layers, function (t) {
        t && t.ctx && t.ctx.draw && t.ctx.draw();
      }), o;
    },
    _doPaintEl: function (t, e, n, i) {
      var r = e.ctx,
          a = t.transform;

      if (!(!e.__dirty && !n || t.invisible || 0 === t.style.opacity || a && !a[0] && !a[3] || t.culling && li(t, this._width, this._height))) {
        var o = t.__clipPaths,
            s = i.prevElClipPaths;
        (!s || hi(o, s)) && (s && (r.restore(), i.prevElClipPaths = null, i.prevEl = null), o && (r.save(), ui(o, r), i.prevElClipPaths = o)), t.beforeBrush && t.beforeBrush(r), t.brush(r, i.prevEl || null), i.prevEl = t, t.afterBrush && t.afterBrush(r);
      }
    },
    getLayer: function (t, e) {
      this._singleCanvas && !this._needsManuallyCompositing && (t = jc);
      var n = this._layers[t];
      return n || (n = new Ac("zr_" + t, this, this.dpr), n.zlevel = t, n.__builtin__ = !0, this._layerConfig[t] && r(n, this._layerConfig[t], !0), e && (n.virtual = e), this.insertLayer(t, n), n.initContext()), n;
    },
    insertLayer: function (t, e) {
      var n = this._layers,
          i = this._zlevelList,
          r = i.length,
          a = null,
          o = -1,
          s = this._domRoot;
      if (n[t]) return void uc("ZLevel " + t + " has been used already");
      if (!si(e)) return void uc("Layer of zlevel " + t + " is not valid");

      if (r > 0 && t > i[0]) {
        for (o = 0; r - 1 > o && !(i[o] < t && i[o + 1] > t); o++);

        a = n[i[o]];
      }

      if (i.splice(o + 1, 0, t), n[t] = e, !e.virtual) if (a) {
        var l = a.dom;
        l.nextSibling ? s.insertBefore(e.dom, l.nextSibling) : s.appendChild(e.dom);
      } else s.firstChild ? s.insertBefore(e.dom, s.firstChild) : s.appendChild(e.dom);
    },
    eachLayer: function (t, e) {
      var n,
          i,
          r = this._zlevelList;

      for (i = 0; i < r.length; i++) n = r[i], t.call(e, this._layers[n], n);
    },
    eachBuiltinLayer: function (t, e) {
      var n,
          i,
          r,
          a = this._zlevelList;

      for (r = 0; r < a.length; r++) i = a[r], n = this._layers[i], n.__builtin__ && t.call(e, n, i);
    },
    eachOtherLayer: function (t, e) {
      var n,
          i,
          r,
          a = this._zlevelList;

      for (r = 0; r < a.length; r++) i = a[r], n = this._layers[i], n.__builtin__ || t.call(e, n, i);
    },
    getLayers: function () {
      return this._layers;
    },
    _updateLayerStatus: function (t) {
      function e(t) {
        r && (r.__endIndex !== t && (r.__dirty = !0), r.__endIndex = t);
      }

      if (this.eachBuiltinLayer(function (t) {
        t.__dirty = t.__used = !1;
      }), this._singleCanvas) for (var n = 1; n < t.length; n++) {
        var i = t[n];

        if (i.zlevel !== t[n - 1].zlevel || i.incremental) {
          this._needsManuallyCompositing = !0;
          break;
        }
      }

      for (var r = null, a = 0, n = 0; n < t.length; n++) {
        var o,
            i = t[n],
            s = i.zlevel;
        i.incremental ? (o = this.getLayer(s + $c, this._needsManuallyCompositing), o.incremental = !0, a = 1) : o = this.getLayer(s + (a > 0 ? Zc : 0), this._needsManuallyCompositing), o.__builtin__ || uc("ZLevel " + s + " has been used by unkown layer " + o.id), o !== r && (o.__used = !0, o.__startIndex !== n && (o.__dirty = !0), o.__startIndex = n, o.__drawIndex = o.incremental ? -1 : n, e(n), r = o), i.__dirty && (o.__dirty = !0, o.incremental && o.__drawIndex < 0 && (o.__drawIndex = n));
      }

      e(n), this.eachBuiltinLayer(function (t) {
        !t.__used && t.getElementCount() > 0 && (t.__dirty = !0, t.__startIndex = t.__endIndex = t.__drawIndex = 0), t.__dirty && t.__drawIndex < 0 && (t.__drawIndex = t.__startIndex);
      });
    },
    clear: function () {
      return this.eachBuiltinLayer(this._clearLayer), this;
    },
    _clearLayer: function (t) {
      t.clear();
    },
    setBackgroundColor: function (t) {
      this._backgroundColor = t;
    },
    configLayer: function (t, e) {
      if (e) {
        var n = this._layerConfig;
        n[t] ? r(n[t], e, !0) : n[t] = e;

        for (var i = 0; i < this._zlevelList.length; i++) {
          var a = this._zlevelList[i];

          if (a === t || a === t + Zc) {
            var o = this._layers[a];
            r(o, n[t], !0);
          }
        }
      }
    },
    delLayer: function (t) {
      var e = this._layers,
          n = this._zlevelList,
          i = e[t];
      i && (i.dom.parentNode.removeChild(i.dom), delete e[t], n.splice(l(n, t), 1));
    },
    resize: function (t, e) {
      if (this._domRoot.style) {
        var n = this._domRoot;
        n.style.display = "none";
        var i = this._opts;

        if (null != t && (i.width = t), null != e && (i.height = e), t = this._getSize(0), e = this._getSize(1), n.style.display = "", this._width !== t || e !== this._height) {
          n.style.width = t + "px", n.style.height = e + "px";

          for (var r in this._layers) this._layers.hasOwnProperty(r) && this._layers[r].resize(t, e);

          d(this._progressiveLayers, function (n) {
            n.resize(t, e);
          }), this.refresh(!0);
        }

        this._width = t, this._height = e;
      } else {
        if (null == t || null == e) return;
        this._width = t, this._height = e, this.getLayer(jc).resize(t, e);
      }

      return this;
    },
    clearLayer: function (t) {
      var e = this._layers[t];
      e && e.clear();
    },
    dispose: function () {
      this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
    },
    getRenderedCanvas: function (t) {
      if (t = t || {}, this._singleCanvas && !this._compositeManually) return this._layers[jc].dom;
      var e = new Ac("image", this, t.pixelRatio || this.dpr);

      if (e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor), t.pixelRatio <= this.dpr) {
        this.refresh();
        var n = e.dom.width,
            i = e.dom.height,
            r = e.ctx;
        this.eachLayer(function (t) {
          t.__builtin__ ? r.drawImage(t.dom, 0, 0, n, i) : t.renderToCanvas && (e.ctx.save(), t.renderToCanvas(e.ctx), e.ctx.restore());
        });
      } else for (var a = {}, o = this.storage.getDisplayList(!0), s = 0; s < o.length; s++) {
        var l = o[s];

        this._doPaintEl(l, e, !0, a);
      }

      return e.dom;
    },
    getWidth: function () {
      return this._width;
    },
    getHeight: function () {
      return this._height;
    },
    _getSize: function (t) {
      var e = this._opts,
          n = ["width", "height"][t],
          i = ["clientWidth", "clientHeight"][t],
          r = ["paddingLeft", "paddingTop"][t],
          a = ["paddingRight", "paddingBottom"][t];
      if (null != e[n] && "auto" !== e[n]) return parseFloat(e[n]);
      var o = this.root,
          s = document.defaultView.getComputedStyle(o);
      return (o[i] || oi(s[n]) || oi(o.style[n])) - (oi(s[r]) || 0) - (oi(s[a]) || 0) | 0;
    },
    pathToImage: function (t, e) {
      e = e || this.dpr;
      var n = document.createElement("canvas"),
          i = n.getContext("2d"),
          r = t.getBoundingRect(),
          a = t.style,
          o = a.shadowBlur * e,
          s = a.shadowOffsetX * e,
          l = a.shadowOffsetY * e,
          h = a.hasStroke() ? a.lineWidth : 0,
          u = Math.max(h / 2, -s + o),
          c = Math.max(h / 2, s + o),
          d = Math.max(h / 2, -l + o),
          f = Math.max(h / 2, l + o),
          p = r.width + u + c,
          g = r.height + d + f;
      n.width = p * e, n.height = g * e, i.scale(e, e), i.clearRect(0, 0, p, g), i.dpr = e;
      var v = {
        position: t.position,
        rotation: t.rotation,
        scale: t.scale
      };
      t.position = [u - r.x, d - r.y], t.rotation = 0, t.scale = [1, 1], t.updateTransform(), t && t.brush(i);

      var m = ai,
          _ = new m({
        style: {
          x: 0,
          y: 0,
          image: n
        }
      });

      return null != v.position && (_.position = t.position = v.position), null != v.rotation && (_.rotation = t.rotation = v.rotation), null != v.scale && (_.scale = t.scale = v.scale), _;
    }
  };

  var td = function (t) {
    t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function () {}, this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, this._paused = !1, Du.call(this);
  };

  td.prototype = {
    constructor: td,
    addClip: function (t) {
      this._clips.push(t);
    },
    addAnimator: function (t) {
      t.animation = this;

      for (var e = t.getClips(), n = 0; n < e.length; n++) this.addClip(e[n]);
    },
    removeClip: function (t) {
      var e = l(this._clips, t);
      e >= 0 && this._clips.splice(e, 1);
    },
    removeAnimator: function (t) {
      for (var e = t.getClips(), n = 0; n < e.length; n++) this.removeClip(e[n]);

      t.animation = null;
    },
    _update: function () {
      for (var t = new Date().getTime() - this._pausedTime, e = t - this._time, n = this._clips, i = n.length, r = [], a = [], o = 0; i > o; o++) {
        var s = n[o],
            l = s.step(t, e);
        l && (r.push(l), a.push(s));
      }

      for (var o = 0; i > o;) n[o]._needsRemove ? (n[o] = n[i - 1], n.pop(), i--) : o++;

      i = r.length;

      for (var o = 0; i > o; o++) a[o].fire(r[o]);

      this._time = t, this.onframe(e), this.trigger("frame", e), this.stage.update && this.stage.update();
    },
    _startLoop: function () {
      function t() {
        e._running && (Pc(t), !e._paused && e._update());
      }

      var e = this;
      this._running = !0, Pc(t);
    },
    start: function () {
      this._time = new Date().getTime(), this._pausedTime = 0, this._startLoop();
    },
    stop: function () {
      this._running = !1;
    },
    pause: function () {
      this._paused || (this._pauseStart = new Date().getTime(), this._paused = !0);
    },
    resume: function () {
      this._paused && (this._pausedTime += new Date().getTime() - this._pauseStart, this._paused = !1);
    },
    clear: function () {
      this._clips = [];
    },
    isFinished: function () {
      return !this._clips.length;
    },
    animate: function (t, e) {
      e = e || {};
      var n = new ac(t, e.loop, e.getter, e.setter);
      return this.addAnimator(n), n;
    }
  }, u(td, Du);

  var ed = 300,
      nd = cu.domSupported,
      id = function () {
    var t = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
        e = ["touchstart", "touchend", "touchmove"],
        n = {
      pointerdown: 1,
      pointerup: 1,
      pointermove: 1,
      pointerout: 1
    },
        i = f(t, function (t) {
      var e = t.replace("mouse", "pointer");
      return n.hasOwnProperty(e) ? e : t;
    });
    return {
      mouse: t,
      touch: e,
      pointer: i
    };
  }(),
      rd = {
    mouse: ["mousemove", "mouseup"],
    pointer: ["pointermove", "pointerup"]
  },
      ad = _i.prototype;

  ad.stopPropagation = ad.stopImmediatePropagation = ad.preventDefault = B;
  var od = {
    mousedown: function (t) {
      t = le(this.dom, t), this._mayPointerCapture = [t.zrX, t.zrY], this.trigger("mousedown", t);
    },
    mousemove: function (t) {
      t = le(this.dom, t);
      var e = this._mayPointerCapture;
      !e || t.zrX === e[0] && t.zrY === e[1] || Si(this, !0), this.trigger("mousemove", t);
    },
    mouseup: function (t) {
      t = le(this.dom, t), Si(this, !1), this.trigger("mouseup", t);
    },
    mouseout: function (t) {
      t = le(this.dom, t), this._pointerCapturing && (t.zrEventControl = "no_globalout");
      var e = t.toElement || t.relatedTarget;
      t.zrIsToLocalDOM = mi(this, e), this.trigger("mouseout", t);
    },
    touchstart: function (t) {
      t = le(this.dom, t), gi(t), this._lastTouchMoment = new Date(), this.handler.processGesture(t, "start"), od.mousemove.call(this, t), od.mousedown.call(this, t);
    },
    touchmove: function (t) {
      t = le(this.dom, t), gi(t), this.handler.processGesture(t, "change"), od.mousemove.call(this, t);
    },
    touchend: function (t) {
      t = le(this.dom, t), gi(t), this.handler.processGesture(t, "end"), od.mouseup.call(this, t), +new Date() - this._lastTouchMoment < ed && od.click.call(this, t);
    },
    pointerdown: function (t) {
      od.mousedown.call(this, t);
    },
    pointermove: function (t) {
      fi(t) || od.mousemove.call(this, t);
    },
    pointerup: function (t) {
      od.mouseup.call(this, t);
    },
    pointerout: function (t) {
      fi(t) || od.mouseout.call(this, t);
    }
  };
  d(["click", "mousewheel", "dblclick", "contextmenu"], function (t) {
    od[t] = function (e) {
      e = le(this.dom, e), this.trigger(t, e);
    };
  });
  var sd = {
    pointermove: function (t) {
      fi(t) || sd.mousemove.call(this, t);
    },
    pointerup: function (t) {
      sd.mouseup.call(this, t);
    },
    mousemove: function (t) {
      this.trigger("mousemove", t);
    },
    mouseup: function (t) {
      var e = this._pointerCapturing;
      Si(this, !1), this.trigger("mouseup", t), e && (t.zrEventControl = "only_globalout", this.trigger("mouseout", t));
    }
  },
      ld = Ti.prototype;
  ld.dispose = function () {
    bi(this._localHandlerScope), nd && bi(this._globalHandlerScope);
  }, ld.setCursor = function (t) {
    this.dom.style && (this.dom.style.cursor = t || "default");
  }, u(Ti, Du);

  var hd = !cu.canvasSupported,
      ud = {
    canvas: Jc
  },
      cd = function (t, e, n) {
    n = n || {}, this.dom = e, this.id = t;
    var i = this,
        r = new yc(),
        a = n.renderer;

    if (hd) {
      if (!ud.vml) throw new Error("You need to require 'zrender/vml/vml' to support IE8");
      a = "vml";
    } else a && ud[a] || (a = "canvas");

    var o = new ud[a](e, r, n, t);
    this.storage = r, this.painter = o;
    var s = cu.node || cu.worker ? null : new Ti(o.getViewportRoot(), o.root);
    this.handler = new Hu(r, o, s, o.root), this.animation = new td({
      stage: {
        update: v(this.flush, this)
      }
    }), this.animation.start(), this._needsRefresh;
    var l = r.delFromStorage,
        h = r.addToStorage;
    r.delFromStorage = function (t) {
      l.call(r, t), t && t.removeSelfFromZr(i);
    }, r.addToStorage = function (t) {
      h.call(r, t), t.addSelfToZr(i);
    };
  };

  cd.prototype = {
    constructor: cd,
    getId: function () {
      return this.id;
    },
    add: function (t) {
      this.storage.addRoot(t), this._needsRefresh = !0;
    },
    remove: function (t) {
      this.storage.delRoot(t), this._needsRefresh = !0;
    },
    configLayer: function (t, e) {
      this.painter.configLayer && this.painter.configLayer(t, e), this._needsRefresh = !0;
    },
    setBackgroundColor: function (t) {
      this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this._needsRefresh = !0;
    },
    refreshImmediately: function () {
      this._needsRefresh = this._needsRefreshHover = !1, this.painter.refresh(), this._needsRefresh = this._needsRefreshHover = !1;
    },
    refresh: function () {
      this._needsRefresh = !0;
    },
    flush: function () {
      var t;
      this._needsRefresh && (t = !0, this.refreshImmediately()), this._needsRefreshHover && (t = !0, this.refreshHoverImmediately()), t && this.trigger("rendered");
    },
    addHover: function (t, e) {
      if (this.painter.addHover) {
        var n = this.painter.addHover(t, e);
        return this.refreshHover(), n;
      }
    },
    removeHover: function (t) {
      this.painter.removeHover && (this.painter.removeHover(t), this.refreshHover());
    },
    clearHover: function () {
      this.painter.clearHover && (this.painter.clearHover(), this.refreshHover());
    },
    refreshHover: function () {
      this._needsRefreshHover = !0;
    },
    refreshHoverImmediately: function () {
      this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover();
    },
    resize: function (t) {
      t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize();
    },
    clearAnimation: function () {
      this.animation.clear();
    },
    getWidth: function () {
      return this.painter.getWidth();
    },
    getHeight: function () {
      return this.painter.getHeight();
    },
    pathToImage: function (t, e) {
      return this.painter.pathToImage(t, e);
    },
    setCursorStyle: function (t) {
      this.handler.setCursorStyle(t);
    },
    findHover: function (t, e) {
      return this.handler.findHover(t, e);
    },
    on: function (t, e, n) {
      this.handler.on(t, e, n);
    },
    off: function (t, e) {
      this.handler.off(t, e);
    },
    trigger: function (t, e) {
      this.handler.trigger(t, e);
    },
    clear: function () {
      this.storage.delRoot(), this.painter.clear();
    },
    dispose: function () {
      this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null;
    }
  };

  var dd = d,
      fd = w,
      pd = _,
      gd = "series\x00",
      vd = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"],
      md = 0,
      _d = ".",
      yd = "___EC__COMPONENT__CONTAINER___",
      xd = 0,
      wd = function (t) {
    for (var e = 0; e < t.length; e++) t[e][1] || (t[e][1] = t[e][0]);

    return function (e, n, i) {
      for (var r = {}, a = 0; a < t.length; a++) {
        var o = t[a][1];

        if (!(n && l(n, o) >= 0 || i && l(i, o) < 0)) {
          var s = e.getShallow(o);
          null != s && (r[t[a][0]] = s);
        }
      }

      return r;
    };
  },
      bd = wd([["lineWidth", "width"], ["stroke", "color"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"]]),
      Sd = {
    getLineStyle: function (t) {
      var e = bd(this, t);
      return e.lineDash = this.getLineDash(e.lineWidth), e;
    },
    getLineDash: function (t) {
      null == t && (t = 1);
      var e = this.get("type"),
          n = Math.max(t, 2),
          i = 4 * t;
      return "solid" === e || null == e ? !1 : "dashed" === e ? [i, i] : [n, n];
    }
  },
      Md = wd([["fill", "color"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["opacity"], ["shadowColor"]]),
      Td = {
    getAreaStyle: function (t, e) {
      return Md(this, t, e);
    }
  },
      Id = Math.pow,
      Cd = Math.sqrt,
      kd = 1e-8,
      Dd = 1e-4,
      Ad = Cd(3),
      Pd = 1 / 3,
      Od = R(),
      Ld = R(),
      Ed = R(),
      Bd = Math.min,
      Rd = Math.max,
      zd = Math.sin,
      Nd = Math.cos,
      Fd = 2 * Math.PI,
      Hd = R(),
      Vd = R(),
      Wd = R(),
      Gd = [],
      Ud = [],
      Xd = {
    M: 1,
    L: 2,
    C: 3,
    Q: 4,
    A: 5,
    Z: 6,
    R: 7
  },
      Yd = [],
      qd = [],
      jd = [],
      Zd = [],
      $d = Math.min,
      Qd = Math.max,
      Kd = Math.cos,
      Jd = Math.sin,
      tf = Math.sqrt,
      ef = Math.abs,
      nf = "undefined" != typeof Float32Array,
      rf = function (t) {
    this._saveData = !t, this._saveData && (this.data = []), this._ctx = null;
  };

  rf.prototype = {
    constructor: rf,
    _xi: 0,
    _yi: 0,
    _x0: 0,
    _y0: 0,
    _ux: 0,
    _uy: 0,
    _len: 0,
    _lineDash: null,
    _dashOffset: 0,
    _dashIdx: 0,
    _dashSum: 0,
    setScale: function (t, e, n) {
      n = n || 0, this._ux = ef(n / lc / t) || 0, this._uy = ef(n / lc / e) || 0;
    },
    getContext: function () {
      return this._ctx;
    },
    beginPath: function (t) {
      return this._ctx = t, t && t.beginPath(), t && (this.dpr = t.dpr), this._saveData && (this._len = 0), this._lineDash && (this._lineDash = null, this._dashOffset = 0), this;
    },
    moveTo: function (t, e) {
      return this.addData(Xd.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;
    },
    lineTo: function (t, e) {
      var n = ef(t - this._xi) > this._ux || ef(e - this._yi) > this._uy || this._len < 5;
      return this.addData(Xd.L, t, e), this._ctx && n && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), n && (this._xi = t, this._yi = e), this;
    },
    bezierCurveTo: function (t, e, n, i, r, a) {
      return this.addData(Xd.C, t, e, n, i, r, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, n, i, r, a) : this._ctx.bezierCurveTo(t, e, n, i, r, a)), this._xi = r, this._yi = a, this;
    },
    quadraticCurveTo: function (t, e, n, i) {
      return this.addData(Xd.Q, t, e, n, i), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, n, i) : this._ctx.quadraticCurveTo(t, e, n, i)), this._xi = n, this._yi = i, this;
    },
    arc: function (t, e, n, i, r, a) {
      return this.addData(Xd.A, t, e, n, n, i, r - i, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, n, i, r, a), this._xi = Kd(r) * n + t, this._yi = Jd(r) * n + e, this;
    },
    arcTo: function (t, e, n, i, r) {
      return this._ctx && this._ctx.arcTo(t, e, n, i, r), this;
    },
    rect: function (t, e, n, i) {
      return this._ctx && this._ctx.rect(t, e, n, i), this.addData(Xd.R, t, e, n, i), this;
    },
    closePath: function () {
      this.addData(Xd.Z);
      var t = this._ctx,
          e = this._x0,
          n = this._y0;
      return t && (this._needsDash() && this._dashedLineTo(e, n), t.closePath()), this._xi = e, this._yi = n, this;
    },
    fill: function (t) {
      t && t.fill(), this.toStatic();
    },
    stroke: function (t) {
      t && t.stroke(), this.toStatic();
    },
    setLineDash: function (t) {
      if (t instanceof Array) {
        this._lineDash = t, this._dashIdx = 0;

        for (var e = 0, n = 0; n < t.length; n++) e += t[n];

        this._dashSum = e;
      }

      return this;
    },
    setLineDashOffset: function (t) {
      return this._dashOffset = t, this;
    },
    len: function () {
      return this._len;
    },
    setData: function (t) {
      var e = t.length;
      this.data && this.data.length === e || !nf || (this.data = new Float32Array(e));

      for (var n = 0; e > n; n++) this.data[n] = t[n];

      this._len = e;
    },
    appendPath: function (t) {
      t instanceof Array || (t = [t]);

      for (var e = t.length, n = 0, i = this._len, r = 0; e > r; r++) n += t[r].len();

      nf && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));

      for (var r = 0; e > r; r++) for (var a = t[r].data, o = 0; o < a.length; o++) this.data[i++] = a[o];

      this._len = i;
    },
    addData: function (t) {
      if (this._saveData) {
        var e = this.data;
        this._len + arguments.length > e.length && (this._expandData(), e = this.data);

        for (var n = 0; n < arguments.length; n++) e[this._len++] = arguments[n];

        this._prevCmd = t;
      }
    },
    _expandData: function () {
      if (!(this.data instanceof Array)) {
        for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];

        this.data = t;
      }
    },
    _needsDash: function () {
      return this._lineDash;
    },
    _dashedLineTo: function (t, e) {
      var n,
          i,
          r = this._dashSum,
          a = this._dashOffset,
          o = this._lineDash,
          s = this._ctx,
          l = this._xi,
          h = this._yi,
          u = t - l,
          c = e - h,
          d = tf(u * u + c * c),
          f = l,
          p = h,
          g = o.length;

      for (u /= d, c /= d, 0 > a && (a = r + a), a %= r, f -= a * u, p -= a * c; u > 0 && t >= f || 0 > u && f >= t || 0 === u && (c > 0 && e >= p || 0 > c && p >= e);) i = this._dashIdx, n = o[i], f += u * n, p += c * n, this._dashIdx = (i + 1) % g, u > 0 && l > f || 0 > u && f > l || c > 0 && h > p || 0 > c && p > h || s[i % 2 ? "moveTo" : "lineTo"](u >= 0 ? $d(f, t) : Qd(f, t), c >= 0 ? $d(p, e) : Qd(p, e));

      u = f - t, c = p - e, this._dashOffset = -tf(u * u + c * c);
    },
    _dashedBezierTo: function (t, e, n, i, r, a) {
      var o,
          s,
          l,
          h,
          u,
          c = this._dashSum,
          d = this._dashOffset,
          f = this._lineDash,
          p = this._ctx,
          g = this._xi,
          v = this._yi,
          m = Ki,
          _ = 0,
          y = this._dashIdx,
          x = f.length,
          w = 0;

      for (0 > d && (d = c + d), d %= c, o = 0; 1 > o; o += .1) s = m(g, t, n, r, o + .1) - m(g, t, n, r, o), l = m(v, e, i, a, o + .1) - m(v, e, i, a, o), _ += tf(s * s + l * l);

      for (; x > y && (w += f[y], !(w > d)); y++);

      for (o = (w - d) / _; 1 >= o;) h = m(g, t, n, r, o), u = m(v, e, i, a, o), y % 2 ? p.moveTo(h, u) : p.lineTo(h, u), o += f[y] / _, y = (y + 1) % x;

      y % 2 !== 0 && p.lineTo(r, a), s = r - h, l = a - u, this._dashOffset = -tf(s * s + l * l);
    },
    _dashedQuadraticTo: function (t, e, n, i) {
      var r = n,
          a = i;
      n = (n + 2 * t) / 3, i = (i + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, this._dashedBezierTo(t, e, n, i, r, a);
    },
    toStatic: function () {
      var t = this.data;
      t instanceof Array && (t.length = this._len, nf && (this.data = new Float32Array(t)));
    },
    getBoundingRect: function () {
      Yd[0] = Yd[1] = jd[0] = jd[1] = Number.MAX_VALUE, qd[0] = qd[1] = Zd[0] = Zd[1] = -Number.MAX_VALUE;

      for (var t = this.data, e = 0, n = 0, i = 0, r = 0, a = 0; a < t.length;) {
        var o = t[a++];

        switch (1 === a && (e = t[a], n = t[a + 1], i = e, r = n), o) {
          case Xd.M:
            i = t[a++], r = t[a++], e = i, n = r, jd[0] = i, jd[1] = r, Zd[0] = i, Zd[1] = r;
            break;

          case Xd.L:
            ur(e, n, t[a], t[a + 1], jd, Zd), e = t[a++], n = t[a++];
            break;

          case Xd.C:
            cr(e, n, t[a++], t[a++], t[a++], t[a++], t[a], t[a + 1], jd, Zd), e = t[a++], n = t[a++];
            break;

          case Xd.Q:
            dr(e, n, t[a++], t[a++], t[a], t[a + 1], jd, Zd), e = t[a++], n = t[a++];
            break;

          case Xd.A:
            var s = t[a++],
                l = t[a++],
                h = t[a++],
                u = t[a++],
                c = t[a++],
                d = t[a++] + c;
            a += 1;
            var f = 1 - t[a++];
            1 === a && (i = Kd(c) * h + s, r = Jd(c) * u + l), fr(s, l, h, u, c, d, f, jd, Zd), e = Kd(d) * h + s, n = Jd(d) * u + l;
            break;

          case Xd.R:
            i = e = t[a++], r = n = t[a++];
            var p = t[a++],
                g = t[a++];
            ur(i, r, i + p, r + g, jd, Zd);
            break;

          case Xd.Z:
            e = i, n = r;
        }

        q(Yd, Yd, jd), j(qd, qd, Zd);
      }

      return 0 === a && (Yd[0] = Yd[1] = qd[0] = qd[1] = 0), new rn(Yd[0], Yd[1], qd[0] - Yd[0], qd[1] - Yd[1]);
    },
    rebuildPath: function (t) {
      for (var e, n, i, r, a, o, s = this.data, l = this._ux, h = this._uy, u = this._len, c = 0; u > c;) {
        var d = s[c++];

        switch (1 === c && (i = s[c], r = s[c + 1], e = i, n = r), d) {
          case Xd.M:
            e = i = s[c++], n = r = s[c++], t.moveTo(i, r);
            break;

          case Xd.L:
            a = s[c++], o = s[c++], (ef(a - i) > l || ef(o - r) > h || c === u - 1) && (t.lineTo(a, o), i = a, r = o);
            break;

          case Xd.C:
            t.bezierCurveTo(s[c++], s[c++], s[c++], s[c++], s[c++], s[c++]), i = s[c - 2], r = s[c - 1];
            break;

          case Xd.Q:
            t.quadraticCurveTo(s[c++], s[c++], s[c++], s[c++]), i = s[c - 2], r = s[c - 1];
            break;

          case Xd.A:
            var f = s[c++],
                p = s[c++],
                g = s[c++],
                v = s[c++],
                m = s[c++],
                _ = s[c++],
                y = s[c++],
                x = s[c++],
                w = g > v ? g : v,
                b = g > v ? 1 : g / v,
                S = g > v ? v / g : 1,
                M = Math.abs(g - v) > .001,
                T = m + _;
            M ? (t.translate(f, p), t.rotate(y), t.scale(b, S), t.arc(0, 0, w, m, T, 1 - x), t.scale(1 / b, 1 / S), t.rotate(-y), t.translate(-f, -p)) : t.arc(f, p, w, m, T, 1 - x), 1 === c && (e = Kd(m) * g + f, n = Jd(m) * v + p), i = Kd(T) * g + f, r = Jd(T) * v + p;
            break;

          case Xd.R:
            e = i = s[c], n = r = s[c + 1], t.rect(s[c++], s[c++], s[c++], s[c++]);
            break;

          case Xd.Z:
            t.closePath(), i = e, r = n;
        }
      }
    }
  }, rf.CMD = Xd;
  var af = 2 * Math.PI,
      of = 2 * Math.PI,
      sf = rf.CMD,
      lf = 2 * Math.PI,
      hf = 1e-4,
      uf = [-1, -1, -1],
      cf = [-1, -1],
      df = Dc.prototype.getCanvasPattern,
      ff = Math.abs,
      pf = new rf(!0);
  kr.prototype = {
    constructor: kr,
    type: "path",
    __dirtyPath: !0,
    strokeContainThreshold: 5,
    segmentIgnoreThreshold: 0,
    subPixelOptimize: !1,
    brush: function (t, e) {
      var n = this.style,
          i = this.path || pf,
          r = n.hasStroke(),
          a = n.hasFill(),
          o = n.fill,
          s = n.stroke,
          l = a && !!o.colorStops,
          h = r && !!s.colorStops,
          u = a && !!o.image,
          c = r && !!s.image;

      if (n.bind(t, this, e), this.setTransform(t), this.__dirty) {
        var d;
        l && (d = d || this.getBoundingRect(), this._fillGradient = n.getGradient(t, o, d)), h && (d = d || this.getBoundingRect(), this._strokeGradient = n.getGradient(t, s, d));
      }

      l ? t.fillStyle = this._fillGradient : u && (t.fillStyle = df.call(o, t)), h ? t.strokeStyle = this._strokeGradient : c && (t.strokeStyle = df.call(s, t));
      var f = n.lineDash,
          p = n.lineDashOffset,
          g = !!t.setLineDash,
          v = this.getGlobalScale();
      if (i.setScale(v[0], v[1], this.segmentIgnoreThreshold), this.__dirtyPath || f && !g && r ? (i.beginPath(t), f && !g && (i.setLineDash(f), i.setLineDashOffset(p)), this.buildPath(i, this.shape, !1), this.path && (this.__dirtyPath = !1)) : (t.beginPath(), this.path.rebuildPath(t)), a) if (null != n.fillOpacity) {
        var m = t.globalAlpha;
        t.globalAlpha = n.fillOpacity * n.opacity, i.fill(t), t.globalAlpha = m;
      } else i.fill(t);
      if (f && g && (t.setLineDash(f), t.lineDashOffset = p), r) if (null != n.strokeOpacity) {
        var m = t.globalAlpha;
        t.globalAlpha = n.strokeOpacity * n.opacity, i.stroke(t), t.globalAlpha = m;
      } else i.stroke(t);
      f && g && t.setLineDash([]), null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()));
    },
    buildPath: function () {},
    createPathProxy: function () {
      this.path = new rf();
    },
    getBoundingRect: function () {
      var t = this._rect,
          e = this.style,
          n = !t;

      if (n) {
        var i = this.path;
        i || (i = this.path = new rf()), this.__dirtyPath && (i.beginPath(), this.buildPath(i, this.shape, !1)), t = i.getBoundingRect();
      }

      if (this._rect = t, e.hasStroke()) {
        var r = this._rectWithStroke || (this._rectWithStroke = t.clone());

        if (this.__dirty || n) {
          r.copy(t);
          var a = e.lineWidth,
              o = e.strokeNoScale ? this.getLineScale() : 1;
          e.hasFill() || (a = Math.max(a, this.strokeContainThreshold || 4)), o > 1e-10 && (r.width += a / o, r.height += a / o, r.x -= a / o / 2, r.y -= a / o / 2);
        }

        return r;
      }

      return t;
    },
    contain: function (t, e) {
      var n = this.transformCoordToLocal(t, e),
          i = this.getBoundingRect(),
          r = this.style;

      if (t = n[0], e = n[1], i.contain(t, e)) {
        var a = this.path.data;

        if (r.hasStroke()) {
          var o = r.lineWidth,
              s = r.strokeNoScale ? this.getLineScale() : 1;
          if (s > 1e-10 && (r.hasFill() || (o = Math.max(o, this.strokeContainThreshold)), Cr(a, o / s, t, e))) return !0;
        }

        if (r.hasFill()) return Ir(a, t, e);
      }

      return !1;
    },
    dirty: function (t) {
      null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this.__dirty = this.__dirtyText = !0, this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty();
    },
    animateShape: function (t) {
      return this.animate("shape", t);
    },
    attrKV: function (t, e) {
      "shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : ri.prototype.attrKV.call(this, t, e);
    },
    setShape: function (t, e) {
      var n = this.shape;

      if (n) {
        if (w(t)) for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]);else n[t] = e;
        this.dirty(!0);
      }

      return this;
    },
    getLineScale: function () {
      var t = this.transform;
      return t && ff(t[0] - 1) > 1e-10 && ff(t[3] - 1) > 1e-10 ? Math.sqrt(ff(t[0] * t[3] - t[2] * t[1])) : 1;
    }
  }, kr.extend = function (t) {
    var e = function (e) {
      kr.call(this, e), t.style && this.style.extendFrom(t.style, !1);
      var n = t.shape;

      if (n) {
        this.shape = this.shape || {};
        var i = this.shape;

        for (var r in n) !i.hasOwnProperty(r) && n.hasOwnProperty(r) && (i[r] = n[r]);
      }

      t.init && t.init.call(this, e);
    };

    h(e, kr);

    for (var n in t) "style" !== n && "shape" !== n && (e.prototype[n] = t[n]);

    return e;
  }, h(kr, ri);

  var gf = rf.CMD,
      vf = [[], [], []],
      mf = Math.sqrt,
      _f = Math.atan2,
      yf = function (t, e) {
    var n,
        i,
        r,
        a,
        o,
        s,
        l = t.data,
        h = gf.M,
        u = gf.C,
        c = gf.L,
        d = gf.R,
        f = gf.A,
        p = gf.Q;

    for (r = 0, a = 0; r < l.length;) {
      switch (n = l[r++], a = r, i = 0, n) {
        case h:
          i = 1;
          break;

        case c:
          i = 1;
          break;

        case u:
          i = 3;
          break;

        case p:
          i = 2;
          break;

        case f:
          var g = e[4],
              v = e[5],
              m = mf(e[0] * e[0] + e[1] * e[1]),
              _ = mf(e[2] * e[2] + e[3] * e[3]),
              y = _f(-e[1] / _, e[0] / m);

          l[r] *= m, l[r++] += g, l[r] *= _, l[r++] += v, l[r++] *= m, l[r++] *= _, l[r++] += y, l[r++] += y, r += 2, a = r;
          break;

        case d:
          s[0] = l[r++], s[1] = l[r++], Y(s, s, e), l[a++] = s[0], l[a++] = s[1], s[0] += l[r++], s[1] += l[r++], Y(s, s, e), l[a++] = s[0], l[a++] = s[1];
      }

      for (o = 0; i > o; o++) {
        var s = vf[o];
        s[0] = l[r++], s[1] = l[r++], Y(s, s, e), l[a++] = s[0], l[a++] = s[1];
      }
    }
  },
      xf = Math.sqrt,
      wf = Math.sin,
      bf = Math.cos,
      Sf = Math.PI,
      Mf = function (t) {
    return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
  },
      Tf = function (t, e) {
    return (t[0] * e[0] + t[1] * e[1]) / (Mf(t) * Mf(e));
  },
      If = function (t, e) {
    return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(Tf(t, e));
  },
      Cf = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,
      kf = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g,
      Df = function (t) {
    ri.call(this, t);
  };

  Df.prototype = {
    constructor: Df,
    type: "text",
    brush: function (t, e) {
      var n = this.style;
      this.__dirty && Hn(n, !0), n.fill = n.stroke = n.shadowBlur = n.shadowColor = n.shadowOffsetX = n.shadowOffsetY = null;
      var i = n.text;
      return null != i && (i += ""), ii(i, n) ? (this.setTransform(t), Wn(this, t, i, n, null, e), void this.restoreTransform(t)) : void (t.__attrCachedBy = bc.NONE);
    },
    getBoundingRect: function () {
      var t = this.style;

      if (this.__dirty && Hn(t, !0), !this._rect) {
        var e = t.text;
        null != e ? e += "" : e = "";
        var n = Sn(t.text + "", t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich);

        if (n.x += t.x || 0, n.y += t.y || 0, Jn(t.textStroke, t.textStrokeWidth)) {
          var i = t.textStrokeWidth;
          n.x -= i / 2, n.y -= i / 2, n.width += i, n.height += i;
        }

        this._rect = n;
      }

      return this._rect;
    }
  }, h(Df, ri);

  var Af = kr.extend({
    type: "circle",
    shape: {
      cx: 0,
      cy: 0,
      r: 0
    },
    buildPath: function (t, e, n) {
      n && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0);
    }
  }),
      Pf = [["shadowBlur", 0], ["shadowColor", "#000"], ["shadowOffsetX", 0], ["shadowOffsetY", 0]],
      Of = function (t) {
    return cu.browser.ie && cu.browser.version >= 11 ? function () {
      var e,
          n = this.__clipPaths,
          i = this.style;
      if (n) for (var r = 0; r < n.length; r++) {
        var a = n[r],
            o = a && a.shape,
            s = a && a.type;

        if (o && ("sector" === s && o.startAngle === o.endAngle || "rect" === s && (!o.width || !o.height))) {
          for (var l = 0; l < Pf.length; l++) Pf[l][2] = i[Pf[l][0]], i[Pf[l][0]] = Pf[l][1];

          e = !0;
          break;
        }
      }
      if (t.apply(this, arguments), e) for (var l = 0; l < Pf.length; l++) i[Pf[l][0]] = Pf[l][2];
    } : t;
  },
      Lf = kr.extend({
    type: "sector",
    shape: {
      cx: 0,
      cy: 0,
      r0: 0,
      r: 0,
      startAngle: 0,
      endAngle: 2 * Math.PI,
      clockwise: !0
    },
    brush: Of(kr.prototype.brush),
    buildPath: function (t, e) {
      var n = e.cx,
          i = e.cy,
          r = Math.max(e.r0 || 0, 0),
          a = Math.max(e.r, 0),
          o = e.startAngle,
          s = e.endAngle,
          l = e.clockwise,
          h = Math.cos(o),
          u = Math.sin(o);
      t.moveTo(h * r + n, u * r + i), t.lineTo(h * a + n, u * a + i), t.arc(n, i, a, o, s, !l), t.lineTo(Math.cos(s) * r + n, Math.sin(s) * r + i), 0 !== r && t.arc(n, i, r, s, o, l), t.closePath();
    }
  }),
      Ef = kr.extend({
    type: "ring",
    shape: {
      cx: 0,
      cy: 0,
      r: 0,
      r0: 0
    },
    buildPath: function (t, e) {
      var n = e.cx,
          i = e.cy,
          r = 2 * Math.PI;
      t.moveTo(n + e.r, i), t.arc(n, i, e.r, 0, r, !1), t.moveTo(n + e.r0, i), t.arc(n, i, e.r0, 0, r, !0);
    }
  }),
      Bf = function (t, e) {
    for (var n = t.length, i = [], r = 0, a = 1; n > a; a++) r += U(t[a - 1], t[a]);

    var o = r / 2;
    o = n > o ? n : o;

    for (var a = 0; o > a; a++) {
      var s,
          l,
          h,
          u = a / (o - 1) * (e ? n : n - 1),
          c = Math.floor(u),
          d = u - c,
          f = t[c % n];
      e ? (s = t[(c - 1 + n) % n], l = t[(c + 1) % n], h = t[(c + 2) % n]) : (s = t[0 === c ? c : c - 1], l = t[c > n - 2 ? n - 1 : c + 1], h = t[c > n - 3 ? n - 1 : c + 2]);
      var p = d * d,
          g = d * p;
      i.push([Lr(s[0], f[0], l[0], h[0], d, p, g), Lr(s[1], f[1], l[1], h[1], d, p, g)]);
    }

    return i;
  },
      Rf = function (t, e, n, i) {
    var r,
        a,
        o,
        s,
        l = [],
        h = [],
        u = [],
        c = [];

    if (i) {
      o = [1 / 0, 1 / 0], s = [-1 / 0, -1 / 0];

      for (var d = 0, f = t.length; f > d; d++) q(o, o, t[d]), j(s, s, t[d]);

      q(o, o, i[0]), j(s, s, i[1]);
    }

    for (var d = 0, f = t.length; f > d; d++) {
      var p = t[d];
      if (n) r = t[d ? d - 1 : f - 1], a = t[(d + 1) % f];else {
        if (0 === d || d === f - 1) {
          l.push(z(t[d]));
          continue;
        }

        r = t[d - 1], a = t[d + 1];
      }
      F(h, a, r), W(h, h, e);
      var g = U(p, r),
          v = U(p, a),
          m = g + v;
      0 !== m && (g /= m, v /= m), W(u, h, -g), W(c, h, v);

      var _ = N([], p, u),
          y = N([], p, c);

      i && (j(_, _, o), q(_, _, s), j(y, y, o), q(y, y, s)), l.push(_), l.push(y);
    }

    return n && l.push(l.shift()), l;
  },
      zf = kr.extend({
    type: "polygon",
    shape: {
      points: null,
      smooth: !1,
      smoothConstraint: null
    },
    buildPath: function (t, e) {
      Er(t, e, !0);
    }
  }),
      Nf = kr.extend({
    type: "polyline",
    shape: {
      points: null,
      smooth: !1,
      smoothConstraint: null
    },
    style: {
      stroke: "#000",
      fill: null
    },
    buildPath: function (t, e) {
      Er(t, e, !1);
    }
  }),
      Ff = Math.round,
      Hf = {},
      Vf = kr.extend({
    type: "rect",
    shape: {
      r: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    buildPath: function (t, e) {
      var n, i, r, a;
      this.subPixelOptimize ? (Rr(Hf, e, this.style), n = Hf.x, i = Hf.y, r = Hf.width, a = Hf.height, Hf.r = e.r, e = Hf) : (n = e.x, i = e.y, r = e.width, a = e.height), e.r ? Fn(t, e) : t.rect(n, i, r, a), t.closePath();
    }
  }),
      Wf = {},
      Gf = kr.extend({
    type: "line",
    shape: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      percent: 1
    },
    style: {
      stroke: "#000",
      fill: null
    },
    buildPath: function (t, e) {
      var n, i, r, a;
      this.subPixelOptimize ? (Br(Wf, e, this.style), n = Wf.x1, i = Wf.y1, r = Wf.x2, a = Wf.y2) : (n = e.x1, i = e.y1, r = e.x2, a = e.y2);
      var o = e.percent;
      0 !== o && (t.moveTo(n, i), 1 > o && (r = n * (1 - o) + r * o, a = i * (1 - o) + a * o), t.lineTo(r, a));
    },
    pointAt: function (t) {
      var e = this.shape;
      return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t];
    }
  }),
      Uf = [],
      Xf = kr.extend({
    type: "bezier-curve",
    shape: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      cpx1: 0,
      cpy1: 0,
      percent: 1
    },
    style: {
      stroke: "#000",
      fill: null
    },
    buildPath: function (t, e) {
      var n = e.x1,
          i = e.y1,
          r = e.x2,
          a = e.y2,
          o = e.cpx1,
          s = e.cpy1,
          l = e.cpx2,
          h = e.cpy2,
          u = e.percent;
      0 !== u && (t.moveTo(n, i), null == l || null == h ? (1 > u && (lr(n, o, r, u, Uf), o = Uf[1], r = Uf[2], lr(i, s, a, u, Uf), s = Uf[1], a = Uf[2]), t.quadraticCurveTo(o, s, r, a)) : (1 > u && (nr(n, o, l, r, u, Uf), o = Uf[1], l = Uf[2], r = Uf[3], nr(i, s, h, a, u, Uf), s = Uf[1], h = Uf[2], a = Uf[3]), t.bezierCurveTo(o, s, l, h, r, a)));
    },
    pointAt: function (t) {
      return Nr(this.shape, t, !1);
    },
    tangentAt: function (t) {
      var e = Nr(this.shape, t, !0);
      return G(e, e);
    }
  }),
      Yf = kr.extend({
    type: "arc",
    shape: {
      cx: 0,
      cy: 0,
      r: 0,
      startAngle: 0,
      endAngle: 2 * Math.PI,
      clockwise: !0
    },
    style: {
      stroke: "#000",
      fill: null
    },
    buildPath: function (t, e) {
      var n = e.cx,
          i = e.cy,
          r = Math.max(e.r, 0),
          a = e.startAngle,
          o = e.endAngle,
          s = e.clockwise,
          l = Math.cos(a),
          h = Math.sin(a);
      t.moveTo(l * r + n, h * r + i), t.arc(n, i, r, a, o, !s);
    }
  });

  kr.extend({
    type: "compound",
    shape: {
      paths: null
    },
    _updatePathDirty: function () {
      for (var t = this.__dirtyPath, e = this.shape.paths, n = 0; n < e.length; n++) t = t || e[n].__dirtyPath;

      this.__dirtyPath = t, this.__dirty = this.__dirty || t;
    },
    beforeBrush: function () {
      this._updatePathDirty();

      for (var t = this.shape.paths || [], e = this.getGlobalScale(), n = 0; n < t.length; n++) t[n].path || t[n].createPathProxy(), t[n].path.setScale(e[0], e[1], t[n].segmentIgnoreThreshold);
    },
    buildPath: function (t, e) {
      for (var n = e.paths || [], i = 0; i < n.length; i++) n[i].buildPath(t, n[i].shape, !0);
    },
    afterBrush: function () {
      for (var t = this.shape.paths || [], e = 0; e < t.length; e++) t[e].__dirtyPath = !1;
    },
    getBoundingRect: function () {
      return this._updatePathDirty(), kr.prototype.getBoundingRect.call(this);
    }
  });

  var qf = function (t) {
    this.colorStops = t || [];
  };

  qf.prototype = {
    constructor: qf,
    addColorStop: function (t, e) {
      this.colorStops.push({
        offset: t,
        color: e
      });
    }
  };

  var jf = function (t, e, n, i, r, a) {
    this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == n ? 1 : n, this.y2 = null == i ? 0 : i, this.type = "linear", this.global = a || !1, qf.call(this, r);
  };

  jf.prototype = {
    constructor: jf
  }, h(jf, qf);

  var Zf = function (t, e, n, i, r) {
    this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == n ? .5 : n, this.type = "radial", this.global = r || !1, qf.call(this, i);
  };

  Zf.prototype = {
    constructor: Zf
  }, h(Zf, qf), Fr.prototype.incremental = !0, Fr.prototype.clearDisplaybles = function () {
    this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.dirty(), this.notClear = !1;
  }, Fr.prototype.addDisplayable = function (t, e) {
    e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.dirty();
  }, Fr.prototype.addDisplayables = function (t, e) {
    e = e || !1;

    for (var n = 0; n < t.length; n++) this.addDisplayable(t[n], e);
  }, Fr.prototype.eachPendingDisplayable = function (t) {
    for (var e = this._cursor; e < this._displayables.length; e++) t && t(this._displayables[e]);

    for (var e = 0; e < this._temporaryDisplayables.length; e++) t && t(this._temporaryDisplayables[e]);
  }, Fr.prototype.update = function () {
    this.updateTransform();

    for (var t = this._cursor; t < this._displayables.length; t++) {
      var e = this._displayables[t];
      e.parent = this, e.update(), e.parent = null;
    }

    for (var t = 0; t < this._temporaryDisplayables.length; t++) {
      var e = this._temporaryDisplayables[t];
      e.parent = this, e.update(), e.parent = null;
    }
  }, Fr.prototype.brush = function (t) {
    for (var e = this._cursor; e < this._displayables.length; e++) {
      var n = this._displayables[e];
      n.beforeBrush && n.beforeBrush(t), n.brush(t, e === this._cursor ? null : this._displayables[e - 1]), n.afterBrush && n.afterBrush(t);
    }

    this._cursor = e;

    for (var e = 0; e < this._temporaryDisplayables.length; e++) {
      var n = this._temporaryDisplayables[e];
      n.beforeBrush && n.beforeBrush(t), n.brush(t, 0 === e ? null : this._temporaryDisplayables[e - 1]), n.afterBrush && n.afterBrush(t);
    }

    this._temporaryDisplayables = [], this.notClear = !0;
  };
  var $f = [];
  Fr.prototype.getBoundingRect = function () {
    if (!this._rect) {
      for (var t = new rn(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0; e < this._displayables.length; e++) {
        var n = this._displayables[e],
            i = n.getBoundingRect().clone();
        n.needLocalTransform() && i.applyTransform(n.getLocalTransform($f)), t.union(i);
      }

      this._rect = t;
    }

    return this._rect;
  }, Fr.prototype.contain = function (t, e) {
    var n = this.transformCoordToLocal(t, e),
        i = this.getBoundingRect();
    if (i.contain(n[0], n[1])) for (var r = 0; r < this._displayables.length; r++) {
      var a = this._displayables[r];
      if (a.contain(t, e)) return !0;
    }
    return !1;
  }, h(Fr, ri);
  var Qf = {},
      Kf = 1,
      Jf = "emphasis",
      tp = "normal",
      ep = 1,
      np = {},
      ip = {},
      rp = E(),
      ap = 0;
  Vr("circle", Af), Vr("sector", Lf), Vr("ring", Ef), Vr("polygon", zf), Vr("polyline", Nf), Vr("rect", Vf), Vr("line", Gf), Vr("bezierCurve", Xf), Vr("arc", Yf);
  var op = ["textStyle", "color"],
      sp = {
    getTextColor: function (t) {
      var e = this.ecModel;
      return this.getShallow("color") || (!t && e ? e.get(op) : null);
    },
    getFont: function () {
      return _a({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    },
    getTextRect: function (t) {
      return Sn(t, this.getFont(), this.getShallow("align"), this.getShallow("verticalAlign") || this.getShallow("baseline"), this.getShallow("padding"), this.getShallow("lineHeight"), this.getShallow("rich"), this.getShallow("truncateText"));
    }
  },
      lp = wd([["fill", "color"], ["stroke", "borderColor"], ["lineWidth", "borderWidth"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"], ["textPosition"], ["textAlign"]]),
      hp = {
    getItemStyle: function (t, e) {
      var n = lp(this, t, e),
          i = this.getBorderLineDash();
      return i && (n.lineDash = i), n;
    },
    getBorderLineDash: function () {
      var t = this.get("borderType");
      return "solid" === t || null == t ? null : "dashed" === t ? [5, 5] : [1, 1];
    }
  },
      up = u,
      cp = zi();
  Sa.prototype = {
    constructor: Sa,
    init: null,
    mergeOption: function (t) {
      r(this.option, t, !0);
    },
    get: function (t, e) {
      return null == t ? this.option : Ma(this.option, this.parsePath(t), !e && Ta(this, t));
    },
    getShallow: function (t, e) {
      var n = this.option,
          i = null == n ? n : n[t],
          r = !e && Ta(this, t);
      return null == i && r && (i = r.getShallow(t)), i;
    },
    getModel: function (t, e) {
      var n,
          i = null == t ? this.option : Ma(this.option, t = this.parsePath(t));
      return e = e || (n = Ta(this, t)) && n.getModel(t), new Sa(i, e, this.ecModel);
    },
    isEmpty: function () {
      return null == this.option;
    },
    restoreData: function () {},
    clone: function () {
      var t = this.constructor;
      return new t(i(this.option));
    },
    setReadOnly: function () {},
    parsePath: function (t) {
      return "string" == typeof t && (t = t.split(".")), t;
    },
    customizeGetParent: function (t) {
      cp(this).getParent = t;
    },
    isAnimationEnabled: function () {
      if (!cu.node) {
        if (null != this.option.animation) return !!this.option.animation;
        if (this.parentModel) return this.parentModel.isAnimationEnabled();
      }
    }
  }, Xi(Sa), Yi(Sa), up(Sa, Sd), up(Sa, Td), up(Sa, sp), up(Sa, hp);

  var dp = 0,
      fp = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/,
      pp = k,
      gp = /([&<>"'])/g,
      vp = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  },
      mp = ["a", "b", "c", "d", "e", "f", "g"],
      _p = function (t, e) {
    return "{" + t + (null == e ? "" : e) + "}";
  },
      yp = d,
      xp = ["left", "right", "top", "bottom", "width", "height"],
      wp = [["width", "left", "right"], ["height", "top", "bottom"]],
      bp = Xa,
      Sp = (m(Xa, "vertical"), m(Xa, "horizontal"), {
    getBoxLayoutParams: function () {
      return {
        left: this.get("left"),
        top: this.get("top"),
        right: this.get("right"),
        bottom: this.get("bottom"),
        width: this.get("width"),
        height: this.get("height")
      };
    }
  }),
      Mp = zi(),
      Tp = Sa.extend({
    type: "component",
    id: "",
    name: "",
    mainType: "",
    subType: "",
    componentIndex: 0,
    defaultOption: null,
    ecModel: null,
    dependentModels: [],
    uid: null,
    layoutMode: null,
    $constructor: function (t, e, n, i) {
      Sa.call(this, t, e, n, i), this.uid = Ia("ec_cpt_model");
    },
    init: function (t, e, n) {
      this.mergeDefaultAndTheme(t, n);
    },
    mergeDefaultAndTheme: function (t, e) {
      var n = this.layoutMode,
          i = n ? Za(t) : {},
          a = e.getTheme();
      r(t, a.get(this.mainType)), r(t, this.getDefaultOption()), n && ja(t, i, n);
    },
    mergeOption: function (t) {
      r(this.option, t, !0);
      var e = this.layoutMode;
      e && ja(this.option, t, e);
    },
    optionUpdated: function () {},
    getDefaultOption: function () {
      var t = Mp(this);

      if (!t.defaultOption) {
        for (var e = [], n = this.constructor; n;) {
          var i = n.prototype.defaultOption;
          i && e.push(i), n = n.superClass;
        }

        for (var a = {}, o = e.length - 1; o >= 0; o--) a = r(a, e[o], !0);

        t.defaultOption = a;
      }

      return t.defaultOption;
    },
    getReferringComponents: function (t) {
      return this.ecModel.queryComponents({
        mainType: t,
        index: this.get(t + "Index", !0),
        id: this.get(t + "Id", !0)
      });
    }
  });

  Zi(Tp, {
    registerWhenExtend: !0
  }), Ca(Tp), ka(Tp, Qa), u(Tp, Sp);
  var Ip = "";
  "undefined" != typeof navigator && (Ip = navigator.platform || "");
  var Cp = {
    color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"],
    gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
    textStyle: {
      fontFamily: Ip.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: "normal"
    },
    blendMode: null,
    animation: "auto",
    animationDuration: 1e3,
    animationDurationUpdate: 300,
    animationEasing: "exponentialOut",
    animationEasingUpdate: "cubicOut",
    animationThreshold: 2e3,
    progressiveThreshold: 3e3,
    progressive: 400,
    hoverLayerThreshold: 3e3,
    useUTC: !1
  },
      kp = zi(),
      Dp = {
    clearColorPalette: function () {
      kp(this).colorIdx = 0, kp(this).colorNameMap = {};
    },
    getColorFromPalette: function (t, e, n) {
      e = e || this;
      var i = kp(e),
          r = i.colorIdx || 0,
          a = i.colorNameMap = i.colorNameMap || {};
      if (a.hasOwnProperty(t)) return a[t];
      var o = ki(this.get("color", !0)),
          s = this.get("colorLayer", !0),
          l = null != n && s ? Ka(s, n) : o;

      if (l = l || o, l && l.length) {
        var h = l[r];
        return t && (a[t] = h), i.colorIdx = (r + 1) % l.length, h;
      }
    }
  },
      Ap = "original",
      Pp = "arrayRows",
      Op = "objectRows",
      Lp = "keyedColumns",
      Ep = "unknown",
      Bp = "typedArray",
      Rp = "column",
      zp = "row";
  Ja.seriesDataToSource = function (t) {
    return new Ja({
      data: t,
      sourceFormat: S(t) ? Bp : Ap,
      fromDataset: !1
    });
  }, Yi(Ja);
  var Np = {
    Must: 1,
    Might: 2,
    Not: 3
  },
      Fp = zi(),
      Hp = "\x00_ec_inner",
      Vp = Sa.extend({
    init: function (t, e, n, i) {
      n = n || {}, this.option = null, this._theme = new Sa(n), this._optionManager = i;
    },
    setOption: function (t, e) {
      D(!(Hp in t), "please use chart.getOption()"), this._optionManager.setOption(t, e), this.resetOption(null);
    },
    resetOption: function (t) {
      var e = !1,
          n = this._optionManager;

      if (!t || "recreate" === t) {
        var i = n.mountOption("recreate" === t);
        this.option && "recreate" !== t ? (this.restoreData(), this.mergeOption(i)) : go.call(this, i), e = !0;
      }

      if (("timeline" === t || "media" === t) && this.restoreData(), !t || "recreate" === t || "timeline" === t) {
        var r = n.getTimelineOption(this);
        r && (this.mergeOption(r), e = !0);
      }

      if (!t || "recreate" === t || "media" === t) {
        var a = n.getMediaOption(this, this._api);
        a.length && d(a, function (t) {
          this.mergeOption(t, e = !0);
        }, this);
      }

      return e;
    },
    mergeOption: function (t) {
      function e(e, i) {
        var r = ki(t[e]),
            s = Oi(o.get(e), r);
        Li(s), d(s, function (t) {
          var n = t.option;
          w(n) && (t.keyInfo.mainType = e, t.keyInfo.subType = mo(e, n, t.exist));
        });
        var l = vo(o, i);
        n[e] = [], o.set(e, []), d(s, function (t, i) {
          var r = t.exist,
              s = t.option;

          if (D(w(s) || r, "Empty component definition"), s) {
            var h = Tp.getClass(e, t.keyInfo.subType, !0);
            if (r && r.constructor === h) r.name = t.keyInfo.name, r.mergeOption(s, this), r.optionUpdated(s, !1);else {
              var u = a({
                dependentModels: l,
                componentIndex: i
              }, t.keyInfo);
              r = new h(s, this, this, u), a(r, u), r.init(s, this, this, u), r.optionUpdated(null, !0);
            }
          } else r.mergeOption({}, this), r.optionUpdated({}, !1);

          o.get(e)[i] = r, n[e][i] = r.option;
        }, this), "series" === e && _o(this, o.get("series"));
      }

      var n = this.option,
          o = this._componentsMap,
          s = [];
      no(this), d(t, function (t, e) {
        null != t && (Tp.hasClass(e) ? e && s.push(e) : n[e] = null == n[e] ? i(t) : r(n[e], t, !0));
      }), Tp.topologicalTravel(s, Tp.getAllClassMainTypes(), e, this), this._seriesIndicesMap = E(this._seriesIndices = this._seriesIndices || []);
    },
    getOption: function () {
      var t = i(this.option);
      return d(t, function (e, n) {
        if (Tp.hasClass(n)) {
          for (var e = ki(e), i = e.length - 1; i >= 0; i--) Bi(e[i]) && e.splice(i, 1);

          t[n] = e;
        }
      }), delete t[Hp], t;
    },
    getTheme: function () {
      return this._theme;
    },
    getComponent: function (t, e) {
      var n = this._componentsMap.get(t);

      return n ? n[e || 0] : void 0;
    },
    queryComponents: function (t) {
      var e = t.mainType;
      if (!e) return [];

      var n = t.index,
          i = t.id,
          r = t.name,
          a = this._componentsMap.get(e);

      if (!a || !a.length) return [];
      var o;
      if (null != n) _(n) || (n = [n]), o = g(f(n, function (t) {
        return a[t];
      }), function (t) {
        return !!t;
      });else if (null != i) {
        var s = _(i);

        o = g(a, function (t) {
          return s && l(i, t.id) >= 0 || !s && t.id === i;
        });
      } else if (null != r) {
        var h = _(r);

        o = g(a, function (t) {
          return h && l(r, t.name) >= 0 || !h && t.name === r;
        });
      } else o = a.slice();
      return yo(o, t);
    },
    findComponents: function (t) {
      function e(t) {
        var e = r + "Index",
            n = r + "Id",
            i = r + "Name";
        return !t || null == t[e] && null == t[n] && null == t[i] ? null : {
          mainType: r,
          index: t[e],
          id: t[n],
          name: t[i]
        };
      }

      function n(e) {
        return t.filter ? g(e, t.filter) : e;
      }

      var i = t.query,
          r = t.mainType,
          a = e(i),
          o = a ? this.queryComponents(a) : this._componentsMap.get(r);
      return n(yo(o, t));
    },
    eachComponent: function (t, e, n) {
      var i = this._componentsMap;
      if ("function" == typeof t) n = e, e = t, i.each(function (t, i) {
        d(t, function (t, r) {
          e.call(n, i, t, r);
        });
      });else if (x(t)) d(i.get(t), e, n);else if (w(t)) {
        var r = this.findComponents(t);
        d(r, e, n);
      }
    },
    getSeriesByName: function (t) {
      var e = this._componentsMap.get("series");

      return g(e, function (e) {
        return e.name === t;
      });
    },
    getSeriesByIndex: function (t) {
      return this._componentsMap.get("series")[t];
    },
    getSeriesByType: function (t) {
      var e = this._componentsMap.get("series");

      return g(e, function (e) {
        return e.subType === t;
      });
    },
    getSeries: function () {
      return this._componentsMap.get("series").slice();
    },
    getSeriesCount: function () {
      return this._componentsMap.get("series").length;
    },
    eachSeries: function (t, e) {
      d(this._seriesIndices, function (n) {
        var i = this._componentsMap.get("series")[n];

        t.call(e, i, n);
      }, this);
    },
    eachRawSeries: function (t, e) {
      d(this._componentsMap.get("series"), t, e);
    },
    eachSeriesByType: function (t, e, n) {
      d(this._seriesIndices, function (i) {
        var r = this._componentsMap.get("series")[i];

        r.subType === t && e.call(n, r, i);
      }, this);
    },
    eachRawSeriesByType: function (t, e, n) {
      return d(this.getSeriesByType(t), e, n);
    },
    isSeriesFiltered: function (t) {
      return null == this._seriesIndicesMap.get(t.componentIndex);
    },
    getCurrentSeriesIndices: function () {
      return (this._seriesIndices || []).slice();
    },
    filterSeries: function (t, e) {
      var n = g(this._componentsMap.get("series"), t, e);

      _o(this, n);
    },
    restoreData: function (t) {
      var e = this._componentsMap;

      _o(this, e.get("series"));

      var n = [];
      e.each(function (t, e) {
        n.push(e);
      }), Tp.topologicalTravel(n, Tp.getAllClassMainTypes(), function (n) {
        d(e.get(n), function (e) {
          ("series" !== n || !fo(e, t)) && e.restoreData();
        });
      });
    }
  });
  u(Vp, Dp);
  var Wp = ["getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getModel", "getOption", "getViewOfComponentModel", "getViewOfSeriesModel"],
      Gp = {};
  wo.prototype = {
    constructor: wo,
    create: function (t, e) {
      var n = [];
      d(Gp, function (i) {
        var r = i.create(t, e);
        n = n.concat(r || []);
      }), this._coordinateSystems = n;
    },
    update: function (t, e) {
      d(this._coordinateSystems, function (n) {
        n.update && n.update(t, e);
      });
    },
    getCoordinateSystems: function () {
      return this._coordinateSystems.slice();
    }
  }, wo.register = function (t, e) {
    Gp[t] = e;
  }, wo.get = function (t) {
    return Gp[t];
  };
  var Up = d,
      Xp = i,
      Yp = f,
      qp = r,
      jp = /^(min|max)?(.+)$/;
  bo.prototype = {
    constructor: bo,
    setOption: function (t, e) {
      t && d(ki(t.series), function (t) {
        t && t.data && S(t.data) && P(t.data);
      }), t = Xp(t);
      var n = this._optionBackup,
          i = So.call(this, t, e, !n);
      this._newBaseOption = i.baseOption, n ? (Co(n.baseOption, i.baseOption), i.timelineOptions.length && (n.timelineOptions = i.timelineOptions), i.mediaList.length && (n.mediaList = i.mediaList), i.mediaDefault && (n.mediaDefault = i.mediaDefault)) : this._optionBackup = i;
    },
    mountOption: function (t) {
      var e = this._optionBackup;
      return this._timelineOptions = Yp(e.timelineOptions, Xp), this._mediaList = Yp(e.mediaList, Xp), this._mediaDefault = Xp(e.mediaDefault), this._currentMediaIndices = [], Xp(t ? e.baseOption : this._newBaseOption);
    },
    getTimelineOption: function (t) {
      var e,
          n = this._timelineOptions;

      if (n.length) {
        var i = t.getComponent("timeline");
        i && (e = Xp(n[i.getCurrentIndex()], !0));
      }

      return e;
    },
    getMediaOption: function () {
      var t = this._api.getWidth(),
          e = this._api.getHeight(),
          n = this._mediaList,
          i = this._mediaDefault,
          r = [],
          a = [];

      if (!n.length && !i) return a;

      for (var o = 0, s = n.length; s > o; o++) Mo(n[o].query, t, e) && r.push(o);

      return !r.length && i && (r = [-1]), r.length && !Io(r, this._currentMediaIndices) && (a = Yp(r, function (t) {
        return Xp(-1 === t ? i.option : n[t].option);
      })), this._currentMediaIndices = r, a;
    }
  };

  var Zp = d,
      $p = w,
      Qp = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"],
      Kp = function (t, e) {
    Zp(Eo(t.series), function (t) {
      $p(t) && Lo(t);
    });
    var n = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
    e && n.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), Zp(n, function (e) {
      Zp(Eo(t[e]), function (t) {
        t && (Po(t, "axisLabel"), Po(t.axisPointer, "label"));
      });
    }), Zp(Eo(t.parallel), function (t) {
      var e = t && t.parallelAxisDefault;
      Po(e, "axisLabel"), Po(e && e.axisPointer, "label");
    }), Zp(Eo(t.calendar), function (t) {
      Do(t, "itemStyle"), Po(t, "dayLabel"), Po(t, "monthLabel"), Po(t, "yearLabel");
    }), Zp(Eo(t.radar), function (t) {
      Po(t, "name");
    }), Zp(Eo(t.geo), function (t) {
      $p(t) && (Oo(t), Zp(Eo(t.regions), function (t) {
        Oo(t);
      }));
    }), Zp(Eo(t.timeline), function (t) {
      Oo(t), Do(t, "label"), Do(t, "itemStyle"), Do(t, "controlStyle", !0);
      var e = t.data;
      _(e) && d(e, function (t) {
        w(t) && (Do(t, "label"), Do(t, "itemStyle"));
      });
    }), Zp(Eo(t.toolbox), function (t) {
      Do(t, "iconStyle"), Zp(t.feature, function (t) {
        Do(t, "iconStyle");
      });
    }), Po(Bo(t.axisPointer), "label"), Po(Bo(t.tooltip).axisPointer, "label");
  },
      Jp = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]],
      tg = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"],
      eg = function (t, e) {
    Kp(t, e), t.series = ki(t.series), d(t.series, function (t) {
      if (w(t)) {
        var e = t.type;
        if ("line" === e) null != t.clipOverflow && (t.clip = t.clipOverflow);else if ("pie" === e || "gauge" === e) null != t.clockWise && (t.clockwise = t.clockWise);else if ("gauge" === e) {
          var n = Ro(t, "pointer.color");
          null != n && zo(t, "itemStyle.color", n);
        }
        No(t);
      }
    }), t.dataRange && (t.visualMap = t.dataRange), d(tg, function (e) {
      var n = t[e];
      n && (_(n) || (n = [n]), d(n, function (t) {
        No(t);
      }));
    });
  },
      ng = function (t) {
    var e = E();
    t.eachSeries(function (t) {
      var n = t.get("stack");

      if (n) {
        var i = e.get(n) || e.set(n, []),
            r = t.getData(),
            a = {
          stackResultDimension: r.getCalculationInfo("stackResultDimension"),
          stackedOverDimension: r.getCalculationInfo("stackedOverDimension"),
          stackedDimension: r.getCalculationInfo("stackedDimension"),
          stackedByDimension: r.getCalculationInfo("stackedByDimension"),
          isStackedByIndex: r.getCalculationInfo("isStackedByIndex"),
          data: r,
          seriesModel: t
        };
        if (!a.stackedDimension || !a.isStackedByIndex && !a.stackedByDimension) return;
        i.length && r.setCalculationInfo("stackedOnSeries", i[i.length - 1].seriesModel), i.push(a);
      }
    }), e.each(Fo);
  },
      ig = Ho.prototype;

  ig.pure = !1, ig.persistent = !0, ig.getSource = function () {
    return this._source;
  };
  var rg = {
    arrayRows_column: {
      pure: !0,
      count: function () {
        return Math.max(0, this._data.length - this._source.startIndex);
      },
      getItem: function (t) {
        return this._data[t + this._source.startIndex];
      },
      appendData: Go
    },
    arrayRows_row: {
      pure: !0,
      count: function () {
        var t = this._data[0];
        return t ? Math.max(0, t.length - this._source.startIndex) : 0;
      },
      getItem: function (t) {
        t += this._source.startIndex;

        for (var e = [], n = this._data, i = 0; i < n.length; i++) {
          var r = n[i];
          e.push(r ? r[t] : null);
        }

        return e;
      },
      appendData: function () {
        throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
      }
    },
    objectRows: {
      pure: !0,
      count: Vo,
      getItem: Wo,
      appendData: Go
    },
    keyedColumns: {
      pure: !0,
      count: function () {
        var t = this._source.dimensionsDefine[0].name,
            e = this._data[t];
        return e ? e.length : 0;
      },
      getItem: function (t) {
        for (var e = [], n = this._source.dimensionsDefine, i = 0; i < n.length; i++) {
          var r = this._data[n[i].name];
          e.push(r ? r[t] : null);
        }

        return e;
      },
      appendData: function (t) {
        var e = this._data;
        d(t, function (t, n) {
          for (var i = e[n] || (e[n] = []), r = 0; r < (t || []).length; r++) i.push(t[r]);
        });
      }
    },
    original: {
      count: Vo,
      getItem: Wo,
      appendData: Go
    },
    typedArray: {
      persistent: !1,
      pure: !0,
      count: function () {
        return this._data ? this._data.length / this._dimSize : 0;
      },
      getItem: function (t, e) {
        t -= this._offset, e = e || [];

        for (var n = this._dimSize * t, i = 0; i < this._dimSize; i++) e[i] = this._data[n + i];

        return e;
      },
      appendData: function (t) {
        this._data = t;
      },
      clean: function () {
        this._offset += this.count(), this._data = null;
      }
    }
  },
      ag = {
    arrayRows: Uo,
    objectRows: function (t, e, n, i) {
      return null != n ? t[i] : t;
    },
    keyedColumns: Uo,
    original: function (t, e, n) {
      var i = Ai(t);
      return null != n && i instanceof Array ? i[n] : i;
    },
    typedArray: Uo
  },
      og = {
    arrayRows: Xo,
    objectRows: function (t, e) {
      return Yo(t[e], this._dimensionInfos[e]);
    },
    keyedColumns: Xo,
    original: function (t, e, n, i) {
      var r = t && (null == t.value ? t : t.value);
      return !this._rawData.pure && Pi(t) && (this.hasItemOption = !0), Yo(r instanceof Array ? r[i] : r, this._dimensionInfos[e]);
    },
    typedArray: function (t, e, n, i) {
      return t[i];
    }
  },
      sg = /\{@(.+?)\}/g,
      lg = {
    getDataParams: function (t, e) {
      var n = this.getData(e),
          i = this.getRawValue(t, e),
          r = n.getRawIndex(t),
          a = n.getName(t),
          o = n.getRawDataItem(t),
          s = n.getItemVisual(t, "color"),
          l = n.getItemVisual(t, "borderColor"),
          h = this.ecModel.getComponent("tooltip"),
          u = h && h.get("renderMode"),
          c = Wi(u),
          d = this.mainType,
          f = "series" === d,
          p = n.userOutput;
      return {
        componentType: d,
        componentSubType: this.subType,
        componentIndex: this.componentIndex,
        seriesType: f ? this.subType : null,
        seriesIndex: this.seriesIndex,
        seriesId: f ? this.id : null,
        seriesName: f ? this.name : null,
        name: a,
        dataIndex: r,
        data: o,
        dataType: e,
        value: i,
        color: s,
        borderColor: l,
        dimensionNames: p ? p.dimensionNames : null,
        encode: p ? p.encode : null,
        marker: Wa({
          color: s,
          renderMode: c
        }),
        $vars: ["seriesName", "name", "value"]
      };
    },
    getFormattedLabel: function (t, e, n, i, r) {
      e = e || "normal";
      var a = this.getData(n),
          o = a.getItemModel(t),
          s = this.getDataParams(t, n);
      null != i && s.value instanceof Array && (s.value = s.value[i]);
      var l = o.get("normal" === e ? [r || "label", "formatter"] : [e, r || "label", "formatter"]);
      if ("function" == typeof l) return s.status = e, s.dimensionIndex = i, l(s);

      if ("string" == typeof l) {
        var h = Va(l, s);
        return h.replace(sg, function (e, n) {
          var i = n.length;
          return "[" === n.charAt(0) && "]" === n.charAt(i - 1) && (n = +n.slice(1, i - 1)), qo(a, t, n);
        });
      }
    },
    getRawValue: function (t, e) {
      return qo(this.getData(e), t);
    },
    formatTooltip: function () {}
  },
      hg = $o.prototype;

  hg.perform = function (t) {
    function e(t) {
      return !(t >= 1) && (t = 1), t;
    }

    var n = this._upstream,
        i = t && t.skip;

    if (this._dirty && n) {
      var r = this.context;
      r.data = r.outputData = n.context.outputData;
    }

    this.__pipeline && (this.__pipeline.currentTask = this);
    var a;
    this._plan && !i && (a = this._plan(this.context));
    var o = e(this._modBy),
        s = this._modDataCount || 0,
        l = e(t && t.modBy),
        h = t && t.modDataCount || 0;
    (o !== l || s !== h) && (a = "reset");
    var u;
    (this._dirty || "reset" === a) && (this._dirty = !1, u = Ko(this, i)), this._modBy = l, this._modDataCount = h;
    var c = t && t.step;

    if (this._dueEnd = n ? n._outputDueEnd : this._count ? this._count(this.context) : 1 / 0, this._progress) {
      var d = this._dueIndex,
          f = Math.min(null != c ? this._dueIndex + c : 1 / 0, this._dueEnd);

      if (!i && (u || f > d)) {
        var p = this._progress;
        if (_(p)) for (var g = 0; g < p.length; g++) Qo(this, p[g], d, f, l, h);else Qo(this, p, d, f, l, h);
      }

      this._dueIndex = f;
      var v = null != this._settedOutputEnd ? this._settedOutputEnd : f;
      this._outputDueEnd = v;
    } else this._dueIndex = this._outputDueEnd = null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;

    return this.unfinished();
  };

  var ug = function () {
    function t() {
      return n > i ? i++ : null;
    }

    function e() {
      var t = i % o * r + Math.ceil(i / o),
          e = i >= n ? null : a > t ? t : i;
      return i++, e;
    }

    var n,
        i,
        r,
        a,
        o,
        s = {
      reset: function (l, h, u, c) {
        i = l, n = h, r = u, a = c, o = Math.ceil(a / r), s.next = r > 1 && a > 0 ? e : t;
      }
    };
    return s;
  }();

  hg.dirty = function () {
    this._dirty = !0, this._onDirty && this._onDirty(this.context);
  }, hg.unfinished = function () {
    return this._progress && this._dueIndex < this._dueEnd;
  }, hg.pipe = function (t) {
    (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, t.dirty());
  }, hg.dispose = function () {
    this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0);
  }, hg.getUpstream = function () {
    return this._upstream;
  }, hg.getDownstream = function () {
    return this._downstream;
  }, hg.setOutputEnd = function (t) {
    this._outputDueEnd = this._settedOutputEnd = t;
  };
  var cg = zi(),
      dg = Tp.extend({
    type: "series.__base__",
    seriesIndex: 0,
    coordinateSystem: null,
    defaultOption: null,
    legendVisualProvider: null,
    visualColorAccessPath: "itemStyle.color",
    visualBorderColorAccessPath: "itemStyle.borderColor",
    layoutMode: null,
    init: function (t, e, n) {
      this.seriesIndex = this.componentIndex, this.dataTask = Zo({
        count: es,
        reset: ns
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(t, n), io(this);
      var i = this.getInitialData(t, n);
      rs(i, this), this.dataTask.context.data = i, cg(this).dataBeforeProcessed = i, Jo(this);
    },
    mergeDefaultAndTheme: function (t, e) {
      var n = this.layoutMode,
          i = n ? Za(t) : {},
          a = this.subType;
      Tp.hasClass(a) && (a += "Series"), r(t, e.getTheme().get(this.subType)), r(t, this.getDefaultOption()), Di(t, "label", ["show"]), this.fillDataTextStyle(t.data), n && ja(t, i, n);
    },
    mergeOption: function (t, e) {
      t = r(this.option, t, !0), this.fillDataTextStyle(t.data);
      var n = this.layoutMode;
      n && ja(this.option, t, n), io(this);
      var i = this.getInitialData(t, e);
      rs(i, this), this.dataTask.dirty(), this.dataTask.context.data = i, cg(this).dataBeforeProcessed = i, Jo(this);
    },
    fillDataTextStyle: function (t) {
      if (t && !S(t)) for (var e = ["show"], n = 0; n < t.length; n++) t[n] && t[n].label && Di(t[n], "label", e);
    },
    getInitialData: function () {},
    appendData: function (t) {
      var e = this.getRawData();
      e.appendData(t.data);
    },
    getData: function (t) {
      var e = os(this);

      if (e) {
        var n = e.context.data;
        return null == t ? n : n.getLinkedData(t);
      }

      return cg(this).data;
    },
    setData: function (t) {
      var e = os(this);

      if (e) {
        var n = e.context;
        n.data !== t && e.modifyOutputEnd && e.setOutputEnd(t.count()), n.outputData = t, e !== this.dataTask && (n.data = t);
      }

      cg(this).data = t;
    },
    getSource: function () {
      return eo(this);
    },
    getRawData: function () {
      return cg(this).dataBeforeProcessed;
    },
    getBaseAxis: function () {
      var t = this.coordinateSystem;
      return t && t.getBaseAxis && t.getBaseAxis();
    },
    formatTooltip: function (t, e, n, i) {
      function r(n) {
        function r(t, n) {
          var r = c.getDimensionInfo(n);

          if (r && r.otherDims.tooltip !== !1) {
            var d = r.type,
                f = "sub" + o.seriesIndex + "at" + u,
                p = Wa({
              color: y,
              type: "subItem",
              renderMode: i,
              markerId: f
            }),
                g = "string" == typeof p ? p : p.content,
                v = (a ? g + Ha(r.displayName || "-") + ": " : "") + Ha("ordinal" === d ? t + "" : "time" === d ? e ? "" : Ua("yyyy/MM/dd hh:mm:ss", t) : Fa(t));
            v && s.push(v), l && (h[f] = y, ++u);
          }
        }

        var a = p(n, function (t, e, n) {
          var i = c.getDimensionInfo(n);
          return t |= i && i.tooltip !== !1 && null != i.displayName;
        }, 0),
            s = [];
        f.length ? d(f, function (e) {
          r(qo(c, t, e), e);
        }) : d(n, r);
        var g = a ? l ? "\n" : "<br/>" : "",
            v = g + s.join(g || ", ");
        return {
          renderMode: i,
          content: v,
          style: h
        };
      }

      function a(t) {
        return {
          renderMode: i,
          content: Ha(Fa(t)),
          style: h
        };
      }

      var o = this;
      i = i || "html";

      var s = "html" === i ? "<br/>" : "\n",
          l = "richText" === i,
          h = {},
          u = 0,
          c = this.getData(),
          f = c.mapDimension("defaultedTooltip", !0),
          g = f.length,
          v = this.getRawValue(t),
          m = _(v),
          y = c.getItemVisual(t, "color");

      w(y) && y.colorStops && (y = (y.colorStops[0] || {}).color), y = y || "transparent";
      var x = g > 1 || m && !g ? r(v) : a(g ? qo(c, t, f[0]) : m ? v[0] : v),
          b = x.content,
          S = o.seriesIndex + "at" + u,
          M = Wa({
        color: y,
        type: "item",
        renderMode: i,
        markerId: S
      });
      h[S] = y, ++u;
      var T = c.getName(t),
          I = this.name;
      Ei(this) || (I = ""), I = I ? Ha(I) + (e ? ": " : s) : "";
      var C = "string" == typeof M ? M : M.content,
          k = e ? C + I + b : I + C + (T ? Ha(T) + ": " + b : b);
      return {
        html: k,
        markers: h
      };
    },
    isAnimationEnabled: function () {
      if (cu.node) return !1;
      var t = this.getShallow("animation");
      return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), t;
    },
    restoreData: function () {
      this.dataTask.dirty();
    },
    getColorFromPalette: function (t, e, n) {
      var i = this.ecModel,
          r = Dp.getColorFromPalette.call(this, t, e, n);
      return r || (r = i.getColorFromPalette(t, e, n)), r;
    },
    coordDimToDataDim: function (t) {
      return this.getRawData().mapDimension(t, !0);
    },
    getProgressive: function () {
      return this.get("progressive");
    },
    getProgressiveThreshold: function () {
      return this.get("progressiveThreshold");
    },
    getAxisTooltipData: null,
    getTooltipPosition: null,
    pipeTask: null,
    preventIncremental: null,
    pipelineContext: null
  });
  u(dg, lg), u(dg, Dp);

  var fg = function () {
    this.group = new vc(), this.uid = Ia("viewComponent");
  };

  fg.prototype = {
    constructor: fg,
    init: function () {},
    render: function () {},
    dispose: function () {},
    filterForExposedEvent: null
  };
  var pg = fg.prototype;
  pg.updateView = pg.updateLayout = pg.updateVisual = function () {}, Xi(fg), Zi(fg, {
    registerWhenExtend: !0
  });

  var gg = function () {
    var t = zi();
    return function (e) {
      var n = t(e),
          i = e.pipelineContext,
          r = n.large,
          a = n.progressiveRender,
          o = n.large = i && i.large,
          s = n.progressiveRender = i && i.progressiveRender;
      return !!(r ^ o || a ^ s) && "reset";
    };
  },
      vg = zi(),
      mg = gg();

  ss.prototype = {
    type: "chart",
    init: function () {},
    render: function () {},
    highlight: function (t, e, n, i) {
      hs(t.getData(), i, "emphasis");
    },
    downplay: function (t, e, n, i) {
      hs(t.getData(), i, "normal");
    },
    remove: function () {
      this.group.removeAll();
    },
    dispose: function () {},
    incrementalPrepareRender: null,
    incrementalRender: null,
    updateTransform: null,
    filterForExposedEvent: null
  };
  var _g = ss.prototype;
  _g.updateView = _g.updateLayout = _g.updateVisual = function (t, e, n, i) {
    this.render(t, e, n, i);
  }, Xi(ss, ["dispose"]), Zi(ss, {
    registerWhenExtend: !0
  }), ss.markUpdateMethod = function (t, e) {
    vg(t).updateMethod = e;
  };

  var yg = {
    incrementalPrepareRender: {
      progress: function (t, e) {
        e.view.incrementalRender(t, e.model, e.ecModel, e.api, e.payload);
      }
    },
    render: {
      forceFirstProgress: !0,
      progress: function (t, e) {
        e.view.render(e.model, e.ecModel, e.api, e.payload);
      }
    }
  },
      xg = {
    createOnAllSeries: !0,
    performRawSeries: !0,
    reset: function (t, e) {
      var n = t.getData(),
          i = (t.visualColorAccessPath || "itemStyle.color").split("."),
          r = t.get(i),
          a = !y(r) || r instanceof qf ? null : r;
      (!r || a) && (r = t.getColorFromPalette(t.name, null, e.getSeriesCount())), n.setVisual("color", r);
      var o = (t.visualBorderColorAccessPath || "itemStyle.borderColor").split("."),
          s = t.get(o);

      if (n.setVisual("borderColor", s), !e.isSeriesFiltered(t)) {
        a && n.each(function (e) {
          n.setItemVisual(e, "color", a(t.getDataParams(e)));
        });

        var l = function (t, e) {
          var n = t.getItemModel(e),
              r = n.get(i, !0),
              a = n.get(o, !0);
          null != r && t.setItemVisual(e, "color", r), null != a && t.setItemVisual(e, "borderColor", a);
        };

        return {
          dataEach: n.hasItemOption ? l : null
        };
      }
    }
  },
      wg = {
    legend: {
      selector: {
        all: "全选",
        inverse: "反选"
      }
    },
    toolbox: {
      brush: {
        title: {
          rect: "矩形选择",
          polygon: "圈选",
          lineX: "横向选择",
          lineY: "纵向选择",
          keep: "保持选择",
          clear: "清除选择"
        }
      },
      dataView: {
        title: "数据视图",
        lang: ["数据视图", "关闭", "刷新"]
      },
      dataZoom: {
        title: {
          zoom: "区域缩放",
          back: "区域缩放还原"
        }
      },
      magicType: {
        title: {
          line: "切换为折线图",
          bar: "切换为柱状图",
          stack: "切换为堆叠",
          tiled: "切换为平铺"
        }
      },
      restore: {
        title: "还原"
      },
      saveAsImage: {
        title: "保存为图片",
        lang: ["右键另存为图片"]
      }
    },
    series: {
      typeNames: {
        pie: "饼图",
        bar: "柱状图",
        line: "折线图",
        scatter: "散点图",
        effectScatter: "涟漪散点图",
        radar: "雷达图",
        tree: "树图",
        treemap: "矩形树图",
        boxplot: "箱型图",
        candlestick: "K线图",
        k: "K线图",
        heatmap: "热力图",
        map: "地图",
        parallel: "平行坐标图",
        lines: "线图",
        graph: "关系图",
        sankey: "桑基图",
        funnel: "漏斗图",
        gauge: "仪表盘图",
        pictorialBar: "象形柱图",
        themeRiver: "主题河流图",
        sunburst: "旭日图"
      }
    },
    aria: {
      general: {
        withTitle: "这是一个关于“{title}”的图表。",
        withoutTitle: "这是一个图表，"
      },
      series: {
        single: {
          prefix: "",
          withName: "图表类型是{seriesType}，表示{seriesName}。",
          withoutName: "图表类型是{seriesType}。"
        },
        multiple: {
          prefix: "它由{seriesCount}个图表系列组成。",
          withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
          withoutName: "第{seriesId}个系列是一个{seriesType}，",
          separator: {
            middle: "；",
            end: "。"
          }
        }
      },
      data: {
        allData: "其数据是——",
        partialData: "其中，前{displayCnt}项是——",
        withName: "{name}的数据是{value}",
        withoutName: "{value}",
        separator: {
          middle: "，",
          end: ""
        }
      }
    }
  },
      bg = function (t, e) {
    function n(t, e) {
      if ("string" != typeof t) return t;
      var n = t;
      return d(e, function (t, e) {
        n = n.replace(new RegExp("\\{\\s*" + e + "\\s*\\}", "g"), t);
      }), n;
    }

    function i(t) {
      var e = o.get(t);

      if (null == e) {
        for (var n = t.split("."), i = wg.aria, r = 0; r < n.length; ++r) i = i[n[r]];

        return i;
      }

      return e;
    }

    function r() {
      var t = e.getModel("title").option;
      return t && t.length && (t = t[0]), t && t.text;
    }

    function a(t) {
      return wg.series.typeNames[t] || "自定义图";
    }

    var o = e.getModel("aria");

    if (o.get("show")) {
      if (o.get("description")) return void t.setAttribute("aria-label", o.get("description"));
      var s = 0;
      e.eachSeries(function () {
        ++s;
      }, this);
      var l,
          h = o.get("data.maxCount") || 10,
          u = o.get("series.maxCount") || 10,
          c = Math.min(s, u);

      if (!(1 > s)) {
        var f = r();
        l = f ? n(i("general.withTitle"), {
          title: f
        }) : i("general.withoutTitle");
        var p = [],
            g = s > 1 ? "series.multiple.prefix" : "series.single.prefix";
        l += n(i(g), {
          seriesCount: s
        }), e.eachSeries(function (t, e) {
          if (c > e) {
            var r,
                o = t.get("name"),
                l = "series." + (s > 1 ? "multiple" : "single") + ".";
            r = i(o ? l + "withName" : l + "withoutName"), r = n(r, {
              seriesId: t.seriesIndex,
              seriesName: t.get("name"),
              seriesType: a(t.subType)
            });
            var u = t.getData();
            window.data = u, r += u.count() > h ? n(i("data.partialData"), {
              displayCnt: h
            }) : i("data.allData");

            for (var d = [], f = 0; f < u.count(); f++) if (h > f) {
              var g = u.getName(f),
                  v = qo(u, f);
              d.push(n(i(g ? "data.withName" : "data.withoutName"), {
                name: g,
                value: v
              }));
            }

            r += d.join(i("data.separator.middle")) + i("data.separator.end"), p.push(r);
          }
        }), l += p.join(i("series.multiple.separator.middle")) + i("series.multiple.separator.end"), t.setAttribute("aria-label", l);
      }
    }
  },
      Sg = Math.PI,
      Mg = function (t, e) {
    e = e || {}, o(e, {
      text: "loading",
      color: "#c23531",
      textColor: "#000",
      maskColor: "rgba(255, 255, 255, 0.8)",
      zlevel: 0
    });
    var n = new Vf({
      style: {
        fill: e.maskColor
      },
      zlevel: e.zlevel,
      z: 1e4
    }),
        i = new Yf({
      shape: {
        startAngle: -Sg / 2,
        endAngle: -Sg / 2 + .1,
        r: 10
      },
      style: {
        stroke: e.color,
        lineCap: "round",
        lineWidth: 5
      },
      zlevel: e.zlevel,
      z: 10001
    }),
        r = new Vf({
      style: {
        fill: "none",
        text: e.text,
        textPosition: "right",
        textDistance: 10,
        textFill: e.textColor
      },
      zlevel: e.zlevel,
      z: 10001
    });
    i.animateShape(!0).when(1e3, {
      endAngle: 3 * Sg / 2
    }).start("circularInOut"), i.animateShape(!0).when(1e3, {
      startAngle: 3 * Sg / 2
    }).delay(300).start("circularInOut");
    var a = new vc();
    return a.add(i), a.add(r), a.add(n), a.resize = function () {
      var e = t.getWidth() / 2,
          a = t.getHeight() / 2;
      i.setShape({
        cx: e,
        cy: a
      });
      var o = i.shape.r;
      r.setShape({
        x: e - o,
        y: a - o,
        width: 2 * o,
        height: 2 * o
      }), n.setShape({
        x: 0,
        y: 0,
        width: t.getWidth(),
        height: t.getHeight()
      });
    }, a.resize(), a;
  },
      Tg = fs.prototype;

  Tg.restoreData = function (t, e) {
    t.restoreData(e), this._stageTaskMap.each(function (t) {
      var e = t.overallTask;
      e && e.dirty();
    });
  }, Tg.getPerformArgs = function (t, e) {
    if (t.__pipeline) {
      var n = this._pipelineMap.get(t.__pipeline.id),
          i = n.context,
          r = !e && n.progressiveEnabled && (!i || i.progressiveRender) && t.__idxInPipeline > n.blockIndex,
          a = r ? n.step : null,
          o = i && i.modDataCount,
          s = null != o ? Math.ceil(o / a) : null;

      return {
        step: a,
        modBy: s,
        modDataCount: o
      };
    }
  }, Tg.getPipeline = function (t) {
    return this._pipelineMap.get(t);
  }, Tg.updateStreamModes = function (t, e) {
    var n = this._pipelineMap.get(t.uid),
        i = t.getData(),
        r = i.count(),
        a = n.progressiveEnabled && e.incrementalPrepareRender && r >= n.threshold,
        o = t.get("large") && r >= t.get("largeThreshold"),
        s = "mod" === t.get("progressiveChunkMode") ? r : null;

    t.pipelineContext = n.context = {
      progressiveRender: a,
      modDataCount: s,
      large: o
    };
  }, Tg.restorePipelines = function (t) {
    var e = this,
        n = e._pipelineMap = E();
    t.eachSeries(function (t) {
      var i = t.getProgressive(),
          r = t.uid;
      n.set(r, {
        id: r,
        head: null,
        tail: null,
        threshold: t.getProgressiveThreshold(),
        progressiveEnabled: i && !(t.preventIncremental && t.preventIncremental()),
        blockIndex: -1,
        step: Math.round(i || 700),
        count: 0
      }), Ts(e, t, t.dataTask);
    });
  }, Tg.prepareStageTasks = function () {
    var t = this._stageTaskMap,
        e = this.ecInstance.getModel(),
        n = this.api;
    d(this._allHandlers, function (i) {
      var r = t.get(i.uid) || t.set(i.uid, []);
      i.reset && gs(this, i, r, e, n), i.overallReset && vs(this, i, r, e, n);
    }, this);
  }, Tg.prepareView = function (t, e, n, i) {
    var r = t.renderTask,
        a = r.context;
    a.model = e, a.ecModel = n, a.api = i, r.__block = !t.incrementalPrepareRender, Ts(this, e, r);
  }, Tg.performDataProcessorTasks = function (t, e) {
    ps(this, this._dataProcessorHandlers, t, e, {
      block: !0
    });
  }, Tg.performVisualTasks = function (t, e, n) {
    ps(this, this._visualHandlers, t, e, n);
  }, Tg.performSeriesTasks = function (t) {
    var e;
    t.eachSeries(function (t) {
      e |= t.dataTask.perform();
    }), this.unfinished |= e;
  }, Tg.plan = function () {
    this._pipelineMap.each(function (t) {
      var e = t.tail;

      do {
        if (e.__block) {
          t.blockIndex = e.__idxInPipeline;
          break;
        }

        e = e.getUpstream();
      } while (e);
    });
  };

  var Ig = Tg.updatePayload = function (t, e) {
    "remain" !== e && (t.context.payload = e);
  },
      Cg = Ss(0);

  fs.wrapStageHandler = function (t, e) {
    return y(t) && (t = {
      overallReset: t,
      seriesType: Is(t)
    }), t.uid = Ia("stageHandler"), e && (t.visualType = e), t;
  };

  var kg,
      Dg = {},
      Ag = {};
  Cs(Dg, Vp), Cs(Ag, xo), Dg.eachSeriesByType = Dg.eachRawSeriesByType = function (t) {
    kg = t;
  }, Dg.eachComponent = function (t) {
    "series" === t.mainType && t.subType && (kg = t.subType);
  };

  var Pg = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"],
      Og = {
    color: Pg,
    colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], Pg]
  },
      Lg = "#eee",
      Eg = function () {
    return {
      axisLine: {
        lineStyle: {
          color: Lg
        }
      },
      axisTick: {
        lineStyle: {
          color: Lg
        }
      },
      axisLabel: {
        textStyle: {
          color: Lg
        }
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#aaa"
        }
      },
      splitArea: {
        areaStyle: {
          color: Lg
        }
      }
    };
  },
      Bg = ["#dd6b66", "#759aa0", "#e69d87", "#8dc1a9", "#ea7e53", "#eedd78", "#73a373", "#73b9bc", "#7289ab", "#91ca8c", "#f49f42"],
      Rg = {
    color: Bg,
    backgroundColor: "#333",
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: Lg
        },
        crossStyle: {
          color: Lg
        },
        label: {
          color: "#000"
        }
      }
    },
    legend: {
      textStyle: {
        color: Lg
      }
    },
    textStyle: {
      color: Lg
    },
    title: {
      textStyle: {
        color: Lg
      }
    },
    toolbox: {
      iconStyle: {
        normal: {
          borderColor: Lg
        }
      }
    },
    dataZoom: {
      textStyle: {
        color: Lg
      }
    },
    visualMap: {
      textStyle: {
        color: Lg
      }
    },
    timeline: {
      lineStyle: {
        color: Lg
      },
      itemStyle: {
        normal: {
          color: Bg[1]
        }
      },
      label: {
        normal: {
          textStyle: {
            color: Lg
          }
        }
      },
      controlStyle: {
        normal: {
          color: Lg,
          borderColor: Lg
        }
      }
    },
    timeAxis: Eg(),
    logAxis: Eg(),
    valueAxis: Eg(),
    categoryAxis: Eg(),
    line: {
      symbol: "circle"
    },
    graph: {
      color: Bg
    },
    gauge: {
      title: {
        textStyle: {
          color: Lg
        }
      }
    },
    candlestick: {
      itemStyle: {
        normal: {
          color: "#FD1050",
          color0: "#0CF49B",
          borderColor: "#FD1050",
          borderColor0: "#0CF49B"
        }
      }
    }
  };

  Rg.categoryAxis.splitLine.show = !1, Tp.extend({
    type: "dataset",
    defaultOption: {
      seriesLayoutBy: Rp,
      sourceHeader: null,
      dimensions: null,
      source: null
    },
    optionUpdated: function () {
      to(this);
    }
  }), fg.extend({
    type: "dataset"
  });
  var zg = kr.extend({
    type: "ellipse",
    shape: {
      cx: 0,
      cy: 0,
      rx: 0,
      ry: 0
    },
    buildPath: function (t, e) {
      var n = .5522848,
          i = e.cx,
          r = e.cy,
          a = e.rx,
          o = e.ry,
          s = a * n,
          l = o * n;
      t.moveTo(i - a, r), t.bezierCurveTo(i - a, r - l, i - s, r - o, i, r - o), t.bezierCurveTo(i + s, r - o, i + a, r - l, i + a, r), t.bezierCurveTo(i + a, r + l, i + s, r + o, i, r + o), t.bezierCurveTo(i - s, r + o, i - a, r + l, i - a, r), t.closePath();
    }
  }),
      Ng = /[\s,]+/;
  Ds.prototype.parse = function (t, e) {
    e = e || {};
    var n = ks(t);
    if (!n) throw new Error("Illegal svg");
    var i = new vc();
    this._root = i;
    var r = n.getAttribute("viewBox") || "",
        a = parseFloat(n.getAttribute("width") || e.width),
        o = parseFloat(n.getAttribute("height") || e.height);
    isNaN(a) && (a = null), isNaN(o) && (o = null), Ls(n, i, null, !0);

    for (var s = n.firstChild; s;) this._parseNode(s, i), s = s.nextSibling;

    var l, h;

    if (r) {
      var u = A(r).split(Ng);
      u.length >= 4 && (l = {
        x: parseFloat(u[0] || 0),
        y: parseFloat(u[1] || 0),
        width: parseFloat(u[2]),
        height: parseFloat(u[3])
      });
    }

    if (l && null != a && null != o && (h = zs(l, a, o), !e.ignoreViewBox)) {
      var c = i;
      i = new vc(), i.add(c), c.scale = h.scale.slice(), c.position = h.position.slice();
    }

    return e.ignoreRootClip || null == a || null == o || i.setClipPath(new Vf({
      shape: {
        x: 0,
        y: 0,
        width: a,
        height: o
      }
    })), {
      root: i,
      width: a,
      height: o,
      viewBoxRect: l,
      viewBoxTransform: h
    };
  }, Ds.prototype._parseNode = function (t, e) {
    var n = t.nodeName.toLowerCase();
    "defs" === n ? this._isDefine = !0 : "text" === n && (this._isText = !0);
    var i;

    if (this._isDefine) {
      var r = Hg[n];

      if (r) {
        var a = r.call(this, t),
            o = t.getAttribute("id");
        o && (this._defs[o] = a);
      }
    } else {
      var r = Fg[n];
      r && (i = r.call(this, t, e), e.add(i));
    }

    for (var s = t.firstChild; s;) 1 === s.nodeType && this._parseNode(s, i), 3 === s.nodeType && this._isText && this._parseText(s, i), s = s.nextSibling;

    "defs" === n ? this._isDefine = !1 : "text" === n && (this._isText = !1);
  }, Ds.prototype._parseText = function (t, e) {
    if (1 === t.nodeType) {
      var n = t.getAttribute("dx") || 0,
          i = t.getAttribute("dy") || 0;
      this._textX += parseFloat(n), this._textY += parseFloat(i);
    }

    var r = new Df({
      style: {
        text: t.textContent,
        transformText: !0
      },
      position: [this._textX || 0, this._textY || 0]
    });
    Ps(e, r), Ls(t, r, this._defs);
    var a = r.style.fontSize;
    a && 9 > a && (r.style.fontSize = 9, r.scale = r.scale || [1, 1], r.scale[0] *= a / 9, r.scale[1] *= a / 9);
    var o = r.getBoundingRect();
    return this._textX += o.width, e.add(r), r;
  };
  var Fg = {
    g: function (t, e) {
      var n = new vc();
      return Ps(e, n), Ls(t, n, this._defs), n;
    },
    rect: function (t, e) {
      var n = new Vf();
      return Ps(e, n), Ls(t, n, this._defs), n.setShape({
        x: parseFloat(t.getAttribute("x") || 0),
        y: parseFloat(t.getAttribute("y") || 0),
        width: parseFloat(t.getAttribute("width") || 0),
        height: parseFloat(t.getAttribute("height") || 0)
      }), n;
    },
    circle: function (t, e) {
      var n = new Af();
      return Ps(e, n), Ls(t, n, this._defs), n.setShape({
        cx: parseFloat(t.getAttribute("cx") || 0),
        cy: parseFloat(t.getAttribute("cy") || 0),
        r: parseFloat(t.getAttribute("r") || 0)
      }), n;
    },
    line: function (t, e) {
      var n = new Gf();
      return Ps(e, n), Ls(t, n, this._defs), n.setShape({
        x1: parseFloat(t.getAttribute("x1") || 0),
        y1: parseFloat(t.getAttribute("y1") || 0),
        x2: parseFloat(t.getAttribute("x2") || 0),
        y2: parseFloat(t.getAttribute("y2") || 0)
      }), n;
    },
    ellipse: function (t, e) {
      var n = new zg();
      return Ps(e, n), Ls(t, n, this._defs), n.setShape({
        cx: parseFloat(t.getAttribute("cx") || 0),
        cy: parseFloat(t.getAttribute("cy") || 0),
        rx: parseFloat(t.getAttribute("rx") || 0),
        ry: parseFloat(t.getAttribute("ry") || 0)
      }), n;
    },
    polygon: function (t, e) {
      var n = t.getAttribute("points");
      n && (n = Os(n));
      var i = new zf({
        shape: {
          points: n || []
        }
      });
      return Ps(e, i), Ls(t, i, this._defs), i;
    },
    polyline: function (t, e) {
      var n = new kr();
      Ps(e, n), Ls(t, n, this._defs);
      var i = t.getAttribute("points");
      i && (i = Os(i));
      var r = new Nf({
        shape: {
          points: i || []
        }
      });
      return r;
    },
    image: function (t, e) {
      var n = new ai();
      return Ps(e, n), Ls(t, n, this._defs), n.setStyle({
        image: t.getAttribute("xlink:href"),
        x: t.getAttribute("x"),
        y: t.getAttribute("y"),
        width: t.getAttribute("width"),
        height: t.getAttribute("height")
      }), n;
    },
    text: function (t, e) {
      var n = t.getAttribute("x") || 0,
          i = t.getAttribute("y") || 0,
          r = t.getAttribute("dx") || 0,
          a = t.getAttribute("dy") || 0;
      this._textX = parseFloat(n) + parseFloat(r), this._textY = parseFloat(i) + parseFloat(a);
      var o = new vc();
      return Ps(e, o), Ls(t, o, this._defs), o;
    },
    tspan: function (t, e) {
      var n = t.getAttribute("x"),
          i = t.getAttribute("y");
      null != n && (this._textX = parseFloat(n)), null != i && (this._textY = parseFloat(i));
      var r = t.getAttribute("dx") || 0,
          a = t.getAttribute("dy") || 0,
          o = new vc();
      return Ps(e, o), Ls(t, o, this._defs), this._textX += r, this._textY += a, o;
    },
    path: function (t, e) {
      var n = t.getAttribute("d") || "",
          i = Or(n);
      return Ps(e, i), Ls(t, i, this._defs), i;
    }
  },
      Hg = {
    lineargradient: function (t) {
      var e = parseInt(t.getAttribute("x1") || 0, 10),
          n = parseInt(t.getAttribute("y1") || 0, 10),
          i = parseInt(t.getAttribute("x2") || 10, 10),
          r = parseInt(t.getAttribute("y2") || 0, 10),
          a = new jf(e, n, i, r);
      return As(t, a), a;
    },
    radialgradient: function () {}
  },
      Vg = {
    fill: "fill",
    stroke: "stroke",
    "stroke-width": "lineWidth",
    opacity: "opacity",
    "fill-opacity": "fillOpacity",
    "stroke-opacity": "strokeOpacity",
    "stroke-dasharray": "lineDash",
    "stroke-dashoffset": "lineDashOffset",
    "stroke-linecap": "lineCap",
    "stroke-linejoin": "lineJoin",
    "stroke-miterlimit": "miterLimit",
    "font-family": "fontFamily",
    "font-size": "fontSize",
    "font-style": "fontStyle",
    "font-weight": "fontWeight",
    "text-align": "textAlign",
    "alignment-baseline": "textBaseline"
  },
      Wg = /url\(\s*#(.*?)\)/,
      Gg = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g,
      Ug = /([^\s:;]+)\s*:\s*([^:;]+)/g,
      Xg = E(),
      Yg = {
    registerMap: function (t, e, n) {
      var i;
      return _(e) ? i = e : e.svg ? i = [{
        type: "svg",
        source: e.svg,
        specialAreas: e.specialAreas
      }] : (e.geoJson && !e.features && (n = e.specialAreas, e = e.geoJson), i = [{
        type: "geoJSON",
        source: e,
        specialAreas: n
      }]), d(i, function (t) {
        var e = t.type;
        "geoJson" === e && (e = t.type = "geoJSON");
        var n = qg[e];
        n(t);
      }), Xg.set(t, i);
    },
    retrieveMap: function (t) {
      return Xg.get(t);
    }
  },
      qg = {
    geoJSON: function (t) {
      var e = t.source;
      t.geoJSON = x(e) ? "undefined" != typeof JSON && JSON.parse ? JSON.parse(e) : new Function("return (" + e + ");")() : e;
    },
    svg: function (t) {
      t.svgXML = ks(t.source);
    }
  },
      jg = D,
      Zg = d,
      $g = y,
      Qg = w,
      Kg = Tp.parseClassType,
      Jg = "4.7.0",
      tv = {
    zrender: "4.3.0"
  },
      ev = 1,
      nv = 1e3,
      iv = 800,
      rv = 900,
      av = 5e3,
      ov = 1e3,
      sv = 1100,
      lv = 2e3,
      hv = 3e3,
      uv = 3500,
      cv = 4e3,
      dv = 5e3,
      fv = {
    PROCESSOR: {
      FILTER: nv,
      SERIES_FILTER: iv,
      STATISTIC: av
    },
    VISUAL: {
      LAYOUT: ov,
      PROGRESSIVE_LAYOUT: sv,
      GLOBAL: lv,
      CHART: hv,
      POST_CHART_LAYOUT: uv,
      COMPONENT: cv,
      BRUSH: dv
    }
  },
      pv = "__flagInMainProcess",
      gv = "__optionUpdated",
      vv = /^[a-zA-Z0-9_]+$/;
  Fs.prototype.on = Ns("on", !0), Fs.prototype.off = Ns("off", !0), Fs.prototype.one = Ns("one", !0), u(Fs, Du);
  var mv = Hs.prototype;
  mv._onframe = function () {
    if (!this._disposed) {
      var t = this._scheduler;

      if (this[gv]) {
        var e = this[gv].silent;
        this[pv] = !0, Ws(this), _v.update.call(this), this[pv] = !1, this[gv] = !1, Ys.call(this, e), qs.call(this, e);
      } else if (t.unfinished) {
        var n = ev,
            i = this._model,
            r = this._api;
        t.unfinished = !1;

        do {
          var a = +new Date();
          t.performSeriesTasks(i), t.performDataProcessorTasks(i), Us(this, i), t.performVisualTasks(i), Js(this, this._model, r, "remain"), n -= +new Date() - a;
        } while (n > 0 && t.unfinished);

        t.unfinished || this._zr.flush();
      }
    }
  }, mv.getDom = function () {
    return this._dom;
  }, mv.getZr = function () {
    return this._zr;
  }, mv.setOption = function (t, e, n) {
    if (!this._disposed) {
      var i;

      if (Qg(e) && (n = e.lazyUpdate, i = e.silent, e = e.notMerge), this[pv] = !0, !this._model || e) {
        var r = new bo(this._api),
            a = this._theme,
            o = this._model = new Vp();
        o.scheduler = this._scheduler, o.init(null, null, a, r);
      }

      this._model.setOption(t, Sv), n ? (this[gv] = {
        silent: i
      }, this[pv] = !1) : (Ws(this), _v.update.call(this), this._zr.flush(), this[gv] = !1, this[pv] = !1, Ys.call(this, i), qs.call(this, i));
    }
  }, mv.setTheme = function () {
    console.error("ECharts#setTheme() is DEPRECATED in ECharts 3.0");
  }, mv.getModel = function () {
    return this._model;
  }, mv.getOption = function () {
    return this._model && this._model.getOption();
  }, mv.getWidth = function () {
    return this._zr.getWidth();
  }, mv.getHeight = function () {
    return this._zr.getHeight();
  }, mv.getDevicePixelRatio = function () {
    return this._zr.painter.dpr || window.devicePixelRatio || 1;
  }, mv.getRenderedCanvas = function (t) {
    if (cu.canvasSupported) {
      t = t || {}, t.pixelRatio = t.pixelRatio || 1, t.backgroundColor = t.backgroundColor || this._model.get("backgroundColor");
      var e = this._zr;
      return e.painter.getRenderedCanvas(t);
    }
  }, mv.getSvgDataUrl = function () {
    if (cu.svgSupported) {
      var t = this._zr,
          e = t.storage.getDisplayList();
      return d(e, function (t) {
        t.stopAnimation(!0);
      }), t.painter.pathToDataUrl();
    }
  }, mv.getDataURL = function (t) {
    if (!this._disposed) {
      t = t || {};
      var e = t.excludeComponents,
          n = this._model,
          i = [],
          r = this;
      Zg(e, function (t) {
        n.eachComponent({
          mainType: t
        }, function (t) {
          var e = r._componentsMap[t.__viewId];
          e.group.ignore || (i.push(e), e.group.ignore = !0);
        });
      });
      var a = "svg" === this._zr.painter.getType() ? this.getSvgDataUrl() : this.getRenderedCanvas(t).toDataURL("image/" + (t && t.type || "png"));
      return Zg(i, function (t) {
        t.group.ignore = !1;
      }), a;
    }
  }, mv.getConnectedDataURL = function (t) {
    if (!this._disposed && cu.canvasSupported) {
      var e = this.group,
          n = Math.min,
          r = Math.max,
          a = 1 / 0;

      if (Dv[e]) {
        var o = a,
            s = a,
            l = -a,
            h = -a,
            u = [],
            c = t && t.pixelRatio || 1;
        d(kv, function (a) {
          if (a.group === e) {
            var c = a.getRenderedCanvas(i(t)),
                d = a.getDom().getBoundingClientRect();
            o = n(d.left, o), s = n(d.top, s), l = r(d.right, l), h = r(d.bottom, h), u.push({
              dom: c,
              left: d.left,
              top: d.top
            });
          }
        }), o *= c, s *= c, l *= c, h *= c;
        var f = l - o,
            p = h - s,
            g = bu();
        g.width = f, g.height = p;
        var v = Ii(g);
        return t.connectedBackgroundColor && v.add(new Vf({
          shape: {
            x: 0,
            y: 0,
            width: f,
            height: p
          },
          style: {
            fill: t.connectedBackgroundColor
          }
        })), Zg(u, function (t) {
          var e = new ai({
            style: {
              x: t.left * c - o,
              y: t.top * c - s,
              image: t.dom
            }
          });
          v.add(e);
        }), v.refreshImmediately(), g.toDataURL("image/" + (t && t.type || "png"));
      }

      return this.getDataURL(t);
    }
  }, mv.convertToPixel = m(Vs, "convertToPixel"), mv.convertFromPixel = m(Vs, "convertFromPixel"), mv.containPixel = function (t, e) {
    if (!this._disposed) {
      var n,
          i = this._model;
      return t = Ni(i, t), d(t, function (t, i) {
        i.indexOf("Models") >= 0 && d(t, function (t) {
          var r = t.coordinateSystem;
          if (r && r.containPoint) n |= !!r.containPoint(e);else if ("seriesModels" === i) {
            var a = this._chartsMap[t.__viewId];
            a && a.containPoint && (n |= a.containPoint(e, t));
          }
        }, this);
      }, this), !!n;
    }
  }, mv.getVisual = function (t, e) {
    var n = this._model;
    t = Ni(n, t, {
      defaultMainType: "series"
    });
    var i = t.seriesModel,
        r = i.getData(),
        a = t.hasOwnProperty("dataIndexInside") ? t.dataIndexInside : t.hasOwnProperty("dataIndex") ? r.indexOfRawIndex(t.dataIndex) : null;
    return null != a ? r.getItemVisual(a, e) : r.getVisual(e);
  }, mv.getViewOfComponentModel = function (t) {
    return this._componentsMap[t.__viewId];
  }, mv.getViewOfSeriesModel = function (t) {
    return this._chartsMap[t.__viewId];
  };
  var _v = {
    prepareAndUpdate: function (t) {
      Ws(this), _v.update.call(this, t);
    },
    update: function (t) {
      var e = this._model,
          n = this._api,
          i = this._zr,
          r = this._coordSysMgr,
          a = this._scheduler;

      if (e) {
        a.restoreData(e, t), a.performSeriesTasks(e), r.create(e, n), a.performDataProcessorTasks(e, t), Us(this, e), r.update(e, n), $s(e), a.performVisualTasks(e, t), Qs(this, e, n, t);
        var o = e.get("backgroundColor") || "transparent";
        if (cu.canvasSupported) i.setBackgroundColor(o);else {
          var s = Re(o);
          o = He(s, "rgb"), 0 === s[3] && (o = "transparent");
        }
        tl(e, n);
      }
    },
    updateTransform: function (t) {
      var e = this._model,
          n = this,
          i = this._api;

      if (e) {
        var r = [];
        e.eachComponent(function (a, o) {
          var s = n.getViewOfComponentModel(o);
          if (s && s.__alive) if (s.updateTransform) {
            var l = s.updateTransform(o, e, i, t);
            l && l.update && r.push(s);
          } else r.push(s);
        });
        var a = E();
        e.eachSeries(function (r) {
          var o = n._chartsMap[r.__viewId];

          if (o.updateTransform) {
            var s = o.updateTransform(r, e, i, t);
            s && s.update && a.set(r.uid, 1);
          } else a.set(r.uid, 1);
        }), $s(e), this._scheduler.performVisualTasks(e, t, {
          setDirty: !0,
          dirtyMap: a
        }), Js(n, e, i, t, a), tl(e, this._api);
      }
    },
    updateView: function (t) {
      var e = this._model;
      e && (ss.markUpdateMethod(t, "updateView"), $s(e), this._scheduler.performVisualTasks(e, t, {
        setDirty: !0
      }), Qs(this, this._model, this._api, t), tl(e, this._api));
    },
    updateVisual: function (t) {
      _v.update.call(this, t);
    },
    updateLayout: function (t) {
      _v.update.call(this, t);
    }
  };
  mv.resize = function (t) {
    if (!this._disposed) {
      this._zr.resize(t);

      var e = this._model;

      if (this._loadingFX && this._loadingFX.resize(), e) {
        var n = e.resetOption("media"),
            i = t && t.silent;
        this[pv] = !0, n && Ws(this), _v.update.call(this), this[pv] = !1, Ys.call(this, i), qs.call(this, i);
      }
    }
  }, mv.showLoading = function (t, e) {
    if (!this._disposed && (Qg(t) && (e = t, t = ""), t = t || "default", this.hideLoading(), Cv[t])) {
      var n = Cv[t](this._api, e),
          i = this._zr;
      this._loadingFX = n, i.add(n);
    }
  }, mv.hideLoading = function () {
    this._disposed || (this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null);
  }, mv.makeActionFromEvent = function (t) {
    var e = a({}, t);
    return e.type = wv[t.type], e;
  }, mv.dispatchAction = function (t, e) {
    if (!this._disposed && (Qg(e) || (e = {
      silent: !!e
    }), xv[t.type] && this._model)) {
      if (this[pv]) return void this._pendingActions.push(t);
      Xs.call(this, t, e.silent), e.flush ? this._zr.flush(!0) : e.flush !== !1 && cu.browser.weChat && this._throttledZrFlush(), Ys.call(this, e.silent), qs.call(this, e.silent);
    }
  }, mv.appendData = function (t) {
    if (!this._disposed) {
      var e = t.seriesIndex,
          n = this.getModel(),
          i = n.getSeriesByIndex(e);
      i.appendData(t), this._scheduler.unfinished = !0;
    }
  }, mv.on = Ns("on", !1), mv.off = Ns("off", !1), mv.one = Ns("one", !1);
  var yv = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
  mv._initEvents = function () {
    Zg(yv, function (t) {
      var e = function (e) {
        var n,
            i = this.getModel(),
            r = e.target,
            o = "globalout" === t;
        if (o) n = {};else if (r && null != r.dataIndex) {
          var s = r.dataModel || i.getSeriesByIndex(r.seriesIndex);
          n = s && s.getDataParams(r.dataIndex, r.dataType, r) || {};
        } else r && r.eventData && (n = a({}, r.eventData));

        if (n) {
          var l = n.componentType,
              h = n.componentIndex;
          ("markLine" === l || "markPoint" === l || "markArea" === l) && (l = "series", h = n.seriesIndex);
          var u = l && null != h && i.getComponent(l, h),
              c = u && this["series" === u.mainType ? "_chartsMap" : "_componentsMap"][u.__viewId];
          n.event = e, n.type = t, this._ecEventProcessor.eventInfo = {
            targetEl: r,
            packedEvent: n,
            model: u,
            view: c
          }, this.trigger(t, n);
        }
      };

      e.zrEventfulCallAtLast = !0, this._zr.on(t, e, this);
    }, this), Zg(wv, function (t, e) {
      this._messageCenter.on(e, function (t) {
        this.trigger(e, t);
      }, this);
    }, this);
  }, mv.isDisposed = function () {
    return this._disposed;
  }, mv.clear = function () {
    this._disposed || this.setOption({
      series: []
    }, !0);
  }, mv.dispose = function () {
    if (!this._disposed) {
      this._disposed = !0, Hi(this.getDom(), Ov, "");
      var t = this._api,
          e = this._model;
      Zg(this._componentsViews, function (n) {
        n.dispose(e, t);
      }), Zg(this._chartsViews, function (n) {
        n.dispose(e, t);
      }), this._zr.dispose(), delete kv[this.id];
    }
  }, u(Hs, Du), al.prototype = {
    constructor: al,
    normalizeQuery: function (t) {
      var e = {},
          n = {},
          i = {};

      if (x(t)) {
        var r = Kg(t);
        e.mainType = r.main || null, e.subType = r.sub || null;
      } else {
        var a = ["Index", "Name", "Id"],
            o = {
          name: 1,
          dataIndex: 1,
          dataType: 1
        };
        d(t, function (t, r) {
          for (var s = !1, l = 0; l < a.length; l++) {
            var h = a[l],
                u = r.lastIndexOf(h);

            if (u > 0 && u === r.length - h.length) {
              var c = r.slice(0, u);
              "data" !== c && (e.mainType = c, e[h.toLowerCase()] = t, s = !0);
            }
          }

          o.hasOwnProperty(r) && (n[r] = t, s = !0), s || (i[r] = t);
        });
      }

      return {
        cptQuery: e,
        dataQuery: n,
        otherQuery: i
      };
    },
    filter: function (t, e) {
      function n(t, e, n, i) {
        return null == t[n] || e[i || n] === t[n];
      }

      var i = this.eventInfo;
      if (!i) return !0;
      var r = i.targetEl,
          a = i.packedEvent,
          o = i.model,
          s = i.view;
      if (!o || !s) return !0;
      var l = e.cptQuery,
          h = e.dataQuery;
      return n(l, o, "mainType") && n(l, o, "subType") && n(l, o, "index", "componentIndex") && n(l, o, "name") && n(l, o, "id") && n(h, a, "name") && n(h, a, "dataIndex") && n(h, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, e.otherQuery, r, a));
    },
    afterTrigger: function () {
      this.eventInfo = null;
    }
  };
  var xv = {},
      wv = {},
      bv = [],
      Sv = [],
      Mv = [],
      Tv = [],
      Iv = {},
      Cv = {},
      kv = {},
      Dv = {},
      Av = new Date() - 0,
      Pv = new Date() - 0,
      Ov = "_echarts_instance_",
      Lv = hl;
  wl(lv, xg), pl(eg), gl(rv, ng), Sl("default", Mg), ml({
    type: "highlight",
    event: "highlight",
    update: "highlight"
  }, B), ml({
    type: "downplay",
    event: "downplay",
    update: "downplay"
  }, B), fl("light", Og), fl("dark", Rg);

  var Ev = {},
      Bv = E(["tooltip", "label", "itemName", "itemId", "seriesName"]),
      Rv = function (t, e) {
    return e = e || {}, Bl(e.coordDimensions || [], t, {
      dimsDef: e.dimensionsDefine || t.dimensionsDefine,
      encodeDef: e.encodeDefine || t.encodeDefine,
      dimCount: e.dimensionsCount,
      encodeDefaulter: e.encodeDefaulter,
      generateCoord: e.generateCoord,
      generateCoordCount: e.generateCoordCount
    });
  };

  Fl.prototype = {
    constructor: Fl,
    add: function (t) {
      return this._add = t, this;
    },
    update: function (t) {
      return this._update = t, this;
    },
    remove: function (t) {
      return this._remove = t, this;
    },
    execute: function () {
      var t,
          e = this._old,
          n = this._new,
          i = {},
          r = {},
          a = [],
          o = [];

      for (Hl(e, i, a, "_oldKeyGetter", this), Hl(n, r, o, "_newKeyGetter", this), t = 0; t < e.length; t++) {
        var s = a[t],
            l = r[s];

        if (null != l) {
          var h = l.length;
          h ? (1 === h && (r[s] = null), l = l.shift()) : r[s] = null, this._update && this._update(l, t);
        } else this._remove && this._remove(t);
      }

      for (var t = 0; t < o.length; t++) {
        var s = o[t];

        if (r.hasOwnProperty(s)) {
          var l = r[s];
          if (null == l) continue;
          if (l.length) for (var u = 0, h = l.length; h > u; u++) this._add && this._add(l[u]);else this._add && this._add(l);
        }
      }
    }
  };

  var zv = w,
      Nv = "undefined",
      Fv = -1,
      Hv = "e\x00\x00",
      Vv = {
    "float": typeof Float64Array === Nv ? Array : Float64Array,
    "int": typeof Int32Array === Nv ? Array : Int32Array,
    ordinal: Array,
    number: Array,
    time: Array
  },
      Wv = typeof Uint32Array === Nv ? Array : Uint32Array,
      Gv = typeof Int32Array === Nv ? Array : Int32Array,
      Uv = typeof Uint16Array === Nv ? Array : Uint16Array,
      Xv = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_rawData", "_chunkSize", "_chunkCount", "_dimValueGetter", "_count", "_rawCount", "_nameDimIdx", "_idDimIdx"],
      Yv = ["_extent", "_approximateExtent", "_rawExtent"],
      qv = function (t, e) {
    t = t || ["x", "y"];

    for (var n = {}, i = [], r = {}, a = 0; a < t.length; a++) {
      var o = t[a];
      x(o) ? o = new El({
        name: o
      }) : o instanceof El || (o = new El(o));
      var s = o.name;
      o.type = o.type || "float", o.coordDim || (o.coordDim = s, o.coordDimIndex = 0), o.otherDims = o.otherDims || {}, i.push(s), n[s] = o, o.index = a, o.createInvertedIndices && (r[s] = []);
    }

    this.dimensions = i, this._dimensionInfos = n, this.hostModel = e, this.dataType, this._indices = null, this._count = 0, this._rawCount = 0, this._storage = {}, this._nameList = [], this._idList = [], this._optionModels = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this.hasItemVisual = {}, this._itemLayouts = [], this._graphicEls = [], this._chunkSize = 1e5, this._chunkCount = 0, this._rawData, this._rawExtent = {}, this._extent = {}, this._approximateExtent = {}, this._dimensionsSummary = Pl(this), this._invertedIndicesMap = r, this._calculationInfo = {}, this.userOutput = this._dimensionsSummary.userOutput;
  },
      jv = qv.prototype;

  jv.type = "list", jv.hasItemOption = !0, jv.getDimension = function (t) {
    return ("number" == typeof t || !isNaN(t) && !this._dimensionInfos.hasOwnProperty(t)) && (t = this.dimensions[t]), t;
  }, jv.getDimensionInfo = function (t) {
    return this._dimensionInfos[this.getDimension(t)];
  }, jv.getDimensionsOnCoord = function () {
    return this._dimensionsSummary.dataDimsOnCoord.slice();
  }, jv.mapDimension = function (t, e) {
    var n = this._dimensionsSummary;
    if (null == e) return n.encodeFirstDimNotExtra[t];
    var i = n.encode[t];
    return e === !0 ? (i || []).slice() : i && i[e];
  }, jv.initData = function (t, e, n) {
    var i = Ja.isInstance(t) || c(t);
    i && (t = new Ho(t, this.dimensions.length)), this._rawData = t, this._storage = {}, this._indices = null, this._nameList = e || [], this._idList = [], this._nameRepeatCount = {}, n || (this.hasItemOption = !1), this.defaultDimValueGetter = og[this._rawData.getSource().sourceFormat], this._dimValueGetter = n = n || this.defaultDimValueGetter, this._dimValueGetterArrayRows = og.arrayRows, this._rawExtent = {}, this._initDataFromProvider(0, t.count()), t.pure && (this.hasItemOption = !1);
  }, jv.getProvider = function () {
    return this._rawData;
  }, jv.appendData = function (t) {
    var e = this._rawData,
        n = this.count();
    e.appendData(t);
    var i = e.count();
    e.persistent || (i += n), this._initDataFromProvider(n, i);
  }, jv.appendValues = function (t, e) {
    for (var n = this._chunkSize, i = this._storage, r = this.dimensions, a = r.length, o = this._rawExtent, s = this.count(), l = s + Math.max(t.length, e ? e.length : 0), h = this._chunkCount, u = 0; a > u; u++) {
      var c = r[u];
      o[c] || (o[c] = Jl()), i[c] || (i[c] = []), Ul(i, this._dimensionInfos[c], n, h, l), this._chunkCount = i[c].length;
    }

    for (var d = new Array(a), f = s; l > f; f++) {
      for (var p = f - s, g = Math.floor(f / n), v = f % n, m = 0; a > m; m++) {
        var c = r[m],
            _ = this._dimValueGetterArrayRows(t[p] || d, c, p, m);

        i[c][g][v] = _;
        var y = o[c];
        _ < y[0] && (y[0] = _), _ > y[1] && (y[1] = _);
      }

      e && (this._nameList[f] = e[p]);
    }

    this._rawCount = this._count = l, this._extent = {}, Xl(this);
  }, jv._initDataFromProvider = function (t, e) {
    if (!(t >= e)) {
      for (var n, i = this._chunkSize, r = this._rawData, a = this._storage, o = this.dimensions, s = o.length, l = this._dimensionInfos, h = this._nameList, u = this._idList, c = this._rawExtent, d = this._nameRepeatCount = {}, f = this._chunkCount, p = 0; s > p; p++) {
        var g = o[p];
        c[g] || (c[g] = Jl());
        var v = l[g];
        0 === v.otherDims.itemName && (n = this._nameDimIdx = p), 0 === v.otherDims.itemId && (this._idDimIdx = p), a[g] || (a[g] = []), Ul(a, v, i, f, e), this._chunkCount = a[g].length;
      }

      for (var m = new Array(s), _ = t; e > _; _++) {
        m = r.getItem(_, m);

        for (var y = Math.floor(_ / i), x = _ % i, w = 0; s > w; w++) {
          var g = o[w],
              b = a[g][y],
              S = this._dimValueGetter(m, g, _, w);

          b[x] = S;
          var M = c[g];
          S < M[0] && (M[0] = S), S > M[1] && (M[1] = S);
        }

        if (!r.pure) {
          var T = h[_];
          if (m && null == T) if (null != m.name) h[_] = T = m.name;else if (null != n) {
            var I = o[n],
                C = a[I][y];

            if (C) {
              T = C[x];
              var k = l[I].ordinalMeta;
              k && k.categories.length && (T = k.categories[T]);
            }
          }
          var D = null == m ? null : m.id;
          null == D && null != T && (d[T] = d[T] || 0, D = T, d[T] > 0 && (D += "__ec__" + d[T]), d[T]++), null != D && (u[_] = D);
        }
      }

      !r.persistent && r.clean && r.clean(), this._rawCount = this._count = e, this._extent = {}, Xl(this);
    }
  }, jv.count = function () {
    return this._count;
  }, jv.getIndices = function () {
    var t,
        e = this._indices;

    if (e) {
      var n = e.constructor,
          i = this._count;

      if (n === Array) {
        t = new n(i);

        for (var r = 0; i > r; r++) t[r] = e[r];
      } else t = new n(e.buffer, 0, i);
    } else for (var n = Vl(this), t = new n(this.count()), r = 0; r < t.length; r++) t[r] = r;

    return t;
  }, jv.get = function (t, e) {
    if (!(e >= 0 && e < this._count)) return 0 / 0;
    var n = this._storage;
    if (!n[t]) return 0 / 0;
    e = this.getRawIndex(e);
    var i = Math.floor(e / this._chunkSize),
        r = e % this._chunkSize,
        a = n[t][i],
        o = a[r];
    return o;
  }, jv.getByRawIndex = function (t, e) {
    if (!(e >= 0 && e < this._rawCount)) return 0 / 0;
    var n = this._storage[t];
    if (!n) return 0 / 0;
    var i = Math.floor(e / this._chunkSize),
        r = e % this._chunkSize,
        a = n[i];
    return a[r];
  }, jv._getFast = function (t, e) {
    var n = Math.floor(e / this._chunkSize),
        i = e % this._chunkSize,
        r = this._storage[t][n];
    return r[i];
  }, jv.getValues = function (t, e) {
    var n = [];
    _(t) || (e = t, t = this.dimensions);

    for (var i = 0, r = t.length; r > i; i++) n.push(this.get(t[i], e));

    return n;
  }, jv.hasValue = function (t) {
    for (var e = this._dimensionsSummary.dataDimsOnCoord, n = 0, i = e.length; i > n; n++) if (isNaN(this.get(e[n], t))) return !1;

    return !0;
  }, jv.getDataExtent = function (t) {
    t = this.getDimension(t);
    var e = this._storage[t],
        n = Jl();
    if (!e) return n;
    var i,
        r = this.count(),
        a = !this._indices;
    if (a) return this._rawExtent[t].slice();
    if (i = this._extent[t]) return i.slice();
    i = n;

    for (var o = i[0], s = i[1], l = 0; r > l; l++) {
      var h = this._getFast(t, this.getRawIndex(l));

      o > h && (o = h), h > s && (s = h);
    }

    return i = [o, s], this._extent[t] = i, i;
  }, jv.getApproximateExtent = function (t) {
    return t = this.getDimension(t), this._approximateExtent[t] || this.getDataExtent(t);
  }, jv.setApproximateExtent = function (t, e) {
    e = this.getDimension(e), this._approximateExtent[e] = t.slice();
  }, jv.getCalculationInfo = function (t) {
    return this._calculationInfo[t];
  }, jv.setCalculationInfo = function (t, e) {
    zv(t) ? a(this._calculationInfo, t) : this._calculationInfo[t] = e;
  }, jv.getSum = function (t) {
    var e = this._storage[t],
        n = 0;
    if (e) for (var i = 0, r = this.count(); r > i; i++) {
      var a = this.get(t, i);
      isNaN(a) || (n += a);
    }
    return n;
  }, jv.getMedian = function (t) {
    var e = [];
    this.each(t, function (t) {
      isNaN(t) || e.push(t);
    });
    var n = [].concat(e).sort(function (t, e) {
      return t - e;
    }),
        i = this.count();
    return 0 === i ? 0 : i % 2 === 1 ? n[(i - 1) / 2] : (n[i / 2] + n[i / 2 - 1]) / 2;
  }, jv.rawIndexOf = function (t, e) {
    var n = t && this._invertedIndicesMap[t],
        i = n[e];
    return null == i || isNaN(i) ? Fv : i;
  }, jv.indexOfName = function (t) {
    for (var e = 0, n = this.count(); n > e; e++) if (this.getName(e) === t) return e;

    return -1;
  }, jv.indexOfRawIndex = function (t) {
    if (t >= this._rawCount || 0 > t) return -1;
    if (!this._indices) return t;
    var e = this._indices,
        n = e[t];
    if (null != n && n < this._count && n === t) return t;

    for (var i = 0, r = this._count - 1; r >= i;) {
      var a = (i + r) / 2 | 0;
      if (e[a] < t) i = a + 1;else {
        if (!(e[a] > t)) return a;
        r = a - 1;
      }
    }

    return -1;
  }, jv.indicesOfNearest = function (t, e, n) {
    var i = this._storage,
        r = i[t],
        a = [];
    if (!r) return a;
    null == n && (n = 1 / 0);

    for (var o = 1 / 0, s = -1, l = 0, h = 0, u = this.count(); u > h; h++) {
      var c = e - this.get(t, h),
          d = Math.abs(c);
      n >= d && ((o > d || d === o && c >= 0 && 0 > s) && (o = d, s = c, l = 0), c === s && (a[l++] = h));
    }

    return a.length = l, a;
  }, jv.getRawIndex = ql, jv.getRawDataItem = function (t) {
    if (this._rawData.persistent) return this._rawData.getItem(this.getRawIndex(t));

    for (var e = [], n = 0; n < this.dimensions.length; n++) {
      var i = this.dimensions[n];
      e.push(this.get(i, t));
    }

    return e;
  }, jv.getName = function (t) {
    var e = this.getRawIndex(t);
    return this._nameList[e] || Yl(this, this._nameDimIdx, e) || "";
  }, jv.getId = function (t) {
    return Zl(this, this.getRawIndex(t));
  }, jv.each = function (t, e, n, i) {
    if (this._count) {
      "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this, t = f($l(t), this.getDimension, this);

      for (var r = t.length, a = 0; a < this.count(); a++) switch (r) {
        case 0:
          e.call(n, a);
          break;

        case 1:
          e.call(n, this.get(t[0], a), a);
          break;

        case 2:
          e.call(n, this.get(t[0], a), this.get(t[1], a), a);
          break;

        default:
          for (var o = 0, s = []; r > o; o++) s[o] = this.get(t[o], a);

          s[o] = a, e.apply(n, s);
      }
    }
  }, jv.filterSelf = function (t, e, n, i) {
    if (this._count) {
      "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this, t = f($l(t), this.getDimension, this);

      for (var r = this.count(), a = Vl(this), o = new a(r), s = [], l = t.length, h = 0, u = t[0], c = 0; r > c; c++) {
        var d,
            p = this.getRawIndex(c);
        if (0 === l) d = e.call(n, c);else if (1 === l) {
          var g = this._getFast(u, p);

          d = e.call(n, g, c);
        } else {
          for (var v = 0; l > v; v++) s[v] = this._getFast(u, p);

          s[v] = c, d = e.apply(n, s);
        }
        d && (o[h++] = p);
      }

      return r > h && (this._indices = o), this._count = h, this._extent = {}, this.getRawIndex = this._indices ? jl : ql, this;
    }
  }, jv.selectRange = function (t) {
    if (this._count) {
      var e = [];

      for (var n in t) t.hasOwnProperty(n) && e.push(n);

      var i = e.length;

      if (i) {
        var r = this.count(),
            a = Vl(this),
            o = new a(r),
            s = 0,
            l = e[0],
            h = t[l][0],
            u = t[l][1],
            c = !1;

        if (!this._indices) {
          var d = 0;

          if (1 === i) {
            for (var f = this._storage[e[0]], p = 0; p < this._chunkCount; p++) for (var g = f[p], v = Math.min(this._count - p * this._chunkSize, this._chunkSize), m = 0; v > m; m++) {
              var _ = g[m];
              (_ >= h && u >= _ || isNaN(_)) && (o[s++] = d), d++;
            }

            c = !0;
          } else if (2 === i) {
            for (var f = this._storage[l], y = this._storage[e[1]], x = t[e[1]][0], w = t[e[1]][1], p = 0; p < this._chunkCount; p++) for (var g = f[p], b = y[p], v = Math.min(this._count - p * this._chunkSize, this._chunkSize), m = 0; v > m; m++) {
              var _ = g[m],
                  S = b[m];
              (_ >= h && u >= _ || isNaN(_)) && (S >= x && w >= S || isNaN(S)) && (o[s++] = d), d++;
            }

            c = !0;
          }
        }

        if (!c) if (1 === i) for (var m = 0; r > m; m++) {
          var M = this.getRawIndex(m),
              _ = this._getFast(l, M);

          (_ >= h && u >= _ || isNaN(_)) && (o[s++] = M);
        } else for (var m = 0; r > m; m++) {
          for (var T = !0, M = this.getRawIndex(m), p = 0; i > p; p++) {
            var I = e[p],
                _ = this._getFast(n, M);

            (_ < t[I][0] || _ > t[I][1]) && (T = !1);
          }

          T && (o[s++] = this.getRawIndex(m));
        }
        return r > s && (this._indices = o), this._count = s, this._extent = {}, this.getRawIndex = this._indices ? jl : ql, this;
      }
    }
  }, jv.mapArray = function (t, e, n, i) {
    "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this;
    var r = [];
    return this.each(t, function () {
      r.push(e && e.apply(this, arguments));
    }, n), r;
  }, jv.map = function (t, e, n, i) {
    n = n || i || this, t = f($l(t), this.getDimension, this);
    var r = Ql(this, t);
    r._indices = this._indices, r.getRawIndex = r._indices ? jl : ql;

    for (var a = r._storage, o = [], s = this._chunkSize, l = t.length, h = this.count(), u = [], c = r._rawExtent, d = 0; h > d; d++) {
      for (var p = 0; l > p; p++) u[p] = this.get(t[p], d);

      u[l] = d;
      var g = e && e.apply(n, u);

      if (null != g) {
        "object" != typeof g && (o[0] = g, g = o);

        for (var v = this.getRawIndex(d), m = Math.floor(v / s), _ = v % s, y = 0; y < g.length; y++) {
          var x = t[y],
              w = g[y],
              b = c[x],
              S = a[x];
          S && (S[m][_] = w), w < b[0] && (b[0] = w), w > b[1] && (b[1] = w);
        }
      }
    }

    return r;
  }, jv.downSample = function (t, e, n, i) {
    for (var r = Ql(this, [t]), a = r._storage, o = [], s = Math.floor(1 / e), l = a[t], h = this.count(), u = this._chunkSize, c = r._rawExtent[t], d = new (Vl(this))(h), f = 0, p = 0; h > p; p += s) {
      s > h - p && (s = h - p, o.length = s);

      for (var g = 0; s > g; g++) {
        var v = this.getRawIndex(p + g),
            m = Math.floor(v / u),
            _ = v % u;

        o[g] = l[m][_];
      }

      var y = n(o),
          x = this.getRawIndex(Math.min(p + i(o, y) || 0, h - 1)),
          w = Math.floor(x / u),
          b = x % u;
      l[w][b] = y, y < c[0] && (c[0] = y), y > c[1] && (c[1] = y), d[f++] = x;
    }

    return r._count = f, r._indices = d, r.getRawIndex = jl, r;
  }, jv.getItemModel = function (t) {
    var e = this.hostModel;
    return new Sa(this.getRawDataItem(t), e, e && e.ecModel);
  }, jv.diff = function (t) {
    var e = this;
    return new Fl(t ? t.getIndices() : [], this.getIndices(), function (e) {
      return Zl(t, e);
    }, function (t) {
      return Zl(e, t);
    });
  }, jv.getVisual = function (t) {
    var e = this._visual;
    return e && e[t];
  }, jv.setVisual = function (t, e) {
    if (zv(t)) for (var n in t) t.hasOwnProperty(n) && this.setVisual(n, t[n]);else this._visual = this._visual || {}, this._visual[t] = e;
  }, jv.setLayout = function (t, e) {
    if (zv(t)) for (var n in t) t.hasOwnProperty(n) && this.setLayout(n, t[n]);else this._layout[t] = e;
  }, jv.getLayout = function (t) {
    return this._layout[t];
  }, jv.getItemLayout = function (t) {
    return this._itemLayouts[t];
  }, jv.setItemLayout = function (t, e, n) {
    this._itemLayouts[t] = n ? a(this._itemLayouts[t] || {}, e) : e;
  }, jv.clearItemLayouts = function () {
    this._itemLayouts.length = 0;
  }, jv.getItemVisual = function (t, e, n) {
    var i = this._itemVisuals[t],
        r = i && i[e];
    return null != r || n ? r : this.getVisual(e);
  }, jv.setItemVisual = function (t, e, n) {
    var i = this._itemVisuals[t] || {},
        r = this.hasItemVisual;
    if (this._itemVisuals[t] = i, zv(e)) for (var a in e) e.hasOwnProperty(a) && (i[a] = e[a], r[a] = !0);else i[e] = n, r[e] = !0;
  }, jv.clearAllVisual = function () {
    this._visual = {}, this._itemVisuals = [], this.hasItemVisual = {};
  };

  var Zv = function (t) {
    t.seriesIndex = this.seriesIndex, t.dataIndex = this.dataIndex, t.dataType = this.dataType;
  };

  jv.setItemGraphicEl = function (t, e) {
    var n = this.hostModel;
    e && (e.dataIndex = t, e.dataType = this.dataType, e.seriesIndex = n && n.seriesIndex, "group" === e.type && e.traverse(Zv, e)), this._graphicEls[t] = e;
  }, jv.getItemGraphicEl = function (t) {
    return this._graphicEls[t];
  }, jv.eachItemGraphicEl = function (t, e) {
    d(this._graphicEls, function (n, i) {
      n && t && t.call(e, n, i);
    });
  }, jv.cloneShallow = function (t) {
    if (!t) {
      var e = f(this.dimensions, this.getDimensionInfo, this);
      t = new qv(e, this.hostModel);
    }

    if (t._storage = this._storage, Gl(t, this), this._indices) {
      var n = this._indices.constructor;
      t._indices = new n(this._indices);
    } else t._indices = null;

    return t.getRawIndex = t._indices ? jl : ql, t;
  }, jv.wrapMethod = function (t, e) {
    var n = this[t];
    "function" == typeof n && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function () {
      var t = n.apply(this, arguments);
      return e.apply(this, [t].concat(C(arguments)));
    });
  }, jv.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "map"], jv.CHANGABLE_METHODS = ["filterSelf", "selectRange"];

  var $v = function (t, e, n) {
    e = _(e) && {
      coordDimensions: e
    } || a({}, e);
    var i = t.getSource(),
        r = Rv(i, e),
        o = new qv(r, t);
    return o.initData(i, n), o;
  },
      Qv = {
    updateSelectedMap: function (t) {
      this._targetList = _(t) ? t.slice() : [], this._selectTargetMap = p(t || [], function (t, e) {
        return t.set(e.name, e), t;
      }, E());
    },
    select: function (t, e) {
      var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t),
          i = this.get("selectedMode");
      "single" === i && this._selectTargetMap.each(function (t) {
        t.selected = !1;
      }), n && (n.selected = !0);
    },
    unSelect: function (t, e) {
      var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
      n && (n.selected = !1);
    },
    toggleSelected: function (t, e) {
      var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
      return null != n ? (this[n.selected ? "unSelect" : "select"](t, e), n.selected) : void 0;
    },
    isSelected: function (t, e) {
      var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
      return n && n.selected;
    }
  },
      Kv = Il({
    type: "series.pie",
    init: function (t) {
      Kv.superApply(this, "init", arguments), this.legendVisualProvider = new th(v(this.getData, this), v(this.getRawData, this)), this.updateSelectedMap(this._createSelectableList()), this._defaultLabelLine(t);
    },
    mergeOption: function (t) {
      Kv.superCall(this, "mergeOption", t), this.updateSelectedMap(this._createSelectableList());
    },
    getInitialData: function () {
      return $v(this, {
        coordDimensions: ["value"],
        encodeDefaulter: m(lo, this)
      });
    },
    _createSelectableList: function () {
      for (var t = this.getRawData(), e = t.mapDimension("value"), n = [], i = 0, r = t.count(); r > i; i++) n.push({
        name: t.getName(i),
        value: t.get(e, i),
        selected: jo(t, i, "selected")
      });

      return n;
    },
    getDataParams: function (t) {
      var e = this.getData(),
          n = Kv.superCall(this, "getDataParams", t),
          i = [];
      return e.each(e.mapDimension("value"), function (t) {
        i.push(t);
      }), n.percent = Ea(i, t, e.hostModel.get("percentPrecision")), n.$vars.push("percent"), n;
    },
    _defaultLabelLine: function (t) {
      Di(t, "labelLine", ["show"]);
      var e = t.labelLine,
          n = t.emphasis.labelLine;
      e.show = e.show && t.label.show, n.show = n.show && t.emphasis.label.show;
    },
    defaultOption: {
      zlevel: 0,
      z: 2,
      legendHoverLink: !0,
      hoverAnimation: !0,
      center: ["50%", "50%"],
      radius: [0, "75%"],
      clockwise: !0,
      startAngle: 90,
      minAngle: 0,
      minShowLabelAngle: 0,
      selectedOffset: 10,
      hoverOffset: 10,
      avoidLabelOverlap: !0,
      percentPrecision: 2,
      stillShowZeroSum: !0,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: null,
      height: null,
      label: {
        rotate: !1,
        show: !0,
        position: "outer",
        alignTo: "none",
        margin: "25%",
        bleedMargin: 10,
        distanceToLabelLine: 5
      },
      labelLine: {
        show: !0,
        length: 15,
        length2: 15,
        smooth: !1,
        lineStyle: {
          width: 1,
          type: "solid"
        }
      },
      itemStyle: {
        borderWidth: 1
      },
      animationType: "expansion",
      animationTypeUpdate: "transition",
      animationEasing: "cubicOut"
    }
  });

  u(Kv, Qv);
  var Jv = ih.prototype;
  Jv.updateData = function (t, e, n) {
    var i = this.childAt(0),
        r = this.childAt(1),
        s = this.childAt(2),
        l = t.hostModel,
        h = t.getItemModel(e),
        u = t.getItemLayout(e),
        c = a({}, u);
    c.label = null;
    var d = l.getShallow("animationTypeUpdate");

    if (n) {
      i.setShape(c);
      var f = l.getShallow("animationType");
      "scale" === f ? (i.shape.r = u.r0, wa(i, {
        shape: {
          r: u.r
        }
      }, l, e)) : (i.shape.endAngle = u.startAngle, xa(i, {
        shape: {
          endAngle: u.endAngle
        }
      }, l, e));
    } else "expansion" === d ? i.setShape(c) : xa(i, {
      shape: c
    }, l, e);

    var p = t.getItemVisual(e, "color");
    i.useStyle(o({
      lineJoin: "bevel",
      fill: p
    }, h.getModel("itemStyle").getItemStyle())), i.hoverStyle = h.getModel("emphasis.itemStyle").getItemStyle();
    var g = h.getShallow("cursor");
    g && i.attr("cursor", g), nh(this, t.getItemLayout(e), l.isSelected(t.getName(e)), l.get("selectedOffset"), l.get("animation"));
    var v = !n && "transition" === d;
    this._updateLabel(t, e, v), this.highDownOnUpdate = h.get("hoverAnimation") && l.isAnimationEnabled() ? function (t, e) {
      "emphasis" === e ? (r.ignore = r.hoverIgnore, s.ignore = s.hoverIgnore, i.stopAnimation(!0), i.animateTo({
        shape: {
          r: u.r + l.get("hoverOffset")
        }
      }, 300, "elasticOut")) : (r.ignore = r.normalIgnore, s.ignore = s.normalIgnore, i.stopAnimation(!0), i.animateTo({
        shape: {
          r: u.r
        }
      }, 300, "elasticOut"));
    } : null, oa(this);
  }, Jv._updateLabel = function (t, e, n) {
    var i = this.childAt(1),
        r = this.childAt(2),
        a = t.hostModel,
        o = t.getItemModel(e),
        s = t.getItemLayout(e),
        l = s.label,
        h = t.getItemVisual(e, "color");
    if (!l || isNaN(l.x) || isNaN(l.y)) return void (r.ignore = r.normalIgnore = r.hoverIgnore = i.ignore = i.normalIgnore = i.hoverIgnore = !0);
    var u = {
      points: l.linePoints || [[l.x, l.y], [l.x, l.y], [l.x, l.y]]
    },
        c = {
      x: l.x,
      y: l.y
    };
    n ? (xa(i, {
      shape: u
    }, a, e), xa(r, {
      style: c
    }, a, e)) : (i.attr({
      shape: u
    }), r.attr({
      style: c
    })), r.attr({
      rotation: l.rotation,
      origin: [l.x, l.y],
      z2: 10
    });
    var d = o.getModel("label"),
        f = o.getModel("emphasis.label"),
        p = o.getModel("labelLine"),
        g = o.getModel("emphasis.labelLine"),
        h = t.getItemVisual(e, "color");
    ua(r.style, r.hoverStyle = {}, d, f, {
      labelFetcher: t.hostModel,
      labelDataIndex: e,
      defaultText: l.text,
      autoColor: h,
      useInsideStyle: !!l.inside
    }, {
      textAlign: l.textAlign,
      textVerticalAlign: l.verticalAlign,
      opacity: t.getItemVisual(e, "opacity")
    }), r.ignore = r.normalIgnore = !d.get("show"), r.hoverIgnore = !f.get("show"), i.ignore = i.normalIgnore = !p.get("show"), i.hoverIgnore = !g.get("show"), i.setStyle({
      stroke: h,
      opacity: t.getItemVisual(e, "opacity")
    }), i.setStyle(p.getModel("lineStyle").getLineStyle()), i.hoverStyle = g.getModel("lineStyle").getLineStyle();
    var v = p.get("smooth");
    v && v === !0 && (v = .4), i.setShape({
      smooth: v
    });
  }, h(ih, vc);

  var tm = (ss.extend({
    type: "pie",
    init: function () {
      var t = new vc();
      this._sectorGroup = t;
    },
    render: function (t, e, n, i) {
      if (!i || i.from !== this.uid) {
        var r = t.getData(),
            a = this._data,
            o = this.group,
            s = e.get("animation"),
            l = !a,
            h = t.get("animationType"),
            u = t.get("animationTypeUpdate"),
            c = m(eh, this.uid, t, s, n),
            d = t.get("selectedMode");

        if (r.diff(a).add(function (t) {
          var e = new ih(r, t);
          l && "scale" !== h && e.eachChild(function (t) {
            t.stopAnimation(!0);
          }), d && e.on("click", c), r.setItemGraphicEl(t, e), o.add(e);
        }).update(function (t, e) {
          var n = a.getItemGraphicEl(e);
          l || "transition" === u || n.eachChild(function (t) {
            t.stopAnimation(!0);
          }), n.updateData(r, t), n.off("click"), d && n.on("click", c), o.add(n), r.setItemGraphicEl(t, n);
        }).remove(function (t) {
          var e = a.getItemGraphicEl(t);
          o.remove(e);
        }).execute(), s && r.count() > 0 && (l ? "scale" !== h : "transition" !== u)) {
          for (var f = r.getItemLayout(0), p = 1; isNaN(f.startAngle) && p < r.count(); ++p) f = r.getItemLayout(p);

          var g = Math.max(n.getWidth(), n.getHeight()) / 2,
              _ = v(o.removeClipPath, o);

          o.setClipPath(this._createClipPath(f.cx, f.cy, g, f.startAngle, f.clockwise, _, t, l));
        } else o.removeClipPath();

        this._data = r;
      }
    },
    dispose: function () {},
    _createClipPath: function (t, e, n, i, r, a, o, s) {
      var l = new Lf({
        shape: {
          cx: t,
          cy: e,
          r0: 0,
          r: n,
          startAngle: i,
          endAngle: i,
          clockwise: r
        }
      }),
          h = s ? wa : xa;
      return h(l, {
        shape: {
          endAngle: i + (r ? 1 : -1) * Math.PI * 2
        }
      }, o, a), l;
    },
    containPoint: function (t, e) {
      var n = e.getData(),
          i = n.getItemLayout(0);

      if (i) {
        var r = t[0] - i.cx,
            a = t[1] - i.cy,
            o = Math.sqrt(r * r + a * a);
        return o <= i.r && o >= i.r0;
      }
    }
  }), function (t, e) {
    d(e, function (e) {
      e.update = "updateView", ml(e, function (n, i) {
        var r = {};
        return i.eachComponent({
          mainType: "series",
          subType: t,
          query: n
        }, function (t) {
          t[e.method] && t[e.method](n.name, n.dataIndex);
          var i = t.getData();
          i.each(function (e) {
            var n = i.getName(e);
            r[n] = t.isSelected(n) || !1;
          });
        }), {
          name: n.name,
          selected: r,
          seriesId: n.seriesId
        };
      });
    });
  }),
      em = function (t) {
    return {
      getTargetSeries: function (e) {
        var n = {},
            i = E();
        return e.eachSeriesByType(t, function (t) {
          t.__paletteScope = n, i.set(t.uid, t);
        }), i;
      },
      reset: function (t) {
        var e = t.getRawData(),
            n = {},
            i = t.getData();
        i.each(function (t) {
          var e = i.getRawIndex(t);
          n[e] = t;
        }), e.each(function (r) {
          var a,
              o = n[r],
              s = null != o && i.getItemVisual(o, "color", !0),
              l = null != o && i.getItemVisual(o, "borderColor", !0);

          if (s && l || (a = e.getItemModel(r)), !s) {
            var h = a.get("itemStyle.color") || t.getColorFromPalette(e.getName(r) || r + "", t.__paletteScope, e.count());
            null != o && i.setItemVisual(o, "color", h);
          }

          if (!l) {
            var u = a.get("itemStyle.borderColor");
            null != o && i.setItemVisual(o, "borderColor", u);
          }
        });
      }
    };
  },
      nm = Math.PI / 180,
      im = function (t, e, n, i, r, a) {
    var o,
        s,
        l = t.getData(),
        h = [],
        u = !1,
        c = (t.get("minShowLabelAngle") || 0) * nm;
    l.each(function (i) {
      var a = l.getItemLayout(i),
          d = l.getItemModel(i),
          f = d.getModel("label"),
          p = f.get("position") || d.get("emphasis.label.position"),
          g = f.get("distanceToLabelLine"),
          v = f.get("alignTo"),
          m = Pa(f.get("margin"), n),
          _ = f.get("bleedMargin"),
          y = f.getFont(),
          x = d.getModel("labelLine"),
          w = x.get("length");

      w = Pa(w, n);
      var b = x.get("length2");

      if (b = Pa(b, n), !(a.angle < c)) {
        var S,
            M,
            T,
            I,
            C = (a.startAngle + a.endAngle) / 2,
            k = Math.cos(C),
            D = Math.sin(C);
        o = a.cx, s = a.cy;
        var A = t.getFormattedLabel(i, "normal") || l.getName(i),
            P = Sn(A, y, I, "top"),
            O = "inside" === p || "inner" === p;
        if ("center" === p) S = a.cx, M = a.cy, I = "center";else {
          var L = (O ? (a.r + a.r0) / 2 * k : a.r * k) + o,
              E = (O ? (a.r + a.r0) / 2 * D : a.r * D) + s;

          if (S = L + 3 * k, M = E + 3 * D, !O) {
            var B = L + k * (w + e - a.r),
                R = E + D * (w + e - a.r),
                z = B + (0 > k ? -1 : 1) * b,
                N = R;
            S = "edge" === v ? 0 > k ? r + m : r + n - m : z + (0 > k ? -g : g), M = N, T = [[L, E], [B, R], [z, N]];
          }

          I = O ? "center" : "edge" === v ? k > 0 ? "right" : "left" : k > 0 ? "left" : "right";
        }
        var F,
            H = f.get("rotate");
        F = "number" == typeof H ? H * (Math.PI / 180) : H ? 0 > k ? -C + Math.PI : -C : 0, u = !!F, a.label = {
          x: S,
          y: M,
          position: p,
          height: P.height,
          len: w,
          len2: b,
          linePoints: T,
          textAlign: I,
          verticalAlign: "middle",
          rotation: F,
          inside: O,
          labelDistance: g,
          labelAlignTo: v,
          labelMargin: m,
          bleedMargin: _,
          textRect: P,
          text: A,
          font: y
        }, O || h.push(a.label);
      }
    }), !u && t.get("avoidLabelOverlap") && ah(h, o, s, e, n, i, r, a);
  },
      rm = 2 * Math.PI,
      am = Math.PI / 180,
      om = function (t, e, n) {
    e.eachSeriesByType(t, function (t) {
      var e = t.getData(),
          i = e.mapDimension("value"),
          r = sh(t, n),
          a = t.get("center"),
          o = t.get("radius");
      _(o) || (o = [0, o]), _(a) || (a = [a, a]);
      var s = Pa(r.width, n.getWidth()),
          l = Pa(r.height, n.getHeight()),
          h = Math.min(s, l),
          u = Pa(a[0], s) + r.x,
          c = Pa(a[1], l) + r.y,
          d = Pa(o[0], h / 2),
          f = Pa(o[1], h / 2),
          p = -t.get("startAngle") * am,
          g = t.get("minAngle") * am,
          v = 0;
      e.each(i, function (t) {
        !isNaN(t) && v++;
      });
      var m = e.getSum(i),
          y = Math.PI / (m || v) * 2,
          x = t.get("clockwise"),
          w = t.get("roseType"),
          b = t.get("stillShowZeroSum"),
          S = e.getDataExtent(i);
      S[0] = 0;
      var M = rm,
          T = 0,
          I = p,
          C = x ? 1 : -1;
      if (e.each(i, function (t, n) {
        var i;
        if (isNaN(t)) return void e.setItemLayout(n, {
          angle: 0 / 0,
          startAngle: 0 / 0,
          endAngle: 0 / 0,
          clockwise: x,
          cx: u,
          cy: c,
          r0: d,
          r: w ? 0 / 0 : f,
          viewRect: r
        });
        i = "area" !== w ? 0 === m && b ? y : t * y : rm / v, g > i ? (i = g, M -= g) : T += t;
        var a = I + C * i;
        e.setItemLayout(n, {
          angle: i,
          startAngle: I,
          endAngle: a,
          clockwise: x,
          cx: u,
          cy: c,
          r0: d,
          r: w ? Aa(t, S, [d, f]) : f,
          viewRect: r
        }), I = a;
      }), rm > M && v) if (.001 >= M) {
        var k = rm / v;
        e.each(i, function (t, n) {
          if (!isNaN(t)) {
            var i = e.getItemLayout(n);
            i.angle = k, i.startAngle = p + C * n * k, i.endAngle = p + C * (n + 1) * k;
          }
        });
      } else y = M / T, I = p, e.each(i, function (t, n) {
        if (!isNaN(t)) {
          var i = e.getItemLayout(n),
              r = i.angle === g ? g : t * y;
          i.startAngle = I, i.endAngle = I + C * r, I += C * r;
        }
      });
      im(t, f, r.width, r.height, r.x, r.y);
    });
  },
      sm = function (t) {
    return {
      seriesType: t,
      reset: function (t, e) {
        var n = e.findComponents({
          mainType: "legend"
        });

        if (n && n.length) {
          var i = t.getData();
          i.filterSelf(function (t) {
            for (var e = i.getName(t), r = 0; r < n.length; r++) if (!n[r].isSelected(e)) return !1;

            return !0;
          });
        }
      }
    };
  };

  tm("pie", [{
    type: "pieToggleSelect",
    event: "pieselectchanged",
    method: "toggleSelected"
  }, {
    type: "pieSelect",
    event: "pieselected",
    method: "select"
  }, {
    type: "pieUnSelect",
    event: "pieunselected",
    method: "unSelect"
  }]), wl(em("pie")), xl(m(om, "pie")), gl(sm("pie"));
  var lm = wg.legend.selector,
      hm = {
    all: {
      type: "all",
      title: i(lm.all)
    },
    inverse: {
      type: "inverse",
      title: i(lm.inverse)
    }
  },
      um = Ml({
    type: "legend.plain",
    dependencies: ["series"],
    layoutMode: {
      type: "box",
      ignoreSize: !0
    },
    init: function (t, e, n) {
      this.mergeDefaultAndTheme(t, n), t.selected = t.selected || {}, this._updateSelector(t);
    },
    mergeOption: function (t) {
      um.superCall(this, "mergeOption", t), this._updateSelector(t);
    },
    _updateSelector: function (t) {
      var e = t.selector;
      e === !0 && (e = t.selector = ["all", "inverse"]), _(e) && d(e, function (t, n) {
        x(t) && (t = {
          type: t
        }), e[n] = r(t, hm[t.type]);
      });
    },
    optionUpdated: function () {
      this._updateData(this.ecModel);

      var t = this._data;

      if (t[0] && "single" === this.get("selectedMode")) {
        for (var e = !1, n = 0; n < t.length; n++) {
          var i = t[n].get("name");

          if (this.isSelected(i)) {
            this.select(i), e = !0;
            break;
          }
        }

        !e && this.select(t[0].get("name"));
      }
    },
    _updateData: function (t) {
      var e = [],
          n = [];
      t.eachRawSeries(function (i) {
        var r = i.name;
        n.push(r);
        var a;

        if (i.legendVisualProvider) {
          var o = i.legendVisualProvider,
              s = o.getAllNames();
          t.isSeriesFiltered(i) || (n = n.concat(s)), s.length ? e = e.concat(s) : a = !0;
        } else a = !0;

        a && Ei(i) && e.push(i.name);
      }), this._availableNames = n;
      var i = this.get("data") || e,
          r = f(i, function (t) {
        return ("string" == typeof t || "number" == typeof t) && (t = {
          name: t
        }), new Sa(t, this, this.ecModel);
      }, this);
      this._data = r;
    },
    getData: function () {
      return this._data;
    },
    select: function (t) {
      var e = this.option.selected,
          n = this.get("selectedMode");

      if ("single" === n) {
        var i = this._data;
        d(i, function (t) {
          e[t.get("name")] = !1;
        });
      }

      e[t] = !0;
    },
    unSelect: function (t) {
      "single" !== this.get("selectedMode") && (this.option.selected[t] = !1);
    },
    toggleSelected: function (t) {
      var e = this.option.selected;
      e.hasOwnProperty(t) || (e[t] = !0), this[e[t] ? "unSelect" : "select"](t);
    },
    allSelect: function () {
      var t = this._data,
          e = this.option.selected;
      d(t, function (t) {
        e[t.get("name", !0)] = !0;
      });
    },
    inverseSelect: function () {
      var t = this._data,
          e = this.option.selected;
      d(t, function (t) {
        var n = t.get("name", !0);
        e.hasOwnProperty(n) || (e[n] = !0), e[n] = !e[n];
      });
    },
    isSelected: function (t) {
      var e = this.option.selected;
      return !(e.hasOwnProperty(t) && !e[t]) && l(this._availableNames, t) >= 0;
    },
    getOrient: function () {
      return "vertical" === this.get("orient") ? {
        index: 1,
        name: "vertical"
      } : {
        index: 0,
        name: "horizontal"
      };
    },
    defaultOption: {
      zlevel: 0,
      z: 4,
      show: !0,
      orient: "horizontal",
      left: "center",
      top: 0,
      align: "auto",
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "#ccc",
      borderRadius: 0,
      borderWidth: 0,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14,
      inactiveColor: "#ccc",
      inactiveBorderColor: "#ccc",
      itemStyle: {
        borderWidth: 0
      },
      textStyle: {
        color: "#333"
      },
      selectedMode: !0,
      selector: !1,
      selectorLabel: {
        show: !0,
        borderRadius: 10,
        padding: [3, 5, 3, 5],
        fontSize: 12,
        fontFamily: " sans-serif",
        color: "#666",
        borderWidth: 1,
        borderColor: "#666"
      },
      emphasis: {
        selectorLabel: {
          show: !0,
          color: "#eee",
          backgroundColor: "#666"
        }
      },
      selectorPosition: "auto",
      selectorItemGap: 7,
      selectorButtonGap: 10,
      tooltip: {
        show: !1
      }
    }
  });
  ml("legendToggleSelect", "legendselectchanged", m(lh, "toggleSelected")), ml("legendAllSelect", "legendselectall", m(lh, "allSelect")), ml("legendInverseSelect", "legendinverseselect", m(lh, "inverseSelect")), ml("legendSelect", "legendselected", m(lh, "select")), ml("legendUnSelect", "legendunselected", m(lh, "unSelect"));
  var cm = Hr({
    type: "triangle",
    shape: {
      cx: 0,
      cy: 0,
      width: 0,
      height: 0
    },
    buildPath: function (t, e) {
      var n = e.cx,
          i = e.cy,
          r = e.width / 2,
          a = e.height / 2;
      t.moveTo(n, i - a), t.lineTo(n + r, i + a), t.lineTo(n - r, i + a), t.closePath();
    }
  }),
      dm = Hr({
    type: "diamond",
    shape: {
      cx: 0,
      cy: 0,
      width: 0,
      height: 0
    },
    buildPath: function (t, e) {
      var n = e.cx,
          i = e.cy,
          r = e.width / 2,
          a = e.height / 2;
      t.moveTo(n, i - a), t.lineTo(n + r, i), t.lineTo(n, i + a), t.lineTo(n - r, i), t.closePath();
    }
  }),
      fm = Hr({
    type: "pin",
    shape: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    buildPath: function (t, e) {
      var n = e.x,
          i = e.y,
          r = e.width / 5 * 3,
          a = Math.max(r, e.height),
          o = r / 2,
          s = o * o / (a - o),
          l = i - a + o + s,
          h = Math.asin(s / o),
          u = Math.cos(h) * o,
          c = Math.sin(h),
          d = Math.cos(h),
          f = .6 * o,
          p = .7 * o;
      t.moveTo(n - u, l + s), t.arc(n, l, o, Math.PI - h, 2 * Math.PI + h), t.bezierCurveTo(n + u - c * f, l + s + d * f, n, i - p, n, i), t.bezierCurveTo(n, i - p, n - u + c * f, l + s + d * f, n - u, l + s), t.closePath();
    }
  }),
      pm = Hr({
    type: "arrow",
    shape: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    buildPath: function (t, e) {
      var n = e.height,
          i = e.width,
          r = e.x,
          a = e.y,
          o = i / 3 * 2;
      t.moveTo(r, a), t.lineTo(r + o, a + n), t.lineTo(r, a + n / 4 * 3), t.lineTo(r - o, a + n), t.lineTo(r, a), t.closePath();
    }
  }),
      gm = {
    line: Gf,
    rect: Vf,
    roundRect: Vf,
    square: Vf,
    circle: Af,
    diamond: dm,
    pin: fm,
    arrow: pm,
    triangle: cm
  },
      vm = {
    line: function (t, e, n, i, r) {
      r.x1 = t, r.y1 = e + i / 2, r.x2 = t + n, r.y2 = e + i / 2;
    },
    rect: function (t, e, n, i, r) {
      r.x = t, r.y = e, r.width = n, r.height = i;
    },
    roundRect: function (t, e, n, i, r) {
      r.x = t, r.y = e, r.width = n, r.height = i, r.r = Math.min(n, i) / 4;
    },
    square: function (t, e, n, i, r) {
      var a = Math.min(n, i);
      r.x = t, r.y = e, r.width = a, r.height = a;
    },
    circle: function (t, e, n, i, r) {
      r.cx = t + n / 2, r.cy = e + i / 2, r.r = Math.min(n, i) / 2;
    },
    diamond: function (t, e, n, i, r) {
      r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i;
    },
    pin: function (t, e, n, i, r) {
      r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i;
    },
    arrow: function (t, e, n, i, r) {
      r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i;
    },
    triangle: function (t, e, n, i, r) {
      r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i;
    }
  },
      mm = {};
  d(gm, function (t, e) {
    mm[e] = new t();
  });

  var _m = Hr({
    type: "symbol",
    shape: {
      symbolType: "",
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    calculateTextPosition: function (t, e, n) {
      var i = kn(t, e, n),
          r = this.shape;
      return r && "pin" === r.symbolType && "inside" === e.textPosition && (i.y = n.y + .4 * n.height), i;
    },
    buildPath: function (t, e, n) {
      var i = e.symbolType;

      if ("none" !== i) {
        var r = mm[i];
        r || (i = "rect", r = mm[i]), vm[i](e.x, e.y, e.width, e.height, r.shape), r.buildPath(t, r.shape, n);
      }
    }
  }),
      ym = m,
      xm = d,
      wm = vc,
      bm = Tl({
    type: "legend.plain",
    newlineDisabled: !1,
    init: function () {
      this.group.add(this._contentGroup = new wm()), this._backgroundEl, this.group.add(this._selectorGroup = new wm()), this._isFirstRender = !0;
    },
    getContentGroup: function () {
      return this._contentGroup;
    },
    getSelectorGroup: function () {
      return this._selectorGroup;
    },
    render: function (t, e, n) {
      var i = this._isFirstRender;

      if (this._isFirstRender = !1, this.resetInner(), t.get("show", !0)) {
        var r = t.get("align"),
            a = t.get("orient");
        r && "auto" !== r || (r = "right" === t.get("left") && "vertical" === a ? "right" : "left");
        var s = t.get("selector", !0),
            l = t.get("selectorPosition", !0);
        !s || l && "auto" !== l || (l = "horizontal" === a ? "end" : "start"), this.renderInner(r, t, e, n, s, a, l);
        var h = t.getBoxLayoutParams(),
            u = {
          width: n.getWidth(),
          height: n.getHeight()
        },
            c = t.get("padding"),
            d = Ya(h, u, c),
            f = this.layoutInner(t, r, d, i, s, l),
            p = Ya(o({
          width: f.width,
          height: f.height
        }, h), u, c);
        this.group.attr("position", [p.x - f.x, p.y - f.y]), this.group.add(this._backgroundEl = ch(f, t));
      }
    },
    resetInner: function () {
      this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll();
    },
    renderInner: function (t, e, n, i, r, a, o) {
      var s = this.getContentGroup(),
          l = E(),
          h = e.get("selectedMode"),
          u = [];
      n.eachRawSeries(function (t) {
        !t.get("legendHoverLink") && u.push(t.id);
      }), xm(e.getData(), function (r, a) {
        var o = r.get("name");
        if (!this.newlineDisabled && ("" === o || "\n" === o)) return void s.add(new wm({
          newline: !0
        }));
        var c = n.getSeriesByName(o)[0];
        if (!l.get(o)) if (c) {
          var d = c.getData(),
              f = d.getVisual("color"),
              p = d.getVisual("borderColor");
          "function" == typeof f && (f = f(c.getDataParams(0))), "function" == typeof p && (p = p(c.getDataParams(0)));

          var g = d.getVisual("legendSymbol") || "roundRect",
              v = d.getVisual("symbol"),
              m = this._createItem(o, a, r, e, g, v, t, f, p, h);

          m.on("click", ym(fh, o, null, i, u)).on("mouseover", ym(ph, c.name, null, i, u)).on("mouseout", ym(gh, c.name, null, i, u)), l.set(o, !0);
        } else n.eachRawSeries(function (n) {
          if (!l.get(o) && n.legendVisualProvider) {
            var s = n.legendVisualProvider;
            if (!s.containName(o)) return;

            var c = s.indexOfName(o),
                d = s.getItemVisual(c, "color"),
                f = s.getItemVisual(c, "borderColor"),
                p = "roundRect",
                g = this._createItem(o, a, r, e, p, null, t, d, f, h);

            g.on("click", ym(fh, null, o, i, u)).on("mouseover", ym(ph, null, o, i, u)).on("mouseout", ym(gh, null, o, i, u)), l.set(o, !0);
          }
        }, this);
      }, this), r && this._createSelector(r, e, i, a, o);
    },
    _createSelector: function (t, e, n) {
      function i(t) {
        var i = t.type,
            a = new Df({
          style: {
            x: 0,
            y: 0,
            align: "center",
            verticalAlign: "middle"
          },
          onclick: function () {
            n.dispatchAction({
              type: "all" === i ? "legendAllSelect" : "legendInverseSelect"
            });
          }
        });
        r.add(a);
        var o = e.getModel("selectorLabel"),
            s = e.getModel("emphasis.selectorLabel");
        ua(a.style, a.hoverStyle = {}, o, s, {
          defaultText: t.title,
          isRectText: !1
        }), oa(a);
      }

      var r = this.getSelectorGroup();
      xm(t, function (t) {
        i(t);
      });
    },
    _createItem: function (t, e, n, i, r, o, s, l, h, u) {
      var c = i.get("itemWidth"),
          d = i.get("itemHeight"),
          f = i.get("inactiveColor"),
          p = i.get("inactiveBorderColor"),
          g = i.get("symbolKeepAspect"),
          v = i.getModel("itemStyle"),
          m = i.isSelected(t),
          _ = new wm(),
          y = n.getModel("textStyle"),
          x = n.get("icon"),
          w = n.getModel("tooltip"),
          b = w.parentModel;

      r = x || r;
      var S = uh(r, 0, 0, c, d, m ? l : f, null == g ? !0 : g);

      if (_.add(dh(S, r, v, h, p, m)), !x && o && (o !== r || "none" === o)) {
        var M = .8 * d;
        "none" === o && (o = "circle");
        var T = uh(o, (c - M) / 2, (d - M) / 2, M, M, m ? l : f, null == g ? !0 : g);

        _.add(dh(T, o, v, h, p, m));
      }

      var I = "left" === s ? c + 5 : -5,
          C = s,
          k = i.get("formatter"),
          D = t;
      "string" == typeof k && k ? D = k.replace("{name}", null != t ? t : "") : "function" == typeof k && (D = k(t)), _.add(new Df({
        style: ca({}, y, {
          text: D,
          x: I,
          y: d / 2,
          textFill: m ? y.getTextColor() : f,
          textAlign: C,
          textVerticalAlign: "middle"
        })
      }));
      var A = new Vf({
        shape: _.getBoundingRect(),
        invisible: !0,
        tooltip: w.get("show") ? a({
          content: t,
          formatter: b.get("formatter", !0) || function () {
            return t;
          },
          formatterParams: {
            componentType: "legend",
            legendIndex: i.componentIndex,
            name: t,
            $vars: ["name"]
          }
        }, w.option) : null
      });
      return _.add(A), _.eachChild(function (t) {
        t.silent = !0;
      }), A.silent = !u, this.getContentGroup().add(_), oa(_), _.__legendDataIndex = e, _;
    },
    layoutInner: function (t, e, n, i, r, a) {
      var o = this.getContentGroup(),
          s = this.getSelectorGroup();
      bp(t.get("orient"), o, t.get("itemGap"), n.width, n.height);
      var l = o.getBoundingRect(),
          h = [-l.x, -l.y];

      if (r) {
        bp("horizontal", s, t.get("selectorItemGap", !0));
        var u = s.getBoundingRect(),
            c = [-u.x, -u.y],
            d = t.get("selectorButtonGap", !0),
            f = t.getOrient().index,
            p = 0 === f ? "width" : "height",
            g = 0 === f ? "height" : "width",
            v = 0 === f ? "y" : "x";
        "end" === a ? c[f] += l[p] + d : h[f] += u[p] + d, c[1 - f] += l[g] / 2 - u[g] / 2, s.attr("position", c), o.attr("position", h);
        var m = {
          x: 0,
          y: 0
        };
        return m[p] = l[p] + d + u[p], m[g] = Math.max(l[g], u[g]), m[v] = Math.min(0, u[v] + c[1 - f]), m;
      }

      return o.attr("position", h), this.group.getBoundingRect();
    },
    remove: function () {
      this.getContentGroup().removeAll(), this._isFirstRender = !0;
    }
  }),
      Sm = function (t) {
    var e = t.findComponents({
      mainType: "legend"
    });
    e && e.length && t.filterSeries(function (t) {
      for (var n = 0; n < e.length; n++) if (!e[n].isSelected(t.name)) return !1;

      return !0;
    });
  };

  gl(fv.PROCESSOR.SERIES_FILTER, Sm), Tp.registerSubTypeDefaulter("legend", function () {
    return "plain";
  });
  var Mm = um.extend({
    type: "legend.scroll",
    setScrollDataIndex: function (t) {
      this.option.scrollDataIndex = t;
    },
    defaultOption: {
      scrollDataIndex: 0,
      pageButtonItemGap: 5,
      pageButtonGap: null,
      pageButtonPosition: "end",
      pageFormatter: "{current}/{total}",
      pageIcons: {
        horizontal: ["M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z"],
        vertical: ["M0,0L20,0L10,-20z", "M0,0L20,0L10,20z"]
      },
      pageIconColor: "#2f4554",
      pageIconInactiveColor: "#aaa",
      pageIconSize: 15,
      pageTextStyle: {
        color: "#333"
      },
      animationDurationUpdate: 800
    },
    init: function (t, e, n, i) {
      var r = Za(t);
      Mm.superCall(this, "init", t, e, n, i), vh(this, t, r);
    },
    mergeOption: function (t, e) {
      Mm.superCall(this, "mergeOption", t, e), vh(this, this.option, t);
    }
  }),
      Tm = vc,
      Im = ["width", "height"],
      Cm = ["x", "y"],
      km = bm.extend({
    type: "legend.scroll",
    newlineDisabled: !0,
    init: function () {
      km.superCall(this, "init"), this._currentIndex = 0, this.group.add(this._containerGroup = new Tm()), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new Tm()), this._showController;
    },
    resetInner: function () {
      km.superCall(this, "resetInner"), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null;
    },
    renderInner: function (t, e, n, i, r, a, o) {
      function s(t, n) {
        var r = t + "DataIndex",
            a = ba(e.get("pageIcons", !0)[e.getOrient().name][n], {
          onclick: v(l._pageGo, l, r, e, i)
        }, {
          x: -u[0] / 2,
          y: -u[1] / 2,
          width: u[0],
          height: u[1]
        });
        a.name = t, h.add(a);
      }

      var l = this;
      km.superCall(this, "renderInner", t, e, n, i, r, a, o);
      var h = this._controllerGroup,
          u = e.get("pageIconSize", !0);
      _(u) || (u = [u, u]), s("pagePrev", 0);
      var c = e.getModel("pageTextStyle");
      h.add(new Df({
        name: "pageText",
        style: {
          textFill: c.getTextColor(),
          font: c.getFont(),
          textVerticalAlign: "middle",
          textAlign: "center"
        },
        silent: !0
      })), s("pageNext", 1);
    },
    layoutInner: function (t, e, n, r, a, o) {
      var s = this.getSelectorGroup(),
          l = t.getOrient().index,
          h = Im[l],
          u = Cm[l],
          c = Im[1 - l],
          d = Cm[1 - l];
      a && bp("horizontal", s, t.get("selectorItemGap", !0));
      var f = t.get("selectorButtonGap", !0),
          p = s.getBoundingRect(),
          g = [-p.x, -p.y],
          v = i(n);
      a && (v[h] = n[h] - p[h] - f);

      var m = this._layoutContentAndController(t, r, v, l, h, c, d);

      if (a) {
        if ("end" === o) g[l] += m[h] + f;else {
          var _ = p[h] + f;

          g[l] -= _, m[u] -= _;
        }
        m[h] += p[h] + f, g[1 - l] += m[d] + m[c] / 2 - p[c] / 2, m[c] = Math.max(m[c], p[c]), m[d] = Math.min(m[d], p[d] + g[1 - l]), s.attr("position", g);
      }

      return m;
    },
    _layoutContentAndController: function (t, e, n, i, r, a, o) {
      var s = this.getContentGroup(),
          l = this._containerGroup,
          h = this._controllerGroup;
      bp(t.get("orient"), s, t.get("itemGap"), i ? n.width : null, i ? null : n.height), bp("horizontal", h, t.get("pageButtonItemGap", !0));
      var u = s.getBoundingRect(),
          c = h.getBoundingRect(),
          d = this._showController = u[r] > n[r],
          f = [-u.x, -u.y];
      e || (f[i] = s.position[i]);
      var p = [0, 0],
          g = [-c.x, -c.y],
          v = T(t.get("pageButtonGap", !0), t.get("itemGap", !0));

      if (d) {
        var m = t.get("pageButtonPosition", !0);
        "end" === m ? g[i] += n[r] - c[r] : p[i] += c[r] + v;
      }

      g[1 - i] += u[a] / 2 - c[a] / 2, s.attr("position", f), l.attr("position", p), h.attr("position", g);
      var _ = {
        x: 0,
        y: 0
      };

      if (_[r] = d ? n[r] : u[r], _[a] = Math.max(u[a], c[a]), _[o] = Math.min(0, c[o] + g[1 - i]), l.__rectSize = n[r], d) {
        var y = {
          x: 0,
          y: 0
        };
        y[r] = Math.max(n[r] - c[r] - v, 0), y[a] = _[a], l.setClipPath(new Vf({
          shape: y
        })), l.__rectSize = y[r];
      } else h.eachChild(function (t) {
        t.attr({
          invisible: !0,
          silent: !0
        });
      });

      var x = this._getPageInfo(t);

      return null != x.pageIndex && xa(s, {
        position: x.contentPosition
      }, d ? t : !1), this._updatePageInfoView(t, x), _;
    },
    _pageGo: function (t, e, n) {
      var i = this._getPageInfo(e)[t];

      null != i && n.dispatchAction({
        type: "legendScroll",
        scrollDataIndex: i,
        legendId: e.id
      });
    },
    _updatePageInfoView: function (t, e) {
      var n = this._controllerGroup;
      d(["pagePrev", "pageNext"], function (i) {
        var r = null != e[i + "DataIndex"],
            a = n.childOfName(i);
        a && (a.setStyle("fill", r ? t.get("pageIconColor", !0) : t.get("pageIconInactiveColor", !0)), a.cursor = r ? "pointer" : "default");
      });
      var i = n.childOfName("pageText"),
          r = t.get("pageFormatter"),
          a = e.pageIndex,
          o = null != a ? a + 1 : 0,
          s = e.pageCount;
      i && r && i.setStyle("text", x(r) ? r.replace("{current}", o).replace("{total}", s) : r({
        current: o,
        total: s
      }));
    },
    _getPageInfo: function (t) {
      function e(t) {
        if (t) {
          var e = t.getBoundingRect(),
              n = e[l] + t.position[o];
          return {
            s: n,
            e: n + e[s],
            i: t.__legendDataIndex
          };
        }
      }

      function n(t, e) {
        return t.e >= e && t.s <= e + a;
      }

      var i = t.get("scrollDataIndex", !0),
          r = this.getContentGroup(),
          a = this._containerGroup.__rectSize,
          o = t.getOrient().index,
          s = Im[o],
          l = Cm[o],
          h = this._findTargetItemIndex(i),
          u = r.children(),
          c = u[h],
          d = u.length,
          f = d ? 1 : 0,
          p = {
        contentPosition: r.position.slice(),
        pageCount: f,
        pageIndex: f - 1,
        pagePrevDataIndex: null,
        pageNextDataIndex: null
      };

      if (!c) return p;
      var g = e(c);
      p.contentPosition[o] = -g.s;

      for (var v = h + 1, m = g, _ = g, y = null; d >= v; ++v) y = e(u[v]), (!y && _.e > m.s + a || y && !n(y, m.s)) && (m = _.i > m.i ? _ : y, m && (null == p.pageNextDataIndex && (p.pageNextDataIndex = m.i), ++p.pageCount)), _ = y;

      for (var v = h - 1, m = g, _ = g, y = null; v >= -1; --v) y = e(u[v]), y && n(_, y.s) || !(m.i < _.i) || (_ = m, null == p.pagePrevDataIndex && (p.pagePrevDataIndex = m.i), ++p.pageCount, ++p.pageIndex), m = y;

      return p;
    },
    _findTargetItemIndex: function (t) {
      if (!this._showController) return 0;
      var e,
          n,
          i = this.getContentGroup();
      return i.eachChild(function (i, r) {
        var a = i.__legendDataIndex;
        null == n && null != a && (n = r), a === t && (e = r);
      }), null != e ? e : n;
    }
  });
  ml("legendScroll", "legendscroll", function (t, e) {
    var n = t.scrollDataIndex;
    null != n && e.eachComponent({
      mainType: "legend",
      subType: "scroll",
      query: t
    }, function (t) {
      t.setScrollDataIndex(n);
    });
  });
  var Dm = {
    path: null,
    compoundPath: null,
    group: vc,
    image: ai,
    text: Df
  };
  pl(function (t) {
    var e = t.graphic;
    _(e) ? t.graphic = e[0] && e[0].elements ? [t.graphic[0]] : [{
      elements: e
    }] : e && !e.elements && (t.graphic = [{
      elements: [e]
    }]);
  });
  var Am = Ml({
    type: "graphic",
    defaultOption: {
      elements: [],
      parentId: null
    },
    _elOptionsToUpdate: null,
    mergeOption: function () {
      var t = this.option.elements;
      this.option.elements = null, Am.superApply(this, "mergeOption", arguments), this.option.elements = t;
    },
    optionUpdated: function (t, e) {
      var n = this.option,
          i = (e ? n : t).elements,
          r = n.elements = e ? [] : n.elements,
          a = [];

      this._flatten(i, a);

      var o = Oi(r, a);
      Li(o);
      var s = this._elOptionsToUpdate = [];
      d(o, function (t, e) {
        var n = t.option;
        n && (s.push(n), wh(t, n), bh(r, e, n), Sh(r[e], n));
      }, this);

      for (var l = r.length - 1; l >= 0; l--) null == r[l] ? r.splice(l, 1) : delete r[l].$action;
    },
    _flatten: function (t, e, n) {
      d(t, function (t) {
        if (t) {
          n && (t.parentOption = n), e.push(t);
          var i = t.children;
          "group" === t.type && i && this._flatten(i, e, t), delete t.children;
        }
      }, this);
    },
    useElOptionsToUpdate: function () {
      var t = this._elOptionsToUpdate;
      return this._elOptionsToUpdate = null, t;
    }
  });
  Tl({
    type: "graphic",
    init: function () {
      this._elMap = E(), this._lastGraphicModel;
    },
    render: function (t, e, n) {
      t !== this._lastGraphicModel && this._clear(), this._lastGraphicModel = t, this._updateElements(t), this._relocate(t, n);
    },
    _updateElements: function (t) {
      var e = t.useElOptionsToUpdate();

      if (e) {
        var n = this._elMap,
            i = this.group;
        d(e, function (e) {
          var r = e.$action,
              a = e.id,
              o = n.get(a),
              s = e.parentId,
              l = null != s ? n.get(s) : i,
              h = e.style;
          "text" === e.type && h && (e.hv && e.hv[1] && (h.textVerticalAlign = h.textBaseline = null), !h.hasOwnProperty("textFill") && h.fill && (h.textFill = h.fill), !h.hasOwnProperty("textStroke") && h.stroke && (h.textStroke = h.stroke));
          var u = yh(e);
          r && "merge" !== r ? "replace" === r ? (_h(o, n), mh(a, l, u, n)) : "remove" === r && _h(o, n) : o ? o.attr(u) : mh(a, l, u, n);
          var c = n.get(a);
          c && (c.__ecGraphicWidthOption = e.width, c.__ecGraphicHeightOption = e.height, Mh(c, t, e));
        });
      }
    },
    _relocate: function (t, e) {
      for (var n = t.option.elements, i = this.group, r = this._elMap, a = e.getWidth(), o = e.getHeight(), s = 0; s < n.length; s++) {
        var l = n[s],
            h = r.get(l.id);

        if (h && h.isGroup) {
          var u = h.parent,
              c = u === i;
          h.__ecGraphicWidth = Pa(h.__ecGraphicWidthOption, c ? a : u.__ecGraphicWidth) || 0, h.__ecGraphicHeight = Pa(h.__ecGraphicHeightOption, c ? o : u.__ecGraphicHeight) || 0;
        }
      }

      for (var s = n.length - 1; s >= 0; s--) {
        var l = n[s],
            h = r.get(l.id);

        if (h) {
          var u = h.parent,
              d = u === i ? {
            width: a,
            height: o
          } : {
            width: u.__ecGraphicWidth,
            height: u.__ecGraphicHeight
          };
          qa(h, l, d, null, {
            hv: l.hv,
            boundingMode: l.bounding
          });
        }
      }
    },
    _clear: function () {
      var t = this._elMap;
      t.each(function (e) {
        _h(e, t);
      }), this._elMap = E();
    },
    dispose: function () {
      this._clear();
    }
  });
  var Pm = "http://www.w3.org/2000/svg",
      Om = rf.CMD,
      Lm = Array.prototype.join,
      Em = "none",
      Bm = Math.round,
      Rm = Math.sin,
      zm = Math.cos,
      Nm = Math.PI,
      Fm = 2 * Math.PI,
      Hm = 180 / Nm,
      Vm = 1e-4,
      Wm = {};

  Wm.brush = function (t) {
    var e = t.style,
        n = t.__svgEl;
    n || (n = Th("path"), t.__svgEl = n), t.path || t.createPathProxy();
    var i = t.path;

    if (t.__dirtyPath) {
      i.beginPath(), i.subPixelOptimize = !1, t.buildPath(i, t.shape), t.__dirtyPath = !1;
      var r = Eh(i);
      r.indexOf("NaN") < 0 && Ph(n, "d", r);
    }

    Lh(n, e, !1, t), Ah(n, t.transform), null != e.text ? Zm(t, t.getBoundingRect()) : Nh(t);
  };

  var Gm = {};

  Gm.brush = function (t) {
    var e = t.style,
        n = e.image;

    if (n instanceof HTMLImageElement) {
      var i = n.src;
      n = i;
    }

    if (n) {
      var r = e.x || 0,
          a = e.y || 0,
          o = e.width,
          s = e.height,
          l = t.__svgEl;
      l || (l = Th("image"), t.__svgEl = l), n !== t.__imageSrc && (Oh(l, "href", n), t.__imageSrc = n), Ph(l, "width", o), Ph(l, "height", s), Ph(l, "x", r), Ph(l, "y", a), Ah(l, t.transform), null != e.text ? Zm(t, t.getBoundingRect()) : Nh(t);
    }
  };

  var Um = {},
      Xm = new rn(),
      Ym = {},
      qm = [],
      jm = {
    left: "start",
    right: "end",
    center: "middle",
    middle: "middle"
  },
      Zm = function (t, e) {
    var n = t.style,
        i = t.transform,
        r = t instanceof Df || n.transformText;
    t.__dirty && Hn(n, !0);
    var a = n.text;

    if (null != a && (a += ""), ii(a, n)) {
      null == a && (a = ""), !r && i && (Xm.copy(e), Xm.applyTransform(i), e = Xm);
      var o = t.__textSvgEl;
      o || (o = Th("text"), t.__textSvgEl = o);
      var s = o.style,
          l = n.font || zc,
          h = o.__computedFont;
      l !== o.__styleFont && (s.font = o.__styleFont = l, h = o.__computedFont = s.font);
      var u = n.textPadding,
          c = n.textLineHeight,
          d = t.__textCotentBlock;
      (!d || t.__dirtyText) && (d = t.__textCotentBlock = Bn(a, h, u, c, n.truncate));
      var f = d.outerHeight,
          p = d.lineHeight;
      Qn(Ym, t, n, e);
      var g = Ym.baseX,
          v = Ym.baseY,
          m = Ym.textAlign || "left",
          _ = Ym.textVerticalAlign;
      Bh(o, r, i, n, e, g, v);
      var y = Cn(v, f, _),
          x = g,
          w = y;
      u && (x = Rh(g, m, u), w += u[0]), w += p / 2, Lh(o, n, !0, t);
      var b = d.canCacheByTextString,
          S = t.__tspanList || (t.__tspanList = []),
          M = S.length;

      if (b && t.__canCacheByTextString && t.__text === a) {
        if (t.__dirtyText && M) for (var T = 0; M > T; ++T) zh(S[T], m, x, w + T * p);
      } else {
        t.__text = a, t.__canCacheByTextString = b;

        for (var I = d.lines, C = I.length, T = 0; C > T; T++) {
          var k = S[T],
              D = I[T];
          k ? k.__zrText !== D && (k.innerHTML = "", k.appendChild(document.createTextNode(D))) : (k = S[T] = Th("tspan"), o.appendChild(k), k.appendChild(document.createTextNode(D))), zh(k, m, x, w + T * p);
        }

        if (M > C) {
          for (; M > T; T++) o.removeChild(S[T]);

          S.length = C;
        }
      }
    }
  };

  Um.drawRectText = Zm, Um.brush = function (t) {
    var e = t.style;
    null != e.text ? Zm(t, !1) : Nh(t);
  }, Fh.prototype = {
    diff: function (t, e, n) {
      function i() {
        for (var n = -1 * s; s >= n; n += 2) {
          var i,
              l = h[n - 1],
              u = h[n + 1],
              c = (u ? u.newPos : 0) - n;
          l && (h[n - 1] = void 0);
          var d = l && l.newPos + 1 < a,
              f = u && c >= 0 && o > c;

          if (d || f) {
            if (!d || f && l.newPos < u.newPos ? (i = Vh(u), r.pushComponent(i.components, void 0, !0)) : (i = l, i.newPos++, r.pushComponent(i.components, !0, void 0)), c = r.extractCommon(i, e, t, n), i.newPos + 1 >= a && c + 1 >= o) return Hh(r, i.components, e, t);
            h[n] = i;
          } else h[n] = void 0;
        }

        s++;
      }

      n || (n = function (t, e) {
        return t === e;
      }), this.equals = n;
      var r = this;
      t = t.slice(), e = e.slice();
      var a = e.length,
          o = t.length,
          s = 1,
          l = a + o,
          h = [{
        newPos: -1,
        components: []
      }],
          u = this.extractCommon(h[0], e, t, 0);

      if (h[0].newPos + 1 >= a && u + 1 >= o) {
        for (var c = [], d = 0; d < e.length; d++) c.push(d);

        return [{
          indices: c,
          count: e.length
        }];
      }

      for (; l >= s;) {
        var f = i();
        if (f) return f;
      }
    },
    pushComponent: function (t, e, n) {
      var i = t[t.length - 1];
      i && i.added === e && i.removed === n ? t[t.length - 1] = {
        count: i.count + 1,
        added: e,
        removed: n
      } : t.push({
        count: 1,
        added: e,
        removed: n
      });
    },
    extractCommon: function (t, e, n, i) {
      for (var r = e.length, a = n.length, o = t.newPos, s = o - i, l = 0; r > o + 1 && a > s + 1 && this.equals(e[o + 1], n[s + 1]);) o++, s++, l++;

      return l && t.components.push({
        count: l
      }), t.newPos = o, s;
    },
    tokenize: function (t) {
      return t.slice();
    },
    join: function (t) {
      return t.slice();
    }
  };

  var $m = new Fh(),
      Qm = function (t, e, n) {
    return $m.diff(t, e, n);
  },
      Km = "0",
      Jm = "1";

  Wh.prototype.createElement = Th, Wh.prototype.getDefs = function (t) {
    var e = this._svgRoot,
        n = this._svgRoot.getElementsByTagName("defs");

    return 0 === n.length ? t ? (n = e.insertBefore(this.createElement("defs"), e.firstChild), n.contains || (n.contains = function (t) {
      var e = n.children;
      if (!e) return !1;

      for (var i = e.length - 1; i >= 0; --i) if (e[i] === t) return !0;

      return !1;
    }), n) : null : n[0];
  }, Wh.prototype.update = function (t, e) {
    if (t) {
      var n = this.getDefs(!1);
      if (t[this._domName] && n.contains(t[this._domName])) "function" == typeof e && e(t);else {
        var i = this.add(t);
        i && (t[this._domName] = i);
      }
    }
  }, Wh.prototype.addDom = function (t) {
    var e = this.getDefs(!0);
    e.appendChild(t);
  }, Wh.prototype.removeDom = function (t) {
    var e = this.getDefs(!1);
    e && t[this._domName] && (e.removeChild(t[this._domName]), t[this._domName] = null);
  }, Wh.prototype.getDoms = function () {
    var t = this.getDefs(!1);
    if (!t) return [];
    var e = [];
    return d(this._tagNames, function (n) {
      var i = t.getElementsByTagName(n);
      e = e.concat([].slice.call(i));
    }), e;
  }, Wh.prototype.markAllUnused = function () {
    var t = this.getDoms(),
        e = this;
    d(t, function (t) {
      t[e._markLabel] = Km;
    });
  }, Wh.prototype.markUsed = function (t) {
    t && (t[this._markLabel] = Jm);
  }, Wh.prototype.removeUnused = function () {
    var t = this.getDefs(!1);

    if (t) {
      var e = this.getDoms(),
          n = this;
      d(e, function (e) {
        e[n._markLabel] !== Jm && t.removeChild(e);
      });
    }
  }, Wh.prototype.getSvgProxy = function (t) {
    return t instanceof kr ? Wm : t instanceof ai ? Gm : t instanceof Df ? Um : Wm;
  }, Wh.prototype.getTextSvgElement = function (t) {
    return t.__textSvgEl;
  }, Wh.prototype.getSvgElement = function (t) {
    return t.__svgEl;
  }, h(Gh, Wh), Gh.prototype.addWithoutUpdate = function (t, e) {
    if (e && e.style) {
      var n = this;
      d(["fill", "stroke"], function (i) {
        if (e.style[i] && ("linear" === e.style[i].type || "radial" === e.style[i].type)) {
          var r,
              a = e.style[i],
              o = n.getDefs(!0);
          a._dom ? (r = a._dom, o.contains(a._dom) || n.addDom(r)) : r = n.add(a), n.markUsed(e);
          var s = r.getAttribute("id");
          t.setAttribute(i, "url(#" + s + ")");
        }
      });
    }
  }, Gh.prototype.add = function (t) {
    var e;
    if ("linear" === t.type) e = this.createElement("linearGradient");else {
      if ("radial" !== t.type) return uc("Illegal gradient type."), null;
      e = this.createElement("radialGradient");
    }
    return t.id = t.id || this.nextId++, e.setAttribute("id", "zr" + this._zrId + "-gradient-" + t.id), this.updateDom(t, e), this.addDom(e), e;
  }, Gh.prototype.update = function (t) {
    var e = this;
    Wh.prototype.update.call(this, t, function () {
      var n = t.type,
          i = t._dom.tagName;
      "linear" === n && "linearGradient" === i || "radial" === n && "radialGradient" === i ? e.updateDom(t, t._dom) : (e.removeDom(t), e.add(t));
    });
  }, Gh.prototype.updateDom = function (t, e) {
    if ("linear" === t.type) e.setAttribute("x1", t.x), e.setAttribute("y1", t.y), e.setAttribute("x2", t.x2), e.setAttribute("y2", t.y2);else {
      if ("radial" !== t.type) return void uc("Illegal gradient type.");
      e.setAttribute("cx", t.x), e.setAttribute("cy", t.y), e.setAttribute("r", t.r);
    }
    t.global ? e.setAttribute("gradientUnits", "userSpaceOnUse") : e.setAttribute("gradientUnits", "objectBoundingBox"), e.innerHTML = "";

    for (var n = t.colorStops, i = 0, r = n.length; r > i; ++i) {
      var a = this.createElement("stop");
      a.setAttribute("offset", 100 * n[i].offset + "%");
      var o = n[i].color;

      if (o.indexOf(!1)) {
        var s = Re(o)[3],
            l = Fe(o);
        a.setAttribute("stop-color", "#" + l), a.setAttribute("stop-opacity", s);
      } else a.setAttribute("stop-color", n[i].color);

      e.appendChild(a);
    }

    t._dom = e;
  }, Gh.prototype.markUsed = function (t) {
    if (t.style) {
      var e = t.style.fill;
      e && e._dom && Wh.prototype.markUsed.call(this, e._dom), e = t.style.stroke, e && e._dom && Wh.prototype.markUsed.call(this, e._dom);
    }
  }, h(Uh, Wh), Uh.prototype.update = function (t) {
    var e = this.getSvgElement(t);
    e && this.updateDom(e, t.__clipPaths, !1);
    var n = this.getTextSvgElement(t);
    n && this.updateDom(n, t.__clipPaths, !0), this.markUsed(t);
  }, Uh.prototype.updateDom = function (t, e, n) {
    if (e && e.length > 0) {
      var i,
          r,
          a = this.getDefs(!0),
          o = e[0],
          s = n ? "_textDom" : "_dom";
      o[s] ? (r = o[s].getAttribute("id"), i = o[s], a.contains(i) || a.appendChild(i)) : (r = "zr" + this._zrId + "-clip-" + this.nextId, ++this.nextId, i = this.createElement("clipPath"), i.setAttribute("id", r), a.appendChild(i), o[s] = i);
      var l = this.getSvgProxy(o);

      if (o.transform && o.parent.invTransform && !n) {
        var h = Array.prototype.slice.call(o.transform);
        we(o.transform, o.parent.invTransform, o.transform), l.brush(o), o.transform = h;
      } else l.brush(o);

      var u = this.getSvgElement(o);
      i.innerHTML = "", i.appendChild(u.cloneNode()), t.setAttribute("clip-path", "url(#" + r + ")"), e.length > 1 && this.updateDom(i, e.slice(1), n);
    } else t && t.setAttribute("clip-path", "none");
  }, Uh.prototype.markUsed = function (t) {
    var e = this;
    t.__clipPaths && d(t.__clipPaths, function (t) {
      t._dom && Wh.prototype.markUsed.call(e, t._dom), t._textDom && Wh.prototype.markUsed.call(e, t._textDom);
    });
  }, h(Xh, Wh), Xh.prototype.addWithoutUpdate = function (t, e) {
    if (e && Yh(e.style)) {
      var n;

      if (e._shadowDom) {
        n = e._shadowDom;
        var i = this.getDefs(!0);
        i.contains(e._shadowDom) || this.addDom(n);
      } else n = this.add(e);

      this.markUsed(e);
      var r = n.getAttribute("id");
      t.style.filter = "url(#" + r + ")";
    }
  }, Xh.prototype.add = function (t) {
    var e = this.createElement("filter");
    return t._shadowDomId = t._shadowDomId || this.nextId++, e.setAttribute("id", "zr" + this._zrId + "-shadow-" + t._shadowDomId), this.updateDom(t, e), this.addDom(e), e;
  }, Xh.prototype.update = function (t, e) {
    var n = e.style;

    if (Yh(n)) {
      var i = this;
      Wh.prototype.update.call(this, e, function () {
        i.updateDom(e, e._shadowDom);
      });
    } else this.remove(t, e);
  }, Xh.prototype.remove = function (t, e) {
    null != e._shadowDomId && (this.removeDom(t), t.style.filter = "");
  }, Xh.prototype.updateDom = function (t, e) {
    var n = e.getElementsByTagName("feDropShadow");
    n = 0 === n.length ? this.createElement("feDropShadow") : n[0];
    var i,
        r,
        a,
        o,
        s = t.style,
        l = t.scale ? t.scale[0] || 1 : 1,
        h = t.scale ? t.scale[1] || 1 : 1;
    if (s.shadowBlur || s.shadowOffsetX || s.shadowOffsetY) i = s.shadowOffsetX || 0, r = s.shadowOffsetY || 0, a = s.shadowBlur, o = s.shadowColor;else {
      if (!s.textShadowBlur) return void this.removeDom(e, s);
      i = s.textShadowOffsetX || 0, r = s.textShadowOffsetY || 0, a = s.textShadowBlur, o = s.textShadowColor;
    }
    n.setAttribute("dx", i / l), n.setAttribute("dy", r / h), n.setAttribute("flood-color", o);
    var u = a / 2 / l,
        c = a / 2 / h,
        d = u + " " + c;
    n.setAttribute("stdDeviation", d), e.setAttribute("x", "-100%"), e.setAttribute("y", "-100%"), e.setAttribute("width", Math.ceil(a / 2 * 200) + "%"), e.setAttribute("height", Math.ceil(a / 2 * 200) + "%"), e.appendChild(n), t._shadowDom = e;
  }, Xh.prototype.markUsed = function (t) {
    t._shadowDom && Wh.prototype.markUsed.call(this, t._shadowDom);
  };

  var t_ = function (t, e, n, i) {
    this.root = t, this.storage = e, this._opts = n = a({}, n || {});
    var r = Th("svg");
    r.setAttribute("xmlns", "http://www.w3.org/2000/svg"), r.setAttribute("version", "1.1"), r.setAttribute("baseProfile", "full"), r.style.cssText = "user-select:none;position:absolute;left:0;top:0;", this.gradientManager = new Gh(i, r), this.clipPathManager = new Uh(i, r), this.shadowManager = new Xh(i, r);
    var o = document.createElement("div");
    o.style.cssText = "overflow:hidden;position:relative", this._svgRoot = r, this._viewport = o, t.appendChild(o), o.appendChild(r), this.resize(n.width, n.height), this._visibleList = [];
  };

  t_.prototype = {
    constructor: t_,
    getType: function () {
      return "svg";
    },
    getViewportRoot: function () {
      return this._viewport;
    },
    getViewportRootOffset: function () {
      var t = this.getViewportRoot();
      return t ? {
        offsetLeft: t.offsetLeft || 0,
        offsetTop: t.offsetTop || 0
      } : void 0;
    },
    refresh: function () {
      var t = this.storage.getDisplayList(!0);

      this._paintList(t);
    },
    setBackgroundColor: function (t) {
      this._viewport.style.background = t;
    },
    _paintList: function (t) {
      this.gradientManager.markAllUnused(), this.clipPathManager.markAllUnused(), this.shadowManager.markAllUnused();
      var e,
          n = this._svgRoot,
          i = this._visibleList,
          r = t.length,
          a = [];

      for (e = 0; r > e; e++) {
        var o = t[e],
            s = jh(o),
            l = tu(o) || Jh(o);
        o.invisible || (o.__dirty && (s && s.brush(o), this.clipPathManager.update(o), o.style && (this.gradientManager.update(o.style.fill), this.gradientManager.update(o.style.stroke), this.shadowManager.update(l, o)), o.__dirty = !1), a.push(o));
      }

      var h,
          u = Qm(i, a);

      for (e = 0; e < u.length; e++) {
        var c = u[e];
        if (c.removed) for (var d = 0; d < c.count; d++) {
          var o = i[c.indices[d]],
              l = tu(o),
              f = Jh(o);
          Kh(n, l), Kh(n, f);
        }
      }

      for (e = 0; e < u.length; e++) {
        var c = u[e];
        if (c.added) for (var d = 0; d < c.count; d++) {
          var o = a[c.indices[d]],
              l = tu(o),
              f = Jh(o);
          h ? $h(n, l, h) : Qh(n, l), l ? $h(n, f, l) : h ? $h(n, f, h) : Qh(n, f), $h(n, f, l), h = f || l || h, this.gradientManager.addWithoutUpdate(l || f, o), this.shadowManager.addWithoutUpdate(l || f, o), this.clipPathManager.markUsed(o);
        } else if (!c.removed) for (var d = 0; d < c.count; d++) {
          var o = a[c.indices[d]],
              l = tu(o),
              f = Jh(o),
              l = tu(o),
              f = Jh(o);
          this.gradientManager.markUsed(o), this.gradientManager.addWithoutUpdate(l || f, o), this.shadowManager.markUsed(o), this.shadowManager.addWithoutUpdate(l || f, o), this.clipPathManager.markUsed(o), f && $h(n, f, l), h = l || f || h;
        }
      }

      this.gradientManager.removeUnused(), this.clipPathManager.removeUnused(), this.shadowManager.removeUnused(), this._visibleList = a;
    },
    _getDefs: function (t) {
      var e = this._svgRoot,
          n = this._svgRoot.getElementsByTagName("defs");

      if (0 === n.length) {
        if (t) {
          var n = e.insertBefore(Th("defs"), e.firstChild);
          return n.contains || (n.contains = function (t) {
            var e = n.children;
            if (!e) return !1;

            for (var i = e.length - 1; i >= 0; --i) if (e[i] === t) return !0;

            return !1;
          }), n;
        }

        return null;
      }

      return n[0];
    },
    resize: function (t, e) {
      var n = this._viewport;
      n.style.display = "none";
      var i = this._opts;

      if (null != t && (i.width = t), null != e && (i.height = e), t = this._getSize(0), e = this._getSize(1), n.style.display = "", this._width !== t || this._height !== e) {
        this._width = t, this._height = e;
        var r = n.style;
        r.width = t + "px", r.height = e + "px";
        var a = this._svgRoot;
        a.setAttribute("width", t), a.setAttribute("height", e);
      }
    },
    getWidth: function () {
      return this._width;
    },
    getHeight: function () {
      return this._height;
    },
    _getSize: function (t) {
      var e = this._opts,
          n = ["width", "height"][t],
          i = ["clientWidth", "clientHeight"][t],
          r = ["paddingLeft", "paddingTop"][t],
          a = ["paddingRight", "paddingBottom"][t];
      if (null != e[n] && "auto" !== e[n]) return parseFloat(e[n]);
      var o = this.root,
          s = document.defaultView.getComputedStyle(o);
      return (o[i] || qh(s[n]) || qh(o.style[n])) - (qh(s[r]) || 0) - (qh(s[a]) || 0) | 0;
    },
    dispose: function () {
      this.root.innerHTML = "", this._svgRoot = this._viewport = this.storage = null;
    },
    clear: function () {
      this._viewport && this.root.removeChild(this._viewport);
    },
    pathToDataUrl: function () {
      this.refresh();
      var t = this._svgRoot.outerHTML;
      return "data:image/svg+xml;charset=UTF-8," + t;
    }
  }, d(["getLayer", "insertLayer", "eachLayer", "eachBuiltinLayer", "eachOtherLayer", "getLayers", "modLayer", "delLayer", "clearLayer", "toDataURL", "pathToImage"], function (t) {
    t_.prototype[t] = eu(t);
  }), Ci("svg", t_);
  var e_ = Oa;
  ou.prototype.parse = function (t) {
    return t;
  }, ou.prototype.getSetting = function (t) {
    return this._setting[t];
  }, ou.prototype.contain = function (t) {
    var e = this._extent;
    return t >= e[0] && t <= e[1];
  }, ou.prototype.normalize = function (t) {
    var e = this._extent;
    return e[1] === e[0] ? .5 : (t - e[0]) / (e[1] - e[0]);
  }, ou.prototype.scale = function (t) {
    var e = this._extent;
    return t * (e[1] - e[0]) + e[0];
  }, ou.prototype.unionExtent = function (t) {
    var e = this._extent;
    t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]);
  }, ou.prototype.unionExtentFromData = function (t, e) {
    this.unionExtent(t.getApproximateExtent(e));
  }, ou.prototype.getExtent = function () {
    return this._extent.slice();
  }, ou.prototype.setExtent = function (t, e) {
    var n = this._extent;
    isNaN(t) || (n[0] = t), isNaN(e) || (n[1] = e);
  }, ou.prototype.isBlank = function () {
    return this._isBlank;
  }, ou.prototype.setBlank = function (t) {
    this._isBlank = t;
  }, ou.prototype.getLabel = null, Xi(ou), Zi(ou, {
    registerWhenExtend: !0
  });
  var n_ = Oa,
      i_ = ou.extend({
    type: "interval",
    _interval: 0,
    _intervalPrecision: 2,
    setExtent: function (t, e) {
      var n = this._extent;
      isNaN(t) || (n[0] = parseFloat(t)), isNaN(e) || (n[1] = parseFloat(e));
    },
    unionExtent: function (t) {
      var e = this._extent;
      t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), i_.prototype.setExtent.call(this, e[0], e[1]);
    },
    getInterval: function () {
      return this._interval;
    },
    setInterval: function (t) {
      this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = iu(t);
    },
    getTicks: function (t) {
      var e = this._interval,
          n = this._extent,
          i = this._niceExtent,
          r = this._intervalPrecision,
          a = [];
      if (!e) return a;
      var o = 1e4;
      n[0] < i[0] && a.push(t ? n_(i[0] - e, r) : n[0]);

      for (var s = i[0]; s <= i[1] && (a.push(s), s = n_(s + e, r), s !== a[a.length - 1]);) if (a.length > o) return [];

      var l = a.length ? a[a.length - 1] : i[1];
      return n[1] > l && a.push(t ? n_(l + e, r) : n[1]), a;
    },
    getMinorTicks: function (t) {
      for (var e = this.getTicks(!0), n = [], i = this.getExtent(), r = 1; r < e.length; r++) {
        for (var a = e[r], o = e[r - 1], s = 0, l = [], h = a - o, u = h / t; t - 1 > s;) {
          var c = Oa(o + (s + 1) * u);
          c > i[0] && c < i[1] && l.push(c), s++;
        }

        n.push(l);
      }

      return n;
    },
    getLabel: function (t, e) {
      if (null == t) return "";
      var n = e && e.precision;
      return null == n ? n = La(t) || 0 : "auto" === n && (n = this._intervalPrecision), t = n_(t, n, !0), Fa(t);
    },
    niceTicks: function (t, e, n) {
      t = t || 5;
      var i = this._extent,
          r = i[1] - i[0];

      if (isFinite(r)) {
        0 > r && (r = -r, i.reverse());
        var a = nu(i, t, e, n);
        this._intervalPrecision = a.intervalPrecision, this._interval = a.interval, this._niceExtent = a.niceTickExtent;
      }
    },
    niceExtent: function (t) {
      var e = this._extent;
      if (e[0] === e[1]) if (0 !== e[0]) {
        var n = e[0];
        t.fixMax ? e[0] -= n / 2 : (e[1] += n / 2, e[0] -= n / 2);
      } else e[1] = 1;
      var i = e[1] - e[0];
      isFinite(i) || (e[0] = 0, e[1] = 1), this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
      var r = this._interval;
      t.fixMin || (e[0] = n_(Math.floor(e[0] / r) * r)), t.fixMax || (e[1] = n_(Math.ceil(e[1] / r) * r));
    }
  });

  i_.create = function () {
    return new i_();
  };

  var r_ = i_.prototype,
      a_ = Math.ceil,
      o_ = Math.floor,
      s_ = 1e3,
      l_ = 60 * s_,
      h_ = 60 * l_,
      u_ = 24 * h_,
      c_ = function (t, e, n, i) {
    for (; i > n;) {
      var r = n + i >>> 1;
      t[r][1] < e ? n = r + 1 : i = r;
    }

    return n;
  },
      d_ = i_.extend({
    type: "time",
    getLabel: function (t) {
      var e = this._stepLvl,
          n = new Date(t);
      return Ua(e[0], n, this.getSetting("useUTC"));
    },
    niceExtent: function (t) {
      var e = this._extent;

      if (e[0] === e[1] && (e[0] -= u_, e[1] += u_), e[1] === -1 / 0 && 1 / 0 === e[0]) {
        var n = new Date();
        e[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), e[0] = e[1] - u_;
      }

      this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
      var i = this._interval;
      t.fixMin || (e[0] = Oa(o_(e[0] / i) * i)), t.fixMax || (e[1] = Oa(a_(e[1] / i) * i));
    },
    niceTicks: function (t, e, n) {
      t = t || 10;
      var i = this._extent,
          r = i[1] - i[0],
          a = r / t;
      null != e && e > a && (a = e), null != n && a > n && (a = n);
      var o = f_.length,
          s = c_(f_, a, 0, o),
          l = f_[Math.min(s, o - 1)],
          h = l[1];

      if ("year" === l[0]) {
        var u = r / h,
            c = Na(u / t, !0);
        h *= c;
      }

      var d = this.getSetting("useUTC") ? 0 : 60 * new Date(+i[0] || +i[1]).getTimezoneOffset() * 1e3,
          f = [Math.round(a_((i[0] - d) / h) * h + d), Math.round(o_((i[1] - d) / h) * h + d)];
      au(f, i), this._stepLvl = l, this._interval = h, this._niceExtent = f;
    },
    parse: function (t) {
      return +Ba(t);
    }
  });

  d(["contain", "normalize"], function (t) {
    d_.prototype[t] = function (e) {
      return r_[t].call(this, this.parse(e));
    };
  });
  var f_ = [["hh:mm:ss", s_], ["hh:mm:ss", 5 * s_], ["hh:mm:ss", 10 * s_], ["hh:mm:ss", 15 * s_], ["hh:mm:ss", 30 * s_], ["hh:mm\nMM-dd", l_], ["hh:mm\nMM-dd", 5 * l_], ["hh:mm\nMM-dd", 10 * l_], ["hh:mm\nMM-dd", 15 * l_], ["hh:mm\nMM-dd", 30 * l_], ["hh:mm\nMM-dd", h_], ["hh:mm\nMM-dd", 2 * h_], ["hh:mm\nMM-dd", 6 * h_], ["hh:mm\nMM-dd", 12 * h_], ["MM-dd\nyyyy", u_], ["MM-dd\nyyyy", 2 * u_], ["MM-dd\nyyyy", 3 * u_], ["MM-dd\nyyyy", 4 * u_], ["MM-dd\nyyyy", 5 * u_], ["MM-dd\nyyyy", 6 * u_], ["week", 7 * u_], ["MM-dd\nyyyy", 10 * u_], ["week", 14 * u_], ["week", 21 * u_], ["month", 31 * u_], ["week", 42 * u_], ["month", 62 * u_], ["week", 70 * u_], ["quarter", 95 * u_], ["month", 31 * u_ * 4], ["month", 31 * u_ * 5], ["half-year", 380 * u_ / 2], ["month", 31 * u_ * 8], ["month", 31 * u_ * 10], ["year", 380 * u_]];

  d_.create = function (t) {
    return new d_({
      useUTC: t.ecModel.get("useUTC")
    });
  };

  var p_ = ou.prototype,
      g_ = i_.prototype,
      v_ = La,
      m_ = Oa,
      __ = Math.floor,
      y_ = Math.ceil,
      x_ = Math.pow,
      w_ = Math.log,
      b_ = ou.extend({
    type: "log",
    base: 10,
    $constructor: function () {
      ou.apply(this, arguments), this._originalScale = new i_();
    },
    getTicks: function (t) {
      var e = this._originalScale,
          n = this._extent,
          i = e.getExtent();
      return f(g_.getTicks.call(this, t), function (t) {
        var r = Oa(x_(this.base, t));
        return r = t === n[0] && e.__fixMin ? su(r, i[0]) : r, r = t === n[1] && e.__fixMax ? su(r, i[1]) : r;
      }, this);
    },
    getMinorTicks: g_.getMinorTicks,
    getLabel: g_.getLabel,
    scale: function (t) {
      return t = p_.scale.call(this, t), x_(this.base, t);
    },
    setExtent: function (t, e) {
      var n = this.base;
      t = w_(t) / w_(n), e = w_(e) / w_(n), g_.setExtent.call(this, t, e);
    },
    getExtent: function () {
      var t = this.base,
          e = p_.getExtent.call(this);
      e[0] = x_(t, e[0]), e[1] = x_(t, e[1]);
      var n = this._originalScale,
          i = n.getExtent();
      return n.__fixMin && (e[0] = su(e[0], i[0])), n.__fixMax && (e[1] = su(e[1], i[1])), e;
    },
    unionExtent: function (t) {
      this._originalScale.unionExtent(t);

      var e = this.base;
      t[0] = w_(t[0]) / w_(e), t[1] = w_(t[1]) / w_(e), p_.unionExtent.call(this, t);
    },
    unionExtentFromData: function (t, e) {
      this.unionExtent(t.getApproximateExtent(e));
    },
    niceTicks: function (t) {
      t = t || 10;
      var e = this._extent,
          n = e[1] - e[0];

      if (!(1 / 0 === n || 0 >= n)) {
        var i = Ra(n),
            r = t / n * i;

        for (.5 >= r && (i *= 10); !isNaN(i) && Math.abs(i) < 1 && Math.abs(i) > 0;) i *= 10;

        var a = [Oa(y_(e[0] / i) * i), Oa(__(e[1] / i) * i)];
        this._interval = i, this._niceExtent = a;
      }
    },
    niceExtent: function (t) {
      g_.niceExtent.call(this, t);
      var e = this._originalScale;
      e.__fixMin = t.fixMin, e.__fixMax = t.fixMax;
    }
  });
  d(["contain", "normalize"], function (t) {
    b_.prototype[t] = function (e) {
      return e = w_(e) / w_(this.base), p_[t].call(this, e);
    };
  }), b_.create = function () {
    return new b_();
  }, t.version = Jg, t.dependencies = tv, t.PRIORITY = fv, t.init = sl, t.connect = ll, t.disConnect = hl, t.disconnect = Lv, t.dispose = ul, t.getInstanceByDom = cl, t.getInstanceById = dl, t.registerTheme = fl, t.registerPreprocessor = pl, t.registerProcessor = gl, t.registerPostUpdate = vl, t.registerAction = ml, t.registerCoordinateSystem = _l, t.getCoordinateSystemDimensions = yl, t.registerLayout = xl, t.registerVisual = wl, t.registerLoading = Sl, t.extendComponentModel = Ml, t.extendComponentView = Tl, t.extendSeriesModel = Il, t.extendChartView = Cl, t.setCanvasCreator = kl, t.registerMap = Dl, t.getMap = Al, t.dataTool = Ev;
});