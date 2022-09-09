"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      withdrawal: "",
      account: {}
    };
  },
  onLoad() {
    this.getJson();
  },
  methods: {
    blur(e) {
      var that = this;
      this.withdrawal = Math.floor(e.detail.value * 100) / 100;
      if (that.withdrawal <= 0) {
        that.withdrawal = 0;
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u63D0\u73B0\u91D1\u989D",
          icon: "none"
        });
      } else if (that.withdrawal > that.account.remain) {
        that.withdrawal = that.account.remain;
        common_vendor.index.showToast({
          title: "\u6700\u591A\u53EF\u63D0\u73B0" + that.account.remain + "\u5143",
          icon: "none"
        });
      }
    },
    post() {
      common_vendor.index.showToast({
        title: "\u63D0\u73B0\u6210\u529F" + this.withdrawal + "\u5143",
        icon: "none"
      });
    },
    formSubmit() {
      if (this.withdrawal) {
        this.post();
      }
    },
    getJson() {
      common_vendor.index.request({
        url: "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/fake.json",
        method: "get",
        dataType: "JSON",
        success: (res) => {
          let data = JSON.parse(res.data);
          this.account = data.user.account;
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.blur($event)),
    b: $data.withdrawal,
    c: common_vendor.o(($event) => $data.withdrawal = $event.detail.value),
    d: common_vendor.t($data.account.remain),
    e: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/user/withdrawal.vue"]]);
wx.createPage(MiniProgramPage);
