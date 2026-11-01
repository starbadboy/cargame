// 车辆音效：全部用 Web Audio 合成，不需要音频文件。车开进来大约 1.2 秒，音效约 2.5 秒。
let audio;
const ac = () => (audio ||= new (window.AudioContext || window.webkitAudioContext)());

// 振荡器：type 波形, freqs [[时间, 频率]...], 从 t0 开始持续 dur 秒
function osc(type, freqs, t0, dur, vol, dest, filterHz) {
  const c = ac(), o = c.createOscillator(), g = c.createGain();
  o.type = type;
  freqs.forEach(([t, f], i) => i ? o.frequency.linearRampToValueAtTime(f, t0 + t) : o.frequency.setValueAtTime(f, t0 + t));
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + Math.min(.05, dur / 4));
  g.gain.setValueAtTime(vol, t0 + dur - Math.min(.08, dur / 4));
  g.gain.linearRampToValueAtTime(0, t0 + dur);
  let node = o;
  if (filterHz) { const f = c.createBiquadFilter(); f.frequency.value = filterHz; o.connect(f); node = f; }
  node.connect(g).connect(dest);
  o.start(t0); o.stop(t0 + dur + .05);
  return o;
}

// 白噪声，经过滤波器：type lowpass/bandpass/highpass, hz 可以是 [[时间, 频率]...]
function noise(t0, dur, vol, dest, type, hz) {
  const c = ac(), len = Math.ceil(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  src.buffer = buf; f.type = type;
  [].concat(typeof hz === 'number' ? [[0, hz]] : hz).forEach(([t, v], i) =>
    i ? f.frequency.linearRampToValueAtTime(v, t0 + t) : f.frequency.setValueAtTime(v, t0 + t));
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + .1);
  g.gain.setValueAtTime(vol, t0 + dur - .15);
  g.gain.linearRampToValueAtTime(0, t0 + dur);
  src.connect(f).connect(g).connect(dest);
  src.start(t0);
  return g;
}

// 给一个节点加 hz 次/秒的“突突”抖动（发动机、直升机）
function throb(param, t0, dur, hz, depth) {
  const c = ac(), lfo = c.createOscillator(), g = c.createGain();
  lfo.frequency.value = hz; g.gain.value = depth;
  lfo.connect(g).connect(param);
  lfo.start(t0); lfo.stop(t0 + dur);
}

const beeps = (t0, n, gap, freq, len, vol, out, type = 'square') => {
  for (let i = 0; i < n; i++) osc(type, [[0, freq]], t0 + i * gap, len, vol, out);
};

function engine(t, out, base = 55, dur = 2.4) {
  const o = osc('sawtooth', [[0, base], [1.2, base * 1.5], [dur, base * 1.1]], t, dur, .35, out, 500);
  throb(o.frequency, t, dur, 18, base * .2);
}

const SOUNDS = {
  hilo: (t, out) => { for (let i = 0; i < 6; i++) osc('triangle', [[0, i % 2 ? 770 : 960]], t + i * .42, .4, .35, out); },
  wail: (t, out) => osc('sawtooth', [[0, 600], [.7, 1300], [1.4, 650], [2.1, 1300], [2.6, 700]], t, 2.6, .2, out, 2500),
  honk: (t, out) => {
    engine(t, out, 60, 1.6);
    [0, .28].forEach(d => { osc('square', [[0, 392]], t + 1.25 + d, .2, .18, out, 1800); osc('square', [[0, 494]], t + 1.25 + d, .2, .18, out, 1800); });
  },
  engine: (t, out) => { engine(t, out); noise(t + 1.3, .5, .25, out, 'highpass', 3000); }, // 最后“嘶”一声刹车
  digger: (t, out) => { engine(t, out, 45); beeps(t + 1.3, 3, .4, 1050, .22, .2, out, 'sine'); },
  race: (t, out) => osc('sawtooth', [[0, 120], [.9, 520], [1.1, 300], [1.8, 620], [2.4, 200]], t, 2.4, .22, out, 2200),
  motor: (t, out) => { const o = osc('square', [[0, 80], [1, 190], [2.2, 110]], t, 2.2, .15, out, 1200); throb(o.frequency, t, 2.2, 25, 15); },
  whistle: (t, out) => {
    for (let i = 0; i < 6; i++) noise(t + i * .22, .16, .3, out, 'bandpass', 900); // 咔嚓咔嚓
    [1.4, 2.0].forEach(s => [587, 740].forEach(f => osc('sine', [[0, f], [.1, f * 1.02]], t + s, .5, .2, out)));
  },
  shiphorn: (t, out) => { [98, 147].forEach(f => osc('sawtooth', [[0, f]], t + .6, 1.8, .3, out, 700)); },
  sonar: (t, out) => { [0, .7, 1.4].forEach((d, i) => osc('sine', [[0, 1200]], t + d, .5, .35 / (i + 1), out)); },
  rocket: (t, out) => noise(t, 2.6, .7, out, 'lowpass', [[0, 150], [1.2, 2500], [2.6, 600]]),
  jet: (t, out) => { noise(t, 2.5, .5, out, 'bandpass', [[0, 400], [1.2, 1800], [2.5, 700]]); osc('sine', [[0, 2400], [2.5, 1500]], t, 2.5, .05, out); },
  chopper: (t, out) => { const g = noise(t, 2.6, .5, out, 'lowpass', 500); throb(g.gain, t, 2.6, 13, .5); },
  bell: (t, out) => [.9, 1.1, 1.6, 1.8].forEach(d => [2400, 3600].forEach((f, i) => osc('sine', [[0, f]], t + d, .35, i ? .08 : .25, out))),
  jingle: (t, out) => [523, 659, 784, 659, 523, 659, 784, 1047].forEach((f, i) => osc('triangle', [[0, f]], t + .2 + i * .26, .22, .25, out)),
  burner: (t, out) => [.3, 1.4].forEach(d => noise(t + d, .8, .5, out, 'bandpass', 500)),
};

function playSound(name) {
  try {
    const c = ac();
    if (c.state === 'suspended') c.resume();
    const out = c.createGain();
    out.gain.value = .8;
    out.connect(c.destination);
    (SOUNDS[name] || SOUNDS.engine)(c.currentTime + .05, out);
  } catch (e) {
    // 音效只是锦上添花，播放失败不影响游戏
    console.warn('sound failed', e);
  }
}
