"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    const currentDate = this.getDate({
      format: true
    });
    return {
      bill: [],
      date: currentDate,
      isquery: false,
      query: [],
      quertTime: 0,
      queryTotal: 0,
      update: true
    };
  },
  onShow() {
    common_vendor.index.getStorage({
      key: "token",
      success: (res) => {
        this.token = res.data;
        console.log(this.token);
        this.getJson();
      }
    });
  },
  computed: {
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    }
  },
  onPullDownRefresh() {
    this.getJson();
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  methods: {
    getJson() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001//mh/user/currency/history/list/monthly",
        method: "GET",
        dataType: "JSON",
        header: {
          "token": this.token
        },
        success: (res) => {
          let data = JSON.parse(res.data);
          console.log(data);
          this.bill = data.data;
          this.changeDealType();
        }
      });
    },
    bindDateChange: function(e) {
      this.date = e.detail.value;
      this.billQuery();
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    billQuery() {
      console.log(this.date);
      var that = this;
      this.isquery = true;
      var arr = this.date.split("-");
      let d = new Date(this.date);
      this.queryTime = d.getTime();
      that.query.year = arr[0];
      that.query.month = arr[1];
      that.query.day = arr[2];
      that.query.list = [];
      that.queryTotal = 0;
      this.getDayList();
      this.forceupdate();
    },
    forceupdate() {
      this.update = false;
      this.update = true;
    },
    changeDealType() {
      var that = this;
      if (!this.isquery) {
        that.bill.forEach(function(item) {
          item.userCurrencyHistoryVoList.forEach(function(items) {
            switch (items.dealType) {
              case "10":
                items.dealTypeName = "\u4EA4\u6613";
                break;
              case "20":
                items.dealTypeName = "\u5145\u503C";
                break;
              case "30":
                items.dealTypeName = "\u63D0\u73B0";
                break;
            }
          });
        });
      } else if (this.isquery) {
        that.bill.forEach(function(item) {
          switch (item.dealType) {
            case "10":
              item.dealTypeName = "\u4EA4\u6613";
              break;
            case "20":
              item.dealTypeName = "\u5145\u503C";
              break;
            case "30":
              item.dealTypeName = "\u63D0\u73B0";
              break;
          }
        });
      }
    },
    getDayList() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/currency/history/list?dealTime=" + this.date,
        method: "GET",
        dataType: "JSON",
        header: {
          "token": this.token
        },
        success: (res) => {
          let data = JSON.parse(res.data);
          console.log(data);
          this.bill = data.data;
          this.changeDealType();
        }
      });
    }
  },
  watch: {
    query: function(newVal, oldVal) {
      var that = this;
      that.queryTotal = 0;
      newVal.list.forEach(function(item) {
        if (item.type == "\u4EA4\u6613" || item.type == "\u63D0\u73B0") {
          console.log(Number(item.amount));
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.bill, (item, index, i0) => {
      return {
        a: common_vendor.t(item.month),
        b: common_vendor.t(item.totalExpend),
        c: common_vendor.f(item.userCurrencyHistoryVoList, (items, idx, i1) => {
          return {
            a: common_vendor.t(items.dealTime),
            b: common_vendor.t(items.dealTypeName),
            c: common_vendor.t(items.amount),
            d: idx
          };
        }),
        d: index
      };
    }),
    b: $data.date,
    c: $options.startDate,
    d: $options.endDate,
    e: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args)),
    f: !$data.isquery,
    g: common_vendor.t($data.query.year),
    h: common_vendor.t($data.query.month),
    i: common_vendor.t($data.query.day),
    j: $data.date,
    k: $options.startDate,
    l: $options.endDate,
    m: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args)),
    n: common_vendor.t($data.queryTotal),
    o: common_vendor.f($data.bill, (item, index, i0) => {
      return {
        a: common_vendor.t(item.dealTime),
        b: common_vendor.t(item.dealTypeName),
        c: common_vendor.t(item.amount),
        d: index
      };
    }),
    p: $data.update,
    q: $data.isquery
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/user/bill.vue"]]);
wx.createPage(MiniProgramPage);
