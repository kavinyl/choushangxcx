<template>
	<view>
		<view class="search-top-area">
			<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" placeholder='搜索关键词'
				cancelButton='none' @blur="blur" @focus="focus" @cancel="cancel" @input="input">
			</uni-search-bar>
			<view class="search-right" @click="search">搜索</view>
		</view>
		<view class="search-auto" v-show="autoShow && autoDatas.length > 0">
			<view class="border" v-for="(item,index) in autoSearch" :key="index" @click="gopage(item)">
				<img class='pic' src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/search2.png" alt="">
				<text class="txt">{{item.class3Name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'search-area',
		props: {

		},
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				historyDatas: [],
				hotDatas: [],
				autoShow: false,
				autoSearch: [],
				searchValue: '',
				historyNum: 1,
				autoDatas: []
			}
		},
		onShow() {
			this.getClass()

		},
		methods: {
			getClass() {
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/product/class/list',
					method: 'GET',
					success: (res) => {
						// console.log(res.data);
						this.autoDatas = res.data.data;
						console.log(this.autoDatas);
						this.test()
					}
				})
			},
			checkInput() {
				var that = this;
				let str = that.searchValue.replace(/\s+/g, '');
				that.searchValue = str;
				if (str == '') {
					return true;
				} else {
					return false;
				}
			},
			search(res) {
				var that = this;
				if (this.checkInput()) {
					uni.showToast({
						title: '请输入搜索内容!',
						icon: 'none'
					})
				} else {
					this.setHistory();
					this.setcache();
					uni.redirectTo({
						url: 'searchDetail'
					});
				}
			},
			searchHistory(val) {
				uni.redirectTo({
					url: 'searchDetail'
				});
			},
			checkRepeat(arr) {
				for (let i = 0; i < arr.length; i++) {
					for (let n = i + 1; n < arr.length; n++) {
						if (arr[i].keyword === arr[n].keyword) {
							arr.splice(n, 1);
							n--;
						}
					}
				}
			},
			test() {
				this.autoDatas.forEach((c1) => {
					c1.productClass2VoList.forEach((c2) => {
						c2.productClass3VoList = [{
								class3Name: '1',
								productCode:'283795428807319552'
							},
							{
								class3Name: '2'
							},
							{
								class3Name: '3'
							},
							{
								class3Name: 'aaa'
							}
						]
					})
				})
			},
			autoComplete(res) {
				let arr = [];
				this.autoDatas.forEach((c1) => {
					c1.productClass2VoList.forEach((c2) => {
						c2.productClass3VoList.forEach((c3) => {
							if (c3.class3Name.indexOf(res) != -1) {
								arr.push(c3)
							}
						})
					})
				})
				this.autoSearch = arr;
				console.log('as',this.autoSearch);
			},
			focus(res) {},
			blur(res) {
				this.searchValue = res.value;
				this.autoShow = false;
			},
			input(res) {
				var that = this;
				if (res != '') {
					that.searchValue = res;
					that.autoShow = true;
					that.autoComplete(res);
					// console.log(that.autoSearch)
				};
			},
			cancel(res) {
				this.searchValue = res.value;
				this.autoShow = false;
			},
			setcache() {
				var that = this;
				uni.setStorage({
					key: 'historyDatas',
					data: that.historyDatas,
					success: function() {
						// console.log(that.historyDatas);
					}
				});
				uni.setStorage({
					key: 'historyNum',
					data: that.historyNum,
					success: function() {
						// console.log(that.historyNum);
					}
				});
			},
			gopage(i) {
				this.searchValue=i.class3Name;
				this.setHistory();
				uni.setStorageSync('productCode', i.productCode);
				uni.navigateTo({
					url:'/sub-play/pages/play'
				})
			},
			setHistory() {
				this.historyNum = uni.getStorageSync('historyNum');
				this.historyNum++;
				var obj = new Object({
					id: Date.now(),
					keyword: this.searchValue
				});
				if (uni.getStorageSync('historyDatas')) {
					this.historyDatas = uni.getStorageSync('historyDatas')
				} else {
					uni.setStorageSync('historyDatas')
				}
				this.historyDatas.unshift(obj);
				// console.log(that.historyNum);
				this.checkRepeat(this.historyDatas);
				console.log(this.historyDatas);
				if (this.historyDatas.length > 10) {
					this.historyDatas.pop();
				};
			}
		},
		mounted() {
			// console.log(this.autoDatas)
		},
		watch: {
			autoDatas: function(newVal, oldVal) {
				// console.log(newVal)
			},
			historyNum: function(newVal, oldVal) {
				this.$emit('history', this.historyDatas)
			},
		},


	}
</script>

<style lang="scss">
	.search-top-area {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		padding: 5rpx 30rpx 35rpx;

		.search-right {
			font-size: 28rpx;
			color: #0072FE;
		}
	}

	::v-deep .uni-searchbar {
		width: 620rpx;
		height: 68rpx;
		padding: 0 !important;
	}

	::v-deep .uni-searchbar__box {
		border-radius: 34rpx !important;
		width: 620rpx;
		height: 68rpx !important;
	}

	::v-deep .uniui-search:before {
		content: '';
		background: url(https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/search.png) no-repeat;
		background-size: 100%;
		width: 40rpx;
		height: 40rpx;
		display: block;
		margin: 0 10rpx 0 30rpx;
	}

	::v-deep .uni-searchbar__box-icon-search {
		padding: 0% !important;
	}

	.search-auto {
		padding: 0 30rpx;
		position: absolute;
		top: 108rpx;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: #fff;

		.border {
			display: flex;
			flex-wrap: nowrap;
			justify-content: left;
			align-items: center;
			padding: 30rpx 0;
			border-bottom: 1px solid #D9D9D8;

			.pic {
				width: 24rpx;
				height: 23rpx;
				margin-right: 20rpx;
			}

			.txt {
				font-size: 26rpx;
				line-height: 30rpx;
				color: #020202;
			}
		}
	}
</style>
