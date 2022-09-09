"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      chartData: {},
      opts: {
        color: [
          "#1890FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc"
        ],
        padding: [15, 10, 0, 15],
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2
        },
        extra: {
          line: {
            type: "straight",
            width: 2
          }
        }
      },
      detail: {},
      userHas: 1,
      averageOneDay: 0,
      averageOneWeek: 0,
      selling: [],
      buying: [],
      lowPrice: 0,
      highPrice: 0,
      history: [],
      historyLatest: []
    };
  },
  methods: {
    getJson() {
    },
    test() {
    },
    flashBuy() {
      if (this.selling.length) {
        common_vendor.index.navigateTo({
          url: "confirmBuy"
        });
      }
    },
    flashSell() {
      if (this.userHas > 0) {
        common_vendor.index.navigateTo({
          url: "confirmSell"
        });
      }
    },
    releaseBuy() {
      common_vendor.index.navigateTo({
        url: "releaseBuy"
      });
    },
    releaseSell() {
      common_vendor.index.navigateTo({
        url: "releaseSell"
      });
    },
    getBestPrice() {
      this.selling.sort(function(a, b) {
        return a.price - b.price;
      });
      this.lowPrice = this.selling[0].price;
      this.buying.sort(function(a, b) {
        return b.price - a.price;
      });
      this.highPrice = this.buying[0].price;
    },
    historyFive() {
      this.history.sort(function(a, b) {
        return b.time - a.time;
      });
      for (var i = 0; i < 5; i++) {
        this.historyLatest[i] = this.history[i];
      }
    },
    changeName() {
      this.historyLatest.forEach(function(item) {
        item.anonymity = item.name.replace(/./g, "*") + item.name.charAt(item.name.length - 1);
      });
    },
    changeTime() {
      var now = new Date();
      this.historyLatest.forEach(function(item) {
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
    },
    viewMore() {
      common_vendor.index.navigateTo({
        url: "flashHistory"
      });
    }
  },
  onShow() {
    common_vendor.index.getStorage({
      key: "token",
      success: (res) => {
        this.token = res.data;
      },
      fail: (res) => {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u767B\u5F55",
          icon: "none"
        });
        setTimeout(function() {
          common_vendor.index.switchTab({
            url: "../../pages/user"
          });
        }, 1e3);
      }
    });
    this.getJson();
    this.selling = [
      {
        "imgUrl": "/static/images/admin.png",
        "price": "95.0",
        "amount": "1"
      },
      {
        "imgUrl": "/static/images/admin.png",
        "price": "95.0",
        "amount": "1"
      },
      {
        "imgUrl": "/static/images/admin.png",
        "price": "100.0",
        "amount": "1"
      }
    ];
    this.buying = [
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
    ];
    this.chartData = {
      "categories": ["2016", "2017", "2018", "2019", "2020", "2021"],
      "series": [
        {
          "name": "\u95EA\u8D2D",
          "data": [35, 36, 31, 33, 13, 34]
        },
        {
          "name": "\u95EA\u51FA",
          "data": [36, 31, 33, 13, 34, 35]
        }
      ]
    };
    this.history = this.buying;
    this.detail = {
      "imgUrl": "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/shop/f1.png",
      "name": "\u5341\u4E8C\u661F\u5EA7\u767D\u7F8A\u5EA7",
      "class1": "\u5927\u5206\u7C7BA",
      "class2": "\u5206\u7C7Ba",
      "class3": "\u54C1\u7C7B1"
    };
    this.historyFive();
    this.changeName();
    this.changeTime();
    this.getBestPrice();
  }
};
if (!Array) {
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  _easycom_qiun_data_charts2();
}
const _easycom_qiun_data_charts = () => "../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
if (!Math) {
  _easycom_qiun_data_charts();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.detail.imgUrl,
    b: common_vendor.t($data.detail.name),
    c: common_vendor.t($data.detail.class2),
    d: common_vendor.t($data.detail.class3),
    e: common_vendor.t($data.userHas),
    f: common_vendor.t($data.lowPrice),
    g: common_vendor.o((...args) => $options.flashBuy && $options.flashBuy(...args)),
    h: !$data.userHas ? 1 : "",
    i: common_vendor.t($data.highPrice),
    j: common_vendor.o((...args) => $options.flashSell && $options.flashSell(...args)),
    k: !$data.userHas ? 1 : "",
    l: common_vendor.t($data.lowPrice),
    m: common_vendor.t($data.highPrice),
    n: common_vendor.f($data.selling, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.t(item.price),
        c: common_vendor.t(item.amount),
        d: index
      };
    }),
    o: common_vendor.f($data.buying, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.t(item.price),
        c: common_vendor.t(item.amount),
        d: index
      };
    }),
    p: $data.userHas == 0 ? 1 : "",
    q: common_vendor.o(($event) => $options.releaseSell()),
    r: common_vendor.o(($event) => $options.releaseBuy()),
    s: common_vendor.t($data.averageOneDay),
    t: common_vendor.t($data.averageOneDay),
    v: common_vendor.p({
      type: "line",
      opts: $data.opts,
      chartData: $data.chartData
    }),
    w: common_vendor.f($data.historyLatest, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.t(item.anonymity),
        c: common_vendor.t(item.price),
        d: common_vendor.t(item.amount),
        e: common_vendor.t(item.date),
        f: index
      };
    }),
    x: common_vendor.o((...args) => $options.viewMore && $options.viewMore(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/shopping/flashdetail.vue"]]);
wx.createPage(MiniProgramPage);
