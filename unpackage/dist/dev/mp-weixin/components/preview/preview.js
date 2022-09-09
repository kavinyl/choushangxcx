"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "imgview",
  props: {
    proList: {
      type: Array,
      default: []
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      swiperList: [],
      imgIndex: 1,
      update: true,
      current: 0,
      total: 0
    };
  },
  methods: {
    close() {
      this.current = 0;
      this.$emit("close", false);
    },
    swiperChange(e) {
      this.current = e.detail.current;
      this.imgIndex = (this.current + this.index) % this.proList.length + 1;
    },
    forceUpdate() {
      this.update = false;
      this.update = true;
    },
    getList() {
      const arr2 = this.proList.slice(this.index);
      const arr1 = this.proList.slice(0, this.index);
      this.swiperList = arr2.concat(arr1);
      this.current = 0;
      console.log(this.swiperList);
    },
    getAmount() {
      this.total = 0;
      this.proList.forEach((i) => {
        this.total += i.leftAmount;
      });
    }
  },
  watch: {
    proList: function(newVal) {
      this.swiperList = newVal;
      this.forceUpdate();
      this.getAmount();
    },
    index: function(newVal) {
      this.imgIndex = newVal + 1;
      this.getList();
      this.forceUpdate();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.swiperList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.t(item.productItemName),
        c: common_vendor.t(Math.floor(item.leftAmount / $data.total * 1e4) / 100),
        d: index,
        e: common_vendor.o((...args) => $options.close && $options.close(...args), index)
      };
    }),
    b: common_vendor.t($data.imgIndex),
    c: common_vendor.t($data.swiperList.length),
    d: $data.update,
    e: common_vendor.o((...args) => $options.swiperChange && $options.swiperChange(...args)),
    f: $data.current
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/components/preview/preview.vue"]]);
wx.createComponent(Component);
