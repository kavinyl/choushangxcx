"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      hasConditions: false,
      timeImg: [
        "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/default.png",
        "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/up.png",
        "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/down.png"
      ],
      small: false,
      timeIndex: 0,
      update: true,
      history: [],
      totalTimes: 0,
      totalQuality: 0,
      allClass: [],
      classList: [],
      searchVal: "",
      orders: [],
      emptyList: false,
      doSearch: false,
      searchClass: [],
      token: "",
      status: "more",
      pageNo: 1,
      contentText: {
        contentdown: "\u70B9\u51FB\u5C55\u793A\u66F4\u591A",
        contentrefresh: "\u52A0\u8F7D\u4E2D",
        contentnomore: "\u6CA1\u6709\u66F4\u591A\u4E86"
      },
      totalPage: 1
    };
  },
  onShow() {
    this.token = common_vendor.index.getStorageSync("token");
    this.getJson();
  },
  onPullDownRefresh() {
    this.getJson();
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  methods: {
    getJson() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/lottery/record/page",
        method: "GET",
        data: {
          no: 1,
          size: 10
        },
        header: {
          "token": this.token
        },
        success: (res) => {
          this.history = res.data.data.list;
          this.orders = this.history;
          this.totalPage = res.data.data.totalPage;
        }
      });
    },
    getClass() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/product/class/list",
        method: "GET",
        success: (res) => {
          this.allClass = res.data.data;
        }
      });
    },
    timeSwitch() {
      var that = this;
      if (that.timeIndex == 2) {
        that.timeIndex = 0;
        that.small = false;
      } else {
        that.timeIndex++;
        that.small = true;
      }
      this.orders.forEach((item) => {
        let t = new Date(item.makeTime.replace(/\-/g, "/"));
        item.makeDate = t.getTime();
      });
      switch (that.timeIndex) {
        case 1:
          that.orders.sort(function(a, b) {
            return a.makeDate - b.makeDate;
          });
          break;
        case 2:
          that.orders.sort(function(a, b) {
            return b.makeDate - a.makeDate;
          });
          break;
        case 0:
          that.orders.sort(function(a, b) {
            return b.orderCode - a.orderCode;
          });
          break;
      }
    },
    forceupdate() {
      this.update = false;
      this.update = true;
    },
    showAll() {
      this.$refs.allClass.open();
      this.loadClass();
    },
    closeAll() {
      this.$refs.allClass.close();
    },
    classChoose(item, index) {
      item.choose = !item.choose;
    },
    clickAll() {
      this.getJson();
      this.closeAll();
      this.forceupdate();
      this.doSearch = false;
    },
    submit() {
      var arr = [];
      var that = this;
      var num = 0;
      if (this.doSearch) {
        that.searchClass.forEach(function(c1, index) {
          c1.productClass2VoList.forEach(function(c2, idx) {
            num++;
            if (c2.choose) {
              arr.push(c2.class2Name);
            }
          });
        });
      } else {
        that.allClass.forEach(function(c1, index) {
          c1.productClass2VoList.forEach(function(c2, idx) {
            num++;
            if (c2.choose) {
              arr.push(c2.class2Name);
            }
          });
        });
      }
      that.hasConditions = arr.length == num ? false : true;
      if (arr.length == 0) {
        common_vendor.index.showToast({
          title: "\u8BF7\u9009\u62E9\u4E8C\u7EA7\u5206\u7C7B",
          icon: "none"
        });
      } else {
        console.log("\u6761\u4EF6", arr);
        that.orders = [];
        that.orders.forEach(function(item, index) {
          arr.forEach(function(c, i) {
            if (item.class2Name == c) {
              that.orders.push(item);
            }
          });
        });
        this.allClass.forEach(function(c1, index) {
          c1.choose = false;
          c1.productClass2VoList.forEach(function(c2, idx) {
            c2.choose = false;
          });
        });
        that.closeAll();
        that.forceupdate();
        that.searchVal = "";
      }
    },
    search(res) {
      var that = this;
      this.doSearch = true;
      this.searchClass = [];
      var i = 0;
      this.allClass.forEach(function(item, index) {
        item.productClass2VoList.forEach(function(items, idx) {
          if (items.class2Name.indexOf(res.value) != -1) {
            that.searchClass.push({
              "name": item.class1Name,
              "choose": false,
              "productClass2VoList": []
            });
            that.searchClass[i].productClass2VoList.push({
              "name": items.class2Name,
              "choose": false
            });
            console.log(that.searchClass[i]);
            i++;
          }
        });
      });
    },
    input(res) {
    },
    clear(res) {
      this.doSearch = false;
    },
    loadClass() {
      var that = this;
      this.classList = [];
      this.allClass.forEach(function(item, index) {
        item.productClass2VoList.forEach(function(items, idx) {
          that.classList.push(items.class2Name);
        });
      });
    },
    loadMore(e) {
      var that = this;
      if (this.pageNo < this.totalPage) {
        that.pageNo++;
        this.status = "loading";
        common_vendor.index.request({
          url: "http://123.60.71.74:20001/mh/user/lottery/record/page",
          method: "GET",
          header: {
            "token": that.token
          },
          data: {
            no: that.pageNo,
            size: 10
          },
          success: (res) => {
            res.data.data.list.forEach(function(item) {
              that.history.push(item);
              that.orders.push(item);
            });
            that.status = "more";
          }
        });
      } else {
        this.status = "noMore";
      }
    }
  },
  mounted() {
  },
  watch: {
    history: function(newVal, oldVal) {
      this.getClass();
    },
    orders: function(newVal, oldVal) {
      var that = this;
      console.log(newVal);
      this.totalTimes = newVal.length;
      that.totalQuality = 0;
      for (let i = 0; i < this.orders.length; i++) {
        that.totalQuality += that.orders[i].lotteryTimes;
      }
      this.loadClass();
    }
  }
};
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  (_easycom_uni_load_more2 + _easycom_uni_search_bar2 + _easycom_uni_drawer2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_uni_search_bar + _easycom_uni_drawer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.hasConditions,
    b: $data.hasConditions,
    c: common_vendor.o((...args) => $options.showAll && $options.showAll(...args)),
    d: $data.small ? 1 : "",
    e: $data.timeImg[$data.timeIndex],
    f: common_vendor.o((...args) => $options.timeSwitch && $options.timeSwitch(...args)),
    g: common_vendor.t($data.totalTimes),
    h: common_vendor.t($data.totalQuality),
    i: $data.emptyList,
    j: common_vendor.f($data.orders, (item, index, i0) => {
      return {
        a: common_vendor.t(item.orderCode),
        b: common_vendor.t(item.productName),
        c: common_vendor.t(item.makeTime),
        d: common_vendor.t(item.lotteryTimes),
        e: common_vendor.t(item.price),
        f: index
      };
    }),
    k: common_vendor.o($options.loadMore),
    l: common_vendor.p({
      status: $data.status,
      contentText: $data.contentText
    }),
    m: common_vendor.o($options.search),
    n: common_vendor.o($options.input),
    o: common_vendor.o($options.clear),
    p: common_vendor.o(($event) => $data.searchVal = $event),
    q: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
      cancelButton: "none",
      modelValue: $data.searchVal
    }),
    r: common_vendor.o((...args) => $options.clickAll && $options.clickAll(...args)),
    s: !$data.doSearch
  }, !$data.doSearch ? {
    t: common_vendor.f($data.allClass, (c1, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(c1.class1Name),
        b: !c1.choose
      }, !c1.choose ? {} : {}, {
        c: c1.choose
      }, c1.choose ? {} : {}, {
        d: c1.choose ? 1 : "",
        e: common_vendor.o(($event) => $options.classChoose(c1, index)),
        f: common_vendor.f(c1.productClass2VoList, (c2, idx, i1) => {
          return {
            a: common_vendor.t(c2.class2Name),
            b: c2.choose ? 1 : "",
            c: common_vendor.o(($event) => $options.classChoose(c2, idx)),
            d: idx,
            e: c2.choose ? "1000rpx" : "80rpx"
          };
        }),
        g: common_vendor.t(c1.class1Name),
        h: index,
        i: c1.choose ? "1000rpx" : "80rpx"
      });
    })
  } : {}, {
    v: $data.doSearch
  }, $data.doSearch ? {
    w: common_vendor.f($data.searchClass, (c1, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(c1.class1Name),
        b: !c1.choose
      }, !c1.choose ? {} : {}, {
        c: c1.choose
      }, c1.choose ? {} : {}, {
        d: c1.choose ? 1 : "",
        e: common_vendor.o(($event) => $options.classChoose(c1, index)),
        f: common_vendor.f(c1.productClass2VoList, (c2, idx, i1) => {
          return {
            a: common_vendor.t(c2.class2Name),
            b: c2.choose ? 1 : "",
            c: common_vendor.o(($event) => $options.classChoose(c2, idx)),
            d: idx,
            e: c2.choose ? "1000rpx" : "80rpx"
          };
        }),
        g: common_vendor.t(c1.class1Name),
        h: index,
        i: c1.choose ? "1000rpx" : "80rpx"
      });
    })
  } : {}, {
    x: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    y: common_vendor.sr("allClass", "c043b796-1"),
    z: common_vendor.o(($event) => $options.closeAll()),
    A: common_vendor.p({
      mode: "left",
      ["mask-click"]: true
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/user/history.vue"]]);
wx.createPage(MiniProgramPage);
