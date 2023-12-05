<template>
	<view>
		<view class="body_gong"  @longpress='copyText'>
			<view class="title1">物业对公账户信息</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="title">开户行：{{list.appid}}</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="title">收款姓名：{{list.secret}}</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="title">收款账号：{{list.endpoint}}</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="title2">长按复制账户信息</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {}
			}
		},
		onLoad() {
			this.gethome()
		},
		onShow() {
			
		},
		methods: {
			gethome(id) {
				uni.$u.http.post('Basic/byDate', {lxid:5}).then(res => {
					this.list = res.data;
					
				})
			},
			copyText() {
				uni.setClipboardData({
				data:this.list.appid +" "+this.list.secret +" "+this.list.endpoint, 
				success() {
					uni.showToast({
						title:'已复制到剪贴板',
						icon:'none',
						position:'top'
					        })
						}
					})
			}
			 
			
		},
		
	}
</script>

<style>
	.title{
		padding-left: 10rpx;
		font-size: 30rpx;
		line-height: 60rpx;
		color:#e26363;
	}
	.title1{
		padding-left: 10rpx;
		font-size: 30rpx;
		line-height: 60rpx;
		color:#333;
		font-weight: 600;
	}
	.title2{
		text-align: center;
		font-size: 30rpx;
		line-height: 60rpx;
		color:#828282;
		
	}
</style>