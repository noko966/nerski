!(function (t) {
  "use strict";
  var n = "cuid",
    r = 0,
    e = 4,
    i = 36,
    o = Math.pow(i, e),
    u = function (t, n) {
      var r = "000000000" + t;
      return r.substr(r.length - n);
    },
    g = function () {
      return u(((Math.random() * o) << 0).toString(i), e);
    },
    a = function () {
      return (r = r < o ? r : 0), r++, r - 1;
    },
    c = function () {
      var t,
        n = "c",
        r = new Date().getTime().toString(i),
        o = c.fingerprint(),
        l = g() + g();
      return (t = u(a().toString(i), e)), n + r + t + o + l;
    };
  (c.slug = function () {
    var t,
      n = new Date().getTime().toString(36),
      r = c.fingerprint().slice(0, 1) + c.fingerprint().slice(-1),
      e = g().slice(-2);
    return (t = a().toString(36).slice(-4)), n.slice(-2) + t + r + e;
  }),
    (c.globalCount = function () {
      var t = (function () {
        var t,
          n = 0;
        for (t in window) n++;
        return n;
      })();
      return (
        (c.globalCount = function () {
          return t;
        }),
        t
      );
    }),
    (c.fingerprint = function () {
      return u(
        (navigator.mimeTypes.length + navigator.userAgent.length).toString(36) +
          c.globalCount().toString(36),
        4
      );
    }),
    t.register
      ? t.register(n, c)
      : "undefined" != typeof module
      ? (module.exports = c)
      : (t[n] = c);
})(this.applitude || this);
