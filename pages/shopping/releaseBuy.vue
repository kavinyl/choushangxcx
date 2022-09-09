<template>
	<view>
		<!-- 发布收购页面 -->
		<view class="releaseSellsHead">
			<!-- 商品基本信息 -->
			<view class="rBuyBase">
				<view class="rBuyBase-title">商品</view>
				<view class="rBuyBase-img"><img class="rBuyBase-pic" :src="imgUrl" alt=""></view>
				<view class="rBuyBase-info">
					<view class="sellsBase-name">
						{{name}}
					</view>
					<view class="sellsBase-class">
						{{class2}}-{{class3}}
					</view>
				</view>
			</view>

			<view class="rBuyBase">
				<view class="rBuyBase-title">价格</view>
				<input v-model="buyPrice" class="rBuyBase-input" type="number" placeholder="请输入金额" @blur="blur" />
			</view>
			<view class="rSellsTips">成交均价{{averagePrice}}元</view>

			<view class="rBuyBase">
				<view class="rBuyBase-title">数量</view>
				<input v-model="buyNum" class="rBuyBase-input" type="number" placeholder="请输入数量" @blur="blur2" />

			</view>

		</view>

		<view class="rBuyBaseRPrice">
			本次收购需要冻结的金额为 ：<text class="text">￥{{buyPrice*buyNum}}</text>
		</view>
		<!-- 收购规则 -->
		<view class="reRules">
			<!-- 规则标题 -->
			<view class="buyRule">
				<view class="logo t-c">?</view>
				<view>
					收购规则
				</view>
			</view>
			<!-- 规则详情 -->
			<view class="text">
				<view class="p">
					1. 发布收购，发布后系统会根据所有挂单售价由高到低显示，当有卖家选择闪购，自动按照最高价成交。
				</view>
				<view class="p">
					2. 发布收购需要冻结您全部收购单金额的余额，余额不足时需充值。
				</view>
				<view class="p">
					3. 冻结余额在成功收购时直接付给卖家。
				</view>
				<view class="p">
					4. 当收购价高于已有挂单的售价，将会以售价和对方直接成交。
				</view>
				<view class="p">
					5. 发取消收购时解除冻结可提现。
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
				name: "kimi",
				class2: "ki",
				class3: 2022,
				buyPrice: '',
				buyNum: '',
				imgUrl: '/static/images/admin.png',
				averagePrice: 100.00,
				token: '',
				currency: 0
			};
		},
		onLoad() {

		},
		methods: {
			blur(e) {
				this.buyPrice = Math.floor(e.detail.value * 100) / 100;
				if (this.buyPrice <= 0) {
					this.buyPrice = 0
				}
			},
			blur2(e) {
				this.buyNum = Math.floor(e.detail.value);
				if (this.buyNum <= 0) {
					this.buyNum = 1
				}
			},
			confirm() {
				if(this.checkCurrency()&&this.checkNumber()){
					uni.showToast({
						title:'success',
						icon:"success"
					})
				}else{
					return
				}
			},
			getUserCurrency() {
				uni.request({
					url: "http://123.60.71.74:20001/" + 'mh/user/currency/info',
					method: "GET",
					dataType: "JSON",
					header: {
						'token': this.token
					},
					success: res => {
						let data = JSON.parse(res.data);
						// console.log(data);
						this.currency = data.data.currencyAmount;
					}
				});
			},
			checkCurrency() {
				if(this.currency>=this.buyNum*this.buyPrice){
					return true
				}else{
					uni.showToast({
						title:'请充值!',
						icon:"error"
					})
					setTimeout(function(){
						uni.switchTab({
							url:'/pages/user'
						})
					},1000)
					return false
				}
			},
			checkNumber(){
				if(this.buyPrice>0&&this.buyNum>0){
					return true
				}else if(this.buyPrice==0){
					uni.showToast({
						title:'价格错误!',
						icon:"error"
					})
					return false
				}else if(this.buyNum==0){
					uni.showToast({
						title:'数量错误!',
						icon:"error"
					})
					return false
				}
			}
		},
		onShow() {
			uni.getStorage({
				key: 'token',
				success: (res) => {
					this.token = res.data
					this.getUserCurrency()
				}
			})
		}
	}
</script>

<style lang="scss">
	.releaseSellsHead {
		padding: 30rpx;

		.rBuyBase {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: flex-start;
			margin-bottom: 30rpx;

			.rBuyBase-title {
				font-size: 26rpx;
				width: 100rpx;
			}

			.rBuyBase-img {
				width: 120rpx;
				height: 120rpx;
				border-radius: 10rpx;
				background-color: #d8d6d6;
				overflow: hidden;
				margin-right: 20rpx;
			}

			.rBuyBase-info {
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
					margin-bottom: 48rpx;
				}
			}

			.rBuyBase-input {
				font-size: 24rpx;
				padding-left: 16rpx;
				background-color: #fdf3de;
				width: 592rpx;
				height: 88rpx;
				border-radius: 10rpx;
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

	.rBuyBaseRPrice {
		padding: 0 30rpx;
		font-size: 26rpx;
		color: #020202;

		.text {
			color: #fe0101;
			font-size: 32rpx;
		}
	}

	.reRules {
		margin-top: 80rpx;
		padding: 0 30rpx 100rpx;
		color: #5e5e5e;
		font-size: 26rpx;

		.buyRule {
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

			.p {
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
</style>
