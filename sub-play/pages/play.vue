<template>
	<view class="container-play">
		<!-- 1.信息 -->
		<view class='play-head'>
			<view class="play-head-left">
				<img :src="curProduct.imgUrl" alt="">
			</view>
			<view class="play-head-right">
				<text>{{ curProduct.productName }}</text>
				<view class="remain">
					<progress class="progress" :percent="100 * this.curProduct.leftAmount / this.curProduct.totalAmount"
						stroke-width="20" backgroundColor="#FDF5CD" activeColor="#F9B002" border-radius="10" />
					<view class="t-l">此箱剩余</view>
					<view class="t-r">{{curProduct.leftAmount}}/{{curProduct.totalAmount}}</view>
					<view class="box-remain">剩余{{boxRemain}}箱，当前第{{boxId}}箱</view>
				</view>
				<view class="changeBox" @click='changeShow'>
					换箱
				</view>
			</view>
			<view class="about t-c" @click='goAbout'>
				?
			</view>

		</view>
		<!-- 2.队列 -->
		<view class="play-line">
			<view class="play-line-left">
				<view v-if="line.length==-1" class="line-text">
					当前还有<text class='line-text-number'>{{line.size}}</text>人排队，请点击加入队列。
				</view>
				<view v-if="line.length>0" class="line-text">
					当前还有<text class='line-text-number'>{{line.length}}</text>人排队，请耐心等候。
				</view>
				<view v-if="line.length==0" class="line-text">
					轮到你啦！<img class='pic' src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/countdown.png"
						alt="">倒计时：
					<uni-countdown v-if="startcd" ref="ctd" :show-day="false" :hour="0" :minute="cdMinute"
						:second="cdSecond" :fontSize="34" color="#FE9703" @timeup="requeue">
					</uni-countdown>
				</view>
			</view>
			<view class="play-line-right">
				<button v-if="line.length==-1" class='btn-line join' type="default" @click="queuingAdd">
					<view class="i">+</view>加入队列
				</button>
				<button v-if="line.length>=0" class="btn-line quit" type="default" @click="queuingLeave">
					<view class="i">-</view>退出队列
				</button>
			</view>
		</view>
		<!-- 3.已收集 -->
		<view class="play-collected">
			<view class="play-collected-title">
				已收集：
			</view>
			<view class="play-collected-list">
				<view class="border" v-for="(item,index) in userList" :key="index">
					<img :src="item.imgUrl" alt="">
					<view class="empty t-c" v-show='!item.flagCollected'>空</view>
				</view>
			</view>

		</view>
		<!-- 4.商品剩余 -->
		<view class="play-products">
			<view class="border" v-for="(item,index) in proList" :key="index">
				<view class="pic">
					<img :src="item.imgUrl" alt="" @click='imgPreview(item,index)'>
					<view class='empty t-c' v-show="item.leftAmount==0">售罄</view>
				</view>
				<view class='type t-c'>{{item.itemTypeName}}</view>
				<view class="amounts t-c">{{item.leftAmount}}/{{item.totalAmount}}</view>
				<view class='name'>{{item.productItemName}}</view>

			</view>
		</view>
		<!-- 5.底部 -->
		<view class="play-footer">
			<view class="play-footer-cards t-c" @click="newBuyPostcard()">
				明信片：<text>{{postcard.amount}}</text> 张
			</view>
			<view class="play-footer-buy buy-all t-c" @click="buy('all')">
				全收
			</view>
			<view class="play-footer-buy buy-five t-c" @click="buy(5)">
				抽五次
			</view>
			<view class="play-footer-buy buy-one t-c" @click="buy(1)">
				抽一次
			</view>
		</view>
		<!-- 6.侧边 -->
		<view class="play-aside">
			<view class="play-fav t-c" @click="fav">收藏</view>
			<view class="play-refresh" @click="refresh">
				<img class='pic' src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/refresh.png" alt="">
			</view>
		</view>
		<!-- 7.弹出-换箱 -->
		<view class="popup-changebox">
			<uni-popup ref="changebox" type="bottom">
				<view class="popup-title t-c">换箱</view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="popup-content">
					<view class='box' v-for="(item,index) in boxList" @click="changeBox(item,index)" :key="index">
						<view class="item-left t-c">
							{{item.productBoxName}}
							<view v-show="item.choose" class="choose"><img class='pic'
									src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/choose.png" alt="">
							</view>
						</view>
						<view class="item-right">
							<view class='boxes' v-for="(items,idx) in boxList[index].productBoxItemVoList" :key="idx">
								<view class='boxes-type'>{{items.itemTypeName}}:</view>
								<view class='boxes-amount'>{{items.leftAmount}}/{{items.totalAmount}}</view>
								<progress class="progress" :percent="100 * items.leftAmount / items.totalAmount"
									stroke-width="10" backgroundColor="#FCF5E3" activeColor="#FDB302"
									border-radius="5" />
							</view>
						</view>
						<view class="box-empty" v-show="item.isEmpty">空</view>
					</view>
				</scroll-view>
			</uni-popup>
		</view>
		<!-- 8.弹出-提示 -->
		<view class="popup-alert">
			<uni-popup ref="message" type="message">
				<uni-popup-message type="info" :message="msgAlert" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
		<!-- 9.弹出-订单确认 -->
		<view class="popup-order">
			<uni-popup ref="order" type="center">
				<view class="popup-title t-c">
					<text>订单确认</text>
					<text class="rules" @click='goAbout'>规则</text>
				</view>
				<view class="popup-center">
					<view class="order-img">
						<img class='pic' :src="postcard.imgUrl" alt="">
					</view>
					<view class="quantity">
						数量：<text>{{quantity}}</text> 张
					</view>
					<view class="postcard">
						明信片余额：<text>{{postcard.amount}}</text> 张
					</view>
				</view>
				<view class="popup-bottom">
					<button type='primary' @click="playReady">确认</button>
				</view>
			</uni-popup>
		</view>
		<!-- 10.弹出-明信片不足 -->
		<view class="popup-postcard-less">
			<uni-popup ref="pcless" type="center">
				<view class="popup-title t-c">
					<text>提示</text>
				</view>
				<view class="popup-center t-c">
					<text>您的明信片不足，请先购买。</text>
				</view>
				<view class="popup-bottom">
					<button type='primary' @click="buyPostcard">购买</button>
				</view>
			</uni-popup>
		</view>
		<!-- 11.弹出-购买明信片 -->
		<view class="popup-buyCard">
			<uni-popup ref="buyCard" type="center">
				<view class="popup-title t-c">
					<text>购买明信片</text>
					<text class="rules" @click='goAbout'>规则</text>
				</view>
				<view class="popup-center">
					<view class="order-img">
						<img class='pic' :src="postcard.imgUrl" alt="">
					</view>
					<view class="quantity">
						<uni-number-box @change="changeValue" v-model="buyValue" :max="99" />
						<view class="totalPrice">
							合计:<text>{{ curProduct.price * buyValue }}</text>手信
						</view>
					</view>

				</view>
				<view class="pay-type">
					<view class='wxpay pay-type-item' @click="changePayType('wx')">
						<view class="pay-icon"><img class='pic'
								src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/wx.png" alt=""></view>
						<text class="txt">微信支付</text>
						<view class="choose">
							<view class='active' v-show="payType=='wxPay'"><img class='pic'
									src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/choose-white.png"
									alt=""></view>
						</view>
					</view>
					<view class="sxpay pay-type-item" @click="changePayType('sx')">
						<view class="pay-icon"><img class='pic'
								src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/sx.png" alt=""></view>
						<text class="txt">手信支付</text>
						<view class="choose">
							<view class='active' v-show="payType=='sxPay'"><img class='pic'
									src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/choose-white.png"
									alt=""></view>
						</view>
					</view>
				</view>
				<view class="popup-bottom">
					<button type='primary' @click="orderPay()">支付</button>
				</view>
			</uni-popup>
		</view>
		<!--12. 弹出-扭蛋 -->
		<gashapon ref="gashapon" v-show='gashaponShow' @close='closeMask' :quantity='quantity' @addTime='addSeconds'>
		</gashapon>
		<!-- 13. 弹出-协议 -->
		<view class="popup-rule">
			<uni-popup ref="rule" type="center">
				<view class="popup-title t-c">
					<text>抽赏规则</text>
				</view>
				<view class="popup-center">
					<scroll-view scroll-y="true" class="rule">
						<view class="part">
							<p class='p'>AR抽赏赏池、赏箱、赏品的定义∶</p>
							<p class='p'>单个IP主题的AR抽赏构成一个赏池，每个赏池包含若干个赏箱，赏箱内包含A、B、C、D、E、F、G以及最终赏等不同等级的赏品，
								商品均有配图及介绍。赏箱页面内每分钟更新各等级赏品余量情况，供用户参考。</p>
						</view>
						<view class="part">
							<p class='p'>AR抽赏抽奖步骤∶</p>
							<p class='p'><text class="b">STEP1∶</text>购买明信片</p>
							<p class='p'>点击“购买明信片”，选定赏池及数量进行购买。</p>
							<p class='p'>注意AR抽赏实行先购买明信片，再使用明信片进行排队抽奖的机制。但排队抽奖的时间只有3分钟，为保证抽赏体验，建议提前购买好足量的明信片。</p>
							<p class='p'><text class="b">STEP2∶</text>完成购买明信片，一张明信片获得一次抽赏机会</p>
							<p class='p'><text class="b">STEP3∶</text>选择赏箱进行排队抽赏</p>
							<p class='p'>若不在排队队列中可切换赏箱。</p>
							<p class='p'>选定赏箱后，若该赏箱无其他用户正在抽赏，可即刻开赏；</p>
							<p class='p'>有其他用户正在开赏时，需点击“立即排队”进入队列等待抽赏。用户可随时查看排队情况选择等待或退出排队。</p>
							<p class='p'>
								排队排到后抽赏时间为3分钟，连续5抽可增加30秒，但剩余时间最多为3分钟（即如果剩余2分45秒时连续5抽，剩余时间最多增加到3分钟）。顶部倒计时器会给予剩余时间提醒，倒计时结束后系统将自动移除队列。
							</p>
							<p class='p'>***请每位用户仔细核对剩余时间，因个人问题未看清倒计时而被移除队列导致的损失，平台不予承担。</p>
							<p class='p'>在抽赏时间内，当前用户无论切换页面还是退出小程序，都可以返回之前所在的抽赏页面。</p>
							<p class='p'><text class="b">STEP4∶</text>进行抽赏</p>
							<p class='p'>抽赏可选择“抽一次”、“五连抽”，或“全收”。注意此按钮在已经购买明信片的模式下将直接进行抽赏，不再弹出二次提示！</p>
							<p class='p'><text class="b">STEP5∶</text>抽赏结束，选择继续或者退出</p>
							<p class='p'>确认赏品后用户可选择“继续抽赏”还是“退出队列”。</p>
							<p class='p'>抽赏过程中可选择继续购买明信片，在限定时间内不影响排队位置。</p>
							<p class='p'><text class="b">STEP6∶</text>赏品存入赏柜，等待发货</p>
						</view>

						<view class="part">
							<p class='p'>关于现货和预售∶</p>
							<p class='p'>1、“现货”是指在中国地区已经开售的赏品，平台会在用户抽取到赏品、确认发货后，在指定发货日发货。</p>
							<p class='p'>2、“预售”是指预约生产商品，购买明信片抽奖获得的预售商品代表该商品预订资格及对应货款，用户在“预售期”到达且平台确认预售产品到货后，用户即可选择发货。
							</p>
						</view>

						<view class="part">
							<p class='p'>关于最终赏∶</p>
							<p class='p'>
								最终赏抽取规则与线下AR抽赏官方规则一致，即每个赏箱抽得最后一个赏品的用户获得，系统会根据抽赏操作的时间戳进行判断。抽赏时请一定要注意时间，排到队最多有3分钟操作抽赏时间，且页面会有明确的倒计时，若在规定时间内未完成抽赏被移出队列的，平台不予负责。
							</p>
						</view>

						<view class="part">
							<p class='p'>关于赏柜∶</p>
							<p class='p'>开赏后的赏品会放入赏柜，在这里您可以查看已买到的赏品列表，并进行发货等操作。</p>
						</view>

						<view class="part">
							<p class='p'>关于发货∶</p>
							<p class='p'>1、开赏后的赏品会放进赏柜，您可以到“赏柜”内手动申请发货。</p>
							<p class='p'>2、请务必确保您填写的默认地址是真实有效的，因您地址错误或其他个人原因导致的任何损失由您自行承担。</p>
							<p class='p'>3、自动发货的订单，您因各种理由拒收造成的损失由您个人承担。</p>
							<p class='p'>4、我们会根据申请发货的先后顺序安排发货，如遇节假日或特殊情况会暂停或延缓发货，但我们会竭尽全力将现货商品尽快送达您的手中。</p>
							<p class='p'>5、发货机制∶平台默认使用顺丰物流，5
								件包邮国内大部分地区（香港、澳门、台湾、青海、内蒙古、西藏、新疆等地区需联系客服补差价），不到5件预付10元邮费发国内大部分地区（香港、澳门、台湾、青海、内蒙古、西藏、新疆等地区需联系客服补差价）。
							</p>
							<p class='p'>6、如因非人为原因导致出现赏品损坏请及时沟通客服（请按照封箱贴上的提示，录制好开箱视频），可调换新的同款赏品（以退换货规则为准）。</p>
							<p class='p'>7、如发现同款赏品退换多次等可能的恶意行为，将视实际情况，包括但不限于冻结其AR抽赏账户、要求用户承担平台损失等处理。同时，我司将终止对该用户提供购买服务。
							</p>
							<p class='p'>8、预售款若遇通关压力，不可抗力等，导致到货延迟，平台将会如实告知，请用户耐心等待。</p>
						</view>

						<view class="part">
							<p class='p'>售后特别提醒∶</p>
							<p class='p'>
								1、盲盒类开赏商品，根据《消费者权益保护法》第25条之规定，及《上海市盲盒经营活动合规指引》第15条之要求，因产品售出后，无法按照售卖规则二次销售，不适用7天无理由退换的规定，请谨慎、理性购买。
							</p>
							<p class='p'>2、收到的赏品如遇质量问题，可联系客服，凭有效的售后凭证，我司提供包含补偿、换货、退款在内的方式进行售后处理。</p>
						</view>

						<view class="part">
							<p class='p'>其他提示∶</p>
							<p class='p'>1、如果您在使用过程中遇到问题，请联系客服咨询。</p>
							<p class='p'>2、本规则将随着平台产品的调整而不断更新优化，志在为用户提供良好的抽赏环境，敬请留意规则更新。</p>
							<p class='p'>3、所有抽赏与苹果等第三方公司无关。</p>
						</view>
					</scroll-view>
				</view>
				<view class="popup-bottom">
					<view class="agree">
						<view class="img" :class="{'choose':rules.buyRule}"
							@click="agreeClick(1)">
							<img src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/choose.png" class="pic" v-show="rules.buyRule">
						</view>
						<view class="text">
							我已阅读并同意
						</view>
						<view class="go-rule" @click="toPage('/pages/about/about')">
							&laquo;抽赏规则&raquo;
						</view>
					</view>
					<view class="agree">
						<view class="img" :class="{'choose':rules.userRule}" 
							@click="agreeClick(2)">
							<img src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/choose.png" class="pic" v-show="rules.userRule">
						</view>
						<view class="text">
							我已阅读并同意
						</view>
						<view class="go-rule" @click="toPage('/pages/about/agreements')">
							&laquo;用户协议&raquo;
						</view>
					</view>
				</view>
				<view class="popup-out">
					<button type='primary' @click="agreeRules" class="btn">继续购买</button>
				</view>
			</uni-popup>
		</view>
		<imgview ref="preview" v-show="viewShow" @close='closeView' :pro-list='proList' :index='imgIndex'></imgview>
		<!-- <wxPay ref='wxpay' :amount='buyValue' ></wxPay> -->
		<!-- <button @click="test()">test</button> -->
	</view>
