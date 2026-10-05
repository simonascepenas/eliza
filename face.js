// Pixel portrait (blinks, talks, can speak aloud) plus the chat log helpers that main.py calls.

const PALETTE = {
  K: "#26140f", // hair, deepest shadow
  H: "#3b2219", // hair
  h: "#57321f", // hair sheen
  g: "#7a4a30", // hair highlight
  S: "#f2c29b", // skin
  l: "#f9d8b8", // skin highlight
  s: "#e2a985", // skin shadow
  z: "#c98663", // skin deep shadow
  D: "#3b2219", // eyebrows
  E: "#1d1420", // lashes, pupils
  W: "#fdf6ec", // eye whites
  I: "#6e4a33", // iris
  w: "#ffffff", // eye highlight
  B: "#ee9a8f", // blush
  b: "#f1ae96", // blush edge
  U: "#a83a4e", // upper lip
  L: "#c9505f", // lower lip
  p: "#e07a86", // lip highlight
  M: "#4a1420", // open mouth
  T: "#f3e6dc", // teeth
  N: "#e5b08b", // neck
  n: "#c98d6b", // neck shadow
  C: "#2f8f83", // top
  c: "#22695f", // top shadow
  Q: "#46aa9b", // top highlight
};

// 48 x 54 grid. "." is transparent (the canvas background shows through).
const BASE = [
  "...................HHHHHHHHHH...................",
  "................HHHHHHHHHHHHHHHH................",
  "..............HHHHHHHhhhhhhHHHHHHH..............",
  "............HHHHHhhgggghhhhhhhHHHHHH............",
  "...........HHHHhgggHHHHHHHHHHhhhHHHHH...........",
  "..........HHHHgggHHhhHHHHHHHHHHhhhHHHH..........",
  ".........HHHhggHHHHHHHhhHHHHHHHHHhhHHHH.........",
  "........HHHhhhHHHHHHHHHHhhHHHHHHHHhhHHHH........",
  ".......HHHhhHHHHHHHhhHHHHHhhHHHHHHHHhHHHH.......",
  ".......HHHhhHHHHHHHHHhhhHHHHhhHHHHHHHHHHH.......",
  "......HHHhhHHHHHHHsHHHHHHhHHHHHhHHHHHHHHHH......",
  "......HHHHHHHHHHHsSHHHHHHHhhHHHHhHHHHHHHHH......",
  ".....HHHHHHHHHHHsSSssssHHHHHhhHHHhhHHHHHHHH.....",
  ".....HHHHHHHHHHsSSSSSSSssHHHHHhhHHHhHHHHHHH.....",
  ".....HHHHHHHHHsSSSSSSSSSSssHHHHHhHHHhHHHHHH.....",
  "....HHHHHHHHHsSSSSSSSllSSSSssHHHHHhHHHHHHHHH....",
  "....HHHHHHHHHSSSSSSSSSSSSSSSSssHHHHhHHHHHHHH....",
  "....HHHHhHHhsSDDDDDSSSSSSSSSSDDDDDHHhHHhHHHH....",
  "....HHHHhHHsSDDSSSSDSSSSSSSSDSSSsDDHHHHhHHHH....",
  "....HHHHhHKSDSSSSSSSSSSSSSSSSSSSSSsDHHHhHHHH....",
  "....HHHHhHKSSSSSSSSSSSSSSSSSSSSSSSSssKHhHHHH....",
  "....HHHHhHKSEEEEEEESSSSSSSSSSEEEEEEEsKHhHHHH....",
  "....HHHHhHKSEWWwIIWESSSSSSSSEWWwIIWEsKHhHHHH....",
  "....HHHHhHKSSWWIEIWSSSSSSSSSSWWIEIWSsKHhHHHH....",
  "....HHHHhHhSSSSSSSSSSSSSSSSSSSSSSSSSshHhHHHH....",
  "....HHHHhHhSSSSSSSSSSSSSsSSSSSSSSSSSshHhHHHH....",
  "....HHHHhHhSSSSSSSSSSSSSsSSSSSSSSSSSshHhHHHH....",
  "....HHHHhHhSSSSSSSSSSSSlSsSSSSSSSSSSshHhHHHH....",
  "....HHHhHHhSSbBBbSSSSzSszSSSSSSSbBBbshHHhHHH....",
  "....HHHhHHhSbBBBbSSSSSSSSSSSSSSbBBBbshHHhHHH....",
  "....HHHhHHKSSSSSSSSSSSSSSSSSSSSSSSSssKHHhHHH....",
  "....HHHhHHKSSSSSSSSSSSSSSSSSSSSSSSSssKHHhHHH....",
  "....HHHhHHKKSSSSSSSSSUUUUUUSSSSSSSssKKHHhHHH....",
  "....HHHhHHKKsSSSSSSSSLpLLLLSSSSSSSssKKHHhHHH....",
  "....HHHhHHKKKsSSSSSSSSLLLLSSSSSSSssKKKHHhHHH....",
  "....HHHhHHKKKKsSSSSSSSSSSSSSSSSSssKKKKHHhHHH....",
  "....HHHhHhKKKKKsSSSSSSSSSSSSSSSssKKKKKhHhHHH....",
  "....HHHhHhKKKKKKsSSSSSSSSSSSSSssKKKKKKhHhHHH....",
  "....HHHhHhKKKKKKKsSSSSSSSSSSSssKKKKKKKhHhHHH....",
  "....HHHhHHKKKKKKKKssSSSSSSSSssKKKKKKKKHHhHHH....",
  "....HHHhHHKKKKKKKKKKssssssssKKKKKKKKKKHHhHHH....",
  "....HHHhHHKKKKKKKKKKNnnnnnnnKKKKKKKKKKHHhHHH....",
  ".....HHhHHKKKKKKKKKKNNNNNNNnKKKKKKKKKKHHhHH.....",
  ".....HHhHHKKKKKKKKKKNNNNNNNnKKKKKKKKKKHHhHH.....",
  ".....HHhHHKKKccccNNNNNNNNNNNNNnccccKKKHHhHH.....",
  "......HhHccccCCCCNNNNNNNNNNNNNnCCCCccccHhH......",
  "...QQHHHcCCCCCCCCcNNNNNNNNNNNncCCCCCCCCcHHHQQ...",
  "QQQCCHHHCCCCCCCCCCNNNNNNNNNNNnCCCCCCCCCCHHHCCQQQ",
  "CCCCCcHcCCCCCCCCCCNNNNNNNNNNNNCCCCCCCCCCcHcCCCCC",
  "CCCCCCcCCCCCCCCCCCccccNNNNccccCCCCCCCCCCCcCCCCCC",
  "CCCCCCCCCCCCCCCCCCCCCCccccCCCCCCCCCCCCCCCCCCCCCC",
  "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
  "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
  "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
];

