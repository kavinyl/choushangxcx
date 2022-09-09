<template>
	<view class="user">
		<view class="user-info login" v-if="!isLogin">
			<img class="pic" src="/static/images/admin.png" alt="">
			<button class="login-btn" type="primary" @click="getUserInfo">微信登录</button>
		</view>
		<view class="user-info" v-if="isLogin">
			<img class="pic" :src="userInfo.avatarUrl" alt="">
			<text class="user-name">{{userInfo.nickName}}</text>
		</view>
		<view class="nav">
			<view class="nav-item" @click="toPage('/pages/user/fav')">
				<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/fav.png" alt="">
				<text class="txt">我的收藏</text>
			</view>
			<view class="nav-item" @click="toPage('/pages/user/account')">
				<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/bookmark.png" alt="">
				<text class="txt">我的账户</text>
			</view>
			<view class="nav-item" @click="toPage('/pages/user/history')">
				<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/history.png" alt="">
				<text class="txt">开赏记录</text>
			</view>
			<view class="nav-item" @click="toPage('/pages/user/address')">
				<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/location.png" alt="">
				<text class="txt">收货地址</text>
			</view>
		</view>
		<view class="adbanner">
			<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/ad.png" alt="">
		</view>
		<view class="postcard cards" @click="toPage('/pages/user/postcard')">
			<view class="cards-left">
				<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/order.png" alt="">
			</view>
			<view class="cards-txt">
				我的明信片
			</view>
			<view class="cards-arrow">
				<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/arrow.png" alt="">
			</view>
		</view>
		<view class="service cards">
			<view class="cards-left">
				<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/service.png" alt="">
			</view>
			<view class="cards-txt">
				<button class="btn t-l" open-type="contact" type="default">微信客服</button>
			</view>
			<view class="cards-arrow">
				<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/arrow.png" alt="">
			</view>
		</view>
		<view class="agree cards" @click="toPage('/pages/about/agreements')">
			<view class="cards-left">
				<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/agree.png" alt="">
			</view>
			<view class="cards-txt">
				用户协议
			</view>
			<view class="cards-arrow">
				<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/arrow.png" alt="">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				token: '',
				code: '',
				// encryptedData: '',
				// iv: '',
				// signature: '',
				userInfo: ''
			}
		},
		onShow() {
			this.checkToken()
		},
		methods: {
			checkToken() {
				uni.request({
					url: "http://123.60.71.74:20001/" + "wx/mini/user/check",
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': uni.getStorageSync('token')
					},
					success: (res) => {
						console.log('token', res)
						if(res.data.code=='555'||res.data.code=='556'){
							uni.showToast({
								title:'登录过期！',
								icon:'error'
							})
							this.isLogin=false
						}else{
							uni.setStorage({
								key:'token',
								data:res.data.data
							})
							this.isLogin=true;
							this.userInfo=uni.getStorageSync('userInfo');
						}
					}
				})
			},
			toPage(url) {
				if (this.isLogin) {
					uni.navigateTo({
						"url": url
					})
				} else {
					uni.showToast({
						title: "请先登录",
						icon: "none"
					})
				}
			},
			getUserInfo() {
				//#ifndef MP-WEIXIN
				this.isLogin = true;
				uni.setStorage({
					key:'token',
					data:'1'
				})
				return
				//#endif

				var that = this;
				uni.showLoading({
					title: '加载中'
				});
				uni.getUserProfile({
					desc: '登录后可同步数据',
					success: async (obj) => {
						console.log('obj', obj);
						this.userInfo = obj.userInfo;
						uni.setStorageSync('userInfo',this.userInfo);
						uni.login({
							provider: 'weixin',
							success: (res) => {
								console.log('res-login', res);
								that.code = res.code;
								if (res.errMsg == 'login:ok') {
									//https://www.jb51.net/article/233578.htm
									uni.request({
											url: 'http://123.60.71.74:20001/' +
												'/wx/mini/user/login/?code=' + this.code,
											data: {
												code: that.code,
												nickName: that.userInfo.nickName,
												avatarUrl: that.userInfo.avatarUrl
											},
											method: "POST"
										})
										.then((res) => {
											console.log(res);
											if (res.data.code == 500) {
												that.getUserInfo()
											} else if (res.statusCode == 200) {
												that.token = res.data.data;
												uni.setStorage({
													key: "token",
													data: that.token
												});
												this.isLogin = true;
											}
										})
									console.log('success');
								}
							}
						})
					},
					fail: () => {
						uni.showToast({
							title: "请重试",
							icon: "error",
							mask: true
						})
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			}
		},
		watch: {

		}
	}
</script>

<style lang="scss">
	.user {
		min-height: 1000rpx;
	}

	.user-info {
		padding: 25rpx 50rpx 30rpx;
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;

		.pic {
			width: 120rpx;
			height: 120rpx;
			margin-right: 30rpx;
			border-radius: 50%;
		}

		.user-name {
			font-size: 32rpx;
			color: #000;
		}
	}

	.login {
		.pic {
			width: 80rpx;
			height: 80rpx;
		}
	}

	.login-btn {
		margin-left: 0;
		width: 300rpx;
		height: 56rpx;
		font-size: 22rpx;
		line-height: 56rpx;
	}

	.nav {
		width: 100%;
		padding: 0 60rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.nav-item {
			width: 290rpx;
			height: 78rpx;
			border: 1rpx solid #FAC74B;
			border-radius: 15rpx;
			background-color: #FCF5E3;
			margin-bottom: 30rpx;
			text-align: center;
			padding: 14rpx;

			.pic {
				width: 48rpx;
				height: 48rpx;
				display: inline-block;
				vertical-align: bottom;
				margin-right: 10rpx;
			}

			.txt {
				font-size: 26rpx;
				line-height: 48rpx;
				color: #000;
				display: inline-block;
			}
		}
	}

	.adbanner {
		margin: 0 auto 20rpx;
		width: 690rpx;
		height: 120rpx;
	}

	.cards {
		width: 690rpx;
		height: 108rpx;
		background-color: #fff;
		box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, 0.2);
		margin: 20rpx auto;
		border-radius: 15rpx;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		padding: 0 25rpx 0 40rpx;

		.cards-txt {
			flex: 1;
			margin-left: 20rpx;
			font-size: 26rpx;
			color: #000;

			.btn {
				background-color: transparent;
				color: inherit;
				font-size: inherit;
				border: none;
				padding: 0;

				&:after {
					display: none;
				}
			}
		}

		.cards-left {
			width: 32rpx;
			height: 32rpx;

		}

		.cards-arrow {
			width: 10rpx;
			height: 18rpx;
		}
	}
</style>
