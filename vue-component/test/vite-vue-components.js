import { openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, Fragment, renderList, createCommentVNode, createBlock, resolveDynamicComponent, renderSlot, toDisplayString, createTextVNode, pushScopeId, popScopeId } from "vue";
function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`), reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`), reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`), reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`), reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`), reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0)
    h = s = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s = NaN;
  else if (s <= 0)
    h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
  if (s) {
    if (r === max)
      h = (g - b) / s + (g < b) * 6;
    else if (g === max)
      h = (b - r) / s + 2;
    else
      h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
const constant = (x) => () => x;
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
}
const interpolateRgb = function rgbGamma(y) {
  var color2 = gamma(y);
  function rgb$1(start, end) {
    var r = color2((start = rgb(start)).r, (end = rgb(end)).r), g = color2(start.g, end.g), b = color2(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
  rgb$1.gamma = rgbGamma;
  return rgb$1;
}(1);
const StkTable_vue_vue_type_style_index_0_scoped_92307b26_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
let chromeVersion = 0;
try {
  chromeVersion = +navigator.userAgent.match(/chrome\/\d+/i)[0].split("/")[1];
} catch (e) {
  console.error("获取浏览器版本出错！", e);
}
const _highlightColor = {
  light: { from: "#71a2fd", to: "#fff" },
  dark: { from: "#1e4c99", to: "#181c21" }
};
const _highlightDuration = 2e3;
const _highlightColorChangeFreq = 100;
function _howDeepTheColumn(arr, level = 1) {
  const levels = [level];
  arr.forEach((item) => {
    var _a;
    if ((_a = item.children) == null ? void 0 : _a.length) {
      levels.push(_howDeepTheColumn(item.children, level + 1));
    }
  });
  return Math.max(...levels);
}
function tableSort(sortOption, order, dataSource) {
  let targetDataSource = [...dataSource];
  if (typeof sortOption.sorter === "function") {
    const customSorterData = sortOption.sorter(targetDataSource, { order, column: sortOption });
    if (customSorterData)
      targetDataSource = customSorterData;
  } else if (order) {
    const sortField = sortOption.sortField || sortOption.dataIndex;
    let { sortType } = sortOption;
    if (!sortType)
      sortType = typeof dataSource[0][sortField];
    if (sortType === "number") {
      const nanArr = [];
      const numArr = [];
      for (let i = 0; i < targetDataSource.length; i++) {
        const row = targetDataSource[i];
        if (row[sortField] === null || row[sortField] === "" || typeof row[sortField] === "boolean" || Number.isNaN(+row[sortField])) {
          nanArr.push(row);
        } else {
          numArr.push(row);
        }
      }
      if (order === "asc") {
        numArr.sort((a, b) => +a[sortField] - +b[sortField]);
        targetDataSource = [...nanArr, ...numArr];
      } else {
        numArr.sort((a, b) => +b[sortField] - +a[sortField]);
        targetDataSource = [...numArr, ...nanArr];
      }
    } else {
      if (order === "asc") {
        targetDataSource.sort((a, b) => String(a[sortField]).localeCompare(b[sortField]));
      } else {
        targetDataSource.sort((a, b) => String(a[sortField]).localeCompare(b[sortField]) * -1);
      }
    }
  }
  return targetDataSource;
}
const _sfc_main = {
  name: "StkTable",
  props: {
    minWidth: {
      type: String,
      default: "min-content"
    },
    /** 表格最大宽度，设置max-content 使表格按设置的width来 */
    maxWidth: {
      type: String,
      default: ""
    },
    /**
     * 主题，亮、暗
     */
    theme: {
      type: String,
      default: "light",
      validator: (v) => ["dark", "light"].includes(v)
    },
    /** 虚拟滚动 */
    virtual: {
      type: Boolean,
      default: false
    },
    /** x轴虚拟滚动 */
    virtualX: {
      type: Boolean,
      default: false
    },
    /** 表格列配置 */
    columns: {
      type: Array,
      default: () => []
    },
    /** 表格数据源 */
    dataSource: {
      type: Array,
      default: () => []
    },
    /** 行唯一键 */
    rowKey: {
      type: [String, Function],
      default: ""
    },
    /** 空值展示文字 */
    emptyCellText: {
      type: String,
      default: "--"
    },
    /** 暂无数据兜底高度是否撑满 */
    noDataFull: {
      type: Boolean,
      default: false
    },
    /** 是否展示暂无数据 */
    showNoData: {
      type: Boolean,
      default: true
    },
    /** 是否服务端排序，true则不排序数据 */
    sortRemote: {
      type: Boolean,
      default: false
    },
    /** 表头是否溢出展示... */
    showHeaderOverflow: {
      type: Boolean,
      default: false
    },
    /** 表体溢出是否展示... */
    showOverflow: {
      type: Boolean,
      default: false
    },
    /** 是否增加行hover class */
    showTrHoverClass: {
      type: Boolean,
      default: false
    },
    /** 表头是否可拖动 */
    headerDrag: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**单击行 */
    "row-click",
    "sort-change",
    "current-change",
    "row-dblclick",
    "header-row-menu",
    "row-menu",
    "cell-click",
    "header-cell-click",
    "col-order-change",
    "th-drop",
    "th-drag-start",
    "scroll"
  ],
  data() {
    return {
      /** 是否展示横向滚动固定列的阴影 
      showFixedLeftShadow: false,*/
      /** 当前选中的一行*/
      currentItem: { value: null },
      /** 当前hover的行 */
      currentHover: { value: null },
      /** 排序的列*/
      sortCol: null,
      sortOrderIndex: 0,
      /** 排序切换顺序 */
      sortSwitchOrder: [null, "desc", "asc"],
      tableHeaders: [],
      /** 若有多级表头时，的tableHeaders */
      tableProps: [],
      dataSourceCopy: Object.freeze([]),
      /** 存放高亮行的对象*/
      highlightDimRows: /* @__PURE__ */ new Set(),
      /** 高亮后渐暗的行定时器 */
      highlightDimRowsTimeout: /* @__PURE__ */ new Map(),
      /** 是否正在计算高亮行的循环*/
      calcHighlightDimLoop: false,
      virtualScroll: {
        containerHeight: 0,
        startIndex: 0,
        // 数组开始位置
        rowHeight: 28,
        offsetTop: 0,
        // 表格定位上边距
        scrollTop: 0
        // 纵向滚动条位置，用于判断是横向滚动还是纵向
      },
      virtualScrollX: {
        containerWidth: 0,
        startIndex: 0,
        endIndex: 0,
        offsetLeft: 0,
        scrollLeft: 0
        // 横向滚动位置，用于判断是横向滚动还是纵向
      },
      thDrag: {
        dragStartKey: null
      },
      /**rowKey缓存 */
      rowKeyGenStore: /* @__PURE__ */ new WeakMap()
    };
  },
  computed: {
    isLegacyMode() {
      return chromeVersion < 56;
    },
    /** 高亮颜色插值方法 */
    highlightInter() {
      return interpolateRgb(_highlightColor[this.theme].from, _highlightColor[this.theme].to);
    },
    /** 数据量大于2页才开始虚拟滚动*/
    virtual_on() {
      return this.virtual && this.dataSourceCopy.length > this.virtual_pageSize * 2;
    },
    /** 虚拟滚动展示的行数 */
    virtual_pageSize() {
      return Math.ceil(this.virtualScroll.containerHeight / this.virtualScroll.rowHeight);
    },
    /** 虚拟滚动展示的行 */
    virtual_dataSourcePart() {
      if (!this.virtual_on)
        return this.dataSourceCopy;
      return Object.freeze(this.dataSourceCopy.slice(this.virtualScroll.startIndex, this.virtualScroll.startIndex + this.virtual_pageSize));
    },
    /** 虚拟表格定位下边距*/
    virtual_offsetBottom() {
      if (!this.virtual_on)
        return 0;
      return (this.dataSourceCopy.length - this.virtualScroll.startIndex - this.virtual_dataSourcePart.length) * this.virtualScroll.rowHeight;
    },
    /* 是否开启横向虚拟滚动 */
    virtualX_on() {
      return this.virtualX && this.columns.reduce((sum, col) => sum += parseInt(col.minWidth || col.width), 0) > this.virtualScrollX.containerWidth * 1.5;
    },
    /** 横向虚拟滚动展示的列 */
    virtualX_columnPart() {
      if (this.virtualX_on) {
        const fixedLeftColumns = [];
        for (let i = 0; i < this.virtualScrollX.startIndex; i++) {
          const col = this.columns[i];
          if (col.fixed === "left")
            fixedLeftColumns.push(col);
        }
        return Object.freeze(fixedLeftColumns.concat(this.columns.slice(this.virtualScrollX.startIndex, this.virtualScrollX.endIndex)));
      }
      return this.columns;
    },
    /** 横向虚拟滚动，右边距 */
    virtualX_offsetRight() {
      if (!this.virtualX_on)
        return 0;
      let width = 0;
      for (let i = this.virtualScrollX.endIndex; i < this.columns.length; i++) {
        const col = this.columns[i];
        width += parseInt(col.width || col.maxWidth || col.minWidth);
      }
      return width;
    },
    // fixedLeftColWidth() {
    //   let fixedLeftColumns = this.tableProps.filter(it => it.fixed === 'left');
    //   let width = 0;
    //   for (let i = 0; i < fixedLeftColumns.length; i++) {
    //     const col = fixedLeftColumns[i];
    //     width += parseInt(col.width);
    //   }
    //   return width;
    // },
    /** 计算每个fixed:left列前面列的总宽度，fixed:right右边列的总宽度，用于定位 */
    fixedColumnsPositionStore() {
      const store = {};
      const cols = [...this.columns];
      let left = 0;
      for (let i = 0; i < cols.length; i++) {
        const item = cols[i];
        if (item.fixed === "left") {
          store[item.dataIndex] = left;
          left += parseInt(item.width);
        }
      }
      let right = 0;
      for (let i = cols.length - 1; i >= 0; i--) {
        const item = cols[i];
        if (item.fixed === "right") {
          store[item.dataIndex] = right;
          right += parseInt(item.width);
        }
      }
      return store;
    }
  },
  watch: {
    columns: {
      handler(val) {
        this.dealColumns(val);
        this.initVirtualScrollX();
      }
      // deep: true, // 不能加，因为this.dealColumns 中操作了this.columns
    },
    /** 监听表格数据变化 */
    dataSource: {
      handler(val) {
        this.dataSourceCopy = [...val];
        this.initVirtualScrollY();
        if (this.sortCol) {
          const column = this.columns.find((it) => it.dataIndex === this.sortCol);
          this.onColumnSort(column, false);
        }
      },
      deep: false
      // TODO:prop 控制监听
    }
  },
  created() {
    this.dealColumns();
    this.dataSourceCopy = [...this.dataSource];
  },
  mounted() {
    this.initVirtualScroll();
  },
  methods: {
    /**
     * 初始化虚拟滚动参数
     * @param {number} height 虚拟滚动的高度
     */
    initVirtualScroll(height) {
      this.initVirtualScrollY(height);
      this.initVirtualScrollX();
    },
    initVirtualScrollY(height) {
      var _a, _b;
      if (this.virtual_on) {
        this.virtualScroll.containerHeight = typeof height === "number" ? height : (_a = this.$refs.tableContainer) == null ? void 0 : _a.offsetHeight;
        this.updateVirtualScrollY((_b = this.$refs.tableContainer) == null ? void 0 : _b.scrollTop);
      }
    },
    initVirtualScrollX() {
      var _a, _b;
      if (this.virtualX) {
        this.scrollTo(null, 0);
        this.virtualScrollX.containerWidth = (_a = this.$refs.tableContainer) == null ? void 0 : _a.offsetWidth;
        this.updateVirtualScrollX((_b = this.$refs.tableContainer) == null ? void 0 : _b.scrollLeft);
      }
    },
    /** 通过滚动条位置，计算虚拟滚动的参数 */
    updateVirtualScrollY(sTop = 0) {
      const { rowHeight } = this.virtualScroll;
      const startIndex = Math.floor(sTop / rowHeight);
      this.virtualScroll.startIndex = startIndex;
      this.virtualScroll.offsetTop = startIndex * rowHeight;
    },
    /** 通过横向滚动条位置，计算横向虚拟滚动的参数 */
    updateVirtualScrollX(sLeft = 0) {
      var _a;
      if (!((_a = this.columns) == null ? void 0 : _a.length))
        return;
      let startIndex = 0;
      let offsetLeft = 0;
      let colWidthSum = 0;
      for (let colIndex = 0; colIndex < this.columns.length; colIndex++) {
        startIndex++;
        const col = this.columns[colIndex];
        if (col.fixed === "left")
          continue;
        const colWidth = parseInt(col.width || col.maxWidth || col.minWidth);
        colWidthSum += colWidth;
        if (colWidthSum >= sLeft) {
          offsetLeft = colWidthSum - colWidth;
          startIndex--;
          break;
        }
      }
      colWidthSum = 0;
      let endIndex = this.columns.length;
      for (let colIndex = startIndex; colIndex < this.columns.length - 1; colIndex++) {
        const col = this.columns[colIndex];
        colWidthSum += parseInt(col.width || col.maxWidth || col.minWidth);
        if (colWidthSum >= this.virtualScrollX.containerWidth) {
          endIndex = colIndex + 2;
          break;
        }
      }
      this.virtualScrollX.startIndex = startIndex;
      this.virtualScrollX.endIndex = endIndex;
      this.virtualScrollX.offsetLeft = offsetLeft;
    },
    /** 固定列的style */
    fixedStyle(tagType, col) {
      const style = {};
      if (this.isLegacyMode) {
        if (tagType === "th") {
          style.position = "relative";
          style.top = this.virtualScroll.scrollTop + "px";
        }
      }
      if (["left", "right"].includes(col.fixed)) {
        if (this.isLegacyMode) {
          style.position = "relative";
          if (col.fixed === "left") {
            if (this.virtualX_on)
              style.left = this.virtualScrollX.scrollLeft - this.virtualScrollX.offsetLeft + "px";
            else
              style.left = this.virtualScrollX.scrollLeft + "px";
          } else {
            style.transform = `translateX(${this.virtualX_offsetRight}px)`;
          }
          if (tagType === "th") {
            style.top = this.virtualScroll.scrollTop + "px";
            style.zIndex = 2;
          }
        } else {
          style.position = "sticky";
          if (col.fixed === "left") {
            style.left = this.fixedColumnsPositionStore[col.dataIndex] + "px";
          } else {
            style.right = this.fixedColumnsPositionStore[col.dataIndex] + "px";
          }
          if (tagType === "th") {
            style.top = "0px";
            style.zIndex = 2;
          }
        }
      }
      return style;
    },
    /** 处理多级表头 */
    dealColumns() {
      this.tableHeaders = [];
      this.tableProps = [];
      const copyColumn = this.columns;
      const deep = _howDeepTheColumn(copyColumn);
      const tmpHeader = [];
      const tmpProps = [];
      (function flat(arr, level = 0) {
        const colArr = [];
        const childrenArr = [];
        arr.forEach((col) => {
          var _a;
          col.rowSpan = col.children ? false : deep - level;
          col.colSpan = (_a = col.children) == null ? void 0 : _a.length;
          if (col.rowSpan === 1)
            delete col.rowSpan;
          if (col.colSpan === 1)
            delete col.colSpan;
          colArr.push(col);
          if (col.children) {
            childrenArr.push(...col.children);
          } else {
            tmpProps.push(col);
          }
        });
        tmpHeader.push(colArr);
        if (childrenArr.length)
          flat(childrenArr, level + 1);
      })(copyColumn);
      this.tableHeaders = tmpHeader;
      this.tableProps = tmpProps;
    },
    /**
     * 行唯一值生成
     */
    rowKeyGen(row) {
      let key = this.rowKeyGenStore.get(row);
      if (!key) {
        key = typeof this.rowKey === "function" ? this.rowKey(row) : row[this.rowKey];
        this.rowKeyGenStore.set(row, key);
      }
      return key;
    },
    // ------event handler-------------
    /**
     * 表头点击排序
     * @param {boolean} options.force sort-remote 开启后是否强制排序
     * @param {boolean} options.emit 是否触发回调
     */
    onColumnSort(col, click = true, options = {}) {
      if (!(col == null ? void 0 : col.sorter))
        return;
      options = { force: false, emit: false, ...options };
      if (this.sortCol !== col.dataIndex) {
        this.sortCol = col.dataIndex;
        this.sortOrderIndex = 0;
      }
      if (click)
        this.sortOrderIndex++;
      this.sortOrderIndex = this.sortOrderIndex % 3;
      const order = this.sortSwitchOrder[this.sortOrderIndex];
      if (!this.sortRemote || options.force) {
        this.dataSourceCopy = tableSort(col, order, this.dataSource);
      }
      if (click || options.emit) {
        this.$emit("sort-change", col, order, [...this.dataSourceCopy]);
      }
    },
    /** 插入一行 
    insertData(data) {
      if(!this.sortCol) return;
      const col = this.columns.find(it => it.dataIndex === this.sortCol);
      const sorter = col.sorter;
    },*/
    onRowClick(e, row) {
      this.$emit("row-click", e, row);
      if (this.currentItem.value === row)
        return;
      this.currentItem.value = row;
      this.$emit("current-change", e, row);
    },
    onRowDblclick(e, row) {
      this.$emit("row-dblclick", e, row);
    },
    /** 表头行右键 */
    onHeaderMenu(e) {
      this.$emit("header-row-menu", e);
    },
    /** 表体行右键 */
    onRowMenu(e, row) {
      this.$emit("row-menu", e, row);
    },
    /** 单元格单击 */
    onCellClick(e, row, col) {
      this.$emit("cell-click", e, row, col);
    },
    /** 表头单元格单击 */
    onHeaderCellClick(e, col) {
      this.$emit("header-cell-click", e, col);
    },
    /** 滚动条监听 */
    onTableScroll(e) {
      if (!(e == null ? void 0 : e.target))
        return;
      const { scrollTop, scrollLeft } = e.target;
      if (scrollTop !== this.virtualScroll.scrollTop)
        this.virtualScroll.scrollTop = scrollTop;
      if (this.virtual_on) {
        this.updateVirtualScrollY(scrollTop);
      }
      if (scrollLeft !== this.virtualScrollX.scrollLeft)
        this.virtualScrollX.scrollLeft = scrollLeft;
      if (this.virtualX_on) {
        this.updateVirtualScrollX(scrollLeft);
      }
      this.$emit("scroll", e);
    },
    /** tr hover事件 */
    onTrMouseOver(e, item) {
      if (this.showTrHoverClass) {
        this.currentHover.value = this.rowKeyGen(item);
      }
    },
    /** th拖动释放时 */
    onThDrop(e) {
      let th = e.target;
      while (th) {
        if (th.tagName === "TH")
          break;
        th = th.parentNode;
      }
      if (this.thDrag.dragStartKey !== th.dataset.colKey) {
        this.$emit("col-order-change", this.thDrag.dragStartKey, th.dataset.colKey);
      }
      this.$emit("th-drop", th.dataset.colKey);
    },
    /** 开始拖动记录th位置 */
    onThDragStart(e) {
      this.thDrag.dragStartKey = e.target.dataset.colKey;
      this.$emit("th-drag-start", this.thDrag.dragStartKey);
    },
    onThDragOver(e) {
      e.preventDefault();
    },
    // ---tool func
    /**
     * 计算高亮渐暗颜色的循环
     * FIXME: 相同数据源，相同引用的情况，将颜色值挂在数据源对象上，在多个表格使用相同数据源时会出问题。
     */
    calcHighlightLoop() {
      if (this.calcHighlightDimLoop)
        return;
      this.calcHighlightDimLoop = true;
      const recursion = () => {
        window.setTimeout(() => {
          const highlightRows = [...this.highlightDimRows];
          const nowTs = Date.now();
          for (let i = 0; i < highlightRows.length; i++) {
            const row = highlightRows[i];
            const progress = (nowTs - row._bgc_progress) / _highlightDuration;
            if (progress <= 1) {
              row._bgc = this.highlightInter(progress);
            } else {
              row._bgc = "";
              highlightRows.splice(i--, 1);
            }
          }
          this.highlightDimRows = new Set(highlightRows);
          if (this.highlightDimRows.size > 0) {
            recursion();
          } else {
            this.calcHighlightDimLoop = false;
          }
        }, _highlightColorChangeFreq);
      };
      recursion();
    },
    // ---- ref function-----
    /**
     * 选中一行，
     * @param {string} rowKey
     * @param {boolean} option.silent 是否触发回调
     */
    setCurrentRow(rowKey, option = { silent: false }) {
      if (!this.dataSourceCopy.length)
        return;
      this.currentItem.value = this.dataSourceCopy.find((it) => this.rowKeyGen(it) === rowKey);
      if (!option.silent) {
        this.$emit("current-change", this.currentItem);
      }
    },
    /** 高亮一个单元格 */
    setHighlightDimCell(rowKeyValue, dataIndex) {
      const cellEl = this.$el.querySelector(`[data-row-key="${rowKeyValue}"]>[data-index="${dataIndex}"]`);
      if (!cellEl)
        return;
      if (cellEl.classList.contains("highlight-cell")) {
        cellEl.classList.remove("highlight-cell");
        void cellEl.offsetHeight;
      }
      cellEl.classList.add("highlight-cell");
    },
    /**
     * 高亮一行
     * @param {Array<string|number>} rowKeyValues
     */
    setHighlightDimRow(rowKeyValues) {
      if (!Array.isArray(rowKeyValues))
        rowKeyValues = [rowKeyValues];
      if (this.virtual) {
        const nowTs = Date.now();
        for (let i = 0; i < rowKeyValues.length; i++) {
          const rowKeyValue = rowKeyValues[i];
          const row = this.dataSource.find((it) => this.rowKeyGen(it) === rowKeyValue);
          if (!row)
            continue;
          row._bgc_progress = nowTs;
          this.highlightDimRows.add(row);
        }
        this.calcHighlightLoop();
      } else {
        let needRepaint = false;
        for (let i = 0; i < rowKeyValues.length; i++) {
          const rowKeyValue = rowKeyValues[i];
          const rowEl = this.$el.querySelector(`[data-row-key="${rowKeyValue}"]`);
          if (!rowEl)
            continue;
          if (rowEl.classList.contains("highlight-row")) {
            rowEl.classList.remove("highlight-row");
            needRepaint = true;
          }
          rowEl.classList.add("highlight-row");
          window.clearTimeout(this.highlightDimRowsTimeout.get(rowKeyValue));
          this.highlightDimRowsTimeout.set(
            rowKeyValue,
            window.setTimeout(() => {
              rowEl.classList.remove("highlight-row");
              this.highlightDimRowsTimeout.delete(rowKeyValue);
            }, _highlightDuration)
          );
        }
        if (needRepaint) {
          void this.$el.offsetWidth;
        }
      }
    },
    /**
     * 设置表头排序状态
     * @param {string} dataIndex 列字段
     * @param {'asc'|'desc'|null} order
     * @param {object} option.sortOption 指定排序参数
     * @param {boolean} option.silent 是否触发回调
     * @param {boolean} option.sort 是否排序
     */
    setSorter(dataIndex, order, option = {}) {
      var _a;
      option = { silent: true, sortOption: null, sort: true, ...option };
      this.sortCol = dataIndex;
      this.sortOrderIndex = this.sortSwitchOrder.findIndex((it) => it === order);
      if (option.sort && ((_a = this.dataSourceCopy) == null ? void 0 : _a.length)) {
        const column = option.sortOption || this.columns.find((it) => it.dataIndex === this.sortCol);
        if (column)
          this.onColumnSort(column, false, { force: true, emit: !option.silent });
        else
          console.warn("Can not find column by dataIndex:", this.sortCol);
      }
      return this.dataSourceCopy;
    },
    /** 重置排序 */
    resetSorter() {
      this.sortCol = null;
      this.sortOrderIndex = 0;
      this.dataSourceCopy = [...this.dataSource];
    },
    /** 滚动 */
    scrollTo(top = 0, left = 0) {
      if (top !== null)
        this.$refs.tableContainer.scrollTop = top;
      if (left !== null)
        this.$refs.tableContainer.scrollLeft = left;
    },
    /** 获取当前状态的表格数据 */
    getTableData() {
      return [...this.dataSourceCopy];
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-92307b26"), n = n(), popScopeId(), n);
const _hoisted_1 = ["data-col-key", "draggable", "rowspan", "colspan", "title", "onClick"];
const _hoisted_2 = { class: "table-header-cell-wrapper" };
const _hoisted_3 = { class: "table-header-title" };
const _hoisted_4 = {
  key: 2,
  class: "table-header-sorter"
};
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16px",
  height: "16px",
  viewBox: "0 0 16 16"
}, [
  /* @__PURE__ */ createElementVNode("g", { id: "sort-btn" }, [
    /* @__PURE__ */ createElementVNode("polygon", {
      id: "arrow-up",
      fill: "#757699",
      points: "8 2 4.8 6 11.2 6"
    }),
    /* @__PURE__ */ createElementVNode("polygon", {
      id: "arrow-down",
      transform: "translate(8, 12) rotate(-180) translate(-8, -12) ",
      points: "8 10 4.8 14 11.2 14"
    })
  ])
], -1));
const _hoisted_6 = [
  _hoisted_5
];
const _hoisted_7 = ["data-row-key", "onClick", "onDblclick", "onContextmenu", "onMouseover"];
const _hoisted_8 = {
  key: 0,
  class: "virtual-x-left",
  style: { "padding": "0" }
};
const _hoisted_9 = ["data-index", "onClick"];
const _hoisted_10 = ["title"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    ref: "tableContainer",
    class: normalizeClass(["stk-table", { virtual: $props.virtual, "virtual-x": $props.virtualX, dark: $props.theme === "dark" }]),
    style: normalizeStyle($props.virtual && { "--row-height": $data.virtualScroll.rowHeight + "px" }),
    onScroll: _cache[4] || (_cache[4] = (...args) => $options.onTableScroll && $options.onTableScroll(...args))
  }, [
    createElementVNode("table", {
      class: "stk-table-main",
      style: normalizeStyle({
        minWidth: $props.minWidth,
        maxWidth: $props.maxWidth
      })
    }, [
      createElementVNode("thead", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.tableHeaders, (row, index) => {
          return openBlock(), createElementBlock("tr", {
            key: index,
            onContextmenu: _cache[3] || (_cache[3] = (e) => $options.onHeaderMenu(e))
          }, [
            $options.virtualX_on ? (openBlock(), createElementBlock("th", {
              key: 0,
              class: "virtual-x-left",
              style: normalizeStyle({
                minWidth: $data.virtualScrollX.offsetLeft + "px",
                width: $data.virtualScrollX.offsetLeft + "px"
              })
            }, null, 4)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList($options.virtualX_on ? $options.virtualX_columnPart : row, (col) => {
              return openBlock(), createElementBlock("th", {
                key: col.dataIndex,
                "data-col-key": col.dataIndex,
                draggable: $props.headerDrag ? "true" : "false",
                rowspan: col.rowSpan,
                colspan: col.colSpan,
                style: normalizeStyle({
                  textAlign: col.headerAlign,
                  width: col.width,
                  minWidth: col.minWidth || col.width,
                  maxWidth: col.maxWidth || col.width,
                  ...$options.fixedStyle("th", col)
                }),
                title: col.title,
                class: normalizeClass([
                  col.sorter ? "sortable" : "",
                  col.dataIndex === $data.sortCol && $data.sortOrderIndex !== 0 && "sorter-" + $data.sortSwitchOrder[$data.sortOrderIndex],
                  $props.showHeaderOverflow ? "text-overflow" : "",
                  col.headerClassName,
                  col.fixed ? "fixed-cell" : ""
                ]),
                onClick: (e) => {
                  $options.onColumnSort(col);
                  $options.onHeaderCellClick(e, col);
                },
                onDragstart: _cache[0] || (_cache[0] = (...args) => $options.onThDragStart && $options.onThDragStart(...args)),
                onDrop: _cache[1] || (_cache[1] = (...args) => $options.onThDrop && $options.onThDrop(...args)),
                onDragover: _cache[2] || (_cache[2] = (...args) => $options.onThDragOver && $options.onThDragOver(...args))
              }, [
                createElementVNode("div", _hoisted_2, [
                  col.customHeaderCell ? (openBlock(), createBlock(resolveDynamicComponent(typeof col.customHeaderCell === "function" ? col.customHeaderCell(col) : col.customHeaderCell), {
                    key: 0,
                    col
                  }, null, 8, ["col"])) : renderSlot(_ctx.$slots, "table-header", {
                    key: 1,
                    column: col
                  }, () => [
                    createElementVNode("span", _hoisted_3, toDisplayString(col.title), 1)
                  ], true),
                  col.sorter ? (openBlock(), createElementBlock("span", _hoisted_4, _hoisted_6)) : createCommentVNode("", true)
                ])
              ], 46, _hoisted_1);
            }), 128)),
            $options.virtualX_on ? (openBlock(), createElementBlock("th", {
              key: 1,
              style: normalizeStyle([{ "padding": "0" }, {
                minWidth: $options.virtualX_offsetRight + "px",
                width: $options.virtualX_offsetRight + "px"
              }])
            }, null, 4)) : createCommentVNode("", true)
          ], 32);
        }), 128))
      ]),
      createElementVNode("tbody", null, [
        $options.virtual_on ? (openBlock(), createElementBlock("tr", {
          key: 0,
          style: normalizeStyle({ height: `${$data.virtualScroll.offsetTop}px` })
        }, null, 4)) : createCommentVNode("", true),
        $data.dataSourceCopy && $data.dataSourceCopy.length ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.virtual_dataSourcePart, (row, i) => {
            return openBlock(), createElementBlock("tr", {
              key: $props.rowKey ? $options.rowKeyGen(row) : i,
              "data-row-key": $props.rowKey ? $options.rowKeyGen(row) : i,
              class: normalizeClass({
                active: $props.rowKey ? $options.rowKeyGen(row) === ($data.currentItem.value && $options.rowKeyGen($data.currentItem.value)) : row === $data.currentItem.value,
                hover: $props.rowKey ? $options.rowKeyGen(row) === $data.currentHover.value : row === $data.currentHover.value
              }),
              onClick: (e) => $options.onRowClick(e, row),
              onDblclick: (e) => $options.onRowDblclick(e, row),
              onContextmenu: (e) => $options.onRowMenu(e, row),
              onMouseover: (e) => $options.onTrMouseOver(e, row)
            }, [
              $options.virtualX_on ? (openBlock(), createElementBlock("td", _hoisted_8)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList($options.virtualX_on ? $options.virtualX_columnPart : $data.tableProps, (col) => {
                return openBlock(), createElementBlock("td", {
                  key: col.dataIndex,
                  "data-index": col.dataIndex,
                  class: normalizeClass([col.className, $props.showOverflow ? "text-overflow" : "", col.fixed ? "fixed-cell" : ""]),
                  style: normalizeStyle({
                    textAlign: col.align,
                    width: col.width,
                    minWidth: col.minWidth || col.width,
                    maxWidth: col.maxWidth || col.width,
                    backgroundColor: row._bgc,
                    ...$options.fixedStyle("td", col)
                  }),
                  onClick: (e) => $options.onCellClick(e, row, col)
                }, [
                  col.customCell ? (openBlock(), createBlock(resolveDynamicComponent(col.customCell), {
                    key: 0,
                    col,
                    row
                  }, null, 8, ["col", "row"])) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: "table-cell-wrapper",
                    title: row[col.dataIndex]
                  }, toDisplayString(row[col.dataIndex] ?? $props.emptyCellText), 9, _hoisted_10))
                ], 14, _hoisted_9);
              }), 128))
            ], 42, _hoisted_7);
          }), 128)),
          $options.virtual_on ? (openBlock(), createElementBlock("tr", {
            key: 0,
            style: normalizeStyle({ height: `${$options.virtual_offsetBottom}px` })
          }, null, 4)) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true)
      ])
    ], 4),
    (!$data.dataSourceCopy || !$data.dataSourceCopy.length) && $props.showNoData ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["stk-table-no-data", { "no-data-full": $props.noDataFull }])
    }, [
      renderSlot(_ctx.$slots, "no-data", {}, () => [
        createTextVNode("暂无数据")
      ], true)
    ], 2)) : createCommentVNode("", true)
  ], 38);
}
const StkTable = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-92307b26"]]);
export {
  StkTable
};
