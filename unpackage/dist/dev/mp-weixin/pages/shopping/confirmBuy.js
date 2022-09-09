"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      name: "kimi",
      class2: "ki",
      class3: 2022,
      sellPrice: "95.0",
      buyNum: "",
      imgUrl: "/static/images/pro.png",
      amount: 1,
      averagePrice: 100,
      token: "",
      sellerImgUrl: "/static/images/admin.png",
      anonymity: "",
      sellerName: "123zxc",
      payType: "wxPay"
    };
  },
  methods: {
    confirm() {
    },
    changePayType(e) {
      this.payType = e + "Pay";
    },
    changeName() {
      this.anonymity = this.sellerName.replace(/./g, "*") + this.sellerName.charAt(this.sellerName.length - 1);
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
    e: common_vendor.t($data.amount),
    f: common_vendor.t($data.sellPrice),
    g: $data.sellerImgUrl,
    h: common_vendor.t($data.anonymity),
    i: $data.payType == "wxPay",
    j: common_vendor.o(($event) => $options.changePayType("wx")),
    k: $data.payType == "sxPay",
    l: common_vendor.o(($event) => $options.changePayType("sx")),
    m: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/shopping/confirmBuy.vue"]]);
wx.createPage(MiniProgramPage);
