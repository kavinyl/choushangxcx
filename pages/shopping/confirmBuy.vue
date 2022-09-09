<template>
	<view>
		<view class="confirm-top">
			<view class="img">
				<img class="pic" :src="imgUrl" alt="">
			</view>
			<view class="info">
				<view class="name">
					{{name}}
				</view>
				<view class="class">
					{{class2}}-{{class3}}
				</view>
				<view class="amount">
					共{{amount}}件
				</view>
			</view>
			<view class="price">
				￥{{sellPrice}}
			</view>
		</view>
		<view class="seller">
			<view class="title">卖方</view>
			<view class="detail">
				<img class='pic' :src="sellerImgUrl" alt="">
				<text class="txt">{{anonymity}}</text>
			</view>
		</view>
		<view class="rules">
			<view class="title">
				闪购规则
			</view>
			<view class="text">
				<view class="p">
					1. 发布闪购商品，定价后系统会根据所有玩家出价由低到高显示，买家自动购买最低出价商品。
				</view>
				<view class="p">
					2. 当出售价低于已有挂单的售价，将会以售价和对方直接成交。
				</view>
			</view>
		</view>
		<view class="pay-type">
			<view class="title">
				支付方式
			</view>
			<view class='wxpay pay-type-item' @click="changePayType('wx')">
				<view class="pay-icon"><img class='pic'
						src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/wx.png" alt=""></view>
				<text class="txt">微信支付</text>
				<view class="choose">
					<view class='active' v-show="payType=='wxPay'"><img class='pic'
							src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/choose-white.png" alt="">
					</view>
				</view>
			</view>
			<view class="sxpay pay-type-item" @click="changePayType('sx')">
				<view class="pay-icon"><img class='pic'
						src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/sx.png" alt=""></view>
				<text class="txt">手信支付</text>
				<view class="choose">
					<view class='active' v-show="payType=='sxPay'"><img class='pic'
							src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/choose-white.png" alt="">
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<button class="btn" @click="confirm">确认并支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "kimi",
				class2: "ki",
				class3: 2022,
				sellPrice: '95.0',
				buyNum: '',
				imgUrl: '/static/images/pro.png',
				amount: 1,
				averagePrice: 100.00,
				token: '',
				sellerImgUrl: '/static/images/admin.png',
				anonymity: '',
				sellerName:'123zxc',
				payType: 'wxPay',
			}
		},
		methods: {
			confirm() {},
			changePayType(e) {
				this.payType = e + 'Pay';
			},
			changeName() {
				this.anonymity = this.sellerName.replace(/./g, '*') + this.sellerName.charAt(this.sellerName.length - 1)
			},
		},
		mounted() {
			this.changeName()
		}
	}
</script>

<style lang="scss">
	.confirm-top {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		margin: 30rpx 30rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #E5E5E5;

		.img {
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
			overflow: hidden;
			margin-right: 20rpx;
		}

		.info {
			flex: 1;

			.name {
				font-size: 30rpx;
				color: #020202;
				line-height: 1;
			}

			.class {
				font-size: 24rpx;
				color: #807F7F;
				margin-top: 10rpx;
				line-height: 1;
			}

			.amount {
				margin-top: 25rpx;
				font-size: 22rpx;
				color: #595858;
				line-height: 1;
			}
		}

		.price {
			font-size: 30rpx;
			color: #FE0101;
		}
	}

	.title {
		width: 140rpx;
		font-size: 26rpx;
		color: #020202;
		line-height: 40rpx;
	}

	.seller {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		padding: 0 30rpx;
		height: 80rpx;

		.detail {
			.pic {
				width: 40rpx;
				height: 40rpx;
				border-radius: 20rpx;
				display: inline-block;
				vertical-align: bottom;
				margin-right: 10rpx;
			}
			.txt {
				font-size: 24rpx;
				color: #595858;
				line-height: 40rpx;
			}
		}
	}
	.rules{
		display: flex;
		flex-wrap: nowrap;
		padding: 0 30rpx 30rpx;
		
		.text {
			font-size: 26rpx;
			line-height: 40rpx;
			flex: 1;
			.p {
				margin-bottom: 10rpx;
			}
		}
	}
	
	.pay-type {
		border-top: 1rpx solid #E5E5E5;
		margin: 0 30rpx;
		padding: 30rpx 0 100rpx;
		.title{
			margin-bottom: 30rpx;
		}
		.pay-type-item {
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;

			.pay-icon {
				width: 32rpx;
				height: 32rpx;
			}

			.txt {
				flex: 1;
				margin-left: 15rpx;
				margin-right: 30rpx;
				font-size: 24rpx;
				color: #020202;
			}

			.choose {
				width: 36rpx;
				height: 36rpx;
				border-radius: 50%;
				border: 1rpx solid #FDB302;
				background-color: #FDF5E2;
				position: relative;
				overflow: hidden;

				.active {
					position: absolute;
					top: 0%;
					left: 0%;
					width: 100%;
					height: 100%;
					background-color: #FDB302;

					.pic {
						position: absolute;
						top: 50%;
						left: 50%;
						width: 16rpx;
						height: 11rpx;
						transform: translate(-50%, -50%);
					}

				}
			}
		}
	}

	.bottom {
		position: fixed;
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
</style>
