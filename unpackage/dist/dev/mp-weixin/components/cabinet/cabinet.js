"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "cabinet",
  props: {
    pageIndex: {
      type: Number,
      default: 0
    },
    getData: {
      type: Object,
      default: {}
    },
    fake: {
      type: Array,
      default: []
    },
    totalPage: {
      type: Number,
      default: 1
    },
    token: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      items: ["\u5168\u90E8", "\u73B0\u8D27", "\u9884\u552E", "\u5355\u54C1"],
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
      activeColor: "#F9B002",
      styleType: "text",
      cabinetList: [],
      timeIndex: 0,
      timeImg: [
        "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/default.png",
        "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/up.png",
        "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/down.png"
      ],
      curTime: "",
      small: false,
      update: true,
      showBag: false,
      doSelect: false,
      controlShow: false,
      selectAll: false,
      changeArr: [],
      recoverShow: false,
      recoverPoint: 0,
      products: 0,
      address: {},
      addressList: [],
      applyShip: [],
      classAll: [],
      classAllBtn: false,
      hasConditions: false,
      status: "more",
      pageNo: 1,
      contentText: {
        contentdown: "\u70B9\u51FB\u5C55\u793A\u66F4\u591A",
        contentrefresh: "\u52A0\u8F7D\u4E2D",
        contentnomore: "\u6CA1\u6709\u66F4\u591A\u4E86"
      },
      curList: [],
      msgTitle: "\u63D0\u793A",
      msgContent: "\u7533\u8BF7\u53D1\u8D27\u540E\u4E0D\u53EF\u64A4\u9500\uFF01",
      hasPre: false
    };
  },
  onShow() {
    this.doSelect = false;
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
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
      this.closeAll();
      this.$emit("update");
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
        that.curList = [];
        that.cabinetList.forEach(function(item, index) {
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
      this.curList.forEach((item) => {
        let t = new Date(item.takeTime.replace(/\-/g, "/"));
        item.takeDate = t.getTime();
      });
      switch (that.timeIndex) {
        case 1:
          that.curList.sort(function(a, b) {
            return a.takeDate - b.takeDate;
          });
          break;
        case 2:
          that.curList.sort(function(a, b) {
            return b.takeDate - a.takeDate;
          });
          break;
        case 0:
          that.curList.sort(function(a, b) {
            return a.itemType - b.itemType;
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
      if (this.doSelect) {
        item.choose = !item.choose;
      }
    },
    goBag() {
      common_vendor.index.navigateTo({
        url: "/pages/category/bag"
      });
    },
    forceupdate() {
      this.update = false;
      this.update = true;
    },
    chooseAll() {
      var that = this;
      that.selectAll = !that.selectAll;
      for (let i = 0; i < that.curList.length; i++) {
        if (that.curList[i].deliveryStatus == 0) {
          that.curList[i].choose = that.selectAll;
        }
      }
    },
    verify() {
      var that = this;
      let arr = [];
      for (let i = 0; i < that.cabinetList.length; i++) {
        if (that.cabinetList[i].choose) {
          arr.push(that.cabinetList[i]);
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
    goPackage() {
      var that = this;
      if (this.verify()) {
        for (let i = 0; i < that.cabinetList.length; i++) {
          if (that.cabinetList[i].choose) {
            that.changeArr.push(that.cabinetList[i].userProductCode);
          }
        }
        console.log(that.changeArr);
        common_vendor.index.request({
          url: "http://123.60.71.74:20001/mh/user/product/bag/in?userProductCodeList=" + this.changeArr.join(","),
          method: "PUT",
          header: {
            "token": this.token,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: (res) => {
            console.log(res);
            this.$nextTick(function() {
              that.$emit("update");
            });
          }
        });
        this.complete();
      }
      console.log("\u653E\u8FDB\u80CC\u5305", this.changeArr);
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
    goRecover() {
      var that = this;
      that.changeArr = [];
      if (this.verify()) {
        that.$refs.recover.open("bottom");
        var total = 0;
        for (let i = 0; i < that.curList.length; i++) {
          if (that.curList[i].choose) {
            that.curList[i].readyRecover = 1;
            total += Number(that.curList[i].recoverPrice);
            that.changeArr.push(that.curList[i].userProductCode);
          }
        }
        that.recoverPoint = total;
        this.complete();
      }
    },
    closeRecover() {
      for (let i = 0; i < this.curList.length; i++) {
        this.curList[i].flagRecovery = 0;
      }
    },
    confirmRecover() {
      var that = this;
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/product/recover?userProductCodeList=" + this.changeArr.join(","),
        method: "PUT",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token": this.token
        },
        success: (res) => {
          console.log(res);
        }
      });
      this.$refs.recover.close();
      this.$emit("update");
      this.$nextTick(function() {
        that.$emit("update");
      });
    },
    goShip() {
      var that = this;
      this.getAddress();
      if (this.verify()) {
        that.$refs.ship.open("bottom");
        var total = 0;
        for (let i = 0; i < that.cabinetList.length; i++) {
          if (that.cabinetList[i].choose) {
            that.cabinetList[i].deliveryStatus = 11;
            total++;
          }
        }
        that.products = total;
        this.complete();
      }
    },
    closeShip() {
      var that = this;
      for (let i = 0; i < that.cabinetList.length; i++) {
        if (that.cabinetList[i].deliveryStatus == 11) {
          that.cabinetList[i].deliveryStatus = 0;
        }
      }
    },
    checkShip() {
      var arr = [];
      this.cabinetList.forEach((item) => {
        if (item.choose) {
          arr.push(item);
        }
      });
      arr.forEach((item) => {
        while (item.flagPreSale) {
          this.hasPre = true;
          this.msgContent = "\u9884\u552E\u5546\u54C1\u4E0D\u53EF\u7533\u8BF7\u53D1\u8D27\uFF01";
          break;
        }
      });
      this.$refs.alert.open("center");
    },
    confirmShip() {
      var that = this;
      var arr = [];
      for (let i = 0; i < that.cabinetList.length; i++) {
        if (that.cabinetList[i].choose) {
          that.cabinetList[i].deliveryStatus = 1;
          arr.push(that.cabinetList[i].userProductCode);
          that.cabinetList[i].choose = false;
        }
      }
      that.applyShip = arr;
      console.log("\u786E\u8BA4\u7533\u8BF7", that.applyShip);
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/product/delivery/apply?userProductCodeList=" + this.applyShip.join(","),
        method: "PUT",
        header: {
          "token": this.token,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: (res) => {
          console.log(res);
          this.$nextTick(function() {
            that.$emit("update");
          });
        }
      });
      that.$refs.ship.close();
    },
    toAddress() {
      this.$refs.ship.close();
      this.$refs.addressList.open("bottom");
    },
    complete() {
      this.doSelect = false;
      this.controlShow = false;
      this.selectAll = false;
    },
    newAddress() {
      common_vendor.index.navigateTo({
        url: "/pages/user/address"
      });
    },
    confirmAddress() {
      this.$refs.addressList.close();
      this.$refs.ship.open("bottom");
    },
    addressClick(index) {
      var that = this;
      this.addressList.forEach(function(item) {
        item.active = false;
        that.addressList[index].active = true;
      });
      this.address = this.addressList[index];
    },
    loadClass() {
      var list = this.cabinetList;
      var that = this;
      var arr = [];
      list.forEach(function(item) {
        if (item.productItemPosition == 10 && !item.flagRecovery) {
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
      this.classAll = arr1;
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
    loadMore(e) {
      var that = this;
      if (this.pageNo < this.totalPage) {
        that.pageNo++;
        this.status = "loading";
        common_vendor.index.request({
          url: "http://123.60.71.74:20001/mh/user/product/page",
          method: "GET",
          dataType: "JSON",
          header: {
            "token": that.token
          },
          data: {
            no: that.pageNo,
            size: 10
          },
          success: (res) => {
            let data = JSON.parse(res.data);
            data.data.list.forEach(function(item) {
              that.cabinetList.push(item);
              that.curList.push(item);
            });
            that.status = "more";
          }
        });
      } else {
        this.status = "noMore";
      }
    },
    getAddress() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001//mh/user/address/list",
        method: "GET",
        dataType: "JSON",
        header: {
          "token": this.token
        },
        success: (res) => {
          let data = JSON.parse(res.data);
          this.addressList = data.data;
          console.log(this.addressList);
          this.address = this.addressList[0];
        }
      });
    },
    imgPreview(item) {
      const arr = [];
      arr.push(item.imgUrl);
      if (!this.doSelect) {
        common_vendor.index.previewImage({
          urls: arr
        });
      }
    }
  },
  mounted() {
    if (this.totalPage == 1) {
      this.status = "noMore";
    }
  },
  watch: {
    getData: function(newVal, oldVal) {
      console.log("\u5217\u8868\u66F4\u65B0", newVal);
      this.cabinetList = [];
      this.cabinetList = this.cabinetList.concat(newVal);
      this.curList = [];
      this.curList = this.curList.concat(newVal);
      this.forceupdate();
      this.curList.sort(function(a, b) {
        return a.itemType - b.itemType;
      });
    },
    cabinetList: function(newVal) {
      this.loadClass();
    },
    pageIndex: function(newVal) {
      this.doSelect = false;
    }
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_segmented_control2 + _easycom_uni_drawer2 + _easycom_uni_popup2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_drawer + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.hasConditions,
    b: $data.hasConditions,
    c: common_vendor.o((...args) => $options.showAll && $options.showAll(...args)),
    d: $data.small ? 1 : "",
    e: $data.timeImg[$data.timeIndex],
    f: common_vendor.o((...args) => $options.timeSwitch && $options.timeSwitch(...args)),
    g: $props.pageIndex == 0
  }, $props.pageIndex == 0 ? {
    h: !$data.doSelect,
    i: !$data.doSelect,
    j: !$data.doSelect,
    k: $data.doSelect,
    l: common_vendor.o((...args) => $options.select && $options.select(...args))
  } : {}, {
    m: $props.pageIndex != 0
  }, $props.pageIndex != 0 ? {} : {}, {
    n: common_vendor.o($options.onClickItem),
    o: common_vendor.p({
      current: $data.current,
      values: $data.items,
      ["style-type"]: $data.styleType,
      ["active-color"]: $data.activeColor
    }),
    p: $data.current === 0
  }, $data.current === 0 ? {
    q: common_vendor.f($data.curList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.o(($event) => $options.imgPreview(item)),
        c: common_vendor.t(item.itemTypeName),
        d: common_vendor.t(item.productItemName),
        e: $data.doSelect && item.choose,
        f: item.flagPreSale,
        g: index,
        h: common_vendor.o(($event) => $options.selectItem(item), index),
        i: (item.deliveryStatus == $props.pageIndex || item.deliveryStatus == 11) && item.productItemPosition == 10 && item.flagRecovery == 0
      };
    })
  } : {}, {
    r: $data.current === 1
  }, $data.current === 1 ? {
    s: common_vendor.f($data.curList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.o(($event) => $options.imgPreview(item)),
        c: common_vendor.t(item.itemTypeName),
        d: common_vendor.t(item.productItemName),
        e: $data.doSelect && item.choose,
        f: index,
        g: common_vendor.o(($event) => $options.selectItem(item), index),
        h: (item.deliveryStatus == $props.pageIndex || item.deliveryStatus == 11) && item.flagPreSale == 0 && item.productItemPosition == 10 && item.flagRecovery == 0
      };
    })
  } : {}, {
    t: $data.current === 2
  }, $data.current === 2 ? {
    v: common_vendor.f($data.curList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.o(($event) => $options.imgPreview(item)),
        c: common_vendor.t(item.itemTypeName),
        d: common_vendor.t(item.productItemName),
        e: $data.doSelect && item.choose,
        f: index,
        g: common_vendor.o(($event) => $options.selectItem(item), index),
        h: (item.deliveryStatus == $props.pageIndex || item.deliveryStatus == 11) && item.flagPreSale == 1 && item.productItemPosition == 10 && item.flagRecovery == 0
      };
    })
  } : {}, {
    w: $data.current === 3
  }, $data.current === 3 ? {
    x: common_vendor.f($data.curList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.o(($event) => $options.imgPreview(item)),
        c: common_vendor.t(item.itemTypeName),
        d: common_vendor.t(item.productItemName),
        e: $data.doSelect && item.choose,
        f: item.flagPreSale,
        g: index,
        h: common_vendor.o(($event) => $options.selectItem(item), index),
        i: (item.deliveryStatus == $props.pageIndex || item.deliveryStatus == 11) && item.flagSingle == 1 && item.productItemPosition == 10 && item.flagRecovery == 0
      };
    })
  } : {}, {
    y: $data.update,
    z: common_vendor.o((...args) => $options.goBag && $options.goBag(...args)),
    A: $data.showBag && !$data.doSelect,
    B: common_vendor.o((...args) => $options.clickAll && $options.clickAll(...args)),
    C: common_vendor.f($data.classAll, (c1, index, i0) => {
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
    D: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    E: common_vendor.sr("allPros", "45a94da2-1"),
    F: common_vendor.o(($event) => $options.closeAll()),
    G: common_vendor.p({
      mode: "left",
      ["mask-click"]: true
    }),
    H: $data.selectAll,
    I: common_vendor.o((...args) => $options.chooseAll && $options.chooseAll(...args)),
    J: common_vendor.o(($event) => $options.goDeal()),
    K: common_vendor.o(($event) => $options.goRecover()),
    L: common_vendor.o(($event) => $options.goShip()),
    M: $data.controlShow,
    N: common_vendor.f($data.curList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.t(item.productItemName),
        c: common_vendor.t(item.recoverPrice),
        d: index,
        e: item.deliveryStatus == 0 && item.readyRecover == 1
      };
    }),
    O: common_vendor.t($data.recoverPoint),
    P: common_vendor.o((...args) => $options.confirmRecover && $options.confirmRecover(...args)),
    Q: common_vendor.sr("recover", "45a94da2-2"),
    R: common_vendor.o($options.closeRecover),
    S: common_vendor.p({
      type: "bottom"
    }),
    T: common_vendor.t($data.address.customerName),
    U: common_vendor.t($data.address.phone),
    V: common_vendor.t($data.address.province),
    W: common_vendor.t($data.address.city),
    X: common_vendor.t($data.address.area),
    Y: common_vendor.t($data.address.detail),
    Z: common_vendor.o((...args) => $options.toAddress && $options.toAddress(...args)),
    aa: common_vendor.f($data.cabinetList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.t(item.productItemName),
        c: common_vendor.t(item.price),
        d: index,
        e: item.deliveryStatus == 11 && item.choose
      };
    }),
    ab: common_vendor.t($data.products),
    ac: common_vendor.o((...args) => $options.checkShip && $options.checkShip(...args)),
    ad: common_vendor.sr("ship", "45a94da2-3"),
    ae: common_vendor.o($options.closeShip),
    af: common_vendor.p({
      type: "bottom"
    }),
    ag: common_vendor.f($data.addressList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.customerName),
        b: common_vendor.t(item.phone),
        c: item.flagDefault,
        d: common_vendor.t(item.province),
        e: common_vendor.t(item.city),
        f: common_vendor.t(item.area),
        g: common_vendor.t(item.detail),
        h: index,
        i: common_vendor.o(($event) => $options.addressClick(index), index),
        j: item.active ? 1 : ""
      };
    }),
    ah: common_vendor.o((...args) => $options.newAddress && $options.newAddress(...args)),
    ai: common_vendor.o((...args) => $options.confirmAddress && $options.confirmAddress(...args)),
    aj: common_vendor.sr("addressList", "45a94da2-4"),
    ak: common_vendor.o($options.closeShip),
    al: common_vendor.p({
      type: "bottom"
    }),
    am: common_vendor.t($data.msgTitle),
    an: common_vendor.t($data.msgContent),
    ao: !$data.hasPre
  }, !$data.hasPre ? {
    ap: common_vendor.o((...args) => $options.confirmShip && $options.confirmShip(...args))
  } : {}, {
    aq: $data.hasPre
  }, $data.hasPre ? {
    ar: common_vendor.o((...args) => _ctx.alertClose && _ctx.alertClose(...args))
  } : {}, {
    as: common_vendor.sr("alert", "45a94da2-5"),
    at: common_vendor.p({
      type: "center"
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/components/cabinet/cabinet.vue"]]);
wx.createComponent(Component);
