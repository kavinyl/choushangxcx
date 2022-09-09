"use strict";
var common_vendor = require("../../common/vendor.js");
const gashapon = () => "../../components/gashapon/gashapon.js";
const imgview = () => "../../components/preview/preview.js";
const _sfc_main = {
  components: {
    gashapon,
    imgview
  },
  data() {
    return {
      curProduct: {},
      line: {
        queue: true,
        length: 0
      },
      userList: [],
      proList: [],
      postcard: {
        amount: 0,
        imgUrl: ""
      },
      boxList: [],
      scrollTop: 0,
      oldId: 1,
      newId: 1,
      msgAlert: "\u8BF7\u5148\u52A0\u5165\u961F\u5217\uFF01",
      quantity: 0,
      buyValue: 1,
      payType: "wxPay",
      payComplete: true,
      gashaponShow: false,
      confirmPlay: false,
      token: "",
      productCode: "",
      postcardCode: "",
      cdMinute: 3,
      cdSecond: 1,
      start: false,
      productBoxCode: "",
      boxId: 1,
      boxRemain: 1,
      appid: "wx1fcd6e2e840c9e0c",
      secret: "",
      accessToken: "",
      openid: "",
      interval: "",
      firstTime: true,
      userCurrency: 0,
      startcd: true,
      viewShow: false,
      imgIndex: 0,
      startTime: 0,
      endTime: 0,
      rules: {
        buyRule: false,
        userRule: false
      }
    };
  },
  onLoad() {
  },
  methods: {
    async test() {
      this.quantity = 5;
      this.addSeconds(true);
    },
    getJson() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/product/" + this.productCode,
        method: "GET",
        success: (res) => {
          this.curProduct = res.data.data;
          this.getProductBox();
          this.getUserCollect();
          this.getUserPostcard();
        }
      });
    },
    getUserCollect() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/product/item/collect/info?productCode=" + this.productCode,
        method: "GET",
        header: {
          "token": this.token
        },
        success: (res) => {
          this.userList = res.data.data;
          console.log("user", res);
        }
      });
    },
    getAmount() {
      var that = this;
      this.curProduct.leftAmount = 0;
      this.curProduct.totalAmount = 0;
      this.proList.forEach(function(i) {
        that.curProduct.leftAmount += i.leftAmount;
        that.curProduct.totalAmount += i.totalAmount;
      });
    },
    getProductBox() {
      var that = this;
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/product/box/list/?productCode=" + this.productCode,
        method: "GET",
        header: {
          "token": this.token
        },
        success: (res) => {
          this.boxList = res.data.data;
          if (common_vendor.index.getStorageSync("productBoxCode")) {
            var pbc = common_vendor.index.getStorageSync("productBoxCode");
            that.boxList.forEach(function(item, index) {
              if (pbc == item.productBoxCode) {
                that.oldId = index + 1;
              }
            });
          }
          this.checkBox();
          if (this.boxRemain) {
            this.boxList[this.oldId - 1].choose = true;
            this.proList = this.boxList[this.oldId - 1].productBoxItemVoList;
            console.log(this.proList);
            this.boxId = this.boxList[this.oldId - 1].productBoxName;
            this.getAmount();
            this.productBoxCode = this.boxList[this.oldId - 1].productBoxCode;
            this.getQueueInfo();
          } else {
            that.line.length = -1;
          }
        }
      });
    },
    getUserPostcard() {
      var that = this;
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/postcard/list",
        method: "GET",
        header: {
          "token": this.token
        },
        success: (res) => {
          res.data.data.forEach(function(item) {
            if (Number(item.postcardName) == Number(that.curProduct.price)) {
              that.postcard.amount = item.amount;
              that.postcard.imgUrl = item.imgUrl;
              that.postcardCode = item.postcardCode;
              common_vendor.index.setStorage({
                key: "postcardCode",
                data: item.postcardCode
              });
            }
          });
        }
      });
    },
    getUserCurrency() {
      return new Promise((resolve, reject) => {
        common_vendor.index.request({
          url: "http://123.60.71.74:20001/mh/user/currency/info",
          method: "GET",
          header: {
            "token": this.token
          },
          success: (res) => {
            resolve(res.data.data.currencyAmount);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    getQueueInfo() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/queue/info?productBoxCode=" + this.productBoxCode,
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token": this.token
        },
        success: (res) => {
          this.line.size = res.data.data.size;
          this.line.length = res.data.data.myPositionBeforeNum;
          this.line.myPosition = res.data.data.myPosition;
          if (this.line.length == 0 && this.firstTime) {
            this.updateFirst(0);
            this.firstTime = false;
          }
          if (this.line.length == 0) {
            console.log("queue", this.line.length, "time", this.startTime, this.endTime);
          }
        }
      });
    },
    queuingAdd() {
      this.line.queue = false;
      this.setCountDown();
      const addTime = Date.now();
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/queue/add?productBoxCode=" + this.productBoxCode,
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token": this.token
        },
        data: {
          addTime
        },
        success: (res) => {
          this.getQueueInfo();
          console.log("add", res);
          this.line.size = res.data.data.size;
          this.line.length = res.data.data.myPositionBeforeNum;
          this.line.myPosition = res.data.data.myPosition;
          this.subscribe();
          common_vendor.index.setStorageSync("productBoxCode", this.productBoxCode);
        }
      });
    },
    queuingLeave() {
      this.line.queue = true;
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/queue/leave?productBoxCode=" + this.productBoxCode,
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token": this.token
        },
        success: (res) => {
          console.log("leave", res);
          this.line.size = res.data.data.size;
          this.line.length = res.data.data.myPositionBeforeNum;
          this.line.myPosition = res.data.data.myPosition;
          common_vendor.index.removeStorageSync("isQueue");
          common_vendor.index.removeStorageSync("productBoxCode");
          this.firstTime = true;
        }
      });
    },
    requeue() {
      this.queuingLeave();
      this.alertMessage("\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u6392\u961F\uFF01");
      setTimeout(function() {
        common_vendor.index.redirectTo({
          url: "play"
        });
      }, 1e3);
    },
    changeShow() {
      if (this.line.length < 0) {
        this.$refs.changebox.open("bottom");
        this.getProductBox();
      }
    },
    changeBox(item, index) {
      var that = this;
      that.newId = index + 1;
      if (that.oldId !== that.newId) {
        item.choose = true;
        that.boxList[that.oldId - 1].choose = false;
        that.proList = item.productBoxItemVoList;
      }
      that.oldId = that.newId;
      this.getProductBox();
      this.getAmount();
    },
    refresh() {
      this.getQueueInfo();
      this.getProductBox();
      console.log("\u5237\u65B0");
    },
    fav() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001//mh/user/favourite/add",
        method: "POST",
        header: {
          "Content-Type": "application/json",
          "token": this.token
        },
        data: {
          "productCode": this.productCode
        },
        success: (res) => {
          console.log(res);
          common_vendor.index.showToast({
            title: "\u6536\u85CF\u6210\u529F\uFF01",
            icon: "none"
          });
        }
      });
    },
    alertMessage(msg) {
      var that = this;
      that.msgAlert = msg;
      this.$refs.message.open("center");
      setTimeout(function() {
        that.$refs.message.close();
      }, 1e3);
    },
    buy(n) {
      var that = this;
      if (!common_vendor.index.getStorageSync("rules")) {
        this.showRule();
        return;
      }
      if (that.line.length == -1) {
        that.alertMessage("\u8BF7\u5148\u52A0\u5165\u961F\u5217\uFF01");
      } else if (that.line.length > 0) {
        that.alertMessage("\u6392\u961F\u4E2D\uFF0C\u8BF7\u7A0D\u5019\uFF01");
      } else if (that.line.length == 0) {
        if (typeof n == "number") {
          that.quantity = n;
        } else if (typeof n == "string") {
          that.quantity = that.curProduct.leftAmount;
        }
        if (that.postcard.amount >= that.quantity) {
          that.order();
        } else {
          that.cardLess();
        }
      }
    },
    order() {
      var that = this;
      that.$refs.order.open("center");
    },
    cardLess() {
      this.$refs.pcless.open("center");
    },
    buyPostcard() {
      var that = this;
      that.$refs.pcless.close();
      that.$refs.buyCard.open("center");
      that.buyValue = that.quantity - that.postcard.amount;
    },
    newBuyPostcard() {
      this.$refs.buyCard.open("center");
      this.buyValue = 1;
    },
    changeValue(value) {
      this.buyValue = value;
    },
    async orderPay() {
      var that = this;
      if (that.buyValue > 0) {
        if (that.payType == "sxPay") {
          that.userCurrency = await that.getUserCurrency();
          if (that.userCurrency >= that.curProduct.price * that.buyValue) {
            that.postcardAdd();
            that.currencyMinus();
            common_vendor.index.showToast({
              title: "\u8D2D\u4E70\u6210\u529F\uFF01",
              icon: "none"
            });
            setTimeout(function() {
              that.$refs.buyCard.close();
            }, 1e3);
          } else {
            common_vendor.index.showToast({
              title: "\u4F59\u989D\u4E0D\u8DB3\uFF01",
              icon: "none"
            });
            setTimeout(function() {
              common_vendor.index.navigateTo({
                url: "/pages/user/deposit"
              });
            }, 1e3);
          }
        } else {
          this.wxPay();
          if (that.checkWxPay()) {
            that.postcardAdd();
            common_vendor.index.showToast({
              title: "\u8D2D\u4E70\u6210\u529F\uFF01",
              icon: "none"
            });
            setTimeout(function() {
              that.$refs.buyCard.close();
            }, 1e3);
          }
        }
      } else if (that.buyValue == 0) {
        common_vendor.index.showToast({
          title: "\u8D2D\u4E70\u6570\u4E0D\u80FD\u4E3A0\uFF01",
          icon: "none"
        });
      } else {
        that.$refs.buyCard.close();
        that.alertMessage("\u8D2D\u4E70\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\uFF01");
      }
    },
    checkWxPay() {
      return true;
    },
    currencyMinus() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/currency/minus",
        method: "POST",
        header: {
          "token": this.token,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          currencyAmount: this.curProduct.price * this.buyValue
        },
        success: (res) => {
          console.log(res);
        }
      });
    },
    postcardAdd() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/postcard/add",
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token": this.token
        },
        data: {
          postcardCode: this.postcardCode,
          amount: this.buyValue
        },
        success: (res) => {
          this.getUserPostcard();
        }
      });
    },
    postcardMinus() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/user/postcard/minus",
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token": this.token
        },
        data: {
          postcardCode: this.postcardCode,
          amount: this.quantity
        },
        success: (res) => {
          this.getUserPostcard();
        }
      });
    },
    changePayType(e) {
      this.payType = e + "Pay";
    },
    playReady() {
      this.gashaponShow = true;
      this.$refs.order.close();
    },
    goAbout() {
      common_vendor.index.navigateTo({
        url: "/pages/about/about"
      });
    },
    closeMask(msg) {
      this.gashaponShow = msg;
      this.confirmPlay = msg;
    },
    subscribe() {
      var that = this;
      common_vendor.index.requestSubscribeMessage({
        tmplIds: [
          "G6mHGH66jrnVIKxKoTcGvkQ0M7yN52rNswef-KqyuNs",
          "JEduhzoEoYLKZR5DG0MievdtCs042zSXslsuCfFUPM0"
        ],
        success(res) {
          that.noticeStart();
          console.log("success");
        },
        fail: (res) => {
          clog(res);
        }
      });
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/open/wx/secret",
        method: "GET",
        success: (res) => {
          this.secret = res.data.data;
          this.getAccessToken();
        }
      });
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/open/wx/openId",
        method: "GET",
        header: {
          "token": this.token
        },
        success: (res) => {
          this.openid = res.data.data;
        }
      });
    },
    getAccessToken() {
      common_vendor.index.request({
        url: "http://123.60.71.74:20001/mh/open/wx/access/token",
        method: "GET",
        success: (res) => {
          this.accessToken = res.data.data;
        }
      });
    },
    noticeStart() {
      var that = this;
      const now = new Date();
      var timeValue = now.getFullYear() + "\u5E74" + now.getMonth() + "\u6708" + now.getDate() + "\u65E5 " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
      const pushmsg = {
        "touser": that.openid,
        "template_id": "G6mHGH66jrnVIKxKoTcGvkQ0M7yN52rNswef-KqyuNs",
        "data": {
          "thing6": {
            "value": that.curProduct.productName
          },
          "number7": {
            "value": that.line.size
          },
          "time8": {
            "value": timeValue
          }
        }
      };
      common_vendor.index.request({
        url: "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=" + that.accessToken,
        method: "POST",
        data: JSON.stringify(pushmsg),
        success: (res) => {
        }
      });
    },
    noticeSuccess() {
      var that = this;
      const pushmsg = {
        "touser": that.openid,
        "template_id": "",
        "data": {
          "thing1": {
            "value": that.curProduct.productName
          },
          "character_string2": {
            "value": that.line.myPositionBeforeNum
          },
          "number3": {
            "value": "5"
          },
          "time4": {
            "value": "2022-08-17 12:00:00"
          },
          "thing5": {
            "value": "\u5907\u6CE8\u4FE1\u606F"
          }
        }
      };
      common_vendor.index.request({
        url: "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=" + that.accessToken,
        method: "POST",
        data: JSON.stringify(pushmsg),
        success: (res) => {
          console.log(res);
        }
      });
    },
    setCountDown() {
      this.startcd = false;
      if (this.startTime) {
        const cd = this.startTime + 6e4 * 3 - Date.now();
        this.cdMinute = Math.floor(cd / 1e3 / 60 % 60);
        this.cdSecond = Math.floor(cd / 1e3 % 60);
      } else {
        this.cdMinute = 3;
        this.cdSecond = 0;
      }
      this.$nextTick(() => {
        this.startcd = true;
      });
    },
    addSeconds(msg) {
      var that = this;
      if (this.quantity == "5" && msg) {
        let t = this.startTime + 6e4 * 3 - Date.now();
        let min = Math.floor(t / 1e3 / 60 % 60);
        let sed = Math.floor(t / 1e3 % 60);
        if (sed > 30 && min == 2) {
          that.cdSecond = 0;
          that.cdMinute = 3;
          console.log(min, sed);
        } else {
          that.cdMinute = min;
          that.cdSecond = t.getSeconds() + 30;
          console.log(min, sed);
        }
      }
    },
    checkBox() {
      var that = this;
      this.boxRemain = 0;
      this.boxList.forEach(function(item) {
        var t = 0;
        item.productBoxItemVoList.forEach(function(i) {
          t += i.leftAmount;
        });
        if (t == 0) {
          item.isEmpty = true;
        } else {
          item.isEmpty = false;
          that.boxRemain++;
        }
      });
    },
    closeView(msg) {
      this.viewShow = msg;
    },
    imgPreview(item, index) {
      this.imgIndex = index;
      this.viewShow = true;
    },
    updateFirst(n) {
      if (n == 0) {
        let stime = Date.now();
        let etime = Date.now() + 6e4 * 3;
        common_vendor.index.request({
          url: "http://123.60.71.74:20001/mh/user/queue/in/turn?productCode=" + this.productCode,
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": common_vendor.index.getStorageSync("token")
          },
          data: {
            startTime: stime,
            endTime: etime,
            productBoxCode: this.productBoxCode
          },
          success: (res) => {
            if (!common_vendor.index.getStorageSync("isQueue")) {
              console.log("updateFirst", res);
              common_vendor.index.setStorageSync("isQueue", "true");
            }
          }
        });
        this.getStartTime();
      } else {
        this.getStartTime();
        let stime = this.startTime;
        let etime = this.endTime + 3e4 * n;
        common_vendor.index.request({
          url: "http://123.60.71.74:20001/mh/user/queue/in/turn?productCode=" + this.productCode,
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": common_vendor.index.getStorageSync("token")
          },
          data: {
            startTime: stime,
            endTime: etime
          },
          success: (res) => {
            console.log("add30s", res);
          }
        });
      }
    },
    regularUpdate() {
      this.interval = setInterval(() => {
        this.getQueueInfo();
        console.log("update");
      }, 1e4);
    },
    getStartTime() {
      this.productBoxCode = common_vendor.index.getStorageSync("productBoxCode");
      if (!this.productBoxCode) {
        console.log("\u672A\u52A0\u5165\u961F\u5217");
        this.firstTime = true;
        return;
      } else {
        this.firstTime = false;
        common_vendor.index.request({
          url: "http://123.60.71.74:20001/mh/user/queue/in/turn/check?productBoxCode=" + this.productBoxCode,
          method: "GET",
          header: {
            "token": common_vendor.index.getStorageSync("token")
          },
          success: (res) => {
            this.startTime = res.data.data.startTime;
            this.endTime = res.data.data.endTime;
          }
        });
      }
    },
    showRule() {
      this.$refs.rule.open("center");
    },
    agreeClick(n) {
      switch (n) {
        case 1:
          this.rules.buyRule = !this.rules.buyRule;
          break;
        case 2:
          this.rules.userRule = !this.rules.userRule;
          break;
      }
    },
    agreeRules() {
      if (this.rules.buyRule && this.rules.userRule) {
        common_vendor.index.setStorageSync("rules", "ture");
        this.$refs.rule.close();
      } else {
        common_vendor.index.showToast({
          title: "\u8BF7\u9605\u8BFB\u5E76\u6253\u52FE!",
          icon: "none"
        });
      }
    },
    toPage(url) {
      common_vendor.index.navigateTo({
        "url": url
      });
    }
  },
  onShow() {
    clearInterval(this.interval);
    if (common_vendor.index.getStorageSync("userInfo")) {
      this.token = common_vendor.index.getStorageSync("token");
    } else {
      common_vendor.index.showToast({
        title: "\u8BF7\u5148\u767B\u5F55",
        icon: "none"
      });
      setTimeout(function() {
        common_vendor.index.switchTab({
          url: "../../pages/user"
        });
      }, 1e3);
    }
    common_vendor.index.getStorage({
      key: "productCode",
      success: (res) => {
        this.productCode = res.data;
        this.getJson();
      }
    });
    this.getStartTime();
    this.$nextTick(() => {
      this.setCountDown();
    });
    this.regularUpdate();
  },
  onUnload() {
    clearInterval(this.interval);
    console.log("stop");
  },
  mounted() {
  },
  watch: {
    confirmPlay: function(newval) {
      if (newval) {
        this.postcardMinus();
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_countdown2 = common_vendor.resolveComponent("uni-countdown");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_gashapon2 = common_vendor.resolveComponent("gashapon");
  const _component_imgview = common_vendor.resolveComponent("imgview");
  (_easycom_uni_countdown2 + _easycom_uni_popup2 + _easycom_uni_popup_message2 + _easycom_uni_number_box2 + _easycom_gashapon2 + _component_imgview)();
}
const _easycom_uni_countdown = () => "../../uni_modules/uni-countdown/components/uni-countdown/uni-countdown.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_gashapon = () => "../../components/gashapon/gashapon.js";
if (!Math) {
  (_easycom_uni_countdown + _easycom_uni_popup + _easycom_uni_popup_message + _easycom_uni_number_box + _easycom_gashapon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.curProduct.imgUrl,
    b: common_vendor.t($data.curProduct.productName),
    c: 100 * this.curProduct.leftAmount / this.curProduct.totalAmount,
    d: common_vendor.t($data.curProduct.leftAmount),
    e: common_vendor.t($data.curProduct.totalAmount),
    f: common_vendor.t($data.boxRemain),
    g: common_vendor.t($data.boxId),
    h: common_vendor.o((...args) => $options.changeShow && $options.changeShow(...args)),
    i: common_vendor.o((...args) => $options.goAbout && $options.goAbout(...args)),
    j: $data.line.length == -1
  }, $data.line.length == -1 ? {
    k: common_vendor.t($data.line.size)
  } : {}, {
    l: $data.line.length > 0
  }, $data.line.length > 0 ? {
    m: common_vendor.t($data.line.length)
  } : {}, {
    n: $data.line.length == 0
  }, $data.line.length == 0 ? common_vendor.e({
    o: $data.startcd
  }, $data.startcd ? {
    p: common_vendor.sr("ctd", "644f827a-0"),
    q: common_vendor.o($options.requeue),
    r: common_vendor.p({
      ["show-day"]: false,
      hour: 0,
      minute: $data.cdMinute,
      second: $data.cdSecond,
      fontSize: 34,
      color: "#FE9703"
    })
  } : {}) : {}, {
    s: $data.line.length == -1
  }, $data.line.length == -1 ? {
    t: common_vendor.o((...args) => $options.queuingAdd && $options.queuingAdd(...args))
  } : {}, {
    v: $data.line.length >= 0
  }, $data.line.length >= 0 ? {
    w: common_vendor.o((...args) => $options.queuingLeave && $options.queuingLeave(...args))
  } : {}, {
    x: common_vendor.f($data.userList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: !item.flagCollected,
        c: index
      };
    }),
    y: common_vendor.f($data.proList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.o(($event) => $options.imgPreview(item, index)),
        c: item.leftAmount == 0,
        d: common_vendor.t(item.itemTypeName),
        e: common_vendor.t(item.leftAmount),
        f: common_vendor.t(item.totalAmount),
        g: common_vendor.t(item.productItemName),
        h: index
      };
    }),
    z: common_vendor.t($data.postcard.amount),
    A: common_vendor.o(($event) => $options.newBuyPostcard()),
    B: common_vendor.o(($event) => $options.buy("all")),
    C: common_vendor.o(($event) => $options.buy(5)),
    D: common_vendor.o(($event) => $options.buy(1)),
    E: common_vendor.o((...args) => $options.fav && $options.fav(...args)),
    F: common_vendor.o((...args) => $options.refresh && $options.refresh(...args)),
    G: common_vendor.f($data.boxList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.productBoxName),
        b: item.choose,
        c: common_vendor.f($data.boxList[index].productBoxItemVoList, (items, idx, i1) => {
          return {
            a: common_vendor.t(items.itemTypeName),
            b: common_vendor.t(items.leftAmount),
            c: common_vendor.t(items.totalAmount),
            d: 100 * items.leftAmount / items.totalAmount,
            e: idx
          };
        }),
        d: item.isEmpty,
        e: common_vendor.o(($event) => $options.changeBox(item, index), index),
        f: index
      };
    }),
    H: $data.scrollTop,
    I: common_vendor.sr("changebox", "644f827a-1"),
    J: common_vendor.p({
      type: "bottom"
    }),
    K: common_vendor.p({
      type: "info",
      message: $data.msgAlert,
      duration: 2e3
    }),
    L: common_vendor.sr("message", "644f827a-2"),
    M: common_vendor.p({
      type: "message"
    }),
    N: common_vendor.o((...args) => $options.goAbout && $options.goAbout(...args)),
    O: $data.postcard.imgUrl,
    P: common_vendor.t($data.quantity),
    Q: common_vendor.t($data.postcard.amount),
    R: common_vendor.o((...args) => $options.playReady && $options.playReady(...args)),
    S: common_vendor.sr("order", "644f827a-4"),
    T: common_vendor.p({
      type: "center"
    }),
    U: common_vendor.o((...args) => $options.buyPostcard && $options.buyPostcard(...args)),
    V: common_vendor.sr("pcless", "644f827a-5"),
    W: common_vendor.p({
      type: "center"
    }),
    X: common_vendor.o((...args) => $options.goAbout && $options.goAbout(...args)),
    Y: $data.postcard.imgUrl,
    Z: common_vendor.o($options.changeValue),
    aa: common_vendor.o(($event) => $data.buyValue = $event),
    ab: common_vendor.p({
      max: 99,
      modelValue: $data.buyValue
    }),
    ac: common_vendor.t($data.curProduct.price * $data.buyValue),
    ad: $data.payType == "wxPay",
    ae: common_vendor.o(($event) => $options.changePayType("wx")),
    af: $data.payType == "sxPay",
    ag: common_vendor.o(($event) => $options.changePayType("sx")),
    ah: common_vendor.o(($event) => $options.orderPay()),
    ai: common_vendor.sr("buyCard", "644f827a-6"),
    aj: common_vendor.p({
      type: "center"
    }),
    ak: common_vendor.sr("gashapon", "644f827a-8"),
    al: $data.gashaponShow,
    am: common_vendor.o($options.closeMask),
    an: common_vendor.o($options.addSeconds),
    ao: common_vendor.p({
      quantity: $data.quantity
    }),
    ap: $data.rules.buyRule,
    aq: $data.rules.buyRule ? 1 : "",
    ar: common_vendor.o(($event) => $options.agreeClick(1)),
    as: common_vendor.o(($event) => $options.toPage("/pages/about/about")),
    at: $data.rules.userRule,
    av: $data.rules.userRule ? 1 : "",
    aw: common_vendor.o(($event) => $options.agreeClick(2)),
    ax: common_vendor.o(($event) => $options.toPage("/pages/about/agreements")),
    ay: common_vendor.o((...args) => $options.agreeRules && $options.agreeRules(...args)),
    az: common_vendor.sr("rule", "644f827a-9"),
    aA: common_vendor.p({
      type: "center"
    }),
    aB: common_vendor.sr("preview", "644f827a-10"),
    aC: $data.viewShow,
    aD: common_vendor.o($options.closeView),
    aE: common_vendor.p({
      ["pro-list"]: $data.proList,
      index: $data.imgIndex
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/EINTOO/Desktop/Kavin/xcx/\u62BD\u8D4F/sub-play/pages/play.vue"]]);
wx.createPage(MiniProgramPage);