// Patches drawn over BASE: closed eyes, and two mouth shapes for talking.
const FRAMES = {
  blink: { x: 12, y: 21, rows: ["SSSSSSSSSSSSSSSSSSSSSSSS", "sssssssSSSSSSSSSSssssssS", "EEEEEEESSSSSSSSSSEEEEEEE", "SESSSSESSSSSSSSSSESSSSES"] },
  half: { x: 20, y: 33, rows: ["UMMMMMMU", "SLpLLLLS", "SSLLLLSS"] },
  open: { x: 20, y: 33, rows: ["UTTTTTTU", "UMMMMMMU", "SLpLLLLS", "SSLLLLSS"] },
};

const ART_W = 48;
const ART_H = 54;

const canvas = document.getElementById("face");
const ctx = canvas.getContext("2d");
const log = document.getElementById("log");
const statusEl = document.getElementById("status");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let blinking = false;
let mouth = "closed"; // closed | half | open

function composeRows() {
  const rows = BASE.slice();
  const apply = (patch) => patch.rows.forEach((row, i) => {
    const y = patch.y + i;
    rows[y] = rows[y].slice(0, patch.x) + row + rows[y].slice(patch.x + row.length);
  });
  if (blinking) apply(FRAMES.blink);
  if (mouth !== "closed") apply(FRAMES[mouth]);
  return rows;
}

// Draws every art pixel onto whole screen pixels, so edges stay sharp at any size.
function drawFace() {
  const kx = canvas.width / ART_W;
  const ky = canvas.height / ART_H;
  const rows = composeRows();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < ART_H; y++) {
    const row = rows[y];
    const y0 = Math.round(y * ky);
    const y1 = Math.round((y + 1) * ky);
    let x = 0;
    while (x < ART_W) {
      const ch = row[x];
      let end = x + 1;
      while (end < ART_W && row[end] === ch) end++;
      if (ch !== ".") {
        const x0 = Math.round(x * kx);
        ctx.fillStyle = PALETTE[ch];
        ctx.fillRect(x0, y0, Math.round(end * kx) - x0, y1 - y0);
      }
      x = end;
    }
  }
}

