"use strict";
var common_vendor = require("../../common/vendor.js");
const searchArea = () => "../../components/search-area/search-area.js";
const _sfc_main = {
  components: {
    searchArea
  },
  data() {
    return {
      historyDatas: [],
      historyNum: 0,
      update: true
    };
  },
  onShow() {
    this.historyDatas = common_vendor.index.getStorageSync("historyDatas");
  },
  methods: {
    changeHistory(res) {
    },
    searchHistory(key) {
      common_vendor.index.navigateTo({
        url: "searchDetail"
      });
    },
    getHistory(msg) {
      this.historyDatas = msg;
      this.update = false;
      this.update = true;
    },
    getJson() {
      common_vendor.index.request({
        url: "/static/fake.json",
        method: "get",
        success: (res) => {
        }
      });
    }
  },
  mounted() {
  },
  watch: {}
};
if (!Array) {
  const _component_searchArea = common_vendor.resolveComponent("searchArea");
  _component_searchArea();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("searcharea", "d4eb462c-0"),
    b: common_vendor.o($options.getHistory),
    c: common_vendor.f($data.historyDatas, (item, index, i0) => {
      return {
        a: common_vendor.t(item.keyword),
        b: index,
        c: common_vendor.o(($event) => $options.searchHistory(item.keyword), index)
      };
    }),
    d: $data.update && $data.historyDatas.length
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/index/search.vue"]]);
wx.createPage(MiniProgramPage);
