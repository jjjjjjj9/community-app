<template>
	<view>
		<view class="body_gong" v-for="(o,index) in list" :key="index" >
			<view class="title"  @click="xq(o.id)">{{o.lx==1?"房屋报修":"公共报修"}} 
				<text class="zhaungtai" :class="o.status==1?'color2':o.status==2 ? 'color3' :o.status==3 ? 'color4':o.status==4 ? 'color5':'color1'">
					{{o.status===1 ? "已安排师傅" : o.status==2?"维修中":o.status==3?"待评价":o.status==4?"已评价":"待处理"}}
				</text>
			</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="album__content">
				<view class="miaoshi"  @click="xq(o.id)">
					{{o.details}}
				</view>
				
				<u-album :urls="o.ioc" rowCount="3" ></u-album>
			</view>
			<view class="time"  @click="xq(o.id)">
				<u-icon :label="o.ctime" size="20" labelSize="14" labelColor="#747474" name="https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/time.png"></u-icon>
			</view>
		</view>
		<view v-if="list==null">
			<u-empty marginTop="100"
					text="暂无报修"
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
				uni.$u.http.post('Repair/xcxlist', {wxid:uni.getStorageSync('userData').uid,page:this.page,limit:10}).then(res => {
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
					url: "/pages/componentsA/baoxiu/details?id="+id
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
