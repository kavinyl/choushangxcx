"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      newAddress: {},
      isAdd: true,
      addName: "",
      addPhone: "",
      addCity: "",
      addDetail: "",
      addDefault: false,
      province: "",
      city: "",
      area: "",
      alert: "",
      textpl: true,
      token: "",
      id: ""
    };
  },
  onLoad() {
    common_vendor.index.getStorage({
      key: "editAdd",
      success: (res) => {
        this.addName = res.data.name;
        this.addPhone = res.data.phone;
        this.addDetail = res.data.detail;
        this.addDefault = res.data.default;
        this.id = res.data.id;
        this.isAdd = false;
      }
    });
    common_vendor.index.getStorage({
      key: "token",
      success: (res) => {
        this.token = res.data;
      }
    });
  },
  methods: {
    onchange(e) {
      const value = e.detail.value;
      this.province = value[0].text;
      this.city = value[1].text;
      this.area = value[2].text;
    },
    onnodeclick(node) {
    },
    setDefault() {
      this.addDefault = !this.addDefault;
    },
    formSubmit(e) {
      var that = this;
      var data = e.detail.value;
      if (this.check()) {
        if (that.isAdd) {
          common_vendor.index.request({
            url: "http://123.60.71.74:20001/mh/user/address/add",
            method: "POST",
            header: {
              "token": that.token,
              "Content-Type": "application/json	"
            },
            data: {
              customerName: data.name,
              phone: data.phone,
              province: that.province,
              city: that.city,
              area: that.area,
              detail: data.detail,
              flagDefault: Number(that.addDefault)
            },
            success: (res) => {
              console.log(res);
            }
          });
        } else {
          common_vendor.index.request({
            url: "http://123.60.71.74:20001/mh/user/address/update",
            method: "PUT",
            header: {
              "token": that.token,
              "Content-Type": "application/json	"
            },
            data: {
              id: that.id,
              customerName: data.name,
              phone: data.phone,
              province: that.province,
              city: that.city,
              area: that.area,
              detail: data.detail,
              flagDefault: Number(that.addDefault)
            },
            success: (res) => {
              console.log(res);
            }
          });
        }
        that.back();
      }
      common_vendor.index.removeStorage({
        key: "editAdd"
      });
    },
    back() {
      setTimeout(function() {
        common_vendor.index.navigateBack({
          url: "address",
          success: (res) => {
            let page = getCurrentPages().pop();
            if (page) {
              page.onLoad(page.forceupdate);
            }
          }
        });
      }, 1e3);
    },
    check() {
      let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!this.addName) {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u6536\u8D27\u4EBA\u59D3\u540D",
          icon: "none"
        });
        return false;
      } else if (!this.addPhone) {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u8054\u7CFB\u7535\u8BDD",
          icon: "none"
        });
        return false;
      } else if (!reg.test(this.addPhone)) {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7",
          icon: "none"
        });
        return false;
      } else if (!this.addCity) {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u6240\u5728\u5730\u533A",
          icon: "none"
        });
        return false;
      } else if (!this.addDetail) {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u8BE6\u7EC6\u5730\u5740",
          icon: "none"
        });
        return false;
      } else {
        return true;
      }
    },
    delAddress() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/address/delete?userAddressIdList=" + this.id,
        method: "PUT",
        header: {
          "token": this.token
        },
        success: (res) => {
          console.log(res);
          this.back();
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  _easycom_uni_data_picker2();
}
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
if (!Math) {
  _easycom_uni_data_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.addName,
    b: common_vendor.o(($event) => $data.addName = $event.detail.value),
    c: $data.addPhone,
    d: common_vendor.o(($event) => $data.addPhone = $event.detail.value),
    e: common_vendor.o($options.onchange),
    f: common_vendor.o($options.onnodeclick),
    g: common_vendor.o(($event) => $data.addCity = $event),
    h: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9\u5730\u5740",
      ["popup-title"]: "\u8BF7\u9009\u62E9\u57CE\u5E02",
      collection: "opendb-city-china",
      field: "code as value, name as text",
      orderby: "value asc",
      ["step-searh"]: true,
      ["self-field"]: "code",
      ["parent-field"]: "parent_code",
      modelValue: $data.addCity
    }),
    i: $data.addDetail,
    j: common_vendor.o(($event) => $data.addDetail = $event.detail.value),
    k: $data.addDefault
  }, $data.addDefault ? {} : {}, {
    l: common_vendor.o((...args) => $options.setDefault && $options.setDefault(...args)),
    m: $data.isAdd
  }, $data.isAdd ? {} : {}, {
    n: !$data.isAdd
  }, !$data.isAdd ? {} : {}, {
    o: !$data.isAdd
  }, !$data.isAdd ? {
    p: common_vendor.o((...args) => $options.delAddress && $options.delAddress(...args))
  } : {}, {
    q: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/user/newaddress.vue"]]);
wx.createPage(MiniProgramPage);
