<template>
	<view>
		<!-- 1.交易赏品 -->
		<view class="deal-list">
			<view class="title">交易赏品</view>
			<view class="border" v-for="(item,index) in dealList" :key="index" v-show="update&&item.isdeal">
				<img class="pic" :src="item.imgUrl" alt="">
			</view>
		</view>
		<!-- 表单 -->
		<form ref='dealForm' @submit="formSubmit" @reset="formReset">
			<!-- 2.求购赏品 -->
			<view class="wishlist">
				<view class="wishlist-title">
					求购赏品
				</view>
				<view class="wishlist-switch" @click="wishShow">
					<img class="pic" v-show="hasWish"
						src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/gou2.png" alt="">
				</view>
				<view class="wishlist-form" v-show="hasWish">
					<view class="wish-goods">
						<view class="border" v-for="(item,index) in wishList" :key="index">
							<img class="pic" :src="item.img" alt="">
						</view>
						<view class="add" @click="addWish">
							<img class='pic' src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/add.png"
								alt="">
						</view>
					</view>
					<view class="wish-price form-item">
						<text class="txt">加钱换购</text>
						<input class="input" type="number" name='wishprice' v-model="wishPrice" placeholder="请输入金额"
							placeholder-class='input-default' @blur="blur('wishPrice',$event)">
					</view>
				</view>
			</view>

			<!-- 3.报价 -->
			<view class="sell-price">
				<view class="oneprice form-item">
					<text class="txt">一口价</text>
					<input class="input" type="number" name='oneprice' v-model="onePrice" placeholder="请输入金额"
						placeholder-class='input-default' @blur="blur('onePrice',$event)">
				</view>
				<view class="lowprice form-item">
					<text class="txt">最低价</text>
					<input class="input" type="number" name='lowprice' v-model="lowPrice" placeholder="请输入金额"
						placeholder-class='input-default' @blur="blur('lowPrice',$event)">
				</view>
				<view class="message form-item">
					<text class="txt">说点什么</text>
					<textarea class="textarea" name="message" v-model="message" placeholder="请输入文字描述,最多30个字"
						maxlength="30" placeholder-class='input-default'></textarea>
				</view>
			</view>

			<!-- 4.底部 -->
			<view class="publish-bottom">
				<button class="submit t-c" form-type="submit">发布交易</button>
				<button class="reset t-c" form-type="reset">取消发布</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dealList: [],
				hasWish: false,
				wishList: [],
				wishPrice: '',
				onePrice: '',
				lowPrice: '',
				message: '',
				alert: '',
				update: true,
				changeArr: [],
			}
		},
		onLoad() {
			this.getJson();
		},
		methods: {
			formSubmit(e) {
				var that = this;
				var data = JSON.stringify(e.detail.value);
				if (this.check(data)) {
					console.log(JSON.stringify(e.detail.value), this.wishList);
					uni.showToast({
						title: '发布成功',
						icon: 'none'
					});
					setTimeout(
						function() {
							uni.navigateBack({
								delta:1
							});
						}, 1000
					);
				} else {
					uni.showToast({
						title: that.alert,
						icon: 'none'
					})
				};
			},
			formReset(e) {
				console.log('清空数据');
				uni.navigateTo({
					url: 'bag'
				});
			},
			addWish() {
				this.wishList.push({
					id: 1,
					type: '终',
					img: 'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/pro_19.png',
					name: '戴珍珠耳环的少女',
					time: '1656306794497',
					group: 0,
					sort: 'spot',
					inBag: true,
					recover: false,
					choose: false,
					price: 58.0,
					point: 20,
					class1: '大分类A',
					class2: '大分类A-分类a',
					class3: '大分类A-分类a-品类1',
					isdeal: true,
				})
			},
			wishShow() {
				this.wishList = this.hasWish ? [] : this.wishList;
				this.hasWish = !this.hasWish;
			},
			check(data) {
				var that = this;
				if (that.hasWish && that.wishList.length == 0) {

					that.alert = '求购赏品为空';
					return false
				} else if (that.hasWish && that.wishPrice == '') {
					that.alert = '请输入金额';
					return false
				} else if (that.onePrice == '' || that.lowPrice == '') {
					that.alert = '请输入金额';
					return false
				} else if(that.onePrice<=that.lowPrice){
					that.alert = '一口价须大于最低价';
					return false
				} else {
					return true
				}
			},
			blur(a, event) {
				var that = this;
				switch (a) {
					case 'onePrice':
						that.onePrice = Math.floor(event.detail.value * 100) / 100;
						break;
					case 'wishPrice':
						that.wishPrice = Math.floor(event.detail.value * 100) / 100;
						break;
					case 'lowPrice':
						that.lowPrice = Math.floor(event.detail.value * 100) / 100;
						break;
					default:
						console.log(a);
						break;
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
						// console.log(res.data.list);
						this.dealList = res.data.list;
						// console.log(this.dealList);
					},
					// #endif
					// #ifdef MP-WEIXIN
					success: res => {
						// console.log(res.data);
						let data = JSON.parse(res.data)
						this.dealList = data.list;
					}
					// #endif
				});
			},
			forceupdate() {
				this.update = false;
				this.update = true;
			},
		},
		mounted() {
			var that = this;

		},
		watch: {
			onePrice(newval, oldval) {
				var that = this;
				if (newval < 0) {
					that.onePrice = 0;
				}
			},
			wishPrice(newval, oldval) {
				var that = this;
				if (newval < 0) {
					that.wishPrice = 0;
				}
			},
			lowPrice(newval, oldval) {
				var that = this;
				if (newval < 0) {
					that.wishPrice = 0;
				}
			},
			dealList: function(newVal, oldVal) {
				console.log('列表更新');
				this.forceupdate();
				this.dealList.sort(function(a, b) {
					return a.id - b.id
				});
			}
		}

	}
