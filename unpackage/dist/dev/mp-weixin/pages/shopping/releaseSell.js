"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      imgurl: "/static/images/admin.png",
      name: "kimi",
      class2: "ki",
      class3: 2022,
      ownNumber: 1,
      sellPrice: "",
      sellCount: 1,
      averagePrice: 100
    };
  },
  onLoad() {
  },
  methods: {
    blur(e) {
      this.sellPrice = Math.floor(e.detail.value * 100) / 100;
      if (this.sellPrice <= 0) {
        this.sellPrice = 0;
      }
    },
    Confirm() {
    },
    changeValue(value) {
      this.sellPrice = value;
    }
  },
  onShow() {
  }
};
if (!Array) {
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  _easycom_uni_number_box2();
}
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
if (!Math) {
  _easycom_uni_number_box();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.imgurl,
    b: common_vendor.o((...args) => _ctx.getSellsImg && _ctx.getSellsImg(...args)),
    c: common_vendor.t($data.name),
    d: common_vendor.t($data.class2),
    e: common_vendor.t($data.class3),
    f: common_vendor.t($data.ownNumber),
    g: common_vendor.o((...args) => $options.blur && $options.blur(...args)),
    h: $data.sellPrice,
    i: common_vendor.o(($event) => $data.sellPrice = $event.detail.value),
    j: common_vendor.t($data.averagePrice),
    k: common_vendor.o($options.changeValue),
    l: common_vendor.o(($event) => $data.sellCount = $event),
    m: common_vendor.p({
      max: $data.ownNumber,
      modelValue: $data.sellCount
    }),
    n: common_vendor.t($data.ownNumber),
    o: common_vendor.o((...args) => _ctx.confirm && _ctx.confirm(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/shopping/releaseSell.vue"]]);
wx.createPage(MiniProgramPage);
