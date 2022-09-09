<template>
	<view class="container">
		<view class="about" @click="toAbout">
			<text class="icon t-c">?</text>购买规则
		</view>
		<view class="card">
			<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/cards.png" alt="">
		</view>
		<view class="remain t-c">
			手信余额<view style="height: 30rpx;"></view>
			<text class="number">{{account.remain}}</text>
			份
		</view>
		<view class="toBill t-c" @click="toBill">
			点击查看手信账单明细>>
		</view>
		<view class="deposit btn t-c" @click="deposit">充值</view>
		<view class="withdrawal btn t-c" @click="withdrawal">提现</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: {}
			}
		},
		onShow() {
			this.token=uni.getStorageSync('token');
			this.getJson();
		},
		onPullDownRefresh() {
			this.getJson();
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		},
		methods: {
			getJson() {
				// 先从后台拿数据
				uni.request({
					// #ifdef H5
					url: "/static/fake.json",
					// #endif
					// #ifdef MP-WEIXIN
					url: "http://123.60.71.74:20001/"+'mh/user/currency/info',
					// #endif
					method: "GET",
					header:{
						'token':this.token
					},
					// #ifdef H5
					success: res => {
						this.account = res.data.user.account;
						// console.log(this.objToArr(res.data.user.address))
					},
					// #endif
					// #ifdef MP-WEIXIN
					success: res => {
						// console.log(data);
						this.account.remain = res.data.data.currencyAmount;
					}
					// #endif
				});
			},
			toBill() {
				uni.navigateTo({
					url:'bill'
				})
			},
			deposit() {
				uni.navigateTo({
					url:'deposit'
				})
			},
			withdrawal() {
				uni.navigateTo({
					url:'withdrawal'
				})
			},
			toAbout(){
				uni.navigateTo({
					url:"/pages/about/about"
				})
			}
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 30rpx;
	}
	.about{
		text-align: right;
		font-size: 26rpx;
		color: #5E5E5E;
		.icon{
			display: inline-block;
			border: 1px solid #5E5E5E;
			border-radius: 20rpx;
			width: 26rpx;
			height: 26rpx;
			font-size: 20rpx;
			margin-right: 10rpx;
		}
	}
	.card{
		width: 120rpx;
		height: 120rpx;
		background-color: #FCF5E3;
		border-radius: 60rpx;
		margin: 35rpx auto 45rpx;
		position: relative;
		.pic{
			width: 64rpx;
			height: 64rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
	}
	.remain{
		font-size: 26rpx;
		color: #020202;
		.number{
			font-size: 68rpx;
			margin-left: 30rpx;
		}
	}
	.toBill{
		color: #F9B002;
		font-size: 24rpx;
		margin-top: 55rpx;
	}
	.btn{
		width: 340rpx;
		height: 68rpx;
		border-radius: 34rpx;
		border: 1px solid #F9B002;
		margin: 15rpx auto;
		font-size: 26rpx;
		line-height: 66rpx;
	}
	.deposit{
		margin-top: 280rpx;
		color: #fff;
		background-color: #F9B002;
	}
	.withdrawal{
		background-color: #FCF5E3;
		color:#F9B002;
	}
</style>
