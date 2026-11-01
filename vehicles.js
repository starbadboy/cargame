// 车辆：name 名字, art 插画（朝左）, sound 开过来时的音效（见 sound.js）, y 离地高度%（飞的/水里的）
const tankTruck = (tank, cabColor, extras) => svg('0 0 200 130', `
  <rect x="10" y="92" width="184" height="10" rx="3" fill="#9e9e9e"/>
  <rect x="68" y="34" width="126" height="58" rx="29" fill="${tank}"/>${extras}
  ${cab(cabColor)}${wheel(42)}${wheel(128)}${wheel(166)}`);

const VEHICLES = {
  fire: { name: '消防车', sound: 'hilo', art: svg('0 0 200 130', `
    <rect x="66" y="40" width="126" height="62" rx="10" fill="#ef5350"/>
    <rect x="84" y="52" width="42" height="32" rx="4" fill="#fff"/><path d="M92 62 H118 M92 72 H118" fill="none" stroke-width="3"/>
    <rect x="136" y="52" width="44" height="32" rx="4" fill="#ffcdd2"/>
    <path d="M92 34 V40 M170 34 V40" fill="none"/>
    <rect x="72" y="24" width="116" height="10" rx="3" fill="#fff"/>
    <path d="M88 24 V34 M104 24 V34 M120 24 V34 M136 24 V34 M152 24 V34 M168 24 V34" fill="none" stroke-width="3"/>
    ${cab('#e53935', '#42a5f5')}${wheel(44)}${wheel(156)}`) },
  ambulance: { name: '救护车', sound: 'hilo', art: svg('0 0 200 130', `
    <rect x="64" y="22" width="128" height="80" rx="10" fill="#fff"/>
    <rect x="66" y="70" width="124" height="8" fill="#ef5350" stroke="none"/>
    <path d="M120 32 h14 v12 h12 v14 h-12 v12 h-14 v-12 h-12 v-14 h12z" fill="#ef5350"/>
    ${cab('#fff', '#ef5350')}${wheel(44)}${wheel(160)}`) },
  police: { name: '警车', sound: 'wail', art: sedan('#fff', `
    <rect x="62" y="80" width="128" height="12" fill="#1e88e5" stroke="none"/>${label(126, 90, 'POLICE', 10, '#fff')}
    <rect x="92" y="24" width="13" height="10" rx="3" fill="#ef5350"/><rect x="105" y="24" width="13" height="10" rx="3" fill="#42a5f5"/>`) },
  taxi: { name: '出租车', sound: 'honk', art: sedan('#ffd54f', `
    ${Array.from({ length: 12 }, (_, i) => i % 2 ? '' : `<rect x="${70 + i * 10}" y="82" width="10" height="8" fill="${OUT}" stroke="none"/>`).join('')}
    <rect x="88" y="22" width="34" height="12" rx="4" fill="#fff"/>${label(105, 31.5, 'TAXI', 9)}`) },
  bus: { name: '校车', sound: 'honk', art: svg('0 0 200 130', `
    <rect x="8" y="24" width="186" height="80" rx="20" fill="#ffd54f"/>
    <rect x="16" y="34" width="26" height="30" rx="6" fill="${GLASS}"/>
    ${[52, 86, 120, 154].map(x => `<rect x="${x}" y="34" width="28" height="26" rx="5" fill="${GLASS}"/>`).join('')}
    <rect x="10" y="70" width="182" height="6" fill="#ffb300" stroke="none"/>
    ${label(104, 98, '校车', 13)}${face(28, 84, 1.1)}${wheel(46)}${wheel(160)}`) },
  citybus: { name: '公交车', sound: 'honk', art: svg('0 0 200 130', `
    <rect x="8" y="22" width="186" height="82" rx="16" fill="#4db6ac"/>
    <rect x="16" y="28" width="28" height="10" rx="2" fill="${OUT}"/>${label(30, 36.5, '8路', 8, '#ffd54f')}
    <rect x="16" y="42" width="28" height="28" rx="5" fill="${GLASS}"/>
    ${[54, 88, 122, 156].map(x => `<rect x="${x}" y="34" width="28" height="26" rx="5" fill="${GLASS}"/>`).join('')}
    <rect x="64" y="64" width="24" height="36" rx="3" fill="${GLASS}"/>
    <rect x="96" y="80" width="96" height="6" fill="#fff" stroke="none"/>
    ${face(28, 84, 1.1)}${wheel(46)}${wheel(160)}`) },
  tractor: { name: '拖拉机', sound: 'engine', art: svg('0 0 200 130', `
    <rect x="98" y="14" width="74" height="10" rx="5" fill="#2e7d32"/>
    <rect x="106" y="24" width="56" height="40" rx="3" fill="${GLASS}"/>
    <path d="M14 104 V72 Q14 58 28 58 H172 V104Z" fill="#66bb6a"/>
    <rect x="44" y="30" width="8" height="28" rx="2" fill="#9e9e9e"/>
    <circle cx="20" cy="72" r="4" fill="#fff59d" stroke-width="3"/>${face(40, 80, 1.1)}
    ${wheel(146, 98, 28)}${wheel(44, 108, 14)}`) },
  harvester: { name: '收割机', sound: 'engine', art: svg('0 0 200 130', `
    <path d="M150 48 L176 20 H192" fill="none" stroke-width="10"/><path d="M150 48 L176 20 H192" fill="none" stroke="#ffb300" stroke-width="4"/>
    <rect x="56" y="48" width="128" height="56" rx="10" fill="#ef5350"/>
    <path d="M74 48 V18 Q74 12 80 12 H120 Q126 12 126 18 V48Z" fill="#ef5350"/>
    <rect x="82" y="20" width="36" height="24" rx="3" fill="${GLASS}"/>
    <rect x="2" y="96" width="62" height="14" rx="4" fill="#c62828"/>
    <g class="wheel"><circle cx="30" cy="80" r="22" fill="#ffd54f"/><path d="M30 58 V102 M8 80 H52 M15 65 L45 95 M45 65 L15 95" fill="none" stroke-width="3"/></g>
    ${face(110, 74, 1.1)}${wheel(90, 106, 16)}${wheel(162, 102, 22)}`) },
  truck: { name: '货车', sound: 'engine', art: svg('0 0 200 130', `
    <rect x="66" y="18" width="128" height="76" rx="8" fill="#ffe0b2"/>
    <path d="M110 36 h40 v40 h-40z M130 36 v14" fill="#ffb74d"/>
    <rect x="10" y="92" width="184" height="10" rx="3" fill="#9e9e9e"/>
    ${cab('#42a5f5')}${wheel(42)}${wheel(128)}${wheel(168)}`) },
  dump: { name: '翻斗车', sound: 'digger', art: svg('0 0 200 130', `
    <path d="M74 38 Q96 12 124 24 Q150 8 186 30Z" fill="#ffd54f"/>
    <path d="M70 36 L192 28 L184 92 H72Z" fill="#9ccc65"/>
    <path d="M90 48 V84 M120 46 V84 M150 44 V84" fill="none" stroke-width="3"/>
    <rect x="10" y="90" width="184" height="10" rx="3" fill="#9e9e9e"/>
    ${cab('#66bb6a')}${wheel(42)}${wheel(128)}${wheel(166)}`) },
  race: { name: '赛车', sound: 'race', art: svg('0 0 200 130', `
    <rect x="174" y="40" width="24" height="10" rx="3" fill="#c62828"/><path d="M182 50 V72" fill="none"/>
    <path d="M6 104 Q4 80 30 78 L82 72 Q100 52 132 56 L152 70 H186 V104Z" fill="#ef5350"/>
    <circle cx="116" cy="56" r="11" fill="#ffd54f"/><rect x="107" y="53" width="14" height="6" rx="3" fill="${OUT}" stroke="none"/>
    <circle cx="98" cy="88" r="11" fill="#fff"/>${label(98, 93, '1', 14)}
    ${face(36, 88, 1)}${wheel(48, 106, 17)}${wheel(158, 106, 17)}`) },
  excavator: { name: '挖掘机', sound: 'digger', art: svg('0 0 200 130', `
    <rect x="62" y="98" width="130" height="26" rx="13" fill="#616161"/>
    ${[78, 104, 130, 156, 178].map(x => wheel(x, 111, 7)).join('')}
    <path d="M110 70 L68 20 L56 30 L96 78Z" fill="#ffb300"/>
    <path d="M62 24 L26 64 L36 72 L70 32Z" fill="#ffb300"/>
    <path d="M14 62 Q10 92 38 94 L42 70Z" fill="#9e9e9e"/>
    <rect x="76" y="62" width="110" height="36" rx="8" fill="#ffca28"/>
    <path d="M124 62 V28 Q124 18 134 18 H170 Q180 18 180 28 V62Z" fill="#ffca28"/>
    <rect x="132" y="26" width="40" height="28" rx="4" fill="${GLASS}"/>
    ${face(102, 76, 1.1)}`) },
  bulldozer: { name: '推土机', sound: 'digger', art: svg('0 0 200 130', `
    <rect x="56" y="98" width="136" height="26" rx="13" fill="#616161"/>
    ${[72, 98, 124, 150, 176].map(x => wheel(x, 111, 7)).join('')}
    <path d="M40 90 L76 80" fill="none" stroke-width="8"/>
    <path d="M6 58 Q22 86 8 122 H38 V58Z" fill="#bdbdbd"/>
    <rect x="70" y="60" width="116" height="38" rx="8" fill="#ffb300"/>
    <rect x="86" y="40" width="8" height="20" fill="#9e9e9e"/>
    <path d="M110 60 V28 Q110 20 118 20 H168 Q176 20 176 28 V60Z" fill="#ffca28"/>
    <rect x="118" y="28" width="50" height="26" rx="4" fill="${GLASS}"/>
    ${face(96, 78, 1.1)}`) },
  roller: { name: '压路机', sound: 'digger', art: svg('0 0 200 130', `
    <g class="wheel"><circle cx="46" cy="96" r="28" fill="#bdbdbd"/><circle cx="46" cy="96" r="10" fill="#e0e0e0" stroke-width="3"/><circle cx="46" cy="76" r="3" fill="${OUT}" stroke="none"/></g>
    <rect x="18" y="58" width="58" height="14" rx="6" fill="#ffb300"/>
    <path d="M108 56 V22 H170 V56" fill="none" stroke-width="5"/><rect x="102" y="16" width="74" height="10" rx="4" fill="#ffb300"/>
    <rect x="60" y="56" width="126" height="34" rx="8" fill="#ffca28"/>
    ${face(90, 72, 1.1)}${wheel(156, 104, 20)}`) },
  crane: { name: '吊车', sound: 'digger', art: svg('0 0 200 130', `
    <path d="M150 66 L44 6" fill="none" stroke-width="13"/><path d="M150 66 L44 6" fill="none" stroke="#ffb300" stroke-width="6"/>
    <path d="M44 6 V44" fill="none" stroke-width="3"/><path d="M44 44 q-8 0 -8 8 q0 6 6 6" fill="none" stroke-width="4"/>
    <rect x="66" y="62" width="128" height="32" rx="6" fill="#ffca28"/>
    <rect x="132" y="48" width="40" height="18" rx="4" fill="#ffb300"/>
    <rect x="10" y="92" width="184" height="10" rx="3" fill="#9e9e9e"/>
    ${cab('#ffca28', '#ff7043')}${wheel(42)}${wheel(124)}${wheel(166)}`) },
  forklift: { name: '叉车', sound: 'digger', art: svg('0 0 200 130', `
    <rect x="22" y="10" width="10" height="100" fill="#9e9e9e"/>
    <rect x="30" y="64" width="12" height="44" fill="#757575"/>
    <path d="M4 110 H40" fill="none" stroke-width="7"/>
    <path d="M60 60 V22 M130 22 V60" fill="none" stroke-width="5"/><rect x="54" y="16" width="82" height="10" rx="4" fill="#ffb300"/>
    <path d="M42 104 V60 H150 Q170 60 172 80 V104Z" fill="#ffb300"/>
    <rect x="148" y="62" width="34" height="42" rx="10" fill="#ff8f00"/>
    ${face(80, 78, 1.1)}${wheel(66, 106, 15)}${wheel(152, 104, 18)}`) },
  mixer: { name: '水泥车', sound: 'engine', art: svg('0 0 200 130', `
    <rect x="10" y="92" width="184" height="10" rx="3" fill="#9e9e9e"/>
    <g transform="rotate(-10 130 60)"><ellipse cx="130" cy="60" rx="58" ry="30" fill="#eceff1"/>
    <path d="M100 34 Q112 60 100 86 M130 30 Q142 60 130 90 M160 34 Q170 60 160 86" fill="none" stroke="#ffb300" stroke-width="7"/></g>
    <path d="M184 40 L198 32 L198 50Z" fill="#9e9e9e"/>
    ${cab('#ffca28')}${wheel(42)}${wheel(124)}${wheel(166)}`) },
  garbage: { name: '垃圾车', sound: 'engine', art: svg('0 0 200 130', `
    <path d="M66 24 H178 Q192 24 192 38 V100 H66Z" fill="#66bb6a"/>
    <rect x="68" y="76" width="122" height="8" fill="#fff" stroke="none"/>
    <path d="M114 40 H146 L142 66 H118Z" fill="#fff" stroke-width="3"/><rect x="110" y="34" width="40" height="6" rx="3" fill="#fff" stroke-width="3"/>
    <path d="M124 46 V60 M136 46 V60" fill="none" stroke-width="2"/>
    ${cab('#43a047', '#ffb300')}${wheel(44)}${wheel(160)}`) },
  sweeper: { name: '扫地车', sound: 'engine', art: svg('0 0 200 130', `
    <rect x="66" y="30" width="126" height="68" rx="14" fill="#fff"/>
    <rect x="68" y="62" width="122" height="10" fill="#ff9800" stroke="none"/>${label(128, 54, '清扫', 14)}
    ${cab('#ff9800', '#ffd54f')}${wheel(48)}${wheel(162)}
    <g class="wheel"><circle cx="16" cy="114" r="11" fill="#ffd54f"/><path d="M5 114 H27 M16 103 V125 M8 106 L24 122 M24 106 L8 122" fill="none" stroke-width="2"/></g>`) },
  sprinkler: { name: '洒水车', sound: 'engine', art: tankTruck('#4fc3f7', '#29b6f6', `${label(130, 70, '洒水', 16, '#fff')}
    ${[[198, 84], [204, 100], [196, 112]].map(([x, y]) => `<path d="M${x} ${y - 8} q6 9 0 12 q-6 -3 0 -12Z" fill="#81d4fa" stroke-width="2"/>`).join('')}`) },
  tanker: { name: '油罐车', sound: 'engine', art: tankTruck('#eceff1', '#ef5350', `<rect x="68" y="58" width="126" height="8" fill="#ef5350" stroke="none"/>
    <circle cx="130" cy="50" r="10" fill="#fff"/>${label(130, 55, '油', 13, '#ef5350')}`) },
  snowplow: { name: '铲雪车', sound: 'digger', art: svg('0 0 200 130', `
    <g transform="translate(14 0)"><rect x="66" y="36" width="114" height="62" rx="8" fill="#ff7043"/>
    <path d="M86 50 H160 M86 64 H160" fill="none" stroke="#fff" stroke-width="5"/>
    <rect x="10" y="92" width="170" height="10" rx="3" fill="#9e9e9e"/>
    ${cab('#ff8a65', '#ffd54f')}${wheel(46)}${wheel(156)}</g>
    <path d="M18 92 H30" fill="none" stroke-width="6"/>
    <path d="M2 56 Q20 88 4 124 H22 V56Z" fill="#ffd54f"/>
    <path d="M-6 124 Q-4 108 4 110 Q8 100 16 106 V124Z" fill="#fff" stroke-width="3"/>`) },
  tow: { name: '拖车', sound: 'engine', art: svg('0 0 200 130', `
    <path d="M150 76 L180 24" fill="none" stroke-width="12"/><path d="M150 76 L180 24" fill="none" stroke="#ffb300" stroke-width="5"/>
    <path d="M180 24 L188 28 V50" fill="none" stroke-width="3"/><path d="M188 50 q-8 0 -8 8 q0 6 6 6" fill="none" stroke-width="3"/>
    <rect x="66" y="74" width="128" height="26" rx="4" fill="#ff7043"/>
    ${cab('#ff8a65', '#ffb300')}${wheel(44)}${wheel(160)}`) },
  mail: { name: '邮政车', sound: 'honk', art: svg('0 0 200 130', `
    <path d="M10 104 V54 Q10 30 36 30 H192 V104Z" fill="#43a047"/>
    <path d="M18 62 Q18 42 36 40 H56 V62Z" fill="${GLASS}"/>
    <rect x="12" y="84" width="180" height="6" fill="#ffd54f" stroke="none"/>
    <rect x="112" y="42" width="44" height="30" rx="3" fill="#fff" stroke-width="3"/><path d="M112 42 L134 60 L156 42" fill="none" stroke-width="3"/>
    ${label(84, 62, '邮政', 13, '#fff')}${face(34, 76, 1.1)}${wheel(46)}${wheel(160)}`) },
  icecream: { name: '冰淇淋车', sound: 'jingle', art: svg('0 0 200 130', `
    <path d="M110 8 H138 L124 34Z" fill="#ffcc80"/><circle cx="124" cy="6" r="13" fill="#f48fb1"/>
    <path d="M10 104 V54 Q10 34 32 34 H186 Q194 34 194 42 V104Z" fill="#f8bbd0"/>
    <rect x="80" y="46" width="70" height="32" rx="4" fill="#fff"/>
    <path d="M78 46 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0Z" fill="#f06292" stroke-width="3"/>
    <path d="M18 64 Q18 46 34 44 H56 V64Z" fill="${GLASS}"/>
    ${face(36, 82, 1.1)}${wheel(46)}${wheel(160)}`) },
  rv: { name: '房车', sound: 'honk', art: svg('0 0 200 130', `
    <path d="M10 104 V58 Q10 44 24 44 H40 V28 Q40 18 52 18 H184 Q194 18 194 30 V104Z" fill="#fff"/>
    <path d="M16 70 Q16 54 30 52 H42 V70Z" fill="${GLASS}"/>
    <rect x="58" y="28" width="44" height="26" rx="4" fill="${GLASS}"/><rect x="148" y="28" width="34" height="22" rx="4" fill="${GLASS}"/>
    <rect x="116" y="34" width="24" height="56" rx="3" fill="#ffcc80"/>
    <rect x="44" y="64" width="72" height="8" fill="#ff8a65" stroke="none"/><rect x="140" y="64" width="52" height="8" fill="#ff8a65" stroke="none"/>
    ${face(28, 84, 1.1)}${wheel(46)}${wheel(162)}`) },
  motorbike: { name: '摩托车', sound: 'motor', art: svg('0 0 200 130', `
    <rect x="122" y="22" width="56" height="40" rx="6" fill="#42a5f5"/>${label(150, 47, '外卖', 13, '#fff')}
    <path d="M44 104 L66 44" fill="none" stroke-width="8"/><path d="M58 42 H78" fill="none" stroke-width="6"/>
    <path d="M56 94 Q60 72 82 72 H150 Q172 72 174 96 H56Z" fill="#ffca28"/>
    <rect x="98" y="62" width="48" height="10" rx="5" fill="#6d4c41"/>
    <circle cx="66" cy="56" r="5" fill="#fff59d" stroke-width="3"/>
    ${face(88, 82, .9)}${wheel(44, 104, 18)}${wheel(158, 104, 18)}`) },
  bike: { name: '自行车', sound: 'bell', art: svg('0 0 200 130', `
    <g class="wheel"><circle cx="48" cy="96" r="26" fill="#fff" stroke-width="6"/><circle cx="48" cy="96" r="4" fill="${OUT}"/></g>
    <g class="wheel"><circle cx="152" cy="96" r="26" fill="#fff" stroke-width="6"/><circle cx="152" cy="96" r="4" fill="${OUT}"/></g>
    <path d="M48 96 L80 50 M76 56 L132 56 L152 96 M76 56 L104 96 L132 56 M104 96 H48" fill="none" stroke-width="10"/>
    <path d="M48 96 L80 50 M76 56 L132 56 L152 96 M76 56 L104 96 L132 56 M104 96 H48" fill="none" stroke="#ffca28" stroke-width="5"/>
    <path d="M80 50 L74 32 H58" fill="none" stroke-width="5"/>
    <path d="M132 56 L136 42" fill="none" stroke-width="5"/><rect x="124" y="34" width="26" height="9" rx="4" fill="${OUT}"/>`) },
  train: { name: '火车', sound: 'whistle', art: svg('0 0 200 130', `
    <g fill="#fff" stroke-width="3"><circle cx="58" cy="12" r="8"/><circle cx="74" cy="6" r="6"/></g>
    <path d="M42 52 V30 H36 V20 H64 V30 H58 V52Z" fill="#616161"/>
    <rect x="120" y="28" width="68" height="74" rx="6" fill="#5c6bc0"/>
    <rect x="114" y="18" width="80" height="12" rx="5" fill="#3949ab"/>
    <rect x="132" y="40" width="44" height="28" rx="4" fill="${GLASS}"/>
    <rect x="22" y="50" width="104" height="52" rx="22" fill="#7986cb"/>
    <path d="M6 112 L22 86 V112Z" fill="#ef5350"/>
    ${face(50, 72, 1.1)}${wheel(54, 106, 14)}${wheel(92, 106, 14)}${wheel(154, 102, 18)}`) },
  boat: { name: '轮船', sound: 'shiphorn', y: 8, art: svg('0 0 200 130', `
    <rect x="128" y="6" width="14" height="24" rx="3" fill="#ef5350"/>
    <rect x="84" y="24" width="64" height="22" rx="6" fill="#fff"/>
    <rect x="58" y="44" width="110" height="30" rx="6" fill="#fff"/>
    ${[78, 100, 122, 144].map(x => `<circle cx="${x}" cy="59" r="6" fill="${GLASS}" stroke-width="3"/>`).join('')}
    <path d="M6 72 H196 L182 112 Q180 118 172 118 H34 Q26 118 22 112Z" fill="#42a5f5"/>
    <path d="M22 92 H188" fill="none" stroke="#fff" stroke-width="5"/>
    ${face(48, 84, 1.1)}`) },
  submarine: { name: '潜水艇', sound: 'sonar', y: 30, art: svg('0 0 200 130', `
    <path d="M110 22 V8 H94" fill="none" stroke-width="5"/>
    <rect x="80" y="20" width="46" height="30" rx="8" fill="#ffca28"/>
    <path d="M172 60 L196 44 V104 L172 88Z" fill="#ffb300"/>
    <rect x="10" y="44" width="170" height="60" rx="30" fill="#ffd54f"/>
    ${[80, 112, 144].map(x => `<circle cx="${x}" cy="74" r="10" fill="${GLASS}" stroke-width="3"/>`).join('')}
    ${face(42, 70, 1.1)}`) },
  helicopter: { name: '直升机', sound: 'chopper', y: 42, art: svg('0 0 200 130', `
    <rect x="70" y="16" width="10" height="16" fill="#9e9e9e"/>
    <rect class="rotor" x="12" y="10" width="128" height="7" rx="3" fill="#757575"/>
    <path d="M126 56 H180 V70 H126Z" fill="#ef5350"/><rect class="rotor" x="176" y="40" width="8" height="40" rx="3" fill="#757575"/>
    <path d="M40 118 H124 M58 98 V118 M106 98 V118" fill="none"/>
    <path d="M18 70 Q18 32 64 32 H110 Q132 32 132 58 V78 Q132 98 110 98 H52 Q18 98 18 70Z" fill="#ef5350"/>
    <path d="M28 66 Q30 42 62 42 V66Z" fill="${GLASS}"/>
    <path d="M90 48 h10 v10 h10 v10 h-10 v10 h-10 v-10 h-10 v-10 h10z" fill="#fff" stroke-width="3"/>
    ${face(46, 80, 1.1)}`) },
  airplane: { name: '飞机', sound: 'jet', y: 48, art: svg('0 0 200 130', `
    <path d="M100 48 L122 48 L144 18 H128Z" fill="#90caf9"/>
    <path d="M10 70 Q10 48 44 46 H164 L184 16 H196 L192 70 Q190 88 170 88 H40 Q10 88 10 70Z" fill="#fff"/>
    <path d="M164 46 L184 16 H196 L192 52Z" fill="#42a5f5"/>
    <path d="M18 62 Q22 52 36 52 V62Z" fill="${GLASS}"/>
    ${[64, 80, 96, 112, 128, 144].map(x => `<circle cx="${x}" cy="62" r="4.5" fill="${GLASS}" stroke-width="2"/>`).join('')}
    <path d="M84 74 L118 74 L146 116 H126Z" fill="#42a5f5"/>
    ${face(36, 72, .9)}`) },
  rocket: { name: '火箭', sound: 'rocket', y: 40, art: svg('0 0 200 130', `
    <path class="flame" d="M164 46 Q204 64 164 82 Q180 64 164 46Z" fill="#ffa726"/>
    <path d="M118 36 L148 6 L160 36Z M118 92 L148 122 L160 92Z" fill="#ef5350"/>
    <rect x="150" y="42" width="16" height="44" rx="4" fill="#9e9e9e"/>
    <path d="M12 64 Q40 30 100 34 H152 V94 H100 Q40 98 12 64Z" fill="#fff"/>
    <path d="M12 64 Q28 42 56 37 V91 Q28 86 12 64Z" fill="#ef5350"/>
    <circle cx="96" cy="64" r="18" fill="${GLASS}"/>${face(96, 60, .9)}`) },
  balloon: { name: '热气球', sound: 'burner', y: 40, art: svg('0 0 200 130', `
    <path d="M100 2 Q150 2 148 50 Q146 78 116 96 H84 Q54 78 52 50 Q50 2 100 2Z" fill="#ef5350"/>
    <path d="M100 2 Q78 40 88 96 H112 Q122 40 100 2Z" fill="#ffd54f"/>
    <path d="M86 96 L88 110 M114 96 L112 110" fill="none" stroke-width="3"/>
    <rect x="84" y="108" width="32" height="20" rx="4" fill="#a1887f"/>
    ${face(100, 52, 1.3)}`) },
};
