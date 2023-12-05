
<template>
	<view>
		<view class="contaier" style="background-color: #FFFFFF;">
			<view class="top_bg">
				<view class="one_box">
					<!-- 第二名 -->
					<view class="top3">
						<view class="num_two">
							<image class="huangguan2" src="@/static/images/two.png"></image>
							<image class="top3_head" :src="rankList[1].ioc"></image>
							<view class="top_name">{{rankList[1].name}}</view>
							<view class="top_sy">赞：<span>{{rankList[1].aixin>0?rankList[1].aixin:"0"}}</span></view>
						</view>
					</view>

					<!-- 第一名 -->
					<view class="top3">
						<view class="num_one">
							<image class="huangguan1" src="@/static/images/one.png"></image>
							<image class="top3_head" :src="rankList[0].ioc"></image>
							<view class="top_name text-bold" style="font-size: 30rpx;">{{rankList[0].name}}</view>
							<view class="top_sy">赞：<span>{{rankList[0].aixin>0?rankList[0].aixin:"0"}}</span></view>
						</view>
					</view>

					<!-- 第三名 -->
					<view class="top3">
						<view class="num_three">
							<image class="huangguan2" src="@/static/images/three.png"></image>
							<image class="top3_head" :src="rankList[2].ioc" ></image>
							<view class="top_name">{{rankList[2].name}}</view>
							<view class="top_sy">赞：<span>{{rankList[2].aixin>0?rankList[2].aixin:"0"}}</span></view>
						</view>
					</view>
					
				</view>
				<view class="zhiyuanzhe" @click="add()">申请志愿者</view>
			</view>

			<view class="rankList_box">
				<view class="rankItem" v-for="(item,index) in rankList" :key="index" >
					<view class="rankIndex">
						<text>{{ index + 1 }}</text>
					</view>
					<view class="HeardBox" @click="xq(item)" >
						<image class="rankHeard" :src="item.ioc " mode="widthFix"></image>
					</view>

					<view class="NameBox" @click="xq(item)">
						<view class="userName text-bold">{{item.name}}</view>
						<view class="userPost text-gray">本月 赞：<span>{{item.aixin}}</span></view>
						<view class="color_ccc">{{item.lx}} </view>
					</view>
					<view class="download_box">
						<u-icon size="30" name="thumb-up" color="#ff9800" top="20" @click="dz(item.id)"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="show" :round="20" mode="bottom" @close="close" @open="open" >
			<view class="beijingsu">
				<u-row gutter="10">
					<u-col span="6">
						<view class="zisgiuy">
							<view>{{byData.name}}</view>
							<view>{{byData.phone}}</view>
							<view>{{byData.lx}}</view>
							<view>{{byData.aname}}</view>
							<view>
								<u-icon :label="byData.aixin" size="30" name="thumb-up-fill" color="#ff9800" labelColor="#ff9800"></u-icon>
							</view>
						</view>
					</u-col>
					<u-col span="6">
						<view class="binng">
							<image class="xingzhaongzhao"  :src="byData.ioc " mode="widthFix"></image>
						</view>
					</u-col>
				</u-row>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rankList: [],
				show: false,
				byData:{}
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			getList(){
				uni.$u.http.post('Volunteer/xcxlist', {})
				.then(res => {
					this.rankList=res.data
					// console.log(res)
					// this.byData=res.data[0];
				})
			},
			add(){
				uni.$u.route({
					url: "/pages/componentsC/volunteer/add"
				})
			},
			xq(itme){
				this.byData=itme;
				this.show = true
			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			dz(id){
				uni.$u.http.post('Volunteer/dz',{
					id:id,
					wxid:uni.getStorageSync('userData').uid
				})
					.then(res => {
						// this.list=res.data;
						// console.log(res)
				
						if (res.code == 200) {
							this.getList();
							uni.showToast({
								title: res.msg,
								icon: 'success',
								duration: 2000
							})
							
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							})
						}
					})
			}
		},
		filters: {

		}
	}
</script>

