<template>
	<view>
		<view class="hend">
			<u-tabs :list="list1" keyName="title" @click="click" ></u-tabs>
		</view>
		<view class="body_gong" v-for="(o,index) in list" :key="index" @click="xq(o.id)" >
			<image :src="o.ioc" mode="widthFix" style="width: 100%;"></image>
			<!-- <u-line margin="20rpx 0rpx"></u-line> -->
			<view class="title">{{o.title}} </view>
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
		<u-loadmore :status="status" v-if="list.length>0" loadingText="努力加载中,先喝杯茶" :line="true" marginBottom="30" />
		
		
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
				info_class_id:0,
				list1: [],
			}
		},
		onLoad() {	
			
		},
		onShow() {
			this.list=[];
			this.xia=0;
			this.page=1;
			this.getlx()
			// this.gethome()
			
		},
		methods: {
			getlx() {
				uni.$u.http.post('InfoClass/xllist', {}).then(res => {
					this.list1 = res.data;
					this.info_class_id=res.data[0].id;
					this.list=[];
					this.xia=0;
					this.page=1;
					 this.gethome()
				})
			},
			click(item) {
				this.info_class_id=item.id;
				this.list=[];
				this.xia=0;
				this.page=1;
				 this.gethome()
				// console.log('item', item);
			},
			gethome() {
				uni.$u.http.post('Info/xcxlist', {info_class_id:this.info_class_id,page:this.page,limit:10}).then(res => {
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
					url: "/pages/componentsB/info/details?id="+id
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