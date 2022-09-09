"use strict";
var common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/category.js";
  "./pages/shopping.js";
  "./pages/user.js";
  "./pages/about/about.js";
  "./pages/index/search.js";
  "./pages/index/searchDetail.js";
  "./pages/category/bag.js";
  "./pages/category/publish.js";
  "./pages/user/fav.js";
  "./pages/user/account.js";
  "./pages/user/history.js";
  "./pages/user/address.js";
  "./pages/user/service.js";
  "./pages/about/agreements.js";
  "./pages/user/newaddress.js";
  "./pages/user/bill.js";
  "./pages/user/withdrawal.js";
  "./pages/user/deposit.js";
  "./pages/user/postcard.js";
  "./pages/shopping/flashdetail.js";
  "./pages/shopping/dealDetail.js";
  "./pages/shopping/bid.js";
  "./pages/shopping/releaseBuy.js";
  "./pages/shopping/releaseSell.js";
  "./pages/shopping/flashHistory.js";
  "./pages/shopping/confirmBuy.js";
  "./pages/shopping/confirmSell.js";
  "./pages/about/ship.js";
  "./pages/about/flashBuy.js";
  "./sub-play/pages/play.js";
  "./sub-play/pages/playResult.js";
}
const proList = () => "./components/proList/proList.js";
const _sfc_main$1 = {
  components: {
    proList
  },
  data() {
    return {
      searchTip: "\u641C\u7D22\u5173\u952E\u8BCD",
      swiperDatas: [],
      autoplay: true,
      sortList: [{
        id: 1,
        img: "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/\u795E\u9F99.png",
        name: "\u795E\u9F99",
        url: "/sub-play/pages/play"
      }, {
        id: 2,
        img: "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/\u9AD8\u8FBE.png",
        name: "\u9AD8\u8FBE",
        url: "/sub-play/pages/play"
      }, {
        id: 3,
        img: "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/\u6D77\u8D3C\u738B.png",
        name: "\u6D77\u8D3C\u738B",
        url: "/sub-play/pages/play"
      }, {
        id: 4,
        img: "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/\u4E03\u9F99\u73E0.png",
        name: "\u4E03\u9F99\u73E0",
        url: "/sub-play/pages/play"
      }, {
        id: 5,
        img: "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/\u624B\u529E.png",
        name: "\u624B\u529E",
        url: "/sub-play/pages/play"
      }],
      title: "",
      product: [],
      pageNo: 1,
      total: 1,
      requestUrl: "http://123.60.71.74:20001/"
    };
  },
  onLoad() {
    this.getJson();
  },
  onPullDownRefresh() {
    this.getJson();
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  methods: {
    search() {
      common_vendor.index.navigateTo({
        url: "search"
      });
    },
    toPage() {
      common_vendor.index.navigateTo({
        url: "/sub-play/pages/play"
      });
    },
    getJson() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001//mh/banner/list",
        method: "GET",
        dataType: "JSON",
        success: (res) => {
          let data = JSON.parse(res.data);
          this.swiperDatas = data.data;
        }
      });
      common_vendor.index.request({
        url: "http://123.60.71.74:20001//mh/product/page",
        method: "GET",
        dataType: "JSON",
        data: {
          no: this.pageNo,
          size: 10
        },
        success: (res) => {
          let data = JSON.parse(res.data);
          this.product = data.data.list;
          this.total = data.data.totalPage;
        }
      });
    }
  },
  mounted() {
  }
};
if (!Array) {
  const _easycom_proList2 = common_vendor.resolveComponent("proList");
  _easycom_proList2();
}
const _easycom_proList = () => "./components/proList/proList.js";
if (!Math) {
  _easycom_proList();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.searchTip),
    b: common_vendor.o((...args) => $options.search && $options.search(...args)),
    c: $data.swiperDatas && $data.swiperDatas.length > 0
  }, $data.swiperDatas && $data.swiperDatas.length > 0 ? {
    d: common_vendor.f($data.swiperDatas, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: item.id
      };
    }),
    e: common_vendor.o(() => {
    }),
    f: $data.autoplay
  } : {}, {
    g: common_vendor.f($data.sortList, (item, index, i0) => {
      return {
        a: item.img,
        b: common_vendor.t(item.name),
        c: item.id,
        d: common_vendor.o(($event) => $options.toPage(), item.id)
      };
    }),
    h: common_vendor.p({
      ["product-list"]: $data.product,
      ["total-page"]: $data.total
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/index/index.vue"]]);
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
    common_vendor.index.onAppShow(this.checkQueue);
    common_vendor.index.onAppShow(this.checkToken);
  },
  onHide: function() {
    console.log("App Hide");
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
            setTimeout(() => {
              common_vendor.index.switchTab({
                url: "/pages/user"
              }, 1e3);
            });
          } else {
            common_vendor.index.setStorage({
              key: "token",
              data: res.data.data
            });
          }
        }
      });
    },
    checkQueue() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/queue/now",
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token": common_vendor.index.getStorageSync("token")
        },
        success: (res) => {
          console.log("queue", res);
          if (res.data.data.productBoxCode) {
            common_vendor.index.showLoading({
              title: "\u8DF3\u8F6C\u81F3\u961F\u5217"
            });
            common_vendor.index.setStorageSync("productCode", res.data.data.productCode);
            common_vendor.index.setStorageSync("productBoxCode", res.data.data.productBoxCode);
            setTimeout(function() {
              common_vendor.index.hideLoading();
              common_vendor.index.navigateTo({
                url: "/sub-play/pages/play"
              });
            }, 1e3);
          }
        }
      });
    }
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.MiniProgramPage = MiniProgramPage;
exports.createApp = createApp;
