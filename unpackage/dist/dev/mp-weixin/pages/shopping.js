"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      items: ["\u5168\u90E8", "\u6211\u7684\u53D1\u5E03", "\u6211\u7684\u7ADE\u62CD"],
      items2: ["\u5168\u90E8", "\u6211\u7684\u51FA\u552E", "\u6211\u7684\u6536\u8D2D"],
      styles: [
        {
          value: "button",
          text: "\u6309\u94AE",
          checked: true
        },
        {
          value: "text",
          text: "\u6587\u5B57"
        }
      ],
      colors: ["#FDA804", "#4cd964", "#dd524d"],
      current: 0,
      colorIndex: 0,
      activeColor: "#FDA804",
      styleType: "text",
      update: true,
      isFlash: false,
      dealList: [],
      myPublish: [],
      myAuction: [],
      searchValue: "",
      user: {
        name: "\u4E0A\u5C71\u6253\u8001\u864E"
      },
      hasConditions: false,
      searchVal2: "",
      doSearch: false,
      flashList: [],
      flashSearch: false,
      flashSearchList: [],
      searchClass: [],
      searchFlashValue: "",
      mySellList: [],
      changeSellValue: "",
      changeBuyValue: ""
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
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    forceupdate() {
      this.update = false;
      this.update = true;
    },
    getJson() {
      common_vendor.index.request({
        url: "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/fake.json",
        method: "get",
        dataType: "JSON",
        success: (res) => {
          let data = JSON.parse(res.data);
          this.dealList = data.shop;
          this.flashList = data.flash;
          this.mySellList = [
            {
              "imgUrl": "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/shop/f1.png",
              "name": "\u5341\u4E8C\u661F\u5EA7\u767D\u7F8A\u5EA7",
              "class1Name": "\u5927\u5206\u7C7BA",
              "class2Name": "\u5206\u7C7Ba",
              "class3Name": "\u54C1\u7C7B1",
              "price": "320.0",
              "amount": 1,
              "soldAmount": 0
            },
            {
              "imgUrl": "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/shop/f2.png",
              "name": "\u4E16\u754C\u540D\u753B",
              "class1Name": "\u5927\u5206\u7C7BA",
              "class2Name": "\u5206\u7C7Ba",
              "class3Name": "\u54C1\u7C7B1",
              "price": "320.0",
              "amount": 5,
              "soldAmount": 2
            },
            {
              "imgUrl": "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/shop/f3.png",
              "name": "\u7231\u5495\u565C\u5C0F\u732A\u4ED4\u4ED4",
              "class1Name": "\u5927\u5206\u7C7BA",
              "class2Name": "\u5206\u7C7Ba",
              "class3Name": "\u54C1\u7C7B1",
              "price": "58.0",
              "amount": 5,
              "soldAmount": 1
            },
            {
              "imgUrl": "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/shop/f4.png",
              "name": "\u4ECE\u96F6\u5F00\u59CB\u7684\u5F02\u4E16\u754C\u751F\u6D3B-\u6B22\u559C\u7BC7",
              "class1Name": "\u4ECE\u96F6\u5F00\u59CB\u7684\u5F02\u4E16\u754C\u751F\u6D3B",
              "class2Name": "\u4ECE\u96F6\u5F00\u59CB\u7684\u5F02\u4E16\u754C\u751F\u6D3B-\u6B22\u559C\u7BC7",
              "class3Name": "\u54C1\u7C7B1",
              "price": "58.0",
              "amount": 1,
              "soldAmount": 1
            }
          ];
        }
      });
    },
    toDeal(item) {
      common_vendor.index.navigateTo({
        url: "shopping/dealDetail"
      });
    },
    toFlash(type) {
      var that = this;
      this.current = 0;
      if (type == "y") {
        that.isFlash = true;
      } else if (type == "n") {
        that.isFlash = false;
      }
    },
    toFlashDetail(item) {
      common_vendor.index.navigateTo({
        url: "/pages/shopping/flashdetail"
      });
    },
    search() {
    },
    goBag() {
      common_vendor.index.navigateTo({
        url: "category/bag"
      });
    },
    searchFlash() {
      console.log(1);
    },
    deleteSellShow() {
      this.$refs.delete.open();
    },
    deleteBuyShow() {
      this.$refs.delete2.open();
    },
    deleteSellConfirm() {
      console.log("\u5220\u9664");
      this.$refs.delete.close();
    },
    deleteBuyConfirm() {
      console.log("\u5220\u9664");
      this.$refs.delete2.close();
    },
    deleteSellClose() {
      console.log("\u53D6\u6D88");
      this.$refs.delete.close();
    },
    deleteBuyClose() {
      console.log("\u53D6\u6D88");
      this.$refs.delete2.close();
    },
    changeSellShow() {
      this.$refs.changeSell.open();
    },
    changeBuyShow() {
      this.$refs.changeBuy.open();
    },
    changeSellConfirm(done, value) {
      this.changeSellValue = value;
      if (this.changeCheck("sell")) {
        common_vendor.index.showToast({
          title: "\u4FEE\u6539\u6210\u529F",
          icon: "success"
        });
        this.$refs.changeSell.close();
      }
    },
    changeBuyConfirm(done, value) {
      this.changeBuyValue = value;
      if (this.changeCheck("buy")) {
        common_vendor.index.showToast({
          title: "\u4FEE\u6539\u6210\u529F",
          icon: "success"
        });
        console.log("\u65B0\u6536\u8D2D", this.changeBuyValue);
        this.$refs.changeBuy.close();
      }
    },
    changeCheck(type) {
      let reg = /^[0-9]+\.?[0-9]{0,2}$/g;
      var value;
      switch (type) {
        case "sell":
          value = this.changeSellValue;
          break;
        case "buy":
          value = this.changeBuyValue;
          break;
      }
      if (reg.test(value)) {
        if (value == "0") {
          common_vendor.index.showToast({
            title: "\u4EF7\u683C\u4E0D\u80FD\u4E3A\u96F6\uFF01",
            icon: "error"
          });
          return false;
        } else {
          return true;
        }
      } else {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u91D1\u989D",
          icon: "error"
        });
        return false;
      }
    }
  },
  watch: {
    dealList: function(newVal) {
      var that = this;
      console.log(newVal);
      newVal.forEach(function(item) {
        if (that.user.name == item.username) {
          that.myPublish.push(item);
        }
        item.auction.forEach(function(items) {
          if (that.user.name == items.username) {
            that.myAuction.push(item);
          }
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_segmented_control2 + _easycom_uni_search_bar2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_segmented_control = () => "../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_search_bar = () => "../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_popup_dialog = () => "../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_search_bar + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.isFlash ? 1 : "",
    b: common_vendor.o(($event) => $options.toFlash("n")),
    c: $data.isFlash ? 1 : "",
    d: common_vendor.o(($event) => $options.toFlash("y")),
    e: common_vendor.o($options.onClickItem),
    f: common_vendor.p({
      current: $data.current,
      values: $data.items,
      ["style-type"]: $data.styleType,
      ["active-color"]: $data.activeColor
    }),
    g: common_vendor.o($options.search),
    h: common_vendor.o(($event) => $data.searchValue = $event),
    i: common_vendor.p({
      placeholder: "\u641C\u7D22\u5173\u952E\u8BCD",
      cancelButton: "none",
      focus: false,
      modelValue: $data.searchValue
    }),
    j: $data.current === 0
  }, $data.current === 0 ? {
    k: common_vendor.f($data.dealList, (item, index, i0) => {
      return {
        a: item.userimgUrl,
        b: common_vendor.t(item.username),
        c: common_vendor.t(item.date),
        d: !item.isComplete,
        e: item.isComplete,
        f: common_vendor.t(item.info),
        g: item.wish.imgUrl,
        h: common_vendor.t(item.wish.type),
        i: item.wish.has && false,
        j: common_vendor.f(item.list, (items, idx, i1) => {
          return {
            a: items.imgUrl,
            b: common_vendor.t(items.type),
            c: idx
          };
        }),
        k: common_vendor.t(item.lowPrice),
        l: common_vendor.t(item.onePrice),
        m: common_vendor.t(item.auctionTimes),
        n: index,
        o: common_vendor.o(($event) => $options.toDeal(item), index)
      };
    })
  } : {}, {
    l: $data.current === 1
  }, $data.current === 1 ? {
    m: common_vendor.f($data.myPublish, (item, index, i0) => {
      return {
        a: item.userimgUrl,
        b: common_vendor.t(item.username),
        c: common_vendor.t(item.date),
        d: !item.isComplete,
        e: item.isComplete,
        f: common_vendor.t(item.info),
        g: common_vendor.f(item.list, (items, idx, i1) => {
          return {
            a: items.imgUrl,
            b: common_vendor.t(items.type),
            c: idx
          };
        }),
        h: common_vendor.t(item.lowPrice),
        i: common_vendor.t(item.onePrice),
        j: common_vendor.t(item.auctionTimes),
        k: index,
        l: common_vendor.o(($event) => $options.toDeal(item), index)
      };
    })
  } : {}, {
    n: $data.current === 2
  }, $data.current === 2 ? {
    o: common_vendor.f($data.myAuction, (item, index, i0) => {
      return {
        a: item.userimgUrl,
        b: common_vendor.t(item.username),
        c: common_vendor.t(item.date),
        d: !item.isComplete,
        e: item.isComplete,
        f: common_vendor.t(item.info),
        g: common_vendor.f(item.list, (items, idx, i1) => {
          return {
            a: items.imgUrl,
            b: common_vendor.t(items.type),
            c: idx
          };
        }),
        h: common_vendor.t(item.lowPrice),
        i: common_vendor.t(item.onePrice),
        j: common_vendor.t(item.auctionTimes),
        k: index,
        l: common_vendor.o(($event) => $options.toDeal(item), index)
      };
    })
  } : {}, {
    p: $data.update,
    q: !$data.isFlash,
    r: common_vendor.o($options.onClickItem),
    s: common_vendor.p({
      current: $data.current,
      values: $data.items2,
      ["style-type"]: $data.styleType,
      ["active-color"]: $data.activeColor
    }),
    t: common_vendor.o($options.searchFlash),
    v: common_vendor.o(($event) => $data.searchFlashValue = $event),
    w: common_vendor.p({
      placeholder: "\u641C\u7D22\u5173\u952E\u8BCD",
      focus: false,
      cancelButton: "none",
      modelValue: $data.searchFlashValue
    }),
    x: $data.current === 0
  }, $data.current === 0 ? {
    y: common_vendor.f($data.flashList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.t(item.name),
        c: index,
        d: common_vendor.o(($event) => $options.toFlashDetail(item), index)
      };
    })
  } : {}, {
    z: $data.current === 1
  }, $data.current === 1 ? {
    A: common_vendor.f($data.mySellList, (item, index, i0) => {
      return common_vendor.e({
        a: item.imgUrl,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.class2Name),
        d: common_vendor.t(item.class3Name),
        e: common_vendor.t(item.price),
        f: item.amount > item.soldAmount
      }, item.amount > item.soldAmount ? {
        g: common_vendor.o((...args) => $options.changeSellShow && $options.changeSellShow(...args))
      } : {}, {
        h: common_vendor.t(item.amount),
        i: item.soldAmount > 0
      }, item.soldAmount > 0 ? {
        j: common_vendor.t(item.soldAmount)
      } : {}, {
        k: item.amount > item.soldAmount
      }, item.amount > item.soldAmount ? {
        l: common_vendor.o((...args) => $options.deleteSellShow && $options.deleteSellShow(...args))
      } : {}, {
        m: item.amount == item.soldAmount
      }, item.amount == item.soldAmount ? {} : {}, {
        n: index
      });
    })
  } : {}, {
    B: $data.current === 2
  }, $data.current === 2 ? {
    C: common_vendor.f($data.mySellList, (item, index, i0) => {
      return common_vendor.e({
        a: item.imgUrl,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.class2Name),
        d: common_vendor.t(item.class3Name),
        e: common_vendor.t(item.price),
        f: item.amount > item.soldAmount
      }, item.amount > item.soldAmount ? {
        g: common_vendor.o((...args) => $options.changeBuyShow && $options.changeBuyShow(...args))
      } : {}, {
        h: common_vendor.t(item.amount),
        i: item.soldAmount > 0
      }, item.soldAmount > 0 ? {
        j: common_vendor.t(item.soldAmount)
      } : {}, {
        k: item.amount > item.soldAmount
      }, item.amount > item.soldAmount ? {
        l: common_vendor.o((...args) => $options.deleteBuyShow && $options.deleteBuyShow(...args))
      } : {}, {
        m: item.amount == item.soldAmount
      }, item.amount == item.soldAmount ? {} : {}, {
        n: index
      });
    })
  } : {}, {
    D: $data.isFlash,
    E: common_vendor.o($options.deleteSellConfirm),
    F: common_vendor.o($options.deleteSellClose),
    G: common_vendor.p({
      type: "success",
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u901A\u77E5",
      content: "\u662F\u5426\u5220\u9664\u5F53\u524D\u8BB0\u5F55!"
    }),
    H: common_vendor.sr("delete", "42793466-4"),
    I: common_vendor.p({
      type: "dialog"
    }),
    J: common_vendor.o($options.deleteBuyConfirm),
    K: common_vendor.o($options.deleteBuyClose),
    L: common_vendor.p({
      type: "success",
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u901A\u77E5",
      content: "\u662F\u5426\u5220\u9664\u5F53\u524D\u8BB0\u5F55!"
    }),
    M: common_vendor.sr("delete2", "42793466-6"),
    N: common_vendor.p({
      type: "dialog"
    }),
    O: common_vendor.sr("inputClose", "42793466-9,42793466-8"),
    P: common_vendor.o($options.changeSellConfirm),
    Q: common_vendor.o(($event) => $data.changeSellValue = $event),
    R: common_vendor.p({
      mode: "input",
      title: "\u8F93\u5165\u51FA\u552E\u91D1\u989D",
      placeholder: "\u8BF7\u8F93\u5165\u91D1\u989D",
      modelValue: $data.changeSellValue
    }),
    S: common_vendor.sr("changeSell", "42793466-8"),
    T: common_vendor.p({
      type: "dialog"
    }),
    U: common_vendor.sr("inputClose", "42793466-11,42793466-10"),
    V: common_vendor.o($options.changeBuyConfirm),
    W: common_vendor.o(($event) => $data.changeBuyValue = $event),
    X: common_vendor.p({
      mode: "input",
      title: "\u8F93\u5165\u6536\u8D2D\u91D1\u989D",
      placeholder: "\u8BF7\u8F93\u5165\u91D1\u989D",
      modelValue: $data.changeBuyValue
    }),
    Y: common_vendor.sr("changeBuy", "42793466-10"),
    Z: common_vendor.p({
      type: "dialog"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/shopping.vue"]]);
wx.createPage(MiniProgramPage);
