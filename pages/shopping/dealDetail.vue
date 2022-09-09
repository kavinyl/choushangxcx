<template>
	<view class="container-detail">
		<view class="introduction">
			<view class="intro-top">
				<view class="user-img"><img class="pic" :src="deal.userimgUrl" alt=""></view>
				<view class="user-name">
					{{deal.username}}
				</view>
				<view class="countdown t-r">
					<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/countdown.png"
						alt="">
					<uni-countdown :fontSize="24" :show-day="false" :hour="countHour" :minute="countMinute"
						:second="countSecond" />
				</view>
			</view>
			<view class="deal-info">{{deal.info}}</view>
			<view class="lists">
				<view class="wish" v-if="wish.has&&false">
					<view class="border">
						<img class="pic" :src="wish.imgUrl" alt="">
						<view class="type t-c">{{wish.type}}</view>
					</view>
					<view class="haswish">
						求购
					</view>
				</view>
				<view class="sell">
					<view class="border" v-for="(item,index) in deal.list" :key="index">
						<img class="pic" :src="item.imgUrl" alt="">
						<view class="type t-c">{{item.type}}</view>
					</view>
				</view>
			</view>
			<view class="item-bottom">
				<view class="lowprice">
					最低价: <text class="price">￥{{deal.lowPrice}}</text>
				</view>
				<view class="oneprice">
					一口价: <text class="price">￥{{deal.onePrice}}</text>
				</view>
			</view>
			<view class="buttons" v-show="!isMaster">
				<view class="btn plus-ten t-c" @click="bidTen">
					加10币求购
				</view>
				<view class="btn deal-now t-c" @click="dealNow">
					一口价成交
				</view>
			</view>
		</view>
		<view class="auctions">
			<view class="join-times">参与竞拍( {{deal.auctionTimes}} )</view>
			<view class="list" v-show='update'>
				<view class="border" v-for="(item,index) in deal.auction" :key="index">
					<view class="floor">{{item.floor}}楼</view>
					<view class="user-img"><img class="pic" :src="item.userimgUrl" alt=""></view>
					<view class="user-name">{{item.username}}</view>
					<view class="price">出价：<text class="txt">￥{{item.price}}</text></view>
					<view class="deal-success" v-show="isMaster" @click="dealSuccess(item)">
						<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/shop/deal.png"
							alt="">
					</view>
				</view>
			</view>
		</view>
		<view class="bottom go-bid" v-if="!hasBid&&!isMaster">
			<view class="btn t-c" @click="goBid">
				我要出价
			</view>
		</view>
		<view class="bottom update-bid" v-if="hasBid&&!isMaster">
			<view class="current">
				<text>当前出价 : </text>
				<text class="price">{{hasBidPrice}}</text>
			</view>
			<view class="btn t-c" @click="goBid">
				更新出价
			</view>
			<view class="cancel" @click="cancelBid">
				取消出价
			</view>
		</view>
		<view class="bottom master" v-if="!hasBid&&isMaster">
			<view class="btn t-c" @click="updateDeal">
				<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/shop/fresh.png" alt="">更新擦亮
			</view>
			<view class="cancel" @click="deleteDeal">
				删除发布
			</view>
		</view>
		<view class="popup-order">
			<uni-popup ref="order" type="center">
				<view class="popup-title t-c">
					<text>出价确认</text>
				</view>
				<view class="popup-center">
					<view class="one-price">
						一口价：<text class="txt">{{deal.onePrice}}</text>
					</view>
					<view class="remain">
						余额：<text class="txt">{{remain}}</text>
					</view>
				</view>
				<view class="popup-bottom">
					<button type='primary' @click="bidReady">确认</button>
				</view>
			</uni-popup>
		</view>
		<view class="popup-success">
			<uni-popup ref="success" type="center">
				<view class="popup-title t-c">
					<text>成交确认</text>
				</view>
				<view class="popup-center">
					<view class="success t-c">
						成交价：<text class="txt">{{successPrice}}</text>
					</view>
				</view>
				<view class="popup-bottom">
					<button type='primary' @click="confirm">确认</button>
				</view>
			</uni-popup>
		</view>
		<view class="test">
			<button @click="test1()">用户未出价</button>
		<button @click="test2()">用户已出价</button>
		<button @click="test3()">发布者</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				deal: {},
				countHour: 24,
				countMinute: 0,
				countSecond: 0,
				wish: {},
				update: true,
				remain: 50,
				cTime: '',
				hasBid: false,
				isMaster: true,
				hasBidPrice: 0,
				user: {},
				successPrice: 0
			}
		},
		onLoad() {},
		methods: {
			test1() {
				this.hasBid = false
				this.isMaster = false
			},
			test2() {
				this.hasBid = true
				this.isMaster = false
			},
			test3() {
				this.hasBid = false
				this.isMaster = true
			},
			getJson() {
				// 先从后台拿数据
				uni.request({
					// #ifdef H5
					url: "/static/fake.json",
					// #endif
					// #ifdef MP-WEIXIN
					url: "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/fake.json",
					// #endif
					method: "get",
					dataType: "JSON",
					// #ifdef H5
					success: res => {
						this.deal = res.data.shop[2];
						this.wish = this.deal.wish;
						this.remain = res.data.user.account.remain;
						this.cTime = this.deal.time;
						this.user = res.data.user;
						// console.log(this.cTime);
						this.getTime(-8);
						// this.checkUser();
					},
					// #endif
					// #ifdef MP-WEIXIN
					success: res => {
						// console.log(res.data);
						let data = JSON.parse(res.data);
						this.deal = data.shop[2];
						this.wish = this.deal.wish;
						this.remain = data.user.account.remain;
						this.cTime = this.deal.time;
						this.user = data.user;
						this.getTime(-8);
						// this.checkUser();
					}
					// #endif
				});
			},
			forceUpdate() {
				this.update = false;
				this.update = true;
			},
			goBid() {
				uni.navigateTo({
					url: 'bid'
				})
			},
			dealNow() {
				this.$refs.order.open('center');
			},
			bidReady() {
				var that = this;
				if (this.check(this.deal.onePrice)) {
					uni.showToast({
						title: "恭喜您，交易成功！",
						icon: "success"
					})
					setTimeout(function() {
						that.$refs.order.close()
					}, 1000);
				} else {
					uni.showToast({
						title: "余额不足，请先充值！",
						icon: "error"
					})
				}
			},
			bidTen() {
				if (this.check(Number(this.deal.lowPrice) + 10)) {
					uni.showToast({
						title: "出价成功！",
						icon: "success"
					})
				} else {
					uni.showToast({
						title: "余额不足，请先充值！",
						icon: "error"
					})
				}
			},
			check(n) {
				if (this.remain >= n) {
					return true
				} else {
					return false
				}
			},
			getTime(i) {
				let day = 1;
				var now = new Date();
				var n = Number(now.getTime());
				var c = Number(this.cTime);
				var offset = now.getTimezoneOffset() * 60 * 1000;
				var countdown = c + 86400000 * day - n - offset - i * 3600000;

				var cd = new Date(countdown);
				var countDate = cd.getDate() - 1;
				console.log(countDate);
				this.countHour = cd.getHours() + countDate * 24;
				this.countMinute = cd.getMinutes();
				this.countSecond = cd.getSeconds();
				console.log(this.countHour, this.countMinute, this.countSecond)
			},
			checkUser() {
				var that = this;
				let userName = this.user.userName;
				// console.log(this.deal.auction);
				this.deal.auction.forEach(
					function(item, index) {
						if (item.username == userName) {
							that.hasBid = true;
							that.hasBidPrice = item.price;
							uni.setStorage({
								key: 'bidPrice',
								data: item.price
							})
						}
					}
				);
				if (that.deal.username == userName) {
					that.isMaster = true;
				}
			},
			cancelBid() {
				this.hasBid = false;
			},
			dealSuccess(i) {
				this.$refs.success.open("center");
				this.successPrice = i.price;
			},
			updateDeal() {
				uni.showToast({
					title: "更新成功！",
					icon: "success"
				})
				setTimeout(function() {
					uni.switchTab({
						url: "/pages/shopping"
					})
				}, 1000);
			},
			deleteDeal() {
				uni.showToast({
					title: "删除成功！",
					icon: "success"
				})
				setTimeout(function() {
					uni.switchTab({
						url: "/pages/shopping"
					})
				}, 1000);
			},
			confirm() {
				var that = this;
				uni.showToast({
					title: "恭喜您，交易成功！",
					icon: "success"
				})
				setTimeout(function() {
					that.$refs.success.close()
				}, 1000);
			}
		},
		mounted() {},
		onShow() {
			this.getJson();
		},
		watch: {}
	}