// Match the canvas to its on-screen size (including high-density screens).
function fitCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = Math.max(ART_W, Math.round(rect.width * dpr));
  const h = Math.max(ART_H, Math.round(rect.height * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  drawFace();
}

function scheduleBlink() {
  setTimeout(() => {
    blinking = true;
    drawFace();
    setTimeout(() => {
      blinking = false;
      drawFace();
      scheduleBlink();
    }, 140);
  }, 2200 + Math.random() * 3500);
}

if ("ResizeObserver" in window) new ResizeObserver(fitCanvas).observe(canvas);
fitCanvas();
scheduleBlink();

// ---- Mouth movement while ELIZA is typing or speaking ----

let talkers = 0;
let mouthTimer = null;

function nextMouth() {
  if (mouth === "closed") return Math.random() < 0.5 ? "half" : "open";
  if (Math.random() < 0.5) return "closed";
  return mouth === "open" ? "half" : "open";
}

function startTalking() {
  if (reduceMotion || talkers++ > 0) return;
  mouthTimer = setInterval(() => { mouth = nextMouth(); drawFace(); }, 110);
}

function stopTalking() {
  if (reduceMotion) return;
  talkers = Math.max(0, talkers - 1);
  if (talkers > 0) return;
  clearInterval(mouthTimer);
  mouthTimer = null;
  mouth = "closed";
  drawFace();
}

// ---- Voice: reads ELIZA's replies aloud with the browser's built-in speech ----

const synth = "speechSynthesis" in window ? window.speechSynthesis : null;
const voiceBtn = document.getElementById("voice");
let voiceOn = false;
let elizaVoice = null;
let currentUtterance = null; // kept so the browser doesn't drop its end event

const PREFERRED_VOICES = [
  "Samantha", "Google UK English Female", "Microsoft Sonia", "Microsoft Libby",
  "Microsoft Aria", "Microsoft Jenny", "Microsoft Zira", "Karen", "Moira",
  "Tessa", "Serena", "Fiona", "Victoria", "Susan", "Female",
];

function pickVoice() {
  const voices = synth.getVoices();
  const english = voices.filter((v) => /^en([-_]|$)/i.test(v.lang));
  for (const name of PREFERRED_VOICES) {
    const match = english.find((v) => v.name.includes(name));
    if (match) { elizaVoice = match; return; }
  }
  elizaVoice = english.find((v) => v.localService) || english[0] || null;
}

// ELIZA answers in capitals; sentence case keeps speech engines from spelling words out.
function speakable(text) {
  return text
    .toLowerCase()
    .replace(/\bi\b/g, "I")
    .replace(/(^|[.?!]\s+)([a-z])/g, (_, before, letter) => before + letter.toUpperCase());
}

function speak(text) {
  return new Promise((resolve) => {
    if (!voiceOn || !synth) return resolve();
    const u = new SpeechSynthesisUtterance(speakable(text));
    if (elizaVoice) { u.voice = elizaVoice; u.lang = elizaVoice.lang; } else { u.lang = "en-US"; }
    u.rate = 0.95;
    u.pitch = 1.05;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(guard);
      if (currentUtterance === u) currentUtterance = null;
      resolve();
    };
    // Some browsers never fire "end"; don't let the conversation wait forever.
    const guard = setTimeout(finish, 2000 + text.length * 120);
    u.onend = finish;
    u.onerror = finish;
    currentUtterance = u;
    synth.speak(u);
  });
}

function setVoice(on) {
  voiceOn = on;
  voiceBtn.setAttribute("aria-pressed", String(on));
  voiceBtn.querySelector(".voice-state").textContent = on ? "on" : "off";
  try { localStorage.setItem("eliza-voice", on ? "on" : "off"); } catch (e) { /* storage blocked */ }
  if (!on && synth) synth.cancel();
}

if (synth) {
  pickVoice();
  synth.onvoiceschanged = pickVoice;
  voiceBtn.hidden = false;
  let saved = "off";
  try { saved = localStorage.getItem("eliza-voice") || "off"; } catch (e) { /* storage blocked */ }
  setVoice(saved === "on");
  voiceBtn.addEventListener("click", () => {
    setVoice(!voiceOn);
    // Read the latest reply right away, so turning the voice on is audible.
    if (voiceOn) {
      const lines = log.querySelectorAll(".line.eliza .text");
      const last = lines.length ? lines[lines.length - 1].textContent : "";
      if (last) queue(() => talk(() => speak(last)));
    }
  });
}

// ---- Chat log helpers (called from main.py) ----

function addLine(who, text) {
  const line = document.createElement("p");
  line.className = "line " + who;
  const label = document.createElement("span");
  label.className = "who";
  label.textContent = who === "you" ? "YOU" : "ELIZA";
  const body = document.createElement("span");
  body.className = "text";
  body.textContent = text;
  line.append(label, body);
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
  return body;
}

// Replies play one after another.
let queueTail = Promise.resolve();
function queue(task) {
  queueTail = queueTail.then(task, task);
  return queueTail;
}

// Runs a step with the mouth moving and the status set to "speaking".
function talk(step) {
  statusEl.textContent = "speaking";
  startTalking();
  return step().then(() => {
    stopTalking();
    statusEl.textContent = "listening";
  });
}

function typeOut(body, text, delay) {
  return new Promise((done) => {
    let i = 0;
    const timer = setInterval(() => {
      body.textContent = text.slice(0, ++i);
      log.scrollTop = log.scrollHeight;
      if (i >= text.length) {
        clearInterval(timer);
        done();
      }
    }, delay);
  });
}

// Types the reply out letter by letter (and speaks it when Voice is on).
function elizaSay(text) {
  queue(() => talk(() => {
    const body = addLine("eliza", reduceMotion ? text : "");
    const typed = reduceMotion ? Promise.resolve() : typeOut(body, text, voiceOn ? 55 : 35);
    return Promise.all([typed, speak(text)]);
  }));
}

function setReady() {
  const input = document.getElementById("message");
  input.disabled = false;
  document.getElementById("send").disabled = false;
  statusEl.textContent = "listening";
  input.focus();
}

window.addLine = addLine;
window.elizaSay = elizaSay;
window.setReady = setReady;
