import {
  app as ht,
  ipcMain as Se,
  BrowserWindow as xr,
  Notification as Ga,
} from "electron";
import se from "path";
import Ae from "os";
import be from "fs";
import oe from "child_process";
import Ar from "util";
import Wa from "https";
import $a from "http";
import Ua from "net";
import { fileURLToPath as za } from "url";
import Sr from "node:process";
import Ha from "constants";
import ja from "stream";
import Ka from "assert";
var wr =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function Tr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
var io = {};
const Xa = "5.27.7",
  Ya = {
    version: Xa,
  };
var V = {};
const ct = Ae,
  je = be,
  qa = se,
  Dr = oe.spawn,
  Ja = oe.exec,
  In = oe.execSync,
  Qa = Ar;
let en = process.platform;
const br = en === "linux" || en === "android",
  ro = en === "darwin",
  Ni = en === "win32",
  so = en === "freebsd",
  oo = en === "openbsd",
  ao = en === "netbsd";
let er = 0,
  Kt = "",
  Ue = "",
  st = null,
  He = null;
const Vr = process.env.WINDIR || "C:\\Windows";
let he,
  an = "",
  Un = [],
  Nr = !1,
  Pi = "";
const us =
    "$OutputEncoding = [System.Console]::OutputEncoding = [System.Console]::InputEncoding = [System.Text.Encoding]::UTF8 ; ",
  Cr = "--###START###--",
  ps = "--ERROR--",
  Ei = "--###ENDCMD###--",
  Lr = "--##ID##--",
  si = {
    windowsHide: !0,
    maxBuffer: 1024 * 2e4,
    encoding: "UTF-8",
    env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" }),
  },
  ki = {
    maxBuffer: 1024 * 2e4,
    encoding: "UTF-8",
    stdio: ["pipe", "pipe", "ignore"],
  };
function Za(t) {
  let n = parseInt(t, 10);
  return (isNaN(n) && (n = 0), n);
}
function el(t) {
  let n = !1,
    e = "",
    i = "";
  for (const s of t)
    (s >= "0" && s <= "9") || n ? ((n = !0), (e += s)) : (i += s);
  return [i, e];
}
const Ii = new String(),
  Ir = new String().replace,
  _r = new String().toLowerCase,
  lo = new String().toString,
  co = new String().substr,
  uo = new String().substring,
  po = new String().trim,
  fo = new String().startsWith,
  mo = Math.min;
