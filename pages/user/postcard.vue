<template>
	<view>
		<view class="container">
			<view class="about" @click="toAbout">
				<text class="icon t-c">?</text>购买规则
			</view>
		</view>

		<view class="cards">
			<view v-for="(item,index) in postcards" :key="index" class="border">
				<view class="cards-img">
					<img :src="item.imgUrl" class="pic" alt="">
				</view>
				<view class="cards-price">
					{{item.price}}
				</view>
				<view class="cards-amount">
					× {{item.amount}} 张
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				postcards: [],
				token: ''
			}
		},
		onShow() {
			uni.getStorage({
				key: 'token',
				success: (res) => {
					this.token = res.data;
					this.getJson();
				}
			})
		},
		methods: {
			getJson() {
				// 先从后台拿数据
				uni.request({
					// #ifdef H5
					url: "/static/fake.json",
					// #endif
					// #ifdef MP-WEIXIN
					url: "http://123.60.71.74:20001/" + "mh/user/postcard/list",
					// #endif
					method: "GET",
					header: {
						'token': this.token
					},
					// #ifdef H5
					success: res => {
						this.postcards = res.data.user.postcards;
						// console.log(this.objToArr(res.data.user.address))
					},
					// #endif
					// #ifdef MP-WEIXIN
					success: res => {
						// console.log(data);
						this.postcards = res.data.data;
					}
					// #endif
				});
			},
			toAbout() {
				uni.navigateTo({
					url: "/pages/about/about"
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 30rpx;
	}

	.about {
		text-align: right;
		font-size: 26rpx;
		color: #5E5E5E;

		.icon {
			display: inline-block;
			border: 1px solid #5E5E5E;
			border-radius: 20rpx;
			width: 26rpx;
			height: 26rpx;
			font-size: 20rpx;
			margin-right: 10rpx;
		}
	}

	.cards {
		margin-top: 25rpx;
		padding: 0 60rpx;

		.border {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			margin-bottom: 25rpx;
			justify-content: space-between;

			.cards-img {
				width: 408rpx;
				height: 126rpx;
			}

			.cards-price {
				font-size: 34rpx;
				color: #020202;
			}

			.cards-amount {
				font-size: 30rpx;
				border-left: 1rpx solid #E7E7E6;
				padding-left: 30rpx;
			}
		}
	}
</style>