<style lang="scss">
	.top_bg {
		width: 750rpx;
		height: 650rpx;
		background: url(https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/rank_bg.png) no-repeat;
		background-size: 750rpx;
		position: relative;
	}

	.one_box {
		width: 750rpx;
		height: 260rpx;
		position: absolute;
		left: 0;
		bottom: 110rpx;
		display: flex;
		justify-content: space-around;
	}

	.one_box .top3 {
		width: 210rpx;
		height: 280rpx;
	}

	.top_name {
		width: 100%;
		height: 55rpx;
		line-height: 60rpx;
		color: #f2f2f2;
		font-size: 26rpx;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.top_sy {
		margin-top: 20rpx;
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 30rpx;
		// font-size: 24rpx;
		// color: rgba(255, 255, 255, .7);
		color: #ff9800;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.top_sy span {
		font-size: 36rpx !important;
		font-weight: 700;
	}

	.num_one {
		position: relative;
	}

	.huangguan1 {
		width: 60px;
		height: 60px;
		position: absolute;
		right: -10rpx;
		top: -18*2rpx;
	}

	.num_one .top3_head {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100%;
		margin: 15rpx 0 0 30rpx;
		border: 4rpx solid #ffdd3c;
	}

	.num_two {
		position: relative;
	}

	.huangguan2 {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		right: 15rpx;
	}

	.num_two .top3_head {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100%;
		margin: 45rpx 0 0 45rpx;
		border: 4rpx solid #bcdcdf;
	}

	.num_three {
		position: relative;
	}

	.huangguan2 {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		right: 15rpx;
	}

	.num_three .top3_head {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100%;
		margin: 45rpx 0 0 45rpx;
		border: 4rpx solid #e29d85;
	}

	.zhiyuanzhe{
		float: right;
		background-color: #ffffff4a;
		color: #fff;
		padding: 8rpx 25rpx;
		margin-top: 180rpx;
		border-top-left-radius: 30rpx;
		border-bottom-left-radius: 30rpx;
		font-size: 30rpx;
	}

	// 列表
	.rankList_box {
		width: 750rpx;
		min-height: 200rpx;
		// margin-top: 130rpx;
	}

	.rankItem:last-child {
		border: none;
	}

	.rankItem {
		width: 700rpx;
		height: 140rpx;
		margin: 0px auto;
		border-bottom: 1px solid #e9e9e9;
	}

	.rankIndex {
		width: 60rpx;
		height: 140rpx;
		line-height: 140rpx;
		text-align: center;
		color: #CCCCCC;
		font-size: 40rpx;
		float: left;
	}

	.HeardBox {
		width: 100rpx;
		height: 100rpx;
		margin: 20rpx;
		// border-radius: 100%;
		border-radius: 10rpx;
		overflow: hidden;
		float: left;
		margin-right: 25rpx;
		margin-left: 10rpx !important;
	}

	.HeardBox image {
		width: 100%;
		height: 100%;
	}

	.NameBox {
		width: 400rpx;
		height: 140rpx;
		float: left;
		padding-top: 10rpx;
		box-sizing: border-box;
	}

	.NameBox view {
		height: 50rpx;
		line-height: 70rpx;
	}

	.userName {
		min-width: 90rpx;
		font-size: 30rpx;
		float: left;
		margin-right: 20rpx;
	}

	.download_box {
		// margin-top: 20rpx;
		width: 80rpx;
		height: 140rpx;
		// background-color: red;
		float: right;

	}

	.download_box image {
		width: 45rpx;
		margin: 50rpx auto;
		display: block;
	}
	.text-gray{
		color: #ff9800;
		font-size: 28rpx;
		font-weight: 700;
	}
	.color_ccc{
		font-size: 28rpx;
		color: #4e4e4e;
	}
	.beijingsu{
		padding:20rpx;
		background: url(https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/mingpin.png) no-repeat;
		background-size:100% 100%;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
	}
	.binng{
		// padding-top: 120rpx;
		// padding-left: 10rpx;
	}
	.xingzhaongzhao{
		width: 100%;
		height: 350rpx;
		border-radius: 10rpx;
		
	}
	.zisgiuy{
		color: #fff;
		font-size: 32rpx;
		// font-weight: 600;
		line-height: 60rpx;
		padding: 10rpx;
		letter-spacing:4rpx;
	}
</style>
