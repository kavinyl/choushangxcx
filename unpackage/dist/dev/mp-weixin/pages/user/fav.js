"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      items: ["\u4E00\u756A\u8D4F", "\u624B\u529E", "\u76F2\u76D2"],
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
      favList: [],
      doSelect: false,
      controlShow: false,
      selectAll: false,
      selectNum: 0,
      token: "",
      delList: [],
      pageNo: 1,
      totalPage: 1,
      status: "more",
      contentText: {
        contentdown: "\u70B9\u51FB\u5C55\u793A\u66F4\u591A",
        contentrefresh: "\u52A0\u8F7D\u4E2D",
        contentnomore: "\u6CA1\u6709\u66F4\u591A\u4E86"
      }
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
    test() {
      common_vendor.index.request({
        url: "/static/fake.json",
        method: "GET",
        dataType: "JSON",
        success: (res) => {
          console.log(res.data.user);
          this.favList = res.data.user.favList;
          console.log(this.favList);
        }
      });
    },
    getJson() {
      var that = this;
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/favourite/page",
        method: "GET",
        header: {
          "token": this.token
        },
        data: {
          "no": this.pageNo,
          "size": 10
        },
        dataType: "JSON",
        success: (res) => {
          console.log(res);
          let data = JSON.parse(res.data);
          this.favList = data.data.list;
          this.totalPage = data.data.totalPage;
          if (this.totalPage == 1) {
            that.status = "noMore";
          }
          console.log(this.favList);
        }
      });
    },
    loadMore(e) {
      var that = this;
      if (this.pageNo < this.totalPage) {
        that.pageNo++;
        this.status = "loading";
        common_vendor.index.request({
          url: "http://123.60.71.74:20001//mh/user/favourite/page",
          method: "GET",
          dataType: "JSON",
          header: {
            "token": that.token
          },
          data: {
            no: that.pageNo,
            size: 10
          },
          success: (res) => {
            let data = JSON.parse(res.data);
            console.log(data.data);
            data.data.list.forEach(function(item) {
              that.favList.push(item);
            });
            that.status = "more";
          }
        });
      } else {
        this.status = "noMore";
      }
    },
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    select() {
      this.doSelect = !this.doSelect;
      this.controlShow = !this.controlShow;
    },
    clickFav(item) {
      if (this.doSelect) {
        item.choose = !item.choose;
      }
      let num = 0;
      this.favList.forEach(function(item2, index) {
        if (item2.choose) {
          num++;
        }
      });
      this.selectNum = num;
    },
    chooseAll() {
      var that = this;
      this.selectAll = !this.selectAll;
      this.favList.forEach(function(item, index) {
        item.choose = that.selectAll;
      });
      this.selectNum = this.selectAll ? this.favList.length : 0;
    },
    doDelete() {
      var that = this;
      if (this.selectNum == 0) {
        common_vendor.index.showToast({
          title: "\u8BF7\u9009\u62E9",
          icon: "none"
        });
      } else {
        that.favList.forEach(function(item) {
          if (item.choose) {
            that.delList.push(item.productCode);
          }
        });
        console.log(that.delList.join(","));
        common_vendor.index.request({
          url: "http://123.60.71.74:20001//mh/user/favourite/delete?productCodeList=" + this.delList.join(","),
          method: "PUT",
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": this.token
          },
          data: {
            "productCodeList": this.delList.join(",")
          }
        }).then((res) => {
          console.log(res);
          common_vendor.index.showToast({
            title: "\u5DF2\u5220\u9664" + that.selectNum + "\u4E2A",
            icon: "none"
          });
          that.doSelect = false;
          that.controlShow = false;
          that.selectNum = 0;
          that.delList = [];
          that.getJson();
        });
      }
    }
  },
  mounted() {
    if (this.totalPage == 1) {
      this.status = "noMore";
    }
  },
  watch: {}
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_segmented_control2 + _easycom_uni_load_more2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onClickItem),
    b: common_vendor.p({
      current: $data.current,
      values: $data.items,
      ["style-type"]: $data.styleType,
      ["active-color"]: $data.activeColor
    }),
    c: common_vendor.o(($event) => $options.select()),
    d: !$data.doSelect,
    e: common_vendor.o(($event) => $options.select()),
    f: $data.doSelect,
    g: $data.current === 0
  }, $data.current === 0 ? {
    h: common_vendor.f($data.favList, (item, index, i0) => {
      return {
        a: item.choose && $data.doSelect,
        b: index,
        c: item.class1Code == "C0000001",
        d: common_vendor.o(($event) => $options.clickFav(item), index)
      };
    }),
    i: $data.doSelect ? 1 : "",
    j: common_vendor.f($data.favList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: item.flagPreSale,
        c: common_vendor.t(item.class1Name),
        d: common_vendor.t(item.price),
        e: item.flagOffSale,
        f: index,
        g: item.class1Code == "C0000001",
        h: common_vendor.o(($event) => $options.clickFav(item), index)
      };
    }),
    k: $data.doSelect ? 1 : ""
  } : {}, {
    l: $data.current === 1
  }, $data.current === 1 ? {
    m: common_vendor.f($data.favList, (item, index, i0) => {
      return {
        a: item.choose && $data.doSelect,
        b: index,
        c: item.class1Code == "C0000002",
        d: common_vendor.o(($event) => $options.clickFav(item), index)
      };
    }),
    n: $data.doSelect ? 1 : "",
    o: common_vendor.f($data.favList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: item.flagPreSale,
        c: common_vendor.t(item.class1Name),
        d: common_vendor.t(item.price),
        e: item.flagOffSale,
        f: index,
        g: item.class1Code == "C0000002",
        h: common_vendor.o(($event) => $options.clickFav(item), index)
      };
    }),
    p: $data.doSelect ? 1 : ""
  } : {}, {
    q: $data.current === 2
  }, $data.current === 2 ? {
    r: common_vendor.f($data.favList, (item, index, i0) => {
      return {
        a: item.choose && $data.doSelect,
        b: index,
        c: item.class1Code == "C0000003",
        d: common_vendor.o(($event) => $options.clickFav(item), index)
      };
    }),
    s: $data.doSelect ? 1 : "",
    t: common_vendor.f($data.favList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: item.flagPreSale,
        c: common_vendor.t(item.class1Name),
        d: common_vendor.t(item.price),
        e: item.flagOffSale,
        f: index,
        g: item.class1Code == "C0000003",
        h: common_vendor.o(($event) => $options.clickFav(item), index)
      };
    }),
    v: $data.doSelect ? 1 : ""
  } : {}, {
    w: common_vendor.o($options.loadMore),
    x: common_vendor.p({
      status: $data.status,
      contentText: $data.contentText
    }),
    y: $data.update,
    z: $data.selectAll,
    A: common_vendor.o((...args) => $options.chooseAll && $options.chooseAll(...args)),
    B: common_vendor.t($data.selectNum),
    C: common_vendor.o(($event) => $options.doDelete()),
    D: $data.controlShow
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/user/fav.vue"]]);
wx.createPage(MiniProgramPage);
