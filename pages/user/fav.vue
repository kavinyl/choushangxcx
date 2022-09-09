<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt container goods-area">
			<uni-segmented-control class='goods-sort' :current="current" :values="items" :style-type="styleType"
				:active-color="activeColor" @clickItem="onClickItem" />
			<view class="select" @click="select()" v-show="!doSelect">
				<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/select.png" alt="">
				管理
			</view>
			<view class="select select-ing" @click="select()" v-show="doSelect">
				完成管理
			</view>
		</view>

		<view class="fav-list" v-show="update">
			<view class="box" v-if="current === 0">
				<view class="choosen" :class="{'choosen-a':doSelect}">
					<view class="choosen-area" v-for="(item,index) in favList" :key="index"
						v-show="item.class1Code=='C0000001'" @click="clickFav(item)">
						<view class="choosen-out">
							<view class="choosen-in" v-show="item.choose && doSelect"></view>
						</view>

					</view>
				</view>
				<view v-for="(item,index) in favList" :key="index" class="border" v-show="item.class1Code=='C0000001'"
					:class="{'border-a':doSelect}" @click="clickFav(item)">

					<img class='pic' :src="item.imgUrl" alt="">
					<img class='presale' v-show='item.flagPreSale'
						src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/ys.png" alt="">
					<text class='fav-title'>{{ item.class1Name }}</text>
					<text class='fav-price'>￥{{ item.price }}</text>
					<text class='fav-soldout t-c' v-show="item.flagOffSale">已下架</text>

				</view>
			</view>
			<view class="box" v-if="current === 1">
				<view class="choosen" :class="{'choosen-a':doSelect}">
					<view class="choosen-area" v-for="(item,index) in favList" :key="index"
						v-show="item.class1Code=='C0000002'" @click="clickFav(item)">
						<view class="choosen-out">
							<view class="choosen-in" v-show="item.choose && doSelect"></view>
						</view>

					</view>
				</view>
				<view v-for="(item,index) in favList" :key="index" class="border" v-show="item.class1Code=='C0000002'"
					:class="{'border-a':doSelect}" @click="clickFav(item)">
					<img class='pic' :src="item.imgUrl" alt="">
					<img class='presale' v-show='item.flagPreSale'
						src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/ys.png" alt="">
					<text class='fav-title'>{{ item.class1Name }}</text>
					<text class='fav-price'>￥{{ item.price }}</text>
					<text class='fav-soldout t-c' v-show="item.flagOffSale">已下架</text>
				</view>
			</view>
			<view class="box" v-if="current === 2">
				<view class="choosen" :class="{'choosen-a':doSelect}">
					<view class="choosen-area" v-for="(item,index) in favList" :key="index"
						v-show="item.class1Code=='C0000003'" @click="clickFav(item)">
						<view class="choosen-out">
							<view class="choosen-in" v-show="item.choose && doSelect"></view>
						</view>

					</view>
				</view>
				<view v-for="(item,index) in favList" :key="index" class="border" v-show="item.class1Code=='C0000003'"
					:class="{'border-a':doSelect}" @click="clickFav(item)">
					<img class='pic' :src="item.imgUrl" alt="">
					<img class='presale' v-show='item.flagPreSale'
						src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/ys.png" alt="">
					<text class='fav-title'>{{ item.class1Name }}</text>
					<text class='fav-price'>￥{{ item.price }}</text>
					<text class='fav-soldout t-c' v-show="item.flagOffSale">已下架</text>
				</view>
			</view>
			<uni-load-more :status="status" @clickLoadMore='loadMore' :contentText="contentText">
			</uni-load-more>
		</view>
		<view class='control' ref="favControl" v-show="controlShow">
			<view class="control-left" @click="chooseAll">
				<view class="circle-out">
					<view class="circle-in" v-show="selectAll">
					</view>
				</view>
				<text class="txt">全选</text>
			</view>
			<view class="control-center t-r">
				已选 <text class="txt">{{selectNum}}</text> 个
			</view>
			<view class="control-right" @click="doDelete()">
				<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/user/del.png" alt="">
				<text class="txt">删除</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: ['一番赏', '手办', '盲盒'],
				styles: [{
						value: 'button',
						text: '按钮',
						checked: true
					},
					{
						value: 'text',
						text: '文字'
					}
				],
				colors: ['#FDA804', '#4cd964', '#dd524d'],
				current: 0,
				colorIndex: 0,
				activeColor: '#FDA804',
				styleType: 'text',
				update: true,
				favList: [],
				doSelect: false,
				controlShow: false,
				selectAll: false,
				selectNum: 0,
				token: '',
				delList: [],
				pageNo: 1,
				totalPage: 1,
				status: 'more',
				contentText: {
					contentdown: '点击展示更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
			}
		},
		onShow() {
			this.token=uni.getStorageSync('token');
			this.getJson();
			// #ifdef H5
			this.test();
			// #endif
		},
		onPullDownRefresh() {
			this.getJson();
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		},
		methods: {
			test() {
				uni.request({
					url: "/static/fake.json",
					method: "GET",
					dataType: "JSON",
					success: res => {
						console.log(res.data.user)
						this.favList = res.data.user.favList;
						console.log(this.favList)
					},
				})
			},
			getJson() {
				var that = this;
				// 先从后台拿数据
				uni.request({
					url: "http://123.60.71.74:20001/" + "mh/user/favourite/page",
					method: "GET",
					header: {
						'token': this.token
					},
					data: {
						'no': this.pageNo,
						'size': 10
					},
					dataType: "JSON",
					success: res => {
						console.log(res);
						let data = JSON.parse(res.data)
						this.favList = data.data.list;
						this.totalPage = data.data.totalPage;
						if (this.totalPage == 1) {
							that.status = 'noMore'
						};
						console.log(this.favList)
					}
				});
			},
			loadMore(e) {
				var that = this;
				if (this.pageNo < this.totalPage) {
					that.pageNo++;
					this.status = 'loading';
					uni.request({
						url: "http://123.60.71.74:20001/" + "/mh/user/favourite/page",
						method: "GET",
						dataType: "JSON",
						header: {
							'token': that.token
						},
						data: {
							no: that.pageNo,
							size: 10
						},
						success: res => {
							let data = JSON.parse(res.data);
							console.log(data.data);
							data.data.list.forEach(function(item) {
								that.favList.push(item);
							})
							// console.log(this.productList);
							that.status = 'more'
						}
					});
				} else {
					this.status = 'noMore';
				}
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			select() {
				this.doSelect = !this.doSelect;
				this.controlShow = !this.controlShow;
			},
			clickFav(item) {
				if (this.doSelect) {
					item.choose = !item.choose;
				}
				let num = 0;
				this.favList.forEach(function(item, index) {
					if (item.choose) {
						num++
					}
				})
				this.selectNum = num;
			},
			chooseAll() {
				var that = this;
				this.selectAll = !this.selectAll;
				this.favList.forEach(function(item, index) {
					item.choose = that.selectAll;
				});
				this.selectNum = this.selectAll ? this.favList.length : 0;
			},
			doDelete() {
				var that = this;
				if (this.selectNum == 0) {
					uni.showToast({
						title: '请选择',
						icon: "none"
					})
				} else {
					that.favList.forEach(function(item) {
						if (item.choose) {
							that.delList.push(item.productCode);
						}
					})
					console.log(that.delList.join(','));
					uni.request({
						url: 'http://123.60.71.74:20001/' + '/mh/user/favourite/delete' + '?productCodeList=' +
							this.delList.join(','),
						method: "PUT",
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'token': this.token
						},
						data: {
							'productCodeList': this.delList.join(',')
						}
					}).then((res) => {
						console.log(res);
						uni.showToast({
							title: '已删除' + that.selectNum + '个',
							icon: "none"
						});
						that.doSelect = false;
						that.controlShow = false;
						that.selectNum = 0;
						that.delList = [];
						that.getJson();
					});
				}
			}
		},
		mounted() {
			if (this.totalPage == 1) {
				this.status = 'noMore'
			}
		},
		watch: {

		}
	}