</template>

<script>
	import gashapon from '@/components/gashapon/gashapon.vue'
	import imgview from '@/components/preview/preview.vue'
	// import wxPay from '@/components/wxPay/wxPay.vue'
	export default {
		components: {
			gashapon,
			imgview
		},
		data() {
			return {
				curProduct: {},
				line: {
					queue: true,
					length: 0,
				},
				userList: [],
				proList: [],
				postcard: {
					amount: 0, //拥有的明信片数量
					imgUrl: '' //明信片图片
				},
				boxList: [],
				scrollTop: 0,
				oldId: 1, //当前的盒子编号
				newId: 1, //切换的盒子编号
				msgAlert: '请先加入队列！',
				quantity: 0, //即将抽的数量
				buyValue: 1, //需要买的明信片数量
				payType: 'wxPay', //支付方式，wxPay和sxPay
				payComplete: true, //购买完成，可以抽了
				gashaponShow: false, //扭蛋机展示
				confirmPlay: false, //点击扭蛋机开始
				token: '',
				productCode: '',
				postcardCode: '',
				cdMinute: 3,
				cdSecond: 1,
				start: false,
				productBoxCode: '',
				boxId: 1, //当前第几箱
				boxRemain: 1, //还剩几箱
				appid: 'wx1fcd6e2e840c9e0c',
				secret: '',
				accessToken: '',
				openid: '',
				interval: '',
				firstTime: true,
				userCurrency: 0,
				startcd: true,
				viewShow: false,
				imgIndex: 0,
				startTime: 0,
				endTime: 0,
				rules: {
					buyRule: false,
					userRule: false
				}
			}
		},
		onLoad() {

		},
		methods: {
			async test() {
				this.quantity = 5;
				this.addSeconds(true)
			},
			getJson() {
				var that = this;
				// 先从后台拿数据
				uni.request({
					// #ifdef H5
					url: "/static/fake.json",
					// #endif
					// #ifdef MP-WEIXIN
					url: 'http://123.60.71.74:20001/' + 'mh/product/' + this.productCode,
					// #endif
					method: "GET",
					// #ifdef H5
					success: res => {
						// console.log(res.data.box);
						this.boxList = res.data.box;
					},
					// #endif
					// #ifdef MP-WEIXIN
					success: res => {
						// console.log(data);
						this.curProduct = res.data.data;
						this.getProductBox();
						this.getUserCollect();
						this.getUserPostcard();
					}
					// #endif
				});
			},
			getUserCollect() {
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/user/product/item/collect/info' + '?productCode=' +
						this.productCode,
					method: 'GET',
					header: {
						'token': this.token
					},
					success: res => {
						this.userList = res.data.data
						console.log('user', res);
					}
				})
			},
			getAmount() {
				var that = this;
				this.curProduct.leftAmount = 0;
				this.curProduct.totalAmount = 0;
				this.proList.forEach(function(i) {
					that.curProduct.leftAmount += i.leftAmount;
					that.curProduct.totalAmount += i.totalAmount;
				})
			},
			getProductBox() {
				var that = this;
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/product/box/list/' + '?productCode=' + this
						.productCode,
					method: "GET",
					header: {
						'token': this.token
					},
					success: res => {
						// let data = JSON.parse(res.data);
						this.boxList = res.data.data;
						// console.log('boxList',this.boxList);
						if (uni.getStorageSync('productBoxCode')) {
							var pbc = uni.getStorageSync('productBoxCode');
							that.boxList.forEach(function(item, index) {
								if (pbc == item.productBoxCode) {
									that.oldId = index + 1;
								}
							})
						}
						this.checkBox();
						if (this.boxRemain) {
							this.boxList[this.oldId - 1].choose = true;
							this.proList = this.boxList[this.oldId - 1].productBoxItemVoList;
							console.log(this.proList);
							this.boxId = this.boxList[this.oldId - 1].productBoxName;

							this.getAmount();
							this.productBoxCode = this.boxList[this.oldId - 1].productBoxCode;
							this.getQueueInfo();
						} else {
							that.line.length = -1;
						}

						// console.log(this.productBoxCode)
					}
				})
			},
			getUserPostcard() {
				var that = this;
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/user/postcard/list',
					method: "GET",
					header: {
						'token': this.token
					},
					success: res => {
						// console.log(this.curProduct);
						res.data.data.forEach(function(item) {
							if (Number(item.postcardName) == Number(that.curProduct.price)) {
								that.postcard.amount = item.amount;
								that.postcard.imgUrl = item.imgUrl;
								that.postcardCode = item.postcardCode;
								uni.setStorage({
									key: "postcardCode",
									data: item.postcardCode
								})
							}
						})
					}
				})
			},
			getUserCurrency() {
				return new Promise((resolve, reject) => {
					uni.request({
						url: 'http://123.60.71.74:20001/' + 'mh/user/currency/info',
						method: "GET",
						header: {
							'token': this.token
						},
						success: res => {
							resolve(res.data.data.currencyAmount)
						},
						fail: (err) => {
							reject(err)
						}
					})
				})
			},
			getQueueInfo() {
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/user/queue/info' + '?productBoxCode=' + this
						.productBoxCode,
					method: "POST",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': this.token
					},
					success: res => {
						this.line.size = res.data.data.size;
						this.line.length = res.data.data.myPositionBeforeNum;
						this.line.myPosition = res.data.data.myPosition;
						if (this.line.length == 0 && this.firstTime) {
							this.updateFirst(0);
							this.firstTime = false;

						}
						if (this.line.length == 0) {
							console.log('queue', this.line.length, 'time', this.startTime, this.endTime);
						}
					}
				})
			},
			queuingAdd() {
				this.line.queue = false;
				this.setCountDown();
				const addTime = Date.now();
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/user/queue/add' + '?productBoxCode=' + this
						.productBoxCode,
					method: "POST",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': this.token
					},
					data: {
						addTime
					},
					success: res => {
						// let data = JSON.parse(res.data);
						this.getQueueInfo();
						console.log('add', res);
						this.line.size = res.data.data.size;
						this.line.length = res.data.data.myPositionBeforeNum;
						this.line.myPosition = res.data.data.myPosition;

						this.subscribe()
						uni.setStorageSync('productBoxCode', this.productBoxCode)
					}
				})
			},
			queuingLeave() {
				this.line.queue = true;
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/user/queue/leave' + '?productBoxCode=' + this
						.productBoxCode,
					method: "POST",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': this.token
					},
					success: res => {
						// let data = JSON.parse(res.data);
						console.log('leave', res);
						this.line.size = res.data.data.size;
						this.line.length = res.data.data.myPositionBeforeNum;
						this.line.myPosition = res.data.data.myPosition;
						uni.removeStorageSync('isQueue')
						uni.removeStorageSync('productBoxCode')
						this.firstTime = true
					}
				})
			},
			requeue() {
				this.queuingLeave();
				this.alertMessage('已过期，请重新排队！');
				var that = this;
				setTimeout(function() {
					uni.redirectTo({
						url: 'play'
					})
				}, 1000);
			},
			changeShow() {
				if (this.line.length < 0) {
					this.$refs.changebox.open('bottom');
					this.getProductBox();
				}
			},
			changeBox(item, index) {
				var that = this;
				that.newId = index + 1;
				if (that.oldId !== that.newId) {
					item.choose = true;
					that.boxList[that.oldId - 1].choose = false;
					that.proList = item.productBoxItemVoList;
				}
				that.oldId = that.newId;
				this.getProductBox();
				this.getAmount();
			},
			refresh() {
				this.getQueueInfo();
				this.getProductBox();
				console.log('刷新')
			},
			fav() {
				uni.request({
					url: "http://123.60.71.74:20001/" + "/mh/user/favourite/add",
					method: 'POST',
					header: {
						'Content-Type': 'application/json',
						'token': this.token
					},
					data: {
						'productCode': this.productCode
					},
					success: res => {
						console.log(res)
						uni.showToast({
							title: '收藏成功！',
							icon: 'none'
						})
					}
				})
			},
			alertMessage(msg) {
				var that = this;
				that.msgAlert = msg;
				this.$refs.message.open('center');
				setTimeout(function() {
					that.$refs.message.close()
				}, 1000)
			},
			buy(n) {
				var that = this;
				if(!uni.getStorageSync('rules')){
					this.showRule()
					return
				}
				if (that.line.length == -1) {
					that.alertMessage('请先加入队列！');
				} else if (that.line.length > 0) {
					that.alertMessage('排队中，请稍候！');
				} else if (that.line.length == 0) {
					if (typeof(n) == 'number') {
						that.quantity = n;
					} else if (typeof(n) == 'string') {
						that.quantity = that.curProduct.leftAmount;
					}
					if (that.postcard.amount >= that.quantity) {
						that.order();
					} else {
						that.cardLess()
					}
				}
			},
			order() {
				var that = this;
				that.$refs.order.open('center');
			},
			cardLess() {
				this.$refs.pcless.open('center');
			},
			buyPostcard() {
				var that = this;
				that.$refs.pcless.close();
				that.$refs.buyCard.open('center');
				that.buyValue = that.quantity - that.postcard.amount;
			},
			newBuyPostcard() {
				this.$refs.buyCard.open('center');
				this.buyValue = 1;
			},
			changeValue(value) {
				this.buyValue = value;
			},
			async orderPay() {
				var that = this;
				if (that.buyValue > 0) {
					if (that.payType == 'sxPay') {
						that.userCurrency = await that.getUserCurrency()
						if (that.userCurrency >= that.curProduct.price * that.buyValue) {
							that.postcardAdd();
							that.currencyMinus();
							uni.showToast({
								title: '购买成功！',
								icon: 'none'
							})
							setTimeout(function() {
								that.$refs.buyCard.close();
							}, 1000)
						} else {
							uni.showToast({
								title: '余额不足！',
								icon: 'none'
							})
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/user/deposit'
								})
							}, 1000)
						}
					} else {
						this.wxPay();
						if (that.checkWxPay()) {
							that.postcardAdd();
							uni.showToast({
								title: '购买成功！',
								icon: 'none'
							})
							setTimeout(function() {
								that.$refs.buyCard.close();
							}, 1000)
						}
					}
				} else if (that.buyValue == 0) {
					uni.showToast({
						title: '购买数不能为0！',
						icon: 'none'
					})
				} else {
					that.$refs.buyCard.close();
					that.alertMessage('购买失败，请重试！');
				}
			},
			checkWxPay() {
				return true
			},
			currencyMinus() {
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/user/currency/minus',
					method: "POST",
					header: {
						'token': this.token,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						currencyAmount: this.curProduct.price * this.buyValue
					},
					success: (res) => {
						console.log(res);
					}
				})
			},
			postcardAdd() {
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/user/postcard/add',
					method: "POST",
					header: {
						'Content-Type': "application/x-www-form-urlencoded",
						'token': this.token
					},
					data: {
						postcardCode: this.postcardCode,
						amount: this.buyValue
					},
					success: (res) => {
						// console.log(res)
						this.getUserPostcard()
					}
				})
			},
			postcardMinus() {
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/user/postcard/minus',
					method: "POST",
					header: {
						'Content-Type': "application/x-www-form-urlencoded",
						'token': this.token
					},
					data: {
						postcardCode: this.postcardCode,
						amount: this.quantity
					},
					success: (res) => {
						// console.log(res)
						this.getUserPostcard()
					}
				})
			},
			changePayType(e) {
				this.payType = e + 'Pay';
			},
			playReady() {
				this.gashaponShow = true;
				this.$refs.order.close();
			},
			goAbout() {
				uni.navigateTo({
					url: '/pages/about/about'
				})
			},
			closeMask(msg) {
				this.gashaponShow = msg;
				this.confirmPlay = msg;
			},
			subscribe() {
				var that = this;
				uni.requestSubscribeMessage({
					tmplIds: ['G6mHGH66jrnVIKxKoTcGvkQ0M7yN52rNswef-KqyuNs',
						'JEduhzoEoYLKZR5DG0MievdtCs042zSXslsuCfFUPM0'
					],
					success(res) {
						that.noticeStart()
						console.log('success');
					},
					fail: (res) => {
						clog(res)
					}
				})
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/open/wx/secret',
					method: 'GET',
					success: (res) => {
						this.secret = res.data.data;
						this.getAccessToken();
					}
				})
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/open/wx/openId',
					method: 'GET',
					header: {
						'token': this.token
					},
					success: (res) => {
						this.openid = res.data.data;
						// console.log(res)
					}
				})
			},
			getAccessToken() {
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/open/wx/access/token',
					method: 'GET',
					success: (res) => {
						this.accessToken = res.data.data;
					}
				})
			},
			noticeStart() {
				var that = this;
				const now = new Date();
				var timeValue = now.getFullYear() + '年' + now.getMonth() + '月' + now.getDate() + '日 ' + now.getHours() +
					':' + now.getMinutes() + ':' + now.getSeconds();
				// console.log(timeValue);
				const pushmsg = {
					"touser": that.openid,
					"template_id": "G6mHGH66jrnVIKxKoTcGvkQ0M7yN52rNswef-KqyuNs",
					"data": {
						"thing6": {
							"value": that.curProduct.productName
						},
						"number7": {
							"value": that.line.size
						},
						"time8": {
							"value": timeValue
						}
					}
				}
				uni.request({
					url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + that
						.accessToken,
					method: 'POST',
					data: JSON.stringify(pushmsg),
					success: (res) => {
						// console.log(res)
					}
				})
			},
			noticeSuccess() {
				var that = this;
				const pushmsg = {
					"touser": that.openid,
					"template_id": "",
					"data": {
						"thing1": {
							"value": that.curProduct.productName
						},
						"character_string2": {
							"value": that.line.myPositionBeforeNum
						},
						"number3": {
							"value": "5"
						},
						"time4": {
							"value": "2022-08-17 12:00:00"
						},
						"thing5": {
							"value": "备注信息"
						}
					}
				}
				uni.request({
					url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + that
						.accessToken,
					method: 'POST',
					data: JSON.stringify(pushmsg),
					success: (res) => {
						console.log(res)
					}
				})
			},
			setCountDown() {
				this.startcd = false;
				if (this.startTime) {
					const cd = this.startTime + 60000 * 3 - Date.now();
					this.cdMinute = Math.floor(cd / 1000 / 60 % 60);
					this.cdSecond = Math.floor(cd / 1000 % 60);
				} else {
					this.cdMinute = 3;
					this.cdSecond = 0;
				}
				this.$nextTick(() => {
					this.startcd = true;
				})
			},
			addSeconds(msg) {
				var that = this;
				if (this.quantity == '5' && msg) {
					let t = this.startTime + 60000 * 3 - Date.now();
					let min = Math.floor(t / 1000 / 60 % 60);
					let sed = Math.floor(t / 1000 % 60);
					if (sed > 30 && min == 2) {
						that.cdSecond = 0;
						that.cdMinute = 3;
						console.log(min, sed)
					} else {
						that.cdMinute = min;
						that.cdSecond = t.getSeconds() + 30;
						console.log(min, sed)
					}
				}
			},
			checkBox() {
				var that = this;
				this.boxRemain = 0;
				this.boxList.forEach(function(item) {
					var t = 0;
					item.productBoxItemVoList.forEach(function(i) {
						t += i.leftAmount;
					})
					if (t == 0) {
						item.isEmpty = true
					} else {
						item.isEmpty = false;
						that.boxRemain++;
					}
				})
			},
			closeView(msg) {
				this.viewShow = msg;
			},
			imgPreview(item, index) {
				this.imgIndex = index;
				this.viewShow = true
			},
			updateFirst(n) {
				if (n == 0) {
					let stime = Date.now();
					let etime = Date.now() + 60000 * 3;
					uni.request({
						url: 'http://123.60.71.74:20001/' + 'mh/user/queue/in/turn' + '?productCode=' + this
							.productCode,
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'token': uni.getStorageSync('token')
						},
						data: {
							startTime: stime,
							endTime: etime,
							productBoxCode: this.productBoxCode
						},
						success: (res) => {
							if (!uni.getStorageSync('isQueue')) {
								console.log('updateFirst', res);
								uni.setStorageSync('isQueue', 'true')
							}
						}
					})
					this.getStartTime();
				} else {
					this.getStartTime();
					let stime = this.startTime;
					let etime = this.endTime + 30000 * n;
					uni.request({
						url: 'http://123.60.71.74:20001/' + 'mh/user/queue/in/turn' + '?productCode=' + this
							.productCode,
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'token': uni.getStorageSync('token')
						},
						data: {
							startTime: stime,
							endTime: etime
						},
						success: (res) => {
							console.log('add30s', res);
						}
					})
				}
			},
			regularUpdate() {
				this.interval = setInterval(() => {
					this.getQueueInfo();
					console.log('update');
				}, 10000)
			},
			getStartTime() {
				this.productBoxCode = uni.getStorageSync('productBoxCode');
				if (!this.productBoxCode) {
					console.log('未加入队列');
					this.firstTime=true;
					return
				} else {
					this.firstTime=false;
					uni.request({
						url: 'http://123.60.71.74:20001/' + 'mh/user/queue/in/turn/check' +
							'?productBoxCode=' + this.productBoxCode,
						method: 'GET',
						header: {
							'token': uni.getStorageSync('token')
						},
						success: (res) => {
							this.startTime = res.data.data.startTime;
							this.endTime = res.data.data.endTime;
						}
					})
				}

			},
			showRule() {
				this.$refs.rule.open('center');
			},
			agreeClick(n) {
				switch (n) {
					case 1:
						this.rules.buyRule = !this.rules.buyRule
						break;
					case 2:
						this.rules.userRule = !this.rules.userRule
						break;
					default:
						break;
				}
			},
			agreeRules() {
				if(this.rules.buyRule && this.rules.userRule){
					uni.setStorageSync('rules','ture')
					this.$refs.rule.close()
				}else{
					uni.showToast({
						title:'请阅读并打勾!',
						icon:'none'
					})
				}
			},
			toPage(url){
				uni.navigateTo({
					'url':url
				})
			}
		},
		onShow() {
			clearInterval(this.interval);
			// #ifndef H5
			if (uni.getStorageSync('userInfo')) {
				this.token = uni.getStorageSync('token');
				// console.log(this.token);
			} else {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				setTimeout(function() {
					uni.switchTab({
						url: '../../pages/user'
					})
				}, 1000)
			}
			// #endif
			uni.getStorage({
				key: "productCode",
				success: (res) => {
					this.productCode = res.data;
					// console.log(this.productCode)
					this.getJson()
				}
			});
			this.getStartTime();
			this.$nextTick(()=>{
				this.setCountDown();
			});
			this.regularUpdate();
			
		},
		onUnload() {
			clearInterval(this.interval)
			console.log('stop');
		},
		mounted() {

		},
		watch: {
			confirmPlay: function(newval) {
				if (newval) {
					this.postcardMinus();
				}
			}
		}
	}
