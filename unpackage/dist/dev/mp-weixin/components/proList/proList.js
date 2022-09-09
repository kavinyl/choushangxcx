"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "proList",
  props: {
    productList: {
      type: Array,
      default: []
    },
    totalPage: {
      type: Number,
      default: 1
    }
  },
  options: {
    styleIsolation: "shared"
  },
  data() {
    return {
      items: ["\u5168\u90E8", "\u4E00\u756A\u8D4F", "\u624B\u529E", "\u76F2\u76D2"],
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
      status: "more",
      contentText: {
        contentdown: "\u70B9\u51FB\u5C55\u793A\u66F4\u591A",
        contentrefresh: "\u52A0\u8F7D\u4E2D",
        contentnomore: "\u6CA1\u6709\u66F4\u591A\u4E86"
      },
      pageNo: 1
    };
  },
  onLoad() {
  },
  methods: {
    toPage(item) {
      common_vendor.index.navigateTo({
        url: "/sub-play/pages/play"
      });
      common_vendor.index.setStorage({
        key: "productCode",
        data: item.productCode
      });
    },
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    forceupdate() {
      this.update = false;
      this.update = true;
    },
    loadMore(e) {
      var that = this;
      if (this.pageNo < this.totalPage) {
        that.status = "loading";
        that.pageNo++;
        common_vendor.index.request({
          url: "http://123.60.71.74:20001//mh/product/page",
          method: "GET",
          dataType: "JSON",
          data: {
            no: that.pageNo,
            size: 10
          },
          success: (res) => {
            let data = JSON.parse(res.data);
            data.data.list.forEach(function(item) {
              that.productList.push(item);
            });
            that.status = "more";
          }
        });
      } else {
        that.status = "noMore";
      }
    }
  },
  mounted() {
    if (this.totalPage == 1) {
      this.status = "noMore";
    }
  },
  watch: {
    productList: function(newVal, oldVal) {
      this.forceupdate();
    }
  }
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
    c: $data.current === 0
  }, $data.current === 0 ? {
    d: common_vendor.f($props.productList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: item.flagPreSale,
        c: common_vendor.t(item.productName),
        d: common_vendor.t(item.info),
        e: common_vendor.t(item.price),
        f: index,
        g: common_vendor.o(($event) => $options.toPage(item), index)
      };
    })
  } : {}, {
    e: $data.current === 1
  }, $data.current === 1 ? {
    f: common_vendor.f($props.productList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: item.flagPreSale,
        c: common_vendor.t(item.productName),
        d: common_vendor.t(item.info),
        e: common_vendor.t(item.price),
        f: index,
        g: common_vendor.o(($event) => $options.toPage(item), index),
        h: item.class1Code == "C0000001"
      };
    })
  } : {}, {
    g: $data.current === 2
  }, $data.current === 2 ? {
    h: common_vendor.f($props.productList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: item.flagPreSale,
        c: common_vendor.t(item.productName),
        d: common_vendor.t(item.info),
        e: common_vendor.t(item.price),
        f: index,
        g: common_vendor.o(($event) => $options.toPage(item), index),
        h: item.class1Code == "C0000002"
      };
    })
  } : {}, {
    i: $data.current === 3
  }, $data.current === 3 ? {
    j: common_vendor.f($props.productList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: item.flagPreSale,
        c: common_vendor.t(item.productName),
        d: common_vendor.t(item.info),
        e: common_vendor.t(item.price),
        f: index,
        g: common_vendor.o(($event) => $options.toPage(item), index),
        h: item.class1Code == "C0000003"
      };
    })
  } : {}, {
    k: $data.update,
    l: common_vendor.o($options.loadMore),
    m: common_vendor.p({
      status: $data.status,
      ["content-text"]: $data.contentText
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/components/proList/proList.vue"]]);
wx.createComponent(Component);
