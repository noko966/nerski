!(function (t, r) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = r())
    : "function" == typeof define && define.amd
    ? define(r)
    : ((t =
        "undefined" != typeof globalThis ? globalThis : t || self).tinycolor =
        r());
})(this, function () {
  "use strict";
  function t(r) {
    return (
      (t =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      t(r)
    );
  }
  var r = /^\s+/,
    e = /\s+$/;
  function n(a, i) {
    if (((i = i || {}), (a = a || "") instanceof n)) return a;
    if (!(this instanceof n)) return new n(a, i);
    var o = (function (n) {
      var a = { r: 0, g: 0, b: 0 },
        i = 1,
        o = null,
        h = null,
        s = null,
        f = !1,
        u = !1;
      "string" == typeof n &&
        (n = (function (t) {
          t = t.replace(r, "").replace(e, "").toLowerCase();
          var n,
            a = !1;
          if (y[t]) (t = y[t]), (a = !0);
          else if ("transparent" == t)
            return { r: 0, g: 0, b: 0, a: 0, format: "name" };
          if ((n = T.rgb.exec(t))) return { r: n[1], g: n[2], b: n[3] };
          if ((n = T.rgba.exec(t)))
            return { r: n[1], g: n[2], b: n[3], a: n[4] };
          if ((n = T.hsl.exec(t))) return { h: n[1], s: n[2], l: n[3] };
          if ((n = T.hsla.exec(t)))
            return { h: n[1], s: n[2], l: n[3], a: n[4] };
          if ((n = T.hsv.exec(t))) return { h: n[1], s: n[2], v: n[3] };
          if ((n = T.hsva.exec(t)))
            return { h: n[1], s: n[2], v: n[3], a: n[4] };
          if ((n = T.hex8.exec(t)))
            return {
              r: w(n[1]),
              g: w(n[2]),
              b: w(n[3]),
              a: F(n[4]),
              format: a ? "name" : "hex8",
            };
          if ((n = T.hex6.exec(t)))
            return {
              r: w(n[1]),
              g: w(n[2]),
              b: w(n[3]),
              format: a ? "name" : "hex",
            };
          if ((n = T.hex4.exec(t)))
            return {
              r: w(n[1] + "" + n[1]),
              g: w(n[2] + "" + n[2]),
              b: w(n[3] + "" + n[3]),
              a: F(n[4] + "" + n[4]),
              format: a ? "name" : "hex8",
            };
          if ((n = T.hex3.exec(t)))
            return {
              r: w(n[1] + "" + n[1]),
              g: w(n[2] + "" + n[2]),
              b: w(n[3] + "" + n[3]),
              format: a ? "name" : "hex",
            };
          return !1;
        })(n));
      "object" == t(n) &&
        (E(n.r) && E(n.g) && E(n.b)
          ? ((l = n.r),
            (c = n.g),
            (d = n.b),
            (a = {
              r: 255 * A(l, 255),
              g: 255 * A(c, 255),
              b: 255 * A(d, 255),
            }),
            (f = !0),
            (u = "%" === String(n.r).substr(-1) ? "prgb" : "rgb"))
          : E(n.h) && E(n.s) && E(n.v)
          ? ((o = H(n.s)),
            (h = H(n.v)),
            (a = (function (t, r, e) {
              (t = 6 * A(t, 360)), (r = A(r, 100)), (e = A(e, 100));
              var n = Math.floor(t),
                a = t - n,
                i = e * (1 - r),
                o = e * (1 - a * r),
                h = e * (1 - (1 - a) * r),
                s = n % 6,
                f = [e, o, i, i, h, e][s],
                u = [h, e, e, o, i, i][s],
                l = [i, i, h, e, e, o][s];
              return { r: 255 * f, g: 255 * u, b: 255 * l };
            })(n.h, o, h)),
            (f = !0),
            (u = "hsv"))
          : E(n.h) &&
            E(n.s) &&
            E(n.l) &&
            ((o = H(n.s)),
            (s = H(n.l)),
            (a = (function (t, r, e) {
              var n, a, i;
              function o(t, r, e) {
                return (
                  e < 0 && (e += 1),
                  e > 1 && (e -= 1),
                  e < 1 / 6
                    ? t + 6 * (r - t) * e
                    : e < 0.5
                    ? r
                    : e < 2 / 3
                    ? t + (r - t) * (2 / 3 - e) * 6
                    : t
                );
              }
              if (((t = A(t, 360)), (r = A(r, 100)), (e = A(e, 100)), 0 === r))
                n = a = i = e;
              else {
                var h = e < 0.5 ? e * (1 + r) : e + r - e * r,
                  s = 2 * e - h;
                (n = o(s, h, t + 1 / 3)),
                  (a = o(s, h, t)),
                  (i = o(s, h, t - 1 / 3));
              }
              return { r: 255 * n, g: 255 * a, b: 255 * i };
            })(n.h, o, s)),
            (f = !0),
            (u = "hsl")),
        n.hasOwnProperty("a") && (i = n.a));
      var l, c, d;
      return (
        (i = x(i)),
        {
          ok: f,
          format: n.format || u,
          r: Math.min(255, Math.max(a.r, 0)),
          g: Math.min(255, Math.max(a.g, 0)),
          b: Math.min(255, Math.max(a.b, 0)),
          a: i,
        }
      );
    })(a);
    (this._originalInput = a),
      (this._r = o.r),
      (this._g = o.g),
      (this._b = o.b),
      (this._a = o.a),
      (this._roundA = Math.round(100 * this._a) / 100),
      (this._format = i.format || o.format),
      (this._gradientType = i.gradientType),
      this._r < 1 && (this._r = Math.round(this._r)),
      this._g < 1 && (this._g = Math.round(this._g)),
      this._b < 1 && (this._b = Math.round(this._b)),
      (this._ok = o.ok);
  }
  function a(t, r, e) {
    (t = A(t, 255)), (r = A(r, 255)), (e = A(e, 255));
    var n,
      a,
      i = Math.max(t, r, e),
      o = Math.min(t, r, e),
      h = (i + o) / 2;
    if (i == o) n = a = 0;
    else {
      var s = i - o;
      switch (((a = h > 0.5 ? s / (2 - i - o) : s / (i + o)), i)) {
        case t:
          n = (r - e) / s + (r < e ? 6 : 0);
          break;
        case r:
          n = (e - t) / s + 2;
          break;
        case e:
          n = (t - r) / s + 4;
      }
      n /= 6;
    }
    return { h: n, s: a, l: h };
  }
  function i(t, r, e) {
    (t = A(t, 255)), (r = A(r, 255)), (e = A(e, 255));
    var n,
      a,
      i = Math.max(t, r, e),
      o = Math.min(t, r, e),
      h = i,
      s = i - o;
    if (((a = 0 === i ? 0 : s / i), i == o)) n = 0;
    else {
      switch (i) {
        case t:
          n = (r - e) / s + (r < e ? 6 : 0);
          break;
        case r:
          n = (e - t) / s + 2;
          break;
        case e:
          n = (t - r) / s + 4;
      }
      n /= 6;
    }
    return { h: n, s: a, v: h };
  }
  function o(t, r, e, n) {
    var a = [
      S(Math.round(t).toString(16)),
      S(Math.round(r).toString(16)),
      S(Math.round(e).toString(16)),
    ];
    return n &&
      a[0].charAt(0) == a[0].charAt(1) &&
      a[1].charAt(0) == a[1].charAt(1) &&
      a[2].charAt(0) == a[2].charAt(1)
      ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0)
      : a.join("");
  }
  function h(t, r, e, n) {
    return [
      S(R(n)),
      S(Math.round(t).toString(16)),
      S(Math.round(r).toString(16)),
      S(Math.round(e).toString(16)),
    ].join("");
  }
  function s(t, r) {
    r = 0 === r ? 0 : r || 10;
    var e = n(t).toHsl();
    return (e.s -= r / 100), (e.s = k(e.s)), n(e);
  }
  function f(t, r) {
    r = 0 === r ? 0 : r || 10;
    var e = n(t).toHsl();
    return (e.s += r / 100), (e.s = k(e.s)), n(e);
  }
  function u(t) {
    return n(t).desaturate(100);
  }
  function l(t, r) {
    r = 0 === r ? 0 : r || 10;
    var e = n(t).toHsl();
    return (e.l += r / 100), (e.l = k(e.l)), n(e);
  }
  function c(t, r) {
    r = 0 === r ? 0 : r || 10;
    var e = n(t).toRgb();
    return (
      (e.r = Math.max(0, Math.min(255, e.r - Math.round((-r / 100) * 255)))),
      (e.g = Math.max(0, Math.min(255, e.g - Math.round((-r / 100) * 255)))),
      (e.b = Math.max(0, Math.min(255, e.b - Math.round((-r / 100) * 255)))),
      n(e)
    );
  }
  function d(t, r) {
    r = 0 === r ? 0 : r || 10;
    var e = n(t).toHsl();
    return (e.l -= r / 100), (e.l = k(e.l)), n(e);
  }
  function g(t, r) {
    var e = n(t).toHsl(),
      a = (e.h + r) % 360;
    return (e.h = a < 0 ? 360 + a : a), n(e);
  }
  function b(t) {
    var r = n(t).toHsl();
    return (r.h = (r.h + 180) % 360), n(r);
  }
  function m(t, r) {
    if (isNaN(r) || r <= 0)
      throw new Error("Argument to polyad must be a positive number");
    for (var e = n(t).toHsl(), a = [n(t)], i = 360 / r, o = 1; o < r; o++)
      a.push(n({ h: (e.h + o * i) % 360, s: e.s, l: e.l }));
    return a;
  }
  function p(t) {
    var r = n(t).toHsl(),
      e = r.h;
    return [
      n(t),
      n({ h: (e + 72) % 360, s: r.s, l: r.l }),
      n({ h: (e + 216) % 360, s: r.s, l: r.l }),
    ];
  }
  function _(t, r, e) {
    (r = r || 6), (e = e || 30);
    var a = n(t).toHsl(),
      i = 360 / e,
      o = [n(t)];
    for (a.h = (a.h - ((i * r) >> 1) + 720) % 360; --r; )
      (a.h = (a.h + i) % 360), o.push(n(a));
    return o;
  }
  function v(t, r) {
    r = r || 6;
    for (
      var e = n(t).toHsv(), a = e.h, i = e.s, o = e.v, h = [], s = 1 / r;
      r--;

    )
      h.push(n({ h: a, s: i, v: o })), (o = (o + s) % 1);
    return h;
  }
  (n.prototype = {
    isDark: function () {
      return this.getBrightness() < 128;
    },
    isLight: function () {
      return !this.isDark();
    },
    isValid: function () {
      return this._ok;
    },
    getOriginalInput: function () {
      return this._originalInput;
    },
    getFormat: function () {
      return this._format;
    },
    getAlpha: function () {
      return this._a;
    },
    getBrightness: function () {
      var t = this.toRgb();
      return (299 * t.r + 587 * t.g + 114 * t.b) / 1e3;
    },
    getLuminance: function () {
      var t,
        r,
        e,
        n = this.toRgb();
      return (
        (t = n.r / 255),
        (r = n.g / 255),
        (e = n.b / 255),
        0.2126 *
          (t <= 0.03928 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4)) +
          0.7152 *
            (r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)) +
          0.0722 *
            (e <= 0.03928 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4))
      );
    },
    setAlpha: function (t) {
      return (
        (this._a = x(t)), (this._roundA = Math.round(100 * this._a) / 100), this
      );
    },
    toHsv: function () {
      var t = i(this._r, this._g, this._b);
      return { h: 360 * t.h, s: t.s, v: t.v, a: this._a };
    },
    toHsvString: function () {
      var t = i(this._r, this._g, this._b),
        r = Math.round(360 * t.h),
        e = Math.round(100 * t.s),
        n = Math.round(100 * t.v);
      return 1 == this._a
        ? "hsv(" + r + ", " + e + "%, " + n + "%)"
        : "hsva(" + r + ", " + e + "%, " + n + "%, " + this._roundA + ")";
    },
    toHsl: function () {
      var t = a(this._r, this._g, this._b);
      return { h: 360 * t.h, s: t.s, l: t.l, a: this._a };
    },
    toHslString: function () {
      var t = a(this._r, this._g, this._b),
        r = Math.round(360 * t.h),
        e = Math.round(100 * t.s),
        n = Math.round(100 * t.l);
      return 1 == this._a
        ? "hsl(" + r + ", " + e + "%, " + n + "%)"
        : "hsla(" + r + ", " + e + "%, " + n + "%, " + this._roundA + ")";
    },
    toHex: function (t) {
      return o(this._r, this._g, this._b, t);
    },
    toHexString: function (t) {
      return "#" + this.toHex(t);
    },
    toHex8: function (t) {
      return (function (t, r, e, n, a) {
        var i = [
          S(Math.round(t).toString(16)),
          S(Math.round(r).toString(16)),
          S(Math.round(e).toString(16)),
          S(R(n)),
        ];
        if (
          a &&
          i[0].charAt(0) == i[0].charAt(1) &&
          i[1].charAt(0) == i[1].charAt(1) &&
          i[2].charAt(0) == i[2].charAt(1) &&
          i[3].charAt(0) == i[3].charAt(1)
        )
          return (
            i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) + i[3].charAt(0)
          );
        return i.join("");
      })(this._r, this._g, this._b, this._a, t);
    },
    toHex8String: function (t) {
      return "#" + this.toHex8(t);
    },
    toRgb: function () {
      return {
        r: Math.round(this._r),
        g: Math.round(this._g),
        b: Math.round(this._b),
        a: this._a,
      };
    },
    toRgbString: function () {
      return 1 == this._a
        ? "rgb(" +
            Math.round(this._r) +
            ", " +
            Math.round(this._g) +
            ", " +
            Math.round(this._b) +
            ")"
        : "rgba(" +
            Math.round(this._r) +
            ", " +
            Math.round(this._g) +
            ", " +
            Math.round(this._b) +
            ", " +
            this._roundA +
            ")";
    },
    toPercentageRgb: function () {
      return {
        r: Math.round(100 * A(this._r, 255)) + "%",
        g: Math.round(100 * A(this._g, 255)) + "%",
        b: Math.round(100 * A(this._b, 255)) + "%",
        a: this._a,
      };
    },
    toPercentageRgbString: function () {
      return 1 == this._a
        ? "rgb(" +
            Math.round(100 * A(this._r, 255)) +
            "%, " +
            Math.round(100 * A(this._g, 255)) +
            "%, " +
            Math.round(100 * A(this._b, 255)) +
            "%)"
        : "rgba(" +
            Math.round(100 * A(this._r, 255)) +
            "%, " +
            Math.round(100 * A(this._g, 255)) +
            "%, " +
            Math.round(100 * A(this._b, 255)) +
            "%, " +
            this._roundA +
            ")";
    },
    toName: function () {
      return 0 === this._a
        ? "transparent"
        : !(this._a < 1) && (M[o(this._r, this._g, this._b, !0)] || !1);
    },
    toFilter: function (t) {
      var r = "#" + h(this._r, this._g, this._b, this._a),
        e = r,
        a = this._gradientType ? "GradientType = 1, " : "";
      if (t) {
        var i = n(t);
        e = "#" + h(i._r, i._g, i._b, i._a);
      }
      return (
        "progid:DXImageTransform.Microsoft.gradient(" +
        a +
        "startColorstr=" +
        r +
        ",endColorstr=" +
        e +
        ")"
      );
    },
    toString: function (t) {
      var r = !!t;
      t = t || this._format;
      var e = !1,
        n = this._a < 1 && this._a >= 0;
      return r ||
        !n ||
        ("hex" !== t &&
          "hex6" !== t &&
          "hex3" !== t &&
          "hex4" !== t &&
          "hex8" !== t &&
          "name" !== t)
        ? ("rgb" === t && (e = this.toRgbString()),
          "prgb" === t && (e = this.toPercentageRgbString()),
          ("hex" !== t && "hex6" !== t) || (e = this.toHexString()),
          "hex3" === t && (e = this.toHexString(!0)),
          "hex4" === t && (e = this.toHex8String(!0)),
          "hex8" === t && (e = this.toHex8String()),
          "name" === t && (e = this.toName()),
          "hsl" === t && (e = this.toHslString()),
          "hsv" === t && (e = this.toHsvString()),
          e || this.toHexString())
        : "name" === t && 0 === this._a
        ? this.toName()
        : this.toRgbString();
    },
    clone: function () {
      return n(this.toString());
    },
    _applyModification: function (t, r) {
      var e = t.apply(null, [this].concat([].slice.call(r)));
      return (
        (this._r = e._r),
        (this._g = e._g),
        (this._b = e._b),
        this.setAlpha(e._a),
        this
      );
    },
    lighten: function () {
      return this._applyModification(l, arguments);
    },
    brighten: function () {
      return this._applyModification(c, arguments);
    },
    darken: function () {
      return this._applyModification(d, arguments);
    },
    desaturate: function () {
      return this._applyModification(s, arguments);
    },
    saturate: function () {
      return this._applyModification(f, arguments);
    },
    greyscale: function () {
      return this._applyModification(u, arguments);
    },
    spin: function () {
      return this._applyModification(g, arguments);
    },
    _applyCombination: function (t, r) {
      return t.apply(null, [this].concat([].slice.call(r)));
    },
    analogous: function () {
      return this._applyCombination(_, arguments);
    },
    complement: function () {
      return this._applyCombination(b, arguments);
    },
    monochromatic: function () {
      return this._applyCombination(v, arguments);
    },
    splitcomplement: function () {
      return this._applyCombination(p, arguments);
    },
    triad: function () {
      return this._applyCombination(m, [3]);
    },
    tetrad: function () {
      return this._applyCombination(m, [4]);
    },
  }),
    (n.fromRatio = function (r, e) {
      if ("object" == t(r)) {
        var a = {};
        for (var i in r)
          r.hasOwnProperty(i) && (a[i] = "a" === i ? r[i] : H(r[i]));
        r = a;
      }
      return n(r, e);
    }),
    (n.equals = function (t, r) {
      return !(!t || !r) && n(t).toRgbString() == n(r).toRgbString();
    }),
    (n.random = function () {
      return n.fromRatio({
        r: Math.random(),
        g: Math.random(),
        b: Math.random(),
      });
    }),
    (n.mix = function (t, r, e) {
      e = 0 === e ? 0 : e || 50;
      var a = n(t).toRgb(),
        i = n(r).toRgb(),
        o = e / 100;
      return n({
        r: (i.r - a.r) * o + a.r,
        g: (i.g - a.g) * o + a.g,
        b: (i.b - a.b) * o + a.b,
        a: (i.a - a.a) * o + a.a,
      });
    }),
    (n.readability = function (t, r) {
      var e = n(t),
        a = n(r);
      return (
        (Math.max(e.getLuminance(), a.getLuminance()) + 0.05) /
        (Math.min(e.getLuminance(), a.getLuminance()) + 0.05)
      );
    }),
    (n.isReadable = function (t, r, e) {
      var a,
        i,
        o = n.readability(t, r);
      switch (
        ((i = !1),
        (a = (function (t) {
          var r, e;
          (r = (
            (t = t || { level: "AA", size: "small" }).level || "AA"
          ).toUpperCase()),
            (e = (t.size || "small").toLowerCase()),
            "AA" !== r && "AAA" !== r && (r = "AA");
          "small" !== e && "large" !== e && (e = "small");
          return { level: r, size: e };
        })(e)).level + a.size)
      ) {
        case "AAsmall":
        case "AAAlarge":
          i = o >= 4.5;
          break;
        case "AAlarge":
          i = o >= 3;
          break;
        case "AAAsmall":
          i = o >= 7;
      }
      return i;
    }),
    (n.mostReadable = function (t, r, e) {
      var a,
        i,
        o,
        h,
        s = null,
        f = 0;
      (i = (e = e || {}).includeFallbackColors), (o = e.level), (h = e.size);
      for (var u = 0; u < r.length; u++)
        (a = n.readability(t, r[u])) > f && ((f = a), (s = n(r[u])));
      return n.isReadable(t, s, { level: o, size: h }) || !i
        ? s
        : ((e.includeFallbackColors = !1),
          n.mostReadable(t, ["#fff", "#000"], e));
    });
  var y = (n.names = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "0ff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "00f",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      burntsienna: "ea7e5d",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "0ff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "f0f",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32",
    }),
    M = (n.hexNames = (function (t) {
      var r = {};
      for (var e in t) t.hasOwnProperty(e) && (r[t[e]] = e);
      return r;
    })(y));
  function x(t) {
    return (t = parseFloat(t)), (isNaN(t) || t < 0 || t > 1) && (t = 1), t;
  }
  function A(t, r) {
    (function (t) {
      return (
        "string" == typeof t && -1 != t.indexOf(".") && 1 === parseFloat(t)
      );
    })(t) && (t = "100%");
    var e = (function (t) {
      return "string" == typeof t && -1 != t.indexOf("%");
    })(t);
    return (
      (t = Math.min(r, Math.max(0, parseFloat(t)))),
      e && (t = parseInt(t * r, 10) / 100),
      Math.abs(t - r) < 1e-6 ? 1 : (t % r) / parseFloat(r)
    );
  }
  function k(t) {
    return Math.min(1, Math.max(0, t));
  }
  function w(t) {
    return parseInt(t, 16);
  }
  function S(t) {
    return 1 == t.length ? "0" + t : "" + t;
  }
  function H(t) {
    return t <= 1 && (t = 100 * t + "%"), t;
  }
  function R(t) {
    return Math.round(255 * parseFloat(t)).toString(16);
  }
  function F(t) {
    return w(t) / 255;
  }
  var C,
    q,
    N,
    T =
      ((q =
        "[\\s|\\(]+(" +
        (C = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)") +
        ")[,|\\s]+(" +
        C +
        ")[,|\\s]+(" +
        C +
        ")\\s*\\)?"),
      (N =
        "[\\s|\\(]+(" +
        C +
        ")[,|\\s]+(" +
        C +
        ")[,|\\s]+(" +
        C +
        ")[,|\\s]+(" +
        C +
        ")\\s*\\)?"),
      {
        CSS_UNIT: new RegExp(C),
        rgb: new RegExp("rgb" + q),
        rgba: new RegExp("rgba" + N),
        hsl: new RegExp("hsl" + q),
        hsla: new RegExp("hsla" + N),
        hsv: new RegExp("hsv" + q),
        hsva: new RegExp("hsva" + N),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      });
  function E(t) {
    return !!T.CSS_UNIT.exec(t);
  }
  return n;
});
