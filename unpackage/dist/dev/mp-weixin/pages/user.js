"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isLogin: false,
      token: "",
      code: "",
      userInfo: ""
    };
  },
  onShow() {
    this.checkToken();
  },
  methods: {
    checkToken() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/wx/mini/user/check",
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token": common_vendor.index.getStorageSync("token")
        },
        success: (res) => {
          console.log("token", res);
          if (res.data.code == "555" || res.data.code == "556") {
            common_vendor.index.showToast({
              title: "\u767B\u5F55\u8FC7\u671F\uFF01",
              icon: "error"
            });
            this.isLogin = false;
          } else {
            common_vendor.index.setStorage({
              key: "token",
              data: res.data.data
            });
            this.isLogin = true;
            this.userInfo = common_vendor.index.getStorageSync("userInfo");
          }
        }
      });
    },
    toPage(url) {
      if (this.isLogin) {
        common_vendor.index.navigateTo({
          "url": url
        });
      } else {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u767B\u5F55",
          icon: "none"
        });
      }
    },
    getUserInfo() {
      var that = this;
      common_vendor.index.showLoading({
        title: "\u52A0\u8F7D\u4E2D"
      });
      common_vendor.index.getUserProfile({
        desc: "\u767B\u5F55\u540E\u53EF\u540C\u6B65\u6570\u636E",
        success: async (obj) => {
          console.log("obj", obj);
          this.userInfo = obj.userInfo;
          common_vendor.index.setStorageSync("userInfo", this.userInfo);
          common_vendor.index.login({
            provider: "weixin",
            success: (res) => {
              console.log("res-login", res);
              that.code = res.code;
              if (res.errMsg == "login:ok") {
                common_vendor.index.request({
                  url: "http://123.60.71.74:20001//wx/mini/user/login/?code=" + this.code,
                  data: {
                    code: that.code,
                    nickName: that.userInfo.nickName,
                    avatarUrl: that.userInfo.avatarUrl
                  },
                  method: "POST"
                }).then((res2) => {
                  console.log(res2);
                  if (res2.data.code == 500) {
                    that.getUserInfo();
                  } else if (res2.statusCode == 200) {
                    that.token = res2.data.data;
                    common_vendor.index.setStorage({
                      key: "token",
                      data: that.token
                    });
                    this.isLogin = true;
                  }
                });
                console.log("success");
              }
            }
          });
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "\u8BF7\u91CD\u8BD5",
            icon: "error",
            mask: true
          });
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    }
  },
  watch: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.isLogin
  }, !$data.isLogin ? {
    b: common_vendor.o((...args) => $options.getUserInfo && $options.getUserInfo(...args))
  } : {}, {
    c: $data.isLogin
  }, $data.isLogin ? {
    d: $data.userInfo.avatarUrl,
    e: common_vendor.t($data.userInfo.nickName)
  } : {}, {
    f: common_vendor.o(($event) => $options.toPage("/pages/user/fav")),
    g: common_vendor.o(($event) => $options.toPage("/pages/user/account")),
    h: common_vendor.o(($event) => $options.toPage("/pages/user/history")),
    i: common_vendor.o(($event) => $options.toPage("/pages/user/address")),
    j: common_vendor.o(($event) => $options.toPage("/pages/user/postcard")),
    k: common_vendor.o(($event) => $options.toPage("/pages/about/agreements"))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/user.vue"]]);
wx.createPage(MiniProgramPage);
