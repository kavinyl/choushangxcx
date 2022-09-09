"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      account: {}
    };
  },
  onShow() {
    this.token = common_vendor.index.getStorageSync("token");
    this.getJson();
  },
  onPullDownRefresh() {
    this.getJson();
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  methods: {
    getJson() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/currency/info",
        method: "GET",
        header: {
          "token": this.token
        },
        success: (res) => {
          this.account.remain = res.data.data.currencyAmount;
        }
      });
    },
    toBill() {
      common_vendor.index.navigateTo({
        url: "bill"
      });
    },
    deposit() {
      common_vendor.index.navigateTo({
        url: "deposit"
      });
    },
    withdrawal() {
      common_vendor.index.navigateTo({
        url: "withdrawal"
      });
    },
    toAbout() {
      common_vendor.index.navigateTo({
        url: "/pages/about/about"
      });
    }
  },
  mounted() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.toAbout && $options.toAbout(...args)),
    b: common_vendor.t($data.account.remain),
    c: common_vendor.o((...args) => $options.toBill && $options.toBill(...args)),
    d: common_vendor.o((...args) => $options.deposit && $options.deposit(...args)),
    e: common_vendor.o((...args) => $options.withdrawal && $options.withdrawal(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/user/account.vue"]]);
wx.createPage(MiniProgramPage);
