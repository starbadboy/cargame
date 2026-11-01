// ===== 卡通素材：粗描边 + 圆角 + 笑脸。车辆统一朝左（从右边开进场景） =====
const OUT = '#3d3d3d', GLASS = '#bfe6ff';
const svg = (vb, body, sw = 4) =>
  `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg"><g stroke="${OUT}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round">${body}</g></svg>`;
const label = (x, y, t, size = 12, fill = OUT) =>
  `<text x="${x}" y="${y}" font-size="${size}" font-weight="bold" text-anchor="middle" fill="${fill}" stroke="none" font-family="PingFang SC, sans-serif">${t}</text>`;
const face = (cx, cy, s = 1, mood = 'happy') => {
  const mouth = mood === 'happy'
    ? `M${cx - 5 * s} ${cy + 5 * s} Q${cx} ${cy + 11 * s} ${cx + 5 * s} ${cy + 5 * s}`
    : `M${cx - 5 * s} ${cy + 10 * s} Q${cx} ${cy + 4 * s} ${cx + 5 * s} ${cy + 10 * s}`;
  return `<g stroke="none"><circle cx="${cx - 8 * s}" cy="${cy}" r="${3.2 * s}" fill="${OUT}"/><circle cx="${cx + 8 * s}" cy="${cy}" r="${3.2 * s}" fill="${OUT}"/>
    <ellipse cx="${cx - 15 * s}" cy="${cy + 6 * s}" rx="${4 * s}" ry="${2.5 * s}" fill="#ff8a80" opacity=".8"/><ellipse cx="${cx + 15 * s}" cy="${cy + 6 * s}" rx="${4 * s}" ry="${2.5 * s}" fill="#ff8a80" opacity=".8"/></g>
    <path d="${mouth}" fill="none" stroke-width="${2.5 * s}"/>`;
};
const wheel = (cx, cy = 104, r = 16) =>
  `<g class="wheel"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#4a4a4a"/><circle cx="${cx}" cy="${cy}" r="${r * .42}" fill="#e0e0e0" stroke-width="3"/><circle cx="${cx}" cy="${cy - r * .7}" r="2" fill="#e0e0e0" stroke="none"/></g>`;
