"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      name: "kimi",
      class2: "ki",
      class3: 2022,
      imgUrl: "/static/images/pro.png",
      buyerImgUrl: "/static/images/admin.png",
      buyPrice: "90.0",
      buyAmount: 5,
      buyValue: "",
      hasAmount: 2,
      anonymity: "",
      buyerName: "123qaz"
    };
  },
  methods: {
    blur(e) {
      this.buyValue = Math.floor(e.detail.value);
      if (this.buyValue < 1) {
        this.buyValuet = 1;
      } else if (this.buyValue > this.hasAmount) {
        this.buyValue = this.hasAmount;
      }
    },
    changeName() {
      this.anonymity = this.buyerName.replace(/./g, "*") + this.buyerName.charAt(this.buyerName.length - 1);
    },
    confirm() {
    }
  },
  mounted() {
    this.changeName();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.imgUrl,
    b: common_vendor.t($data.name),
    c: common_vendor.t($data.class2),
    d: common_vendor.t($data.class3),
    e: $data.buyerImgUrl,
    f: common_vendor.t($data.anonymity),
    g: common_vendor.t($data.buyPrice),
    h: common_vendor.t($data.buyAmount),
    i: common_vendor.t($data.buyPrice * $data.buyAmount),
    j: common_vendor.o((...args) => $options.blur && $options.blur(...args)),
    k: $data.buyValue,
    l: common_vendor.o(($event) => $data.buyValue = $event.detail.value),
    m: common_vendor.t($data.hasAmount),
    n: common_vendor.t($data.buyValue * $data.buyPrice),
    o: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/shopping/confirmSell.vue"]]);
wx.createPage(MiniProgramPage);
