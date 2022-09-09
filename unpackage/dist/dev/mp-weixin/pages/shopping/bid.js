"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      remain: 30,
      lowprice: 10,
      bidValue: "",
      isUpdate: false
    };
  },
  methods: {
    submit() {
      if (this.check()) {
        common_vendor.index.showToast({
          title: "\u51FA\u4EF7\u6210\u529F\uFF01",
          icon: "success"
        });
        setTimeout(function() {
          common_vendor.index.navigateBack({
            delta: 1
          });
        }, 1e3);
      }
    },
    blur(e) {
      this.bidValue = Math.floor(e.detail.value * 100) / 100;
      if (this.bidValue <= 0) {
        this.bidValue = 0;
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D",
          icon: "none"
        });
      } else if (this.bidValue < this.lowprice) {
        this.bidValue = this.lowprice;
        common_vendor.index.showToast({
          title: "\u51FA\u4EF7\u5FC5\u987B\u9AD8\u4E8E\u6700\u4F4E\u51FA\u4EF7\uFF01",
          icon: "none"
        });
      } else if (this.bidValue > this.remain) {
        this.bidValue = this.remain;
        common_vendor.index.showToast({
          title: "\u4F59\u989D\u4E0D\u8DB3\uFF0C\u8BF7\u5145\u503C\uFF01",
          icon: "none"
        });
      }
    },
    toAbout() {
      common_vendor.index.navigateTo({
        url: "/pages/about/about"
      });
    },
    check() {
      if (this.bidValue) {
        return true;
      } else {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u51FA\u4EF7\u91D1\u989D\uFF01",
          icon: "none"
        });
        return false;
      }
    },
    update() {
    }
  },
  onShow() {
    common_vendor.index.getStorage({
      key: "bidPrice",
      success: (res) => {
        this.bidValue = res.data;
        this.isUpdate = true;
      }
    });
  },
  onUnload() {
    common_vendor.index.removeStorage({
      key: "bidPrice",
      success: (res) => {
        console.log(1);
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.blur && $options.blur(...args)),
    b: $data.bidValue,
    c: common_vendor.o(($event) => $data.bidValue = $event.detail.value),
    d: common_vendor.t($data.remain),
    e: common_vendor.t($data.lowprice),
    f: !$data.isUpdate
  }, !$data.isUpdate ? {
    g: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  } : {}, {
    h: $data.isUpdate
  }, $data.isUpdate ? {
    i: common_vendor.o((...args) => $options.update && $options.update(...args))
  } : {}, {
    j: common_vendor.o((...args) => $options.toAbout && $options.toAbout(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/shopping/bid.vue"]]);
wx.createPage(MiniProgramPage);
