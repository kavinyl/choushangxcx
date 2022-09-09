"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      dealList: [],
      hasWish: false,
      wishList: [],
      wishPrice: "",
      onePrice: "",
      lowPrice: "",
      message: "",
      alert: "",
      update: true,
      changeArr: []
    };
  },
  onLoad() {
    this.getJson();
  },
  methods: {
    formSubmit(e) {
      var that = this;
      var data = JSON.stringify(e.detail.value);
      if (this.check(data)) {
        console.log(JSON.stringify(e.detail.value), this.wishList);
        common_vendor.index.showToast({
          title: "\u53D1\u5E03\u6210\u529F",
          icon: "none"
        });
        setTimeout(function() {
          common_vendor.index.navigateBack({
            delta: 1
          });
        }, 1e3);
      } else {
        common_vendor.index.showToast({
          title: that.alert,
          icon: "none"
        });
      }
    },
    formReset(e) {
      console.log("\u6E05\u7A7A\u6570\u636E");
      common_vendor.index.navigateTo({
        url: "bag"
      });
    },
    addWish() {
      this.wishList.push({
        id: 1,
        type: "\u7EC8",
        img: "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/pro_19.png",
        name: "\u6234\u73CD\u73E0\u8033\u73AF\u7684\u5C11\u5973",
        time: "1656306794497",
        group: 0,
        sort: "spot",
        inBag: true,
        recover: false,
        choose: false,
        price: 58,
        point: 20,
        class1: "\u5927\u5206\u7C7BA",
        class2: "\u5927\u5206\u7C7BA-\u5206\u7C7Ba",
        class3: "\u5927\u5206\u7C7BA-\u5206\u7C7Ba-\u54C1\u7C7B1",
        isdeal: true
      });
    },
    wishShow() {
      this.wishList = this.hasWish ? [] : this.wishList;
      this.hasWish = !this.hasWish;
    },
    check(data) {
      var that = this;
      if (that.hasWish && that.wishList.length == 0) {
        that.alert = "\u6C42\u8D2D\u8D4F\u54C1\u4E3A\u7A7A";
        return false;
      } else if (that.hasWish && that.wishPrice == "") {
        that.alert = "\u8BF7\u8F93\u5165\u91D1\u989D";
        return false;
      } else if (that.onePrice == "" || that.lowPrice == "") {
        that.alert = "\u8BF7\u8F93\u5165\u91D1\u989D";
        return false;
      } else if (that.onePrice <= that.lowPrice) {
        that.alert = "\u4E00\u53E3\u4EF7\u987B\u5927\u4E8E\u6700\u4F4E\u4EF7";
        return false;
      } else {
        return true;
      }
    },
    blur(a, event) {
      var that = this;
      switch (a) {
        case "onePrice":
          that.onePrice = Math.floor(event.detail.value * 100) / 100;
          break;
        case "wishPrice":
          that.wishPrice = Math.floor(event.detail.value * 100) / 100;
          break;
        case "lowPrice":
          that.lowPrice = Math.floor(event.detail.value * 100) / 100;
          break;
        default:
          console.log(a);
          break;
      }
    },
    getJson() {
      common_vendor.index.request({
        url: "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/fake.json",
        method: "get",
        dataType: "JSON",
        success: (res) => {
          let data = JSON.parse(res.data);
          this.dealList = data.list;
        }
      });
    },
    forceupdate() {
      this.update = false;
      this.update = true;
    }
  },
  mounted() {
  },
  watch: {
    onePrice(newval, oldval) {
      var that = this;
      if (newval < 0) {
        that.onePrice = 0;
      }
    },
    wishPrice(newval, oldval) {
      var that = this;
      if (newval < 0) {
        that.wishPrice = 0;
      }
    },
    lowPrice(newval, oldval) {
      var that = this;
      if (newval < 0) {
        that.wishPrice = 0;
      }
    },
    dealList: function(newVal, oldVal) {
      console.log("\u5217\u8868\u66F4\u65B0");
      this.forceupdate();
      this.dealList.sort(function(a, b) {
        return a.id - b.id;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.dealList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: index,
        c: $data.update && item.isdeal
      };
    }),
    b: $data.hasWish,
    c: common_vendor.o((...args) => $options.wishShow && $options.wishShow(...args)),
    d: common_vendor.f($data.wishList, (item, index, i0) => {
      return {
        a: item.img,
        b: index
      };
    }),
    e: common_vendor.o((...args) => $options.addWish && $options.addWish(...args)),
    f: common_vendor.o(($event) => $options.blur("wishPrice", $event)),
    g: $data.wishPrice,
    h: common_vendor.o(($event) => $data.wishPrice = $event.detail.value),
    i: $data.hasWish,
    j: common_vendor.o(($event) => $options.blur("onePrice", $event)),
    k: $data.onePrice,
    l: common_vendor.o(($event) => $data.onePrice = $event.detail.value),
    m: common_vendor.o(($event) => $options.blur("lowPrice", $event)),
    n: $data.lowPrice,
    o: common_vendor.o(($event) => $data.lowPrice = $event.detail.value),
    p: $data.message,
    q: common_vendor.o(($event) => $data.message = $event.detail.value),
    r: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    s: common_vendor.o((...args) => $options.formReset && $options.formReset(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/category/publish.vue"]]);
wx.createPage(MiniProgramPage);
