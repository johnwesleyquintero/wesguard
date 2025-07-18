import { app as ai, ipcMain as Ut, BrowserWindow as Zi } from "electron";
import ce from "path";
import Pe from "os";
import Ae from "fs";
import se from "child_process";
import Vs from "util";
import ra from "https";
import sa from "http";
import oa from "net";
import { fileURLToPath as aa } from "url";
import er from "node:process";
import la from "constants";
import ca from "stream";
import ua from "assert";
var tr =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function Ns(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
var Bs = {};
const pa = "5.27.7",
  fa = {
    version: pa,
  };
var V = {};
const st = Pe,
  ze = Ae,
  da = ce,
  fr = se.spawn,
  ma = se.exec,
  pn = se.execSync,
  ha = Vs;
let zt = process.platform;
const dr = zt === "linux" || zt === "android",
  ks = zt === "darwin",
  gi = zt === "win32",
  Fs = zt === "freebsd",
  Ws = zt === "openbsd",
  Rs = zt === "netbsd";
let Ni = 0,
  Bt = "",
  Re = "",
  tt = null,
  $e = null;
const mr = process.env.WINDIR || "C:\\Windows";
let de,
  Yt = "",
  Pn = [],
  hr = !1,
  li = "";
const $r =
    "$OutputEncoding = [System.Console]::OutputEncoding = [System.Console]::InputEncoding = [System.Text.Encoding]::UTF8 ; ",
  nr = "--###START###--",
  zr = "--ERROR--",
  ci = "--###ENDCMD###--",
  ir = "--##ID##--",
  $n = {
    windowsHide: !0,
    maxBuffer: 1024 * 2e4,
    encoding: "UTF-8",
    env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" }),
  },
  yi = {
    maxBuffer: 1024 * 2e4,
    encoding: "UTF-8",
    stdio: ["pipe", "pipe", "ignore"],
  };
function ga(t) {
  let n = parseInt(t, 10);
  return (isNaN(n) && (n = 0), n);
}
function ya(t) {
  let n = !1,
    e = "",
    i = "";
  for (const s of t)
    (s >= "0" && s <= "9") || n ? ((n = !0), (e += s)) : (i += s);
  return [i, e];
}
const ii = new String(),
  rr = new String().replace,
  sr = new String().toLowerCase,
  Gs = new String().toString,
  $s = new String().substr,
  zs = new String().substring,
  Us = new String().trim,
  Hs = new String().startsWith,
  js = Math.min;
function xa(t) {
  return t && {}.toString.call(t) === "[object Function]";
}
function Sa(t) {
  let n = [],
    e = {};
  for (let i = 0; i < t.length; i++) {
    let s = Object.keys(t[i]);
    s.sort(function (o, a) {
      return o - a;
    });
    let r = "";
    for (let o = 0; o < s.length; o++)
      ((r += JSON.stringify(s[o])), (r += JSON.stringify(t[i][s[o]])));
    ({}).hasOwnProperty.call(e, r) || (n.push(t[i]), (e[r] = !0));
  }
  return n;
}
function wa(t, n) {
  return t.sort(function (e, i) {
    let s = "",
      r = "";
    return (
      n.forEach(function (o) {
        ((s = s + e[o]), (r = r + i[o]));
      }),
      s < r ? -1 : s > r ? 1 : 0
    );
  });
}
function Ca() {
  return (Ni === 0 && (Ni = st.cpus().length), Ni);
}
function at(t, n, e, i, s) {
  ((e = e || ":"), (n = n.toLowerCase()), (i = i || !1), (s = s || !1));
  let r = "";
  return (
    t.some((o) => {
      let a = o.toLowerCase().replace(/\t/g, "");
      if (
        (i && (a = a.trim()),
        a.startsWith(n) && (!s || a.match(n + e) || a.match(n + " " + e)))
      ) {
        const c = i ? o.trim().split(e) : o.split(e);
        if (c.length >= 2) return (c.shift(), (r = c.join(e).trim()), !0);
      }
    }),
    r
  );
}
function La(t, n) {
  return (
    (n = n || 16),
    t.replace(/\\x([0-9A-Fa-f]{2})/g, function () {
      return String.fromCharCode(parseInt(arguments[1], n));
    })
  );
}
function Ia(t) {
  let n = "",
    e = 0;
  return (
    t.split("").forEach((i) => {
      i >= "0" && i <= "9"
        ? e === 1 && e++
        : (e === 0 && e++, e === 1 && (n += i));
    }),
    n
  );
}
function va(t, n) {
  ((n = n || ""), (t = t.toUpperCase()));
  let e = 0,
    i = 0,
    s = Ia(t),
    r = t.split(s);
  if (r.length >= 2) {
    r[2] && (r[1] += r[2]);
    let o =
      (r[1] && r[1].toLowerCase().indexOf("pm") > -1) ||
      r[1].toLowerCase().indexOf("p.m.") > -1 ||
      r[1].toLowerCase().indexOf("p. m.") > -1 ||
      r[1].toLowerCase().indexOf("n") > -1 ||
      r[1].toLowerCase().indexOf("ch") > -1 ||
      r[1].toLowerCase().indexOf("ös") > -1 ||
      (n && r[1].toLowerCase().indexOf(n) > -1);
    return (
      (e = parseInt(r[0], 10)),
      (i = parseInt(r[1], 10)),
      (e = o && e < 12 ? e + 12 : e),
      ("0" + e).substr(-2) + ":" + ("0" + i).substr(-2)
    );
  }
}
function _a(t, n) {
  const e = {
    date: "",
    time: "",
  };
  n = n || {};
  let i = (n.dateFormat || "").toLowerCase(),
    s = n.pmDesignator || "";
  const r = t.split(" ");
  if (r[0]) {
    if (r[0].indexOf("/") >= 0) {
      const o = r[0].split("/");
      o.length === 3 &&
        (o[0].length === 4
          ? (e.date =
              o[0] +
              "-" +
              ("0" + o[1]).substr(-2) +
              "-" +
              ("0" + o[2]).substr(-2))
          : o[2].length === 2
            ? (i.indexOf("/d/") > -1 || i.indexOf("/dd/") > -1,
              (e.date =
                "20" +
                o[2] +
                "-" +
                ("0" + o[1]).substr(-2) +
                "-" +
                ("0" + o[0]).substr(-2)))
            : (t.toLowerCase().indexOf("pm") > -1 ||
                  t.toLowerCase().indexOf("p.m.") > -1 ||
                  t.toLowerCase().indexOf("p. m.") > -1 ||
                  t.toLowerCase().indexOf("am") > -1 ||
                  t.toLowerCase().indexOf("a.m.") > -1 ||
                  t.toLowerCase().indexOf("a. m.") > -1 ||
                  i.indexOf("/d/") > -1 ||
                  i.indexOf("/dd/") > -1) &&
                i.indexOf("dd/") !== 0
              ? (e.date =
                  o[2] +
                  "-" +
                  ("0" + o[0]).substr(-2) +
                  "-" +
                  ("0" + o[1]).substr(-2))
              : (e.date =
                  o[2] +
                  "-" +
                  ("0" + o[1]).substr(-2) +
                  "-" +
                  ("0" + o[0]).substr(-2)));
    }
    if (r[0].indexOf(".") >= 0) {
      const o = r[0].split(".");
      o.length === 3 &&
        (i.indexOf(".d.") > -1 || i.indexOf(".dd.") > -1
          ? (e.date =
              o[2] +
              "-" +
              ("0" + o[0]).substr(-2) +
              "-" +
              ("0" + o[1]).substr(-2))
          : (e.date =
              o[2] +
              "-" +
              ("0" + o[1]).substr(-2) +
              "-" +
              ("0" + o[0]).substr(-2)));
    }
    if (r[0].indexOf("-") >= 0) {
      const o = r[0].split("-");
      o.length === 3 &&
        (e.date =
          o[0] + "-" + ("0" + o[1]).substr(-2) + "-" + ("0" + o[2]).substr(-2));
    }
  }
  if (r[1]) {
    r.shift();
    let o = r.join(" ");
    e.time = va(o, s);
  }
  return e;
}
function Oa(t, n) {
  let e = n > 0,
    i = 1,
    s = 0,
    r = 0,
    o = [];
  for (let c = 0; c < t.length; c++)
    i <= n
      ? (/\s/.test(t[c]) &&
          !e &&
          ((r = c - 1),
          o.push({
            from: s,
            to: r + 1,
            cap: t.substring(s, r + 1),
          }),
          (s = r + 2),
          i++),
        (e = t[c] === " "))
      : (!/\s/.test(t[c]) &&
          e &&
          ((r = c - 1),
          s < r &&
            o.push({
              from: s,
              to: r,
              cap: t.substring(s, r),
            }),
          (s = r + 1),
          i++),
        (e = t[c] === " "));
  ((r = 5e3),
    o.push({
      from: s,
      to: r,
      cap: t.substring(s, r),
    }));
  let a = o.length;
  for (let c = 0; c < a; c++)
    o[c].cap.replace(/\s/g, "").length === 0 &&
      c + 1 < a &&
      ((o[c].to = o[c + 1].to),
      (o[c].cap = o[c].cap + o[c + 1].cap),
      o.splice(c + 1, 1),
      (a = a - 1));
  return o;
}
function Pa(t, n, e) {
  for (let i = 0; i < t.length; i++) if (t[i][n] === e) return i;
  return -1;
}
function Ea() {
  if (((li = "powershell.exe"), gi)) {
    const t = `${mr}\\system32\\WindowsPowerShell\\v1.0\\powershell.exe`;
    ze.existsSync(t) && (li = t);
  }
}
function Ks() {
  if (
    st.type() === "Windows_NT" &&
    !Bt &&
    ((Bt = mr + "\\system32\\wbem\\wmic.exe"), !ze.existsSync(Bt))
  )
    try {
      const t = pn("WHERE WMIC", $n).toString().split(`\r
`);
      t && t.length ? (Bt = t[0]) : (Bt = "wmic");
    } catch {
      Bt = "wmic";
    }
  return Bt;
}
function Ma(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      try {
        Xs(Ks() + " " + t).then((e) => {
          n(e, "");
        });
      } catch (e) {
        n("", e);
      }
    });
  });
}
function Aa() {
  return gi
    ? `"${process.env.VBOX_INSTALL_PATH || process.env.VBOX_MSI_INSTALL_PATH}\\VBoxManage.exe"`
    : "vboxmanage";
}
function Bi(t) {
  let n = "",
    e,
    i = "";
  if (t.indexOf(nr) >= 0) {
    e = t.split(nr);
    const r = e[1].split(ir);
    ((n = r[0]), r.length > 1 && (t = r.slice(1).join(ir)));
  }
  t.indexOf(ci) >= 0 && ((e = t.split(ci)), (i = e[0]));
  let s = -1;
  for (let r = 0; r < Pn.length; r++)
    Pn[r].id === n && ((s = r), Pn[r].callback(i));
  s >= 0 && Pn.splice(s, 1);
}
function Ta() {
  de ||
    ((de = fr(
      li,
      [
        "-NoProfile",
        "-NoLogo",
        "-InputFormat",
        "Text",
        "-NoExit",
        "-Command",
        "-",
      ],
      {
        stdio: "pipe",
        windowsHide: !0,
        maxBuffer: 1024 * 2e4,
        encoding: "UTF-8",
        env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" }),
      },
    )),
    de &&
      de.pid &&
      ((hr = !0),
      de.stdout.on("data", function (t) {
        ((Yt = Yt + t.toString("utf8")),
          t.indexOf(ci) >= 0 && (Bi(Yt), (Yt = "")));
      }),
      de.stderr.on("data", function () {
        Bi(Yt + zr);
      }),
      de.on("error", function () {
        Bi(Yt + zr);
      }),
      de.on("close", function () {
        de && de.kill();
      })));
}
function Da() {
  try {
    de && (de.stdin.write("exit" + st.EOL), de.stdin.end(), (hr = !1));
  } catch {
    de && de.kill();
  }
  de = null;
}
function Xs(t) {
  if (hr) {
    const n = Math.random().toString(36).substring(2, 12);
    return new Promise((e) => {
      process.nextTick(() => {
        function i(s) {
          e(s);
        }
        Pn.push({
          id: n,
          cmd: t,
          callback: i,
          start: /* @__PURE__ */ new Date(),
        });
        try {
          de &&
            de.pid &&
            de.stdin.write(
              $r +
                "echo " +
                nr +
                n +
                ir +
                "; " +
                st.EOL +
                t +
                st.EOL +
                "echo " +
                ci +
                st.EOL,
            );
        } catch {
          e("");
        }
      });
    });
  } else {
    let n = "";
    return new Promise((e) => {
      process.nextTick(() => {
        try {
          const i = fr(
            li,
            [
              "-NoProfile",
              "-NoLogo",
              "-InputFormat",
              "Text",
              "-NoExit",
              "-ExecutionPolicy",
              "Unrestricted",
              "-Command",
              "-",
            ],
            {
              stdio: "pipe",
              windowsHide: !0,
              maxBuffer: 2048e4,
              encoding: "UTF-8",
              env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" }),
            },
          );
          if (
            (i &&
              !i.pid &&
              i.on("error", function () {
                e(n);
              }),
            i && i.pid)
          ) {
            (i.stdout.on("data", function (s) {
              n = n + s.toString("utf8");
            }),
              i.stderr.on("data", function () {
                (i.kill(), e(n));
              }),
              i.on("close", function () {
                (i.kill(), e(n));
              }),
              i.on("error", function () {
                (i.kill(), e(n));
              }));
            try {
              (i.stdin.write($r + t + st.EOL),
                i.stdin.write("exit" + st.EOL),
                i.stdin.end());
            } catch {
              (i.kill(), e(n));
            }
          } else e(n);
        } catch {
          e(n);
        }
      });
    });
  }
}
function ba(t, n, e) {
  let i = "";
  return (
    (e = e || {}),
    new Promise((s) => {
      process.nextTick(() => {
        try {
          const r = fr(t, n, e);
          (r &&
            !r.pid &&
            r.on("error", function () {
              s(i);
            }),
            r && r.pid
              ? (r.stdout.on("data", function (o) {
                  i += o.toString();
                }),
                r.on("close", function () {
                  (r.kill(), s(i));
                }),
                r.on("error", function () {
                  (r.kill(), s(i));
                }))
              : s(i));
        } catch {
          s(i);
        }
      });
    })
  );
}
function Va() {
  if (gi) {
    if (!Re)
      try {
        const e = pn("chcp", $n)
          .toString()
          .split(
            `\r
`,
          )[0]
          .split(":");
        Re = e.length > 1 ? e[1].replace(".", "").trim() : "";
      } catch {
        Re = "437";
      }
    return Re;
  }
  if (dr || ks || Fs || Ws || Rs) {
    if (!Re)
      try {
        const e = pn("echo $LANG", yi)
          .toString()
          .split(
            `\r
`,
          )[0]
          .split(".");
        ((Re = e.length > 1 ? e[1].trim() : ""), Re || (Re = "UTF-8"));
      } catch {
        Re = "UTF-8";
      }
    return Re;
  }
}
function Na() {
  if (tt !== null) return tt;
  if (((tt = !1), gi))
    try {
      const t = pn("WHERE smartctl 2>nul", $n).toString().split(`\r
`);
      t && t.length ? (tt = t[0].indexOf(":\\") >= 0) : (tt = !1);
    } catch {
      tt = !1;
    }
  if (dr || ks || Fs || Ws || Rs)
    try {
      tt =
        pn("which smartctl 2>/dev/null", yi).toString().split(`\r
`).length > 0;
    } catch {
      ha.noop();
    }
  return tt;
}
function Ba(t) {
  const n = [
    "BCM2708",
    "BCM2709",
    "BCM2710",
    "BCM2711",
    "BCM2712",
    "BCM2835",
    "BCM2836",
    "BCM2837",
    "BCM2837B0",
  ];
  if ($e !== null) t = $e;
  else if (t === void 0)
    try {
      ((t = ze.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString()
        .split(`
`)),
        ($e = t));
    } catch {
      return !1;
    }
  const e = at(t, "hardware"),
    i = at(t, "model");
  return (e && n.indexOf(e) > -1) || (i && i.indexOf("Raspberry Pi") > -1);
}
function ka() {
  let t = [];
  try {
    t = ze.readFileSync("/etc/os-release", { encoding: "utf8" }).toString()
      .split(`
`);
  } catch {
    return !1;
  }
  const n = at(t, "id", "=");
  return n && n.indexOf("raspbian") > -1;
}
function Fa(t, n, e) {
  e || ((e = n), (n = $n));
  let i = "chcp 65001 > nul && cmd /C " + t + " && chcp " + Re + " > nul";
  ma(i, n, function (s, r) {
    e(s, r);
  });
}
function Wa() {
  const t = ze.existsSync("/Library/Developer/CommandLineTools/usr/bin/"),
    n = ze.existsSync("/Applications/Xcode.app/Contents/Developer/Tools"),
    e = ze.existsSync("/Library/Developer/Xcode/");
  return t || e || n;
}
function Ra() {
  const t = process.hrtime();
  return !Array.isArray(t) || t.length !== 2 ? 0 : +t[0] * 1e9 + +t[1];
}
function Ga(t, n) {
  n = n || "";
  const e = [];
  return (
    t.forEach((i) => {
      i.startsWith(n) && e.indexOf(i) === -1 && e.push(i);
    }),
    e.length
  );
}
function $a(t, n) {
  n = n || "";
  const e = [];
  return (
    t.forEach((i) => {
      i.startsWith(n) && e.push(i);
    }),
    e.length
  );
}
function za(t, n) {
  typeof n > "u" && (n = !1);
  const e = t || "";
  let i = "";
  const s = js(e.length, 2e3);
  for (let r = 0; r <= s; r++)
    e[r] === void 0 ||
      e[r] === ">" ||
      e[r] === "<" ||
      e[r] === "*" ||
      e[r] === "?" ||
      e[r] === "[" ||
      e[r] === "]" ||
      e[r] === "|" ||
      e[r] === "˚" ||
      e[r] === "$" ||
      e[r] === ";" ||
      e[r] === "&" ||
      e[r] === "]" ||
      e[r] === "#" ||
      e[r] === "\\" ||
      e[r] === "	" ||
      e[r] ===
        `
` ||
      e[r] === "\r" ||
      e[r] === "'" ||
      e[r] === "`" ||
      e[r] === '"' ||
      e[r].length > 1 ||
      (n && e[r] === "(") ||
      (n && e[r] === ")") ||
      (n && e[r] === "@") ||
      (n && e[r] === " ") ||
      (n && e[r] == "{") ||
      (n && e[r] == ";") ||
      (n && e[r] == "}") ||
      (i = i + e[r]);
  return i;
}
function Ua() {
  const t = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let n = !0,
    e = "";
  try {
    ((e.__proto__.replace = rr),
      (e.__proto__.toLowerCase = sr),
      (e.__proto__.toString = Gs),
      (e.__proto__.substr = $s),
      (e.__proto__.substring = zs),
      (e.__proto__.trim = Us),
      (e.__proto__.startsWith = Hs));
  } catch {
    Object.setPrototypeOf(e, ii);
  }
  n = n || t.length !== 62;
  const i = Date.now();
  if (typeof i == "number" && i > 16e11) {
    const s = (i % 100) + 15;
    for (let u = 0; u < s; u++) {
      const l = Math.random() * 61.99999999 + 1,
        f = parseInt(Math.floor(l).toString(), 10),
        p = parseInt(l.toString().split(".")[0], 10),
        d = Math.random() * 61.99999999 + 1,
        m = parseInt(Math.floor(d).toString(), 10),
        h = parseInt(d.toString().split(".")[0], 10);
      ((n = n && l !== d), (n = n && f === p && m === h), (e += t[f - 1]));
    }
    n = n && e.length === s;
    let r = Math.random() * s * 0.9999999999,
      o = e.substr(0, r) + " " + e.substr(r, 2e3);
    try {
      o.__proto__.replace = rr;
    } catch {
      Object.setPrototypeOf(o, ii);
    }
    let a = o.replace(/ /g, "");
    ((n = n && e === a),
      (r = Math.random() * s * 0.9999999999),
      (o = e.substr(0, r) + "{" + e.substr(r, 2e3)),
      (a = o.replace(/{/g, "")),
      (n = n && e === a),
      (r = Math.random() * s * 0.9999999999),
      (o = e.substr(0, r) + "*" + e.substr(r, 2e3)),
      (a = o.replace(/\*/g, "")),
      (n = n && e === a),
      (r = Math.random() * s * 0.9999999999),
      (o = e.substr(0, r) + "$" + e.substr(r, 2e3)),
      (a = o.replace(/\$/g, "")),
      (n = n && e === a));
    const c = e.toLowerCase();
    n = n && c.length === s && c[s - 1] && !c[s];
    for (let u = 0; u < s; u++) {
      const l = e[u];
      try {
        l.__proto__.toLowerCase = sr;
      } catch {
        Object.setPrototypeOf(e, ii);
      }
      const f = c ? c[u] : "",
        p = l.toLowerCase();
      n = n && p[0] === f && p[0] && !p[1];
    }
  }
  return !n;
}
function Ha(t) {
  return ("00000000" + parseInt(t, 16).toString(2)).substr(-8);
}
function ja(t) {
  const n = ze.lstatSync,
    e = ze.readdirSync,
    i = da.join;
  function s(u) {
    return n(u).isDirectory();
  }
  function r(u) {
    return n(u).isFile();
  }
  function o(u) {
    return e(u)
      .map(function (l) {
        return i(u, l);
      })
      .filter(s);
  }
  function a(u) {
    return e(u)
      .map(function (l) {
        return i(u, l);
      })
      .filter(r);
  }
  function c(u) {
    try {
      return o(u)
        .map(function (p) {
          return c(p);
        })
        .reduce(function (p, d) {
          return p.concat(d);
        }, [])
        .concat(a(u));
    } catch {
      return [];
    }
  }
  return ze.existsSync(t) ? c(t) : [];
}
function qs(t) {
  $e === null ? ($e = t) : t === void 0 && (t = $e);
  const n = {
      "0002": {
        type: "B",
        revision: "1.0",
        memory: 256,
        manufacturer: "Egoman",
        processor: "BCM2835",
      },
      "0003": {
        type: "B",
        revision: "1.0",
        memory: 256,
        manufacturer: "Egoman",
        processor: "BCM2835",
      },
      "0004": {
        type: "B",
        revision: "2.0",
        memory: 256,
        manufacturer: "Sony UK",
        processor: "BCM2835",
      },
      "0005": {
        type: "B",
        revision: "2.0",
        memory: 256,
        manufacturer: "Qisda",
        processor: "BCM2835",
      },
      "0006": {
        type: "B",
        revision: "2.0",
        memory: 256,
        manufacturer: "Egoman",
        processor: "BCM2835",
      },
      "0007": {
        type: "A",
        revision: "2.0",
        memory: 256,
        manufacturer: "Egoman",
        processor: "BCM2835",
      },
      "0008": {
        type: "A",
        revision: "2.0",
        memory: 256,
        manufacturer: "Sony UK",
        processor: "BCM2835",
      },
      "0009": {
        type: "A",
        revision: "2.0",
        memory: 256,
        manufacturer: "Qisda",
        processor: "BCM2835",
      },
      "000d": {
        type: "B",
        revision: "2.0",
        memory: 512,
        manufacturer: "Egoman",
        processor: "BCM2835",
      },
      "000e": {
        type: "B",
        revision: "2.0",
        memory: 512,
        manufacturer: "Sony UK",
        processor: "BCM2835",
      },
      "000f": {
        type: "B",
        revision: "2.0",
        memory: 512,
        manufacturer: "Egoman",
        processor: "BCM2835",
      },
      "0010": {
        type: "B+",
        revision: "1.2",
        memory: 512,
        manufacturer: "Sony UK",
        processor: "BCM2835",
      },
      "0011": {
        type: "CM1",
        revision: "1.0",
        memory: 512,
        manufacturer: "Sony UK",
        processor: "BCM2835",
      },
      "0012": {
        type: "A+",
        revision: "1.1",
        memory: 256,
        manufacturer: "Sony UK",
        processor: "BCM2835",
      },
      "0013": {
        type: "B+",
        revision: "1.2",
        memory: 512,
        manufacturer: "Embest",
        processor: "BCM2835",
      },
      "0014": {
        type: "CM1",
        revision: "1.0",
        memory: 512,
        manufacturer: "Embest",
        processor: "BCM2835",
      },
      "0015": {
        type: "A+",
        revision: "1.1",
        memory: 256,
        manufacturer: "512MB	Embest",
        processor: "BCM2835",
      },
    },
    e = ["BCM2835", "BCM2836", "BCM2837", "BCM2711", "BCM2712"],
    i = ["Sony UK", "Egoman", "Embest", "Sony Japan", "Embest", "Stadium"],
    s = {
      "00": "A",
      "01": "B",
      "02": "A+",
      "03": "B+",
      "04": "2B",
      "05": "Alpha (early prototype)",
      "06": "CM1",
      "08": "3B",
      "09": "Zero",
      "0a": "CM3",
      "0c": "Zero W",
      "0d": "3B+",
      "0e": "3A+",
      "0f": "Internal use only",
      10: "CM3+",
      11: "4B",
      12: "Zero 2 W",
      13: "400",
      14: "CM4",
      15: "CM4S",
      16: "Internal use only",
      17: "5",
      18: "CM5",
      19: "500",
      "1a": "CM5 Lite",
    },
    r = at(t, "revision", ":", !0),
    o = at(t, "model:", ":", !0),
    a = at(t, "serial", ":", !0);
  let c = {};
  if ({}.hasOwnProperty.call(n, r))
    c = {
      model: o,
      serial: a,
      revisionCode: r,
      memory: n[r].memory,
      manufacturer: n[r].manufacturer,
      processor: n[r].processor,
      type: n[r].type,
      revision: n[r].revision,
    };
  else {
    const u = ("00000000" + at(t, "revision", ":", !0).toLowerCase()).substr(
        -8,
      ),
      l = parseInt(Ha(u.substr(2, 1)).substr(5, 3), 2) || 0,
      f = i[parseInt(u.substr(3, 1), 10)],
      p = e[parseInt(u.substr(4, 1), 10)],
      d = u.substr(5, 2);
    c = {
      model: o,
      serial: a,
      revisionCode: r,
      memory: 256 * Math.pow(2, l),
      manufacturer: f,
      processor: p,
      type: {}.hasOwnProperty.call(s, d) ? s[d] : "",
      revision: "1." + u.substr(7, 1),
    };
  }
  return c;
}
function Ka(t) {
  if ($e === null && t !== void 0) $e = t;
  else if (t === void 0 && $e !== null) t = $e;
  else
    try {
      ((t = ze.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString()
        .split(`
`)),
        ($e = t));
    } catch {
      return !1;
    }
  const n = qs(t);
  return n.type === "4B" ||
    n.type === "CM4" ||
    n.type === "CM4S" ||
    n.type === "400"
    ? "VideoCore VI"
    : n.type === "5" || n.type === "500"
      ? "VideoCore VII"
      : "VideoCore IV";
}
function Xa(t) {
  const n = t.map(function (s) {
      return new Promise(function (r) {
        let o = new Array(2);
        s.then(function (a) {
          o[0] = a;
        })
          .catch(function (a) {
            o[1] = a;
          })
          .then(function () {
            r(o);
          });
      });
    }),
    e = [],
    i = [];
  return Promise.all(n).then(function (s) {
    return (
      s.forEach(function (r) {
        r[1] ? (e.push(r[1]), i.push(null)) : (e.push(null), i.push(r[0]));
      }),
      {
        errors: e,
        results: i,
      }
    );
  });
}
function qa(t) {
  return function () {
    const n = Array.prototype.slice.call(arguments);
    return new Promise(function (e, i) {
      (n.push(function (s, r) {
        s ? i(s) : e(r);
      }),
        t.apply(null, n));
    });
  };
}
function Ya(t) {
  return function () {
    const n = Array.prototype.slice.call(arguments);
    return new Promise(function (e) {
      (n.push(function (i, s) {
        e(s);
      }),
        t.apply(null, n));
    });
  };
}
function Ja() {
  let t = "";
  if (dr)
    try {
      t = pn("uname -v", yi).toString();
    } catch {
      t = "";
    }
  return t;
}
function Qa(t) {
  const n = [
    "array",
    "dict",
    "key",
    "string",
    "integer",
    "date",
    "real",
    "data",
    "boolean",
    "arrayEmpty",
  ];
  let i = t.indexOf("<plist version"),
    s = t.length;
  for (; t[i] !== ">" && i < s; ) i++;
  let r = 0,
    o = !1,
    a = !1,
    c = !1,
    u = [{ tagStart: "", tagEnd: "", tagContent: "", key: "", data: null }],
    l = "",
    f = t[i];
  for (; i < s; )
    ((l = f),
      i + 1 < s && (f = t[i + 1]),
      l === "<"
        ? ((a = !1),
          f === "/"
            ? (c = !0)
            : u[r].tagStart
              ? ((u[r].tagContent = ""),
                u[r].data || (u[r].data = u[r].tagStart === "array" ? [] : {}),
                r++,
                u.push({
                  tagStart: "",
                  tagEnd: "",
                  tagContent: "",
                  key: null,
                  data: null,
                }),
                (o = !0),
                (a = !1))
              : o || (o = !0))
        : l === ">"
          ? (u[r].tagStart === "true/" &&
              ((o = !1),
              (c = !0),
              (u[r].tagStart = ""),
              (u[r].tagEnd = "/boolean"),
              (u[r].data = !0)),
            u[r].tagStart === "false/" &&
              ((o = !1),
              (c = !0),
              (u[r].tagStart = ""),
              (u[r].tagEnd = "/boolean"),
              (u[r].data = !1)),
            u[r].tagStart === "array/" &&
              ((o = !1),
              (c = !0),
              (u[r].tagStart = ""),
              (u[r].tagEnd = "/arrayEmpty"),
              (u[r].data = [])),
            a && (a = !1),
            o &&
              ((o = !1),
              (a = !0),
              u[r].tagStart === "array" && (u[r].data = []),
              u[r].tagStart === "dict" && (u[r].data = {})),
            c &&
              ((c = !1),
              u[r].tagEnd &&
                n.indexOf(u[r].tagEnd.substr(1)) >= 0 &&
                (u[r].tagEnd === "/dict" || u[r].tagEnd === "/array"
                  ? (r > 1 &&
                      u[r - 2].tagStart === "array" &&
                      u[r - 2].data.push(u[r - 1].data),
                    r > 1 &&
                      u[r - 2].tagStart === "dict" &&
                      (u[r - 2].data[u[r - 1].key] = u[r - 1].data),
                    r--,
                    u.pop(),
                    (u[r].tagContent = ""),
                    (u[r].tagStart = ""),
                    (u[r].tagEnd = ""))
                  : (u[r].tagEnd === "/key" && u[r].tagContent
                      ? (u[r].key = u[r].tagContent)
                      : (u[r].tagEnd === "/real" &&
                          u[r].tagContent &&
                          (u[r].data = parseFloat(u[r].tagContent) || 0),
                        u[r].tagEnd === "/integer" &&
                          u[r].tagContent &&
                          (u[r].data = parseInt(u[r].tagContent) || 0),
                        u[r].tagEnd === "/string" &&
                          u[r].tagContent &&
                          (u[r].data = u[r].tagContent || ""),
                        u[r].tagEnd === "/boolean" &&
                          (u[r].data = u[r].tagContent || !1),
                        u[r].tagEnd === "/arrayEmpty" &&
                          (u[r].data = u[r].tagContent || []),
                        r > 0 &&
                          u[r - 1].tagStart === "array" &&
                          u[r - 1].data.push(u[r].data),
                        r > 0 &&
                          u[r - 1].tagStart === "dict" &&
                          (u[r - 1].data[u[r].key] = u[r].data)),
                    (u[r].tagContent = ""),
                    (u[r].tagStart = ""),
                    (u[r].tagEnd = ""))),
              (u[r].tagEnd = ""),
              (o = !1),
              (a = !1)))
          : (o && (u[r].tagStart += l),
            c && (u[r].tagEnd += l),
            a && (u[r].tagContent += l)),
      i++);
  return u[0].data;
}
function Ur(t) {
  return typeof t == "string" && !isNaN(t) && !isNaN(parseFloat(t));
}
function Za(t) {
  const n = t.split(`
`);
  for (let i = 0; i < n.length; i++) {
    if (n[i].indexOf(" = ") >= 0) {
      const s = n[i].split(" = ");
      if (
        ((s[0] = s[0].trim()),
        s[0].startsWith('"') || (s[0] = '"' + s[0] + '"'),
        (s[1] = s[1].trim()),
        s[1].indexOf('"') === -1 && s[1].endsWith(";"))
      ) {
        const r = s[1].substring(0, s[1].length - 1);
        Ur(r) || (s[1] = `"${r}";`);
      }
      if (s[1].indexOf('"') >= 0 && s[1].endsWith(";")) {
        const r = s[1].substring(0, s[1].length - 1).replace(/"/g, "");
        Ur(r) && (s[1] = `${r};`);
      }
      n[i] = s.join(" : ");
    }
    ((n[i] = n[i]
      .replace(/\(/g, "[")
      .replace(/\)/g, "]")
      .replace(/;/g, ",")
      .trim()),
      n[i].startsWith("}") &&
        n[i - 1] &&
        n[i - 1].endsWith(",") &&
        (n[i - 1] = n[i - 1].substring(0, n[i - 1].length - 1)));
  }
  t = n.join("");
  let e = {};
  try {
    e = JSON.parse(t);
  } catch {}
  return e;
}
function el(t, n) {
  let e = 0;
  const i = t.split("."),
    s = n.split(".");
  return (
    i[0] < s[0]
      ? (e = 1)
      : i[0] > s[0]
        ? (e = -1)
        : i[0] === s[0] &&
          i.length >= 2 &&
          s.length >= 2 &&
          (i[1] < s[1]
            ? (e = 1)
            : i[1] > s[1]
              ? (e = -1)
              : i[1] === s[1] &&
                (i.length >= 3 && s.length >= 3
                  ? i[2] < s[2]
                    ? (e = 1)
                    : i[2] > s[2] && (e = -1)
                  : s.length >= 3 && (e = 1))),
    e
  );
}
function tl(t) {
  const e = [
    {
      key: "Mac15,12",
      name: "MacBook Air",
      size: "13-inch",
      processor: "M3",
      year: "2024",
      additional: "",
    },
    {
      key: "Mac14,15",
      name: "MacBook Air",
      size: "15-inch",
      processor: "M2",
      year: "2024",
      additional: "",
    },
    {
      key: "Mac14,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "M2",
      year: "2022",
      additional: "",
    },
    {
      key: "MacBookAir10,1",
      name: "MacBook Air",
      size: "13-inch",
      processor: "M1",
      year: "2020",
      additional: "",
    },
    {
      key: "MacBookAir9,1",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "2020",
      additional: "",
    },
    {
      key: "MacBookAir8,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "2019",
      additional: "",
    },
    {
      key: "MacBookAir8,1",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "2018",
      additional: "",
    },
    {
      key: "MacBookAir7,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "2017",
      additional: "",
    },
    {
      key: "MacBookAir7,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Early 2015",
      additional: "",
    },
    {
      key: "MacBookAir7,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Early 2015",
      additional: "",
    },
    {
      key: "MacBookAir6,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Early 2014",
      additional: "",
    },
    {
      key: "MacBookAir6,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Early 2014",
      additional: "",
    },
    {
      key: "MacBookAir6,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Mid 2013",
      additional: "",
    },
    {
      key: "MacBookAir6,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Mid 2013",
      additional: "",
    },
    {
      key: "MacBookAir5,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Mid 2012",
      additional: "",
    },
    {
      key: "MacBookAir5,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Mid 2012",
      additional: "",
    },
    {
      key: "MacBookAir4,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Mid 2011",
      additional: "",
    },
    {
      key: "MacBookAir4,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Mid 2011",
      additional: "",
    },
    {
      key: "MacBookAir3,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Late 2010",
      additional: "",
    },
    {
      key: "MacBookAir3,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Late 2010",
      additional: "",
    },
    {
      key: "MacBookAir2,1",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Mid 2009",
      additional: "",
    },
    {
      key: "Mac16,1",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M4",
      year: "2024",
      additional: "",
    },
    {
      key: "Mac16,6",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M4 Pro",
      year: "2024",
      additional: "",
    },
    {
      key: "Mac16,8",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M4 Max",
      year: "2024",
      additional: "",
    },
    {
      key: "Mac16,5",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M4 Pro",
      year: "2024",
      additional: "",
    },
    {
      key: "Mac16,6",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M4 Max",
      year: "2024",
      additional: "",
    },
    {
      key: "Mac15,3",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M3",
      year: "Nov 2023",
      additional: "",
    },
    {
      key: "Mac15,6",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M3 Pro",
      year: "Nov 2023",
      additional: "",
    },
    {
      key: "Mac15,8",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M3 Pro",
      year: "Nov 2023",
      additional: "",
    },
    {
      key: "Mac15,10",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M3 Max",
      year: "Nov 2023",
      additional: "",
    },
    {
      key: "Mac15,7",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M3 Pro",
      year: "Nov 2023",
      additional: "",
    },
    {
      key: "Mac15,9",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M3 Pro",
      year: "Nov 2023",
      additional: "",
    },
    {
      key: "Mac15,11",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M3 Max",
      year: "Nov 2023",
      additional: "",
    },
    {
      key: "Mac14,5",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M2 Max",
      year: "2023",
      additional: "",
    },
    {
      key: "Mac14,9",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M2 Max",
      year: "2023",
      additional: "",
    },
    {
      key: "Mac14,6",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M2 Max",
      year: "2023",
      additional: "",
    },
    {
      key: "Mac14,10",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M2 Max",
      year: "2023",
      additional: "",
    },
    {
      key: "Mac14,7",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "M2",
      year: "2022",
      additional: "",
    },
    {
      key: "MacBookPro18,3",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M1 Pro",
      year: "2021",
      additional: "",
    },
    {
      key: "MacBookPro18,4",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M1 Max",
      year: "2021",
      additional: "",
    },
    {
      key: "MacBookPro18,1",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M1 Pro",
      year: "2021",
      additional: "",
    },
    {
      key: "MacBookPro18,2",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M1 Max",
      year: "2021",
      additional: "",
    },
    {
      key: "MacBookPro17,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "M1",
      year: "2020",
      additional: "",
    },
    {
      key: "MacBookPro16,3",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2020",
      additional: "Two Thunderbolt 3 ports",
    },
    {
      key: "MacBookPro16,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2020",
      additional: "Four Thunderbolt 3 ports",
    },
    {
      key: "MacBookPro16,1",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "",
      year: "2019",
      additional: "",
    },
    {
      key: "MacBookPro16,4",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "",
      year: "2019",
      additional: "",
    },
    {
      key: "MacBookPro15,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2019",
      additional: "",
    },
    {
      key: "MacBookPro15,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2019",
      additional: "",
    },
    {
      key: "MacBookPro15,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2019",
      additional: "",
    },
    {
      key: "MacBookPro15,4",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2019",
      additional: "Two Thunderbolt 3 ports",
    },
    {
      key: "MacBookPro15,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2018",
      additional: "",
    },
    {
      key: "MacBookPro15,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2018",
      additional: "Four Thunderbolt 3 ports",
    },
    {
      key: "MacBookPro14,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2017",
      additional: "Two Thunderbolt 3 ports",
    },
    {
      key: "MacBookPro14,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2017",
      additional: "Four Thunderbolt 3 ports",
    },
    {
      key: "MacBookPro14,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2017",
      additional: "",
    },
    {
      key: "MacBookPro13,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2016",
      additional: "Two Thunderbolt 3 ports",
    },
    {
      key: "MacBookPro13,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2016",
      additional: "Four Thunderbolt 3 ports",
    },
    {
      key: "MacBookPro13,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2016",
      additional: "",
    },
    {
      key: "MacBookPro11,4",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2015",
      additional: "",
    },
    {
      key: "MacBookPro11,5",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2015",
      additional: "",
    },
    {
      key: "MacBookPro12,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Early 2015",
      additional: "",
    },
    {
      key: "MacBookPro11,2",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Late 2013",
      additional: "",
    },
    {
      key: "MacBookPro11,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Late 2013",
      additional: "",
    },
    {
      key: "MacBookPro11,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Late 2013",
      additional: "",
    },
    {
      key: "MacBookPro10,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2012",
      additional: "",
    },
    {
      key: "MacBookPro10,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Late 2012",
      additional: "",
    },
    {
      key: "MacBookPro9,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2012",
      additional: "",
    },
    {
      key: "MacBookPro9,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Mid 2012",
      additional: "",
    },
    {
      key: "MacBookPro8,3",
      name: "MacBook Pro",
      size: "17-inch",
      processor: "",
      year: "Early 2011",
      additional: "",
    },
    {
      key: "MacBookPro8,2",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Early 2011",
      additional: "",
    },
    {
      key: "MacBookPro8,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Early 2011",
      additional: "",
    },
    {
      key: "MacBookPro6,1",
      name: "MacBook Pro",
      size: "17-inch",
      processor: "",
      year: "Mid 2010",
      additional: "",
    },
    {
      key: "MacBookPro6,2",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2010",
      additional: "",
    },
    {
      key: "MacBookPro7,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Mid 2010",
      additional: "",
    },
    {
      key: "MacBookPro5,2",
      name: "MacBook Pro",
      size: "17-inch",
      processor: "",
      year: "Early 2009",
      additional: "",
    },
    {
      key: "MacBookPro5,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2009",
      additional: "",
    },
    {
      key: "MacBookPro5,5",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Mid 2009",
      additional: "",
    },
    {
      key: "MacBookPro5,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Late 2008",
      additional: "",
    },
    {
      key: "MacBookPro4,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Early 2008",
      additional: "",
    },
    {
      key: "MacBook10,1",
      name: "MacBook",
      size: "12-inch",
      processor: "",
      year: "2017",
      additional: "",
    },
    {
      key: "MacBook9,1",
      name: "MacBook",
      size: "12-inch",
      processor: "",
      year: "Early 2016",
      additional: "",
    },
    {
      key: "MacBook8,1",
      name: "MacBook",
      size: "12-inch",
      processor: "",
      year: "Early 2015",
      additional: "",
    },
    {
      key: "MacBook7,1",
      name: "MacBook",
      size: "13-inch",
      processor: "",
      year: "Mid 2010",
      additional: "",
    },
    {
      key: "MacBook6,1",
      name: "MacBook",
      size: "13-inch",
      processor: "",
      year: "Late 2009",
      additional: "",
    },
    {
      key: "MacBook5,2",
      name: "MacBook",
      size: "13-inch",
      processor: "",
      year: "Early 2009",
      additional: "",
    },
    {
      key: "Mac14,13",
      name: "Mac Studio",
      size: "",
      processor: "",
      year: "2023",
      additional: "",
    },
    {
      key: "Mac14,14",
      name: "Mac Studio",
      size: "",
      processor: "",
      year: "2023",
      additional: "",
    },
    {
      key: "Mac13,1",
      name: "Mac Studio",
      size: "",
      processor: "",
      year: "2022",
      additional: "",
    },
    {
      key: "Mac13,2",
      name: "Mac Studio",
      size: "",
      processor: "",
      year: "2022",
      additional: "",
    },
    {
      key: "Mac16,11",
      name: "Mac mini",
      size: "",
      processor: "M4 Pro",
      year: "2024",
      additional: "",
    },
    {
      key: "Mac16,10",
      name: "Mac mini",
      size: "",
      processor: "M4",
      year: "2024",
      additional: "",
    },
    {
      key: "Mac14,3",
      name: "Mac mini",
      size: "",
      processor: "M2",
      year: "2023",
      additional: "",
    },
    {
      key: "Mac14,12",
      name: "Mac mini",
      size: "",
      processor: "M2 Pro",
      year: "2023",
      additional: "",
    },
    {
      key: "Macmini9,1",
      name: "Mac mini",
      size: "",
      processor: "M1",
      year: "2020",
      additional: "",
    },
    {
      key: "Macmini8,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Late 2018",
      additional: "",
    },
    {
      key: "Macmini7,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Late 2014",
      additional: "",
    },
    {
      key: "Macmini6,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Late 2012",
      additional: "",
    },
    {
      key: "Macmini6,2",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Late 2012",
      additional: "",
    },
    {
      key: "Macmini5,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Mid 2011",
      additional: "",
    },
    {
      key: "Macmini5,2",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Mid 2011",
      additional: "",
    },
    {
      key: "Macmini4,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Mid 2010",
      additional: "",
    },
    {
      key: "Macmini3,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Early 2009",
      additional: "",
    },
    {
      key: "Mac16,3",
      name: "iMac",
      size: "24-inch",
      processor: "M4",
      year: "2024",
      additional: "Four ports",
    },
    {
      key: "Mac16,2",
      name: "iMac",
      size: "24-inch",
      processor: "M4",
      year: "2024",
      additional: "Two ports",
    },
    {
      key: "Mac15,5",
      name: "iMac",
      size: "24-inch",
      processor: "M3",
      year: "2023",
      additional: "Four ports",
    },
    {
      key: "Mac15,4",
      name: "iMac",
      size: "24-inch",
      processor: "M3",
      year: "2023",
      additional: "Two ports",
    },
    {
      key: "iMac21,1",
      name: "iMac",
      size: "24-inch",
      processor: "M1",
      year: "2021",
      additional: "",
    },
    {
      key: "iMac21,2",
      name: "iMac",
      size: "24-inch",
      processor: "M1",
      year: "2021",
      additional: "",
    },
    {
      key: "iMac20,1",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "2020",
      additional: "Retina 5K",
    },
    {
      key: "iMac20,2",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "2020",
      additional: "Retina 5K",
    },
    {
      key: "iMac19,1",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "2019",
      additional: "Retina 5K",
    },
    {
      key: "iMac19,2",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "2019",
      additional: "Retina 4K",
    },
    {
      key: "iMacPro1,1",
      name: "iMac Pro",
      size: "",
      processor: "",
      year: "2017",
      additional: "",
    },
    {
      key: "iMac18,3",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "2017",
      additional: "Retina 5K",
    },
    {
      key: "iMac18,2",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "2017",
      additional: "Retina 4K",
    },
    {
      key: "iMac18,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "2017",
      additional: "",
    },
    {
      key: "iMac17,1",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Late 2015",
      additional: "Retina 5K",
    },
    {
      key: "iMac16,2",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2015",
      additional: "Retina 4K",
    },
    {
      key: "iMac16,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2015",
      additional: "",
    },
    {
      key: "iMac15,1",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Late 2014",
      additional: "Retina 5K",
    },
    {
      key: "iMac14,4",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Mid 2014",
      additional: "",
    },
    {
      key: "iMac14,2",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Late 2013",
      additional: "",
    },
    {
      key: "iMac14,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2013",
      additional: "",
    },
    {
      key: "iMac13,2",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Late 2012",
      additional: "",
    },
    {
      key: "iMac13,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2012",
      additional: "",
    },
    {
      key: "iMac12,2",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Mid 2011",
      additional: "",
    },
    {
      key: "iMac12,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Mid 2011",
      additional: "",
    },
    {
      key: "iMac11,3",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Mid 2010",
      additional: "",
    },
    {
      key: "iMac11,2",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Mid 2010",
      additional: "",
    },
    {
      key: "iMac10,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2009",
      additional: "",
    },
    {
      key: "iMac9,1",
      name: "iMac",
      size: "20-inch",
      processor: "",
      year: "Early 2009",
      additional: "",
    },
    {
      key: "Mac14,8",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "2023",
      additional: "",
    },
    {
      key: "Mac14,8",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "2023",
      additional: "Rack",
    },
    {
      key: "MacPro7,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "2019",
      additional: "",
    },
    {
      key: "MacPro7,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "2019",
      additional: "Rack",
    },
    {
      key: "MacPro6,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "Late 2013",
      additional: "",
    },
    {
      key: "MacPro5,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "Mid 2012",
      additional: "",
    },
    {
      key: "MacPro5,1",
      name: "Mac Pro Server",
      size: "",
      processor: "",
      year: "Mid 2012",
      additional: "Server",
    },
    {
      key: "MacPro5,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "Mid 2010",
      additional: "",
    },
    {
      key: "MacPro5,1",
      name: "Mac Pro Server",
      size: "",
      processor: "",
      year: "Mid 2010",
      additional: "Server",
    },
    {
      key: "MacPro4,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "Early 2009",
      additional: "",
    },
  ].filter((s) => s.key === t);
  if (e.length === 0)
    return {
      key: t,
      model: "Apple",
      version: "Unknown",
    };
  const i = [];
  return (
    e[0].size && i.push(e[0].size),
    e[0].processor && i.push(e[0].processor),
    e[0].year && i.push(e[0].year),
    e[0].additional && i.push(e[0].additional),
    {
      key: t,
      model: e[0].name,
      version: e[0].name + " (" + i.join(", ") + ")",
    }
  );
}
function nl(t, n = 5e3) {
  const e =
      t.startsWith("https:") ||
      t.indexOf(":443/") > 0 ||
      t.indexOf(":8443/") > 0
        ? ra
        : sa,
    i = Date.now();
  return new Promise((s) => {
    const r = e
      .get(t, function (o) {
        (o.on("data", () => {}),
          o.on("end", () => {
            s({
              url: t,
              statusCode: o.statusCode,
              message: o.statusMessage,
              time: Date.now() - i,
            });
          }));
      })
      .on("error", function (o) {
        s({
          url: t,
          statusCode: 404,
          message: o.message,
          time: Date.now() - i,
        });
      })
      .setTimeout(n, () => {
        (r.destroy(),
          s({
            url: t,
            statusCode: 408,
            message: "Request Timeout",
            time: Date.now() - i,
          }));
      });
  });
}
function il(t) {
  return t.replace(/To Be Filled By O.E.M./g, "");
}
function rl() {}
V.toInt = ga;
V.splitByNumber = ya;
V.execOptsWin = $n;
V.execOptsLinux = yi;
V.getCodepage = Va;
V.execWin = Fa;
V.isFunction = xa;
V.unique = Sa;
V.sortByKey = wa;
V.cores = Ca;
V.getValue = at;
V.decodeEscapeSequence = La;
V.parseDateTime = _a;
V.parseHead = Oa;
V.findObjectByKey = Pa;
V.getWmic = Ks;
V.wmic = Ma;
V.darwinXcodeExists = Wa;
V.getVboxmanage = Aa;
V.powerShell = Xs;
V.powerShellStart = Ta;
V.powerShellRelease = Da;
V.execSafe = ba;
V.nanoSeconds = Ra;
V.countUniqueLines = Ga;
V.countLines = $a;
V.noop = rl;
V.isRaspberry = Ba;
V.isRaspbian = ka;
V.sanitizeShellString = za;
V.isPrototypePolluted = Ua;
V.decodePiCpuinfo = qs;
V.getRpiGpu = Ka;
V.promiseAll = Xa;
V.promisify = qa;
V.promisifySave = Ya;
V.smartMonToolsInstalled = Na;
V.linuxVersion = Ja;
V.plistParser = Qa;
V.plistReader = Za;
V.stringObj = ii;
V.stringReplace = rr;
V.stringToLower = sr;
V.stringToString = Gs;
V.stringSubstr = $s;
V.stringSubstring = zs;
V.stringTrim = Us;
V.stringStartWith = Hs;
V.mathMin = js;
V.WINDIR = mr;
V.getFilesInPath = ja;
V.semverCompare = el;
V.getAppleModel = tl;
V.checkWebsite = nl;
V.cleanString = il;
V.getPowershell = Ea;
var zn = {},
  Ht = {};
const We = Pe,
  Te = Ae,
  G = V,
  z = se.exec,
  Mn = se.execSync;
let Ue = process.platform;
const gn = Ue === "linux" || Ue === "android",
  De = Ue === "darwin",
  be = Ue === "win32",
  gr = Ue === "freebsd",
  yr = Ue === "openbsd",
  xr = Ue === "netbsd",
  sl = Ue === "sunos";
function ol() {
  let t = /* @__PURE__ */ new Date().toString().split(" "),
    n = "";
  try {
    n = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    n =
      t.length >= 7
        ? t.slice(6).join(" ").replace(/\(/g, "").replace(/\)/g, "")
        : "";
  }
  const e = {
    current: Date.now(),
    uptime: We.uptime(),
    timezone: t.length >= 7 ? t[5] : "",
    timezoneName: n,
  };
  if (De || gn)
    try {
      const s = Mn(
        "date +%Z && date +%z && ls -l /etc/localtime 2>/dev/null",
        G.execOptsLinux,
      )
        .toString()
        .split(We.EOL);
      s.length > 3 && !s[0] && s.shift();
      let r = s[0] || "";
      return (
        (r.startsWith("+") || r.startsWith("-")) && (r = "GMT"),
        {
          current: Date.now(),
          uptime: We.uptime(),
          timezone: s[1] ? r + s[1] : r,
          timezoneName:
            (s[2] &&
              s[2].indexOf("/zoneinfo/") > 0 &&
              s[2].split("/zoneinfo/")[1]) ||
            "",
        }
      );
    } catch {
      G.noop();
    }
  return e;
}
Ht.time = ol;
function Ln(t) {
  ((t = t || ""), (t = t.toLowerCase()));
  let n = Ue;
  return (
    be
      ? (n = "windows")
      : t.indexOf("mac os") !== -1 || t.indexOf("macos") !== -1
        ? (n = "apple")
        : t.indexOf("arch") !== -1
          ? (n = "arch")
          : t.indexOf("cachy") !== -1
            ? (n = "cachy")
            : t.indexOf("centos") !== -1
              ? (n = "centos")
              : t.indexOf("coreos") !== -1
                ? (n = "coreos")
                : t.indexOf("debian") !== -1
                  ? (n = "debian")
                  : t.indexOf("deepin") !== -1
                    ? (n = "deepin")
                    : t.indexOf("elementary") !== -1
                      ? (n = "elementary")
                      : t.indexOf("endeavour") !== -1
                        ? (n = "endeavour")
                        : t.indexOf("fedora") !== -1
                          ? (n = "fedora")
                          : t.indexOf("gentoo") !== -1
                            ? (n = "gentoo")
                            : t.indexOf("mageia") !== -1
                              ? (n = "mageia")
                              : t.indexOf("mandriva") !== -1
                                ? (n = "mandriva")
                                : t.indexOf("manjaro") !== -1
                                  ? (n = "manjaro")
                                  : t.indexOf("mint") !== -1
                                    ? (n = "mint")
                                    : t.indexOf("mx") !== -1
                                      ? (n = "mx")
                                      : t.indexOf("openbsd") !== -1
                                        ? (n = "openbsd")
                                        : t.indexOf("freebsd") !== -1
                                          ? (n = "freebsd")
                                          : t.indexOf("opensuse") !== -1
                                            ? (n = "opensuse")
                                            : t.indexOf("pclinuxos") !== -1
                                              ? (n = "pclinuxos")
                                              : t.indexOf("puppy") !== -1
                                                ? (n = "puppy")
                                                : t.indexOf("popos") !== -1
                                                  ? (n = "popos")
                                                  : t.indexOf("raspbian") !== -1
                                                    ? (n = "raspbian")
                                                    : t.indexOf("reactos") !==
                                                        -1
                                                      ? (n = "reactos")
                                                      : t.indexOf("redhat") !==
                                                          -1
                                                        ? (n = "redhat")
                                                        : t.indexOf(
                                                              "slackware",
                                                            ) !== -1
                                                          ? (n = "slackware")
                                                          : t.indexOf(
                                                                "sugar",
                                                              ) !== -1
                                                            ? (n = "sugar")
                                                            : t.indexOf(
                                                                  "steam",
                                                                ) !== -1
                                                              ? (n = "steam")
                                                              : t.indexOf(
                                                                    "suse",
                                                                  ) !== -1
                                                                ? (n = "suse")
                                                                : t.indexOf(
                                                                      "mate",
                                                                    ) !== -1
                                                                  ? (n =
                                                                      "ubuntu-mate")
                                                                  : t.indexOf(
                                                                        "lubuntu",
                                                                      ) !== -1
                                                                    ? (n =
                                                                        "lubuntu")
                                                                    : t.indexOf(
                                                                          "xubuntu",
                                                                        ) !== -1
                                                                      ? (n =
                                                                          "xubuntu")
                                                                      : t.indexOf(
                                                                            "ubuntu",
                                                                          ) !==
                                                                          -1
                                                                        ? (n =
                                                                            "ubuntu")
                                                                        : t.indexOf(
                                                                              "solaris",
                                                                            ) !==
                                                                            -1
                                                                          ? (n =
                                                                              "solaris")
                                                                          : t.indexOf(
                                                                                "tails",
                                                                              ) !==
                                                                              -1
                                                                            ? (n =
                                                                                "tails")
                                                                            : t.indexOf(
                                                                                  "feren",
                                                                                ) !==
                                                                                -1
                                                                              ? (n =
                                                                                  "ferenos")
                                                                              : t.indexOf(
                                                                                    "robolinux",
                                                                                  ) !==
                                                                                  -1
                                                                                ? (n =
                                                                                    "robolinux")
                                                                                : gn &&
                                                                                  t &&
                                                                                  (n =
                                                                                    t
                                                                                      .toLowerCase()
                                                                                      .trim()
                                                                                      .replace(
                                                                                        /\s+/g,
                                                                                        "-",
                                                                                      )),
    n
  );
}
function al() {
  let t = We.hostname;
  if (gn || De)
    try {
      t = Mn("hostname -f 2>/dev/null", G.execOptsLinux)
        .toString()
        .split(We.EOL)[0];
    } catch {
      G.noop();
    }
  if (gr || yr || xr)
    try {
      t = Mn("hostname 2>/dev/null").toString().split(We.EOL)[0];
    } catch {
      G.noop();
    }
  if (be)
    try {
      t = Mn("echo %COMPUTERNAME%.%USERDNSDOMAIN%", G.execOptsWin)
        .toString()
        .replace(".%USERDNSDOMAIN%", "")
        .split(We.EOL)[0];
    } catch {
      G.noop();
    }
  return t;
}
function ll(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        platform: Ue === "win32" ? "Windows" : Ue,
        distro: "unknown",
        release: "unknown",
        codename: "",
        kernel: We.release(),
        arch: We.arch(),
        hostname: We.hostname(),
        fqdn: al(),
        codepage: "",
        logofile: "",
        serial: "",
        build: "",
        servicepack: "",
        uefi: !1,
      };
      if (
        (gn &&
          z(
            "cat /etc/*-release; cat /usr/lib/os-release; cat /etc/openwrt_release",
            function (i, s) {
              let r = {};
              (s
                .toString()
                .split(
                  `
`,
                )
                .forEach(function (l) {
                  l.indexOf("=") !== -1 &&
                    (r[l.split("=")[0].trim().toUpperCase()] = l
                      .split("=")[1]
                      .trim());
                }),
                (e.distro = (r.DISTRIB_ID || r.NAME || "unknown").replace(
                  /"/g,
                  "",
                )),
                (e.logofile = Ln(e.distro)));
              let a = (r.VERSION || "").replace(/"/g, ""),
                c = (r.DISTRIB_CODENAME || r.VERSION_CODENAME || "").replace(
                  /"/g,
                  "",
                );
              const u = (r.PRETTY_NAME || "").replace(/"/g, "");
              (u.indexOf(e.distro + " ") === 0 &&
                (a = u.replace(e.distro + " ", "").trim()),
                a.indexOf("(") >= 0 &&
                  ((c = a.split("(")[1].replace(/[()]/g, "").trim()),
                  (a = a.split("(")[0].trim())),
                (e.release = (
                  a ||
                  r.DISTRIB_RELEASE ||
                  r.VERSION_ID ||
                  "unknown"
                ).replace(/"/g, "")),
                (e.codename = c),
                (e.codepage = G.getCodepage()),
                (e.build = (r.BUILD_ID || "").replace(/"/g, "").trim()),
                cl().then((l) => {
                  ((e.uefi = l),
                    Ys().then((f) => {
                      ((e.serial = f.os), t && t(e), n(e));
                    }));
                }));
            },
          ),
        (gr || yr || xr) &&
          z(
            "sysctl kern.ostype kern.osrelease kern.osrevision kern.hostuuid machdep.bootmethod kern.geom.confxml",
            function (i, s) {
              let r = s.toString().split(`
`);
              const o = G.getValue(r, "kern.ostype"),
                a = Ln(o),
                c = G.getValue(r, "kern.osrelease").split("-")[0],
                u = G.getValue(r, "kern.uuid"),
                l = G.getValue(r, "machdep.bootmethod"),
                f = s.toString().indexOf("<type>efi</type>") >= 0,
                p = l ? l.toLowerCase().indexOf("uefi") >= 0 : f || null;
              ((e.distro = o || e.distro),
                (e.logofile = a || e.logofile),
                (e.release = c || e.release),
                (e.serial = u || e.serial),
                (e.codename = ""),
                (e.codepage = G.getCodepage()),
                (e.uefi = p || null),
                t && t(e),
                n(e));
            },
          ),
        De &&
          z(
            "sw_vers; sysctl kern.ostype kern.osrelease kern.osrevision kern.uuid",
            function (i, s) {
              let r = s.toString().split(`
`);
              ((e.serial = G.getValue(r, "kern.uuid")),
                (e.distro = G.getValue(r, "ProductName")),
                (e.release = (
                  G.getValue(r, "ProductVersion", ":", !0, !0) +
                  " " +
                  G.getValue(r, "ProductVersionExtra", ":", !0, !0)
                ).trim()),
                (e.build = G.getValue(r, "BuildVersion")),
                (e.logofile = Ln(e.distro)),
                (e.codename = "macOS"),
                (e.codename =
                  e.release.indexOf("10.4") > -1 ? "OS X Tiger" : e.codename),
                (e.codename =
                  e.release.indexOf("10.5") > -1 ? "OS X Leopard" : e.codename),
                (e.codename =
                  e.release.indexOf("10.6") > -1
                    ? "OS X Snow Leopard"
                    : e.codename),
                (e.codename =
                  e.release.indexOf("10.7") > -1 ? "OS X Lion" : e.codename),
                (e.codename =
                  e.release.indexOf("10.8") > -1
                    ? "OS X Mountain Lion"
                    : e.codename),
                (e.codename =
                  e.release.indexOf("10.9") > -1
                    ? "OS X Mavericks"
                    : e.codename),
                (e.codename =
                  e.release.indexOf("10.10") > -1
                    ? "OS X Yosemite"
                    : e.codename),
                (e.codename =
                  e.release.indexOf("10.11") > -1
                    ? "OS X El Capitan"
                    : e.codename),
                (e.codename =
                  e.release.indexOf("10.12") > -1 ? "Sierra" : e.codename),
                (e.codename =
                  e.release.indexOf("10.13") > -1 ? "High Sierra" : e.codename),
                (e.codename =
                  e.release.indexOf("10.14") > -1 ? "Mojave" : e.codename),
                (e.codename =
                  e.release.indexOf("10.15") > -1 ? "Catalina" : e.codename),
                (e.codename = e.release.startsWith("11.")
                  ? "Big Sur"
                  : e.codename),
                (e.codename = e.release.startsWith("12.")
                  ? "Monterey"
                  : e.codename),
                (e.codename = e.release.startsWith("13.")
                  ? "Ventura"
                  : e.codename),
                (e.codename = e.release.startsWith("14.")
                  ? "Sonoma"
                  : e.codename),
                (e.codename = e.release.startsWith("15.")
                  ? "Sequoia"
                  : e.codename),
                (e.codename = e.release.startsWith("16.")
                  ? "Tahoe"
                  : e.codename),
                (e.codename = e.release.startsWith("26.")
                  ? "Tahoe"
                  : e.codename),
                (e.uefi = !0),
                (e.codepage = G.getCodepage()),
                t && t(e),
                n(e));
            },
          ),
        sl &&
          ((e.release = e.kernel),
          z("uname -o", function (i, s) {
            let r = s.toString().split(`
`);
            ((e.distro = r[0]), (e.logofile = Ln(e.distro)), t && t(e), n(e));
          })),
        be)
      ) {
        ((e.logofile = Ln()), (e.release = e.kernel));
        try {
          const i = [];
          (i.push(
            G.powerShell(
              "Get-CimInstance Win32_OperatingSystem | select Caption,SerialNumber,BuildNumber,ServicePackMajorVersion,ServicePackMinorVersion | fl",
            ),
          ),
            i.push(
              G.powerShell(
                "(Get-CimInstance Win32_ComputerSystem).HypervisorPresent",
              ),
            ),
            i.push(
              G.powerShell(
                "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SystemInformation]::TerminalServerSession",
              ),
            ),
            G.promiseAll(i).then((s) => {
              let r = s.results[0]
                ? s.results[0].toString().split(`\r
`)
                : [""];
              ((e.distro = G.getValue(r, "Caption", ":").trim()),
                (e.serial = G.getValue(r, "SerialNumber", ":").trim()),
                (e.build = G.getValue(r, "BuildNumber", ":").trim()),
                (e.servicepack =
                  G.getValue(r, "ServicePackMajorVersion", ":").trim() +
                  "." +
                  G.getValue(r, "ServicePackMinorVersion", ":").trim()),
                (e.codepage = G.getCodepage()));
              const o = s.results[1]
                ? s.results[1].toString().toLowerCase()
                : "";
              e.hypervisor = o.indexOf("true") !== -1;
              const a = s.results[2] ? s.results[2].toString() : "";
              ((e.remoteSession =
                a.toString().toLowerCase().indexOf("true") >= 0),
                ul().then((c) => {
                  ((e.uefi = c), t && t(e), n(e));
                }));
            }));
        } catch {
          (t && t(e), n(e));
        }
      }
    });
  });
}
Ht.osInfo = ll;
function cl() {
  return new Promise((t) => {
    process.nextTick(() => {
      Te.stat("/sys/firmware/efi", function (n) {
        if (n)
          z('dmesg | grep -E "EFI v"', function (e, i) {
            if (!e) {
              const s = i.toString().split(`
`);
              return t(s.length > 0);
            }
            return t(!1);
          });
        else return t(!0);
      });
    });
  });
}
function ul() {
  return new Promise((t) => {
    process.nextTick(() => {
      try {
        z(
          'findstr /C:"Detected boot environment" "%windir%\\Panther\\setupact.log"',
          G.execOptsWin,
          function (n, e) {
            if (n)
              z("echo %firmware_type%", G.execOptsWin, function (i, s) {
                if (i) return t(!1);
                {
                  const r = s.toString() || "";
                  return t(r.toLowerCase().indexOf("efi") >= 0);
                }
              });
            else {
              const i = e.toString().split(`
\r`)[0];
              return t(i.toLowerCase().indexOf("efi") >= 0);
            }
          },
        );
      } catch {
        return t(!1);
      }
    });
  });
}
function pl(t, n) {
  let e = {
    kernel: We.release(),
    apache: "",
    bash: "",
    bun: "",
    deno: "",
    docker: "",
    dotnet: "",
    fish: "",
    gcc: "",
    git: "",
    grunt: "",
    gulp: "",
    homebrew: "",
    java: "",
    mongodb: "",
    mysql: "",
    nginx: "",
    node: "",
    //process.versions.node,
    npm: "",
    openssl: "",
    perl: "",
    php: "",
    pip3: "",
    pip: "",
    pm2: "",
    postfix: "",
    postgresql: "",
    powershell: "",
    python3: "",
    python: "",
    redis: "",
    systemOpenssl: "",
    systemOpensslLib: "",
    tsc: "",
    v8: process.versions.v8,
    virtualbox: "",
    yarn: "",
    zsh: "",
  };
  function i(s) {
    if (s === "*")
      return {
        versions: e,
        counter: 34,
      };
    if (!Array.isArray(s)) {
      ((s = s.trim().toLowerCase().replace(/,+/g, "|").replace(/ /g, "|")),
        (s = s.split("|")));
      const r = {
        versions: {},
        counter: 0,
      };
      return (
        s.forEach((o) => {
          if (o)
            for (let a in e)
              ({}).hasOwnProperty.call(e, a) &&
                a.toLowerCase() === o.toLowerCase() &&
                !{}.hasOwnProperty.call(r.versions, a) &&
                ((r.versions[a] = e[a]),
                a === "openssl" &&
                  ((r.versions.systemOpenssl = ""),
                  (r.versions.systemOpensslLib = "")),
                r.versions[a] || r.counter++);
        }),
        r
      );
    }
  }
  return new Promise((s) => {
    process.nextTick(() => {
      if (G.isFunction(t) && !n) ((n = t), (t = "*"));
      else if (((t = t || "*"), typeof t != "string"))
        return (n && n({}), s({}));
      const r = i(t);
      let o = r.counter,
        a = /* @__PURE__ */ (function () {
          return function () {
            --o === 0 && (n && n(r.versions), s(r.versions));
          };
        })(),
        c = "";
      try {
        if (
          ({}.hasOwnProperty.call(r.versions, "openssl") &&
            ((r.versions.openssl = process.versions.openssl),
            z("openssl version", function (u, l) {
              if (!u) {
                let p = l
                  .toString()
                  .split(
                    `
`,
                  )[0]
                  .trim()
                  .split(" ");
                ((r.versions.systemOpenssl = p.length > 0 ? p[1] : p[0]),
                  (r.versions.systemOpensslLib =
                    p.length > 0 ? p[0] : "openssl"));
              }
              a();
            })),
          {}.hasOwnProperty.call(r.versions, "npm") &&
            z("npm -v", function (u, l) {
              (u ||
                (r.versions.npm = l.toString().split(`
`)[0]),
                a());
            }),
          {}.hasOwnProperty.call(r.versions, "pm2") &&
            ((c = "pm2"),
            be && (c += ".cmd"),
            z(`${c} -v`, function (u, l) {
              if (!u) {
                let f = l
                  .toString()
                  .split(
                    `
`,
                  )[0]
                  .trim();
                f.startsWith("[PM2]") || (r.versions.pm2 = f);
              }
              a();
            })),
          {}.hasOwnProperty.call(r.versions, "yarn") &&
            z("yarn --version", function (u, l) {
              (u ||
                (r.versions.yarn = l.toString().split(`
`)[0]),
                a());
            }),
          {}.hasOwnProperty.call(r.versions, "gulp") &&
            ((c = "gulp"),
            be && (c += ".cmd"),
            z(`${c} --version`, function (u, l) {
              if (!u) {
                const f =
                  l.toString().split(`
`)[0] || "";
                r.versions.gulp = (
                  f.toLowerCase().split("version")[1] || ""
                ).trim();
              }
              a();
            })),
          {}.hasOwnProperty.call(r.versions, "homebrew") &&
            ((c = "brew"),
            z(`${c} --version`, function (u, l) {
              if (!u) {
                const f =
                  l.toString().split(`
`)[0] || "";
                r.versions.homebrew = (
                  f.toLowerCase().split(" ")[1] || ""
                ).trim();
              }
              a();
            })),
          {}.hasOwnProperty.call(r.versions, "tsc") &&
            ((c = "tsc"),
            be && (c += ".cmd"),
            z(`${c} --version`, function (u, l) {
              if (!u) {
                const f =
                  l.toString().split(`
`)[0] || "";
                r.versions.tsc = (
                  f.toLowerCase().split("version")[1] || ""
                ).trim();
              }
              a();
            })),
          {}.hasOwnProperty.call(r.versions, "grunt") &&
            ((c = "grunt"),
            be && (c += ".cmd"),
            z(`${c} --version`, function (u, l) {
              if (!u) {
                const f =
                  l.toString().split(`
`)[0] || "";
                r.versions.grunt = (
                  f.toLowerCase().split("cli v")[1] || ""
                ).trim();
              }
              a();
            })),
          {}.hasOwnProperty.call(r.versions, "git"))
        )
          if (De) {
            const u =
              Te.existsSync("/usr/local/Cellar/git") ||
              Te.existsSync("/opt/homebrew/bin/git");
            G.darwinXcodeExists() || u
              ? z("git --version", function (l, f) {
                  if (!l) {
                    let p =
                      f.toString().split(`
`)[0] || "";
                    ((p = (p.toLowerCase().split("version")[1] || "").trim()),
                      (r.versions.git = (p.split(" ")[0] || "").trim()));
                  }
                  a();
                })
              : a();
          } else
            z("git --version", function (u, l) {
              if (!u) {
                let f =
                  l.toString().split(`
`)[0] || "";
                ((f = (f.toLowerCase().split("version")[1] || "").trim()),
                  (r.versions.git = (f.split(" ")[0] || "").trim()));
              }
              a();
            });
        if (
          ({}.hasOwnProperty.call(r.versions, "apache") &&
            z("apachectl -v 2>&1", function (u, l) {
              if (!u) {
                const f = (
                  l.toString().split(`
`)[0] || ""
                ).split(":");
                r.versions.apache =
                  f.length > 1
                    ? f[1]
                        .replace("Apache", "")
                        .replace("/", "")
                        .split("(")[0]
                        .trim()
                    : "";
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "nginx") &&
            z("nginx -v 2>&1", function (u, l) {
              if (!u) {
                const f =
                  l.toString().split(`
`)[0] || "";
                r.versions.nginx = (f.toLowerCase().split("/")[1] || "").trim();
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "mysql") &&
            z("mysql -V", function (u, l) {
              if (!u) {
                let f =
                  l.toString().split(`
`)[0] || "";
                if (((f = f.toLowerCase()), f.indexOf(",") > -1)) {
                  f = (f.split(",")[0] || "").trim();
                  const p = f.split(" ");
                  r.versions.mysql = (p[p.length - 1] || "").trim();
                } else
                  f.indexOf(" ver ") > -1 &&
                    ((f = f.split(" ver ")[1]),
                    (r.versions.mysql = f.split(" ")[0]));
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "php") &&
            z("php -v", function (u, l) {
              if (!u) {
                let p = (
                  l.toString().split(`
`)[0] || ""
                ).split("(");
                (p[0].indexOf("-") && (p = p[0].split("-")),
                  (r.versions.php = p[0].replace(/[^0-9.]/g, "")));
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "redis") &&
            z("redis-server --version", function (u, l) {
              if (!u) {
                const p = (
                  l.toString().split(`
`)[0] || ""
                ).split(" ");
                r.versions.redis = G.getValue(p, "v", "=", !0);
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "docker") &&
            z("docker --version", function (u, l) {
              if (!u) {
                const p = (
                  l.toString().split(`
`)[0] || ""
                ).split(" ");
                r.versions.docker =
                  p.length > 2 && p[2].endsWith(",") ? p[2].slice(0, -1) : "";
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "postfix") &&
            z("postconf -d | grep mail_version", function (u, l) {
              if (!u) {
                const f =
                  l.toString().split(`
`) || [];
                r.versions.postfix = G.getValue(f, "mail_version", "=", !0);
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "mongodb") &&
            z("mongod --version", function (u, l) {
              if (!u) {
                const f =
                  l.toString().split(`
`)[0] || "";
                r.versions.mongodb = (
                  f.toLowerCase().split(",")[0] || ""
                ).replace(/[^0-9.]/g, "");
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "postgresql") &&
            (gn
              ? z("locate bin/postgres", function (u, l) {
                  if (u)
                    z("psql -V", function (f, p) {
                      if (!f) {
                        const d =
                          p
                            .toString()
                            .split(
                              `
`,
                            )[0]
                            .split(" ") || [];
                        ((r.versions.postgresql = d.length
                          ? d[d.length - 1]
                          : ""),
                          (r.versions.postgresql =
                            r.versions.postgresql.split("-")[0]));
                      }
                      a();
                    });
                  else {
                    const f = l
                      .toString()
                      .split(
                        `
`,
                      )
                      .sort();
                    f.length
                      ? z(f[f.length - 1] + " -V", function (p, d) {
                          if (!p) {
                            const m =
                              d
                                .toString()
                                .split(
                                  `
`,
                                )[0]
                                .split(" ") || [];
                            r.versions.postgresql = m.length
                              ? m[m.length - 1]
                              : "";
                          }
                          a();
                        })
                      : a();
                  }
                })
              : be
                ? G.powerShell(
                    "Get-CimInstance Win32_Service | select caption | fl",
                  ).then((u) => {
                    (u.split(/\n\s*\n/).forEach((f) => {
                      if (f.trim() !== "") {
                        let p = f.trim().split(`\r
`),
                          d = G.getValue(p, "caption", ":", !0).toLowerCase();
                        if (d.indexOf("postgresql") > -1) {
                          const m = d.split(" server ");
                          m.length > 1 && (r.versions.postgresql = m[1]);
                        }
                      }
                    }),
                      a());
                  })
                : z("postgres -V", function (u, l) {
                    if (u)
                      z("pg_config --version", function (f, p) {
                        if (!f) {
                          const d =
                            p
                              .toString()
                              .split(
                                `
`,
                              )[0]
                              .split(" ") || [];
                          r.versions.postgresql = d.length
                            ? d[d.length - 1]
                            : "";
                        }
                      });
                    else {
                      const f =
                        l
                          .toString()
                          .split(
                            `
`,
                          )[0]
                          .split(" ") || [];
                      r.versions.postgresql = f.length ? f[f.length - 1] : "";
                    }
                    a();
                  })),
          {}.hasOwnProperty.call(r.versions, "perl") &&
            z("perl -v", function (u, l) {
              if (!u) {
                const f =
                  l.toString().split(`
`) || "";
                for (; f.length > 0 && f[0].trim() === ""; ) f.shift();
                f.length > 0 &&
                  (r.versions.perl = f[0]
                    .split("(")
                    .pop()
                    .split(")")[0]
                    .replace("v", ""));
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "python"))
        )
          if (De)
            try {
              const l = Mn("sw_vers").toString().split(`
`),
                f = G.getValue(l, "ProductVersion", ":"),
                p = Te.existsSync("/usr/local/Cellar/python"),
                d = Te.existsSync("/opt/homebrew/bin/python");
              (G.darwinXcodeExists() && G.semverCompare("12.0.1", f) < 0) ||
              p ||
              d
                ? z(
                    p
                      ? "/usr/local/Cellar/python -V 2>&1"
                      : d
                        ? "/opt/homebrew/bin/python -V 2>&1"
                        : "python -V 2>&1",
                    function (h, y) {
                      if (!h) {
                        const g =
                          y.toString().split(`
`)[0] || "";
                        r.versions.python = g
                          .toLowerCase()
                          .replace("python", "")
                          .trim();
                      }
                      a();
                    },
                  )
                : a();
            } catch {
              a();
            }
          else
            z("python -V 2>&1", function (u, l) {
              if (!u) {
                const f =
                  l.toString().split(`
`)[0] || "";
                r.versions.python = f
                  .toLowerCase()
                  .replace("python", "")
                  .trim();
              }
              a();
            });
        if ({}.hasOwnProperty.call(r.versions, "python3"))
          if (De) {
            const u =
              Te.existsSync("/usr/local/Cellar/python3") ||
              Te.existsSync("/opt/homebrew/bin/python3");
            G.darwinXcodeExists() || u
              ? z("python3 -V 2>&1", function (l, f) {
                  if (!l) {
                    const p =
                      f.toString().split(`
`)[0] || "";
                    r.versions.python3 = p
                      .toLowerCase()
                      .replace("python", "")
                      .trim();
                  }
                  a();
                })
              : a();
          } else
            z("python3 -V 2>&1", function (u, l) {
              if (!u) {
                const f =
                  l.toString().split(`
`)[0] || "";
                r.versions.python3 = f
                  .toLowerCase()
                  .replace("python", "")
                  .trim();
              }
              a();
            });
        if ({}.hasOwnProperty.call(r.versions, "pip"))
          if (De) {
            const u =
              Te.existsSync("/usr/local/Cellar/pip") ||
              Te.existsSync("/opt/homebrew/bin/pip");
            G.darwinXcodeExists() || u
              ? z("pip -V 2>&1", function (l, f) {
                  if (!l) {
                    const d = (
                      f.toString().split(`
`)[0] || ""
                    ).split(" ");
                    r.versions.pip = d.length >= 2 ? d[1] : "";
                  }
                  a();
                })
              : a();
          } else
            z("pip -V 2>&1", function (u, l) {
              if (!u) {
                const p = (
                  l.toString().split(`
`)[0] || ""
                ).split(" ");
                r.versions.pip = p.length >= 2 ? p[1] : "";
              }
              a();
            });
        if ({}.hasOwnProperty.call(r.versions, "pip3"))
          if (De) {
            const u =
              Te.existsSync("/usr/local/Cellar/pip3") ||
              Te.existsSync("/opt/homebrew/bin/pip3");
            G.darwinXcodeExists() || u
              ? z("pip3 -V 2>&1", function (l, f) {
                  if (!l) {
                    const d = (
                      f.toString().split(`
`)[0] || ""
                    ).split(" ");
                    r.versions.pip3 = d.length >= 2 ? d[1] : "";
                  }
                  a();
                })
              : a();
          } else
            z("pip3 -V 2>&1", function (u, l) {
              if (!u) {
                const p = (
                  l.toString().split(`
`)[0] || ""
                ).split(" ");
                r.versions.pip3 = p.length >= 2 ? p[1] : "";
              }
              a();
            });
        (({}).hasOwnProperty.call(r.versions, "java") &&
          (De
            ? z("/usr/libexec/java_home -V 2>&1", function (u, l) {
                !u &&
                l.toString().toLowerCase().indexOf("no java runtime") === -1
                  ? z("java -version 2>&1", function (f, p) {
                      if (!f) {
                        const m = (
                          p.toString().split(`
`)[0] || ""
                        ).split('"');
                        r.versions.java = m.length === 3 ? m[1].trim() : "";
                      }
                      a();
                    })
                  : a();
              })
            : z("java -version 2>&1", function (u, l) {
                if (!u) {
                  const p = (
                    l.toString().split(`
`)[0] || ""
                  ).split('"');
                  r.versions.java = p.length === 3 ? p[1].trim() : "";
                }
                a();
              })),
          {}.hasOwnProperty.call(r.versions, "gcc") &&
            ((De && G.darwinXcodeExists()) || !De
              ? z("gcc -dumpversion", function (u, l) {
                  (u ||
                    (r.versions.gcc =
                      l
                        .toString()
                        .split(
                          `
`,
                        )[0]
                        .trim() || ""),
                    r.versions.gcc.indexOf(".") > -1
                      ? a()
                      : z("gcc --version", function (f, p) {
                          if (!f) {
                            const d = p
                              .toString()
                              .split(
                                `
`,
                              )[0]
                              .trim();
                            if (d.indexOf("gcc") > -1 && d.indexOf(")") > -1) {
                              const m = d.split(")");
                              r.versions.gcc = m[1].trim() || r.versions.gcc;
                            }
                          }
                          a();
                        }));
                })
              : a()),
          {}.hasOwnProperty.call(r.versions, "virtualbox") &&
            z(G.getVboxmanage() + " -v 2>&1", function (u, l) {
              if (!u) {
                const p = (
                  l.toString().split(`
`)[0] || ""
                ).split("r");
                r.versions.virtualbox = p[0];
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "bash") &&
            z("bash --version", function (u, l) {
              if (!u) {
                const p = l
                  .toString()
                  .split(
                    `
`,
                  )[0]
                  .split(" version ");
                p.length > 1 &&
                  (r.versions.bash = p[1].split(" ")[0].split("(")[0]);
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "zsh") &&
            z("zsh --version", function (u, l) {
              if (!u) {
                const p = l
                  .toString()
                  .split(
                    `
`,
                  )[0]
                  .split("zsh ");
                p.length > 1 && (r.versions.zsh = p[1].split(" ")[0]);
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "fish") &&
            z("fish --version", function (u, l) {
              if (!u) {
                const p = l
                  .toString()
                  .split(
                    `
`,
                  )[0]
                  .split(" version ");
                p.length > 1 && (r.versions.fish = p[1].split(" ")[0]);
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "bun") &&
            z("bun -v", function (u, l) {
              if (!u) {
                const f = l
                  .toString()
                  .split(
                    `
`,
                  )[0]
                  .trim();
                r.versions.bun = f;
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "deno") &&
            z("deno -v", function (u, l) {
              if (!u) {
                const p = l
                  .toString()
                  .split(
                    `
`,
                  )[0]
                  .trim()
                  .split(" ");
                p.length > 1 && (r.versions.deno = p[1]);
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "node") &&
            z("node -v", function (u, l) {
              if (!u) {
                let f = l
                  .toString()
                  .split(
                    `
`,
                  )[0]
                  .trim();
                (f.startsWith("v") && (f = f.slice(1)), (r.versions.node = f));
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "powershell") &&
            (be
              ? G.powerShell("$PSVersionTable").then((u) => {
                  const l = u
                    .toString()
                    .toLowerCase()
                    .split(
                      `
`,
                    )
                    .map((f) => f.replace(/ +/g, " ").replace(/ +/g, ":"));
                  ((r.versions.powershell = G.getValue(l, "psversion")), a());
                })
              : a()),
          {}.hasOwnProperty.call(r.versions, "dotnet") &&
            (be
              ? G.powerShell(
                  'gci "HKLM:\\SOFTWARE\\Microsoft\\NET Framework Setup\\NDP" -recurse | gp -name Version,Release -EA 0 | where { $_.PSChildName -match "^(?!S)\\p{L}"} | select PSChildName, Version, Release',
                ).then((u) => {
                  const l = u.toString().split(`\r
`);
                  let f = "";
                  (l.forEach((p) => {
                    p = p.replace(/ +/g, " ");
                    const d = p.split(" ");
                    f =
                      f ||
                      ((d[0].toLowerCase().startsWith("client") &&
                        d.length > 2) ||
                      (d[0].toLowerCase().startsWith("full") && d.length > 2)
                        ? d[1].trim()
                        : "");
                  }),
                    (r.versions.dotnet = f.trim()),
                    a());
                })
              : a()));
      } catch {
        (n && n(r.versions), s(r.versions));
      }
    });
  });
}
Ht.versions = pl;
function fl(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      if (be)
        try {
          const e = "CMD";
          G.powerShell(
            `Get-CimInstance -className win32_process | where-object {$_.ProcessId -eq ${process.ppid} } | select Name`,
          ).then((i) => {
            let s = "CMD";
            (i &&
              i.toString().toLowerCase().indexOf("powershell") >= 0 &&
              (s = "PowerShell"),
              t && t(s),
              n(s));
          });
        } catch {
          (t && t(result), n(result));
        }
      else {
        let e = "";
        z("echo $SHELL", function (i, s) {
          (i ||
            (e = s.toString().split(`
`)[0]),
            t && t(e),
            n(e));
        });
      }
    });
  });
}
Ht.shell = fl;
function dl() {
  let t = [];
  try {
    const n = We.networkInterfaces();
    for (let e in n)
      ({}).hasOwnProperty.call(n, e) &&
        n[e].forEach(function (i) {
          if (i && i.mac && i.mac !== "00:00:00:00:00:00") {
            const s = i.mac.toLowerCase();
            t.indexOf(s) === -1 && t.push(s);
          }
        });
    t = t.sort(function (e, i) {
      return e < i ? -1 : e > i ? 1 : 0;
    });
  } catch {
    t.push("00:00:00:00:00:00");
  }
  return t;
}
function Ys(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
          os: "",
          hardware: "",
          macs: dl(),
        },
        i;
      if (
        (De &&
          z("system_profiler SPHardwareDataType -json", function (s, r) {
            if (!s)
              try {
                const o = JSON.parse(r.toString());
                if (o.SPHardwareDataType && o.SPHardwareDataType.length > 0) {
                  const a = o.SPHardwareDataType[0];
                  ((e.os = a.platform_UUID.toLowerCase()),
                    (e.hardware = a.serial_number));
                }
              } catch {
                G.noop();
              }
            (t && t(e), n(e));
          }),
        gn &&
          z(
            `echo -n "os: "; cat /var/lib/dbus/machine-id 2> /dev/null ||
cat /etc/machine-id 2> /dev/null; echo;
echo -n "hardware: "; cat /sys/class/dmi/id/product_uuid 2> /dev/null; echo;`,
            function (r, o) {
              const a = o.toString().split(`
`);
              if (
                ((e.os = G.getValue(a, "os").toLowerCase()),
                (e.hardware = G.getValue(a, "hardware").toLowerCase()),
                !e.hardware)
              ) {
                const c = Te.readFileSync("/proc/cpuinfo", {
                    encoding: "utf8",
                  }).toString().split(`
`),
                  u = G.getValue(c, "serial");
                e.hardware = u || "";
              }
              (t && t(e), n(e));
            },
          ),
        (gr || yr || xr) &&
          z("sysctl -i kern.hostid kern.hostuuid", function (s, r) {
            const o = r.toString().split(`
`);
            ((e.hardware = G.getValue(o, "kern.hostid", ":").toLowerCase()),
              (e.os = G.getValue(o, "kern.hostuuid", ":").toLowerCase()),
              e.os.indexOf("unknown") >= 0 && (e.os = ""),
              e.hardware.indexOf("unknown") >= 0 && (e.hardware = ""),
              t && t(e),
              n(e));
          }),
        be)
      ) {
        let s = "%windir%\\System32";
        (process.arch === "ia32" &&
          Object.prototype.hasOwnProperty.call(
            process.env,
            "PROCESSOR_ARCHITEW6432",
          ) &&
          (s = "%windir%\\sysnative\\cmd.exe /c %windir%\\System32"),
          G.powerShell(
            "Get-CimInstance Win32_ComputerSystemProduct | select UUID | fl",
          ).then((r) => {
            let o = r.split(`\r
`);
            ((e.hardware = G.getValue(o, "uuid", ":").toLowerCase()),
              z(
                `${s}\\reg query "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography" /v MachineGuid`,
                G.execOptsWin,
                function (a, c) {
                  ((i = c
                    .toString()
                    .split(
                      `
\r`,
                    )[0]
                    .split("REG_SZ")),
                    (e.os =
                      i.length > 1
                        ? i[1].replace(/\r+|\n+|\s+/gi, "").toLowerCase()
                        : ""),
                    t && t(e),
                    n(e));
                },
              ));
          }));
      }
    });
  });
}
Ht.uuid = Ys;
const ki = Ae,
  Wt = Pe,
  I = V,
  { uuid: yd } = Ht,
  fn = se.exec,
  Ft = se.execSync,
  jn = I.promisify(se.exec);
let ft = process.platform;
const xi = ft === "linux" || ft === "android",
  Si = ft === "darwin",
  wi = ft === "win32",
  an = ft === "freebsd",
  ln = ft === "openbsd",
  cn = ft === "netbsd",
  Ci = ft === "sunos";
function ml(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        manufacturer: "",
        model: "Computer",
        version: "",
        serial: "-",
        uuid: "-",
        sku: "-",
        virtual: !1,
      };
      if (
        ((xi || an || ln || cn) &&
          fn(
            "export LC_ALL=C; dmidecode -t system 2>/dev/null; unset LC_ALL",
            function (i, s) {
              let r = s.toString().split(`
`);
              ((e.manufacturer = J(I.getValue(r, "manufacturer"))),
                (e.model = J(I.getValue(r, "product name"))),
                (e.version = J(I.getValue(r, "version"))),
                (e.serial = J(I.getValue(r, "serial number"))),
                (e.uuid = J(I.getValue(r, "uuid")).toLowerCase()),
                (e.sku = J(I.getValue(r, "sku number"))));
              const o = `echo -n "product_name: "; cat /sys/devices/virtual/dmi/id/product_name 2>/dev/null; echo;
            echo -n "product_serial: "; cat /sys/devices/virtual/dmi/id/product_serial 2>/dev/null; echo;
            echo -n "product_uuid: "; cat /sys/devices/virtual/dmi/id/product_uuid 2>/dev/null; echo;
            echo -n "product_version: "; cat /sys/devices/virtual/dmi/id/product_version 2>/dev/null; echo;
            echo -n "sys_vendor: "; cat /sys/devices/virtual/dmi/id/sys_vendor 2>/dev/null; echo;`;
              try {
                ((r = Ft(o, I.execOptsLinux).toString().split(`
`)),
                  (e.manufacturer = J(
                    e.manufacturer === ""
                      ? I.getValue(r, "sys_vendor")
                      : e.manufacturer,
                  )),
                  (e.model = J(
                    e.model === "" ? I.getValue(r, "product_name") : e.model,
                  )),
                  (e.version = J(
                    e.version === ""
                      ? I.getValue(r, "product_version")
                      : e.version,
                  )),
                  (e.serial = J(
                    e.serial === ""
                      ? I.getValue(r, "product_serial")
                      : e.serial,
                  )),
                  (e.uuid = J(
                    e.uuid === ""
                      ? I.getValue(r, "product_uuid").toLowerCase()
                      : e.uuid,
                  )));
              } catch {
                I.noop();
              }
              if (
                (e.serial || (e.serial = "-"),
                e.manufacturer || (e.manufacturer = ""),
                e.model || (e.model = "Computer"),
                e.version || (e.version = ""),
                e.sku || (e.sku = "-"),
                e.model.toLowerCase() === "virtualbox" ||
                  e.model.toLowerCase() === "kvm" ||
                  e.model.toLowerCase() === "virtual machine" ||
                  e.model.toLowerCase() === "bochs" ||
                  e.model.toLowerCase().startsWith("vmware") ||
                  e.model.toLowerCase().startsWith("droplet"))
              )
                switch (((e.virtual = !0), e.model.toLowerCase())) {
                  case "virtualbox":
                    e.virtualHost = "VirtualBox";
                    break;
                  case "vmware":
                    e.virtualHost = "VMware";
                    break;
                  case "kvm":
                    e.virtualHost = "KVM";
                    break;
                  case "bochs":
                    e.virtualHost = "bochs";
                    break;
                }
              if (
                e.manufacturer.toLowerCase().startsWith("vmware") ||
                e.manufacturer.toLowerCase() === "xen"
              )
                switch (((e.virtual = !0), e.manufacturer.toLowerCase())) {
                  case "vmware":
                    e.virtualHost = "VMware";
                    break;
                  case "xen":
                    e.virtualHost = "Xen";
                    break;
                }
              if (!e.virtual)
                try {
                  const a = Ft(
                    "ls -1 /dev/disk/by-id/ 2>/dev/null; pciconf -lv  2>/dev/null",
                    I.execOptsLinux,
                  ).toString();
                  ((a.indexOf("_QEMU_") >= 0 || a.indexOf("QEMU ") >= 0) &&
                    ((e.virtual = !0), (e.virtualHost = "QEMU")),
                    a.indexOf("_VBOX_") >= 0 &&
                      ((e.virtual = !0), (e.virtualHost = "VirtualBox")));
                } catch {
                  I.noop();
                }
              if (an || ln || cn)
                try {
                  const a = Ft(
                    "sysctl -i kern.hostuuid kern.hostid hw.model",
                    I.execOptsLinux,
                  ).toString().split(`
`);
                  (e.uuid ||
                    (e.uuid = I.getValue(
                      a,
                      "kern.hostuuid",
                      ":",
                    ).toLowerCase()),
                    (!e.serial || e.serial === "-") &&
                      (e.serial = I.getValue(
                        a,
                        "kern.hostid",
                        ":",
                      ).toLowerCase()),
                    (!e.model || e.model === "Computer") &&
                      (e.model = I.getValue(a, "hw.model", ":").trim()));
                } catch {
                  I.noop();
                }
              if (
                !e.virtual &&
                (Wt.release().toLowerCase().indexOf("microsoft") >= 0 ||
                  Wt.release().toLowerCase().endsWith("wsl2"))
              ) {
                const a = parseFloat(Wt.release().toLowerCase());
                ((e.virtual = !0),
                  (e.manufacturer = "Microsoft"),
                  (e.model = "WSL"),
                  (e.version = a < 4.19 ? "1" : "2"));
              }
              if ((an || ln || cn) && !e.virtualHost)
                try {
                  const c = Ft("dmidecode -t 4", I.execOptsLinux).toString()
                    .split(`
`);
                  switch (
                    I.getValue(c, "manufacturer", ":", !0).toLowerCase()
                  ) {
                    case "virtualbox":
                      e.virtualHost = "VirtualBox";
                      break;
                    case "vmware":
                      e.virtualHost = "VMware";
                      break;
                    case "kvm":
                      e.virtualHost = "KVM";
                      break;
                    case "bochs":
                      e.virtualHost = "bochs";
                      break;
                  }
                } catch {
                  I.noop();
                }
              (ki.existsSync("/.dockerenv") || ki.existsSync("/.dockerinit")) &&
                (e.model = "Docker Container");
              try {
                const a = Ft(
                  'dmesg 2>/dev/null | grep -iE "virtual|hypervisor" | grep -iE "vmware|qemu|kvm|xen" | grep -viE "Nested Virtualization|/virtual/"',
                );
                a.toString().split(`
`).length > 0 &&
                  (e.model === "Computer" && (e.model = "Virtual machine"),
                  (e.virtual = !0),
                  a.toString().toLowerCase().indexOf("vmware") >= 0 &&
                    !e.virtualHost &&
                    (e.virtualHost = "VMware"),
                  a.toString().toLowerCase().indexOf("qemu") >= 0 &&
                    !e.virtualHost &&
                    (e.virtualHost = "QEMU"),
                  a.toString().toLowerCase().indexOf("xen") >= 0 &&
                    !e.virtualHost &&
                    (e.virtualHost = "Xen"),
                  a.toString().toLowerCase().indexOf("kvm") >= 0 &&
                    !e.virtualHost &&
                    (e.virtualHost = "KVM"));
              } catch {
                I.noop();
              }
              e.manufacturer === "" &&
              e.model === "Computer" &&
              e.version === ""
                ? ki.readFile("/proc/cpuinfo", function (a, c) {
                    if (!a) {
                      let u = c.toString().split(`
`);
                      if (
                        ((e.model = I.getValue(
                          u,
                          "hardware",
                          ":",
                          !0,
                        ).toUpperCase()),
                        (e.version = I.getValue(
                          u,
                          "revision",
                          ":",
                          !0,
                        ).toLowerCase()),
                        (e.serial = I.getValue(u, "serial", ":", !0)),
                        I.getValue(u, "model:", ":", !0),
                        I.isRaspberry(u))
                      ) {
                        const l = I.decodePiCpuinfo(u);
                        ((e.model = l.model),
                          (e.version = l.revisionCode),
                          (e.manufacturer = "Raspberry Pi Foundation"),
                          (e.raspberry = {
                            manufacturer: l.manufacturer,
                            processor: l.processor,
                            type: l.type,
                            revision: l.revision,
                          }));
                      }
                    }
                    (t && t(e), n(e));
                  })
                : (t && t(e), n(e));
            },
          ),
        Si &&
          fn("ioreg -c IOPlatformExpertDevice -d 2", function (i, s) {
            if (!i) {
              let r = s.toString().replace(/[<>"]/g, "").split(`
`);
              const o = I.getAppleModel(I.getValue(r, "model", "=", !0));
              ((e.manufacturer = I.getValue(r, "manufacturer", "=", !0)),
                (e.model = o.key),
                (e.type = Js(o.version)),
                (e.version = o.version),
                (e.serial = I.getValue(r, "ioplatformserialnumber", "=", !0)),
                (e.uuid = I.getValue(
                  r,
                  "ioplatformuuid",
                  "=",
                  !0,
                ).toLowerCase()),
                (e.sku =
                  I.getValue(r, "board-id", "=", !0) ||
                  I.getValue(r, "target-sub-type", "=", !0)));
            }
            (t && t(e), n(e));
          }),
        Ci && (t && t(e), n(e)),
        wi)
      )
        try {
          I.powerShell(
            "Get-CimInstance Win32_ComputerSystemProduct | select Name,Vendor,Version,IdentifyingNumber,UUID | fl",
          ).then((i, s) => {
            if (s) (t && t(e), n(e));
            else {
              let r = i.split(`\r
`);
              ((e.manufacturer = I.getValue(r, "vendor", ":")),
                (e.model = I.getValue(r, "name", ":")),
                (e.version = I.getValue(r, "version", ":")),
                (e.serial = I.getValue(r, "identifyingnumber", ":")),
                (e.uuid = I.getValue(r, "uuid", ":").toLowerCase()));
              const o = e.model.toLowerCase();
              (o === "virtualbox" ||
                o === "kvm" ||
                o === "virtual machine" ||
                o === "bochs" ||
                o.startsWith("vmware") ||
                o.startsWith("qemu") ||
                o.startsWith("parallels")) &&
                ((e.virtual = !0),
                o.startsWith("virtualbox") && (e.virtualHost = "VirtualBox"),
                o.startsWith("vmware") && (e.virtualHost = "VMware"),
                o.startsWith("kvm") && (e.virtualHost = "KVM"),
                o.startsWith("bochs") && (e.virtualHost = "bochs"),
                o.startsWith("qemu") && (e.virtualHost = "KVM"),
                o.startsWith("parallels") && (e.virtualHost = "Parallels"));
              const a = e.manufacturer.toLowerCase();
              ((a.startsWith("vmware") ||
                a.startsWith("qemu") ||
                a === "xen" ||
                a.startsWith("parallels")) &&
                ((e.virtual = !0),
                a.startsWith("vmware") && (e.virtualHost = "VMware"),
                a.startsWith("xen") && (e.virtualHost = "Xen"),
                a.startsWith("qemu") && (e.virtualHost = "KVM"),
                a.startsWith("parallels") && (e.virtualHost = "Parallels")),
                I.powerShell(
                  'Get-CimInstance MS_Systeminformation -Namespace "root/wmi" | select systemsku | fl ',
                ).then((c, u) => {
                  if (!u) {
                    let l = c.split(`\r
`);
                    e.sku = I.getValue(l, "systemsku", ":");
                  }
                  e.virtual
                    ? (t && t(e), n(e))
                    : I.powerShell(
                        "Get-CimInstance Win32_bios | select Version, SerialNumber, SMBIOSBIOSVersion",
                      ).then((l, f) => {
                        if (f) (t && t(e), n(e));
                        else {
                          let p = l.toString();
                          ((p.indexOf("VRTUAL") >= 0 ||
                            p.indexOf("A M I ") >= 0 ||
                            p.indexOf("VirtualBox") >= 0 ||
                            p.indexOf("VMWare") >= 0 ||
                            p.indexOf("Xen") >= 0 ||
                            p.indexOf("Parallels") >= 0) &&
                            ((e.virtual = !0),
                            p.indexOf("VirtualBox") >= 0 &&
                              !e.virtualHost &&
                              (e.virtualHost = "VirtualBox"),
                            p.indexOf("VMware") >= 0 &&
                              !e.virtualHost &&
                              (e.virtualHost = "VMware"),
                            p.indexOf("Xen") >= 0 &&
                              !e.virtualHost &&
                              (e.virtualHost = "Xen"),
                            p.indexOf("VRTUAL") >= 0 &&
                              !e.virtualHost &&
                              (e.virtualHost = "Hyper-V"),
                            p.indexOf("A M I") >= 0 &&
                              !e.virtualHost &&
                              (e.virtualHost = "Virtual PC"),
                            p.indexOf("Parallels") >= 0 &&
                              !e.virtualHost &&
                              (e.virtualHost = "Parallels")),
                            t && t(e),
                            n(e));
                        }
                      });
                }));
            }
          });
        } catch {
          (t && t(e), n(e));
        }
    });
  });
}
zn.system = ml;
function J(t) {
  const n = t.toLowerCase();
  return (
    (n.indexOf("o.e.m.") === -1 &&
      n.indexOf("default string") === -1 &&
      n !== "default" &&
      t) ||
    ""
  );
}
function hl(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
          vendor: "",
          version: "",
          releaseDate: "",
          revision: "",
        },
        i = "";
      if (
        ((xi || an || ln || cn) &&
          (process.arch === "arm"
            ? (i = "cat /proc/cpuinfo | grep Serial")
            : (i =
                "export LC_ALL=C; dmidecode -t bios 2>/dev/null; unset LC_ALL"),
          fn(i, function (s, r) {
            let o = r.toString().split(`
`);
            ((e.vendor = I.getValue(o, "Vendor")),
              (e.version = I.getValue(o, "Version")));
            let a = I.getValue(o, "Release Date");
            ((e.releaseDate = I.parseDateTime(a).date),
              (e.revision = I.getValue(o, "BIOS Revision")),
              (e.serial = I.getValue(o, "SerialNumber")));
            let c = I.getValue(o, "Currently Installed Language").split("|")[0];
            if (
              (c && (e.language = c),
              o.length && r.toString().indexOf("Characteristics:") >= 0)
            ) {
              const l = [];
              (o.forEach((f) => {
                if (f.indexOf(" is supported") >= 0) {
                  const p = f.split(" is supported")[0].trim();
                  l.push(p);
                }
              }),
                (e.features = l));
            }
            const u = `echo -n "bios_date: "; cat /sys/devices/virtual/dmi/id/bios_date 2>/dev/null; echo;
            echo -n "bios_vendor: "; cat /sys/devices/virtual/dmi/id/bios_vendor 2>/dev/null; echo;
            echo -n "bios_version: "; cat /sys/devices/virtual/dmi/id/bios_version 2>/dev/null; echo;`;
            try {
              ((o = Ft(u, I.execOptsLinux).toString().split(`
`)),
                (e.vendor = e.vendor ? e.vendor : I.getValue(o, "bios_vendor")),
                (e.version = e.version
                  ? e.version
                  : I.getValue(o, "bios_version")),
                (a = I.getValue(o, "bios_date")),
                (e.releaseDate = e.releaseDate
                  ? e.releaseDate
                  : I.parseDateTime(a).date));
            } catch {
              I.noop();
            }
            (t && t(e), n(e));
          })),
        Si &&
          ((e.vendor = "Apple Inc."),
          fn("system_profiler SPHardwareDataType -json", function (s, r) {
            try {
              const o = JSON.parse(r.toString());
              if (o && o.SPHardwareDataType && o.SPHardwareDataType.length) {
                let a = o.SPHardwareDataType[0].boot_rom_version;
                ((a = a ? a.split("(")[0].trim() : null), (e.version = a));
              }
            } catch {
              I.noop();
            }
            (t && t(e), n(e));
          })),
        Ci && ((e.vendor = "Sun Microsystems"), t && t(e), n(e)),
        wi)
      )
        try {
          I.powerShell(
            'Get-CimInstance Win32_bios | select Description,Version,Manufacturer,@{n="ReleaseDate";e={$_.ReleaseDate.ToString("yyyy-MM-dd")}},BuildNumber,SerialNumber,SMBIOSBIOSVersion | fl',
          ).then((s, r) => {
            if (!r) {
              let o = s.toString().split(`\r
`);
              const a = I.getValue(o, "description", ":"),
                c = I.getValue(o, "SMBIOSBIOSVersion", ":");
              (a.indexOf(" Version ") !== -1
                ? ((e.vendor = a.split(" Version ")[0].trim()),
                  (e.version = a.split(" Version ")[1].trim()))
                : a.indexOf(" Ver: ") !== -1
                  ? ((e.vendor = I.getValue(o, "manufacturer", ":")),
                    (e.version = a.split(" Ver: ")[1].trim()))
                  : ((e.vendor = I.getValue(o, "manufacturer", ":")),
                    (e.version = c || I.getValue(o, "version", ":"))),
                (e.releaseDate = I.getValue(o, "releasedate", ":")),
                (e.revision = I.getValue(o, "buildnumber", ":")),
                (e.serial = J(I.getValue(o, "serialnumber", ":"))));
            }
            (t && t(e), n(e));
          });
        } catch {
          (t && t(e), n(e));
        }
    });
  });
}
zn.bios = hl;
function gl(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
          manufacturer: "",
          model: "",
          version: "",
          serial: "-",
          assetTag: "-",
          memMax: null,
          memSlots: null,
        },
        i = "";
      if (xi || an || ln || cn) {
        process.arch === "arm"
          ? (i = "cat /proc/cpuinfo | grep Serial")
          : (i = "export LC_ALL=C; dmidecode -t 2 2>/dev/null; unset LC_ALL");
        const s = [];
        (s.push(jn(i)),
          s.push(jn("export LC_ALL=C; dmidecode -t memory 2>/dev/null")),
          I.promiseAll(s).then((r) => {
            let o = r.results[0]
              ? r.results[0].toString().split(`
`)
              : [""];
            ((e.manufacturer = J(I.getValue(o, "Manufacturer"))),
              (e.model = J(I.getValue(o, "Product Name"))),
              (e.version = J(I.getValue(o, "Version"))),
              (e.serial = J(I.getValue(o, "Serial Number"))),
              (e.assetTag = J(I.getValue(o, "Asset Tag"))));
            const a = `echo -n "board_asset_tag: "; cat /sys/devices/virtual/dmi/id/board_asset_tag 2>/dev/null; echo;
            echo -n "board_name: "; cat /sys/devices/virtual/dmi/id/board_name 2>/dev/null; echo;
            echo -n "board_serial: "; cat /sys/devices/virtual/dmi/id/board_serial 2>/dev/null; echo;
            echo -n "board_vendor: "; cat /sys/devices/virtual/dmi/id/board_vendor 2>/dev/null; echo;
            echo -n "board_version: "; cat /sys/devices/virtual/dmi/id/board_version 2>/dev/null; echo;`;
            try {
              ((o = Ft(a, I.execOptsLinux).toString().split(`
`)),
                (e.manufacturer = J(
                  e.manufacturer
                    ? e.manufacturer
                    : I.getValue(o, "board_vendor"),
                )),
                (e.model = J(e.model ? e.model : I.getValue(o, "board_name"))),
                (e.version = J(
                  e.version ? e.version : I.getValue(o, "board_version"),
                )),
                (e.serial = J(
                  e.serial ? e.serial : I.getValue(o, "board_serial"),
                )),
                (e.assetTag = J(
                  e.assetTag ? e.assetTag : I.getValue(o, "board_asset_tag"),
                )));
            } catch {
              I.noop();
            }
            if (
              ((o = r.results[1]
                ? r.results[1].toString().split(`
`)
                : [""]),
              (e.memMax =
                I.toInt(I.getValue(o, "Maximum Capacity")) *
                  1024 *
                  1024 *
                  1024 || null),
              (e.memSlots =
                I.toInt(I.getValue(o, "Number Of Devices")) || null),
              I.isRaspberry())
            ) {
              const c = I.decodePiCpuinfo();
              ((e.manufacturer = c.manufacturer),
                (e.model = "Raspberry Pi"),
                (e.serial = c.serial),
                (e.version = c.type + " - " + c.revision),
                (e.memMax = Wt.totalmem()),
                (e.memSlots = 0));
            }
            (t && t(e), n(e));
          }));
      }
      if (Si) {
        const s = [];
        (s.push(jn("ioreg -c IOPlatformExpertDevice -d 2")),
          s.push(jn("system_profiler SPMemoryDataType")),
          I.promiseAll(s).then((r) => {
            let o = r.results[0]
              ? r.results[0].toString().replace(/[<>"]/g, "").split(`
`)
              : [""];
            ((e.manufacturer = I.getValue(o, "manufacturer", "=", !0)),
              (e.model = I.getValue(o, "model", "=", !0)),
              (e.version = I.getValue(o, "version", "=", !0)),
              (e.serial = I.getValue(o, "ioplatformserialnumber", "=", !0)),
              (e.assetTag = I.getValue(o, "board-id", "=", !0)));
            let a = r.results[1]
              ? r.results[1].toString().split("        BANK ")
              : [""];
            (a.length === 1 &&
              (a = r.results[1]
                ? r.results[1].toString().split("        DIMM")
                : [""]),
              a.shift(),
              (e.memSlots = a.length),
              Wt.arch() === "arm64" &&
                ((e.memSlots = 0), (e.memMax = Wt.totalmem())),
              t && t(e),
              n(e));
          }));
      }
      if ((Ci && (t && t(e), n(e)), wi))
        try {
          const s = [],
            r = parseInt(Wt.release()) >= 10,
            o = r ? "MaxCapacityEx" : "MaxCapacity";
          (s.push(
            I.powerShell(
              "Get-CimInstance Win32_baseboard | select Model,Manufacturer,Product,Version,SerialNumber,PartNumber,SKU | fl",
            ),
          ),
            s.push(
              I.powerShell(
                `Get-CimInstance Win32_physicalmemoryarray | select ${o}, MemoryDevices | fl`,
              ),
            ),
            I.promiseAll(s).then((a) => {
              let c = a.results[0]
                ? a.results[0].toString().split(`\r
`)
                : [""];
              ((e.manufacturer = J(I.getValue(c, "manufacturer", ":"))),
                (e.model = J(I.getValue(c, "model", ":"))),
                e.model || (e.model = J(I.getValue(c, "product", ":"))),
                (e.version = J(I.getValue(c, "version", ":"))),
                (e.serial = J(I.getValue(c, "serialnumber", ":"))),
                (e.assetTag = J(I.getValue(c, "partnumber", ":"))),
                e.assetTag || (e.assetTag = J(I.getValue(c, "sku", ":"))),
                (c = a.results[1]
                  ? a.results[1].toString().split(`\r
`)
                  : [""]),
                (e.memMax =
                  I.toInt(I.getValue(c, o, ":")) * (r ? 1024 : 1) || null),
                (e.memSlots =
                  I.toInt(I.getValue(c, "MemoryDevices", ":")) || null),
                t && t(e),
                n(e));
            }));
        } catch {
          (t && t(e), n(e));
        }
    });
  });
}
zn.baseboard = gl;
function Js(t) {
  return (
    (t = t.toLowerCase()),
    t.indexOf("macbookair") >= 0 ||
    t.indexOf("macbook air") >= 0 ||
    t.indexOf("macbookpro") >= 0 ||
    t.indexOf("macbook pro") >= 0 ||
    t.indexOf("macbook") >= 0
      ? "Notebook"
      : t.indexOf("macmini") >= 0 ||
          t.indexOf("mac mini") >= 0 ||
          t.indexOf("imac") >= 0 ||
          t.indexOf("macstudio") >= 0 ||
          t.indexOf("mac studio") >= 0
        ? "Desktop"
        : t.indexOf("macpro") >= 0 || t.indexOf("mac pro") >= 0
          ? "Tower"
          : "Other"
  );
}
function yl(t) {
  const n = [
    "Other",
    "Unknown",
    "Desktop",
    "Low Profile Desktop",
    "Pizza Box",
    "Mini Tower",
    "Tower",
    "Portable",
    "Laptop",
    "Notebook",
    "Hand Held",
    "Docking Station",
    "All in One",
    "Sub Notebook",
    "Space-Saving",
    "Lunch Box",
    "Main System Chassis",
    "Expansion Chassis",
    "SubChassis",
    "Bus Expansion Chassis",
    "Peripheral Chassis",
    "Storage Chassis",
    "Rack Mount Chassis",
    "Sealed-Case PC",
    "Multi-System Chassis",
    "Compact PCI",
    "Advanced TCA",
    "Blade",
    "Blade Enclosure",
    "Tablet",
    "Convertible",
    "Detachable",
    "IoT Gateway ",
    "Embedded PC",
    "Mini PC",
    "Stick PC",
  ];
  return new Promise((e) => {
    process.nextTick(() => {
      let i = {
        manufacturer: "",
        model: "",
        type: "",
        version: "",
        serial: "-",
        assetTag: "-",
        sku: "",
      };
      if (
        ((xi || an || ln || cn) &&
          fn(
            `echo -n "chassis_asset_tag: "; cat /sys/devices/virtual/dmi/id/chassis_asset_tag 2>/dev/null; echo;
            echo -n "chassis_serial: "; cat /sys/devices/virtual/dmi/id/chassis_serial 2>/dev/null; echo;
            echo -n "chassis_type: "; cat /sys/devices/virtual/dmi/id/chassis_type 2>/dev/null; echo;
            echo -n "chassis_vendor: "; cat /sys/devices/virtual/dmi/id/chassis_vendor 2>/dev/null; echo;
            echo -n "chassis_version: "; cat /sys/devices/virtual/dmi/id/chassis_version 2>/dev/null; echo;`,
            function (r, o) {
              let a = o.toString().split(`
`);
              i.manufacturer = J(I.getValue(a, "chassis_vendor"));
              const c = parseInt(
                I.getValue(a, "chassis_type").replace(/\D/g, ""),
              );
              ((i.type = J(c && !isNaN(c) && c < n.length ? n[c - 1] : "")),
                (i.version = J(I.getValue(a, "chassis_version"))),
                (i.serial = J(I.getValue(a, "chassis_serial"))),
                (i.assetTag = J(I.getValue(a, "chassis_asset_tag"))),
                t && t(i),
                e(i));
            },
          ),
        Si &&
          fn("ioreg -c IOPlatformExpertDevice -d 2", function (s, r) {
            if (!s) {
              let o = r.toString().replace(/[<>"]/g, "").split(`
`);
              const a = I.getAppleModel(I.getValue(o, "model", "=", !0));
              ((i.manufacturer = I.getValue(o, "manufacturer", "=", !0)),
                (i.model = a.key),
                (i.type = Js(a.model)),
                (i.version = a.version),
                (i.serial = I.getValue(o, "ioplatformserialnumber", "=", !0)),
                (i.assetTag =
                  I.getValue(o, "board-id", "=", !0) ||
                  I.getValue(o, "target-type", "=", !0)),
                (i.sku = I.getValue(o, "target-sub-type", "=", !0)));
            }
            (t && t(i), e(i));
          }),
        Ci && (t && t(i), e(i)),
        wi)
      )
        try {
          I.powerShell(
            "Get-CimInstance Win32_SystemEnclosure | select Model,Manufacturer,ChassisTypes,Version,SerialNumber,PartNumber,SKU,SMBIOSAssetTag | fl",
          ).then((s, r) => {
            if (!r) {
              let o = s.toString().split(`\r
`);
              ((i.manufacturer = J(I.getValue(o, "manufacturer", ":"))),
                (i.model = J(I.getValue(o, "model", ":"))));
              const a = parseInt(
                I.getValue(o, "ChassisTypes", ":").replace(/\D/g, ""),
              );
              ((i.type = a && !isNaN(a) && a < n.length ? n[a - 1] : ""),
                (i.version = J(I.getValue(o, "version", ":"))),
                (i.serial = J(I.getValue(o, "serialnumber", ":"))),
                (i.assetTag = J(I.getValue(o, "partnumber", ":"))),
                i.assetTag ||
                  (i.assetTag = J(I.getValue(o, "SMBIOSAssetTag", ":"))),
                (i.sku = J(I.getValue(o, "sku", ":"))));
            }
            (t && t(i), e(i));
          });
        } catch {
          (t && t(i), e(i));
        }
    });
  });
}
zn.chassis = yl;
var At = {};
const Ge = Pe,
  we = se.exec,
  Li = se.execSync,
  ui = Ae,
  P = V;
let dt = process.platform;
const yn = dt === "linux" || dt === "android",
  Ii = dt === "darwin",
  vi = dt === "win32",
  _i = dt === "freebsd",
  Oi = dt === "openbsd",
  Pi = dt === "netbsd",
  Ei = dt === "sunos";
let on = 0,
  te = {
    user: 0,
    nice: 0,
    system: 0,
    idle: 0,
    irq: 0,
    steal: 0,
    guest: 0,
    load: 0,
    tick: 0,
    ms: 0,
    currentLoad: 0,
    currentLoadUser: 0,
    currentLoadSystem: 0,
    currentLoadNice: 0,
    currentLoadIdle: 0,
    currentLoadIrq: 0,
    currentLoadSteal: 0,
    currentLoadGuest: 0,
    rawCurrentLoad: 0,
    rawCurrentLoadUser: 0,
    rawCurrentLoadSystem: 0,
    rawCurrentLoadNice: 0,
    rawCurrentLoadIdle: 0,
    rawCurrentLoadIrq: 0,
    rawCurrentLoadSteal: 0,
    rawCurrentLoadGuest: 0,
  },
  v = [],
  Fi = 0;
const Wi = {
    8346: "1.8",
    8347: "1.9",
    8350: "2.0",
    8354: "2.2",
    "8356|SE": "2.4",
    8356: "2.3",
    8360: "2.5",
    2372: "2.1",
    2373: "2.1",
    2374: "2.2",
    2376: "2.3",
    2377: "2.3",
    2378: "2.4",
    2379: "2.4",
    2380: "2.5",
    2381: "2.5",
    2382: "2.6",
    2384: "2.7",
    2386: "2.8",
    2387: "2.8",
    2389: "2.9",
    2393: "3.1",
    8374: "2.2",
    8376: "2.3",
    8378: "2.4",
    8379: "2.4",
    8380: "2.5",
    8381: "2.5",
    8382: "2.6",
    8384: "2.7",
    8386: "2.8",
    8387: "2.8",
    8389: "2.9",
    8393: "3.1",
    "2419EE": "1.8",
    "2423HE": "2.0",
    "2425HE": "2.1",
    2427: "2.2",
    2431: "2.4",
    2435: "2.6",
    "2439SE": "2.8",
    "8425HE": "2.1",
    8431: "2.4",
    8435: "2.6",
    "8439SE": "2.8",
    4122: "2.2",
    4130: "2.6",
    "4162EE": "1.7",
    "4164EE": "1.8",
    "4170HE": "2.1",
    "4174HE": "2.3",
    "4176HE": "2.4",
    4180: "2.6",
    4184: "2.8",
    "6124HE": "1.8",
    "6128HE": "2.0",
    "6132HE": "2.2",
    6128: "2.0",
    6134: "2.3",
    6136: "2.4",
    6140: "2.6",
    "6164HE": "1.7",
    "6166HE": "1.8",
    6168: "1.9",
    6172: "2.1",
    6174: "2.2",
    6176: "2.3",
    "6176SE": "2.3",
    "6180SE": "2.5",
    3250: "2.5",
    3260: "2.7",
    3280: "2.4",
    4226: "2.7",
    4228: "2.8",
    4230: "2.9",
    4234: "3.1",
    4238: "3.3",
    4240: "3.4",
    4256: "1.6",
    4274: "2.5",
    4276: "2.6",
    4280: "2.8",
    4284: "3.0",
    6204: "3.3",
    6212: "2.6",
    6220: "3.0",
    6234: "2.4",
    6238: "2.6",
    "6262HE": "1.6",
    6272: "2.1",
    6274: "2.2",
    6276: "2.3",
    6278: "2.4",
    "6282SE": "2.6",
    "6284SE": "2.7",
    6308: "3.5",
    6320: "2.8",
    6328: "3.2",
    "6338P": "2.3",
    6344: "2.6",
    6348: "2.8",
    6366: "1.8",
    "6370P": "2.0",
    6376: "2.3",
    6378: "2.4",
    6380: "2.5",
    6386: "2.8",
    "FX|4100": "3.6",
    "FX|4120": "3.9",
    "FX|4130": "3.8",
    "FX|4150": "3.8",
    "FX|4170": "4.2",
    "FX|6100": "3.3",
    "FX|6120": "3.6",
    "FX|6130": "3.6",
    "FX|6200": "3.8",
    "FX|8100": "2.8",
    "FX|8120": "3.1",
    "FX|8140": "3.2",
    "FX|8150": "3.6",
    "FX|8170": "3.9",
    "FX|4300": "3.8",
    "FX|4320": "4.0",
    "FX|4350": "4.2",
    "FX|6300": "3.5",
    "FX|6350": "3.9",
    "FX|8300": "3.3",
    "FX|8310": "3.4",
    "FX|8320": "3.5",
    "FX|8350": "4.0",
    "FX|8370": "4.0",
    "FX|9370": "4.4",
    "FX|9590": "4.7",
    "FX|8320E": "3.2",
    "FX|8370E": "3.3",
    // ZEN Desktop CPUs
    1200: "3.1",
    "Pro 1200": "3.1",
    "1300X": "3.5",
    "Pro 1300": "3.5",
    1400: "3.2",
    "1500X": "3.5",
    "Pro 1500": "3.5",
    1600: "3.2",
    "1600X": "3.6",
    "Pro 1600": "3.2",
    1700: "3.0",
    "Pro 1700": "3.0",
    "1700X": "3.4",
    "Pro 1700X": "3.4",
    "1800X": "3.6",
    "1900X": "3.8",
    1920: "3.2",
    "1920X": "3.5",
    "1950X": "3.4",
    // ZEN Desktop APUs
    "200GE": "3.2",
    "Pro 200GE": "3.2",
    "220GE": "3.4",
    "240GE": "3.5",
    "3000G": "3.5",
    "300GE": "3.4",
    "3050GE": "3.4",
    "2200G": "3.5",
    "Pro 2200G": "3.5",
    "2200GE": "3.2",
    "Pro 2200GE": "3.2",
    "2400G": "3.6",
    "Pro 2400G": "3.6",
    "2400GE": "3.2",
    "Pro 2400GE": "3.2",
    // ZEN Mobile APUs
    "Pro 200U": "2.3",
    "300U": "2.4",
    "2200U": "2.5",
    "3200U": "2.6",
    "2300U": "2.0",
    "Pro 2300U": "2.0",
    "2500U": "2.0",
    "Pro 2500U": "2.2",
    "2600H": "3.2",
    "2700U": "2.0",
    "Pro 2700U": "2.2",
    "2800H": "3.3",
    // ZEN Server Processors
    7351: "2.4",
    "7351P": "2.4",
    7401: "2.0",
    "7401P": "2.0",
    "7551P": "2.0",
    7551: "2.0",
    7251: "2.1",
    7261: "2.5",
    7281: "2.1",
    7301: "2.2",
    7371: "3.1",
    7451: "2.3",
    7501: "2.0",
    7571: "2.2",
    7601: "2.2",
    // ZEN Embedded Processors
    V1500B: "2.2",
    V1780B: "3.35",
    V1202B: "2.3",
    V1404I: "2.0",
    V1605B: "2.0",
    V1756B: "3.25",
    V1807B: "3.35",
    3101: "2.1",
    3151: "2.7",
    3201: "1.5",
    3251: "2.5",
    3255: "2.5",
    3301: "2.0",
    3351: "1.9",
    3401: "1.85",
    3451: "2.15",
    // ZEN+ Desktop
    "1200|AF": "3.1",
    "2300X": "3.5",
    "2500X": "3.6",
    2600: "3.4",
    "2600E": "3.1",
    "1600|AF": "3.2",
    "2600X": "3.6",
    2700: "3.2",
    "2700E": "2.8",
    "Pro 2700": "3.2",
    "2700X": "3.7",
    "Pro 2700X": "3.6",
    "2920X": "3.5",
    "2950X": "3.5",
    "2970WX": "3.0",
    "2990WX": "3.0",
    // ZEN+ Desktop APU
    "Pro 300GE": "3.4",
    "Pro 3125GE": "3.4",
    "3150G": "3.5",
    "Pro 3150G": "3.5",
    "3150GE": "3.3",
    "Pro 3150GE": "3.3",
    "3200G": "3.6",
    "Pro 3200G": "3.6",
    "3200GE": "3.3",
    "Pro 3200GE": "3.3",
    "3350G": "3.6",
    "Pro 3350G": "3.6",
    "3350GE": "3.3",
    "Pro 3350GE": "3.3",
    "3400G": "3.7",
    "Pro 3400G": "3.7",
    "3400GE": "3.3",
    "Pro 3400GE": "3.3",
    // ZEN+ Mobile
    "3300U": "2.1",
    "PRO 3300U": "2.1",
    "3450U": "2.1",
    "3500U": "2.1",
    "PRO 3500U": "2.1",
    "3500C": "2.1",
    "3550H": "2.1",
    "3580U": "2.1",
    "3700U": "2.3",
    "PRO 3700U": "2.3",
    "3700C": "2.3",
    "3750H": "2.3",
    "3780U": "2.3",
    // ZEN2 Desktop CPUS
    3100: "3.6",
    "3300X": "3.8",
    3500: "3.6",
    "3500X": "3.6",
    3600: "3.6",
    "Pro 3600": "3.6",
    "3600X": "3.8",
    "3600XT": "3.8",
    "Pro 3700": "3.6",
    "3700X": "3.6",
    "3800X": "3.9",
    "3800XT": "3.9",
    3900: "3.1",
    "Pro 3900": "3.1",
    "3900X": "3.8",
    "3900XT": "3.8",
    "3950X": "3.5",
    "3960X": "3.8",
    "3970X": "3.7",
    "3990X": "2.9",
    "3945WX": "4.0",
    "3955WX": "3.9",
    "3975WX": "3.5",
    "3995WX": "2.7",
    // ZEN2 Desktop APUs
    "4300GE": "3.5",
    "Pro 4300GE": "3.5",
    "4300G": "3.8",
    "Pro 4300G": "3.8",
    "4600GE": "3.3",
    "Pro 4650GE": "3.3",
    "4600G": "3.7",
    "Pro 4650G": "3.7",
    "4700GE": "3.1",
    "Pro 4750GE": "3.1",
    "4700G": "3.6",
    "Pro 4750G": "3.6",
    "4300U": "2.7",
    "4450U": "2.5",
    "Pro 4450U": "2.5",
    "4500U": "2.3",
    "4600U": "2.1",
    "PRO 4650U": "2.1",
    "4680U": "2.1",
    "4600HS": "3.0",
    "4600H": "3.0",
    "4700U": "2.0",
    "PRO 4750U": "1.7",
    "4800U": "1.8",
    "4800HS": "2.9",
    "4800H": "2.9",
    "4900HS": "3.0",
    "4900H": "3.3",
    "5300U": "2.6",
    "5500U": "2.1",
    "5700U": "1.8",
    // ZEN2 - EPYC
    "7232P": "3.1",
    "7302P": "3.0",
    "7402P": "2.8",
    "7502P": "2.5",
    "7702P": "2.0",
    7252: "3.1",
    7262: "3.2",
    7272: "2.9",
    7282: "2.8",
    7302: "3.0",
    7352: "2.3",
    7402: "2.8",
    7452: "2.35",
    7502: "2.5",
    7532: "2.4",
    7542: "2.9",
    7552: "2.2",
    7642: "2.3",
    7662: "2.0",
    7702: "2.0",
    7742: "2.25",
    "7H12": "2.6",
    "7F32": "3.7",
    "7F52": "3.5",
    "7F72": "3.2",
    // Epyc (Milan)
    "7773X": "2.2",
    7763: "2.45",
    7713: "2.0",
    "7713P": "2.0",
    7663: "2.0",
    7643: "2.3",
    "7573X": "2.8",
    "75F3": "2.95",
    7543: "2.8",
    "7543P": "2.8",
    7513: "2.6",
    "7473X": "2.8",
    7453: "2.75",
    "74F3": "3.2",
    7443: "2.85",
    "7443P": "2.85",
    7413: "2.65",
    "7373X": "3.05",
    "73F3": "3.5",
    7343: "3.2",
    7313: "3.0",
    "7313P": "3.0",
    "72F3": "3.7",
    // ZEN3
    "5600X": "3.7",
    "5800X": "3.8",
    "5900X": "3.7",
    "5950X": "3.4",
    "5945WX": "4.1",
    "5955WX": "4.0",
    "5965WX": "3.8",
    "5975WX": "3.6",
    "5995WX": "2.7",
    "7960X": "4.2",
    "7970X": "4.0",
    "7980X": "3.2",
    "7965WX": "4.2",
    "7975WX": "4.0",
    "7985WX": "3.2",
    "7995WX": "2.5",
    // ZEN4
    9754: "2.25",
    "9754S": "2.25",
    9734: "2.2",
    "9684X": "2.55",
    "9384X": "3.1",
    "9184X": "3.55",
    "9654P": "2.4",
    9654: "2.4",
    9634: "2.25",
    "9554P": "3.1",
    9554: "3.1",
    9534: "2.45",
    "9474F": "3.6",
    "9454P": "2.75",
    9454: "2.75",
    "9374F": "3.85",
    "9354P": "3.25",
    9354: "3.25",
    9334: "2.7",
    "9274F": "4.05",
    9254: "2.9",
    9224: "2.5",
    "9174F": "4.1",
    9124: "3.0",
  },
  Hr = {
    1: "Other",
    2: "Unknown",
    3: "Daughter Board",
    4: "ZIF Socket",
    5: "Replacement/Piggy Back",
    6: "None",
    7: "LIF Socket",
    8: "Slot 1",
    9: "Slot 2",
    10: "370 Pin Socket",
    11: "Slot A",
    12: "Slot M",
    13: "423",
    14: "A (Socket 462)",
    15: "478",
    16: "754",
    17: "940",
    18: "939",
    19: "mPGA604",
    20: "LGA771",
    21: "LGA775",
    22: "S1",
    23: "AM2",
    24: "F (1207)",
    25: "LGA1366",
    26: "G34",
    27: "AM3",
    28: "C32",
    29: "LGA1156",
    30: "LGA1567",
    31: "PGA988A",
    32: "BGA1288",
    33: "rPGA988B",
    34: "BGA1023",
    35: "BGA1224",
    36: "LGA1155",
    37: "LGA1356",
    38: "LGA2011",
    39: "FS1",
    40: "FS2",
    41: "FM1",
    42: "FM2",
    43: "LGA2011-3",
    44: "LGA1356-3",
    45: "LGA1150",
    46: "BGA1168",
    47: "BGA1234",
    48: "BGA1364",
    49: "AM4",
    50: "LGA1151",
    51: "BGA1356",
    52: "BGA1440",
    53: "BGA1515",
    54: "LGA3647-1",
    55: "SP3",
    56: "SP3r2",
    57: "LGA2066",
    58: "BGA1392",
    59: "BGA1510",
    60: "BGA1528",
    61: "LGA4189",
    62: "LGA1200",
    63: "LGA4677",
    64: "LGA1700",
    65: "BGA1744",
    66: "BGA1781",
    67: "BGA1211",
    68: "BGA2422",
    69: "LGA1211",
    70: "LGA2422",
    71: "LGA5773",
    72: "BGA5773",
    73: "AM5",
    74: "SP5",
    75: "SP6",
    76: "BGA883",
    77: "BGA1190",
    78: "BGA4129",
    79: "LGA4710",
    80: "LGA7529",
    81: "BGA1964",
    82: "BGA1792",
    83: "BGA2049",
    84: "BGA2551",
    85: "LGA1851",
    86: "BGA2114",
    87: "BGA2833",
  },
  jr = {
    LGA1150:
      "i7-5775C i3-4340 i3-4170 G3250 i3-4160T i3-4160 E3-1231 G3258 G3240 i7-4790S i7-4790K i7-4790 i5-4690K i5-4690 i5-4590T i5-4590S i5-4590 i5-4460 i3-4360 i3-4150 G1820 G3420 G3220 i7-4771 i5-4440 i3-4330 i3-4130T i3-4130 E3-1230 i7-4770S i7-4770K i7-4770 i5-4670K i5-4670 i5-4570T i5-4570S i5-4570 i5-4430",
    LGA1151:
      "i9-9900KS E-2288G E-2224 G5420 i9-9900T i9-9900 i7-9700T i7-9700F i7-9700E i7-9700 i5-9600 i5-9500T i5-9500F i5-9500 i5-9400T i3-9350K i3-9300 i3-9100T i3-9100F i3-9100 G4930 i9-9900KF i7-9700KF i5-9600KF i5-9400F i5-9400 i3-9350KF i9-9900K i7-9700K i5-9600K G5500 G5400 i7-8700T i7-8086K i5-8600 i5-8500T i5-8500 i5-8400T i3-8300 i3-8100T G4900 i7-8700K i7-8700 i5-8600K i5-8400 i3-8350K i3-8100 E3-1270 G4600 G4560 i7-7700T i7-7700K i7-7700 i5-7600K i5-7600 i5-7500T i5-7500 i5-7400 i3-7350K i3-7300 i3-7100T i3-7100 G3930 G3900 G4400 i7-6700T i7-6700K i7-6700 i5-6600K i5-6600 i5-6500T i5-6500 i5-6400T i5-6400 i3-6300 i3-6100T i3-6100 E3-1270 E3-1270 T4500 T4400",
    1155: "G440 G460 G465 G470 G530T G540T G550T G1610T G1620T G530 G540 G1610 G550 G1620 G555 G1630 i3-2100T i3-2120T i3-3220T i3-3240T i3-3250T i3-2100 i3-2105 i3-2102 i3-3210 i3-3220 i3-2125 i3-2120 i3-3225 i3-2130 i3-3245 i3-3240 i3-3250 i5-3570T i5-2500T i5-2400S i5-2405S i5-2390T i5-3330S i5-2500S i5-3335S i5-2300 i5-3450S i5-3340S i5-3470S i5-3475S i5-3470T i5-2310 i5-3550S i5-2320 i5-3330 i5-3350P i5-3450 i5-2400 i5-3340 i5-3570S i5-2380P i5-2450P i5-3470 i5-2500K i5-3550 i5-2500 i5-3570 i5-3570K i5-2550K i7-3770T i7-2600S i7-3770S i7-2600K i7-2600 i7-3770 i7-3770K i7-2700K G620T G630T G640T G2020T G645T G2100T G2030T G622 G860T G620 G632 G2120T G630 G640 G2010 G840 G2020 G850 G645 G2030 G860 G2120 G870 G2130 G2140 E3-1220L E3-1220L E3-1260L E3-1265L E3-1220 E3-1225 E3-1220 E3-1235 E3-1225 E3-1230 E3-1230 E3-1240 E3-1245 E3-1270 E3-1275 E3-1240 E3-1245 E3-1270 E3-1280 E3-1275 E3-1290 E3-1280 E3-1290",
  };
function xl(t) {
  let n = "";
  for (const e in jr)
    jr[e].split(" ").forEach((s) => {
      t.indexOf(s) >= 0 && (n = e);
    });
  return n;
}
function ri(t) {
  let n = t;
  return (
    (t = t.toLowerCase()),
    t.indexOf("intel") >= 0 && (n = "Intel"),
    t.indexOf("amd") >= 0 && (n = "AMD"),
    t.indexOf("qemu") >= 0 && (n = "QEMU"),
    t.indexOf("hygon") >= 0 && (n = "Hygon"),
    t.indexOf("centaur") >= 0 && (n = "WinChip/Via"),
    t.indexOf("vmware") >= 0 && (n = "VMware"),
    t.indexOf("Xen") >= 0 && (n = "Xen Hypervisor"),
    t.indexOf("tcg") >= 0 && (n = "QEMU"),
    t.indexOf("apple") >= 0 && (n = "Apple"),
    t.indexOf("sifive") >= 0 && (n = "SiFive"),
    t.indexOf("thead") >= 0 && (n = "T-Head"),
    t.indexOf("andestech") >= 0 && (n = "Andes Technology"),
    n
  );
}
function Kn(t) {
  ((t.brand = t.brand
    .replace(/\(R\)+/g, "®")
    .replace(/\s+/g, " ")
    .trim()),
    (t.brand = t.brand
      .replace(/\(TM\)+/g, "™")
      .replace(/\s+/g, " ")
      .trim()),
    (t.brand = t.brand
      .replace(/\(C\)+/g, "©")
      .replace(/\s+/g, " ")
      .trim()),
    (t.brand = t.brand.replace(/CPU+/g, "").replace(/\s+/g, " ").trim()),
    (t.manufacturer = ri(t.brand)));
  let n = t.brand.split(" ");
  return (n.shift(), (t.brand = n.join(" ")), t);
}
function Ri(t) {
  let n = "0";
  for (let e in Wi)
    if ({}.hasOwnProperty.call(Wi, e)) {
      let i = e.split("|"),
        s = 0;
      (i.forEach((r) => {
        t.indexOf(r) > -1 && s++;
      }),
        s === i.length && (n = Wi[e]));
    }
  return parseFloat(n);
}
function Sl() {
  return new Promise((t) => {
    process.nextTick(() => {
      const n = "unknown";
      let e = {
        manufacturer: n,
        brand: n,
        vendor: "",
        family: "",
        model: "",
        stepping: "",
        revision: "",
        voltage: "",
        speed: 0,
        speedMin: 0,
        speedMax: 0,
        governor: "",
        cores: P.cores(),
        physicalCores: P.cores(),
        performanceCores: P.cores(),
        efficiencyCores: 0,
        processors: 1,
        socket: "",
        flags: "",
        virtualization: !1,
        cache: {},
      };
      Qs().then((i) => {
        if (
          ((e.flags = i),
          (e.virtualization = i.indexOf("vmx") > -1 || i.indexOf("svm") > -1),
          Ii &&
            we(
              "sysctl machdep.cpu hw.cpufrequency_max hw.cpufrequency_min hw.packages hw.physicalcpu_max hw.ncpu hw.tbfrequency hw.cpufamily hw.cpusubfamily",
              function (s, r) {
                let o = r.toString().split(`
`);
                const c = P.getValue(o, "machdep.cpu.brand_string").split("@");
                e.brand = c[0].trim();
                const u = c[1] ? c[1].trim() : "0";
                e.speed = parseFloat(u.replace(/GHz+/g, ""));
                let l = P.getValue(o, "hw.tbfrequency") / 1e9;
                ((l = l < 0.1 ? l * 100 : l),
                  (e.speed = e.speed === 0 ? l : e.speed),
                  (on = e.speed),
                  (e = Kn(e)),
                  (e.speedMin = P.getValue(o, "hw.cpufrequency_min")
                    ? P.getValue(o, "hw.cpufrequency_min") / 1e9
                    : e.speed),
                  (e.speedMax = P.getValue(o, "hw.cpufrequency_max")
                    ? P.getValue(o, "hw.cpufrequency_max") / 1e9
                    : e.speed),
                  (e.vendor = P.getValue(o, "machdep.cpu.vendor") || "Apple"),
                  (e.family =
                    P.getValue(o, "machdep.cpu.family") ||
                    P.getValue(o, "hw.cpufamily")),
                  (e.model = P.getValue(o, "machdep.cpu.model")),
                  (e.stepping =
                    P.getValue(o, "machdep.cpu.stepping") ||
                    P.getValue(o, "hw.cpusubfamily")),
                  (e.virtualization = !0));
                const f = P.getValue(o, "hw.packages"),
                  p = P.getValue(o, "hw.physicalcpu_max"),
                  d = P.getValue(o, "hw.ncpu");
                if (Ge.arch() === "arm64") {
                  e.socket = "SOC";
                  try {
                    const m = Li(
                        "ioreg -c IOPlatformDevice -d 3 -r | grep cluster-type",
                      ).toString().split(`
`),
                      h = m.filter((g) => g.indexOf('"E"') >= 0).length,
                      y = m.filter((g) => g.indexOf('"P"') >= 0).length;
                    ((e.efficiencyCores = h), (e.performanceCores = y));
                  } catch {
                    P.noop();
                  }
                }
                (f && (e.processors = parseInt(f) || 1),
                  p &&
                    d &&
                    ((e.cores = parseInt(d) || P.cores()),
                    (e.physicalCores = parseInt(p) || P.cores())),
                  Zs().then((m) => {
                    ((e.cache = m), t(e));
                  }));
              },
            ),
          yn)
        ) {
          let s = "",
            r = [];
          (Ge.cpus()[0] && Ge.cpus()[0].model && (s = Ge.cpus()[0].model),
            we(
              'export LC_ALL=C; lscpu; echo -n "Governor: "; cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor 2>/dev/null; echo; unset LC_ALL',
              function (o, a) {
                (o ||
                  (r = a.toString().split(`
`)),
                  (s = P.getValue(r, "model name") || s),
                  (s = P.getValue(r, "bios model name") || s),
                  (s = P.cleanString(s)));
                const c = s.split("@");
                if (
                  ((e.brand = c[0].trim()),
                  (e.speed = c[1] ? parseFloat(c[1].trim()) : 0),
                  e.speed === 0 &&
                    (e.brand.indexOf("AMD") > -1 ||
                      e.brand.toLowerCase().indexOf("ryzen") > -1) &&
                    (e.speed = Ri(e.brand)),
                  e.speed === 0)
                ) {
                  const h = or();
                  h.avg !== 0 && (e.speed = h.avg);
                }
                ((on = e.speed),
                  (e.speedMin =
                    Math.round(
                      parseFloat(
                        P.getValue(r, "cpu min mhz").replace(/,/g, "."),
                      ) / 10,
                    ) / 100),
                  (e.speedMax =
                    Math.round(
                      parseFloat(
                        P.getValue(r, "cpu max mhz").replace(/,/g, "."),
                      ) / 10,
                    ) / 100),
                  (e = Kn(e)),
                  (e.vendor = ri(P.getValue(r, "vendor id"))),
                  (e.family = P.getValue(r, "cpu family")),
                  (e.model = P.getValue(r, "model:")),
                  (e.stepping = P.getValue(r, "stepping")),
                  (e.revision = P.getValue(r, "cpu revision")),
                  (e.cache.l1d = P.getValue(r, "l1d cache")),
                  e.cache.l1d &&
                    (e.cache.l1d =
                      parseInt(e.cache.l1d) *
                      (e.cache.l1d.indexOf("M") !== -1
                        ? 1024 * 1024
                        : e.cache.l1d.indexOf("K") !== -1
                          ? 1024
                          : 1)),
                  (e.cache.l1i = P.getValue(r, "l1i cache")),
                  e.cache.l1i &&
                    (e.cache.l1i =
                      parseInt(e.cache.l1i) *
                      (e.cache.l1i.indexOf("M") !== -1
                        ? 1024 * 1024
                        : e.cache.l1i.indexOf("K") !== -1
                          ? 1024
                          : 1)),
                  (e.cache.l2 = P.getValue(r, "l2 cache")),
                  e.cache.l2 &&
                    (e.cache.l2 =
                      parseInt(e.cache.l2) *
                      (e.cache.l2.indexOf("M") !== -1
                        ? 1024 * 1024
                        : e.cache.l2.indexOf("K") !== -1
                          ? 1024
                          : 1)),
                  (e.cache.l3 = P.getValue(r, "l3 cache")),
                  e.cache.l3 &&
                    (e.cache.l3 =
                      parseInt(e.cache.l3) *
                      (e.cache.l3.indexOf("M") !== -1
                        ? 1024 * 1024
                        : e.cache.l3.indexOf("K") !== -1
                          ? 1024
                          : 1)));
                const u = P.getValue(r, "thread(s) per core") || "1",
                  l = P.getValue(r, "socket(s)") || "1",
                  f = parseInt(u, 10),
                  p = parseInt(l, 10) || 1,
                  d = parseInt(P.getValue(r, "core(s) per socket"), 10);
                if (
                  ((e.physicalCores = d ? d * p : e.cores / f),
                  (e.performanceCores =
                    f > 1 ? e.cores - e.physicalCores : e.cores),
                  (e.efficiencyCores =
                    f > 1 ? e.cores - f * e.performanceCores : 0),
                  (e.processors = p),
                  (e.governor = P.getValue(r, "governor") || ""),
                  e.vendor === "ARM" && P.isRaspberry())
                ) {
                  const h = P.decodePiCpuinfo();
                  ((e.family = e.manufacturer),
                    (e.manufacturer = h.manufacturer),
                    (e.brand = h.processor),
                    (e.revision = h.revisionCode),
                    (e.socket = "SOC"));
                }
                if (P.getValue(r, "architecture") === "riscv64") {
                  const h = ui.readFileSync("/proc/cpuinfo").toString().split(`
`),
                    y = P.getValue(h, "uarch") || "";
                  if (y.indexOf(",") > -1) {
                    const g = y.split(",");
                    ((e.manufacturer = ri(g[0])), (e.brand = g[1]));
                  }
                }
                let m = [];
                we(
                  'export LC_ALL=C; dmidecode –t 4 2>/dev/null | grep "Upgrade: Socket"; unset LC_ALL',
                  function (h, y) {
                    ((m = y.toString().split(`
`)),
                      m &&
                        m.length &&
                        (e.socket =
                          P.getValue(m, "Upgrade")
                            .replace("Socket", "")
                            .trim() || e.socket),
                      t(e));
                  },
                );
              },
            ));
        }
        if (_i || Oi || Pi) {
          let s = "",
            r = [];
          (Ge.cpus()[0] && Ge.cpus()[0].model && (s = Ge.cpus()[0].model),
            we(
              "export LC_ALL=C; dmidecode -t 4; dmidecode -t 7 unset LC_ALL",
              function (o, a) {
                let c = [];
                if (!o) {
                  const d = a.toString().split("# dmidecode"),
                    m = d.length > 1 ? d[1] : "";
                  ((c = d.length > 2 ? d[2].split("Cache Information") : []),
                    (r = m.split(`
`)));
                }
                if (
                  ((e.brand = s.split("@")[0].trim()),
                  (e.speed = s.split("@")[1]
                    ? parseFloat(s.split("@")[1].trim())
                    : 0),
                  e.speed === 0 &&
                    (e.brand.indexOf("AMD") > -1 ||
                      e.brand.toLowerCase().indexOf("ryzen") > -1) &&
                    (e.speed = Ri(e.brand)),
                  e.speed === 0)
                ) {
                  const d = or();
                  d.avg !== 0 && (e.speed = d.avg);
                }
                ((on = e.speed),
                  (e.speedMin = e.speed),
                  (e.speedMax =
                    Math.round(
                      parseFloat(
                        P.getValue(r, "max speed").replace(/Mhz/g, ""),
                      ) / 10,
                    ) / 100),
                  (e = Kn(e)),
                  (e.vendor = ri(P.getValue(r, "manufacturer"))));
                let u = P.getValue(r, "signature");
                u = u.split(",");
                for (let d = 0; d < u.length; d++) u[d] = u[d].trim();
                ((e.family = P.getValue(u, "Family", " ", !0)),
                  (e.model = P.getValue(u, "Model", " ", !0)),
                  (e.stepping = P.getValue(u, "Stepping", " ", !0)),
                  (e.revision = ""));
                const l = parseFloat(P.getValue(r, "voltage"));
                e.voltage = isNaN(l) ? "" : l.toFixed(2);
                for (let d = 0; d < c.length; d++) {
                  r = c[d].split(`
`);
                  let m = P.getValue(r, "Socket Designation")
                    .toLowerCase()
                    .replace(" ", "-")
                    .split("-");
                  m = m.length ? m[0] : "";
                  const h = P.getValue(r, "Installed Size").split(" ");
                  let y = parseInt(h[0], 10);
                  const g = h.length > 1 ? h[1] : "kb";
                  ((y =
                    y *
                    (g === "kb"
                      ? 1024
                      : g === "mb"
                        ? 1024 * 1024
                        : g === "gb"
                          ? 1024 * 1024 * 1024
                          : 1)),
                    m &&
                      (m === "l1"
                        ? ((e.cache[m + "d"] = y / 2),
                          (e.cache[m + "i"] = y / 2))
                        : (e.cache[m] = y)));
                }
                e.socket = P.getValue(r, "Upgrade")
                  .replace("Socket", "")
                  .trim();
                const f = P.getValue(r, "thread count").trim(),
                  p = P.getValue(r, "core count").trim();
                (p &&
                  f &&
                  ((e.cores = parseInt(f, 10)),
                  (e.physicalCores = parseInt(p, 10))),
                  t(e));
              },
            ));
        }
        if ((Ei && t(e), vi))
          try {
            const s = [];
            (s.push(
              P.powerShell(
                "Get-CimInstance Win32_processor | select Name, Revision, L2CacheSize, L3CacheSize, Manufacturer, MaxClockSpeed, Description, UpgradeMethod, Caption, NumberOfLogicalProcessors, NumberOfCores | fl",
              ),
            ),
              s.push(
                P.powerShell(
                  "Get-CimInstance Win32_CacheMemory | select CacheType,InstalledSize,Level | fl",
                ),
              ),
              s.push(
                P.powerShell(
                  "(Get-CimInstance Win32_ComputerSystem).HypervisorPresent",
                ),
              ),
              Promise.all(s).then((r) => {
                let o = r[0].split(`\r
`),
                  a = P.getValue(o, "name", ":") || "";
                (a.indexOf("@") >= 0
                  ? ((e.brand = a.split("@")[0].trim()),
                    (e.speed = a.split("@")[1]
                      ? parseFloat(a.split("@")[1].trim())
                      : 0),
                    (on = e.speed))
                  : ((e.brand = a.trim()), (e.speed = 0)),
                  (e = Kn(e)),
                  (e.revision = P.getValue(o, "revision", ":")),
                  (e.vendor = P.getValue(o, "manufacturer", ":")),
                  (e.speedMax =
                    Math.round(
                      parseFloat(
                        P.getValue(o, "maxclockspeed", ":").replace(/,/g, "."),
                      ) / 10,
                    ) / 100),
                  e.speed === 0 &&
                    (e.brand.indexOf("AMD") > -1 ||
                      e.brand.toLowerCase().indexOf("ryzen") > -1) &&
                    (e.speed = Ri(e.brand)),
                  e.speed === 0 && (e.speed = e.speedMax),
                  (e.speedMin = e.speed));
                let c = P.getValue(o, "description", ":").split(" ");
                for (let h = 0; h < c.length; h++)
                  (c[h].toLowerCase().startsWith("family") &&
                    h + 1 < c.length &&
                    c[h + 1] &&
                    (e.family = c[h + 1]),
                    c[h].toLowerCase().startsWith("model") &&
                      h + 1 < c.length &&
                      c[h + 1] &&
                      (e.model = c[h + 1]),
                    c[h].toLowerCase().startsWith("stepping") &&
                      h + 1 < c.length &&
                      c[h + 1] &&
                      (e.stepping = c[h + 1]));
                const u = P.getValue(o, "UpgradeMethod", ":");
                Hr[u] && (e.socket = Hr[u]);
                const l = xl(a);
                l && (e.socket = l);
                const f = P.countLines(o, "Caption"),
                  p = P.getValue(o, "NumberOfLogicalProcessors", ":"),
                  d = P.getValue(o, "NumberOfCores", ":");
                (f && (e.processors = parseInt(f) || 1),
                  d &&
                    p &&
                    ((e.cores = parseInt(p) || P.cores()),
                    (e.physicalCores = parseInt(d) || P.cores())),
                  f > 1 &&
                    ((e.cores = e.cores * f),
                    (e.physicalCores = e.physicalCores * f)),
                  (e.cache = eo(r[0], r[1])));
                const m = r[2] ? r[2].toString().toLowerCase() : "";
                ((e.virtualization = m.indexOf("true") !== -1), t(e));
              }));
          } catch {
            t(e);
          }
      });
    });
  });
}
function wl(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      Sl().then((e) => {
        (t && t(e), n(e));
      });
    });
  });
}
At.cpu = wl;
function or() {
  let t = Ge.cpus(),
    n = 999999999,
    e = 0,
    i = 0,
    s = [],
    r = [];
  if (t && t.length && t[0].hasOwnProperty("speed"))
    for (let o in t)
      r.push(t[o].speed > 100 ? (t[o].speed + 1) / 1e3 : t[o].speed / 10);
  else if (yn)
    try {
      const o = Li(
        'cat /proc/cpuinfo | grep "cpu MHz" | cut -d " " -f 3',
        P.execOptsLinux,
      )
        .toString()
        .split(
          `
`,
        )
        .filter((a) => a.length > 0);
      for (let a in o) r.push(Math.floor(parseInt(o[a], 10) / 10) / 100);
    } catch {
      P.noop();
    }
  if (r && r.length)
    try {
      for (let o in r)
        ((i = i + r[o]),
          r[o] > e && (e = r[o]),
          r[o] < n && (n = r[o]),
          s.push(parseFloat(r[o].toFixed(2))));
      return (
        (i = i / r.length),
        {
          min: parseFloat(n.toFixed(2)),
          max: parseFloat(e.toFixed(2)),
          avg: parseFloat(i.toFixed(2)),
          cores: s,
        }
      );
    } catch {
      return {
        min: 0,
        max: 0,
        avg: 0,
        cores: s,
      };
    }
  else
    return {
      min: 0,
      max: 0,
      avg: 0,
      cores: s,
    };
}
function Cl(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = or();
      if (e.avg === 0 && on !== 0) {
        const i = parseFloat(on);
        e = {
          min: i,
          max: i,
          avg: i,
          cores: [],
        };
      }
      (t && t(e), n(e));
    });
  });
}
At.cpuCurrentSpeed = Cl;
function Ll(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        main: null,
        cores: [],
        max: null,
        socket: [],
        chipset: null,
      };
      if (yn) {
        try {
          const r = Li(
            'cat /sys/class/thermal/thermal_zone*/type  2>/dev/null; echo "-----"; cat /sys/class/thermal/thermal_zone*/temp 2>/dev/null;',
            P.execOptsLinux,
          ).toString().split(`-----
`);
          if (r.length === 2) {
            const o = r[0].split(`
`),
              a = r[1].split(`
`);
            for (let c = 0; c < o.length; c++) {
              const u = o[c].trim();
              (u.startsWith("acpi") &&
                a[c] &&
                e.socket.push(Math.round(parseInt(a[c], 10) / 100) / 10),
                u.startsWith("pch") &&
                  a[c] &&
                  (e.chipset = Math.round(parseInt(a[c], 10) / 100) / 10));
            }
          }
        } catch {
          P.noop();
        }
        const i =
          'for mon in /sys/class/hwmon/hwmon*; do for label in "$mon"/temp*_label; do if [ -f $label ]; then value=${label%_*}_input; echo $(cat "$label")___$(cat "$value"); fi; done; done;';
        try {
          we(i, function (s, r) {
            r = r.toString();
            const o = r.toLowerCase().indexOf("tdie");
            o !== -1 && (r = r.substring(o));
            let a = r.split(`
`),
              c = 0;
            if (
              (a.forEach((u) => {
                const l = u.split("___"),
                  f = l[0],
                  p = l.length > 1 && l[1] ? l[1] : "0";
                (p &&
                  f &&
                  f.toLowerCase() === "tctl" &&
                  (c = e.main = Math.round(parseInt(p, 10) / 100) / 10),
                  p &&
                  (f === void 0 || (f && f.toLowerCase().startsWith("core")))
                    ? e.cores.push(Math.round(parseInt(p, 10) / 100) / 10)
                    : p &&
                      f &&
                      e.main === null &&
                      (f.toLowerCase().indexOf("package") >= 0 ||
                        f.toLowerCase().indexOf("physical") >= 0 ||
                        f.toLowerCase() === "tccd1") &&
                      (e.main = Math.round(parseInt(p, 10) / 100) / 10));
              }),
              c && e.main === null && (e.main = c),
              e.cores.length > 0)
            ) {
              e.main === null &&
                (e.main = Math.round(
                  e.cores.reduce((l, f) => l + f, 0) / e.cores.length,
                ));
              let u = Math.max.apply(Math, e.cores);
              e.max = u > e.main ? u : e.main;
            }
            if (e.main !== null) {
              (e.max === null && (e.max = e.main), t && t(e), n(e));
              return;
            }
            we("sensors", function (u, l) {
              if (!u) {
                let f = l.toString().split(`
`),
                  p = null,
                  d = !0,
                  m = "";
                if (
                  (f.forEach(function (h) {
                    h.trim() === ""
                      ? (d = !0)
                      : d &&
                        (h.trim().toLowerCase().startsWith("acpi") &&
                          (m = "acpi"),
                        h.trim().toLowerCase().startsWith("pch") && (m = "pch"),
                        h.trim().toLowerCase().startsWith("core") &&
                          (m = "core"),
                        (d = !1));
                    let y = /[+-]([^°]*)/g,
                      g = h.match(y),
                      x = h.split(":")[0].toUpperCase();
                    (m === "acpi"
                      ? x.indexOf("TEMP") !== -1 && e.socket.push(parseFloat(g))
                      : m === "pch" &&
                        x.indexOf("TEMP") !== -1 &&
                        !e.chipset &&
                        (e.chipset = parseFloat(g)),
                      (x.indexOf("PHYSICAL") !== -1 ||
                        x.indexOf("PACKAGE") !== -1) &&
                        (e.main = parseFloat(g)),
                      x.indexOf("CORE ") !== -1 && e.cores.push(parseFloat(g)),
                      x.indexOf("TDIE") !== -1 &&
                        p === null &&
                        (p = parseFloat(g)));
                  }),
                  e.cores.length > 0)
                ) {
                  e.main = Math.round(
                    e.cores.reduce((y, g) => y + g, 0) / e.cores.length,
                  );
                  let h = Math.max.apply(Math, e.cores);
                  e.max = h > e.main ? h : e.main;
                } else
                  e.main === null && p !== null && ((e.main = p), (e.max = p));
                if (e.main !== null || e.max !== null) {
                  (t && t(e), n(e));
                  return;
                }
              }
              ui.stat("/sys/class/thermal/thermal_zone0/temp", function (f) {
                f === null
                  ? ui.readFile(
                      "/sys/class/thermal/thermal_zone0/temp",
                      function (p, d) {
                        if (!p) {
                          let m = d.toString().split(`
`);
                          m.length > 0 &&
                            ((e.main = parseFloat(m[0]) / 1e3),
                            (e.max = e.main));
                        }
                        (t && t(e), n(e));
                      },
                    )
                  : we("/opt/vc/bin/vcgencmd measure_temp", function (p, d) {
                      if (!p) {
                        let m = d.toString().split(`
`);
                        m.length > 0 &&
                          m[0].indexOf("=") &&
                          ((e.main = parseFloat(m[0].split("=")[1])),
                          (e.max = e.main));
                      }
                      (t && t(e), n(e));
                    });
              });
            });
          });
        } catch {
          (t && t(e), n(e));
        }
      }
      if (
        ((_i || Oi || Pi) &&
          we("sysctl dev.cpu | grep temp", function (i, s) {
            if (!i) {
              let r = s.toString().split(`
`),
                o = 0;
              (r.forEach(function (a) {
                const c = a.split(":");
                if (c.length > 1) {
                  const u = parseFloat(c[1].replace(",", "."));
                  (u > e.max && (e.max = u), (o = o + u), e.cores.push(u));
                }
              }),
                e.cores.length &&
                  (e.main = Math.round((o / e.cores.length) * 100) / 100));
            }
            (t && t(e), n(e));
          }),
        Ii)
      ) {
        let i = null;
        try {
          i = require("osx-temperature-sensor");
        } catch {
          i = null;
        }
        if (
          i &&
          ((e = i.cpuTemperature()),
          e.main && (e.main = Math.round(e.main * 100) / 100),
          e.max && (e.max = Math.round(e.max * 100) / 100),
          e.cores && e.cores.length)
        )
          for (let s = 0; s < e.cores.length; s++)
            e.cores[s] = Math.round(e.cores[s] * 100) / 100;
        (t && t(e), n(e));
      }
      if ((Ei && (t && t(e), n(e)), vi))
        try {
          P.powerShell(
            'Get-CimInstance MSAcpi_ThermalZoneTemperature -Namespace "root/wmi" | Select CurrentTemperature',
          ).then((i, s) => {
            if (!s) {
              let r = 0;
              (i
                .split(
                  `\r
`,
                )
                .filter((a) => a.trim() !== "")
                .filter((a, c) => c > 0)
                .forEach(function (a) {
                  let c = (parseInt(a, 10) - 2732) / 10;
                  isNaN(c) ||
                    ((r = r + c), c > e.max && (e.max = c), e.cores.push(c));
                }),
                e.cores.length && (e.main = r / e.cores.length));
            }
            (t && t(e), n(e));
          });
        } catch {
          (t && t(e), n(e));
        }
    });
  });
}
At.cpuTemperature = Ll;
function Qs(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = "";
      if (vi)
        try {
          we(
            'reg query "HKEY_LOCAL_MACHINE\\HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0" /v FeatureSet',
            P.execOptsWin,
            function (i, s) {
              if (!i) {
                let r = s.split("0x").pop().trim(),
                  o = parseInt(r, 16).toString(2),
                  a = "0".repeat(32 - o.length) + o,
                  c = [
                    "fpu",
                    "vme",
                    "de",
                    "pse",
                    "tsc",
                    "msr",
                    "pae",
                    "mce",
                    "cx8",
                    "apic",
                    "",
                    "sep",
                    "mtrr",
                    "pge",
                    "mca",
                    "cmov",
                    "pat",
                    "pse-36",
                    "psn",
                    "clfsh",
                    "",
                    "ds",
                    "acpi",
                    "mmx",
                    "fxsr",
                    "sse",
                    "sse2",
                    "ss",
                    "htt",
                    "tm",
                    "ia64",
                    "pbe",
                  ];
                for (let u = 0; u < c.length; u++)
                  a[u] === "1" && c[u] !== "" && (e += " " + c[u]);
                e = e.trim().toLowerCase();
              }
              (t && t(e), n(e));
            },
          );
        } catch {
          (t && t(e), n(e));
        }
      if (yn)
        try {
          we("export LC_ALL=C; lscpu; unset LC_ALL", function (i, s) {
            (i ||
              s
                .toString()
                .split(
                  `
`,
                )
                .forEach(function (o) {
                  o.split(":")[0].toUpperCase().indexOf("FLAGS") !== -1 &&
                    (e = o.split(":")[1].trim().toLowerCase());
                }),
              e
                ? (t && t(e), n(e))
                : ui.readFile("/proc/cpuinfo", function (r, o) {
                    if (!r) {
                      let a = o.toString().split(`
`);
                      e = P.getValue(a, "features", ":", !0).toLowerCase();
                    }
                    (t && t(e), n(e));
                  }));
          });
        } catch {
          (t && t(e), n(e));
        }
      ((_i || Oi || Pi) &&
        we(
          "export LC_ALL=C; dmidecode -t 4 2>/dev/null; unset LC_ALL",
          function (i, s) {
            let r = [];
            if (!i) {
              let o = s.toString().split("	Flags:");
              (o.length > 1
                ? o[1].split("	Version:")[0].split(`
`)
                : []
              ).forEach(function (c) {
                let u = (c.indexOf("(") ? c.split("(")[0].toLowerCase() : "")
                  .trim()
                  .replace(/\t/g, "");
                u && r.push(u);
              });
            }
            ((e = r.join(" ").trim().toLowerCase()), t && t(e), n(e));
          },
        ),
        Ii &&
          we("sysctl machdep.cpu.features", function (i, s) {
            if (!i) {
              let r = s.toString().split(`
`);
              r.length > 0 &&
                r[0].indexOf("machdep.cpu.features:") !== -1 &&
                (e = r[0].split(":")[1].trim().toLowerCase());
            }
            (t && t(e), n(e));
          }),
        Ei && (t && t(e), n(e)));
    });
  });
}
At.cpuFlags = Qs;
function Zs(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        l1d: null,
        l1i: null,
        l2: null,
        l3: null,
      };
      if (yn)
        try {
          we("export LC_ALL=C; lscpu; unset LC_ALL", function (i, s) {
            (i ||
              s
                .toString()
                .split(
                  `
`,
                )
                .forEach(function (o) {
                  let a = o.split(":");
                  (a[0].toUpperCase().indexOf("L1D CACHE") !== -1 &&
                    (e.l1d =
                      parseInt(a[1].trim()) *
                      (a[1].indexOf("M") !== -1
                        ? 1024 * 1024
                        : a[1].indexOf("K") !== -1
                          ? 1024
                          : 1)),
                    a[0].toUpperCase().indexOf("L1I CACHE") !== -1 &&
                      (e.l1i =
                        parseInt(a[1].trim()) *
                        (a[1].indexOf("M") !== -1
                          ? 1024 * 1024
                          : a[1].indexOf("K") !== -1
                            ? 1024
                            : 1)),
                    a[0].toUpperCase().indexOf("L2 CACHE") !== -1 &&
                      (e.l2 =
                        parseInt(a[1].trim()) *
                        (a[1].indexOf("M") !== -1
                          ? 1024 * 1024
                          : a[1].indexOf("K") !== -1
                            ? 1024
                            : 1)),
                    a[0].toUpperCase().indexOf("L3 CACHE") !== -1 &&
                      (e.l3 =
                        parseInt(a[1].trim()) *
                        (a[1].indexOf("M") !== -1
                          ? 1024 * 1024
                          : a[1].indexOf("K") !== -1
                            ? 1024
                            : 1)));
                }),
              t && t(e),
              n(e));
          });
        } catch {
          (t && t(e), n(e));
        }
      if (
        ((_i || Oi || Pi) &&
          we(
            "export LC_ALL=C; dmidecode -t 7 2>/dev/null; unset LC_ALL",
            function (i, s) {
              let r = [];
              i || ((r = s.toString().split("Cache Information")), r.shift());
              for (let o = 0; o < r.length; o++) {
                const a = r[o].split(`
`);
                let c = P.getValue(a, "Socket Designation")
                  .toLowerCase()
                  .replace(" ", "-")
                  .split("-");
                c = c.length ? c[0] : "";
                const u = P.getValue(a, "Installed Size").split(" ");
                let l = parseInt(u[0], 10);
                const f = u.length > 1 ? u[1] : "kb";
                ((l =
                  l *
                  (f === "kb"
                    ? 1024
                    : f === "mb"
                      ? 1024 * 1024
                      : f === "gb"
                        ? 1024 * 1024 * 1024
                        : 1)),
                  c &&
                    (c === "l1"
                      ? ((e.cache[c + "d"] = l / 2), (e.cache[c + "i"] = l / 2))
                      : (e.cache[c] = l)));
              }
              (t && t(e), n(e));
            },
          ),
        Ii &&
          we(
            "sysctl hw.l1icachesize hw.l1dcachesize hw.l2cachesize hw.l3cachesize",
            function (i, s) {
              (i ||
                s
                  .toString()
                  .split(
                    `
`,
                  )
                  .forEach(function (o) {
                    let a = o.split(":");
                    (a[0].toLowerCase().indexOf("hw.l1icachesize") !== -1 &&
                      (e.l1d =
                        parseInt(a[1].trim()) *
                        (a[1].indexOf("K") !== -1 ? 1024 : 1)),
                      a[0].toLowerCase().indexOf("hw.l1dcachesize") !== -1 &&
                        (e.l1i =
                          parseInt(a[1].trim()) *
                          (a[1].indexOf("K") !== -1 ? 1024 : 1)),
                      a[0].toLowerCase().indexOf("hw.l2cachesize") !== -1 &&
                        (e.l2 =
                          parseInt(a[1].trim()) *
                          (a[1].indexOf("K") !== -1 ? 1024 : 1)),
                      a[0].toLowerCase().indexOf("hw.l3cachesize") !== -1 &&
                        (e.l3 =
                          parseInt(a[1].trim()) *
                          (a[1].indexOf("K") !== -1 ? 1024 : 1)));
                  }),
                t && t(e),
                n(e));
            },
          ),
        Ei && (t && t(e), n(e)),
        vi)
      )
        try {
          const i = [];
          (i.push(
            P.powerShell(
              "Get-CimInstance Win32_processor | select L2CacheSize, L3CacheSize | fl",
            ),
          ),
            i.push(
              P.powerShell(
                "Get-CimInstance Win32_CacheMemory | select CacheType,InstalledSize,Level | fl",
              ),
            ),
            Promise.all(i).then((s) => {
              ((e = eo(s[0], s[1])), t && t(e), n(e));
            }));
        } catch {
          (t && t(e), n(e));
        }
    });
  });
}
function eo(t, n) {
  let e = {
      l1d: null,
      l1i: null,
      l2: null,
      l3: null,
    },
    i = t.split(`\r
`);
  ((e.l1d = 0),
    (e.l1i = 0),
    (e.l2 = P.getValue(i, "l2cachesize", ":")),
    (e.l3 = P.getValue(i, "l3cachesize", ":")),
    e.l2 ? (e.l2 = parseInt(e.l2, 10) * 1024) : (e.l2 = 0),
    e.l3 ? (e.l3 = parseInt(e.l3, 10) * 1024) : (e.l3 = 0));
  const s = n.split(/\n\s*\n/);
  let r = 0,
    o = 0,
    a = 0;
  return (
    s.forEach(function (c) {
      const u = c.split(`\r
`),
        l = P.getValue(u, "CacheType"),
        f = P.getValue(u, "Level"),
        p = P.getValue(u, "InstalledSize");
      (f === "3" && l === "3" && (e.l1i = e.l1i + parseInt(p, 10) * 1024),
        f === "3" && l === "4" && (e.l1d = e.l1d + parseInt(p, 10) * 1024),
        f === "3" &&
          l === "5" &&
          ((r = parseInt(p, 10) / 2), (o = parseInt(p, 10) / 2)),
        f === "4" && l === "5" && (a = a + parseInt(p, 10) * 1024));
    }),
    !e.l1i && !e.l1d && ((e.l1i = r), (e.l1d = o)),
    a && (e.l2 = a),
    e
  );
}
At.cpuCache = Zs;
function Il() {
  return new Promise((t) => {
    process.nextTick(() => {
      let n = Ge.loadavg().map(function (r) {
          return r / P.cores();
        }),
        e = parseFloat(Math.max.apply(Math, n).toFixed(2)),
        i = {};
      if (Date.now() - te.ms >= 200) {
        te.ms = Date.now();
        const r = Ge.cpus().map(function (g) {
          return ((g.times.steal = 0), (g.times.guest = 0), g);
        });
        let o = 0,
          a = 0,
          c = 0,
          u = 0,
          l = 0,
          f = 0,
          p = 0,
          d = [];
        if (((Fi = r && r.length ? r.length : 0), yn))
          try {
            const g = Li(
              "cat /proc/stat 2>/dev/null | grep cpu",
              P.execOptsLinux,
            ).toString().split(`
`);
            if (g.length > 1 && (g.shift(), g.length === r.length))
              for (let x = 0; x < g.length; x++) {
                let S = g[x].split(" ");
                if (S.length >= 10) {
                  const w = parseFloat(S[8]) || 0,
                    C = parseFloat(S[9]) || 0;
                  ((r[x].times.steal = w), (r[x].times.guest = C));
                }
              }
          } catch {
            P.noop();
          }
        for (let g = 0; g < Fi; g++) {
          const x = r[g].times;
          ((o += x.user),
            (a += x.sys),
            (c += x.nice),
            (l += x.idle),
            (u += x.irq),
            (f += x.steal || 0),
            (p += x.guest || 0));
          let S = v && v[g] && v[g].totalTick ? v[g].totalTick : 0,
            w = v && v[g] && v[g].totalLoad ? v[g].totalLoad : 0,
            C = v && v[g] && v[g].user ? v[g].user : 0,
            W = v && v[g] && v[g].sys ? v[g].sys : 0,
            T = v && v[g] && v[g].nice ? v[g].nice : 0,
            K = v && v[g] && v[g].idle ? v[g].idle : 0,
            L = v && v[g] && v[g].irq ? v[g].irq : 0,
            D = v && v[g] && v[g].steal ? v[g].steal : 0,
            O = v && v[g] && v[g].guest ? v[g].guest : 0;
          ((v[g] = x),
            (v[g].totalTick =
              v[g].user +
              v[g].sys +
              v[g].nice +
              v[g].irq +
              v[g].steal +
              v[g].guest +
              v[g].idle),
            (v[g].totalLoad =
              v[g].user +
              v[g].sys +
              v[g].nice +
              v[g].irq +
              v[g].steal +
              v[g].guest),
            (v[g].currentTick = v[g].totalTick - S),
            (v[g].load = v[g].totalLoad - w),
            (v[g].loadUser = v[g].user - C),
            (v[g].loadSystem = v[g].sys - W),
            (v[g].loadNice = v[g].nice - T),
            (v[g].loadIdle = v[g].idle - K),
            (v[g].loadIrq = v[g].irq - L),
            (v[g].loadSteal = v[g].steal - D),
            (v[g].loadGuest = v[g].guest - O),
            (d[g] = {}),
            (d[g].load = (v[g].load / v[g].currentTick) * 100),
            (d[g].loadUser = (v[g].loadUser / v[g].currentTick) * 100),
            (d[g].loadSystem = (v[g].loadSystem / v[g].currentTick) * 100),
            (d[g].loadNice = (v[g].loadNice / v[g].currentTick) * 100),
            (d[g].loadIdle = (v[g].loadIdle / v[g].currentTick) * 100),
            (d[g].loadIrq = (v[g].loadIrq / v[g].currentTick) * 100),
            (d[g].loadSteal = (v[g].loadSteal / v[g].currentTick) * 100),
            (d[g].loadGuest = (v[g].loadGuest / v[g].currentTick) * 100),
            (d[g].rawLoad = v[g].load),
            (d[g].rawLoadUser = v[g].loadUser),
            (d[g].rawLoadSystem = v[g].loadSystem),
            (d[g].rawLoadNice = v[g].loadNice),
            (d[g].rawLoadIdle = v[g].loadIdle),
            (d[g].rawLoadIrq = v[g].loadIrq),
            (d[g].rawLoadSteal = v[g].loadSteal),
            (d[g].rawLoadGuest = v[g].loadGuest));
        }
        let m = o + a + c + u + f + p + l,
          h = o + a + c + u + f + p,
          y = m - te.tick;
        ((i = {
          avgLoad: e,
          currentLoad: ((h - te.load) / y) * 100,
          currentLoadUser: ((o - te.user) / y) * 100,
          currentLoadSystem: ((a - te.system) / y) * 100,
          currentLoadNice: ((c - te.nice) / y) * 100,
          currentLoadIdle: ((l - te.idle) / y) * 100,
          currentLoadIrq: ((u - te.irq) / y) * 100,
          currentLoadSteal: ((f - te.steal) / y) * 100,
          currentLoadGuest: ((p - te.guest) / y) * 100,
          rawCurrentLoad: h - te.load,
          rawCurrentLoadUser: o - te.user,
          rawCurrentLoadSystem: a - te.system,
          rawCurrentLoadNice: c - te.nice,
          rawCurrentLoadIdle: l - te.idle,
          rawCurrentLoadIrq: u - te.irq,
          rawCurrentLoadSteal: f - te.steal,
          rawCurrentLoadGuest: p - te.guest,
          cpus: d,
        }),
          (te = {
            user: o,
            nice: c,
            system: a,
            idle: l,
            irq: u,
            steal: f,
            guest: p,
            tick: m,
            load: h,
            ms: te.ms,
            currentLoad: i.currentLoad,
            currentLoadUser: i.currentLoadUser,
            currentLoadSystem: i.currentLoadSystem,
            currentLoadNice: i.currentLoadNice,
            currentLoadIdle: i.currentLoadIdle,
            currentLoadIrq: i.currentLoadIrq,
            currentLoadSteal: i.currentLoadSteal,
            currentLoadGuest: i.currentLoadGuest,
            rawCurrentLoad: i.rawCurrentLoad,
            rawCurrentLoadUser: i.rawCurrentLoadUser,
            rawCurrentLoadSystem: i.rawCurrentLoadSystem,
            rawCurrentLoadNice: i.rawCurrentLoadNice,
            rawCurrentLoadIdle: i.rawCurrentLoadIdle,
            rawCurrentLoadIrq: i.rawCurrentLoadIrq,
            rawCurrentLoadSteal: i.rawCurrentLoadSteal,
            rawCurrentLoadGuest: i.rawCurrentLoadGuest,
          }));
      } else {
        let r = [];
        for (let o = 0; o < Fi; o++)
          ((r[o] = {}),
            (r[o].load = (v[o].load / v[o].currentTick) * 100),
            (r[o].loadUser = (v[o].loadUser / v[o].currentTick) * 100),
            (r[o].loadSystem = (v[o].loadSystem / v[o].currentTick) * 100),
            (r[o].loadNice = (v[o].loadNice / v[o].currentTick) * 100),
            (r[o].loadIdle = (v[o].loadIdle / v[o].currentTick) * 100),
            (r[o].loadIrq = (v[o].loadIrq / v[o].currentTick) * 100),
            (r[o].rawLoad = v[o].load),
            (r[o].rawLoadUser = v[o].loadUser),
            (r[o].rawLoadSystem = v[o].loadSystem),
            (r[o].rawLoadNice = v[o].loadNice),
            (r[o].rawLoadIdle = v[o].loadIdle),
            (r[o].rawLoadIrq = v[o].loadIrq),
            (r[o].rawLoadSteal = v[o].loadSteal),
            (r[o].rawLoadGuest = v[o].loadGuest));
        i = {
          avgLoad: e,
          currentLoad: te.currentLoad,
          currentLoadUser: te.currentLoadUser,
          currentLoadSystem: te.currentLoadSystem,
          currentLoadNice: te.currentLoadNice,
          currentLoadIdle: te.currentLoadIdle,
          currentLoadIrq: te.currentLoadIrq,
          currentLoadSteal: te.currentLoadSteal,
          currentLoadGuest: te.currentLoadGuest,
          rawCurrentLoad: te.rawCurrentLoad,
          rawCurrentLoadUser: te.rawCurrentLoadUser,
          rawCurrentLoadSystem: te.rawCurrentLoadSystem,
          rawCurrentLoadNice: te.rawCurrentLoadNice,
          rawCurrentLoadIdle: te.rawCurrentLoadIdle,
          rawCurrentLoadIrq: te.rawCurrentLoadIrq,
          rawCurrentLoadSteal: te.rawCurrentLoadSteal,
          rawCurrentLoadGuest: te.rawCurrentLoadGuest,
          cpus: r,
        };
      }
      t(i);
    });
  });
}
function vl(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      Il().then((e) => {
        (t && t(e), n(e));
      });
    });
  });
}
At.currentLoad = vl;
function _l() {
  return new Promise((t) => {
    process.nextTick(() => {
      const n = Ge.cpus();
      let e = 0,
        i = 0,
        s = 0,
        r = 0,
        o = 0,
        a = 0;
      if (n && n.length) {
        for (let u = 0, l = n.length; u < l; u++) {
          const f = n[u].times;
          ((e += f.user),
            (i += f.sys),
            (s += f.nice),
            (r += f.irq),
            (o += f.idle));
        }
        let c = o + r + s + i + e;
        a = ((c - o) / c) * 100;
      }
      t(a);
    });
  });
}
function Ol(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      _l().then((e) => {
        (t && t(e), n(e));
      });
    });
  });
}
At.fullLoad = Ol;
var Sr = {};
const He = Pe,
  An = se.exec,
  si = se.execSync,
  A = V,
  Pl = Ae;
let mt = process.platform;
const to = mt === "linux" || mt === "android",
  no = mt === "darwin",
  io = mt === "win32",
  ro = mt === "freebsd",
  so = mt === "openbsd",
  oo = mt === "netbsd",
  ao = mt === "sunos",
  Kr = {
    "00CE": "Samsung Electronics Inc",
    "014F": "Transcend Information Inc.",
    "017A": "Apacer Technology Inc.",
    "0198": "HyperX",
    "029E": "Corsair",
    "02FE": "Elpida",
    "04CB": "A-DATA",
    "04CD": "G.Skill International Enterprise",
    "059B": "Crucial",
    1315: "Crucial",
    "2C00": "Micron Technology Inc.",
    5105: "Qimonda AG i. In.",
    "802C": "Micron Technology Inc.",
    "80AD": "Hynix Semiconductor Inc.",
    "80CE": "Samsung Electronics Inc.",
    8551: "Qimonda AG i. In.",
    "859B": "Crucial",
    AD00: "Hynix Semiconductor Inc.",
    CE00: "Samsung Electronics Inc.",
    SAMSUNG: "Samsung Electronics Inc.",
    HYNIX: "Hynix Semiconductor Inc.",
    "G-SKILL": "G-Skill International Enterprise",
    "G.SKILL": "G-Skill International Enterprise",
    TRANSCEND: "Transcend Information",
    APACER: "Apacer Technology Inc",
    MICRON: "Micron Technology Inc.",
    QIMONDA: "Qimonda AG i. In.",
  };
function El(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        total: He.totalmem(),
        free: He.freemem(),
        used: He.totalmem() - He.freemem(),
        active: He.totalmem() - He.freemem(),
        // temporarily (fallback)
        available: He.freemem(),
        // temporarily (fallback)
        buffers: 0,
        cached: 0,
        slab: 0,
        buffcache: 0,
        reclaimable: 0,
        swaptotal: 0,
        swapused: 0,
        swapfree: 0,
        writeback: null,
        dirty: null,
      };
      if (to)
        try {
          Pl.readFile("/proc/meminfo", function (i, s) {
            if (!i) {
              const r = s.toString().split(`
`);
              ((e.total = parseInt(A.getValue(r, "memtotal"), 10)),
                (e.total = e.total ? e.total * 1024 : He.totalmem()),
                (e.free = parseInt(A.getValue(r, "memfree"), 10)),
                (e.free = e.free ? e.free * 1024 : He.freemem()),
                (e.used = e.total - e.free),
                (e.buffers = parseInt(A.getValue(r, "buffers"), 10)),
                (e.buffers = e.buffers ? e.buffers * 1024 : 0),
                (e.cached = parseInt(A.getValue(r, "cached"), 10)),
                (e.cached = e.cached ? e.cached * 1024 : 0),
                (e.slab = parseInt(A.getValue(r, "slab"), 10)),
                (e.slab = e.slab ? e.slab * 1024 : 0),
                (e.buffcache = e.buffers + e.cached + e.slab));
              let o = parseInt(A.getValue(r, "memavailable"), 10);
              ((e.available = o ? o * 1024 : e.free + e.buffcache),
                (e.active = e.total - e.available),
                (e.swaptotal = parseInt(A.getValue(r, "swaptotal"), 10)),
                (e.swaptotal = e.swaptotal ? e.swaptotal * 1024 : 0),
                (e.swapfree = parseInt(A.getValue(r, "swapfree"), 10)),
                (e.swapfree = e.swapfree ? e.swapfree * 1024 : 0),
                (e.swapused = e.swaptotal - e.swapfree),
                (e.writeback = parseInt(A.getValue(r, "writeback"), 10)),
                (e.writeback = e.writeback ? e.writeback * 1024 : 0),
                (e.dirty = parseInt(A.getValue(r, "dirty"), 10)),
                (e.dirty = e.dirty ? e.dirty * 1024 : 0),
                (e.reclaimable = parseInt(A.getValue(r, "sreclaimable"), 10)),
                (e.reclaimable = e.reclaimable ? e.reclaimable * 1024 : 0));
            }
            (t && t(e), n(e));
          });
        } catch {
          (t && t(e), n(e));
        }
      if (ro || so || oo)
        try {
          An(
            "/sbin/sysctl hw.realmem hw.physmem vm.stats.vm.v_page_count vm.stats.vm.v_wire_count vm.stats.vm.v_active_count vm.stats.vm.v_inactive_count vm.stats.vm.v_cache_count vm.stats.vm.v_free_count vm.stats.vm.v_page_size",
            function (i, s) {
              if (!i) {
                let r = s.toString().split(`
`);
                const o = parseInt(
                    A.getValue(r, "vm.stats.vm.v_page_size"),
                    10,
                  ),
                  a =
                    parseInt(
                      A.getValue(r, "vm.stats.vm.v_inactive_count"),
                      10,
                    ) * o,
                  c =
                    parseInt(A.getValue(r, "vm.stats.vm.v_cache_count"), 10) *
                    o;
                ((e.total = parseInt(A.getValue(r, "hw.realmem"), 10)),
                  isNaN(e.total) &&
                    (e.total = parseInt(A.getValue(r, "hw.physmem"), 10)),
                  (e.free =
                    parseInt(A.getValue(r, "vm.stats.vm.v_free_count"), 10) *
                    o),
                  (e.buffcache = a + c),
                  (e.available = e.buffcache + e.free),
                  (e.active = e.total - e.free - e.buffcache),
                  (e.swaptotal = 0),
                  (e.swapfree = 0),
                  (e.swapused = 0));
              }
              (t && t(e), n(e));
            },
          );
        } catch {
          (t && t(e), n(e));
        }
      if ((ao && (t && t(e), n(e)), no)) {
        let i = 4096;
        try {
          i = A.toInt(si("sysctl -n vm.pagesize").toString()) || i;
        } catch {
          A.noop();
        }
        try {
          An(
            'vm_stat 2>/dev/null | egrep "Pages active|Pages inactive"',
            function (s, r) {
              if (!s) {
                let o = r.toString().split(`
`);
                ((e.active =
                  (parseInt(A.getValue(o, "Pages active"), 10) || 0) * i),
                  (e.reclaimable =
                    (parseInt(A.getValue(o, "Pages inactive"), 10) || 0) * i),
                  (e.buffcache = e.used - e.active),
                  (e.available = e.free + e.buffcache));
              }
              An("sysctl -n vm.swapusage 2>/dev/null", function (o, a) {
                if (!o) {
                  let c = a.toString().split(`
`);
                  c.length > 0 &&
                    c[0]
                      .replace(/,/g, ".")
                      .replace(/M/g, "")
                      .trim()
                      .split("  ")
                      .forEach((f) => {
                        (f.toLowerCase().indexOf("total") !== -1 &&
                          (e.swaptotal =
                            parseFloat(f.split("=")[1].trim()) * 1024 * 1024),
                          f.toLowerCase().indexOf("used") !== -1 &&
                            (e.swapused =
                              parseFloat(f.split("=")[1].trim()) * 1024 * 1024),
                          f.toLowerCase().indexOf("free") !== -1 &&
                            (e.swapfree =
                              parseFloat(f.split("=")[1].trim()) *
                              1024 *
                              1024));
                      });
                }
                (t && t(e), n(e));
              });
            },
          );
        } catch {
          (t && t(e), n(e));
        }
      }
      if (io) {
        let i = 0,
          s = 0;
        try {
          A.powerShell(
            "Get-CimInstance Win32_PageFileUsage | Select AllocatedBaseSize, CurrentUsage",
          ).then((r, o) => {
            (o ||
              r
                .split(
                  `\r
`,
                )
                .filter((c) => c.trim() !== "")
                .filter((c, u) => u > 0)
                .forEach(function (c) {
                  c !== "" &&
                    ((c = c.trim().split(/\s\s+/)),
                    (i = i + (parseInt(c[0], 10) || 0)),
                    (s = s + (parseInt(c[1], 10) || 0)));
                }),
              (e.swaptotal = i * 1024 * 1024),
              (e.swapused = s * 1024 * 1024),
              (e.swapfree = e.swaptotal - e.swapused),
              t && t(e),
              n(e));
          });
        } catch {
          (t && t(e), n(e));
        }
      }
    });
  });
}
Sr.mem = El;
function Ml(t) {
  function n(e) {
    const i = e.replace("0x", "").toUpperCase();
    return i.length >= 4 && {}.hasOwnProperty.call(Kr, i) ? Kr[i] : e;
  }
  return new Promise((e) => {
    process.nextTick(() => {
      let i = [];
      if (
        ((to || ro || so || oo) &&
          An(
            'export LC_ALL=C; dmidecode -t memory 2>/dev/null | grep -iE "Size:|Type|Speed|Manufacturer|Form Factor|Locator|Memory Device|Serial Number|Voltage|Part Number"; unset LC_ALL',
            function (s, r) {
              if (!s) {
                let o = r.toString().split("Memory Device");
                (o.shift(),
                  o.forEach(function (a) {
                    let c = a.split(`
`);
                    const u = A.getValue(c, "Size"),
                      l =
                        u.indexOf("GB") >= 0
                          ? parseInt(u, 10) * 1024 * 1024 * 1024
                          : parseInt(u, 10) * 1024 * 1024;
                    let f = A.getValue(c, "Bank Locator");
                    if (
                      (f.toLowerCase().indexOf("bad") >= 0 && (f = ""),
                      parseInt(A.getValue(c, "Size"), 10) > 0)
                    ) {
                      const p = A.toInt(A.getValue(c, "Total Width")),
                        d = A.toInt(A.getValue(c, "Data Width"));
                      i.push({
                        size: l,
                        bank: f,
                        type: A.getValue(c, "Type:"),
                        ecc: d && p ? p > d : !1,
                        clockSpeed: A.getValue(c, "Configured Clock Speed:")
                          ? parseInt(
                              A.getValue(c, "Configured Clock Speed:"),
                              10,
                            )
                          : A.getValue(c, "Speed:")
                            ? parseInt(A.getValue(c, "Speed:"), 10)
                            : null,
                        formFactor: A.getValue(c, "Form Factor:"),
                        manufacturer: n(A.getValue(c, "Manufacturer:")),
                        partNum: A.getValue(c, "Part Number:"),
                        serialNum: A.getValue(c, "Serial Number:"),
                        voltageConfigured:
                          parseFloat(A.getValue(c, "Configured Voltage:")) ||
                          null,
                        voltageMin:
                          parseFloat(A.getValue(c, "Minimum Voltage:")) || null,
                        voltageMax:
                          parseFloat(A.getValue(c, "Maximum Voltage:")) || null,
                      });
                    } else
                      i.push({
                        size: 0,
                        bank: f,
                        type: "Empty",
                        ecc: null,
                        clockSpeed: 0,
                        formFactor: A.getValue(c, "Form Factor:"),
                        partNum: "",
                        serialNum: "",
                        voltageConfigured: null,
                        voltageMin: null,
                        voltageMax: null,
                      });
                  }));
              }
              if (!i.length) {
                i.push({
                  size: He.totalmem(),
                  bank: "",
                  type: "",
                  ecc: null,
                  clockSpeed: 0,
                  formFactor: "",
                  partNum: "",
                  serialNum: "",
                  voltageConfigured: null,
                  voltageMin: null,
                  voltageMax: null,
                });
                try {
                  let o = si("cat /proc/cpuinfo 2>/dev/null", A.execOptsLinux),
                    a = o.toString().split(`
`),
                    c = A.getValue(a, "revision", ":", !0).toLowerCase();
                  if (A.isRaspberry(a)) {
                    const u = {
                      0: 400,
                      1: 450,
                      2: 450,
                      3: 3200,
                      4: 4267,
                    };
                    ((i[0].type = "LPDDR2"),
                      (i[0].type =
                        c && c[2] && c[2] === "3" ? "LPDDR4" : i[0].type),
                      (i[0].type =
                        c && c[2] && c[2] === "4" ? "LPDDR4X" : i[0].type),
                      (i[0].ecc = !1),
                      (i[0].clockSpeed = (c && c[2] && u[c[2]]) || 400),
                      (i[0].clockSpeed =
                        c && c[4] && c[4] === "d" ? 500 : i[0].clockSpeed),
                      (i[0].formFactor = "SoC"),
                      (o = si(
                        "vcgencmd get_config sdram_freq 2>/dev/null",
                        A.execOptsLinux,
                      )),
                      (a = o.toString().split(`
`)));
                    let l =
                      parseInt(A.getValue(a, "sdram_freq", "=", !0), 10) || 0;
                    (l && (i[0].clockSpeed = l),
                      (o = si(
                        "vcgencmd measure_volts sdram_p 2>/dev/null",
                        A.execOptsLinux,
                      )),
                      (a = o.toString().split(`
`)));
                    let f = parseFloat(A.getValue(a, "volt", "=", !0)) || 0;
                    f &&
                      ((i[0].voltageConfigured = f),
                      (i[0].voltageMin = f),
                      (i[0].voltageMax = f));
                  }
                } catch {
                  A.noop();
                }
              }
              (t && t(i), e(i));
            },
          ),
        no &&
          An("system_profiler SPMemoryDataType", function (s, r) {
            if (!s) {
              const o = r.toString().split(`
`),
                a = A.getValue(o, "ecc", ":", !0).toLowerCase();
              let c = r.toString().split("        BANK "),
                u = !0;
              (c.length === 1 &&
                ((c = r.toString().split("        DIMM")), (u = !1)),
                c.shift(),
                c.forEach(function (l) {
                  let f = l.split(`
`);
                  const p = (u ? "BANK " : "DIMM") + f[0].trim().split("/")[0],
                    d = parseInt(A.getValue(f, "          Size"));
                  d
                    ? i.push({
                        size: d * 1024 * 1024 * 1024,
                        bank: p,
                        type: A.getValue(f, "          Type:"),
                        ecc: a ? a === "enabled" : null,
                        clockSpeed: parseInt(
                          A.getValue(f, "          Speed:"),
                          10,
                        ),
                        formFactor: "",
                        manufacturer: n(
                          A.getValue(f, "          Manufacturer:"),
                        ),
                        partNum: A.getValue(f, "          Part Number:"),
                        serialNum: A.getValue(f, "          Serial Number:"),
                        voltageConfigured: null,
                        voltageMin: null,
                        voltageMax: null,
                      })
                    : i.push({
                        size: 0,
                        bank: p,
                        type: "Empty",
                        ecc: null,
                        clockSpeed: 0,
                        formFactor: "",
                        manufacturer: "",
                        partNum: "",
                        serialNum: "",
                        voltageConfigured: null,
                        voltageMin: null,
                        voltageMax: null,
                      });
                }));
            }
            if (!i.length) {
              const o = r.toString().split(`
`),
                a = parseInt(A.getValue(o, "      Memory:")),
                c = A.getValue(o, "      Type:"),
                u = A.getValue(o, "      Manufacturer:");
              a &&
                c &&
                i.push({
                  size: a * 1024 * 1024 * 1024,
                  bank: "0",
                  type: c,
                  ecc: !1,
                  clockSpeed: null,
                  formFactor: "SOC",
                  manufacturer: n(u),
                  partNum: "",
                  serialNum: "",
                  voltageConfigured: null,
                  voltageMin: null,
                  voltageMax: null,
                });
            }
            (t && t(i), e(i));
          }),
        ao && (t && t(i), e(i)),
        io)
      ) {
        const s =
            "Unknown|Other|DRAM|Synchronous DRAM|Cache DRAM|EDO|EDRAM|VRAM|SRAM|RAM|ROM|FLASH|EEPROM|FEPROM|EPROM|CDRAM|3DRAM|SDRAM|SGRAM|RDRAM|DDR|DDR2|DDR2 FB-DIMM|Reserved|DDR3|FBD2|DDR4|LPDDR|LPDDR2|LPDDR3|LPDDR4|Logical non-volatile device|HBM|HBM2|DDR5|LPDDR5".split(
              "|",
            ),
          r =
            "Unknown|Other|SIP|DIP|ZIP|SOJ|Proprietary|SIMM|DIMM|TSOP|PGA|RIMM|SODIMM|SRIMM|SMD|SSMP|QFP|TQFP|SOIC|LCC|PLCC|BGA|FPBGA|LGA".split(
              "|",
            );
        try {
          A.powerShell(
            "Get-CimInstance Win32_PhysicalMemory | select DataWidth,TotalWidth,Capacity,BankLabel,MemoryType,SMBIOSMemoryType,ConfiguredClockSpeed,Speed,FormFactor,Manufacturer,PartNumber,SerialNumber,ConfiguredVoltage,MinVoltage,MaxVoltage,Tag | fl",
          ).then((o, a) => {
            if (!a) {
              let c = o.toString().split(/\n\s*\n/);
              (c.shift(),
                c.forEach(function (u) {
                  let l = u.split(`\r
`);
                  const f = A.toInt(A.getValue(l, "DataWidth", ":")),
                    p = A.toInt(A.getValue(l, "TotalWidth", ":")),
                    d = parseInt(A.getValue(l, "Capacity", ":"), 10) || 0,
                    m = A.getValue(l, "Tag", ":"),
                    h = A.splitByNumber(m);
                  d &&
                    i.push({
                      size: d,
                      bank:
                        A.getValue(l, "BankLabel", ":") +
                        (h[1] ? "/" + h[1] : ""),
                      // BankLabel
                      type: s[
                        parseInt(A.getValue(l, "MemoryType", ":"), 10) ||
                          parseInt(A.getValue(l, "SMBIOSMemoryType", ":"), 10)
                      ],
                      ecc: f && p ? p > f : !1,
                      clockSpeed:
                        parseInt(
                          A.getValue(l, "ConfiguredClockSpeed", ":"),
                          10,
                        ) ||
                        parseInt(A.getValue(l, "Speed", ":"), 10) ||
                        0,
                      formFactor:
                        r[parseInt(A.getValue(l, "FormFactor", ":"), 10) || 0],
                      manufacturer: n(A.getValue(l, "Manufacturer", ":")),
                      partNum: A.getValue(l, "PartNumber", ":"),
                      serialNum: A.getValue(l, "SerialNumber", ":"),
                      voltageConfigured:
                        (parseInt(
                          A.getValue(l, "ConfiguredVoltage", ":"),
                          10,
                        ) || 0) / 1e3,
                      voltageMin:
                        (parseInt(A.getValue(l, "MinVoltage", ":"), 10) || 0) /
                        1e3,
                      voltageMax:
                        (parseInt(A.getValue(l, "MaxVoltage", ":"), 10) || 0) /
                        1e3,
                    });
                }));
            }
            (t && t(i), e(i));
          });
        } catch {
          (t && t(i), e(i));
        }
      }
    });
  });
}
Sr.memLayout = Ml;
const Xr = se.exec,
  Jt = Ae,
  q = V;
let ht = process.platform;
const Al = ht === "linux" || ht === "android",
  Tl = ht === "darwin",
  Dl = ht === "win32",
  bl = ht === "freebsd",
  Vl = ht === "openbsd",
  Nl = ht === "netbsd",
  Bl = ht === "sunos";
function kl(t, n, e) {
  const i = {};
  let s = q.getValue(t, "BatteryStatus", ":").trim();
  if (s >= 0) {
    const r = s ? parseInt(s) : 0;
    ((i.status = r),
      (i.hasBattery = !0),
      (i.maxCapacity =
        e || parseInt(q.getValue(t, "DesignCapacity", ":") || 0)),
      (i.designedCapacity = parseInt(
        q.getValue(t, "DesignCapacity", ":") || n,
      )),
      (i.voltage = parseInt(q.getValue(t, "DesignVoltage", ":") || 0) / 1e3),
      (i.capacityUnit = "mWh"),
      (i.percent = parseInt(
        q.getValue(t, "EstimatedChargeRemaining", ":") || 0,
      )),
      (i.currentCapacity = parseInt((i.maxCapacity * i.percent) / 100)),
      (i.isCharging =
        (r >= 6 && r <= 9) ||
        r === 11 ||
        (r !== 3 && r !== 1 && i.percent < 100)),
      (i.acConnected = i.isCharging || r === 2),
      (i.model = q.getValue(t, "DeviceID", ":")));
  } else i.status = -1;
  return i;
}
var Fl = function (t) {
    return new Promise((n) => {
      process.nextTick(() => {
        let e = {
          hasBattery: !1,
          cycleCount: 0,
          isCharging: !1,
          designedCapacity: 0,
          maxCapacity: 0,
          currentCapacity: 0,
          voltage: 0,
          capacityUnit: "",
          percent: 0,
          timeRemaining: null,
          acConnected: !0,
          type: "",
          model: "",
          manufacturer: "",
          serial: "",
        };
        if (Al) {
          let i = "";
          Jt.existsSync("/sys/class/power_supply/BAT1/uevent")
            ? (i = "/sys/class/power_supply/BAT1/")
            : Jt.existsSync("/sys/class/power_supply/BAT0/uevent") &&
              (i = "/sys/class/power_supply/BAT0/");
          let s = !1,
            r = "";
          (Jt.existsSync("/sys/class/power_supply/AC/online")
            ? (r = "/sys/class/power_supply/AC/online")
            : Jt.existsSync("/sys/class/power_supply/AC0/online") &&
              (r = "/sys/class/power_supply/AC0/online"),
            r && (s = Jt.readFileSync(r).toString().trim() === "1"),
            i
              ? Jt.readFile(i + "uevent", function (o, a) {
                  if (o) (t && t(e), n(e));
                  else {
                    let c = a.toString().split(`
`);
                    ((e.isCharging =
                      q
                        .getValue(c, "POWER_SUPPLY_STATUS", "=")
                        .toLowerCase() === "charging"),
                      (e.acConnected = s || e.isCharging),
                      (e.voltage =
                        parseInt(
                          "0" + q.getValue(c, "POWER_SUPPLY_VOLTAGE_NOW", "="),
                          10,
                        ) / 1e6),
                      (e.capacityUnit = e.voltage ? "mWh" : "mAh"),
                      (e.cycleCount = parseInt(
                        "0" + q.getValue(c, "POWER_SUPPLY_CYCLE_COUNT", "="),
                        10,
                      )),
                      (e.maxCapacity = Math.round(
                        (parseInt(
                          "0" +
                            q.getValue(
                              c,
                              "POWER_SUPPLY_CHARGE_FULL",
                              "=",
                              !0,
                              !0,
                            ),
                          10,
                        ) /
                          1e3) *
                          (e.voltage || 1),
                      )));
                    const u =
                      parseInt(
                        "0" +
                          q.getValue(c, "POWER_SUPPLY_VOLTAGE_MIN_DESIGN", "="),
                        10,
                      ) / 1e6;
                    ((e.designedCapacity = Math.round(
                      (parseInt(
                        "0" +
                          q.getValue(
                            c,
                            "POWER_SUPPLY_CHARGE_FULL_DESIGN",
                            "=",
                            !0,
                            !0,
                          ),
                        10,
                      ) /
                        1e3) *
                        (u || e.voltage || 1),
                    )),
                      (e.currentCapacity = Math.round(
                        (parseInt(
                          "0" + q.getValue(c, "POWER_SUPPLY_CHARGE_NOW", "="),
                          10,
                        ) /
                          1e3) *
                          (e.voltage || 1),
                      )),
                      e.maxCapacity ||
                        ((e.maxCapacity =
                          parseInt(
                            "0" +
                              q.getValue(
                                c,
                                "POWER_SUPPLY_ENERGY_FULL",
                                "=",
                                !0,
                                !0,
                              ),
                            10,
                          ) / 1e3),
                        (e.designedCapacity =
                          (parseInt(
                            "0" +
                              q.getValue(
                                c,
                                "POWER_SUPPLY_ENERGY_FULL_DESIGN",
                                "=",
                                !0,
                                !0,
                              ),
                            10,
                          ) /
                            1e3) |
                          e.maxCapacity),
                        (e.currentCapacity =
                          parseInt(
                            "0" + q.getValue(c, "POWER_SUPPLY_ENERGY_NOW", "="),
                            10,
                          ) / 1e3)));
                    const l = q.getValue(c, "POWER_SUPPLY_CAPACITY", "="),
                      f = parseInt(
                        "0" + q.getValue(c, "POWER_SUPPLY_ENERGY_NOW", "="),
                        10,
                      ),
                      p = parseInt(
                        "0" + q.getValue(c, "POWER_SUPPLY_POWER_NOW", "="),
                        10,
                      ),
                      d = parseInt(
                        "0" + q.getValue(c, "POWER_SUPPLY_CURRENT_NOW", "="),
                        10,
                      ),
                      m = parseInt(
                        "0" + q.getValue(c, "POWER_SUPPLY_CHARGE_NOW", "="),
                        10,
                      );
                    ((e.percent = parseInt("0" + l, 10)),
                      e.maxCapacity &&
                        e.currentCapacity &&
                        ((e.hasBattery = !0),
                        l ||
                          (e.percent =
                            (100 * e.currentCapacity) / e.maxCapacity)),
                      e.isCharging && (e.hasBattery = !0),
                      f && p
                        ? (e.timeRemaining = Math.floor((f / p) * 60))
                        : d && m
                          ? (e.timeRemaining = Math.floor((m / d) * 60))
                          : d &&
                            e.currentCapacity &&
                            (e.timeRemaining = Math.floor(
                              (e.currentCapacity / d) * 60,
                            )),
                      (e.type = q.getValue(c, "POWER_SUPPLY_TECHNOLOGY", "=")),
                      (e.model = q.getValue(c, "POWER_SUPPLY_MODEL_NAME", "=")),
                      (e.manufacturer = q.getValue(
                        c,
                        "POWER_SUPPLY_MANUFACTURER",
                        "=",
                      )),
                      (e.serial = q.getValue(
                        c,
                        "POWER_SUPPLY_SERIAL_NUMBER",
                        "=",
                      )),
                      t && t(e),
                      n(e));
                  }
                })
              : (t && t(e), n(e)));
        }
        if (
          ((bl || Vl || Nl) &&
            Xr("sysctl -i hw.acpi.battery hw.acpi.acline", function (i, s) {
              let r = s.toString().split(`
`);
              const o = parseInt(
                  "0" + q.getValue(r, "hw.acpi.battery.units"),
                  10,
                ),
                a = parseInt("0" + q.getValue(r, "hw.acpi.battery.life"), 10);
              ((e.hasBattery = o > 0),
                (e.cycleCount = null),
                (e.isCharging = q.getValue(r, "hw.acpi.acline") !== "1"),
                (e.acConnected = e.isCharging),
                (e.maxCapacity = null),
                (e.currentCapacity = null),
                (e.capacityUnit = "unknown"),
                (e.percent = o ? a : null),
                t && t(e),
                n(e));
            }),
          Tl &&
            Xr(
              'ioreg -n AppleSmartBattery -r | egrep "CycleCount|IsCharging|DesignCapacity|MaxCapacity|CurrentCapacity|DeviceName|BatterySerialNumber|Serial|TimeRemaining|Voltage"; pmset -g batt | grep %',
              function (i, s) {
                if (s) {
                  let r = s
                    .toString()
                    .replace(/ +/g, "")
                    .replace(/"+/g, "")
                    .replace(/-/g, "").split(`
`);
                  ((e.cycleCount = parseInt(
                    "0" + q.getValue(r, "cyclecount", "="),
                    10,
                  )),
                    (e.voltage =
                      parseInt("0" + q.getValue(r, "voltage", "="), 10) / 1e3),
                    (e.capacityUnit = e.voltage ? "mWh" : "mAh"),
                    (e.maxCapacity = Math.round(
                      parseInt(
                        "0" + q.getValue(r, "applerawmaxcapacity", "="),
                        10,
                      ) * (e.voltage || 1),
                    )),
                    (e.currentCapacity = Math.round(
                      parseInt(
                        "0" + q.getValue(r, "applerawcurrentcapacity", "="),
                        10,
                      ) * (e.voltage || 1),
                    )),
                    (e.designedCapacity = Math.round(
                      parseInt("0" + q.getValue(r, "DesignCapacity", "="), 10) *
                        (e.voltage || 1),
                    )),
                    (e.manufacturer = "Apple"),
                    (e.serial =
                      q.getValue(r, "BatterySerialNumber", "=") ||
                      q.getValue(r, "Serial", "=")),
                    (e.model = q.getValue(r, "DeviceName", "=")));
                  let o = null,
                    c = q.getValue(r, "internal", "Battery").split(";");
                  if (c && c[0]) {
                    let u = c[0].split("	");
                    u &&
                      u[1] &&
                      (o = parseFloat(u[1].trim().replace(/%/g, "")));
                  }
                  (c && c[1]
                    ? ((e.isCharging = c[1].trim() === "charging"),
                      (e.acConnected = c[1].trim() !== "discharging"))
                    : ((e.isCharging =
                        q.getValue(r, "ischarging", "=").toLowerCase() ===
                        "yes"),
                      (e.acConnected = e.isCharging)),
                    e.maxCapacity &&
                      e.currentCapacity &&
                      ((e.hasBattery = !0),
                      (e.type = "Li-ion"),
                      (e.percent =
                        o !== null
                          ? o
                          : Math.round(
                              (100 * e.currentCapacity) / e.maxCapacity,
                            )),
                      e.isCharging ||
                        (e.timeRemaining = parseInt(
                          "0" + q.getValue(r, "TimeRemaining", "="),
                          10,
                        ))));
                }
                (t && t(e), n(e));
              },
            ),
          Bl && (t && t(e), n(e)),
          Dl)
        )
          try {
            const i = [];
            (i.push(
              q.powerShell(
                "Get-CimInstance Win32_Battery | select BatteryStatus, DesignCapacity, DesignVoltage, EstimatedChargeRemaining, DeviceID | fl",
              ),
            ),
              i.push(
                q.powerShell(
                  "(Get-WmiObject -Class BatteryStaticData -Namespace ROOT/WMI).DesignedCapacity",
                ),
              ),
              i.push(
                q.powerShell(
                  "(Get-CimInstance -Class BatteryFullChargedCapacity -Namespace ROOT/WMI).FullChargedCapacity",
                ),
              ),
              q.promiseAll(i).then((s) => {
                if (s) {
                  let r = s.results[0].split(/\n\s*\n/),
                    o = [];
                  const a = (l) => /\S/.test(l);
                  for (let l = 0; l < r.length; l++)
                    (a(r[l]) && (!o.length || !a(r[l - 1])) && o.push([]),
                      a(r[l]) && o[o.length - 1].push(r[l]));
                  let c = s.results[1]
                      .split(
                        `\r
`,
                      )
                      .filter((l) => l),
                    u = s.results[2]
                      .split(
                        `\r
`,
                      )
                      .filter((l) => l);
                  if (o.length) {
                    let l = !1,
                      f = [];
                    for (let p = 0; p < o.length; p++) {
                      let d = o[p][0].split(`\r
`);
                      const m =
                          c && c.length >= p + 1 && c[p] ? q.toInt(c[p]) : 0,
                        h = u && u.length >= p + 1 && u[p] ? q.toInt(u[p]) : 0,
                        y = kl(d, m, h);
                      !l && y.status > 0 && y.status !== 10
                        ? ((e.hasBattery = y.hasBattery),
                          (e.maxCapacity = y.maxCapacity),
                          (e.designedCapacity = y.designedCapacity),
                          (e.voltage = y.voltage),
                          (e.capacityUnit = y.capacityUnit),
                          (e.percent = y.percent),
                          (e.currentCapacity = y.currentCapacity),
                          (e.isCharging = y.isCharging),
                          (e.acConnected = y.acConnected),
                          (e.model = y.model),
                          (l = !0))
                        : y.status !== -1 &&
                          f.push({
                            hasBattery: y.hasBattery,
                            maxCapacity: y.maxCapacity,
                            designedCapacity: y.designedCapacity,
                            voltage: y.voltage,
                            capacityUnit: y.capacityUnit,
                            percent: y.percent,
                            currentCapacity: y.currentCapacity,
                            isCharging: y.isCharging,
                            timeRemaining: null,
                            acConnected: y.acConnected,
                            model: y.model,
                            type: "",
                            manufacturer: "",
                            serial: "",
                          });
                    }
                    (!l && f.length && ((e = f[0]), f.shift()),
                      f.length && (e.additionalBatteries = f));
                  }
                }
                (t && t(e), n(e));
              }));
          } catch {
            (t && t(e), n(e));
          }
      });
    });
  },
  lo = {};
const Xn = Ae,
  Qt = se.exec,
  Gi = se.execSync,
  B = V;
let gt = process.platform,
  In = "";
const qn = gt === "linux" || gt === "android",
  Wl = gt === "darwin",
  qr = gt === "win32",
  Rl = gt === "freebsd",
  Gl = gt === "openbsd",
  $l = gt === "netbsd",
  zl = gt === "sunos";
let vn = 0,
  _n = 0,
  Yn = 0,
  Jn = 0;
const Yr = {
  "-2": "UNINITIALIZED",
  "-1": "OTHER",
  0: "HD15",
  1: "SVIDEO",
  2: "Composite video",
  3: "Component video",
  4: "DVI",
  5: "HDMI",
  6: "LVDS",
  8: "D_JPN",
  9: "SDI",
  10: "DP",
  11: "DP embedded",
  12: "UDI",
  13: "UDI embedded",
  14: "SDTVDONGLE",
  15: "MIRACAST",
  2147483648: "INTERNAL",
};
function Jr(t) {
  const n = [
    { pattern: "^LG.+", manufacturer: "LG" },
    { pattern: "^BENQ.+", manufacturer: "BenQ" },
    { pattern: "^ASUS.+", manufacturer: "Asus" },
    { pattern: "^DELL.+", manufacturer: "Dell" },
    { pattern: "^SAMSUNG.+", manufacturer: "Samsung" },
    { pattern: "^VIEWSON.+", manufacturer: "ViewSonic" },
    { pattern: "^SONY.+", manufacturer: "Sony" },
    { pattern: "^ACER.+", manufacturer: "Acer" },
    { pattern: "^AOC.+", manufacturer: "AOC Monitors" },
    { pattern: "^HP.+", manufacturer: "HP" },
    { pattern: "^EIZO.?", manufacturer: "Eizo" },
    { pattern: "^PHILIPS.?", manufacturer: "Philips" },
    { pattern: "^IIYAMA.?", manufacturer: "Iiyama" },
    { pattern: "^SHARP.?", manufacturer: "Sharp" },
    { pattern: "^NEC.?", manufacturer: "NEC" },
    { pattern: "^LENOVO.?", manufacturer: "Lenovo" },
    { pattern: "COMPAQ.?", manufacturer: "Compaq" },
    { pattern: "APPLE.?", manufacturer: "Apple" },
    { pattern: "INTEL.?", manufacturer: "Intel" },
    { pattern: "AMD.?", manufacturer: "AMD" },
    { pattern: "NVIDIA.?", manufacturer: "NVDIA" },
  ];
  let e = "";
  return (
    t &&
      ((t = t.toUpperCase()),
      n.forEach((i) => {
        RegExp(i.pattern).test(t) && (e = i.manufacturer);
      })),
    e
  );
}
function Ul(t) {
  return (
    {
      610: "Apple",
      "1e6d": "LG",
      "10ac": "DELL",
      "4dd9": "Sony",
      "38a3": "NEC",
    }[t] || ""
  );
}
function Hl(t) {
  let n = "";
  return (
    (t = (t || "").toLowerCase()),
    t.indexOf("apple") >= 0
      ? (n = "0x05ac")
      : t.indexOf("nvidia") >= 0
        ? (n = "0x10de")
        : t.indexOf("intel") >= 0
          ? (n = "0x8086")
          : (t.indexOf("ati") >= 0 || t.indexOf("amd") >= 0) && (n = "0x1002"),
    n
  );
}
function jl(t) {
  return (
    {
      spdisplays_mtlgpufamilymac1: "mac1",
      spdisplays_mtlgpufamilymac2: "mac2",
      spdisplays_mtlgpufamilyapple1: "apple1",
      spdisplays_mtlgpufamilyapple2: "apple2",
      spdisplays_mtlgpufamilyapple3: "apple3",
      spdisplays_mtlgpufamilyapple4: "apple4",
      spdisplays_mtlgpufamilyapple5: "apple5",
      spdisplays_mtlgpufamilyapple6: "apple6",
      spdisplays_mtlgpufamilyapple7: "apple7",
      spdisplays_metalfeaturesetfamily11: "family1_v1",
      spdisplays_metalfeaturesetfamily12: "family1_v2",
      spdisplays_metalfeaturesetfamily13: "family1_v3",
      spdisplays_metalfeaturesetfamily14: "family1_v4",
      spdisplays_metalfeaturesetfamily21: "family2_v1",
    }[t] || ""
  );
}
function Kl(t) {
  function n(p) {
    const d = {
      controllers: [],
      displays: [],
    };
    try {
      return (
        p.forEach(function (m) {
          const h =
              (m.sppci_bus || "").indexOf("builtin") > -1
                ? "Built-In"
                : (m.sppci_bus || "").indexOf("pcie") > -1
                  ? "PCIe"
                  : "",
            y =
              (parseInt(m.spdisplays_vram || "", 10) || 0) *
              ((m.spdisplays_vram || "").indexOf("GB") > -1 ? 1024 : 1),
            g =
              (parseInt(m.spdisplays_vram_shared || "", 10) || 0) *
              ((m.spdisplays_vram_shared || "").indexOf("GB") > -1 ? 1024 : 1);
          let x = jl(m.spdisplays_metal || m.spdisplays_metalfamily || "");
          (d.controllers.push({
            vendor: Jr(m.spdisplays_vendor || "") || m.spdisplays_vendor || "",
            model: m.sppci_model || "",
            bus: h,
            vramDynamic: h === "Built-In",
            vram: y || g || null,
            deviceId: m["spdisplays_device-id"] || "",
            vendorId:
              m["spdisplays_vendor-id"] ||
              Hl((m.spdisplays_vendor || "") + (m.sppci_model || "")),
            external: m.sppci_device_type === "spdisplays_egpu",
            cores: m.sppci_cores || null,
            metalVersion: x,
          }),
            m.spdisplays_ndrvs &&
              m.spdisplays_ndrvs.length &&
              m.spdisplays_ndrvs.forEach(function (S) {
                const w = S.spdisplays_connection_type || "",
                  C = (S._spdisplays_resolution || "").split("@"),
                  W = C[0].split("x"),
                  T = (S._spdisplays_pixels || "").split("x"),
                  K = S.spdisplays_depth || "",
                  L =
                    S["_spdisplays_display-serial-number"] ||
                    S["_spdisplays_display-serial-number2"] ||
                    null;
                d.displays.push({
                  vendor:
                    Ul(S["_spdisplays_display-vendor-id"] || "") ||
                    Jr(S._name || ""),
                  vendorId: S["_spdisplays_display-vendor-id"] || "",
                  model: S._name || "",
                  productionYear: S["_spdisplays_display-year"] || null,
                  serial: L !== "0" ? L : null,
                  displayId: S._spdisplays_displayID || null,
                  main: S.spdisplays_main
                    ? S.spdisplays_main === "spdisplays_yes"
                    : !1,
                  builtin:
                    (S.spdisplays_display_type || "").indexOf("built-in") > -1,
                  connection:
                    w.indexOf("_internal") > -1
                      ? "Internal"
                      : w.indexOf("_displayport") > -1
                        ? "Display Port"
                        : w.indexOf("_hdmi") > -1
                          ? "HDMI"
                          : null,
                  sizeX: null,
                  sizeY: null,
                  pixelDepth:
                    K === "CGSThirtyBitColor"
                      ? 30
                      : K === "CGSThirtytwoBitColor"
                        ? 32
                        : K === "CGSTwentyfourBitColor"
                          ? 24
                          : null,
                  resolutionX: T.length > 1 ? parseInt(T[0], 10) : null,
                  resolutionY: T.length > 1 ? parseInt(T[1], 10) : null,
                  currentResX: W.length > 1 ? parseInt(W[0], 10) : null,
                  currentResY: W.length > 1 ? parseInt(W[1], 10) : null,
                  positionX: 0,
                  positionY: 0,
                  currentRefreshRate: C.length > 1 ? parseInt(C[1], 10) : null,
                });
              }));
        }),
        d
      );
    } catch {
      return d;
    }
  }
  function e(p) {
    let d = [],
      m = {
        vendor: "",
        subVendor: "",
        model: "",
        bus: "",
        busAddress: "",
        vram: null,
        vramDynamic: !1,
        pciID: "",
      },
      h = !1,
      y = [];
    try {
      y = Gi(
        'export LC_ALL=C; dmidecode -t 9 2>/dev/null; unset LC_ALL | grep "Bus Address: "',
        B.execOptsLinux,
      ).toString().split(`
`);
      for (let x = 0; x < y.length; x++)
        y[x] = y[x].replace("Bus Address:", "").replace("0000:", "").trim();
      y = y.filter(function (x) {
        return x != null && x;
      });
    } catch {
      B.noop();
    }
    let g = 1;
    return (
      p.forEach((x) => {
        let S = "";
        if (
          (g < p.length &&
            p[g] &&
            ((S = p[g]), S.indexOf(":") > 0 && (S = S.split(":")[1])),
          x.trim() !== "")
        ) {
          if (x[0] !== " " && x[0] !== "	") {
            let w = y.indexOf(x.split(" ")[0]) >= 0,
              C = x.toLowerCase().indexOf(" vga "),
              W = x.toLowerCase().indexOf("3d controller");
            if (C !== -1 || W !== -1) {
              (W !== -1 && C === -1 && (C = W),
                (m.vendor ||
                  m.model ||
                  m.bus ||
                  m.vram !== null ||
                  m.vramDynamic) &&
                  (d.push(m),
                  (m = {
                    vendor: "",
                    model: "",
                    bus: "",
                    busAddress: "",
                    vram: null,
                    vramDynamic: !1,
                  })));
              const T = x.split(" ")[0];
              (/[\da-fA-F]{2}:[\da-fA-F]{2}\.[\da-fA-F]/.test(T) &&
                (m.busAddress = T),
                (h = !0));
              let K = x.search(/\[[0-9a-f]{4}:[0-9a-f]{4}]|$/),
                L = x.substr(C, K - C).split(":");
              if (
                ((m.busAddress = x.substr(0, C).trim()),
                L.length > 1 &&
                  ((L[1] = L[1].trim()),
                  L[1].toLowerCase().indexOf("corporation") >= 0
                    ? ((m.vendor = L[1]
                        .substr(
                          0,
                          L[1].toLowerCase().indexOf("corporation") + 11,
                        )
                        .trim()),
                      (m.model = L[1]
                        .substr(
                          L[1].toLowerCase().indexOf("corporation") + 11,
                          200,
                        )
                        .split("(")[0]
                        .trim()),
                      (m.bus = y.length > 0 && w ? "PCIe" : "Onboard"),
                      (m.vram = null),
                      (m.vramDynamic = !1))
                    : L[1].toLowerCase().indexOf(" inc.") >= 0
                      ? ((L[1].match(/]/g) || []).length > 1
                          ? ((m.vendor = L[1]
                              .substr(0, L[1].toLowerCase().indexOf("]") + 1)
                              .trim()),
                            (m.model = L[1]
                              .substr(L[1].toLowerCase().indexOf("]") + 1, 200)
                              .trim()
                              .split("(")[0]
                              .trim()))
                          : ((m.vendor = L[1]
                              .substr(
                                0,
                                L[1].toLowerCase().indexOf(" inc.") + 5,
                              )
                              .trim()),
                            (m.model = L[1]
                              .substr(
                                L[1].toLowerCase().indexOf(" inc.") + 5,
                                200,
                              )
                              .trim()
                              .split("(")[0]
                              .trim())),
                        (m.bus = y.length > 0 && w ? "PCIe" : "Onboard"),
                        (m.vram = null),
                        (m.vramDynamic = !1))
                      : L[1].toLowerCase().indexOf(" ltd.") >= 0 &&
                        ((L[1].match(/]/g) || []).length > 1
                          ? ((m.vendor = L[1]
                              .substr(0, L[1].toLowerCase().indexOf("]") + 1)
                              .trim()),
                            (m.model = L[1]
                              .substr(L[1].toLowerCase().indexOf("]") + 1, 200)
                              .trim()
                              .split("(")[0]
                              .trim()))
                          : ((m.vendor = L[1]
                              .substr(
                                0,
                                L[1].toLowerCase().indexOf(" ltd.") + 5,
                              )
                              .trim()),
                            (m.model = L[1]
                              .substr(
                                L[1].toLowerCase().indexOf(" ltd.") + 5,
                                200,
                              )
                              .trim()
                              .split("(")[0]
                              .trim()))),
                  m.model && S.indexOf(m.model) !== -1))
              ) {
                const D = S.split(m.model)[0].trim();
                D && (m.subVendor = D);
              }
            } else h = !1;
          }
          if (h) {
            let w = x.split(":");
            if (
              (w.length > 1 &&
                w[0].replace(/ +/g, "").toLowerCase().indexOf("devicename") !==
                  -1 &&
                w[1].toLowerCase().indexOf("onboard") !== -1 &&
                (m.bus = "Onboard"),
              w.length > 1 &&
                w[0].replace(/ +/g, "").toLowerCase().indexOf("region") !==
                  -1 &&
                w[1].toLowerCase().indexOf("memory") !== -1)
            ) {
              let C = w[1].split("=");
              C.length > 1 && (m.vram = parseInt(C[1]));
            }
          }
        }
        g++;
      }),
      (m.vendor ||
        m.model ||
        m.bus ||
        m.busAddress ||
        m.vram !== null ||
        m.vramDynamic) &&
        d.push(m),
      d
    );
  }
  function i(p, d) {
    const m = /\[([^\]]+)\]\s+(\w+)\s+(.*)/,
      h = d.reduce((y, g) => {
        const x = m.exec(g.trim());
        return (x && (y[x[1]] || (y[x[1]] = {}), (y[x[1]][x[2]] = x[3])), y);
      }, {});
    for (let y in h) {
      const g = h[y];
      if (g.CL_DEVICE_TYPE === "CL_DEVICE_TYPE_GPU") {
        let x;
        if (g.CL_DEVICE_TOPOLOGY_AMD) {
          const S = g.CL_DEVICE_TOPOLOGY_AMD.match(/[a-zA-Z0-9]+:\d+\.\d+/);
          S && (x = S[0]);
        } else if (g.CL_DEVICE_PCI_BUS_ID_NV && g.CL_DEVICE_PCI_SLOT_ID_NV) {
          const S = parseInt(g.CL_DEVICE_PCI_BUS_ID_NV),
            w = parseInt(g.CL_DEVICE_PCI_SLOT_ID_NV);
          if (!isNaN(S) && !isNaN(w)) {
            const C = S & 255,
              W = (w >> 3) & 255,
              T = w & 7;
            x = `${C.toString().padStart(2, "0")}:${W.toString().padStart(2, "0")}.${T}`;
          }
        }
        if (x) {
          let S = p.find((C) => C.busAddress === x);
          (S ||
            ((S = {
              vendor: "",
              model: "",
              bus: "",
              busAddress: x,
              vram: null,
              vramDynamic: !1,
            }),
            p.push(S)),
            (S.vendor = g.CL_DEVICE_VENDOR),
            g.CL_DEVICE_BOARD_NAME_AMD
              ? (S.model = g.CL_DEVICE_BOARD_NAME_AMD)
              : (S.model = g.CL_DEVICE_NAME));
          const w = parseInt(g.CL_DEVICE_GLOBAL_MEM_SIZE);
          isNaN(w) || (S.vram = Math.round(w / 1024 / 1024));
        }
      }
    }
    return p;
  }
  function s() {
    if (In) return In;
    if (qr)
      try {
        const p = B.WINDIR + "\\System32\\DriverStore\\FileRepository",
          m = Xn.readdirSync(p)
            .filter((h) =>
              Xn.readdirSync([p, h].join("/")).includes("nvidia-smi.exe"),
            )
            .reduce((h, y) => {
              const g = Xn.statSync([p, h, "nvidia-smi.exe"].join("/")),
                x = Xn.statSync([p, y, "nvidia-smi.exe"].join("/"));
              return g.ctimeMs > x.ctimeMs ? h : y;
            });
        m && (In = [p, m, "nvidia-smi.exe"].join("/"));
      } catch {
        B.noop();
      }
    else qn && (In = "nvidia-smi");
    return In;
  }
  function r(p) {
    const d = s();
    if (((p = p || B.execOptsWin), d)) {
      const h =
        d +
        " " +
        "--query-gpu=driver_version,pci.sub_device_id,name,pci.bus_id,fan.speed,memory.total,memory.used,memory.free,utilization.gpu,utilization.memory,temperature.gpu,temperature.memory,power.draw,power.limit,clocks.gr,clocks.mem --format=csv,noheader,nounits" +
        (qn ? "  2>/dev/null" : "");
      qn && (p.stdio = ["pipe", "pipe", "ignore"]);
      try {
        const y = B.sanitizeShellString(h);
        return Gi(y, p).toString();
      } catch {
        B.noop();
      }
    }
    return "";
  }
  function o() {
    function p(y) {
      return [null, void 0].includes(y) ? y : parseFloat(y);
    }
    const d = r();
    if (!d) return [];
    let h = d
      .split(
        `
`,
      )
      .filter(Boolean)
      .map((y) => {
        const g = y.split(", ").map((x) => (x.includes("N/A") ? void 0 : x));
        return g.length === 16
          ? {
              driverVersion: g[0],
              subDeviceId: g[1],
              name: g[2],
              pciBus: g[3],
              fanSpeed: p(g[4]),
              memoryTotal: p(g[5]),
              memoryUsed: p(g[6]),
              memoryFree: p(g[7]),
              utilizationGpu: p(g[8]),
              utilizationMemory: p(g[9]),
              temperatureGpu: p(g[10]),
              temperatureMemory: p(g[11]),
              powerDraw: p(g[12]),
              powerLimit: p(g[13]),
              clockCore: p(g[14]),
              clockMemory: p(g[15]),
            }
          : {};
      });
    return ((h = h.filter((y) => "pciBus" in y)), h);
  }
  function a(p, d) {
    return (
      d.driverVersion && (p.driverVersion = d.driverVersion),
      d.subDeviceId && (p.subDeviceId = d.subDeviceId),
      d.name && (p.name = d.name),
      d.pciBus && (p.pciBus = d.pciBus),
      d.fanSpeed && (p.fanSpeed = d.fanSpeed),
      d.memoryTotal &&
        ((p.memoryTotal = d.memoryTotal),
        (p.vram = d.memoryTotal),
        (p.vramDynamic = !1)),
      d.memoryUsed && (p.memoryUsed = d.memoryUsed),
      d.memoryFree && (p.memoryFree = d.memoryFree),
      d.utilizationGpu && (p.utilizationGpu = d.utilizationGpu),
      d.utilizationMemory && (p.utilizationMemory = d.utilizationMemory),
      d.temperatureGpu && (p.temperatureGpu = d.temperatureGpu),
      d.temperatureMemory && (p.temperatureMemory = d.temperatureMemory),
      d.powerDraw && (p.powerDraw = d.powerDraw),
      d.powerLimit && (p.powerLimit = d.powerLimit),
      d.clockCore && (p.clockCore = d.clockCore),
      d.clockMemory && (p.clockMemory = d.clockMemory),
      p
    );
  }
  function c(p) {
    let d = {
        vendor: "",
        model: "",
        deviceName: "",
        main: !1,
        builtin: !1,
        connection: "",
        sizeX: null,
        sizeY: null,
        pixelDepth: null,
        resolutionX: null,
        resolutionY: null,
        currentResX: null,
        currentResY: null,
        positionX: 0,
        positionY: 0,
        currentRefreshRate: null,
      },
      m = 108;
    if (
      (p.substr(m, 6) === "000000" && (m += 36),
      p.substr(m, 6) === "000000" && (m += 36),
      p.substr(m, 6) === "000000" && (m += 36),
      p.substr(m, 6) === "000000" && (m += 36),
      (d.resolutionX = parseInt(
        "0x0" + p.substr(m + 8, 1) + p.substr(m + 4, 2),
      )),
      (d.resolutionY = parseInt(
        "0x0" + p.substr(m + 14, 1) + p.substr(m + 10, 2),
      )),
      (d.sizeX = parseInt("0x0" + p.substr(m + 28, 1) + p.substr(m + 24, 2))),
      (d.sizeY = parseInt("0x0" + p.substr(m + 29, 1) + p.substr(m + 26, 2))),
      (m = p.indexOf("000000fc00")),
      m >= 0)
    ) {
      let h = p.substr(m + 10, 26);
      h.indexOf("0a") !== -1 && (h = h.substr(0, h.indexOf("0a")));
      try {
        h.length > 2 &&
          (d.model = h
            .match(/.{1,2}/g)
            .map(function (y) {
              return String.fromCharCode(parseInt(y, 16));
            })
            .join(""));
      } catch {
        B.noop();
      }
    } else d.model = "";
    return d;
  }
  function u(p, d) {
    let m = [],
      h = {
        vendor: "",
        model: "",
        deviceName: "",
        main: !1,
        builtin: !1,
        connection: "",
        sizeX: null,
        sizeY: null,
        pixelDepth: null,
        resolutionX: null,
        resolutionY: null,
        currentResX: null,
        currentResY: null,
        positionX: 0,
        positionY: 0,
        currentRefreshRate: null,
      },
      y = !1,
      g = !1,
      x = "",
      S = 0;
    for (let w = 1; w < p.length; w++)
      if (p[w].trim() !== "") {
        if (
          p[w][0] !== " " &&
          p[w][0] !== "	" &&
          p[w].toLowerCase().indexOf(" connected ") !== -1
        ) {
          (h.model ||
            h.main ||
            h.builtin ||
            h.connection ||
            h.sizeX !== null ||
            h.pixelDepth !== null ||
            h.resolutionX !== null) &&
            (m.push(h),
            (h = {
              vendor: "",
              model: "",
              main: !1,
              builtin: !1,
              connection: "",
              sizeX: null,
              sizeY: null,
              pixelDepth: null,
              resolutionX: null,
              resolutionY: null,
              currentResX: null,
              currentResY: null,
              positionX: 0,
              positionY: 0,
              currentRefreshRate: null,
            }));
          let C = p[w].split(" ");
          ((h.connection = C[0]),
            (h.main = p[w].toLowerCase().indexOf(" primary ") >= 0),
            (h.builtin = C[0].toLowerCase().indexOf("edp") >= 0));
        }
        if (y)
          if (p[w].search(/\S|$/) > S) x += p[w].toLowerCase().trim();
          else {
            let C = c(x);
            ((h.vendor = C.vendor),
              (h.model = C.model),
              (h.resolutionX = C.resolutionX),
              (h.resolutionY = C.resolutionY),
              (h.sizeX = C.sizeX),
              (h.sizeY = C.sizeY),
              (h.pixelDepth = d),
              (y = !1));
          }
        if (
          (p[w].toLowerCase().indexOf("edid:") >= 0 &&
            ((y = !0), (S = p[w].search(/\S|$/))),
          p[w].toLowerCase().indexOf("*current") >= 0)
        ) {
          const C = p[w].split("(");
          if (C && C.length > 1 && C[0].indexOf("x") >= 0) {
            const W = C[0].trim().split("x");
            ((h.currentResX = B.toInt(W[0])), (h.currentResY = B.toInt(W[1])));
          }
          g = !0;
        }
        if (
          g &&
          p[w].toLowerCase().indexOf("clock") >= 0 &&
          p[w].toLowerCase().indexOf("hz") >= 0 &&
          p[w].toLowerCase().indexOf("v: height") >= 0
        ) {
          const C = p[w].split("clock");
          (C &&
            C.length > 1 &&
            C[1].toLowerCase().indexOf("hz") >= 0 &&
            (h.currentRefreshRate = B.toInt(C[1])),
            (g = !1));
        }
      }
    return (
      (h.model ||
        h.main ||
        h.builtin ||
        h.connection ||
        h.sizeX !== null ||
        h.pixelDepth !== null ||
        h.resolutionX !== null) &&
        m.push(h),
      m
    );
  }
  return new Promise((p) => {
    process.nextTick(() => {
      let d = {
        controllers: [],
        displays: [],
      };
      if (
        (Wl &&
          Qt(
            "system_profiler -xml -detailLevel full SPDisplaysDataType",
            function (h, y) {
              if (!h) {
                try {
                  const g = y.toString();
                  d = n(B.plistParser(g)[0]._items);
                } catch {
                  B.noop();
                }
                try {
                  y = Gi(
                    'defaults read /Library/Preferences/com.apple.windowserver.plist 2>/dev/null;defaults read /Library/Preferences/com.apple.windowserver.displays.plist 2>/dev/null; echo ""',
                    { maxBuffer: 1024 * 2e4 },
                  );
                  const g = (y || "").toString(),
                    x = B.plistReader(g);
                  if (
                    x.DisplayAnyUserSets &&
                    x.DisplayAnyUserSets.Configs &&
                    x.DisplayAnyUserSets.Configs[0] &&
                    x.DisplayAnyUserSets.Configs[0].DisplayConfig
                  ) {
                    const S = x.DisplayAnyUserSets.Configs[0].DisplayConfig;
                    let w = 0;
                    S.forEach((C) => {
                      (C.CurrentInfo &&
                        C.CurrentInfo.OriginX !== void 0 &&
                        d.displays &&
                        d.displays[w] &&
                        (d.displays[w].positionX = C.CurrentInfo.OriginX),
                        C.CurrentInfo &&
                          C.CurrentInfo.OriginY !== void 0 &&
                          d.displays &&
                          d.displays[w] &&
                          (d.displays[w].positionY = C.CurrentInfo.OriginY),
                        w++);
                    });
                  }
                  if (
                    x.DisplayAnyUserSets &&
                    x.DisplayAnyUserSets.length > 0 &&
                    x.DisplayAnyUserSets[0].length > 0 &&
                    x.DisplayAnyUserSets[0][0].DisplayID
                  ) {
                    const S = x.DisplayAnyUserSets[0];
                    let w = 0;
                    S.forEach((C) => {
                      ("OriginX" in C &&
                        d.displays &&
                        d.displays[w] &&
                        (d.displays[w].positionX = C.OriginX),
                        "OriginY" in C &&
                          d.displays &&
                          d.displays[w] &&
                          (d.displays[w].positionY = C.OriginY),
                        C.Mode &&
                          C.Mode.BitsPerPixel !== void 0 &&
                          d.displays &&
                          d.displays[w] &&
                          (d.displays[w].pixelDepth = C.Mode.BitsPerPixel),
                        w++);
                    });
                  }
                } catch {
                  B.noop();
                }
              }
              (t && t(d), p(d));
            },
          ),
        qn &&
          (B.isRaspberry() &&
            Qt(
              `fbset -s 2> /dev/null | grep 'mode "' ; vcgencmd get_mem gpu 2> /dev/null; tvservice -s 2> /dev/null; tvservice -n 2> /dev/null;`,
              function (y, g) {
                let x = g.toString().split(`
`);
                if (
                  x.length > 3 &&
                  x[0].indexOf('mode "') >= -1 &&
                  x[2].indexOf("0x12000a") > -1
                ) {
                  const S = x[0]
                    .replace("mode", "")
                    .replace(/"/g, "")
                    .trim()
                    .split("x");
                  S.length === 2 &&
                    d.displays.push({
                      vendor: "",
                      model: B.getValue(x, "device_name", "="),
                      main: !0,
                      builtin: !1,
                      connection: "HDMI",
                      sizeX: null,
                      sizeY: null,
                      pixelDepth: null,
                      resolutionX: parseInt(S[0], 10),
                      resolutionY: parseInt(S[1], 10),
                      currentResX: null,
                      currentResY: null,
                      positionX: 0,
                      positionY: 0,
                      currentRefreshRate: null,
                    });
                }
                x.length >= 1 &&
                  g.toString().indexOf("gpu=") >= -1 &&
                  d.controllers.push({
                    vendor: "Broadcom",
                    model: B.getRpiGpu(),
                    bus: "",
                    vram: B.getValue(x, "gpu", "=").replace("M", ""),
                    vramDynamic: !0,
                  });
              },
            ),
          Qt("lspci -vvv  2>/dev/null", function (h, y) {
            if (!h) {
              let x = y.toString().split(`
`);
              if (d.controllers.length === 0) {
                d.controllers = e(x);
                const S = o();
                d.controllers = d.controllers.map((w) =>
                  a(
                    w,
                    S.find((C) =>
                      C.pciBus
                        .toLowerCase()
                        .endsWith(w.busAddress.toLowerCase()),
                    ) || {},
                  ),
                );
              }
            }
            Qt("clinfo --raw", function (x, S) {
              if (!x) {
                let C = S.toString().split(`
`);
                d.controllers = i(d.controllers, C);
              }
              Qt(
                "xdpyinfo 2>/dev/null | grep 'depth of root window' | awk '{ print $5 }'",
                function (C, W) {
                  let T = 0;
                  if (!C) {
                    let L = W.toString().split(`
`);
                    T = parseInt(L[0]) || 0;
                  }
                  Qt("xrandr --verbose 2>/dev/null", function (L, D) {
                    if (!L) {
                      let O = D.toString().split(`
`);
                      d.displays = u(O, T);
                    }
                    (t && t(d), p(d));
                  });
                },
              );
            });
          })),
        (Rl || Gl || $l) && (t && t(null), p(null)),
        zl && (t && t(null), p(null)),
        qr)
      )
        try {
          const m = [];
          (m.push(B.powerShell("Get-CimInstance win32_VideoController | fl *")),
            m.push(
              B.powerShell(
                'gp "HKLM:\\SYSTEM\\ControlSet001\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\*" -ErrorAction SilentlyContinue | where MatchingDeviceId $null -NE | select MatchingDeviceId,HardwareInformation.qwMemorySize | fl',
              ),
            ),
            m.push(B.powerShell("Get-CimInstance win32_desktopmonitor | fl *")),
            m.push(
              B.powerShell(
                "Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorBasicDisplayParams | fl",
              ),
            ),
            m.push(
              B.powerShell(
                "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Screen]::AllScreens",
              ),
            ),
            m.push(
              B.powerShell(
                "Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorConnectionParams | fl",
              ),
            ),
            m.push(
              B.powerShell(
                'gwmi WmiMonitorID -Namespace root\\wmi | ForEach-Object {(($_.ManufacturerName -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.ProductCodeID -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.UserFriendlyName -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.SerialNumberID -notmatch 0 | foreach {[char]$_}) -join "") + "|" + $_.InstanceName}',
              ),
            ));
          const h = o();
          Promise.all(m)
            .then((y) => {
              let g = y[0].replace(/\r/g, "").split(/\n\s*\n/),
                x = y[1].replace(/\r/g, "").split(/\n\s*\n/);
              ((d.controllers = l(g, x)),
                (d.controllers = d.controllers.map((L) =>
                  L.vendor.toLowerCase() === "nvidia"
                    ? a(
                        L,
                        h.find((D) => {
                          let O = (L.subDeviceId || "").toLowerCase();
                          const X = D.subDeviceId.split("x");
                          let Q =
                            X.length > 1
                              ? X[1].toLowerCase()
                              : X[0].toLowerCase();
                          const ee = Math.abs(O.length - Q.length);
                          if (O.length > Q.length)
                            for (let F = 0; F < ee; F++) Q = "0" + Q;
                          else if (O.length < Q.length)
                            for (let F = 0; F < ee; F++) O = "0" + O;
                          return O === Q;
                        }) || {},
                      )
                    : L,
                )));
              let S = y[2].replace(/\r/g, "").split(/\n\s*\n/);
              (S[0].trim() === "" && S.shift(),
                S.length && S[S.length - 1].trim() === "" && S.pop());
              let w = y[3].replace(/\r/g, "").split("Active ");
              w.shift();
              let C = y[4].replace(/\r/g, "").split("BitsPerPixel ");
              C.shift();
              let W = y[5].replace(/\r/g, "").split(/\n\s*\n/);
              W.shift();
              const T = y[6].replace(/\r/g, "").split(/\n/);
              let K = [];
              (T.forEach((L) => {
                const D = L.split("|");
                D.length === 5 &&
                  K.push({
                    vendor: D[0],
                    code: D[1],
                    model: D[2],
                    serial: D[3],
                    instanceId: D[4],
                  });
              }),
                (d.displays = f(C, w, S, W, K)),
                d.displays.length === 1 &&
                  (vn &&
                    ((d.displays[0].resolutionX = vn),
                    d.displays[0].currentResX ||
                      (d.displays[0].currentResX = vn)),
                  _n &&
                    ((d.displays[0].resolutionY = _n),
                    d.displays[0].currentResY === 0 &&
                      (d.displays[0].currentResY = _n)),
                  Yn && (d.displays[0].pixelDepth = Yn)),
                (d.displays = d.displays.map(
                  (L) => (
                    Jn && !L.currentRefreshRate && (L.currentRefreshRate = Jn),
                    L
                  ),
                )),
                t && t(d),
                p(d));
            })
            .catch(() => {
              (t && t(d), p(d));
            });
        } catch {
          (t && t(d), p(d));
        }
    });
  });
  function l(p, d) {
    const m = {};
    for (const y in d)
      if ({}.hasOwnProperty.call(d, y) && d[y].trim() !== "") {
        const g = d[y].trim().split(`
`),
          x = B.getValue(g, "MatchingDeviceId").match(
            /PCI\\(VEN_[0-9A-F]{4})&(DEV_[0-9A-F]{4})(?:&(SUBSYS_[0-9A-F]{8}))?(?:&(REV_[0-9A-F]{2}))?/i,
          );
        if (x) {
          const S = parseInt(B.getValue(g, "HardwareInformation.qwMemorySize"));
          if (!isNaN(S)) {
            let w = x[1].toUpperCase() + "&" + x[2].toUpperCase();
            (x[3] && (w += "&" + x[3].toUpperCase()),
              x[4] && (w += "&" + x[4].toUpperCase()),
              (m[w] = S));
          }
        }
      }
    let h = [];
    for (let y in p)
      if ({}.hasOwnProperty.call(p, y) && p[y].trim() !== "") {
        let g = p[y].trim().split(`
`),
          x = B.getValue(g, "PNPDeviceID", ":").match(
            /PCI\\(VEN_[0-9A-F]{4})&(DEV_[0-9A-F]{4})(?:&(SUBSYS_[0-9A-F]{8}))?(?:&(REV_[0-9A-F]{2}))?/i,
          ),
          S = null,
          w = null;
        if (x) {
          if (
            ((S = x[3] || ""),
            S && (S = S.split("_")[1]),
            w == null && x[3] && x[4])
          ) {
            const C =
              x[1].toUpperCase() +
              "&" +
              x[2].toUpperCase() +
              "&" +
              x[3].toUpperCase() +
              "&" +
              x[4].toUpperCase();
            ({}).hasOwnProperty.call(m, C) && (w = m[C]);
          }
          if (w == null && x[3]) {
            const C =
              x[1].toUpperCase() +
              "&" +
              x[2].toUpperCase() +
              "&" +
              x[3].toUpperCase();
            ({}).hasOwnProperty.call(m, C) && (w = m[C]);
          }
          if (w == null && x[4]) {
            const C =
              x[1].toUpperCase() +
              "&" +
              x[2].toUpperCase() +
              "&" +
              x[4].toUpperCase();
            ({}).hasOwnProperty.call(m, C) && (w = m[C]);
          }
          if (w == null) {
            const C = x[1].toUpperCase() + "&" + x[2].toUpperCase();
            ({}).hasOwnProperty.call(m, C) && (w = m[C]);
          }
        }
        (h.push({
          vendor: B.getValue(g, "AdapterCompatibility", ":"),
          model: B.getValue(g, "name", ":"),
          bus: B.getValue(g, "PNPDeviceID", ":").startsWith("PCI") ? "PCI" : "",
          vram: (w ?? B.toInt(B.getValue(g, "AdapterRAM", ":"))) / 1024 / 1024,
          vramDynamic: B.getValue(g, "VideoMemoryType", ":") === "2",
          subDeviceId: S,
        }),
          (vn =
            B.toInt(B.getValue(g, "CurrentHorizontalResolution", ":")) || vn),
          (_n = B.toInt(B.getValue(g, "CurrentVerticalResolution", ":")) || _n),
          (Jn = B.toInt(B.getValue(g, "CurrentRefreshRate", ":")) || Jn),
          (Yn = B.toInt(B.getValue(g, "CurrentBitsPerPixel", ":")) || Yn));
      }
    return h;
  }
  function f(p, d, m, h, y) {
    let g = [],
      x = "",
      S = "",
      w = "",
      C = 0,
      W = 0;
    if (m && m.length) {
      let T = m[0].split(`
`);
      ((x = B.getValue(T, "MonitorManufacturer", ":")),
        (S = B.getValue(T, "Name", ":")),
        (w = B.getValue(T, "PNPDeviceID", ":")
          .replace(/&amp;/g, "&")
          .toLowerCase()),
        (C = B.toInt(B.getValue(T, "ScreenWidth", ":"))),
        (W = B.toInt(B.getValue(T, "ScreenHeight", ":"))));
    }
    for (let T = 0; T < p.length; T++)
      if (p[T].trim() !== "") {
        ((p[T] = "BitsPerPixel " + p[T]),
          (d[T] = "Active " + d[T]),
          (h.length === 0 || h[T] === void 0) && (h[T] = "Unknown"));
        let K = p[T].split(`
`),
          L = d[T].split(`
`),
          D = h[T].split(`
`);
        const O = B.getValue(K, "BitsPerPixel"),
          X = B.getValue(K, "Bounds")
            .replace("{", "")
            .replace("}", "")
            .replace(/=/g, ":")
            .split(","),
          Q = B.getValue(K, "Primary"),
          ee = B.getValue(L, "MaxHorizontalImageSize"),
          F = B.getValue(L, "MaxVerticalImageSize"),
          Y = B.getValue(L, "InstanceName").toLowerCase(),
          N = B.getValue(D, "VideoOutputTechnology"),
          H = B.getValue(K, "DeviceName");
        let b = "",
          $ = "";
        (y.forEach((k) => {
          k.instanceId.toLowerCase().startsWith(Y) &&
            x.startsWith("(") &&
            S.startsWith("PnP") &&
            ((b = k.vendor), ($ = k.model));
        }),
          g.push({
            vendor: Y.startsWith(w) && b === "" ? x : b,
            model: Y.startsWith(w) && $ === "" ? S : $,
            deviceName: H,
            main: Q.toLowerCase() === "true",
            builtin: N === "2147483648",
            connection: N && Yr[N] ? Yr[N] : "",
            resolutionX: B.toInt(B.getValue(X, "Width", ":")),
            resolutionY: B.toInt(B.getValue(X, "Height", ":")),
            sizeX: ee ? parseInt(ee, 10) : null,
            sizeY: F ? parseInt(F, 10) : null,
            pixelDepth: O,
            currentResX: B.toInt(B.getValue(X, "Width", ":")),
            currentResY: B.toInt(B.getValue(X, "Height", ":")),
            positionX: B.toInt(B.getValue(X, "X", ":")),
            positionY: B.toInt(B.getValue(X, "Y", ":")),
          }));
      }
    return (
      p.length === 0 &&
        g.push({
          vendor: x,
          model: S,
          main: !0,
          sizeX: null,
          sizeY: null,
          resolutionX: C,
          resolutionY: W,
          pixelDepth: null,
          currentResX: C,
          currentResY: W,
          positionX: 0,
          positionY: 0,
        }),
      g
    );
  }
}
lo.graphics = Kl;
var jt = {};
const _ = V,
  Qr = Ae,
  Se = se.exec,
  lt = se.execSync,
  Xl = _.promisifySave(se.exec);
let yt = process.platform;
const Ve = yt === "linux" || yt === "android",
  pt = yt === "darwin",
  xn = yt === "win32",
  Ne = yt === "freebsd",
  Be = yt === "openbsd",
  ke = yt === "netbsd",
  Sn = yt === "sunos";
let re = {},
  U = {};
function ql(t, n) {
  _.isFunction(t) && ((n = t), (t = ""));
  let e = [],
    i = [];
  function s(c) {
    if (!c.startsWith("/")) return "NFS";
    const u = c.split("/"),
      l = u[u.length - 1],
      f = e.filter((p) => p.indexOf(l) >= 0);
    return f.length === 1 && f[0].indexOf("APFS") >= 0 ? "APFS" : "HFS";
  }
  function r(c) {
    const u = [
      "rootfs",
      "unionfs",
      "squashfs",
      "cramfs",
      "initrd",
      "initramfs",
      "devtmpfs",
      "tmpfs",
      "udev",
      "devfs",
      "specfs",
      "type",
      "appimaged",
    ];
    let l = !1;
    return (
      u.forEach((f) => {
        c.toLowerCase().indexOf(f) >= 0 && (l = !0);
      }),
      l
    );
  }
  function o(c) {
    let u = c.toString().split(`
`);
    if ((u.shift(), c.toString().toLowerCase().indexOf("filesystem"))) {
      let l = 0;
      for (let f = 0; f < u.length; f++)
        u[f] && u[f].toLowerCase().startsWith("filesystem") && (l = f);
      for (let f = 0; f < l; f++) u.shift();
    }
    return u;
  }
  function a(c) {
    let u = [];
    return (
      c.forEach(function (l) {
        if (
          l !== "" &&
          ((l = l.replace(/ +/g, " ").split(" ")),
          l &&
            (l[0].startsWith("/") ||
              (l[6] && l[6] === "/") ||
              l[0].indexOf("/") > 0 ||
              l[0].indexOf(":") === 1 ||
              (!pt && !r(l[1]))))
        ) {
          const f = l[0],
            p = Ve || Ne || Be || ke ? l[1] : s(l[0]),
            d = parseInt(Ve || Ne || Be || ke ? l[2] : l[1]) * 1024,
            m = parseInt(Ve || Ne || Be || ke ? l[3] : l[2]) * 1024,
            h = parseInt(Ve || Ne || Be || ke ? l[4] : l[3]) * 1024,
            y = parseFloat((100 * (m / (m + h))).toFixed(2));
          let g = i && Object.keys(i).length > 0 ? i[f] || !1 : null;
          l.splice(0, Ve || Ne || Be || ke ? 6 : 5);
          const x = l.join(" ");
          u.find((S) => S.fs === f && S.type === p) ||
            u.push({
              fs: f,
              type: p,
              size: d,
              used: m,
              available: h,
              use: y,
              mount: x,
              rw: g,
            });
        }
      }),
      u
    );
  }
  return new Promise((c) => {
    process.nextTick(() => {
      let u = [];
      if (Ve || Ne || Be || ke || pt) {
        let l = "";
        if (((e = []), (i = {}), pt)) {
          l = "df -kP";
          try {
            ((e = lt("diskutil list")
              .toString()
              .split(
                `
`,
              )
              .filter((f) => !f.startsWith("/") && f.indexOf(":") > 0)),
              lt("mount")
                .toString()
                .split(
                  `
`,
                )
                .filter((f) => f.startsWith("/"))
                .forEach((f) => {
                  i[f.split(" ")[0]] =
                    f.toLowerCase().indexOf("read-only") === -1;
                }));
          } catch {
            _.noop();
          }
        }
        if (Ve)
          try {
            ((l = "export LC_ALL=C; df -lkPTx squashfs; unset LC_ALL"),
              lt("cat /proc/mounts 2>/dev/null", _.execOptsLinux)
                .toString()
                .split(
                  `
`,
                )
                .filter((f) => f.startsWith("/"))
                .forEach((f) => {
                  ((i[f.split(" ")[0]] = i[f.split(" ")[0]] || !1),
                    f.toLowerCase().indexOf("/snap/") === -1 &&
                      (i[f.split(" ")[0]] =
                        f.toLowerCase().indexOf("rw,") >= 0 ||
                        f.toLowerCase().indexOf(" rw ") >= 0));
                }));
          } catch {
            _.noop();
          }
        if (Ne || Be || ke)
          try {
            ((l = "df -lkPT"),
              lt("mount")
                .toString()
                .split(
                  `
`,
                )
                .forEach((f) => {
                  i[f.split(" ")[0]] =
                    f.toLowerCase().indexOf("read-only") === -1;
                }));
          } catch {
            _.noop();
          }
        Se(l, { maxBuffer: 1024 * 1024 }, function (f, p) {
          let d = o(p);
          ((u = a(d)),
            t &&
              (u = u.filter(
                (m) =>
                  m.fs.toLowerCase().indexOf(t.toLowerCase()) >= 0 ||
                  m.mount.toLowerCase().indexOf(t.toLowerCase()) >= 0,
              )),
            (!f || u.length) && p.toString().trim() !== ""
              ? (n && n(u), c(u))
              : Se("df -kPT", { maxBuffer: 1024 * 1024 }, function (m, h) {
                  if (!m) {
                    let y = o(h);
                    u = a(y);
                  }
                  (n && n(u), c(u));
                }));
        });
      }
      if ((Sn && (n && n(u), c(u)), xn))
        try {
          const l = `Get-WmiObject Win32_logicaldisk | select Access,Caption,FileSystem,FreeSpace,Size ${t ? "| where -property Caption -eq " + t : ""} | fl`;
          _.powerShell(l).then((f, p) => {
            (p ||
              f
                .toString()
                .split(/\n\s*\n/)
                .forEach(function (m) {
                  let h = m.split(`\r
`);
                  const y = _.toInt(_.getValue(h, "size", ":")),
                    g = _.toInt(_.getValue(h, "freespace", ":")),
                    x = _.getValue(h, "caption", ":"),
                    S = _.getValue(h, "access", ":"),
                    w = S ? _.toInt(S) !== 1 : null;
                  y &&
                    u.push({
                      fs: x,
                      type: _.getValue(h, "filesystem", ":"),
                      size: y,
                      used: y - g,
                      available: g,
                      use: parseFloat(((100 * (y - g)) / y).toFixed(2)),
                      mount: x,
                      rw: w,
                    });
                }),
              n && n(u),
              c(u));
          });
        } catch {
          (n && n(u), c(u));
        }
    });
  });
}
jt.fsSize = ql;
function Yl(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      const e = {
        max: null,
        allocated: null,
        available: null,
      };
      ((Ne || Be || ke || pt) &&
        Se(
          "sysctl -i kern.maxfiles kern.num_files kern.open_files",
          { maxBuffer: 1024 * 1024 },
          function (s, r) {
            if (!s) {
              let o = r.toString().split(`
`);
              ((e.max = parseInt(_.getValue(o, "kern.maxfiles", ":"), 10)),
                (e.allocated =
                  parseInt(_.getValue(o, "kern.num_files", ":"), 10) ||
                  parseInt(_.getValue(o, "kern.open_files", ":"), 10)),
                (e.available = e.max - e.allocated));
            }
            (t && t(e), n(e));
          },
        ),
        Ve &&
          Qr.readFile("/proc/sys/fs/file-nr", function (i, s) {
            if (i)
              Qr.readFile("/proc/sys/fs/file-max", function (r, o) {
                if (!r) {
                  let a = o.toString().split(`
`);
                  a[0] && (e.max = parseInt(a[0], 10));
                }
                (t && t(e), n(e));
              });
            else {
              let r = s.toString().split(`
`);
              if (r[0]) {
                const o = r[0].replace(/\s+/g, " ").split(" ");
                o.length === 3 &&
                  ((e.allocated = parseInt(o[0], 10)),
                  (e.available = parseInt(o[1], 10)),
                  (e.max = parseInt(o[2], 10)),
                  e.available || (e.available = e.max - e.allocated));
              }
              (t && t(e), n(e));
            }
          }),
        Sn && (t && t(null), n(null)),
        xn && (t && t(null), n(null)));
    });
  });
}
jt.fsOpenFiles = Yl;
function Jl(t) {
  return parseInt(t.substr(t.indexOf(" (") + 2, t.indexOf(" Bytes)") - 10));
}
function Ql(t) {
  let n = [],
    e = 0;
  return (
    t.forEach((i) => {
      if (i.length > 0)
        if (i[0] === "*") e++;
        else {
          let s = i.split(":");
          s.length > 1 &&
            (n[e] ||
              (n[e] = {
                name: "",
                identifier: "",
                type: "disk",
                fsType: "",
                mount: "",
                size: 0,
                physical: "HDD",
                uuid: "",
                label: "",
                model: "",
                serial: "",
                removable: !1,
                protocol: "",
                group: "",
                device: "",
              }),
            (s[0] = s[0].trim().toUpperCase().replace(/ +/g, "")),
            (s[1] = s[1].trim()),
            s[0] === "DEVICEIDENTIFIER" && (n[e].identifier = s[1]),
            s[0] === "DEVICENODE" && (n[e].name = s[1]),
            s[0] === "VOLUMENAME" &&
              s[1].indexOf("Not applicable") === -1 &&
              (n[e].label = s[1]),
            s[0] === "PROTOCOL" && (n[e].protocol = s[1]),
            s[0] === "DISKSIZE" && (n[e].size = Jl(s[1])),
            s[0] === "FILESYSTEMPERSONALITY" && (n[e].fsType = s[1]),
            s[0] === "MOUNTPOINT" && (n[e].mount = s[1]),
            s[0] === "VOLUMEUUID" && (n[e].uuid = s[1]),
            s[0] === "READ-ONLYMEDIA" &&
              s[1] === "Yes" &&
              (n[e].physical = "CD/DVD"),
            s[0] === "SOLIDSTATE" && s[1] === "Yes" && (n[e].physical = "SSD"),
            s[0] === "VIRTUAL" && (n[e].type = "virtual"),
            s[0] === "REMOVABLEMEDIA" &&
              (n[e].removable = s[1] === "Removable"),
            s[0] === "PARTITIONTYPE" && (n[e].type = "part"),
            s[0] === "DEVICE/MEDIANAME" && (n[e].model = s[1]));
        }
    }),
    n
  );
}
function ar(t) {
  let n = [];
  return (
    t
      .filter((e) => e !== "")
      .forEach((e) => {
        try {
          ((e = decodeURIComponent(e.replace(/\\x/g, "%"))),
            (e = e.replace(/\\/g, "\\\\")));
          let i = JSON.parse(e);
          n.push({
            name: i.name,
            type: i.type,
            fsType: i.fsType,
            mount: i.mountpoint,
            size: parseInt(i.size),
            physical:
              i.type === "disk"
                ? i.rota === "0"
                  ? "SSD"
                  : "HDD"
                : i.type === "rom"
                  ? "CD/DVD"
                  : "",
            uuid: i.uuid,
            label: i.label,
            model: (i.model || "").trim(),
            serial: i.serial,
            removable: i.rm === "1",
            protocol: i.tran,
            group: i.group || "",
          });
        } catch {
          _.noop();
        }
      }),
    (n = _.unique(n)),
    (n = _.sortByKey(n, ["type", "name"])),
    n
  );
}
function Zl(t) {
  const n = _.getValue(t, "md_level", "="),
    e = _.getValue(t, "md_name", "="),
    i = _.getValue(t, "md_uuid", "="),
    s = [];
  return (
    t.forEach((r) => {
      r.toLowerCase().startsWith("md_device_dev") &&
        r.toLowerCase().indexOf("/dev/") > 0 &&
        s.push(r.split("/dev/")[1]);
    }),
    {
      raid: n,
      label: e,
      uuid: i,
      members: s,
    }
  );
}
function Zr(t) {
  let n = t;
  try {
    t.forEach((e) => {
      if (e.type.startsWith("raid")) {
        const i = lt(
            `mdadm --export --detail /dev/${e.name}`,
            _.execOptsLinux,
          ).toString().split(`
`),
          s = Zl(i);
        ((e.label = s.label),
          (e.uuid = s.uuid),
          s.members &&
            s.members.length &&
            s.raid === e.type &&
            (n = n.map(
              (r) => (
                r.fsType === "linux_raid_member" &&
                  s.members.indexOf(r.name) >= 0 &&
                  (r.group = e.name),
                r
              ),
            )));
      }
    });
  } catch {
    _.noop();
  }
  return n;
}
function ec(t) {
  const n = [];
  return (
    t.forEach((e) => {
      e.type.startsWith("disk") && n.push(e.name);
    }),
    n
  );
}
function tc(t) {
  let n = t;
  try {
    const e = ec(t);
    n = n.map(
      (i) => (
        (i.type.startsWith("part") || i.type.startsWith("disk")) &&
          e.forEach((s) => {
            i.name.startsWith(s) && (i.device = "/dev/" + s);
          }),
        i
      ),
    );
  } catch {
    _.noop();
  }
  return n;
}
function nc(t) {
  const n = [];
  return (
    t.forEach((e) => {
      if (
        (e.type.startsWith("disk") &&
          n.push({ name: e.name, model: e.model, device: e.name }),
        e.type.startsWith("virtual"))
      ) {
        let i = "";
        (n.forEach((s) => {
          s.model === e.model && (i = s.device);
        }),
          i && n.push({ name: e.name, model: e.model, device: i }));
      }
    }),
    n
  );
}
function ic(t) {
  let n = t;
  try {
    const e = nc(t);
    n = n.map(
      (i) => (
        (i.type.startsWith("part") ||
          i.type.startsWith("disk") ||
          i.type.startsWith("virtual")) &&
          e.forEach((s) => {
            i.name.startsWith(s.name) && (i.device = s.device);
          }),
        i
      ),
    );
  } catch {
    _.noop();
  }
  return n;
}
function rc(t) {
  const n = [];
  return (
    t.forEach((e) => {
      const i = e.split(`\r
`),
        s = _.getValue(i, "DeviceID", ":");
      let r = e.split("@{DeviceID=");
      r.length > 1 &&
        ((r = r.slice(1)),
        r.forEach((o) => {
          n.push({ name: o.split(";")[0].toUpperCase(), device: s });
        }));
    }),
    n
  );
}
function sc(t, n) {
  const e = rc(n);
  return (
    t.map((i) => {
      const s = e.filter((r) => r.name === i.name.toUpperCase());
      return (s.length > 0 && (i.device = s[0].device), i);
    }),
    t
  );
}
function lr(t) {
  return t
    .toString()
    .replace(/NAME=/g, '{"name":')
    .replace(/FSTYPE=/g, ',"fsType":')
    .replace(/TYPE=/g, ',"type":')
    .replace(/SIZE=/g, ',"size":')
    .replace(/MOUNTPOINT=/g, ',"mountpoint":')
    .replace(/UUID=/g, ',"uuid":')
    .replace(/ROTA=/g, ',"rota":')
    .replace(/RO=/g, ',"ro":')
    .replace(/RM=/g, ',"rm":')
    .replace(/TRAN=/g, ',"tran":')
    .replace(/SERIAL=/g, ',"serial":')
    .replace(/LABEL=/g, ',"label":')
    .replace(/MODEL=/g, ',"model":')
    .replace(/OWNER=/g, ',"owner":')
    .replace(/GROUP=/g, ',"group":')
    .replace(
      /\n/g,
      `}
`,
    );
}
function oc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (
        (Ve &&
          Se(
            "lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,TRAN,SERIAL,LABEL,MODEL,OWNER 2>/dev/null",
            { maxBuffer: 1048576 },
            function (s, r) {
              if (s)
                Se(
                  "lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,LABEL,MODEL,OWNER 2>/dev/null",
                  { maxBuffer: 1048576 },
                  function (a, c) {
                    if (!a) {
                      let u = lr(c).split(`
`);
                      ((e = ar(u)), (e = Zr(e)));
                    }
                    (t && t(e), n(e));
                  },
                ).on("error", function () {
                  (t && t(e), n(e));
                });
              else {
                let o = lr(r).split(`
`);
                ((e = ar(o)), (e = Zr(e)), (e = tc(e)), t && t(e), n(e));
              }
            },
          ).on("error", function () {
            (t && t(e), n(e));
          }),
        pt &&
          Se("diskutil info -all", { maxBuffer: 1048576 }, function (s, r) {
            if (!s) {
              let o = r.toString().split(`
`);
              ((e = Ql(o)), (e = ic(e)));
            }
            (t && t(e), n(e));
          }).on("error", function () {
            (t && t(e), n(e));
          }),
        Sn && (t && t(e), n(e)),
        xn)
      ) {
        let i = [
          "Unknown",
          "NoRoot",
          "Removable",
          "Local",
          "Network",
          "CD/DVD",
          "RAM",
        ];
        try {
          const s = [];
          (s.push(
            _.powerShell(
              "Get-CimInstance -ClassName Win32_LogicalDisk | select Caption,DriveType,Name,FileSystem,Size,VolumeSerialNumber,VolumeName | fl",
            ),
          ),
            s.push(
              _.powerShell(
                "Get-WmiObject -Class Win32_diskdrive | Select-Object -Property PNPDeviceId,DeviceID, Model, Size, @{L='Partitions'; E={$_.GetRelated('Win32_DiskPartition').GetRelated('Win32_LogicalDisk') | Select-Object -Property DeviceID, VolumeName, Size, FreeSpace}} | fl",
              ),
            ),
            _.promiseAll(s).then((r) => {
              let o = r.results[0].toString().split(/\n\s*\n/),
                a = r.results[1].toString().split(/\n\s*\n/);
              (o.forEach(function (c) {
                let u = c.split(`\r
`),
                  l = _.getValue(u, "drivetype", ":");
                l &&
                  e.push({
                    name: _.getValue(u, "name", ":"),
                    identifier: _.getValue(u, "caption", ":"),
                    type: "disk",
                    fsType: _.getValue(u, "filesystem", ":").toLowerCase(),
                    mount: _.getValue(u, "caption", ":"),
                    size: _.getValue(u, "size", ":"),
                    physical: l >= 0 && l <= 6 ? i[l] : i[0],
                    uuid: _.getValue(u, "volumeserialnumber", ":"),
                    label: _.getValue(u, "volumename", ":"),
                    model: "",
                    serial: _.getValue(u, "volumeserialnumber", ":"),
                    removable: l === "2",
                    protocol: "",
                    group: "",
                    device: "",
                  });
              }),
                (e = sc(e, a)),
                t && t(e),
                n(e));
            }));
        } catch {
          (t && t(e), n(e));
        }
      }
      (Ne || Be || ke) && (t && t(null), n(null));
    });
  });
}
jt.blockDevices = oc;
function es(t, n) {
  let e = {
    rx: 0,
    wx: 0,
    tx: 0,
    rx_sec: null,
    wx_sec: null,
    tx_sec: null,
    ms: 0,
  };
  return (
    re && re.ms
      ? ((e.rx = t),
        (e.wx = n),
        (e.tx = e.rx + e.wx),
        (e.ms = Date.now() - re.ms),
        (e.rx_sec = (e.rx - re.bytes_read) / (e.ms / 1e3)),
        (e.wx_sec = (e.wx - re.bytes_write) / (e.ms / 1e3)),
        (e.tx_sec = e.rx_sec + e.wx_sec),
        (re.rx_sec = e.rx_sec),
        (re.wx_sec = e.wx_sec),
        (re.tx_sec = e.tx_sec),
        (re.bytes_read = e.rx),
        (re.bytes_write = e.wx),
        (re.bytes_overall = e.rx + e.wx),
        (re.ms = Date.now()),
        (re.last_ms = e.ms))
      : ((e.rx = t),
        (e.wx = n),
        (e.tx = e.rx + e.wx),
        (re.rx_sec = null),
        (re.wx_sec = null),
        (re.tx_sec = null),
        (re.bytes_read = e.rx),
        (re.bytes_write = e.wx),
        (re.bytes_overall = e.rx + e.wx),
        (re.ms = Date.now()),
        (re.last_ms = 0)),
    e
  );
}
function ac(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      if (xn || Ne || Be || ke || Sn) return n(null);
      let e = {
          rx: 0,
          wx: 0,
          tx: 0,
          rx_sec: null,
          wx_sec: null,
          tx_sec: null,
          ms: 0,
        },
        i = 0,
        s = 0;
      (re && !re.ms) || (re && re.ms && Date.now() - re.ms >= 500)
        ? (Ve &&
            Se(
              "lsblk -r 2>/dev/null | grep /",
              { maxBuffer: 1048576 },
              function (o, a) {
                if (o) (t && t(e), n(e));
                else {
                  let c = a.toString().split(`
`),
                    u = [];
                  c.forEach(function (p) {
                    p !== "" &&
                      ((p = p.trim().split(" ")),
                      u.indexOf(p[0]) === -1 && u.push(p[0]));
                  });
                  let l = u.join("|");
                  Se(
                    'cat /proc/diskstats | egrep "' + l + '"',
                    { maxBuffer: 1024 * 1024 },
                    function (p, d) {
                      (p ||
                        (d
                          .toString()
                          .split(
                            `
`,
                          )
                          .forEach(function (h) {
                            ((h = h.trim()),
                              h !== "" &&
                                ((h = h.replace(/ +/g, " ").split(" ")),
                                (i += parseInt(h[5]) * 512),
                                (s += parseInt(h[9]) * 512)));
                          }),
                        (e = es(i, s))),
                        t && t(e),
                        n(e));
                    },
                  ).on("error", function () {
                    (t && t(e), n(e));
                  });
                }
              },
            ).on("error", function () {
              (t && t(e), n(e));
            }),
          pt &&
            Se(
              `ioreg -c IOBlockStorageDriver -k Statistics -r -w0 | sed -n "/IOBlockStorageDriver/,/Statistics/p" | grep "Statistics" | tr -cd "01234567890,
"`,
              { maxBuffer: 1048576 },
              function (o, a) {
                (o ||
                  (a
                    .toString()
                    .split(
                      `
`,
                    )
                    .forEach(function (u) {
                      ((u = u.trim()),
                        u !== "" &&
                          ((u = u.split(",")),
                          (i += parseInt(u[2])),
                          (s += parseInt(u[9]))));
                    }),
                  (e = es(i, s))),
                  t && t(e),
                  n(e));
              },
            ).on("error", function () {
              (t && t(e), n(e));
            }))
        : ((e.ms = re.last_ms),
          (e.rx = re.bytes_read),
          (e.wx = re.bytes_write),
          (e.tx = re.bytes_read + re.bytes_write),
          (e.rx_sec = re.rx_sec),
          (e.wx_sec = re.wx_sec),
          (e.tx_sec = re.tx_sec),
          t && t(e),
          n(e));
    });
  });
}
jt.fsStats = ac;
function ts(t, n, e, i, s) {
  let r = {
    rIO: 0,
    wIO: 0,
    tIO: 0,
    rIO_sec: null,
    wIO_sec: null,
    tIO_sec: null,
    rWaitTime: 0,
    wWaitTime: 0,
    tWaitTime: 0,
    rWaitPercent: null,
    wWaitPercent: null,
    tWaitPercent: null,
    ms: 0,
  };
  return (
    U && U.ms
      ? ((r.rIO = t),
        (r.wIO = n),
        (r.tIO = t + n),
        (r.ms = Date.now() - U.ms),
        (r.rIO_sec = (r.rIO - U.rIO) / (r.ms / 1e3)),
        (r.wIO_sec = (r.wIO - U.wIO) / (r.ms / 1e3)),
        (r.tIO_sec = r.rIO_sec + r.wIO_sec),
        (r.rWaitTime = e),
        (r.wWaitTime = i),
        (r.tWaitTime = s),
        (r.rWaitPercent = ((r.rWaitTime - U.rWaitTime) * 100) / r.ms),
        (r.wWaitPercent = ((r.wWaitTime - U.wWaitTime) * 100) / r.ms),
        (r.tWaitPercent = ((r.tWaitTime - U.tWaitTime) * 100) / r.ms),
        (U.rIO = t),
        (U.wIO = n),
        (U.rIO_sec = r.rIO_sec),
        (U.wIO_sec = r.wIO_sec),
        (U.tIO_sec = r.tIO_sec),
        (U.rWaitTime = e),
        (U.wWaitTime = i),
        (U.tWaitTime = s),
        (U.rWaitPercent = r.rWaitPercent),
        (U.wWaitPercent = r.wWaitPercent),
        (U.tWaitPercent = r.tWaitPercent),
        (U.last_ms = r.ms),
        (U.ms = Date.now()))
      : ((r.rIO = t),
        (r.wIO = n),
        (r.tIO = t + n),
        (r.rWaitTime = e),
        (r.wWaitTime = i),
        (r.tWaitTime = s),
        (U.rIO = t),
        (U.wIO = n),
        (U.rIO_sec = null),
        (U.wIO_sec = null),
        (U.tIO_sec = null),
        (U.rWaitTime = e),
        (U.wWaitTime = i),
        (U.tWaitTime = s),
        (U.rWaitPercent = null),
        (U.wWaitPercent = null),
        (U.tWaitPercent = null),
        (U.last_ms = 0),
        (U.ms = Date.now())),
    r
  );
}
function lc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      if (xn || Sn) return n(null);
      let e = {
          rIO: 0,
          wIO: 0,
          tIO: 0,
          rIO_sec: null,
          wIO_sec: null,
          tIO_sec: null,
          rWaitTime: 0,
          wWaitTime: 0,
          tWaitTime: 0,
          rWaitPercent: null,
          wWaitPercent: null,
          tWaitPercent: null,
          ms: 0,
        },
        i = 0,
        s = 0,
        r = 0,
        o = 0,
        a = 0;
      (U && !U.ms) || (U && U.ms && Date.now() - U.ms >= 500)
        ? ((Ve || Ne || Be || ke) &&
            Se(
              'for mount in `lsblk 2>/dev/null | grep " disk " | sed "s/[│└─├]//g" | awk \'{$1=$1};1\' | cut -d " " -f 1 | sort -u`; do cat /sys/block/$mount/stat | sed -r "s/ +/;/g" | sed -r "s/^;//"; done',
              { maxBuffer: 1024 * 1024 },
              function (u, l) {
                u
                  ? (t && t(e), n(e))
                  : (l
                      .split(
                        `
`,
                      )
                      .forEach(function (p) {
                        if (!p) return;
                        let d = p.split(";");
                        ((i += parseInt(d[0])),
                          (s += parseInt(d[4])),
                          (r += parseInt(d[3])),
                          (o += parseInt(d[7])),
                          (a += parseInt(d[10])));
                      }),
                    (e = ts(i, s, r, o, a)),
                    t && t(e),
                    n(e));
              },
            ),
          pt &&
            Se(
              `ioreg -c IOBlockStorageDriver -k Statistics -r -w0 | sed -n "/IOBlockStorageDriver/,/Statistics/p" | grep "Statistics" | tr -cd "01234567890,
"`,
              { maxBuffer: 1024 * 1024 },
              function (c, u) {
                (c ||
                  (u
                    .toString()
                    .split(
                      `
`,
                    )
                    .forEach(function (f) {
                      ((f = f.trim()),
                        f !== "" &&
                          ((f = f.split(",")),
                          (i += parseInt(f[10])),
                          (s += parseInt(f[0]))));
                    }),
                  (e = ts(i, s, r, o, a))),
                  t && t(e),
                  n(e));
              },
            ))
        : ((e.rIO = U.rIO),
          (e.wIO = U.wIO),
          (e.tIO = U.rIO + U.wIO),
          (e.ms = U.last_ms),
          (e.rIO_sec = U.rIO_sec),
          (e.wIO_sec = U.wIO_sec),
          (e.tIO_sec = U.tIO_sec),
          (e.rWaitTime = U.rWaitTime),
          (e.wWaitTime = U.wWaitTime),
          (e.tWaitTime = U.tWaitTime),
          (e.rWaitPercent = U.rWaitPercent),
          (e.wWaitPercent = U.wWaitPercent),
          (e.tWaitPercent = U.tWaitPercent),
          t && t(e),
          n(e));
    });
  });
}
jt.disksIO = lc;
function cc(t) {
  function n(e) {
    const i = [
      { pattern: "WESTERN.*", manufacturer: "Western Digital" },
      { pattern: "^WDC.*", manufacturer: "Western Digital" },
      { pattern: "WD.*", manufacturer: "Western Digital" },
      { pattern: "TOSHIBA.*", manufacturer: "Toshiba" },
      { pattern: "HITACHI.*", manufacturer: "Hitachi" },
      { pattern: "^IC.*", manufacturer: "Hitachi" },
      { pattern: "^HTS.*", manufacturer: "Hitachi" },
      { pattern: "SANDISK.*", manufacturer: "SanDisk" },
      { pattern: "KINGSTON.*", manufacturer: "Kingston Technology" },
      { pattern: "^SONY.*", manufacturer: "Sony" },
      { pattern: "TRANSCEND.*", manufacturer: "Transcend" },
      { pattern: "SAMSUNG.*", manufacturer: "Samsung" },
      { pattern: "^ST(?!I\\ ).*", manufacturer: "Seagate" },
      { pattern: "^STI\\ .*", manufacturer: "SimpleTech" },
      { pattern: "^D...-.*", manufacturer: "IBM" },
      { pattern: "^IBM.*", manufacturer: "IBM" },
      { pattern: "^FUJITSU.*", manufacturer: "Fujitsu" },
      { pattern: "^MP.*", manufacturer: "Fujitsu" },
      { pattern: "^MK.*", manufacturer: "Toshiba" },
      { pattern: "MAXTO.*", manufacturer: "Maxtor" },
      { pattern: "PIONEER.*", manufacturer: "Pioneer" },
      { pattern: "PHILIPS.*", manufacturer: "Philips" },
      { pattern: "QUANTUM.*", manufacturer: "Quantum Technology" },
      { pattern: "FIREBALL.*", manufacturer: "Quantum Technology" },
      { pattern: "^VBOX.*", manufacturer: "VirtualBox" },
      { pattern: "CORSAIR.*", manufacturer: "Corsair Components" },
      { pattern: "CRUCIAL.*", manufacturer: "Crucial" },
      { pattern: "ECM.*", manufacturer: "ECM" },
      { pattern: "INTEL.*", manufacturer: "INTEL" },
      { pattern: "EVO.*", manufacturer: "Samsung" },
      { pattern: "APPLE.*", manufacturer: "Apple" },
    ];
    let s = "";
    return (
      e &&
        ((e = e.toUpperCase()),
        i.forEach((r) => {
          RegExp(r.pattern).test(e) && (s = r.manufacturer);
        })),
      s
    );
  }
  return new Promise((e) => {
    process.nextTick(() => {
      const i = (o) => {
        for (let a = 0; a < o.length; a++) delete o[a].BSDName;
        (t && t(o), e(o));
      };
      let s = [],
        r = "";
      if (Ve) {
        let o = "";
        Se(
          "export LC_ALL=C; lsblk -ablJO 2>/dev/null; unset LC_ALL",
          { maxBuffer: 1024 * 1024 },
          function (a, c) {
            if (!a)
              try {
                const u = c.toString().trim();
                let l = [];
                try {
                  const f = JSON.parse(u);
                  f &&
                    {}.hasOwnProperty.call(f, "blockdevices") &&
                    (l = f.blockdevices.filter(
                      (p) =>
                        p.type === "disk" &&
                        p.size > 0 &&
                        (p.model !== null ||
                          (p.mountpoint === null &&
                            p.label === null &&
                            p.fstype === null &&
                            p.parttype === null &&
                            p.path &&
                            p.path.indexOf("/ram") !== 0 &&
                            p.path.indexOf("/loop") !== 0 &&
                            p["disc-max"] &&
                            p["disc-max"] !== 0)),
                    ));
                } catch {
                  try {
                    const p = lt(
                      "export LC_ALL=C; lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,LABEL,MODEL,OWNER,GROUP 2>/dev/null; unset LC_ALL",
                      _.execOptsLinux,
                    ).toString();
                    let d = lr(p).split(`
`);
                    l = ar(d).filter(
                      (h) =>
                        h.type === "disk" &&
                        h.size > 0 &&
                        ((h.model !== null && h.model !== "") ||
                          (h.mount === "" &&
                            h.label === "" &&
                            h.fsType === "")),
                    );
                  } catch {
                    _.noop();
                  }
                }
                l.forEach((f) => {
                  let p = "";
                  const d = "/dev/" + f.name,
                    m = f.name;
                  try {
                    p = lt(
                      "cat /sys/block/" + m + "/queue/rotational 2>/dev/null",
                      _.execOptsLinux,
                    ).toString().split(`
`)[0];
                  } catch {
                    _.noop();
                  }
                  let h = f.tran ? f.tran.toUpperCase().trim() : "";
                  (h === "NVME" && ((p = "2"), (h = "PCIe")),
                    s.push({
                      device: d,
                      type:
                        p === "0"
                          ? "SSD"
                          : p === "1"
                            ? "HD"
                            : p === "2"
                              ? "NVMe"
                              : f.model && f.model.indexOf("SSD") > -1
                                ? "SSD"
                                : f.model && f.model.indexOf("NVM") > -1
                                  ? "NVMe"
                                  : "HD",
                      name: f.model || "",
                      vendor: n(f.model) || (f.vendor ? f.vendor.trim() : ""),
                      size: f.size || 0,
                      bytesPerSector: null,
                      totalCylinders: null,
                      totalHeads: null,
                      totalSectors: null,
                      totalTracks: null,
                      tracksPerCylinder: null,
                      sectorsPerTrack: null,
                      firmwareRevision: f.rev ? f.rev.trim() : "",
                      serialNum: f.serial ? f.serial.trim() : "",
                      interfaceType: h,
                      smartStatus: "unknown",
                      temperature: null,
                      BSDName: d,
                    }),
                    (r += `printf "
${d}|"; smartctl -H ${d} | grep overall;`),
                    (o += `${o ? 'printf ",";' : ""}smartctl -a -j ${d};`));
                });
              } catch {
                _.noop();
              }
            o
              ? Se(o, { maxBuffer: 1024 * 1024 }, function (u, l) {
                  try {
                    (JSON.parse(`[${l}]`).forEach((p) => {
                      const d = p.smartctl.argv[p.smartctl.argv.length - 1];
                      for (let m = 0; m < s.length; m++)
                        s[m].BSDName === d &&
                          ((s[m].smartStatus = p.smart_status.passed
                            ? "Ok"
                            : p.smart_status.passed === !1
                              ? "Predicted Failure"
                              : "unknown"),
                          p.temperature &&
                            p.temperature.current &&
                            (s[m].temperature = p.temperature.current),
                          (s[m].smartData = p));
                    }),
                      i(s));
                  } catch {
                    r
                      ? ((r =
                          r +
                          `printf "
"`),
                        Se(r, { maxBuffer: 1024 * 1024 }, function (p, d) {
                          (d
                            .toString()
                            .split(
                              `
`,
                            )
                            .forEach((h) => {
                              if (h) {
                                let y = h.split("|");
                                if (y.length === 2) {
                                  let g = y[0];
                                  y[1] = y[1].trim();
                                  let x = y[1].split(":");
                                  if (x.length === 2) {
                                    x[1] = x[1].trim();
                                    let S = x[1].toLowerCase();
                                    for (let w = 0; w < s.length; w++)
                                      s[w].BSDName === g &&
                                        (s[w].smartStatus =
                                          S === "passed"
                                            ? "Ok"
                                            : S === "failed!"
                                              ? "Predicted Failure"
                                              : "unknown");
                                  }
                                }
                              }
                            }),
                            i(s));
                        }))
                      : i(s);
                  }
                })
              : i(s);
          },
        );
      }
      if (
        ((Ne || Be || ke) && (t && t(s), e(s)),
        Sn && (t && t(s), e(s)),
        pt &&
          Se(
            "system_profiler SPSerialATADataType SPNVMeDataType SPUSBDataType",
            { maxBuffer: 1024 * 1024 },
            function (o, a) {
              if (!o) {
                let c = a.toString().split(`
`),
                  u = [],
                  l = [],
                  f = [],
                  p = "SATA";
                c.forEach((d) => {
                  d === "NVMExpress:"
                    ? (p = "NVMe")
                    : d === "USB:"
                      ? (p = "USB")
                      : d === "SATA/SATA Express:"
                        ? (p = "SATA")
                        : p === "SATA"
                          ? u.push(d)
                          : p === "NVMe"
                            ? l.push(d)
                            : p === "USB" && f.push(d);
                });
                try {
                  let d = u
                    .join(
                      `
`,
                    )
                    .split(" Physical Interconnect: ");
                  (d.shift(),
                    d.forEach(function (m) {
                      m = "InterfaceType: " + m;
                      let h = m.split(`
`);
                      const y = _.getValue(h, "Medium Type", ":", !0).trim(),
                        g = _.getValue(h, "capacity", ":", !0).trim(),
                        x = _.getValue(h, "BSD Name", ":", !0).trim();
                      if (g) {
                        let S = 0;
                        if (
                          (g.indexOf("(") >= 0 &&
                            (S = parseInt(
                              g
                                .match(/\(([^)]+)\)/)[1]
                                .replace(/\./g, "")
                                .replace(/,/g, "")
                                .replace(/\s/g, ""),
                            )),
                          S || (S = parseInt(g)),
                          S)
                        ) {
                          const w = _.getValue(h, "S.M.A.R.T. status", ":", !0)
                            .trim()
                            .toLowerCase();
                          (s.push({
                            device: x,
                            type: y.startsWith("Solid") ? "SSD" : "HD",
                            name: _.getValue(h, "Model", ":", !0).trim(),
                            vendor:
                              n(_.getValue(h, "Model", ":", !0).trim()) ||
                              _.getValue(h, "Manufacturer", ":", !0),
                            size: S,
                            bytesPerSector: null,
                            totalCylinders: null,
                            totalHeads: null,
                            totalSectors: null,
                            totalTracks: null,
                            tracksPerCylinder: null,
                            sectorsPerTrack: null,
                            firmwareRevision: _.getValue(
                              h,
                              "Revision",
                              ":",
                              !0,
                            ).trim(),
                            serialNum: _.getValue(
                              h,
                              "Serial Number",
                              ":",
                              !0,
                            ).trim(),
                            interfaceType: _.getValue(
                              h,
                              "InterfaceType",
                              ":",
                              !0,
                            ).trim(),
                            smartStatus:
                              w === "verified" ? "OK" : w || "unknown",
                            temperature: null,
                            BSDName: x,
                          }),
                            (r =
                              r +
                              `printf "
` +
                              x +
                              '|"; diskutil info /dev/' +
                              x +
                              " | grep SMART;"));
                        }
                      }
                    }));
                } catch {
                  _.noop();
                }
                try {
                  let d = l.join(`
`).split(`

          Capacity:`);
                  (d.shift(),
                    d.forEach(function (m) {
                      m = "!Capacity: " + m;
                      let h = m.split(`
`);
                      const y = _.getValue(h, "link width", ":", !0).trim(),
                        g = _.getValue(h, "!capacity", ":", !0).trim(),
                        x = _.getValue(h, "BSD Name", ":", !0).trim();
                      if (g) {
                        let S = 0;
                        if (
                          (g.indexOf("(") >= 0 &&
                            (S = parseInt(
                              g
                                .match(/\(([^)]+)\)/)[1]
                                .replace(/\./g, "")
                                .replace(/,/g, "")
                                .replace(/\s/g, ""),
                            )),
                          S || (S = parseInt(g)),
                          S)
                        ) {
                          const w = _.getValue(h, "S.M.A.R.T. status", ":", !0)
                            .trim()
                            .toLowerCase();
                          (s.push({
                            device: x,
                            type: "NVMe",
                            name: _.getValue(h, "Model", ":", !0).trim(),
                            vendor: n(_.getValue(h, "Model", ":", !0).trim()),
                            size: S,
                            bytesPerSector: null,
                            totalCylinders: null,
                            totalHeads: null,
                            totalSectors: null,
                            totalTracks: null,
                            tracksPerCylinder: null,
                            sectorsPerTrack: null,
                            firmwareRevision: _.getValue(
                              h,
                              "Revision",
                              ":",
                              !0,
                            ).trim(),
                            serialNum: _.getValue(
                              h,
                              "Serial Number",
                              ":",
                              !0,
                            ).trim(),
                            interfaceType: ("PCIe " + y).trim(),
                            smartStatus:
                              w === "verified" ? "OK" : w || "unknown",
                            temperature: null,
                            BSDName: x,
                          }),
                            (r =
                              r +
                              `printf "
` +
                              x +
                              '|"; diskutil info /dev/' +
                              x +
                              " | grep SMART;"));
                        }
                      }
                    }));
                } catch {
                  _.noop();
                }
                try {
                  let d = f
                    .join(
                      `
`,
                    )
                    .replaceAll(
                      `Media:
 `,
                      "Model:",
                    ).split(`

          Product ID:`);
                  (d.shift(),
                    d.forEach(function (m) {
                      let h = m.split(`
`);
                      const y = _.getValue(h, "Capacity", ":", !0).trim(),
                        g = _.getValue(h, "BSD Name", ":", !0).trim();
                      if (y) {
                        let x = 0;
                        if (
                          (y.indexOf("(") >= 0 &&
                            (x = parseInt(
                              y
                                .match(/\(([^)]+)\)/)[1]
                                .replace(/\./g, "")
                                .replace(/,/g, "")
                                .replace(/\s/g, ""),
                            )),
                          x || (x = parseInt(y)),
                          x)
                        ) {
                          const S = _.getValue(h, "S.M.A.R.T. status", ":", !0)
                            .trim()
                            .toLowerCase();
                          (s.push({
                            device: g,
                            type: "USB",
                            name: _.getValue(h, "Model", ":", !0)
                              .trim()
                              .replaceAll(":", ""),
                            vendor: n(_.getValue(h, "Model", ":", !0).trim()),
                            size: x,
                            bytesPerSector: null,
                            totalCylinders: null,
                            totalHeads: null,
                            totalSectors: null,
                            totalTracks: null,
                            tracksPerCylinder: null,
                            sectorsPerTrack: null,
                            firmwareRevision: _.getValue(
                              h,
                              "Revision",
                              ":",
                              !0,
                            ).trim(),
                            serialNum: _.getValue(
                              h,
                              "Serial Number",
                              ":",
                              !0,
                            ).trim(),
                            interfaceType: "USB",
                            smartStatus:
                              S === "verified" ? "OK" : S || "unknown",
                            temperature: null,
                            BSDName: g,
                          }),
                            (r =
                              r +
                              `printf "
` +
                              g +
                              '|"; diskutil info /dev/' +
                              g +
                              " | grep SMART;"));
                        }
                      }
                    }));
                } catch {
                  _.noop();
                }
                if (r)
                  ((r =
                    r +
                    `printf "
"`),
                    Se(r, { maxBuffer: 1024 * 1024 }, function (d, m) {
                      m.toString()
                        .split(
                          `
`,
                        )
                        .forEach((y) => {
                          if (y) {
                            let g = y.split("|");
                            if (g.length === 2) {
                              let x = g[0];
                              g[1] = g[1].trim();
                              let S = g[1].split(":");
                              if (S.length === 2) {
                                S[1] = S[1].trim();
                                let w = S[1].toLowerCase();
                                for (let C = 0; C < s.length; C++)
                                  s[C].BSDName === x &&
                                    (s[C].smartStatus =
                                      w === "not supported"
                                        ? "not supported"
                                        : w === "verified"
                                          ? "Ok"
                                          : w === "failing"
                                            ? "Predicted Failure"
                                            : "unknown");
                              }
                            }
                          }
                        });
                      for (let y = 0; y < s.length; y++) delete s[y].BSDName;
                      (t && t(s), e(s));
                    }));
                else {
                  for (let d = 0; d < s.length; d++) delete s[d].BSDName;
                  (t && t(s), e(s));
                }
              }
            },
          ),
        xn)
      )
        try {
          const o = [];
          if (
            (o.push(
              _.powerShell(
                "Get-CimInstance Win32_DiskDrive | select Caption,Size,Status,PNPDeviceId,DeviceId,BytesPerSector,TotalCylinders,TotalHeads,TotalSectors,TotalTracks,TracksPerCylinder,SectorsPerTrack,FirmwareRevision,SerialNumber,InterfaceType | fl",
              ),
            ),
            o.push(
              _.powerShell(
                "Get-PhysicalDisk | select BusType,MediaType,FriendlyName,Model,SerialNumber,Size | fl",
              ),
            ),
            _.smartMonToolsInstalled())
          )
            try {
              const a = JSON.parse(lt("smartctl --scan -j").toString());
              a &&
                a.devices &&
                a.devices.length > 0 &&
                a.devices.forEach((c) => {
                  o.push(Xl(`smartctl -j -a ${c.name}`, _.execOptsWin));
                });
            } catch {
              _.noop();
            }
          _.promiseAll(o).then((a) => {
            let c = a.results[0].toString().split(/\n\s*\n/);
            (c.forEach(function (u) {
              let l = u.split(`\r
`);
              const f = _.getValue(l, "Size", ":").trim(),
                p = _.getValue(l, "Status", ":").trim().toLowerCase();
              f &&
                s.push({
                  device: _.getValue(l, "DeviceId", ":"),
                  // changed from PNPDeviceId to DeviceID (be be able to match devices)
                  type: u.indexOf("SSD") > -1 ? "SSD" : "HD",
                  // just a starting point ... better: MSFT_PhysicalDisk - Media Type ... see below
                  name: _.getValue(l, "Caption", ":"),
                  vendor: n(_.getValue(l, "Caption", ":", !0).trim()),
                  size: parseInt(f),
                  bytesPerSector: parseInt(
                    _.getValue(l, "BytesPerSector", ":"),
                  ),
                  totalCylinders: parseInt(
                    _.getValue(l, "TotalCylinders", ":"),
                  ),
                  totalHeads: parseInt(_.getValue(l, "TotalHeads", ":")),
                  totalSectors: parseInt(_.getValue(l, "TotalSectors", ":")),
                  totalTracks: parseInt(_.getValue(l, "TotalTracks", ":")),
                  tracksPerCylinder: parseInt(
                    _.getValue(l, "TracksPerCylinder", ":"),
                  ),
                  sectorsPerTrack: parseInt(
                    _.getValue(l, "SectorsPerTrack", ":"),
                  ),
                  firmwareRevision: _.getValue(
                    l,
                    "FirmwareRevision",
                    ":",
                  ).trim(),
                  serialNum: _.getValue(l, "SerialNumber", ":").trim(),
                  interfaceType: _.getValue(l, "InterfaceType", ":").trim(),
                  smartStatus:
                    p === "ok"
                      ? "Ok"
                      : p === "degraded"
                        ? "Degraded"
                        : p === "pred fail"
                          ? "Predicted Failure"
                          : "Unknown",
                  temperature: null,
                });
            }),
              (c = a.results[1].split(/\n\s*\n/)),
              c.forEach(function (u) {
                let l = u.split(`\r
`);
                const f = _.getValue(l, "SerialNumber", ":").trim(),
                  p = _.getValue(l, "FriendlyName", ":")
                    .trim()
                    .replace("Msft ", "Microsoft"),
                  d = _.getValue(l, "Size", ":").trim(),
                  m = _.getValue(l, "Model", ":").trim(),
                  h = _.getValue(l, "BusType", ":").trim();
                let y = _.getValue(l, "MediaType", ":").trim();
                if (
                  ((y === "3" || y === "HDD") && (y = "HD"),
                  y === "4" && (y = "SSD"),
                  y === "5" && (y = "SCM"),
                  y === "Unspecified" &&
                    (m.toLowerCase().indexOf("virtual") > -1 ||
                      m.toLowerCase().indexOf("vbox") > -1) &&
                    (y = "Virtual"),
                  d)
                ) {
                  let g = _.findObjectByKey(s, "serialNum", f);
                  ((g === -1 || f === "") &&
                    (g = _.findObjectByKey(s, "name", p)),
                    g != -1 && ((s[g].type = y), (s[g].interfaceType = h)));
                }
              }),
              a.results.shift(),
              a.results.shift(),
              a.results.length &&
                a.results.forEach((u) => {
                  try {
                    const l = JSON.parse(u);
                    if (l.serial_number) {
                      const f = l.serial_number;
                      let p = _.findObjectByKey(s, "serialNum", f);
                      p != -1 &&
                        ((s[p].smartStatus =
                          l.smart_status && l.smart_status.passed
                            ? "Ok"
                            : l.smart_status && l.smart_status.passed === !1
                              ? "Predicted Failure"
                              : "unknown"),
                        l.temperature &&
                          l.temperature.current &&
                          (s[p].temperature = l.temperature.current),
                        (s[p].smartData = l));
                    }
                  } catch {
                    _.noop();
                  }
                }),
              t && t(s),
              e(s));
          });
        } catch {
          (t && t(s), e(s));
        }
    });
  });
}
jt.diskLayout = cc;
var Kt = {};
const pi = Pe,
  Me = se.exec,
  pe = se.execSync,
  uc = Ae,
  M = V;
let xt = process.platform;
const Je = xt === "linux" || xt === "android",
  Qe = xt === "darwin",
  Un = xt === "win32",
  St = xt === "freebsd",
  wt = xt === "openbsd",
  Ct = xt === "netbsd",
  ns = xt === "sunos";
let ie = {},
  is = "",
  Zt = {},
  rs = [],
  en = [],
  tn = {},
  kt;
function Gt() {
  let t = "",
    n = "";
  try {
    let e = pi.networkInterfaces(),
      i = 9999;
    for (let s in e)
      ({}).hasOwnProperty.call(e, s) &&
        e[s].forEach(function (r) {
          r &&
            r.internal === !1 &&
            ((n = n || s),
            r.scopeid && r.scopeid < i && ((t = s), (i = r.scopeid)));
        });
    if (((t = t || n || ""), Un)) {
      let s = "";
      if (
        (pe("netstat -r", M.execOptsWin)
          .toString()
          .split(pi.EOL)
          .forEach((c) => {
            if (
              ((c = c.replace(/\s+/g, " ").trim()),
              c.indexOf("0.0.0.0 0.0.0.0") > -1 && !/[a-zA-Z]/.test(c))
            ) {
              const u = c.split(" ");
              u.length >= 5 && (s = u[u.length - 2]);
            }
          }),
        s)
      )
        for (let c in e)
          ({}).hasOwnProperty.call(e, c) &&
            e[c].forEach(function (u) {
              u && u.address && u.address === s && (t = c);
            });
    }
    if (Je) {
      let o = pe("ip route 2> /dev/null | grep default", M.execOptsLinux)
        .toString()
        .split(
          `
`,
        )[0]
        .split(/\s+/);
      (o[0] === "none" && o[5] ? (t = o[5]) : o[4] && (t = o[4]),
        t.indexOf(":") > -1 && (t = t.split(":")[1].trim()));
    }
    if (Qe || St || wt || Ct || ns) {
      let s = "";
      (Je && (s = "ip route 2> /dev/null | grep default | awk '{print $5}'"),
        Qe &&
          (s =
            "route -n get default 2>/dev/null | grep interface: | awk '{print $2}'"),
        (St || wt || Ct || ns) && (s = "route get 0.0.0.0 | grep interface:"),
        (t = pe(s).toString().split(`
`)[0]),
        t.indexOf(":") > -1 && (t = t.split(":")[1].trim()));
    }
  } catch {
    M.noop();
  }
  return (t && (is = t), is);
}
Kt.getDefaultNetworkInterface = Gt;
function ss() {
  let t = "",
    n = "",
    e = {};
  if (Je || St || wt || Ct) {
    if (typeof kt > "u")
      try {
        const i = pe("which ip", M.execOptsLinux).toString().split(`
`);
        i.length && i[0].indexOf(":") === -1 && i[0].indexOf("/") === 0
          ? (kt = i[0])
          : (kt = "");
      } catch {
        kt = "";
      }
    try {
      const i =
          "export LC_ALL=C; " +
          (kt ? kt + " link show up" : "/sbin/ifconfig") +
          "; unset LC_ALL",
        r = pe(i, M.execOptsLinux).toString().split(`
`);
      for (let o = 0; o < r.length; o++)
        if (r[o] && r[o][0] !== " ") {
          if (kt) {
            let a = r[o + 1].trim().split(" ");
            a[0] === "link/ether" &&
              ((t = r[o].split(" ")[1]),
              (t = t.slice(0, t.length - 1)),
              (n = a[1]));
          } else ((t = r[o].split(" ")[0]), (n = r[o].split("HWaddr ")[1]));
          t && n && ((e[t] = n.trim()), (t = ""), (n = ""));
        }
    } catch {
      M.noop();
    }
  }
  if (Qe)
    try {
      const r = pe("/sbin/ifconfig").toString().split(`
`);
      for (let o = 0; o < r.length; o++)
        r[o] && r[o][0] !== "	" && r[o].indexOf(":") > 0
          ? (t = r[o].split(":")[0])
          : r[o].indexOf("	ether ") === 0 &&
            ((n = r[o].split("	ether ")[1]),
            t && n && ((e[t] = n.trim()), (t = ""), (n = "")));
    } catch {
      M.noop();
    }
  return e;
}
function pc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = Gt();
      (t && t(e), n(e));
    });
  });
}
Kt.networkInterfaceDefault = pc;
function fc(t, n) {
  let e = [];
  for (let i in t)
    try {
      if ({}.hasOwnProperty.call(t, i) && t[i].trim() !== "") {
        let s = t[i].trim().split(`\r
`),
          r = null;
        try {
          r =
            n && n[i]
              ? n[i].trim().split(`\r
`)
              : [];
        } catch {
          M.noop();
        }
        let o = M.getValue(s, "NetEnabled", ":"),
          a =
            M.getValue(s, "AdapterTypeID", ":") === "9" ? "wireless" : "wired",
          c = M.getValue(s, "Name", ":")
            .replace(/\]/g, ")")
            .replace(/\[/g, "("),
          u = M.getValue(s, "NetConnectionID", ":")
            .replace(/\]/g, ")")
            .replace(/\[/g, "(");
        if (
          ((c.toLowerCase().indexOf("wi-fi") >= 0 ||
            c.toLowerCase().indexOf("wireless") >= 0) &&
            (a = "wireless"),
          o !== "")
        ) {
          const l = parseInt(M.getValue(s, "speed", ":").trim(), 10) / 1e6;
          e.push({
            mac: M.getValue(s, "MACAddress", ":").toLowerCase(),
            dhcp: M.getValue(r, "dhcpEnabled", ":").toLowerCase() === "true",
            name: c,
            iface: u,
            netEnabled: o === "TRUE",
            speed: isNaN(l) ? null : l,
            operstate:
              M.getValue(s, "NetConnectionStatus", ":") === "2" ? "up" : "down",
            type: a,
          });
        }
      }
    } catch {
      M.noop();
    }
  return e;
}
function dc() {
  return new Promise((t) => {
    process.nextTick(() => {
      let n = "Get-CimInstance Win32_NetworkAdapter | fl *; echo '#-#-#-#';";
      n += "Get-CimInstance Win32_NetworkAdapterConfiguration | fl DHCPEnabled";
      try {
        M.powerShell(n).then((e) => {
          e = e.split("#-#-#-#");
          const i = (e[0] || "").split(/\n\s*\n/),
            s = (e[1] || "").split(/\n\s*\n/);
          t(fc(i, s));
        });
      } catch {
        t([]);
      }
    });
  });
}
function mc() {
  let t = {},
    n = {
      primaryDNS: "",
      exitCode: 0,
      ifaces: [],
    };
  try {
    return (
      pe("ipconfig /all", M.execOptsWin)
        .split(
          `\r
\r
`,
        )
        .forEach((s, r) => {
          if (r == 1) {
            const o = s
                .split(
                  `\r
`,
                )
                .filter((c) => c.toUpperCase().includes("DNS")),
              a = o[0].substring(o[0].lastIndexOf(":") + 1);
            ((n.primaryDNS = a.trim()),
              n.primaryDNS || (n.primaryDNS = "Not defined"));
          }
          if (r > 1)
            if (r % 2 == 0) {
              const o = s.substring(s.lastIndexOf(" ") + 1).replace(":", "");
              t.name = o;
            } else {
              const o = s
                  .split(
                    `\r
`,
                  )
                  .filter((c) => c.toUpperCase().includes("DNS")),
                a = o[0].substring(o[0].lastIndexOf(":") + 1);
              ((t.dnsSuffix = a.trim()), n.ifaces.push(t), (t = {}));
            }
        }),
      n
    );
  } catch {
    return {
      primaryDNS: "",
      exitCode: 0,
      ifaces: [],
    };
  }
}
function hc(t, n) {
  let e = "";
  const i = n + ".";
  try {
    const s = t.filter((r) => i.includes(r.name + ".")).map((r) => r.dnsSuffix);
    return (s[0] && (e = s[0]), e || (e = ""), e);
  } catch {
    return "Unknown";
  }
}
function gc() {
  try {
    return pe("netsh lan show profiles", M.execOptsWin).split(`\r
Profile on interface`);
  } catch (t) {
    return t.status === 1 && t.stdout.includes("AutoConfig") ? "Disabled" : [];
  }
}
function yc(t) {
  try {
    return pe(
      `netsh wlan show  interface name="${t}" | findstr "SSID"`,
      M.execOptsWin,
    )
      .split(
        `\r
`,
      )
      .shift()
      .split(":")
      .pop()
      .trim();
  } catch {
    return "Unknown";
  }
}
function xc(t, n, e) {
  let i = {
    state: "Unknown",
    protocol: "Unknown",
  };
  if (e === "Disabled")
    return ((i.state = "Disabled"), (i.protocol = "Not defined"), i);
  if (t == "wired" && e.length > 0)
    try {
      const r = e.find((a) =>
          a.includes(
            n +
              `\r
`,
          ),
        ).split(`\r
`),
        o = r.find((a) => a.includes("802.1x"));
      if (o.includes("Disabled"))
        ((i.state = "Disabled"), (i.protocol = "Not defined"));
      else if (o.includes("Enabled")) {
        const a = r.find((c) => c.includes("EAP"));
        ((i.protocol = a.split(":").pop()), (i.state = "Enabled"));
      }
    } catch {
      return i;
    }
  else if (t == "wireless") {
    let s = "",
      r = "";
    try {
      const o = yc(n);
      if (o !== "Unknown") {
        let a = "";
        const c = M.isPrototypePolluted() ? "---" : M.sanitizeShellString(o),
          u = M.mathMin(c.length, 32);
        for (let l = 0; l <= u; l++) c[l] !== void 0 && (a = a + c[l]);
        ((s = pe(
          `netsh wlan show profiles "${a}" | findstr "802.1X"`,
          M.execOptsWin,
        )),
          (r = pe(
            `netsh wlan show profiles "${a}" | findstr "EAP"`,
            M.execOptsWin,
          )));
      }
      s.includes(":") &&
        r.includes(":") &&
        ((i.state = s.split(":").pop()), (i.protocol = r.split(":").pop()));
    } catch (o) {
      return (
        o.status === 1 &&
          o.stdout.includes("AutoConfig") &&
          ((i.state = "Disabled"), (i.protocol = "Not defined")),
        i
      );
    }
  }
  return i;
}
function co(t) {
  const n = [];
  let e = [];
  return (
    t.forEach(function (i) {
      (!i.startsWith("	") &&
        !i.startsWith(" ") &&
        e.length &&
        (n.push(e), (e = [])),
        e.push(i));
    }),
    e.length && n.push(e),
    n
  );
}
function Sc(t) {
  let n = [];
  return (
    t.forEach((e) => {
      let i = {
        iface: "",
        mtu: null,
        mac: "",
        ip6: "",
        ip4: "",
        speed: null,
        type: "",
        operstate: "",
        duplex: "",
        internal: !1,
      };
      const s = e[0];
      i.iface = s.split(":")[0].trim();
      let r = s.split("> mtu");
      ((i.mtu = r.length > 1 ? parseInt(r[1], 10) : null),
        isNaN(i.mtu) && (i.mtu = null),
        (i.internal = r[0].toLowerCase().indexOf("loopback") > -1),
        e.forEach((c) => {
          (c.trim().startsWith("ether ") &&
            (i.mac = c.split("ether ")[1].toLowerCase().trim()),
            c.trim().startsWith("inet6 ") &&
              !i.ip6 &&
              (i.ip6 = c
                .split("inet6 ")[1]
                .toLowerCase()
                .split("%")[0]
                .split(" ")[0]),
            c.trim().startsWith("inet ") &&
              !i.ip4 &&
              (i.ip4 = c.split("inet ")[1].toLowerCase().split(" ")[0]));
        }));
      let o = M.getValue(e, "link rate");
      ((i.speed = o ? parseFloat(o) : null),
        i.speed === null
          ? ((o = M.getValue(e, "uplink rate")),
            (i.speed = o ? parseFloat(o) : null),
            i.speed !== null &&
              o.toLowerCase().indexOf("gbps") >= 0 &&
              (i.speed = i.speed * 1e3))
          : o.toLowerCase().indexOf("gbps") >= 0 && (i.speed = i.speed * 1e3),
        (i.type =
          M.getValue(e, "type").toLowerCase().indexOf("wi-fi") > -1
            ? "wireless"
            : "wired"));
      const a = M.getValue(e, "status").toLowerCase();
      ((i.operstate =
        a === "active" ? "up" : a === "inactive" ? "down" : "unknown"),
        (i.duplex =
          M.getValue(e, "media").toLowerCase().indexOf("half-duplex") > -1
            ? "half"
            : "full"),
        (i.ip6 || i.ip4 || i.mac) && n.push(i));
    }),
    n
  );
}
function wc() {
  const t = "/sbin/ifconfig -v";
  try {
    const n = pe(t, { maxBuffer: 2048e4 }).toString().split(`
`),
      e = co(n);
    return Sc(e);
  } catch {
    return [];
  }
}
function Cc(t) {
  const n = `nmcli device status 2>/dev/null | grep ${t}`;
  try {
    const r = pe(n, M.execOptsLinux)
      .toString()
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .slice(3)
      .join(" ");
    return r != "--" ? r : "";
  } catch {
    return "";
  }
}
function uo(t) {
  let n = [];
  try {
    let e = `cat ${t} 2> /dev/null | grep 'iface\\|source'`;
    pe(e, M.execOptsLinux)
      .toString()
      .split(
        `
`,
      )
      .forEach((s) => {
        const r = s.replace(/\s+/g, " ").trim().split(" ");
        if (
          (r.length >= 4 &&
            s.toLowerCase().indexOf(" inet ") >= 0 &&
            s.toLowerCase().indexOf("dhcp") >= 0 &&
            n.push(r[1]),
          s.toLowerCase().includes("source"))
        ) {
          let o = s.split(" ")[1];
          n = n.concat(uo(o));
        }
      });
  } catch {
    M.noop();
  }
  return n;
}
function Lc() {
  let t = "ip a 2> /dev/null",
    n = [];
  try {
    const e = pe(t, M.execOptsLinux).toString().split(`
`),
      i = co(e);
    n = Ic(i);
  } catch {
    M.noop();
  }
  try {
    n = uo("/etc/network/interfaces");
  } catch {
    M.noop();
  }
  return n;
}
function Ic(t) {
  const n = [];
  return (
    t &&
      t.length &&
      t.forEach((e) => {
        if (e && e.length && e[0].split(":").length > 2) {
          for (let s of e)
            if (s.indexOf(" inet ") >= 0 && s.indexOf(" dynamic ") >= 0) {
              const r = s.split(" "),
                o = r[r.length - 1].trim();
              n.push(o);
              break;
            }
        }
      }),
    n
  );
}
function vc(t, n, e) {
  let i = !1;
  if (n) {
    const s = `nmcli connection show "${n}" 2>/dev/null | grep ipv4.method;`;
    try {
      switch (
        pe(s, M.execOptsLinux)
          .toString()
          .replace(/\s+/g, " ")
          .trim()
          .split(" ")
          .slice(1)
          .toString()
      ) {
        case "auto":
          i = !0;
          break;
        default:
          i = !1;
          break;
      }
      return i;
    } catch {
      return e.indexOf(t) >= 0;
    }
  } else return e.indexOf(t) >= 0;
}
function _c(t) {
  let n = !1;
  const e = `ipconfig getpacket "${t}" 2>/dev/null | grep lease_time;`;
  try {
    const i = pe(e).toString().split(`
`);
    i.length && i[0].startsWith("lease_time") && (n = !0);
  } catch {
    M.noop();
  }
  return n;
}
function Oc(t) {
  if (t) {
    const n = `nmcli connection show "${t}" 2>/dev/null | grep ipv4.dns-search;`;
    try {
      const s = pe(n, M.execOptsLinux)
        .toString()
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .slice(1)
        .toString();
      return s == "--" ? "Not defined" : s;
    } catch {
      return "Unknown";
    }
  } else return "Unknown";
}
function Pc(t) {
  if (t) {
    const n = `nmcli connection show "${t}" 2>/dev/null | grep 802-1x.eap;`;
    try {
      const s = pe(n, M.execOptsLinux)
        .toString()
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .slice(1)
        .toString();
      return s == "--" ? "" : s;
    } catch {
      return "Not defined";
    }
  } else return "Not defined";
}
function Ec(t) {
  return t ? (t == "Not defined" ? "Disabled" : "Enabled") : "Unknown";
}
function $i(t, n, e) {
  const i = [
    "00:00:00:00:00:00",
    "00:03:FF",
    "00:05:69",
    "00:0C:29",
    "00:0F:4B",
    "00:13:07",
    "00:13:BE",
    "00:15:5d",
    "00:16:3E",
    "00:1C:42",
    "00:21:F6",
    "00:24:0B",
    "00:50:56",
    "00:A0:B1",
    "00:E0:C8",
    "08:00:27",
    "0A:00:27",
    "18:92:2C",
    "16:DF:49",
    "3C:F3:92",
    "54:52:00",
    "FC:15:97",
  ];
  return e
    ? i.filter((s) =>
        e.toUpperCase().toUpperCase().startsWith(s.substring(0, e.length)),
      ).length > 0 ||
        t.toLowerCase().indexOf(" virtual ") > -1 ||
        n.toLowerCase().indexOf(" virtual ") > -1 ||
        t.toLowerCase().indexOf("vethernet ") > -1 ||
        n.toLowerCase().indexOf("vethernet ") > -1 ||
        t.toLowerCase().startsWith("veth") ||
        n.toLowerCase().startsWith("veth") ||
        t.toLowerCase().startsWith("vboxnet") ||
        n.toLowerCase().startsWith("vboxnet")
    : !1;
}
function wr(t, n, e) {
  return (
    typeof t == "string" && ((e = t), (n = !0), (t = null)),
    typeof t == "boolean" && ((n = t), (t = null), (e = "")),
    typeof n > "u" && (n = !0),
    (e = e || ""),
    (e = "" + e),
    new Promise((i) => {
      process.nextTick(() => {
        let s = pi.networkInterfaces(),
          r = [],
          o = [],
          a = [],
          c = [];
        if (Qe || St || wt || Ct)
          if (JSON.stringify(s) === JSON.stringify(Zt) && !n)
            ((r = en), t && t(r), i(r));
          else {
            const u = Gt();
            ((Zt = JSON.parse(JSON.stringify(s))),
              (o = wc()),
              o.forEach((l) => {
                ({}).hasOwnProperty.call(s, l.iface) &&
                  s[l.iface].forEach(function (m) {
                    ((m.family === "IPv4" || m.family === 4) &&
                      (l.ip4subnet = m.netmask),
                      (m.family === "IPv6" || m.family === 6) &&
                        (l.ip6subnet = m.netmask));
                  });
                let f = "";
                const p = M.isPrototypePolluted()
                    ? "---"
                    : M.sanitizeShellString(l.iface),
                  d = M.mathMin(p.length, 2e3);
                for (let m = 0; m <= d; m++) p[m] !== void 0 && (f = f + p[m]);
                r.push({
                  iface: l.iface,
                  ifaceName: l.iface,
                  default: l.iface === u,
                  ip4: l.ip4,
                  ip4subnet: l.ip4subnet || "",
                  ip6: l.ip6,
                  ip6subnet: l.ip6subnet || "",
                  mac: l.mac,
                  internal: l.internal,
                  virtual: l.internal ? !1 : $i(l.iface, l.iface, l.mac),
                  operstate: l.operstate,
                  type: l.type,
                  duplex: l.duplex,
                  mtu: l.mtu,
                  speed: l.speed,
                  dhcp: _c(f),
                  dnsSuffix: "",
                  ieee8021xAuth: "",
                  ieee8021xState: "",
                  carrierChanges: 0,
                });
              }),
              (en = r),
              e.toLowerCase().indexOf("default") >= 0 &&
                ((r = r.filter((l) => l.default)),
                r.length > 0 ? (r = r[0]) : (r = [])),
              t && t(r),
              i(r));
          }
        if (Je)
          if (JSON.stringify(s) === JSON.stringify(Zt) && !n)
            ((r = en), t && t(r), i(r));
          else {
            ((Zt = JSON.parse(JSON.stringify(s))), (rs = Lc()));
            const u = Gt();
            for (let l in s) {
              let f = "",
                p = "",
                d = "",
                m = "",
                h = "",
                y = "",
                g = "",
                x = null,
                S = 0,
                w = !1,
                C = "",
                W = "",
                T = "",
                K = "";
              if ({}.hasOwnProperty.call(s, l)) {
                let L = l;
                s[l].forEach(function (k) {
                  ((k.family === "IPv4" || k.family === 4) &&
                    ((f = k.address), (p = k.netmask)),
                    (k.family === "IPv6" || k.family === 6) &&
                      (!d || d.match(/^fe80::/i)) &&
                      ((d = k.address), (m = k.netmask)),
                    (h = k.mac));
                  const Z = parseInt(process.versions.node.split("."), 10);
                  h.indexOf("00:00:0") > -1 &&
                    (Je || Qe) &&
                    !k.internal &&
                    Z >= 8 &&
                    Z <= 11 &&
                    (Object.keys(tn).length === 0 && (tn = ss()),
                    (h = tn[l] || ""));
                });
                let D = l.split(":")[0].trim().toLowerCase(),
                  O = "";
                const X = M.isPrototypePolluted()
                    ? "---"
                    : M.sanitizeShellString(D),
                  Q = M.mathMin(X.length, 2e3);
                for (let k = 0; k <= Q; k++) X[k] !== void 0 && (O = O + X[k]);
                const ee = `echo -n "addr_assign_type: "; cat /sys/class/net/${O}/addr_assign_type 2>/dev/null; echo;
            echo -n "address: "; cat /sys/class/net/${O}/address 2>/dev/null; echo;
            echo -n "addr_len: "; cat /sys/class/net/${O}/addr_len 2>/dev/null; echo;
            echo -n "broadcast: "; cat /sys/class/net/${O}/broadcast 2>/dev/null; echo;
            echo -n "carrier: "; cat /sys/class/net/${O}/carrier 2>/dev/null; echo;
            echo -n "carrier_changes: "; cat /sys/class/net/${O}/carrier_changes 2>/dev/null; echo;
            echo -n "dev_id: "; cat /sys/class/net/${O}/dev_id 2>/dev/null; echo;
            echo -n "dev_port: "; cat /sys/class/net/${O}/dev_port 2>/dev/null; echo;
            echo -n "dormant: "; cat /sys/class/net/${O}/dormant 2>/dev/null; echo;
            echo -n "duplex: "; cat /sys/class/net/${O}/duplex 2>/dev/null; echo;
            echo -n "flags: "; cat /sys/class/net/${O}/flags 2>/dev/null; echo;
            echo -n "gro_flush_timeout: "; cat /sys/class/net/${O}/gro_flush_timeout 2>/dev/null; echo;
            echo -n "ifalias: "; cat /sys/class/net/${O}/ifalias 2>/dev/null; echo;
            echo -n "ifindex: "; cat /sys/class/net/${O}/ifindex 2>/dev/null; echo;
            echo -n "iflink: "; cat /sys/class/net/${O}/iflink 2>/dev/null; echo;
            echo -n "link_mode: "; cat /sys/class/net/${O}/link_mode 2>/dev/null; echo;
            echo -n "mtu: "; cat /sys/class/net/${O}/mtu 2>/dev/null; echo;
            echo -n "netdev_group: "; cat /sys/class/net/${O}/netdev_group 2>/dev/null; echo;
            echo -n "operstate: "; cat /sys/class/net/${O}/operstate 2>/dev/null; echo;
            echo -n "proto_down: "; cat /sys/class/net/${O}/proto_down 2>/dev/null; echo;
            echo -n "speed: "; cat /sys/class/net/${O}/speed 2>/dev/null; echo;
            echo -n "tx_queue_len: "; cat /sys/class/net/${O}/tx_queue_len 2>/dev/null; echo;
            echo -n "type: "; cat /sys/class/net/${O}/type 2>/dev/null; echo;
            echo -n "wireless: "; cat /proc/net/wireless 2>/dev/null | grep ${O}; echo;
            echo -n "wirelessspeed: "; iw dev ${O} link 2>&1 | grep bitrate; echo;`;
                let F = [];
                try {
                  F = pe(ee, M.execOptsLinux).toString().split(`
`);
                  const k = Cc(O);
                  ((w = vc(O, k, rs)), (C = Oc(k)), (W = Pc(k)), (T = Ec(W)));
                } catch {
                  M.noop();
                }
                ((y = M.getValue(F, "duplex")),
                  (y = y.startsWith("cat") ? "" : y),
                  (g = parseInt(M.getValue(F, "mtu"), 10)));
                let Y = parseInt(M.getValue(F, "speed"), 10);
                x = isNaN(Y) ? null : Y;
                let N = M.getValue(F, "wirelessspeed").split("tx bitrate: ");
                (x === null &&
                  N.length === 2 &&
                  ((Y = parseFloat(N[1])), (x = isNaN(Y) ? null : Y)),
                  (S = parseInt(M.getValue(F, "carrier_changes"), 10)));
                const H = M.getValue(F, "operstate");
                ((K =
                  H === "up"
                    ? M.getValue(F, "wireless").trim()
                      ? "wireless"
                      : "wired"
                    : "unknown"),
                  (O === "lo" || O.startsWith("bond")) && (K = "virtual"));
                let b = s[l] && s[l][0] ? s[l][0].internal : !1;
                (l.toLowerCase().indexOf("loopback") > -1 ||
                  L.toLowerCase().indexOf("loopback") > -1) &&
                  (b = !0);
                const $ = b ? !1 : $i(l, L, h);
                r.push({
                  iface: O,
                  ifaceName: L,
                  default: D === u,
                  ip4: f,
                  ip4subnet: p,
                  ip6: d,
                  ip6subnet: m,
                  mac: h,
                  internal: b,
                  virtual: $,
                  operstate: H,
                  type: K,
                  duplex: y,
                  mtu: g,
                  speed: x,
                  dhcp: w,
                  dnsSuffix: C,
                  ieee8021xAuth: W,
                  ieee8021xState: T,
                  carrierChanges: S,
                });
              }
            }
            ((en = r),
              e.toLowerCase().indexOf("default") >= 0 &&
                ((r = r.filter((l) => l.default)),
                r.length > 0 ? (r = r[0]) : (r = [])),
              t && t(r),
              i(r));
          }
        if (Un)
          if (JSON.stringify(s) === JSON.stringify(Zt) && !n)
            ((r = en), t && t(r), i(r));
          else {
            Zt = JSON.parse(JSON.stringify(s));
            const u = Gt();
            dc().then(function (l) {
              (l.forEach((f) => {
                let p = !1;
                (Object.keys(s).forEach((d) => {
                  p ||
                    s[d].forEach((m) => {
                      Object.keys(m).indexOf("mac") >= 0 &&
                        (p = m.mac === f.mac);
                    });
                }),
                  p || (s[f.name] = [{ mac: f.mac }]));
              }),
                (c = gc()),
                (a = mc()));
              for (let f in s) {
                let p = "";
                const d = M.isPrototypePolluted()
                    ? "---"
                    : M.sanitizeShellString(f),
                  m = M.mathMin(d.length, 2e3);
                for (let F = 0; F <= m; F++) d[F] !== void 0 && (p = p + d[F]);
                let h = f,
                  y = "",
                  g = "",
                  x = "",
                  S = "",
                  w = "",
                  C = "",
                  W = "",
                  T = null,
                  K = 0,
                  L = "down",
                  D = !1,
                  O = "",
                  X = "",
                  Q = "",
                  ee = "";
                if ({}.hasOwnProperty.call(s, f)) {
                  let F = f;
                  (s[f].forEach(function ($) {
                    (($.family === "IPv4" || $.family === 4) &&
                      ((y = $.address), (g = $.netmask)),
                      ($.family === "IPv6" || $.family === 6) &&
                        (!x || x.match(/^fe80::/i)) &&
                        ((x = $.address), (S = $.netmask)),
                      (w = $.mac));
                    const k = parseInt(process.versions.node.split("."), 10);
                    w.indexOf("00:00:0") > -1 &&
                      (Je || Qe) &&
                      !$.internal &&
                      k >= 8 &&
                      k <= 11 &&
                      (Object.keys(tn).length === 0 && (tn = ss()),
                      (w = tn[f] || ""));
                  }),
                    (O = hc(a.ifaces, p)));
                  let Y = !1;
                  (l.forEach(($) => {
                    $.mac === w &&
                      !Y &&
                      ((h = $.iface || h),
                      (F = $.name),
                      (D = $.dhcp),
                      (L = $.operstate),
                      (T = L === "up" ? $.speed : 0),
                      (ee = $.type),
                      (Y = !0));
                  }),
                    (f.toLowerCase().indexOf("wlan") >= 0 ||
                      F.toLowerCase().indexOf("wlan") >= 0 ||
                      F.toLowerCase().indexOf("802.11n") >= 0 ||
                      F.toLowerCase().indexOf("wireless") >= 0 ||
                      F.toLowerCase().indexOf("wi-fi") >= 0 ||
                      F.toLowerCase().indexOf("wifi") >= 0) &&
                      (ee = "wireless"));
                  const N = xc(ee, p, c);
                  ((X = N.protocol), (Q = N.state));
                  let H = s[f] && s[f][0] ? s[f][0].internal : !1;
                  (f.toLowerCase().indexOf("loopback") > -1 ||
                    F.toLowerCase().indexOf("loopback") > -1) &&
                    (H = !0);
                  const b = H ? !1 : $i(f, F, w);
                  r.push({
                    iface: h,
                    ifaceName: F,
                    default: h === u,
                    ip4: y,
                    ip4subnet: g,
                    ip6: x,
                    ip6subnet: S,
                    mac: w,
                    internal: H,
                    virtual: b,
                    operstate: L,
                    type: ee,
                    duplex: C,
                    mtu: W,
                    speed: T,
                    dhcp: D,
                    dnsSuffix: O,
                    ieee8021xAuth: X,
                    ieee8021xState: Q,
                    carrierChanges: K,
                  });
                }
              }
              ((en = r),
                e.toLowerCase().indexOf("default") >= 0 &&
                  ((r = r.filter((f) => f.default)),
                  r.length > 0 ? (r = r[0]) : (r = [])),
                t && t(r),
                i(r));
            });
          }
      });
    })
  );
}
Kt.networkInterfaces = wr;
function Qn(t, n, e, i, s, r, o, a) {
  let c = {
    iface: t,
    operstate: i,
    rx_bytes: n,
    rx_dropped: s,
    rx_errors: r,
    tx_bytes: e,
    tx_dropped: o,
    tx_errors: a,
    rx_sec: null,
    tx_sec: null,
    ms: 0,
  };
  return (
    ie[t] && ie[t].ms
      ? ((c.ms = Date.now() - ie[t].ms),
        (c.rx_sec =
          n - ie[t].rx_bytes >= 0 ? (n - ie[t].rx_bytes) / (c.ms / 1e3) : 0),
        (c.tx_sec =
          e - ie[t].tx_bytes >= 0 ? (e - ie[t].tx_bytes) / (c.ms / 1e3) : 0),
        (ie[t].rx_bytes = n),
        (ie[t].tx_bytes = e),
        (ie[t].rx_sec = c.rx_sec),
        (ie[t].tx_sec = c.tx_sec),
        (ie[t].ms = Date.now()),
        (ie[t].last_ms = c.ms),
        (ie[t].operstate = i))
      : (ie[t] || (ie[t] = {}),
        (ie[t].rx_bytes = n),
        (ie[t].tx_bytes = e),
        (ie[t].rx_sec = null),
        (ie[t].tx_sec = null),
        (ie[t].ms = Date.now()),
        (ie[t].last_ms = 0),
        (ie[t].operstate = i)),
    c
  );
}
function po(t, n) {
  let e = [];
  return new Promise((i) => {
    process.nextTick(() => {
      if (M.isFunction(t) && !n) ((n = t), (e = [Gt()]));
      else {
        if (typeof t != "string" && t !== void 0) return (n && n([]), i([]));
        t = t || Gt();
        try {
          ((t.__proto__.toLowerCase = M.stringToLower),
            (t.__proto__.replace = M.stringReplace),
            (t.__proto__.toString = M.stringToString),
            (t.__proto__.substr = M.stringSubstr),
            (t.__proto__.substring = M.stringSubstring),
            (t.__proto__.trim = M.stringTrim),
            (t.__proto__.startsWith = M.stringStartWith));
        } catch {
          Object.setPrototypeOf(t, M.stringObj);
        }
        ((t = t.trim().toLowerCase().replace(/,+/g, "|")), (e = t.split("|")));
      }
      const s = [],
        r = [];
      if (e.length && e[0].trim() === "*")
        ((e = []),
          wr(!1).then((o) => {
            for (let a of o) e.push(a.iface);
            po(e.join(",")).then((a) => {
              (n && n(a), i(a));
            });
          }));
      else {
        for (let o of e) r.push(Mc(o.trim()));
        r.length
          ? Promise.all(r).then((o) => {
              (n && n(o), i(o));
            })
          : (n && n(s), i(s));
      }
    });
  });
}
function Mc(t) {
  function n(e) {
    let i = [];
    for (let s in e)
      if ({}.hasOwnProperty.call(e, s) && e[s].trim() !== "") {
        let r = e[s].trim().split(`\r
`);
        i.push({
          name: M.getValue(r, "Name", ":")
            .replace(/[()[\] ]+/g, "")
            .replace(/#|\//g, "_")
            .toLowerCase(),
          rx_bytes: parseInt(M.getValue(r, "BytesReceivedPersec", ":"), 10),
          rx_errors: parseInt(M.getValue(r, "PacketsReceivedErrors", ":"), 10),
          rx_dropped: parseInt(
            M.getValue(r, "PacketsReceivedDiscarded", ":"),
            10,
          ),
          tx_bytes: parseInt(M.getValue(r, "BytesSentPersec", ":"), 10),
          tx_errors: parseInt(M.getValue(r, "PacketsOutboundErrors", ":"), 10),
          tx_dropped: parseInt(
            M.getValue(r, "PacketsOutboundDiscarded", ":"),
            10,
          ),
        });
      }
    return i;
  }
  return new Promise((e) => {
    process.nextTick(() => {
      let i = "";
      const s = M.isPrototypePolluted() ? "---" : M.sanitizeShellString(t),
        r = M.mathMin(s.length, 2e3);
      for (let g = 0; g <= r; g++) s[g] !== void 0 && (i = i + s[g]);
      let o = {
          iface: i,
          operstate: "unknown",
          rx_bytes: 0,
          rx_dropped: 0,
          rx_errors: 0,
          tx_bytes: 0,
          tx_dropped: 0,
          tx_errors: 0,
          rx_sec: null,
          tx_sec: null,
          ms: 0,
        },
        a = "unknown",
        c = 0,
        u = 0,
        l = 0,
        f = 0,
        p = 0,
        d = 0,
        m,
        h,
        y;
      if (
        !ie[i] ||
        (ie[i] && !ie[i].ms) ||
        (ie[i] && ie[i].ms && Date.now() - ie[i].ms >= 500)
      ) {
        if (
          (Je &&
            (uc.existsSync("/sys/class/net/" + i)
              ? ((m =
                  "cat /sys/class/net/" +
                  i +
                  "/operstate; cat /sys/class/net/" +
                  i +
                  "/statistics/rx_bytes; cat /sys/class/net/" +
                  i +
                  "/statistics/tx_bytes; cat /sys/class/net/" +
                  i +
                  "/statistics/rx_dropped; cat /sys/class/net/" +
                  i +
                  "/statistics/rx_errors; cat /sys/class/net/" +
                  i +
                  "/statistics/tx_dropped; cat /sys/class/net/" +
                  i +
                  "/statistics/tx_errors; "),
                Me(m, function (g, x) {
                  (g ||
                    ((h = x.toString().split(`
`)),
                    (a = h[0].trim()),
                    (c = parseInt(h[1], 10)),
                    (u = parseInt(h[2], 10)),
                    (l = parseInt(h[3], 10)),
                    (f = parseInt(h[4], 10)),
                    (p = parseInt(h[5], 10)),
                    (d = parseInt(h[6], 10)),
                    (o = Qn(i, c, u, a, l, f, p, d))),
                    e(o));
                }))
              : e(o)),
          (St || wt || Ct) &&
            ((m = "netstat -ibndI " + i),
            Me(m, function (g, x) {
              if (!g) {
                h = x.toString().split(`
`);
                for (let S = 1; S < h.length; S++) {
                  const w = h[S].replace(/ +/g, " ").split(" ");
                  w &&
                    w[0] &&
                    w[7] &&
                    w[10] &&
                    ((c = c + parseInt(w[7])),
                    w[6].trim() !== "-" && (l = l + parseInt(w[6])),
                    w[5].trim() !== "-" && (f = f + parseInt(w[5])),
                    (u = u + parseInt(w[10])),
                    w[12].trim() !== "-" && (p = p + parseInt(w[12])),
                    w[9].trim() !== "-" && (d = d + parseInt(w[9])),
                    (a = "up"));
                }
                o = Qn(i, c, u, a, l, f, p, d);
              }
              e(o);
            })),
          Qe &&
            ((m = "ifconfig " + i + ' | grep "status"'),
            Me(m, function (g, x) {
              ((o.operstate = (x.toString().split(":")[1] || "").trim()),
                (o.operstate = (o.operstate || "").toLowerCase()),
                (o.operstate =
                  o.operstate === "active"
                    ? "up"
                    : o.operstate === "inactive"
                      ? "down"
                      : "unknown"),
                (m = "netstat -bdI " + i),
                Me(m, function (S, w) {
                  if (
                    !S &&
                    ((h = w.toString().split(`
`)),
                    h.length > 1 && h[1].trim() !== "")
                  ) {
                    y = h[1].replace(/ +/g, " ").split(" ");
                    const C = y.length > 11 ? 1 : 0;
                    ((c = parseInt(y[C + 5])),
                      (l = parseInt(y[C + 10])),
                      (f = parseInt(y[C + 4])),
                      (u = parseInt(y[C + 8])),
                      (p = parseInt(y[C + 10])),
                      (d = parseInt(y[C + 7])),
                      (o = Qn(i, c, u, o.operstate, l, f, p, d)));
                  }
                  e(o);
                }));
            })),
          Un)
        ) {
          let g = [],
            x = i;
          M.powerShell(
            "Get-CimInstance Win32_PerfRawData_Tcpip_NetworkInterface | select Name,BytesReceivedPersec,PacketsReceivedErrors,PacketsReceivedDiscarded,BytesSentPersec,PacketsOutboundErrors,PacketsOutboundDiscarded | fl",
          ).then((S, w) => {
            if (!w) {
              const C = S.toString().split(/\n\s*\n/);
              g = n(C);
            }
            wr(!1).then((C) => {
              ((c = 0),
                (u = 0),
                g.forEach((W) => {
                  C.forEach((T) => {
                    (T.iface.toLowerCase() === i.toLowerCase() ||
                      T.mac.toLowerCase() === i.toLowerCase() ||
                      T.ip4.toLowerCase() === i.toLowerCase() ||
                      T.ip6.toLowerCase() === i.toLowerCase() ||
                      T.ifaceName
                        .replace(/[()[\] ]+/g, "")
                        .replace(/#|\//g, "_")
                        .toLowerCase() ===
                        i
                          .replace(/[()[\] ]+/g, "")
                          .replace("#", "_")
                          .toLowerCase()) &&
                      T.ifaceName
                        .replace(/[()[\] ]+/g, "")
                        .replace(/#|\//g, "_")
                        .toLowerCase() === W.name &&
                      ((x = T.iface),
                      (c = W.rx_bytes),
                      (l = W.rx_dropped),
                      (f = W.rx_errors),
                      (u = W.tx_bytes),
                      (p = W.tx_dropped),
                      (d = W.tx_errors),
                      (a = T.operstate));
                  });
                }),
                c && u && (o = Qn(x, parseInt(c), parseInt(u), a, l, f, p, d)),
                e(o));
            });
          });
        }
      } else
        ((o.rx_bytes = ie[i].rx_bytes),
          (o.tx_bytes = ie[i].tx_bytes),
          (o.rx_sec = ie[i].rx_sec),
          (o.tx_sec = ie[i].tx_sec),
          (o.ms = ie[i].last_ms),
          (o.operstate = ie[i].operstate),
          e(o));
    });
  });
}
Kt.networkStats = po;
function Ac(t, n) {
  let e = "";
  return (
    t.forEach((i) => {
      const s = i.split(" ");
      (parseInt(s[0], 10) || -1) === n &&
        (s.shift(), (e = s.join(" ").split(":")[0]));
    }),
    (e = e.split(" -")[0]),
    (e = e.split(" /")[0]),
    e
  );
}
function Tc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (Je || St || wt || Ct) {
        let i =
          'export LC_ALL=C; netstat -tunap | grep "ESTABLISHED\\|SYN_SENT\\|SYN_RECV\\|FIN_WAIT1\\|FIN_WAIT2\\|TIME_WAIT\\|CLOSE\\|CLOSE_WAIT\\|LAST_ACK\\|LISTEN\\|CLOSING\\|UNKNOWN"; unset LC_ALL';
        ((St || wt || Ct) &&
          (i =
            'export LC_ALL=C; netstat -na | grep "ESTABLISHED\\|SYN_SENT\\|SYN_RECV\\|FIN_WAIT1\\|FIN_WAIT2\\|TIME_WAIT\\|CLOSE\\|CLOSE_WAIT\\|LAST_ACK\\|LISTEN\\|CLOSING\\|UNKNOWN"; unset LC_ALL'),
          Me(i, { maxBuffer: 1024 * 2e4 }, function (s, r) {
            let o = r.toString().split(`
`);
            !s && (o.length > 1 || o[0] != "")
              ? (o.forEach(function (a) {
                  if (((a = a.replace(/ +/g, " ").split(" ")), a.length >= 7)) {
                    let c = a[3],
                      u = "",
                      l = a[3].split(":");
                    l.length > 1 &&
                      ((u = l[l.length - 1]), l.pop(), (c = l.join(":")));
                    let f = a[4],
                      p = "",
                      d = a[4].split(":");
                    d.length > 1 &&
                      ((p = d[d.length - 1]), d.pop(), (f = d.join(":")));
                    let m = a[5],
                      h = a[6].split("/");
                    m &&
                      e.push({
                        protocol: a[0],
                        localAddress: c,
                        localPort: u,
                        peerAddress: f,
                        peerPort: p,
                        state: m,
                        pid: h[0] && h[0] !== "-" ? parseInt(h[0], 10) : null,
                        process: h[1] ? h[1].split(" ")[0].split(":")[0] : "",
                      });
                  }
                }),
                t && t(e),
                n(e))
              : ((i =
                  'ss -tunap | grep "ESTAB\\|SYN-SENT\\|SYN-RECV\\|FIN-WAIT1\\|FIN-WAIT2\\|TIME-WAIT\\|CLOSE\\|CLOSE-WAIT\\|LAST-ACK\\|LISTEN\\|CLOSING"'),
                Me(i, { maxBuffer: 1024 * 2e4 }, function (a, c) {
                  (a ||
                    c
                      .toString()
                      .split(
                        `
`,
                      )
                      .forEach(function (l) {
                        if (
                          ((l = l.replace(/ +/g, " ").split(" ")),
                          l.length >= 6)
                        ) {
                          let f = l[4],
                            p = "",
                            d = l[4].split(":");
                          d.length > 1 &&
                            ((p = d[d.length - 1]), d.pop(), (f = d.join(":")));
                          let m = l[5],
                            h = "",
                            y = l[5].split(":");
                          y.length > 1 &&
                            ((h = y[y.length - 1]), y.pop(), (m = y.join(":")));
                          let g = l[1];
                          (g === "ESTAB" && (g = "ESTABLISHED"),
                            g === "TIME-WAIT" && (g = "TIME_WAIT"));
                          let x = null,
                            S = "";
                          if (l.length >= 7 && l[6].indexOf("users:") > -1) {
                            let w = l[6]
                              .replace('users:(("', "")
                              .replace(/"/g, "")
                              .split(",");
                            w.length > 2 &&
                              ((S = w[0].split(" ")[0].split(":")[0]),
                              (x = parseInt(w[1], 10)));
                          }
                          g &&
                            e.push({
                              protocol: l[0],
                              localAddress: f,
                              localPort: p,
                              peerAddress: m,
                              peerPort: h,
                              state: g,
                              pid: x,
                              process: S,
                            });
                        }
                      }),
                    t && t(e),
                    n(e));
                }));
          }));
      }
      if (Qe) {
        let i =
          'netstat -natvln | head -n2; netstat -natvln | grep "tcp4\\|tcp6\\|udp4\\|udp6"';
        const s =
          "ESTABLISHED|SYN_SENT|SYN_RECV|FIN_WAIT1|FIN_WAIT_1|FIN_WAIT2|FIN_WAIT_2|TIME_WAIT|CLOSE|CLOSE_WAIT|LAST_ACK|LISTEN|CLOSING|UNKNOWN".split(
            "|",
          );
        Me(i, { maxBuffer: 1024 * 2e4 }, function (r, o) {
          r ||
            Me(
              "ps -axo pid,command",
              { maxBuffer: 1024 * 2e4 },
              function (a, c) {
                let u = c.toString().split(`
`);
                u = u.map((p) => p.trim().replace(/ +/g, " "));
                let l = o.toString().split(`
`);
                l.shift();
                let f = 8;
                (l.length > 1 &&
                  l[0].indexOf("pid") > 0 &&
                  (f = (l.shift() || "")
                    .replace(/ Address/g, "_Address")
                    .replace(/ +/g, " ")
                    .split(" ")
                    .indexOf("pid")),
                  l.forEach(function (p) {
                    if (
                      ((p = p.replace(/ +/g, " ").split(" ")), p.length >= 8)
                    ) {
                      let d = p[3],
                        m = "",
                        h = p[3].split(".");
                      h.length > 1 &&
                        ((m = h[h.length - 1]), h.pop(), (d = h.join(".")));
                      let y = p[4],
                        g = "",
                        x = p[4].split(".");
                      x.length > 1 &&
                        ((g = x[x.length - 1]), x.pop(), (y = x.join(".")));
                      const S = s.indexOf(p[5]) >= 0;
                      let w = S ? p[5] : "UNKNOWN",
                        C = parseInt(p[f + (S ? 0 : -1)], 10);
                      w &&
                        e.push({
                          protocol: p[0],
                          localAddress: d,
                          localPort: m,
                          peerAddress: y,
                          peerPort: g,
                          state: w,
                          pid: C,
                          process: Ac(u, C),
                        });
                    }
                  }),
                  t && t(e),
                  n(e));
              },
            );
        });
      }
      if (Un) {
        let i = "netstat -nao";
        try {
          Me(i, M.execOptsWin, function (s, r) {
            s ||
              (r
                .toString()
                .split(
                  `\r
`,
                )
                .forEach(function (a) {
                  if (
                    ((a = a.trim().replace(/ +/g, " ").split(" ")),
                    a.length >= 4)
                  ) {
                    let c = a[1],
                      u = "",
                      l = a[1].split(":");
                    (l.length > 1 &&
                      ((u = l[l.length - 1]), l.pop(), (c = l.join(":"))),
                      (c = c.replace(/\[/g, "").replace(/\]/g, "")));
                    let f = a[2],
                      p = "",
                      d = a[2].split(":");
                    (d.length > 1 &&
                      ((p = d[d.length - 1]), d.pop(), (f = d.join(":"))),
                      (f = f.replace(/\[/g, "").replace(/\]/g, "")));
                    let m = M.toInt(a[4]),
                      h = a[3];
                    (h === "HERGESTELLT" && (h = "ESTABLISHED"),
                      h.startsWith("ABH") && (h = "LISTEN"),
                      h === "SCHLIESSEN_WARTEN" && (h = "CLOSE_WAIT"),
                      h === "WARTEND" && (h = "TIME_WAIT"),
                      h === "SYN_GESENDET" && (h = "SYN_SENT"),
                      h === "LISTENING" && (h = "LISTEN"),
                      h === "SYN_RECEIVED" && (h = "SYN_RECV"),
                      h === "FIN_WAIT_1" && (h = "FIN_WAIT1"),
                      h === "FIN_WAIT_2" && (h = "FIN_WAIT2"),
                      a[0].toLowerCase() !== "udp" && h
                        ? e.push({
                            protocol: a[0].toLowerCase(),
                            localAddress: c,
                            localPort: u,
                            peerAddress: f,
                            peerPort: p,
                            state: h,
                            pid: m,
                            process: "",
                          })
                        : a[0].toLowerCase() === "udp" &&
                          e.push({
                            protocol: a[0].toLowerCase(),
                            localAddress: c,
                            localPort: u,
                            peerAddress: f,
                            peerPort: p,
                            state: "",
                            pid: parseInt(a[3], 10),
                            process: "",
                          }));
                  }
                }),
              t && t(e),
              n(e));
          });
        } catch {
          (t && t(e), n(e));
        }
      }
    });
  });
}
Kt.networkConnections = Tc;
function Dc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = "";
      if (Je || St || wt || Ct) {
        let i = "ip route get 1";
        try {
          Me(i, { maxBuffer: 1024 * 2e4 }, function (s, r) {
            if (s) (t && t(e), n(e));
            else {
              let o = r.toString().split(`
`),
                c = (o && o[0] ? o[0] : "").split(" via ");
              (c && c[1] && ((c = c[1].split(" ")), (e = c[0])),
                t && t(e),
                n(e));
            }
          });
        } catch {
          (t && t(e), n(e));
        }
      }
      if (Qe) {
        let i = "route -n get default";
        try {
          Me(i, { maxBuffer: 1024 * 2e4 }, function (s, r) {
            if (!s) {
              const o = r
                .toString()
                .split(
                  `
`,
                )
                .map((a) => a.trim());
              e = M.getValue(o, "gateway");
            }
            e
              ? (t && t(e), n(e))
              : ((i = "netstat -rn | awk '/default/ {print $2}'"),
                Me(i, { maxBuffer: 1024 * 2e4 }, function (o, a) {
                  ((e = a
                    .toString()
                    .split(
                      `
`,
                    )
                    .map((u) => u.trim())
                    .find((u) =>
                      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                        u,
                      ),
                    )),
                    t && t(e),
                    n(e));
                }));
          });
        } catch {
          (t && t(e), n(e));
        }
      }
      if (Un)
        try {
          Me("netstat -r", M.execOptsWin, function (i, s) {
            (s
              .toString()
              .split(pi.EOL)
              .forEach((o) => {
                if (
                  ((o = o.replace(/\s+/g, " ").trim()),
                  o.indexOf("0.0.0.0 0.0.0.0") > -1 && !/[a-zA-Z]/.test(o))
                ) {
                  const a = o.split(" ");
                  a.length >= 5 &&
                    a[a.length - 3].indexOf(".") > -1 &&
                    (e = a[a.length - 3]);
                }
              }),
              e
                ? (t && t(e), n(e))
                : M.powerShell(
                    "Get-CimInstance -ClassName Win32_IP4RouteTable | Where-Object { $_.Destination -eq '0.0.0.0' -and $_.Mask -eq '0.0.0.0' }",
                  ).then((o) => {
                    let a = o.toString().split(`\r
`);
                    a.length > 1 &&
                      !e &&
                      ((e = M.getValue(a, "NextHop")), t && t(e), n(e));
                  }));
          });
        } catch {
          (t && t(e), n(e));
        }
    });
  });
}
Kt.networkGatewayDefault = Dc;
var Mi = {};
const En = Pe,
  Cr = se.exec,
  Lt = se.execSync,
  E = V;
let fi = process.platform;
const Lr = fi === "linux" || fi === "android",
  Ir = fi === "darwin",
  vr = fi === "win32";
function _r(t) {
  const n = parseFloat(t);
  return n < 0 ? 0 : n >= 100 ? -50 : n / 2 - 100;
}
function di(t) {
  const n = 2 * (parseFloat(t) + 100);
  return n <= 100 ? n : 100;
}
const Tn = {
  1: 2412,
  2: 2417,
  3: 2422,
  4: 2427,
  5: 2432,
  6: 2437,
  7: 2442,
  8: 2447,
  9: 2452,
  10: 2457,
  11: 2462,
  12: 2467,
  13: 2472,
  14: 2484,
  32: 5160,
  34: 5170,
  36: 5180,
  38: 5190,
  40: 5200,
  42: 5210,
  44: 5220,
  46: 5230,
  48: 5240,
  50: 5250,
  52: 5260,
  54: 5270,
  56: 5280,
  58: 5290,
  60: 5300,
  62: 5310,
  64: 5320,
  68: 5340,
  96: 5480,
  100: 5500,
  102: 5510,
  104: 5520,
  106: 5530,
  108: 5540,
  110: 5550,
  112: 5560,
  114: 5570,
  116: 5580,
  118: 5590,
  120: 5600,
  122: 5610,
  124: 5620,
  126: 5630,
  128: 5640,
  132: 5660,
  134: 5670,
  136: 5680,
  138: 5690,
  140: 5700,
  142: 5710,
  144: 5720,
  149: 5745,
  151: 5755,
  153: 5765,
  155: 5775,
  157: 5785,
  159: 5795,
  161: 5805,
  165: 5825,
  169: 5845,
  173: 5865,
  183: 4915,
  184: 4920,
  185: 4925,
  187: 4935,
  188: 4940,
  189: 4945,
  192: 4960,
  196: 4980,
};
function Dn(t) {
  return {}.hasOwnProperty.call(Tn, t) ? Tn[t] : null;
}
function bc(t) {
  let n = 0;
  for (let e in Tn)
    ({}).hasOwnProperty.call(Tn, e) && Tn[e] === t && (n = E.toInt(e));
  return n;
}
function fo() {
  const t = [],
    n = "iw dev 2>/dev/null";
  try {
    const i = Lt(n, E.execOptsLinux)
      .toString()
      .split(
        `
`,
      )
      .map((s) => s.trim()).join(`
`).split(`
Interface `);
    return (
      i.shift(),
      i.forEach((s) => {
        const r = s.split(`
`),
          o = r[0],
          a = E.toInt(E.getValue(r, "ifindex", " ")),
          c = E.getValue(r, "addr", " "),
          u = E.toInt(E.getValue(r, "channel", " "));
        t.push({
          id: a,
          iface: o,
          mac: c,
          channel: u,
        });
      }),
      t
    );
  } catch {
    try {
      const s = Lt(
        "nmcli -t -f general,wifi-properties,wired-properties,interface-flags,capabilities,nsp device show 2>/dev/null",
        E.execOptsLinux,
      ).toString().split(`

`);
      let r = 1;
      return (
        s.forEach((o) => {
          const a = o.split(`
`),
            c = E.getValue(a, "GENERAL.DEVICE"),
            u = E.getValue(a, "GENERAL.TYPE"),
            l = r++,
            f = E.getValue(a, "GENERAL.HWADDR");
          u.toLowerCase() === "wifi" &&
            t.push({
              id: l,
              iface: c,
              mac: f,
              channel: "",
            });
        }),
        t
      );
    } catch {
      return [];
    }
  }
}
function mo(t) {
  const n = `nmcli -t -f general,wifi-properties,capabilities,ip4,ip6 device show ${t} 2> /dev/null`;
  try {
    const e = Lt(n, E.execOptsLinux).toString().split(`
`),
      i = E.getValue(e, "GENERAL.CONNECTION");
    return {
      iface: t,
      type: E.getValue(e, "GENERAL.TYPE"),
      vendor: E.getValue(e, "GENERAL.VENDOR"),
      product: E.getValue(e, "GENERAL.PRODUCT"),
      mac: E.getValue(e, "GENERAL.HWADDR").toLowerCase(),
      ssid: i !== "--" ? i : null,
    };
  } catch {
    return {};
  }
}
function Vc(t) {
  const n = `nmcli -t --show-secrets connection show ${t} 2>/dev/null`;
  try {
    const e = Lt(n, E.execOptsLinux).toString().split(`
`),
      i = E.getValue(e, "802-11-wireless.seen-bssids").toLowerCase();
    return {
      ssid: t !== "--" ? t : null,
      uuid: E.getValue(e, "connection.uuid"),
      type: E.getValue(e, "connection.type"),
      autoconnect: E.getValue(e, "connection.autoconnect") === "yes",
      security: E.getValue(e, "802-11-wireless-security.key-mgmt"),
      bssid: i !== "--" ? i : null,
    };
  } catch {
    return {};
  }
}
function Nc(t) {
  if (!t) return {};
  const n = `wpa_cli -i ${t} status 2>&1`;
  try {
    const e = Lt(n, E.execOptsLinux).toString().split(`
`),
      i = E.toInt(E.getValue(e, "freq", "="));
    return {
      ssid: E.getValue(e, "ssid", "="),
      uuid: E.getValue(e, "uuid", "="),
      security: E.getValue(e, "key_mgmt", "="),
      freq: i,
      channel: bc(i),
      bssid: E.getValue(e, "bssid", "=").toLowerCase(),
    };
  } catch {
    return {};
  }
}
function ho() {
  const t = [],
    n =
      "nmcli -t -m multiline --fields active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags device wifi list 2>/dev/null";
  try {
    const i = Lt(n, E.execOptsLinux).toString().split("ACTIVE:");
    return (
      i.shift(),
      i.forEach((s) => {
        s = "ACTIVE:" + s;
        const r = s.split(En.EOL),
          o = E.getValue(r, "CHAN"),
          a = E.getValue(r, "FREQ").toLowerCase().replace("mhz", "").trim(),
          c = E.getValue(r, "SECURITY").replace("(", "").replace(")", ""),
          u = E.getValue(r, "WPA-FLAGS").replace("(", "").replace(")", ""),
          l = E.getValue(r, "RSN-FLAGS").replace("(", "").replace(")", ""),
          f = E.getValue(r, "SIGNAL");
        t.push({
          ssid: E.getValue(r, "SSID"),
          bssid: E.getValue(r, "BSSID").toLowerCase(),
          mode: E.getValue(r, "MODE"),
          channel: o ? parseInt(o, 10) : null,
          frequency: a ? parseInt(a, 10) : null,
          signalLevel: _r(f),
          quality: f ? parseInt(f, 10) : null,
          security: c && c !== "none" ? c.split(" ") : [],
          wpaFlags: u && u !== "none" ? u.split(" ") : [],
          rsnFlags: l && l !== "none" ? l.split(" ") : [],
        });
      }),
      t
    );
  } catch {
    return [];
  }
}
function os(t) {
  const n = [];
  try {
    let e = Lt(
      `export LC_ALL=C; iwlist ${t} scan 2>&1; unset LC_ALL`,
      E.execOptsLinux,
    )
      .toString()
      .split("        Cell ");
    return e[0].indexOf("resource busy") >= 0
      ? -1
      : (e.length > 1 &&
          (e.shift(),
          e.forEach((i) => {
            const s = i.split(`
`),
              r = E.getValue(s, "channel", ":", !0),
              o =
                s && s.length && s[0].indexOf("Address:") >= 0
                  ? s[0].split("Address:")[1].trim().toLowerCase()
                  : "",
              a = E.getValue(s, "mode", ":", !0),
              c = E.getValue(s, "frequency", ":", !0),
              l = E.getValue(s, "Quality", "=", !0)
                .toLowerCase()
                .split("signal level="),
              f = l.length > 1 ? E.toInt(l[1]) : 0,
              p = f ? di(f) : 0,
              d = E.getValue(s, "essid", ":", !0),
              m = i.indexOf(" WPA ") >= 0,
              h = i.indexOf("WPA2 ") >= 0,
              y = [];
            (m && y.push("WPA"), h && y.push("WPA2"));
            const g = [];
            let x = "";
            (s.forEach(function (S) {
              const w = S.trim().toLowerCase();
              if (w.indexOf("group cipher") >= 0) {
                x && g.push(x);
                const C = w.split(":");
                C.length > 1 && (x = C[1].trim().toUpperCase());
              }
              if (w.indexOf("pairwise cipher") >= 0) {
                const C = w.split(":");
                C.length > 1 &&
                  (C[1].indexOf("tkip")
                    ? (x = x ? "TKIP/" + x : "TKIP")
                    : C[1].indexOf("ccmp")
                      ? (x = x ? "CCMP/" + x : "CCMP")
                      : C[1].indexOf("proprietary") &&
                        (x = x ? "PROP/" + x : "PROP"));
              }
              if (w.indexOf("authentication suites") >= 0) {
                const C = w.split(":");
                C.length > 1 &&
                  (C[1].indexOf("802.1x")
                    ? (x = x ? "802.1x/" + x : "802.1x")
                    : C[1].indexOf("psk") && (x = x ? "PSK/" + x : "PSK"));
              }
            }),
              x && g.push(x),
              n.push({
                ssid: d,
                bssid: o,
                mode: a,
                channel: r ? E.toInt(r) : null,
                frequency: c ? E.toInt(c.replace(".", "")) : null,
                signalLevel: f,
                quality: p,
                security: y,
                wpaFlags: g,
                rsnFlags: [],
              }));
          })),
        n);
  } catch {
    return -1;
  }
}
function Bc(t) {
  const n = [];
  try {
    let e = JSON.parse(t);
    return (
      (e =
        e.SPAirPortDataType[0].spairport_airport_interfaces[0]
          .spairport_airport_other_local_wireless_networks),
      e.forEach(function (i) {
        let s = [];
        const r = i.spairport_security_mode || "";
        r === "spairport_security_mode_wep"
          ? s.push("WEP")
          : r === "spairport_security_mode_wpa2_personal"
            ? s.push("WPA2")
            : r.startsWith("spairport_security_mode_wpa2_enterprise")
              ? s.push("WPA2 EAP")
              : r.startsWith("pairport_security_mode_wpa3_transition")
                ? s.push("WPA2/WPA3")
                : r.startsWith("pairport_security_mode_wpa3") && s.push("WPA3");
        const o =
            parseInt(("" + i.spairport_network_channel).split(" ")[0]) || 0,
          a = i.spairport_signal_noise || null;
        n.push({
          ssid: i._name || "",
          bssid: i.spairport_network_bssid || null,
          mode: i.spairport_network_phymode,
          channel: o,
          frequency: Dn(o),
          signalLevel: a ? parseInt(a, 10) : null,
          quality: di(a),
          security: s,
          wpaFlags: [],
          rsnFlags: [],
        });
      }),
      n
    );
  } catch {
    return n;
  }
}
function kc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (Lr)
        if (((e = ho()), e.length === 0))
          try {
            const i = Lt(
              "export LC_ALL=C; iwconfig 2>/dev/null; unset LC_ALL",
              E.execOptsLinux,
            ).toString().split(`

`);
            let s = "";
            if (
              (i.forEach((r) => {
                r.indexOf("no wireless") === -1 &&
                  r.trim() !== "" &&
                  (s = r.split(" ")[0]);
              }),
              s)
            ) {
              let r = "";
              const o = E.isPrototypePolluted()
                  ? "---"
                  : E.sanitizeShellString(s, !0),
                a = E.mathMin(o.length, 2e3);
              for (let u = 0; u <= a; u++) o[u] !== void 0 && (r = r + o[u]);
              const c = os(r);
              c === -1
                ? setTimeout(function (u) {
                    const l = os(u);
                    (l != -1 && (e = l), t && t(e), n(e));
                  }, 4e3)
                : ((e = c), t && t(e), n(e));
            } else (t && t(e), n(e));
          } catch {
            (t && t(e), n(e));
          }
        else (t && t(e), n(e));
      else
        Ir
          ? Cr(
              "system_profiler SPAirPortDataType -json 2>/dev/null",
              { maxBuffer: 1024 * 4e4 },
              function (s, r) {
                ((e = Bc(r.toString())), t && t(e), n(e));
              },
            )
          : vr
            ? E.powerShell("netsh wlan show networks mode=Bssid").then((s) => {
                const r = s.toString("utf8").split(En.EOL + En.EOL + "SSID ");
                (r.shift(),
                  r.forEach((o) => {
                    const a = o.split(En.EOL);
                    if (a && a.length >= 8 && a[0].indexOf(":") >= 0) {
                      const c = o.split(" BSSID");
                      (c.shift(),
                        c.forEach((u) => {
                          const l = u.split(En.EOL),
                            f = l[0].split(":");
                          f.shift();
                          const p = f.join(":").trim().toLowerCase(),
                            d = l[3].split(":").pop().trim(),
                            m = l[1].split(":").pop().trim();
                          e.push({
                            ssid: a[0].split(":").pop().trim(),
                            bssid: p,
                            mode: "",
                            channel: d ? parseInt(d, 10) : null,
                            frequency: Dn(d),
                            signalLevel: _r(m),
                            quality: m ? parseInt(m, 10) : null,
                            security: [a[2].split(":").pop().trim()],
                            wpaFlags: [a[3].split(":").pop().trim()],
                            rsnFlags: [],
                          });
                        }));
                    }
                  }),
                  t && t(e),
                  n(e));
              })
            : (t && t(e), n(e));
    });
  });
}
Mi.wifiNetworks = kc;
function Fc(t) {
  t = t.toLowerCase();
  let n = "";
  return (
    t.indexOf("intel") >= 0
      ? (n = "Intel")
      : t.indexOf("realtek") >= 0
        ? (n = "Realtek")
        : t.indexOf("qualcom") >= 0
          ? (n = "Qualcom")
          : t.indexOf("broadcom") >= 0
            ? (n = "Broadcom")
            : t.indexOf("cavium") >= 0
              ? (n = "Cavium")
              : t.indexOf("cisco") >= 0
                ? (n = "Cisco")
                : t.indexOf("marvel") >= 0
                  ? (n = "Marvel")
                  : t.indexOf("zyxel") >= 0
                    ? (n = "Zyxel")
                    : t.indexOf("melanox") >= 0
                      ? (n = "Melanox")
                      : t.indexOf("d-link") >= 0
                        ? (n = "D-Link")
                        : t.indexOf("tp-link") >= 0
                          ? (n = "TP-Link")
                          : t.indexOf("asus") >= 0
                            ? (n = "Asus")
                            : t.indexOf("linksys") >= 0 && (n = "Linksys"),
    n
  );
}
function Wc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      const e = [];
      if (Lr) {
        const i = fo(),
          s = ho();
        (i.forEach((r) => {
          let o = "";
          const a = E.isPrototypePolluted()
              ? "---"
              : E.sanitizeShellString(r.iface, !0),
            c = E.mathMin(a.length, 2e3);
          for (let w = 0; w <= c; w++) a[w] !== void 0 && (o = o + a[w]);
          const u = mo(o),
            l = Nc(o),
            f = u.ssid || l.ssid,
            p = s.filter((w) => w.ssid === f);
          let d = "";
          const m = E.isPrototypePolluted()
              ? "---"
              : E.sanitizeShellString(f, !0),
            h = E.mathMin(m.length, 32);
          for (let w = 0; w <= h; w++) m[w] !== void 0 && (d = d + m[w]);
          const y = Vc(d),
            g =
              p && p.length && p[0].channel
                ? p[0].channel
                : l.channel
                  ? l.channel
                  : null,
            x =
              p && p.length && p[0].bssid
                ? p[0].bssid
                : l.bssid
                  ? l.bssid
                  : null,
            S = p && p.length && p[0].signalLevel ? p[0].signalLevel : null;
          f &&
            x &&
            e.push({
              id: r.id,
              iface: r.iface,
              model: u.product,
              ssid: f,
              bssid:
                p && p.length && p[0].bssid
                  ? p[0].bssid
                  : l.bssid
                    ? l.bssid
                    : null,
              channel: g,
              frequency: g ? Dn(g) : null,
              type: y.type ? y.type : "802.11",
              security: y.security
                ? y.security
                : l.security
                  ? l.security
                  : null,
              signalLevel: S,
              quality: di(S),
              txRate: null,
            });
        }),
          t && t(e),
          n(e));
      } else
        Ir
          ? Cr(
              'system_profiler SPNetworkDataType SPAirPortDataType -xml 2>/dev/null; echo "######" ; ioreg -n AppleBCMWLANSkywalkInterface -r 2>/dev/null',
              function (s, r) {
                try {
                  const o = r.toString().split("######"),
                    a = E.plistParser(o[0]),
                    c =
                      a[0]._SPCommandLineArguments.indexOf(
                        "SPNetworkDataType",
                      ) >= 0
                        ? a[0]._items
                        : a[1]._items,
                    u =
                      a[0]._SPCommandLineArguments.indexOf(
                        "SPAirPortDataType",
                      ) >= 0
                        ? a[0]._items[0].spairport_airport_interfaces
                        : a[1]._items[0].spairport_airport_interfaces;
                  let l = [];
                  o[1].indexOf("  | {") > 0 &&
                    o[1].indexOf("  | }") > o[1].indexOf("  | {") &&
                    (l = o[1]
                      .split("  | {")[1]
                      .split("  | }")[0]
                      .replace(/ \| /g, "")
                      .replace(/"/g, "").split(`
`));
                  const f = c.find((g) => g._name === "Wi-Fi"),
                    p = u[0].spairport_current_network_information,
                    d =
                      parseInt(
                        ("" + p.spairport_network_channel).split(" ")[0],
                      ) || 0,
                    m = p.spairport_signal_noise || null;
                  let h = [];
                  const y = p.spairport_security_mode || "";
                  (y === "spairport_security_mode_wep"
                    ? h.push("WEP")
                    : y === "spairport_security_mode_wpa2_personal"
                      ? h.push("WPA2")
                      : y.startsWith("spairport_security_mode_wpa2_enterprise")
                        ? h.push("WPA2 EAP")
                        : y.startsWith("pairport_security_mode_wpa3_transition")
                          ? h.push("WPA2/WPA3")
                          : y.startsWith("pairport_security_mode_wpa3") &&
                            h.push("WPA3"),
                    e.push({
                      id: f._name || "Wi-Fi",
                      iface: f.interface || "",
                      model: f.hardware || "",
                      ssid: p._name || "",
                      bssid: p.spairport_network_bssid || "",
                      channel: d,
                      frequency: d ? Dn(d) : null,
                      type: p.spairport_network_phymode || "802.11",
                      security: h,
                      signalLevel: m ? parseInt(m, 10) : null,
                      quality: di(m),
                      txRate: p.spairport_network_rate || null,
                    }));
                } catch {
                  E.noop();
                }
                (t && t(e), n(e));
              },
            )
          : vr
            ? E.powerShell("netsh wlan show interfaces").then(function (s) {
                const r = s.toString().split(`\r
`);
                for (let a = 0; a < r.length; a++) r[a] = r[a].trim();
                const o = r.join(`\r
`).split(`:\r
\r
`);
                (o.shift(),
                  o.forEach((a) => {
                    const c = a.split(`\r
`);
                    if (c.length >= 5) {
                      const u =
                          c[0].indexOf(":") >= 0
                            ? c[0].split(":")[1].trim()
                            : "",
                        l =
                          c[1].indexOf(":") >= 0
                            ? c[1].split(":")[1].trim()
                            : "",
                        f =
                          c[2].indexOf(":") >= 0
                            ? c[2].split(":")[1].trim()
                            : "",
                        p = E.getValue(c, "SSID", ":", !0),
                        d =
                          E.getValue(c, "BSSID", ":", !0) ||
                          E.getValue(c, "AP BSSID", ":", !0),
                        m = E.getValue(c, "Signal", ":", !0),
                        h = _r(m),
                        y =
                          E.getValue(c, "Radio type", ":", !0) ||
                          E.getValue(c, "Type de radio", ":", !0) ||
                          E.getValue(c, "Funktyp", ":", !0) ||
                          null,
                        g =
                          E.getValue(c, "authentication", ":", !0) ||
                          E.getValue(c, "Authentification", ":", !0) ||
                          E.getValue(c, "Authentifizierung", ":", !0) ||
                          null,
                        x =
                          E.getValue(c, "Channel", ":", !0) ||
                          E.getValue(c, "Canal", ":", !0) ||
                          E.getValue(c, "Kanal", ":", !0) ||
                          null,
                        S =
                          E.getValue(c, "Transmit rate (mbps)", ":", !0) ||
                          E.getValue(c, "Transmission (mbit/s)", ":", !0) ||
                          E.getValue(c, "Empfangsrate (MBit/s)", ":", !0) ||
                          null;
                      l &&
                        f &&
                        p &&
                        d &&
                        e.push({
                          id: f,
                          iface: u,
                          model: l,
                          ssid: p,
                          bssid: d,
                          channel: E.toInt(x),
                          frequency: x ? Dn(x) : null,
                          type: y,
                          security: g,
                          signalLevel: h,
                          quality: m ? parseInt(m, 10) : null,
                          txRate: E.toInt(S) || null,
                        });
                    }
                  }),
                  t && t(e),
                  n(e));
              })
            : (t && t(e), n(e));
    });
  });
}
Mi.wifiConnections = Wc;
function Rc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      const e = [];
      Lr
        ? (fo().forEach((s) => {
            const r = mo(s.iface);
            e.push({
              id: s.id,
              iface: s.iface,
              model: r.product ? r.product : null,
              vendor: r.vendor ? r.vendor : null,
              mac: s.mac,
            });
          }),
          t && t(e),
          n(e))
        : Ir
          ? Cr("system_profiler SPNetworkDataType", function (s, r) {
              const o = r.toString().split(`

    Wi-Fi:

`);
              if (o.length > 1) {
                const a = o[1].split(`

`)[0].split(`
`),
                  c = E.getValue(a, "BSD Device Name", ":", !0),
                  u = E.getValue(a, "MAC Address", ":", !0),
                  l = E.getValue(a, "hardware", ":", !0);
                e.push({
                  id: "Wi-Fi",
                  iface: c,
                  model: l,
                  vendor: "",
                  mac: u,
                });
              }
              (t && t(e), n(e));
            })
          : vr
            ? E.powerShell("netsh wlan show interfaces").then(function (s) {
                const r = s.toString().split(`\r
`);
                for (let a = 0; a < r.length; a++) r[a] = r[a].trim();
                const o = r.join(`\r
`).split(`:\r
\r
`);
                (o.shift(),
                  o.forEach((a) => {
                    const c = a.split(`\r
`);
                    if (c.length >= 5) {
                      const u =
                          c[0].indexOf(":") >= 0
                            ? c[0].split(":")[1].trim()
                            : "",
                        l =
                          c[1].indexOf(":") >= 0
                            ? c[1].split(":")[1].trim()
                            : "",
                        f =
                          c[2].indexOf(":") >= 0
                            ? c[2].split(":")[1].trim()
                            : "",
                        p = c[3].indexOf(":") >= 0 ? c[3].split(":") : [];
                      p.shift();
                      const d = p.join(":").trim(),
                        m = Fc(l);
                      u &&
                        l &&
                        f &&
                        d &&
                        e.push({
                          id: f,
                          iface: u,
                          model: l,
                          vendor: m,
                          mac: d,
                        });
                    }
                  }),
                  t && t(e),
                  n(e));
              })
            : (t && t(e), n(e));
    });
  });
}
Mi.wifiInterfaces = Rc;
var Ai = {};
const mi = Pe,
  Gc = Ae,
  $c = ce,
  bn = se.exec,
  zi = se.execSync,
  R = V;
let It = process.platform;
const Ke = It === "linux" || It === "android",
  Rt = It === "darwin",
  Or = It === "win32",
  Nn = It === "freebsd",
  Bn = It === "openbsd",
  kn = It === "netbsd",
  Zn = It === "sunos",
  fe = {
    all: 0,
    all_utime: 0,
    all_stime: 0,
    list: {},
    ms: 0,
    result: {},
  },
  nn = {
    all: 0,
    list: {},
    ms: 0,
    result: {},
  },
  Oe = {
    all: 0,
    all_utime: 0,
    all_stime: 0,
    list: {},
    ms: 0,
    result: {},
  },
  as = {
    0: "unknown",
    1: "other",
    2: "ready",
    3: "running",
    4: "blocked",
    5: "suspended blocked",
    6: "suspended ready",
    7: "terminated",
    8: "stopped",
    9: "growing",
  };
function zc(t) {
  let n = t,
    e = t.replace(/ +/g, " ").split(" ");
  return (
    e.length === 5 &&
      (n =
        e[4] +
        "-" +
        (
          "0" +
          ("JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC".indexOf(e[1].toUpperCase()) /
            3 +
            1)
        ).slice(-2) +
        "-" +
        ("0" + e[2]).slice(-2) +
        " " +
        e[3]),
    n
  );
}
function Uc(t) {
  let n = /* @__PURE__ */ new Date();
  n = new Date(n.getTime() - n.getTimezoneOffset() * 6e4);
  const e = t.split("-"),
    i = e.length - 1,
    s = i > 0 ? parseInt(e[i - 1]) : 0,
    r = e[i].split(":"),
    o = r.length === 3 ? parseInt(r[0] || 0) : 0,
    a = parseInt(r[r.length === 3 ? 1 : 0] || 0),
    c = parseInt(r[r.length === 3 ? 2 : 1] || 0),
    u = (((s * 24 + o) * 60 + a) * 60 + c) * 1e3;
  let l = new Date(n.getTime()),
    f =
      l.toISOString().substring(0, 10) +
      " " +
      l.toISOString().substring(11, 19);
  try {
    ((l = new Date(n.getTime() - u)),
      (f =
        l.toISOString().substring(0, 10) +
        " " +
        l.toISOString().substring(11, 19)));
  } catch {
    R.noop();
  }
  return f;
}
function Hc(t, n) {
  return (
    R.isFunction(t) && !n && ((n = t), (t = "")),
    new Promise((e) => {
      process.nextTick(() => {
        if (typeof t != "string") return (n && n([]), e([]));
        if (t) {
          let i = "";
          try {
            ((i.__proto__.toLowerCase = R.stringToLower),
              (i.__proto__.replace = R.stringReplace),
              (i.__proto__.toString = R.stringToString),
              (i.__proto__.substr = R.stringSubstr),
              (i.__proto__.substring = R.stringSubstring),
              (i.__proto__.trim = R.stringTrim),
              (i.__proto__.startsWith = R.stringStartWith));
          } catch {
            Object.setPrototypeOf(i, R.stringObj);
          }
          const s = R.sanitizeShellString(t),
            r = R.mathMin(s.length, 2e3);
          for (let u = 0; u <= r; u++) s[u] !== void 0 && (i = i + s[u]);
          ((i = i.trim().toLowerCase().replace(/, /g, "|").replace(/,+/g, "|")),
            i === "" && (i = "*"),
            R.isPrototypePolluted() && i !== "*" && (i = "------"));
          let o = i.split("|"),
            a = [],
            c = [];
          if (Ke || Nn || Bn || kn || Rt) {
            if ((Ke || Nn || Bn || kn) && i === "*")
              try {
                const l = zi(
                  "systemctl --all --type=service --no-legend 2> /dev/null",
                  R.execOptsLinux,
                ).toString().split(`
`);
                o = [];
                for (const f of l) {
                  const p = f.split(".service")[0];
                  p && f.indexOf(" not-found ") === -1 && o.push(p.trim());
                }
                i = o.join("|");
              } catch {
                try {
                  i = "";
                  const f = zi(
                    "service --status-all 2> /dev/null",
                    R.execOptsLinux,
                  ).toString().split(`
`);
                  for (const p of f) {
                    const d = p.split("]");
                    d.length === 2 &&
                      (i += (i !== "" ? "|" : "") + d[1].trim());
                  }
                  o = i.split("|");
                } catch {
                  try {
                    const p = zi(
                      "ls /etc/init.d/ -m 2> /dev/null",
                      R.execOptsLinux,
                    )
                      .toString()
                      .split(
                        `
`,
                      )
                      .join("");
                    if (((i = ""), p)) {
                      const d = p.split(",");
                      for (const m of d) {
                        const h = m.trim();
                        h && (i += (i !== "" ? "|" : "") + h);
                      }
                      o = i.split("|");
                    }
                  } catch {
                    ((i = ""), (o = []));
                  }
                }
              }
            Rt && i === "*" && (n && n(a), e(a));
            let u = Rt
              ? ["-caxo", "pcpu,pmem,pid,command"]
              : ["-axo", "pcpu,pmem,pid,command"];
            i !== "" && o.length > 0
              ? R.execSafe("ps", u).then((l) => {
                  if (l) {
                    let f = l.replace(/ +/g, " ").replace(/,+/g, ".").split(`
`);
                    if (
                      (o.forEach(function (p) {
                        let d;
                        Rt
                          ? (d = f.filter(function (h) {
                              return h.toLowerCase().indexOf(p) !== -1;
                            }))
                          : (d = f.filter(function (h) {
                              return (
                                h
                                  .toLowerCase()
                                  .indexOf(" " + p.toLowerCase() + ":") !==
                                  -1 ||
                                h
                                  .toLowerCase()
                                  .indexOf("(" + p.toLowerCase() + " ") !==
                                  -1 ||
                                h
                                  .toLowerCase()
                                  .indexOf("(" + p.toLowerCase() + ")") !==
                                  -1 ||
                                h
                                  .toLowerCase()
                                  .indexOf(
                                    " " +
                                      p.toLowerCase().replace(/[0-9.]/g, "") +
                                      ":",
                                  ) !== -1 ||
                                h
                                  .toLowerCase()
                                  .indexOf("/" + p.toLowerCase()) !== -1
                              );
                            }));
                        const m = [];
                        for (const h of d) {
                          const y = h.trim().split(" ")[2];
                          y && m.push(parseInt(y, 10));
                        }
                        a.push({
                          name: p,
                          running: d.length > 0,
                          startmode: "",
                          pids: m,
                          cpu: parseFloat(
                            d
                              .reduce(function (h, y) {
                                return h + parseFloat(y.trim().split(" ")[0]);
                              }, 0)
                              .toFixed(2),
                          ),
                          mem: parseFloat(
                            d
                              .reduce(function (h, y) {
                                return h + parseFloat(y.trim().split(" ")[1]);
                              }, 0)
                              .toFixed(2),
                          ),
                        });
                      }),
                      Ke)
                    ) {
                      let p = 'cat /proc/stat | grep "cpu "';
                      for (let d in a)
                        for (let m in a[d].pids)
                          p += ";cat /proc/" + a[d].pids[m] + "/stat";
                      bn(p, { maxBuffer: 1024 * 2e4 }, function (d, m) {
                        let h = m.toString().split(`
`),
                          y = Pr(h.shift()),
                          g = {},
                          x = {};
                        (h.forEach((S) => {
                          if (((x = Er(S, y, nn)), x.pid)) {
                            let w = -1;
                            for (let C in a)
                              for (let W in a[C].pids)
                                parseInt(a[C].pids[W]) === parseInt(x.pid) &&
                                  (w = C);
                            (w >= 0 && (a[w].cpu += x.cpuu + x.cpus),
                              (g[x.pid] = {
                                cpuu: x.cpuu,
                                cpus: x.cpus,
                                utime: x.utime,
                                stime: x.stime,
                                cutime: x.cutime,
                                cstime: x.cstime,
                              }));
                          }
                        }),
                          (nn.all = y),
                          (nn.list = Object.assign({}, g)),
                          (nn.ms = Date.now() - nn.ms),
                          (nn.result = Object.assign({}, a)),
                          n && n(a),
                          e(a));
                      });
                    } else (n && n(a), e(a));
                  } else
                    ((u = ["-o", "comm"]),
                      R.execSafe("ps", u).then((f) => {
                        if (f) {
                          let p = f.replace(/ +/g, " ").replace(/,+/g, ".")
                            .split(`
`);
                          (o.forEach(function (d) {
                            let m = p.filter(function (h) {
                              return h.indexOf(d) !== -1;
                            });
                            a.push({
                              name: d,
                              running: m.length > 0,
                              startmode: "",
                              cpu: 0,
                              mem: 0,
                            });
                          }),
                            n && n(a),
                            e(a));
                        } else
                          (o.forEach(function (p) {
                            a.push({
                              name: p,
                              running: !1,
                              startmode: "",
                              cpu: 0,
                              mem: 0,
                            });
                          }),
                            n && n(a),
                            e(a));
                      }));
                })
              : (n && n(a), e(a));
          }
          if (Or)
            try {
              let u = "Get-CimInstance Win32_Service";
              (o[0] !== "*" &&
                ((u += ' -Filter "'),
                o.forEach((l) => {
                  u += `Name='${l}' or `;
                }),
                (u = `${u.slice(0, -4)}"`)),
                (u +=
                  " | select Name,Caption,Started,StartMode,ProcessId | fl"),
                R.powerShell(u).then((l, f) => {
                  f
                    ? (o.forEach(function (p) {
                        a.push({
                          name: p,
                          running: !1,
                          startmode: "",
                          cpu: 0,
                          mem: 0,
                        });
                      }),
                      n && n(a),
                      e(a))
                    : (l.split(/\n\s*\n/).forEach((d) => {
                        if (d.trim() !== "") {
                          let m = d.trim().split(`\r
`),
                            h = R.getValue(m, "Name", ":", !0).toLowerCase(),
                            y = R.getValue(m, "Caption", ":", !0).toLowerCase(),
                            g = R.getValue(m, "Started", ":", !0),
                            x = R.getValue(m, "StartMode", ":", !0),
                            S = R.getValue(m, "ProcessId", ":", !0);
                          (i === "*" ||
                            o.indexOf(h) >= 0 ||
                            o.indexOf(y) >= 0) &&
                            (a.push({
                              name: h,
                              running: g.toLowerCase() === "true",
                              startmode: x,
                              pids: [S],
                              cpu: 0,
                              mem: 0,
                            }),
                            c.push(h),
                            c.push(y));
                        }
                      }),
                      i !== "*" &&
                        o
                          .filter(function (m) {
                            return c.indexOf(m) === -1;
                          })
                          .forEach(function (m) {
                            a.push({
                              name: m,
                              running: !1,
                              startmode: "",
                              pids: [],
                              cpu: 0,
                              mem: 0,
                            });
                          }),
                      n && n(a),
                      e(a));
                }));
            } catch {
              (n && n(a), e(a));
            }
        } else (n && n([]), e([]));
      });
    })
  );
}
Ai.services = Hc;
function Pr(t) {
  let n = t.replace(/ +/g, " ").split(" "),
    e = n.length >= 2 ? parseInt(n[1]) : 0,
    i = n.length >= 3 ? parseInt(n[2]) : 0,
    s = n.length >= 4 ? parseInt(n[3]) : 0,
    r = n.length >= 5 ? parseInt(n[4]) : 0,
    o = n.length >= 6 ? parseInt(n[5]) : 0,
    a = n.length >= 7 ? parseInt(n[6]) : 0,
    c = n.length >= 8 ? parseInt(n[7]) : 0,
    u = n.length >= 9 ? parseInt(n[8]) : 0,
    l = n.length >= 10 ? parseInt(n[9]) : 0,
    f = n.length >= 11 ? parseInt(n[10]) : 0;
  return e + i + s + r + o + a + c + u + l + f;
}
function Er(t, n, e) {
  let i = t.replace(/ +/g, " ").split(")");
  if (i.length >= 2) {
    let s = i[1].split(" ");
    if (s.length >= 16) {
      let r = parseInt(i[0].split(" ")[0]),
        o = parseInt(s[12]),
        a = parseInt(s[13]),
        c = parseInt(s[14]),
        u = parseInt(s[15]),
        l = 0,
        f = 0;
      return (
        e.all > 0 && e.list[r]
          ? ((l =
              ((o + c - e.list[r].utime - e.list[r].cutime) / (n - e.all)) *
              100),
            (f =
              ((a + u - e.list[r].stime - e.list[r].cstime) / (n - e.all)) *
              100))
          : ((l = ((o + c) / n) * 100), (f = ((a + u) / n) * 100)),
        {
          pid: r,
          utime: o,
          stime: a,
          cutime: c,
          cstime: u,
          cpuu: l,
          cpus: f,
        }
      );
    } else
      return {
        pid: 0,
        utime: 0,
        stime: 0,
        cutime: 0,
        cstime: 0,
        cpuu: 0,
        cpus: 0,
      };
  } else
    return {
      pid: 0,
      utime: 0,
      stime: 0,
      cutime: 0,
      cstime: 0,
      cpuu: 0,
      cpus: 0,
    };
}
function go(t, n, e) {
  let i = 0,
    s = 0;
  return (
    e.all > 0 && e.list[t.pid]
      ? ((i = ((t.utime - e.list[t.pid].utime) / (n - e.all)) * 100),
        (s = ((t.stime - e.list[t.pid].stime) / (n - e.all)) * 100))
      : ((i = (t.utime / n) * 100), (s = (t.stime / n) * 100)),
    {
      pid: t.pid,
      utime: t.utime,
      stime: t.stime,
      cpuu: i > 0 ? i : 0,
      cpus: s > 0 ? s : 0,
    }
  );
}
function jc(t) {
  let n = [];
  function e(o) {
    o = o || "";
    let a = o.split(" ")[0];
    if (
      (a.substr(-1) === ":" && (a = a.substr(0, a.length - 1)),
      a.substr(0, 1) !== "[")
    ) {
      let c = a.split("/");
      isNaN(parseInt(c[c.length - 1])) ? (a = c[c.length - 1]) : (a = c[0]);
    }
    return a;
  }
  function i(o) {
    let a = 0,
      c = 0;
    function u(D) {
      ((a = c),
        n[D] ? (c = o.substring(n[D].to + a, 1e4).indexOf(" ")) : (c = 1e4));
    }
    u(0);
    const l = parseInt(o.substring(n[0].from + a, n[0].to + c));
    u(1);
    const f = parseInt(o.substring(n[1].from + a, n[1].to + c));
    u(2);
    const p = parseFloat(
      o.substring(n[2].from + a, n[2].to + c).replace(/,/g, "."),
    );
    u(3);
    const d = parseFloat(
      o.substring(n[3].from + a, n[3].to + c).replace(/,/g, "."),
    );
    u(4);
    const m = parseInt(o.substring(n[4].from + a, n[4].to + c));
    u(5);
    const h = parseInt(o.substring(n[5].from + a, n[5].to + c));
    u(6);
    const y = parseInt(o.substring(n[6].from + a, n[6].to + c));
    u(7);
    const g = parseInt(o.substring(n[7].from + a, n[7].to + c)) || 0;
    u(8);
    const x = Zn
      ? zc(o.substring(n[8].from + a, n[8].to + c).trim())
      : Uc(o.substring(n[8].from + a, n[8].to + c).trim());
    u(9);
    let S = o.substring(n[9].from + a, n[9].to + c).trim();
    ((S =
      S[0] === "R"
        ? "running"
        : S[0] === "S"
          ? "sleeping"
          : S[0] === "T"
            ? "stopped"
            : S[0] === "W"
              ? "paging"
              : S[0] === "X"
                ? "dead"
                : S[0] === "Z"
                  ? "zombie"
                  : S[0] === "D" || S[0] === "U"
                    ? "blocked"
                    : "unknown"),
      u(10));
    let w = o.substring(n[10].from + a, n[10].to + c).trim();
    ((w === "?" || w === "??") && (w = ""), u(11));
    const C = o.substring(n[11].from + a, n[11].to + c).trim();
    u(12);
    let W = "",
      T = "",
      K = "",
      L = o.substring(n[12].from + a, n[12].to + c).trim();
    if (
      (L.substr(L.length - 1) === "]" && (L = L.slice(0, -1)),
      L.substr(0, 1) === "[")
    )
      T = L.substring(1);
    else {
      const D = L.indexOf("("),
        O = L.indexOf(")"),
        X = L.indexOf("/"),
        Q = L.indexOf(":");
      if (D < O && D < X && X < O)
        ((T = L.split(" ")[0]), (T = T.replace(/:/g, "")));
      else if (Q > 0 && (X === -1 || X > 3))
        ((T = L.split(" ")[0]), (T = T.replace(/:/g, "")));
      else {
        let ee = L.indexOf(" -"),
          F = L.indexOf(" /");
        ((ee = ee >= 0 ? ee : 1e4), (F = F >= 0 ? F : 1e4));
        const Y = Math.min(ee, F);
        let N = L.substr(0, Y);
        const H = L.substr(Y),
          b = N.lastIndexOf("/");
        if (
          (b >= 0 && ((W = N.substr(0, b)), (N = N.substr(b + 1))),
          Y === 1e4 && N.indexOf(" ") > -1)
        ) {
          const $ = N.split(" ");
          Gc.existsSync($c.join(W, $[0]))
            ? ((T = $.shift()), (K = ($.join(" ") + " " + H).trim()))
            : ((T = N.trim()), (K = H.trim()));
        } else ((T = N.trim()), (K = H.trim()));
      }
    }
    return {
      pid: l,
      parentPid: f,
      name: Ke ? e(T) : T,
      cpu: p,
      cpuu: 0,
      cpus: 0,
      mem: d,
      priority: m,
      memVsz: h,
      memRss: y,
      nice: g,
      started: x,
      state: S,
      tty: w,
      user: C,
      command: T,
      params: K,
      path: W,
    };
  }
  function s(o) {
    let a = [];
    if (o.length > 1) {
      let c = o[0];
      ((n = R.parseHead(c, 8)),
        o.shift(),
        o.forEach(function (u) {
          u.trim() !== "" && a.push(i(u));
        }));
    }
    return a;
  }
  function r(o) {
    function a(l) {
      const f = ("0" + (l.getMonth() + 1).toString()).slice(-2),
        p = l.getFullYear().toString(),
        d = ("0" + l.getDate().toString()).slice(-2),
        m = ("0" + l.getHours().toString()).slice(-2),
        h = ("0" + l.getMinutes().toString()).slice(-2),
        y = ("0" + l.getSeconds().toString()).slice(-2);
      return p + "-" + f + "-" + d + " " + m + ":" + h + ":" + y;
    }
    function c(l) {
      let f = "";
      if (l.indexOf("d") >= 0) {
        const p = l.split("d");
        f = a(new Date(Date.now() - (p[0] * 24 + p[1] * 1) * 60 * 60 * 1e3));
      } else if (l.indexOf("h") >= 0) {
        const p = l.split("h");
        f = a(new Date(Date.now() - (p[0] * 60 + p[1] * 1) * 60 * 1e3));
      } else if (l.indexOf(":") >= 0) {
        const p = l.split(":");
        f = a(
          new Date(
            Date.now() - (p.length > 1 ? (p[0] * 60 + p[1]) * 1e3 : p[0] * 1e3),
          ),
        );
      }
      return f;
    }
    let u = [];
    return (
      o.forEach(function (l) {
        if (l.trim() !== "") {
          l = l.trim().replace(/ +/g, " ").replace(/,+/g, ".");
          const f = l.split(" "),
            p = f.slice(9).join(" "),
            d = parseFloat(
              ((1 * parseInt(f[3]) * 1024) / mi.totalmem()).toFixed(1),
            ),
            m = c(f[5]);
          u.push({
            pid: parseInt(f[0]),
            parentPid: parseInt(f[1]),
            name: e(p),
            cpu: 0,
            cpuu: 0,
            cpus: 0,
            mem: d,
            priority: 0,
            memVsz: parseInt(f[2]),
            memRss: parseInt(f[3]),
            nice: parseInt(f[4]),
            started: m,
            state:
              f[6] === "R"
                ? "running"
                : f[6] === "S"
                  ? "sleeping"
                  : f[6] === "T"
                    ? "stopped"
                    : f[6] === "W"
                      ? "paging"
                      : f[6] === "X"
                        ? "dead"
                        : f[6] === "Z"
                          ? "zombie"
                          : f[6] === "D" || f[6] === "U"
                            ? "blocked"
                            : "unknown",
            tty: f[7],
            user: f[8],
            command: p,
          });
        }
      }),
      u
    );
  }
  return new Promise((o) => {
    process.nextTick(() => {
      let a = {
          all: 0,
          running: 0,
          blocked: 0,
          sleeping: 0,
          unknown: 0,
          list: [],
        },
        c = "";
      if ((fe.ms && Date.now() - fe.ms >= 500) || fe.ms === 0)
        if (Ke || Nn || Bn || kn || Rt || Zn)
          (Ke &&
            (c =
              "export LC_ALL=C; ps -axo pid:11,ppid:11,pcpu:6,pmem:6,pri:5,vsz:11,rss:11,ni:5,etime:30,state:5,tty:15,user:20,command; unset LC_ALL"),
            (Nn || Bn || kn) &&
              (c =
                "export LC_ALL=C; ps -axo pid,ppid,pcpu,pmem,pri,vsz,rss,ni,etime,state,tty,user,command; unset LC_ALL"),
            Rt &&
              (c =
                "ps -axo pid,ppid,pcpu,pmem,pri,vsz=temp_title_1,rss=temp_title_2,nice,etime=temp_title_3,state,tty,user,command -r"),
            Zn &&
              (c =
                "ps -Ao pid,ppid,pcpu,pmem,pri,vsz,rss,nice,stime,s,tty,user,comm"),
            bn(c, { maxBuffer: 1024 * 2e4 }, function (u, l) {
              !u && l.toString().trim()
                ? ((a.list = s(
                    l.toString().split(`
`),
                  ).slice()),
                  (a.all = a.list.length),
                  (a.running = a.list.filter(function (f) {
                    return f.state === "running";
                  }).length),
                  (a.blocked = a.list.filter(function (f) {
                    return f.state === "blocked";
                  }).length),
                  (a.sleeping = a.list.filter(function (f) {
                    return f.state === "sleeping";
                  }).length),
                  Ke
                    ? ((c = 'cat /proc/stat | grep "cpu "'),
                      a.list.forEach((f) => {
                        c += ";cat /proc/" + f.pid + "/stat";
                      }),
                      bn(c, { maxBuffer: 1024 * 2e4 }, function (f, p) {
                        let d = p.toString().split(`
`),
                          m = Pr(d.shift()),
                          h = {},
                          y = {};
                        (d.forEach((g) => {
                          if (((y = Er(g, m, fe)), y.pid)) {
                            let x = a.list
                              .map(function (S) {
                                return S.pid;
                              })
                              .indexOf(y.pid);
                            (x >= 0 &&
                              ((a.list[x].cpu = y.cpuu + y.cpus),
                              (a.list[x].cpuu = y.cpuu),
                              (a.list[x].cpus = y.cpus)),
                              (h[y.pid] = {
                                cpuu: y.cpuu,
                                cpus: y.cpus,
                                utime: y.utime,
                                stime: y.stime,
                                cutime: y.cutime,
                                cstime: y.cstime,
                              }));
                          }
                        }),
                          (fe.all = m),
                          (fe.list = Object.assign({}, h)),
                          (fe.ms = Date.now() - fe.ms),
                          (fe.result = Object.assign({}, a)),
                          t && t(a),
                          o(a));
                      }))
                    : (t && t(a), o(a)))
                : ((c = "ps -o pid,ppid,vsz,rss,nice,etime,stat,tty,user,comm"),
                  Zn &&
                    (c = "ps -o pid,ppid,vsz,rss,nice,etime,s,tty,user,comm"),
                  bn(c, { maxBuffer: 1024 * 2e4 }, function (f, p) {
                    if (f) (t && t(a), o(a));
                    else {
                      let d = p.toString().split(`
`);
                      (d.shift(),
                        (a.list = r(d).slice()),
                        (a.all = a.list.length),
                        (a.running = a.list.filter(function (m) {
                          return m.state === "running";
                        }).length),
                        (a.blocked = a.list.filter(function (m) {
                          return m.state === "blocked";
                        }).length),
                        (a.sleeping = a.list.filter(function (m) {
                          return m.state === "sleeping";
                        }).length),
                        t && t(a),
                        o(a));
                    }
                  }));
            }));
        else if (Or)
          try {
            R.powerShell(
              'Get-CimInstance Win32_Process | select-Object ProcessId,ParentProcessId,ExecutionState,Caption,CommandLine,ExecutablePath,UserModeTime,KernelModeTime,WorkingSetSize,Priority,PageFileUsage, @{n="CreationDate";e={$_.CreationDate.ToString("yyyy-MM-dd HH:mm:ss")}} | fl',
            ).then((u, l) => {
              if (!l) {
                let f = u.split(/\n\s*\n/),
                  p = [],
                  d = [],
                  m = {},
                  h = 0,
                  y = 0;
                (f.forEach((g) => {
                  if (g.trim() !== "") {
                    let x = g.trim().split(`\r
`),
                      S = parseInt(R.getValue(x, "ProcessId", ":", !0), 10),
                      w = parseInt(
                        R.getValue(x, "ParentProcessId", ":", !0),
                        10,
                      ),
                      C = R.getValue(x, "ExecutionState", ":"),
                      W = R.getValue(x, "Caption", ":", !0),
                      T = R.getValue(x, "CommandLine", ":", !0),
                      K = !1;
                    x.forEach((Q) => {
                      (K && Q.toLowerCase().startsWith(" ")
                        ? (T += " " + Q.trim())
                        : (K = !1),
                        Q.toLowerCase().startsWith("commandline") && (K = !0));
                    });
                    let L = R.getValue(x, "ExecutablePath", ":", !0),
                      D = parseInt(R.getValue(x, "UserModeTime", ":", !0), 10),
                      O = parseInt(
                        R.getValue(x, "KernelModeTime", ":", !0),
                        10,
                      ),
                      X = parseInt(
                        R.getValue(x, "WorkingSetSize", ":", !0),
                        10,
                      );
                    ((h = h + D),
                      (y = y + O),
                      a.all++,
                      C || a.unknown++,
                      C === "3" && a.running++,
                      (C === "4" || C === "5") && a.blocked++,
                      d.push({
                        pid: S,
                        utime: D,
                        stime: O,
                        cpu: 0,
                        cpuu: 0,
                        cpus: 0,
                      }),
                      p.push({
                        pid: S,
                        parentPid: w,
                        name: W,
                        cpu: 0,
                        cpuu: 0,
                        cpus: 0,
                        mem: (X / mi.totalmem()) * 100,
                        priority: parseInt(
                          R.getValue(x, "Priority", ":", !0),
                          10,
                        ),
                        memVsz: parseInt(
                          R.getValue(x, "PageFileUsage", ":", !0),
                          10,
                        ),
                        memRss: Math.floor(
                          parseInt(
                            R.getValue(x, "WorkingSetSize", ":", !0),
                            10,
                          ) / 1024,
                        ),
                        nice: 0,
                        started: R.getValue(x, "CreationDate", ":", !0),
                        state: C ? as[C] : as[0],
                        tty: "",
                        user: "",
                        command: T || W,
                        path: L,
                        params: "",
                      }));
                  }
                }),
                  (a.sleeping = a.all - a.running - a.blocked - a.unknown),
                  (a.list = p),
                  d.forEach((g) => {
                    let x = go(g, h + y, fe),
                      S = a.list
                        .map(function (w) {
                          return w.pid;
                        })
                        .indexOf(x.pid);
                    (S >= 0 &&
                      ((a.list[S].cpu = x.cpuu + x.cpus),
                      (a.list[S].cpuu = x.cpuu),
                      (a.list[S].cpus = x.cpus)),
                      (m[x.pid] = {
                        cpuu: x.cpuu,
                        cpus: x.cpus,
                        utime: x.utime,
                        stime: x.stime,
                      }));
                  }),
                  (fe.all = h + y),
                  (fe.all_utime = h),
                  (fe.all_stime = y),
                  (fe.list = Object.assign({}, m)),
                  (fe.ms = Date.now() - fe.ms),
                  (fe.result = Object.assign({}, a)));
              }
              (t && t(a), o(a));
            });
          } catch {
            (t && t(a), o(a));
          }
        else (t && t(a), o(a));
      else (t && t(fe.result), o(fe.result));
    });
  });
}
Ai.processes = jc;
function Kc(t, n) {
  return (
    R.isFunction(t) && !n && ((n = t), (t = "")),
    new Promise((e) => {
      process.nextTick(() => {
        if (((t = t || ""), typeof t != "string")) return (n && n([]), e([]));
        let i = "";
        try {
          ((i.__proto__.toLowerCase = R.stringToLower),
            (i.__proto__.replace = R.stringReplace),
            (i.__proto__.toString = R.stringToString),
            (i.__proto__.substr = R.stringSubstr),
            (i.__proto__.substring = R.stringSubstring),
            (i.__proto__.trim = R.stringTrim),
            (i.__proto__.startsWith = R.stringStartWith));
        } catch {
          Object.setPrototypeOf(i, R.stringObj);
        }
        const s = R.sanitizeShellString(t),
          r = R.mathMin(s.length, 2e3);
        for (let u = 0; u <= r; u++) s[u] !== void 0 && (i = i + s[u]);
        ((i = i.trim().toLowerCase().replace(/, /g, "|").replace(/,+/g, "|")),
          i === "" && (i = "*"),
          R.isPrototypePolluted() && i !== "*" && (i = "------"));
        let o = i.split("|"),
          a = [];
        if (
          (R.isPrototypePolluted() ? "" : R.sanitizeShellString(t) || "*") &&
          o.length &&
          o[0] !== "------"
        ) {
          if (Or)
            try {
              R.powerShell(
                "Get-CimInstance Win32_Process | select ProcessId,Caption,UserModeTime,KernelModeTime,WorkingSetSize | fl",
              ).then((u, l) => {
                if (!l) {
                  let f = u.split(/\n\s*\n/),
                    p = [],
                    d = {},
                    m = 0,
                    h = 0;
                  (f.forEach((y) => {
                    if (y.trim() !== "") {
                      let g = y.trim().split(`\r
`),
                        x = parseInt(R.getValue(g, "ProcessId", ":", !0), 10),
                        S = R.getValue(g, "Caption", ":", !0),
                        w = parseInt(
                          R.getValue(g, "UserModeTime", ":", !0),
                          10,
                        ),
                        C = parseInt(
                          R.getValue(g, "KernelModeTime", ":", !0),
                          10,
                        ),
                        W = parseInt(
                          R.getValue(g, "WorkingSetSize", ":", !0),
                          10,
                        );
                      ((m = m + w),
                        (h = h + C),
                        p.push({
                          pid: x,
                          name: S,
                          utime: w,
                          stime: C,
                          cpu: 0,
                          cpuu: 0,
                          cpus: 0,
                          mem: W,
                        }));
                      let T = "",
                        K = !1;
                      if (
                        (o.forEach(function (L) {
                          S.toLowerCase().indexOf(L.toLowerCase()) >= 0 &&
                            !K &&
                            ((K = !0), (T = L));
                        }),
                        i === "*" || K)
                      ) {
                        let L = !1;
                        (a.forEach(function (D) {
                          D.proc.toLowerCase() === T.toLowerCase() &&
                            (D.pids.push(x),
                            (D.mem += (W / mi.totalmem()) * 100),
                            (L = !0));
                        }),
                          L ||
                            a.push({
                              proc: T,
                              pid: x,
                              pids: [x],
                              cpu: 0,
                              mem: (W / mi.totalmem()) * 100,
                            }));
                      }
                    }
                  }),
                    i !== "*" &&
                      o
                        .filter(function (g) {
                          return (
                            p.filter(function (x) {
                              return x.name.toLowerCase().indexOf(g) >= 0;
                            }).length === 0
                          );
                        })
                        .forEach(function (g) {
                          a.push({
                            proc: g,
                            pid: null,
                            pids: [],
                            cpu: 0,
                            mem: 0,
                          });
                        }),
                    p.forEach((y) => {
                      let g = go(y, m + h, Oe),
                        x = -1;
                      for (let S = 0; S < a.length; S++)
                        (a[S].pid === g.pid || a[S].pids.indexOf(g.pid) >= 0) &&
                          (x = S);
                      (x >= 0 && (a[x].cpu += g.cpuu + g.cpus),
                        (d[g.pid] = {
                          cpuu: g.cpuu,
                          cpus: g.cpus,
                          utime: g.utime,
                          stime: g.stime,
                        }));
                    }),
                    (Oe.all = m + h),
                    (Oe.all_utime = m),
                    (Oe.all_stime = h),
                    (Oe.list = Object.assign({}, d)),
                    (Oe.ms = Date.now() - Oe.ms),
                    (Oe.result = JSON.parse(JSON.stringify(a))),
                    n && n(a),
                    e(a));
                }
              });
            } catch {
              (n && n(a), e(a));
            }
          if (Rt || Ke || Nn || Bn || kn) {
            const u = ["-axo", "pid,ppid,pcpu,pmem,comm"];
            R.execSafe("ps", u).then((l) => {
              if (l) {
                let f = [],
                  p = l
                    .toString()
                    .split(
                      `
`,
                    )
                    .filter(function (d) {
                      if (i === "*") return !0;
                      if (d.toLowerCase().indexOf("grep") !== -1) return !1;
                      let m = !1;
                      return (
                        o.forEach(function (h) {
                          m =
                            m || d.toLowerCase().indexOf(h.toLowerCase()) >= 0;
                        }),
                        m
                      );
                    });
                if (
                  (p.shift(),
                  p.forEach(function (d) {
                    let m = d.trim().replace(/ +/g, " ").split(" ");
                    if (m.length > 4) {
                      const h =
                          m[4].indexOf("/") >= 0
                            ? m[4].substring(0, m[4].indexOf("/"))
                            : m[4],
                        y = Ke ? h : m[4].substring(m[4].lastIndexOf("/") + 1);
                      f.push({
                        name: y,
                        pid: parseInt(m[0]) || 0,
                        ppid: parseInt(m[1]) || 0,
                        cpu: parseFloat(m[2].replace(",", ".")),
                        mem: parseFloat(m[3].replace(",", ".")),
                      });
                    }
                  }),
                  f.forEach(function (d) {
                    let m = -1,
                      h = !1,
                      y = d.name;
                    for (let g = 0; g < a.length; g++)
                      d.name.toLowerCase().indexOf(a[g].proc.toLowerCase()) >=
                        0 && (m = g);
                    (o.forEach(function (g) {
                      d.name.toLowerCase().indexOf(g.toLowerCase()) >= 0 &&
                        !h &&
                        ((h = !0), (y = g));
                    }),
                      (i === "*" || h) &&
                        (m < 0
                          ? y &&
                            a.push({
                              proc: y,
                              pid: d.pid,
                              pids: [d.pid],
                              cpu: d.cpu,
                              mem: d.mem,
                            })
                          : (d.ppid < 10 && (a[m].pid = d.pid),
                            a[m].pids.push(d.pid),
                            (a[m].cpu += d.cpu),
                            (a[m].mem += d.mem))));
                  }),
                  i !== "*" &&
                    o
                      .filter(function (m) {
                        return (
                          f.filter(function (h) {
                            return h.name.toLowerCase().indexOf(m) >= 0;
                          }).length === 0
                        );
                      })
                      .forEach(function (m) {
                        a.push({
                          proc: m,
                          pid: null,
                          pids: [],
                          cpu: 0,
                          mem: 0,
                        });
                      }),
                  Ke)
                ) {
                  a.forEach(function (m) {
                    m.cpu = 0;
                  });
                  let d = 'cat /proc/stat | grep "cpu "';
                  for (let m in a)
                    for (let h in a[m].pids)
                      d += ";cat /proc/" + a[m].pids[h] + "/stat";
                  bn(d, { maxBuffer: 1024 * 2e4 }, function (m, h) {
                    let y = h.toString().split(`
`),
                      g = Pr(y.shift()),
                      x = {},
                      S = {};
                    (y.forEach((w) => {
                      if (((S = Er(w, g, Oe)), S.pid)) {
                        let C = -1;
                        for (let W in a)
                          a[W].pids.indexOf(S.pid) >= 0 && (C = W);
                        (C >= 0 && (a[C].cpu += S.cpuu + S.cpus),
                          (x[S.pid] = {
                            cpuu: S.cpuu,
                            cpus: S.cpus,
                            utime: S.utime,
                            stime: S.stime,
                            cutime: S.cutime,
                            cstime: S.cstime,
                          }));
                      }
                    }),
                      a.forEach(function (w) {
                        w.cpu = Math.round(w.cpu * 100) / 100;
                      }),
                      (Oe.all = g),
                      (Oe.list = Object.assign({}, x)),
                      (Oe.ms = Date.now() - Oe.ms),
                      (Oe.result = Object.assign({}, a)),
                      n && n(a),
                      e(a));
                  });
                } else (n && n(a), e(a));
              } else (n && n(a), e(a));
            });
          }
        }
      });
    })
  );
}
Ai.processLoad = Kc;
var yo = {};
const On = se.exec,
  Ze = V;
let vt = process.platform;
const Xc = vt === "linux" || vt === "android",
  qc = vt === "darwin",
  Yc = vt === "win32",
  Jc = vt === "freebsd",
  Qc = vt === "openbsd",
  Zc = vt === "netbsd",
  eu = vt === "sunos";
function ls(t, n) {
  let e = [],
    i = [],
    s = {},
    r = !0,
    o = [],
    a = [],
    c = {},
    u = !0;
  return (
    t.forEach(function (l) {
      if (l === "---") u = !1;
      else {
        let f = l.replace(/ +/g, " ").split(" ");
        u
          ? i.push({
              user: f[0],
              tty: f[1],
              date: f[2],
              time: f[3],
              ip:
                f && f.length > 4
                  ? f[4].replace(/\(/g, "").replace(/\)/g, "")
                  : "",
            })
          : r
            ? ((o = f),
              o.forEach(function (p) {
                a.push(l.indexOf(p));
              }),
              (r = !1))
            : ((s.user = l.substring(a[0], a[1] - 1).trim()),
              (s.tty = l.substring(a[1], a[2] - 1).trim()),
              (s.ip = l
                .substring(a[2], a[3] - 1)
                .replace(/\(/g, "")
                .replace(/\)/g, "")
                .trim()),
              (s.command = l.substring(a[7], 1e3).trim()),
              (c = i.filter(function (p) {
                return (
                  p.user.substring(0, 8).trim() === s.user && p.tty === s.tty
                );
              })),
              c.length === 1 &&
                e.push({
                  user: c[0].user,
                  tty: c[0].tty,
                  date: c[0].date,
                  time: c[0].time,
                  ip: c[0].ip,
                  command: s.command,
                }));
      }
    }),
    e.length === 0 && n === 2 ? i : e
  );
}
function Ui(t) {
  let n = [],
    e = [],
    i = {},
    s = {},
    r = !0;
  return (
    t.forEach(function (o) {
      if (o === "---") r = !1;
      else {
        let a = o.replace(/ +/g, " ").split(" ");
        if (r) {
          let c =
            "" +
            /* @__PURE__ */ new Date().getFullYear() +
            "-" +
            (
              "0" +
              ("JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC".indexOf(
                a[2].toUpperCase(),
              ) /
                3 +
                1)
            ).slice(-2) +
            "-" +
            ("0" + a[3]).slice(-2);
          try {
            new Date(c) > /* @__PURE__ */ new Date() &&
              (c =
                "" +
                /* @__PURE__ */ (new Date().getFullYear() - 1) +
                "-" +
                (
                  "0" +
                  ("JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC".indexOf(
                    a[2].toUpperCase(),
                  ) /
                    3 +
                    1)
                ).slice(-2) +
                "-" +
                ("0" + a[3]).slice(-2));
          } catch {
            Ze.noop();
          }
          e.push({
            user: a[0],
            tty: a[1],
            date: c,
            time: a[4],
          });
        } else
          ((i.user = a[0]),
            (i.tty = a[1]),
            (i.ip = a[2] !== "-" ? a[2] : ""),
            (i.command = a.slice(5, 1e3).join(" ")),
            (s = e.filter(function (c) {
              return (
                c.user.substring(0, 10) === i.user.substring(0, 10) &&
                (c.tty.substring(3, 1e3) === i.tty || c.tty === i.tty)
              );
            })),
            s.length === 1 &&
              n.push({
                user: s[0].user,
                tty: s[0].tty,
                date: s[0].date,
                time: s[0].time,
                ip: i.ip,
                command: i.command,
              }));
      }
    }),
    n
  );
}
function tu(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (
        (Xc &&
          On(
            'export LC_ALL=C; who --ips; echo "---"; w; unset LC_ALL | tail -n +2',
            function (i, s) {
              if (i) (t && t(e), n(e));
              else {
                let r = s.toString().split(`
`);
                ((e = ls(r, 1)),
                  e.length === 0
                    ? On('who; echo "---"; w | tail -n +2', function (o, a) {
                        (o ||
                          ((r = a.toString().split(`
`)),
                          (e = ls(r, 2))),
                          t && t(e),
                          n(e));
                      })
                    : (t && t(e), n(e)));
              }
            },
          ),
        (Jc || Qc || Zc) &&
          On('who; echo "---"; w -ih', function (i, s) {
            if (!i) {
              let r = s.toString().split(`
`);
              e = Ui(r);
            }
            (t && t(e), n(e));
          }),
        eu &&
          On('who; echo "---"; w -h', function (i, s) {
            if (!i) {
              let r = s.toString().split(`
`);
              e = Ui(r);
            }
            (t && t(e), n(e));
          }),
        qc &&
          On(
            'export LC_ALL=C; who; echo "---"; w -ih; unset LC_ALL',
            function (i, s) {
              if (!i) {
                let r = s.toString().split(`
`);
                e = Ui(r);
              }
              (t && t(e), n(e));
            },
          ),
        Yc)
      )
        try {
          let i = `Get-CimInstance Win32_LogonSession | select LogonId,@{n="StartTime";e={$_.StartTime.ToString("yyyy-MM-dd HH:mm:ss")}} | fl; echo '#-#-#-#';`;
          ((i +=
            "Get-CimInstance Win32_LoggedOnUser | select antecedent,dependent | fl ; echo '#-#-#-#';"),
            (i += `$process = (Get-CimInstance Win32_Process -Filter "name = 'explorer.exe'"); Invoke-CimMethod -InputObject $process[0] -MethodName GetOwner | select user, domain | fl; get-process -name explorer | select-object sessionid | fl; echo '#-#-#-#';`),
            (i += "query user"),
            Ze.powerShell(i).then((s) => {
              if (s) {
                s = s.split("#-#-#-#");
                let r = nu((s[0] || "").split(/\n\s*\n/)),
                  o = su((s[1] || "").split(/\n\s*\n/)),
                  a = ou(
                    (s[3] || "").split(`\r
`),
                  ),
                  c = ru((s[2] || "").split(/\n\s*\n/), a);
                for (let u in o)
                  ({}).hasOwnProperty.call(o, u) &&
                    (o[u].dateTime = {}.hasOwnProperty.call(r, u) ? r[u] : "");
                c.forEach((u) => {
                  let l = "";
                  for (let f in o)
                    ({}).hasOwnProperty.call(o, f) &&
                      o[f].user === u.user &&
                      (!l || l < o[f].dateTime) &&
                      (l = o[f].dateTime);
                  e.push({
                    user: u.user,
                    tty: u.tty,
                    date: `${l.substring(0, 10)}`,
                    time: `${l.substring(11, 19)}`,
                    ip: "",
                    command: "",
                  });
                });
              }
              (t && t(e), n(e));
            }));
        } catch {
          (t && t(e), n(e));
        }
    });
  });
}
function nu(t) {
  const n = {};
  return (
    t.forEach((e) => {
      const i = e.split(`\r
`),
        s = Ze.getValue(i, "LogonId"),
        r = Ze.getValue(i, "starttime");
      s && (n[s] = r);
    }),
    n
  );
}
function iu(t, n) {
  ((t = t.toLowerCase()), (n = n.toLowerCase()));
  let e = 0,
    i = t.length;
  n.length > i && (i = n.length);
  for (let s = 0; s < i; s++) {
    const r = t[s] || "",
      o = n[s] || "";
    r === o && e++;
  }
  return i > 10 ? e / i > 0.9 : i > 0 ? e / i > 0.8 : !1;
}
function ru(t, n) {
  const e = [];
  return (
    t.forEach((i) => {
      const s = i.split(`\r
`),
        r = Ze.getValue(s, "domain", ":", !0),
        o = Ze.getValue(s, "user", ":", !0),
        a = Ze.getValue(s, "sessionid", ":", !0);
      if (o) {
        const c = n.filter((u) => iu(u.user, o));
        e.push({
          domain: r,
          user: o,
          tty: c && c[0] && c[0].tty ? c[0].tty : a,
        });
      }
    }),
    e
  );
}
function su(t) {
  const n = {};
  return (
    t.forEach((e) => {
      const i = e.split(`\r
`);
      let r = Ze.getValue(i, "antecedent", ":", !0).split("=");
      const o = r.length > 2 ? r[1].split(",")[0].replace(/"/g, "").trim() : "",
        a =
          r.length > 2 ? r[2].replace(/"/g, "").replace(/\)/g, "").trim() : "";
      r = Ze.getValue(i, "dependent", ":", !0).split("=");
      const u =
        r.length > 1 ? r[1].replace(/"/g, "").replace(/\)/g, "").trim() : "";
      u &&
        (n[u] = {
          domain: a,
          user: o,
        });
    }),
    n
  );
}
function ou(t) {
  t = t.filter((s) => s);
  let n = [];
  const e = t[0],
    i = [];
  if (e) {
    const s = e[0] === " " ? 1 : 0;
    i.push(s - 1);
    let r = 0;
    for (let o = s + 1; o < e.length; o++)
      e[o] === " " && (e[o - 1] === " " || e[o - 1] === ".")
        ? (r = o)
        : r && (i.push(r), (r = 0));
    for (let o = 1; o < t.length; o++)
      if (t[o].trim()) {
        const a = t[o].substring(i[0] + 1, i[1]).trim() || "",
          c = t[o].substring(i[1] + 1, i[2] - 2).trim() || "";
        n.push({
          user: a,
          tty: c,
        });
      }
  }
  return n;
}
yo.users = tu;
var Mr = {};
const ue = V;
let _t = process.platform;
const cs = _t === "linux" || _t === "android",
  us = _t === "darwin",
  au = _t === "win32",
  ps = _t === "freebsd",
  fs = _t === "openbsd",
  ds = _t === "netbsd",
  lu = _t === "sunos";
function cu(t, n) {
  return new Promise((e) => {
    process.nextTick(() => {
      let i = {
        url: t,
        ok: !1,
        status: 404,
        ms: null,
      };
      if (typeof t != "string") return (n && n(i), e(i));
      let s = "";
      const r = ue.sanitizeShellString(t, !0),
        o = ue.mathMin(r.length, 2e3);
      for (let a = 0; a <= o; a++)
        if (r[a] !== void 0) {
          try {
            r[a].__proto__.toLowerCase = ue.stringToLower;
          } catch {
            Object.setPrototypeOf(r[a], ue.stringObj);
          }
          const c = r[a].toLowerCase();
          c && c[0] && !c[1] && c[0].length === 1 && (s = s + c[0]);
        }
      i.url = s;
      try {
        if (s && !ue.isPrototypePolluted()) {
          try {
            s.__proto__.startsWith = ue.stringStartWith;
          } catch {
            Object.setPrototypeOf(s, ue.stringObj);
          }
          if (
            s.startsWith("file:") ||
            s.startsWith("gopher:") ||
            s.startsWith("telnet:") ||
            s.startsWith("mailto:") ||
            s.startsWith("news:") ||
            s.startsWith("nntp:")
          )
            return (n && n(i), e(i));
          ue.checkWebsite(s).then((a) => {
            ((i.status = a.statusCode),
              (i.ok = a.statusCode >= 200 && a.statusCode <= 399),
              (i.ms = i.ok ? a.time : null),
              n && n(i),
              e(i));
          });
        } else (n && n(i), e(i));
      } catch {
        (n && n(i), e(i));
      }
    });
  });
}
Mr.inetChecksite = cu;
function uu(t, n) {
  return (
    ue.isFunction(t) && !n && ((n = t), (t = "")),
    (t = t || "8.8.8.8"),
    new Promise((e) => {
      process.nextTick(() => {
        if (typeof t != "string") return (n && n(null), e(null));
        let i = "";
        const s = (
            ue.isPrototypePolluted() ? "8.8.8.8" : ue.sanitizeShellString(t, !0)
          ).trim(),
          r = ue.mathMin(s.length, 2e3);
        for (let a = 0; a <= r; a++)
          if (s[a] !== void 0) {
            try {
              s[a].__proto__.toLowerCase = ue.stringToLower;
            } catch {
              Object.setPrototypeOf(s[a], ue.stringObj);
            }
            const c = s[a].toLowerCase();
            c && c[0] && !c[1] && (i = i + c[0]);
          }
        try {
          i.__proto__.startsWith = ue.stringStartWith;
        } catch {
          Object.setPrototypeOf(i, ue.stringObj);
        }
        if (
          i.startsWith("file:") ||
          i.startsWith("gopher:") ||
          i.startsWith("telnet:") ||
          i.startsWith("mailto:") ||
          i.startsWith("news:") ||
          i.startsWith("nntp:")
        )
          return (n && n(null), e(null));
        let o;
        if (
          ((cs || ps || fs || ds || us) &&
            (cs && (o = ["-c", "2", "-w", "3", i]),
            (ps || fs || ds) && (o = ["-c", "2", "-t", "3", i]),
            us && (o = ["-c2", "-t3", i]),
            ue.execSafe("ping", o).then((a) => {
              let c = null;
              if (a) {
                const l = a
                  .split(
                    `
`,
                  )
                  .filter(
                    (f) =>
                      f.indexOf("rtt") >= 0 ||
                      f.indexOf("round-trip") >= 0 ||
                      f.indexOf("avg") >= 0,
                  )
                  .join(
                    `
`,
                  )
                  .split("=");
                if (l.length > 1) {
                  const f = l[1].split("/");
                  f.length > 1 && (c = parseFloat(f[1]));
                }
              }
              (n && n(c), e(c));
            })),
          lu)
        ) {
          const a = ["-s", "-a", i, "56", "2"],
            c = "avg";
          ue.execSafe("ping", a, { timeout: 3e3 }).then((u) => {
            let l = null;
            if (u) {
              const p = u
                .split(
                  `
`,
                )
                .filter((d) => d.indexOf(c) >= 0)
                .join(
                  `
`,
                )
                .split("=");
              if (p.length > 1) {
                const d = p[1].split("/");
                d.length > 1 && (l = parseFloat(d[1].replace(",", ".")));
              }
            }
            (n && n(l), e(l));
          });
        }
        if (au) {
          let a = null;
          try {
            const c = [i, "-n", "1"];
            ue.execSafe("ping", c, ue.execOptsWin).then((u) => {
              if (u) {
                let l = u.split(`\r
`);
                (l.shift(),
                  l.forEach(function (f) {
                    if ((f.toLowerCase().match(/ms/g) || []).length === 3) {
                      let p = f.replace(/ +/g, " ").split(" ");
                      p.length > 6 && (a = parseFloat(p[p.length - 1]));
                    }
                  }));
              }
              (n && n(a), e(a));
            });
          } catch {
            (n && n(a), e(a));
          }
        }
      });
    })
  );
}
Mr.inetLatency = uu;
var Tt = {};
const nt = oa,
  pu = Pe.type() === "Windows_NT",
  it = pu ? "//./pipe/docker_engine" : "/var/run/docker.sock";
let fu = class {
  getInfo(n) {
    try {
      let e = nt.createConnection({ path: it }),
        i = "",
        s;
      (e.on("connect", () => {
        e.write(`GET http:/info HTTP/1.0\r
\r
`);
      }),
        e.on("data", (r) => {
          i = i + r.toString();
        }),
        e.on("error", () => {
          ((e = !1), n({}));
        }),
        e.on("end", () => {
          let r = i.indexOf(`\r
\r
`);
          ((i = i.substring(r + 4)), (e = !1));
          try {
            ((s = JSON.parse(i)), n(s));
          } catch {
            n({});
          }
        }));
    } catch {
      n({});
    }
  }
  listImages(n, e) {
    try {
      let i = nt.createConnection({ path: it }),
        s = "",
        r;
      (i.on("connect", () => {
        i.write(
          "GET http:/images/json" +
            (n ? "?all=1" : "") +
            ` HTTP/1.0\r
\r
`,
        );
      }),
        i.on("data", (o) => {
          s = s + o.toString();
        }),
        i.on("error", () => {
          ((i = !1), e({}));
        }),
        i.on("end", () => {
          let o = s.indexOf(`\r
\r
`);
          ((s = s.substring(o + 4)), (i = !1));
          try {
            ((r = JSON.parse(s)), e(r));
          } catch {
            e({});
          }
        }));
    } catch {
      e({});
    }
  }
  inspectImage(n, e) {
    if (((n = n || ""), n))
      try {
        let i = nt.createConnection({ path: it }),
          s = "",
          r;
        (i.on("connect", () => {
          i.write(
            "GET http:/images/" +
              n +
              `/json?stream=0 HTTP/1.0\r
\r
`,
          );
        }),
          i.on("data", (o) => {
            s = s + o.toString();
          }),
          i.on("error", () => {
            ((i = !1), e({}));
          }),
          i.on("end", () => {
            let o = s.indexOf(`\r
\r
`);
            ((s = s.substring(o + 4)), (i = !1));
            try {
              ((r = JSON.parse(s)), e(r));
            } catch {
              e({});
            }
          }));
      } catch {
        e({});
      }
    else e({});
  }
  listContainers(n, e) {
    try {
      let i = nt.createConnection({ path: it }),
        s = "",
        r;
      (i.on("connect", () => {
        i.write(
          "GET http:/containers/json" +
            (n ? "?all=1" : "") +
            ` HTTP/1.0\r
\r
`,
        );
      }),
        i.on("data", (o) => {
          s = s + o.toString();
        }),
        i.on("error", () => {
          ((i = !1), e({}));
        }),
        i.on("end", () => {
          let o = s.indexOf(`\r
\r
`);
          ((s = s.substring(o + 4)), (i = !1));
          try {
            ((r = JSON.parse(s)), e(r));
          } catch {
            e({});
          }
        }));
    } catch {
      e({});
    }
  }
  getStats(n, e) {
    if (((n = n || ""), n))
      try {
        let i = nt.createConnection({ path: it }),
          s = "",
          r;
        (i.on("connect", () => {
          i.write(
            "GET http:/containers/" +
              n +
              `/stats?stream=0 HTTP/1.0\r
\r
`,
          );
        }),
          i.on("data", (o) => {
            s = s + o.toString();
          }),
          i.on("error", () => {
            ((i = !1), e({}));
          }),
          i.on("end", () => {
            let o = s.indexOf(`\r
\r
`);
            ((s = s.substring(o + 4)), (i = !1));
            try {
              ((r = JSON.parse(s)), e(r));
            } catch {
              e({});
            }
          }));
      } catch {
        e({});
      }
    else e({});
  }
  getInspect(n, e) {
    if (((n = n || ""), n))
      try {
        let i = nt.createConnection({ path: it }),
          s = "",
          r;
        (i.on("connect", () => {
          i.write(
            "GET http:/containers/" +
              n +
              `/json?stream=0 HTTP/1.0\r
\r
`,
          );
        }),
          i.on("data", (o) => {
            s = s + o.toString();
          }),
          i.on("error", () => {
            ((i = !1), e({}));
          }),
          i.on("end", () => {
            let o = s.indexOf(`\r
\r
`);
            ((s = s.substring(o + 4)), (i = !1));
            try {
              ((r = JSON.parse(s)), e(r));
            } catch {
              e({});
            }
          }));
      } catch {
        e({});
      }
    else e({});
  }
  getProcesses(n, e) {
    if (((n = n || ""), n))
      try {
        let i = nt.createConnection({ path: it }),
          s = "",
          r;
        (i.on("connect", () => {
          i.write(
            "GET http:/containers/" +
              n +
              `/top?ps_args=-opid,ppid,pgid,vsz,time,etime,nice,ruser,user,rgroup,group,stat,rss,args HTTP/1.0\r
\r
`,
          );
        }),
          i.on("data", (o) => {
            s = s + o.toString();
          }),
          i.on("error", () => {
            ((i = !1), e({}));
          }),
          i.on("end", () => {
            let o = s.indexOf(`\r
\r
`);
            ((s = s.substring(o + 4)), (i = !1));
            try {
              ((r = JSON.parse(s)), e(r));
            } catch {
              e({});
            }
          }));
      } catch {
        e({});
      }
    else e({});
  }
  listVolumes(n) {
    try {
      let e = nt.createConnection({ path: it }),
        i = "",
        s;
      (e.on("connect", () => {
        e.write(`GET http:/volumes HTTP/1.0\r
\r
`);
      }),
        e.on("data", (r) => {
          i = i + r.toString();
        }),
        e.on("error", () => {
          ((e = !1), n({}));
        }),
        e.on("end", () => {
          let r = i.indexOf(`\r
\r
`);
          ((i = i.substring(r + 4)), (e = !1));
          try {
            ((s = JSON.parse(i)), n(s));
          } catch {
            n({});
          }
        }));
    } catch {
      n({});
    }
  }
};
var du = fu;
const oe = V,
  Dt = du;
let mu = process.platform;
const hu = mu === "win32";
let rn = {},
  ae,
  Hi = 0;
function gu(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      ae || (ae = new Dt());
      const e = {};
      ae.getInfo((i) => {
        ((e.id = i.ID),
          (e.containers = i.Containers),
          (e.containersRunning = i.ContainersRunning),
          (e.containersPaused = i.ContainersPaused),
          (e.containersStopped = i.ContainersStopped),
          (e.images = i.Images),
          (e.driver = i.Driver),
          (e.memoryLimit = i.MemoryLimit),
          (e.swapLimit = i.SwapLimit),
          (e.kernelMemory = i.KernelMemory),
          (e.cpuCfsPeriod = i.CpuCfsPeriod),
          (e.cpuCfsQuota = i.CpuCfsQuota),
          (e.cpuShares = i.CPUShares),
          (e.cpuSet = i.CPUSet),
          (e.ipv4Forwarding = i.IPv4Forwarding),
          (e.bridgeNfIptables = i.BridgeNfIptables),
          (e.bridgeNfIp6tables = i.BridgeNfIp6tables),
          (e.debug = i.Debug),
          (e.nfd = i.NFd),
          (e.oomKillDisable = i.OomKillDisable),
          (e.ngoroutines = i.NGoroutines),
          (e.systemTime = i.SystemTime),
          (e.loggingDriver = i.LoggingDriver),
          (e.cgroupDriver = i.CgroupDriver),
          (e.nEventsListener = i.NEventsListener),
          (e.kernelVersion = i.KernelVersion),
          (e.operatingSystem = i.OperatingSystem),
          (e.osType = i.OSType),
          (e.architecture = i.Architecture),
          (e.ncpu = i.NCPU),
          (e.memTotal = i.MemTotal),
          (e.dockerRootDir = i.DockerRootDir),
          (e.httpProxy = i.HttpProxy),
          (e.httpsProxy = i.HttpsProxy),
          (e.noProxy = i.NoProxy),
          (e.name = i.Name),
          (e.labels = i.Labels),
          (e.experimentalBuild = i.ExperimentalBuild),
          (e.serverVersion = i.ServerVersion),
          (e.clusterStore = i.ClusterStore),
          (e.clusterAdvertise = i.ClusterAdvertise),
          (e.defaultRuntime = i.DefaultRuntime),
          (e.liveRestoreEnabled = i.LiveRestoreEnabled),
          (e.isolation = i.Isolation),
          (e.initBinary = i.InitBinary),
          (e.productLicense = i.ProductLicense),
          t && t(e),
          n(e));
      });
    });
  });
}
Tt.dockerInfo = gu;
function yu(t, n) {
  (oe.isFunction(t) && !n && ((n = t), (t = !1)),
    typeof t == "string" && t === "true" && (t = !0),
    typeof t != "boolean" && t !== void 0 && (t = !1),
    (t = t || !1));
  let e = [];
  return new Promise((i) => {
    process.nextTick(() => {
      ae || (ae = new Dt());
      const s = [];
      ae.listImages(t, (r) => {
        let o = {};
        try {
          ((o = r),
            o &&
            Object.prototype.toString.call(o) === "[object Array]" &&
            o.length > 0
              ? (o.forEach(function (a) {
                  (a.Names &&
                    Object.prototype.toString.call(a.Names) ===
                      "[object Array]" &&
                    a.Names.length > 0 &&
                    (a.Name = a.Names[0].replace(/^\/|\/$/g, "")),
                    s.push(xu(a.Id.trim(), a)));
                }),
                s.length
                  ? Promise.all(s).then((a) => {
                      (n && n(a), i(a));
                    })
                  : (n && n(e), i(e)))
              : (n && n(e), i(e)));
        } catch {
          (n && n(e), i(e));
        }
      });
    });
  });
}
function xu(t, n) {
  return new Promise((e) => {
    process.nextTick(() => {
      if (((t = t || ""), typeof t != "string")) return e();
      const i = (
        oe.isPrototypePolluted() ? "" : oe.sanitizeShellString(t, !0)
      ).trim();
      i
        ? (ae || (ae = new Dt()),
          ae.inspectImage(i.trim(), (s) => {
            try {
              e({
                id: n.Id,
                container: s.Container,
                comment: s.Comment,
                os: s.Os,
                architecture: s.Architecture,
                parent: s.Parent,
                dockerVersion: s.DockerVersion,
                size: s.Size,
                sharedSize: n.SharedSize,
                virtualSize: s.VirtualSize,
                author: s.Author,
                created: s.Created
                  ? Math.round(new Date(s.Created).getTime() / 1e3)
                  : 0,
                containerConfig: s.ContainerConfig ? s.ContainerConfig : {},
                graphDriver: s.GraphDriver ? s.GraphDriver : {},
                repoDigests: s.RepoDigests ? s.RepoDigests : {},
                repoTags: s.RepoTags ? s.RepoTags : {},
                config: s.Config ? s.Config : {},
                rootFS: s.RootFS ? s.RootFS : {},
              });
            } catch {
              e();
            }
          }))
        : e();
    });
  });
}
Tt.dockerImages = yu;
function Ar(t, n) {
  function e(s, r) {
    return s.filter((a) => a.Id && a.Id === r).length > 0;
  }
  (oe.isFunction(t) && !n && ((n = t), (t = !1)),
    typeof t == "string" && t === "true" && (t = !0),
    typeof t != "boolean" && t !== void 0 && (t = !1),
    (t = t || !1));
  let i = [];
  return new Promise((s) => {
    process.nextTick(() => {
      ae || (ae = new Dt());
      const r = [];
      ae.listContainers(t, (o) => {
        let a = {};
        try {
          if (
            ((a = o),
            a &&
              Object.prototype.toString.call(a) === "[object Array]" &&
              a.length > 0)
          ) {
            for (let c in rn)
              ({}).hasOwnProperty.call(rn, c) && (e(a, c) || delete rn[c]);
            (a.forEach(function (c) {
              (c.Names &&
                Object.prototype.toString.call(c.Names) === "[object Array]" &&
                c.Names.length > 0 &&
                (c.Name = c.Names[0].replace(/^\/|\/$/g, "")),
                r.push(Su(c.Id.trim(), c)));
            }),
              r.length
                ? Promise.all(r).then((c) => {
                    (n && n(c), s(c));
                  })
                : (n && n(i), s(i)));
          } else (n && n(i), s(i));
        } catch {
          for (let u in rn)
            ({}).hasOwnProperty.call(rn, u) && (e(a, u) || delete rn[u]);
          (n && n(i), s(i));
        }
      });
    });
  });
}
function Su(t, n) {
  return new Promise((e) => {
    process.nextTick(() => {
      if (((t = t || ""), typeof t != "string")) return e();
      const i = (
        oe.isPrototypePolluted() ? "" : oe.sanitizeShellString(t, !0)
      ).trim();
      i
        ? (ae || (ae = new Dt()),
          ae.getInspect(i.trim(), (s) => {
            try {
              e({
                id: n.Id,
                name: n.Name,
                image: n.Image,
                imageID: n.ImageID,
                command: n.Command,
                created: n.Created,
                started:
                  s.State && s.State.StartedAt
                    ? Math.round(new Date(s.State.StartedAt).getTime() / 1e3)
                    : 0,
                finished:
                  s.State &&
                  s.State.FinishedAt &&
                  !s.State.FinishedAt.startsWith("0001-01-01")
                    ? Math.round(new Date(s.State.FinishedAt).getTime() / 1e3)
                    : 0,
                createdAt: s.Created ? s.Created : "",
                startedAt:
                  s.State && s.State.StartedAt ? s.State.StartedAt : "",
                finishedAt:
                  s.State &&
                  s.State.FinishedAt &&
                  !s.State.FinishedAt.startsWith("0001-01-01")
                    ? s.State.FinishedAt
                    : "",
                state: n.State,
                restartCount: s.RestartCount || 0,
                platform: s.Platform || "",
                driver: s.Driver || "",
                ports: n.Ports,
                mounts: n.Mounts,
                // hostconfig: payload.HostConfig,
                // network: payload.NetworkSettings
              });
            } catch {
              e();
            }
          }))
        : e();
    });
  });
}
Tt.dockerContainers = Ar;
function wu(t, n) {
  if (hu) {
    let e = oe.nanoSeconds(),
      i = 0;
    if (Hi > 0) {
      let s = e - Hi,
        r = t.cpu_usage.total_usage - n.cpu_usage.total_usage;
      s > 0 && (i = (100 * r) / s);
    }
    return ((Hi = e), i);
  } else {
    let e = 0,
      i = t.cpu_usage.total_usage - n.cpu_usage.total_usage,
      s = t.system_cpu_usage - n.system_cpu_usage;
    return (
      s > 0 &&
        i > 0 &&
        (n.online_cpus
          ? (e = (i / s) * n.online_cpus * 100)
          : (e = (i / s) * t.cpu_usage.percpu_usage.length * 100)),
      e
    );
  }
}
function Cu(t) {
  let n, e;
  for (let i in t) {
    if (!{}.hasOwnProperty.call(t, i)) continue;
    let s = t[i];
    ((n = +s.rx_bytes), (e = +s.tx_bytes));
  }
  return {
    rx: n,
    wx: e,
  };
}
function Lu(t) {
  let n = {
    r: 0,
    w: 0,
  };
  return (
    t &&
      t.io_service_bytes_recursive &&
      Object.prototype.toString.call(t.io_service_bytes_recursive) ===
        "[object Array]" &&
      t.io_service_bytes_recursive.length > 0 &&
      t.io_service_bytes_recursive.forEach(function (e) {
        (e.op && e.op.toLowerCase() === "read" && e.value && (n.r += e.value),
          e.op &&
            e.op.toLowerCase() === "write" &&
            e.value &&
            (n.w += e.value));
      }),
    n
  );
}
function Tr(t, n) {
  let e = [];
  return new Promise((i) => {
    process.nextTick(() => {
      if (oe.isFunction(t) && !n) ((n = t), (e = ["*"]));
      else {
        if (((t = t || "*"), typeof t != "string")) return (n && n([]), i([]));
        let o = "";
        try {
          ((o.__proto__.toLowerCase = oe.stringToLower),
            (o.__proto__.replace = oe.stringReplace),
            (o.__proto__.toString = oe.stringToString),
            (o.__proto__.substr = oe.stringSubstr),
            (o.__proto__.substring = oe.stringSubstring),
            (o.__proto__.trim = oe.stringTrim),
            (o.__proto__.startsWith = oe.stringStartWith));
        } catch {
          Object.setPrototypeOf(o, oe.stringObj);
        }
        if (((o = t), (o = o.trim()), o !== "*")) {
          o = "";
          const a = (
              oe.isPrototypePolluted() ? "" : oe.sanitizeShellString(t, !0)
            ).trim(),
            c = oe.mathMin(a.length, 2e3);
          for (let u = 0; u <= c; u++)
            if (a[u] !== void 0) {
              a[u].__proto__.toLowerCase = oe.stringToLower;
              const l = a[u].toLowerCase();
              l && l[0] && !l[1] && (o = o + l[0]);
            }
        }
        ((o = o.trim().toLowerCase().replace(/,+/g, "|")), (e = o.split("|")));
      }
      const s = [],
        r = [];
      if (e.length && e[0].trim() === "*")
        ((e = []),
          Ar().then((o) => {
            for (let a of o) e.push(a.id.substring(0, 12));
            e.length
              ? Tr(e.join(",")).then((a) => {
                  (n && n(a), i(a));
                })
              : (n && n(s), i(s));
          }));
      else {
        for (let o of e) r.push(Iu(o.trim()));
        r.length
          ? Promise.all(r).then((o) => {
              (n && n(o), i(o));
            })
          : (n && n(s), i(s));
      }
    });
  });
}
function Iu(t) {
  t = t || "";
  let n = {
    id: t,
    memUsage: 0,
    memLimit: 0,
    memPercent: 0,
    cpuPercent: 0,
    pids: 0,
    netIO: {
      rx: 0,
      wx: 0,
    },
    blockIO: {
      r: 0,
      w: 0,
    },
    restartCount: 0,
    cpuStats: {},
    precpuStats: {},
    memoryStats: {},
    networks: {},
  };
  return new Promise((e) => {
    process.nextTick(() => {
      t
        ? (ae || (ae = new Dt()),
          ae.getInspect(t, (i) => {
            try {
              ae.getStats(t, (s) => {
                try {
                  let r = s;
                  r.message ||
                    (s.id && (n.id = s.id),
                    (n.memUsage =
                      r.memory_stats && r.memory_stats.usage
                        ? r.memory_stats.usage
                        : 0),
                    (n.memLimit =
                      r.memory_stats && r.memory_stats.limit
                        ? r.memory_stats.limit
                        : 0),
                    (n.memPercent =
                      r.memory_stats &&
                      r.memory_stats.usage &&
                      r.memory_stats.limit
                        ? (r.memory_stats.usage / r.memory_stats.limit) * 100
                        : 0),
                    (n.cpuPercent =
                      r.cpu_stats && r.precpu_stats
                        ? wu(r.cpu_stats, r.precpu_stats)
                        : 0),
                    (n.pids =
                      r.pids_stats && r.pids_stats.current
                        ? r.pids_stats.current
                        : 0),
                    (n.restartCount = i.RestartCount ? i.RestartCount : 0),
                    r.networks && (n.netIO = Cu(r.networks)),
                    r.blkio_stats && (n.blockIO = Lu(r.blkio_stats)),
                    (n.cpuStats = r.cpu_stats ? r.cpu_stats : {}),
                    (n.precpuStats = r.precpu_stats ? r.precpu_stats : {}),
                    (n.memoryStats = r.memory_stats ? r.memory_stats : {}),
                    (n.networks = r.networks ? r.networks : {}));
                } catch {
                  oe.noop();
                }
                e(n);
              });
            } catch {
              oe.noop();
            }
          }))
        : e(n);
    });
  });
}
Tt.dockerContainerStats = Tr;
function xo(t, n) {
  let e = [];
  return new Promise((i) => {
    process.nextTick(() => {
      if (((t = t || ""), typeof t != "string")) return i(e);
      const s = (
        oe.isPrototypePolluted() ? "" : oe.sanitizeShellString(t, !0)
      ).trim();
      s
        ? (ae || (ae = new Dt()),
          ae.getProcesses(s, (r) => {
            try {
              if (r && r.Titles && r.Processes) {
                let o = r.Titles.map(function (C) {
                    return C.toUpperCase();
                  }),
                  a = o.indexOf("PID"),
                  c = o.indexOf("PPID"),
                  u = o.indexOf("PGID"),
                  l = o.indexOf("VSZ"),
                  f = o.indexOf("TIME"),
                  p = o.indexOf("ELAPSED"),
                  d = o.indexOf("NI"),
                  m = o.indexOf("RUSER"),
                  h = o.indexOf("USER"),
                  y = o.indexOf("RGROUP"),
                  g = o.indexOf("GROUP"),
                  x = o.indexOf("STAT"),
                  S = o.indexOf("RSS"),
                  w = o.indexOf("COMMAND");
                r.Processes.forEach((C) => {
                  e.push({
                    pidHost: a >= 0 ? C[a] : "",
                    ppid: c >= 0 ? C[c] : "",
                    pgid: u >= 0 ? C[u] : "",
                    user: h >= 0 ? C[h] : "",
                    ruser: m >= 0 ? C[m] : "",
                    group: g >= 0 ? C[g] : "",
                    rgroup: y >= 0 ? C[y] : "",
                    stat: x >= 0 ? C[x] : "",
                    time: f >= 0 ? C[f] : "",
                    elapsed: p >= 0 ? C[p] : "",
                    nice: d >= 0 ? C[d] : "",
                    rss: S >= 0 ? C[S] : "",
                    vsz: l >= 0 ? C[l] : "",
                    command: w >= 0 ? C[w] : "",
                  });
                });
              }
            } catch {
              oe.noop();
            }
            (n && n(e), i(e));
          }))
        : (n && n(e), i(e));
    });
  });
}
Tt.dockerContainerProcesses = xo;
function vu(t) {
  let n = [];
  return new Promise((e) => {
    process.nextTick(() => {
      (ae || (ae = new Dt()),
        ae.listVolumes((i) => {
          let s = {};
          try {
            ((s = i),
              s &&
              s.Volumes &&
              Object.prototype.toString.call(s.Volumes) === "[object Array]" &&
              s.Volumes.length > 0
                ? (s.Volumes.forEach(function (r) {
                    n.push({
                      name: r.Name,
                      driver: r.Driver,
                      labels: r.Labels,
                      mountpoint: r.Mountpoint,
                      options: r.Options,
                      scope: r.Scope,
                      created: r.CreatedAt
                        ? Math.round(new Date(r.CreatedAt).getTime() / 1e3)
                        : 0,
                    });
                  }),
                  t && t(n),
                  e(n))
                : (t && t(n), e(n)));
          } catch {
            (t && t(n), e(n));
          }
        }));
    });
  });
}
Tt.dockerVolumes = vu;
function _u(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      Ar(!0).then((e) => {
        if (
          e &&
          Object.prototype.toString.call(e) === "[object Array]" &&
          e.length > 0
        ) {
          let i = e.length;
          e.forEach(function (s) {
            Tr(s.id).then((r) => {
              ((s.memUsage = r[0].memUsage),
                (s.memLimit = r[0].memLimit),
                (s.memPercent = r[0].memPercent),
                (s.cpuPercent = r[0].cpuPercent),
                (s.pids = r[0].pids),
                (s.netIO = r[0].netIO),
                (s.blockIO = r[0].blockIO),
                (s.cpuStats = r[0].cpuStats),
                (s.precpuStats = r[0].precpuStats),
                (s.memoryStats = r[0].memoryStats),
                (s.networks = r[0].networks),
                xo(s.id).then((o) => {
                  ((s.processes = o), (i -= 1), i === 0 && (t && t(e), n(e)));
                }));
            });
          });
        } else (t && t(e), n(e));
      });
    });
  });
}
Tt.dockerAll = _u;
var So = {};
const ji = Pe,
  Ou = se.exec,
  ne = V;
function Pu(t) {
  let n = [];
  return new Promise((e) => {
    process.nextTick(() => {
      try {
        Ou(ne.getVboxmanage() + " list vms --long", function (i, s) {
          let r = (ji.EOL + s.toString()).split(ji.EOL + "Name:");
          (r.shift(),
            r.forEach((o) => {
              const a = ("Name:" + o).split(ji.EOL),
                c = ne.getValue(a, "State"),
                u = c.startsWith("running"),
                l = u
                  ? c.replace("running (since ", "").replace(")", "").trim()
                  : "";
              let f = 0;
              try {
                if (u) {
                  const m = new Date(l),
                    h = m.getTimezoneOffset();
                  f = Math.round((Date.now() - Date.parse(m)) / 1e3) + h * 60;
                }
              } catch {
                ne.noop();
              }
              const p = u
                ? ""
                : c.replace("powered off (since", "").replace(")", "").trim();
              let d = 0;
              try {
                if (!u) {
                  const m = new Date(p),
                    h = m.getTimezoneOffset();
                  d = Math.round((Date.now() - Date.parse(m)) / 1e3) + h * 60;
                }
              } catch {
                ne.noop();
              }
              n.push({
                id: ne.getValue(a, "UUID"),
                name: ne.getValue(a, "Name"),
                running: u,
                started: l,
                runningSince: f,
                stopped: p,
                stoppedSince: d,
                guestOS: ne.getValue(a, "Guest OS"),
                hardwareUUID: ne.getValue(a, "Hardware UUID"),
                memory: parseInt(ne.getValue(a, "Memory size", "     "), 10),
                vram: parseInt(ne.getValue(a, "VRAM size"), 10),
                cpus: parseInt(ne.getValue(a, "Number of CPUs"), 10),
                cpuExepCap: ne.getValue(a, "CPU exec cap"),
                cpuProfile: ne.getValue(a, "CPUProfile"),
                chipset: ne.getValue(a, "Chipset"),
                firmware: ne.getValue(a, "Firmware"),
                pageFusion: ne.getValue(a, "Page Fusion") === "enabled",
                configFile: ne.getValue(a, "Config file"),
                snapshotFolder: ne.getValue(a, "Snapshot folder"),
                logFolder: ne.getValue(a, "Log folder"),
                hpet: ne.getValue(a, "HPET") === "enabled",
                pae: ne.getValue(a, "PAE") === "enabled",
                longMode: ne.getValue(a, "Long Mode") === "enabled",
                tripleFaultReset:
                  ne.getValue(a, "Triple Fault Reset") === "enabled",
                apic: ne.getValue(a, "APIC") === "enabled",
                x2Apic: ne.getValue(a, "X2APIC") === "enabled",
                acpi: ne.getValue(a, "ACPI") === "enabled",
                ioApic: ne.getValue(a, "IOAPIC") === "enabled",
                biosApicMode: ne.getValue(a, "BIOS APIC mode"),
                bootMenuMode: ne.getValue(a, "Boot menu mode"),
                bootDevice1: ne.getValue(a, "Boot Device 1"),
                bootDevice2: ne.getValue(a, "Boot Device 2"),
                bootDevice3: ne.getValue(a, "Boot Device 3"),
                bootDevice4: ne.getValue(a, "Boot Device 4"),
                timeOffset: ne.getValue(a, "Time offset"),
                rtc: ne.getValue(a, "RTC"),
              });
            }),
            t && t(n),
            e(n));
        });
      } catch {
        (t && t(n), e(n));
      }
    });
  });
}
So.vboxInfo = Pu;
var wo = {};
const Ki = se.exec,
  he = V;
let Ot = process.platform;
const ms = Ot === "linux" || Ot === "android",
  Eu = Ot === "darwin",
  Mu = Ot === "win32",
  Au = Ot === "freebsd",
  Tu = Ot === "openbsd",
  Du = Ot === "netbsd",
  bu = Ot === "sunos",
  hs = {
    1: "Other",
    2: "Unknown",
    3: "Idle",
    4: "Printing",
    5: "Warmup",
    6: "Stopped Printing",
    7: "Offline",
  };
function Vu(t) {
  const n = {};
  if (t && t.length && t[0].indexOf(" CUPS v") > 0) {
    const e = t[0].split(" CUPS v");
    n.cupsVersion = e[1];
  }
  return n;
}
function Nu(t) {
  const n = {},
    e = he.getValue(t, "PrinterId", " ");
  return (
    (n.id = e ? parseInt(e, 10) : null),
    (n.name = he.getValue(t, "Info", " ")),
    (n.model = t.length > 0 && t[0] ? t[0].split(" ")[0] : ""),
    (n.uri = he.getValue(t, "DeviceURI", " ")),
    (n.uuid = he.getValue(t, "UUID", " ")),
    (n.status = he.getValue(t, "State", " ")),
    (n.local = he
      .getValue(t, "Location", " ")
      .toLowerCase()
      .startsWith("local")),
    (n.default = null),
    (n.shared = he.getValue(t, "Shared", " ").toLowerCase().startsWith("yes")),
    n
  );
}
function Bu(t, n) {
  const e = {};
  return (
    (e.id = n),
    (e.name = he.getValue(t, "Description", ":", !0)),
    (e.model = t.length > 0 && t[0] ? t[0].split(" ")[0] : ""),
    (e.uri = null),
    (e.uuid = null),
    (e.status =
      t.length > 0 && t[0]
        ? t[0].indexOf(" idle") > 0
          ? "idle"
          : t[0].indexOf(" printing") > 0
            ? "printing"
            : "unknown"
        : null),
    (e.local = he
      .getValue(t, "Location", ":", !0)
      .toLowerCase()
      .startsWith("local")),
    (e.default = null),
    (e.shared = he.getValue(t, "Shared", " ").toLowerCase().startsWith("yes")),
    e
  );
}
function ku(t, n) {
  const e = {},
    i = t.uri.split("/");
  return (
    (e.id = n),
    (e.name = t._name),
    (e.model = i.length ? i[i.length - 1] : ""),
    (e.uri = t.uri),
    (e.uuid = null),
    (e.status = t.status),
    (e.local = t.printserver === "local"),
    (e.default = t.default === "yes"),
    (e.shared = t.shared === "yes"),
    e
  );
}
function Fu(t, n) {
  const e = {},
    i = parseInt(he.getValue(t, "PrinterStatus", ":"), 10);
  return (
    (e.id = n),
    (e.name = he.getValue(t, "name", ":")),
    (e.model = he.getValue(t, "DriverName", ":")),
    (e.uri = null),
    (e.uuid = null),
    (e.status = hs[i] ? hs[i] : null),
    (e.local = he.getValue(t, "Local", ":").toUpperCase() === "TRUE"),
    (e.default = he.getValue(t, "Default", ":").toUpperCase() === "TRUE"),
    (e.shared = he.getValue(t, "Shared", ":").toUpperCase() === "TRUE"),
    e
  );
}
function Wu(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (ms || Au || Tu || Du) {
        let i = "cat /etc/cups/printers.conf 2>/dev/null";
        Ki(i, function (s, r) {
          if (!s) {
            const o = r.toString().split("<Printer "),
              a = Vu(o[0]);
            for (let c = 1; c < o.length; c++) {
              const u = Nu(
                o[c].split(`
`),
              );
              u.name &&
                ((u.engine = "CUPS"),
                (u.engineVersion = a.cupsVersion),
                e.push(u));
            }
          }
          e.length === 0 && ms
            ? ((i = "export LC_ALL=C; lpstat -lp 2>/dev/null; unset LC_ALL"),
              Ki(i, function (o, a) {
                const c = (
                  `
` + a.toString()
                ).split(`
printer `);
                for (let u = 1; u < c.length; u++) {
                  const l = Bu(
                    c[u].split(`
`),
                    u,
                  );
                  e.push(l);
                }
              }),
              t && t(e),
              n(e))
            : (t && t(e), n(e));
        });
      }
      (Eu &&
        Ki("system_profiler SPPrintersDataType -json", function (s, r) {
          if (!s)
            try {
              const o = JSON.parse(r.toString());
              if (o.SPPrintersDataType && o.SPPrintersDataType.length)
                for (let a = 0; a < o.SPPrintersDataType.length; a++) {
                  const c = ku(o.SPPrintersDataType[a], a);
                  e.push(c);
                }
            } catch {
              he.noop();
            }
          (t && t(e), n(e));
        }),
        Mu &&
          he
            .powerShell(
              "Get-CimInstance Win32_Printer | select PrinterStatus,Name,DriverName,Local,Default,Shared | fl",
            )
            .then((i, s) => {
              if (!s) {
                const r = i.toString().split(/\n\s*\n/);
                for (let o = 0; o < r.length; o++) {
                  const a = Fu(
                    r[o].split(`
`),
                    o,
                  );
                  (a.name || a.model) && e.push(a);
                }
              }
              (t && t(e), n(e));
            }),
        bu && n(null));
    });
  });
}
wo.printer = Wu;
var Co = {};
const gs = se.exec,
  Fe = V;
let Pt = process.platform;
const Ru = Pt === "linux" || Pt === "android",
  Gu = Pt === "darwin",
  $u = Pt === "win32",
  zu = Pt === "freebsd",
  Uu = Pt === "openbsd",
  Hu = Pt === "netbsd",
  ju = Pt === "sunos";
function Ku(t, n) {
  let e = t;
  const i = (n + " " + t).toLowerCase();
  return (
    i.indexOf("camera") >= 0
      ? (e = "Camera")
      : i.indexOf("hub") >= 0
        ? (e = "Hub")
        : i.indexOf("keybrd") >= 0 || i.indexOf("keyboard") >= 0
          ? (e = "Keyboard")
          : i.indexOf("mouse") >= 0
            ? (e = "Mouse")
            : i.indexOf("stora") >= 0
              ? (e = "Storage")
              : i.indexOf("microp") >= 0
                ? (e = "Microphone")
                : (i.indexOf("headset") >= 0 || i.indexOf("audio") >= 0) &&
                  (e = "Audio"),
    e
  );
}
function Xu(t) {
  const n = {},
    e = t.split(`
`);
  if (e && e.length && e[0].indexOf("Device") >= 0) {
    const x = e[0].split(" ");
    ((n.bus = parseInt(x[0], 10)),
      x[2] ? (n.deviceId = parseInt(x[2], 10)) : (n.deviceId = null));
  } else ((n.bus = null), (n.deviceId = null));
  const i = Fe.getValue(e, "idVendor", " ", !0).trim();
  let s = i.split(" ");
  s.shift();
  const r = s.join(" "),
    o = Fe.getValue(e, "idProduct", " ", !0).trim();
  let a = o.split(" ");
  a.shift();
  const c = a.join(" ");
  let l = Fe.getValue(e, "bInterfaceClass", " ", !0).trim().split(" ");
  l.shift();
  const f = l.join(" ");
  let d = Fe.getValue(e, "iManufacturer", " ", !0).trim().split(" ");
  d.shift();
  const m = d.join(" ");
  let y = Fe.getValue(e, "iSerial", " ", !0).trim().split(" ");
  y.shift();
  const g = y.join(" ");
  return (
    (n.id =
      (i.startsWith("0x") ? i.split(" ")[0].substr(2, 10) : "") +
      ":" +
      (o.startsWith("0x") ? o.split(" ")[0].substr(2, 10) : "")),
    (n.name = c),
    (n.type = Ku(f, c)),
    (n.removable = null),
    (n.vendor = r),
    (n.manufacturer = m),
    (n.maxPower = Fe.getValue(e, "MaxPower", " ", !0)),
    (n.serialNumber = g),
    n
  );
}
function qu(t) {
  let n = "";
  return (
    t.indexOf("camera") >= 0
      ? (n = "Camera")
      : t.indexOf("touch bar") >= 0
        ? (n = "Touch Bar")
        : t.indexOf("controller") >= 0
          ? (n = "Controller")
          : t.indexOf("headset") >= 0
            ? (n = "Audio")
            : t.indexOf("keyboard") >= 0
              ? (n = "Keyboard")
              : t.indexOf("trackpad") >= 0
                ? (n = "Trackpad")
                : t.indexOf("sensor") >= 0
                  ? (n = "Sensor")
                  : t.indexOf("bthusb") >= 0 ||
                      t.indexOf("bth") >= 0 ||
                      t.indexOf("rfcomm") >= 0
                    ? (n = "Bluetooth")
                    : t.indexOf("usbhub") >= 0 || t.indexOf(" hub") >= 0
                      ? (n = "Hub")
                      : t.indexOf("mouse") >= 0
                        ? (n = "Mouse")
                        : t.indexOf("microp") >= 0
                          ? (n = "Microphone")
                          : t.indexOf("removable") >= 0 && (n = "Storage"),
    n
  );
}
function Yu(t, n) {
  const e = {};
  ((e.id = n), (t = t.replace(/ \|/g, "")), (t = t.trim()));
  let i = t.split(`
`);
  i.shift();
  try {
    for (let o = 0; o < i.length; o++) {
      ((i[o] = i[o].trim()),
        (i[o] = i[o].replace(/=/g, ":")),
        i[o] !== "{" &&
          i[o] !== "}" &&
          i[o + 1] &&
          i[o + 1].trim() !== "}" &&
          (i[o] = i[o] + ","),
        (i[o] = i[o].replace(":Yes,", ':"Yes",')),
        (i[o] = i[o].replace(": Yes,", ': "Yes",')),
        (i[o] = i[o].replace(": Yes", ': "Yes"')),
        (i[o] = i[o].replace(":No,", ':"No",')),
        (i[o] = i[o].replace(": No,", ': "No",')),
        (i[o] = i[o].replace(": No", ': "No"')),
        (i[o] = i[o].replace("((", "").replace("))", "")));
      const a = /<(\w+)>/.exec(i[o]);
      if (a) {
        const c = a[0];
        i[o] = i[o].replace(c, `"${c}"`);
      }
    }
    const s = JSON.parse(
        i.join(`
`),
      ),
      r =
        (s["Built-In"] ? s["Built-In"].toLowerCase() !== "yes" : !0) &&
        (s["non-removable"] ? s["non-removable"].toLowerCase() === "no" : !0);
    return (
      (e.bus = null),
      (e.deviceId = null),
      (e.id = s["USB Address"] || null),
      (e.name = s.kUSBProductString || s["USB Product Name"] || null),
      (e.type = qu(
        (s.kUSBProductString || s["USB Product Name"] || "").toLowerCase() +
          (r ? " removable" : ""),
      )),
      (e.removable = s["non-removable"]
        ? s["non-removable"].toLowerCase() || !1
        : !0),
      (e.vendor = s.kUSBVendorString || s["USB Vendor Name"] || null),
      (e.manufacturer = s.kUSBVendorString || s["USB Vendor Name"] || null),
      (e.maxPower = null),
      (e.serialNumber = s.kUSBSerialNumberString || null),
      e.name ? e : null
    );
  } catch {
    return null;
  }
}
function Ju(t, n) {
  let e = "";
  return (
    n.indexOf("storage") >= 0 || n.indexOf("speicher") >= 0
      ? (e = "Storage")
      : t.indexOf("usbhub") >= 0
        ? (e = "Hub")
        : t.indexOf("storage") >= 0
          ? (e = "Storage")
          : t.indexOf("usbcontroller") >= 0
            ? (e = "Controller")
            : t.indexOf("keyboard") >= 0
              ? (e = "Keyboard")
              : t.indexOf("pointing") >= 0
                ? (e = "Mouse")
                : t.indexOf("microp") >= 0
                  ? (e = "Microphone")
                  : t.indexOf("disk") >= 0 && (e = "Storage"),
    e
  );
}
function Qu(t, n) {
  const e = Ju(
    Fe.getValue(t, "CreationClassName", ":").toLowerCase(),
    Fe.getValue(t, "name", ":").toLowerCase(),
  );
  if (e) {
    const i = {};
    return (
      (i.bus = null),
      (i.deviceId = Fe.getValue(t, "deviceid", ":")),
      (i.id = n),
      (i.name = Fe.getValue(t, "name", ":")),
      (i.type = e),
      (i.removable = null),
      (i.vendor = null),
      (i.manufacturer = Fe.getValue(t, "Manufacturer", ":")),
      (i.maxPower = null),
      (i.serialNumber = null),
      i
    );
  } else return null;
}
function Zu(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      (Ru &&
        gs(
          "export LC_ALL=C; lsusb -v 2>/dev/null; unset LC_ALL",
          { maxBuffer: 1024 * 1024 * 128 },
          function (s, r) {
            if (!s) {
              const o = (
                `

` + r.toString()
              ).split(`

Bus `);
              for (let a = 1; a < o.length; a++) {
                const c = Xu(o[a]);
                e.push(c);
              }
            }
            (t && t(e), n(e));
          },
        ),
        Gu &&
          gs(
            "ioreg -p IOUSB -c AppleUSBRootHubDevice -w0 -l",
            { maxBuffer: 1024 * 1024 * 128 },
            function (s, r) {
              if (!s) {
                const o = r.toString().split(" +-o ");
                for (let a = 1; a < o.length; a++) {
                  const c = Yu(o[a]);
                  c && e.push(c);
                }
                (t && t(e), n(e));
              }
              (t && t(e), n(e));
            },
          ),
        $u &&
          Fe.powerShell(
            'Get-CimInstance CIM_LogicalDevice | where { $_.Description -match "USB"} | select Name,CreationClassName,DeviceId,Manufacturer | fl',
          ).then((i, s) => {
            if (!s) {
              const r = i.toString().split(/\n\s*\n/);
              for (let o = 0; o < r.length; o++) {
                const a = Qu(
                  r[o].split(`
`),
                  o,
                );
                a &&
                  e.filter((c) => c.deviceId === a.deviceId).length === 0 &&
                  e.push(a);
              }
            }
            (t && t(e), n(e));
          }),
        (ju || zu || Uu || Hu) && n(null));
    });
  });
}
Co.usb = Zu;
var Lo = {};
const ys = se.exec,
  e0 = se.execSync,
  Ce = V;
let Et = process.platform;
const t0 = Et === "linux" || Et === "android",
  n0 = Et === "darwin",
  i0 = Et === "win32",
  r0 = Et === "freebsd",
  s0 = Et === "openbsd",
  o0 = Et === "netbsd",
  a0 = Et === "sunos";
function Dr(t, n, e) {
  t = t.toLowerCase();
  let i = "";
  return (
    t.indexOf("input") >= 0 && (i = "Microphone"),
    t.indexOf("display audio") >= 0 && (i = "Speaker"),
    t.indexOf("speak") >= 0 && (i = "Speaker"),
    t.indexOf("laut") >= 0 && (i = "Speaker"),
    t.indexOf("loud") >= 0 && (i = "Speaker"),
    t.indexOf("head") >= 0 && (i = "Headset"),
    t.indexOf("mic") >= 0 && (i = "Microphone"),
    t.indexOf("mikr") >= 0 && (i = "Microphone"),
    t.indexOf("phone") >= 0 && (i = "Phone"),
    t.indexOf("controll") >= 0 && (i = "Controller"),
    t.indexOf("line o") >= 0 && (i = "Line Out"),
    t.indexOf("digital o") >= 0 && (i = "Digital Out"),
    t.indexOf("smart sound technology") >= 0 &&
      (i = "Digital Signal Processor"),
    t.indexOf("high definition audio") >= 0 && (i = "Sound Driver"),
    !i && e ? (i = "Speaker") : !i && n && (i = "Microphone"),
    i
  );
}
function l0() {
  let t = "lspci -v 2>/dev/null",
    n = [];
  try {
    return (
      e0(t, Ce.execOptsLinux)
        .toString()
        .split(
          `

`,
        )
        .forEach((i) => {
          const s = i.split(`
`);
          if (s && s.length && s[0].toLowerCase().indexOf("audio") >= 0) {
            const r = {};
            ((r.slotId = s[0].split(" ")[0]),
              (r.driver =
                Ce.getValue(s, "Kernel driver in use", ":", !0) ||
                Ce.getValue(s, "Kernel modules", ":", !0)),
              n.push(r));
          }
        }),
      n
    );
  } catch {
    return n;
  }
}
function c0(t, n) {
  const e = {},
    i = Ce.getValue(t, "Slot"),
    s = n.filter(function (r) {
      return r.slotId === i;
    });
  return (
    (e.id = i),
    (e.name = Ce.getValue(t, "SDevice")),
    (e.manufacturer = Ce.getValue(t, "SVendor")),
    (e.revision = Ce.getValue(t, "Rev")),
    (e.driver = s && s.length === 1 && s[0].driver ? s[0].driver : ""),
    (e.default = null),
    (e.channel = "PCIe"),
    (e.type = Dr(e.name, null, null)),
    (e.in = null),
    (e.out = null),
    (e.status = "online"),
    e
  );
}
function u0(t) {
  let n = "";
  return (
    t.indexOf("builtin") >= 0 && (n = "Built-In"),
    t.indexOf("extern") >= 0 && (n = "Audio-Jack"),
    t.indexOf("hdmi") >= 0 && (n = "HDMI"),
    t.indexOf("displayport") >= 0 && (n = "Display-Port"),
    t.indexOf("usb") >= 0 && (n = "USB"),
    t.indexOf("pci") >= 0 && (n = "PCIe"),
    n
  );
}
function p0(t, n) {
  const e = {},
    i = (
      (t.coreaudio_device_transport || "") +
      " " +
      (t._name || "")
    ).toLowerCase();
  return (
    (e.id = n),
    (e.name = t._name),
    (e.manufacturer = t.coreaudio_device_manufacturer),
    (e.revision = null),
    (e.driver = null),
    (e.default =
      !!t.coreaudio_default_audio_input_device ||
      !!t.coreaudio_default_audio_output_device),
    (e.channel = u0(i)),
    (e.type = Dr(
      e.name,
      !!t.coreaudio_device_input,
      !!t.coreaudio_device_output,
    )),
    (e.in = !!t.coreaudio_device_input),
    (e.out = !!t.coreaudio_device_output),
    (e.status = "online"),
    e
  );
}
function f0(t) {
  const n = {},
    e = Ce.getValue(t, "StatusInfo", ":");
  return (
    (n.id = Ce.getValue(t, "DeviceID", ":")),
    (n.name = Ce.getValue(t, "name", ":")),
    (n.manufacturer = Ce.getValue(t, "manufacturer", ":")),
    (n.revision = null),
    (n.driver = null),
    (n.default = null),
    (n.channel = null),
    (n.type = Dr(n.name, null, null)),
    (n.in = null),
    (n.out = null),
    (n.status = e),
    n
  );
}
function d0(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      ((t0 || r0 || s0 || o0) &&
        ys("lspci -vmm 2>/dev/null", function (s, r) {
          if (!s) {
            const o = l0();
            r.toString()
              .split(
                `

`,
              )
              .forEach((c) => {
                const u = c.split(`
`);
                if (
                  Ce.getValue(u, "class", ":", !0)
                    .toLowerCase()
                    .indexOf("audio") >= 0
                ) {
                  const l = c0(u, o);
                  e.push(l);
                }
              });
          }
          (t && t(e), n(e));
        }),
        n0 &&
          ys("system_profiler SPAudioDataType -json", function (s, r) {
            if (!s)
              try {
                const o = JSON.parse(r.toString());
                if (
                  o.SPAudioDataType &&
                  o.SPAudioDataType.length &&
                  o.SPAudioDataType[0] &&
                  o.SPAudioDataType[0]._items &&
                  o.SPAudioDataType[0]._items.length
                )
                  for (let a = 0; a < o.SPAudioDataType[0]._items.length; a++) {
                    const c = p0(o.SPAudioDataType[0]._items[a], a);
                    e.push(c);
                  }
              } catch {
                Ce.noop();
              }
            (t && t(e), n(e));
          }),
        i0 &&
          Ce.powerShell(
            "Get-CimInstance Win32_SoundDevice | select DeviceID,StatusInfo,Name,Manufacturer | fl",
          ).then((i, s) => {
            (s ||
              i
                .toString()
                .split(/\n\s*\n/)
                .forEach((o) => {
                  const a = o.split(`
`);
                  Ce.getValue(a, "name", ":") && e.push(f0(a));
                }),
              t && t(e),
              n(e));
          }),
        a0 && n(null));
    });
  });
}
Lo.audio = d0;
var Io = {},
  m0 = {
    0: "Ericsson Technology Licensing",
    1: "Nokia Mobile Phones",
    2: "Intel Corp.",
    3: "IBM Corp.",
    4: "Toshiba Corp.",
    5: "3Com",
    6: "Microsoft",
    7: "Lucent",
    8: "Motorola",
    9: "Infineon Technologies AG",
    10: "Cambridge Silicon Radio",
    11: "Silicon Wave",
    12: "Digianswer A/S",
    13: "Texas Instruments Inc.",
    14: "Ceva, Inc. (formerly Parthus Technologies, Inc.)",
    15: "Broadcom Corporation",
    16: "Mitel Semiconductor",
    17: "Widcomm, Inc",
    18: "Zeevo, Inc.",
    19: "Atmel Corporation",
    20: "Mitsubishi Electric Corporation",
    21: "RTX Telecom A/S",
    22: "KC Technology Inc.",
    23: "NewLogic",
    24: "Transilica, Inc.",
    25: "Rohde & Schwarz GmbH & Co. KG",
    26: "TTPCom Limited",
    27: "Signia Technologies, Inc.",
    28: "Conexant Systems Inc.",
    29: "Qualcomm",
    30: "Inventel",
    31: "AVM Berlin",
    32: "BandSpeed, Inc.",
    33: "Mansella Ltd",
    34: "NEC Corporation",
    35: "WavePlus Technology Co., Ltd.",
    36: "Alcatel",
    37: "NXP Semiconductors (formerly Philips Semiconductors)",
    38: "C Technologies",
    39: "Open Interface",
    40: "R F Micro Devices",
    41: "Hitachi Ltd",
    42: "Symbol Technologies, Inc.",
    43: "Tenovis",
    44: "Macronix International Co. Ltd.",
    45: "GCT Semiconductor",
    46: "Norwood Systems",
    47: "MewTel Technology Inc.",
    48: "ST Microelectronics",
    49: "Synopsis",
    50: "Red-M (Communications) Ltd",
    51: "Commil Ltd",
    52: "Computer Access Technology Corporation (CATC)",
    53: "Eclipse (HQ Espana) S.L.",
    54: "Renesas Electronics Corporation",
    55: "Mobilian Corporation",
    56: "Terax",
    57: "Integrated System Solution Corp.",
    58: "Matsushita Electric Industrial Co., Ltd.",
    59: "Gennum Corporation",
    60: "BlackBerry Limited (formerly Research In Motion)",
    61: "IPextreme, Inc.",
    62: "Systems and Chips, Inc.",
    63: "Bluetooth SIG, Inc.",
    64: "Seiko Epson Corporation",
    65: "Integrated Silicon Solution Taiwan, Inc.",
    66: "CONWISE Technology Corporation Ltd",
    67: "PARROT SA",
    68: "Socket Mobile",
    69: "Atheros Communications, Inc.",
    70: "MediaTek, Inc.",
    71: "Bluegiga",
    72: "Marvell Technology Group Ltd.",
    73: "3DSP Corporation",
    74: "Accel Semiconductor Ltd.",
    75: "Continental Automotive Systems",
    76: "Apple, Inc.",
    77: "Staccato Communications, Inc.",
    78: "Avago Technologies",
    79: "APT Licensing Ltd.",
    80: "SiRF Technology",
    81: "Tzero Technologies, Inc.",
    82: "J&M Corporation",
    83: "Free2move AB",
    84: "3DiJoy Corporation",
    85: "Plantronics, Inc.",
    86: "Sony Ericsson Mobile Communications",
    87: "Harman International Industries, Inc.",
    88: "Vizio, Inc.",
    89: "Nordic Semiconductor ASA",
    90: "EM Microelectronic-Marin SA",
    91: "Ralink Technology Corporation",
    92: "Belkin International, Inc.",
    93: "Realtek Semiconductor Corporation",
    94: "Stonestreet One, LLC",
    95: "Wicentric, Inc.",
    96: "RivieraWaves S.A.S",
    97: "RDA Microelectronics",
    98: "Gibson Guitars",
    99: "MiCommand Inc.",
    100: "Band XI International, LLC",
    101: "Hewlett-Packard Company",
    102: "9Solutions Oy",
    103: "GN Netcom A/S",
    104: "General Motors",
    105: "A&D Engineering, Inc.",
    106: "MindTree Ltd.",
    107: "Polar Electro OY",
    108: "Beautiful Enterprise Co., Ltd.",
    109: "BriarTek, Inc.",
    110: "Summit Data Communications, Inc.",
    111: "Sound ID",
    112: "Monster, LLC",
    113: "connectBlue AB",
    114: "ShangHai Super Smart Electronics Co. Ltd.",
    115: "Group Sense Ltd.",
    116: "Zomm, LLC",
    117: "Samsung Electronics Co. Ltd.",
    118: "Creative Technology Ltd.",
    119: "Laird Technologies",
    120: "Nike, Inc.",
    121: "lesswire AG",
    122: "MStar Semiconductor, Inc.",
    123: "Hanlynn Technologies",
    124: "A & R Cambridge",
    125: "Seers Technology Co. Ltd",
    126: "Sports Tracking Technologies Ltd.",
    127: "Autonet Mobile",
    128: "DeLorme Publishing Company, Inc.",
    129: "WuXi Vimicro",
    130: "Sennheiser Communications A/S",
    131: "TimeKeeping Systems, Inc.",
    132: "Ludus Helsinki Ltd.",
    133: "BlueRadios, Inc.",
    134: "equinox AG",
    135: "Garmin International, Inc.",
    136: "Ecotest",
    137: "GN ReSound A/S",
    138: "Jawbone",
    139: "Topcorn Positioning Systems, LLC",
    140: "Gimbal Inc. (formerly Qualcomm Labs, Inc. and Qualcomm Retail Solutions, Inc.)",
    141: "Zscan Software",
    142: "Quintic Corp.",
    143: "Stollman E+V GmbH",
    144: "Funai Electric Co., Ltd.",
    145: "Advanced PANMOBIL Systems GmbH & Co. KG",
    146: "ThinkOptics, Inc.",
    147: "Universal Electronics, Inc.",
    148: "Airoha Technology Corp.",
    149: "NEC Lighting, Ltd.",
    150: "ODM Technology, Inc.",
    151: "ConnecteDevice Ltd.",
    152: "zer01.tv GmbH",
    153: "i.Tech Dynamic Global Distribution Ltd.",
    154: "Alpwise",
    155: "Jiangsu Toppower Automotive Electronics Co., Ltd.",
    156: "Colorfy, Inc.",
    157: "Geoforce Inc.",
    158: "Bose Corporation",
    159: "Suunto Oy",
    160: "Kensington Computer Products Group",
    161: "SR-Medizinelektronik",
    162: "Vertu Corporation Limited",
    163: "Meta Watch Ltd.",
    164: "LINAK A/S",
    165: "OTL Dynamics LLC",
    166: "Panda Ocean Inc.",
    167: "Visteon Corporation",
    168: "ARP Devices Limited",
    169: "Magneti Marelli S.p.A",
    170: "CAEN RFID srl",
    171: "Ingenieur-Systemgruppe Zahn GmbH",
    172: "Green Throttle Games",
    173: "Peter Systemtechnik GmbH",
    174: "Omegawave Oy",
    175: "Cinetix",
    176: "Passif Semiconductor Corp",
    177: "Saris Cycling Group, Inc",
    178: "Bekey A/S",
    179: "Clarinox Technologies Pty. Ltd.",
    180: "BDE Technology Co., Ltd.",
    181: "Swirl Networks",
    182: "Meso international",
    183: "TreLab Ltd",
    184: "Qualcomm Innovation Center, Inc. (QuIC)",
    185: "Johnson Controls, Inc.",
    186: "Starkey Laboratories Inc.",
    187: "S-Power Electronics Limited",
    188: "Ace Sensor Inc",
    189: "Aplix Corporation",
    190: "AAMP of America",
    191: "Stalmart Technology Limited",
    192: "AMICCOM Electronics Corporation",
    193: "Shenzhen Excelsecu Data Technology Co.,Ltd",
    194: "Geneq Inc.",
    195: "adidas AG",
    196: "LG Electronics",
    197: "Onset Computer Corporation",
    198: "Selfly BV",
    199: "Quuppa Oy.",
    200: "GeLo Inc",
    201: "Evluma",
    202: "MC10",
    203: "Binauric SE",
    204: "Beats Electronics",
    205: "Microchip Technology Inc.",
    206: "Elgato Systems GmbH",
    207: "ARCHOS SA",
    208: "Dexcom, Inc.",
    209: "Polar Electro Europe B.V.",
    210: "Dialog Semiconductor B.V.",
    211: "Taixingbang Technology (HK) Co,. LTD.",
    212: "Kawantech",
    213: "Austco Communication Systems",
    214: "Timex Group USA, Inc.",
    215: "Qualcomm Technologies, Inc.",
    216: "Qualcomm Connected Experiences, Inc.",
    217: "Voyetra Turtle Beach",
    218: "txtr GmbH",
    219: "Biosentronics",
    220: "Procter & Gamble",
    221: "Hosiden Corporation",
    222: "Muzik LLC",
    223: "Misfit Wearables Corp",
    224: "Google",
    225: "Danlers Ltd",
    226: "Semilink Inc",
    227: "inMusic Brands, Inc",
    228: "L.S. Research Inc.",
    229: "Eden Software Consultants Ltd.",
    230: "Freshtemp",
    231: "KS Technologies",
    232: "ACTS Technologies",
    233: "Vtrack Systems",
    234: "Nielsen-Kellerman Company",
    235: "Server Technology, Inc.",
    236: "BioResearch Associates",
    237: "Jolly Logic, LLC",
    238: "Above Average Outcomes, Inc.",
    239: "Bitsplitters GmbH",
    240: "PayPal, Inc.",
    241: "Witron Technology Limited",
    242: "Aether Things Inc. (formerly Morse Project Inc.)",
    243: "Kent Displays Inc.",
    244: "Nautilus Inc.",
    245: "Smartifier Oy",
    246: "Elcometer Limited",
    247: "VSN Technologies Inc.",
    248: "AceUni Corp., Ltd.",
    249: "StickNFind",
    250: "Crystal Code AB",
    251: "KOUKAAM a.s.",
    252: "Delphi Corporation",
    253: "ValenceTech Limited",
    254: "Reserved",
    255: "Typo Products, LLC",
    256: "TomTom International BV",
    257: "Fugoo, Inc",
    258: "Keiser Corporation",
    259: "Bang & Olufsen A/S",
    260: "PLUS Locations Systems Pty Ltd",
    261: "Ubiquitous Computing Technology Corporation",
    262: "Innovative Yachtter Solutions",
    263: "William Demant Holding A/S",
    264: "Chicony Electronics Co., Ltd.",
    265: "Atus BV",
    266: "Codegate Ltd.",
    267: "ERi, Inc.",
    268: "Transducers Direct, LLC",
    269: "Fujitsu Ten Limited",
    270: "Audi AG",
    271: "HiSilicon Technologies Co., Ltd.",
    272: "Nippon Seiki Co., Ltd.",
    273: "Steelseries ApS",
    274: "vyzybl Inc.",
    275: "Openbrain Technologies, Co., Ltd.",
    276: "Xensr",
    277: "e.solutions",
    278: "1OAK Technologies",
    279: "Wimoto Technologies Inc",
    280: "Radius Networks, Inc.",
    281: "Wize Technology Co., Ltd.",
    282: "Qualcomm Labs, Inc.",
    283: "Aruba Networks",
    284: "Baidu",
    285: "Arendi AG",
    286: "Skoda Auto a.s.",
    287: "Volkswagon AG",
    288: "Porsche AG",
    289: "Sino Wealth Electronic Ltd.",
    290: "AirTurn, Inc.",
    291: "Kinsa, Inc.",
    292: "HID Global",
    293: "SEAT es",
    294: "Promethean Ltd.",
    295: "Salutica Allied Solutions",
    296: "GPSI Group Pty Ltd",
    297: "Nimble Devices Oy",
    298: "Changzhou Yongse Infotech Co., Ltd",
    299: "SportIQ",
    300: "TEMEC Instruments B.V.",
    301: "Sony Corporation",
    302: "ASSA ABLOY",
    303: "Clarion Co., Ltd.",
    304: "Warehouse Innovations",
    305: "Cypress Semiconductor Corporation",
    306: "MADS Inc",
    307: "Blue Maestro Limited",
    308: "Resolution Products, Inc.",
    309: "Airewear LLC",
    310: "Seed Labs, Inc. (formerly ETC sp. z.o.o.)",
    311: "Prestigio Plaza Ltd.",
    312: "NTEO Inc.",
    313: "Focus Systems Corporation",
    314: "Tencent Holdings Limited",
    315: "Allegion",
    316: "Murata Manufacuring Co., Ltd.",
    318: "Nod, Inc.",
    319: "B&B Manufacturing Company",
    320: "Alpine Electronics (China) Co., Ltd",
    321: "FedEx Services",
    322: "Grape Systems Inc.",
    323: "Bkon Connect",
    324: "Lintech GmbH",
    325: "Novatel Wireless",
    326: "Ciright",
    327: "Mighty Cast, Inc.",
    328: "Ambimat Electronics",
    329: "Perytons Ltd.",
    330: "Tivoli Audio, LLC",
    331: "Master Lock",
    332: "Mesh-Net Ltd",
    333: "Huizhou Desay SV Automotive CO., LTD.",
    334: "Tangerine, Inc.",
    335: "B&W Group Ltd.",
    336: "Pioneer Corporation",
    337: "OnBeep",
    338: "Vernier Software & Technology",
    339: "ROL Ergo",
    340: "Pebble Technology",
    341: "NETATMO",
    342: "Accumulate AB",
    343: "Anhui Huami Information Technology Co., Ltd.",
    344: "Inmite s.r.o.",
    345: "ChefSteps, Inc.",
    346: "micas AG",
    347: "Biomedical Research Ltd.",
    348: "Pitius Tec S.L.",
    349: "Estimote, Inc.",
    350: "Unikey Technologies, Inc.",
    351: "Timer Cap Co.",
    352: "AwoX",
    353: "yikes",
    354: "MADSGlobal NZ Ltd.",
    355: "PCH International",
    356: "Qingdao Yeelink Information Technology Co., Ltd.",
    357: "Milwaukee Tool (formerly Milwaukee Electric Tools)",
    358: "MISHIK Pte Ltd",
    359: "Bayer HealthCare",
    360: "Spicebox LLC",
    361: "emberlight",
    362: "Cooper-Atkins Corporation",
    363: "Qblinks",
    364: "MYSPHERA",
    365: "LifeScan Inc",
    366: "Volantic AB",
    367: "Podo Labs, Inc",
    368: "Roche Diabetes Care AG",
    369: "Amazon Fulfillment Service",
    370: "Connovate Technology Private Limited",
    371: "Kocomojo, LLC",
    372: "Everykey LLC",
    373: "Dynamic Controls",
    374: "SentriLock",
    375: "I-SYST inc.",
    376: "CASIO COMPUTER CO., LTD.",
    377: "LAPIS Semiconductor Co., Ltd.",
    378: "Telemonitor, Inc.",
    379: "taskit GmbH",
    380: "Daimler AG",
    381: "BatAndCat",
    382: "BluDotz Ltd",
    383: "XTel ApS",
    384: "Gigaset Communications GmbH",
    385: "Gecko Health Innovations, Inc.",
    386: "HOP Ubiquitous",
    387: "To Be Assigned",
    388: "Nectar",
    389: "bel’apps LLC",
    390: "CORE Lighting Ltd",
    391: "Seraphim Sense Ltd",
    392: "Unico RBC",
    393: "Physical Enterprises Inc.",
    394: "Able Trend Technology Limited",
    395: "Konica Minolta, Inc.",
    396: "Wilo SE",
    397: "Extron Design Services",
    398: "Fitbit, Inc.",
    399: "Fireflies Systems",
    400: "Intelletto Technologies Inc.",
    401: "FDK CORPORATION",
    402: "Cloudleaf, Inc",
    403: "Maveric Automation LLC",
    404: "Acoustic Stream Corporation",
    405: "Zuli",
    406: "Paxton Access Ltd",
    407: "WiSilica Inc",
    408: "Vengit Limited",
    409: "SALTO SYSTEMS S.L.",
    410: "TRON Forum (formerly T-Engine Forum)",
    411: "CUBETECH s.r.o.",
    412: "Cokiya Incorporated",
    413: "CVS Health",
    414: "Ceruus",
    415: "Strainstall Ltd",
    416: "Channel Enterprises (HK) Ltd.",
    417: "FIAMM",
    418: "GIGALANE.CO.,LTD",
    419: "EROAD",
    420: "Mine Safety Appliances",
    421: "Icon Health and Fitness",
    422: "Asandoo GmbH",
    423: "ENERGOUS CORPORATION",
    424: "Taobao",
    425: "Canon Inc.",
    426: "Geophysical Technology Inc.",
    427: "Facebook, Inc.",
    428: "Nipro Diagnostics, Inc.",
    429: "FlightSafety International",
    430: "Earlens Corporation",
    431: "Sunrise Micro Devices, Inc.",
    432: "Star Micronics Co., Ltd.",
    433: "Netizens Sp. z o.o.",
    434: "Nymi Inc.",
    435: "Nytec, Inc.",
    436: "Trineo Sp. z o.o.",
    437: "Nest Labs Inc.",
    438: "LM Technologies Ltd",
    439: "General Electric Company",
    440: "i+D3 S.L.",
    441: "HANA Micron",
    442: "Stages Cycling LLC",
    443: "Cochlear Bone Anchored Solutions AB",
    444: "SenionLab AB",
    445: "Syszone Co., Ltd",
    446: "Pulsate Mobile Ltd.",
    447: "Hong Kong HunterSun Electronic Limited",
    448: "pironex GmbH",
    449: "BRADATECH Corp.",
    450: "Transenergooil AG",
    451: "Bunch",
    452: "DME Microelectronics",
    453: "Bitcraze AB",
    454: "HASWARE Inc.",
    455: "Abiogenix Inc.",
    456: "Poly-Control ApS",
    457: "Avi-on",
    458: "Laerdal Medical AS",
    459: "Fetch My Pet",
    460: "Sam Labs Ltd.",
    461: "Chengdu Synwing Technology Ltd",
    462: "HOUWA SYSTEM DESIGN, k.k.",
    463: "BSH",
    464: "Primus Inter Pares Ltd",
    465: "August",
    466: "Gill Electronics",
    467: "Sky Wave Design",
    468: "Newlab S.r.l.",
    469: "ELAD srl",
    470: "G-wearables inc.",
    471: "Squadrone Systems Inc.",
    472: "Code Corporation",
    473: "Savant Systems LLC",
    474: "Logitech International SA",
    475: "Innblue Consulting",
    476: "iParking Ltd.",
    477: "Koninklijke Philips Electronics N.V.",
    478: "Minelab Electronics Pty Limited",
    479: "Bison Group Ltd.",
    480: "Widex A/S",
    481: "Jolla Ltd",
    482: "Lectronix, Inc.",
    483: "Caterpillar Inc",
    484: "Freedom Innovations",
    485: "Dynamic Devices Ltd",
    486: "Technology Solutions (UK) Ltd",
    487: "IPS Group Inc.",
    488: "STIR",
    489: "Sano, Inc",
    490: "Advanced Application Design, Inc.",
    491: "AutoMap LLC",
    492: "Spreadtrum Communications Shanghai Ltd",
    493: "CuteCircuit LTD",
    494: "Valeo Service",
    495: "Fullpower Technologies, Inc.",
    496: "KloudNation",
    497: "Zebra Technologies Corporation",
    498: "Itron, Inc.",
    499: "The University of Tokyo",
    500: "UTC Fire and Security",
    501: "Cool Webthings Limited",
    502: "DJO Global",
    503: "Gelliner Limited",
    504: "Anyka (Guangzhou) Microelectronics Technology Co, LTD",
    505: "Medtronic, Inc.",
    506: "Gozio, Inc.",
    507: "Form Lifting, LLC",
    508: "Wahoo Fitness, LLC",
    509: "Kontakt Micro-Location Sp. z o.o.",
    510: "Radio System Corporation",
    511: "Freescale Semiconductor, Inc.",
    512: "Verifone Systems PTe Ltd. Taiwan Branch",
    513: "AR Timing",
    514: "Rigado LLC",
    515: "Kemppi Oy",
    516: "Tapcentive Inc.",
    517: "Smartbotics Inc.",
    518: "Otter Products, LLC",
    519: "STEMP Inc.",
    520: "LumiGeek LLC",
    521: "InvisionHeart Inc.",
    522: "Macnica Inc. ",
    523: "Jaguar Land Rover Limited",
    524: "CoroWare Technologies, Inc",
    525: "Simplo Technology Co., LTD",
    526: "Omron Healthcare Co., LTD",
    527: "Comodule GMBH",
    528: "ikeGPS",
    529: "Telink Semiconductor Co. Ltd",
    530: "Interplan Co., Ltd",
    531: "Wyler AG",
    532: "IK Multimedia Production srl",
    533: "Lukoton Experience Oy",
    534: "MTI Ltd",
    535: "Tech4home, Lda",
    536: "Hiotech AB",
    537: "DOTT Limited",
    538: "Blue Speck Labs, LLC",
    539: "Cisco Systems, Inc",
    540: "Mobicomm Inc",
    541: "Edamic",
    542: "Goodnet, Ltd",
    543: "Luster Leaf Products Inc",
    544: "Manus Machina BV",
    545: "Mobiquity Networks Inc",
    546: "Praxis Dynamics",
    547: "Philip Morris Products S.A.",
    548: "Comarch SA",
    549: "Nestl Nespresso S.A.",
    550: "Merlinia A/S",
    551: "LifeBEAM Technologies",
    552: "Twocanoes Labs, LLC",
    553: "Muoverti Limited",
    554: "Stamer Musikanlagen GMBH",
    555: "Tesla Motors",
    556: "Pharynks Corporation",
    557: "Lupine",
    558: "Siemens AG",
    559: "Huami (Shanghai) Culture Communication CO., LTD",
    560: "Foster Electric Company, Ltd",
    561: "ETA SA",
    562: "x-Senso Solutions Kft",
    563: "Shenzhen SuLong Communication Ltd",
    564: "FengFan (BeiJing) Technology Co, Ltd",
    565: "Qrio Inc",
    566: "Pitpatpet Ltd",
    567: "MSHeli s.r.l.",
    568: "Trakm8 Ltd",
    569: "JIN CO, Ltd",
    570: "Alatech Tehnology",
    571: "Beijing CarePulse Electronic Technology Co, Ltd",
    572: "Awarepoint",
    573: "ViCentra B.V.",
    574: "Raven Industries",
    575: "WaveWare Technologies Inc.",
    576: "Argenox Technologies",
    577: "Bragi GmbH",
    578: "16Lab Inc",
    579: "Masimo Corp",
    580: "Iotera Inc",
    581: "Endress+Hauser",
    582: "ACKme Networks, Inc.",
    583: "FiftyThree Inc.",
    584: "Parker Hannifin Corp",
    585: "Transcranial Ltd",
    586: "Uwatec AG",
    587: "Orlan LLC",
    588: "Blue Clover Devices",
    589: "M-Way Solutions GmbH",
    590: "Microtronics Engineering GmbH",
    591: "Schneider Schreibgerte GmbH",
    592: "Sapphire Circuits LLC",
    593: "Lumo Bodytech Inc.",
    594: "UKC Technosolution",
    595: "Xicato Inc.",
    596: "Playbrush",
    597: "Dai Nippon Printing Co., Ltd.",
    598: "G24 Power Limited",
    599: "AdBabble Local Commerce Inc.",
    600: "Devialet SA",
    601: "ALTYOR",
    602: "University of Applied Sciences Valais/Haute Ecole Valaisanne",
    603: "Five Interactive, LLC dba Zendo",
    604: "NetEaseHangzhouNetwork co.Ltd.",
    605: "Lexmark International Inc.",
    606: "Fluke Corporation",
    607: "Yardarm Technologies",
    608: "SensaRx",
    609: "SECVRE GmbH",
    610: "Glacial Ridge Technologies",
    611: "Identiv, Inc.",
    612: "DDS, Inc.",
    613: "SMK Corporation",
    614: "Schawbel Technologies LLC",
    615: "XMI Systems SA",
    616: "Cerevo",
    617: "Torrox GmbH & Co KG",
    618: "Gemalto",
    619: "DEKA Research & Development Corp.",
    620: "Domster Tadeusz Szydlowski",
    621: "Technogym SPA",
    622: "FLEURBAEY BVBA",
    623: "Aptcode Solutions",
    624: "LSI ADL Technology",
    625: "Animas Corp",
    626: "Alps Electric Co., Ltd.",
    627: "OCEASOFT",
    628: "Motsai Research",
    629: "Geotab",
    630: "E.G.O. Elektro-Gertebau GmbH",
    631: "bewhere inc",
    632: "Johnson Outdoors Inc",
    633: "steute Schaltgerate GmbH & Co. KG",
    634: "Ekomini inc.",
    635: "DEFA AS",
    636: "Aseptika Ltd",
    637: "HUAWEI Technologies Co., Ltd. ( )",
    638: "HabitAware, LLC",
    639: "ruwido austria gmbh",
    640: "ITEC corporation",
    641: "StoneL",
    642: "Sonova AG",
    643: "Maven Machines, Inc.",
    644: "Synapse Electronics",
    645: "Standard Innovation Inc.",
    646: "RF Code, Inc.",
    647: "Wally Ventures S.L.",
    648: "Willowbank Electronics Ltd",
    649: "SK Telecom",
    650: "Jetro AS",
    651: "Code Gears LTD",
    652: "NANOLINK APS",
    653: "IF, LLC",
    654: "RF Digital Corp",
    655: "Church & Dwight Co., Inc",
    656: "Multibit Oy",
    657: "CliniCloud Inc",
    658: "SwiftSensors",
    659: "Blue Bite",
    660: "ELIAS GmbH",
    661: "Sivantos GmbH",
    662: "Petzl",
    663: "storm power ltd",
    664: "EISST Ltd",
    665: "Inexess Technology Simma KG",
    666: "Currant, Inc.",
    667: "C2 Development, Inc.",
    668: "Blue Sky Scientific, LLC",
    669: "ALOTTAZS LABS, LLC",
    670: "Kupson spol. s r.o.",
    671: "Areus Engineering GmbH",
    672: "Impossible Camera GmbH",
    673: "InventureTrack Systems",
    674: "LockedUp",
    675: "Itude",
    676: "Pacific Lock Company",
    677: "Tendyron Corporation ( )",
    678: "Robert Bosch GmbH",
    679: "Illuxtron international B.V.",
    680: "miSport Ltd.",
    681: "Chargelib",
    682: "Doppler Lab",
    683: "BBPOS Limited",
    684: "RTB Elektronik GmbH & Co. KG",
    685: "Rx Networks, Inc.",
    686: "WeatherFlow, Inc.",
    687: "Technicolor USA Inc.",
    688: "Bestechnic(Shanghai),Ltd",
    689: "Raden Inc",
    690: "JouZen Oy",
    691: "CLABER S.P.A.",
    692: "Hyginex, Inc.",
    693: "HANSHIN ELECTRIC RAILWAY CO.,LTD.",
    694: "Schneider Electric",
    695: "Oort Technologies LLC",
    696: "Chrono Therapeutics",
    697: "Rinnai Corporation",
    698: "Swissprime Technologies AG",
    699: "Koha.,Co.Ltd",
    700: "Genevac Ltd",
    701: "Chemtronics",
    702: "Seguro Technology Sp. z o.o.",
    703: "Redbird Flight Simulations",
    704: "Dash Robotics",
    705: "LINE Corporation",
    706: "Guillemot Corporation",
    707: "Techtronic Power Tools Technology Limited",
    708: "Wilson Sporting Goods",
    709: "Lenovo (Singapore) Pte Ltd. ( )",
    710: "Ayatan Sensors",
    711: "Electronics Tomorrow Limited",
    712: "VASCO Data Security International, Inc.",
    713: "PayRange Inc.",
    714: "ABOV Semiconductor",
    715: "AINA-Wireless Inc.",
    716: "Eijkelkamp Soil & Water",
    717: "BMA ergonomics b.v.",
    718: "Teva Branded Pharmaceutical Products R&D, Inc.",
    719: "Anima",
    720: "3M",
    721: "Empatica Srl",
    722: "Afero, Inc.",
    723: "Powercast Corporation",
    724: "Secuyou ApS",
    725: "OMRON Corporation",
    726: "Send Solutions",
    727: "NIPPON SYSTEMWARE CO.,LTD.",
    728: "Neosfar",
    729: "Fliegl Agrartechnik GmbH",
    730: "Gilvader",
    731: "Digi International Inc (R)",
    732: "DeWalch Technologies, Inc.",
    733: "Flint Rehabilitation Devices, LLC",
    734: "Samsung SDS Co., Ltd.",
    735: "Blur Product Development",
    736: "University of Michigan",
    737: "Victron Energy BV",
    738: "NTT docomo",
    739: "Carmanah Technologies Corp.",
    740: "Bytestorm Ltd.",
    741: "Espressif Incorporated ( () )",
    742: "Unwire",
    743: "Connected Yard, Inc.",
    744: "American Music Environments",
    745: "Sensogram Technologies, Inc.",
    746: "Fujitsu Limited",
    747: "Ardic Technology",
    748: "Delta Systems, Inc",
    749: "HTC Corporation",
    750: "Citizen Holdings Co., Ltd.",
    751: "SMART-INNOVATION.inc",
    752: "Blackrat Software",
    753: "The Idea Cave, LLC",
    754: "GoPro, Inc.",
    755: "AuthAir, Inc",
    756: "Vensi, Inc.",
    757: "Indagem Tech LLC",
    758: "Intemo Technologies",
    759: "DreamVisions co., Ltd.",
    760: "Runteq Oy Ltd",
    761: "IMAGINATION TECHNOLOGIES LTD",
    762: "CoSTAR TEchnologies",
    763: "Clarius Mobile Health Corp.",
    764: "Shanghai Frequen Microelectronics Co., Ltd.",
    765: "Uwanna, Inc.",
    766: "Lierda Science & Technology Group Co., Ltd.",
    767: "Silicon Laboratories",
    768: "World Moto Inc.",
    769: "Giatec Scientific Inc.",
    770: "Loop Devices, Inc",
    771: "IACA electronique",
    772: "Martians Inc",
    773: "Swipp ApS",
    774: "Life Laboratory Inc.",
    775: "FUJI INDUSTRIAL CO.,LTD.",
    776: "Surefire, LLC",
    777: "Dolby Labs",
    778: "Ellisys",
    779: "Magnitude Lighting Converters",
    780: "Hilti AG",
    781: "Devdata S.r.l.",
    782: "Deviceworx",
    783: "Shortcut Labs",
    784: "SGL Italia S.r.l.",
    785: "PEEQ DATA",
    786: "Ducere Technologies Pvt Ltd",
    787: "DiveNav, Inc.",
    788: "RIIG AI Sp. z o.o.",
    789: "Thermo Fisher Scientific",
    790: "AG Measurematics Pvt. Ltd.",
    791: "CHUO Electronics CO., LTD.",
    792: "Aspenta International",
    793: "Eugster Frismag AG",
    794: "Amber wireless GmbH",
    795: "HQ Inc",
    796: "Lab Sensor Solutions",
    797: "Enterlab ApS",
    798: "Eyefi, Inc.",
    799: "MetaSystem S.p.A.",
    800: "SONO ELECTRONICS. CO., LTD",
    801: "Jewelbots",
    802: "Compumedics Limited",
    803: "Rotor Bike Components",
    804: "Astro, Inc.",
    805: "Amotus Solutions",
    806: "Healthwear Technologies (Changzhou)Ltd",
    807: "Essex Electronics",
    808: "Grundfos A/S",
    809: "Eargo, Inc.",
    810: "Electronic Design Lab",
    811: "ESYLUX",
    812: "NIPPON SMT.CO.,Ltd",
    813: "BM innovations GmbH",
    814: "indoormap",
    815: "OttoQ Inc",
    816: "North Pole Engineering",
    817: "3flares Technologies Inc.",
    818: "Electrocompaniet A.S.",
    819: "Mul-T-Lock",
    820: "Corentium AS",
    821: "Enlighted Inc",
    822: "GISTIC",
    823: "AJP2 Holdings, LLC",
    824: "COBI GmbH",
    825: "Blue Sky Scientific, LLC",
    826: "Appception, Inc.",
    827: "Courtney Thorne Limited",
    828: "Virtuosys",
    829: "TPV Technology Limited",
    830: "Monitra SA",
    831: "Automation Components, Inc.",
    832: "Letsense s.r.l.",
    833: "Etesian Technologies LLC",
    834: "GERTEC BRASIL LTDA.",
    835: "Drekker Development Pty. Ltd.",
    836: "Whirl Inc",
    837: "Locus Positioning",
    838: "Acuity Brands Lighting, Inc",
    839: "Prevent Biometrics",
    840: "Arioneo",
    841: "VersaMe",
    842: "Vaddio",
    843: "Libratone A/S",
    844: "HM Electronics, Inc.",
    845: "TASER International, Inc.",
    846: "SafeTrust Inc.",
    847: "Heartland Payment Systems",
    848: "Bitstrata Systems Inc.",
    849: "Pieps GmbH",
    850: "iRiding(Xiamen)Technology Co.,Ltd.",
    851: "Alpha Audiotronics, Inc.",
    852: "TOPPAN FORMS CO.,LTD.",
    853: "Sigma Designs, Inc.",
    854: "Spectrum Brands, Inc.",
    855: "Polymap Wireless",
    856: "MagniWare Ltd.",
    857: "Novotec Medical GmbH",
    858: "Medicom Innovation Partner a/s",
    859: "Matrix Inc.",
    860: "Eaton Corporation",
    861: "KYS",
    862: "Naya Health, Inc.",
    863: "Acromag",
    864: "Insulet Corporation",
    865: "Wellinks Inc.",
    866: "ON Semiconductor",
    867: "FREELAP SA",
    868: "Favero Electronics Srl",
    869: "BioMech Sensor LLC",
    870: "BOLTT Sports technologies Private limited",
    871: "Saphe International",
    872: "Metormote AB",
    873: "littleBits",
    874: "SetPoint Medical",
    875: "BRControls Products BV",
    876: "Zipcar",
    877: "AirBolt Pty Ltd",
    878: "KeepTruckin Inc",
    879: "Motiv, Inc.",
    880: "Wazombi Labs O",
    881: "ORBCOMM",
    882: "Nixie Labs, Inc.",
    883: "AppNearMe Ltd",
    884: "Holman Industries",
    885: "Expain AS",
    886: "Electronic Temperature Instruments Ltd",
    887: "Plejd AB",
    888: "Propeller Health",
    889: "Shenzhen iMCO Electronic Technology Co.,Ltd",
    890: "Algoria",
    891: "Apption Labs Inc.",
    892: "Cronologics Corporation",
    893: "MICRODIA Ltd.",
    894: "lulabytes S.L.",
    895: "Nestec S.A.",
    896: "LLC MEGA - F service",
    897: "Sharp Corporation",
    898: "Precision Outcomes Ltd",
    899: "Kronos Incorporated",
    900: "OCOSMOS Co., Ltd.",
    901: "Embedded Electronic Solutions Ltd. dba e2Solutions",
    902: "Aterica Inc.",
    903: "BluStor PMC, Inc.",
    904: "Kapsch TrafficCom AB",
    905: "ActiveBlu Corporation",
    906: "Kohler Mira Limited",
    907: "Noke",
    908: "Appion Inc.",
    909: "Resmed Ltd",
    910: "Crownstone B.V.",
    911: "Xiaomi Inc.",
    912: "INFOTECH s.r.o.",
    913: "Thingsquare AB",
    914: "T&D",
    915: "LAVAZZA S.p.A.",
    916: "Netclearance Systems, Inc.",
    917: "SDATAWAY",
    918: "BLOKS GmbH",
    919: "LEGO System A/S",
    920: "Thetatronics Ltd",
    921: "Nikon Corporation",
    922: "NeST",
    923: "South Silicon Valley Microelectronics",
    924: "ALE International",
    925: "CareView Communications, Inc.",
    926: "SchoolBoard Limited",
    927: "Molex Corporation",
    928: "IVT Wireless Limited",
    929: "Alpine Labs LLC",
    930: "Candura Instruments",
    931: "SmartMovt Technology Co., Ltd",
    932: "Token Zero Ltd",
    933: "ACE CAD Enterprise Co., Ltd. (ACECAD)",
    934: "Medela, Inc",
    935: "AeroScout",
    936: "Esrille Inc.",
    937: "THINKERLY SRL",
    938: "Exon Sp. z o.o.",
    939: "Meizu Technology Co., Ltd.",
    940: "Smablo LTD",
    941: "XiQ",
    942: "Allswell Inc.",
    943: "Comm-N-Sense Corp DBA Verigo",
    944: "VIBRADORM GmbH",
    945: "Otodata Wireless Network Inc.",
    946: "Propagation Systems Limited",
    947: "Midwest Instruments & Controls",
    948: "Alpha Nodus, inc.",
    949: "petPOMM, Inc",
    950: "Mattel",
    951: "Airbly Inc.",
    952: "A-Safe Limited",
    953: "FREDERIQUE CONSTANT SA",
    954: "Maxscend Microelectronics Company Limited",
    955: "Abbott Diabetes Care",
    956: "ASB Bank Ltd",
    957: "amadas",
    958: "Applied Science, Inc.",
    959: "iLumi Solutions Inc.",
    960: "Arch Systems Inc.",
    961: "Ember Technologies, Inc.",
    962: "Snapchat Inc",
    963: "Casambi Technologies Oy",
    964: "Pico Technology Inc.",
    965: "St. Jude Medical, Inc.",
    966: "Intricon",
    967: "Structural Health Systems, Inc.",
    968: "Avvel International",
    969: "Gallagher Group",
    970: "In2things Automation Pvt. Ltd.",
    971: "SYSDEV Srl",
    972: "Vonkil Technologies Ltd",
    973: "Wynd Technologies, Inc.",
    974: "CONTRINEX S.A.",
    975: "MIRA, Inc.",
    976: "Watteam Ltd",
    977: "Density Inc.",
    978: "IOT Pot India Private Limited",
    979: "Sigma Connectivity AB",
    980: "PEG PEREGO SPA",
    981: "Wyzelink Systems Inc.",
    982: "Yota Devices LTD",
    983: "FINSECUR",
    984: "Zen-Me Labs Ltd",
    985: "3IWare Co., Ltd.",
    986: "EnOcean GmbH",
    987: "Instabeat, Inc",
    988: "Nima Labs",
    989: "Andreas Stihl AG & Co. KG",
    990: "Nathan Rhoades LLC",
    991: "Grob Technologies, LLC",
    992: "Actions (Zhuhai) Technology Co., Limited",
    993: "SPD Development Company Ltd",
    994: "Sensoan Oy",
    995: "Qualcomm Life Inc",
    996: "Chip-ing AG",
    997: "ffly4u",
    998: "IoT Instruments Oy",
    999: "TRUE Fitness Technology",
    1e3: "Reiner Kartengeraete GmbH & Co. KG.",
    1001: "SHENZHEN LEMONJOY TECHNOLOGY CO., LTD.",
    1002: "Hello Inc.",
    1003: "Evollve Inc.",
    1004: "Jigowatts Inc.",
    1005: "BASIC MICRO.COM,INC.",
    1006: "CUBE TECHNOLOGIES",
    1007: "foolography GmbH",
    1008: "CLINK",
    1009: "Hestan Smart Cooking Inc.",
    1010: "WindowMaster A/S",
    1011: "Flowscape AB",
    1012: "PAL Technologies Ltd",
    1013: "WHERE, Inc.",
    1014: "Iton Technology Corp.",
    1015: "Owl Labs Inc.",
    1016: "Rockford Corp.",
    1017: "Becon Technologies Co.,Ltd.",
    1018: "Vyassoft Technologies Inc",
    1019: "Nox Medical",
    1020: "Kimberly-Clark",
    1021: "Trimble Navigation Ltd.",
    1022: "Littelfuse",
    1023: "Withings",
    1024: "i-developer IT Beratung UG",
    1026: "Sears Holdings Corporation",
    1027: "Gantner Electronic GmbH",
    1028: "Authomate Inc",
    1029: "Vertex International, Inc.",
    1030: "Airtago",
    1031: "Swiss Audio SA",
    1032: "ToGetHome Inc.",
    1033: "AXIS",
    1034: "Openmatics",
    1035: "Jana Care Inc.",
    1036: "Senix Corporation",
    1037: "NorthStar Battery Company, LLC",
    1038: "SKF (U.K.) Limited",
    1039: "CO-AX Technology, Inc.",
    1040: "Fender Musical Instruments",
    1041: "Luidia Inc",
    1042: "SEFAM",
    1043: "Wireless Cables Inc",
    1044: "Lightning Protection International Pty Ltd",
    1045: "Uber Technologies Inc",
    1046: "SODA GmbH",
    1047: "Fatigue Science",
    1048: "Alpine Electronics Inc.",
    1049: "Novalogy LTD",
    1050: "Friday Labs Limited",
    1051: "OrthoAccel Technologies",
    1052: "WaterGuru, Inc.",
    1053: "Benning Elektrotechnik und Elektronik GmbH & Co. KG",
    1054: "Dell Computer Corporation",
    1055: "Kopin Corporation",
    1056: "TecBakery GmbH",
    1057: "Backbone Labs, Inc.",
    1058: "DELSEY SA",
    1059: "Chargifi Limited",
    1060: "Trainesense Ltd.",
    1061: "Unify Software and Solutions GmbH & Co. KG",
    1062: "Husqvarna AB",
    1063: "Focus fleet and fuel management inc",
    1064: "SmallLoop, LLC",
    1065: "Prolon Inc.",
    1066: "BD Medical",
    1067: "iMicroMed Incorporated",
    1068: "Ticto N.V.",
    1069: "Meshtech AS",
    1070: "MemCachier Inc.",
    1071: "Danfoss A/S",
    1072: "SnapStyk Inc.",
    1073: "Amyway Corporation",
    1074: "Silk Labs, Inc.",
    1075: "Pillsy Inc.",
    1076: "Hatch Baby, Inc.",
    1077: "Blocks Wearables Ltd.",
    1078: "Drayson Technologies (Europe) Limited",
    1079: "eBest IOT Inc.",
    1080: "Helvar Ltd",
    1081: "Radiance Technologies",
    1082: "Nuheara Limited",
    1083: "Appside co., ltd.",
    1084: "DeLaval",
    1085: "Coiler Corporation",
    1086: "Thermomedics, Inc.",
    1087: "Tentacle Sync GmbH",
    1088: "Valencell, Inc.",
    1089: "iProtoXi Oy",
    1090: "SECOM CO., LTD.",
    1091: "Tucker International LLC",
    1092: "Metanate Limited",
    1093: "Kobian Canada Inc.",
    1094: "NETGEAR, Inc.",
    1095: "Fabtronics Australia Pty Ltd",
    1096: "Grand Centrix GmbH",
    1097: "1UP USA.com llc",
    1098: "SHIMANO INC.",
    1099: "Nain Inc.",
    1100: "LifeStyle Lock, LLC",
    1101: "VEGA Grieshaber KG",
    1102: "Xtrava Inc.",
    1103: "TTS Tooltechnic Systems AG & Co. KG",
    1104: "Teenage Engineering AB",
    1105: "Tunstall Nordic AB",
    1106: "Svep Design Center AB",
    1107: "GreenPeak Technologies BV",
    1108: "Sphinx Electronics GmbH & Co KG",
    1109: "Atomation",
    1110: "Nemik Consulting Inc",
    1111: "RF INNOVATION",
    1112: "Mini Solution Co., Ltd.",
    1113: "Lumenetix, Inc",
    1114: "2048450 Ontario Inc",
    1115: "SPACEEK LTD",
    1116: "Delta T Corporation",
    1117: "Boston Scientific Corporation",
    1118: "Nuviz, Inc.",
    1119: "Real Time Automation, Inc.",
    1120: "Kolibree",
    1121: "vhf elektronik GmbH",
    1122: "Bonsai Systems GmbH",
    1123: "Fathom Systems Inc.",
    1124: "Bellman & Symfon",
    1125: "International Forte Group LLC",
    1126: "CycleLabs Solutions inc.",
    1127: "Codenex Oy",
    1128: "Kynesim Ltd",
    1129: "Palago AB",
    1130: "INSIGMA INC.",
    1131: "PMD Solutions",
    1132: "Qingdao Realtime Technology Co., Ltd.",
    1133: "BEGA Gantenbrink-Leuchten KG",
    1134: "Pambor Ltd.",
    65535: "SPECIAL USE/DEFAULT",
  };
const h0 = se.exec,
  g0 = se.execSync,
  y0 = ce,
  qe = V,
  x0 = m0,
  S0 = Ae;
let Mt = process.platform;
const w0 = Mt === "linux" || Mt === "android",
  C0 = Mt === "darwin",
  L0 = Mt === "win32",
  I0 = Mt === "freebsd",
  v0 = Mt === "openbsd",
  _0 = Mt === "netbsd",
  O0 = Mt === "sunos";
function br(t) {
  let n = "";
  return (
    t.indexOf("keyboard") >= 0 && (n = "Keyboard"),
    t.indexOf("mouse") >= 0 && (n = "Mouse"),
    t.indexOf("trackpad") >= 0 && (n = "Trackpad"),
    t.indexOf("speaker") >= 0 && (n = "Speaker"),
    t.indexOf("headset") >= 0 && (n = "Headset"),
    t.indexOf("phone") >= 0 && (n = "Phone"),
    t.indexOf("macbook") >= 0 && (n = "Computer"),
    t.indexOf("imac") >= 0 && (n = "Computer"),
    t.indexOf("ipad") >= 0 && (n = "Tablet"),
    t.indexOf("watch") >= 0 && (n = "Watch"),
    t.indexOf("headphone") >= 0 && (n = "Headset"),
    n
  );
}
function P0(t) {
  let n = t.split(" ")[0];
  return (
    (t = t.toLowerCase()),
    t.indexOf("apple") >= 0 && (n = "Apple"),
    t.indexOf("ipad") >= 0 && (n = "Apple"),
    t.indexOf("imac") >= 0 && (n = "Apple"),
    t.indexOf("iphone") >= 0 && (n = "Apple"),
    t.indexOf("magic mouse") >= 0 && (n = "Apple"),
    t.indexOf("magic track") >= 0 && (n = "Apple"),
    t.indexOf("macbook") >= 0 && (n = "Apple"),
    n
  );
}
function E0(t) {
  const n = parseInt(t);
  if (!isNaN(n)) return x0[n];
}
function M0(t, n, e) {
  const i = {};
  return (
    (i.device = null),
    (i.name = qe.getValue(t, "name", "=")),
    (i.manufacturer = null),
    (i.macDevice = n),
    (i.macHost = e),
    (i.batteryPercent = null),
    (i.type = br(i.name.toLowerCase())),
    (i.connected = !1),
    i
  );
}
function Xi(t, n) {
  const e = {},
    i = (
      (t.device_minorClassOfDevice_string ||
        t.device_majorClassOfDevice_string ||
        t.device_minorType ||
        "") + (t.device_name || "")
    ).toLowerCase();
  return (
    (e.device = t.device_services || ""),
    (e.name = t.device_name || ""),
    (e.manufacturer =
      t.device_manufacturer ||
      E0(t.device_vendorID) ||
      P0(t.device_name || "") ||
      ""),
    (e.macDevice = (t.device_addr || t.device_address || "")
      .toLowerCase()
      .replace(/-/g, ":")),
    (e.macHost = n),
    (e.batteryPercent = t.device_batteryPercent || null),
    (e.type = br(i)),
    (e.connected = t.device_isconnected === "attrib_Yes" || !1),
    e
  );
}
function A0(t) {
  const n = {};
  return (
    (n.device = null),
    (n.name = qe.getValue(t, "name", ":")),
    (n.manufacturer = qe.getValue(t, "manufacturer", ":")),
    (n.macDevice = null),
    (n.macHost = null),
    (n.batteryPercent = null),
    (n.type = br(n.name.toLowerCase())),
    (n.connected = null),
    n
  );
}
function T0(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (w0) {
        qe.getFilesInPath("/var/lib/bluetooth/").forEach((s) => {
          const r = y0.basename(s),
            o = s.split("/"),
            a = o.length >= 6 ? o[o.length - 2] : null,
            c = o.length >= 7 ? o[o.length - 3] : null;
          if (r === "info") {
            const u = S0.readFileSync(s, { encoding: "utf8" }).split(`
`);
            e.push(M0(u, a, c));
          }
        });
        try {
          const s = g0("hcitool con", qe.execOptsLinux)
            .toString()
            .toLowerCase();
          for (let r = 0; r < e.length; r++)
            e[r].macDevice &&
              e[r].macDevice.length > 10 &&
              s.indexOf(e[r].macDevice.toLowerCase()) >= 0 &&
              (e[r].connected = !0);
        } catch {
          qe.noop();
        }
        (t && t(e), n(e));
      }
      (C0 &&
        h0("system_profiler SPBluetoothDataType -json", function (s, r) {
          if (!s)
            try {
              const o = JSON.parse(r.toString());
              if (
                o.SPBluetoothDataType &&
                o.SPBluetoothDataType.length &&
                o.SPBluetoothDataType[0] &&
                o.SPBluetoothDataType[0].device_title &&
                o.SPBluetoothDataType[0].device_title.length
              ) {
                let a = null;
                (o.SPBluetoothDataType[0].local_device_title &&
                  o.SPBluetoothDataType[0].local_device_title.general_address &&
                  (a =
                    o.SPBluetoothDataType[0].local_device_title.general_address
                      .toLowerCase()
                      .replace(/-/g, ":")),
                  o.SPBluetoothDataType[0].device_title.forEach((c) => {
                    const u = c,
                      l = Object.keys(u);
                    if (l && l.length === 1) {
                      const f = u[l[0]];
                      f.device_name = l[0];
                      const p = Xi(f, a);
                      e.push(p);
                    }
                  }));
              }
              if (
                o.SPBluetoothDataType &&
                o.SPBluetoothDataType.length &&
                o.SPBluetoothDataType[0] &&
                o.SPBluetoothDataType[0].device_connected &&
                o.SPBluetoothDataType[0].device_connected.length
              ) {
                const a =
                  o.SPBluetoothDataType[0].controller_properties &&
                  o.SPBluetoothDataType[0].controller_properties
                    .controller_address
                    ? o.SPBluetoothDataType[0].controller_properties.controller_address
                        .toLowerCase()
                        .replace(/-/g, ":")
                    : null;
                o.SPBluetoothDataType[0].device_connected.forEach((c) => {
                  const u = c,
                    l = Object.keys(u);
                  if (l && l.length === 1) {
                    const f = u[l[0]];
                    ((f.device_name = l[0]),
                      (f.device_isconnected = "attrib_Yes"));
                    const p = Xi(f, a);
                    e.push(p);
                  }
                });
              }
              if (
                o.SPBluetoothDataType &&
                o.SPBluetoothDataType.length &&
                o.SPBluetoothDataType[0] &&
                o.SPBluetoothDataType[0].device_not_connected &&
                o.SPBluetoothDataType[0].device_not_connected.length
              ) {
                const a =
                  o.SPBluetoothDataType[0].controller_properties &&
                  o.SPBluetoothDataType[0].controller_properties
                    .controller_address
                    ? o.SPBluetoothDataType[0].controller_properties.controller_address
                        .toLowerCase()
                        .replace(/-/g, ":")
                    : null;
                o.SPBluetoothDataType[0].device_not_connected.forEach((c) => {
                  const u = c,
                    l = Object.keys(u);
                  if (l && l.length === 1) {
                    const f = u[l[0]];
                    ((f.device_name = l[0]),
                      (f.device_isconnected = "attrib_No"));
                    const p = Xi(f, a);
                    e.push(p);
                  }
                });
              }
            } catch {
              qe.noop();
            }
          (t && t(e), n(e));
        }),
        L0 &&
          qe
            .powerShell(
              "Get-CimInstance Win32_PNPEntity | select PNPClass, Name, Manufacturer | fl",
            )
            .then((i, s) => {
              (s ||
                i
                  .toString()
                  .split(/\n\s*\n/)
                  .forEach((o) => {
                    qe.getValue(
                      o.split(`
`),
                      "PNPClass",
                      ":",
                    ) === "Bluetooth" &&
                      e.push(
                        A0(
                          o.split(`
`),
                        ),
                      );
                  }),
                t && t(e),
                n(e));
            }),
        (I0 || _0 || v0 || O0) && n(null));
    });
  });
}
Io.bluetoothDevices = T0;
(function (t) {
  const n = fa.version,
    e = V,
    i = zn,
    s = Ht,
    r = At,
    o = Sr,
    a = Fl,
    c = lo,
    u = jt,
    l = Kt,
    f = Mi,
    p = Ai,
    d = yo,
    m = Mr,
    h = Tt,
    y = So,
    g = wo,
    x = Co,
    S = Lo,
    w = Io;
  let C = process.platform;
  const W = C === "win32",
    T = C === "freebsd",
    K = C === "openbsd",
    L = C === "netbsd",
    D = C === "sunos";
  W && (e.getCodepage(), e.getPowershell());
  function O() {
    return n;
  }
  function X(N) {
    return new Promise((H) => {
      process.nextTick(() => {
        let b = {};
        ((b.version = O()),
          Promise.all([
            i.system(),
            i.bios(),
            i.baseboard(),
            i.chassis(),
            s.osInfo(),
            s.uuid(),
            s.versions(),
            r.cpu(),
            r.cpuFlags(),
            c.graphics(),
            l.networkInterfaces(),
            o.memLayout(),
            u.diskLayout(),
            S.audio(),
            w.bluetoothDevices(),
            x.usb(),
            g.printer(),
          ]).then(($) => {
            ((b.system = $[0]),
              (b.bios = $[1]),
              (b.baseboard = $[2]),
              (b.chassis = $[3]),
              (b.os = $[4]),
              (b.uuid = $[5]),
              (b.versions = $[6]),
              (b.cpu = $[7]),
              (b.cpu.flags = $[8]),
              (b.graphics = $[9]),
              (b.net = $[10]),
              (b.memLayout = $[11]),
              (b.diskLayout = $[12]),
              (b.audio = $[13]),
              (b.bluetooth = $[14]),
              (b.usb = $[15]),
              (b.printer = $[16]),
              N && N(b),
              H(b));
          }));
      });
    });
  }
  function Q(N, H, b) {
    return (
      e.isFunction(H) && ((b = H), (H = "")),
      e.isFunction(N) && ((b = N), (N = "")),
      new Promise(($) => {
        process.nextTick(() => {
          ((H = H || l.getDefaultNetworkInterface()), (N = N || ""));
          let k = (function () {
              let j = 15;
              return (
                W && (j = 13),
                (T || K || L) && (j = 11),
                D && (j = 6),
                function () {
                  --j === 0 && (b && b(Z), $(Z));
                }
              );
            })(),
            Z = {};
          ((Z.time = s.time()),
            (Z.node = process.versions.node),
            (Z.v8 = process.versions.v8),
            r.cpuCurrentSpeed().then((j) => {
              ((Z.cpuCurrentSpeed = j), k());
            }),
            d.users().then((j) => {
              ((Z.users = j), k());
            }),
            p.processes().then((j) => {
              ((Z.processes = j), k());
            }),
            r.currentLoad().then((j) => {
              ((Z.currentLoad = j), k());
            }),
            D ||
              r.cpuTemperature().then((j) => {
                ((Z.temp = j), k());
              }),
            !K &&
              !T &&
              !L &&
              !D &&
              l.networkStats(H).then((j) => {
                ((Z.networkStats = j), k());
              }),
            D ||
              l.networkConnections().then((j) => {
                ((Z.networkConnections = j), k());
              }),
            o.mem().then((j) => {
              ((Z.mem = j), k());
            }),
            D ||
              a().then((j) => {
                ((Z.battery = j), k());
              }),
            D ||
              p.services(N).then((j) => {
                ((Z.services = j), k());
              }),
            D ||
              u.fsSize().then((j) => {
                ((Z.fsSize = j), k());
              }),
            !W &&
              !K &&
              !T &&
              !L &&
              !D &&
              u.fsStats().then((j) => {
                ((Z.fsStats = j), k());
              }),
            !W &&
              !K &&
              !T &&
              !L &&
              !D &&
              u.disksIO().then((j) => {
                ((Z.disksIO = j), k());
              }),
            !K &&
              !T &&
              !L &&
              !D &&
              f.wifiNetworks().then((j) => {
                ((Z.wifiNetworks = j), k());
              }),
            m.inetLatency().then((j) => {
              ((Z.inetLatency = j), k());
            }));
        });
      })
    );
  }
  function ee(N, H, b) {
    return new Promise(($) => {
      process.nextTick(() => {
        let k = {};
        (H && e.isFunction(H) && !b && ((b = H), (H = "")),
          N && e.isFunction(N) && !H && !b && ((b = N), (N = ""), (H = "")),
          X().then((Z) => {
            ((k = Z),
              Q(N, H).then((j) => {
                for (let Ee in j)
                  ({}).hasOwnProperty.call(j, Ee) && (k[Ee] = j[Ee]);
                (b && b(k), $(k));
              }));
          }));
      });
    });
  }
  function F(N, H) {
    return new Promise((b) => {
      process.nextTick(() => {
        const $ = Object.keys(N)
          .filter((k) => ({}).hasOwnProperty.call(t, k))
          .map((k) => {
            const Z = N[k].substring(
              N[k].lastIndexOf("(") + 1,
              N[k].lastIndexOf(")"),
            );
            let j = k.indexOf(")") >= 0 ? k.split(")")[1].trim() : k;
            return (
              (j = k.indexOf("|") >= 0 ? k.split("|")[0].trim() : j),
              Z ? t[j](Z) : t[j]("")
            );
          });
        Promise.all($).then((k) => {
          const Z = {};
          let j = 0;
          for (let Ee in N)
            if (
              {}.hasOwnProperty.call(N, Ee) &&
              {}.hasOwnProperty.call(t, Ee) &&
              k.length > j
            ) {
              if (N[Ee] === "*" || N[Ee] === "all") Z[Ee] = k[j];
              else {
                let _e = N[Ee],
                  Vi = "",
                  qt = [];
                if (
                  (_e.indexOf(")") >= 0 && (_e = _e.split(")")[1].trim()),
                  _e.indexOf("|") >= 0 &&
                    ((Vi = _e.split("|")[1].trim()),
                    (qt = Vi.split(":")),
                    (_e = _e.split("|")[0].trim())),
                  (_e = _e.replace(/,/g, " ").replace(/ +/g, " ").split(" ")),
                  k[j])
                )
                  if (Array.isArray(k[j])) {
                    const bt = [];
                    (k[j].forEach((Vt) => {
                      let Nt = {};
                      if (
                        (_e.length === 1 && (_e[0] === "*" || _e[0] === "all")
                          ? (Nt = Vt)
                          : _e.forEach((et) => {
                              ({}).hasOwnProperty.call(Vt, et) &&
                                (Nt[et] = Vt[et]);
                            }),
                        Vi && qt.length === 2)
                      ) {
                        if ({}.hasOwnProperty.call(Nt, qt[0].trim())) {
                          const et = Nt[qt[0].trim()];
                          typeof et == "number"
                            ? et === parseFloat(qt[1].trim()) && bt.push(Nt)
                            : typeof et == "string" &&
                              et.toLowerCase() === qt[1].trim().toLowerCase() &&
                              bt.push(Nt);
                        }
                      } else bt.push(Nt);
                    }),
                      (Z[Ee] = bt));
                  } else {
                    const bt = {};
                    (_e.forEach((Vt) => {
                      ({}).hasOwnProperty.call(k[j], Vt) && (bt[Vt] = k[j][Vt]);
                    }),
                      (Z[Ee] = bt));
                  }
                else Z[Ee] = {};
              }
              j++;
            }
          (H && H(Z), b(Z));
        });
      });
    });
  }
  function Y(N, H, b) {
    let $ = null;
    return setInterval(() => {
      F(N).then((Z) => {
        JSON.stringify($) !== JSON.stringify(Z) &&
          (($ = Object.assign({}, Z)), b(Z));
      });
    }, H);
  }
  ((t.version = O),
    (t.system = i.system),
    (t.bios = i.bios),
    (t.baseboard = i.baseboard),
    (t.chassis = i.chassis),
    (t.time = s.time),
    (t.osInfo = s.osInfo),
    (t.versions = s.versions),
    (t.shell = s.shell),
    (t.uuid = s.uuid),
    (t.cpu = r.cpu),
    (t.cpuFlags = r.cpuFlags),
    (t.cpuCache = r.cpuCache),
    (t.cpuCurrentSpeed = r.cpuCurrentSpeed),
    (t.cpuTemperature = r.cpuTemperature),
    (t.currentLoad = r.currentLoad),
    (t.fullLoad = r.fullLoad),
    (t.mem = o.mem),
    (t.memLayout = o.memLayout),
    (t.battery = a),
    (t.graphics = c.graphics),
    (t.fsSize = u.fsSize),
    (t.fsOpenFiles = u.fsOpenFiles),
    (t.blockDevices = u.blockDevices),
    (t.fsStats = u.fsStats),
    (t.disksIO = u.disksIO),
    (t.diskLayout = u.diskLayout),
    (t.networkInterfaceDefault = l.networkInterfaceDefault),
    (t.networkGatewayDefault = l.networkGatewayDefault),
    (t.networkInterfaces = l.networkInterfaces),
    (t.networkStats = l.networkStats),
    (t.networkConnections = l.networkConnections),
    (t.wifiNetworks = f.wifiNetworks),
    (t.wifiInterfaces = f.wifiInterfaces),
    (t.wifiConnections = f.wifiConnections),
    (t.services = p.services),
    (t.processes = p.processes),
    (t.processLoad = p.processLoad),
    (t.users = d.users),
    (t.inetChecksite = m.inetChecksite),
    (t.inetLatency = m.inetLatency),
    (t.dockerInfo = h.dockerInfo),
    (t.dockerImages = h.dockerImages),
    (t.dockerContainers = h.dockerContainers),
    (t.dockerContainerStats = h.dockerContainerStats),
    (t.dockerContainerProcesses = h.dockerContainerProcesses),
    (t.dockerVolumes = h.dockerVolumes),
    (t.dockerAll = h.dockerAll),
    (t.vboxInfo = y.vboxInfo),
    (t.printer = g.printer),
    (t.usb = x.usb),
    (t.audio = S.audio),
    (t.bluetoothDevices = w.bluetoothDevices),
    (t.getStaticData = X),
    (t.getDynamicData = Q),
    (t.getAllData = ee),
    (t.get = F),
    (t.observe = Y),
    (t.powerShellStart = e.powerShellStart),
    (t.powerShellRelease = e.powerShellRelease));
})(Bs);
const dn = /* @__PURE__ */ Ns(Bs);
var ve = {},
  me = {};
me.fromCallback = function (t) {
  return Object.defineProperty(
    function (...n) {
      if (typeof n[n.length - 1] == "function") t.apply(this, n);
      else
        return new Promise((e, i) => {
          (n.push((s, r) => (s != null ? i(s) : e(r))), t.apply(this, n));
        });
    },
    "name",
    { value: t.name },
  );
};
me.fromPromise = function (t) {
  return Object.defineProperty(
    function (...n) {
      const e = n[n.length - 1];
      if (typeof e != "function") return t.apply(this, n);
      (n.pop(), t.apply(this, n).then((i) => e(null, i), e));
    },
    "name",
    { value: t.name },
  );
};
var rt = la,
  D0 = process.cwd,
  oi = null,
  b0 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function () {
  return (oi || (oi = D0.call(process)), oi);
};
try {
  process.cwd();
} catch {}
if (typeof process.chdir == "function") {
  var xs = process.chdir;
  ((process.chdir = function (t) {
    ((oi = null), xs.call(process, t));
  }),
    Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, xs));
}
var V0 = N0;
function N0(t) {
  (rt.hasOwnProperty("O_SYMLINK") &&
    process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) &&
    n(t),
    t.lutimes || e(t),
    (t.chown = r(t.chown)),
    (t.fchown = r(t.fchown)),
    (t.lchown = r(t.lchown)),
    (t.chmod = i(t.chmod)),
    (t.fchmod = i(t.fchmod)),
    (t.lchmod = i(t.lchmod)),
    (t.chownSync = o(t.chownSync)),
    (t.fchownSync = o(t.fchownSync)),
    (t.lchownSync = o(t.lchownSync)),
    (t.chmodSync = s(t.chmodSync)),
    (t.fchmodSync = s(t.fchmodSync)),
    (t.lchmodSync = s(t.lchmodSync)),
    (t.stat = a(t.stat)),
    (t.fstat = a(t.fstat)),
    (t.lstat = a(t.lstat)),
    (t.statSync = c(t.statSync)),
    (t.fstatSync = c(t.fstatSync)),
    (t.lstatSync = c(t.lstatSync)),
    t.chmod &&
      !t.lchmod &&
      ((t.lchmod = function (l, f, p) {
        p && process.nextTick(p);
      }),
      (t.lchmodSync = function () {})),
    t.chown &&
      !t.lchown &&
      ((t.lchown = function (l, f, p, d) {
        d && process.nextTick(d);
      }),
      (t.lchownSync = function () {})),
    b0 === "win32" &&
      (t.rename =
        typeof t.rename != "function"
          ? t.rename
          : (function (l) {
              function f(p, d, m) {
                var h = Date.now(),
                  y = 0;
                l(p, d, function g(x) {
                  if (
                    x &&
                    (x.code === "EACCES" ||
                      x.code === "EPERM" ||
                      x.code === "EBUSY") &&
                    Date.now() - h < 6e4
                  ) {
                    (setTimeout(function () {
                      t.stat(d, function (S, w) {
                        S && S.code === "ENOENT" ? l(p, d, g) : m(x);
                      });
                    }, y),
                      y < 100 && (y += 10));
                    return;
                  }
                  m && m(x);
                });
              }
              return (Object.setPrototypeOf && Object.setPrototypeOf(f, l), f);
            })(t.rename)),
    (t.read =
      typeof t.read != "function"
        ? t.read
        : (function (l) {
            function f(p, d, m, h, y, g) {
              var x;
              if (g && typeof g == "function") {
                var S = 0;
                x = function (w, C, W) {
                  if (w && w.code === "EAGAIN" && S < 10)
                    return (S++, l.call(t, p, d, m, h, y, x));
                  g.apply(this, arguments);
                };
              }
              return l.call(t, p, d, m, h, y, x);
            }
            return (Object.setPrototypeOf && Object.setPrototypeOf(f, l), f);
          })(t.read)),
    (t.readSync =
      typeof t.readSync != "function"
        ? t.readSync
        : /* @__PURE__ */ (function (l) {
            return function (f, p, d, m, h) {
              for (var y = 0; ; )
                try {
                  return l.call(t, f, p, d, m, h);
                } catch (g) {
                  if (g.code === "EAGAIN" && y < 10) {
                    y++;
                    continue;
                  }
                  throw g;
                }
            };
          })(t.readSync)));
  function n(l) {
    ((l.lchmod = function (f, p, d) {
      l.open(f, rt.O_WRONLY | rt.O_SYMLINK, p, function (m, h) {
        if (m) {
          d && d(m);
          return;
        }
        l.fchmod(h, p, function (y) {
          l.close(h, function (g) {
            d && d(y || g);
          });
        });
      });
    }),
      (l.lchmodSync = function (f, p) {
        var d = l.openSync(f, rt.O_WRONLY | rt.O_SYMLINK, p),
          m = !0,
          h;
        try {
          ((h = l.fchmodSync(d, p)), (m = !1));
        } finally {
          if (m)
            try {
              l.closeSync(d);
            } catch {}
          else l.closeSync(d);
        }
        return h;
      }));
  }
  function e(l) {
    rt.hasOwnProperty("O_SYMLINK") && l.futimes
      ? ((l.lutimes = function (f, p, d, m) {
          l.open(f, rt.O_SYMLINK, function (h, y) {
            if (h) {
              m && m(h);
              return;
            }
            l.futimes(y, p, d, function (g) {
              l.close(y, function (x) {
                m && m(g || x);
              });
            });
          });
        }),
        (l.lutimesSync = function (f, p, d) {
          var m = l.openSync(f, rt.O_SYMLINK),
            h,
            y = !0;
          try {
            ((h = l.futimesSync(m, p, d)), (y = !1));
          } finally {
            if (y)
              try {
                l.closeSync(m);
              } catch {}
            else l.closeSync(m);
          }
          return h;
        }))
      : l.futimes &&
        ((l.lutimes = function (f, p, d, m) {
          m && process.nextTick(m);
        }),
        (l.lutimesSync = function () {}));
  }
  function i(l) {
    return (
      l &&
      function (f, p, d) {
        return l.call(t, f, p, function (m) {
          (u(m) && (m = null), d && d.apply(this, arguments));
        });
      }
    );
  }
  function s(l) {
    return (
      l &&
      function (f, p) {
        try {
          return l.call(t, f, p);
        } catch (d) {
          if (!u(d)) throw d;
        }
      }
    );
  }
  function r(l) {
    return (
      l &&
      function (f, p, d, m) {
        return l.call(t, f, p, d, function (h) {
          (u(h) && (h = null), m && m.apply(this, arguments));
        });
      }
    );
  }
  function o(l) {
    return (
      l &&
      function (f, p, d) {
        try {
          return l.call(t, f, p, d);
        } catch (m) {
          if (!u(m)) throw m;
        }
      }
    );
  }
  function a(l) {
    return (
      l &&
      function (f, p, d) {
        typeof p == "function" && ((d = p), (p = null));
        function m(h, y) {
          (y &&
            (y.uid < 0 && (y.uid += 4294967296),
            y.gid < 0 && (y.gid += 4294967296)),
            d && d.apply(this, arguments));
        }
        return p ? l.call(t, f, p, m) : l.call(t, f, m);
      }
    );
  }
  function c(l) {
    return (
      l &&
      function (f, p) {
        var d = p ? l.call(t, f, p) : l.call(t, f);
        return (
          d &&
            (d.uid < 0 && (d.uid += 4294967296),
            d.gid < 0 && (d.gid += 4294967296)),
          d
        );
      }
    );
  }
  function u(l) {
    if (!l || l.code === "ENOSYS") return !0;
    var f = !process.getuid || process.getuid() !== 0;
    return !!(f && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var Ss = ca.Stream,
  B0 = k0;
function k0(t) {
  return {
    ReadStream: n,
    WriteStream: e,
  };
  function n(i, s) {
    if (!(this instanceof n)) return new n(i, s);
    Ss.call(this);
    var r = this;
    ((this.path = i),
      (this.fd = null),
      (this.readable = !0),
      (this.paused = !1),
      (this.flags = "r"),
      (this.mode = 438),
      (this.bufferSize = 64 * 1024),
      (s = s || {}));
    for (var o = Object.keys(s), a = 0, c = o.length; a < c; a++) {
      var u = o[a];
      this[u] = s[u];
    }
    if (
      (this.encoding && this.setEncoding(this.encoding), this.start !== void 0)
    ) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0) this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end) throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function () {
        r._read();
      });
      return;
    }
    t.open(this.path, this.flags, this.mode, function (l, f) {
      if (l) {
        (r.emit("error", l), (r.readable = !1));
        return;
      }
      ((r.fd = f), r.emit("open", f), r._read());
    });
  }
  function e(i, s) {
    if (!(this instanceof e)) return new e(i, s);
    (Ss.call(this),
      (this.path = i),
      (this.fd = null),
      (this.writable = !0),
      (this.flags = "w"),
      (this.encoding = "binary"),
      (this.mode = 438),
      (this.bytesWritten = 0),
      (s = s || {}));
    for (var r = Object.keys(s), o = 0, a = r.length; o < a; o++) {
      var c = r[o];
      this[c] = s[c];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0) throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    ((this.busy = !1),
      (this._queue = []),
      this.fd === null &&
        ((this._open = t.open),
        this._queue.push([
          this._open,
          this.path,
          this.flags,
          this.mode,
          void 0,
        ]),
        this.flush()));
  }
}
var F0 = R0,
  W0 =
    Object.getPrototypeOf ||
    function (t) {
      return t.__proto__;
    };
function R0(t) {
  if (t === null || typeof t != "object") return t;
  if (t instanceof Object) var n = { __proto__: W0(t) };
  else var n = /* @__PURE__ */ Object.create(null);
  return (
    Object.getOwnPropertyNames(t).forEach(function (e) {
      Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(t, e));
    }),
    n
  );
}
var le = Ae,
  G0 = V0,
  $0 = B0,
  z0 = F0,
  ei = Vs,
  ye,
  hi;
typeof Symbol == "function" && typeof Symbol.for == "function"
  ? ((ye = Symbol.for("graceful-fs.queue")),
    (hi = Symbol.for("graceful-fs.previous")))
  : ((ye = "___graceful-fs.queue"), (hi = "___graceful-fs.previous"));
function U0() {}
function vo(t, n) {
  Object.defineProperty(t, ye, {
    get: function () {
      return n;
    },
  });
}
var $t = U0;
ei.debuglog
  ? ($t = ei.debuglog("gfs4"))
  : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
    ($t = function () {
      var t = ei.format.apply(ei, arguments);
      ((t =
        "GFS4: " +
        t.split(/\n/).join(`
GFS4: `)),
        console.error(t));
    });
if (!le[ye]) {
  var H0 = tr[ye] || [];
  (vo(le, H0),
    (le.close = (function (t) {
      function n(e, i) {
        return t.call(le, e, function (s) {
          (s || ws(), typeof i == "function" && i.apply(this, arguments));
        });
      }
      return (
        Object.defineProperty(n, hi, {
          value: t,
        }),
        n
      );
    })(le.close)),
    (le.closeSync = (function (t) {
      function n(e) {
        (t.apply(le, arguments), ws());
      }
      return (
        Object.defineProperty(n, hi, {
          value: t,
        }),
        n
      );
    })(le.closeSync)),
    /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
      process.on("exit", function () {
        ($t(le[ye]), ua.equal(le[ye].length, 0));
      }));
}
tr[ye] || vo(tr, le[ye]);
var wn = Vr(z0(le));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH &&
  !le.__patched &&
  ((wn = Vr(le)), (le.__patched = !0));
function Vr(t) {
  (G0(t),
    (t.gracefulify = Vr),
    (t.createReadStream = C),
    (t.createWriteStream = W));
  var n = t.readFile;
  t.readFile = e;
  function e(L, D, O) {
    return (typeof D == "function" && ((O = D), (D = null)), X(L, D, O));
    function X(Q, ee, F, Y) {
      return n(Q, ee, function (N) {
        N && (N.code === "EMFILE" || N.code === "ENFILE")
          ? sn([X, [Q, ee, F], N, Y || Date.now(), Date.now()])
          : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  var i = t.writeFile;
  t.writeFile = s;
  function s(L, D, O, X) {
    return (typeof O == "function" && ((X = O), (O = null)), Q(L, D, O, X));
    function Q(ee, F, Y, N, H) {
      return i(ee, F, Y, function (b) {
        b && (b.code === "EMFILE" || b.code === "ENFILE")
          ? sn([Q, [ee, F, Y, N], b, H || Date.now(), Date.now()])
          : typeof N == "function" && N.apply(this, arguments);
      });
    }
  }
  var r = t.appendFile;
  r && (t.appendFile = o);
  function o(L, D, O, X) {
    return (typeof O == "function" && ((X = O), (O = null)), Q(L, D, O, X));
    function Q(ee, F, Y, N, H) {
      return r(ee, F, Y, function (b) {
        b && (b.code === "EMFILE" || b.code === "ENFILE")
          ? sn([Q, [ee, F, Y, N], b, H || Date.now(), Date.now()])
          : typeof N == "function" && N.apply(this, arguments);
      });
    }
  }
  var a = t.copyFile;
  a && (t.copyFile = c);
  function c(L, D, O, X) {
    return (typeof O == "function" && ((X = O), (O = 0)), Q(L, D, O, X));
    function Q(ee, F, Y, N, H) {
      return a(ee, F, Y, function (b) {
        b && (b.code === "EMFILE" || b.code === "ENFILE")
          ? sn([Q, [ee, F, Y, N], b, H || Date.now(), Date.now()])
          : typeof N == "function" && N.apply(this, arguments);
      });
    }
  }
  var u = t.readdir;
  t.readdir = f;
  var l = /^v[0-5]\./;
  function f(L, D, O) {
    typeof D == "function" && ((O = D), (D = null));
    var X = l.test(process.version)
      ? function (F, Y, N, H) {
          return u(F, Q(F, Y, N, H));
        }
      : function (F, Y, N, H) {
          return u(F, Y, Q(F, Y, N, H));
        };
    return X(L, D, O);
    function Q(ee, F, Y, N) {
      return function (H, b) {
        H && (H.code === "EMFILE" || H.code === "ENFILE")
          ? sn([X, [ee, F, Y], H, N || Date.now(), Date.now()])
          : (b && b.sort && b.sort(),
            typeof Y == "function" && Y.call(this, H, b));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var p = $0(t);
    ((g = p.ReadStream), (S = p.WriteStream));
  }
  var d = t.ReadStream;
  d && ((g.prototype = Object.create(d.prototype)), (g.prototype.open = x));
  var m = t.WriteStream;
  (m && ((S.prototype = Object.create(m.prototype)), (S.prototype.open = w)),
    Object.defineProperty(t, "ReadStream", {
      get: function () {
        return g;
      },
      set: function (L) {
        g = L;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(t, "WriteStream", {
      get: function () {
        return S;
      },
      set: function (L) {
        S = L;
      },
      enumerable: !0,
      configurable: !0,
    }));
  var h = g;
  Object.defineProperty(t, "FileReadStream", {
    get: function () {
      return h;
    },
    set: function (L) {
      h = L;
    },
    enumerable: !0,
    configurable: !0,
  });
  var y = S;
  Object.defineProperty(t, "FileWriteStream", {
    get: function () {
      return y;
    },
    set: function (L) {
      y = L;
    },
    enumerable: !0,
    configurable: !0,
  });
  function g(L, D) {
    return this instanceof g
      ? (d.apply(this, arguments), this)
      : g.apply(Object.create(g.prototype), arguments);
  }
  function x() {
    var L = this;
    K(L.path, L.flags, L.mode, function (D, O) {
      D
        ? (L.autoClose && L.destroy(), L.emit("error", D))
        : ((L.fd = O), L.emit("open", O), L.read());
    });
  }
  function S(L, D) {
    return this instanceof S
      ? (m.apply(this, arguments), this)
      : S.apply(Object.create(S.prototype), arguments);
  }
  function w() {
    var L = this;
    K(L.path, L.flags, L.mode, function (D, O) {
      D ? (L.destroy(), L.emit("error", D)) : ((L.fd = O), L.emit("open", O));
    });
  }
  function C(L, D) {
    return new t.ReadStream(L, D);
  }
  function W(L, D) {
    return new t.WriteStream(L, D);
  }
  var T = t.open;
  t.open = K;
  function K(L, D, O, X) {
    return (typeof O == "function" && ((X = O), (O = null)), Q(L, D, O, X));
    function Q(ee, F, Y, N, H) {
      return T(ee, F, Y, function (b, $) {
        b && (b.code === "EMFILE" || b.code === "ENFILE")
          ? sn([Q, [ee, F, Y, N], b, H || Date.now(), Date.now()])
          : typeof N == "function" && N.apply(this, arguments);
      });
    }
  }
  return t;
}
function sn(t) {
  ($t("ENQUEUE", t[0].name, t[1]), le[ye].push(t), Nr());
}
var ti;
function ws() {
  for (var t = Date.now(), n = 0; n < le[ye].length; ++n)
    le[ye][n].length > 2 && ((le[ye][n][3] = t), (le[ye][n][4] = t));
  Nr();
}
function Nr() {
  if ((clearTimeout(ti), (ti = void 0), le[ye].length !== 0)) {
    var t = le[ye].shift(),
      n = t[0],
      e = t[1],
      i = t[2],
      s = t[3],
      r = t[4];
    if (s === void 0) ($t("RETRY", n.name, e), n.apply(null, e));
    else if (Date.now() - s >= 6e4) {
      $t("TIMEOUT", n.name, e);
      var o = e.pop();
      typeof o == "function" && o.call(null, i);
    } else {
      var a = Date.now() - r,
        c = Math.max(r - s, 1),
        u = Math.min(c * 1.2, 100);
      a >= u
        ? ($t("RETRY", n.name, e), n.apply(null, e.concat([s])))
        : le[ye].push(t);
    }
    ti === void 0 && (ti = setTimeout(Nr, 0));
  }
}
(function (t) {
  const n = me.fromCallback,
    e = wn,
    i = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "cp",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "glob",
      "lchmod",
      "lchown",
      "lutimes",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "statfs",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile",
    ].filter((s) => typeof e[s] == "function");
  (Object.assign(t, e),
    i.forEach((s) => {
      t[s] = n(e[s]);
    }),
    (t.exists = function (s, r) {
      return typeof r == "function"
        ? e.exists(s, r)
        : new Promise((o) => e.exists(s, o));
    }),
    (t.read = function (s, r, o, a, c, u) {
      return typeof u == "function"
        ? e.read(s, r, o, a, c, u)
        : new Promise((l, f) => {
            e.read(s, r, o, a, c, (p, d, m) => {
              if (p) return f(p);
              l({ bytesRead: d, buffer: m });
            });
          });
    }),
    (t.write = function (s, r, ...o) {
      return typeof o[o.length - 1] == "function"
        ? e.write(s, r, ...o)
        : new Promise((a, c) => {
            e.write(s, r, ...o, (u, l, f) => {
              if (u) return c(u);
              a({ bytesWritten: l, buffer: f });
            });
          });
    }),
    (t.readv = function (s, r, ...o) {
      return typeof o[o.length - 1] == "function"
        ? e.readv(s, r, ...o)
        : new Promise((a, c) => {
            e.readv(s, r, ...o, (u, l, f) => {
              if (u) return c(u);
              a({ bytesRead: l, buffers: f });
            });
          });
    }),
    (t.writev = function (s, r, ...o) {
      return typeof o[o.length - 1] == "function"
        ? e.writev(s, r, ...o)
        : new Promise((a, c) => {
            e.writev(s, r, ...o, (u, l, f) => {
              if (u) return c(u);
              a({ bytesWritten: l, buffers: f });
            });
          });
    }),
    typeof e.realpath.native == "function"
      ? (t.realpath.native = n(e.realpath.native))
      : process.emitWarning(
          "fs.realpath.native is not a function. Is fs being monkey-patched?",
          "Warning",
          "fs-extra-WARN0003",
        ));
})(ve);
var Br = {},
  _o = {};
const j0 = ce;
_o.checkPath = function (n) {
  if (
    process.platform === "win32" &&
    /[<>:"|?*]/.test(n.replace(j0.parse(n).root, ""))
  ) {
    const i = new Error(`Path contains invalid characters: ${n}`);
    throw ((i.code = "EINVAL"), i);
  }
};
const Oo = ve,
  { checkPath: Po } = _o,
  Eo = (t) => {
    const n = { mode: 511 };
    return typeof t == "number" ? t : { ...n, ...t }.mode;
  };
Br.makeDir = async (t, n) => (
  Po(t),
  Oo.mkdir(t, {
    mode: Eo(n),
    recursive: !0,
  })
);
Br.makeDirSync = (t, n) => (
  Po(t),
  Oo.mkdirSync(t, {
    mode: Eo(n),
    recursive: !0,
  })
);
const K0 = me.fromPromise,
  { makeDir: X0, makeDirSync: qi } = Br,
  Yi = K0(X0);
var Xe = {
  mkdirs: Yi,
  mkdirsSync: qi,
  // alias
  mkdirp: Yi,
  mkdirpSync: qi,
  ensureDir: Yi,
  ensureDirSync: qi,
};
const q0 = me.fromPromise,
  Mo = ve;
function Y0(t) {
  return Mo.access(t)
    .then(() => !0)
    .catch(() => !1);
}
var Xt = {
  pathExists: q0(Y0),
  pathExistsSync: Mo.existsSync,
};
const un = ve,
  J0 = me.fromPromise;
async function Q0(t, n, e) {
  const i = await un.open(t, "r+");
  let s = null;
  try {
    await un.futimes(i, n, e);
  } finally {
    try {
      await un.close(i);
    } catch (r) {
      s = r;
    }
  }
  if (s) throw s;
}
function Z0(t, n, e) {
  const i = un.openSync(t, "r+");
  return (un.futimesSync(i, n, e), un.closeSync(i));
}
var Ao = {
  utimesMillis: J0(Q0),
  utimesMillisSync: Z0,
};
const mn = ve,
  ge = ce,
  Cs = me.fromPromise;
function ep(t, n, e) {
  const i = e.dereference
    ? (s) => mn.stat(s, { bigint: !0 })
    : (s) => mn.lstat(s, { bigint: !0 });
  return Promise.all([
    i(t),
    i(n).catch((s) => {
      if (s.code === "ENOENT") return null;
      throw s;
    }),
  ]).then(([s, r]) => ({ srcStat: s, destStat: r }));
}
function tp(t, n, e) {
  let i;
  const s = e.dereference
      ? (o) => mn.statSync(o, { bigint: !0 })
      : (o) => mn.lstatSync(o, { bigint: !0 }),
    r = s(t);
  try {
    i = s(n);
  } catch (o) {
    if (o.code === "ENOENT") return { srcStat: r, destStat: null };
    throw o;
  }
  return { srcStat: r, destStat: i };
}
async function np(t, n, e, i) {
  const { srcStat: s, destStat: r } = await ep(t, n, i);
  if (r) {
    if (Hn(s, r)) {
      const o = ge.basename(t),
        a = ge.basename(n);
      if (e === "move" && o !== a && o.toLowerCase() === a.toLowerCase())
        return { srcStat: s, destStat: r, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (s.isDirectory() && !r.isDirectory())
      throw new Error(
        `Cannot overwrite non-directory '${n}' with directory '${t}'.`,
      );
    if (!s.isDirectory() && r.isDirectory())
      throw new Error(
        `Cannot overwrite directory '${n}' with non-directory '${t}'.`,
      );
  }
  if (s.isDirectory() && kr(t, n)) throw new Error(Ti(t, n, e));
  return { srcStat: s, destStat: r };
}
function ip(t, n, e, i) {
  const { srcStat: s, destStat: r } = tp(t, n, i);
  if (r) {
    if (Hn(s, r)) {
      const o = ge.basename(t),
        a = ge.basename(n);
      if (e === "move" && o !== a && o.toLowerCase() === a.toLowerCase())
        return { srcStat: s, destStat: r, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (s.isDirectory() && !r.isDirectory())
      throw new Error(
        `Cannot overwrite non-directory '${n}' with directory '${t}'.`,
      );
    if (!s.isDirectory() && r.isDirectory())
      throw new Error(
        `Cannot overwrite directory '${n}' with non-directory '${t}'.`,
      );
  }
  if (s.isDirectory() && kr(t, n)) throw new Error(Ti(t, n, e));
  return { srcStat: s, destStat: r };
}
async function To(t, n, e, i) {
  const s = ge.resolve(ge.dirname(t)),
    r = ge.resolve(ge.dirname(e));
  if (r === s || r === ge.parse(r).root) return;
  let o;
  try {
    o = await mn.stat(r, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (Hn(n, o)) throw new Error(Ti(t, e, i));
  return To(t, n, r, i);
}
function Do(t, n, e, i) {
  const s = ge.resolve(ge.dirname(t)),
    r = ge.resolve(ge.dirname(e));
  if (r === s || r === ge.parse(r).root) return;
  let o;
  try {
    o = mn.statSync(r, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (Hn(n, o)) throw new Error(Ti(t, e, i));
  return Do(t, n, r, i);
}
function Hn(t, n) {
  return n.ino && n.dev && n.ino === t.ino && n.dev === t.dev;
}
function kr(t, n) {
  const e = ge
      .resolve(t)
      .split(ge.sep)
      .filter((s) => s),
    i = ge
      .resolve(n)
      .split(ge.sep)
      .filter((s) => s);
  return e.every((s, r) => i[r] === s);
}
function Ti(t, n, e) {
  return `Cannot ${e} '${t}' to a subdirectory of itself, '${n}'.`;
}
var Cn = {
  // checkPaths
  checkPaths: Cs(np),
  checkPathsSync: ip,
  // checkParent
  checkParentPaths: Cs(To),
  checkParentPathsSync: Do,
  // Misc
  isSrcSubdir: kr,
  areIdentical: Hn,
};
const xe = ve,
  Fn = ce,
  { mkdirs: rp } = Xe,
  { pathExists: sp } = Xt,
  { utimesMillis: op } = Ao,
  Wn = Cn;
async function ap(t, n, e = {}) {
  (typeof e == "function" && (e = { filter: e }),
    (e.clobber = "clobber" in e ? !!e.clobber : !0),
    (e.overwrite = "overwrite" in e ? !!e.overwrite : e.clobber),
    e.preserveTimestamps &&
      process.arch === "ia32" &&
      process.emitWarning(
        `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
        "Warning",
        "fs-extra-WARN0001",
      ));
  const { srcStat: i, destStat: s } = await Wn.checkPaths(t, n, "copy", e);
  if ((await Wn.checkParentPaths(t, i, n, "copy"), !(await bo(t, n, e))))
    return;
  const o = Fn.dirname(n);
  ((await sp(o)) || (await rp(o)), await Vo(s, t, n, e));
}
async function bo(t, n, e) {
  return e.filter ? e.filter(t, n) : !0;
}
async function Vo(t, n, e, i) {
  const r = await (i.dereference ? xe.stat : xe.lstat)(n);
  if (r.isDirectory()) return pp(r, t, n, e, i);
  if (r.isFile() || r.isCharacterDevice() || r.isBlockDevice())
    return lp(r, t, n, e, i);
  if (r.isSymbolicLink()) return fp(t, n, e, i);
  throw r.isSocket()
    ? new Error(`Cannot copy a socket file: ${n}`)
    : r.isFIFO()
      ? new Error(`Cannot copy a FIFO pipe: ${n}`)
      : new Error(`Unknown file: ${n}`);
}
async function lp(t, n, e, i, s) {
  if (!n) return Ls(t, e, i, s);
  if (s.overwrite) return (await xe.unlink(i), Ls(t, e, i, s));
  if (s.errorOnExist) throw new Error(`'${i}' already exists`);
}
async function Ls(t, n, e, i) {
  if ((await xe.copyFile(n, e), i.preserveTimestamps)) {
    cp(t.mode) && (await up(e, t.mode));
    const s = await xe.stat(n);
    await op(e, s.atime, s.mtime);
  }
  return xe.chmod(e, t.mode);
}
function cp(t) {
  return (t & 128) === 0;
}
function up(t, n) {
  return xe.chmod(t, n | 128);
}
async function pp(t, n, e, i, s) {
  n || (await xe.mkdir(i));
  const r = [];
  for await (const o of await xe.opendir(e)) {
    const a = Fn.join(e, o.name),
      c = Fn.join(i, o.name);
    r.push(
      bo(a, c, s).then((u) => {
        if (u)
          return Wn.checkPaths(a, c, "copy", s).then(({ destStat: l }) =>
            Vo(l, a, c, s),
          );
      }),
    );
  }
  (await Promise.all(r), n || (await xe.chmod(i, t.mode)));
}
async function fp(t, n, e, i) {
  let s = await xe.readlink(n);
  if ((i.dereference && (s = Fn.resolve(process.cwd(), s)), !t))
    return xe.symlink(s, e);
  let r = null;
  try {
    r = await xe.readlink(e);
  } catch (o) {
    if (o.code === "EINVAL" || o.code === "UNKNOWN") return xe.symlink(s, e);
    throw o;
  }
  if (
    (i.dereference && (r = Fn.resolve(process.cwd(), r)), Wn.isSrcSubdir(s, r))
  )
    throw new Error(`Cannot copy '${s}' to a subdirectory of itself, '${r}'.`);
  if (Wn.isSrcSubdir(r, s))
    throw new Error(`Cannot overwrite '${r}' with '${s}'.`);
  return (await xe.unlink(e), xe.symlink(s, e));
}
var dp = ap;
const Le = wn,
  Rn = ce,
  mp = Xe.mkdirsSync,
  hp = Ao.utimesMillisSync,
  Gn = Cn;
function gp(t, n, e) {
  (typeof e == "function" && (e = { filter: e }),
    (e = e || {}),
    (e.clobber = "clobber" in e ? !!e.clobber : !0),
    (e.overwrite = "overwrite" in e ? !!e.overwrite : e.clobber),
    e.preserveTimestamps &&
      process.arch === "ia32" &&
      process.emitWarning(
        `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
        "Warning",
        "fs-extra-WARN0002",
      ));
  const { srcStat: i, destStat: s } = Gn.checkPathsSync(t, n, "copy", e);
  if ((Gn.checkParentPathsSync(t, i, n, "copy"), e.filter && !e.filter(t, n)))
    return;
  const r = Rn.dirname(n);
  return (Le.existsSync(r) || mp(r), No(s, t, n, e));
}
function No(t, n, e, i) {
  const r = (i.dereference ? Le.statSync : Le.lstatSync)(n);
  if (r.isDirectory()) return Ip(r, t, n, e, i);
  if (r.isFile() || r.isCharacterDevice() || r.isBlockDevice())
    return yp(r, t, n, e, i);
  if (r.isSymbolicLink()) return Op(t, n, e, i);
  throw r.isSocket()
    ? new Error(`Cannot copy a socket file: ${n}`)
    : r.isFIFO()
      ? new Error(`Cannot copy a FIFO pipe: ${n}`)
      : new Error(`Unknown file: ${n}`);
}
function yp(t, n, e, i, s) {
  return n ? xp(t, e, i, s) : Bo(t, e, i, s);
}
function xp(t, n, e, i) {
  if (i.overwrite) return (Le.unlinkSync(e), Bo(t, n, e, i));
  if (i.errorOnExist) throw new Error(`'${e}' already exists`);
}
function Bo(t, n, e, i) {
  return (
    Le.copyFileSync(n, e),
    i.preserveTimestamps && Sp(t.mode, n, e),
    Fr(e, t.mode)
  );
}
function Sp(t, n, e) {
  return (wp(t) && Cp(e, t), Lp(n, e));
}
function wp(t) {
  return (t & 128) === 0;
}
function Cp(t, n) {
  return Fr(t, n | 128);
}
function Fr(t, n) {
  return Le.chmodSync(t, n);
}
function Lp(t, n) {
  const e = Le.statSync(t);
  return hp(n, e.atime, e.mtime);
}
function Ip(t, n, e, i, s) {
  return n ? ko(e, i, s) : vp(t.mode, e, i, s);
}
function vp(t, n, e, i) {
  return (Le.mkdirSync(e), ko(n, e, i), Fr(e, t));
}
function ko(t, n, e) {
  const i = Le.opendirSync(t);
  try {
    let s;
    for (; (s = i.readSync()) !== null; ) _p(s.name, t, n, e);
  } finally {
    i.closeSync();
  }
}
function _p(t, n, e, i) {
  const s = Rn.join(n, t),
    r = Rn.join(e, t);
  if (i.filter && !i.filter(s, r)) return;
  const { destStat: o } = Gn.checkPathsSync(s, r, "copy", i);
  return No(o, s, r, i);
}
function Op(t, n, e, i) {
  let s = Le.readlinkSync(n);
  if ((i.dereference && (s = Rn.resolve(process.cwd(), s)), t)) {
    let r;
    try {
      r = Le.readlinkSync(e);
    } catch (o) {
      if (o.code === "EINVAL" || o.code === "UNKNOWN")
        return Le.symlinkSync(s, e);
      throw o;
    }
    if (
      (i.dereference && (r = Rn.resolve(process.cwd(), r)),
      Gn.isSrcSubdir(s, r))
    )
      throw new Error(
        `Cannot copy '${s}' to a subdirectory of itself, '${r}'.`,
      );
    if (Gn.isSrcSubdir(r, s))
      throw new Error(`Cannot overwrite '${r}' with '${s}'.`);
    return Pp(s, e);
  } else return Le.symlinkSync(s, e);
}
function Pp(t, n) {
  return (Le.unlinkSync(n), Le.symlinkSync(t, n));
}
var Ep = gp;
const Mp = me.fromPromise;
var Wr = {
  copy: Mp(dp),
  copySync: Ep,
};
const Fo = wn,
  Ap = me.fromCallback;
function Tp(t, n) {
  Fo.rm(t, { recursive: !0, force: !0 }, n);
}
function Dp(t) {
  Fo.rmSync(t, { recursive: !0, force: !0 });
}
var Di = {
  remove: Ap(Tp),
  removeSync: Dp,
};
const bp = me.fromPromise,
  Wo = ve,
  Ro = ce,
  Go = Xe,
  $o = Di,
  Is = bp(async function (n) {
    let e;
    try {
      e = await Wo.readdir(n);
    } catch {
      return Go.mkdirs(n);
    }
    return Promise.all(e.map((i) => $o.remove(Ro.join(n, i))));
  });
function vs(t) {
  let n;
  try {
    n = Wo.readdirSync(t);
  } catch {
    return Go.mkdirsSync(t);
  }
  n.forEach((e) => {
    ((e = Ro.join(t, e)), $o.removeSync(e));
  });
}
var Vp = {
  emptyDirSync: vs,
  emptydirSync: vs,
  emptyDir: Is,
  emptydir: Is,
};
const Np = me.fromPromise,
  zo = ce,
  Ye = ve,
  Uo = Xe;
async function Bp(t) {
  let n;
  try {
    n = await Ye.stat(t);
  } catch {}
  if (n && n.isFile()) return;
  const e = zo.dirname(t);
  let i = null;
  try {
    i = await Ye.stat(e);
  } catch (s) {
    if (s.code === "ENOENT") {
      (await Uo.mkdirs(e), await Ye.writeFile(t, ""));
      return;
    } else throw s;
  }
  i.isDirectory() ? await Ye.writeFile(t, "") : await Ye.readdir(e);
}
function kp(t) {
  let n;
  try {
    n = Ye.statSync(t);
  } catch {}
  if (n && n.isFile()) return;
  const e = zo.dirname(t);
  try {
    Ye.statSync(e).isDirectory() || Ye.readdirSync(e);
  } catch (i) {
    if (i && i.code === "ENOENT") Uo.mkdirsSync(e);
    else throw i;
  }
  Ye.writeFileSync(t, "");
}
var Fp = {
  createFile: Np(Bp),
  createFileSync: kp,
};
const Wp = me.fromPromise,
  Ho = ce,
  ot = ve,
  jo = Xe,
  { pathExists: Rp } = Xt,
  { areIdentical: Ko } = Cn;
async function Gp(t, n) {
  let e;
  try {
    e = await ot.lstat(n);
  } catch {}
  let i;
  try {
    i = await ot.lstat(t);
  } catch (o) {
    throw ((o.message = o.message.replace("lstat", "ensureLink")), o);
  }
  if (e && Ko(i, e)) return;
  const s = Ho.dirname(n);
  ((await Rp(s)) || (await jo.mkdirs(s)), await ot.link(t, n));
}
function $p(t, n) {
  let e;
  try {
    e = ot.lstatSync(n);
  } catch {}
  try {
    const r = ot.lstatSync(t);
    if (e && Ko(r, e)) return;
  } catch (r) {
    throw ((r.message = r.message.replace("lstat", "ensureLink")), r);
  }
  const i = Ho.dirname(n);
  return (ot.existsSync(i) || jo.mkdirsSync(i), ot.linkSync(t, n));
}
var zp = {
  createLink: Wp(Gp),
  createLinkSync: $p,
};
const ct = ce,
  Vn = ve,
  { pathExists: Up } = Xt,
  Hp = me.fromPromise;
async function jp(t, n) {
  if (ct.isAbsolute(t)) {
    try {
      await Vn.lstat(t);
    } catch (r) {
      throw ((r.message = r.message.replace("lstat", "ensureSymlink")), r);
    }
    return {
      toCwd: t,
      toDst: t,
    };
  }
  const e = ct.dirname(n),
    i = ct.join(e, t);
  if (await Up(i))
    return {
      toCwd: i,
      toDst: t,
    };
  try {
    await Vn.lstat(t);
  } catch (r) {
    throw ((r.message = r.message.replace("lstat", "ensureSymlink")), r);
  }
  return {
    toCwd: t,
    toDst: ct.relative(e, t),
  };
}
function Kp(t, n) {
  if (ct.isAbsolute(t)) {
    if (!Vn.existsSync(t)) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: t,
      toDst: t,
    };
  }
  const e = ct.dirname(n),
    i = ct.join(e, t);
  if (Vn.existsSync(i))
    return {
      toCwd: i,
      toDst: t,
    };
  if (!Vn.existsSync(t)) throw new Error("relative srcpath does not exist");
  return {
    toCwd: t,
    toDst: ct.relative(e, t),
  };
}
var Xp = {
  symlinkPaths: Hp(jp),
  symlinkPathsSync: Kp,
};
const Xo = ve,
  qp = me.fromPromise;
async function Yp(t, n) {
  if (n) return n;
  let e;
  try {
    e = await Xo.lstat(t);
  } catch {
    return "file";
  }
  return e && e.isDirectory() ? "dir" : "file";
}
function Jp(t, n) {
  if (n) return n;
  let e;
  try {
    e = Xo.lstatSync(t);
  } catch {
    return "file";
  }
  return e && e.isDirectory() ? "dir" : "file";
}
var Qp = {
  symlinkType: qp(Yp),
  symlinkTypeSync: Jp,
};
const Zp = me.fromPromise,
  qo = ce,
  je = ve,
  { mkdirs: ef, mkdirsSync: tf } = Xe,
  { symlinkPaths: nf, symlinkPathsSync: rf } = Xp,
  { symlinkType: sf, symlinkTypeSync: of } = Qp,
  { pathExists: af } = Xt,
  { areIdentical: Yo } = Cn;
async function lf(t, n, e) {
  let i;
  try {
    i = await je.lstat(n);
  } catch {}
  if (i && i.isSymbolicLink()) {
    const [a, c] = await Promise.all([je.stat(t), je.stat(n)]);
    if (Yo(a, c)) return;
  }
  const s = await nf(t, n);
  t = s.toDst;
  const r = await sf(s.toCwd, e),
    o = qo.dirname(n);
  return ((await af(o)) || (await ef(o)), je.symlink(t, n, r));
}
function cf(t, n, e) {
  let i;
  try {
    i = je.lstatSync(n);
  } catch {}
  if (i && i.isSymbolicLink()) {
    const a = je.statSync(t),
      c = je.statSync(n);
    if (Yo(a, c)) return;
  }
  const s = rf(t, n);
  ((t = s.toDst), (e = of(s.toCwd, e)));
  const r = qo.dirname(n);
  return (je.existsSync(r) || tf(r), je.symlinkSync(t, n, e));
}
var uf = {
  createSymlink: Zp(lf),
  createSymlinkSync: cf,
};
const { createFile: _s, createFileSync: Os } = Fp,
  { createLink: Ps, createLinkSync: Es } = zp,
  { createSymlink: Ms, createSymlinkSync: As } = uf;
var pf = {
  // file
  createFile: _s,
  createFileSync: Os,
  ensureFile: _s,
  ensureFileSync: Os,
  // link
  createLink: Ps,
  createLinkSync: Es,
  ensureLink: Ps,
  ensureLinkSync: Es,
  // symlink
  createSymlink: Ms,
  createSymlinkSync: As,
  ensureSymlink: Ms,
  ensureSymlinkSync: As,
};
function ff(
  t,
  {
    EOL: n = `
`,
    finalEOL: e = !0,
    replacer: i = null,
    spaces: s,
  } = {},
) {
  const r = e ? n : "";
  return JSON.stringify(t, i, s).replace(/\n/g, n) + r;
}
function df(t) {
  return (
    Buffer.isBuffer(t) && (t = t.toString("utf8")),
    t.replace(/^\uFEFF/, "")
  );
}
var Rr = { stringify: ff, stripBom: df };
let hn;
try {
  hn = wn;
} catch {
  hn = Ae;
}
const bi = me,
  { stringify: Jo, stripBom: Qo } = Rr;
async function mf(t, n = {}) {
  typeof n == "string" && (n = { encoding: n });
  const e = n.fs || hn,
    i = "throws" in n ? n.throws : !0;
  let s = await bi.fromCallback(e.readFile)(t, n);
  s = Qo(s);
  let r;
  try {
    r = JSON.parse(s, n ? n.reviver : null);
  } catch (o) {
    if (i) throw ((o.message = `${t}: ${o.message}`), o);
    return null;
  }
  return r;
}
const hf = bi.fromPromise(mf);
function gf(t, n = {}) {
  typeof n == "string" && (n = { encoding: n });
  const e = n.fs || hn,
    i = "throws" in n ? n.throws : !0;
  try {
    let s = e.readFileSync(t, n);
    return ((s = Qo(s)), JSON.parse(s, n.reviver));
  } catch (s) {
    if (i) throw ((s.message = `${t}: ${s.message}`), s);
    return null;
  }
}
async function yf(t, n, e = {}) {
  const i = e.fs || hn,
    s = Jo(n, e);
  await bi.fromCallback(i.writeFile)(t, s, e);
}
const xf = bi.fromPromise(yf);
function Sf(t, n, e = {}) {
  const i = e.fs || hn,
    s = Jo(n, e);
  return i.writeFileSync(t, s, e);
}
const wf = {
  readFile: hf,
  readFileSync: gf,
  writeFile: xf,
  writeFileSync: Sf,
};
var Cf = wf;
const ni = Cf;
var Lf = {
  // jsonfile exports
  readJson: ni.readFile,
  readJsonSync: ni.readFileSync,
  writeJson: ni.writeFile,
  writeJsonSync: ni.writeFileSync,
};
const If = me.fromPromise,
  cr = ve,
  Zo = ce,
  ea = Xe,
  vf = Xt.pathExists;
async function _f(t, n, e = "utf-8") {
  const i = Zo.dirname(t);
  return ((await vf(i)) || (await ea.mkdirs(i)), cr.writeFile(t, n, e));
}
function Of(t, ...n) {
  const e = Zo.dirname(t);
  (cr.existsSync(e) || ea.mkdirsSync(e), cr.writeFileSync(t, ...n));
}
var Gr = {
  outputFile: If(_f),
  outputFileSync: Of,
};
const { stringify: Pf } = Rr,
  { outputFile: Ef } = Gr;
async function Mf(t, n, e = {}) {
  const i = Pf(n, e);
  await Ef(t, i, e);
}
var Af = Mf;
const { stringify: Tf } = Rr,
  { outputFileSync: Df } = Gr;
function bf(t, n, e) {
  const i = Tf(n, e);
  Df(t, i, e);
}
var Vf = bf;
const Nf = me.fromPromise,
  Ie = Lf;
Ie.outputJson = Nf(Af);
Ie.outputJsonSync = Vf;
Ie.outputJSON = Ie.outputJson;
Ie.outputJSONSync = Ie.outputJsonSync;
Ie.writeJSON = Ie.writeJson;
Ie.writeJSONSync = Ie.writeJsonSync;
Ie.readJSON = Ie.readJson;
Ie.readJSONSync = Ie.readJsonSync;
var Bf = Ie;
const kf = ve,
  Ts = ce,
  { copy: Ff } = Wr,
  { remove: ta } = Di,
  { mkdirp: Wf } = Xe,
  { pathExists: Rf } = Xt,
  Ds = Cn;
async function Gf(t, n, e = {}) {
  const i = e.overwrite || e.clobber || !1,
    { srcStat: s, isChangingCase: r = !1 } = await Ds.checkPaths(
      t,
      n,
      "move",
      e,
    );
  await Ds.checkParentPaths(t, s, n, "move");
  const o = Ts.dirname(n);
  return (Ts.parse(o).root !== o && (await Wf(o)), $f(t, n, i, r));
}
async function $f(t, n, e, i) {
  if (!i) {
    if (e) await ta(n);
    else if (await Rf(n)) throw new Error("dest already exists.");
  }
  try {
    await kf.rename(t, n);
  } catch (s) {
    if (s.code !== "EXDEV") throw s;
    await zf(t, n, e);
  }
}
async function zf(t, n, e) {
  return (
    await Ff(t, n, {
      overwrite: e,
      errorOnExist: !0,
      preserveTimestamps: !0,
    }),
    ta(t)
  );
}
var Uf = Gf;
const na = wn,
  ur = ce,
  Hf = Wr.copySync,
  ia = Di.removeSync,
  jf = Xe.mkdirpSync,
  bs = Cn;
function Kf(t, n, e) {
  e = e || {};
  const i = e.overwrite || e.clobber || !1,
    { srcStat: s, isChangingCase: r = !1 } = bs.checkPathsSync(t, n, "move", e);
  return (
    bs.checkParentPathsSync(t, s, n, "move"),
    Xf(n) || jf(ur.dirname(n)),
    qf(t, n, i, r)
  );
}
function Xf(t) {
  const n = ur.dirname(t);
  return ur.parse(n).root === n;
}
function qf(t, n, e, i) {
  if (i) return Ji(t, n, e);
  if (e) return (ia(n), Ji(t, n, e));
  if (na.existsSync(n)) throw new Error("dest already exists.");
  return Ji(t, n, e);
}
function Ji(t, n, e) {
  try {
    na.renameSync(t, n);
  } catch (i) {
    if (i.code !== "EXDEV") throw i;
    return Yf(t, n, e);
  }
}
function Yf(t, n, e) {
  return (
    Hf(t, n, {
      overwrite: e,
      errorOnExist: !0,
      preserveTimestamps: !0,
    }),
    ia(t)
  );
}
var Jf = Kf;
const Qf = me.fromPromise;
var Zf = {
    move: Qf(Uf),
    moveSync: Jf,
  },
  ed = {
    // Export promiseified graceful-fs:
    ...ve,
    // Export extra methods:
    ...Wr,
    ...Vp,
    ...pf,
    ...Bf,
    ...Xe,
    ...Zf,
    ...Gr,
    ...Xt,
    ...Di,
  };
const pr = /* @__PURE__ */ Ns(ed),
  td = aa(import.meta.url),
  Qi = ce.dirname(td);
class nd {
  constructor() {
    ((this.mainWindow = null), (this.usageInterval = null));
  }
  async sendSystemUsage() {
    try {
      if (!this.mainWindow) return;
      const [n, e] = await Promise.all([dn.currentLoad(), dn.mem()]);
      this.mainWindow.webContents.send("updateMetrics", {
        cpu: parseFloat(n.currentLoad.toFixed(2)),
        mem: parseFloat(((e.used / e.total) * 100).toFixed(2)),
      });
    } catch (n) {
      console.error("Error fetching system usage:", n);
    }
  }
  createWindow() {
    ((this.mainWindow = new Zi({
      width: 850,
      height: 600,
      minWidth: 850,
      minHeight: 600,
      webPreferences: {
        preload: ce.join(Qi, "preload.cjs"),
        contextIsolation: !0,
        nodeIntegration: !1,
      },
      title: "WesGuard",
      icon: ce.join(Qi, "assets/icon.png"),
      // Assuming an icon file exists
    })),
      er.env.VITE_DEV_SERVER_URL
        ? this.mainWindow.loadURL(er.env.VITE_DEV_SERVER_URL)
        : this.mainWindow.loadFile(ce.join(Qi, "../dist/index.html")),
      this.mainWindow.on("closed", () => {
        ((this.mainWindow = null), clearInterval(this.usageInterval));
      }));
  }
  init() {
    ai.whenReady().then(() => {
      (this.createWindow(),
        (this.usageInterval = setInterval(() => this.sendSystemUsage(), 2e3)),
        ai.on("activate", () => {
          Zi.getAllWindows().length === 0 && this.createWindow();
        }));
    });
  }
}
const ut = new nd();
ut.init();
ai.on("window-all-closed", function () {
  er.platform !== "darwin" && ai.quit();
});
Ut.on("get-system-info", async (t) => {
  console.log("Main process: Received 'get-system-info' request.");
  try {
    const [n, e] = await Promise.all([dn.osInfo(), dn.cpu()]),
      i = {
        os: n.distro,
        cpu: e.brand,
      };
    (console.log("Main process: Sending systemInfoResponse:", i),
      t.reply("systemInfoResponse", i));
  } catch (n) {
    (console.error("Main process: Error fetching system info:", n),
      t.reply("systemInfoResponse", {
        error: n.message || "Failed to fetch system info",
      }));
  }
});
Ut.handle("get-disk-usage", async () => {
  try {
    const t = await dn.fsSize();
    if (t.length > 0) {
      const n = t.reduce((s, r) => s + r.size, 0),
        e = t.reduce((s, r) => s + r.used, 0);
      return {
        diskUsage: parseFloat(((e / n) * 100).toFixed(2)),
        totalDisk: n,
      };
    }
    return { diskUsage: 0, totalDisk: 0 };
  } catch (t) {
    return (
      console.error("Error fetching disk usage:", t),
      { error: t.message || "Failed to fetch disk usage" }
    );
  }
});
Ut.handle("get-network-activity", async () => {
  try {
    const t = await dn.networkStats();
    if (t.length > 0) {
      const n = t.reduce((i, s) => i + s.rx_sec, 0),
        e = t.reduce((i, s) => i + s.tx_sec, 0);
      return { netRx: n, netTx: e };
    }
    return { netRx: 0, netTx: 0 };
  } catch (t) {
    return (
      console.error("Error fetching network activity:", t),
      { error: t.message || "Failed to fetch network activity" }
    );
  }
});
Ut.handle("analyze-junk-files", async () => {
  const t = [
      Pe.tmpdir(),
      // Common junk file locations on Windows
      ce.join(Pe.homedir(), "Downloads"),
      ce.join(Pe.homedir(), "AppData", "Local", "Temp"),
      ce.join(
        Pe.homedir(),
        "AppData",
        "Local",
        "Microsoft",
        "Windows",
        "INetCache",
      ),
      // Common junk file locations on macOS (uncomment if targeting macOS)
      // path.join(os.homedir(), 'Downloads'),
      // path.join(os.homedir(), 'Library', 'Caches'),
      // path.join(os.homedir(), 'Library', 'Logs'),
    ],
    n = [];
  let e = 0;
  for (const i of t)
    try {
      const s = await pr.readdir(i);
      for (const r of s) {
        const o = ce.join(i, r);
        try {
          const a = await pr.stat(o);
          a.isFile() &&
            (n.push({
              name: r,
              path: o,
              size: a.size,
              lastModified: a.mtimeMs,
            }),
            (e += a.size));
        } catch (a) {
          console.warn(`Could not access file ${o}: ${a.message}`);
        }
      }
    } catch (s) {
      console.error(`Error scanning location ${i}:`, s);
    }
  return { files: n, totalSize: e };
});
Ut.handle("execute-cleaning", async (t, n) => {
  let e = 0,
    i = 0;
  for (const s of n)
    try {
      (await pr.remove(s), e++);
    } catch (r) {
      (console.error(`Error deleting file ${s}:`, r), i++);
    }
  return i === 0
    ? {
        success: !0,
        message: `Successfully deleted ${e} files.`,
      }
    : e > 0
      ? {
          success: !1,
          error: `Deleted ${e} files, but failed to delete ${i} files.`,
        }
      : { success: !1, error: "Failed to delete any files." };
});
Ut.on("show-reminder-notification", (t, n, e, i) => {
  if (Zi.getAllWindows().length === 0) return;
  const s = new Notification({
    title: n,
    body: e,
    silent: !i,
    // If sound is provided, it's not silent
  });
  (s.on("click", () => {
    ut.mainWindow && (ut.mainWindow.show(), ut.mainWindow.focus());
  }),
    s.show());
});
Ut.on("set-system-metrics-interval", (t, n) => {
  (ut.usageInterval && clearInterval(ut.usageInterval),
    (ut.usageInterval = setInterval(() => ut.sendSystemUsage(), n)));
});
