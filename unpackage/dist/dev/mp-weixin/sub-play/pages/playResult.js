"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      resultList: [],
      amount: []
    };
  },
  onShow() {
    common_vendor.index.getStorage({
      key: "result",
      success: (res) => {
        this.resultList = res.data;
        this.calc();
      }
    });
  },
  methods: {
    calc() {
      var that = this;
      that.resultList.sort(function(a, b) {
        var x = a.productItemCode.toLowerCase();
        var y = b.productItemCode.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      console.log(that.resultList);
      for (let i = 0; i < that.resultList.length; ) {
        var times = 0;
        for (let n = i; n < that.resultList.length; n++) {
          if (that.resultList[i].productItemCode === that.resultList[n].productItemCode) {
            times++;
          }
        }
        that.resultList[i]["value"] = times;
        that.amount.push(that.resultList[i]);
        i += times;
      }
    }
  },
  mounted() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.amount, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.t(item.itemTypeName),
        c: common_vendor.t(item.value),
        d: common_vendor.t(item.productItemName),
        e: item.idx
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/sub-play/pages/playResult.vue"]]);
wx.createPage(MiniProgramPage);
