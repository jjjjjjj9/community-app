<template>
	<view>
		<view class="body_gong" v-for="(o,index) in list" :key="index" >
			<view class="title"  @click="xq(o.id)">{{o.title}}
			<!-- {{o.lx==1?"投诉":"建议"}} -->
				<text class="zhaungtai" :class="o.status==2?'color2':'color1'">
					{{o.status==2 ? "已反馈" :"待反馈"}}
				</text>
			</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="album__content">
				<view class="miaoshi"  @click="xq(o.id)">
					{{o.details}}
				</view>
			</view>
			<view class="time"  @click="xq(o.id)">
				<u-icon :label="o.ctime" size="20" labelSize="14" labelColor="#747474" name="https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/time.png"></u-icon>
			</view>
		</view>
		<view v-if="list==null">
			<u-empty marginTop="100"
					text="暂无内容"
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
				page: 1,
				xia: 0,
				list: null
			}
		},
		onLoad() {
			// setInterval(this.gethome(), 5000);

			// this.gethome()		
		},
		onShow() {
			this.list=[];
			this.xia=0;
			this.page=1;
			this.gethome()
			
		},
		methods: {
			gethome() {
				uni.$u.http.post('Suggestion/gdlist', {wxid:uni.getStorageSync('userData').uid,page:this.page,limit:10}).then(res => {
					this.list = this.list.concat(res.data);
					if(res.data.length>9){
						this.page=this.page+1;
					}else{
						this.xia=1
					}
				})
				
			},
			getlimg(img){
				return img.split(",");
			},
			xq(id){
				uni.$u.route({
					url: "/pages/componentsA/suggestion/gddetails?id="+id
				})
			
			},
			
		},
		onReachBottom(){
			if(this.xia==0){
				this.gethome()
				
			}
		},
	}
</script>

<style>

</style>