function tl(t) {
  return t && {}.toString.call(t) === "[object Function]";
}
function nl(t) {
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
function il(t, n) {
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
function rl() {
  return (er === 0 && (er = ct.cpus().length), er);
}
function pt(t, n, e, i, s) {
  ((e = e || ":"), (n = n.toLowerCase()), (i = i || !1), (s = s || !1));
  let r = "";
  return (
    t.some((o) => {
      let a = o.toLowerCase().replace(/\t/g, "");
      if (
        (i && (a = a.trim()),
        a.startsWith(n) && (!s || a.match(n + e) || a.match(n + " " + e)))
      ) {
        const l = i ? o.trim().split(e) : o.split(e);
        if (l.length >= 2) return (l.shift(), (r = l.join(e).trim()), !0);
      }
    }),
    r
  );
}
function sl(t, n) {
  return (
    (n = n || 16),
    t.replace(/\\x([0-9A-Fa-f]{2})/g, function () {
      return String.fromCharCode(parseInt(arguments[1], n));
    })
  );
}
function ol(t) {
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
function al(t, n) {
  ((n = n || ""), (t = t.toUpperCase()));
  let e = 0,
    i = 0,
    s = ol(t),
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
function ll(t, n) {
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
    e.time = al(o, s);
  }
  return e;
}
function cl(t, n) {
  let e = n > 0,
    i = 1,
    s = 0,
    r = 0,
    o = [];
  for (let l = 0; l < t.length; l++)
    i <= n
      ? (/\s/.test(t[l]) &&
          !e &&
          ((r = l - 1),
          o.push({
            from: s,
            to: r + 1,
            cap: t.substring(s, r + 1),
          }),
          (s = r + 2),
          i++),
        (e = t[l] === " "))
      : (!/\s/.test(t[l]) &&
          e &&
          ((r = l - 1),
          s < r &&
            o.push({
              from: s,
              to: r,
              cap: t.substring(s, r),
            }),
          (s = r + 1),
          i++),
        (e = t[l] === " "));
  ((r = 5e3),
    o.push({
      from: s,
      to: r,
      cap: t.substring(s, r),
    }));
  let a = o.length;
  for (let l = 0; l < a; l++)
    o[l].cap.replace(/\s/g, "").length === 0 &&
      l + 1 < a &&
      ((o[l].to = o[l + 1].to),
      (o[l].cap = o[l].cap + o[l + 1].cap),
      o.splice(l + 1, 1),
      (a = a - 1));
  return o;
}
function ul(t, n, e) {
  for (let i = 0; i < t.length; i++) if (t[i][n] === e) return i;
  return -1;
}
function pl() {
  if (((Pi = "powershell.exe"), Ni)) {
    const t = `${Vr}\\system32\\WindowsPowerShell\\v1.0\\powershell.exe`;
    je.existsSync(t) && (Pi = t);
  }
}
function ho() {
  if (
    ct.type() === "Windows_NT" &&
    !Kt &&
    ((Kt = Vr + "\\system32\\wbem\\wmic.exe"), !je.existsSync(Kt))
  )
    try {
      const t = In("WHERE WMIC", si).toString().split(`\r
`);
      t && t.length ? (Kt = t[0]) : (Kt = "wmic");
    } catch {
      Kt = "wmic";
    }
  return Kt;
}
function fl(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      try {
        go(ho() + " " + t).then((e) => {
          n(e, "");
        });
      } catch (e) {
        n("", e);
      }
    });
  });
}
function dl() {
  return Ni
    ? `"${process.env.VBOX_INSTALL_PATH || process.env.VBOX_MSI_INSTALL_PATH}\\VBoxManage.exe"`
    : "vboxmanage";
}
function tr(t) {
  let n = "",
    e,
    i = "";
  if (t.indexOf(Cr) >= 0) {
    e = t.split(Cr);
    const r = e[1].split(Lr);
    ((n = r[0]), r.length > 1 && (t = r.slice(1).join(Lr)));
  }
  t.indexOf(Ei) >= 0 && ((e = t.split(Ei)), (i = e[0]));
  let s = -1;
  for (let r = 0; r < Un.length; r++)
    Un[r].id === n && ((s = r), Un[r].callback(i));
  s >= 0 && Un.splice(s, 1);
}
function ml() {
  he ||
    ((he = Dr(
      Pi,
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
    he &&
      he.pid &&
      ((Nr = !0),
      he.stdout.on("data", function (t) {
        ((an = an + t.toString("utf8")),
          t.indexOf(Ei) >= 0 && (tr(an), (an = "")));
      }),
      he.stderr.on("data", function () {
        tr(an + ps);
      }),
      he.on("error", function () {
        tr(an + ps);
      }),
      he.on("close", function () {
        he && he.kill();
      })));
}
function hl() {
  try {
    he && (he.stdin.write("exit" + ct.EOL), he.stdin.end(), (Nr = !1));
  } catch {
    he && he.kill();
  }
  he = null;
}
function go(t) {
  if (Nr) {
    const n = Math.random().toString(36).substring(2, 12);
    return new Promise((e) => {
      process.nextTick(() => {
        function i(s) {
          e(s);
        }
        Un.push({
          id: n,
          cmd: t,
          callback: i,
          start: /* @__PURE__ */ new Date(),
        });
        try {
          he &&
            he.pid &&
            he.stdin.write(
              us +
                "echo " +
                Cr +
                n +
                Lr +
                "; " +
                ct.EOL +
                t +
                ct.EOL +
                "echo " +
                Ei +
                ct.EOL,
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
          const i = Dr(
            Pi,
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
              (i.stdin.write(us + t + ct.EOL),
                i.stdin.write("exit" + ct.EOL),
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
function gl(t, n, e) {
  let i = "";
  return (
    (e = e || {}),
    new Promise((s) => {
      process.nextTick(() => {
        try {
          const r = Dr(t, n, e);
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
function yl() {
  if (Ni) {
    if (!Ue)
      try {
        const e = In("chcp", si)
          .toString()
          .split(
            `\r
`,
          )[0]
          .split(":");
        Ue = e.length > 1 ? e[1].replace(".", "").trim() : "";
      } catch {
        Ue = "437";
      }
    return Ue;
  }
  if (br || ro || so || oo || ao) {
    if (!Ue)
      try {
        const e = In("echo $LANG", ki)
          .toString()
          .split(
            `\r
`,
          )[0]
          .split(".");
        ((Ue = e.length > 1 ? e[1].trim() : ""), Ue || (Ue = "UTF-8"));
      } catch {
        Ue = "UTF-8";
      }
    return Ue;
  }
}
function xl() {
  if (st !== null) return st;
  if (((st = !1), Ni))
    try {
      const t = In("WHERE smartctl 2>nul", si).toString().split(`\r
`);
      t && t.length ? (st = t[0].indexOf(":\\") >= 0) : (st = !1);
    } catch {
      st = !1;
    }
  if (br || ro || so || oo || ao)
    try {
      st =
        In("which smartctl 2>/dev/null", ki).toString().split(`\r
`).length > 0;
    } catch {
      Qa.noop();
    }
  return st;
}
function Sl(t) {
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
  if (He !== null) t = He;
  else if (t === void 0)
    try {
      ((t = je.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString()
        .split(`
`)),
        (He = t));
    } catch {
      return !1;
    }
  const e = pt(t, "hardware"),
    i = pt(t, "model");
  return (e && n.indexOf(e) > -1) || (i && i.indexOf("Raspberry Pi") > -1);
}
function wl() {
  let t = [];
  try {
    t = je.readFileSync("/etc/os-release", { encoding: "utf8" }).toString()
      .split(`
`);
  } catch {
    return !1;
  }
  const n = pt(t, "id", "=");
  return n && n.indexOf("raspbian") > -1;
}
function Cl(t, n, e) {
  e || ((e = n), (n = si));
  let i = "chcp 65001 > nul && cmd /C " + t + " && chcp " + Ue + " > nul";
  Ja(i, n, function (s, r) {
    e(s, r);
  });
}
function Ll() {
  const t = je.existsSync("/Library/Developer/CommandLineTools/usr/bin/"),
    n = je.existsSync("/Applications/Xcode.app/Contents/Developer/Tools"),
    e = je.existsSync("/Library/Developer/Xcode/");
  return t || e || n;
}
function Il() {
  const t = process.hrtime();
  return !Array.isArray(t) || t.length !== 2 ? 0 : +t[0] * 1e9 + +t[1];
}
function _l(t, n) {
  n = n || "";
  const e = [];
  return (
    t.forEach((i) => {
      i.startsWith(n) && e.indexOf(i) === -1 && e.push(i);
    }),
    e.length
  );
}
function vl(t, n) {
  n = n || "";
  const e = [];
  return (
    t.forEach((i) => {
      i.startsWith(n) && e.push(i);
    }),
    e.length
  );
}
function Ol(t, n) {
  typeof n > "u" && (n = !1);
  const e = t || "";
  let i = "";
  const s = mo(e.length, 2e3);
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
function Pl() {
  const t = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let n = !0,
    e = "";
  try {
    ((e.__proto__.replace = Ir),
      (e.__proto__.toLowerCase = _r),
      (e.__proto__.toString = lo),
      (e.__proto__.substr = co),
      (e.__proto__.substring = uo),
      (e.__proto__.trim = po),
      (e.__proto__.startsWith = fo));
  } catch {
    Object.setPrototypeOf(e, Ii);
  }
  n = n || t.length !== 62;
  const i = Date.now();
  if (typeof i == "number" && i > 16e11) {
    const s = (i % 100) + 15;
    for (let u = 0; u < s; u++) {
      const c = Math.random() * 61.99999999 + 1,
        f = parseInt(Math.floor(c).toString(), 10),
        p = parseInt(c.toString().split(".")[0], 10),
        d = Math.random() * 61.99999999 + 1,
        m = parseInt(Math.floor(d).toString(), 10),
        h = parseInt(d.toString().split(".")[0], 10);
      ((n = n && c !== d), (n = n && f === p && m === h), (e += t[f - 1]));
    }
    n = n && e.length === s;
    let r = Math.random() * s * 0.9999999999,
      o = e.substr(0, r) + " " + e.substr(r, 2e3);
    try {
      o.__proto__.replace = Ir;
    } catch {
      Object.setPrototypeOf(o, Ii);
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
    const l = e.toLowerCase();
    n = n && l.length === s && l[s - 1] && !l[s];
    for (let u = 0; u < s; u++) {
      const c = e[u];
      try {
        c.__proto__.toLowerCase = _r;
      } catch {
        Object.setPrototypeOf(e, Ii);
      }
      const f = l ? l[u] : "",
        p = c.toLowerCase();
      n = n && p[0] === f && p[0] && !p[1];
    }
  }
  return !n;
}
function El(t) {
  return ("00000000" + parseInt(t, 16).toString(2)).substr(-8);
}
function Ml(t) {
  const n = je.lstatSync,
    e = je.readdirSync,
    i = qa.join;
  function s(u) {
    return n(u).isDirectory();
  }
  function r(u) {
    return n(u).isFile();
  }
  function o(u) {
    return e(u)
      .map(function (c) {
        return i(u, c);
      })
      .filter(s);
  }
  function a(u) {
    return e(u)
      .map(function (c) {
        return i(u, c);
      })
      .filter(r);
  }
  function l(u) {
    try {
      return o(u)
        .map(function (p) {
          return l(p);
        })
        .reduce(function (p, d) {
          return p.concat(d);
        }, [])
        .concat(a(u));
    } catch {
      return [];
    }
  }
  return je.existsSync(t) ? l(t) : [];
}
function yo(t) {
  He === null ? (He = t) : t === void 0 && (t = He);
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
    r = pt(t, "revision", ":", !0),
    o = pt(t, "model:", ":", !0),
    a = pt(t, "serial", ":", !0);
  let l = {};
  if ({}.hasOwnProperty.call(n, r))
    l = {
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
    const u = ("00000000" + pt(t, "revision", ":", !0).toLowerCase()).substr(
        -8,
      ),
      c = parseInt(El(u.substr(2, 1)).substr(5, 3), 2) || 0,
      f = i[parseInt(u.substr(3, 1), 10)],
      p = e[parseInt(u.substr(4, 1), 10)],
      d = u.substr(5, 2);
    l = {
      model: o,
      serial: a,
      revisionCode: r,
      memory: 256 * Math.pow(2, c),
      manufacturer: f,
      processor: p,
      type: {}.hasOwnProperty.call(s, d) ? s[d] : "",
      revision: "1." + u.substr(7, 1),
    };
  }
  return l;
}
function Al(t) {
  if (He === null && t !== void 0) He = t;
  else if (t === void 0 && He !== null) t = He;
  else
    try {
      ((t = je.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString()
        .split(`
`)),
        (He = t));
    } catch {
      return !1;
    }
  const n = yo(t);
  return n.type === "4B" ||
    n.type === "CM4" ||
    n.type === "CM4S" ||
    n.type === "400"
    ? "VideoCore VI"
    : n.type === "5" || n.type === "500"
      ? "VideoCore VII"
      : "VideoCore IV";
}
function Tl(t) {
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
function Dl(t) {
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
function bl(t) {
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
function Vl() {
  let t = "";
  if (br)
    try {
      t = In("uname -v", ki).toString();
    } catch {
      t = "";
    }
  return t;
}
function Nl(t) {
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
    l = !1,
    u = [{ tagStart: "", tagEnd: "", tagContent: "", key: "", data: null }],
    c = "",
    f = t[i];
  for (; i < s; )
    ((c = f),
      i + 1 < s && (f = t[i + 1]),
      c === "<"
        ? ((a = !1),
          f === "/"
            ? (l = !0)
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
        : c === ">"
          ? (u[r].tagStart === "true/" &&
              ((o = !1),
              (l = !0),
              (u[r].tagStart = ""),
              (u[r].tagEnd = "/boolean"),
              (u[r].data = !0)),
            u[r].tagStart === "false/" &&
              ((o = !1),
              (l = !0),
              (u[r].tagStart = ""),
              (u[r].tagEnd = "/boolean"),
              (u[r].data = !1)),
            u[r].tagStart === "array/" &&
              ((o = !1),
              (l = !0),
              (u[r].tagStart = ""),
              (u[r].tagEnd = "/arrayEmpty"),
              (u[r].data = [])),
            a && (a = !1),
            o &&
              ((o = !1),
              (a = !0),
              u[r].tagStart === "array" && (u[r].data = []),
              u[r].tagStart === "dict" && (u[r].data = {})),
            l &&
              ((l = !1),
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
          : (o && (u[r].tagStart += c),
            l && (u[r].tagEnd += c),
            a && (u[r].tagContent += c)),
      i++);
  return u[0].data;
}
function fs(t) {
  return typeof t == "string" && !isNaN(t) && !isNaN(parseFloat(t));
}
function kl(t) {
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
        fs(r) || (s[1] = `"${r}";`);
      }
      if (s[1].indexOf('"') >= 0 && s[1].endsWith(";")) {
        const r = s[1].substring(0, s[1].length - 1).replace(/"/g, "");
        fs(r) && (s[1] = `${r};`);
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
function Bl(t, n) {
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
function Fl(t) {
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
function Rl(t, n = 5e3) {
  const e =
      t.startsWith("https:") ||
      t.indexOf(":443/") > 0 ||
      t.indexOf(":8443/") > 0
        ? Wa
        : $a,
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
function Gl(t) {
  return t.replace(/To Be Filled By O.E.M./g, "");
}
function Wl() {}
V.toInt = Za;
V.splitByNumber = el;
V.execOptsWin = si;
V.execOptsLinux = ki;
V.getCodepage = yl;
V.execWin = Cl;
V.isFunction = tl;
V.unique = nl;
V.sortByKey = il;
V.cores = rl;
V.getValue = pt;
V.decodeEscapeSequence = sl;
V.parseDateTime = ll;
V.parseHead = cl;
V.findObjectByKey = ul;
V.getWmic = ho;
V.wmic = fl;
V.darwinXcodeExists = Ll;
V.getVboxmanage = dl;
V.powerShell = go;
V.powerShellStart = ml;
V.powerShellRelease = hl;
V.execSafe = gl;
V.nanoSeconds = Il;
V.countUniqueLines = _l;
V.countLines = vl;
V.noop = Wl;
V.isRaspberry = Sl;
V.isRaspbian = wl;
V.sanitizeShellString = Ol;
V.isPrototypePolluted = Pl;
V.decodePiCpuinfo = yo;
V.getRpiGpu = Al;
V.promiseAll = Tl;
V.promisify = Dl;
V.promisifySave = bl;
V.smartMonToolsInstalled = xl;
V.linuxVersion = Vl;
V.plistParser = Nl;
V.plistReader = kl;
V.stringObj = Ii;
V.stringReplace = Ir;
V.stringToLower = _r;
V.stringToString = lo;
V.stringSubstr = co;
V.stringSubstring = uo;
V.stringTrim = po;
V.stringStartWith = fo;
V.mathMin = mo;
V.WINDIR = Vr;
V.getFilesInPath = Ml;
V.semverCompare = Bl;
V.getAppleModel = Fl;
V.checkWebsite = Rl;
V.cleanString = Gl;
V.getPowershell = pl;
var oi = {},
  tn = {};
const $e = Ae,
  Ve = be,
  W = V,
  U = oe.exec,
  Hn = oe.execSync;
let Ke = process.platform;
const Pn = Ke === "linux" || Ke === "android",
  Ne = Ke === "darwin",
  ke = Ke === "win32",
  kr = Ke === "freebsd",
  Br = Ke === "openbsd",
  Fr = Ke === "netbsd",
  $l = Ke === "sunos";
function Ul() {
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
    uptime: $e.uptime(),
    timezone: t.length >= 7 ? t[5] : "",
    timezoneName: n,
  };
  if (Ne || Pn)
    try {
      const s = Hn(
        "date +%Z && date +%z && ls -l /etc/localtime 2>/dev/null",
        W.execOptsLinux,
      )
        .toString()
        .split($e.EOL);
      s.length > 3 && !s[0] && s.shift();
      let r = s[0] || "";
      return (
        (r.startsWith("+") || r.startsWith("-")) && (r = "GMT"),
        {
          current: Date.now(),
          uptime: $e.uptime(),
          timezone: s[1] ? r + s[1] : r,
          timezoneName:
            (s[2] &&
              s[2].indexOf("/zoneinfo/") > 0 &&
              s[2].split("/zoneinfo/")[1]) ||
            "",
        }
      );
    } catch {
      W.noop();
    }
  return e;
}
tn.time = Ul;
function bn(t) {
  ((t = t || ""), (t = t.toLowerCase()));
  let n = Ke;
  return (
    ke
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
                                                                                : Pn &&
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
function zl() {
  let t = $e.hostname;
  if (Pn || Ne)
    try {
      t = Hn("hostname -f 2>/dev/null", W.execOptsLinux)
        .toString()
        .split($e.EOL)[0];
    } catch {
      W.noop();
    }
  if (kr || Br || Fr)
    try {
      t = Hn("hostname 2>/dev/null").toString().split($e.EOL)[0];
    } catch {
      W.noop();
    }
  if (ke)
    try {
      t = Hn("echo %COMPUTERNAME%.%USERDNSDOMAIN%", W.execOptsWin)
        .toString()
        .replace(".%USERDNSDOMAIN%", "")
        .split($e.EOL)[0];
    } catch {
      W.noop();
    }
  return t;
}
function Hl(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        platform: Ke === "win32" ? "Windows" : Ke,
        distro: "unknown",
        release: "unknown",
        codename: "",
        kernel: $e.release(),
        arch: $e.arch(),
        hostname: $e.hostname(),
        fqdn: zl(),
        codepage: "",
        logofile: "",
        serial: "",
        build: "",
        servicepack: "",
        uefi: !1,
      };
      if (
        (Pn &&
          U(
            "cat /etc/*-release; cat /usr/lib/os-release; cat /etc/openwrt_release",
            function (i, s) {
              let r = {};
              (s
                .toString()
                .split(
                  `
`,
                )
                .forEach(function (c) {
                  c.indexOf("=") !== -1 &&
                    (r[c.split("=")[0].trim().toUpperCase()] = c
                      .split("=")[1]
                      .trim());
                }),
                (e.distro = (r.DISTRIB_ID || r.NAME || "unknown").replace(
                  /"/g,
                  "",
                )),
                (e.logofile = bn(e.distro)));
              let a = (r.VERSION || "").replace(/"/g, ""),
                l = (r.DISTRIB_CODENAME || r.VERSION_CODENAME || "").replace(
                  /"/g,
                  "",
                );
              const u = (r.PRETTY_NAME || "").replace(/"/g, "");
              (u.indexOf(e.distro + " ") === 0 &&
                (a = u.replace(e.distro + " ", "").trim()),
                a.indexOf("(") >= 0 &&
                  ((l = a.split("(")[1].replace(/[()]/g, "").trim()),
                  (a = a.split("(")[0].trim())),
                (e.release = (
                  a ||
                  r.DISTRIB_RELEASE ||
                  r.VERSION_ID ||
                  "unknown"
                ).replace(/"/g, "")),
                (e.codename = l),
                (e.codepage = W.getCodepage()),
                (e.build = (r.BUILD_ID || "").replace(/"/g, "").trim()),
                jl().then((c) => {
                  ((e.uefi = c),
                    xo().then((f) => {
                      ((e.serial = f.os), t && t(e), n(e));
                    }));
                }));
            },
          ),
        (kr || Br || Fr) &&
          U(
            "sysctl kern.ostype kern.osrelease kern.osrevision kern.hostuuid machdep.bootmethod kern.geom.confxml",
            function (i, s) {
              let r = s.toString().split(`
`);
              const o = W.getValue(r, "kern.ostype"),
                a = bn(o),
                l = W.getValue(r, "kern.osrelease").split("-")[0],
                u = W.getValue(r, "kern.uuid"),
                c = W.getValue(r, "machdep.bootmethod"),
                f = s.toString().indexOf("<type>efi</type>") >= 0,
                p = c ? c.toLowerCase().indexOf("uefi") >= 0 : f || null;
              ((e.distro = o || e.distro),
                (e.logofile = a || e.logofile),
                (e.release = l || e.release),
                (e.serial = u || e.serial),
                (e.codename = ""),
                (e.codepage = W.getCodepage()),
                (e.uefi = p || null),
                t && t(e),
                n(e));
            },
          ),
        Ne &&
          U(
            "sw_vers; sysctl kern.ostype kern.osrelease kern.osrevision kern.uuid",
            function (i, s) {
              let r = s.toString().split(`
`);
              ((e.serial = W.getValue(r, "kern.uuid")),
                (e.distro = W.getValue(r, "ProductName")),
                (e.release = (
                  W.getValue(r, "ProductVersion", ":", !0, !0) +
                  " " +
                  W.getValue(r, "ProductVersionExtra", ":", !0, !0)
                ).trim()),
                (e.build = W.getValue(r, "BuildVersion")),
                (e.logofile = bn(e.distro)),
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
                (e.codepage = W.getCodepage()),
                t && t(e),
                n(e));
            },
          ),
        $l &&
          ((e.release = e.kernel),
          U("uname -o", function (i, s) {
            let r = s.toString().split(`
`);
            ((e.distro = r[0]), (e.logofile = bn(e.distro)), t && t(e), n(e));
          })),
        ke)
      ) {
        ((e.logofile = bn()), (e.release = e.kernel));
        try {
          const i = [];
          (i.push(
            W.powerShell(
              "Get-CimInstance Win32_OperatingSystem | select Caption,SerialNumber,BuildNumber,ServicePackMajorVersion,ServicePackMinorVersion | fl",
            ),
          ),
            i.push(
              W.powerShell(
                "(Get-CimInstance Win32_ComputerSystem).HypervisorPresent",
              ),
            ),
            i.push(
              W.powerShell(
                "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SystemInformation]::TerminalServerSession",
              ),
            ),
            W.promiseAll(i).then((s) => {
              let r = s.results[0]
                ? s.results[0].toString().split(`\r
`)
                : [""];
              ((e.distro = W.getValue(r, "Caption", ":").trim()),
                (e.serial = W.getValue(r, "SerialNumber", ":").trim()),
                (e.build = W.getValue(r, "BuildNumber", ":").trim()),
                (e.servicepack =
                  W.getValue(r, "ServicePackMajorVersion", ":").trim() +
                  "." +
                  W.getValue(r, "ServicePackMinorVersion", ":").trim()),
                (e.codepage = W.getCodepage()));
              const o = s.results[1]
                ? s.results[1].toString().toLowerCase()
                : "";
              e.hypervisor = o.indexOf("true") !== -1;
              const a = s.results[2] ? s.results[2].toString() : "";
              ((e.remoteSession =
                a.toString().toLowerCase().indexOf("true") >= 0),
                Kl().then((l) => {
                  ((e.uefi = l), t && t(e), n(e));
                }));
            }));
        } catch {
          (t && t(e), n(e));
        }
      }
    });
  });
}
tn.osInfo = Hl;
function jl() {
  return new Promise((t) => {
    process.nextTick(() => {
      Ve.stat("/sys/firmware/efi", function (n) {
        if (n)
          U('dmesg | grep -E "EFI v"', function (e, i) {
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
function Kl() {
  return new Promise((t) => {
    process.nextTick(() => {
      try {
        U(
          'findstr /C:"Detected boot environment" "%windir%\\Panther\\setupact.log"',
          W.execOptsWin,
          function (n, e) {
            if (n)
              U("echo %firmware_type%", W.execOptsWin, function (i, s) {
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
function Xl(t, n) {
  let e = {
    kernel: $e.release(),
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
      if (W.isFunction(t) && !n) ((n = t), (t = "*"));
      else if (((t = t || "*"), typeof t != "string"))
        return (n && n({}), s({}));
      const r = i(t);
      let o = r.counter,
        a = /* @__PURE__ */ (function () {
          return function () {
            --o === 0 && (n && n(r.versions), s(r.versions));
          };
        })(),
        l = "";
      try {
        if (
          ({}.hasOwnProperty.call(r.versions, "openssl") &&
            ((r.versions.openssl = process.versions.openssl),
            U("openssl version", function (u, c) {
              if (!u) {
                let p = c
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
            U("npm -v", function (u, c) {
              (u ||
                (r.versions.npm = c.toString().split(`
`)[0]),
                a());
            }),
          {}.hasOwnProperty.call(r.versions, "pm2") &&
            ((l = "pm2"),
            ke && (l += ".cmd"),
            U(`${l} -v`, function (u, c) {
              if (!u) {
                let f = c
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
            U("yarn --version", function (u, c) {
              (u ||
                (r.versions.yarn = c.toString().split(`
`)[0]),
                a());
            }),
          {}.hasOwnProperty.call(r.versions, "gulp") &&
            ((l = "gulp"),
            ke && (l += ".cmd"),
            U(`${l} --version`, function (u, c) {
              if (!u) {
                const f =
                  c.toString().split(`
`)[0] || "";
                r.versions.gulp = (
                  f.toLowerCase().split("version")[1] || ""
                ).trim();
              }
              a();
            })),
          {}.hasOwnProperty.call(r.versions, "homebrew") &&
            ((l = "brew"),
            U(`${l} --version`, function (u, c) {
              if (!u) {
                const f =
                  c.toString().split(`
`)[0] || "";
                r.versions.homebrew = (
                  f.toLowerCase().split(" ")[1] || ""
                ).trim();
              }
              a();
            })),
          {}.hasOwnProperty.call(r.versions, "tsc") &&
            ((l = "tsc"),
            ke && (l += ".cmd"),
            U(`${l} --version`, function (u, c) {
              if (!u) {
                const f =
                  c.toString().split(`
`)[0] || "";
                r.versions.tsc = (
                  f.toLowerCase().split("version")[1] || ""
                ).trim();
              }
              a();
            })),
          {}.hasOwnProperty.call(r.versions, "grunt") &&
            ((l = "grunt"),
            ke && (l += ".cmd"),
            U(`${l} --version`, function (u, c) {
              if (!u) {
                const f =
                  c.toString().split(`
`)[0] || "";
                r.versions.grunt = (
                  f.toLowerCase().split("cli v")[1] || ""
                ).trim();
              }
              a();
            })),
          {}.hasOwnProperty.call(r.versions, "git"))
        )
          if (Ne) {
            const u =
              Ve.existsSync("/usr/local/Cellar/git") ||
              Ve.existsSync("/opt/homebrew/bin/git");
            W.darwinXcodeExists() || u
              ? U("git --version", function (c, f) {
                  if (!c) {
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
            U("git --version", function (u, c) {
              if (!u) {
                let f =
                  c.toString().split(`
`)[0] || "";
                ((f = (f.toLowerCase().split("version")[1] || "").trim()),
                  (r.versions.git = (f.split(" ")[0] || "").trim()));
              }
              a();
            });
        if (
          ({}.hasOwnProperty.call(r.versions, "apache") &&
            U("apachectl -v 2>&1", function (u, c) {
              if (!u) {
                const f = (
                  c.toString().split(`
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
            U("nginx -v 2>&1", function (u, c) {
              if (!u) {
                const f =
                  c.toString().split(`
`)[0] || "";
                r.versions.nginx = (f.toLowerCase().split("/")[1] || "").trim();
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "mysql") &&
            U("mysql -V", function (u, c) {
              if (!u) {
                let f =
                  c.toString().split(`
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
            U("php -v", function (u, c) {
              if (!u) {
                let p = (
                  c.toString().split(`
`)[0] || ""
                ).split("(");
                (p[0].indexOf("-") && (p = p[0].split("-")),
                  (r.versions.php = p[0].replace(/[^0-9.]/g, "")));
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "redis") &&
            U("redis-server --version", function (u, c) {
              if (!u) {
                const p = (
                  c.toString().split(`
`)[0] || ""
                ).split(" ");
                r.versions.redis = W.getValue(p, "v", "=", !0);
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "docker") &&
            U("docker --version", function (u, c) {
              if (!u) {
                const p = (
                  c.toString().split(`
`)[0] || ""
                ).split(" ");
                r.versions.docker =
                  p.length > 2 && p[2].endsWith(",") ? p[2].slice(0, -1) : "";
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "postfix") &&
            U("postconf -d | grep mail_version", function (u, c) {
              if (!u) {
                const f =
                  c.toString().split(`
`) || [];
                r.versions.postfix = W.getValue(f, "mail_version", "=", !0);
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "mongodb") &&
            U("mongod --version", function (u, c) {
              if (!u) {
                const f =
                  c.toString().split(`
`)[0] || "";
                r.versions.mongodb = (
                  f.toLowerCase().split(",")[0] || ""
                ).replace(/[^0-9.]/g, "");
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "postgresql") &&
            (Pn
              ? U("locate bin/postgres", function (u, c) {
                  if (u)
                    U("psql -V", function (f, p) {
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
                    const f = c
                      .toString()
                      .split(
                        `
`,
                      )
                      .sort();
                    f.length
                      ? U(f[f.length - 1] + " -V", function (p, d) {
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
              : ke
                ? W.powerShell(
                    "Get-CimInstance Win32_Service | select caption | fl",
                  ).then((u) => {
                    (u.split(/\n\s*\n/).forEach((f) => {
                      if (f.trim() !== "") {
                        let p = f.trim().split(`\r
`),
                          d = W.getValue(p, "caption", ":", !0).toLowerCase();
                        if (d.indexOf("postgresql") > -1) {
                          const m = d.split(" server ");
                          m.length > 1 && (r.versions.postgresql = m[1]);
                        }
                      }
                    }),
                      a());
                  })
                : U("postgres -V", function (u, c) {
                    if (u)
                      U("pg_config --version", function (f, p) {
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
                        c
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
            U("perl -v", function (u, c) {
              if (!u) {
                const f =
                  c.toString().split(`
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
          if (Ne)
            try {
              const c = Hn("sw_vers").toString().split(`
`),
                f = W.getValue(c, "ProductVersion", ":"),
                p = Ve.existsSync("/usr/local/Cellar/python"),
                d = Ve.existsSync("/opt/homebrew/bin/python");
              (W.darwinXcodeExists() && W.semverCompare("12.0.1", f) < 0) ||
              p ||
              d
                ? U(
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
            U("python -V 2>&1", function (u, c) {
              if (!u) {
                const f =
                  c.toString().split(`
`)[0] || "";
                r.versions.python = f
                  .toLowerCase()
                  .replace("python", "")
                  .trim();
              }
              a();
            });
        if ({}.hasOwnProperty.call(r.versions, "python3"))
          if (Ne) {
            const u =
              Ve.existsSync("/usr/local/Cellar/python3") ||
              Ve.existsSync("/opt/homebrew/bin/python3");
            W.darwinXcodeExists() || u
              ? U("python3 -V 2>&1", function (c, f) {
                  if (!c) {
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
            U("python3 -V 2>&1", function (u, c) {
              if (!u) {
                const f =
                  c.toString().split(`
`)[0] || "";
                r.versions.python3 = f
                  .toLowerCase()
                  .replace("python", "")
                  .trim();
              }
              a();
            });
        if ({}.hasOwnProperty.call(r.versions, "pip"))
          if (Ne) {
            const u =
              Ve.existsSync("/usr/local/Cellar/pip") ||
              Ve.existsSync("/opt/homebrew/bin/pip");
            W.darwinXcodeExists() || u
              ? U("pip -V 2>&1", function (c, f) {
                  if (!c) {
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
            U("pip -V 2>&1", function (u, c) {
              if (!u) {
                const p = (
                  c.toString().split(`
`)[0] || ""
                ).split(" ");
                r.versions.pip = p.length >= 2 ? p[1] : "";
              }
              a();
            });
        if ({}.hasOwnProperty.call(r.versions, "pip3"))
          if (Ne) {
            const u =
              Ve.existsSync("/usr/local/Cellar/pip3") ||
              Ve.existsSync("/opt/homebrew/bin/pip3");
            W.darwinXcodeExists() || u
              ? U("pip3 -V 2>&1", function (c, f) {
                  if (!c) {
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
            U("pip3 -V 2>&1", function (u, c) {
              if (!u) {
                const p = (
                  c.toString().split(`
`)[0] || ""
                ).split(" ");
                r.versions.pip3 = p.length >= 2 ? p[1] : "";
              }
              a();
            });
        (({}).hasOwnProperty.call(r.versions, "java") &&
          (Ne
            ? U("/usr/libexec/java_home -V 2>&1", function (u, c) {
                !u &&
                c.toString().toLowerCase().indexOf("no java runtime") === -1
                  ? U("java -version 2>&1", function (f, p) {
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
            : U("java -version 2>&1", function (u, c) {
                if (!u) {
                  const p = (
                    c.toString().split(`
`)[0] || ""
                  ).split('"');
                  r.versions.java = p.length === 3 ? p[1].trim() : "";
                }
                a();
              })),
          {}.hasOwnProperty.call(r.versions, "gcc") &&
            ((Ne && W.darwinXcodeExists()) || !Ne
              ? U("gcc -dumpversion", function (u, c) {
                  (u ||
                    (r.versions.gcc =
                      c
                        .toString()
                        .split(
                          `
`,
                        )[0]
                        .trim() || ""),
                    r.versions.gcc.indexOf(".") > -1
                      ? a()
                      : U("gcc --version", function (f, p) {
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
            U(W.getVboxmanage() + " -v 2>&1", function (u, c) {
              if (!u) {
                const p = (
                  c.toString().split(`
`)[0] || ""
                ).split("r");
                r.versions.virtualbox = p[0];
              }
              a();
            }),
          {}.hasOwnProperty.call(r.versions, "bash") &&
            U("bash --version", function (u, c) {
              if (!u) {
                const p = c
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
            U("zsh --version", function (u, c) {
              if (!u) {
                const p = c
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
            U("fish --version", function (u, c) {
              if (!u) {
                const p = c
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
            U("bun -v", function (u, c) {
              if (!u) {
                const f = c
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
            U("deno -v", function (u, c) {
              if (!u) {
                const p = c
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
            U("node -v", function (u, c) {
              if (!u) {
                let f = c
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
            (ke
              ? W.powerShell("$PSVersionTable").then((u) => {
                  const c = u
                    .toString()
                    .toLowerCase()
                    .split(
                      `
`,
                    )
                    .map((f) => f.replace(/ +/g, " ").replace(/ +/g, ":"));
                  ((r.versions.powershell = W.getValue(c, "psversion")), a());
                })
              : a()),
          {}.hasOwnProperty.call(r.versions, "dotnet") &&
            (ke
              ? W.powerShell(
                  'gci "HKLM:\\SOFTWARE\\Microsoft\\NET Framework Setup\\NDP" -recurse | gp -name Version,Release -EA 0 | where { $_.PSChildName -match "^(?!S)\\p{L}"} | select PSChildName, Version, Release',
                ).then((u) => {
                  const c = u.toString().split(`\r
`);
                  let f = "";
                  (c.forEach((p) => {
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
tn.versions = Xl;
function Yl(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      if (ke)
        try {
          const e = "CMD";
          W.powerShell(
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
        U("echo $SHELL", function (i, s) {
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
tn.shell = Yl;
function ql() {
  let t = [];
  try {
    const n = $e.networkInterfaces();
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
function xo(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
          os: "",
          hardware: "",
          macs: ql(),
        },
        i;
      if (
        (Ne &&
          U("system_profiler SPHardwareDataType -json", function (s, r) {
            if (!s)
              try {
                const o = JSON.parse(r.toString());
                if (o.SPHardwareDataType && o.SPHardwareDataType.length > 0) {
                  const a = o.SPHardwareDataType[0];
                  ((e.os = a.platform_UUID.toLowerCase()),
                    (e.hardware = a.serial_number));
                }
              } catch {
                W.noop();
              }
            (t && t(e), n(e));
          }),
        Pn &&
          U(
            `echo -n "os: "; cat /var/lib/dbus/machine-id 2> /dev/null ||
cat /etc/machine-id 2> /dev/null; echo;
echo -n "hardware: "; cat /sys/class/dmi/id/product_uuid 2> /dev/null; echo;`,
            function (r, o) {
              const a = o.toString().split(`
`);
              if (
                ((e.os = W.getValue(a, "os").toLowerCase()),
                (e.hardware = W.getValue(a, "hardware").toLowerCase()),
                !e.hardware)
              ) {
                const l = Ve.readFileSync("/proc/cpuinfo", {
                    encoding: "utf8",
                  }).toString().split(`
`),
                  u = W.getValue(l, "serial");
                e.hardware = u || "";
              }
              (t && t(e), n(e));
            },
          ),
        (kr || Br || Fr) &&
          U("sysctl -i kern.hostid kern.hostuuid", function (s, r) {
            const o = r.toString().split(`
`);
            ((e.hardware = W.getValue(o, "kern.hostid", ":").toLowerCase()),
              (e.os = W.getValue(o, "kern.hostuuid", ":").toLowerCase()),
              e.os.indexOf("unknown") >= 0 && (e.os = ""),
              e.hardware.indexOf("unknown") >= 0 && (e.hardware = ""),
              t && t(e),
              n(e));
          }),
        ke)
      ) {
        let s = "%windir%\\System32";
        (process.arch === "ia32" &&
          Object.prototype.hasOwnProperty.call(
            process.env,
            "PROCESSOR_ARCHITEW6432",
          ) &&
          (s = "%windir%\\sysnative\\cmd.exe /c %windir%\\System32"),
          W.powerShell(
            "Get-CimInstance Win32_ComputerSystemProduct | select UUID | fl",
          ).then((r) => {
            let o = r.split(`\r
`);
            ((e.hardware = W.getValue(o, "uuid", ":").toLowerCase()),
              U(
                `${s}\\reg query "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography" /v MachineGuid`,
                W.execOptsWin,
                function (a, l) {
                  ((i = l
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
tn.uuid = xo;
const nr = be,
  qt = Ae,
  I = V,
  { uuid: pm } = tn,
  _n = oe.exec,
  Yt = oe.execSync,
  ui = I.promisify(oe.exec);
let yt = process.platform;
const Bi = yt === "linux" || yt === "android",
  Fi = yt === "darwin",
  Ri = yt === "win32",
  Sn = yt === "freebsd",
  wn = yt === "openbsd",
  Cn = yt === "netbsd",
  Gi = yt === "sunos";
function Jl(t) {
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
        ((Bi || Sn || wn || Cn) &&
          _n(
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
                ((r = Yt(o, I.execOptsLinux).toString().split(`
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
                  const a = Yt(
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
              if (Sn || wn || Cn)
                try {
                  const a = Yt(
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
                (qt.release().toLowerCase().indexOf("microsoft") >= 0 ||
                  qt.release().toLowerCase().endsWith("wsl2"))
              ) {
                const a = parseFloat(qt.release().toLowerCase());
                ((e.virtual = !0),
                  (e.manufacturer = "Microsoft"),
                  (e.model = "WSL"),
                  (e.version = a < 4.19 ? "1" : "2"));
              }
              if ((Sn || wn || Cn) && !e.virtualHost)
                try {
                  const l = Yt("dmidecode -t 4", I.execOptsLinux).toString()
                    .split(`
`);
                  switch (
                    I.getValue(l, "manufacturer", ":", !0).toLowerCase()
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
              (nr.existsSync("/.dockerenv") || nr.existsSync("/.dockerinit")) &&
                (e.model = "Docker Container");
              try {
                const a = Yt(
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
                ? nr.readFile("/proc/cpuinfo", function (a, l) {
                    if (!a) {
                      let u = l.toString().split(`
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
                        const c = I.decodePiCpuinfo(u);
                        ((e.model = c.model),
                          (e.version = c.revisionCode),
                          (e.manufacturer = "Raspberry Pi Foundation"),
                          (e.raspberry = {
                            manufacturer: c.manufacturer,
                            processor: c.processor,
                            type: c.type,
                            revision: c.revision,
                          }));
                      }
                    }
                    (t && t(e), n(e));
                  })
                : (t && t(e), n(e));
            },
          ),
        Fi &&
          _n("ioreg -c IOPlatformExpertDevice -d 2", function (i, s) {
            if (!i) {
              let r = s.toString().replace(/[<>"]/g, "").split(`
`);
              const o = I.getAppleModel(I.getValue(r, "model", "=", !0));
              ((e.manufacturer = I.getValue(r, "manufacturer", "=", !0)),
                (e.model = o.key),
                (e.type = So(o.version)),
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
        Gi && (t && t(e), n(e)),
        Ri)
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
                ).then((l, u) => {
                  if (!u) {
                    let c = l.split(`\r
`);
                    e.sku = I.getValue(c, "systemsku", ":");
                  }
                  e.virtual
                    ? (t && t(e), n(e))
                    : I.powerShell(
                        "Get-CimInstance Win32_bios | select Version, SerialNumber, SMBIOSBIOSVersion",
                      ).then((c, f) => {
                        if (f) (t && t(e), n(e));
                        else {
                          let p = c.toString();
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
oi.system = Jl;
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
function Ql(t) {
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
        ((Bi || Sn || wn || Cn) &&
          (process.arch === "arm"
            ? (i = "cat /proc/cpuinfo | grep Serial")
            : (i =
                "export LC_ALL=C; dmidecode -t bios 2>/dev/null; unset LC_ALL"),
          _n(i, function (s, r) {
            let o = r.toString().split(`
`);
            ((e.vendor = I.getValue(o, "Vendor")),
              (e.version = I.getValue(o, "Version")));
            let a = I.getValue(o, "Release Date");
            ((e.releaseDate = I.parseDateTime(a).date),
              (e.revision = I.getValue(o, "BIOS Revision")),
              (e.serial = I.getValue(o, "SerialNumber")));
            let l = I.getValue(o, "Currently Installed Language").split("|")[0];
            if (
              (l && (e.language = l),
              o.length && r.toString().indexOf("Characteristics:") >= 0)
            ) {
              const c = [];
              (o.forEach((f) => {
                if (f.indexOf(" is supported") >= 0) {
                  const p = f.split(" is supported")[0].trim();
                  c.push(p);
                }
              }),
                (e.features = c));
            }
            const u = `echo -n "bios_date: "; cat /sys/devices/virtual/dmi/id/bios_date 2>/dev/null; echo;
            echo -n "bios_vendor: "; cat /sys/devices/virtual/dmi/id/bios_vendor 2>/dev/null; echo;
            echo -n "bios_version: "; cat /sys/devices/virtual/dmi/id/bios_version 2>/dev/null; echo;`;
            try {
              ((o = Yt(u, I.execOptsLinux).toString().split(`
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
        Fi &&
          ((e.vendor = "Apple Inc."),
          _n("system_profiler SPHardwareDataType -json", function (s, r) {
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
        Gi && ((e.vendor = "Sun Microsystems"), t && t(e), n(e)),
        Ri)
      )
        try {
          I.powerShell(
            'Get-CimInstance Win32_bios | select Description,Version,Manufacturer,@{n="ReleaseDate";e={$_.ReleaseDate.ToString("yyyy-MM-dd")}},BuildNumber,SerialNumber,SMBIOSBIOSVersion | fl',
          ).then((s, r) => {
            if (!r) {
              let o = s.toString().split(`\r
`);
              const a = I.getValue(o, "description", ":"),
                l = I.getValue(o, "SMBIOSBIOSVersion", ":");
              (a.indexOf(" Version ") !== -1
                ? ((e.vendor = a.split(" Version ")[0].trim()),
                  (e.version = a.split(" Version ")[1].trim()))
                : a.indexOf(" Ver: ") !== -1
                  ? ((e.vendor = I.getValue(o, "manufacturer", ":")),
                    (e.version = a.split(" Ver: ")[1].trim()))
                  : ((e.vendor = I.getValue(o, "manufacturer", ":")),
                    (e.version = l || I.getValue(o, "version", ":"))),
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
oi.bios = Ql;
function Zl(t) {
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
      if (Bi || Sn || wn || Cn) {
        process.arch === "arm"
          ? (i = "cat /proc/cpuinfo | grep Serial")
          : (i = "export LC_ALL=C; dmidecode -t 2 2>/dev/null; unset LC_ALL");
        const s = [];
        (s.push(ui(i)),
          s.push(ui("export LC_ALL=C; dmidecode -t memory 2>/dev/null")),
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
              ((o = Yt(a, I.execOptsLinux).toString().split(`
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
              const l = I.decodePiCpuinfo();
              ((e.manufacturer = l.manufacturer),
                (e.model = "Raspberry Pi"),
                (e.serial = l.serial),
                (e.version = l.type + " - " + l.revision),
                (e.memMax = qt.totalmem()),
                (e.memSlots = 0));
            }
            (t && t(e), n(e));
          }));
      }
      if (Fi) {
        const s = [];
        (s.push(ui("ioreg -c IOPlatformExpertDevice -d 2")),
          s.push(ui("system_profiler SPMemoryDataType")),
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
              qt.arch() === "arm64" &&
                ((e.memSlots = 0), (e.memMax = qt.totalmem())),
              t && t(e),
              n(e));
          }));
      }
      if ((Gi && (t && t(e), n(e)), Ri))
        try {
          const s = [],
            r = parseInt(qt.release()) >= 10,
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
              let l = a.results[0]
                ? a.results[0].toString().split(`\r
`)
                : [""];
              ((e.manufacturer = J(I.getValue(l, "manufacturer", ":"))),
                (e.model = J(I.getValue(l, "model", ":"))),
                e.model || (e.model = J(I.getValue(l, "product", ":"))),
                (e.version = J(I.getValue(l, "version", ":"))),
                (e.serial = J(I.getValue(l, "serialnumber", ":"))),
                (e.assetTag = J(I.getValue(l, "partnumber", ":"))),
                e.assetTag || (e.assetTag = J(I.getValue(l, "sku", ":"))),
                (l = a.results[1]
                  ? a.results[1].toString().split(`\r
`)
                  : [""]),
                (e.memMax =
                  I.toInt(I.getValue(l, o, ":")) * (r ? 1024 : 1) || null),
                (e.memSlots =
                  I.toInt(I.getValue(l, "MemoryDevices", ":")) || null),
                t && t(e),
                n(e));
            }));
        } catch {
          (t && t(e), n(e));
        }
    });
  });
}
oi.baseboard = Zl;
function So(t) {
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
function ec(t) {
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
        ((Bi || Sn || wn || Cn) &&
          _n(
            `echo -n "chassis_asset_tag: "; cat /sys/devices/virtual/dmi/id/chassis_asset_tag 2>/dev/null; echo;
            echo -n "chassis_serial: "; cat /sys/devices/virtual/dmi/id/chassis_serial 2>/dev/null; echo;
            echo -n "chassis_type: "; cat /sys/devices/virtual/dmi/id/chassis_type 2>/dev/null; echo;
            echo -n "chassis_vendor: "; cat /sys/devices/virtual/dmi/id/chassis_vendor 2>/dev/null; echo;
            echo -n "chassis_version: "; cat /sys/devices/virtual/dmi/id/chassis_version 2>/dev/null; echo;`,
            function (r, o) {
              let a = o.toString().split(`
`);
              i.manufacturer = J(I.getValue(a, "chassis_vendor"));
              const l = parseInt(
                I.getValue(a, "chassis_type").replace(/\D/g, ""),
              );
              ((i.type = J(l && !isNaN(l) && l < n.length ? n[l - 1] : "")),
                (i.version = J(I.getValue(a, "chassis_version"))),
                (i.serial = J(I.getValue(a, "chassis_serial"))),
                (i.assetTag = J(I.getValue(a, "chassis_asset_tag"))),
                t && t(i),
                e(i));
            },
          ),
        Fi &&
          _n("ioreg -c IOPlatformExpertDevice -d 2", function (s, r) {
            if (!s) {
              let o = r.toString().replace(/[<>"]/g, "").split(`
`);
              const a = I.getAppleModel(I.getValue(o, "model", "=", !0));
              ((i.manufacturer = I.getValue(o, "manufacturer", "=", !0)),
                (i.model = a.key),
                (i.type = So(a.model)),
                (i.version = a.version),
                (i.serial = I.getValue(o, "ioplatformserialnumber", "=", !0)),
                (i.assetTag =
                  I.getValue(o, "board-id", "=", !0) ||
                  I.getValue(o, "target-type", "=", !0)),
                (i.sku = I.getValue(o, "target-sub-type", "=", !0)));
            }
            (t && t(i), e(i));
          }),
        Gi && (t && t(i), e(i)),
        Ri)
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
oi.chassis = ec;
var kt = {};
const ze = Ae,
  Ie = oe.exec,
  Wi = oe.execSync,
  Mi = be,
  P = V;
let xt = process.platform;
const En = xt === "linux" || xt === "android",
  $i = xt === "darwin",
  Ui = xt === "win32",
  zi = xt === "freebsd",
  Hi = xt === "openbsd",
  ji = xt === "netbsd",
  Ki = xt === "sunos";
let gn = 0,
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
  _ = [],
  ir = 0;
const rr = {
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
  ds = {
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
  ms = {
    LGA1150:
      "i7-5775C i3-4340 i3-4170 G3250 i3-4160T i3-4160 E3-1231 G3258 G3240 i7-4790S i7-4790K i7-4790 i5-4690K i5-4690 i5-4590T i5-4590S i5-4590 i5-4460 i3-4360 i3-4150 G1820 G3420 G3220 i7-4771 i5-4440 i3-4330 i3-4130T i3-4130 E3-1230 i7-4770S i7-4770K i7-4770 i5-4670K i5-4670 i5-4570T i5-4570S i5-4570 i5-4430",
    LGA1151:
      "i9-9900KS E-2288G E-2224 G5420 i9-9900T i9-9900 i7-9700T i7-9700F i7-9700E i7-9700 i5-9600 i5-9500T i5-9500F i5-9500 i5-9400T i3-9350K i3-9300 i3-9100T i3-9100F i3-9100 G4930 i9-9900KF i7-9700KF i5-9600KF i5-9400F i5-9400 i3-9350KF i9-9900K i7-9700K i5-9600K G5500 G5400 i7-8700T i7-8086K i5-8600 i5-8500T i5-8500 i5-8400T i3-8300 i3-8100T G4900 i7-8700K i7-8700 i5-8600K i5-8400 i3-8350K i3-8100 E3-1270 G4600 G4560 i7-7700T i7-7700K i7-7700 i5-7600K i5-7600 i5-7500T i5-7500 i5-7400 i3-7350K i3-7300 i3-7100T i3-7100 G3930 G3900 G4400 i7-6700T i7-6700K i7-6700 i5-6600K i5-6600 i5-6500T i5-6500 i5-6400T i5-6400 i3-6300 i3-6100T i3-6100 E3-1270 E3-1270 T4500 T4400",
    1155: "G440 G460 G465 G470 G530T G540T G550T G1610T G1620T G530 G540 G1610 G550 G1620 G555 G1630 i3-2100T i3-2120T i3-3220T i3-3240T i3-3250T i3-2100 i3-2105 i3-2102 i3-3210 i3-3220 i3-2125 i3-2120 i3-3225 i3-2130 i3-3245 i3-3240 i3-3250 i5-3570T i5-2500T i5-2400S i5-2405S i5-2390T i5-3330S i5-2500S i5-3335S i5-2300 i5-3450S i5-3340S i5-3470S i5-3475S i5-3470T i5-2310 i5-3550S i5-2320 i5-3330 i5-3350P i5-3450 i5-2400 i5-3340 i5-3570S i5-2380P i5-2450P i5-3470 i5-2500K i5-3550 i5-2500 i5-3570 i5-3570K i5-2550K i7-3770T i7-2600S i7-3770S i7-2600K i7-2600 i7-3770 i7-3770K i7-2700K G620T G630T G640T G2020T G645T G2100T G2030T G622 G860T G620 G632 G2120T G630 G640 G2010 G840 G2020 G850 G645 G2030 G860 G2120 G870 G2130 G2140 E3-1220L E3-1220L E3-1260L E3-1265L E3-1220 E3-1225 E3-1220 E3-1235 E3-1225 E3-1230 E3-1230 E3-1240 E3-1245 E3-1270 E3-1275 E3-1240 E3-1245 E3-1270 E3-1280 E3-1275 E3-1290 E3-1280 E3-1290",
  };
function tc(t) {
  let n = "";
  for (const e in ms)
    ms[e].split(" ").forEach((s) => {
      t.indexOf(s) >= 0 && (n = e);
    });
  return n;
}
function _i(t) {
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
function pi(t) {
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
    (t.manufacturer = _i(t.brand)));
  let n = t.brand.split(" ");
  return (n.shift(), (t.brand = n.join(" ")), t);
}
function sr(t) {
  let n = "0";
  for (let e in rr)
    if ({}.hasOwnProperty.call(rr, e)) {
      let i = e.split("|"),
        s = 0;
      (i.forEach((r) => {
        t.indexOf(r) > -1 && s++;
      }),
        s === i.length && (n = rr[e]));
    }
  return parseFloat(n);
}
function nc() {
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
      wo().then((i) => {
        if (
          ((e.flags = i),
          (e.virtualization = i.indexOf("vmx") > -1 || i.indexOf("svm") > -1),
          $i &&
            Ie(
              "sysctl machdep.cpu hw.cpufrequency_max hw.cpufrequency_min hw.packages hw.physicalcpu_max hw.ncpu hw.tbfrequency hw.cpufamily hw.cpusubfamily",
              function (s, r) {
                let o = r.toString().split(`
`);
                const l = P.getValue(o, "machdep.cpu.brand_string").split("@");
                e.brand = l[0].trim();
                const u = l[1] ? l[1].trim() : "0";
                e.speed = parseFloat(u.replace(/GHz+/g, ""));
                let c = P.getValue(o, "hw.tbfrequency") / 1e9;
                ((c = c < 0.1 ? c * 100 : c),
                  (e.speed = e.speed === 0 ? c : e.speed),
                  (gn = e.speed),
                  (e = pi(e)),
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
                if (ze.arch() === "arm64") {
                  e.socket = "SOC";
                  try {
                    const m = Wi(
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
                  Co().then((m) => {
                    ((e.cache = m), t(e));
                  }));
              },
            ),
          En)
        ) {
          let s = "",
            r = [];
          (ze.cpus()[0] && ze.cpus()[0].model && (s = ze.cpus()[0].model),
            Ie(
              'export LC_ALL=C; lscpu; echo -n "Governor: "; cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor 2>/dev/null; echo; unset LC_ALL',
              function (o, a) {
                (o ||
                  (r = a.toString().split(`
`)),
                  (s = P.getValue(r, "model name") || s),
                  (s = P.getValue(r, "bios model name") || s),
                  (s = P.cleanString(s)));
                const l = s.split("@");
                if (
                  ((e.brand = l[0].trim()),
                  (e.speed = l[1] ? parseFloat(l[1].trim()) : 0),
                  e.speed === 0 &&
                    (e.brand.indexOf("AMD") > -1 ||
                      e.brand.toLowerCase().indexOf("ryzen") > -1) &&
                    (e.speed = sr(e.brand)),
                  e.speed === 0)
                ) {
                  const h = vr();
                  h.avg !== 0 && (e.speed = h.avg);
                }
                ((gn = e.speed),
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
                  (e = pi(e)),
                  (e.vendor = _i(P.getValue(r, "vendor id"))),
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
                  c = P.getValue(r, "socket(s)") || "1",
                  f = parseInt(u, 10),
                  p = parseInt(c, 10) || 1,
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
                  const h = Mi.readFileSync("/proc/cpuinfo").toString().split(`
`),
                    y = P.getValue(h, "uarch") || "";
                  if (y.indexOf(",") > -1) {
                    const g = y.split(",");
                    ((e.manufacturer = _i(g[0])), (e.brand = g[1]));
                  }
                }
                let m = [];
                Ie(
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
        if (zi || Hi || ji) {
          let s = "",
            r = [];
          (ze.cpus()[0] && ze.cpus()[0].model && (s = ze.cpus()[0].model),
            Ie(
              "export LC_ALL=C; dmidecode -t 4; dmidecode -t 7 unset LC_ALL",
              function (o, a) {
                let l = [];
                if (!o) {
                  const d = a.toString().split("# dmidecode"),
                    m = d.length > 1 ? d[1] : "";
                  ((l = d.length > 2 ? d[2].split("Cache Information") : []),
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
                    (e.speed = sr(e.brand)),
                  e.speed === 0)
                ) {
                  const d = vr();
                  d.avg !== 0 && (e.speed = d.avg);
                }
                ((gn = e.speed),
                  (e.speedMin = e.speed),
                  (e.speedMax =
                    Math.round(
                      parseFloat(
                        P.getValue(r, "max speed").replace(/Mhz/g, ""),
                      ) / 10,
                    ) / 100),
                  (e = pi(e)),
                  (e.vendor = _i(P.getValue(r, "manufacturer"))));
                let u = P.getValue(r, "signature");
                u = u.split(",");
                for (let d = 0; d < u.length; d++) u[d] = u[d].trim();
                ((e.family = P.getValue(u, "Family", " ", !0)),
                  (e.model = P.getValue(u, "Model", " ", !0)),
                  (e.stepping = P.getValue(u, "Stepping", " ", !0)),
                  (e.revision = ""));
                const c = parseFloat(P.getValue(r, "voltage"));
                e.voltage = isNaN(c) ? "" : c.toFixed(2);
                for (let d = 0; d < l.length; d++) {
                  r = l[d].split(`
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
        if ((Ki && t(e), Ui))
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
                    (gn = e.speed))
                  : ((e.brand = a.trim()), (e.speed = 0)),
                  (e = pi(e)),
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
                    (e.speed = sr(e.brand)),
                  e.speed === 0 && (e.speed = e.speedMax),
                  (e.speedMin = e.speed));
                let l = P.getValue(o, "description", ":").split(" ");
                for (let h = 0; h < l.length; h++)
                  (l[h].toLowerCase().startsWith("family") &&
                    h + 1 < l.length &&
                    l[h + 1] &&
                    (e.family = l[h + 1]),
                    l[h].toLowerCase().startsWith("model") &&
                      h + 1 < l.length &&
                      l[h + 1] &&
                      (e.model = l[h + 1]),
                    l[h].toLowerCase().startsWith("stepping") &&
                      h + 1 < l.length &&
                      l[h + 1] &&
                      (e.stepping = l[h + 1]));
                const u = P.getValue(o, "UpgradeMethod", ":");
                ds[u] && (e.socket = ds[u]);
                const c = tc(a);
                c && (e.socket = c);
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
                  (e.cache = Lo(r[0], r[1])));
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
function ic(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      nc().then((e) => {
        (t && t(e), n(e));
      });
    });
  });
}
kt.cpu = ic;
function vr() {
  let t = ze.cpus(),
    n = 999999999,
    e = 0,
    i = 0,
    s = [],
    r = [];
  if (t && t.length && t[0].hasOwnProperty("speed"))
    for (let o in t)
      r.push(t[o].speed > 100 ? (t[o].speed + 1) / 1e3 : t[o].speed / 10);
  else if (En)
    try {
      const o = Wi(
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
function rc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = vr();
      if (e.avg === 0 && gn !== 0) {
        const i = parseFloat(gn);
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
kt.cpuCurrentSpeed = rc;
function sc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        main: null,
        cores: [],
        max: null,
        socket: [],
        chipset: null,
      };
      if (En) {
        try {
          const r = Wi(
            'cat /sys/class/thermal/thermal_zone*/type  2>/dev/null; echo "-----"; cat /sys/class/thermal/thermal_zone*/temp 2>/dev/null;',
            P.execOptsLinux,
          ).toString().split(`-----
`);
          if (r.length === 2) {
            const o = r[0].split(`
`),
              a = r[1].split(`
`);
            for (let l = 0; l < o.length; l++) {
              const u = o[l].trim();
              (u.startsWith("acpi") &&
                a[l] &&
                e.socket.push(Math.round(parseInt(a[l], 10) / 100) / 10),
                u.startsWith("pch") &&
                  a[l] &&
                  (e.chipset = Math.round(parseInt(a[l], 10) / 100) / 10));
            }
          }
        } catch {
          P.noop();
        }
        const i =
          'for mon in /sys/class/hwmon/hwmon*; do for label in "$mon"/temp*_label; do if [ -f $label ]; then value=${label%_*}_input; echo $(cat "$label")___$(cat "$value"); fi; done; done;';
        try {
          Ie(i, function (s, r) {
            r = r.toString();
            const o = r.toLowerCase().indexOf("tdie");
            o !== -1 && (r = r.substring(o));
            let a = r.split(`
`),
              l = 0;
            if (
              (a.forEach((u) => {
                const c = u.split("___"),
                  f = c[0],
                  p = c.length > 1 && c[1] ? c[1] : "0";
                (p &&
                  f &&
                  f.toLowerCase() === "tctl" &&
                  (l = e.main = Math.round(parseInt(p, 10) / 100) / 10),
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
              l && e.main === null && (e.main = l),
              e.cores.length > 0)
            ) {
              e.main === null &&
                (e.main = Math.round(
                  e.cores.reduce((c, f) => c + f, 0) / e.cores.length,
                ));
              let u = Math.max.apply(Math, e.cores);
              e.max = u > e.main ? u : e.main;
            }
            if (e.main !== null) {
              (e.max === null && (e.max = e.main), t && t(e), n(e));
              return;
            }
            Ie("sensors", function (u, c) {
              if (!u) {
                let f = c.toString().split(`
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
              Mi.stat("/sys/class/thermal/thermal_zone0/temp", function (f) {
                f === null
                  ? Mi.readFile(
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
                  : Ie("/opt/vc/bin/vcgencmd measure_temp", function (p, d) {
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
        ((zi || Hi || ji) &&
          Ie("sysctl dev.cpu | grep temp", function (i, s) {
            if (!i) {
              let r = s.toString().split(`
`),
                o = 0;
              (r.forEach(function (a) {
                const l = a.split(":");
                if (l.length > 1) {
                  const u = parseFloat(l[1].replace(",", "."));
                  (u > e.max && (e.max = u), (o = o + u), e.cores.push(u));
                }
              }),
                e.cores.length &&
                  (e.main = Math.round((o / e.cores.length) * 100) / 100));
            }
            (t && t(e), n(e));
          }),
        $i)
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
      if ((Ki && (t && t(e), n(e)), Ui))
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
                .filter((a, l) => l > 0)
                .forEach(function (a) {
                  let l = (parseInt(a, 10) - 2732) / 10;
                  isNaN(l) ||
                    ((r = r + l), l > e.max && (e.max = l), e.cores.push(l));
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
kt.cpuTemperature = sc;
function wo(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = "";
      if (Ui)
        try {
          Ie(
            'reg query "HKEY_LOCAL_MACHINE\\HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0" /v FeatureSet',
            P.execOptsWin,
            function (i, s) {
              if (!i) {
                let r = s.split("0x").pop().trim(),
                  o = parseInt(r, 16).toString(2),
                  a = "0".repeat(32 - o.length) + o,
                  l = [
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
                for (let u = 0; u < l.length; u++)
                  a[u] === "1" && l[u] !== "" && (e += " " + l[u]);
                e = e.trim().toLowerCase();
              }
              (t && t(e), n(e));
            },
          );
        } catch {
          (t && t(e), n(e));
        }
      if (En)
        try {
          Ie("export LC_ALL=C; lscpu; unset LC_ALL", function (i, s) {
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
                : Mi.readFile("/proc/cpuinfo", function (r, o) {
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
      ((zi || Hi || ji) &&
        Ie(
          "export LC_ALL=C; dmidecode -t 4 2>/dev/null; unset LC_ALL",
          function (i, s) {
            let r = [];
            if (!i) {
              let o = s.toString().split("	Flags:");
              (o.length > 1
                ? o[1].split("	Version:")[0].split(`
`)
                : []
              ).forEach(function (l) {
                let u = (l.indexOf("(") ? l.split("(")[0].toLowerCase() : "")
                  .trim()
                  .replace(/\t/g, "");
                u && r.push(u);
              });
            }
            ((e = r.join(" ").trim().toLowerCase()), t && t(e), n(e));
          },
        ),
        $i &&
          Ie("sysctl machdep.cpu.features", function (i, s) {
            if (!i) {
              let r = s.toString().split(`
`);
              r.length > 0 &&
                r[0].indexOf("machdep.cpu.features:") !== -1 &&
                (e = r[0].split(":")[1].trim().toLowerCase());
            }
            (t && t(e), n(e));
          }),
        Ki && (t && t(e), n(e)));
    });
  });
}
kt.cpuFlags = wo;
function Co(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        l1d: null,
        l1i: null,
        l2: null,
        l3: null,
      };
      if (En)
        try {
          Ie("export LC_ALL=C; lscpu; unset LC_ALL", function (i, s) {
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
        ((zi || Hi || ji) &&
          Ie(
            "export LC_ALL=C; dmidecode -t 7 2>/dev/null; unset LC_ALL",
            function (i, s) {
              let r = [];
              i || ((r = s.toString().split("Cache Information")), r.shift());
              for (let o = 0; o < r.length; o++) {
                const a = r[o].split(`
`);
                let l = P.getValue(a, "Socket Designation")
                  .toLowerCase()
                  .replace(" ", "-")
                  .split("-");
                l = l.length ? l[0] : "";
                const u = P.getValue(a, "Installed Size").split(" ");
                let c = parseInt(u[0], 10);
                const f = u.length > 1 ? u[1] : "kb";
                ((c =
                  c *
                  (f === "kb"
                    ? 1024
                    : f === "mb"
                      ? 1024 * 1024
                      : f === "gb"
                        ? 1024 * 1024 * 1024
                        : 1)),
                  l &&
                    (l === "l1"
                      ? ((e.cache[l + "d"] = c / 2), (e.cache[l + "i"] = c / 2))
                      : (e.cache[l] = c)));
              }
              (t && t(e), n(e));
            },
          ),
        $i &&
          Ie(
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
        Ki && (t && t(e), n(e)),
        Ui)
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
              ((e = Lo(s[0], s[1])), t && t(e), n(e));
            }));
        } catch {
          (t && t(e), n(e));
        }
    });
  });
}
function Lo(t, n) {
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
    s.forEach(function (l) {
      const u = l.split(`\r
`),
        c = P.getValue(u, "CacheType"),
        f = P.getValue(u, "Level"),
        p = P.getValue(u, "InstalledSize");
      (f === "3" && c === "3" && (e.l1i = e.l1i + parseInt(p, 10) * 1024),
        f === "3" && c === "4" && (e.l1d = e.l1d + parseInt(p, 10) * 1024),
        f === "3" &&
          c === "5" &&
          ((r = parseInt(p, 10) / 2), (o = parseInt(p, 10) / 2)),
        f === "4" && c === "5" && (a = a + parseInt(p, 10) * 1024));
    }),
    !e.l1i && !e.l1d && ((e.l1i = r), (e.l1d = o)),
    a && (e.l2 = a),
    e
  );
}
kt.cpuCache = Co;
function oc() {
  return new Promise((t) => {
    process.nextTick(() => {
      let n = ze.loadavg().map(function (r) {
          return r / P.cores();
        }),
        e = parseFloat(Math.max.apply(Math, n).toFixed(2)),
        i = {};
      if (Date.now() - te.ms >= 200) {
        te.ms = Date.now();
        const r = ze.cpus().map(function (g) {
          return ((g.times.steal = 0), (g.times.guest = 0), g);
        });
        let o = 0,
          a = 0,
          l = 0,
          u = 0,
          c = 0,
          f = 0,
          p = 0,
          d = [];
        if (((ir = r && r.length ? r.length : 0), En))
          try {
            const g = Wi(
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
        for (let g = 0; g < ir; g++) {
          const x = r[g].times;
          ((o += x.user),
            (a += x.sys),
            (l += x.nice),
            (c += x.idle),
            (u += x.irq),
            (f += x.steal || 0),
            (p += x.guest || 0));
          let S = _ && _[g] && _[g].totalTick ? _[g].totalTick : 0,
            w = _ && _[g] && _[g].totalLoad ? _[g].totalLoad : 0,
            C = _ && _[g] && _[g].user ? _[g].user : 0,
            R = _ && _[g] && _[g].sys ? _[g].sys : 0,
            T = _ && _[g] && _[g].nice ? _[g].nice : 0,
            K = _ && _[g] && _[g].idle ? _[g].idle : 0,
            L = _ && _[g] && _[g].irq ? _[g].irq : 0,
            D = _ && _[g] && _[g].steal ? _[g].steal : 0,
            O = _ && _[g] && _[g].guest ? _[g].guest : 0;
          ((_[g] = x),
            (_[g].totalTick =
              _[g].user +
              _[g].sys +
              _[g].nice +
              _[g].irq +
              _[g].steal +
              _[g].guest +
              _[g].idle),
            (_[g].totalLoad =
              _[g].user +
              _[g].sys +
              _[g].nice +
              _[g].irq +
              _[g].steal +
              _[g].guest),
            (_[g].currentTick = _[g].totalTick - S),
            (_[g].load = _[g].totalLoad - w),
            (_[g].loadUser = _[g].user - C),
            (_[g].loadSystem = _[g].sys - R),
            (_[g].loadNice = _[g].nice - T),
            (_[g].loadIdle = _[g].idle - K),
            (_[g].loadIrq = _[g].irq - L),
            (_[g].loadSteal = _[g].steal - D),
            (_[g].loadGuest = _[g].guest - O),
            (d[g] = {}),
            (d[g].load = (_[g].load / _[g].currentTick) * 100),
            (d[g].loadUser = (_[g].loadUser / _[g].currentTick) * 100),
            (d[g].loadSystem = (_[g].loadSystem / _[g].currentTick) * 100),
            (d[g].loadNice = (_[g].loadNice / _[g].currentTick) * 100),
            (d[g].loadIdle = (_[g].loadIdle / _[g].currentTick) * 100),
            (d[g].loadIrq = (_[g].loadIrq / _[g].currentTick) * 100),
            (d[g].loadSteal = (_[g].loadSteal / _[g].currentTick) * 100),
            (d[g].loadGuest = (_[g].loadGuest / _[g].currentTick) * 100),
            (d[g].rawLoad = _[g].load),
            (d[g].rawLoadUser = _[g].loadUser),
            (d[g].rawLoadSystem = _[g].loadSystem),
            (d[g].rawLoadNice = _[g].loadNice),
            (d[g].rawLoadIdle = _[g].loadIdle),
            (d[g].rawLoadIrq = _[g].loadIrq),
            (d[g].rawLoadSteal = _[g].loadSteal),
            (d[g].rawLoadGuest = _[g].loadGuest));
        }
        let m = o + a + l + u + f + p + c,
          h = o + a + l + u + f + p,
          y = m - te.tick;
        ((i = {
          avgLoad: e,
          currentLoad: ((h - te.load) / y) * 100,
          currentLoadUser: ((o - te.user) / y) * 100,
          currentLoadSystem: ((a - te.system) / y) * 100,
          currentLoadNice: ((l - te.nice) / y) * 100,
          currentLoadIdle: ((c - te.idle) / y) * 100,
          currentLoadIrq: ((u - te.irq) / y) * 100,
          currentLoadSteal: ((f - te.steal) / y) * 100,
          currentLoadGuest: ((p - te.guest) / y) * 100,
          rawCurrentLoad: h - te.load,
          rawCurrentLoadUser: o - te.user,
          rawCurrentLoadSystem: a - te.system,
          rawCurrentLoadNice: l - te.nice,
          rawCurrentLoadIdle: c - te.idle,
          rawCurrentLoadIrq: u - te.irq,
          rawCurrentLoadSteal: f - te.steal,
          rawCurrentLoadGuest: p - te.guest,
          cpus: d,
        }),
          (te = {
            user: o,
            nice: l,
            system: a,
            idle: c,
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
        for (let o = 0; o < ir; o++)
          ((r[o] = {}),
            (r[o].load = (_[o].load / _[o].currentTick) * 100),
            (r[o].loadUser = (_[o].loadUser / _[o].currentTick) * 100),
            (r[o].loadSystem = (_[o].loadSystem / _[o].currentTick) * 100),
            (r[o].loadNice = (_[o].loadNice / _[o].currentTick) * 100),
            (r[o].loadIdle = (_[o].loadIdle / _[o].currentTick) * 100),
            (r[o].loadIrq = (_[o].loadIrq / _[o].currentTick) * 100),
            (r[o].rawLoad = _[o].load),
            (r[o].rawLoadUser = _[o].loadUser),
            (r[o].rawLoadSystem = _[o].loadSystem),
            (r[o].rawLoadNice = _[o].loadNice),
            (r[o].rawLoadIdle = _[o].loadIdle),
            (r[o].rawLoadIrq = _[o].loadIrq),
            (r[o].rawLoadSteal = _[o].loadSteal),
            (r[o].rawLoadGuest = _[o].loadGuest));
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
function ac(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      oc().then((e) => {
        (t && t(e), n(e));
      });
    });
  });
}
kt.currentLoad = ac;
function lc() {
  return new Promise((t) => {
    process.nextTick(() => {
      const n = ze.cpus();
      let e = 0,
        i = 0,
        s = 0,
        r = 0,
        o = 0,
        a = 0;
      if (n && n.length) {
        for (let u = 0, c = n.length; u < c; u++) {
          const f = n[u].times;
          ((e += f.user),
            (i += f.sys),
            (s += f.nice),
            (r += f.irq),
            (o += f.idle));
        }
        let l = o + r + s + i + e;
        a = ((l - o) / l) * 100;
      }
      t(a);
    });
  });
}
function cc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      lc().then((e) => {
        (t && t(e), n(e));
      });
    });
  });
}
kt.fullLoad = cc;
var Rr = {};
const Xe = Ae,
  jn = oe.exec,
  vi = oe.execSync,
  A = V,
  uc = be;
let St = process.platform;
const Io = St === "linux" || St === "android",
  _o = St === "darwin",
  vo = St === "win32",
  Oo = St === "freebsd",
  Po = St === "openbsd",
  Eo = St === "netbsd",
  Mo = St === "sunos",
  hs = {
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
function pc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        total: Xe.totalmem(),
        free: Xe.freemem(),
        used: Xe.totalmem() - Xe.freemem(),
        active: Xe.totalmem() - Xe.freemem(),
        // temporarily (fallback)
        available: Xe.freemem(),
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
      if (Io)
        try {
          uc.readFile("/proc/meminfo", function (i, s) {
            if (!i) {
              const r = s.toString().split(`
`);
              ((e.total = parseInt(A.getValue(r, "memtotal"), 10)),
                (e.total = e.total ? e.total * 1024 : Xe.totalmem()),
                (e.free = parseInt(A.getValue(r, "memfree"), 10)),
                (e.free = e.free ? e.free * 1024 : Xe.freemem()),
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
      if (Oo || Po || Eo)
        try {
          jn(
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
                  l =
                    parseInt(A.getValue(r, "vm.stats.vm.v_cache_count"), 10) *
                    o;
                ((e.total = parseInt(A.getValue(r, "hw.realmem"), 10)),
                  isNaN(e.total) &&
                    (e.total = parseInt(A.getValue(r, "hw.physmem"), 10)),
                  (e.free =
                    parseInt(A.getValue(r, "vm.stats.vm.v_free_count"), 10) *
                    o),
                  (e.buffcache = a + l),
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
      if ((Mo && (t && t(e), n(e)), _o)) {
        let i = 4096;
        try {
          i = A.toInt(vi("sysctl -n vm.pagesize").toString()) || i;
        } catch {
          A.noop();
        }
        try {
          jn(
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
              jn("sysctl -n vm.swapusage 2>/dev/null", function (o, a) {
                if (!o) {
                  let l = a.toString().split(`
`);
                  l.length > 0 &&
                    l[0]
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
      if (vo) {
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
                .filter((l) => l.trim() !== "")
                .filter((l, u) => u > 0)
                .forEach(function (l) {
                  l !== "" &&
                    ((l = l.trim().split(/\s\s+/)),
                    (i = i + (parseInt(l[0], 10) || 0)),
                    (s = s + (parseInt(l[1], 10) || 0)));
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
Rr.mem = pc;
function fc(t) {
  function n(e) {
    const i = e.replace("0x", "").toUpperCase();
    return i.length >= 4 && {}.hasOwnProperty.call(hs, i) ? hs[i] : e;
  }
  return new Promise((e) => {
    process.nextTick(() => {
      let i = [];
      if (
        ((Io || Oo || Po || Eo) &&
          jn(
            'export LC_ALL=C; dmidecode -t memory 2>/dev/null | grep -iE "Size:|Type|Speed|Manufacturer|Form Factor|Locator|Memory Device|Serial Number|Voltage|Part Number"; unset LC_ALL',
            function (s, r) {
              if (!s) {
                let o = r.toString().split("Memory Device");
                (o.shift(),
                  o.forEach(function (a) {
                    let l = a.split(`
`);
                    const u = A.getValue(l, "Size"),
                      c =
                        u.indexOf("GB") >= 0
                          ? parseInt(u, 10) * 1024 * 1024 * 1024
                          : parseInt(u, 10) * 1024 * 1024;
                    let f = A.getValue(l, "Bank Locator");
                    if (
                      (f.toLowerCase().indexOf("bad") >= 0 && (f = ""),
                      parseInt(A.getValue(l, "Size"), 10) > 0)
                    ) {
                      const p = A.toInt(A.getValue(l, "Total Width")),
                        d = A.toInt(A.getValue(l, "Data Width"));
                      i.push({
                        size: c,
                        bank: f,
                        type: A.getValue(l, "Type:"),
                        ecc: d && p ? p > d : !1,
                        clockSpeed: A.getValue(l, "Configured Clock Speed:")
                          ? parseInt(
                              A.getValue(l, "Configured Clock Speed:"),
                              10,
                            )
                          : A.getValue(l, "Speed:")
                            ? parseInt(A.getValue(l, "Speed:"), 10)
                            : null,
                        formFactor: A.getValue(l, "Form Factor:"),
                        manufacturer: n(A.getValue(l, "Manufacturer:")),
                        partNum: A.getValue(l, "Part Number:"),
                        serialNum: A.getValue(l, "Serial Number:"),
                        voltageConfigured:
                          parseFloat(A.getValue(l, "Configured Voltage:")) ||
                          null,
                        voltageMin:
                          parseFloat(A.getValue(l, "Minimum Voltage:")) || null,
                        voltageMax:
                          parseFloat(A.getValue(l, "Maximum Voltage:")) || null,
                      });
                    } else
                      i.push({
                        size: 0,
                        bank: f,
                        type: "Empty",
                        ecc: null,
                        clockSpeed: 0,
                        formFactor: A.getValue(l, "Form Factor:"),
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
                  size: Xe.totalmem(),
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
                  let o = vi("cat /proc/cpuinfo 2>/dev/null", A.execOptsLinux),
                    a = o.toString().split(`
`),
                    l = A.getValue(a, "revision", ":", !0).toLowerCase();
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
                        l && l[2] && l[2] === "3" ? "LPDDR4" : i[0].type),
                      (i[0].type =
                        l && l[2] && l[2] === "4" ? "LPDDR4X" : i[0].type),
                      (i[0].ecc = !1),
                      (i[0].clockSpeed = (l && l[2] && u[l[2]]) || 400),
                      (i[0].clockSpeed =
                        l && l[4] && l[4] === "d" ? 500 : i[0].clockSpeed),
                      (i[0].formFactor = "SoC"),
                      (o = vi(
                        "vcgencmd get_config sdram_freq 2>/dev/null",
                        A.execOptsLinux,
                      )),
                      (a = o.toString().split(`
`)));
                    let c =
                      parseInt(A.getValue(a, "sdram_freq", "=", !0), 10) || 0;
                    (c && (i[0].clockSpeed = c),
                      (o = vi(
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
        _o &&
          jn("system_profiler SPMemoryDataType", function (s, r) {
            if (!s) {
              const o = r.toString().split(`
`),
                a = A.getValue(o, "ecc", ":", !0).toLowerCase();
              let l = r.toString().split("        BANK "),
                u = !0;
              (l.length === 1 &&
                ((l = r.toString().split("        DIMM")), (u = !1)),
                l.shift(),
                l.forEach(function (c) {
                  let f = c.split(`
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
                l = A.getValue(o, "      Type:"),
                u = A.getValue(o, "      Manufacturer:");
              a &&
                l &&
                i.push({
                  size: a * 1024 * 1024 * 1024,
                  bank: "0",
                  type: l,
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
        Mo && (t && t(i), e(i)),
        vo)
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
              let l = o.toString().split(/\n\s*\n/);
              (l.shift(),
                l.forEach(function (u) {
                  let c = u.split(`\r
`);
                  const f = A.toInt(A.getValue(c, "DataWidth", ":")),
                    p = A.toInt(A.getValue(c, "TotalWidth", ":")),
                    d = parseInt(A.getValue(c, "Capacity", ":"), 10) || 0,
                    m = A.getValue(c, "Tag", ":"),
                    h = A.splitByNumber(m);
                  d &&
                    i.push({
                      size: d,
                      bank:
                        A.getValue(c, "BankLabel", ":") +
                        (h[1] ? "/" + h[1] : ""),
                      // BankLabel
                      type: s[
                        parseInt(A.getValue(c, "MemoryType", ":"), 10) ||
                          parseInt(A.getValue(c, "SMBIOSMemoryType", ":"), 10)
                      ],
                      ecc: f && p ? p > f : !1,
                      clockSpeed:
                        parseInt(
                          A.getValue(c, "ConfiguredClockSpeed", ":"),
                          10,
                        ) ||
                        parseInt(A.getValue(c, "Speed", ":"), 10) ||
                        0,
                      formFactor:
                        r[parseInt(A.getValue(c, "FormFactor", ":"), 10) || 0],
                      manufacturer: n(A.getValue(c, "Manufacturer", ":")),
                      partNum: A.getValue(c, "PartNumber", ":"),
                      serialNum: A.getValue(c, "SerialNumber", ":"),
                      voltageConfigured:
                        (parseInt(
                          A.getValue(c, "ConfiguredVoltage", ":"),
                          10,
                        ) || 0) / 1e3,
                      voltageMin:
                        (parseInt(A.getValue(c, "MinVoltage", ":"), 10) || 0) /
                        1e3,
                      voltageMax:
                        (parseInt(A.getValue(c, "MaxVoltage", ":"), 10) || 0) /
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
Rr.memLayout = fc;
const gs = oe.exec,
  ln = be,
  Y = V;
let wt = process.platform;
const dc = wt === "linux" || wt === "android",
  mc = wt === "darwin",
  hc = wt === "win32",
  gc = wt === "freebsd",
  yc = wt === "openbsd",
  xc = wt === "netbsd",
  Sc = wt === "sunos";
function wc(t, n, e) {
  const i = {};
  let s = Y.getValue(t, "BatteryStatus", ":").trim();
  if (s >= 0) {
    const r = s ? parseInt(s) : 0;
    ((i.status = r),
      (i.hasBattery = !0),
      (i.maxCapacity =
        e || parseInt(Y.getValue(t, "DesignCapacity", ":") || 0)),
      (i.designedCapacity = parseInt(
        Y.getValue(t, "DesignCapacity", ":") || n,
      )),
      (i.voltage = parseInt(Y.getValue(t, "DesignVoltage", ":") || 0) / 1e3),
      (i.capacityUnit = "mWh"),
      (i.percent = parseInt(
        Y.getValue(t, "EstimatedChargeRemaining", ":") || 0,
      )),
      (i.currentCapacity = parseInt((i.maxCapacity * i.percent) / 100)),
      (i.isCharging =
        (r >= 6 && r <= 9) ||
        r === 11 ||
        (r !== 3 && r !== 1 && i.percent < 100)),
      (i.acConnected = i.isCharging || r === 2),
      (i.model = Y.getValue(t, "DeviceID", ":")));
  } else i.status = -1;
  return i;
}
var Cc = function (t) {
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
        if (dc) {
          let i = "";
          ln.existsSync("/sys/class/power_supply/BAT1/uevent")
            ? (i = "/sys/class/power_supply/BAT1/")
            : ln.existsSync("/sys/class/power_supply/BAT0/uevent") &&
              (i = "/sys/class/power_supply/BAT0/");
          let s = !1,
            r = "";
          (ln.existsSync("/sys/class/power_supply/AC/online")
            ? (r = "/sys/class/power_supply/AC/online")
            : ln.existsSync("/sys/class/power_supply/AC0/online") &&
              (r = "/sys/class/power_supply/AC0/online"),
            r && (s = ln.readFileSync(r).toString().trim() === "1"),
            i
              ? ln.readFile(i + "uevent", function (o, a) {
                  if (o) (t && t(e), n(e));
                  else {
                    let l = a.toString().split(`
`);
                    ((e.isCharging =
                      Y.getValue(
                        l,
                        "POWER_SUPPLY_STATUS",
                        "=",
                      ).toLowerCase() === "charging"),
                      (e.acConnected = s || e.isCharging),
                      (e.voltage =
                        parseInt(
                          "0" + Y.getValue(l, "POWER_SUPPLY_VOLTAGE_NOW", "="),
                          10,
                        ) / 1e6),
                      (e.capacityUnit = e.voltage ? "mWh" : "mAh"),
                      (e.cycleCount = parseInt(
                        "0" + Y.getValue(l, "POWER_SUPPLY_CYCLE_COUNT", "="),
                        10,
                      )),
                      (e.maxCapacity = Math.round(
                        (parseInt(
                          "0" +
                            Y.getValue(
                              l,
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
                          Y.getValue(l, "POWER_SUPPLY_VOLTAGE_MIN_DESIGN", "="),
                        10,
                      ) / 1e6;
                    ((e.designedCapacity = Math.round(
                      (parseInt(
                        "0" +
                          Y.getValue(
                            l,
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
                          "0" + Y.getValue(l, "POWER_SUPPLY_CHARGE_NOW", "="),
                          10,
                        ) /
                          1e3) *
                          (e.voltage || 1),
                      )),
                      e.maxCapacity ||
                        ((e.maxCapacity =
                          parseInt(
                            "0" +
                              Y.getValue(
                                l,
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
                              Y.getValue(
                                l,
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
                            "0" + Y.getValue(l, "POWER_SUPPLY_ENERGY_NOW", "="),
                            10,
                          ) / 1e3)));
                    const c = Y.getValue(l, "POWER_SUPPLY_CAPACITY", "="),
                      f = parseInt(
                        "0" + Y.getValue(l, "POWER_SUPPLY_ENERGY_NOW", "="),
                        10,
                      ),
                      p = parseInt(
                        "0" + Y.getValue(l, "POWER_SUPPLY_POWER_NOW", "="),
                        10,
                      ),
                      d = parseInt(
                        "0" + Y.getValue(l, "POWER_SUPPLY_CURRENT_NOW", "="),
                        10,
                      ),
                      m = parseInt(
                        "0" + Y.getValue(l, "POWER_SUPPLY_CHARGE_NOW", "="),
                        10,
                      );
                    ((e.percent = parseInt("0" + c, 10)),
                      e.maxCapacity &&
                        e.currentCapacity &&
                        ((e.hasBattery = !0),
                        c ||
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
                      (e.type = Y.getValue(l, "POWER_SUPPLY_TECHNOLOGY", "=")),
                      (e.model = Y.getValue(l, "POWER_SUPPLY_MODEL_NAME", "=")),
                      (e.manufacturer = Y.getValue(
                        l,
                        "POWER_SUPPLY_MANUFACTURER",
                        "=",
                      )),
                      (e.serial = Y.getValue(
                        l,
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
          ((gc || yc || xc) &&
            gs("sysctl -i hw.acpi.battery hw.acpi.acline", function (i, s) {
              let r = s.toString().split(`
`);
              const o = parseInt(
                  "0" + Y.getValue(r, "hw.acpi.battery.units"),
                  10,
                ),
                a = parseInt("0" + Y.getValue(r, "hw.acpi.battery.life"), 10);
              ((e.hasBattery = o > 0),
                (e.cycleCount = null),
                (e.isCharging = Y.getValue(r, "hw.acpi.acline") !== "1"),
                (e.acConnected = e.isCharging),
                (e.maxCapacity = null),
                (e.currentCapacity = null),
                (e.capacityUnit = "unknown"),
                (e.percent = o ? a : null),
                t && t(e),
                n(e));
            }),
          mc &&
            gs(
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
                    "0" + Y.getValue(r, "cyclecount", "="),
                    10,
                  )),
                    (e.voltage =
                      parseInt("0" + Y.getValue(r, "voltage", "="), 10) / 1e3),
                    (e.capacityUnit = e.voltage ? "mWh" : "mAh"),
                    (e.maxCapacity = Math.round(
                      parseInt(
                        "0" + Y.getValue(r, "applerawmaxcapacity", "="),
                        10,
                      ) * (e.voltage || 1),
                    )),
                    (e.currentCapacity = Math.round(
                      parseInt(
                        "0" + Y.getValue(r, "applerawcurrentcapacity", "="),
                        10,
                      ) * (e.voltage || 1),
                    )),
                    (e.designedCapacity = Math.round(
                      parseInt("0" + Y.getValue(r, "DesignCapacity", "="), 10) *
                        (e.voltage || 1),
                    )),
                    (e.manufacturer = "Apple"),
                    (e.serial =
                      Y.getValue(r, "BatterySerialNumber", "=") ||
                      Y.getValue(r, "Serial", "=")),
                    (e.model = Y.getValue(r, "DeviceName", "=")));
                  let o = null,
                    l = Y.getValue(r, "internal", "Battery").split(";");
                  if (l && l[0]) {
                    let u = l[0].split("	");
                    u &&
                      u[1] &&
                      (o = parseFloat(u[1].trim().replace(/%/g, "")));
                  }
                  (l && l[1]
                    ? ((e.isCharging = l[1].trim() === "charging"),
                      (e.acConnected = l[1].trim() !== "discharging"))
                    : ((e.isCharging =
                        Y.getValue(r, "ischarging", "=").toLowerCase() ===
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
                          "0" + Y.getValue(r, "TimeRemaining", "="),
                          10,
                        ))));
                }
                (t && t(e), n(e));
              },
            ),
          Sc && (t && t(e), n(e)),
          hc)
        )
          try {
            const i = [];
            (i.push(
              Y.powerShell(
                "Get-CimInstance Win32_Battery | select BatteryStatus, DesignCapacity, DesignVoltage, EstimatedChargeRemaining, DeviceID | fl",
              ),
            ),
              i.push(
                Y.powerShell(
                  "(Get-WmiObject -Class BatteryStaticData -Namespace ROOT/WMI).DesignedCapacity",
                ),
              ),
              i.push(
                Y.powerShell(
                  "(Get-CimInstance -Class BatteryFullChargedCapacity -Namespace ROOT/WMI).FullChargedCapacity",
                ),
              ),
              Y.promiseAll(i).then((s) => {
                if (s) {
                  let r = s.results[0].split(/\n\s*\n/),
                    o = [];
                  const a = (c) => /\S/.test(c);
                  for (let c = 0; c < r.length; c++)
                    (a(r[c]) && (!o.length || !a(r[c - 1])) && o.push([]),
                      a(r[c]) && o[o.length - 1].push(r[c]));
                  let l = s.results[1]
                      .split(
                        `\r
`,
                      )
                      .filter((c) => c),
                    u = s.results[2]
                      .split(
                        `\r
`,
                      )
                      .filter((c) => c);
                  if (o.length) {
                    let c = !1,
                      f = [];
                    for (let p = 0; p < o.length; p++) {
                      let d = o[p][0].split(`\r
`);
                      const m =
                          l && l.length >= p + 1 && l[p] ? Y.toInt(l[p]) : 0,
                        h = u && u.length >= p + 1 && u[p] ? Y.toInt(u[p]) : 0,
                        y = wc(d, m, h);
                      !c && y.status > 0 && y.status !== 10
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
                          (c = !0))
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
                    (!c && f.length && ((e = f[0]), f.shift()),
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
  Ao = {};
const fi = be,
  cn = oe.exec,
  or = oe.execSync,
  k = V;
let Ct = process.platform,
  Vn = "";
const di = Ct === "linux" || Ct === "android",
  Lc = Ct === "darwin",
  ys = Ct === "win32",
  Ic = Ct === "freebsd",
  _c = Ct === "openbsd",
  vc = Ct === "netbsd",
  Oc = Ct === "sunos";
let Nn = 0,
  kn = 0,
  mi = 0,
  hi = 0;
const xs = {
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
function Ss(t) {
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
function Pc(t) {
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
function Ec(t) {
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
function Mc(t) {
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
function Ac(t) {
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
          let x = Mc(m.spdisplays_metal || m.spdisplays_metalfamily || "");
          (d.controllers.push({
            vendor: Ss(m.spdisplays_vendor || "") || m.spdisplays_vendor || "",
            model: m.sppci_model || "",
            bus: h,
            vramDynamic: h === "Built-In",
            vram: y || g || null,
            deviceId: m["spdisplays_device-id"] || "",
            vendorId:
              m["spdisplays_vendor-id"] ||
              Ec((m.spdisplays_vendor || "") + (m.sppci_model || "")),
            external: m.sppci_device_type === "spdisplays_egpu",
            cores: m.sppci_cores || null,
            metalVersion: x,
          }),
            m.spdisplays_ndrvs &&
              m.spdisplays_ndrvs.length &&
              m.spdisplays_ndrvs.forEach(function (S) {
                const w = S.spdisplays_connection_type || "",
                  C = (S._spdisplays_resolution || "").split("@"),
                  R = C[0].split("x"),
                  T = (S._spdisplays_pixels || "").split("x"),
                  K = S.spdisplays_depth || "",
                  L =
                    S["_spdisplays_display-serial-number"] ||
                    S["_spdisplays_display-serial-number2"] ||
                    null;
                d.displays.push({
                  vendor:
                    Pc(S["_spdisplays_display-vendor-id"] || "") ||
                    Ss(S._name || ""),
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
                  currentResX: R.length > 1 ? parseInt(R[0], 10) : null,
                  currentResY: R.length > 1 ? parseInt(R[1], 10) : null,
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
      y = or(
        'export LC_ALL=C; dmidecode -t 9 2>/dev/null; unset LC_ALL | grep "Bus Address: "',
        k.execOptsLinux,
      ).toString().split(`
`);
      for (let x = 0; x < y.length; x++)
        y[x] = y[x].replace("Bus Address:", "").replace("0000:", "").trim();
      y = y.filter(function (x) {
        return x != null && x;
      });
    } catch {
      k.noop();
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
              R = x.toLowerCase().indexOf("3d controller");
            if (C !== -1 || R !== -1) {
              (R !== -1 && C === -1 && (C = R),
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
              R = (w >> 3) & 255,
              T = w & 7;
            x = `${C.toString().padStart(2, "0")}:${R.toString().padStart(2, "0")}.${T}`;
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
    if (Vn) return Vn;
    if (ys)
      try {
        const p = k.WINDIR + "\\System32\\DriverStore\\FileRepository",
          m = fi
            .readdirSync(p)
            .filter((h) =>
              fi.readdirSync([p, h].join("/")).includes("nvidia-smi.exe"),
            )
            .reduce((h, y) => {
              const g = fi.statSync([p, h, "nvidia-smi.exe"].join("/")),
                x = fi.statSync([p, y, "nvidia-smi.exe"].join("/"));
              return g.ctimeMs > x.ctimeMs ? h : y;
            });
        m && (Vn = [p, m, "nvidia-smi.exe"].join("/"));
      } catch {
        k.noop();
      }
    else di && (Vn = "nvidia-smi");
    return Vn;
  }
  function r(p) {
    const d = s();
    if (((p = p || k.execOptsWin), d)) {
      const h =
        d +
        " " +
        "--query-gpu=driver_version,pci.sub_device_id,name,pci.bus_id,fan.speed,memory.total,memory.used,memory.free,utilization.gpu,utilization.memory,temperature.gpu,temperature.memory,power.draw,power.limit,clocks.gr,clocks.mem --format=csv,noheader,nounits" +
        (di ? "  2>/dev/null" : "");
      di && (p.stdio = ["pipe", "pipe", "ignore"]);
      try {
        const y = k.sanitizeShellString(h);
        return or(y, p).toString();
      } catch {
        k.noop();
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
  function l(p) {
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
        k.noop();
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
            let C = l(x);
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
            const R = C[0].trim().split("x");
            ((h.currentResX = k.toInt(R[0])), (h.currentResY = k.toInt(R[1])));
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
            (h.currentRefreshRate = k.toInt(C[1])),
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
        (Lc &&
          cn(
            "system_profiler -xml -detailLevel full SPDisplaysDataType",
            function (h, y) {
              if (!h) {
                try {
                  const g = y.toString();
                  d = n(k.plistParser(g)[0]._items);
                } catch {
                  k.noop();
                }
                try {
                  y = or(
                    'defaults read /Library/Preferences/com.apple.windowserver.plist 2>/dev/null;defaults read /Library/Preferences/com.apple.windowserver.displays.plist 2>/dev/null; echo ""',
                    { maxBuffer: 1024 * 2e4 },
                  );
                  const g = (y || "").toString(),
                    x = k.plistReader(g);
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
                  k.noop();
                }
              }
              (t && t(d), p(d));
            },
          ),
        di &&
          (k.isRaspberry() &&
            cn(
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
                      model: k.getValue(x, "device_name", "="),
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
                    model: k.getRpiGpu(),
                    bus: "",
                    vram: k.getValue(x, "gpu", "=").replace("M", ""),
                    vramDynamic: !0,
                  });
              },
            ),
          cn("lspci -vvv  2>/dev/null", function (h, y) {
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
            cn("clinfo --raw", function (x, S) {
              if (!x) {
                let C = S.toString().split(`
`);
                d.controllers = i(d.controllers, C);
              }
              cn(
                "xdpyinfo 2>/dev/null | grep 'depth of root window' | awk '{ print $5 }'",
                function (C, R) {
                  let T = 0;
                  if (!C) {
                    let L = R.toString().split(`
`);
                    T = parseInt(L[0]) || 0;
                  }
                  cn("xrandr --verbose 2>/dev/null", function (L, D) {
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
        (Ic || _c || vc) && (t && t(null), p(null)),
        Oc && (t && t(null), p(null)),
        ys)
      )
        try {
          const m = [];
          (m.push(k.powerShell("Get-CimInstance win32_VideoController | fl *")),
            m.push(
              k.powerShell(
                'gp "HKLM:\\SYSTEM\\ControlSet001\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\*" -ErrorAction SilentlyContinue | where MatchingDeviceId $null -NE | select MatchingDeviceId,HardwareInformation.qwMemorySize | fl',
              ),
            ),
            m.push(k.powerShell("Get-CimInstance win32_desktopmonitor | fl *")),
            m.push(
              k.powerShell(
                "Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorBasicDisplayParams | fl",
              ),
            ),
            m.push(
              k.powerShell(
                "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Screen]::AllScreens",
              ),
            ),
            m.push(
              k.powerShell(
                "Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorConnectionParams | fl",
              ),
            ),
            m.push(
              k.powerShell(
                'gwmi WmiMonitorID -Namespace root\\wmi | ForEach-Object {(($_.ManufacturerName -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.ProductCodeID -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.UserFriendlyName -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.SerialNumberID -notmatch 0 | foreach {[char]$_}) -join "") + "|" + $_.InstanceName}',
              ),
            ));
          const h = o();
          Promise.all(m)
            .then((y) => {
              let g = y[0].replace(/\r/g, "").split(/\n\s*\n/),
                x = y[1].replace(/\r/g, "").split(/\n\s*\n/);
              ((d.controllers = c(g, x)),
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
              let R = y[5].replace(/\r/g, "").split(/\n\s*\n/);
              R.shift();
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
                (d.displays = f(C, w, S, R, K)),
                d.displays.length === 1 &&
                  (Nn &&
                    ((d.displays[0].resolutionX = Nn),
                    d.displays[0].currentResX ||
                      (d.displays[0].currentResX = Nn)),
                  kn &&
                    ((d.displays[0].resolutionY = kn),
                    d.displays[0].currentResY === 0 &&
                      (d.displays[0].currentResY = kn)),
                  mi && (d.displays[0].pixelDepth = mi)),
                (d.displays = d.displays.map(
                  (L) => (
                    hi && !L.currentRefreshRate && (L.currentRefreshRate = hi),
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
  function c(p, d) {
    const m = {};
    for (const y in d)
      if ({}.hasOwnProperty.call(d, y) && d[y].trim() !== "") {
        const g = d[y].trim().split(`
`),
          x = k
            .getValue(g, "MatchingDeviceId")
            .match(
              /PCI\\(VEN_[0-9A-F]{4})&(DEV_[0-9A-F]{4})(?:&(SUBSYS_[0-9A-F]{8}))?(?:&(REV_[0-9A-F]{2}))?/i,
            );
        if (x) {
          const S = parseInt(k.getValue(g, "HardwareInformation.qwMemorySize"));
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
          x = k
            .getValue(g, "PNPDeviceID", ":")
            .match(
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
          vendor: k.getValue(g, "AdapterCompatibility", ":"),
          model: k.getValue(g, "name", ":"),
          bus: k.getValue(g, "PNPDeviceID", ":").startsWith("PCI") ? "PCI" : "",
          vram: (w ?? k.toInt(k.getValue(g, "AdapterRAM", ":"))) / 1024 / 1024,
          vramDynamic: k.getValue(g, "VideoMemoryType", ":") === "2",
          subDeviceId: S,
        }),
          (Nn =
            k.toInt(k.getValue(g, "CurrentHorizontalResolution", ":")) || Nn),
          (kn = k.toInt(k.getValue(g, "CurrentVerticalResolution", ":")) || kn),
          (hi = k.toInt(k.getValue(g, "CurrentRefreshRate", ":")) || hi),
          (mi = k.toInt(k.getValue(g, "CurrentBitsPerPixel", ":")) || mi));
      }
    return h;
  }
  function f(p, d, m, h, y) {
    let g = [],
      x = "",
      S = "",
      w = "",
      C = 0,
      R = 0;
    if (m && m.length) {
      let T = m[0].split(`
`);
      ((x = k.getValue(T, "MonitorManufacturer", ":")),
        (S = k.getValue(T, "Name", ":")),
        (w = k
          .getValue(T, "PNPDeviceID", ":")
          .replace(/&amp;/g, "&")
          .toLowerCase()),
        (C = k.toInt(k.getValue(T, "ScreenWidth", ":"))),
        (R = k.toInt(k.getValue(T, "ScreenHeight", ":"))));
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
        const O = k.getValue(K, "BitsPerPixel"),
          X = k
            .getValue(K, "Bounds")
            .replace("{", "")
            .replace("}", "")
            .replace(/=/g, ":")
            .split(","),
          Q = k.getValue(K, "Primary"),
          ee = k.getValue(L, "MaxHorizontalImageSize"),
          F = k.getValue(L, "MaxVerticalImageSize"),
          q = k.getValue(L, "InstanceName").toLowerCase(),
          N = k.getValue(D, "VideoOutputTechnology"),
          H = k.getValue(K, "DeviceName");
        let b = "",
          $ = "";
        (y.forEach((B) => {
          B.instanceId.toLowerCase().startsWith(q) &&
            x.startsWith("(") &&
            S.startsWith("PnP") &&
            ((b = B.vendor), ($ = B.model));
        }),
          g.push({
            vendor: q.startsWith(w) && b === "" ? x : b,
            model: q.startsWith(w) && $ === "" ? S : $,
            deviceName: H,
            main: Q.toLowerCase() === "true",
            builtin: N === "2147483648",
            connection: N && xs[N] ? xs[N] : "",
            resolutionX: k.toInt(k.getValue(X, "Width", ":")),
            resolutionY: k.toInt(k.getValue(X, "Height", ":")),
            sizeX: ee ? parseInt(ee, 10) : null,
            sizeY: F ? parseInt(F, 10) : null,
            pixelDepth: O,
            currentResX: k.toInt(k.getValue(X, "Width", ":")),
            currentResY: k.toInt(k.getValue(X, "Height", ":")),
            positionX: k.toInt(k.getValue(X, "X", ":")),
            positionY: k.toInt(k.getValue(X, "Y", ":")),
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
          resolutionY: R,
          pixelDepth: null,
          currentResX: C,
          currentResY: R,
          positionX: 0,
          positionY: 0,
        }),
      g
    );
  }
}
Ao.graphics = Ac;
var nn = {};
const v = V,
  ws = be,
  Le = oe.exec,
  ft = oe.execSync,
  Tc = v.promisifySave(oe.exec);
let Lt = process.platform;
const Be = Lt === "linux" || Lt === "android",
  gt = Lt === "darwin",
  Mn = Lt === "win32",
  Fe = Lt === "freebsd",
  Re = Lt === "openbsd",
  Ge = Lt === "netbsd",
  An = Lt === "sunos";
let re = {},
  z = {};
function Dc(t, n) {
  v.isFunction(t) && ((n = t), (t = ""));
  let e = [],
    i = [];
  function s(l) {
    if (!l.startsWith("/")) return "NFS";
    const u = l.split("/"),
      c = u[u.length - 1],
      f = e.filter((p) => p.indexOf(c) >= 0);
    return f.length === 1 && f[0].indexOf("APFS") >= 0 ? "APFS" : "HFS";
  }
  function r(l) {
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
    let c = !1;
    return (
      u.forEach((f) => {
        l.toLowerCase().indexOf(f) >= 0 && (c = !0);
      }),
      c
    );
  }
  function o(l) {
    let u = l.toString().split(`
`);
    if ((u.shift(), l.toString().toLowerCase().indexOf("filesystem"))) {
      let c = 0;
      for (let f = 0; f < u.length; f++)
        u[f] && u[f].toLowerCase().startsWith("filesystem") && (c = f);
      for (let f = 0; f < c; f++) u.shift();
    }
    return u;
  }
  function a(l) {
    let u = [];
    return (
      l.forEach(function (c) {
        if (
          c !== "" &&
          ((c = c.replace(/ +/g, " ").split(" ")),
          c &&
            (c[0].startsWith("/") ||
              (c[6] && c[6] === "/") ||
              c[0].indexOf("/") > 0 ||
              c[0].indexOf(":") === 1 ||
              (!gt && !r(c[1]))))
        ) {
          const f = c[0],
            p = Be || Fe || Re || Ge ? c[1] : s(c[0]),
            d = parseInt(Be || Fe || Re || Ge ? c[2] : c[1]) * 1024,
            m = parseInt(Be || Fe || Re || Ge ? c[3] : c[2]) * 1024,
            h = parseInt(Be || Fe || Re || Ge ? c[4] : c[3]) * 1024,
            y = parseFloat((100 * (m / (m + h))).toFixed(2));
          let g = i && Object.keys(i).length > 0 ? i[f] || !1 : null;
          c.splice(0, Be || Fe || Re || Ge ? 6 : 5);
          const x = c.join(" ");
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
  return new Promise((l) => {
    process.nextTick(() => {
      let u = [];
      if (Be || Fe || Re || Ge || gt) {
        let c = "";
        if (((e = []), (i = {}), gt)) {
          c = "df -kP";
          try {
            ((e = ft("diskutil list")
              .toString()
              .split(
                `
`,
              )
              .filter((f) => !f.startsWith("/") && f.indexOf(":") > 0)),
              ft("mount")
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
            v.noop();
          }
        }
        if (Be)
          try {
            ((c = "export LC_ALL=C; df -lkPTx squashfs; unset LC_ALL"),
              ft("cat /proc/mounts 2>/dev/null", v.execOptsLinux)
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
            v.noop();
          }
        if (Fe || Re || Ge)
          try {
            ((c = "df -lkPT"),
              ft("mount")
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
            v.noop();
          }
        Le(c, { maxBuffer: 1024 * 1024 }, function (f, p) {
          let d = o(p);
          ((u = a(d)),
            t &&
              (u = u.filter(
                (m) =>
                  m.fs.toLowerCase().indexOf(t.toLowerCase()) >= 0 ||
                  m.mount.toLowerCase().indexOf(t.toLowerCase()) >= 0,
              )),
            (!f || u.length) && p.toString().trim() !== ""
              ? (n && n(u), l(u))
              : Le("df -kPT", { maxBuffer: 1024 * 1024 }, function (m, h) {
                  if (!m) {
                    let y = o(h);
                    u = a(y);
                  }
                  (n && n(u), l(u));
                }));
        });
      }
      if ((An && (n && n(u), l(u)), Mn))
        try {
          const c = `Get-WmiObject Win32_logicaldisk | select Access,Caption,FileSystem,FreeSpace,Size ${t ? "| where -property Caption -eq " + t : ""} | fl`;
          v.powerShell(c).then((f, p) => {
            (p ||
              f
                .toString()
                .split(/\n\s*\n/)
                .forEach(function (m) {
                  let h = m.split(`\r
`);
                  const y = v.toInt(v.getValue(h, "size", ":")),
                    g = v.toInt(v.getValue(h, "freespace", ":")),
                    x = v.getValue(h, "caption", ":"),
                    S = v.getValue(h, "access", ":"),
                    w = S ? v.toInt(S) !== 1 : null;
                  y &&
                    u.push({
                      fs: x,
                      type: v.getValue(h, "filesystem", ":"),
                      size: y,
                      used: y - g,
                      available: g,
                      use: parseFloat(((100 * (y - g)) / y).toFixed(2)),
                      mount: x,
                      rw: w,
                    });
                }),
              n && n(u),
              l(u));
          });
        } catch {
          (n && n(u), l(u));
        }
    });
  });
}
nn.fsSize = Dc;
function bc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      const e = {
        max: null,
        allocated: null,
        available: null,
      };
      ((Fe || Re || Ge || gt) &&
        Le(
          "sysctl -i kern.maxfiles kern.num_files kern.open_files",
          { maxBuffer: 1024 * 1024 },
          function (s, r) {
            if (!s) {
              let o = r.toString().split(`
`);
              ((e.max = parseInt(v.getValue(o, "kern.maxfiles", ":"), 10)),
                (e.allocated =
                  parseInt(v.getValue(o, "kern.num_files", ":"), 10) ||
                  parseInt(v.getValue(o, "kern.open_files", ":"), 10)),
                (e.available = e.max - e.allocated));
            }
            (t && t(e), n(e));
          },
        ),
        Be &&
          ws.readFile("/proc/sys/fs/file-nr", function (i, s) {
            if (i)
              ws.readFile("/proc/sys/fs/file-max", function (r, o) {
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
        An && (t && t(null), n(null)),
        Mn && (t && t(null), n(null)));
    });
  });
}
nn.fsOpenFiles = bc;
function Vc(t) {
  return parseInt(t.substr(t.indexOf(" (") + 2, t.indexOf(" Bytes)") - 10));
}
function Nc(t) {
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
            s[0] === "DISKSIZE" && (n[e].size = Vc(s[1])),
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
function Or(t) {
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
          v.noop();
        }
      }),
    (n = v.unique(n)),
    (n = v.sortByKey(n, ["type", "name"])),
    n
  );
}
function kc(t) {
  const n = v.getValue(t, "md_level", "="),
    e = v.getValue(t, "md_name", "="),
    i = v.getValue(t, "md_uuid", "="),
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
function Cs(t) {
  let n = t;
  try {
    t.forEach((e) => {
      if (e.type.startsWith("raid")) {
        const i = ft(
            `mdadm --export --detail /dev/${e.name}`,
            v.execOptsLinux,
          ).toString().split(`
`),
          s = kc(i);
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
    v.noop();
  }
  return n;
}
function Bc(t) {
  const n = [];
  return (
    t.forEach((e) => {
      e.type.startsWith("disk") && n.push(e.name);
    }),
    n
  );
}
function Fc(t) {
  let n = t;
  try {
    const e = Bc(t);
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
    v.noop();
  }
  return n;
}
function Rc(t) {
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
function Gc(t) {
  let n = t;
  try {
    const e = Rc(t);
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
    v.noop();
  }
  return n;
}
function Wc(t) {
  const n = [];
  return (
    t.forEach((e) => {
      const i = e.split(`\r
`),
        s = v.getValue(i, "DeviceID", ":");
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
function $c(t, n) {
  const e = Wc(n);
  return (
    t.map((i) => {
      const s = e.filter((r) => r.name === i.name.toUpperCase());
      return (s.length > 0 && (i.device = s[0].device), i);
    }),
    t
  );
}
function Pr(t) {
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
function Uc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (
        (Be &&
          Le(
            "lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,TRAN,SERIAL,LABEL,MODEL,OWNER 2>/dev/null",
            { maxBuffer: 1048576 },
            function (s, r) {
              if (s)
                Le(
                  "lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,LABEL,MODEL,OWNER 2>/dev/null",
                  { maxBuffer: 1048576 },
                  function (a, l) {
                    if (!a) {
                      let u = Pr(l).split(`
`);
                      ((e = Or(u)), (e = Cs(e)));
                    }
                    (t && t(e), n(e));
                  },
                ).on("error", function () {
                  (t && t(e), n(e));
                });
              else {
                let o = Pr(r).split(`
`);
                ((e = Or(o)), (e = Cs(e)), (e = Fc(e)), t && t(e), n(e));
              }
            },
          ).on("error", function () {
            (t && t(e), n(e));
          }),
        gt &&
          Le("diskutil info -all", { maxBuffer: 1048576 }, function (s, r) {
            if (!s) {
              let o = r.toString().split(`
`);
              ((e = Nc(o)), (e = Gc(e)));
            }
            (t && t(e), n(e));
          }).on("error", function () {
            (t && t(e), n(e));
          }),
        An && (t && t(e), n(e)),
        Mn)
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
            v.powerShell(
              "Get-CimInstance -ClassName Win32_LogicalDisk | select Caption,DriveType,Name,FileSystem,Size,VolumeSerialNumber,VolumeName | fl",
            ),
          ),
            s.push(
              v.powerShell(
                "Get-WmiObject -Class Win32_diskdrive | Select-Object -Property PNPDeviceId,DeviceID, Model, Size, @{L='Partitions'; E={$_.GetRelated('Win32_DiskPartition').GetRelated('Win32_LogicalDisk') | Select-Object -Property DeviceID, VolumeName, Size, FreeSpace}} | fl",
              ),
            ),
            v.promiseAll(s).then((r) => {
              let o = r.results[0].toString().split(/\n\s*\n/),
                a = r.results[1].toString().split(/\n\s*\n/);
              (o.forEach(function (l) {
                let u = l.split(`\r
`),
                  c = v.getValue(u, "drivetype", ":");
                c &&
                  e.push({
                    name: v.getValue(u, "name", ":"),
                    identifier: v.getValue(u, "caption", ":"),
                    type: "disk",
                    fsType: v.getValue(u, "filesystem", ":").toLowerCase(),
                    mount: v.getValue(u, "caption", ":"),
                    size: v.getValue(u, "size", ":"),
                    physical: c >= 0 && c <= 6 ? i[c] : i[0],
                    uuid: v.getValue(u, "volumeserialnumber", ":"),
                    label: v.getValue(u, "volumename", ":"),
                    model: "",
                    serial: v.getValue(u, "volumeserialnumber", ":"),
                    removable: c === "2",
                    protocol: "",
                    group: "",
                    device: "",
                  });
              }),
                (e = $c(e, a)),
                t && t(e),
                n(e));
            }));
        } catch {
          (t && t(e), n(e));
        }
      }
      (Fe || Re || Ge) && (t && t(null), n(null));
    });
  });
}
nn.blockDevices = Uc;
function Ls(t, n) {
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
function zc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      if (Mn || Fe || Re || Ge || An) return n(null);
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
        ? (Be &&
            Le(
              "lsblk -r 2>/dev/null | grep /",
              { maxBuffer: 1048576 },
              function (o, a) {
                if (o) (t && t(e), n(e));
                else {
                  let l = a.toString().split(`
`),
                    u = [];
                  l.forEach(function (p) {
                    p !== "" &&
                      ((p = p.trim().split(" ")),
                      u.indexOf(p[0]) === -1 && u.push(p[0]));
                  });
                  let c = u.join("|");
                  Le(
                    'cat /proc/diskstats | egrep "' + c + '"',
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
                        (e = Ls(i, s))),
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
          gt &&
            Le(
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
                  (e = Ls(i, s))),
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
nn.fsStats = zc;
function Is(t, n, e, i, s) {
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
    z && z.ms
      ? ((r.rIO = t),
        (r.wIO = n),
        (r.tIO = t + n),
        (r.ms = Date.now() - z.ms),
        (r.rIO_sec = (r.rIO - z.rIO) / (r.ms / 1e3)),
        (r.wIO_sec = (r.wIO - z.wIO) / (r.ms / 1e3)),
        (r.tIO_sec = r.rIO_sec + r.wIO_sec),
        (r.rWaitTime = e),
        (r.wWaitTime = i),
        (r.tWaitTime = s),
        (r.rWaitPercent = ((r.rWaitTime - z.rWaitTime) * 100) / r.ms),
        (r.wWaitPercent = ((r.wWaitTime - z.wWaitTime) * 100) / r.ms),
        (r.tWaitPercent = ((r.tWaitTime - z.tWaitTime) * 100) / r.ms),
        (z.rIO = t),
        (z.wIO = n),
        (z.rIO_sec = r.rIO_sec),
        (z.wIO_sec = r.wIO_sec),
        (z.tIO_sec = r.tIO_sec),
        (z.rWaitTime = e),
        (z.wWaitTime = i),
        (z.tWaitTime = s),
        (z.rWaitPercent = r.rWaitPercent),
        (z.wWaitPercent = r.wWaitPercent),
        (z.tWaitPercent = r.tWaitPercent),
        (z.last_ms = r.ms),
        (z.ms = Date.now()))
      : ((r.rIO = t),
        (r.wIO = n),
        (r.tIO = t + n),
        (r.rWaitTime = e),
        (r.wWaitTime = i),
        (r.tWaitTime = s),
        (z.rIO = t),
        (z.wIO = n),
        (z.rIO_sec = null),
        (z.wIO_sec = null),
        (z.tIO_sec = null),
        (z.rWaitTime = e),
        (z.wWaitTime = i),
        (z.tWaitTime = s),
        (z.rWaitPercent = null),
        (z.wWaitPercent = null),
        (z.tWaitPercent = null),
        (z.last_ms = 0),
        (z.ms = Date.now())),
    r
  );
}
function Hc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      if (Mn || An) return n(null);
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
      (z && !z.ms) || (z && z.ms && Date.now() - z.ms >= 500)
        ? ((Be || Fe || Re || Ge) &&
            Le(
              'for mount in `lsblk 2>/dev/null | grep " disk " | sed "s/[│└─├]//g" | awk \'{$1=$1};1\' | cut -d " " -f 1 | sort -u`; do cat /sys/block/$mount/stat | sed -r "s/ +/;/g" | sed -r "s/^;//"; done',
              { maxBuffer: 1024 * 1024 },
              function (u, c) {
                u
                  ? (t && t(e), n(e))
                  : (c
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
                    (e = Is(i, s, r, o, a)),
                    t && t(e),
                    n(e));
              },
            ),
          gt &&
            Le(
              `ioreg -c IOBlockStorageDriver -k Statistics -r -w0 | sed -n "/IOBlockStorageDriver/,/Statistics/p" | grep "Statistics" | tr -cd "01234567890,
"`,
              { maxBuffer: 1024 * 1024 },
              function (l, u) {
                (l ||
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
                  (e = Is(i, s, r, o, a))),
                  t && t(e),
                  n(e));
              },
            ))
        : ((e.rIO = z.rIO),
          (e.wIO = z.wIO),
          (e.tIO = z.rIO + z.wIO),
          (e.ms = z.last_ms),
          (e.rIO_sec = z.rIO_sec),
          (e.wIO_sec = z.wIO_sec),
          (e.tIO_sec = z.tIO_sec),
          (e.rWaitTime = z.rWaitTime),
          (e.wWaitTime = z.wWaitTime),
          (e.tWaitTime = z.tWaitTime),
          (e.rWaitPercent = z.rWaitPercent),
          (e.wWaitPercent = z.wWaitPercent),
          (e.tWaitPercent = z.tWaitPercent),
          t && t(e),
          n(e));
    });
  });
}
nn.disksIO = Hc;
function jc(t) {
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
      if (Be) {
        let o = "";
        Le(
          "export LC_ALL=C; lsblk -ablJO 2>/dev/null; unset LC_ALL",
          { maxBuffer: 1024 * 1024 },
          function (a, l) {
            if (!a)
              try {
                const u = l.toString().trim();
                let c = [];
                try {
                  const f = JSON.parse(u);
                  f &&
                    {}.hasOwnProperty.call(f, "blockdevices") &&
                    (c = f.blockdevices.filter(
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
                    const p = ft(
                      "export LC_ALL=C; lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,LABEL,MODEL,OWNER,GROUP 2>/dev/null; unset LC_ALL",
                      v.execOptsLinux,
                    ).toString();
                    let d = Pr(p).split(`
`);
                    c = Or(d).filter(
                      (h) =>
                        h.type === "disk" &&
                        h.size > 0 &&
                        ((h.model !== null && h.model !== "") ||
                          (h.mount === "" &&
                            h.label === "" &&
                            h.fsType === "")),
                    );
                  } catch {
                    v.noop();
                  }
                }
                c.forEach((f) => {
                  let p = "";
                  const d = "/dev/" + f.name,
                    m = f.name;
                  try {
                    p = ft(
                      "cat /sys/block/" + m + "/queue/rotational 2>/dev/null",
                      v.execOptsLinux,
                    ).toString().split(`
`)[0];
                  } catch {
                    v.noop();
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
                v.noop();
              }
            o
              ? Le(o, { maxBuffer: 1024 * 1024 }, function (u, c) {
                  try {
                    (JSON.parse(`[${c}]`).forEach((p) => {
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
                        Le(r, { maxBuffer: 1024 * 1024 }, function (p, d) {
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
        ((Fe || Re || Ge) && (t && t(s), e(s)),
        An && (t && t(s), e(s)),
        gt &&
          Le(
            "system_profiler SPSerialATADataType SPNVMeDataType SPUSBDataType",
            { maxBuffer: 1024 * 1024 },
            function (o, a) {
              if (!o) {
                let l = a.toString().split(`
`),
                  u = [],
                  c = [],
                  f = [],
                  p = "SATA";
                l.forEach((d) => {
                  d === "NVMExpress:"
                    ? (p = "NVMe")
                    : d === "USB:"
                      ? (p = "USB")
                      : d === "SATA/SATA Express:"
                        ? (p = "SATA")
                        : p === "SATA"
                          ? u.push(d)
                          : p === "NVMe"
                            ? c.push(d)
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
                      const y = v.getValue(h, "Medium Type", ":", !0).trim(),
                        g = v.getValue(h, "capacity", ":", !0).trim(),
                        x = v.getValue(h, "BSD Name", ":", !0).trim();
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
                          const w = v
                            .getValue(h, "S.M.A.R.T. status", ":", !0)
                            .trim()
                            .toLowerCase();
                          (s.push({
                            device: x,
                            type: y.startsWith("Solid") ? "SSD" : "HD",
                            name: v.getValue(h, "Model", ":", !0).trim(),
                            vendor:
                              n(v.getValue(h, "Model", ":", !0).trim()) ||
                              v.getValue(h, "Manufacturer", ":", !0),
                            size: S,
                            bytesPerSector: null,
                            totalCylinders: null,
                            totalHeads: null,
                            totalSectors: null,
                            totalTracks: null,
                            tracksPerCylinder: null,
                            sectorsPerTrack: null,
                            firmwareRevision: v
                              .getValue(h, "Revision", ":", !0)
                              .trim(),
                            serialNum: v
                              .getValue(h, "Serial Number", ":", !0)
                              .trim(),
                            interfaceType: v
                              .getValue(h, "InterfaceType", ":", !0)
                              .trim(),
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
                  v.noop();
                }
                try {
                  let d = c.join(`
`).split(`

          Capacity:`);
                  (d.shift(),
                    d.forEach(function (m) {
                      m = "!Capacity: " + m;
                      let h = m.split(`
`);
                      const y = v.getValue(h, "link width", ":", !0).trim(),
                        g = v.getValue(h, "!capacity", ":", !0).trim(),
                        x = v.getValue(h, "BSD Name", ":", !0).trim();
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
                          const w = v
                            .getValue(h, "S.M.A.R.T. status", ":", !0)
                            .trim()
                            .toLowerCase();
                          (s.push({
                            device: x,
                            type: "NVMe",
                            name: v.getValue(h, "Model", ":", !0).trim(),
                            vendor: n(v.getValue(h, "Model", ":", !0).trim()),
                            size: S,
                            bytesPerSector: null,
                            totalCylinders: null,
                            totalHeads: null,
                            totalSectors: null,
                            totalTracks: null,
                            tracksPerCylinder: null,
                            sectorsPerTrack: null,
                            firmwareRevision: v
                              .getValue(h, "Revision", ":", !0)
                              .trim(),
                            serialNum: v
                              .getValue(h, "Serial Number", ":", !0)
                              .trim(),
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
                  v.noop();
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
                      const y = v.getValue(h, "Capacity", ":", !0).trim(),
                        g = v.getValue(h, "BSD Name", ":", !0).trim();
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
                          const S = v
                            .getValue(h, "S.M.A.R.T. status", ":", !0)
                            .trim()
                            .toLowerCase();
                          (s.push({
                            device: g,
                            type: "USB",
                            name: v
                              .getValue(h, "Model", ":", !0)
                              .trim()
                              .replaceAll(":", ""),
                            vendor: n(v.getValue(h, "Model", ":", !0).trim()),
                            size: x,
                            bytesPerSector: null,
                            totalCylinders: null,
                            totalHeads: null,
                            totalSectors: null,
                            totalTracks: null,
                            tracksPerCylinder: null,
                            sectorsPerTrack: null,
                            firmwareRevision: v
                              .getValue(h, "Revision", ":", !0)
                              .trim(),
                            serialNum: v
                              .getValue(h, "Serial Number", ":", !0)
                              .trim(),
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
                  v.noop();
                }
                if (r)
                  ((r =
                    r +
                    `printf "
"`),
                    Le(r, { maxBuffer: 1024 * 1024 }, function (d, m) {
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
        Mn)
      )
        try {
          const o = [];
          if (
            (o.push(
              v.powerShell(
                "Get-CimInstance Win32_DiskDrive | select Caption,Size,Status,PNPDeviceId,DeviceId,BytesPerSector,TotalCylinders,TotalHeads,TotalSectors,TotalTracks,TracksPerCylinder,SectorsPerTrack,FirmwareRevision,SerialNumber,InterfaceType | fl",
              ),
            ),
            o.push(
              v.powerShell(
                "Get-PhysicalDisk | select BusType,MediaType,FriendlyName,Model,SerialNumber,Size | fl",
              ),
            ),
            v.smartMonToolsInstalled())
          )
            try {
              const a = JSON.parse(ft("smartctl --scan -j").toString());
              a &&
                a.devices &&
                a.devices.length > 0 &&
                a.devices.forEach((l) => {
                  o.push(Tc(`smartctl -j -a ${l.name}`, v.execOptsWin));
                });
            } catch {
              v.noop();
            }
          v.promiseAll(o).then((a) => {
            let l = a.results[0].toString().split(/\n\s*\n/);
            (l.forEach(function (u) {
              let c = u.split(`\r
`);
              const f = v.getValue(c, "Size", ":").trim(),
                p = v.getValue(c, "Status", ":").trim().toLowerCase();
              f &&
                s.push({
                  device: v.getValue(c, "DeviceId", ":"),
                  // changed from PNPDeviceId to DeviceID (be be able to match devices)
                  type: u.indexOf("SSD") > -1 ? "SSD" : "HD",
                  // just a starting point ... better: MSFT_PhysicalDisk - Media Type ... see below
                  name: v.getValue(c, "Caption", ":"),
                  vendor: n(v.getValue(c, "Caption", ":", !0).trim()),
                  size: parseInt(f),
                  bytesPerSector: parseInt(
                    v.getValue(c, "BytesPerSector", ":"),
                  ),
                  totalCylinders: parseInt(
                    v.getValue(c, "TotalCylinders", ":"),
                  ),
                  totalHeads: parseInt(v.getValue(c, "TotalHeads", ":")),
                  totalSectors: parseInt(v.getValue(c, "TotalSectors", ":")),
                  totalTracks: parseInt(v.getValue(c, "TotalTracks", ":")),
                  tracksPerCylinder: parseInt(
                    v.getValue(c, "TracksPerCylinder", ":"),
                  ),
                  sectorsPerTrack: parseInt(
                    v.getValue(c, "SectorsPerTrack", ":"),
                  ),
                  firmwareRevision: v
                    .getValue(c, "FirmwareRevision", ":")
                    .trim(),
                  serialNum: v.getValue(c, "SerialNumber", ":").trim(),
                  interfaceType: v.getValue(c, "InterfaceType", ":").trim(),
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
              (l = a.results[1].split(/\n\s*\n/)),
              l.forEach(function (u) {
                let c = u.split(`\r
`);
                const f = v.getValue(c, "SerialNumber", ":").trim(),
                  p = v
                    .getValue(c, "FriendlyName", ":")
                    .trim()
                    .replace("Msft ", "Microsoft"),
                  d = v.getValue(c, "Size", ":").trim(),
                  m = v.getValue(c, "Model", ":").trim(),
                  h = v.getValue(c, "BusType", ":").trim();
                let y = v.getValue(c, "MediaType", ":").trim();
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
                  let g = v.findObjectByKey(s, "serialNum", f);
                  ((g === -1 || f === "") &&
                    (g = v.findObjectByKey(s, "name", p)),
                    g != -1 && ((s[g].type = y), (s[g].interfaceType = h)));
                }
              }),
              a.results.shift(),
              a.results.shift(),
              a.results.length &&
                a.results.forEach((u) => {
                  try {
                    const c = JSON.parse(u);
                    if (c.serial_number) {
                      const f = c.serial_number;
                      let p = v.findObjectByKey(s, "serialNum", f);
                      p != -1 &&
                        ((s[p].smartStatus =
                          c.smart_status && c.smart_status.passed
                            ? "Ok"
                            : c.smart_status && c.smart_status.passed === !1
                              ? "Predicted Failure"
                              : "unknown"),
                        c.temperature &&
                          c.temperature.current &&
                          (s[p].temperature = c.temperature.current),
                        (s[p].smartData = c));
                    }
                  } catch {
                    v.noop();
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
nn.diskLayout = jc;
var rn = {};
const Ai = Ae,
  De = oe.exec,
  de = oe.execSync,
  Kc = be,
  M = V;
let It = process.platform;
const tt = It === "linux" || It === "android",
  nt = It === "darwin",
  ai = It === "win32",
  _t = It === "freebsd",
  vt = It === "openbsd",
  Ot = It === "netbsd",
  _s = It === "sunos";
let ie = {},
  vs = "",
  un = {},
  Os = [],
  pn = [],
  fn = {},
  Xt;
function Qt() {
  let t = "",
    n = "";
  try {
    let e = Ai.networkInterfaces(),
      i = 9999;
    for (let s in e)
      ({}).hasOwnProperty.call(e, s) &&
        e[s].forEach(function (r) {
          r &&
            r.internal === !1 &&
            ((n = n || s),
            r.scopeid && r.scopeid < i && ((t = s), (i = r.scopeid)));
        });
    if (((t = t || n || ""), ai)) {
      let s = "";
      if (
        (de("netstat -r", M.execOptsWin)
          .toString()
          .split(Ai.EOL)
          .forEach((l) => {
            if (
              ((l = l.replace(/\s+/g, " ").trim()),
              l.indexOf("0.0.0.0 0.0.0.0") > -1 && !/[a-zA-Z]/.test(l))
            ) {
              const u = l.split(" ");
              u.length >= 5 && (s = u[u.length - 2]);
            }
          }),
        s)
      )
        for (let l in e)
          ({}).hasOwnProperty.call(e, l) &&
            e[l].forEach(function (u) {
              u && u.address && u.address === s && (t = l);
            });
    }
    if (tt) {
      let o = de("ip route 2> /dev/null | grep default", M.execOptsLinux)
        .toString()
        .split(
          `
`,
        )[0]
        .split(/\s+/);
      (o[0] === "none" && o[5] ? (t = o[5]) : o[4] && (t = o[4]),
        t.indexOf(":") > -1 && (t = t.split(":")[1].trim()));
    }
    if (nt || _t || vt || Ot || _s) {
      let s = "";
      (tt && (s = "ip route 2> /dev/null | grep default | awk '{print $5}'"),
        nt &&
          (s =
            "route -n get default 2>/dev/null | grep interface: | awk '{print $2}'"),
        (_t || vt || Ot || _s) && (s = "route get 0.0.0.0 | grep interface:"),
        (t = de(s).toString().split(`
`)[0]),
        t.indexOf(":") > -1 && (t = t.split(":")[1].trim()));
    }
  } catch {
    M.noop();
  }
  return (t && (vs = t), vs);
}
rn.getDefaultNetworkInterface = Qt;
function Ps() {
  let t = "",
    n = "",
    e = {};
  if (tt || _t || vt || Ot) {
    if (typeof Xt > "u")
      try {
        const i = de("which ip", M.execOptsLinux).toString().split(`
`);
        i.length && i[0].indexOf(":") === -1 && i[0].indexOf("/") === 0
          ? (Xt = i[0])
          : (Xt = "");
      } catch {
        Xt = "";
      }
    try {
      const i =
          "export LC_ALL=C; " +
          (Xt ? Xt + " link show up" : "/sbin/ifconfig") +
          "; unset LC_ALL",
        r = de(i, M.execOptsLinux).toString().split(`
`);
      for (let o = 0; o < r.length; o++)
        if (r[o] && r[o][0] !== " ") {
          if (Xt) {
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
  if (nt)
    try {
      const r = de("/sbin/ifconfig").toString().split(`
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
function Xc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = Qt();
      (t && t(e), n(e));
    });
  });
}
rn.networkInterfaceDefault = Xc;
function Yc(t, n) {
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
          l = M.getValue(s, "Name", ":")
            .replace(/\]/g, ")")
            .replace(/\[/g, "("),
          u = M.getValue(s, "NetConnectionID", ":")
            .replace(/\]/g, ")")
            .replace(/\[/g, "(");
        if (
          ((l.toLowerCase().indexOf("wi-fi") >= 0 ||
            l.toLowerCase().indexOf("wireless") >= 0) &&
            (a = "wireless"),
          o !== "")
        ) {
          const c = parseInt(M.getValue(s, "speed", ":").trim(), 10) / 1e6;
          e.push({
            mac: M.getValue(s, "MACAddress", ":").toLowerCase(),
            dhcp: M.getValue(r, "dhcpEnabled", ":").toLowerCase() === "true",
            name: l,
            iface: u,
            netEnabled: o === "TRUE",
            speed: isNaN(c) ? null : c,
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
function qc() {
  return new Promise((t) => {
    process.nextTick(() => {
      let n = "Get-CimInstance Win32_NetworkAdapter | fl *; echo '#-#-#-#';";
      n += "Get-CimInstance Win32_NetworkAdapterConfiguration | fl DHCPEnabled";
      try {
        M.powerShell(n).then((e) => {
          e = e.split("#-#-#-#");
          const i = (e[0] || "").split(/\n\s*\n/),
            s = (e[1] || "").split(/\n\s*\n/);
          t(Yc(i, s));
        });
      } catch {
        t([]);
      }
    });
  });
}
function Jc() {
  let t = {},
    n = {
      primaryDNS: "",
      exitCode: 0,
      ifaces: [],
    };
  try {
    return (
      de("ipconfig /all", M.execOptsWin)
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
                .filter((l) => l.toUpperCase().includes("DNS")),
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
                  .filter((l) => l.toUpperCase().includes("DNS")),
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
function Qc(t, n) {
  let e = "";
  const i = n + ".";
  try {
    const s = t.filter((r) => i.includes(r.name + ".")).map((r) => r.dnsSuffix);
    return (s[0] && (e = s[0]), e || (e = ""), e);
  } catch {
    return "Unknown";
  }
}
function Zc() {
  try {
    return de("netsh lan show profiles", M.execOptsWin).split(`\r
Profile on interface`);
  } catch (t) {
    return t.status === 1 && t.stdout.includes("AutoConfig") ? "Disabled" : [];
  }
}
function eu(t) {
  try {
    return de(
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
function tu(t, n, e) {
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
        const a = r.find((l) => l.includes("EAP"));
        ((i.protocol = a.split(":").pop()), (i.state = "Enabled"));
      }
    } catch {
      return i;
    }
  else if (t == "wireless") {
    let s = "",
      r = "";
    try {
      const o = eu(n);
      if (o !== "Unknown") {
        let a = "";
        const l = M.isPrototypePolluted() ? "---" : M.sanitizeShellString(o),
          u = M.mathMin(l.length, 32);
        for (let c = 0; c <= u; c++) l[c] !== void 0 && (a = a + l[c]);
        ((s = de(
          `netsh wlan show profiles "${a}" | findstr "802.1X"`,
          M.execOptsWin,
        )),
          (r = de(
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
function To(t) {
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
function nu(t) {
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
        e.forEach((l) => {
          (l.trim().startsWith("ether ") &&
            (i.mac = l.split("ether ")[1].toLowerCase().trim()),
            l.trim().startsWith("inet6 ") &&
              !i.ip6 &&
              (i.ip6 = l
                .split("inet6 ")[1]
                .toLowerCase()
                .split("%")[0]
                .split(" ")[0]),
            l.trim().startsWith("inet ") &&
              !i.ip4 &&
              (i.ip4 = l.split("inet ")[1].toLowerCase().split(" ")[0]));
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
function iu() {
  const t = "/sbin/ifconfig -v";
  try {
    const n = de(t, { maxBuffer: 2048e4 }).toString().split(`
`),
      e = To(n);
    return nu(e);
  } catch {
    return [];
  }
}
function ru(t) {
  const n = `nmcli device status 2>/dev/null | grep ${t}`;
  try {
    const r = de(n, M.execOptsLinux)
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
function Do(t) {
  let n = [];
  try {
    let e = `cat ${t} 2> /dev/null | grep 'iface\\|source'`;
    de(e, M.execOptsLinux)
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
          n = n.concat(Do(o));
        }
      });
  } catch {
    M.noop();
  }
  return n;
}
function su() {
  let t = "ip a 2> /dev/null",
    n = [];
  try {
    const e = de(t, M.execOptsLinux).toString().split(`
`),
      i = To(e);
    n = ou(i);
  } catch {
    M.noop();
  }
  try {
    n = Do("/etc/network/interfaces");
  } catch {
    M.noop();
  }
  return n;
}
function ou(t) {
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
function au(t, n, e) {
  let i = !1;
  if (n) {
    const s = `nmcli connection show "${n}" 2>/dev/null | grep ipv4.method;`;
    try {
      switch (
        de(s, M.execOptsLinux)
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
function lu(t) {
  let n = !1;
  const e = `ipconfig getpacket "${t}" 2>/dev/null | grep lease_time;`;
  try {
    const i = de(e).toString().split(`
`);
    i.length && i[0].startsWith("lease_time") && (n = !0);
  } catch {
    M.noop();
  }
  return n;
}
function cu(t) {
  if (t) {
    const n = `nmcli connection show "${t}" 2>/dev/null | grep ipv4.dns-search;`;
    try {
      const s = de(n, M.execOptsLinux)
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
function uu(t) {
  if (t) {
    const n = `nmcli connection show "${t}" 2>/dev/null | grep 802-1x.eap;`;
    try {
      const s = de(n, M.execOptsLinux)
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
function pu(t) {
  return t ? (t == "Not defined" ? "Disabled" : "Enabled") : "Unknown";
}
function ar(t, n, e) {
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
function Gr(t, n, e) {
  return (
    typeof t == "string" && ((e = t), (n = !0), (t = null)),
    typeof t == "boolean" && ((n = t), (t = null), (e = "")),
    typeof n > "u" && (n = !0),
    (e = e || ""),
    (e = "" + e),
    new Promise((i) => {
      process.nextTick(() => {
        let s = Ai.networkInterfaces(),
          r = [],
          o = [],
          a = [],
          l = [];
        if (nt || _t || vt || Ot)
          if (JSON.stringify(s) === JSON.stringify(un) && !n)
            ((r = pn), t && t(r), i(r));
          else {
            const u = Qt();
            ((un = JSON.parse(JSON.stringify(s))),
              (o = iu()),
              o.forEach((c) => {
                ({}).hasOwnProperty.call(s, c.iface) &&
                  s[c.iface].forEach(function (m) {
                    ((m.family === "IPv4" || m.family === 4) &&
                      (c.ip4subnet = m.netmask),
                      (m.family === "IPv6" || m.family === 6) &&
                        (c.ip6subnet = m.netmask));
                  });
                let f = "";
                const p = M.isPrototypePolluted()
                    ? "---"
                    : M.sanitizeShellString(c.iface),
                  d = M.mathMin(p.length, 2e3);
                for (let m = 0; m <= d; m++) p[m] !== void 0 && (f = f + p[m]);
                r.push({
                  iface: c.iface,
                  ifaceName: c.iface,
                  default: c.iface === u,
                  ip4: c.ip4,
                  ip4subnet: c.ip4subnet || "",
                  ip6: c.ip6,
                  ip6subnet: c.ip6subnet || "",
                  mac: c.mac,
                  internal: c.internal,
                  virtual: c.internal ? !1 : ar(c.iface, c.iface, c.mac),
                  operstate: c.operstate,
                  type: c.type,
                  duplex: c.duplex,
                  mtu: c.mtu,
                  speed: c.speed,
                  dhcp: lu(f),
                  dnsSuffix: "",
                  ieee8021xAuth: "",
                  ieee8021xState: "",
                  carrierChanges: 0,
                });
              }),
              (pn = r),
              e.toLowerCase().indexOf("default") >= 0 &&
                ((r = r.filter((c) => c.default)),
                r.length > 0 ? (r = r[0]) : (r = [])),
              t && t(r),
              i(r));
          }
        if (tt)
          if (JSON.stringify(s) === JSON.stringify(un) && !n)
            ((r = pn), t && t(r), i(r));
          else {
            ((un = JSON.parse(JSON.stringify(s))), (Os = su()));
            const u = Qt();
            for (let c in s) {
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
                R = "",
                T = "",
                K = "";
              if ({}.hasOwnProperty.call(s, c)) {
                let L = c;
                s[c].forEach(function (B) {
                  ((B.family === "IPv4" || B.family === 4) &&
                    ((f = B.address), (p = B.netmask)),
                    (B.family === "IPv6" || B.family === 6) &&
                      (!d || d.match(/^fe80::/i)) &&
                      ((d = B.address), (m = B.netmask)),
                    (h = B.mac));
                  const Z = parseInt(process.versions.node.split("."), 10);
                  h.indexOf("00:00:0") > -1 &&
                    (tt || nt) &&
                    !B.internal &&
                    Z >= 8 &&
                    Z <= 11 &&
                    (Object.keys(fn).length === 0 && (fn = Ps()),
                    (h = fn[c] || ""));
                });
                let D = c.split(":")[0].trim().toLowerCase(),
                  O = "";
                const X = M.isPrototypePolluted()
                    ? "---"
                    : M.sanitizeShellString(D),
                  Q = M.mathMin(X.length, 2e3);
                for (let B = 0; B <= Q; B++) X[B] !== void 0 && (O = O + X[B]);
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
                  F = de(ee, M.execOptsLinux).toString().split(`
`);
                  const B = ru(O);
                  ((w = au(O, B, Os)), (C = cu(B)), (R = uu(B)), (T = pu(R)));
                } catch {
                  M.noop();
                }
                ((y = M.getValue(F, "duplex")),
                  (y = y.startsWith("cat") ? "" : y),
                  (g = parseInt(M.getValue(F, "mtu"), 10)));
                let q = parseInt(M.getValue(F, "speed"), 10);
                x = isNaN(q) ? null : q;
                let N = M.getValue(F, "wirelessspeed").split("tx bitrate: ");
                (x === null &&
                  N.length === 2 &&
                  ((q = parseFloat(N[1])), (x = isNaN(q) ? null : q)),
                  (S = parseInt(M.getValue(F, "carrier_changes"), 10)));
                const H = M.getValue(F, "operstate");
                ((K =
                  H === "up"
                    ? M.getValue(F, "wireless").trim()
                      ? "wireless"
                      : "wired"
                    : "unknown"),
                  (O === "lo" || O.startsWith("bond")) && (K = "virtual"));
                let b = s[c] && s[c][0] ? s[c][0].internal : !1;
                (c.toLowerCase().indexOf("loopback") > -1 ||
                  L.toLowerCase().indexOf("loopback") > -1) &&
                  (b = !0);
                const $ = b ? !1 : ar(c, L, h);
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
                  ieee8021xAuth: R,
                  ieee8021xState: T,
                  carrierChanges: S,
                });
              }
            }
            ((pn = r),
              e.toLowerCase().indexOf("default") >= 0 &&
                ((r = r.filter((c) => c.default)),
                r.length > 0 ? (r = r[0]) : (r = [])),
              t && t(r),
              i(r));
          }
        if (ai)
          if (JSON.stringify(s) === JSON.stringify(un) && !n)
            ((r = pn), t && t(r), i(r));
          else {
            un = JSON.parse(JSON.stringify(s));
            const u = Qt();
            qc().then(function (c) {
              (c.forEach((f) => {
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
                (l = Zc()),
                (a = Jc()));
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
                  R = "",
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
                    const B = parseInt(process.versions.node.split("."), 10);
                    w.indexOf("00:00:0") > -1 &&
                      (tt || nt) &&
                      !$.internal &&
                      B >= 8 &&
                      B <= 11 &&
                      (Object.keys(fn).length === 0 && (fn = Ps()),
                      (w = fn[f] || ""));
                  }),
                    (O = Qc(a.ifaces, p)));
                  let q = !1;
                  (c.forEach(($) => {
                    $.mac === w &&
                      !q &&
                      ((h = $.iface || h),
                      (F = $.name),
                      (D = $.dhcp),
                      (L = $.operstate),
                      (T = L === "up" ? $.speed : 0),
                      (ee = $.type),
                      (q = !0));
                  }),
                    (f.toLowerCase().indexOf("wlan") >= 0 ||
                      F.toLowerCase().indexOf("wlan") >= 0 ||
                      F.toLowerCase().indexOf("802.11n") >= 0 ||
                      F.toLowerCase().indexOf("wireless") >= 0 ||
                      F.toLowerCase().indexOf("wi-fi") >= 0 ||
                      F.toLowerCase().indexOf("wifi") >= 0) &&
                      (ee = "wireless"));
                  const N = tu(ee, p, l);
                  ((X = N.protocol), (Q = N.state));
                  let H = s[f] && s[f][0] ? s[f][0].internal : !1;
                  (f.toLowerCase().indexOf("loopback") > -1 ||
                    F.toLowerCase().indexOf("loopback") > -1) &&
                    (H = !0);
                  const b = H ? !1 : ar(f, F, w);
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
                    mtu: R,
                    speed: T,
                    dhcp: D,
                    dnsSuffix: O,
                    ieee8021xAuth: X,
                    ieee8021xState: Q,
                    carrierChanges: K,
                  });
                }
              }
              ((pn = r),
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
rn.networkInterfaces = Gr;
function gi(t, n, e, i, s, r, o, a) {
  let l = {
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
      ? ((l.ms = Date.now() - ie[t].ms),
        (l.rx_sec =
          n - ie[t].rx_bytes >= 0 ? (n - ie[t].rx_bytes) / (l.ms / 1e3) : 0),
        (l.tx_sec =
          e - ie[t].tx_bytes >= 0 ? (e - ie[t].tx_bytes) / (l.ms / 1e3) : 0),
        (ie[t].rx_bytes = n),
        (ie[t].tx_bytes = e),
        (ie[t].rx_sec = l.rx_sec),
        (ie[t].tx_sec = l.tx_sec),
        (ie[t].ms = Date.now()),
        (ie[t].last_ms = l.ms),
        (ie[t].operstate = i))
      : (ie[t] || (ie[t] = {}),
        (ie[t].rx_bytes = n),
        (ie[t].tx_bytes = e),
        (ie[t].rx_sec = null),
        (ie[t].tx_sec = null),
        (ie[t].ms = Date.now()),
        (ie[t].last_ms = 0),
        (ie[t].operstate = i)),
    l
  );
}
function bo(t, n) {
  let e = [];
  return new Promise((i) => {
    process.nextTick(() => {
      if (M.isFunction(t) && !n) ((n = t), (e = [Qt()]));
      else {
        if (typeof t != "string" && t !== void 0) return (n && n([]), i([]));
        t = t || Qt();
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
          Gr(!1).then((o) => {
            for (let a of o) e.push(a.iface);
            bo(e.join(",")).then((a) => {
              (n && n(a), i(a));
            });
          }));
      else {
        for (let o of e) r.push(fu(o.trim()));
        r.length
          ? Promise.all(r).then((o) => {
              (n && n(o), i(o));
            })
          : (n && n(s), i(s));
      }
    });
  });
}
function fu(t) {
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
        l = 0,
        u = 0,
        c = 0,
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
          (tt &&
            (Kc.existsSync("/sys/class/net/" + i)
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
                De(m, function (g, x) {
                  (g ||
                    ((h = x.toString().split(`
`)),
                    (a = h[0].trim()),
                    (l = parseInt(h[1], 10)),
                    (u = parseInt(h[2], 10)),
                    (c = parseInt(h[3], 10)),
                    (f = parseInt(h[4], 10)),
                    (p = parseInt(h[5], 10)),
                    (d = parseInt(h[6], 10)),
                    (o = gi(i, l, u, a, c, f, p, d))),
                    e(o));
                }))
              : e(o)),
          (_t || vt || Ot) &&
            ((m = "netstat -ibndI " + i),
            De(m, function (g, x) {
              if (!g) {
                h = x.toString().split(`
`);
                for (let S = 1; S < h.length; S++) {
                  const w = h[S].replace(/ +/g, " ").split(" ");
                  w &&
                    w[0] &&
                    w[7] &&
                    w[10] &&
                    ((l = l + parseInt(w[7])),
                    w[6].trim() !== "-" && (c = c + parseInt(w[6])),
                    w[5].trim() !== "-" && (f = f + parseInt(w[5])),
                    (u = u + parseInt(w[10])),
                    w[12].trim() !== "-" && (p = p + parseInt(w[12])),
                    w[9].trim() !== "-" && (d = d + parseInt(w[9])),
                    (a = "up"));
                }
                o = gi(i, l, u, a, c, f, p, d);
              }
              e(o);
            })),
          nt &&
            ((m = "ifconfig " + i + ' | grep "status"'),
            De(m, function (g, x) {
              ((o.operstate = (x.toString().split(":")[1] || "").trim()),
                (o.operstate = (o.operstate || "").toLowerCase()),
                (o.operstate =
                  o.operstate === "active"
                    ? "up"
                    : o.operstate === "inactive"
                      ? "down"
                      : "unknown"),
                (m = "netstat -bdI " + i),
                De(m, function (S, w) {
                  if (
                    !S &&
                    ((h = w.toString().split(`
`)),
                    h.length > 1 && h[1].trim() !== "")
                  ) {
                    y = h[1].replace(/ +/g, " ").split(" ");
                    const C = y.length > 11 ? 1 : 0;
                    ((l = parseInt(y[C + 5])),
                      (c = parseInt(y[C + 10])),
                      (f = parseInt(y[C + 4])),
                      (u = parseInt(y[C + 8])),
                      (p = parseInt(y[C + 10])),
                      (d = parseInt(y[C + 7])),
                      (o = gi(i, l, u, o.operstate, c, f, p, d)));
                  }
                  e(o);
                }));
            })),
          ai)
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
            Gr(!1).then((C) => {
              ((l = 0),
                (u = 0),
                g.forEach((R) => {
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
                        .toLowerCase() === R.name &&
                      ((x = T.iface),
                      (l = R.rx_bytes),
                      (c = R.rx_dropped),
                      (f = R.rx_errors),
                      (u = R.tx_bytes),
                      (p = R.tx_dropped),
                      (d = R.tx_errors),
                      (a = T.operstate));
                  });
                }),
                l && u && (o = gi(x, parseInt(l), parseInt(u), a, c, f, p, d)),
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
rn.networkStats = bo;
function du(t, n) {
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
function mu(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (tt || _t || vt || Ot) {
        let i =
          'export LC_ALL=C; netstat -tunap | grep "ESTABLISHED\\|SYN_SENT\\|SYN_RECV\\|FIN_WAIT1\\|FIN_WAIT2\\|TIME_WAIT\\|CLOSE\\|CLOSE_WAIT\\|LAST_ACK\\|LISTEN\\|CLOSING\\|UNKNOWN"; unset LC_ALL';
        ((_t || vt || Ot) &&
          (i =
            'export LC_ALL=C; netstat -na | grep "ESTABLISHED\\|SYN_SENT\\|SYN_RECV\\|FIN_WAIT1\\|FIN_WAIT2\\|TIME_WAIT\\|CLOSE\\|CLOSE_WAIT\\|LAST_ACK\\|LISTEN\\|CLOSING\\|UNKNOWN"; unset LC_ALL'),
          De(i, { maxBuffer: 1024 * 2e4 }, function (s, r) {
            let o = r.toString().split(`
`);
            !s && (o.length > 1 || o[0] != "")
              ? (o.forEach(function (a) {
                  if (((a = a.replace(/ +/g, " ").split(" ")), a.length >= 7)) {
                    let l = a[3],
                      u = "",
                      c = a[3].split(":");
                    c.length > 1 &&
                      ((u = c[c.length - 1]), c.pop(), (l = c.join(":")));
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
                        localAddress: l,
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
                De(i, { maxBuffer: 1024 * 2e4 }, function (a, l) {
                  (a ||
                    l
                      .toString()
                      .split(
                        `
`,
                      )
                      .forEach(function (c) {
                        if (
                          ((c = c.replace(/ +/g, " ").split(" ")),
                          c.length >= 6)
                        ) {
                          let f = c[4],
                            p = "",
                            d = c[4].split(":");
                          d.length > 1 &&
                            ((p = d[d.length - 1]), d.pop(), (f = d.join(":")));
                          let m = c[5],
                            h = "",
                            y = c[5].split(":");
                          y.length > 1 &&
                            ((h = y[y.length - 1]), y.pop(), (m = y.join(":")));
                          let g = c[1];
                          (g === "ESTAB" && (g = "ESTABLISHED"),
                            g === "TIME-WAIT" && (g = "TIME_WAIT"));
                          let x = null,
                            S = "";
                          if (c.length >= 7 && c[6].indexOf("users:") > -1) {
                            let w = c[6]
                              .replace('users:(("', "")
                              .replace(/"/g, "")
                              .split(",");
                            w.length > 2 &&
                              ((S = w[0].split(" ")[0].split(":")[0]),
                              (x = parseInt(w[1], 10)));
                          }
                          g &&
                            e.push({
                              protocol: c[0],
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
      if (nt) {
        let i =
          'netstat -natvln | head -n2; netstat -natvln | grep "tcp4\\|tcp6\\|udp4\\|udp6"';
        const s =
          "ESTABLISHED|SYN_SENT|SYN_RECV|FIN_WAIT1|FIN_WAIT_1|FIN_WAIT2|FIN_WAIT_2|TIME_WAIT|CLOSE|CLOSE_WAIT|LAST_ACK|LISTEN|CLOSING|UNKNOWN".split(
            "|",
          );
        De(i, { maxBuffer: 1024 * 2e4 }, function (r, o) {
          r ||
            De(
              "ps -axo pid,command",
              { maxBuffer: 1024 * 2e4 },
              function (a, l) {
                let u = l.toString().split(`
`);
                u = u.map((p) => p.trim().replace(/ +/g, " "));
                let c = o.toString().split(`
`);
                c.shift();
                let f = 8;
                (c.length > 1 &&
                  c[0].indexOf("pid") > 0 &&
                  (f = (c.shift() || "")
                    .replace(/ Address/g, "_Address")
                    .replace(/ +/g, " ")
                    .split(" ")
                    .indexOf("pid")),
                  c.forEach(function (p) {
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
                          process: du(u, C),
                        });
                    }
                  }),
                  t && t(e),
                  n(e));
              },
            );
        });
      }
      if (ai) {
        let i = "netstat -nao";
        try {
          De(i, M.execOptsWin, function (s, r) {
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
                    let l = a[1],
                      u = "",
                      c = a[1].split(":");
                    (c.length > 1 &&
                      ((u = c[c.length - 1]), c.pop(), (l = c.join(":"))),
                      (l = l.replace(/\[/g, "").replace(/\]/g, "")));
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
                            localAddress: l,
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
                            localAddress: l,
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
rn.networkConnections = mu;
function hu(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = "";
      if (tt || _t || vt || Ot) {
        let i = "ip route get 1";
        try {
          De(i, { maxBuffer: 1024 * 2e4 }, function (s, r) {
            if (s) (t && t(e), n(e));
            else {
              let o = r.toString().split(`
`),
                l = (o && o[0] ? o[0] : "").split(" via ");
              (l && l[1] && ((l = l[1].split(" ")), (e = l[0])),
                t && t(e),
                n(e));
            }
          });
        } catch {
          (t && t(e), n(e));
        }
      }
      if (nt) {
        let i = "route -n get default";
        try {
          De(i, { maxBuffer: 1024 * 2e4 }, function (s, r) {
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
                De(i, { maxBuffer: 1024 * 2e4 }, function (o, a) {
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
      if (ai)
        try {
          De("netstat -r", M.execOptsWin, function (i, s) {
            (s
              .toString()
              .split(Ai.EOL)
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
rn.networkGatewayDefault = hu;
var Xi = {};
const zn = Ae,
  Wr = oe.exec,
  Pt = oe.execSync,
  E = V;
let Ti = process.platform;
const $r = Ti === "linux" || Ti === "android",
  Ur = Ti === "darwin",
  zr = Ti === "win32";
function Hr(t) {
  const n = parseFloat(t);
  return n < 0 ? 0 : n >= 100 ? -50 : n / 2 - 100;
}
function Di(t) {
  const n = 2 * (parseFloat(t) + 100);
  return n <= 100 ? n : 100;
}
const Kn = {
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
function Xn(t) {
  return {}.hasOwnProperty.call(Kn, t) ? Kn[t] : null;
}
function gu(t) {
  let n = 0;
  for (let e in Kn)
    ({}).hasOwnProperty.call(Kn, e) && Kn[e] === t && (n = E.toInt(e));
  return n;
}
function Vo() {
  const t = [],
    n = "iw dev 2>/dev/null";
  try {
    const i = Pt(n, E.execOptsLinux)
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
          l = E.getValue(r, "addr", " "),
          u = E.toInt(E.getValue(r, "channel", " "));
        t.push({
          id: a,
          iface: o,
          mac: l,
          channel: u,
        });
      }),
      t
    );
  } catch {
    try {
      const s = Pt(
        "nmcli -t -f general,wifi-properties,wired-properties,interface-flags,capabilities,nsp device show 2>/dev/null",
        E.execOptsLinux,
      ).toString().split(`

`);
      let r = 1;
      return (
        s.forEach((o) => {
          const a = o.split(`
`),
            l = E.getValue(a, "GENERAL.DEVICE"),
            u = E.getValue(a, "GENERAL.TYPE"),
            c = r++,
            f = E.getValue(a, "GENERAL.HWADDR");
          u.toLowerCase() === "wifi" &&
            t.push({
              id: c,
              iface: l,
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
function No(t) {
  const n = `nmcli -t -f general,wifi-properties,capabilities,ip4,ip6 device show ${t} 2> /dev/null`;
  try {
    const e = Pt(n, E.execOptsLinux).toString().split(`
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
function yu(t) {
  const n = `nmcli -t --show-secrets connection show ${t} 2>/dev/null`;
  try {
    const e = Pt(n, E.execOptsLinux).toString().split(`
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
function xu(t) {
  if (!t) return {};
  const n = `wpa_cli -i ${t} status 2>&1`;
  try {
    const e = Pt(n, E.execOptsLinux).toString().split(`
`),
      i = E.toInt(E.getValue(e, "freq", "="));
    return {
      ssid: E.getValue(e, "ssid", "="),
      uuid: E.getValue(e, "uuid", "="),
      security: E.getValue(e, "key_mgmt", "="),
      freq: i,
      channel: gu(i),
      bssid: E.getValue(e, "bssid", "=").toLowerCase(),
    };
  } catch {
    return {};
  }
}
function ko() {
  const t = [],
    n =
      "nmcli -t -m multiline --fields active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags device wifi list 2>/dev/null";
  try {
    const i = Pt(n, E.execOptsLinux).toString().split("ACTIVE:");
    return (
      i.shift(),
      i.forEach((s) => {
        s = "ACTIVE:" + s;
        const r = s.split(zn.EOL),
          o = E.getValue(r, "CHAN"),
          a = E.getValue(r, "FREQ").toLowerCase().replace("mhz", "").trim(),
          l = E.getValue(r, "SECURITY").replace("(", "").replace(")", ""),
          u = E.getValue(r, "WPA-FLAGS").replace("(", "").replace(")", ""),
          c = E.getValue(r, "RSN-FLAGS").replace("(", "").replace(")", ""),
          f = E.getValue(r, "SIGNAL");
        t.push({
          ssid: E.getValue(r, "SSID"),
          bssid: E.getValue(r, "BSSID").toLowerCase(),
          mode: E.getValue(r, "MODE"),
          channel: o ? parseInt(o, 10) : null,
          frequency: a ? parseInt(a, 10) : null,
          signalLevel: Hr(f),
          quality: f ? parseInt(f, 10) : null,
          security: l && l !== "none" ? l.split(" ") : [],
          wpaFlags: u && u !== "none" ? u.split(" ") : [],
          rsnFlags: c && c !== "none" ? c.split(" ") : [],
        });
      }),
      t
    );
  } catch {
    return [];
  }
}
function Es(t) {
  const n = [];
  try {
    let e = Pt(
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
              l = E.getValue(s, "frequency", ":", !0),
              c = E.getValue(s, "Quality", "=", !0)
                .toLowerCase()
                .split("signal level="),
              f = c.length > 1 ? E.toInt(c[1]) : 0,
              p = f ? Di(f) : 0,
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
                frequency: l ? E.toInt(l.replace(".", "")) : null,
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
function Su(t) {
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
          frequency: Xn(o),
          signalLevel: a ? parseInt(a, 10) : null,
          quality: Di(a),
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
function wu(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if ($r)
        if (((e = ko()), e.length === 0))
          try {
            const i = Pt(
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
              const l = Es(r);
              l === -1
                ? setTimeout(function (u) {
                    const c = Es(u);
                    (c != -1 && (e = c), t && t(e), n(e));
                  }, 4e3)
                : ((e = l), t && t(e), n(e));
            } else (t && t(e), n(e));
          } catch {
            (t && t(e), n(e));
          }
        else (t && t(e), n(e));
      else
        Ur
          ? Wr(
              "system_profiler SPAirPortDataType -json 2>/dev/null",
              { maxBuffer: 1024 * 4e4 },
              function (s, r) {
                ((e = Su(r.toString())), t && t(e), n(e));
              },
            )
          : zr
            ? E.powerShell("netsh wlan show networks mode=Bssid").then((s) => {
                const r = s.toString("utf8").split(zn.EOL + zn.EOL + "SSID ");
                (r.shift(),
                  r.forEach((o) => {
                    const a = o.split(zn.EOL);
                    if (a && a.length >= 8 && a[0].indexOf(":") >= 0) {
                      const l = o.split(" BSSID");
                      (l.shift(),
                        l.forEach((u) => {
                          const c = u.split(zn.EOL),
                            f = c[0].split(":");
                          f.shift();
                          const p = f.join(":").trim().toLowerCase(),
                            d = c[3].split(":").pop().trim(),
                            m = c[1].split(":").pop().trim();
                          e.push({
                            ssid: a[0].split(":").pop().trim(),
                            bssid: p,
                            mode: "",
                            channel: d ? parseInt(d, 10) : null,
                            frequency: Xn(d),
                            signalLevel: Hr(m),
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
Xi.wifiNetworks = wu;
function Cu(t) {
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
function Lu(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      const e = [];
      if ($r) {
        const i = Vo(),
          s = ko();
        (i.forEach((r) => {
          let o = "";
          const a = E.isPrototypePolluted()
              ? "---"
              : E.sanitizeShellString(r.iface, !0),
            l = E.mathMin(a.length, 2e3);
          for (let w = 0; w <= l; w++) a[w] !== void 0 && (o = o + a[w]);
          const u = No(o),
            c = xu(o),
            f = u.ssid || c.ssid,
            p = s.filter((w) => w.ssid === f);
          let d = "";
          const m = E.isPrototypePolluted()
              ? "---"
              : E.sanitizeShellString(f, !0),
            h = E.mathMin(m.length, 32);
          for (let w = 0; w <= h; w++) m[w] !== void 0 && (d = d + m[w]);
          const y = yu(d),
            g =
              p && p.length && p[0].channel
                ? p[0].channel
                : c.channel
                  ? c.channel
                  : null,
            x =
              p && p.length && p[0].bssid
                ? p[0].bssid
                : c.bssid
                  ? c.bssid
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
                  : c.bssid
                    ? c.bssid
                    : null,
              channel: g,
              frequency: g ? Xn(g) : null,
              type: y.type ? y.type : "802.11",
              security: y.security
                ? y.security
                : c.security
                  ? c.security
                  : null,
              signalLevel: S,
              quality: Di(S),
              txRate: null,
            });
        }),
          t && t(e),
          n(e));
      } else
        Ur
          ? Wr(
              'system_profiler SPNetworkDataType SPAirPortDataType -xml 2>/dev/null; echo "######" ; ioreg -n AppleBCMWLANSkywalkInterface -r 2>/dev/null',
              function (s, r) {
                try {
                  const o = r.toString().split("######"),
                    a = E.plistParser(o[0]),
                    l =
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
                  let c = [];
                  o[1].indexOf("  | {") > 0 &&
                    o[1].indexOf("  | }") > o[1].indexOf("  | {") &&
                    (c = o[1]
                      .split("  | {")[1]
                      .split("  | }")[0]
                      .replace(/ \| /g, "")
                      .replace(/"/g, "").split(`
`));
                  const f = l.find((g) => g._name === "Wi-Fi"),
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
                      frequency: d ? Xn(d) : null,
                      type: p.spairport_network_phymode || "802.11",
                      security: h,
                      signalLevel: m ? parseInt(m, 10) : null,
                      quality: Di(m),
                      txRate: p.spairport_network_rate || null,
                    }));
                } catch {
                  E.noop();
                }
                (t && t(e), n(e));
              },
            )
          : zr
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
                    const l = a.split(`\r
`);
                    if (l.length >= 5) {
                      const u =
                          l[0].indexOf(":") >= 0
                            ? l[0].split(":")[1].trim()
                            : "",
                        c =
                          l[1].indexOf(":") >= 0
                            ? l[1].split(":")[1].trim()
                            : "",
                        f =
                          l[2].indexOf(":") >= 0
                            ? l[2].split(":")[1].trim()
                            : "",
                        p = E.getValue(l, "SSID", ":", !0),
                        d =
                          E.getValue(l, "BSSID", ":", !0) ||
                          E.getValue(l, "AP BSSID", ":", !0),
                        m = E.getValue(l, "Signal", ":", !0),
                        h = Hr(m),
                        y =
                          E.getValue(l, "Radio type", ":", !0) ||
                          E.getValue(l, "Type de radio", ":", !0) ||
                          E.getValue(l, "Funktyp", ":", !0) ||
                          null,
                        g =
                          E.getValue(l, "authentication", ":", !0) ||
                          E.getValue(l, "Authentification", ":", !0) ||
                          E.getValue(l, "Authentifizierung", ":", !0) ||
                          null,
                        x =
                          E.getValue(l, "Channel", ":", !0) ||
                          E.getValue(l, "Canal", ":", !0) ||
                          E.getValue(l, "Kanal", ":", !0) ||
                          null,
                        S =
                          E.getValue(l, "Transmit rate (mbps)", ":", !0) ||
                          E.getValue(l, "Transmission (mbit/s)", ":", !0) ||
                          E.getValue(l, "Empfangsrate (MBit/s)", ":", !0) ||
                          null;
                      c &&
                        f &&
                        p &&
                        d &&
                        e.push({
                          id: f,
                          iface: u,
                          model: c,
                          ssid: p,
                          bssid: d,
                          channel: E.toInt(x),
                          frequency: x ? Xn(x) : null,
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
Xi.wifiConnections = Lu;
function Iu(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      const e = [];
      $r
        ? (Vo().forEach((s) => {
            const r = No(s.iface);
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
        : Ur
          ? Wr("system_profiler SPNetworkDataType", function (s, r) {
              const o = r.toString().split(`

    Wi-Fi:

`);
              if (o.length > 1) {
                const a = o[1].split(`

`)[0].split(`
`),
                  l = E.getValue(a, "BSD Device Name", ":", !0),
                  u = E.getValue(a, "MAC Address", ":", !0),
                  c = E.getValue(a, "hardware", ":", !0);
                e.push({
                  id: "Wi-Fi",
                  iface: l,
                  model: c,
                  vendor: "",
                  mac: u,
                });
              }
              (t && t(e), n(e));
            })
          : zr
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
                    const l = a.split(`\r
`);
                    if (l.length >= 5) {
                      const u =
                          l[0].indexOf(":") >= 0
                            ? l[0].split(":")[1].trim()
                            : "",
                        c =
                          l[1].indexOf(":") >= 0
                            ? l[1].split(":")[1].trim()
                            : "",
                        f =
                          l[2].indexOf(":") >= 0
                            ? l[2].split(":")[1].trim()
                            : "",
                        p = l[3].indexOf(":") >= 0 ? l[3].split(":") : [];
                      p.shift();
                      const d = p.join(":").trim(),
                        m = Cu(c);
                      u &&
                        c &&
                        f &&
                        d &&
                        e.push({
                          id: f,
                          iface: u,
                          model: c,
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
Xi.wifiInterfaces = Iu;
var Yi = {};
const bi = Ae,
  _u = be,
  vu = se,
  Yn = oe.exec,
  lr = oe.execSync,
  G = V;
let Et = process.platform;
const qe = Et === "linux" || Et === "android",
  Jt = Et === "darwin",
  jr = Et === "win32",
  Jn = Et === "freebsd",
  Qn = Et === "openbsd",
  Zn = Et === "netbsd",
  yi = Et === "sunos",
  me = {
    all: 0,
    all_utime: 0,
    all_stime: 0,
    list: {},
    ms: 0,
    result: {},
  },
  dn = {
    all: 0,
    list: {},
    ms: 0,
    result: {},
  },
  Me = {
    all: 0,
    all_utime: 0,
    all_stime: 0,
    list: {},
    ms: 0,
    result: {},
  },
  Ms = {
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
function Ou(t) {
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
function Pu(t) {
  let n = /* @__PURE__ */ new Date();
  n = new Date(n.getTime() - n.getTimezoneOffset() * 6e4);
  const e = t.split("-"),
    i = e.length - 1,
    s = i > 0 ? parseInt(e[i - 1]) : 0,
    r = e[i].split(":"),
    o = r.length === 3 ? parseInt(r[0] || 0) : 0,
    a = parseInt(r[r.length === 3 ? 1 : 0] || 0),
    l = parseInt(r[r.length === 3 ? 2 : 1] || 0),
    u = (((s * 24 + o) * 60 + a) * 60 + l) * 1e3;
  let c = new Date(n.getTime()),
    f =
      c.toISOString().substring(0, 10) +
      " " +
      c.toISOString().substring(11, 19);
  try {
    ((c = new Date(n.getTime() - u)),
      (f =
        c.toISOString().substring(0, 10) +
        " " +
        c.toISOString().substring(11, 19)));
  } catch {
    G.noop();
  }
  return f;
}
function Eu(t, n) {
  return (
    G.isFunction(t) && !n && ((n = t), (t = "")),
    new Promise((e) => {
      process.nextTick(() => {
        if (typeof t != "string") return (n && n([]), e([]));
        if (t) {
          let i = "";
          try {
            ((i.__proto__.toLowerCase = G.stringToLower),
              (i.__proto__.replace = G.stringReplace),
              (i.__proto__.toString = G.stringToString),
              (i.__proto__.substr = G.stringSubstr),
              (i.__proto__.substring = G.stringSubstring),
              (i.__proto__.trim = G.stringTrim),
              (i.__proto__.startsWith = G.stringStartWith));
          } catch {
            Object.setPrototypeOf(i, G.stringObj);
          }
          const s = G.sanitizeShellString(t),
            r = G.mathMin(s.length, 2e3);
          for (let u = 0; u <= r; u++) s[u] !== void 0 && (i = i + s[u]);
          ((i = i.trim().toLowerCase().replace(/, /g, "|").replace(/,+/g, "|")),
            i === "" && (i = "*"),
            G.isPrototypePolluted() && i !== "*" && (i = "------"));
          let o = i.split("|"),
            a = [],
            l = [];
          if (qe || Jn || Qn || Zn || Jt) {
            if ((qe || Jn || Qn || Zn) && i === "*")
              try {
                const c = lr(
                  "systemctl --all --type=service --no-legend 2> /dev/null",
                  G.execOptsLinux,
                ).toString().split(`
`);
                o = [];
                for (const f of c) {
                  const p = f.split(".service")[0];
                  p && f.indexOf(" not-found ") === -1 && o.push(p.trim());
                }
                i = o.join("|");
              } catch {
                try {
                  i = "";
                  const f = lr(
                    "service --status-all 2> /dev/null",
                    G.execOptsLinux,
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
                    const p = lr(
                      "ls /etc/init.d/ -m 2> /dev/null",
                      G.execOptsLinux,
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
            Jt && i === "*" && (n && n(a), e(a));
            let u = Jt
              ? ["-caxo", "pcpu,pmem,pid,command"]
              : ["-axo", "pcpu,pmem,pid,command"];
            i !== "" && o.length > 0
              ? G.execSafe("ps", u).then((c) => {
                  if (c) {
                    let f = c.replace(/ +/g, " ").replace(/,+/g, ".").split(`
`);
                    if (
                      (o.forEach(function (p) {
                        let d;
                        Jt
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
                      qe)
                    ) {
                      let p = 'cat /proc/stat | grep "cpu "';
                      for (let d in a)
                        for (let m in a[d].pids)
                          p += ";cat /proc/" + a[d].pids[m] + "/stat";
                      Yn(p, { maxBuffer: 1024 * 2e4 }, function (d, m) {
                        let h = m.toString().split(`
`),
                          y = Kr(h.shift()),
                          g = {},
                          x = {};
                        (h.forEach((S) => {
                          if (((x = Xr(S, y, dn)), x.pid)) {
                            let w = -1;
                            for (let C in a)
                              for (let R in a[C].pids)
                                parseInt(a[C].pids[R]) === parseInt(x.pid) &&
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
                          (dn.all = y),
                          (dn.list = Object.assign({}, g)),
                          (dn.ms = Date.now() - dn.ms),
                          (dn.result = Object.assign({}, a)),
                          n && n(a),
                          e(a));
                      });
                    } else (n && n(a), e(a));
                  } else
                    ((u = ["-o", "comm"]),
                      G.execSafe("ps", u).then((f) => {
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
          if (jr)
            try {
              let u = "Get-CimInstance Win32_Service";
              (o[0] !== "*" &&
                ((u += ' -Filter "'),
                o.forEach((c) => {
                  u += `Name='${c}' or `;
                }),
                (u = `${u.slice(0, -4)}"`)),
                (u +=
                  " | select Name,Caption,Started,StartMode,ProcessId | fl"),
                G.powerShell(u).then((c, f) => {
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
                    : (c.split(/\n\s*\n/).forEach((d) => {
                        if (d.trim() !== "") {
                          let m = d.trim().split(`\r
`),
                            h = G.getValue(m, "Name", ":", !0).toLowerCase(),
                            y = G.getValue(m, "Caption", ":", !0).toLowerCase(),
                            g = G.getValue(m, "Started", ":", !0),
                            x = G.getValue(m, "StartMode", ":", !0),
                            S = G.getValue(m, "ProcessId", ":", !0);
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
                            l.push(h),
                            l.push(y));
                        }
                      }),
                      i !== "*" &&
                        o
                          .filter(function (m) {
                            return l.indexOf(m) === -1;
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
Yi.services = Eu;
function Kr(t) {
  let n = t.replace(/ +/g, " ").split(" "),
    e = n.length >= 2 ? parseInt(n[1]) : 0,
    i = n.length >= 3 ? parseInt(n[2]) : 0,
    s = n.length >= 4 ? parseInt(n[3]) : 0,
    r = n.length >= 5 ? parseInt(n[4]) : 0,
    o = n.length >= 6 ? parseInt(n[5]) : 0,
    a = n.length >= 7 ? parseInt(n[6]) : 0,
    l = n.length >= 8 ? parseInt(n[7]) : 0,
    u = n.length >= 9 ? parseInt(n[8]) : 0,
    c = n.length >= 10 ? parseInt(n[9]) : 0,
    f = n.length >= 11 ? parseInt(n[10]) : 0;
  return e + i + s + r + o + a + l + u + c + f;
}
function Xr(t, n, e) {
  let i = t.replace(/ +/g, " ").split(")");
  if (i.length >= 2) {
    let s = i[1].split(" ");
    if (s.length >= 16) {
      let r = parseInt(i[0].split(" ")[0]),
        o = parseInt(s[12]),
        a = parseInt(s[13]),
        l = parseInt(s[14]),
        u = parseInt(s[15]),
        c = 0,
        f = 0;
      return (
        e.all > 0 && e.list[r]
          ? ((c =
              ((o + l - e.list[r].utime - e.list[r].cutime) / (n - e.all)) *
              100),
            (f =
              ((a + u - e.list[r].stime - e.list[r].cstime) / (n - e.all)) *
              100))
          : ((c = ((o + l) / n) * 100), (f = ((a + u) / n) * 100)),
        {
          pid: r,
          utime: o,
          stime: a,
          cutime: l,
          cstime: u,
          cpuu: c,
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
function Bo(t, n, e) {
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
function Mu(t) {
  let n = [];
  function e(o) {
    o = o || "";
    let a = o.split(" ")[0];
    if (
      (a.substr(-1) === ":" && (a = a.substr(0, a.length - 1)),
      a.substr(0, 1) !== "[")
    ) {
      let l = a.split("/");
      isNaN(parseInt(l[l.length - 1])) ? (a = l[l.length - 1]) : (a = l[0]);
    }
    return a;
  }
  function i(o) {
    let a = 0,
      l = 0;
    function u(D) {
      ((a = l),
        n[D] ? (l = o.substring(n[D].to + a, 1e4).indexOf(" ")) : (l = 1e4));
    }
    u(0);
    const c = parseInt(o.substring(n[0].from + a, n[0].to + l));
    u(1);
    const f = parseInt(o.substring(n[1].from + a, n[1].to + l));
    u(2);
    const p = parseFloat(
      o.substring(n[2].from + a, n[2].to + l).replace(/,/g, "."),
    );
    u(3);
    const d = parseFloat(
      o.substring(n[3].from + a, n[3].to + l).replace(/,/g, "."),
    );
    u(4);
    const m = parseInt(o.substring(n[4].from + a, n[4].to + l));
    u(5);
    const h = parseInt(o.substring(n[5].from + a, n[5].to + l));
    u(6);
    const y = parseInt(o.substring(n[6].from + a, n[6].to + l));
    u(7);
    const g = parseInt(o.substring(n[7].from + a, n[7].to + l)) || 0;
    u(8);
    const x = yi
      ? Ou(o.substring(n[8].from + a, n[8].to + l).trim())
      : Pu(o.substring(n[8].from + a, n[8].to + l).trim());
    u(9);
    let S = o.substring(n[9].from + a, n[9].to + l).trim();
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
    let w = o.substring(n[10].from + a, n[10].to + l).trim();
    ((w === "?" || w === "??") && (w = ""), u(11));
    const C = o.substring(n[11].from + a, n[11].to + l).trim();
    u(12);
    let R = "",
      T = "",
      K = "",
      L = o.substring(n[12].from + a, n[12].to + l).trim();
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
        const q = Math.min(ee, F);
        let N = L.substr(0, q);
        const H = L.substr(q),
          b = N.lastIndexOf("/");
        if (
          (b >= 0 && ((R = N.substr(0, b)), (N = N.substr(b + 1))),
          q === 1e4 && N.indexOf(" ") > -1)
        ) {
          const $ = N.split(" ");
          _u.existsSync(vu.join(R, $[0]))
            ? ((T = $.shift()), (K = ($.join(" ") + " " + H).trim()))
            : ((T = N.trim()), (K = H.trim()));
        } else ((T = N.trim()), (K = H.trim()));
      }
    }
    return {
      pid: c,
      parentPid: f,
      name: qe ? e(T) : T,
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
      path: R,
    };
  }
  function s(o) {
    let a = [];
    if (o.length > 1) {
      let l = o[0];
      ((n = G.parseHead(l, 8)),
        o.shift(),
        o.forEach(function (u) {
          u.trim() !== "" && a.push(i(u));
        }));
    }
    return a;
  }
  function r(o) {
    function a(c) {
      const f = ("0" + (c.getMonth() + 1).toString()).slice(-2),
        p = c.getFullYear().toString(),
        d = ("0" + c.getDate().toString()).slice(-2),
        m = ("0" + c.getHours().toString()).slice(-2),
        h = ("0" + c.getMinutes().toString()).slice(-2),
        y = ("0" + c.getSeconds().toString()).slice(-2);
      return p + "-" + f + "-" + d + " " + m + ":" + h + ":" + y;
    }
    function l(c) {
      let f = "";
      if (c.indexOf("d") >= 0) {
        const p = c.split("d");
        f = a(new Date(Date.now() - (p[0] * 24 + p[1] * 1) * 60 * 60 * 1e3));
      } else if (c.indexOf("h") >= 0) {
        const p = c.split("h");
        f = a(new Date(Date.now() - (p[0] * 60 + p[1] * 1) * 60 * 1e3));
      } else if (c.indexOf(":") >= 0) {
        const p = c.split(":");
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
      o.forEach(function (c) {
        if (c.trim() !== "") {
          c = c.trim().replace(/ +/g, " ").replace(/,+/g, ".");
          const f = c.split(" "),
            p = f.slice(9).join(" "),
            d = parseFloat(
              ((1 * parseInt(f[3]) * 1024) / bi.totalmem()).toFixed(1),
            ),
            m = l(f[5]);
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
        l = "";
      if ((me.ms && Date.now() - me.ms >= 500) || me.ms === 0)
        if (qe || Jn || Qn || Zn || Jt || yi)
          (qe &&
            (l =
              "export LC_ALL=C; ps -axo pid:11,ppid:11,pcpu:6,pmem:6,pri:5,vsz:11,rss:11,ni:5,etime:30,state:5,tty:15,user:20,command; unset LC_ALL"),
            (Jn || Qn || Zn) &&
              (l =
                "export LC_ALL=C; ps -axo pid,ppid,pcpu,pmem,pri,vsz,rss,ni,etime,state,tty,user,command; unset LC_ALL"),
            Jt &&
              (l =
                "ps -axo pid,ppid,pcpu,pmem,pri,vsz=temp_title_1,rss=temp_title_2,nice,etime=temp_title_3,state,tty,user,command -r"),
            yi &&
              (l =
                "ps -Ao pid,ppid,pcpu,pmem,pri,vsz,rss,nice,stime,s,tty,user,comm"),
            Yn(l, { maxBuffer: 1024 * 2e4 }, function (u, c) {
              !u && c.toString().trim()
                ? ((a.list = s(
                    c.toString().split(`
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
                  qe
                    ? ((l = 'cat /proc/stat | grep "cpu "'),
                      a.list.forEach((f) => {
                        l += ";cat /proc/" + f.pid + "/stat";
                      }),
                      Yn(l, { maxBuffer: 1024 * 2e4 }, function (f, p) {
                        let d = p.toString().split(`
`),
                          m = Kr(d.shift()),
                          h = {},
                          y = {};
                        (d.forEach((g) => {
                          if (((y = Xr(g, m, me)), y.pid)) {
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
                          (me.all = m),
                          (me.list = Object.assign({}, h)),
                          (me.ms = Date.now() - me.ms),
                          (me.result = Object.assign({}, a)),
                          t && t(a),
                          o(a));
                      }))
                    : (t && t(a), o(a)))
                : ((l = "ps -o pid,ppid,vsz,rss,nice,etime,stat,tty,user,comm"),
                  yi &&
                    (l = "ps -o pid,ppid,vsz,rss,nice,etime,s,tty,user,comm"),
                  Yn(l, { maxBuffer: 1024 * 2e4 }, function (f, p) {
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
        else if (jr)
          try {
            G.powerShell(
              'Get-CimInstance Win32_Process | select-Object ProcessId,ParentProcessId,ExecutionState,Caption,CommandLine,ExecutablePath,UserModeTime,KernelModeTime,WorkingSetSize,Priority,PageFileUsage, @{n="CreationDate";e={$_.CreationDate.ToString("yyyy-MM-dd HH:mm:ss")}} | fl',
            ).then((u, c) => {
              if (!c) {
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
                      S = parseInt(G.getValue(x, "ProcessId", ":", !0), 10),
                      w = parseInt(
                        G.getValue(x, "ParentProcessId", ":", !0),
                        10,
                      ),
                      C = G.getValue(x, "ExecutionState", ":"),
                      R = G.getValue(x, "Caption", ":", !0),
                      T = G.getValue(x, "CommandLine", ":", !0),
                      K = !1;
                    x.forEach((Q) => {
                      (K && Q.toLowerCase().startsWith(" ")
                        ? (T += " " + Q.trim())
                        : (K = !1),
                        Q.toLowerCase().startsWith("commandline") && (K = !0));
                    });
                    let L = G.getValue(x, "ExecutablePath", ":", !0),
                      D = parseInt(G.getValue(x, "UserModeTime", ":", !0), 10),
                      O = parseInt(
                        G.getValue(x, "KernelModeTime", ":", !0),
                        10,
                      ),
                      X = parseInt(
                        G.getValue(x, "WorkingSetSize", ":", !0),
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
                        name: R,
                        cpu: 0,
                        cpuu: 0,
                        cpus: 0,
                        mem: (X / bi.totalmem()) * 100,
                        priority: parseInt(
                          G.getValue(x, "Priority", ":", !0),
                          10,
                        ),
                        memVsz: parseInt(
                          G.getValue(x, "PageFileUsage", ":", !0),
                          10,
                        ),
                        memRss: Math.floor(
                          parseInt(
                            G.getValue(x, "WorkingSetSize", ":", !0),
                            10,
                          ) / 1024,
                        ),
                        nice: 0,
                        started: G.getValue(x, "CreationDate", ":", !0),
                        state: C ? Ms[C] : Ms[0],
                        tty: "",
                        user: "",
                        command: T || R,
                        path: L,
                        params: "",
                      }));
                  }
                }),
                  (a.sleeping = a.all - a.running - a.blocked - a.unknown),
                  (a.list = p),
                  d.forEach((g) => {
                    let x = Bo(g, h + y, me),
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
                  (me.all = h + y),
                  (me.all_utime = h),
                  (me.all_stime = y),
                  (me.list = Object.assign({}, m)),
                  (me.ms = Date.now() - me.ms),
                  (me.result = Object.assign({}, a)));
              }
              (t && t(a), o(a));
            });
          } catch {
            (t && t(a), o(a));
          }
        else (t && t(a), o(a));
      else (t && t(me.result), o(me.result));
    });
  });
}
Yi.processes = Mu;
function Au(t, n) {
  return (
    G.isFunction(t) && !n && ((n = t), (t = "")),
    new Promise((e) => {
      process.nextTick(() => {
        if (((t = t || ""), typeof t != "string")) return (n && n([]), e([]));
        let i = "";
        try {
          ((i.__proto__.toLowerCase = G.stringToLower),
            (i.__proto__.replace = G.stringReplace),
            (i.__proto__.toString = G.stringToString),
            (i.__proto__.substr = G.stringSubstr),
            (i.__proto__.substring = G.stringSubstring),
            (i.__proto__.trim = G.stringTrim),
            (i.__proto__.startsWith = G.stringStartWith));
        } catch {
          Object.setPrototypeOf(i, G.stringObj);
        }
        const s = G.sanitizeShellString(t),
          r = G.mathMin(s.length, 2e3);
        for (let u = 0; u <= r; u++) s[u] !== void 0 && (i = i + s[u]);
        ((i = i.trim().toLowerCase().replace(/, /g, "|").replace(/,+/g, "|")),
          i === "" && (i = "*"),
          G.isPrototypePolluted() && i !== "*" && (i = "------"));
        let o = i.split("|"),
          a = [];
        if (
          (G.isPrototypePolluted() ? "" : G.sanitizeShellString(t) || "*") &&
          o.length &&
          o[0] !== "------"
        ) {
          if (jr)
            try {
              G.powerShell(
                "Get-CimInstance Win32_Process | select ProcessId,Caption,UserModeTime,KernelModeTime,WorkingSetSize | fl",
              ).then((u, c) => {
                if (!c) {
                  let f = u.split(/\n\s*\n/),
                    p = [],
                    d = {},
                    m = 0,
                    h = 0;
                  (f.forEach((y) => {
                    if (y.trim() !== "") {
                      let g = y.trim().split(`\r
`),
                        x = parseInt(G.getValue(g, "ProcessId", ":", !0), 10),
                        S = G.getValue(g, "Caption", ":", !0),
                        w = parseInt(
                          G.getValue(g, "UserModeTime", ":", !0),
                          10,
                        ),
                        C = parseInt(
                          G.getValue(g, "KernelModeTime", ":", !0),
                          10,
                        ),
                        R = parseInt(
                          G.getValue(g, "WorkingSetSize", ":", !0),
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
                          mem: R,
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
                            (D.mem += (R / bi.totalmem()) * 100),
                            (L = !0));
                        }),
                          L ||
                            a.push({
                              proc: T,
                              pid: x,
                              pids: [x],
                              cpu: 0,
                              mem: (R / bi.totalmem()) * 100,
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
                      let g = Bo(y, m + h, Me),
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
                    (Me.all = m + h),
                    (Me.all_utime = m),
                    (Me.all_stime = h),
                    (Me.list = Object.assign({}, d)),
                    (Me.ms = Date.now() - Me.ms),
                    (Me.result = JSON.parse(JSON.stringify(a))),
                    n && n(a),
                    e(a));
                }
              });
            } catch {
              (n && n(a), e(a));
            }
          if (Jt || qe || Jn || Qn || Zn) {
            const u = ["-axo", "pid,ppid,pcpu,pmem,comm"];
            G.execSafe("ps", u).then((c) => {
              if (c) {
                let f = [],
                  p = c
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
                        y = qe ? h : m[4].substring(m[4].lastIndexOf("/") + 1);
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
                  qe)
                ) {
                  a.forEach(function (m) {
                    m.cpu = 0;
                  });
                  let d = 'cat /proc/stat | grep "cpu "';
                  for (let m in a)
                    for (let h in a[m].pids)
                      d += ";cat /proc/" + a[m].pids[h] + "/stat";
                  Yn(d, { maxBuffer: 1024 * 2e4 }, function (m, h) {
                    let y = h.toString().split(`
`),
                      g = Kr(y.shift()),
                      x = {},
                      S = {};
                    (y.forEach((w) => {
                      if (((S = Xr(w, g, Me)), S.pid)) {
                        let C = -1;
                        for (let R in a)
                          a[R].pids.indexOf(S.pid) >= 0 && (C = R);
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
                      (Me.all = g),
                      (Me.list = Object.assign({}, x)),
                      (Me.ms = Date.now() - Me.ms),
                      (Me.result = Object.assign({}, a)),
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
Yi.processLoad = Au;
var Fo = {};
const Bn = oe.exec,
  it = V;
let Mt = process.platform;
const Tu = Mt === "linux" || Mt === "android",
  Du = Mt === "darwin",
  bu = Mt === "win32",
  Vu = Mt === "freebsd",
  Nu = Mt === "openbsd",
  ku = Mt === "netbsd",
  Bu = Mt === "sunos";
function As(t, n) {
  let e = [],
    i = [],
    s = {},
    r = !0,
    o = [],
    a = [],
    l = {},
    u = !0;
  return (
    t.forEach(function (c) {
      if (c === "---") u = !1;
      else {
        let f = c.replace(/ +/g, " ").split(" ");
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
                a.push(c.indexOf(p));
              }),
              (r = !1))
            : ((s.user = c.substring(a[0], a[1] - 1).trim()),
              (s.tty = c.substring(a[1], a[2] - 1).trim()),
              (s.ip = c
                .substring(a[2], a[3] - 1)
                .replace(/\(/g, "")
                .replace(/\)/g, "")
                .trim()),
              (s.command = c.substring(a[7], 1e3).trim()),
              (l = i.filter(function (p) {
                return (
                  p.user.substring(0, 8).trim() === s.user && p.tty === s.tty
                );
              })),
              l.length === 1 &&
                e.push({
                  user: l[0].user,
                  tty: l[0].tty,
                  date: l[0].date,
                  time: l[0].time,
                  ip: l[0].ip,
                  command: s.command,
                }));
      }
    }),
    e.length === 0 && n === 2 ? i : e
  );
}
function cr(t) {
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
          let l =
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
            new Date(l) > /* @__PURE__ */ new Date() &&
              (l =
                "" +
                (/* @__PURE__ */ new Date().getFullYear() - 1) +
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
            it.noop();
          }
          e.push({
            user: a[0],
            tty: a[1],
            date: l,
            time: a[4],
          });
        } else
          ((i.user = a[0]),
            (i.tty = a[1]),
            (i.ip = a[2] !== "-" ? a[2] : ""),
            (i.command = a.slice(5, 1e3).join(" ")),
            (s = e.filter(function (l) {
              return (
                l.user.substring(0, 10) === i.user.substring(0, 10) &&
                (l.tty.substring(3, 1e3) === i.tty || l.tty === i.tty)
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
function Fu(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (
        (Tu &&
          Bn(
            'export LC_ALL=C; who --ips; echo "---"; w; unset LC_ALL | tail -n +2',
            function (i, s) {
              if (i) (t && t(e), n(e));
              else {
                let r = s.toString().split(`
`);
                ((e = As(r, 1)),
                  e.length === 0
                    ? Bn('who; echo "---"; w | tail -n +2', function (o, a) {
                        (o ||
                          ((r = a.toString().split(`
`)),
                          (e = As(r, 2))),
                          t && t(e),
                          n(e));
                      })
                    : (t && t(e), n(e)));
              }
            },
          ),
        (Vu || Nu || ku) &&
          Bn('who; echo "---"; w -ih', function (i, s) {
            if (!i) {
              let r = s.toString().split(`
`);
              e = cr(r);
            }
            (t && t(e), n(e));
          }),
        Bu &&
          Bn('who; echo "---"; w -h', function (i, s) {
            if (!i) {
              let r = s.toString().split(`
`);
              e = cr(r);
            }
            (t && t(e), n(e));
          }),
        Du &&
          Bn(
            'export LC_ALL=C; who; echo "---"; w -ih; unset LC_ALL',
            function (i, s) {
              if (!i) {
                let r = s.toString().split(`
`);
                e = cr(r);
              }
              (t && t(e), n(e));
            },
          ),
        bu)
      )
        try {
          let i = `Get-CimInstance Win32_LogonSession | select LogonId,@{n="StartTime";e={$_.StartTime.ToString("yyyy-MM-dd HH:mm:ss")}} | fl; echo '#-#-#-#';`;
          ((i +=
            "Get-CimInstance Win32_LoggedOnUser | select antecedent,dependent | fl ; echo '#-#-#-#';"),
            (i += `$process = (Get-CimInstance Win32_Process -Filter "name = 'explorer.exe'"); Invoke-CimMethod -InputObject $process[0] -MethodName GetOwner | select user, domain | fl; get-process -name explorer | select-object sessionid | fl; echo '#-#-#-#';`),
            (i += "query user"),
            it.powerShell(i).then((s) => {
              if (s) {
                s = s.split("#-#-#-#");
                let r = Ru((s[0] || "").split(/\n\s*\n/)),
                  o = $u((s[1] || "").split(/\n\s*\n/)),
                  a = Uu(
                    (s[3] || "").split(`\r
`),
                  ),
                  l = Wu((s[2] || "").split(/\n\s*\n/), a);
                for (let u in o)
                  ({}).hasOwnProperty.call(o, u) &&
                    (o[u].dateTime = {}.hasOwnProperty.call(r, u) ? r[u] : "");
                l.forEach((u) => {
                  let c = "";
                  for (let f in o)
                    ({}).hasOwnProperty.call(o, f) &&
                      o[f].user === u.user &&
                      (!c || c < o[f].dateTime) &&
                      (c = o[f].dateTime);
                  e.push({
                    user: u.user,
                    tty: u.tty,
                    date: `${c.substring(0, 10)}`,
                    time: `${c.substring(11, 19)}`,
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
function Ru(t) {
  const n = {};
  return (
    t.forEach((e) => {
      const i = e.split(`\r
`),
        s = it.getValue(i, "LogonId"),
        r = it.getValue(i, "starttime");
      s && (n[s] = r);
    }),
    n
  );
}
function Gu(t, n) {
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
function Wu(t, n) {
  const e = [];
  return (
    t.forEach((i) => {
      const s = i.split(`\r
`),
        r = it.getValue(s, "domain", ":", !0),
        o = it.getValue(s, "user", ":", !0),
        a = it.getValue(s, "sessionid", ":", !0);
      if (o) {
        const l = n.filter((u) => Gu(u.user, o));
        e.push({
          domain: r,
          user: o,
          tty: l && l[0] && l[0].tty ? l[0].tty : a,
        });
      }
    }),
    e
  );
}
function $u(t) {
  const n = {};
  return (
    t.forEach((e) => {
      const i = e.split(`\r
`);
      let r = it.getValue(i, "antecedent", ":", !0).split("=");
      const o = r.length > 2 ? r[1].split(",")[0].replace(/"/g, "").trim() : "",
        a =
          r.length > 2 ? r[2].replace(/"/g, "").replace(/\)/g, "").trim() : "";
      r = it.getValue(i, "dependent", ":", !0).split("=");
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
function Uu(t) {
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
          l = t[o].substring(i[1] + 1, i[2] - 2).trim() || "";
        n.push({
          user: a,
          tty: l,
        });
      }
  }
  return n;
}
Fo.users = Fu;
var Yr = {};
const fe = V;
let At = process.platform;
const Ts = At === "linux" || At === "android",
  Ds = At === "darwin",
  zu = At === "win32",
  bs = At === "freebsd",
  Vs = At === "openbsd",
  Ns = At === "netbsd",
  Hu = At === "sunos";
function ju(t, n) {
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
      const r = fe.sanitizeShellString(t, !0),
        o = fe.mathMin(r.length, 2e3);
      for (let a = 0; a <= o; a++)
        if (r[a] !== void 0) {
          try {
            r[a].__proto__.toLowerCase = fe.stringToLower;
          } catch {
            Object.setPrototypeOf(r[a], fe.stringObj);
          }
          const l = r[a].toLowerCase();
          l && l[0] && !l[1] && l[0].length === 1 && (s = s + l[0]);
        }
      i.url = s;
      try {
        if (s && !fe.isPrototypePolluted()) {
          try {
            s.__proto__.startsWith = fe.stringStartWith;
          } catch {
            Object.setPrototypeOf(s, fe.stringObj);
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
          fe.checkWebsite(s).then((a) => {
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
Yr.inetChecksite = ju;
function Ku(t, n) {
  return (
    fe.isFunction(t) && !n && ((n = t), (t = "")),
    (t = t || "8.8.8.8"),
    new Promise((e) => {
      process.nextTick(() => {
        if (typeof t != "string") return (n && n(null), e(null));
        let i = "";
        const s = (
            fe.isPrototypePolluted() ? "8.8.8.8" : fe.sanitizeShellString(t, !0)
          ).trim(),
          r = fe.mathMin(s.length, 2e3);
        for (let a = 0; a <= r; a++)
          if (s[a] !== void 0) {
            try {
              s[a].__proto__.toLowerCase = fe.stringToLower;
            } catch {
              Object.setPrototypeOf(s[a], fe.stringObj);
            }
            const l = s[a].toLowerCase();
            l && l[0] && !l[1] && (i = i + l[0]);
          }
        try {
          i.__proto__.startsWith = fe.stringStartWith;
        } catch {
          Object.setPrototypeOf(i, fe.stringObj);
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
          ((Ts || bs || Vs || Ns || Ds) &&
            (Ts && (o = ["-c", "2", "-w", "3", i]),
            (bs || Vs || Ns) && (o = ["-c", "2", "-t", "3", i]),
            Ds && (o = ["-c2", "-t3", i]),
            fe.execSafe("ping", o).then((a) => {
              let l = null;
              if (a) {
                const c = a
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
                if (c.length > 1) {
                  const f = c[1].split("/");
                  f.length > 1 && (l = parseFloat(f[1]));
                }
              }
              (n && n(l), e(l));
            })),
          Hu)
        ) {
          const a = ["-s", "-a", i, "56", "2"],
            l = "avg";
          fe.execSafe("ping", a, { timeout: 3e3 }).then((u) => {
            let c = null;
            if (u) {
              const p = u
                .split(
                  `
`,
                )
                .filter((d) => d.indexOf(l) >= 0)
                .join(
                  `
`,
                )
                .split("=");
              if (p.length > 1) {
                const d = p[1].split("/");
                d.length > 1 && (c = parseFloat(d[1].replace(",", ".")));
              }
            }
            (n && n(c), e(c));
          });
        }
        if (zu) {
          let a = null;
          try {
            const l = [i, "-n", "1"];
            fe.execSafe("ping", l, fe.execOptsWin).then((u) => {
              if (u) {
                let c = u.split(`\r
`);
                (c.shift(),
                  c.forEach(function (f) {
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
Yr.inetLatency = Ku;
var Bt = {};
const ot = Ua,
  Xu = Ae.type() === "Windows_NT",
  at = Xu ? "//./pipe/docker_engine" : "/var/run/docker.sock";
let Yu = class {
  getInfo(n) {
    try {
      let e = ot.createConnection({ path: at }),
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
      let i = ot.createConnection({ path: at }),
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
        let i = ot.createConnection({ path: at }),
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
      let i = ot.createConnection({ path: at }),
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
        let i = ot.createConnection({ path: at }),
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
        let i = ot.createConnection({ path: at }),
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
        let i = ot.createConnection({ path: at }),
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
      let e = ot.createConnection({ path: at }),
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
var qu = Yu;
const ce = V,
  Ft = qu;
let Ju = process.platform;
const Qu = Ju === "win32";
let mn = {},
  ue,
  ur = 0;
function Zu(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      ue || (ue = new Ft());
      const e = {};
      ue.getInfo((i) => {
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
Bt.dockerInfo = Zu;
function e0(t, n) {
  (ce.isFunction(t) && !n && ((n = t), (t = !1)),
    typeof t == "string" && t === "true" && (t = !0),
    typeof t != "boolean" && t !== void 0 && (t = !1),
    (t = t || !1));
  let e = [];
  return new Promise((i) => {
    process.nextTick(() => {
      ue || (ue = new Ft());
      const s = [];
      ue.listImages(t, (r) => {
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
                    s.push(t0(a.Id.trim(), a)));
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
function t0(t, n) {
  return new Promise((e) => {
    process.nextTick(() => {
      if (((t = t || ""), typeof t != "string")) return e();
      const i = (
        ce.isPrototypePolluted() ? "" : ce.sanitizeShellString(t, !0)
      ).trim();
      i
        ? (ue || (ue = new Ft()),
          ue.inspectImage(i.trim(), (s) => {
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
Bt.dockerImages = e0;
function qr(t, n) {
  function e(s, r) {
    return s.filter((a) => a.Id && a.Id === r).length > 0;
  }
  (ce.isFunction(t) && !n && ((n = t), (t = !1)),
    typeof t == "string" && t === "true" && (t = !0),
    typeof t != "boolean" && t !== void 0 && (t = !1),
    (t = t || !1));
  let i = [];
  return new Promise((s) => {
    process.nextTick(() => {
      ue || (ue = new Ft());
      const r = [];
      ue.listContainers(t, (o) => {
        let a = {};
        try {
          if (
            ((a = o),
            a &&
              Object.prototype.toString.call(a) === "[object Array]" &&
              a.length > 0)
          ) {
            for (let l in mn)
              ({}).hasOwnProperty.call(mn, l) && (e(a, l) || delete mn[l]);
            (a.forEach(function (l) {
              (l.Names &&
                Object.prototype.toString.call(l.Names) === "[object Array]" &&
                l.Names.length > 0 &&
                (l.Name = l.Names[0].replace(/^\/|\/$/g, "")),
                r.push(n0(l.Id.trim(), l)));
            }),
              r.length
                ? Promise.all(r).then((l) => {
                    (n && n(l), s(l));
                  })
                : (n && n(i), s(i)));
          } else (n && n(i), s(i));
        } catch {
          for (let u in mn)
            ({}).hasOwnProperty.call(mn, u) && (e(a, u) || delete mn[u]);
          (n && n(i), s(i));
        }
      });
    });
  });
}
function n0(t, n) {
  return new Promise((e) => {
    process.nextTick(() => {
      if (((t = t || ""), typeof t != "string")) return e();
      const i = (
        ce.isPrototypePolluted() ? "" : ce.sanitizeShellString(t, !0)
      ).trim();
      i
        ? (ue || (ue = new Ft()),
          ue.getInspect(i.trim(), (s) => {
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
Bt.dockerContainers = qr;
function i0(t, n) {
  if (Qu) {
    let e = ce.nanoSeconds(),
      i = 0;
    if (ur > 0) {
      let s = e - ur,
        r = t.cpu_usage.total_usage - n.cpu_usage.total_usage;
      s > 0 && (i = (100 * r) / s);
    }
    return ((ur = e), i);
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
function r0(t) {
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
function s0(t) {
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
function Jr(t, n) {
  let e = [];
  return new Promise((i) => {
    process.nextTick(() => {
      if (ce.isFunction(t) && !n) ((n = t), (e = ["*"]));
      else {
        if (((t = t || "*"), typeof t != "string")) return (n && n([]), i([]));
        let o = "";
        try {
          ((o.__proto__.toLowerCase = ce.stringToLower),
            (o.__proto__.replace = ce.stringReplace),
            (o.__proto__.toString = ce.stringToString),
            (o.__proto__.substr = ce.stringSubstr),
            (o.__proto__.substring = ce.stringSubstring),
            (o.__proto__.trim = ce.stringTrim),
            (o.__proto__.startsWith = ce.stringStartWith));
        } catch {
          Object.setPrototypeOf(o, ce.stringObj);
        }
        if (((o = t), (o = o.trim()), o !== "*")) {
          o = "";
          const a = (
              ce.isPrototypePolluted() ? "" : ce.sanitizeShellString(t, !0)
            ).trim(),
            l = ce.mathMin(a.length, 2e3);
          for (let u = 0; u <= l; u++)
            if (a[u] !== void 0) {
              a[u].__proto__.toLowerCase = ce.stringToLower;
              const c = a[u].toLowerCase();
              c && c[0] && !c[1] && (o = o + c[0]);
            }
        }
        ((o = o.trim().toLowerCase().replace(/,+/g, "|")), (e = o.split("|")));
      }
      const s = [],
        r = [];
      if (e.length && e[0].trim() === "*")
        ((e = []),
          qr().then((o) => {
            for (let a of o) e.push(a.id.substring(0, 12));
            e.length
              ? Jr(e.join(",")).then((a) => {
                  (n && n(a), i(a));
                })
              : (n && n(s), i(s));
          }));
      else {
        for (let o of e) r.push(o0(o.trim()));
        r.length
          ? Promise.all(r).then((o) => {
              (n && n(o), i(o));
            })
          : (n && n(s), i(s));
      }
    });
  });
}
function o0(t) {
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
        ? (ue || (ue = new Ft()),
          ue.getInspect(t, (i) => {
            try {
              ue.getStats(t, (s) => {
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
                        ? i0(r.cpu_stats, r.precpu_stats)
                        : 0),
                    (n.pids =
                      r.pids_stats && r.pids_stats.current
                        ? r.pids_stats.current
                        : 0),
                    (n.restartCount = i.RestartCount ? i.RestartCount : 0),
                    r.networks && (n.netIO = r0(r.networks)),
                    r.blkio_stats && (n.blockIO = s0(r.blkio_stats)),
                    (n.cpuStats = r.cpu_stats ? r.cpu_stats : {}),
                    (n.precpuStats = r.precpu_stats ? r.precpu_stats : {}),
                    (n.memoryStats = r.memory_stats ? r.memory_stats : {}),
                    (n.networks = r.networks ? r.networks : {}));
                } catch {
                  ce.noop();
                }
                e(n);
              });
            } catch {
              ce.noop();
            }
          }))
        : e(n);
    });
  });
}
Bt.dockerContainerStats = Jr;
function Ro(t, n) {
  let e = [];
  return new Promise((i) => {
    process.nextTick(() => {
      if (((t = t || ""), typeof t != "string")) return i(e);
      const s = (
        ce.isPrototypePolluted() ? "" : ce.sanitizeShellString(t, !0)
      ).trim();
      s
        ? (ue || (ue = new Ft()),
          ue.getProcesses(s, (r) => {
            try {
              if (r && r.Titles && r.Processes) {
                let o = r.Titles.map(function (C) {
                    return C.toUpperCase();
                  }),
                  a = o.indexOf("PID"),
                  l = o.indexOf("PPID"),
                  u = o.indexOf("PGID"),
                  c = o.indexOf("VSZ"),
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
                    ppid: l >= 0 ? C[l] : "",
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
                    vsz: c >= 0 ? C[c] : "",
                    command: w >= 0 ? C[w] : "",
                  });
                });
              }
            } catch {
              ce.noop();
            }
            (n && n(e), i(e));
          }))
        : (n && n(e), i(e));
    });
  });
}
Bt.dockerContainerProcesses = Ro;
function a0(t) {
  let n = [];
  return new Promise((e) => {
    process.nextTick(() => {
      (ue || (ue = new Ft()),
        ue.listVolumes((i) => {
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
Bt.dockerVolumes = a0;
function l0(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      qr(!0).then((e) => {
        if (
          e &&
          Object.prototype.toString.call(e) === "[object Array]" &&
          e.length > 0
        ) {
          let i = e.length;
          e.forEach(function (s) {
            Jr(s.id).then((r) => {
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
                Ro(s.id).then((o) => {
                  ((s.processes = o), (i -= 1), i === 0 && (t && t(e), n(e)));
                }));
            });
          });
        } else (t && t(e), n(e));
      });
    });
  });
}
Bt.dockerAll = l0;
var Go = {};
const pr = Ae,
  c0 = oe.exec,
  ne = V;
function u0(t) {
  let n = [];
  return new Promise((e) => {
    process.nextTick(() => {
      try {
        c0(ne.getVboxmanage() + " list vms --long", function (i, s) {
          let r = (pr.EOL + s.toString()).split(pr.EOL + "Name:");
          (r.shift(),
            r.forEach((o) => {
              const a = ("Name:" + o).split(pr.EOL),
                l = ne.getValue(a, "State"),
                u = l.startsWith("running"),
                c = u
                  ? l.replace("running (since ", "").replace(")", "").trim()
                  : "";
              let f = 0;
              try {
                if (u) {
                  const m = new Date(c),
                    h = m.getTimezoneOffset();
                  f = Math.round((Date.now() - Date.parse(m)) / 1e3) + h * 60;
                }
              } catch {
                ne.noop();
              }
              const p = u
                ? ""
                : l.replace("powered off (since", "").replace(")", "").trim();
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
                started: c,
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
Go.vboxInfo = u0;
var Wo = {};
const fr = oe.exec,
  ye = V;
let Tt = process.platform;
const ks = Tt === "linux" || Tt === "android",
  p0 = Tt === "darwin",
  f0 = Tt === "win32",
  d0 = Tt === "freebsd",
  m0 = Tt === "openbsd",
  h0 = Tt === "netbsd",
  g0 = Tt === "sunos",
  Bs = {
    1: "Other",
    2: "Unknown",
    3: "Idle",
    4: "Printing",
    5: "Warmup",
    6: "Stopped Printing",
    7: "Offline",
  };
function y0(t) {
  const n = {};
  if (t && t.length && t[0].indexOf(" CUPS v") > 0) {
    const e = t[0].split(" CUPS v");
    n.cupsVersion = e[1];
  }
  return n;
}
function x0(t) {
  const n = {},
    e = ye.getValue(t, "PrinterId", " ");
  return (
    (n.id = e ? parseInt(e, 10) : null),
    (n.name = ye.getValue(t, "Info", " ")),
    (n.model = t.length > 0 && t[0] ? t[0].split(" ")[0] : ""),
    (n.uri = ye.getValue(t, "DeviceURI", " ")),
    (n.uuid = ye.getValue(t, "UUID", " ")),
    (n.status = ye.getValue(t, "State", " ")),
    (n.local = ye
      .getValue(t, "Location", " ")
      .toLowerCase()
      .startsWith("local")),
    (n.default = null),
    (n.shared = ye.getValue(t, "Shared", " ").toLowerCase().startsWith("yes")),
    n
  );
}
function S0(t, n) {
  const e = {};
  return (
    (e.id = n),
    (e.name = ye.getValue(t, "Description", ":", !0)),
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
    (e.local = ye
      .getValue(t, "Location", ":", !0)
      .toLowerCase()
      .startsWith("local")),
    (e.default = null),
    (e.shared = ye.getValue(t, "Shared", " ").toLowerCase().startsWith("yes")),
    e
  );
}
function w0(t, n) {
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
function C0(t, n) {
  const e = {},
    i = parseInt(ye.getValue(t, "PrinterStatus", ":"), 10);
  return (
    (e.id = n),
    (e.name = ye.getValue(t, "name", ":")),
    (e.model = ye.getValue(t, "DriverName", ":")),
    (e.uri = null),
    (e.uuid = null),
    (e.status = Bs[i] ? Bs[i] : null),
    (e.local = ye.getValue(t, "Local", ":").toUpperCase() === "TRUE"),
    (e.default = ye.getValue(t, "Default", ":").toUpperCase() === "TRUE"),
    (e.shared = ye.getValue(t, "Shared", ":").toUpperCase() === "TRUE"),
    e
  );
}
function L0(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (ks || d0 || m0 || h0) {
        let i = "cat /etc/cups/printers.conf 2>/dev/null";
        fr(i, function (s, r) {
          if (!s) {
            const o = r.toString().split("<Printer "),
              a = y0(o[0]);
            for (let l = 1; l < o.length; l++) {
              const u = x0(
                o[l].split(`
`),
              );
              u.name &&
                ((u.engine = "CUPS"),
                (u.engineVersion = a.cupsVersion),
                e.push(u));
            }
          }
          e.length === 0 && ks
            ? ((i = "export LC_ALL=C; lpstat -lp 2>/dev/null; unset LC_ALL"),
              fr(i, function (o, a) {
                const l = (
                  `
` + a.toString()
                ).split(`
printer `);
                for (let u = 1; u < l.length; u++) {
                  const c = S0(
                    l[u].split(`
`),
                    u,
                  );
                  e.push(c);
                }
              }),
              t && t(e),
              n(e))
            : (t && t(e), n(e));
        });
      }
      (p0 &&
        fr("system_profiler SPPrintersDataType -json", function (s, r) {
          if (!s)
            try {
              const o = JSON.parse(r.toString());
              if (o.SPPrintersDataType && o.SPPrintersDataType.length)
                for (let a = 0; a < o.SPPrintersDataType.length; a++) {
                  const l = w0(o.SPPrintersDataType[a], a);
                  e.push(l);
                }
            } catch {
              ye.noop();
            }
          (t && t(e), n(e));
        }),
        f0 &&
          ye
            .powerShell(
              "Get-CimInstance Win32_Printer | select PrinterStatus,Name,DriverName,Local,Default,Shared | fl",
            )
            .then((i, s) => {
              if (!s) {
                const r = i.toString().split(/\n\s*\n/);
                for (let o = 0; o < r.length; o++) {
                  const a = C0(
                    r[o].split(`
`),
                    o,
                  );
                  (a.name || a.model) && e.push(a);
                }
              }
              (t && t(e), n(e));
            }),
        g0 && n(null));
    });
  });
}
Wo.printer = L0;
var $o = {};
const Fs = oe.exec,
  We = V;
let Dt = process.platform;
const I0 = Dt === "linux" || Dt === "android",
  _0 = Dt === "darwin",
  v0 = Dt === "win32",
  O0 = Dt === "freebsd",
  P0 = Dt === "openbsd",
  E0 = Dt === "netbsd",
  M0 = Dt === "sunos";
function A0(t, n) {
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
function T0(t) {
  const n = {},
    e = t.split(`
`);
  if (e && e.length && e[0].indexOf("Device") >= 0) {
    const x = e[0].split(" ");
    ((n.bus = parseInt(x[0], 10)),
      x[2] ? (n.deviceId = parseInt(x[2], 10)) : (n.deviceId = null));
  } else ((n.bus = null), (n.deviceId = null));
  const i = We.getValue(e, "idVendor", " ", !0).trim();
  let s = i.split(" ");
  s.shift();
  const r = s.join(" "),
    o = We.getValue(e, "idProduct", " ", !0).trim();
  let a = o.split(" ");
  a.shift();
  const l = a.join(" ");
  let c = We.getValue(e, "bInterfaceClass", " ", !0).trim().split(" ");
  c.shift();
  const f = c.join(" ");
  let d = We.getValue(e, "iManufacturer", " ", !0).trim().split(" ");
  d.shift();
  const m = d.join(" ");
  let y = We.getValue(e, "iSerial", " ", !0).trim().split(" ");
  y.shift();
  const g = y.join(" ");
  return (
    (n.id =
      (i.startsWith("0x") ? i.split(" ")[0].substr(2, 10) : "") +
      ":" +
      (o.startsWith("0x") ? o.split(" ")[0].substr(2, 10) : "")),
    (n.name = l),
    (n.type = A0(f, l)),
    (n.removable = null),
    (n.vendor = r),
    (n.manufacturer = m),
    (n.maxPower = We.getValue(e, "MaxPower", " ", !0)),
    (n.serialNumber = g),
    n
  );
}
function D0(t) {
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
function b0(t, n) {
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
        const l = a[0];
        i[o] = i[o].replace(l, `"${l}"`);
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
      (e.type = D0(
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
function V0(t, n) {
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
function N0(t, n) {
  const e = V0(
    We.getValue(t, "CreationClassName", ":").toLowerCase(),
    We.getValue(t, "name", ":").toLowerCase(),
  );
  if (e) {
    const i = {};
    return (
      (i.bus = null),
      (i.deviceId = We.getValue(t, "deviceid", ":")),
      (i.id = n),
      (i.name = We.getValue(t, "name", ":")),
      (i.type = e),
      (i.removable = null),
      (i.vendor = null),
      (i.manufacturer = We.getValue(t, "Manufacturer", ":")),
      (i.maxPower = null),
      (i.serialNumber = null),
      i
    );
  } else return null;
}
function k0(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      (I0 &&
        Fs(
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
                const l = T0(o[a]);
                e.push(l);
              }
            }
            (t && t(e), n(e));
          },
        ),
        _0 &&
          Fs(
            "ioreg -p IOUSB -c AppleUSBRootHubDevice -w0 -l",
            { maxBuffer: 1024 * 1024 * 128 },
            function (s, r) {
              if (!s) {
                const o = r.toString().split(" +-o ");
                for (let a = 1; a < o.length; a++) {
                  const l = b0(o[a]);
                  l && e.push(l);
                }
                (t && t(e), n(e));
              }
              (t && t(e), n(e));
            },
          ),
        v0 &&
          We.powerShell(
            'Get-CimInstance CIM_LogicalDevice | where { $_.Description -match "USB"} | select Name,CreationClassName,DeviceId,Manufacturer | fl',
          ).then((i, s) => {
            if (!s) {
              const r = i.toString().split(/\n\s*\n/);
              for (let o = 0; o < r.length; o++) {
                const a = N0(
                  r[o].split(`
`),
                  o,
                );
                a &&
                  e.filter((l) => l.deviceId === a.deviceId).length === 0 &&
                  e.push(a);
              }
            }
            (t && t(e), n(e));
          }),
        (M0 || O0 || P0 || E0) && n(null));
    });
  });
}
$o.usb = k0;
var Uo = {};
const Rs = oe.exec,
  B0 = oe.execSync,
  _e = V;
let bt = process.platform;
const F0 = bt === "linux" || bt === "android",
  R0 = bt === "darwin",
  G0 = bt === "win32",
  W0 = bt === "freebsd",
  $0 = bt === "openbsd",
  U0 = bt === "netbsd",
  z0 = bt === "sunos";
function Qr(t, n, e) {
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
function H0() {
  let t = "lspci -v 2>/dev/null",
    n = [];
  try {
    return (
      B0(t, _e.execOptsLinux)
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
                _e.getValue(s, "Kernel driver in use", ":", !0) ||
                _e.getValue(s, "Kernel modules", ":", !0)),
              n.push(r));
          }
        }),
      n
    );
  } catch {
    return n;
  }
}
function j0(t, n) {
  const e = {},
    i = _e.getValue(t, "Slot"),
    s = n.filter(function (r) {
      return r.slotId === i;
    });
  return (
    (e.id = i),
    (e.name = _e.getValue(t, "SDevice")),
    (e.manufacturer = _e.getValue(t, "SVendor")),
    (e.revision = _e.getValue(t, "Rev")),
    (e.driver = s && s.length === 1 && s[0].driver ? s[0].driver : ""),
    (e.default = null),
    (e.channel = "PCIe"),
    (e.type = Qr(e.name, null, null)),
    (e.in = null),
    (e.out = null),
    (e.status = "online"),
    e
  );
}
function K0(t) {
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
function X0(t, n) {
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
    (e.channel = K0(i)),
    (e.type = Qr(
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
function Y0(t) {
  const n = {},
    e = _e.getValue(t, "StatusInfo", ":");
  return (
    (n.id = _e.getValue(t, "DeviceID", ":")),
    (n.name = _e.getValue(t, "name", ":")),
    (n.manufacturer = _e.getValue(t, "manufacturer", ":")),
    (n.revision = null),
    (n.driver = null),
    (n.default = null),
    (n.channel = null),
    (n.type = Qr(n.name, null, null)),
    (n.in = null),
    (n.out = null),
    (n.status = e),
    n
  );
}
function q0(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      ((F0 || W0 || $0 || U0) &&
        Rs("lspci -vmm 2>/dev/null", function (s, r) {
          if (!s) {
            const o = H0();
            r.toString()
              .split(
                `

`,
              )
              .forEach((l) => {
                const u = l.split(`
`);
                if (
                  _e
                    .getValue(u, "class", ":", !0)
                    .toLowerCase()
                    .indexOf("audio") >= 0
                ) {
                  const c = j0(u, o);
                  e.push(c);
                }
              });
          }
          (t && t(e), n(e));
        }),
        R0 &&
          Rs("system_profiler SPAudioDataType -json", function (s, r) {
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
                    const l = X0(o.SPAudioDataType[0]._items[a], a);
                    e.push(l);
                  }
              } catch {
                _e.noop();
              }
            (t && t(e), n(e));
          }),
        G0 &&
          _e
            .powerShell(
              "Get-CimInstance Win32_SoundDevice | select DeviceID,StatusInfo,Name,Manufacturer | fl",
            )
            .then((i, s) => {
              (s ||
                i
                  .toString()
                  .split(/\n\s*\n/)
                  .forEach((o) => {
                    const a = o.split(`
`);
                    _e.getValue(a, "name", ":") && e.push(Y0(a));
                  }),
                t && t(e),
                n(e));
            }),
        z0 && n(null));
    });
  });
}
Uo.audio = q0;
var zo = {},
  J0 = {
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
const Q0 = oe.exec,
  Z0 = oe.execSync,
  ep = se,
  Ze = V,
  tp = J0,
  np = be;
let Vt = process.platform;
const ip = Vt === "linux" || Vt === "android",
  rp = Vt === "darwin",
  sp = Vt === "win32",
  op = Vt === "freebsd",
  ap = Vt === "openbsd",
  lp = Vt === "netbsd",
  cp = Vt === "sunos";
function Zr(t) {
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
function up(t) {
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
function pp(t) {
  const n = parseInt(t);
  if (!isNaN(n)) return tp[n];
}
function fp(t, n, e) {
  const i = {};
  return (
    (i.device = null),
    (i.name = Ze.getValue(t, "name", "=")),
    (i.manufacturer = null),
    (i.macDevice = n),
    (i.macHost = e),
    (i.batteryPercent = null),
    (i.type = Zr(i.name.toLowerCase())),
    (i.connected = !1),
    i
  );
}
function dr(t, n) {
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
      pp(t.device_vendorID) ||
      up(t.device_name || "") ||
      ""),
    (e.macDevice = (t.device_addr || t.device_address || "")
      .toLowerCase()
      .replace(/-/g, ":")),
    (e.macHost = n),
    (e.batteryPercent = t.device_batteryPercent || null),
    (e.type = Zr(i)),
    (e.connected = t.device_isconnected === "attrib_Yes" || !1),
    e
  );
}
function dp(t) {
  const n = {};
  return (
    (n.device = null),
    (n.name = Ze.getValue(t, "name", ":")),
    (n.manufacturer = Ze.getValue(t, "manufacturer", ":")),
    (n.macDevice = null),
    (n.macHost = null),
    (n.batteryPercent = null),
    (n.type = Zr(n.name.toLowerCase())),
    (n.connected = null),
    n
  );
}
function mp(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (ip) {
        Ze.getFilesInPath("/var/lib/bluetooth/").forEach((s) => {
          const r = ep.basename(s),
            o = s.split("/"),
            a = o.length >= 6 ? o[o.length - 2] : null,
            l = o.length >= 7 ? o[o.length - 3] : null;
          if (r === "info") {
            const u = np.readFileSync(s, { encoding: "utf8" }).split(`
`);
            e.push(fp(u, a, l));
          }
        });
        try {
          const s = Z0("hcitool con", Ze.execOptsLinux)
            .toString()
            .toLowerCase();
          for (let r = 0; r < e.length; r++)
            e[r].macDevice &&
              e[r].macDevice.length > 10 &&
              s.indexOf(e[r].macDevice.toLowerCase()) >= 0 &&
              (e[r].connected = !0);
        } catch {
          Ze.noop();
        }
        (t && t(e), n(e));
      }
      (rp &&
        Q0("system_profiler SPBluetoothDataType -json", function (s, r) {
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
                  o.SPBluetoothDataType[0].device_title.forEach((l) => {
                    const u = l,
                      c = Object.keys(u);
                    if (c && c.length === 1) {
                      const f = u[c[0]];
                      f.device_name = c[0];
                      const p = dr(f, a);
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
                o.SPBluetoothDataType[0].device_connected.forEach((l) => {
                  const u = l,
                    c = Object.keys(u);
                  if (c && c.length === 1) {
                    const f = u[c[0]];
                    ((f.device_name = c[0]),
                      (f.device_isconnected = "attrib_Yes"));
                    const p = dr(f, a);
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
                o.SPBluetoothDataType[0].device_not_connected.forEach((l) => {
                  const u = l,
                    c = Object.keys(u);
                  if (c && c.length === 1) {
                    const f = u[c[0]];
                    ((f.device_name = c[0]),
                      (f.device_isconnected = "attrib_No"));
                    const p = dr(f, a);
                    e.push(p);
                  }
                });
              }
            } catch {
              Ze.noop();
            }
          (t && t(e), n(e));
        }),
        sp &&
          Ze.powerShell(
            "Get-CimInstance Win32_PNPEntity | select PNPClass, Name, Manufacturer | fl",
          ).then((i, s) => {
            (s ||
              i
                .toString()
                .split(/\n\s*\n/)
                .forEach((o) => {
                  Ze.getValue(
                    o.split(`
`),
                    "PNPClass",
                    ":",
                  ) === "Bluetooth" &&
                    e.push(
                      dp(
                        o.split(`
`),
                      ),
                    );
                }),
              t && t(e),
              n(e));
          }),
        (op || lp || ap || cp) && n(null));
    });
  });
}
zo.bluetoothDevices = mp;
(function (t) {
  const n = Ya.version,
    e = V,
    i = oi,
    s = tn,
    r = kt,
    o = Rr,
    a = Cc,
    l = Ao,
    u = nn,
    c = rn,
    f = Xi,
    p = Yi,
    d = Fo,
    m = Yr,
    h = Bt,
    y = Go,
    g = Wo,
    x = $o,
    S = Uo,
    w = zo;
  let C = process.platform;
  const R = C === "win32",
    T = C === "freebsd",
    K = C === "openbsd",
    L = C === "netbsd",
    D = C === "sunos";
  R && (e.getCodepage(), e.getPowershell());
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
            l.graphics(),
            c.networkInterfaces(),
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
          ((H = H || c.getDefaultNetworkInterface()), (N = N || ""));
          let B = (function () {
              let j = 15;
              return (
                R && (j = 13),
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
              ((Z.cpuCurrentSpeed = j), B());
            }),
            d.users().then((j) => {
              ((Z.users = j), B());
            }),
            p.processes().then((j) => {
              ((Z.processes = j), B());
            }),
            r.currentLoad().then((j) => {
              ((Z.currentLoad = j), B());
            }),
            D ||
              r.cpuTemperature().then((j) => {
                ((Z.temp = j), B());
              }),
            !K &&
              !T &&
              !L &&
              !D &&
              c.networkStats(H).then((j) => {
                ((Z.networkStats = j), B());
              }),
            D ||
              c.networkConnections().then((j) => {
                ((Z.networkConnections = j), B());
              }),
            o.mem().then((j) => {
              ((Z.mem = j), B());
            }),
            D ||
              a().then((j) => {
                ((Z.battery = j), B());
              }),
            D ||
              p.services(N).then((j) => {
                ((Z.services = j), B());
              }),
            D ||
              u.fsSize().then((j) => {
                ((Z.fsSize = j), B());
              }),
            !R &&
              !K &&
              !T &&
              !L &&
              !D &&
              u.fsStats().then((j) => {
                ((Z.fsStats = j), B());
              }),
            !R &&
              !K &&
              !T &&
              !L &&
              !D &&
              u.disksIO().then((j) => {
                ((Z.disksIO = j), B());
              }),
            !K &&
              !T &&
              !L &&
              !D &&
              f.wifiNetworks().then((j) => {
                ((Z.wifiNetworks = j), B());
              }),
            m.inetLatency().then((j) => {
              ((Z.inetLatency = j), B());
            }));
        });
      })
    );
  }
  function ee(N, H, b) {
    return new Promise(($) => {
      process.nextTick(() => {
        let B = {};
        (H && e.isFunction(H) && !b && ((b = H), (H = "")),
          N && e.isFunction(N) && !H && !b && ((b = N), (N = ""), (H = "")),
          X().then((Z) => {
            ((B = Z),
              Q(N, H).then((j) => {
                for (let Te in j)
                  ({}).hasOwnProperty.call(j, Te) && (B[Te] = j[Te]);
                (b && b(B), $(B));
              }));
          }));
      });
    });
  }
  function F(N, H) {
    return new Promise((b) => {
      process.nextTick(() => {
        const $ = Object.keys(N)
          .filter((B) => ({}).hasOwnProperty.call(t, B))
          .map((B) => {
            const Z = N[B].substring(
              N[B].lastIndexOf("(") + 1,
              N[B].lastIndexOf(")"),
            );
            let j = B.indexOf(")") >= 0 ? B.split(")")[1].trim() : B;
            return (
              (j = B.indexOf("|") >= 0 ? B.split("|")[0].trim() : j),
              Z ? t[j](Z) : t[j]("")
            );
          });
        Promise.all($).then((B) => {
          const Z = {};
          let j = 0;
          for (let Te in N)
            if (
              {}.hasOwnProperty.call(N, Te) &&
              {}.hasOwnProperty.call(t, Te) &&
              B.length > j
            ) {
              if (N[Te] === "*" || N[Te] === "all") Z[Te] = B[j];
              else {
                let Ee = N[Te],
                  Zi = "",
                  on = [];
                if (
                  (Ee.indexOf(")") >= 0 && (Ee = Ee.split(")")[1].trim()),
                  Ee.indexOf("|") >= 0 &&
                    ((Zi = Ee.split("|")[1].trim()),
                    (on = Zi.split(":")),
                    (Ee = Ee.split("|")[0].trim())),
                  (Ee = Ee.replace(/,/g, " ").replace(/ +/g, " ").split(" ")),
                  B[j])
                )
                  if (Array.isArray(B[j])) {
                    const zt = [];
                    (B[j].forEach((Ht) => {
                      let jt = {};
                      if (
                        (Ee.length === 1 && (Ee[0] === "*" || Ee[0] === "all")
                          ? (jt = Ht)
                          : Ee.forEach((rt) => {
                              ({}).hasOwnProperty.call(Ht, rt) &&
                                (jt[rt] = Ht[rt]);
                            }),
                        Zi && on.length === 2)
                      ) {
                        if ({}.hasOwnProperty.call(jt, on[0].trim())) {
                          const rt = jt[on[0].trim()];
                          typeof rt == "number"
                            ? rt === parseFloat(on[1].trim()) && zt.push(jt)
                            : typeof rt == "string" &&
                              rt.toLowerCase() === on[1].trim().toLowerCase() &&
                              zt.push(jt);
                        }
                      } else zt.push(jt);
                    }),
                      (Z[Te] = zt));
                  } else {
                    const zt = {};
                    (Ee.forEach((Ht) => {
                      ({}).hasOwnProperty.call(B[j], Ht) && (zt[Ht] = B[j][Ht]);
                    }),
                      (Z[Te] = zt));
                  }
                else Z[Te] = {};
              }
              j++;
            }
          (H && H(Z), b(Z));
        });
      });
    });
  }
  function q(N, H, b) {
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
    (t.graphics = l.graphics),
    (t.fsSize = u.fsSize),
    (t.fsOpenFiles = u.fsOpenFiles),
    (t.blockDevices = u.blockDevices),
    (t.fsStats = u.fsStats),
    (t.disksIO = u.disksIO),
    (t.diskLayout = u.diskLayout),
    (t.networkInterfaceDefault = c.networkInterfaceDefault),
    (t.networkGatewayDefault = c.networkGatewayDefault),
    (t.networkInterfaces = c.networkInterfaces),
    (t.networkStats = c.networkStats),
    (t.networkConnections = c.networkConnections),
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
    (t.observe = q),
    (t.powerShellStart = e.powerShellStart),
    (t.powerShellRelease = e.powerShellRelease));
})(io);
const Nt = /* @__PURE__ */ Tr(io);
var Pe = {},
  ge = {};
ge.fromCallback = function (t) {
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
ge.fromPromise = function (t) {
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
var lt = Ha,
  hp = process.cwd,
  Oi = null,
  gp = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function () {
  return (Oi || (Oi = hp.call(process)), Oi);
};
try {
  process.cwd();
} catch {}
if (typeof process.chdir == "function") {
  var Gs = process.chdir;
  ((process.chdir = function (t) {
    ((Oi = null), Gs.call(process, t));
  }),
    Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Gs));
}
var yp = xp;
function xp(t) {
  (lt.hasOwnProperty("O_SYMLINK") &&
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
    (t.statSync = l(t.statSync)),
    (t.fstatSync = l(t.fstatSync)),
    (t.lstatSync = l(t.lstatSync)),
    t.chmod &&
      !t.lchmod &&
      ((t.lchmod = function (c, f, p) {
        p && process.nextTick(p);
      }),
      (t.lchmodSync = function () {})),
    t.chown &&
      !t.lchown &&
      ((t.lchown = function (c, f, p, d) {
        d && process.nextTick(d);
      }),
      (t.lchownSync = function () {})),
    gp === "win32" &&
      (t.rename =
        typeof t.rename != "function"
          ? t.rename
          : (function (c) {
              function f(p, d, m) {
                var h = Date.now(),
                  y = 0;
                c(p, d, function g(x) {
                  if (
                    x &&
                    (x.code === "EACCES" ||
                      x.code === "EPERM" ||
                      x.code === "EBUSY") &&
                    Date.now() - h < 6e4
                  ) {
                    (setTimeout(function () {
                      t.stat(d, function (S, w) {
                        S && S.code === "ENOENT" ? c(p, d, g) : m(x);
                      });
                    }, y),
                      y < 100 && (y += 10));
                    return;
                  }
                  m && m(x);
                });
              }
              return (Object.setPrototypeOf && Object.setPrototypeOf(f, c), f);
            })(t.rename)),
    (t.read =
      typeof t.read != "function"
        ? t.read
        : (function (c) {
            function f(p, d, m, h, y, g) {
              var x;
              if (g && typeof g == "function") {
                var S = 0;
                x = function (w, C, R) {
                  if (w && w.code === "EAGAIN" && S < 10)
                    return (S++, c.call(t, p, d, m, h, y, x));
                  g.apply(this, arguments);
                };
              }
              return c.call(t, p, d, m, h, y, x);
            }
            return (Object.setPrototypeOf && Object.setPrototypeOf(f, c), f);
          })(t.read)),
    (t.readSync =
      typeof t.readSync != "function"
        ? t.readSync
        : /* @__PURE__ */ (function (c) {
            return function (f, p, d, m, h) {
              for (var y = 0; ; )
                try {
                  return c.call(t, f, p, d, m, h);
                } catch (g) {
                  if (g.code === "EAGAIN" && y < 10) {
                    y++;
                    continue;
                  }
                  throw g;
                }
            };
          })(t.readSync)));
  function n(c) {
    ((c.lchmod = function (f, p, d) {
      c.open(f, lt.O_WRONLY | lt.O_SYMLINK, p, function (m, h) {
        if (m) {
          d && d(m);
          return;
        }
        c.fchmod(h, p, function (y) {
          c.close(h, function (g) {
            d && d(y || g);
          });
        });
      });
    }),
      (c.lchmodSync = function (f, p) {
        var d = c.openSync(f, lt.O_WRONLY | lt.O_SYMLINK, p),
          m = !0,
          h;
        try {
          ((h = c.fchmodSync(d, p)), (m = !1));
        } finally {
          if (m)
            try {
              c.closeSync(d);
            } catch {}
          else c.closeSync(d);
        }
        return h;
      }));
  }
  function e(c) {
    lt.hasOwnProperty("O_SYMLINK") && c.futimes
      ? ((c.lutimes = function (f, p, d, m) {
          c.open(f, lt.O_SYMLINK, function (h, y) {
            if (h) {
              m && m(h);
              return;
            }
            c.futimes(y, p, d, function (g) {
              c.close(y, function (x) {
                m && m(g || x);
              });
            });
          });
        }),
        (c.lutimesSync = function (f, p, d) {
          var m = c.openSync(f, lt.O_SYMLINK),
            h,
            y = !0;
          try {
            ((h = c.futimesSync(m, p, d)), (y = !1));
          } finally {
            if (y)
              try {
                c.closeSync(m);
              } catch {}
            else c.closeSync(m);
          }
          return h;
        }))
      : c.futimes &&
        ((c.lutimes = function (f, p, d, m) {
          m && process.nextTick(m);
        }),
        (c.lutimesSync = function () {}));
  }
  function i(c) {
    return (
      c &&
      function (f, p, d) {
        return c.call(t, f, p, function (m) {
          (u(m) && (m = null), d && d.apply(this, arguments));
        });
      }
    );
  }
  function s(c) {
    return (
      c &&
      function (f, p) {
        try {
          return c.call(t, f, p);
        } catch (d) {
          if (!u(d)) throw d;
        }
      }
    );
  }
  function r(c) {
    return (
      c &&
      function (f, p, d, m) {
        return c.call(t, f, p, d, function (h) {
          (u(h) && (h = null), m && m.apply(this, arguments));
        });
      }
    );
  }
  function o(c) {
    return (
      c &&
      function (f, p, d) {
        try {
          return c.call(t, f, p, d);
        } catch (m) {
          if (!u(m)) throw m;
        }
      }
    );
  }
  function a(c) {
    return (
      c &&
      function (f, p, d) {
        typeof p == "function" && ((d = p), (p = null));
        function m(h, y) {
          (y &&
            (y.uid < 0 && (y.uid += 4294967296),
            y.gid < 0 && (y.gid += 4294967296)),
            d && d.apply(this, arguments));
        }
        return p ? c.call(t, f, p, m) : c.call(t, f, m);
      }
    );
  }
  function l(c) {
    return (
      c &&
      function (f, p) {
        var d = p ? c.call(t, f, p) : c.call(t, f);
        return (
          d &&
            (d.uid < 0 && (d.uid += 4294967296),
            d.gid < 0 && (d.gid += 4294967296)),
          d
        );
      }
    );
  }
  function u(c) {
    if (!c || c.code === "ENOSYS") return !0;
    var f = !process.getuid || process.getuid() !== 0;
    return !!(f && (c.code === "EINVAL" || c.code === "EPERM"));
  }
}
var Ws = ja.Stream,
  Sp = wp;
function wp(t) {
  return {
    ReadStream: n,
    WriteStream: e,
  };
  function n(i, s) {
    if (!(this instanceof n)) return new n(i, s);
    Ws.call(this);
    var r = this;
    ((this.path = i),
      (this.fd = null),
      (this.readable = !0),
      (this.paused = !1),
      (this.flags = "r"),
      (this.mode = 438),
      (this.bufferSize = 64 * 1024),
      (s = s || {}));
    for (var o = Object.keys(s), a = 0, l = o.length; a < l; a++) {
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
    t.open(this.path, this.flags, this.mode, function (c, f) {
      if (c) {
        (r.emit("error", c), (r.readable = !1));
        return;
      }
      ((r.fd = f), r.emit("open", f), r._read());
    });
  }
  function e(i, s) {
    if (!(this instanceof e)) return new e(i, s);
    (Ws.call(this),
      (this.path = i),
      (this.fd = null),
      (this.writable = !0),
      (this.flags = "w"),
      (this.encoding = "binary"),
      (this.mode = 438),
      (this.bytesWritten = 0),
      (s = s || {}));
    for (var r = Object.keys(s), o = 0, a = r.length; o < a; o++) {
      var l = r[o];
      this[l] = s[l];
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
var Cp = Ip,
  Lp =
    Object.getPrototypeOf ||
    function (t) {
      return t.__proto__;
    };
function Ip(t) {
  if (t === null || typeof t != "object") return t;
  if (t instanceof Object) var n = { __proto__: Lp(t) };
  else var n = /* @__PURE__ */ Object.create(null);
  return (
    Object.getOwnPropertyNames(t).forEach(function (e) {
      Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(t, e));
    }),
    n
  );
}
var pe = be,
  _p = yp,
  vp = Sp,
  Op = Cp,
  xi = Ar,
  we,
  Vi;
typeof Symbol == "function" && typeof Symbol.for == "function"
  ? ((we = Symbol.for("graceful-fs.queue")),
    (Vi = Symbol.for("graceful-fs.previous")))
  : ((we = "___graceful-fs.queue"), (Vi = "___graceful-fs.previous"));
function Pp() {}
function Ho(t, n) {
  Object.defineProperty(t, we, {
    get: function () {
      return n;
    },
  });
}
var Zt = Pp;
xi.debuglog
  ? (Zt = xi.debuglog("gfs4"))
  : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
    (Zt = function () {
      var t = xi.format.apply(xi, arguments);
      ((t =
        "GFS4: " +
        t.split(/\n/).join(`
GFS4: `)),
        console.error(t));
    });
if (!pe[we]) {
  var Ep = wr[we] || [];
  (Ho(pe, Ep),
    (pe.close = (function (t) {
      function n(e, i) {
        return t.call(pe, e, function (s) {
          (s || $s(), typeof i == "function" && i.apply(this, arguments));
        });
      }
      return (
        Object.defineProperty(n, Vi, {
          value: t,
        }),
        n
      );
    })(pe.close)),
    (pe.closeSync = (function (t) {
      function n(e) {
        (t.apply(pe, arguments), $s());
      }
      return (
        Object.defineProperty(n, Vi, {
          value: t,
        }),
        n
      );
    })(pe.closeSync)),
    /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
      process.on("exit", function () {
        (Zt(pe[we]), Ka.equal(pe[we].length, 0));
      }));
}
wr[we] || Ho(wr, pe[we]);
var Tn = es(Op(pe));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH &&
  !pe.__patched &&
  ((Tn = es(pe)), (pe.__patched = !0));
function es(t) {
  (_p(t),
    (t.gracefulify = es),
    (t.createReadStream = C),
    (t.createWriteStream = R));
  var n = t.readFile;
  t.readFile = e;
  function e(L, D, O) {
    return (typeof D == "function" && ((O = D), (D = null)), X(L, D, O));
    function X(Q, ee, F, q) {
      return n(Q, ee, function (N) {
        N && (N.code === "EMFILE" || N.code === "ENFILE")
          ? hn([X, [Q, ee, F], N, q || Date.now(), Date.now()])
          : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  var i = t.writeFile;
  t.writeFile = s;
  function s(L, D, O, X) {
    return (typeof O == "function" && ((X = O), (O = null)), Q(L, D, O, X));
    function Q(ee, F, q, N, H) {
      return i(ee, F, q, function (b) {
        b && (b.code === "EMFILE" || b.code === "ENFILE")
          ? hn([Q, [ee, F, q, N], b, H || Date.now(), Date.now()])
          : typeof N == "function" && N.apply(this, arguments);
      });
    }
  }
  var r = t.appendFile;
  r && (t.appendFile = o);
  function o(L, D, O, X) {
    return (typeof O == "function" && ((X = O), (O = null)), Q(L, D, O, X));
    function Q(ee, F, q, N, H) {
      return r(ee, F, q, function (b) {
        b && (b.code === "EMFILE" || b.code === "ENFILE")
          ? hn([Q, [ee, F, q, N], b, H || Date.now(), Date.now()])
          : typeof N == "function" && N.apply(this, arguments);
      });
    }
  }
  var a = t.copyFile;
  a && (t.copyFile = l);
  function l(L, D, O, X) {
    return (typeof O == "function" && ((X = O), (O = 0)), Q(L, D, O, X));
    function Q(ee, F, q, N, H) {
      return a(ee, F, q, function (b) {
        b && (b.code === "EMFILE" || b.code === "ENFILE")
          ? hn([Q, [ee, F, q, N], b, H || Date.now(), Date.now()])
          : typeof N == "function" && N.apply(this, arguments);
      });
    }
  }
  var u = t.readdir;
  t.readdir = f;
  var c = /^v[0-5]\./;
  function f(L, D, O) {
    typeof D == "function" && ((O = D), (D = null));
    var X = c.test(process.version)
      ? function (F, q, N, H) {
          return u(F, Q(F, q, N, H));
        }
      : function (F, q, N, H) {
          return u(F, q, Q(F, q, N, H));
        };
    return X(L, D, O);
    function Q(ee, F, q, N) {
      return function (H, b) {
        H && (H.code === "EMFILE" || H.code === "ENFILE")
          ? hn([X, [ee, F, q], H, N || Date.now(), Date.now()])
          : (b && b.sort && b.sort(),
            typeof q == "function" && q.call(this, H, b));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var p = vp(t);
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
  function R(L, D) {
    return new t.WriteStream(L, D);
  }
  var T = t.open;
  t.open = K;
  function K(L, D, O, X) {
    return (typeof O == "function" && ((X = O), (O = null)), Q(L, D, O, X));
    function Q(ee, F, q, N, H) {
      return T(ee, F, q, function (b, $) {
        b && (b.code === "EMFILE" || b.code === "ENFILE")
          ? hn([Q, [ee, F, q, N], b, H || Date.now(), Date.now()])
          : typeof N == "function" && N.apply(this, arguments);
      });
    }
  }
  return t;
}
function hn(t) {
  (Zt("ENQUEUE", t[0].name, t[1]), pe[we].push(t), ts());
}
var Si;
function $s() {
  for (var t = Date.now(), n = 0; n < pe[we].length; ++n)
    pe[we][n].length > 2 && ((pe[we][n][3] = t), (pe[we][n][4] = t));
  ts();
}
function ts() {
  if ((clearTimeout(Si), (Si = void 0), pe[we].length !== 0)) {
    var t = pe[we].shift(),
      n = t[0],
      e = t[1],
      i = t[2],
      s = t[3],
      r = t[4];
    if (s === void 0) (Zt("RETRY", n.name, e), n.apply(null, e));
    else if (Date.now() - s >= 6e4) {
      Zt("TIMEOUT", n.name, e);
      var o = e.pop();
      typeof o == "function" && o.call(null, i);
    } else {
      var a = Date.now() - r,
        l = Math.max(r - s, 1),
        u = Math.min(l * 1.2, 100);
      a >= u
        ? (Zt("RETRY", n.name, e), n.apply(null, e.concat([s])))
        : pe[we].push(t);
    }
    Si === void 0 && (Si = setTimeout(ts, 0));
  }
}
(function (t) {
  const n = ge.fromCallback,
    e = Tn,
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
    (t.read = function (s, r, o, a, l, u) {
      return typeof u == "function"
        ? e.read(s, r, o, a, l, u)
        : new Promise((c, f) => {
            e.read(s, r, o, a, l, (p, d, m) => {
              if (p) return f(p);
              c({ bytesRead: d, buffer: m });
            });
          });
    }),
    (t.write = function (s, r, ...o) {
      return typeof o[o.length - 1] == "function"
        ? e.write(s, r, ...o)
        : new Promise((a, l) => {
            e.write(s, r, ...o, (u, c, f) => {
              if (u) return l(u);
              a({ bytesWritten: c, buffer: f });
            });
          });
    }),
    (t.readv = function (s, r, ...o) {
      return typeof o[o.length - 1] == "function"
        ? e.readv(s, r, ...o)
        : new Promise((a, l) => {
            e.readv(s, r, ...o, (u, c, f) => {
              if (u) return l(u);
              a({ bytesRead: c, buffers: f });
            });
          });
    }),
    (t.writev = function (s, r, ...o) {
      return typeof o[o.length - 1] == "function"
        ? e.writev(s, r, ...o)
        : new Promise((a, l) => {
            e.writev(s, r, ...o, (u, c, f) => {
              if (u) return l(u);
              a({ bytesWritten: c, buffers: f });
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
})(Pe);
var ns = {},
  jo = {};
const Mp = se;
jo.checkPath = function (n) {
  if (
    process.platform === "win32" &&
    /[<>:"|?*]/.test(n.replace(Mp.parse(n).root, ""))
  ) {
    const i = new Error(`Path contains invalid characters: ${n}`);
    throw ((i.code = "EINVAL"), i);
  }
};
const Ko = Pe,
  { checkPath: Xo } = jo,
  Yo = (t) => {
    const n = { mode: 511 };
    return typeof t == "number" ? t : { ...n, ...t }.mode;
  };
ns.makeDir = async (t, n) => (
  Xo(t),
  Ko.mkdir(t, {
    mode: Yo(n),
    recursive: !0,
  })
);
ns.makeDirSync = (t, n) => (
  Xo(t),
  Ko.mkdirSync(t, {
    mode: Yo(n),
    recursive: !0,
  })
);
const Ap = ge.fromPromise,
  { makeDir: Tp, makeDirSync: mr } = ns,
  hr = Ap(Tp);
var Je = {
  mkdirs: hr,
  mkdirsSync: mr,
  // alias
  mkdirp: hr,
  mkdirpSync: mr,
  ensureDir: hr,
  ensureDirSync: mr,
};
const Dp = ge.fromPromise,
  qo = Pe;
function bp(t) {
  return qo
    .access(t)
    .then(() => !0)
    .catch(() => !1);
}
var sn = {
  pathExists: Dp(bp),
  pathExistsSync: qo.existsSync,
};
const Ln = Pe,
  Vp = ge.fromPromise;
async function Np(t, n, e) {
  const i = await Ln.open(t, "r+");
  let s = null;
  try {
    await Ln.futimes(i, n, e);
  } finally {
    try {
      await Ln.close(i);
    } catch (r) {
      s = r;
    }
  }
  if (s) throw s;
}
function kp(t, n, e) {
  const i = Ln.openSync(t, "r+");
  return (Ln.futimesSync(i, n, e), Ln.closeSync(i));
}
var Jo = {
  utimesMillis: Vp(Np),
  utimesMillisSync: kp,
};
const vn = Pe,
  xe = se,
  Us = ge.fromPromise;
function Bp(t, n, e) {
  const i = e.dereference
    ? (s) => vn.stat(s, { bigint: !0 })
    : (s) => vn.lstat(s, { bigint: !0 });
  return Promise.all([
    i(t),
    i(n).catch((s) => {
      if (s.code === "ENOENT") return null;
      throw s;
    }),
  ]).then(([s, r]) => ({ srcStat: s, destStat: r }));
}
function Fp(t, n, e) {
  let i;
  const s = e.dereference
      ? (o) => vn.statSync(o, { bigint: !0 })
      : (o) => vn.lstatSync(o, { bigint: !0 }),
    r = s(t);
  try {
    i = s(n);
  } catch (o) {
    if (o.code === "ENOENT") return { srcStat: r, destStat: null };
    throw o;
  }
  return { srcStat: r, destStat: i };
}
async function Rp(t, n, e, i) {
  const { srcStat: s, destStat: r } = await Bp(t, n, i);
  if (r) {
    if (li(s, r)) {
      const o = xe.basename(t),
        a = xe.basename(n);
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
  if (s.isDirectory() && is(t, n)) throw new Error(qi(t, n, e));
  return { srcStat: s, destStat: r };
}
function Gp(t, n, e, i) {
  const { srcStat: s, destStat: r } = Fp(t, n, i);
  if (r) {
    if (li(s, r)) {
      const o = xe.basename(t),
        a = xe.basename(n);
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
  if (s.isDirectory() && is(t, n)) throw new Error(qi(t, n, e));
  return { srcStat: s, destStat: r };
}
async function Qo(t, n, e, i) {
  const s = xe.resolve(xe.dirname(t)),
    r = xe.resolve(xe.dirname(e));
  if (r === s || r === xe.parse(r).root) return;
  let o;
  try {
    o = await vn.stat(r, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (li(n, o)) throw new Error(qi(t, e, i));
  return Qo(t, n, r, i);
}
function Zo(t, n, e, i) {
  const s = xe.resolve(xe.dirname(t)),
    r = xe.resolve(xe.dirname(e));
  if (r === s || r === xe.parse(r).root) return;
  let o;
  try {
    o = vn.statSync(r, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (li(n, o)) throw new Error(qi(t, e, i));
  return Zo(t, n, r, i);
}
function li(t, n) {
  return n.ino && n.dev && n.ino === t.ino && n.dev === t.dev;
}
function is(t, n) {
  const e = xe
      .resolve(t)
      .split(xe.sep)
      .filter((s) => s),
    i = xe
      .resolve(n)
      .split(xe.sep)
      .filter((s) => s);
  return e.every((s, r) => i[r] === s);
}
function qi(t, n, e) {
  return `Cannot ${e} '${t}' to a subdirectory of itself, '${n}'.`;
}
var Dn = {
  // checkPaths
  checkPaths: Us(Rp),
  checkPathsSync: Gp,
  // checkParent
  checkParentPaths: Us(Qo),
  checkParentPathsSync: Zo,
  // Misc
  isSrcSubdir: is,
  areIdentical: li,
};
const Ce = Pe,
  ei = se,
  { mkdirs: Wp } = Je,
  { pathExists: $p } = sn,
  { utimesMillis: Up } = Jo,
  ti = Dn;
async function zp(t, n, e = {}) {
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
  const { srcStat: i, destStat: s } = await ti.checkPaths(t, n, "copy", e);
  if ((await ti.checkParentPaths(t, i, n, "copy"), !(await ea(t, n, e))))
    return;
  const o = ei.dirname(n);
  ((await $p(o)) || (await Wp(o)), await ta(s, t, n, e));
}
async function ea(t, n, e) {
  return e.filter ? e.filter(t, n) : !0;
}
async function ta(t, n, e, i) {
  const r = await (i.dereference ? Ce.stat : Ce.lstat)(n);
  if (r.isDirectory()) return Xp(r, t, n, e, i);
  if (r.isFile() || r.isCharacterDevice() || r.isBlockDevice())
    return Hp(r, t, n, e, i);
  if (r.isSymbolicLink()) return Yp(t, n, e, i);
  throw r.isSocket()
    ? new Error(`Cannot copy a socket file: ${n}`)
    : r.isFIFO()
      ? new Error(`Cannot copy a FIFO pipe: ${n}`)
      : new Error(`Unknown file: ${n}`);
}
async function Hp(t, n, e, i, s) {
  if (!n) return zs(t, e, i, s);
  if (s.overwrite) return (await Ce.unlink(i), zs(t, e, i, s));
  if (s.errorOnExist) throw new Error(`'${i}' already exists`);
}
async function zs(t, n, e, i) {
  if ((await Ce.copyFile(n, e), i.preserveTimestamps)) {
    jp(t.mode) && (await Kp(e, t.mode));
    const s = await Ce.stat(n);
    await Up(e, s.atime, s.mtime);
  }
  return Ce.chmod(e, t.mode);
}
function jp(t) {
  return (t & 128) === 0;
}
function Kp(t, n) {
  return Ce.chmod(t, n | 128);
}
async function Xp(t, n, e, i, s) {
  n || (await Ce.mkdir(i));
  const r = [];
  for await (const o of await Ce.opendir(e)) {
    const a = ei.join(e, o.name),
      l = ei.join(i, o.name);
    r.push(
      ea(a, l, s).then((u) => {
        if (u)
          return ti
            .checkPaths(a, l, "copy", s)
            .then(({ destStat: c }) => ta(c, a, l, s));
      }),
    );
  }
  (await Promise.all(r), n || (await Ce.chmod(i, t.mode)));
}
async function Yp(t, n, e, i) {
  let s = await Ce.readlink(n);
  if ((i.dereference && (s = ei.resolve(process.cwd(), s)), !t))
    return Ce.symlink(s, e);
  let r = null;
  try {
    r = await Ce.readlink(e);
  } catch (o) {
    if (o.code === "EINVAL" || o.code === "UNKNOWN") return Ce.symlink(s, e);
    throw o;
  }
  if (
    (i.dereference && (r = ei.resolve(process.cwd(), r)), ti.isSrcSubdir(s, r))
  )
    throw new Error(`Cannot copy '${s}' to a subdirectory of itself, '${r}'.`);
  if (ti.isSrcSubdir(r, s))
    throw new Error(`Cannot overwrite '${r}' with '${s}'.`);
  return (await Ce.unlink(e), Ce.symlink(s, e));
}
var qp = zp;
const ve = Tn,
  ni = se,
  Jp = Je.mkdirsSync,
  Qp = Jo.utimesMillisSync,
  ii = Dn;
function Zp(t, n, e) {
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
  const { srcStat: i, destStat: s } = ii.checkPathsSync(t, n, "copy", e);
  if ((ii.checkParentPathsSync(t, i, n, "copy"), e.filter && !e.filter(t, n)))
    return;
  const r = ni.dirname(n);
  return (ve.existsSync(r) || Jp(r), na(s, t, n, e));
}
function na(t, n, e, i) {
  const r = (i.dereference ? ve.statSync : ve.lstatSync)(n);
  if (r.isDirectory()) return af(r, t, n, e, i);
  if (r.isFile() || r.isCharacterDevice() || r.isBlockDevice())
    return ef(r, t, n, e, i);
  if (r.isSymbolicLink()) return uf(t, n, e, i);
  throw r.isSocket()
    ? new Error(`Cannot copy a socket file: ${n}`)
    : r.isFIFO()
      ? new Error(`Cannot copy a FIFO pipe: ${n}`)
      : new Error(`Unknown file: ${n}`);
}
function ef(t, n, e, i, s) {
  return n ? tf(t, e, i, s) : ia(t, e, i, s);
}
function tf(t, n, e, i) {
  if (i.overwrite) return (ve.unlinkSync(e), ia(t, n, e, i));
  if (i.errorOnExist) throw new Error(`'${e}' already exists`);
}
function ia(t, n, e, i) {
  return (
    ve.copyFileSync(n, e),
    i.preserveTimestamps && nf(t.mode, n, e),
    rs(e, t.mode)
  );
}
function nf(t, n, e) {
  return (rf(t) && sf(e, t), of(n, e));
}
function rf(t) {
  return (t & 128) === 0;
}
function sf(t, n) {
  return rs(t, n | 128);
}
function rs(t, n) {
  return ve.chmodSync(t, n);
}
function of(t, n) {
  const e = ve.statSync(t);
  return Qp(n, e.atime, e.mtime);
}
function af(t, n, e, i, s) {
  return n ? ra(e, i, s) : lf(t.mode, e, i, s);
}
function lf(t, n, e, i) {
  return (ve.mkdirSync(e), ra(n, e, i), rs(e, t));
}
function ra(t, n, e) {
  const i = ve.opendirSync(t);
  try {
    let s;
    for (; (s = i.readSync()) !== null; ) cf(s.name, t, n, e);
  } finally {
    i.closeSync();
  }
}
function cf(t, n, e, i) {
  const s = ni.join(n, t),
    r = ni.join(e, t);
  if (i.filter && !i.filter(s, r)) return;
  const { destStat: o } = ii.checkPathsSync(s, r, "copy", i);
  return na(o, s, r, i);
}
function uf(t, n, e, i) {
  let s = ve.readlinkSync(n);
  if ((i.dereference && (s = ni.resolve(process.cwd(), s)), t)) {
    let r;
    try {
      r = ve.readlinkSync(e);
    } catch (o) {
      if (o.code === "EINVAL" || o.code === "UNKNOWN")
        return ve.symlinkSync(s, e);
      throw o;
    }
    if (
      (i.dereference && (r = ni.resolve(process.cwd(), r)),
      ii.isSrcSubdir(s, r))
    )
      throw new Error(
        `Cannot copy '${s}' to a subdirectory of itself, '${r}'.`,
      );
    if (ii.isSrcSubdir(r, s))
      throw new Error(`Cannot overwrite '${r}' with '${s}'.`);
    return pf(s, e);
  } else return ve.symlinkSync(s, e);
}
function pf(t, n) {
  return (ve.unlinkSync(n), ve.symlinkSync(t, n));
}
var ff = Zp;
const df = ge.fromPromise;
var ss = {
  copy: df(qp),
  copySync: ff,
};
const sa = Tn,
  mf = ge.fromCallback;
function hf(t, n) {
  sa.rm(t, { recursive: !0, force: !0 }, n);
}
function gf(t) {
  sa.rmSync(t, { recursive: !0, force: !0 });
}
var Ji = {
  remove: mf(hf),
  removeSync: gf,
};
const yf = ge.fromPromise,
  oa = Pe,
  aa = se,
  la = Je,
  ca = Ji,
  Hs = yf(async function (n) {
    let e;
    try {
      e = await oa.readdir(n);
    } catch {
      return la.mkdirs(n);
    }
    return Promise.all(e.map((i) => ca.remove(aa.join(n, i))));
  });
function js(t) {
  let n;
  try {
    n = oa.readdirSync(t);
  } catch {
    return la.mkdirsSync(t);
  }
  n.forEach((e) => {
    ((e = aa.join(t, e)), ca.removeSync(e));
  });
}
var xf = {
  emptyDirSync: js,
  emptydirSync: js,
  emptyDir: Hs,
  emptydir: Hs,
};
const Sf = ge.fromPromise,
  ua = se,
  et = Pe,
  pa = Je;
async function wf(t) {
  let n;
  try {
    n = await et.stat(t);
  } catch {}
  if (n && n.isFile()) return;
  const e = ua.dirname(t);
  let i = null;
  try {
    i = await et.stat(e);
  } catch (s) {
    if (s.code === "ENOENT") {
      (await pa.mkdirs(e), await et.writeFile(t, ""));
      return;
    } else throw s;
  }
  i.isDirectory() ? await et.writeFile(t, "") : await et.readdir(e);
}
function Cf(t) {
  let n;
  try {
    n = et.statSync(t);
  } catch {}
  if (n && n.isFile()) return;
  const e = ua.dirname(t);
  try {
    et.statSync(e).isDirectory() || et.readdirSync(e);
  } catch (i) {
    if (i && i.code === "ENOENT") pa.mkdirsSync(e);
    else throw i;
  }
  et.writeFileSync(t, "");
}
var Lf = {
  createFile: Sf(wf),
  createFileSync: Cf,
};
const If = ge.fromPromise,
  fa = se,
  ut = Pe,
  da = Je,
  { pathExists: _f } = sn,
  { areIdentical: ma } = Dn;
async function vf(t, n) {
  let e;
  try {
    e = await ut.lstat(n);
  } catch {}
  let i;
  try {
    i = await ut.lstat(t);
  } catch (o) {
    throw ((o.message = o.message.replace("lstat", "ensureLink")), o);
  }
  if (e && ma(i, e)) return;
  const s = fa.dirname(n);
  ((await _f(s)) || (await da.mkdirs(s)), await ut.link(t, n));
}
function Of(t, n) {
  let e;
  try {
    e = ut.lstatSync(n);
  } catch {}
  try {
    const r = ut.lstatSync(t);
    if (e && ma(r, e)) return;
  } catch (r) {
    throw ((r.message = r.message.replace("lstat", "ensureLink")), r);
  }
  const i = fa.dirname(n);
  return (ut.existsSync(i) || da.mkdirsSync(i), ut.linkSync(t, n));
}
var Pf = {
  createLink: If(vf),
  createLinkSync: Of,
};
const dt = se,
  qn = Pe,
  { pathExists: Ef } = sn,
  Mf = ge.fromPromise;
async function Af(t, n) {
  if (dt.isAbsolute(t)) {
    try {
      await qn.lstat(t);
    } catch (r) {
      throw ((r.message = r.message.replace("lstat", "ensureSymlink")), r);
    }
    return {
      toCwd: t,
      toDst: t,
    };
  }
  const e = dt.dirname(n),
    i = dt.join(e, t);
  if (await Ef(i))
    return {
      toCwd: i,
      toDst: t,
    };
  try {
    await qn.lstat(t);
  } catch (r) {
    throw ((r.message = r.message.replace("lstat", "ensureSymlink")), r);
  }
  return {
    toCwd: t,
    toDst: dt.relative(e, t),
  };
}
function Tf(t, n) {
  if (dt.isAbsolute(t)) {
    if (!qn.existsSync(t)) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: t,
      toDst: t,
    };
  }
  const e = dt.dirname(n),
    i = dt.join(e, t);
  if (qn.existsSync(i))
    return {
      toCwd: i,
      toDst: t,
    };
  if (!qn.existsSync(t)) throw new Error("relative srcpath does not exist");
  return {
    toCwd: t,
    toDst: dt.relative(e, t),
  };
}
var Df = {
  symlinkPaths: Mf(Af),
  symlinkPathsSync: Tf,
};
const ha = Pe,
  bf = ge.fromPromise;
async function Vf(t, n) {
  if (n) return n;
  let e;
  try {
    e = await ha.lstat(t);
  } catch {
    return "file";
  }
  return e && e.isDirectory() ? "dir" : "file";
}
function Nf(t, n) {
  if (n) return n;
  let e;
  try {
    e = ha.lstatSync(t);
  } catch {
    return "file";
  }
  return e && e.isDirectory() ? "dir" : "file";
}
var kf = {
  symlinkType: bf(Vf),
  symlinkTypeSync: Nf,
};
const Bf = ge.fromPromise,
  ga = se,
  Ye = Pe,
  { mkdirs: Ff, mkdirsSync: Rf } = Je,
  { symlinkPaths: Gf, symlinkPathsSync: Wf } = Df,
  { symlinkType: $f, symlinkTypeSync: Uf } = kf,
  { pathExists: zf } = sn,
  { areIdentical: ya } = Dn;
async function Hf(t, n, e) {
  let i;
  try {
    i = await Ye.lstat(n);
  } catch {}
  if (i && i.isSymbolicLink()) {
    const [a, l] = await Promise.all([Ye.stat(t), Ye.stat(n)]);
    if (ya(a, l)) return;
  }
  const s = await Gf(t, n);
  t = s.toDst;
  const r = await $f(s.toCwd, e),
    o = ga.dirname(n);
  return ((await zf(o)) || (await Ff(o)), Ye.symlink(t, n, r));
}
function jf(t, n, e) {
  let i;
  try {
    i = Ye.lstatSync(n);
  } catch {}
  if (i && i.isSymbolicLink()) {
    const a = Ye.statSync(t),
      l = Ye.statSync(n);
    if (ya(a, l)) return;
  }
  const s = Wf(t, n);
  ((t = s.toDst), (e = Uf(s.toCwd, e)));
  const r = ga.dirname(n);
  return (Ye.existsSync(r) || Rf(r), Ye.symlinkSync(t, n, e));
}
var Kf = {
  createSymlink: Bf(Hf),
  createSymlinkSync: jf,
};
const { createFile: Ks, createFileSync: Xs } = Lf,
  { createLink: Ys, createLinkSync: qs } = Pf,
  { createSymlink: Js, createSymlinkSync: Qs } = Kf;
var Xf = {
  // file
  createFile: Ks,
  createFileSync: Xs,
  ensureFile: Ks,
  ensureFileSync: Xs,
  // link
  createLink: Ys,
  createLinkSync: qs,
  ensureLink: Ys,
  ensureLinkSync: qs,
  // symlink
  createSymlink: Js,
  createSymlinkSync: Qs,
  ensureSymlink: Js,
  ensureSymlinkSync: Qs,
};
function Yf(
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
function qf(t) {
  return (
    Buffer.isBuffer(t) && (t = t.toString("utf8")),
    t.replace(/^\uFEFF/, "")
  );
}
var os = { stringify: Yf, stripBom: qf };
let On;
try {
  On = Tn;
} catch {
  On = be;
}
const Qi = ge,
  { stringify: xa, stripBom: Sa } = os;
async function Jf(t, n = {}) {
  typeof n == "string" && (n = { encoding: n });
  const e = n.fs || On,
    i = "throws" in n ? n.throws : !0;
  let s = await Qi.fromCallback(e.readFile)(t, n);
  s = Sa(s);
  let r;
  try {
    r = JSON.parse(s, n ? n.reviver : null);
  } catch (o) {
    if (i) throw ((o.message = `${t}: ${o.message}`), o);
    return null;
  }
  return r;
}
const Qf = Qi.fromPromise(Jf);
function Zf(t, n = {}) {
  typeof n == "string" && (n = { encoding: n });
  const e = n.fs || On,
    i = "throws" in n ? n.throws : !0;
  try {
    let s = e.readFileSync(t, n);
    return ((s = Sa(s)), JSON.parse(s, n.reviver));
  } catch (s) {
    if (i) throw ((s.message = `${t}: ${s.message}`), s);
    return null;
  }
}
async function ed(t, n, e = {}) {
  const i = e.fs || On,
    s = xa(n, e);
  await Qi.fromCallback(i.writeFile)(t, s, e);
}
const td = Qi.fromPromise(ed);
function nd(t, n, e = {}) {
  const i = e.fs || On,
    s = xa(n, e);
  return i.writeFileSync(t, s, e);
}
const id = {
  readFile: Qf,
  readFileSync: Zf,
  writeFile: td,
  writeFileSync: nd,
};
var rd = id;
const wi = rd;
var sd = {
  // jsonfile exports
  readJson: wi.readFile,
  readJsonSync: wi.readFileSync,
  writeJson: wi.writeFile,
  writeJsonSync: wi.writeFileSync,
};
const od = ge.fromPromise,
  Er = Pe,
  wa = se,
  Ca = Je,
  ad = sn.pathExists;
async function ld(t, n, e = "utf-8") {
  const i = wa.dirname(t);
  return ((await ad(i)) || (await Ca.mkdirs(i)), Er.writeFile(t, n, e));
}
function cd(t, ...n) {
  const e = wa.dirname(t);
  (Er.existsSync(e) || Ca.mkdirsSync(e), Er.writeFileSync(t, ...n));
}
var as = {
  outputFile: od(ld),
  outputFileSync: cd,
};
const { stringify: ud } = os,
  { outputFile: pd } = as;
async function fd(t, n, e = {}) {
  const i = ud(n, e);
  await pd(t, i, e);
}
var dd = fd;
const { stringify: md } = os,
  { outputFileSync: hd } = as;
function gd(t, n, e) {
  const i = md(n, e);
  hd(t, i, e);
}
var yd = gd;
const xd = ge.fromPromise,
  Oe = sd;
Oe.outputJson = xd(dd);
Oe.outputJsonSync = yd;
Oe.outputJSON = Oe.outputJson;
Oe.outputJSONSync = Oe.outputJsonSync;
Oe.writeJSON = Oe.writeJson;
Oe.writeJSONSync = Oe.writeJsonSync;
Oe.readJSON = Oe.readJson;
Oe.readJSONSync = Oe.readJsonSync;
var Sd = Oe;
const wd = Pe,
  Zs = se,
  { copy: Cd } = ss,
  { remove: La } = Ji,
  { mkdirp: Ld } = Je,
  { pathExists: Id } = sn,
  eo = Dn;
async function _d(t, n, e = {}) {
  const i = e.overwrite || e.clobber || !1,
    { srcStat: s, isChangingCase: r = !1 } = await eo.checkPaths(
      t,
      n,
      "move",
      e,
    );
  await eo.checkParentPaths(t, s, n, "move");
  const o = Zs.dirname(n);
  return (Zs.parse(o).root !== o && (await Ld(o)), vd(t, n, i, r));
}
async function vd(t, n, e, i) {
  if (!i) {
    if (e) await La(n);
    else if (await Id(n)) throw new Error("dest already exists.");
  }
  try {
    await wd.rename(t, n);
  } catch (s) {
    if (s.code !== "EXDEV") throw s;
    await Od(t, n, e);
  }
}
async function Od(t, n, e) {
  return (
    await Cd(t, n, {
      overwrite: e,
      errorOnExist: !0,
      preserveTimestamps: !0,
    }),
    La(t)
  );
}
var Pd = _d;
const Ia = Tn,
  Mr = se,
  Ed = ss.copySync,
  _a = Ji.removeSync,
  Md = Je.mkdirpSync,
  to = Dn;
function Ad(t, n, e) {
  e = e || {};
  const i = e.overwrite || e.clobber || !1,
    { srcStat: s, isChangingCase: r = !1 } = to.checkPathsSync(t, n, "move", e);
  return (
    to.checkParentPathsSync(t, s, n, "move"),
    Td(n) || Md(Mr.dirname(n)),
    Dd(t, n, i, r)
  );
}
function Td(t) {
  const n = Mr.dirname(t);
  return Mr.parse(n).root === n;
}
function Dd(t, n, e, i) {
  if (i) return gr(t, n, e);
  if (e) return (_a(n), gr(t, n, e));
  if (Ia.existsSync(n)) throw new Error("dest already exists.");
  return gr(t, n, e);
}
function gr(t, n, e) {
  try {
    Ia.renameSync(t, n);
  } catch (i) {
    if (i.code !== "EXDEV") throw i;
    return bd(t, n, e);
  }
}
function bd(t, n, e) {
  return (
    Ed(t, n, {
      overwrite: e,
      errorOnExist: !0,
      preserveTimestamps: !0,
    }),
    _a(t)
  );
}
var Vd = Ad;
const Nd = ge.fromPromise;
var kd = {
    move: Nd(Pd),
    moveSync: Vd,
  },
  Bd = {
    // Export promiseified graceful-fs:
    ...Pe,
    // Export extra methods:
    ...ss,
    ...xf,
    ...Xf,
    ...Sd,
    ...Je,
    ...kd,
    ...as,
    ...sn,
    ...Ji,
  };
const le = /* @__PURE__ */ Tr(Bd);
var ls = Ar,
  Fd = se,
  Rt = oe.spawn,
  cs = "HKLM",
  va = "HKCU",
  Oa = "HKCR",
  Pa = "HKU",
  Ea = "HKCC",
  Ma = [cs, va, Oa, Pa, Ea],
  Aa = "REG_SZ",
  Ta = "REG_MULTI_SZ",
  Da = "REG_EXPAND_SZ",
  ba = "REG_DWORD",
  Va = "REG_QWORD",
  Na = "REG_BINARY",
  ka = "REG_NONE",
  Ba = [Aa, Ta, Da, ba, Va, Na, ka],
  Rd = "",
  Gd = /(\\[a-zA-Z0-9_\s]+)*/,
  Wd =
    /^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/,
  Fa =
    /^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;
function yn(t, n) {
  if (!(this instanceof yn)) return new yn(t, n);
  (Error.captureStackTrace(this, yn),
    this.__defineGetter__("name", function () {
      return yn.name;
    }),
    this.__defineGetter__("message", function () {
      return t;
    }),
    this.__defineGetter__("code", function () {
      return n;
    }));
}
ls.inherits(yn, Error);
function Gt(t) {
  var n = { stdout: "", stderr: "" };
  return (
    t.stdout.on("data", function (e) {
      n.stdout += e.toString();
    }),
    t.stderr.on("data", function (e) {
      n.stderr += e.toString();
    }),
    n
  );
}
function Wt(t, n, e) {
  var i = e.stdout.trim(),
    s = e.stderr.trim(),
    r = ls.format(
      `%s command exited with code %d:
%s
%s`,
      t,
      n,
      i,
      s,
    );
  return new yn(r, n);
}
function $d(t) {
  if (t == "x64") return "64";
  if (t == "x86") return "32";
  throw new Error("illegal architecture: " + t + " (use x86 or x64)");
}
function $t(t, n) {
  n && t.push("/reg:" + $d(n));
}
function Ut() {
  return process.platform === "win32"
    ? Fd.join(process.env.windir, "system32", "reg.exe")
    : "REG";
}
function ri(t, n, e, i, s, r, o) {
  if (!(this instanceof ri)) return new ri(t, n, e, i, s, r, o);
  var a = t,
    l = n,
    u = e,
    c = i,
    f = s,
    p = r,
    d = o;
  (this.__defineGetter__("host", function () {
    return a;
  }),
    this.__defineGetter__("hive", function () {
      return l;
    }),
    this.__defineGetter__("key", function () {
      return u;
    }),
    this.__defineGetter__("name", function () {
      return c;
    }),
    this.__defineGetter__("type", function () {
      return f;
    }),
    this.__defineGetter__("value", function () {
      return p;
    }),
    this.__defineGetter__("arch", function () {
      return d;
    }));
}
ls.inherits(ri, Object);
function ae(t) {
  if (!(this instanceof ae)) return new ae(t);
  var n = t || {},
    e = "" + (n.host || ""),
    i = "" + (n.hive || cs),
    s = "" + (n.key || ""),
    r = n.arch || null;
  if (
    (this.__defineGetter__("host", function () {
      return e;
    }),
    this.__defineGetter__("hive", function () {
      return i;
    }),
    this.__defineGetter__("key", function () {
      return s;
    }),
    this.__defineGetter__("path", function () {
      return '"' + (e.length == 0 ? "" : "\\\\" + e + "\\") + i + s + '"';
    }),
    this.__defineGetter__("arch", function () {
      return r;
    }),
    this.__defineGetter__("parent", function () {
      var o = s.lastIndexOf("\\");
      return new ae({
        host: this.host,
        hive: this.hive,
        key: o == -1 ? "" : s.substring(0, o),
        arch: this.arch,
      });
    }),
    Ma.indexOf(i) == -1)
  )
    throw new Error("illegal hive specified.");
  if (!Gd.test(s)) throw new Error("illegal key specified.");
  if (r && r != "x64" && r != "x86")
    throw new Error("illegal architecture specified (use x86 or x64)");
}
ae.HKLM = cs;
ae.HKCU = va;
ae.HKCR = Oa;
ae.HKU = Pa;
ae.HKCC = Ea;
ae.HIVES = Ma;
ae.REG_SZ = Aa;
ae.REG_MULTI_SZ = Ta;
ae.REG_EXPAND_SZ = Da;
ae.REG_DWORD = ba;
ae.REG_QWORD = Va;
ae.REG_BINARY = Na;
ae.REG_NONE = ka;
ae.REG_TYPES = Ba;
ae.DEFAULT_VALUE = Rd;
ae.prototype.values = function (n) {
  if (typeof n != "function") throw new TypeError("must specify a callback");
  var e = ["QUERY", this.path];
  $t(e, this.arch);
  var i = Rt(Ut(), e, {
      cwd: void 0,
      env: process.env,
      shell: !0,
      windowsHide: !0,
      stdio: ["ignore", "pipe", "pipe"],
    }),
    s = "",
    r = this,
    o = null,
    a = Gt(i);
  return (
    i.on("close", function (l) {
      if (!o)
        if (l !== 0) n(Wt("QUERY", l, a), null);
        else {
          for (
            var u = [],
              c = [],
              f = s.split(`
`),
              p = 0,
              d = 0,
              m = f.length;
            d < m;
            d++
          ) {
            var h = f[d].trim();
            h.length > 0 && (p != 0 && u.push(h), ++p);
          }
          for (var d = 0, m = u.length; d < m; d++) {
            var y = Fa.exec(u[d]),
              g,
              x,
              S;
            y &&
              ((g = y[1].trim()),
              (x = y[2].trim()),
              (S = y[3]),
              c.push(new ri(r.host, r.hive, r.key, g, x, S, r.arch)));
          }
          n(null, c);
        }
    }),
    i.stdout.on("data", function (l) {
      s += l.toString();
    }),
    i.on("error", function (l) {
      ((o = l), n(l));
    }),
    this
  );
};
ae.prototype.keys = function (n) {
  if (typeof n != "function") throw new TypeError("must specify a callback");
  var e = ["QUERY", this.path];
  $t(e, this.arch);
  var i = Rt(Ut(), e, {
      cwd: void 0,
      env: process.env,
      shell: !0,
      windowsHide: !0,
      stdio: ["ignore", "pipe", "pipe"],
    }),
    s = "",
    r = this,
    o = null,
    a = Gt(i);
  return (
    i.on("close", function (l) {
      o || (l !== 0 && n(Wt("QUERY", l, a), null));
    }),
    i.stdout.on("data", function (l) {
      s += l.toString();
    }),
    i.stdout.on("end", function () {
      for (
        var l = [],
          u = [],
          c = s.split(`
`),
          f = 0,
          p = c.length;
        f < p;
        f++
      ) {
        var d = c[f].trim();
        d.length > 0 && l.push(d);
      }
      for (var f = 0, p = l.length; f < p; f++) {
        var m = Wd.exec(l[f]),
          h;
        m &&
          (m[1],
          (h = m[2]),
          h &&
            h !== r.key &&
            u.push(
              new ae({
                host: r.host,
                hive: r.hive,
                key: h,
                arch: r.arch,
              }),
            ));
      }
      n(null, u);
    }),
    i.on("error", function (l) {
      ((o = l), n(l));
    }),
    this
  );
};
ae.prototype.get = function (n, e) {
  if (typeof e != "function") throw new TypeError("must specify a callback");
  var i = ["QUERY", this.path];
  (n == "" ? i.push("/ve") : (i = i.concat(["/v", n])), $t(i, this.arch));
  var s = Rt(Ut(), i, {
      cwd: void 0,
      env: process.env,
      shell: !0,
      windowsHide: !0,
      stdio: ["ignore", "pipe", "pipe"],
    }),
    r = "",
    o = this,
    a = null,
    l = Gt(s);
  return (
    s.on("close", function (u) {
      if (!a)
        if (u !== 0) e(Wt("QUERY", u, l), null);
        else {
          for (
            var c = [],
              f = null,
              p = r.split(`
`),
              d = 0,
              m = 0,
              h = p.length;
            m < h;
            m++
          ) {
            var y = p[m].trim();
            y.length > 0 && (d != 0 && c.push(y), ++d);
          }
          var g = c[c.length - 1] || "",
            x = Fa.exec(g),
            S,
            w,
            C;
          (x &&
            ((S = x[1].trim()),
            (w = x[2].trim()),
            (C = x[3]),
            (f = new ri(o.host, o.hive, o.key, S, w, C, o.arch))),
            e(null, f));
        }
    }),
    s.stdout.on("data", function (u) {
      r += u.toString();
    }),
    s.on("error", function (u) {
      ((a = u), e(u));
    }),
    this
  );
};
ae.prototype.set = function (n, e, i, s) {
  if (typeof s != "function") throw new TypeError("must specify a callback");
  if (Ba.indexOf(e) == -1) throw Error("illegal type specified.");
  var r = ["ADD", this.path];
  (n == "" ? r.push("/ve") : (r = r.concat(["/v", n])),
    (r = r.concat(["/t", e, "/d", i, "/f"])),
    $t(r, this.arch));
  var o = Rt(Ut(), r, {
      cwd: void 0,
      env: process.env,
      shell: !0,
      windowsHide: !0,
      stdio: ["ignore", "pipe", "pipe"],
    }),
    a = null,
    l = Gt(o);
  return (
    o.on("close", function (u) {
      a || s(u !== 0 ? Wt("ADD", u, l) : null);
    }),
    o.stdout.on("data", function (u) {}),
    o.on("error", function (u) {
      ((a = u), s(u));
    }),
    this
  );
};
ae.prototype.remove = function (n, e) {
  if (typeof e != "function") throw new TypeError("must specify a callback");
  var i = n
    ? ["DELETE", this.path, "/f", "/v", n]
    : ["DELETE", this.path, "/f", "/ve"];
  $t(i, this.arch);
  var s = Rt(Ut(), i, {
      cwd: void 0,
      env: process.env,
      shell: !0,
      windowsHide: !0,
      stdio: ["ignore", "pipe", "pipe"],
    }),
    r = null,
    o = Gt(s);
  return (
    s.on("close", function (a) {
      r || (a !== 0 ? e(Wt("DELETE", a, o), null) : e(null));
    }),
    s.stdout.on("data", function (a) {}),
    s.on("error", function (a) {
      ((r = a), e(a));
    }),
    this
  );
};
ae.prototype.clear = function (n) {
  if (typeof n != "function") throw new TypeError("must specify a callback");
  var e = ["DELETE", this.path, "/f", "/va"];
  $t(e, this.arch);
  var i = Rt(Ut(), e, {
      cwd: void 0,
      env: process.env,
      shell: !0,
      windowsHide: !0,
      stdio: ["ignore", "pipe", "pipe"],
    }),
    s = null,
    r = Gt(i);
  return (
    i.on("close", function (o) {
      s || (o !== 0 ? n(Wt("DELETE", o, r), null) : n(null));
    }),
    i.stdout.on("data", function (o) {}),
    i.on("error", function (o) {
      ((s = o), n(o));
    }),
    this
  );
};
ae.prototype.erase = ae.prototype.clear;
ae.prototype.destroy = function (n) {
  if (typeof n != "function") throw new TypeError("must specify a callback");
  var e = ["DELETE", this.path, "/f"];
  $t(e, this.arch);
  var i = Rt(Ut(), e, {
      cwd: void 0,
      env: process.env,
      shell: !0,
      windowsHide: !0,
      stdio: ["ignore", "pipe", "pipe"],
    }),
    s = null,
    r = Gt(i);
  return (
    i.on("close", function (o) {
      s || (o !== 0 ? n(Wt("DELETE", o, r), null) : n(null));
    }),
    i.stdout.on("data", function (o) {}),
    i.on("error", function (o) {
      ((s = o), n(o));
    }),
    this
  );
};
ae.prototype.create = function (n) {
  if (typeof n != "function") throw new TypeError("must specify a callback");
  var e = ["ADD", this.path, "/f"];
  $t(e, this.arch);
  var i = Rt(Ut(), e, {
      cwd: void 0,
      env: process.env,
      shell: !0,
      windowsHide: !0,
      stdio: ["ignore", "pipe", "pipe"],
    }),
    s = null,
    r = Gt(i);
  return (
    i.on("close", function (o) {
      s || (o !== 0 ? n(Wt("ADD", o, r), null) : n(null));
    }),
    i.stdout.on("data", function (o) {}),
    i.on("error", function (o) {
      ((s = o), n(o));
    }),
    this
  );
};
ae.prototype.keyExists = function (n) {
  return (
    this.values(function (e, i) {
      if (e) return e.code == 1 ? n(null, !1) : n(e);
      n(null, !0);
    }),
    this
  );
};
ae.prototype.valueExists = function (n, e) {
  return (
    this.get(n, function (i, s) {
      if (i) return i.code == 1 ? e(null, !1) : e(i);
      e(null, !0);
    }),
    this
  );
};
var Ud = ae;
const Qe = /* @__PURE__ */ Tr(Ud),
  zd = [
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StartupApproved\\Run",
    "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StartupApproved\\Run32",
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
    "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
    "HKCU\\Software",
    "HKCR\\CLSID",
  ];
class Hd {
  async getRegistryKey(n) {
    return new Qe({
      hive: n.startsWith("HKCU") ? Qe.HKCU : Qe.HKLM,
      key: n.substring(n.indexOf("\\") + 1),
    });
  }
  async getRegistryValues(n, e) {
    return new Promise((i, s) => {
      n.values((r, o) => {
        r
          ? s(r)
          : i(
              o.map((a) => ({
                name: a.name,
                path: `${e}\\${a.name}`,
                value: a.value,
                type: a.type,
                isInvalid: !1,
              })),
            );
      });
    });
  }
  async validateRegistryItem(n) {
    if (n.type !== "REG_SZ" && n.type !== "REG_EXPAND_SZ") return !1;
    const e = n.value
      .replace(/"/g, "")
      .split(" ")[0]
      .replace(/%([^%]+)%/g, (i, s) => process.env[s] || "");
    if (!e) return !1;
    try {
      return (await le.access(e), !1);
    } catch {
      return !0;
    }
  }
  async scanRegistry() {
    const n = [];
    for (const e of zd)
      try {
        const i = await this.getRegistryKey(e),
          s = await this.getRegistryValues(i, e);
        for (const r of s)
          (await this.validateRegistryItem(r)) &&
            n.push({ ...r, isInvalid: !0 });
      } catch (i) {
        console.error(`Failed to scan registry key ${e}:`, i);
      }
    return n;
  }
  async backupRegistry(n) {
    const e = se.join(ht.getPath("userData"), "registry-backups");
    await le.mkdir(e, { recursive: !0 });
    const i = se.join(e, `backup-${n.timestamp}.json`);
    await le.writeFile(i, JSON.stringify(n, null, 2));
  }
  async cleanRegistry(n) {
    for (const e of n)
      try {
        const i = e.path.substring(0, e.path.lastIndexOf("\\")),
          s = e.path.substring(e.path.lastIndexOf("\\") + 1),
          r = new Qe({
            hive: i.startsWith("HKCU") ? Qe.HKCU : Qe.HKLM,
            key: i.substring(i.indexOf("\\") + 1),
          });
        await new Promise((o, a) => {
          r.remove(s, (l) => {
            l ? a(l) : o();
          });
        });
      } catch (i) {
        throw (
          console.error(`Failed to clean registry entry ${e.path}:`, i),
          i
        );
      }
  }
  async restoreRegistry(n) {
    for (const e of n.items)
      try {
        const i = e.path.substring(0, e.path.lastIndexOf("\\")),
          s = e.path.substring(e.path.lastIndexOf("\\") + 1),
          r = new Qe({
            hive: i.startsWith("HKCU") ? Qe.HKCU : Qe.HKLM,
            key: i.substring(i.indexOf("\\") + 1),
          });
        await new Promise((o, a) => {
          r.set(s, e.type, e.value, (l) => {
            l ? a(l) : o();
          });
        });
      } catch (i) {
        throw (
          console.error(`Failed to restore registry entry ${e.path}:`, i),
          i
        );
      }
  }
}
let xn;
if (process.platform === "win32") xn = new Hd();
else {
  class t {
    async scanRegistry() {
      return (console.warn("Registry scanning not supported on this OS."), []);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async backupRegistry(e) {
      console.warn("Registry backup not supported on this OS.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async cleanRegistry(e) {
      console.warn("Registry cleaning not supported on this OS.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async restoreRegistry(e) {
      console.warn("Registry restore not supported on this OS.");
    }
  }
  xn = new t();
}
const Ci = {
  scanRegistry: async () => xn.scanRegistry(),
  backupRegistry: async (t) => xn.backupRegistry(t),
  cleanRegistry: async (t) => xn.cleanRegistry(t),
  restoreRegistry: async (t) => xn.restoreRegistry(t),
};
function jd() {
  (Se.handle("scan-registry", () => Ci.scanRegistry()),
    Se.handle("backup-registry", (t, n) => Ci.backupRegistry(n)),
    Se.handle("clean-registry", (t, n) => Ci.cleanRegistry(n)),
    Se.handle("restore-registry", (t, n) => Ci.restoreRegistry(n)));
}
const ci = se.join(ht.getPath("userData"), "ai-data"),
  Fn = se.join(ci, "performance.json"),
  Rn = se.join(ci, "crashes.json"),
  Gn = se.join(ci, "app-usage.json"),
  yr = se.join(ci, "system-events.json"),
  Li = {
    initDataDir: async () => {
      await le.ensureDir(ci);
    },
    logPerformance: async (t) => {
      try {
        let n = [];
        ((await le.pathExists(Fn)) &&
          (n = JSON.parse(await le.readFile(Fn, "utf-8"))),
          n.push(t),
          n.length > 1e3 && (n = n.slice(n.length - 1e3)),
          await le.writeFile(Fn, JSON.stringify(n, null, 2)));
      } catch (n) {
        console.error("Failed to log performance data:", n);
      }
    },
    logCrash: async (t) => {
      try {
        let n = [];
        ((await le.pathExists(Rn)) &&
          (n = JSON.parse(await le.readFile(Rn, "utf-8"))),
          n.push(t),
          n.length > 100 && (n = n.slice(n.length - 100)),
          await le.writeFile(Rn, JSON.stringify(n, null, 2)));
      } catch (n) {
        console.error("Failed to log crash data:", n);
      }
    },
    logAppUsage: async (t) => {
      try {
        let n = [];
        ((await le.pathExists(Gn)) &&
          (n = JSON.parse(await le.readFile(Gn, "utf-8"))),
          n.push(t),
          n.length > 1e3 && (n = n.slice(n.length - 1e3)),
          await le.writeFile(Gn, JSON.stringify(n, null, 2)));
      } catch (n) {
        console.error("Failed to log app usage data:", n);
      }
    },
    logSystemEvent: async (t) => {
      try {
        let n = [];
        ((await le.pathExists(yr)) &&
          (n = JSON.parse(await le.readFile(yr, "utf-8"))),
          n.push(t),
          n.length > 500 && (n = n.slice(n.length - 500)),
          await le.writeFile(yr, JSON.stringify(n, null, 2)));
      } catch (n) {
        console.error("Failed to log system event data:", n);
      }
    },
    getSuggestions: async () => {
      const t = [];
      try {
        if (await le.pathExists(Fn)) {
          const n = JSON.parse(await le.readFile(Fn, "utf-8"));
          n.slice(-50).filter((r) => r.cpu > 80).length > 10 &&
            t.push(
              "Sustained high CPU usage detected. Consider checking background processes or running a system scan.",
            );
          const s = n[n.length - 1];
          s &&
            s.totalDisk > 0 &&
            (s.totalDisk - s.diskUsage) / s.totalDisk < 0.1 &&
            t.push(
              "Your disk space is running low. Consider cleaning junk files or uninstalling unused applications.",
            );
        }
        if (await le.pathExists(Rn)) {
          const n = JSON.parse(await le.readFile(Rn, "utf-8"));
          if (n.length > 5) {
            const e = n[n.length - 1].appName;
            t.push(
              `Multiple application crashes detected for ${e}. This might indicate system instability or problematic software.`,
            );
          }
        }
        if (await le.pathExists(Gn)) {
          const e = JSON.parse(await le.readFile(Gn, "utf-8")).reduce(
              (s, r) => ((s[r.appName] = (s[r.appName] || 0) + r.duration), s),
              {},
            ),
            i = Object.entries(e).sort((s, r) => r[1] - s[1]);
          if (i.length > 0) {
            const s = i[0][0];
            t.push(
              `The application '${s}' is consuming the most resources. If you are not using it, consider closing it to improve performance.`,
            );
          }
        }
      } catch (n) {
        console.error("Failed to analyze AI data:", n);
      }
      return t;
    },
  };
function Kd() {
  (Se.handle("ai-init-data-dir", () => Li.initDataDir()),
    Se.handle("ai-log-performance", (t, n) => Li.logPerformance(n)),
    Se.handle("ai-log-crash", (t, n) => Li.logCrash(n)),
    Se.handle("ai-get-suggestions", () => Li.getSuggestions()));
}
const Ra = se.join(ht.getPath("userData"), "memory-data"),
  Wn = se.join(Ra, "memory_usage.json"),
  $n = {
    initDataDir: async () => {
      await le.ensureDir(Ra);
    },
    logUsage: async (t) => {
      try {
        let n = [];
        ((await le.pathExists(Wn)) &&
          (n = JSON.parse(await le.readFile(Wn, "utf-8"))),
          n.push(t),
          n.length > 1e3 && (n = n.slice(n.length - 1e3)),
          await le.writeFile(Wn, JSON.stringify(n, null, 2)));
      } catch (n) {
        console.error("Failed to log memory usage data:", n);
      }
    },
    getCurrentUsage: async () => {
      try {
        const t = await Nt.mem();
        return {
          timestamp: /* @__PURE__ */ new Date().toISOString(),
          total: t.total,
          used: t.used,
          free: t.free,
          usedPercentage: parseFloat(((t.used / t.total) * 100).toFixed(2)),
        };
      } catch (t) {
        throw (console.error("Failed to get current memory usage:", t), t);
      }
    },
    optimize: async () => {
      const t = [];
      try {
        const n = await Nt.mem();
        return (
          parseFloat(((n.used / n.total) * 100).toFixed(2)) > 85
            ? t.push(
                "High memory usage detected. Consider closing unused applications to free up RAM.",
              )
            : t.push("Memory usage is within normal limits."),
          t.push(
            "Regularly check for applications with potential memory leaks.",
          ),
          { success: !0, suggestions: t }
        );
      } catch (n) {
        return (
          console.error("Failed to optimize memory:", n),
          {
            success: !1,
            error: n.message || "Failed to optimize memory.",
          }
        );
      }
    },
    getHistory: async () => {
      try {
        return (await le.pathExists(Wn))
          ? JSON.parse(await le.readFile(Wn, "utf-8"))
          : [];
      } catch (t) {
        return (console.error("Failed to get memory usage history:", t), []);
      }
    },
  };
function Xd() {
  (Se.handle("memory-init-data-dir", () => $n.initDataDir()),
    Se.handle("memory-get-current-usage", async () => {
      const t = await $n.getCurrentUsage();
      return ($n.logUsage(t), t);
    }),
    Se.handle("memory-optimize", () => $n.optimize()),
    Se.handle("memory-get-history", () => $n.getHistory()));
}
const Yd = za(import.meta.url),
  no = se.dirname(Yd);
class qd {
  constructor() {
    ((this.mainWindow = null), (this.usageInterval = null));
  }
  async sendSystemUsage() {
    try {
      if (!this.mainWindow) return;
      const [n, e] = await Promise.all([Nt.currentLoad(), Nt.mem()]);
      this.mainWindow.webContents.send("updateMetrics", {
        cpu: parseFloat(n.currentLoad.toFixed(2)),
        mem: parseFloat(((e.used / e.total) * 100).toFixed(2)),
      });
    } catch (n) {
      console.error("Error fetching system usage:", n);
    }
  }
  createWindow() {
    ((this.mainWindow = new xr({
      width: 850,
      height: 600,
      minWidth: 850,
      minHeight: 600,
      webPreferences: {
        preload: se.join(no, "preload.cjs"),
        contextIsolation: !0,
        nodeIntegration: !1,
      },
      title: "WesGuard",
      icon: se.join(no, "assets/icon.png"),
      // Assuming an icon file exists
    })),
      Sr.env.VITE_DEV_SERVER_URL
        ? this.mainWindow.loadURL(Sr.env.VITE_DEV_SERVER_URL)
        : this.mainWindow.loadFile(
            se.join(ht.getAppPath(), "dist", "index.html"),
          ),
      this.mainWindow.on("closed", () => {
        ((this.mainWindow = null), clearInterval(this.usageInterval));
      }));
  }
  init() {
    ht.whenReady().then(() => {
      (this.createWindow(),
        (this.usageInterval = setInterval(() => this.sendSystemUsage(), 2e3)),
        ht.on("activate", () => {
          xr.getAllWindows().length === 0 && this.createWindow();
        }));
    });
  }
}
jd();
Kd();
Xd();
const mt = new qd();
mt.init();
ht.on("window-all-closed", function () {
  Sr.platform !== "darwin" && ht.quit();
});
Se.on("get-system-info", async (t) => {
  console.log("Main process: Received 'get-system-info' request.");
  try {
    const [n, e] = await Promise.all([Nt.osInfo(), Nt.cpu()]),
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
Se.handle("get-disk-and-network-metrics", async () => {
  try {
    const [t, n] = await Promise.all([Nt.fsSize(), Nt.networkStats()]);
    let e = { diskUsage: 0, totalDisk: 0 };
    if (t.length > 0) {
      const s = t.reduce((o, a) => o + a.size, 0),
        r = t.reduce((o, a) => o + a.used, 0);
      e = {
        diskUsage: parseFloat(((r / s) * 100).toFixed(2)),
        totalDisk: s,
      };
    }
    let i = { netRx: 0, netTx: 0 };
    if (n.length > 0) {
      const s = n.reduce((o, a) => o + a.rx_sec, 0),
        r = n.reduce((o, a) => o + a.tx_sec, 0);
      i = { netRx: s, netTx: r };
    }
    return { ...e, ...i };
  } catch (t) {
    return (
      console.error("Error fetching disk and network metrics:", t),
      {
        error: t.message || "Failed to fetch system info",
      }
    );
  }
});
Se.handle("analyze-junk-files", async () => {
  const t = [
      Ae.tmpdir(),
      // Common junk file locations on Windows
      se.join(Ae.homedir(), "Downloads"),
      se.join(Ae.homedir(), "AppData", "Local", "Temp"),
      se.join(
        Ae.homedir(),
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
      const s = await le.readdir(i);
      for (const r of s) {
        const o = se.join(i, r);
        try {
          const a = await le.stat(o);
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
Se.handle("execute-cleaning", async (t, n) => {
  let e = 0,
    i = 0;
  for (const s of n)
    try {
      (await le.remove(s), e++);
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
Se.on("show-reminder-notification", (t, n, e, i) => {
  if (xr.getAllWindows().length === 0) return;
  const s = new Ga({
    title: n,
    body: e,
    silent: !i,
    // If sound is provided, it's not silent
  });
  (s.on("click", () => {
    mt.mainWindow && (mt.mainWindow.show(), mt.mainWindow.focus());
  }),
    s.show());
});
Se.on("set-system-metrics-interval", (t, n) => {
  (mt.usageInterval && clearInterval(mt.usageInterval),
    (mt.usageInterval = setInterval(() => mt.sendSystemUsage(), n)));
});