const star = (cx, cy, r, fill) => {
  const p = [];
  for (let i = 0; i < 10; i++) {
    const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * .5 : r;
    p.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `<polygon points="${p.join(' ')}" fill="${fill}"/>`;
};
const checker = (x, y, cols, rows, w, h) => Array.from({ length: cols * rows }, (_, i) =>
  (i % cols + Math.floor(i / cols)) % 2 ? '' : `<rect x="${x + (i % cols) * w}" y="${y + Math.floor(i / cols) * h}" width="${w}" height="${h}" fill="${OUT}" stroke="none"/>`).join('');

// 小轿车车身，警车/出租车/坏掉的车共用
const sedan = (color, extras = '', mood = 'happy') => svg('0 0 200 130', `
  <path d="M10 104 V82 Q10 66 28 64 L52 62 L70 38 Q74 34 80 34 H130 Q136 34 140 38 L160 62 L176 64 Q192 66 192 82 V104 Z" fill="${color}"/>
  <path d="M64 62 L78 44 H102 V62Z" fill="${GLASS}"/><path d="M110 62 V44 H132 L146 62Z" fill="${GLASS}"/>
  <circle cx="18" cy="76" r="5" fill="#fff59d" stroke-width="3"/>
  ${extras}${face(44, 76, 1.1, mood)}${wheel(52)}${wheel(150)}`);
// 卡车车头（朝左），多款卡车共用
const cab = (color, light = '') => `
  <path d="M10 104 V62 Q10 42 32 42 H70 V104Z" fill="${color}"/>
  <path d="M20 66 Q20 52 34 52 H58 V66Z" fill="${GLASS}"/>
  ${light ? `<rect x="28" y="32" width="20" height="10" rx="4" fill="${light}"/>` : ''}
  <circle cx="16" cy="84" r="4" fill="#fff59d" stroke-width="3"/>${face(40, 80, 1.1)}`;

// 人物：小朋友/大人共用。hair 发色, long 长发, bun 发髻, glasses 眼镜, wave 招手, strawhat 草帽, sweat 流汗
function kid({ shirt = '#ff8a65', mood = 'happy', hair = '#6d4c41', long, bun, glasses, wave, strawhat, sweat,
               mask, cap, hardhat, helmet, bandage, backpack, bag, suitcase } = {}) {
  return svg('0 0 80 104', `
    ${backpack ? '<rect x="12" y="54" width="20" height="30" rx="6" fill="#ef5350"/>' : ''}
    <rect x="28" y="84" width="9" height="18" rx="4" fill="#546e7a"/><rect x="43" y="84" width="9" height="18" rx="4" fill="#546e7a"/>
    <rect x="22" y="54" width="36" height="34" rx="12" fill="${shirt}"/>
    ${wave ? `<path d="M54 62 L70 42" fill="none" stroke-width="10"/><path d="M54 62 L70 42" fill="none" stroke="${shirt}" stroke-width="5"/><circle cx="71" cy="40" r="5" fill="#ffd9b0" stroke-width="2.5"/>` : ''}
    ${mask ? '<path d="M24 64 H56 M24 74 H56" fill="none" stroke="#fff" stroke-width="4"/>' : ''}
    ${long ? `<path d="M17 30 Q14 58 26 60 H54 Q66 58 63 30Z" fill="${hair}"/>` : ''}
    ${bun ? `<circle cx="40" cy="8" r="8" fill="${hair}"/>` : ''}
    <circle cx="40" cy="32" r="22" fill="#ffd9b0"/>
    <path d="M18 30 Q20 8 40 9 Q60 8 62 30 Q52 18 40 20 Q28 18 18 30Z" fill="${hair}"/>
    ${face(40, 32, 1, mood)}
    ${glasses ? '<circle cx="32" cy="31" r="6" fill="none" stroke-width="2"/><circle cx="48" cy="31" r="6" fill="none" stroke-width="2"/><path d="M38 31 H42" fill="none" stroke-width="2"/>' : ''}
    ${strawhat ? '<path d="M26 16 Q28 0 40 0 Q52 0 54 16Z" fill="#ffe082"/><ellipse cx="40" cy="16" rx="30" ry="6" fill="#ffe082"/>' : ''}
    ${sweat ? '<path d="M64 14 q-4 8 0 10 q4 -2 0 -10Z M68 30 q-3 6 0 8 q3 -2 0 -8Z" fill="#4fc3f7" stroke-width="1.5"/>' : ''}
    ${mood === 'sad' ? '<path d="M30 36 q-3 7 0 9 q3 -2 0 -9Z M50 36 q-3 7 0 9 q3 -2 0 -9Z" fill="#4fc3f7" stroke-width="1.5"/>' : ''}
    ${mask ? '<rect x="16" y="24" width="48" height="13" rx="6" fill="#333"/><circle cx="32" cy="30" r="3.5" fill="#fff" stroke="none"/><circle cx="48" cy="30" r="3.5" fill="#fff" stroke="none"/>' : ''}
    ${cap ? '<path d="M16 20 Q40 -2 64 20Z" fill="#1565c0"/><rect x="14" y="18" width="52" height="6" rx="3" fill="#0d47a1"/>' + star(40, 11, 5, '#ffd54f') : ''}
    ${hardhat ? '<path d="M17 22 Q17 4 40 4 Q63 4 63 22Z" fill="#ffca28"/><rect x="12" y="20" width="56" height="6" rx="3" fill="#ffb300"/>' : ''}
    ${helmet ? `<circle cx="40" cy="32" r="28" fill="${GLASS}" opacity=".45"/>` : ''}
    ${bandage ? '<rect x="44" y="12" width="20" height="8" rx="3" fill="#ffe0b2" stroke-width="2" transform="rotate(25 54 16)"/>' : ''}
    ${bag ? `<circle cx="66" cy="76" r="12" fill="#bcaaa4"/>${label(66, 81, '$', 14, '#fff')}` : ''}
    ${suitcase ? '<path d="M62 66 V60 H72 V66" fill="none" stroke-width="3"/><rect x="56" y="66" width="22" height="26" rx="4" fill="#a1887f"/>' : ''}`, 3);
}

const PLACES = {
  tower: svg('0 0 100 160', `<rect x="10" y="8" width="80" height="152" rx="6" fill="#b0bec5"/>
    ${[0, 1, 2, 3, 4].flatMap(r => [0, 1, 2].map(c => `<rect x="${20 + c * 24}" y="${18 + r * 24}" width="14" height="14" rx="3" fill="#fff59d" stroke-width="3"/>`)).join('')}
    <rect x="38" y="134" width="24" height="26" rx="3" fill="#78909c"/>`),
  house: svg('0 0 120 120', `<rect x="18" y="52" width="84" height="68" fill="#fff3e0"/>
    <path d="M6 56 L60 12 L114 56Z" fill="#ef9a9a"/><rect x="50" y="82" width="22" height="38" rx="3" fill="#a1887f"/>
    <rect x="26" y="66" width="18" height="18" rx="2" fill="${GLASS}" stroke-width="3"/><rect x="78" y="66" width="18" height="18" rx="2" fill="${GLASS}" stroke-width="3"/>`),
  bank: svg('0 0 120 120', `<path d="M4 42 L60 8 L116 42Z" fill="#ffe082"/>${label(60, 35, '银行', 13)}
    ${[18, 42, 66, 90].map(x => `<rect x="${x}" y="48" width="12" height="60" fill="#fff"/>`).join('')}
    <rect x="8" y="42" width="104" height="8" fill="#ffd54f"/><rect x="4" y="108" width="112" height="12" fill="#ffd54f"/>`),
  school: svg('0 0 140 120', `<rect x="10" y="44" width="120" height="76" fill="#ffccbc"/>
    <path d="M40 44 L70 16 L100 44Z" fill="#a1887f"/><circle cx="70" cy="34" r="7" fill="#fff" stroke-width="3"/>
    <path d="M70 2 V18" fill="none" stroke-width="3"/><path d="M70 3 H86 V12 H70" fill="#ef5350" stroke-width="3"/>
    ${[20, 42, 84, 106].map(x => `<rect x="${x}" y="58" width="14" height="16" rx="2" fill="${GLASS}" stroke-width="3"/>`).join('')}
    <rect x="56" y="80" width="28" height="40" rx="3" fill="#a1887f"/>`),
  barn: svg('0 0 120 120', `<path d="M10 50 L60 12 L110 50 V120 H10Z" fill="#e57373"/>
    <rect x="38" y="70" width="44" height="50" fill="#fff"/><path d="M38 70 L82 120 M82 70 L38 120" fill="none" stroke="#e57373" stroke-width="5"/>
    <rect x="50" y="34" width="20" height="16" fill="#fff"/>`),
  factory: svg('0 0 140 120', `<rect x="8" y="56" width="124" height="64" fill="#cfd8dc"/>
    <path d="M8 56 L38 36 V56 L68 36 V56 L98 36 V56Z" fill="#b0bec5"/>
    <rect x="104" y="12" width="14" height="44" fill="#90a4ae"/><circle cx="114" cy="6" r="6" fill="#fff" stroke-width="3"/>
    ${[20, 50, 80].map(x => `<rect x="${x}" y="72" width="18" height="14" rx="2" fill="${GLASS}" stroke-width="3"/>`).join('')}
    <rect x="104" y="80" width="20" height="40" fill="#90a4ae"/>`),
  site: svg('0 0 140 130', `
    ${[14, 64, 114].map(x => `<rect x="${x}" y="40" width="10" height="90" fill="#ffcc80"/>`).join('')}
    <rect x="10" y="36" width="118" height="10" fill="#ffb74d"/><rect x="10" y="82" width="118" height="10" fill="#ffb74d"/>
    <path d="M24 46 L64 82 M74 46 L114 82" fill="none" stroke-width="3"/>
    <path d="M118 130 L126 108 L134 130Z" fill="#ff7043"/>`),
  park: svg('0 0 120 130', `<rect x="34" y="70" width="14" height="60" fill="#a1887f"/>
    <circle cx="41" cy="46" r="30" fill="#81c784"/><circle cx="20" cy="64" r="16" fill="#66bb6a"/><circle cx="62" cy="64" r="16" fill="#66bb6a"/>
    <rect x="80" y="92" width="28" height="38" rx="4" fill="#90a4ae"/><rect x="76" y="86" width="36" height="8" rx="3" fill="#78909c"/>`),
  garage: svg('0 0 140 120', `<rect x="10" y="36" width="120" height="84" fill="#cfd8dc"/>
    <path d="M4 40 L70 8 L136 40Z" fill="#90a4ae"/>
    <rect x="44" y="40" width="52" height="16" rx="4" fill="#ffd54f"/>${label(70, 52, '修车', 11)}
    <rect x="28" y="62" width="84" height="58" fill="#eceff1"/>
    <path d="M28 76 H112 M28 90 H112 M28 104 H112" fill="none" stroke-width="2"/>`),
  finish: svg('0 0 140 130', `<rect x="10" y="20" width="8" height="110" fill="#e0e0e0"/><rect x="122" y="20" width="8" height="110" fill="#e0e0e0"/>
    <rect x="10" y="12" width="120" height="28" fill="#fff"/>${checker(10, 12, 12, 2, 10, 14)}
    <rect x="10" y="12" width="120" height="28" fill="none"/>`),
  island: svg('0 0 140 110', `<ellipse cx="70" cy="96" rx="64" ry="14" fill="#ffe082"/>
    <path d="M66 92 Q60 60 76 30" fill="none" stroke-width="12"/><path d="M66 92 Q60 60 76 30" fill="none" stroke="#a1887f" stroke-width="6"/>
    <path d="M76 30 Q50 14 28 32 Q52 26 76 30Z M76 30 Q102 12 122 30 Q98 24 76 30Z" fill="#66bb6a"/>
    <path d="M76 30 Q70 6 48 4 Q68 16 76 30Z M76 30 Q98 40 106 60 Q90 42 76 30Z" fill="#81c784"/>
    <circle cx="72" cy="36" r="5" fill="#8d6e63" stroke-width="2"/><circle cx="82" cy="36" r="5" fill="#8d6e63" stroke-width="2"/>`),
  launch: svg('-40 0 160 160', `<rect x="14" y="10" width="10" height="150" fill="#ef5350"/><rect x="56" y="10" width="10" height="150" fill="#ef5350"/>
    ${[20, 50, 80, 110].map(y => `<path d="M24 ${y} L56 ${y + 30} M56 ${y} L24 ${y + 30}" fill="none" stroke-width="3"/>`).join('')}
    <rect x="6" y="4" width="68" height="10" rx="3" fill="#fff"/>`),
  mountain: svg('0 0 160 120', `<path d="M84 120 L122 52 L160 120Z" fill="#66bb6a"/>
    <path d="M4 120 L60 18 L116 120Z" fill="#81c784"/><path d="M60 18 L44 48 L54 42 L62 50 L72 42 L77 48Z" fill="#fff"/>`),
  station: svg('0 0 140 120', `<rect x="10" y="44" width="120" height="76" fill="#ffe0b2"/>
    <path d="M2 48 L20 22 H120 L138 48Z" fill="#7986cb"/>
    <rect x="44" y="2" width="52" height="22" rx="4" fill="#fff"/>${label(70, 18, '车站', 14)}
    <rect x="56" y="74" width="28" height="46" rx="3" fill="#a1887f"/>
    <rect x="20" y="62" width="24" height="22" rx="3" fill="${GLASS}" stroke-width="3"/><rect x="96" y="62" width="24" height="22" rx="3" fill="${GLASS}" stroke-width="3"/>`),
};

const PROBLEMS = {
  fire: svg('0 0 100 110', `<path d="M50 4 C70 30 92 44 86 76 C82 100 62 108 50 108 C30 108 12 96 14 72 C16 52 30 46 32 26 C42 38 44 48 50 52 C54 36 50 20 50 4Z" fill="#ff7043"/>
    <path d="M50 46 C62 60 72 70 68 88 C64 100 56 104 50 104 C40 104 32 96 34 84 C36 72 46 70 50 46Z" fill="#ffd54f" stroke-width="3"/>`),
  hurt: kid({ mood: 'sad', shirt: '#4fc3f7' }),
  thief: kid({ shirt: '#546e7a', mask: true, bag: true }),
  waiting: kid({ shirt: '#ba68c8', backpack: true }),
  traveler: kid({ shirt: '#4db6ac', suitcase: true }),
  lost: kid({ mood: 'sad', shirt: '#ffb74d' }),
  dreamer: kid({ shirt: '#fff', helmet: true }),
  worker: kid({ mood: 'sad', shirt: '#ff8a65', hardhat: true }),
  wheat: svg('0 0 100 100', [14, 32, 50, 68, 86].map(x => `<path d="M${x} 100 V30" fill="none" stroke="#c49a2c" stroke-width="4"/>
    ${[10, 22, 34, 46].map(y => `<ellipse cx="${x - 5}" cy="${y + 4}" rx="4" ry="7" fill="#ffd54f" stroke-width="2" transform="rotate(-25 ${x - 5} ${y + 4})"/><ellipse cx="${x + 5}" cy="${y + 4}" rx="4" ry="7" fill="#ffca28" stroke-width="2" transform="rotate(25 ${x + 5} ${y + 4})"/>`).join('')}`).join(''), 3),
  boxes: svg('0 0 100 100', [[8, 54], [50, 54], [29, 10]].map(([x, y]) => `<rect x="${x}" y="${y}" width="42" height="42" rx="4" fill="#e0b07a"/>
    <path d="M${x + 21} ${y} V${y + 14}" fill="none" stroke-width="3"/>`).join('')),
  dirt: svg('0 0 100 70', `<path d="M4 68 Q20 10 50 8 Q80 10 96 68Z" fill="#bcaaa4"/>
    <circle cx="34" cy="44" r="6" fill="#8d6e63" stroke-width="3"/><circle cx="62" cy="30" r="5" fill="#8d6e63" stroke-width="3"/><circle cx="70" cy="54" r="7" fill="#8d6e63" stroke-width="3"/>`),
  trash: svg('0 0 100 80', `<path d="M8 78 Q2 40 30 34 Q58 40 52 78Z M24 34 L30 24 L36 34" fill="#78909c"/>
    <path d="M46 78 Q42 46 68 42 Q96 46 92 78Z M62 42 L68 32 L74 42" fill="#9ccc65"/>`),
  broken: sedan('#f48fb1', `<g fill="#e0e0e0" stroke-width="3"><circle cx="30" cy="44" r="10"/><circle cx="18" cy="26" r="8"/><circle cx="34" cy="12" r="6"/></g>`, 'sad'),
  flag: svg('0 0 80 100', `<rect x="10" y="6" width="6" height="94" fill="#a1887f"/>
    <rect x="16" y="8" width="56" height="36" fill="#fff"/>${checker(16, 8, 4, 3, 14, 12)}<rect x="16" y="8" width="56" height="36" fill="none"/>`),
};

const FX = {
  water: svg('0 0 100 100', [[20, 20], [50, 10], [78, 24], [30, 50], [64, 46], [46, 78], [82, 66], [14, 76]]
    .map(([x, y]) => `<path d="M${x} ${y - 10} Q${x + 8} ${y + 2} ${x} ${y + 8} Q${x - 8} ${y + 2} ${x} ${y - 10}Z" fill="#4fc3f7"/>`).join(''), 3),
  medic: svg('0 0 100 100', `<circle cx="50" cy="50" r="40" fill="#fff"/>
    <path d="M42 22 h16 v20 h20 v16 h-20 v20 h-16 v-20 h-20 v-16 h20z" fill="#ef5350"/>`),
  siren: svg('0 0 100 100', `<circle cx="30" cy="50" r="26" fill="#ef5350"/><circle cx="70" cy="50" r="26" fill="#42a5f5"/>`),
  sparkle: svg('0 0 100 100', star(50, 50, 30, '#ffd54f') + star(16, 20, 13, '#ffb74d') + star(86, 78, 13, '#fff176'), 3),
};

const AFTERS = {
  happy: kid({ shirt: '#81c784' }),
  healed: kid({ shirt: '#4fc3f7', bandage: true }),
  cop: kid({ shirt: '#1565c0', cap: true }),
  builder: kid({ shirt: '#ff8a65', hardhat: true }),
  heart: svg('0 0 100 100', '<path d="M50 88 C10 60 6 34 22 22 C34 12 46 20 50 30 C54 20 66 12 78 22 C94 34 90 60 50 88Z" fill="#f06292"/>'),
  bread: svg('0 0 100 100', `<path d="M10 70 Q6 30 50 28 Q94 30 90 70 Z" fill="#ffb74d"/>
    <path d="M30 40 L38 60 M48 36 L54 58 M66 40 L70 60" fill="none" stroke-width="3"/>`),
  check: svg('0 0 100 100', `<circle cx="50" cy="50" r="42" fill="#81c784"/><path d="M28 52 L44 68 L74 36" stroke="#fff" stroke-width="10" fill="none"/>`),
  trophy: svg('0 0 100 100', `<path d="M28 22 H14 Q12 44 30 46 M72 22 H86 Q88 44 70 46" fill="none"/>
    <path d="M28 12 H72 V40 Q72 62 50 64 Q28 62 28 40Z" fill="#ffd54f"/>
    <rect x="44" y="64" width="12" height="14" fill="#ffca28"/><rect x="30" y="78" width="40" height="12" rx="3" fill="#a1887f"/>${star(50, 36, 11, '#fff')}`),
  star: svg('0 0 100 100', star(50, 52, 44, '#ffd54f') + face(50, 54, 1.4)),
};

// 把几个小人排成一排
const crowd = (...people) => svg('0 0 200 104', people.map((p, i) =>
  p.replace('<svg ', `<svg x="${i * 60}" width="80" height="104" `)).join(''));
const flower = (mood, petal = '#f48fb1') => svg('0 0 80 110', `
  <path d="M40 110 ${mood === 'sad' ? 'Q40 60 20 50' : 'V50'}" fill="none" stroke="#66bb6a" stroke-width="5"/>
  <path d="M40 90 Q56 74 64 82 Q56 94 40 90Z" fill="#81c784" stroke-width="3"/>
  <g transform="${mood === 'sad' ? 'translate(-20 12) rotate(-30 40 40)' : ''}">
  ${[0, 72, 144, 216, 288].map(a => `<circle cx="${40 + 16 * Math.cos(a * Math.PI / 180)}" cy="${36 + 16 * Math.sin(a * Math.PI / 180)}" r="12" fill="${petal}" stroke-width="3"/>`).join('')}
  <circle cx="40" cy="36" r="13" fill="#ffd54f" stroke-width="3"/>${face(40, 34, .55, mood)}</g>`);

Object.assign(PLACES, {
  tree: svg('0 0 120 160', `<rect x="50" y="80" width="20" height="80" fill="#a1887f"/>
    <circle cx="60" cy="50" r="42" fill="#81c784"/><circle cx="26" cy="74" r="22" fill="#66bb6a"/><circle cx="94" cy="74" r="22" fill="#66bb6a"/>`),
  forest: svg('0 0 160 120', [[30, 1], [80, 1.25], [130, 1]].map(([x, s]) => `
    <rect x="${x - 5}" y="96" width="10" height="24" fill="#a1887f"/>
    <path d="M${x} ${100 - 90 * s} L${x + 30 * s} 100 H${x - 30 * s}Z" fill="#66bb6a"/>`).join('')),
  shop: svg('0 0 140 120', `<rect x="10" y="40" width="120" height="80" fill="#fff3e0"/>
    <rect x="30" y="6" width="80" height="22" rx="4" fill="#fff"/>${label(70, 22, '商店', 14)}
    <path d="M6 30 H134 V44 ${Array.from({ length: 8 }, (_, i) => `q-8 10 -16 0`).join(' ')}Z" fill="#ef5350"/>
    <rect x="20" y="62" width="48" height="34" rx="3" fill="${GLASS}" stroke-width="3"/><rect x="82" y="64" width="34" height="56" rx="3" fill="#a1887f"/>`),
  stop: svg('0 0 120 130', `<rect x="6" y="40" width="82" height="10" rx="3" fill="#4db6ac"/>
    <rect x="12" y="50" width="6" height="80" fill="#90a4ae"/><rect x="76" y="50" width="6" height="80" fill="#90a4ae"/>
    <rect x="18" y="98" width="58" height="8" rx="3" fill="#a1887f"/>
    <rect x="98" y="24" width="6" height="106" fill="#90a4ae"/><circle cx="101" cy="22" r="15" fill="#42a5f5"/>${label(101, 27, '站', 14, '#fff')}`),
  lights: svg('-50 0 160 160', `<rect x="26" y="66" width="8" height="94" fill="#90a4ae"/>
    <rect x="12" y="4" width="36" height="66" rx="10" fill="#455a64"/>
    <circle cx="30" cy="20" r="8" fill="#ef5350" stroke-width="3"/><circle cx="30" cy="38" r="8" fill="#ffd54f" stroke-width="3"/><circle cx="30" cy="56" r="8" fill="#66bb6a" stroke-width="3"/>`),
  lighthouse: svg('-20 0 120 160', `<path d="M24 150 L34 34 H66 L76 150Z" fill="#fff"/>
    <path d="M30 80 H70 L72 104 H28Z M33 46 H67 L68 60 H32Z" fill="#ef5350"/>
    <rect x="30" y="16" width="40" height="20" rx="3" fill="#fff59d"/><path d="M26 18 L50 0 L74 18Z" fill="#ef5350"/>
    <rect x="14" y="146" width="72" height="14" rx="3" fill="#90a4ae"/>`),
  warehouse: svg('0 0 150 120', `<path d="M6 120 V46 Q75 0 144 46 V120Z" fill="#b0bec5"/>
    <rect x="30" y="56" width="90" height="64" fill="#78909c"/>
    <path d="M30 80 H120 M30 102 H120" fill="none" stroke-width="3"/>
    ${[[38, 66], [62, 66], [90, 88], [44, 88]].map(([x, y]) => `<rect x="${x}" y="${y}" width="16" height="14" rx="2" fill="#e0b07a" stroke-width="2"/>`).join('')}`),
  city: svg('0 0 160 130', [[8, 50, 40, '#90caf9'], [52, 20, 48, '#ffcc80'], [104, 64, 48, '#a5d6a7']].map(([x, y, w, c]) => `
    <rect x="${x}" y="${y}" width="${w}" height="${130 - y}" rx="4" fill="${c}"/>
    ${Array.from({ length: Math.floor((116 - y) / 22) }, (_, r) => `<rect x="${x + 8}" y="${y + 10 + r * 22}" width="${w - 16}" height="10" rx="2" fill="#fff" stroke-width="2"/>`).join('')}`).join('')),
  garden: svg('0 0 150 110', `${Array.from({ length: 7 }, (_, i) => `<path d="M${6 + i * 20} 110 V60 L${14 + i * 20} 50 L${22 + i * 20} 60 V110Z" fill="#fff"/>`).join('')}
    <path d="M2 74 H148 M2 96 H148" fill="none" stroke-width="5"/>`),
  airport: svg('0 0 160 130', `<rect x="20" y="40" width="16" height="90" fill="#cfd8dc"/>
    <path d="M8 40 L14 18 H42 L48 40Z" fill="${GLASS}"/><rect x="10" y="10" width="36" height="10" rx="3" fill="#90a4ae"/>
    <rect x="44" y="76" width="112" height="54" rx="6" fill="#eceff1"/>
    <rect x="54" y="88" width="92" height="20" rx="3" fill="${GLASS}" stroke-width="3"/>${label(100, 124, '机场', 12)}`),
  coral: svg('0 0 140 110', `<path d="M20 110 Q10 80 24 60 Q34 40 22 20 M44 110 Q56 80 42 56 Q34 40 46 24" fill="none" stroke="#66bb6a" stroke-width="7"/>
    <path d="M90 110 V70 M90 84 L74 64 M90 78 L108 58 M74 64 V48 M108 58 V44" fill="none" stroke-width="12"/>
    <path d="M90 110 V70 M90 84 L74 64 M90 78 L108 58 M74 64 V48 M108 58 V44" fill="none" stroke="#f48fb1" stroke-width="6"/>
    <path d="M118 110 Q120 96 132 98 Q140 104 136 110Z" fill="#ffe0b2" stroke-width="3"/>`),
  gas: svg('0 0 150 120', `<rect x="4" y="10" width="110" height="18" rx="3" fill="#ef5350"/>${label(59, 24, '加油站', 12, '#fff')}
    <rect x="18" y="28" width="8" height="92" fill="#cfd8dc"/><rect x="92" y="28" width="8" height="92" fill="#cfd8dc"/>
    <rect x="104" y="60" width="44" height="60" fill="#fff3e0"/><rect x="114" y="72" width="24" height="18" rx="2" fill="${GLASS}" stroke-width="3"/>`),
  port: svg('0 0 150 120', [[4, 84, '#ef5350'], [52, 84, '#42a5f5'], [100, 84, '#ffca28'], [28, 48, '#66bb6a'], [76, 48, '#ff8a65']].map(([x, y, c]) => `
    <rect x="${x}" y="${y}" width="46" height="36" rx="2" fill="${c}"/>
    <path d="M${x + 10} ${y + 6} V${y + 30} M${x + 23} ${y + 6} V${y + 30} M${x + 36} ${y + 6} V${y + 30}" fill="none" stroke-width="2"/>`).join('')),
});

Object.assign(PROBLEMS, {
  cat: svg('0 0 80 80', `<path d="M14 30 L18 6 L34 20 Z M66 30 L62 6 L46 20 Z" fill="#ffb74d"/>
    <ellipse cx="40" cy="62" rx="22" ry="16" fill="#ffb74d"/>
    <circle cx="40" cy="36" r="24" fill="#ffb74d"/>${face(40, 36, .9, 'sad')}
    <path d="M14 40 H2 M14 46 H4 M66 40 H78 M66 46 H76" fill="none" stroke-width="2"/>`),
  grandma: kid({ mood: 'sad', shirt: '#ce93d8', hair: '#e0e0e0', bun: true, glasses: true }),
  oldie: kid({ shirt: '#ce93d8', hair: '#e0e0e0', bun: true, glasses: true }),
  lady: kid({ shirt: '#f48fb1', long: true, wave: true }),
  fisher: kid({ shirt: '#4fc3f7', strawhat: true }),
  hot: kid({ mood: 'sad', shirt: '#ffcc80', sweat: true }),
  hungry: kid({ mood: 'sad', shirt: '#aed581' }),
  diver: kid({ shirt: '#ffb74d', helmet: true }),
  biker: kid({ shirt: '#4dd0e1', cap: false, wave: true }),
  crowd: crowd(kid({ shirt: '#ff8a65' }), kid({ shirt: '#ce93d8', hair: '#e0e0e0', bun: true }), kid({ shirt: '#4fc3f7', long: true })),
  family: crowd(kid({ shirt: '#64b5f6' }), kid({ shirt: '#f48fb1', long: true }), kid({ shirt: '#ffd54f', backpack: true })),
  seeds: svg('0 0 80 90', `<path d="M14 88 Q8 40 22 28 H58 Q72 40 66 88Z" fill="#d7ccc8"/><path d="M22 28 L30 16 H50 L58 28" fill="#d7ccc8"/>
    ${label(40, 64, '种子', 14)}`),
  satellite: svg('0 0 140 80', `<rect x="4" y="24" width="40" height="32" fill="#42a5f5"/><rect x="96" y="24" width="40" height="32" fill="#42a5f5"/>
    <path d="M17 24 V56 M30 24 V56 M109 24 V56 M122 24 V56" fill="none" stroke-width="2"/>
    <path d="M44 40 H96" fill="none"/><rect x="52" y="20" width="36" height="40" rx="6" fill="#ffd54f"/>${face(70, 38, .8)}`),
  hole: svg('0 0 120 70', `<ellipse cx="50" cy="56" rx="46" ry="12" fill="#5d4037"/>
    <path d="M96 68 L106 30 L116 68Z" fill="#ff7043"/><path d="M100 52 H112" fill="none" stroke="#fff" stroke-width="4"/>`),
  beams: svg('0 0 120 70', [62, 44, 26].map((y, i) => `<rect x="${6 + i * 6}" y="${y - 12}" width="${108 - i * 12}" height="14" rx="2" fill="#90a4ae"/>`).join('')),
  rocks: svg('0 0 110 70', `<path d="M4 68 Q2 36 30 30 Q54 28 56 68Z" fill="#9e9e9e"/><path d="M48 68 Q48 18 80 14 Q108 20 106 68Z" fill="#bdbdbd"/>
    <path d="M64 30 L74 40 M84 50 L94 42" fill="none" stroke-width="2"/>`),
  gravel: svg('0 0 110 60', `<path d="M2 58 Q14 30 30 40 Q46 18 62 36 Q80 16 96 38 Q106 40 108 58Z" fill="#bcaaa4"/>
    ${[[24, 48], [44, 40], [60, 50], [80, 42], [92, 52]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#795548" stroke="none"/>`).join('')}`),
  leaves: svg('0 0 110 60', [[16, 50, '#ffb74d'], [36, 40, '#ef5350'], [58, 50, '#ffd54f'], [78, 38, '#ff8a65'], [94, 50, '#ffb74d'], [48, 30, '#ffca28']]
    .map(([x, y, c], i) => `<ellipse cx="${x}" cy="${y}" rx="14" ry="8" fill="${c}" stroke-width="3" transform="rotate(${i * 30 - 40} ${x} ${y})"/>`).join('')),
  dust: svg('0 0 120 70', `<path d="M10 64 Q0 44 20 40 Q20 16 46 22 Q60 4 80 18 Q104 14 104 38 Q120 44 110 64Z" fill="#d7ccc8"/>
    <path d="M36 44 Q46 36 56 44 M66 34 Q76 26 86 34" fill="none" stroke-width="2"/>`),
  wilt: flower('sad'),
  snowpile: svg('0 0 120 70', `<path d="M2 68 Q8 30 34 34 Q48 6 72 20 Q100 14 106 40 Q120 44 118 68Z" fill="#fff"/>
    <path d="M30 52 Q40 46 50 52 M70 40 Q80 34 90 40" fill="none" stroke="#90caf9" stroke-width="3"/>`),
  letter: svg('0 0 100 70', `<rect x="6" y="6" width="88" height="58" rx="6" fill="#fff"/><path d="M6 10 L50 40 L94 10" fill="none"/>
    <path d="M50 58 C38 50 38 42 44 40 C48 39 50 42 50 44 C50 42 52 39 56 40 C62 42 62 50 50 58Z" fill="#ef5350" stroke-width="2"/>`),
  pump: svg('0 0 80 110', `<path d="M56 30 H70 V80 Q70 88 62 88" fill="none" stroke-width="5"/>
    <rect x="10" y="10" width="48" height="96" rx="8" fill="#ef5350"/><rect x="18" y="20" width="32" height="26" rx="4" fill="#fff"/>
    ${face(34, 33, .8, 'sad')}${label(34, 80, 'E', 18, '#fff')}`),
  parked: sedan('#90caf9'),
  container: svg('0 0 110 70', `<rect x="6" y="14" width="98" height="52" rx="3" fill="#ef5350"/>
    <path d="M22 20 V60 M38 20 V60 M54 20 V60 M70 20 V60 M86 20 V60" fill="none" stroke-width="3"/>`),
});

Object.assign(AFTERS, {
  catHappy: svg('0 0 80 80', `<path d="M14 30 L18 6 L34 20 Z M66 30 L62 6 L46 20 Z" fill="#ffb74d"/>
    <ellipse cx="40" cy="62" rx="22" ry="16" fill="#ffb74d"/><circle cx="40" cy="36" r="24" fill="#ffb74d"/>${face(40, 36, .9)}`),
  grandmaHappy: kid({ shirt: '#ce93d8', hair: '#e0e0e0', bun: true, glasses: true }),
  sprout: svg('0 0 100 80', `<path d="M4 78 Q50 52 96 78Z" fill="#8d6e63"/><path d="M50 66 V30" fill="none" stroke="#66bb6a" stroke-width="5"/>
    <path d="M50 40 Q24 40 22 18 Q46 18 50 40Z M50 34 Q76 34 78 12 Q54 12 50 34Z" fill="#81c784" stroke-width="3"/>`),
  fish: svg('0 0 110 70', `<path d="M86 36 L106 16 V56Z" fill="#ffb74d"/><ellipse cx="50" cy="36" rx="42" ry="26" fill="#ffb74d"/>
    <path d="M60 14 Q66 36 60 58" fill="none" stroke-width="3"/>${face(30, 32, .9)}`),
  sand: svg('0 0 110 60', `<path d="M2 58 Q30 4 56 6 Q84 4 108 58Z" fill="#ffe082"/>
    ${[[34, 40], [56, 24], [74, 44], [50, 48]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5" fill="#ffb300" stroke="none"/>`).join('')}`),
  flower: flower('happy'),
  icecream: svg('0 0 70 110', `<path d="M14 48 L35 108 L56 48Z" fill="#ffcc80"/><path d="M22 60 L46 84 M48 60 L26 86" fill="none" stroke-width="2"/>
    <circle cx="35" cy="34" r="20" fill="#f48fb1"/><circle cx="35" cy="14" r="13" fill="#fff59d"/>${face(35, 34, .7)}`),
  food: svg('0 0 110 80', `<path d="M40 22 Q34 12 40 4 M56 22 Q50 12 56 4 M72 22 Q66 12 72 4" fill="none" stroke="#bdbdbd" stroke-width="3"/>
    <path d="M8 34 H102 Q100 76 55 76 Q10 76 8 34Z" fill="#fff"/><path d="M14 34 Q30 26 46 34 Q62 26 78 34 Q90 28 98 34" fill="#ffe082" stroke-width="3"/>
    ${face(55, 52, 1)}`),
  tent: svg('0 0 120 80', `<path d="M60 4 L114 78 H6Z" fill="#ff8a65"/><path d="M60 4 L44 78 H76Z" fill="#ffccbc"/>
    <path d="M60 4 V78" fill="none" stroke-width="3"/>`),
});

