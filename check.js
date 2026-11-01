// 数据自检：node check.js
// 检查每个场景引用的素材、车辆、音效都存在，且有足够的错误选项
const fs = require('fs'), vm = require('vm');
const ctx = { console };
vm.createContext(ctx);
for (const f of ['art.js', 'vehicles.js', 'scenes.js', 'sound.js']) vm.runInContext(fs.readFileSync(`${__dirname}/${f}`, 'utf8'), ctx);
const { SCENES, VEHICLES, PLACES, PROBLEMS, FX, AFTERS, SOUNDS } = vm.runInContext('({ SCENES, VEHICLES, PLACES, PROBLEMS, FX, AFTERS, SOUNDS })', ctx);
const assert = (ok, msg) => { if (!ok) { console.error('✗', msg); process.exitCode = 1; } };

SCENES.forEach((s, i) => {
  const at = `场景${i + 1}「${s.q}」`;
  assert(PLACES[s.place], `${at} 缺少 place ${s.place}`);
  assert(PROBLEMS[s.problem], `${at} 缺少 problem ${s.problem}`);
  assert(FX[s.fx], `${at} 缺少 fx ${s.fx}`);
  assert(AFTERS[s.after], `${at} 缺少 after ${s.after}`);
  assert(VEHICLES[s.answer], `${at} 缺少车辆 ${s.answer}`);
  (s.avoid || []).forEach(v => assert(VEHICLES[v] && v !== s.answer, `${at} avoid 里的 ${v} 不对`));
  const pool = Object.keys(VEHICLES).filter(v => v !== s.answer && !(s.avoid || []).includes(v));
  assert(pool.length >= 2, `${at} 错误选项不够`);
});
Object.entries(VEHICLES).forEach(([k, v]) => assert(SOUNDS[v.sound], `车辆 ${k} 的音效 ${v.sound} 不存在`));
const unused = Object.keys(VEHICLES).filter(k => !SCENES.some(s => s.answer === k));
console.log(`${SCENES.length} 个场景, ${Object.keys(VEHICLES).length} 种车` + (unused.length ? `, 没有场景的车: ${unused}` : ''));