</script>

<style lang="scss">
	.container-play {
		position: relative;
		width: 100%;
		height: calc(100vh - 50rpx);
	}

	.play-head {
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-start;
		position: relative;
		padding: 0 12rpx 0 20rpx;

		.play-head-left {
			width: 202rpx;
			height: 202rpx;
			background: url(https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/mainpic-b.png) no-repeat;
			background-size: 100%;

			img,
			image {
				width: 180rpx;
				height: 180rpx;
				margin: 11rpx;
			}
		}

		.play-head-right {
			padding: 30rpx 20rpx 0;
			width: 525rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			text {
				width: 390rpx;
				height: 80rpx;
				font-size: 30rpx;
				color: #020202;
				line-height: 40rpx;
				overflow: hidden;
			}

			.remain {
				width: 265rpx;
				position: relative;

				.progress {
					width: 100%;
					height: 30rpx;
				}

				.t-l {
					width: 50%;
					font-size: 20rpx;
					line-height: 30rpx;
					color: #575757;
					position: absolute;
					top: 0;
					left: 8rpx;
				}

				.t-r {
					width: 50%;
					font-size: 22rpx;
					line-height: 30rpx;
					color: #020202;
					position: absolute;
					top: 0;
					right: 8rpx;
				}

				.box-remain {
					font-size: 24rpx;
					margin-top: 5rpx;
				}
			}

			.changeBox {
				width: 133rpx;
				height: 56rpx;
				border-radius: 10rpx;
				background: url(https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/change.png) no-repeat #6A3906;
				background-position: 25rpx 18rpx;
				background-size: 23rpx 22rpx;
				color: #fcfbfb;
				font-size: 24rpx;
				line-height: 56rpx;
				padding-left: 62rpx;
			}
		}

		.about {
			position: absolute;
			right: 32rpx;
			top: 30rpx;
			width: 46rpx;
			height: 46rpx;
			border-radius: 10rpx;
			background-color: #C9C9C8;
			color: #FCFBFB;
			font-size: 32rpx;
			line-height: 46rpx;
		}
	}

	::v-deep .uni-progress-bar {
		border-radius: 8rpx;
	}

	::v-deep .uni-progress-inner-bar {
		border-radius: 8rpx;
	}

	.play-line {
		border-top: 1px solid #f7f7f7;
		border-bottom: 1px solid #f7f7f7;
		padding: 13rpx 32rpx 13rpx 42rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;

		.play-line-left {
			.line-text {
				font-size: 26rpx;
				color: #020202;
				display: flex;
				flex-wrap: nowrap;
				align-items: center;

				.line-text-number {
					font-size: 34rpx;
				}

				.pic {
					width: 24rpx;
					height: 24rpx;
				}
			}

		}

		.play-line-right {
			.btn-line {
				width: 204rpx;
				height: 56rpx;
				background-color: #F9B002;
				border-radius: 28rpx;
				position: relative;
				color: #fff;
				font-size: 24rpx;
				line-height: 56rpx;
				padding-left: 75rpx;
				border: 0;

				.i {
					position: absolute;
					left: 34rpx;
					top: 50%;
					transform: translateY(-50%);
					width: 28rpx;
					height: 28rpx;
					line-height: 20rpx;
					font-size: 26rpx;
					border: 2rpx solid #fff;
					border-radius: 28rpx;
				}

				&::after {
					display: none;
				}
			}

			.quit {
				background-color: #FEE8B4 !important;
				color: #FE9703;

				.i {
					border-color: #FE9703;
					color: #FE9703;
				}
			}
		}
	}

	.play-collected {
		padding: 18rpx 40rpx 22rpx 38rpx;

		.play-collected-title {
			font-size: 24rpx;
			color: #636363;
		}

		.play-collected-list {
			display: flex;
			flex-wrap: nowrap;
			justify-content: flex-start;
			margin-top: 15rpx;

			.border {
				position: relative;
				width: 86rpx;
				height: 86rpx;
				margin-right: 10rpx;
				border-radius: 10rpx;

				.empty {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					background-color: rgba(2, 2, 2, 0.5);
					border-radius: 10rpx;
					font-size: 34rpx;
					line-height: 86rpx;
					font-weight: bold;
					color: #FDFCFC;
				}
			}
		}
	}

	.play-products {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding: 20rpx 27rpx;
		border-top: 15rpx solid #f7f7f7;

		.border {
			width: 174rpx;
			position: relative;
			background: url(https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/play/pro-b.png) no-repeat center top;
			background-size: 174rpx 174rpx;
			padding: 7rpx;

			.pic {
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
				position: relative;

				img,
				image {
					display: block;
				}
			}


			.type {
				position: absolute;
				top: 7rpx;
				left: 7rpx;
				width: 54rpx;
				height: 54rpx;
				line-height: 54rpx;
				color: #F9B002;
				background-color: #020202;
				font-size: 34rpx;
				font-weight: bold;
				border-radius: 10rpx;
			}

			.amounts {
				position: absolute;
				right: 9rpx;
				bottom: 41rpx;
				color: #FDFDFD;
				background-color: rgba(2, 2, 2, 0.5);
				width: 68rpx;
				height: 36rpx;
				line-height: 36rpx;
				border-radius: 10rpx 0 10rpx 0;
				font-size: 24rpx;
			}

			.name {
				font-size: 24rpx;
				line-height: 36rpx;
				height: 36rpx;
				width: 174rpx;
				white-space: nowrap;
				color: #636363;
				overflow: hidden;
				padding: 0 7rpx;
				text-overflow: ellipsis;
			}

			.empty {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				z-index: 10;
				background-color: rgba(2, 2, 2, 0.5);
				line-height: 160rpx;
				color: #FDFCFC;
				font-size: 34rpx;
				border-radius: 10rpx;
			}
		}
	}

	.play-footer {
		width: 100%;
		height: 100rpx;
		position: absolute;
		background-color: #fff;
		border-top: 2rpx solid #f7f7f7;
		z-index: 50;
		bottom: 0;
		left: 0;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		padding: 0 35rpx 0 15rpx;
		align-items: center;

		.play-footer-cards {
			width: 189rpx;
			height: 68rpx;
			border-radius: 10rpx;
			background-color: #FAC74B;
			color: #FCFCFC;
			font-size: 26rpx;
			line-height: 68rpx;

			text {
				font-size: 34rpx;
			}
		}

		.play-footer-buy {
			font-size: 30rpx;
			color: #000;
			line-height: 68rpx;
			padding: 0 20rpx;
		}
	}

	.play-aside {
		position: absolute;
		right: 50rpx;
		bottom: 155rpx;
		z-index: 10;

		.play-fav {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			border: 3rpx solid #FDAD13;
			background-color: #fff;
			color: #FDAD13;
			font-size: 24rpx;
			line-height: 74rpx;
		}

		.play-refresh {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background-color: #FDAD13;
			position: relative;
			margin-top: 30rpx;

			.pic {
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				top: 20rpx;
				left: 20rpx;
			}
		}
	}

	.popup-changebox {
		padding: 20rpx;

		.popup-title {
			font-size: 28rpx;
			color: #020202;
			line-height: 36rpx;
		}

		.popup-content {
			margin-top: 25rpx;
			max-height: 700rpx;

			.box {
				display: flex;
				flex-wrap: nowrap;
				margin-bottom: 20rpx;
				position: relative;

				.item-left {
					position: relative;
					border: 1rpx solid #FDA805;
					border-radius: 3rpx 0 0 3rpx;
					width: 60rpx;
					font-size: 34rpx;
					color: #020202;
					display: inline-flex;
					align-items: center;
					justify-content: center;

					.pic {
						width: 36rpx;
						height: 26rpx;
					}

					.choose {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background-color: #FCF5E3;

						.pic {
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);
						}
					}
				}

				.item-right {
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					align-content: flex-start;
					width: calc(100% - 59rpx);
					margin-left: -1rpx;
					border: 1rpx solid #FDA805;
					padding: 17rpx 17rpx 0;

					.boxes {
						height: 42rpx;
						flex: 0 0 20%;
						margin-bottom: 20rpx;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						padding-right: 30rpx;

						.boxes-type {
							font-size: 24rpx;
							color: #020202;
						}

						.boxes-amount {
							font-size: 20rpx;
							color: #020202;
						}

						.progress {
							width: 100%;
						}
					}
				}

				.box-empty {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					z-index: 10;
					background-color: rgba(0, 0, 0, 0.5);
					color: #fff;
					font-size: 30rpx;
					line-height: 80rpx;
					font-weight: bold;
					text-align: center;
				}
			}
		}
	}

	::v-deep .popup-changebox .uni-popup__wrapper {
		background-color: #fff !important;
		border-radius: 20rpx 20rpx 0 0;
		padding: 20rpx;
		height: 850rpx;
	}

	::v-deep .popup-alert .uni-popup__info {
		background-color: #434242 !important;
		width: 300rpx;
		height: 60rpx;
		border-radius: 10rpx;
		text-align: center;
		border: 0 !important;
	}

	::v-deep .popup-alert .uni-popup__info-text {
		font-size: 24rpx;
		line-height: 60rpx;
		color: #FCFBFB !important;
	}

	::v-deep .popup-alert .uni-popup-message__box {
		padding: 0 10rpx !important;
	}

	.popup-title {
		font-size: 28rpx;
		color: #020202;
		line-height: 42rpx;

		.rules {
			float: right;
			font-size: 24rpx;
		}
	}

	.popup-order {
		.popup-center {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			margin-top: 20rpx;

			.order-img {
				width: 408rpx;
				height: 125rpx;
				border-radius: 10rpx;
			}

			.quantity {
				font-size: 24rpx;
				color: #020202;

				text {
					font-size: 30rpx;
				}
			}

			.postcard {
				margin-top: 40rpx;
				width: 100%;
				font-size: 24rpx;
				color: #646363;

				text {
					font-size: 30rpx;
				}
			}
		}

		.popup-bottom {
			margin: 65rpx auto 0;
		}
	}

	::v-deep .popup-order,
	::v-deep .popup-postcard-less,
	::v-deep .popup-buyCard {
		.uni-popup__wrapper {
			background-color: #fff !important;
			border-radius: 20rpx;
			padding: 25rpx 40rpx 50rpx;
			width: 690rpx;
		}
	}

	::v-deep .popup-order,
	::v-deep .popup-postcard-less,
	::v-deep .popup-buyCard {
		uni-button {
			background-color: #FDB302 !important;
			height: 68rpx;
			font-size: 26rpx;
			line-height: 68rpx;
			width: 320rpx;
			border-radius: 10rpx;
		}
	}

	button {
		background-color: #FDB302 !important;
		height: 68rpx;
		font-size: 26rpx;
		line-height: 68rpx;
		width: 320rpx;
		border-radius: 10rpx;
	}

	.popup-postcard-less {
		.popup-center {
			font-size: 28rpx;
			color: #020202;
			margin-top: 40rpx;
		}

		.popup-bottom {
			margin-top: 70rpx;
		}
	}

	.popup-buyCard {
		.popup-center {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			margin-top: 20rpx;

			.order-img {
				width: 408rpx;
				height: 125rpx;
				border-radius: 10rpx;
			}

			.quantity {
				margin-left: 30rpx;
				margin-top: 20rpx;
				width: 160rpx;
				overflow: visible;

				.totalPrice {
					margin-top: 15rpx;
					font-size: 24rpx;
					color: #020202;
					width: 200rpx;

					text {
						font-size: 34rpx;
					}
				}
			}
		}

		.pay-type {
			margin-top: 35rpx;

			.pay-type-item {
				width: 100%;
				height: 80rpx;
				background-color: #F6F6F6;
				margin-bottom: 20rpx;
				display: flex;
				flex-wrap: nowrap;
				justify-content: flex-start;
				align-items: center;
				border-radius: 8rpx;
				padding: 0 20rpx 0 15rpx;

				.pay-icon {
					width: 32rpx;
					height: 32rpx;
				}

				.txt {
					width: 450rpx;
					margin-left: 15rpx;
					margin-right: 30rpx;
					font-size: 24rpx;
					color: #020202;
				}

				.choose {
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
					border: 1rpx solid #FDB302;
					background-color: #FDF5E2;
					position: relative;
					overflow: hidden;

					.active {
						position: absolute;
						top: 0%;
						left: 0%;
						width: 100%;
						height: 100%;
						background-color: #FDB302;

						.pic {
							position: absolute;
							top: 50%;
							left: 50%;
							width: 16rpx;
							height: 11rpx;
							transform: translate(-50%, -50%);
						}

					}
				}
			}
		}
	}

	::v-deep .popup-buyCard .uni-numbox-btns {
		width: 51rpx;
		height: 50rpx;
		background-color: #fff !important;
		border: 1rpx solid #c1c1c1;
		border-radius: 8rpx 0 0 8rpx;

		.uni-numbox--text {
			font-size: 30rpx;
			color: #020202 !important;
		}
	}

	::v-deep .popup-buyCard .uni-numbox__plus {
		border-radius: 0 8rpx 8rpx 0;
	}

	::v-deep .popup-buyCard .uni-numbox__value {
		width: 48rpx;
		height: 50rpx;
		border-top: 1rpx solid #c1c1c1;
		border-bottom: 1rpx solid #c1c1c1;
		background-color: #F7F5F5 !important;
		margin: 0;
		box-sizing: border-box;
		border-radius: 0;

		.uni-input-input {
			font-size: 30rpx;
			color: #020202;
		}
	}


	::v-deep .popup-rule {
		.uni-popup__wrapper {
			background-color: #fff !important;
			border-radius: 20rpx;
			padding: 25rpx 40rpx 50rpx;
			width: 690rpx;
			height: 650rpx;
		}
	}

	.popup-rule {
		position: relative;

		.popup-center {
			.rule {
				height: 400rpx;
			}

			.part {
				margin-top: 20rpx;
			}

			.p {
				font-size: 26rpx;
				margin-bottom: 10rpx;
				color: #666;
			}
		}

		.popup-bottom {
			margin-top: 50rpx;

			.agree {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				margin-bottom: 25rpx;

				.img {
					width: 30rpx;
					height: 30rpx;
					border-radius: 5rpx;
					border: 2rpx solid #FDB302;
					margin-right: 15rpx;

					.pic {
						width: 20rpx;
						height: 15rpx;
						margin: 7rpx auto;
					}
				}

				.choose {
					background-color: #FDF5CD;
				}

				.text {
					font-size: 28rpx;
					margin-right: 10rpx;
				}

				.go-rule {
					font-size: 28rpx;
					color: #FDB302;
				}
			}
		}

		.popup-out {
			position: absolute;
			left: 0;
			bottom: -100rpx;
			width: 100%;

			.btn {
				margin: 0 auto;
			}
		}
	}
</style>