</script>

<style lang="scss">
	.goods-area {
		border-bottom: 1rpx solid #F7F7F7;
		padding: 20rpx 0;
		width: 100%;
		position: relative;
	}

	.goods-sort {
		width: 580rpx;
		height: 40rpx;
	}

	.select {
		position: absolute;
		top: 50%;
		transform: translateY(-20rpx);
		right: 0;
		width: 170rpx;
		height: 40rpx;
		border-left: 2rpx solid #DCDCDC;
		display: inline-flex;
		align-items: center;
		flex-wrap: nowrap;
		font-size: 28rpx;
		color: #020202;

		.pic {
			width: 19rpx;
			height: 21rpx;
			margin-left: 20rpx;
			margin-right: 10rpx;
		}
	}

	.select-ing {
		padding-left: 20rpx;
		color: #FF553F;
	}

	::v-deep .segmented-control__text {
		font-size: 26rpx;
	}

	::v-deep .segmented-control {
		width: 580rpx;
	}

	.fav-list {
		.box {
			width: 690rpx;
			margin: 0 auto;
			position: relative;

			.choosen {
				width: 50rpx;
				height: 100%;
				transition: width 0.5s ease;
				position: absolute;
				left: 0;
				top: 0;
				opacity: 0;
				transition: all 0.5s ease;

				.choosen-area {
					width: 80rpx;
					height: 180rpx;
					padding-top: 72rpx;
					margin-bottom: 30rpx;

					.choosen-out {
						width: 35rpx;
						height: 35rpx;
						border: 1rpx solid #FF553F;
						background-color: #FCE7DE;
						border-radius: 20rpx;
						display: flex;
						flex-wrap: nowrap;
						align-items: center;
						justify-content: center;
					}

					.choosen-in {
						width: 15rpx;
						height: 15rpx;
						background-color: #FF553F;
						border-radius: 20rpx;
					}
				}
			}
		}

		.choosen-a {
			opacity: 1 !important;
		}

		.border-a {
			margin-left: 80rpx !important;
		}

		.border {
			max-width: 690rpx;
			height: 180rpx;
			margin: 30rpx 0 10rpx;
			position: relative;
			transition: all 0.5s ease;

			.pic {
				float: left;
				width: 180rpx;
				height: 180rpx;
				margin-right: 15rpx;
			}

			.presale {
				position: absolute;
				top: 0;
				left: 0;
				width: 83rpx;
				height: 82rpx;
			}

			.fav-title {
				font-size: 30rpx;
				color: #000;
				line-height: 40rpx;
				height: 96rpx;
			}

			.fav-price {
				font-size: 30rpx;
				line-height: 42rpx;
				color: #F9B002;
				font-weight: bold;
				position: absolute;
				bottom: 6rpx;
				left: 195rpx;
			}

			.fav-soldout {
				font-size: 22rpx;
				color: #929191;
				width: 114rpx;
				height: 42rpx;
				background-color: #EEEEEE;
				position: absolute;
				line-height: 42rpx;
				border-radius: 21rpx;
				right: 0;
				bottom: 6rpx;
			}


		}
	}

	.control {
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1rpx solid #FAFAFA;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		width: 100%;
		height: 90rpx;

		.control-left {
			display: inline-flex;
			align-items: center;

			.circle-out {
				width: 35rpx;
				height: 35rpx;
				border: 1rpx solid #FF553F;
				background-color: #FCE7DE;
				border-radius: 50%;
				position: relative;
				margin-right: 5rpx;

				.circle-in {
					position: absolute;
					width: 15rpx;
					height: 15rpx;
					background-color: #FF553F;
					border-radius: 50%;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}

			.txt {
				font-size: 22rpx;
				color: #9C9C9C;
				line-height: 35rpx;
			}
		}

		.control-center {
			flex: 1;
			color: #7B7B7B;
			font-size: 24rpx;
			letter-spacing: 2px;
			margin-right: 30rpx;

			.txt {
				font-size: 30rpx;
				color: #020202;
				font-weight: bold;
			}
		}

		.control-right {
			width: 160rpx;
			height: 68rpx;
			display: flex;
			justify-content: center;
			flex-wrap: nowrap;
			align-items: center;
			background-color: #FCE7DE;
			border-radius: 34rpx;

			.pic {
				width: 26rpx;
				height: 26rpx;
				margin-right: 10rpx;
			}

			.txt {
				font-size: 22rpx;
				color: #FF553F;
			}
		}
	}
</style>
