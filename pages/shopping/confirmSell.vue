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

			</view>
		</view>
		<view class="buyer-area">
			<view class="buyer-title">
				求购信息
			</view>
			<view class="buyer-infomation">
				<view class="border">
					<view class="title">
						求购者
					</view>
					<view class="detail">
						<img class="pic" :src="buyerImgUrl" alt="">
						<text class="txt">{{anonymity}}</text>
					</view>
				</view>
				<view class="border">
					<view class="title">
						求购者
					</view>
					<view class="detail">
						￥{{buyPrice}}
					</view>
				</view>
				<view class="border">
					<view class="title">
						求购数量
					</view>
					<view class="detail">
						{{buyAmount}}
					</view>
				</view>
				<view class="border">
					<view class="title">
						已冻结金额
					</view>
					<view class="detail">
						￥{{buyPrice*buyAmount}}
					</view>
				</view>
			</view>
		</view>
		<view class="deal-area">
			<view class="deal-title">
				交易信息
			</view>
			<view class="deal-information">
				<view class="border">
					<view class="title">
						闪出数量
					</view>
					<view class="detail">
						<input type="number" v-model="buyValue" placeholder="请输入数量" @blur="blur" class="input">
						<view class="tips">
							目前拥有商品{{hasAmount}}件
						</view>
					</view>
				</view>
				<view class="border price">
					<view class="title">
						交易金额
					</view>
					<view class="detail">
						<text class="txt">￥{{buyValue*buyPrice}}</text>
					</view>
				</view>
				<view class="border rules">
					<view class="title">
						闪出规则
					</view>
					<view class="detail">
						<view class="p">
							1. 发布闪购商品，定价后系统会根据所有玩家出价由低到高显示，买价自动购买最低价商品。
						</view>
						<view class="p">
							2. 当出售价低于已有挂单的售价，将会以售价和对方直接成交。
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<button class="btn" @click="confirm">确认交易</button>
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
				imgUrl: '/static/images/pro.png',
				buyerImgUrl: '/static/images/admin.png',
				buyPrice: '90.0',
				buyAmount: 5,
				buyValue: '',
				hasAmount: 2,
				anonymity: '',
				buyerName: '123qaz'
			}
		},
		methods: {
			blur(e) {
				this.buyValue=Math.floor(e.detail.value)
				if(this.buyValue<1){
					this.buyValuet=1;
				}else if(this.buyValue>this.hasAmount){
					this.buyValue=this.hasAmount
				}
			},
			changeName() {
				this.anonymity = this.buyerName.replace(/./g, '*') + this.buyerName.charAt(this.buyerName.length - 1)
			},
			confirm(){
				
			}
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
		padding: 30rpx 0 20rpx;
		margin: 0 30rpx;
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
				margin-bottom: 37rpx;
			}
		}
	}

	.buyer-area {
		padding: 25rpx 30rpx;

		.buyer-title {
			font-size: 30rpx;
			color: #020202;
			margin-bottom: 30rpx;
		}

		.border {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			margin-bottom: 20rpx;

			.title {
				font-size: 26rpx;
				color: #595858;
				line-height: 40rpx;
				width: 220rpx;
			}

			.detail {
				font-size: 26rpx;
				color: #595858;
				line-height: 40rpx;
				.pic{
					width: 40rpx;
					height: 40rpx;
					border-radius: 20rpx;
					display: inline-block;
					vertical-align: bottom;
					margin-right: 10rpx;
				}
			}
		}
	}
	.deal-area{
		margin: 0 30rpx;
		border-top: 1px solid #E5E5E5;
		padding: 20rpx 0 100rpx;
		.deal-title{
			font-size: 30rpx;
			color: #020202;
			margin-bottom: 30rpx;
		}
		.border{
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			margin-bottom: 20rpx;
			box-sizing: border-box;
			.title{
				font-size: 26rpx;
				color: #595858;
				line-height: 40rpx;
				width: 140rpx;
			}
			.detail{
				flex: 1;
				position: relative;
				.input{
					width: 550rpx;
					height: 88rpx;
					padding: 24rpx 15rpx;
					font-size: 24rpx;
					color: #595858;
					box-sizing: border-box;
					background-color: #FDF3DE;
					border-radius: 10rpx;
				}
				.tips{
					position: absolute;
					font-size: 24rpx;
					color: #646363;
					left: 10rpx;
					top: 98rpx;
				}
			}
		}
		.price{
			margin-top: 90rpx;
			.detail{
				font-size: 30rpx;
				color: #FE0101;
			}
		}
		.rules{
			margin-top: 40rpx;
			.title{
				align-self: flex-start;
			}
			.p{
					font-size: 26rpx;
					color: #595858;
					line-height: 40rpx;
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
