<template>
	<view>
		<!-- 头部 -->
		<view class="container-shopping">
			<view class="head">
				<view class="shop-top">
					<view class="shop-top-item" :class="{'active':!isFlash}" @click="toFlash('n')">交易广场</view>
					<view class="shop-top-item" :class="{'active':isFlash}" @click="toFlash('y')">闪购<img class="pic"
							src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/shop/flash.png" alt=""></view>
				</view>
			</view>
			<scroll-view class="body" scroll-y="true">
				<!-- 交易广场 -->
				<view v-show="!isFlash" class="deal-ground">
					<view class="uni-padding-wrap uni-common-mt deals-area">
						<uni-segmented-control class='deals-sort' :current="current" :values="items"
							:style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
					</view>
					<view class="search-area-shopping">
						<uni-search-bar @confirm="search" v-model="searchValue" placeholder='搜索关键词' cancelButton='none' :focus='false'>
						</uni-search-bar>
					</view>
					<view class="dealList" v-show="update">
						<view class="box" v-if="current === 0">
							<view v-for="(item,index) in dealList" :key="index" class="border" @click="toDeal(item)">
								<view class="item-top">
									<view class="user-img"><img class="pic" :src="item.userimgUrl" alt=""></view>
									<view class="user-name">{{item.username}}</view>
									<view class="time" v-show="!item.isComplete">
										{{item.date}}
									</view>
									<view class="complete" v-show="item.isComplete">
										交易完成
									</view>
								</view>
								<view class="info">
									{{item.info}}
								</view>
								<view class="lists">
									<view class="wish" v-show="item.wish.has&&false">
										<view class="list-img"><img class="pic" :src="item.wish.imgUrl" alt=""></view>
										<view class="type">{{item.wish.type}}</view>
										<view class="haswish t-c">
											求购
										</view>
									</view>
									<view class="sell">
										<view v-for="(items,idx) in item.list" :key="idx" class="items">
											<view class="list-img">
												<img class="pic" :src="items.imgUrl" alt="">
											</view>
											<view class="type">
												{{items.type}}
											</view>
										</view>
									</view>
								</view>
								<view class="item-bottom">
									<view class="lowprice">
										最低价: <text class="price">￥{{item.lowPrice}}</text>
									</view>
									<view class="oneprice">
										一口价: <text class="price">￥{{item.onePrice}}</text>
									</view>
									<view class="auction t-r">
										参与竞拍（{{item.auctionTimes}}）
									</view>
								</view>
							</view>
						</view>
						<view class="box" v-if="current === 1">
							<view v-for="(item,index) in myPublish" :key="index" class="border" @click="toDeal(item)">
								<view class="item-top">
									<view class="user-img"><img class="pic" :src="item.userimgUrl" alt=""></view>
									<view class="user-name">{{item.username}}</view>
									<view class="time" v-show="!item.isComplete">
										{{item.date}}
									</view>
									<view class="complete" v-show="item.isComplete">
										交易完成
									</view>
								</view>
								<view class="info">
									{{item.info}}
								</view>
								<view class="lists">
									<!-- <view class="wish" v-show="item.wish.has">
										<view class="list-img"><img class="pic" :src="item.wish.img" alt=""></view>
										<view class="type">{{item.wish.type}}</view>
										<view class="haswish t-c">
											求购
										</view>
									</view> -->
									<view class="sell">
										<view v-for="(items,idx) in item.list" :key="idx" class="items">
											<view class="list-img">
												<img class="pic" :src="items.imgUrl" alt="">
											</view>
											<view class="type">
												{{items.type}}
											</view>
										</view>
									</view>
								</view>
								<view class="item-bottom">
									<view class="lowprice">
										最低价: <text class="price">￥{{item.lowPrice}}</text>
									</view>
									<view class="oneprice">
										一口价: <text class="price">￥{{item.onePrice}}</text>
									</view>
									<view class="auction t-r">
										参与竞拍（{{item.auctionTimes}}）
									</view>
								</view>
							</view>
						</view>
						<view class="box" v-if="current === 2">
							<view v-for="(item,index) in myAuction" :key="index" class="border" @click="toDeal(item)">
								<view class="item-top">
									<view class="user-img"><img class="pic" :src="item.userimgUrl" alt=""></view>
									<view class="user-name">{{item.username}}</view>
									<view class="time" v-show="!item.isComplete">
										{{item.date}}
									</view>
									<view class="complete" v-show="item.isComplete">
										交易完成
									</view>
								</view>
								<view class="info">
									{{item.info}}
								</view>
								<view class="lists">
									<!-- <view class="wish" v-show="item.wish.has">
										<view class="list-img"><img class="pic" :src="item.wish.img" alt=""></view>
										<view class="type">{{item.wish.type}}</view>
										<view class="haswish t-c">
											求购
										</view>
									</view> -->
									<view class="sell">
										<view v-for="(items,idx) in item.list" :key="idx" class="items">
											<view class="list-img">
												<img class="pic" :src="items.imgUrl" alt="">
											</view>
											<view class="type">
												{{items.type}}
											</view>
										</view>
									</view>
								</view>
								<view class="item-bottom">
									<view class="lowprice">
										最低价: <text class="price">￥{{item.lowPrice}}</text>
									</view>
									<view class="oneprice">
										一口价: <text class="price">￥{{item.onePrice}}</text>
									</view>
									<view class="auction t-r">
										参与竞拍（{{item.auctionTimes}}）
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 闪购 -->
				<view v-show="isFlash" class="flash-area">
					<view class="uni-padding-wrap uni-common-mt deals-area">
						<uni-segmented-control class='deals-sort' :current="current" :values="items2"
							:style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
					</view>
					<view class="search-area-shopping">
						<uni-search-bar @confirm="searchFlash" v-model="searchFlashValue" placeholder='搜索关键词' :focus="false"
							cancelButton='none'>
						</uni-search-bar>
					</view>

					<view class="flash-list">
						<view class="box" v-if="current === 0">
							<view class="border" v-for="(item,index) in flashList" :key="index"
								@click="toFlashDetail(item)">
								<view class="img">
									<img class="pic" :src="item.imgUrl" alt="">
								</view>
								<view class="title">
									{{item.name}}
								</view>
							</view>
						</view>
						<view class="box my-sell" v-if="current === 1">
							<view class="border" v-for="(item,index) in mySellList" :key="index">
								<view class="img">
									<img class="pic" :src="item.imgUrl" alt="">
								</view>
								<view class="title">
									{{item.name}}
								</view>
								<view class="info">
									{{item.class2Name}}-{{item.class3Name}}
								</view>
								<view class="sell-price">
									出售金额 <text class="price">￥{{item.price}}</text><img class='pic'
										src="/static/images/etc/edit.png" alt="" @click="changeSellShow"
										v-if="item.amount>item.soldAmount">
								</view>
								<view class="sell-amount">
									出售数量 <text class='amount'>{{item.amount}}</text>
									<text class="sold" v-if="item.soldAmount>0">
										(已出售{{item.soldAmount}}件)
									</text>
								</view>
								<view class="control-area">
									<view class="delete" v-if="item.amount>item.soldAmount" @click="deleteSellShow">
										<img class="pic" src="/static/images/etc/del.png" alt="">
									</view>
									<view class="soldout" v-if="item.amount==item.soldAmount">
										<img class="pic" src="/static/images/etc/empty.png" alt="">
									</view>
								</view>
							</view>
						</view>
						<view class="box my-buy" v-if="current === 2">
							<view class="border" v-for="(item,index) in mySellList" :key="index">
								<view class="img">
									<img class="pic" :src="item.imgUrl" alt="">
								</view>
								<view class="title">
									{{item.name}}
								</view>
								<view class="info">
									{{item.class2Name}}-{{item.class3Name}}
								</view>
								<view class="sell-price">
									出售金额 <text class="price">￥{{item.price}}</text><img class='pic'
										src="/static/images/etc/edit.png" alt="" @click="changeBuyShow"
										v-if="item.amount>item.soldAmount">
								</view>
								<view class="sell-amount">
									出售数量 <text class='amount'>{{item.amount}}</text>
									<text class="sold" v-if="item.soldAmount>0">
										(已出售{{item.soldAmount}}件)
									</text>
								</view>
								<view class="control-area">
									<view class="delete" v-if="item.amount>item.soldAmount" @click="deleteBuyShow">
										<img class="pic" src="/static/images/etc/del.png" alt="">
									</view>
									<view class="soldout" v-if="item.amount==item.soldAmount">
										<img class="pic" src="/static/images/etc/empty.png" alt="">
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 删除确认 -->
		<uni-popup ref="delete" type="dialog">
			<uni-popup-dialog type="success" cancelText="取消" confirmText="确认" title="通知" content="是否删除当前记录!"
				@confirm="deleteSellConfirm" @close="deleteSellClose"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="delete2" type="dialog">
			<uni-popup-dialog type="success" cancelText="取消" confirmText="确认" title="通知" content="是否删除当前记录!"
				@confirm="deleteBuyConfirm" @close="deleteBuyClose"></uni-popup-dialog>
		</uni-popup>
		<!-- 修改出售金额 -->
		<uni-popup ref="changeSell" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="输入出售金额" v-model="changeSellValue" placeholder="请输入金额"
				@confirm="changeSellConfirm"></uni-popup-dialog>
		</uni-popup>
		<!-- 修改收购金额 -->
		<uni-popup ref="changeBuy" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="输入收购金额" v-model="changeBuyValue" placeholder="请输入金额"
				@confirm="changeBuyConfirm"></uni-popup-dialog>
		</uni-popup>

		
		
		<!-- <view class="bag" @click="goBag" v-if="!isFlash">
			<img class='pic' src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/bag.png" alt="">
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: ['全部', '我的发布', '我的竞拍'],
				items2: ['全部', '我的出售', '我的收购'],
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
				isFlash: false,
				dealList: [],
				myPublish: [],
				myAuction: [],
				searchValue: '',
				user: {
					name: '上山打老虎'
				},
				hasConditions: false,
				searchVal2: '',
				doSearch: false,
				flashList: [],
				flashSearch: false,
				flashSearchList: [],
				searchClass: [],
				searchFlashValue: '',
				mySellList: [],
				changeSellValue: '',
				changeBuyValue: ''
			}
		},
		onLoad() {
			this.getJson()
		},
		onPullDownRefresh() {
			this.getJson();
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
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
					url: "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/fake.json",
					// #endif
					method: "get",
					dataType: "JSON",
					// #ifdef H5
					success: res => {
						this.dealList = res.data.shop;
						this.flashList = res.data.flash;
						this.mySellList = res.data.mySell;
						// console.log(this.flashList)
					},
					// #endif
					// #ifdef MP-WEIXIN
					success: res => {
						// console.log(res.data);
						let data = JSON.parse(res.data)
						this.dealList = data.shop;
						this.flashList = data.flash;
						this.mySellList = [{
								"imgUrl": "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/shop/f1.png",
								"name": "十二星座白羊座",
								"class1Name": "大分类A",
								"class2Name": "分类a",
								"class3Name": "品类1",
								"price": "320.0",
								"amount": 1,
								"soldAmount": 0
							},
							{
								"imgUrl": "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/shop/f2.png",
								"name": "世界名画",
								"class1Name": "大分类A",
								"class2Name": "分类a",
								"class3Name": "品类1",
								"price": "320.0",
								"amount": 5,
								"soldAmount": 2
							},
							{
								"imgUrl": "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/shop/f3.png",
								"name": "爱咕噜小猪仔仔",
								"class1Name": "大分类A",
								"class2Name": "分类a",
								"class3Name": "品类1",
								"price": "58.0",
								"amount": 5,
								"soldAmount": 1
							},
							{
								"imgUrl": "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/shop/f4.png",
								"name": "从零开始的异世界生活-欢喜篇",
								"class1Name": "从零开始的异世界生活",
								"class2Name": "从零开始的异世界生活-欢喜篇",
								"class3Name": "品类1",
								"price": "58.0",
								"amount": 1,
								"soldAmount": 1
							}
						];
					}
					// #endif
				});
			},
			toDeal(item) {
				uni.navigateTo({
					url: "shopping/dealDetail"
				})
			},
			toFlash(type) {
				var that = this;
				this.current = 0;
				if (type == 'y') {
					that.isFlash = true;
				} else if (type == 'n') {
					that.isFlash = false;
				}
			},
			toFlashDetail(item) {
				uni.navigateTo({
					url: "/pages/shopping/flashdetail"
				})
			},
			search() {},
			goBag() {
				uni.navigateTo({
					url: 'category/bag'
				})
			},
			searchFlash() {
				console.log(1);
			},
			deleteSellShow() {
				this.$refs.delete.open();
			},
			deleteBuyShow() {
				this.$refs.delete2.open();
			},
			deleteSellConfirm() {
				console.log('删除');
				this.$refs.delete.close()
			},
			deleteBuyConfirm() {
				console.log('删除');
				this.$refs.delete2.close()
			},
			deleteSellClose() {
				console.log('取消');
				this.$refs.delete.close()
			},
			deleteBuyClose() {
				console.log('取消');
				this.$refs.delete2.close()
			},
			changeSellShow() {
				this.$refs.changeSell.open()
			},
			changeBuyShow() {
				this.$refs.changeBuy.open()
			},
			changeSellConfirm(done, value) {
				this.changeSellValue = value;
				if (this.changeCheck('sell')) {
					uni.showToast({
						title: '修改成功',
						icon: "success"
					})
					this.$refs.changeSell.close()
				}
			},
			changeBuyConfirm(done, value) {
				this.changeBuyValue = value;
				if (this.changeCheck('buy')) {
					uni.showToast({
						title: '修改成功',
						icon: "success"
					})
					console.log('新收购', this.changeBuyValue);
					this.$refs.changeBuy.close()
				}
			},
			changeCheck(type) {
				let reg = /^[0-9]+\.?[0-9]{0,2}$/g;
				var value;
				switch (type) {
					case 'sell':
						value = this.changeSellValue
						break;
					case 'buy':
						value = this.changeBuyValue
						break;
				}
				if (reg.test(value)) {
					if (value == '0') {
						uni.showToast({
							title: '价格不能为零！',
							icon: "error"
						})
						return false
					} else {
						return true
					}
				} else {
					uni.showToast({
						title: '请输入正确的金额',
						icon: "error"
					})
					return false
				}
				// console.log(reg.test(this.changeSellValue))
			}
		},
		watch: {
			dealList: function(newVal) {
				var that = this;
				console.log(newVal);
				newVal.forEach(function(item) {
					if (that.user.name == item.username) {
						that.myPublish.push(item);
					}
					item.auction.forEach(function(items) {
						if (that.user.name == items.username) {
							that.myAuction.push(item);
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.container-shopping {
		display: flex;
		min-height: 100vh;
		width: 100%;
		flex-direction: column;

		.head {
			height: 90rpx;
		}

		.body {
			height: calc(100vh - 90rpx);
		}
	}

	.shop-top {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-around;
		margin-top: 10rpx;

		.shop-top-item {
			padding: 0 40rpx;
			height: 68rpx;
			line-height: 66rpx;
			border: 1rpx solid transparent;
			font-size: 28rpx;
			color: #020202;
			background-color: #fff;
			border-radius: 20rpx;
		}

		.active {
			background-color: #FDF5E2;
			color: #F9B002;
			border-color: #F9B002;
		}

		.pic {
			width: 32rpx;
			height: 32rpx;
			display: inline-block;
			margin: 17rpx 10rpx;
			vertical-align: middle;
		}
	}

	.deals-area {
		margin-top: 30rpx;
		border-radius: 35rpx 35rpx 0 0;
		box-shadow: 0 -5rpx 0 rgba(0, 0, 0, 0.05);
		padding: 20rpx;
	}

	::v-deep .deals-area {
		.segmented-control__text {
			font-size: 28rpx;
			line-height: 44rpx;
		}
	}

	.search-area-shopping {
		padding: 5rpx 30rpx;

		.search-right {
			font-size: 28rpx;
			color: #0072FE;
		}
	}

	::v-deep.uni-searchbar {
		height: 68rpx;
		padding: 0 !important;
	}

	::v-deep .uni-searchbar__box {
		border-radius: 34rpx !important;
		width: 620rpx;
		height: 68rpx !important;
		justify-content: flex-start !important;
	}

	::v-deep .uniui-search:before {
		content: '' !important;
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

	.dealList .border {
		margin: 20rpx;
		padding: 20rpx 30rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.05);
		border-radius: 10rpx;

		.item-top {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: space-between;

			.user-img {
				width: 60rpx;
				height: 60rpx;
				border-radius: 30rpx;
				margin-right: 10rpx;
			}

			.user-name {
				font-size: 30rpx;
				color: #7C7B7B;
			}

			.time {
				flex: 1;
				text-align: right;
				font-size: 22rpx;
				color: #6E6D6D;
			}

			.complete {
				flex: 1;
				text-align: right;
				font-size: 26rpx;
				color: #F9B002;
			}
		}

		.info {
			font-size: 30rpx;
			color: #020202;
			margin: 30rpx 0 20rpx;
		}

		.lists {
			display: flex;
			flex-wrap: nowrap;
			overflow: hidden;

			.wish {
				background-color: #FEF4DC;
				width: 140rpx;
				height: 140rpx;
				padding: 15rpx;
				margin-right: 10rpx;
				border-radius: 10rpx;
				position: relative;

				.haswish {
					position: absolute;
					left: 15rpx;
					top: 15rpx;
					width: 110rpx;
					height: 110rpx;
					background-color: rgba(0, 0, 0, 0.5);
					border-radius: 10rpx;
					font-size: 30rpx;
					color: #fff;
					line-height: 110rpx;
				}

			}

			.list-img {
				width: 110rpx;
				height: 110rpx;
			}

			.type {
				position: absolute;
				top: 15rpx;
				left: 15rpx;
				width: 40rpx;
				height: 40rpx;
				border-radius: 10rpx;
				font-size: 30rpx;
				color: #FDB302;
				background-color: #020202;
				text-align: center;
			}

			.sell {
				display: inline-flex;
				flex: 1;
				flex-wrap: nowrap;
				overflow: auto;

				.items {
					width: 140rpx;
					height: 140rpx;
					padding: 15rpx;
					position: relative;
				}
			}
		}

		.item-bottom {
			margin: 20rpx 0;
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: space-between;

			.lowprice,
			.oneprice {
				font-size: 24rpx;
				color: #575757;
				margin-right: 30rpx;
			}

			.price {
				color: #020202;
			}

			.auction {
				font-size: 24rpx;
				color: #565656;
				flex: 1;
			}
		}
	}

	.flash-area {

		.flash-list {
			padding: 0 20rpx;

			.box {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-top: 30rpx;

				.border {
					width: 350rpx;
					height: 435rpx;
					margin: 0 0 20rpx;
					box-shadow: 0 0 5rpx rgba(0, 0, 0, 0.05);
					background-color: #fff;
					border-radius: 10rpx;

					.img {
						width: 350rpx;
						height: 350rpx;
					}

					.title {
						font-size: 24rpx;
						color: #000;
						margin: 20rpx auto 0;
						width: 330rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}

			.my-sell,
			.my-buy {
				.border {
					width: 710rpx;
					height: 220rpx;
					padding: 20rpx 10rpx;
					position: relative;

					.img {
						width: 180rpx;
						height: 180rpx;
						float: left;
						margin-right: 20rpx;
					}

					.title {
						width: 400rpx;
						font-size: 30rpx;
						color: #020202;
						margin: 0;
					}

					.info {
						font-size: 24rpx;
						color: #807F7F;
						width: 400rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.sell-price {
						font-size: 24rpx;
						color: #807F7F;
						margin-top: 22rpx;

						.pic {
							width: 30rpx;
							height: 30rpx;
							display: inline-block;
							vertical-align: bottom;
							margin-left: 20rpx;
						}
					}

					.sell-amount {
						font-size: 24rpx;
						color: #807F7F;
						margin-top: 22rpx;
					}

					.control-area {
						position: absolute;
						top: 50%;
						right: 10rpx;
						width: 80rpx;
						height: 80rpx;
						transform: translateY(-40rpx);

						.delete {
							width: 30rpx;
							height: 30rpx;
							position: absolute;
							top: 25rpx;
							left: 25rpx;
						}
					}
				}
			}
		}
	}

	.bag {
		position: fixed;
		z-index: 50;
		right: 10rpx;
		bottom: 160rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: #FDF5E2;

		.pic {
			position: absolute;
			top: 26rpx;
			left: 26rpx;
			width: 48rpx;
			height: 48rpx;
		}
	}
</style>
