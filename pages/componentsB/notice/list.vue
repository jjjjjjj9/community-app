<template>
	<view>
		<view class="body_gong" v-for="(o,index) in list" :key="index" @click="xq(o.id)" >
			<view class="title">{{o.title}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="body_gong_content">
				<u-parse :content="o.content"></u-parse>
			</view>
			<view class="time">
				<u-icon :label="o.ctime" size="20" labelSize="14" labelColor="#747474" name="https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/time.png"></u-icon>
			</view>
			
		</view>
		<view v-if="list.length==0">
			<u-empty marginTop="100"
					text="暂无活动"
			        mode="message"
			        icon="https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/nei.png"
			>
			</u-empty>
		</view>
		<u-loadmore :status="status" loadingText="努力加载中,先喝杯茶" :line="true" marginBottom="30" />
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadingText:"努力加载中,先喝杯茶",
				status: 'loading',
				page: 1,
				list: [],
				xia:0,
			}
		},
		onLoad() {	
			
		},
		onShow() {
			this.list=[];
			this.xia=0;
			this.page=1;
			this.gethome()
			
		},
		methods: {
			gethome() {
				uni.$u.http.post('Notice/xcxlist', {aid:0,name:"",page:this.page,limit:10}).then(res => {
					this.list = this.list.concat(res.data);
					if(res.data.length>9){
						this.page=this.page+1;
					}else{
						this.xia=1
						this.status="nomore"
						this.loadingText="无更多数据"
					}
				})
			},
			xq(id){
				uni.$u.route({
					url: "/pages/componentsB/notice/details?id="+id
				})
			}
			
		},
		onReachBottom(){//do sth
			if(this.xia==0){
				this.gethome()
				
			}
			// console.log('触底了哦')
			// this.$emit('nextPage',this.selectPage )
		},
	}
</script>

<style>
</style>