</script>

<style lang="scss">
	.test{
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}
	.container-detail{
		position: relative;
		width: 100%;
		height: calc(100vh - 50rpx);
	}
	.introduction {
		padding: 20rpx 15rpx;

		.intro-top {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			padding: 0 15rpx;

			.user-img {
				width: 60rpx;
				height: 60rpx;
			}

			.user-name {
				font-size: 30rpx;
				color: #7C7B7B;
				flex: 1;
				margin-left: 10rpx;
			}

			.countdown {
				display: inline-flex;

				.pic {
					width: 36rpx;
					height: 36rpx;
				}
			}
		}

		.deal-info {
			width: 100%;
			margin: 35rpx 0;
			padding: 0 15rpx;
			font-size: 30rpx;
		}

		.lists {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			overflow: hidden;
			background-color: #FEF4DC;
			border-radius: 10rpx;

			.wish {
				width: 140rpx;
				height: 140rpx;
			}

			.sell {
				display: inline-flex;
				flex: 1;
				flex-wrap: nowrap;
				overflow: auto;
			}

			.border {
				padding: 15rpx;
				position: relative;
				width: 140rpx;
				height: 140rpx;

				.pic {
					width: 110rpx;
					height: 110rpx;
				}

				.type {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					top: 15rpx;
					left: 15rpx;
					background-color: #020202;
					font-size: 30rpx;
					color: #FDB302;
					border-radius: 10rpx;
				}
			}
		}

		.item-bottom {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			font-size: 24rpx;
			color: #575757;
			margin: 10rpx 15rpx;

			.lowprice {
				margin-right: 35rpx;
			}

			.price {
				color: #000;
			}
		}

		.buttons {
			display: flex;
			flex-wrap: nowrap;
			justify-content: right;
			align-items: center;
			margin-top: 35rpx;

			.btn {
				padding: 0 35rpx;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 35rpx;
				margin-left: 20rpx;
				font-size: 22rpx;
			}

			.plus-ten {
				background-color: #FEE8B4;
				color: #FB9503;
			}

			.deal-now {
				background-color: #F9B002;
				color: #fff;
			}
		}

	}

	.auctions {
		margin: 30rpx;
		padding-bottom: 100rpx;

		.join-times {
			font-size: 24rpx;
			color: #565656;
		}

		.list {
			margin-top: 20rpx;

			.border {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				height: 88rpx;
				border-bottom: 1rpx solid #EEEEEE;

				.floor {
					font-size: 24rpx;
					color: #727272;
				}

				.user-img {
					width: 45rpx;
					height: 45rpx;
					border-radius: 25rpx;
					overflow: hidden;
					margin: 0 10rpx;
				}

				.user-name {
					font-size: 28rpx;
					color: #7D7D7D;
					flex: 1;
				}

				.price {
					font-size: 22rpx;
					color: #575757;

					.txt {
						font-size: 28rpx;
						color: #F9B002;
					}
				}

				.deal-success {
					margin-left: 100rpx;
					width: 38rpx;
					height: 39rpx;
				}
			}
		}
	}

	.bottom {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		border-top: 1rpx solid #F7F7F7;
		background-color: #fff;

		.btn {
			margin: 16rpx auto;
			width: 340rpx;
			height: 68rpx;
			color: #fff;
			border-radius: 34rpx;
			line-height: 68rpx;
			background-color: #F9B002;
			font-size: 26rpx;
		}
	}

	.update-bid,
	.master {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		padding: 0 15rpx;

		.current {
			flex: 1;
			font-size: 24rpx;
			color: #838383;

			.price {
				font-size: 40rpx;
				color: #F9B002;
			}
		}

		.btn {
			width: 250rpx;
			margin: 0 25rpx;
		}

		.cancel {
			font-size: 26rpx;
			color: #5E5E5E;
		}
	}

	.master {
		width: 100%;
		justify-content: flex-end;

		.btn {
			width: 340rpx;
			display: inline-flex;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			margin-right: 80rpx;
		}

		.pic {
			width: 30rpx;
			height: 30rpx;
			margin: 0 10rpx;
		}
	}

	.popup-order,
	.popup-success {
		.popup-title {
			font-size: 28rpx;
			color: #020202;
			line-height: 42rpx;
		}

		.popup-center {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			margin-top: 20rpx;

			.one-price,
			.success {
				font-size: 24rpx;
				color: #020202;
			}

			.txt {
				font-size: 30rpx;
			}

			.remain {
				margin-top: 40rpx;
				width: 100%;
				font-size: 24rpx;
				color: #646363;
			}
		}

		.popup-bottom {
			margin: 65rpx auto 0;
		}
	}

	::v-deep .popup-order,
	::v-deep .popup-success {
		.uni-popup__wrapper {
			background-color: #fff !important;
			border-radius: 20rpx;
			padding: 25rpx 40rpx 50rpx;
			width: 690rpx;
		}

		uni-button {
			background-color: #FDB302 !important;
			height: 68rpx;
			font-size: 26rpx;
			line-height: 68rpx;
			width: 320rpx;
			border-radius: 10rpx;
		}
	}
</style>
