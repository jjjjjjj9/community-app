<template>
	
	<view class="user">
		
		<!-- 头部 -->
		<view class="user-wrap">
			
			<view class="setting">
				<u-icon name="setting" color="#FFF" size="28" @click="user()"></u-icon>
			</view>
			<view class="info">
				<image class="avatar" mode="aspectFill" :src="userInfo.headPicUrl"></image>
				<view class="nickname">{{ userInfo.nickName }}</view>
			</view>
		</view>

		<view class="order-status">
			<view class="status-wrap">
				<view class="cell">
					<view class="cell-left">
						<image class="cell-icon" src="https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/gongju.png" mode="aspectFill"></image>
						<view class="cell-text">我的工具</view>
					</view>
				</view>
				<view class="status-list">
					<view class="status-item" hover-class="btn-hover" v-for="(item, index) in orderStatusList" :key="index">
						<image mode="widthFix" :src="item.icon" style="width: 50%;" @click="Jom(item.url)"></image>
						<view class="item-text">{{ item.name }}</view>
					</view>
					
				</view>
				
			</view>
		</view>
		
		<view class=".order-status-gj" v-if="gz>0">
			<view class="status-wrap">
				<view class="cell">
					<view class="cell-left">
						<image class="cell-icon" src="https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/gongzuo.png" mode="aspectFill"></image>
						<view class="cell-text">工作台</view>
					</view>
				</view>
				<view class="status-list">
					<view class="status-item" hover-class="btn-hover" v-for="(item, index) in StatusList" :key="index">
						<image mode="widthFix" :src="item.icon" style="width: 50%;" @click="jon(item.url)"></image>
						<view class="item-text">{{ item.name }}</view>
					</view>
					
				</view>
				
			</view>
		</view>
	
	<!-- <view class="com-item">
		<view class="com-wrap">
			<view class="cell" v-for="(item, index) in orderStatusList1" :key="index"  @click="Jom(item.url)">
				<view class="cell-left">
					<image class="cell-icon" :src="item.icon" mode="aspectFill"></image>
					<view class="cell-text">{{ item.name }}</view>
				</view>
				<view class="iconfont iconmore1"></view>
			</view>
		</view>
	</view> -->

		<!-- 用户服务 -->
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell" v-for="(item, index) in serverList" :key="index" @click="jon(item.path)">
					<view class="cell-left">
						<image class="cell-icon" :src="item.icon" mode="aspectFill"></image>
						<view class="cell-text">{{ item.title }}</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
			</view>
		</view>
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell"  @click="jon('/pages/componentsC/about/index')" >
					<view class="cell-left" >
						<image class="cell-icon" src="/static/images/hezuo.png" mode="aspectFill"></image>
						<view class="cell-text">技术支持与合作</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
				<view class="cell"   >
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/icon-collect.png" mode="aspectFill"></image>
						<view class="cell-text">系统版本号：1.0.2</view>
					</view>
					<!-- <view class="iconfont iconmore1"></view> -->
				</view>
			</view>
		</view>
		
	</view>
</template>

<script> 
export default {
	data() {
		return {
			gz:0,
			userInfo: {
				headPicUrl: uni.getStorageSync('userData').ioc,
				nickName: uni.getStorageSync('userData').name
			},
			orderStatusList: [
				// { name: '我的成员', icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/shi.png', status: 50 },
				{ name: '我的维修', icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/xiu.png', url:"/pages/componentsA/baoxiu/list" },
				{ name: '我的报名', icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/huodong.png', url:"/pages/componentsB/activity/userList"},
				{ name: '我的求助', icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/bang.png', url:"/pages/componentsA/bangzhu/list" },
				{ name: '我的置物', icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/zhiwu.png',  url:"/pages/componentsC/storage/storage" },
				{ name: '投诉建议', icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/jianyi.png', url:"/pages/componentsA/suggestion/list" },
			], 
			StatusList: [
				{ name: '维修工单', icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/xiu.png', url:"/pages/componentsA/baoxiu/gongdan" },
				{ name: '投诉处理', icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/jianyi.png', url:"/pages/componentsA/suggestion/gdlist"},
				{ name: '巡检任务', icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/xunjian.png', url:"/pages/example/home/blank" },
				{ name: '联系住户', icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/anfang.png',  url:"/pages/componentsA/security/security" }
			], 
			
			currentIndex: 0,
			
			
			serverList: [
				{
					title: '物业对公账户',
					icon: '/static/images/class-02.png',
					path: '/pages/componentsC/corporate/corporate'
				},
			
				{
					title: '用户协议',
					icon: '/static/images/icon-kefu.png',
					path: '/pages/componentsC/agreement/agreement'
				},
				{
					title: '隐私政策',
					icon: '/static/images/icon-about.png',
					path: '/pages/componentsC/policy/policy'
				},
				{
					title: '帮助中心',
					icon: '/static/images/icon-help.png',
					path: '/pages/componentsC/help/help'
				}
			]
		};
	},
	onLoad() {
		uni.hideShareMenu();
		uni.onCopyUrl((result) => {
			setTimeout(() => {
			  uni.setClipboardData({
				data: "不可复制哦",
			  });
			}, 1000);
		  });
	},
	onShow() {
		this.gz=uni.getStorageSync('userData').gz
		this.userInfo={
			headPicUrl: uni.getStorageSync('userData').ioc,
			nickName: uni.getStorageSync('userData').name
		}
	},
	methods:{
		Jom(path){
			let rz=uni.getStorageSync('userData').rz;
			if(rz==0){
				uni.$u.route({
					url: "/pages/componentsA/fangwu/add"
				})
			}else{
				uni.$u.route({
					url: path
				})
			}
		},
		user(){
			uni.$u.route({
				url: "/pages/componentsC/user/user"
			})
		},
		jon(path){
			// console.log(path)
			uni.$u.route({
				url: path
			})
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f2f2f2;
}
.btn-hover {
	background: #f2f2f2 !important;
}

</style>
