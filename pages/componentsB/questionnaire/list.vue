<template>
	<view>
		<view class="huodong_body">
			<u-row >
				<u-col span="3">
					<view :class="aid==0?'title_hend_x':'title_hend'" @click="xz(0)">全部</view>
				</u-col>
				<u-col span="3">
					<view :class="aid==2?'title_hend_x':'title_hend'" @click="xz(2)">未开始</view>
				</u-col>
				<u-col span="3">
					<view :class="aid==1?'title_hend_x':'title_hend'" @click="xz(1)">进行中</view>
				</u-col>
				<u-col span="3">
					<view :class="aid==3?'title_hend_x':'title_hend'" @click="xz(3)">已结束</view>
				</u-col>
			</u-row>
		</view>
		<view class="biankuang" v-for="(itme,index) in list " @click="JOM(itme)">
			<image :src="itme.ioc" mode="widthFix" class="huodongimage"></image>
			<view class="huodongtitle">{{itme.title}}</view>
			<view class="huodongtitle">填报开始时间：{{itme.stime}}</view>
			<view class="huodongtitle">填报结束时间：{{itme.etime}}</view>
			<view class="huodongtitle">填报状态：<text>{{itme.zt==1?"填报中": itme.zt==3?"填报结束":"填报未开始"}}</text></view>
		</view>
		
		<view v-if="list.length==0">
			<u-empty marginTop="100"
					text="暂无问卷"
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
			this.xia=0;
			this.page=1;
			this.gethome()
		},
		onShow() {
			
		},
		methods: {
			xz(e){
				this.aid=e;
				this.list=[];
				this.xia=0;
				this.page=1;
				this.gethome()
			},
			gethome() {
				uni.$u.http.post('Questionnaire/xcxlist', {lx:this.aid,page:this.page,limit:10}).then(res => {
					this.list = this.list.concat(res.data);
					if(res.data.length>9){
						this.page=this.page+1;
					}else{
						this.xia=1
					}
				})
			},
			JOM(itme){
				if(itme.zt==1){
					uni.$u.route({
						url: "/pages/componentsB/questionnaire/details?id="+itme.id
					})
				}else if(itme.zt==2){
					uni.showToast({
						title: "填报未开始",
						icon: 'none',
						duration: 2000
					})
				}else {
					uni.showToast({
						title: "填报结束",
						icon: 'none',
						duration: 2000
					})
				}
				
			}
				
		},
		onReachBottom(){//do sth
			if(this.xia==0){
				this.gethome()
				
			}
		},
	}
</script>

<style lang="scss">
	
</style>