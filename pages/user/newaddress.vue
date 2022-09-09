<template>
	<view class="form">
		<form ref="addressForm" @submit="formSubmit">
			<view class="border">
				<text class="title">收货人</text>
				<input class="input" type="text" placeholder="请输入姓名" name='name' v-model="addName">
			</view>
			<view class="border">
				<text class="title">联系电话</text>
				<input class="input" type="number" placeholder="请输入联系电话" name='phone' maxlength="11" v-model="addPhone">
			</view>
			<view class="border address-city">
				<text class="title">所在地区</text>
				<uni-data-picker class="city" placeholder="请选择地址" popup-title="请选择城市" collection="opendb-city-china"
					field="code as value, name as text" orderby="value asc" :step-searh="true" self-field="code"
					parent-field="parent_code" @change="onchange" @nodeclick="onnodeclick" v-model="addCity">
				</uni-data-picker>
			</view>
			<view class="border address-detail">
				<text class="title">详细地址</text>
				<textarea class="input" placeholder="请输入详细地址" name="detail" v-model="addDetail"
					placeholder-style="line-height:40rpx"></textarea>
			</view>
			<view class="border set-default">
				<text class="title">设为默认地址</text>
				<view class="btn" @click="setDefault">
					<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/choose.png"
						v-if="addDefault">
				</view>
			</view>

			<view class="bottom">
				<button v-if="isAdd" class="btn t-c" form-type="submit">
					保存地址
				</button>
				<button v-if="!isAdd" class="btn t-c" form-type="submit">
					更新地址
				</button>
				<view v-if="!isAdd" class="del t-c" @click="delAddress">
					<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/del.png">删除
				</view>
			</view>
		</form>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				newAddress: {},
				isAdd: true,
				addName: '',
				addPhone: '',
				addCity: '',
				addDetail: '',
				addDefault: false,
				province: '',
				city: '',
				area: '',
				alert: '',
				textpl: true,
				token: '',
				id: ''
			}
		},
		onLoad() {
			uni.getStorage({
				key: "editAdd",
				success: res => {
					this.addName = res.data.name;
					this.addPhone = res.data.phone;
					// this.addCity = res.data.city;
					this.addDetail = res.data.detail;
					this.addDefault = res.data.default;
					this.id = res.data.id;
					this.isAdd = false;
				}
			})
			uni.getStorage({
				key: 'token',
				success: res => {
					this.token = res.data
				}
			})
		},
		methods: {
			onchange(e) {
				const value = e.detail.value;
				this.province = value[0].text;
				this.city = value[1].text;
				this.area = value[2].text;
			},
			onnodeclick(node) {},
			setDefault() {
				this.addDefault = !this.addDefault;
			},
			formSubmit(e) {
				var that = this;
				var data = e.detail.value;
				// console.log(data);
				if (this.check()) {
					if (that.isAdd) {
						uni.request({
							url: "http://123.60.71.74:20001/" + 'mh/user/address/add',
							method: 'POST',
							header: {
								'token': that.token,
								'Content-Type': 'application/json	'
							},
							data: {
								customerName: data.name,
								phone: data.phone,
								province: that.province,
								city: that.city,
								area: that.area,
								detail: data.detail,
								flagDefault: Number(that.addDefault)
							},
							success: (res) => {
								console.log(res)
							}
						})
					} else {
						uni.request({
							url: "http://123.60.71.74:20001/" + 'mh/user/address/update',
							method: 'PUT',
							header: {
								'token': that.token,
								'Content-Type': 'application/json	'
							},
							data: {
								id:that.id,
								customerName: data.name,
								phone: data.phone,
								province: that.province,
								city: that.city,
								area: that.area,
								detail: data.detail,
								flagDefault: Number(that.addDefault)
							},
							success: (res) => {
								console.log(res)
							}
						})
					}
					that.back();
				}
				uni.removeStorage({
					key: "editAdd"
				})
			},
			back(){
				setTimeout(
					function() {
						uni.navigateBack({
							url: 'address',
							success: (res) => {
								let page = getCurrentPages().pop();
								if (page) {
									page.onLoad(page.forceupdate)
								}
							}
						})
					}, 1000
				);
			},
			check() {
				let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (!this.addName) {
					uni.showToast({
						title: "请输入收货人姓名",
						icon: "none"
					})
					return false
				} else if (!this.addPhone) {
					uni.showToast({
						title: "请输入联系电话",
						icon: "none"
					})
					return false
				} else if (!reg.test(this.addPhone)) {
					uni.showToast({
						title: "请输入正确的手机号",
						icon: "none"
					})
					return false
				} else if (!this.addCity) {
					uni.showToast({
						title: "请输入所在地区",
						icon: "none"
					})
					return false
				} else if (!this.addDetail) {
					uni.showToast({
						title: "请输入详细地址",
						icon: "none"
					})
					return false
				} else {
					return true
				}
			},
			delAddress() {
				uni.request({
					url: "http://123.60.71.74:20001/" + 'mh/user/address/delete' + '?userAddressIdList=' + this.id,
					method: "PUT",
					header:{
						'token':this.token
					},
					success: (res) => {
						console.log(res)
						this.back()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.form {
		.border {
			width: 100%;
			height: 120rpx;
			border-bottom: 1rpx solid #D2D2D2;
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			padding: 0 30rpx;

			.title {
				width: 150rpx;
				font-size: 26rpx;
				color: #020202;
				height: 40rpx;
				line-height: 40rpx;
			}

			.input {
				font-size: 26rpx;
				color: #020202;
				width: 550rpx;
				height: 40rpx;
			}

		}

		.address-detail {
			height: 200rpx;
			align-items: flex-start;
			padding-top: 45rpx;

			.input {
				height: 100rpx;
				line-height: 40rpx;
			}
		}

		.city {
			flex: 1;
		}

		.set-default {
			.title {
				flex: 1;
			}

			.btn {
				width: 46rpx;
				height: 46rpx;
				border-radius: 10rpx;
				background-color: #FDF3DE;
				border: 1rpx solid #F9B002;
				position: relative;

				.pic {
					width: 32rpx;
					height: 23rpx;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}
	}

	::v-deep .placeholder,
	::v-deep .uni-scroll-view-content {
		font-size: 26rpx !important;
	}

	::v-deep .input-value {
		height: 40rpx !important;
		padding: 0 !important;
	}

	::v-deep .input-value-border {
		border: 0 !important;
	}

	::v-deep .input-arrow {
		width: 14rpx;
		height: 14rpx;
	}

	::v-deep .dialog-title {
		font-size: 28rpx;
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

		.del {
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);
			font-size: 26rpx;
			color: #5E5E5E;
			line-height: 30rpx;

			.pic {
				width: 30rpx;
				height: 30rpx;
				float: left;
				margin-right: 10rpx;
			}
		}
	}
</style>
