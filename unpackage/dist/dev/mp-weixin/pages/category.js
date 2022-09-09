"use strict";
var common_vendor = require("../common/vendor.js");
const cabinet = () => "../components/cabinet/cabinet.js";
const _sfc_main = {
  components: {
    cabinet
  },
  options: {
    styleIsolation: "shared"
  },
  data() {
    return {
      page: 0,
      isActive: [true, false, false],
      testdata: {},
      testlist: [],
      token: "",
      total: 1
    };
  },
  onLoad() {
  },
  onPullDownRefresh() {
    this.getJson();
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  methods: {
    shipToggle(n) {
      this.isActive = [false, false, false];
      this.isActive[n] = true;
      this.page = n;
    },
    getJson() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/product/list",
        method: "GET",
        dataType: "JSON",
        header: {
          "token": this.token
        },
        success: (res) => {
          let data = JSON.parse(res.data);
          console.log(data);
          this.testdata = data.data;
        }
      });
    },
    update() {
      this.getJson();
      this.$refs.cabinet.forceupdate;
    }
  },
  onShow() {
    common_vendor.index.getStorage({
      key: "token",
      success: (res) => {
        this.token = res.data;
        this.getJson();
      },
      fail: (res) => {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u767B\u5F55",
          icon: "none"
        });
        setTimeout(function() {
          common_vendor.index.switchTab({
            url: "/pages/user"
          });
        }, 1e3);
      }
    });
    this.$refs.cabinet.forceupdate;
  },
  mounted() {
  },
  watch: {},
  onPullDownRefresh() {
    this.getJson();
    this.$refs.cabinet.forceupdate;
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1500);
  }
};
if (!Array) {
  const _easycom_cabinet2 = common_vendor.resolveComponent("cabinet");
  _easycom_cabinet2();
}
const _easycom_cabinet = () => "../components/cabinet/cabinet.js";
if (!Math) {
  _easycom_cabinet();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.isActive[0] ? 1 : "",
    b: common_vendor.o(($event) => $options.shipToggle(0)),
    c: $data.isActive[1] ? 1 : "",
    d: common_vendor.o(($event) => $options.shipToggle(1)),
    e: $data.isActive[2] ? 1 : "",
    f: common_vendor.o(($event) => $options.shipToggle(2)),
    g: common_vendor.sr("cabinet", "56327663-0"),
    h: common_vendor.o($options.update),
    i: common_vendor.p({
      ["page-index"]: $data.page,
      ["get-data"]: $data.testdata,
      fake: $data.testlist,
      ["total-page"]: $data.total,
      token: $data.token
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/category.vue"]]);
wx.createPage(MiniProgramPage);