</script>

<style lang="scss">
	.deal-list {
		padding: 0 20rpx;
		width: 100%;
		margin-top: 10rpx;
		display: flex;
		flex-wrap: wrap;

		.title {
			font-size: 26rpx;
			color: #020202;
			line-height: 60rpx;
			width: 100%;
			padding-left: 10rpx;
		}

		.border {
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
			margin: 10rpx;
		}
	}

	.wishlist {
		width: 100%;
		background-color: #FEFCF6;
		padding: 30rpx;
		position: relative;
		margin-top: 15rpx;

		.wishlist-title {
			font-size: 26rpx;
			color: #020202;
			line-height: 46rpx;
		}

		.wishlist-switch {
			position: absolute;
			right: 30rpx;
			top: 30rpx;
			width: 46rpx;
			height: 46rpx;
			background-color: #FDF3DE;
			border: 1rpx solid #F9B002;
			border-radius: 10rpx;

			.pic {
				width: 22rpx;
				height: 18rpx;
				margin: 13rpx auto;
			}
		}

		.wishlist-form {
			.wish-goods {
				margin: 15rpx -10rpx 0;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;

				.border,
				.add {
					width: 120rpx;
					height: 120rpx;
					border-radius: 10rpx;
					background-color: #FDF3DE;
					margin: 10rpx;
				}

				.add .pic {
					margin: 39rpx auto;
					width: 42rpx;
					height: 42rpx;
				}
			}
		}
	}

	.form-item {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		width: 100%;
		align-items: center;
		margin-top: 20rpx;

		.txt {
			font-size: 26rpx;
			color: #020202;
		}

		.input {
			background-color: #FDF3DE;
			width: 515rpx;
			height: 90rpx;
			border-radius: 10rpx;
			margin-right: 55rpx;
			padding: 0 20rpx;
			font-size: 32rpx;
			color: #020202;
			box-sizing: border-box;
		}
	}

	::v-deep .input-default {
		font-size: 24rpx;
		color: #897862;
	}

	.sell-price {
		padding: 0 30rpx 100rpx;

		.message .txt {
			align-self: flex-start;
			margin-top: 25rpx;
			line-height: 35rpx;
		}

		.textarea {
			width: 515rpx;
			height: 190rpx;
			padding: 25rpx 20rpx;
			margin-right: 55rpx;
			background-color: #FDF3DE;
			box-sizing: border-box;
			border-radius: 10rpx;
			line-height: 35rpx;
			margin-bottom: 20rpx;
			font-size: 32rpx;
			color: #020202;
		}
	}

	.publish-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		border-top: 1rpx solid #F7F7F7;
		background-color: #fff;

		.submit {
			margin: 16rpx auto;
			width: 340rpx;
			height: 68rpx;
			border-radius: 34rpx;
			font-size: 26rpx;
			color: #fff;
			line-height: 68rpx;
			background-color: #F9B002;

			&:after {
				display: none;
			}
		}

		.reset {
			position: absolute;
			right: 30rpx;
			top: 16rpx;
			background-color: transparent;
			font-size: 26rpx;
			color: #5E5E5E;
			line-height: 68rpx;

			&:after {
				display: none;
			}
		}
	}
</style>
