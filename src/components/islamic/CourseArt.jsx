// 3D-style app-icon illustrations, one per course. Static, self-contained SVG strings.
// Each sits on its own white "glass tile", so it looks good on every card colour.
const FL = 'class="fy" style="transform-box:fill-box;transform-origin:center"';
const defs = (p, extra = '') => `<defs>
<linearGradient id="${p}t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#efe6ff"/></linearGradient>
<linearGradient id="${p}pu" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a47bff"/><stop offset="1" stop-color="#5a2fc9"/></linearGradient>
<linearGradient id="${p}go" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd777"/><stop offset="1" stop-color="#e0a93b"/></linearGradient>
<linearGradient id="${p}pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e6dcff"/></linearGradient>
<linearGradient id="${p}ro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb36b"/><stop offset="1" stop-color="#e8508a"/></linearGradient>
<filter id="${p}sh" x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur in="SourceAlpha" stdDeviation="4"/><feOffset dy="7"/><feComponentTransfer><feFuncA type="linear" slope=".35"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="${p}bl"><feGaussianBlur stdDeviation="5"/></filter>${extra}</defs>`;
const tile = (p) => `<ellipse cx="120" cy="198" rx="62" ry="9" fill="#2a1060" opacity=".3" filter="url(#${p}bl)"/>
<rect x="46" y="42" width="148" height="148" rx="44" fill="#cdbcf5"/>
<rect x="46" y="34" width="148" height="148" rx="44" fill="url(#${p}t)" stroke="#fff" stroke-width="2"/>`;
const wrap = (p, body) => `<svg viewBox="0 0 240 220" width="100%" height="100%" role="presentation" aria-hidden="true">${defs(p)}${tile(p)}<g filter="url(#${p}sh)">${body}</g></svg>`;
const spark = (x, y, s, f) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-10 3-3 10 0 3 3 0 10-3 3-10 0-3-3Z" fill="${f}"/>`;

const tilawat = wrap('a', `
<path d="M60 92 120 106 180 92V152L120 166 60 152Z" fill="url(#apu)"/>
<path d="M68 96 117 108V156L68 144Z" fill="url(#apg)"/><path d="M123 108 172 96V144L123 156Z" fill="url(#apg)"/>
<g stroke="#b9a2f0" stroke-width="3" stroke-linecap="round"><path d="M78 112 106 119M78 123 106 130M78 134 100 139"/><path d="M134 119 162 112M134 130 162 123M140 139 162 134"/></g>
<g ${FL}><path d="M108 78Q120 68 132 78" fill="none" stroke="url(#ago)" stroke-width="6" stroke-linecap="round"/><path d="M98 69Q120 50 142 69" fill="none" stroke="url(#ago)" stroke-width="6" stroke-linecap="round" opacity=".6"/></g>`);

const nazra = wrap('b', `
<rect x="82" y="62" width="80" height="102" rx="12" fill="#3f1c9a"/>
<rect x="86" y="58" width="76" height="102" rx="12" fill="url(#bpu)"/>
<rect x="152" y="64" width="9" height="90" rx="4" fill="#fff" opacity=".85"/>
<rect x="96" y="70" width="48" height="78" rx="8" fill="none" stroke="url(#bgo)" stroke-width="3.5"/>
<circle cx="120" cy="100" r="15" fill="none" stroke="url(#bgo)" stroke-width="4"/><circle cx="120" cy="100" r="5" fill="url(#bgo)"/>
<path d="M104 124h32M108 134h24" stroke="url(#bgo)" stroke-width="3.5" stroke-linecap="round"/>
<g ${FL}><path d="M130 158h14v26l-7-7-7 7Z" fill="url(#bgo)"/></g>`);

const tajweed = wrap('c', `
<g>${[[72, 30, 0], [91, 58, 1], [110, 86, 0], [129, 52, 1], [148, 34, 0]].map(([x, h, a]) => `<rect x="${x}" y="${110 - h / 2}" width="13" height="${h}" rx="6.5" fill="url(#c${a ? 'go' : 'pu'})"/>`).join('')}</g>
<g ${FL}><circle cx="178" cy="164" r="19" fill="url(#cgo)"/><path d="m169 164 7 7 12-14" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>`);

const duas = wrap('d', `
<path d="M136 62A48 48 0 1 0 136 156A70 70 0 0 1 136 62Z" fill="url(#dgo)"/>
<path d="M104 80Q84 108 100 138" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".55"/>
<g ${FL}>${spark(162, 82, 1.2, '#a47bff')}</g><g ${FL} style="animation-delay:-2s;transform-box:fill-box;transform-origin:center">${spark(170, 128, .8, '#e0a93b')}</g><g ${FL} style="animation-delay:-4s;transform-box:fill-box;transform-origin:center">${spark(146, 150, .6, '#a47bff')}</g>`);

const namaz = wrap('e', `
<path d="M82 164V104Q82 66 120 50Q158 66 158 104V164Z" fill="url(#epu)"/>
<path d="M97 164V110Q97 82 120 72Q143 82 143 110V164Z" fill="url(#epg)"/>
<g ${FL}><circle cx="120" cy="96" r="14" fill="#ffd777" opacity=".35"/><circle cx="120" cy="96" r="7" fill="url(#ego)"/></g>
<path d="M112 164v-32q8-10 16 0v32Z" fill="#b9a2f0" opacity=".5"/>
<rect x="72" y="163" width="96" height="12" rx="6" fill="url(#ego)"/>`);

const books = wrap('f', `
<rect x="66" y="132" width="110" height="28" rx="8" fill="url(#fpu)"/><rect x="164" y="136" width="8" height="20" rx="3" fill="#fff" opacity=".85"/><path d="M80 138v16" stroke="#ffd777" stroke-width="4" stroke-linecap="round"/>
<rect x="76" y="104" width="100" height="28" rx="8" fill="url(#fgo)"/><rect x="164" y="108" width="8" height="20" rx="3" fill="#fff" opacity=".85"/><path d="M90 110v16" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>
<g transform="rotate(-5 120 90)"><rect x="70" y="76" width="104" height="28" rx="8" fill="url(#fro)"/><rect x="162" y="80" width="8" height="20" rx="3" fill="#fff" opacity=".85"/><path d="M84 82v16" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/></g>
<g ${FL}><path d="M150 60h12v26l-6-6-6 6Z" fill="url(#fgo)"/></g>`);

const etiquettes = wrap('g', `
<path d="M120 164C70 130 62 94 88 78 104 68 118 76 120 90 122 76 136 68 152 78 178 94 170 130 120 164Z" fill="url(#gro)"/>
<path d="M92 90Q96 82 106 82" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"/>
<g ${FL}>${spark(166, 74, 1.1, '#e0a93b')}</g><g ${FL} style="animation-delay:-3s;transform-box:fill-box;transform-origin:center">${spark(76, 128, .7, '#a47bff')}</g>`);

export const ART = [tilawat, nazra, tajweed, duas, namaz, books, etiquettes];

export function CourseArt({ index }) {
  return <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: ART[index] }} />;
}
