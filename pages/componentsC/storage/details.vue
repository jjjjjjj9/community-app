<template>
	<view>
		<view  v-if="list" >
			<view class="body">
					<view>
						<image :src="list.ioc" mode="widthFix" class="image"></image>
					</view>
					<view class="gungbo">
						 <u-notice-bar text="所有业主在购买喜欢的商品时,与发布业主沟通后,确保商品没问题,再行购买!"></u-notice-bar>
					</view>
					<view class="mo">
						
						<view>
							<text class="biaodjia">{{list.title}} </text>
						</view>
						<view class="beni">
							<u--text type="primary" :text="list.classname"></u--text>
						</view>
						
						<view class="beni">
							<text class="pay" >预算价格：￥{{list.pay}}</text>
						</view>
						<view class="beni">
							<text class="cem" >联系人：{{list.aname}}</text>
						</view>
						<view class="beni">
							<text class="cem" >联系电话：********</text>
							<text class="boda" @click="bo(list.bname)">立即联系</text>
						</view>
						
					</view>
					<view class="mod">
						<view class="biaodjia">商品描述</view>
						<view class="neict">{{list.content}}</view>
					</view>
					<view class="mod">
						<view class="biaodjia">商品详情图</view>
						<view class="neict">
							<view v-for="(itme,index) in list.ioclist.split(',')" :key="index">
								<image :src="itme" mode="widthFix" class="image"></image>
							</view>
						</view>
					</view>
				</view>
		</view>
		<view  v-if="list==null">
			<u-empty marginTop="100"
			        mode="search"
			        icon="https://cdn.uviewui.com/uview/empty/search.png"
			>
			</u-empty>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: null
			}
		},
		onLoad(e) {	
			this.gethome(e.id)
		},
		onShow() {
			
		},
		methods: {
			gethome(id) {
				uni.$u.http.post('Placing/byData', {id:id}).then(res => {
					this.list = res.data;
					
				})
			},
			bo(e){
				uni.makePhoneCall({
					phoneNumber:e,//电话号码
					success:function(e){
						console.log(e);
					},
					fail:function(e){
						console.log(e);
			
					}
				})
			}
			
			
		},
		
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.body{
			margin: 20rpx;
		}
		.image{
			width: 100%;
			/* border-radius: 10rpx; */
		}
		.xiangce{
			margin-top: -140rpx;
			padding: 20rpx;
		}
		.tab-scroll-view {
			width: 90vw;
			height: 110rpx;
			flex-direction: row;
			white-space: nowrap;
			overflow:hidden;
			
		}
		.tab-item {
			display: inline-block;
			width: 110rpx;
			height: 110rpx;
		}
		.tuxiang{
			width: 100rpx;
			height: 100rpx;
			border-radius: 10rpx;
		}
		
		.mo{
			margin-top: 20rpx;
			border-radius:10rpx;
			border:1rpx solid  #e8e6e6;
			/* box-shadow: 3rpx 8rpx 5rpx #e8eae8; */
			padding: 30rpx 20rpx;
		}
		.name{
			font-size: 32rpx;
			font-weight: 600;
		}
		.beni{
			margin-top: 20rpx;
			padding-left: 10rpx;
		}
		.cem{
			margin-right: 20rpx;
			color: #919191;
			font-size: 30rpx;
		}
		.mod{
			margin-top: 20rpx;
			border-radius:10rpx;
			border:1rpx solid  #e8e6e6;
			padding: 20rpx;
		}
		.biaodjia{
			border-left: 10rpx solid  #55aaff;
			font-size: 32rpx;
			font-weight: 600;
			padding-left: 15rpx;
		}
		.boda{
			color: #55aaff;
			font-size: 30rpx;
			margin-left: 20rpx;
		}
		.neict{
			padding-top: 20rpx;
			color: #9f9f9f;
			font-size: 30rpx;
			letter-spacing:2rpx;
			line-height: 50rpx;
		}
		.cdbh{
			margin-bottom: 160rpx;
		}
		
		.fuchis{
			
			font-size: 26rpx;
			width: 100rpx;
			height: 100rpx;
			background-color: #222;
			color: #fff;
			/* padding: 10rpx; */
			border-radius: 50%;
		}
		.fuchis1{
			padding: 18rpx 8rpx 0rpx 8rpx ;
			font-size: 24rpx;
			width: 100rpx;
			height: 100rpx;
			background-color: #222;
			color: #fff;
			/* padding: 10rpx; */
			border-radius: 50%;
		}
		.xuanzexs{
			width: 100%;
		}
		.xuanzexs button{
			font-size: 30rpx;
			width: 250rpx;
			background-color: #222;
			color: #fff;
		}
		.pay{
			color: red;
		}
</style>