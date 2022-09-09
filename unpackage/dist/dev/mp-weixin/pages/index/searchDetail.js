"use strict";
var common_vendor = require("../../common/vendor.js");
const proList = () => "../../components/proList/proList.js";
const searchArea = () => "../../components/search-area/search-area.js";
const _sfc_main = {
  components: {
    proList,
    searchArea
  },
  data() {
    return {
      searchVal: "",
      snapValue: "",
      autoDatas: [],
      product: []
    };
  },
  onLoad() {
    this.getJson();
  },
  methods: {
    getJson() {
      common_vendor.index.request({
        url: "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/fake.json",
        method: "get",
        dataType: "JSON",
        success: (res) => {
          let data = JSON.parse(res.data);
          this.autoDatas = data.autoDatas;
          this.product = data.productList;
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
  const _easycom_proList2 = common_vendor.resolveComponent("proList");
  (_component_searchArea + _easycom_proList2)();
}
const _easycom_proList = () => "../../components/proList/proList.js";
if (!Math) {
  _easycom_proList();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("searcharea", "fd71894a-0"),
    b: common_vendor.p({
      ["auto-datas"]: $data.autoDatas
    }),
    c: common_vendor.p({
      ["product-list"]: $data.product
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/index/searchDetail.vue"]]);
wx.createPage(MiniProgramPage);
