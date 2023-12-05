<template>
	<view>
		<view class="huodong_body">
			<u-row >
				<u-col span="4">
					<view :class="aid==0?'title_hend_x':'title_hend'" @click="xz(0)">审核中</view>
				</u-col>
				<u-col span="4">
					<view :class="aid==1?'title_hend_x':'title_hend'" @click="xz(1)">已通过</view>
				</u-col>
				<u-col span="4">
					<view :class="aid==2?'title_hend_x':'title_hend'" @click="xz(2)">失败</view>
				</u-col>
			</u-row>
		</view>
		<view class="biankuang" v-for="(itme,index) in list " @click="JOM(itme.id)">
			<image :src="itme.ioc" mode="widthFix" class="huodongimage"></image>
			<view class="huodongtitle">{{itme.title}}</view>
			<view class="huodongtitle"><text>报名状态：{{itme.zid==0?"审核中": itme.zid==2?"报名失败,如有疑问请联系物业！":"已通过"}}</text></view>
		</view>
		
		<view v-if="list.length==0">
			<u-empty marginTop="100"
					text="暂无活动"
			        mode="message"
			        icon="https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/nei.png"
			>
			</u-empty>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				aid:0,
				list: [],
				page: 1,
				xia:0
			}
		},
		onLoad(e) {
			this.list=[];
			this.gethome()
		},
		onShow() {
			
		},
		methods: {
			xz(e){
				this.aid=e;
				this.list=[];
				this.gethome()
			},
			gethome() {
				uni.$u.http.post('ActivityUser/xcxList', {lx:this.aid,uid:uni.getStorageSync('userData').uid}).then(res => {
					this.list =res.data
					
				})
			},
			JOM(id){
				uni.$u.route({
					url: "/pages/componentsB/activity/details?id="+id
				})
			}
				
		},
		
	}
</script>

<style lang="scss">
	// .biankuang{
	// 	box-shadow: 6rpx 6rpx 8rpx  #cbcbcb;
	// 	margin: 20rpx 20rpx 60rpx 20rpx;
	// }
	// .image{
	// 	width: 100%;
	// }
	// .title{
	// 	line-height: 50rpx;
	// 	color: #333;
	// 	font-size: 28rpx;
	// 	padding-left: 20rpx;
	// 	letter-spacing:2rpx;
	// 	padding-bottom: 10rpx;
	// }
	// .title text{
	// 	color: #55aaff !important;
	// 	font-size: 30rpx !important;
	// 	font-weight: 600;
	// }
</style>