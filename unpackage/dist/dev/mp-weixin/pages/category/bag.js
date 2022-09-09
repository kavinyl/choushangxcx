"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      getData: [],
      bagList: [],
      curList: [],
      classAll: [],
      classAllBtn: false,
      hasConditions: false,
      timeImg: [
        "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/default.png",
        "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/up.png",
        "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/down.png"
      ],
      doSelect: false,
      small: false,
      timeIndex: 0,
      update: true,
      controlShow: false,
      selectAll: false,
      changeArr: [],
      token: "",
      totalPage: 1
    };
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
  },
  methods: {
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
          this.getData = data.data;
        }
      });
    },
    showAll() {
      this.$refs.allPros.open();
    },
    closeAll() {
      this.$refs.allPros.close();
    },
    classChoose(item, index) {
      item.choose = !item.choose;
    },
    clickAll() {
      common_vendor.index.redirectTo({
        url: "/pages/category/bag"
      });
    },
    submit() {
      var arr = [];
      var that = this;
      var num = 0;
      this.classAll.forEach(function(c1, index) {
        c1.list.forEach(function(c2, idx) {
          c2.list.forEach(function(c3, i) {
            num++;
            if (c3.choose) {
              arr.push(c3.class3Code);
            }
          });
        });
      });
      console.log(arr);
      that.hasConditions = arr.length == num ? false : true;
      if (arr.length == 0) {
        common_vendor.index.showToast({
          title: "\u8BF7\u9009\u62E9\u4E09\u7EA7\u5206\u7C7B",
          icon: "none"
        });
      } else {
        console.log("\u6761\u4EF6", arr);
        console.log(that.getData);
        that.curList = [];
        that.bagList.forEach(function(item, index) {
          arr.forEach(function(c3) {
            if (item.class3Code == c3) {
              that.curList.push(item);
            }
          });
        });
        that.closeAll();
        that.forceupdate();
      }
    },
    timeSwitch() {
      var that = this;
      if (that.timeIndex == 2) {
        that.timeIndex = 0;
        that.small = false;
      } else {
        that.timeIndex++;
        that.small = true;
      }
      switch (that.timeIndex) {
        case 1:
          that.curList.sort(function(a, b) {
            return a.time - b.time;
          });
          break;
        case 2:
          that.curList.sort(function(a, b) {
            return b.time - a.time;
          });
          break;
        case 0:
          that.curList.sort(function(a, b) {
            return a.id - b.id;
          });
          break;
      }
    },
    select() {
      var that = this;
      that.doSelect = !that.doSelect;
      that.controlShow = !that.controlShow;
    },
    selectItem(item) {
      if (this.doSelect && !item.isdeal) {
        item.choose = !item.choose;
      }
    },
    loadClass() {
      var that = this;
      var arr = [];
      this.bagList.forEach(function(item) {
        if (item.productItemPosition == 20) {
          arr.push(item);
        }
      });
      var arr1 = [];
      for (let i = 0; i < arr.length; i++) {
        var obj1 = new Object();
        obj1.name = arr[i].class1Name;
        obj1.class1Code = arr[i].class1Code;
        obj1.choose = false;
        obj1.class = "c1";
        obj1.list = [];
        arr1.push(obj1);
        that.checkRepeat(arr1);
        for (let j = 0; j < arr.length; j++) {
          var obj2 = new Object();
          obj2.name = arr[j].class2Name;
          obj2.class2Code = arr[j].class2Code;
          obj2.choose = false;
          obj2.class = "c2";
          obj2.list = [];
          if (arr[i].class1Code == arr[j].class1Code) {
            obj1.list.push(obj2);
          }
          that.checkRepeat(obj1.list);
          for (let k = 0; k < arr.length; k++) {
            var obj3 = new Object();
            obj3.name = arr[k].class3Name;
            obj3.class3Code = arr[k].class3Code;
            obj3.class = "c3";
            obj3.choose = false;
            if (arr[j].class2Code == arr[k].class2Code) {
              obj2.list.push(obj3);
            }
            that.checkRepeat(obj2.list);
          }
        }
      }
      console.log(arr1);
      that.classAll = arr1;
    },
    checkRepeat(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let n = i + 1; n < arr.length; n++) {
          if (arr[i].name === arr[n].name) {
            arr.splice(n, 1);
            n--;
          }
        }
      }
    },
    forceupdate() {
      this.update = false;
      this.update = true;
    },
    chooseAll() {
      var that = this;
      that.selectAll = !that.selectAll;
      for (let i = 0; i < that.bagList.length; i++) {
        that.bagList[i].choose = that.bagList[i].isdeal ? false : that.selectAll;
      }
    },
    verify() {
      var that = this;
      let arr = [];
      for (let i = 0; i < that.bagList.length; i++) {
        if (that.bagList[i].choose) {
          arr.push(that.bagList[i]);
        }
      }
      if (arr.length > 0) {
        return true;
      } else {
        common_vendor.index.showToast({
          title: "\u8BF7\u9009\u62E9",
          icon: "none"
        });
        return false;
      }
    },
    goCabinet() {
      var that = this;
      if (this.verify()) {
        for (let i = 0; i < that.bagList.length; i++) {
          if (that.bagList[i].choose) {
            that.changeArr.push(that.bagList[i].userProductCode);
          }
        }
        console.log(that.changeArr);
        common_vendor.index.request({
          url: "http://123.60.71.74:20001/mh/user/product/case/in?userProductCodeList=" + this.changeArr.join(","),
          method: "PUT",
          header: {
            "token": this.token,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: (res) => {
            console.log(res);
            this.$nextTick(function() {
              that.dataUpdate();
            });
          }
        });
        this.complete();
      }
      console.log("\u653E\u8FDB\u8D4F\u67DC", this.changeArr);
      this.changeArr = [];
    },
    goDeal() {
      var that = this;
      if (this.verify()) {
        for (let i = 0; i < that.curList.length; i++) {
          if (that.curList[i].choose) {
            that.curList[i].isdeal = true;
            that.curList[i].choose = false;
            that.changeArr.push(that.curList[i]);
          }
        }
        this.complete();
        console.log("\u53D1\u5E03\u4EA4\u6613", this.changeArr);
        common_vendor.index.navigateTo({
          url: "/pages/category/publish"
        });
      }
      this.changeArr = [];
    },
    complete() {
      this.doSelect = false;
      this.controlShow = false;
      this.selectAll = false;
    },
    dataUpdate() {
      this.getJson();
      this.forceupdate();
    }
  },
  mounted() {
    this.forceupdate();
  },
  watch: {
    getData: function(newVal, oldVal) {
      console.log("\u5217\u8868\u66F4\u65B0", newVal);
      this.bagList = [];
      this.bagList = this.bagList.concat(newVal);
      this.curList = [];
      this.curList = this.curList.concat(newVal);
      this.loadClass();
      this.curList.sort(function(a, b) {
        return a.id - b.id;
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  _easycom_uni_drawer2();
}
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
if (!Math) {
  _easycom_uni_drawer();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: !$data.hasConditions,
    b: $data.hasConditions,
    c: common_vendor.o((...args) => $options.showAll && $options.showAll(...args)),
    d: $data.small ? 1 : "",
    e: $data.timeImg[$data.timeIndex],
    f: common_vendor.o((...args) => $options.timeSwitch && $options.timeSwitch(...args)),
    g: !$data.doSelect,
    h: !$data.doSelect,
    i: !$data.doSelect,
    j: $data.doSelect,
    k: common_vendor.o((...args) => $options.select && $options.select(...args)),
    l: common_vendor.f($data.curList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.t(item.itemTypeName),
        c: common_vendor.t(item.productItemName),
        d: $data.doSelect && item.choose && !item.isdeal,
        e: item.isdeal,
        f: index,
        g: common_vendor.o(($event) => $options.selectItem(item), index),
        h: item.productItemPosition == "20"
      };
    }),
    m: $data.update,
    n: common_vendor.o((...args) => $options.clickAll && $options.clickAll(...args)),
    o: common_vendor.f($data.classAll, (c1, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(c1.name),
        b: !c1.choose
      }, !c1.choose ? {} : {}, {
        c: c1.choose
      }, c1.choose ? {} : {}, {
        d: c1.choose ? 1 : "",
        e: common_vendor.o(($event) => $options.classChoose(c1, index)),
        f: common_vendor.f(c1.list, (c2, idx, i1) => {
          return common_vendor.e({
            a: common_vendor.t(c2.name),
            b: !c2.choose
          }, !c2.choose ? {} : {}, {
            c: c2.choose
          }, c2.choose ? {} : {}, {
            d: c2.choose ? 1 : "",
            e: common_vendor.o(($event) => $options.classChoose(c2, idx)),
            f: common_vendor.f(c2.list, (c3, i, i2) => {
              return {
                a: common_vendor.t(c3.name),
                b: c3.choose ? 1 : "",
                c: common_vendor.o(($event) => $options.classChoose(c3, i)),
                d: i
              };
            }),
            g: idx,
            h: c2.choose ? "1000rpx" : "80rpx"
          });
        }),
        g: index,
        h: c1.choose ? "1000rpx" : "80rpx"
      });
    }),
    p: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    q: common_vendor.sr("allPros", "d51de448-0"),
    r: common_vendor.o(($event) => $options.closeAll()),
    s: common_vendor.p({
      mode: "left",
      ["mask-click"]: true
    }),
    t: $data.selectAll,
    v: common_vendor.o((...args) => $options.chooseAll && $options.chooseAll(...args)),
    w: common_vendor.o(($event) => $options.goDeal()),
    x: common_vendor.o(($event) => $options.goCabinet()),
    y: $data.controlShow
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/pages/category/bag.vue"]]);
wx.createPage(MiniProgramPage);
