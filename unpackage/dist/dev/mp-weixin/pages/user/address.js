"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      address: [],
      update: true,
      newID: 0
    };
  },
  onLoad() {
    common_vendor.index.getStorage({
      key: "token",
      success: (res) => {
        this.token = res.data;
        this.getJson();
      }
    });
  },
  methods: {
    forceupdate() {
      this.update = false;
      this.update = true;
    },
    getJson() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001//mh/user/address/list",
        method: "GET",
        dataType: "JSON",
        header: {
          "token": this.token
        },
        success: (res) => {
          let data = JSON.parse(res.data);
          console.log(data);
          this.address = data.data;
        }
      });
    },
    newAddress() {
      common_vendor.index.removeStorage({
        key: "editAdd"
      });
      common_vendor.index.navigateTo({
        url: "newaddress"
      });
    },
    editAddress(item) {
      let add = new Object();
      add.name = item.customerName;
      add.phone = item.phone;
      add.city = item.city;
      add.detail = item.detail;
      add.location = item.location;
      add.default = item.flagDefault;
      add.id = item.id;
      common_vendor.index.setStorage({
        key: "editAdd",
        data: add
      });
      common_vendor.index.navigateTo({
        url: "newaddress"
      });
    }
  },
  watch: {
    address: function(newVal, oldVal) {
      this.forceupdate();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.address, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.customerName),
        b: common_vendor.t(item.phone),
        c: item.flagDefault
      }, item.flagDefault ? {} : {}, {
        d: common_vendor.t(item.province),
        e: common_vendor.t(item.city),
        f: common_vendor.t(item.area),
        g: common_vendor.t(item.detail),
        h: common_vendor.o(($event) => $options.editAddress(item)),
        i: index
      });
    }),
    b: $data.update,
    c: common_vendor.o((...args) => $options.newAddress && $options.newAddress(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/user/address.vue"]]);
wx.createPage(MiniProgramPage);
