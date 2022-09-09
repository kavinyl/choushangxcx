<template>
	<view class="resultAll">
		<img class='resultAllbg' src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/gashapon/resall.png" alt="">

		<view class='border' v-for="(item,index) in amount" :key="item.idx">
			<view class="result-img">
				<img class='pic' :src="item.imgUrl" alt="">
				<view class="result-type t-c">{{item.itemTypeName}}</view>
				<view class="result-amount t-c">x {{item.value}}</view>
			</view>
			<text class='result-name'>{{item.productItemName}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resultList: [],
				amount: [],
			}
		},
		onShow() {
			uni.getStorage({
				key:'result',
				success: (res) => {
					this.resultList=res.data
					this.calc();
				}
			})
		},
		methods: {
			calc() {
				var that = this;
				that.resultList.sort(function(a,b){
					var x=a.productItemCode.toLowerCase();
					var y=b.productItemCode.toLowerCase();
					if(x<y){return -1;}
					if(x>y){return 1;}
					return 0;
				});
				console.log(that.resultList);
				for (let i = 0; i < that.resultList.length;) {
					var times = 0;
					for (let n = i ; n < that.resultList.length; n ++) {
						if (that.resultList[i].productItemCode === that.resultList[n].productItemCode) {
							times++;
						}
					}
					that.resultList[i]["value"] = times;
					that.amount.push(that.resultList[i]);
					i += times;
				};
			}
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
	.resultAll {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: flex-start;
		padding: 30rpx 45rpx;
		width: 750rpx;
		height: 100%;

		.resultAllbg {
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: -1;
		}

		.border {
			width: 300rpx;
			height: 410rpx;

			.result-img {
				position: relative;
				width: 300rpx;
				height: 300rpx;
				border-radius: 10rpx;
				overflow: hidden;

				.result-type {
					position: absolute;
					width: 55rpx;
					height: 55rpx;
					left: 0;
					top: 0;
					background-color: #020202;
					color: #F9B002;
					font-size: 34rpx;
					line-height: 55rpx;
					border-radius: 10rpx;
				}

				.result-amount {
					position: absolute;
					width: 95rpx;
					height: 55rpx;
					right: 0;
					bottom: 0;
					background-color: #020202;
					color: #F9B002;
					font-size: 34rpx;
					line-height: 55rpx;
					border-radius: 10rpx;
				}
			}

			.result-name {
				font-size: 30rpx;
				color: #020202;
				line-height: 40rpx;
				margin-top: 5rpx;
			}
		}
	}
</style>
