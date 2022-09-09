"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "search-area",
  props: {},
  options: {
    styleIsolation: "shared"
  },
  data() {
    return {
      historyDatas: [],
      hotDatas: [],
      autoShow: false,
      autoSearch: [],
      searchValue: "",
      historyNum: 1,
      autoDatas: []
    };
  },
  onShow() {
    this.getClass();
  },
  methods: {
    getClass() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/product/class/list",
        method: "GET",
        success: (res) => {
          this.autoDatas = res.data.data;
          console.log(this.autoDatas);
          this.test();
        }
      });
    },
    checkInput() {
      var that = this;
      let str = that.searchValue.replace(/\s+/g, "");
      that.searchValue = str;
      if (str == "") {
        return true;
      } else {
        return false;
      }
    },
    search(res) {
      if (this.checkInput()) {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9!",
          icon: "none"
        });
      } else {
        this.setHistory();
        this.setcache();
        common_vendor.index.redirectTo({
          url: "searchDetail"
        });
      }
    },
    searchHistory(val) {
      common_vendor.index.redirectTo({
        url: "searchDetail"
      });
    },
    checkRepeat(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let n = i + 1; n < arr.length; n++) {
          if (arr[i].keyword === arr[n].keyword) {
            arr.splice(n, 1);
            n--;
          }
        }
      }
    },
    test() {
      this.autoDatas.forEach((c1) => {
        c1.productClass2VoList.forEach((c2) => {
          c2.productClass3VoList = [
            {
              class3Name: "1",
              productCode: "283795428807319552"
            },
            {
              class3Name: "2"
            },
            {
              class3Name: "3"
            },
            {
              class3Name: "aaa"
            }
          ];
        });
      });
    },
    autoComplete(res) {
      let arr = [];
      this.autoDatas.forEach((c1) => {
        c1.productClass2VoList.forEach((c2) => {
          c2.productClass3VoList.forEach((c3) => {
            if (c3.class3Name.indexOf(res) != -1) {
              arr.push(c3);
            }
          });
        });
      });
      this.autoSearch = arr;
      console.log("as", this.autoSearch);
    },
    focus(res) {
    },
    blur(res) {
      this.searchValue = res.value;
      this.autoShow = false;
    },
    input(res) {
      var that = this;
      if (res != "") {
        that.searchValue = res;
        that.autoShow = true;
        that.autoComplete(res);
      }
    },
    cancel(res) {
      this.searchValue = res.value;
      this.autoShow = false;
    },
    setcache() {
      var that = this;
      common_vendor.index.setStorage({
        key: "historyDatas",
        data: that.historyDatas,
        success: function() {
        }
      });
      common_vendor.index.setStorage({
        key: "historyNum",
        data: that.historyNum,
        success: function() {
        }
      });
    },
    gopage(i) {
      this.searchValue = i.class3Name;
      this.setHistory();
      common_vendor.index.setStorageSync("productCode", i.productCode);
      common_vendor.index.navigateTo({
        url: "/sub-play/pages/play"
      });
    },
    setHistory() {
      this.historyNum = common_vendor.index.getStorageSync("historyNum");
      this.historyNum++;
      var obj = new Object({
        id: Date.now(),
        keyword: this.searchValue
      });
      if (common_vendor.index.getStorageSync("historyDatas")) {
        this.historyDatas = common_vendor.index.getStorageSync("historyDatas");
      } else {
        common_vendor.index.setStorageSync("historyDatas");
      }
      this.historyDatas.unshift(obj);
      this.checkRepeat(this.historyDatas);
      console.log(this.historyDatas);
      if (this.historyDatas.length > 10) {
        this.historyDatas.pop();
      }
    }
  },
  mounted() {
  },
  watch: {
    autoDatas: function(newVal, oldVal) {
    },
    historyNum: function(newVal, oldVal) {
      this.$emit("history", this.historyDatas);
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  _easycom_uni_search_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.search),
    b: common_vendor.o($options.blur),
    c: common_vendor.o($options.focus),
    d: common_vendor.o($options.cancel),
    e: common_vendor.o($options.input),
    f: common_vendor.o(($event) => $data.searchValue = $event),
    g: common_vendor.p({
      focus: true,
      placeholder: "\u641C\u7D22\u5173\u952E\u8BCD",
      cancelButton: "none",
      modelValue: $data.searchValue
    }),
    h: common_vendor.o((...args) => $options.search && $options.search(...args)),
    i: common_vendor.f($data.autoSearch, (item, index, i0) => {
      return {
        a: common_vendor.t(item.class3Name),
        b: index,
        c: common_vendor.o(($event) => $options.gopage(item), index)
      };
    }),
    j: $data.autoShow && $data.autoDatas.length > 0
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/components/search-area/search-area.vue"]]);
wx.createComponent(Component);
