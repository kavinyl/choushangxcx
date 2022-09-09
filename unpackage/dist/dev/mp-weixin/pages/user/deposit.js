"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      deposit: ""
    };
  },
  methods: {
    blur(e) {
      this.deposit = Math.floor(e.detail.value * 100) / 100;
      if (this.deposit <= 0) {
        this.deposit = 0;
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D",
          icon: "none"
        });
      }
    },
    post() {
      common_vendor.index.showToast({
        title: "\u5145\u503C\u6210\u529F" + this.deposit + "\u5143",
        icon: "none"
      });
    },
    formSubmit() {
      if (this.deposit) {
        this.post();
        setTimeout(function() {
          common_vendor.index.navigateBack({
            delta: 1
          });
        }, 1e3);
      }
    },
    payment() {
      common_vendor.index.requestPayment({
        provider: "wxpay",
        timeStamp: String(Date.now()),
        nonceStr: "A1B2C3D4E5",
        package: "prepay_id=wx20180101abcdefg",
        signType: "MD5",
        paySign: "",
        success: function(res) {
          console.log("success:" + JSON.stringify(res));
        },
        fail: function(err) {
          console.log("fail:" + JSON.stringify(err));
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.blur($event)),
    b: $data.deposit,
    c: common_vendor.o(($event) => $data.deposit = $event.detail.value),
    d: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/user/deposit.vue"]]);
wx.createPage(MiniProgramPage);
