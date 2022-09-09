"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      name: "kimi",
      class2: "ki",
      class3: 2022,
      buyPrice: "",
      buyNum: "",
      imgUrl: "/static/images/admin.png",
      averagePrice: 100,
      token: "",
      currency: 0
    };
  },
  onLoad() {
  },
  methods: {
    blur(e) {
      this.buyPrice = Math.floor(e.detail.value * 100) / 100;
      if (this.buyPrice <= 0) {
        this.buyPrice = 0;
      }
    },
    blur2(e) {
      this.buyNum = Math.floor(e.detail.value);
      if (this.buyNum <= 0) {
        this.buyNum = 1;
      }
    },
    confirm() {
      if (this.checkCurrency() && this.checkNumber()) {
        common_vendor.index.showToast({
          title: "success",
          icon: "success"
        });
      } else {
        return;
      }
    },
    getUserCurrency() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/currency/info",
        method: "GET",
        dataType: "JSON",
        header: {
          "token": this.token
        },
        success: (res) => {
          let data = JSON.parse(res.data);
          this.currency = data.data.currencyAmount;
        }
      });
    },
    checkCurrency() {
      if (this.currency >= this.buyNum * this.buyPrice) {
        return true;
      } else {
        common_vendor.index.showToast({
          title: "\u8BF7\u5145\u503C!",
          icon: "error"
        });
        setTimeout(function() {
          common_vendor.index.switchTab({
            url: "/pages/user"
          });
        }, 1e3);
        return false;
      }
    },
    checkNumber() {
      if (this.buyPrice > 0 && this.buyNum > 0) {
        return true;
      } else if (this.buyPrice == 0) {
        common_vendor.index.showToast({
          title: "\u4EF7\u683C\u9519\u8BEF!",
          icon: "error"
        });
        return false;
      } else if (this.buyNum == 0) {
        common_vendor.index.showToast({
          title: "\u6570\u91CF\u9519\u8BEF!",
          icon: "error"
        });
        return false;
      }
    }
  },
  onShow() {
    common_vendor.index.getStorage({
      key: "token",
      success: (res) => {
        this.token = res.data;
        this.getUserCurrency();
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.imgUrl,
    b: common_vendor.t($data.name),
    c: common_vendor.t($data.class2),
    d: common_vendor.t($data.class3),
    e: common_vendor.o((...args) => $options.blur && $options.blur(...args)),
    f: $data.buyPrice,
    g: common_vendor.o(($event) => $data.buyPrice = $event.detail.value),
    h: common_vendor.t($data.averagePrice),
    i: common_vendor.o((...args) => $options.blur2 && $options.blur2(...args)),
    j: $data.buyNum,
    k: common_vendor.o(($event) => $data.buyNum = $event.detail.value),
    l: common_vendor.t($data.buyPrice * $data.buyNum),
    m: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/shopping/releaseBuy.vue"]]);
wx.createPage(MiniProgramPage);
