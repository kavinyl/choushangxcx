<template>
	<view class="container">
		<form @submit="formSubmit" ref="withdrawal">
			<view class="title">
				提现至微信钱包
			</view>
			<view class="money">
				<text class="rmb">￥</text> <input focus v-model="withdrawal" name='withdrawal' type="number" class="input" @blur="blur($event)">
			</view>
			<view class="tips">当前可提现金额 ￥ {{account.remain}}</view>
			<button class="btn t-c" form-type="submit">提现</button>
		</form>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				withdrawal: '',
				account:{}
			}
		},
		onLoad() {
			this.getJson()
		},
		methods: {
			blur(e){
				var that=this;
				this.withdrawal=Math.floor(e.detail.value * 100) / 100;
				if(that.withdrawal<=0){
					that.withdrawal=0;
					uni.showToast({
						title:"请输入提现金额",
						icon:"none"
					})
				}else if(that.withdrawal>that.account.remain){
					that.withdrawal=that.account.remain;
					uni.showToast({
						title:"最多可提现"+that.account.remain+"元",
						icon:"none"
					})
				}
			},
			post(){
				uni.showToast({
					title:"提现成功"+this.withdrawal+"元",
					icon:"none"
				})
			},
			formSubmit() {
				if(this.withdrawal){
					this.post();
				}
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
						this.account = res.data.user.account;
						// console.log(this.objToArr(res.data.user.address))
					},
					// #endif
					// #ifdef MP-WEIXIN
					success: res => {
						// console.log(res.data);
						let data = JSON.parse(res.data)
						this.account = data.user.account;
					}
					// #endif
				});
			},
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20rpx 60rpx;
	}

	.title {
		font-size: 28rpx;
		color: #020202;
	}

	.btn {
		width: 340rpx;
		height: 68rpx;
		border-radius: 34rpx;
		margin: 60rpx auto 0;
		font-size: 26rpx;
		line-height: 68rpx;
		background-color: #F9B002;
		color: #fff;
		
	}

	.money {
		padding-bottom: 60rpx;
		border-bottom: 1px solid #DCDCDC;
		margin-top: 80rpx;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;

		.rmb {
			font-size: 80rpx;
			line-height: 80rpx;
		}
		.input{
			width: 500rpx;
			height: 80rpx;
			font-size: 80rpx;
			line-height: 80rpx;
		}
	}
	.tips{
		font-size: 24rpx;
		color: #6F6D6D;
		line-height: 50rpx;
	}
</style>
