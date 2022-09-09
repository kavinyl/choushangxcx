"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "gashapon",
  props: {
    quantity: {
      type: Number,
      require: true,
      default: 1
    }
  },
  data() {
    return {
      buttonText: "\u5F00\u59CB",
      resultList: [{}],
      curIdx: 0,
      complete: false,
      gifShow: false,
      startShow: true,
      nextShow: false,
      allShow: false,
      timestamp: "",
      salt: "94c3a70edf07f72a",
      sign: "",
      productBoxCode: "",
      productCode: ""
    };
  },
  methods: {
    test() {
      this.$emit("addTime", true);
      console.log("test");
    },
    close() {
      this.$emit("close", false);
      this.complete = false;
      this.gifShow = false;
      this.startShow = true;
      this.nextShow = false;
      this.allShow = false;
      this.curIdx = 0;
      this.buttonText = "\u5F00\u59CB";
    },
    start() {
      var that = this;
      this.gifShow = true;
      this.$emit("close", true);
      this.$emit("addTime", true);
      this.getResult();
      setTimeout(function() {
        that.complete = true;
        if (that.quantity == 1) {
          that.buttonText = "\u67E5\u770B\u5168\u90E8";
          that.startShow = false;
          that.allShow = true;
        } else {
          that.buttonText = "NEXT";
          that.startShow = false;
          that.nextShow = true;
        }
      }, 2e3);
    },
    getResult() {
      this.productBoxCode = common_vendor.index.getStorageSync("productBoxCode");
      this.productCode = common_vendor.index.getStorageSync("productCode");
      this.timestamp = Date.now();
      var str = "" + this.productBoxCode + this.quantity + this.timestamp + this.salt;
      this.sign = common_vendor.md5(str);
      common_vendor.index.request({
        url: "http://123.60.71.74:20001//mh/user/lottery/generate",
        method: "GET",
        header: {
          "token": common_vendor.index.getStorageSync("token")
        },
        data: {
          sign: this.sign,
          productBoxCode: this.productBoxCode,
          productCode: this.productCode,
          lotteryTimes: this.quantity,
          timestamp: this.timestamp
        },
        success: (res) => {
          this.resultList = res.data.data;
          common_vendor.index.setStorage({
            key: "result",
            data: this.resultList
          });
        }
      });
    },
    next() {
      var that = this;
      if (that.curIdx < that.resultList.length - 1) {
        that.curIdx++;
        if (that.curIdx == that.resultList.length - 1) {
          that.allShow = true;
          that.nextShow = false;
          that.buttonText = "\u67E5\u770B\u5168\u90E8";
        }
      }
    },
    all() {
      common_vendor.index.navigateTo({
        url: "/sub-play/pages/playResult"
      });
      this.close();
    },
    skip() {
      common_vendor.index.navigateTo({
        url: "/sub-play/pages/playResult"
      });
      this.close();
    }
  },
  onShow() {
    common_vendor.index.removeStorage({
      key: "result"
    });
  },
  mounted() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: !$data.complete && !$data.gifShow,
    b: common_vendor.o((...args) => $options.close && $options.close(...args)),
    c: $data.complete || $data.gifShow,
    d: !$data.gifShow,
    e: $data.gifShow,
    f: !$data.complete,
    g: common_vendor.t($data.curIdx + 1),
    h: common_vendor.t($props.quantity),
    i: $data.resultList[$data.curIdx].imgUrl,
    j: common_vendor.t($data.resultList[$data.curIdx].itemTypeName),
    k: common_vendor.t($data.resultList[$data.curIdx].productItemName),
    l: $data.complete,
    m: common_vendor.t($data.buttonText),
    n: $data.startShow,
    o: common_vendor.o((...args) => $options.start && $options.start(...args)),
    p: common_vendor.t($data.buttonText),
    q: $data.nextShow,
    r: common_vendor.o((...args) => $options.next && $options.next(...args)),
    s: common_vendor.t($data.buttonText),
    t: $data.allShow,
    v: common_vendor.o((...args) => $options.all && $options.all(...args)),
    w: $data.nextShow,
    x: common_vendor.o((...args) => $options.skip && $options.skip(...args)),
    y: common_vendor.o((...args) => $options.test && $options.test(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/components/gashapon/gashapon.vue"]]);
wx.createComponent(Component);
