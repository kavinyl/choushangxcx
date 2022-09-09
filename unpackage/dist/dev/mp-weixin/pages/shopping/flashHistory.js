"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      historyList: [
        {
          "imgUrl": "/static/images/admin.png",
          "price": "95.0",
          "amount": "1",
          "time": "1661238591000",
          "name": "sadasd"
        },
        {
          "imgUrl": "/static/images/admin.png",
          "price": "95.0",
          "amount": "1",
          "time": "1661239592000",
          "name": "\u554A\u5B9E\u6253\u5B9E\u5927\u82CF\u6253"
        },
        {
          "imgUrl": "/static/images/admin.png",
          "price": "100.0",
          "amount": "1",
          "time": "1661242593000",
          "name": "123"
        },
        {
          "imgUrl": "/static/images/admin.png",
          "price": "100.0",
          "amount": "1",
          "time": "1661146043000",
          "name": "\u963F\u65AF\u987F525"
        },
        {
          "imgUrl": "/static/images/admin.png",
          "price": "85.0",
          "amount": "1",
          "time": "1660973243000",
          "name": "5a"
        }
      ]
    };
  },
  methods: {
    changeName() {
      this.historyList.forEach(function(item) {
        item.anonymity = item.name.replace(/./g, "*") + item.name.charAt(item.name.length - 1);
      });
    },
    changeTime() {
      var now = new Date();
      this.historyList.forEach(function(item) {
        var a = now.getTime() - item.time;
        if (a >= 864e5 * 3) {
          var dt = new Date(Number(item.time));
          item.date = dt.getMonth() + 1 + "/" + dt.getDate();
        } else if (a < 864e5 * 3 && a >= 864e5 * 2) {
          item.date = "\u4E09\u5929\u524D";
        } else if (a < 864e5 * 2 && a >= 864e5 * 1) {
          item.date = "\u6628\u5929";
        } else if (a < 864e5) {
          item.date = "\u4ECA\u5929";
        }
      });
    }
  },
  mounted() {
    this.changeName();
    this.changeTime();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.historyList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.t(item.anonymity),
        c: common_vendor.t(item.price),
        d: common_vendor.t(item.amount),
        e: common_vendor.t(item.date),
        f: index
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/shopping/flashHistory.vue"]]);
wx.createPage(MiniProgramPage);
