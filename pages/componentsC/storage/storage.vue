<template>
	<view >
		<view class="Index"  v-if="list">
			<!-- 瀑布流布局列表 -->
			<view class="pubuBox">
				<view class="pubuItem">
					<view class="item-masonry" v-for="(item, index) in list" :key="index">
						<image :src="item.ioc" mode="widthFix"  @click="xq(item.id)"></image>
						<view class="listtitle">
							<view class="listtitle1">{{ item.title }}</view>
							<view class="listtitle2" >
								<text class="listtitle2son" >￥{{ item.pay }}</text>
							</view>
							<view class="listtitle3">
								<u-icon label="发布成功" size="20" name="checkmark-circle-fill" v-if="item.fz>30" color="#2b85e4" labelColor="#2b85e4" ></u-icon>
								<u-icon label="审核中" size="20" name="clock" v-if="item.fz<31" color="#fcbd71" labelColor="#fcbd71" ></u-icon>
							</view>
							<view class="listtitle3">
								<u-icon label="删除" size="20"  name="trash-fill"  color="#ff007f" labelColor="#ff007f" @click="del(item)"></u-icon>
							</view>
						</view>
					</view>
				</view>
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
		<view class="fudong">
			<u-icon  size="50" name="plus-circle-fill" color="#2b85e4" labelColor="#2b85e4"  @click="add()"></u-icon>
		</view>
		<u-modal
					:content="content"
					:show="show"
					showCancelButton
					closeOnClickOverlay
					@confirm="confirm"
					@cancel="cancel"
					@close="close"
				></u-modal>
	</view>
</template>

<script>
	import action from '@/common/util.js'
	export default {
		data() {
			return {
				list: [],
				loadingText:"努力加载中,先喝杯茶",
				status: 'loading',
				page: 1,
				xia:0,
				id:0,
				show:false,
				content:""
			}
		},
		onLoad(e) {
			
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
			this.list=[];
			this.xia=0;
			this.page=1;
			this.gethome()
		},
		methods: {
			gethome() {
				uni.$u.http.post('Placing/xcxlist', {wxid:uni.getStorageSync('userData').uid,page:this.page,limit:10}).then(res => {
					this.list = this.list.concat(res.data);
					if(res.data.length>9){
						this.page=this.page+1;
					}else{
						this.xia=1
					}
				})
			},
			add(){
				let rz=uni.getStorageSync('userData').rz;
				if(rz==0){
					uni.$u.route({
						url: "/pages/componentsA/fangwu/add"
					})
				}else{
					uni.$u.route({
						url: "/pages/componentsC/storage/add"
					})
				}
			},
			del(itme){
				this.id = itme.id
				this.content="确定要删除"+itme.title+"吗？"
				this.show = true
			},
			confirm() {
				uni.$u.http.post('Placing/del', {id:this.id}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: res.msg,
							icon: 'success',
							duration: 2000
						})
						this.list=[];
						this.xia=0;
						this.page=1;
						this.gethome()
						this.show = false
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
					}
				})
				
			},
			cancel() {
				this.show = false
			},
			close() {
				this.show = false
			},
			xq(id){
				uni.$u.route({
					url: "/pages/componentsC/storage/details?id="+id
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

<style lang="scss">
	page {
		background-color: #fff;
	}
.fudong{
	 position:fixed;
	 bottom:30rpx;
	 z-index:999;
	 left: 43vw;
	 background-color: #fff;
	 border-radius: 50%;
	 
}
</style>
