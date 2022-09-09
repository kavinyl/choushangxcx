"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      deal: {},
      countHour: 24,
      countMinute: 0,
      countSecond: 0,
      wish: {},
      update: true,
      remain: 50,
      cTime: "",
      hasBid: false,
      isMaster: true,
      hasBidPrice: 0,
      user: {},
      successPrice: 0
    };
  },
  onLoad() {
  },
  methods: {
    test1() {
      this.hasBid = false;
      this.isMaster = false;
    },
    test2() {
      this.hasBid = true;
      this.isMaster = false;
    },
    test3() {
      this.hasBid = false;
      this.isMaster = true;
    },
    getJson() {
      common_vendor.index.request({
        url: "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/fake.json",
        method: "get",
        dataType: "JSON",
        success: (res) => {
          let data = JSON.parse(res.data);
          this.deal = data.shop[2];
          this.wish = this.deal.wish;
          this.remain = data.user.account.remain;
          this.cTime = this.deal.time;
          this.user = data.user;
          this.getTime(-8);
        }
      });
    },
    forceUpdate() {
      this.update = false;
      this.update = true;
    },
    goBid() {
      common_vendor.index.navigateTo({
        url: "bid"
      });
    },
    dealNow() {
      this.$refs.order.open("center");
    },
    bidReady() {
      var that = this;
      if (this.check(this.deal.onePrice)) {
        common_vendor.index.showToast({
          title: "\u606D\u559C\u60A8\uFF0C\u4EA4\u6613\u6210\u529F\uFF01",
          icon: "success"
        });
        setTimeout(function() {
          that.$refs.order.close();
        }, 1e3);
      } else {
        common_vendor.index.showToast({
          title: "\u4F59\u989D\u4E0D\u8DB3\uFF0C\u8BF7\u5148\u5145\u503C\uFF01",
          icon: "error"
        });
      }
    },
    bidTen() {
      if (this.check(Number(this.deal.lowPrice) + 10)) {
        common_vendor.index.showToast({
          title: "\u51FA\u4EF7\u6210\u529F\uFF01",
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "\u4F59\u989D\u4E0D\u8DB3\uFF0C\u8BF7\u5148\u5145\u503C\uFF01",
          icon: "error"
        });
      }
    },
    check(n) {
      if (this.remain >= n) {
        return true;
      } else {
        return false;
      }
    },
    getTime(i) {
      let day = 1;
      var now = new Date();
      var n = Number(now.getTime());
      var c = Number(this.cTime);
      var offset = now.getTimezoneOffset() * 60 * 1e3;
      var countdown = c + 864e5 * day - n - offset - i * 36e5;
      var cd = new Date(countdown);
      var countDate = cd.getDate() - 1;
      console.log(countDate);
      this.countHour = cd.getHours() + countDate * 24;
      this.countMinute = cd.getMinutes();
      this.countSecond = cd.getSeconds();
      console.log(this.countHour, this.countMinute, this.countSecond);
    },
    checkUser() {
      var that = this;
      let userName = this.user.userName;
      this.deal.auction.forEach(function(item, index) {
        if (item.username == userName) {
          that.hasBid = true;
          that.hasBidPrice = item.price;
          common_vendor.index.setStorage({
            key: "bidPrice",
            data: item.price
          });
        }
      });
      if (that.deal.username == userName) {
        that.isMaster = true;
      }
    },
    cancelBid() {
      this.hasBid = false;
    },
    dealSuccess(i) {
      this.$refs.success.open("center");
      this.successPrice = i.price;
    },
    updateDeal() {
      common_vendor.index.showToast({
        title: "\u66F4\u65B0\u6210\u529F\uFF01",
        icon: "success"
      });
      setTimeout(function() {
        common_vendor.index.switchTab({
          url: "/pages/shopping"
        });
      }, 1e3);
    },
    deleteDeal() {
      common_vendor.index.showToast({
        title: "\u5220\u9664\u6210\u529F\uFF01",
        icon: "success"
      });
      setTimeout(function() {
        common_vendor.index.switchTab({
          url: "/pages/shopping"
        });
      }, 1e3);
    },
    confirm() {
      var that = this;
      common_vendor.index.showToast({
        title: "\u606D\u559C\u60A8\uFF0C\u4EA4\u6613\u6210\u529F\uFF01",
        icon: "success"
      });
      setTimeout(function() {
        that.$refs.success.close();
      }, 1e3);
    }
  },
  mounted() {
  },
  onShow() {
    this.getJson();
  },
  watch: {}
};
if (!Array) {
  const _easycom_uni_countdown2 = common_vendor.resolveComponent("uni-countdown");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_countdown2 + _easycom_uni_popup2)();
}
const _easycom_uni_countdown = () => "../../uni_modules/uni-countdown/components/uni-countdown/uni-countdown.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_countdown + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.deal.userimgUrl,
    b: common_vendor.t($data.deal.username),
    c: common_vendor.p({
      fontSize: 24,
      ["show-day"]: false,
      hour: $data.countHour,
      minute: $data.countMinute,
      second: $data.countSecond
    }),
    d: common_vendor.t($data.deal.info),
    e: $data.wish.has && false
  }, $data.wish.has && false ? {
    f: $data.wish.imgUrl,
    g: common_vendor.t($data.wish.type)
  } : {}, {
    h: common_vendor.f($data.deal.list, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.t(item.type),
        c: index
      };
    }),
    i: common_vendor.t($data.deal.lowPrice),
    j: common_vendor.t($data.deal.onePrice),
    k: common_vendor.o((...args) => $options.bidTen && $options.bidTen(...args)),
    l: common_vendor.o((...args) => $options.dealNow && $options.dealNow(...args)),
    m: !$data.isMaster,
    n: common_vendor.t($data.deal.auctionTimes),
    o: common_vendor.f($data.deal.auction, (item, index, i0) => {
      return {
        a: common_vendor.t(item.floor),
        b: item.userimgUrl,
        c: common_vendor.t(item.username),
        d: common_vendor.t(item.price),
        e: common_vendor.o(($event) => $options.dealSuccess(item)),
        f: index
      };
    }),
    p: $data.isMaster,
    q: $data.update,
    r: !$data.hasBid && !$data.isMaster
  }, !$data.hasBid && !$data.isMaster ? {
    s: common_vendor.o((...args) => $options.goBid && $options.goBid(...args))
  } : {}, {
    t: $data.hasBid && !$data.isMaster
  }, $data.hasBid && !$data.isMaster ? {
    v: common_vendor.t($data.hasBidPrice),
    w: common_vendor.o((...args) => $options.goBid && $options.goBid(...args)),
    x: common_vendor.o((...args) => $options.cancelBid && $options.cancelBid(...args))
  } : {}, {
    y: !$data.hasBid && $data.isMaster
  }, !$data.hasBid && $data.isMaster ? {
    z: common_vendor.o((...args) => $options.updateDeal && $options.updateDeal(...args)),
    A: common_vendor.o((...args) => $options.deleteDeal && $options.deleteDeal(...args))
  } : {}, {
    B: common_vendor.t($data.deal.onePrice),
    C: common_vendor.t($data.remain),
    D: common_vendor.o((...args) => $options.bidReady && $options.bidReady(...args)),
    E: common_vendor.sr("order", "13a0a78f-1"),
    F: common_vendor.p({
      type: "center"
    }),
    G: common_vendor.t($data.successPrice),
    H: common_vendor.o((...args) => $options.confirm && $options.confirm(...args)),
    I: common_vendor.sr("success", "13a0a78f-2"),
    J: common_vendor.p({
      type: "center"
    }),
    K: common_vendor.o(($event) => $options.test1()),
    L: common_vendor.o(($event) => $options.test2()),
    M: common_vendor.o(($event) => $options.test3())
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/shopping/dealDetail.vue"]]);
wx.createPage(MiniProgramPage);
