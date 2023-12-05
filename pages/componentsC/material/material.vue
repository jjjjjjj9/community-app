<template>
	<view>
		<image class="tupian" src="https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/aixinjuanzeng.jpg" mode="widthFix"></image>
		
		<view class="rankList_box">
			<view class="rankItem" v-for="(item,index) in rankList" :key="index" >
				<view class="rankIndex">
					<text>{{ index + 1 }}</text>
				</view>
				<view class="HeardBox" >
					<image class="rankHeard" :src="item.ioc " mode="widthFix"></image>
				</view>
		
				<view class="NameBox" >
					<view class="userName text-bold">{{item.name}}</view>
					<view class="userPost text-gray">{{item.ctime}}</view>
					<view class="color_ccc">{{item.remarks}}</view>
				</view>
			</view>
		</view>
		<view class="aixin">
			<u-button text="贡献物资" size="normal" @click="add()" color="linear-gradient(to right, rgb(213, 25, 75), rgb(216, 161, 32))"></u-button>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				rankList: [],
				show: false,
				byData:{},
				page: 1,
				xia:0,
			}
		},
		onLoad() {
			this.getList();
			this.rankList=[];
			this.xia=0;
			this.page=1;
		},
		methods: {
			getList(){
				uni.$u.http.post('Material/xcxlist', {page:this.page,limit:10})
				.then(res => {
					this.rankList = this.rankList.concat(res.data);
					if(res.data.length>9){
						this.page=this.page+1;
					}else{
						this.xia=1
					}
				})
			},
			add(){
				uni.$u.route({
					url: "/pages/componentsC/material/add"
				})
			},
			
		},
		onReachBottom(){//do sth
			if(this.xia==0){
				this.getList()
				
			}
		},
		filters: {

		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.tupian{
		width: 100%;
	}
	.aixin{
		width: 60vw;
		padding:  0 20vw;
		position:fixed;
		bottom:1vh;
		z-index:999;
	}
	.rankList_box {
		width: 750rpx;
		min-height: 200rpx;
		padding-bottom: 100rpx;
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
		 border-radius: 100%;
		/* border-radius: 10rpx; */
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
		width: 470rpx;
		height: 140rpx;
		float: left;
		padding-top: 10rpx;
		box-sizing: border-box;
	 overflow:hidden; //超出的文本隐藏
	  text-overflow:ellipsis; //用省略号显示
	  white-space:nowrap; //不换行
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
		color: #4a4a4a;
		font-size: 26rpx;
		/* font-weight: 700; */
	}
	.color_ccc{
		font-size: 28rpx;
		color: #4e4e4e;
	}
</style>