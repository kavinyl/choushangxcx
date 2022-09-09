<template>
	<view>
		<!-- 出售商品页面 -->
		<view class="releaseSellsHead">
			<!-- 商品基本信息 -->
			<view class="rSellsBase">
				<view class="rSellsBase-title">商品</view>
				<view class="rSellsBase-img"><img class="pic" :src="imgurl" alt="" @click="getSellsImg">
				</view>
				<view class="rSellsBase-info">
					<view class="sellsBase-name">
						{{name}}
					</view>
					<view class="sellsBase-class">
						{{class2}}-{{class3}}
					</view>
					<view class="sellsBase-has">
						我拥有{{ownNumber}}个
					</view>
				</view>
			</view>
			<view class="rSellsBase">
				<view class="rSellsBase-title">价格</view>
				<input v-model="sellPrice" class="rSellsBase-input" type="number" @blur="blur" placeholder="请输入金额" />
			</view>
			<view class="rSellsTips">成交均价{{averagePrice}}元</view>
			<view class="rSellsBase amount">
				<view class="rSellsBase-title">数量</view>
				<view class="goodsNum">
					<uni-number-box @change="changeValue" v-model="sellCount" :max="ownNumber" />
				</view>
			</view>
			<view class="rSellsTips">最多出售{{ownNumber}}个</view>
		</view>
		<!-- 出售规则 -->
		<view class="reRules ">
			<!-- 规则标题 -->
			<view class="sellRule">
				<view class="logo t-c">?</view>
					出售规则
			</view>
			<!-- 规则详情 -->
			<view class="text">
				<view class="p">
					1. 发布闪购商品，定价后系统会根据所有玩家出价由低到高显示，买价自动购买最低价商品
				</view>
				<view class="p">
					2. 当出售价低于已有挂单的售价，将会以售价和对方直接成交。
				</view>
			</view>
		</view>

		<!-- 确定发布按钮 -->
		<view class="bottom">
			<button class="btn" @click="confirm">确认</button>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				imgurl: '/static/images/admin.png',
				name: "kimi", //名称
				class2: 'ki',
				class3: 2022,
				ownNumber: 1, // 拥有数量
				sellPrice: '', // 售价
				sellCount: 1, // 售出数量
				averagePrice: 100.00
			};
		},
		onLoad() {

		},
		methods: {
			// 价格输入框正则判断
			blur(e) {
				this.sellPrice = Math.floor(e.detail.value * 100) / 100;
				if (this.sellPrice <= 0) {
					this.sellPrice = 0;
				}
			},
			// 确认提交
			Confirm() {

			},
			changeValue(value) {
				this.sellPrice = value;
			},
		},
		onShow() {
			// this.getReleaseSellsForm()
		}
	}
</script>

<style lang="scss">
	.releaseSellsHead {
		padding: 30rpx;

		.rSellsBase {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: flex-start;
			margin-bottom: 30rpx;

			.rSellsBase-title {
				font-size: 26rpx;
				width: 100rpx;
			}

			.rSellsBase-img {
				width: 120rpx;
				height: 120rpx;
				border-radius: 10rpx;
				background-color: #d8d6d6;
				overflow: hidden;
				margin-right: 20rpx;
			}

			.rSellsBase-info {
				.sellsBase-name {
					font-size: 30rpx;
					line-height: 30rpx;
					color: #020202;
				}

				.sellsBase-class {
					margin-top: 10rpx;
					font-size: 24rpx;
					line-height: 28rpx;
					color: #807f7f;
				}

				.sellsBase-has {
					margin-top: 20rpx;
					line-height: 28rpx;
					font-size: 24rpx;
					color: #807f7f;
				}
			}

			.rSellsBase-input {
				font-size: 24rpx;
				padding-left: 16rpx;
				background-color: #fdf3de;
				width: 592rpx;
				height: 88rpx;
				border-radius: 10rpx;
			}
			&.amount{
				margin-top: 20rpx;
			}
		}

		.rSellsTips {
			position: relative;
			top: -25rpx;
			margin-left: 100rpx;
			font-size: 24rpx;
			color: #646363;
		}
	}
	.reRules {
		padding: 0 30rpx;
		color: #5e5e5e;
		font-size: 26rpx;

		.sellRule {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.logo {
				width: 24rpx;
				height: 24rpx;
				border-radius: 50%;
				font-size: 20rpx;
				line-height: 22rpx;
				border: 1rpx solid #5E5E5E;
				margin-right: 10rpx;
			}
		}
		.text {
			margin: 15rpx;
			font-size: 26rpx;
			line-height: 36rpx;
			.p{
				margin-bottom: 10rpx;
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

	::v-deep .goodsNum .uni-numbox-btns {
		width: 51rpx;
		height: 50rpx;
		background-color: #fff !important;
		border: 1rpx solid #c1c1c1;
		border-radius: 8rpx 0 0 8rpx;

		.uni-numbox--text {
			font-size: 30rpx;
			color: #020202 !important;
		}
	}

	::v-deep .goodsNum .uni-numbox__plus {
		border-radius: 0 8rpx 8rpx 0;
	}

	::v-deep .goodsNum .uni-numbox__value {
		width: 48rpx;
		height: 50rpx;
		border-top: 1rpx solid #c1c1c1;
		border-bottom: 1rpx solid #c1c1c1;
		background-color: #F7F5F5 !important;
		margin: 0;
		box-sizing: border-box;
		border-radius: 0;

		.uni-input-input {
			font-size: 30rpx;
			color: #020202;
		}
	}
</style>
