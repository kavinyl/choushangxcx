<template>
	<view>
		<view class="address-list" v-show="update">
			<view class="border" v-for="(item,index) in address" :key="index">
				<view class="info">
					<text class="name">
						{{item.customerName}}
					</text>
					<text class="phone">
						{{item.phone}}
					</text>
					<view style="height: 20rpx;"></view>
					<text class="location"><text class="default t-c" v-if="item.flagDefault">
							默认
						</text>
						{{item.province}}{{item.city}}{{item.area}}{{item.detail}}
					</text>
				</view>
				<view class="edit" @click="editAddress(item)">
					<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/edit.png" alt="">
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="btn t-c" @click="newAddress">
				新增地址
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				address: [],
				update: true,
				newID: 0,
			}
		},
		onLoad() {
			uni.getStorage({
				key: "token",
				success: (res) => {
					this.token = res.data;
					// console.log(this.token);
					this.getJson();
				}
			});
			// #ifdef H5
			this.getJson();
			// #endif
		},
		methods: {
			forceupdate() {
				this.update = false;
				this.update = true;
			},
			getJson() {
				// 先从后台拿数据
				uni.request({
					// #ifdef H5
					url: "/static/fake.json",
					// #endif
					// #ifdef MP-WEIXIN
					url: "http://123.60.71.74:20001/" + '/mh/user/address/list',
					// #endif
					method: "GET",
					dataType: "JSON",
					header: {
						'token': this.token
					},
					// #ifdef H5
					success: res => {
						this.address = res.data.user.address;
						console.log(this.address)
					},
					// #endif
					// #ifdef MP-WEIXIN
					success: res => {
						let data = JSON.parse(res.data);
						console.log(data);
						this.address = data.data;
					}
					// #endif
				});
			},
			newAddress() {
				uni.removeStorage({
					key: 'editAdd'
				})
				uni.navigateTo({
					url: "newaddress"
				})
			},
			// getnewID(){
			// 	// console.log(this.address);
			// 	var that=this;
			// 	var arr=[];
			// 	for(let i=0;i<this.address.length;i++){
			// 		// console.log(that.address[i]);
			// 		arr.push(that.address[i])
			// 	};
			// 	arr.sort(function(a,b){
			// 		return b.id-a.id
			// 	})
			// 	this.newID=arr[0].id+1;
			// 	// console.log(this.newID);
			// 	uni.setStorage({
			// 		key:"newID",
			// 		data:this.newID
			// 	})
			// },
			editAddress(item) {
				let add = new Object();
				add.name = item.customerName;
				add.phone = item.phone;
				add.city = item.city;
				add.detail = item.detail;
				add.location = item.location;
				add.default = item.flagDefault;
				add.id = item.id;
				uni.setStorage({
					key: "editAdd",
					data: add
				})
				// console.log(add);
				uni.navigateTo({
					url: "newaddress"
				})
			}
		},
		watch: {
			address: function(newVal, oldVal) {
				this.forceupdate();
				// this.getnewID();
			}
		}
	}
</script>

<style lang="scss">
	.address-list {
		padding-top: 1rpx;
		padding-bottom: 100rpx;

		.border {
			width: 100%;
			margin-top: -1rpx;
			border: 1rpx solid #F1F1F1;
			padding: 30rpx;
			position: relative;

			.info {
				margin-right: 100rpx;

				.name {
					font-size: 28rpx;
					color: #020202;
					margin-right: 30rpx;
				}

				.phone {
					font-size: 24rpx;
					color: #9F9E9E;
				}

				.location {
					font-size: 26rpx;
					color: #6B6B6B;
					line-height: 36rpx;
				}

				.default {
					background-color: #FDF5E2;
					color: #F9B002;
					width: 60rpx;
					height: 28rpx;
					line-height: 28rpx;
					font-size: 20rpx;
					border-radius: 20rpx;
					margin-top: 4rpx;
					margin-right: 10rpx;
					display: inline-block;
				}
			}

			.edit {
				position: absolute;
				right: 30rpx;
				top: 50%;
				width: 32rpx;
				height: 32rpx;
				transform: translateY(-50%);
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
