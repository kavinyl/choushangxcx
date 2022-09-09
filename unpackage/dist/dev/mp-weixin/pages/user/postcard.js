"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      postcards: [],
      token: ""
    };
  },
  onShow() {
    common_vendor.index.getStorage({
      key: "token",
      success: (res) => {
        this.token = res.data;
        this.getJson();
      }
    });
  },
  methods: {
    getJson() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/postcard/list",
        method: "GET",
        header: {
          "token": this.token
        },
        success: (res) => {
          this.postcards = res.data.data;
        }
      });
    },
    toAbout() {
      common_vendor.index.navigateTo({
        url: "/pages/about/about"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.toAbout && $options.toAbout(...args)),
    b: common_vendor.f($data.postcards, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.t(item.price),
        c: common_vendor.t(item.amount),
        d: index
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/user/postcard.vue"]]);
wx.createPage(MiniProgramPage);
