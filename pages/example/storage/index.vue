<template>
	<div >
		<view class="u-page__tag-item">
			<u-search
				v-model="name"
				label="搜索"
				:show-action="false"
				@search="chakxn()"
			>
			</u-search>
		</view>
		<view class="Index"  v-if="list">
			<!-- 瀑布流布局列表 -->
			<view class="pubuBox">
				<view class="pubuItem">
					<view class="item-masonry" v-for="(item, index) in list" :key="index" @click="xq(item.id)">
						<image :src="item.ioc" mode="widthFix"></image>
						<view class="listtitle">
							<view class="listtitle1">{{ item.title }}</view>
							<view class="listtitle2" >
								<text class="listtitle2son" >￥{{ item.pay }}</text>
							</view>
							<view class="listtitle3">
								<u-icon :label="item.name" size="20" :name="item.bioc" ></u-icon>
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
		
	</div>
</template>

<script>
	import action from '@/common/util.js'
	export default {
		data() {
			return {
				list: [],
				page: 1,
				xia:0,
				name:""
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
				uni.$u.http.post('Placing/homelist', {page:this.page,limit:10,name:this.name}).then(res => {
					this.list = this.list.concat(res.data);
					if(res.data.length>9){
						this.page=this.page+1;
					}else{
						this.xia=1
					}
				})
			},
			xq(id){
				uni.$u.route({
					url: "/pages/componentsC/storage/details?id="+id
				})
			},
			chakxn(){
				this.list=[];
				this.xia=0;
				this.page=1;
				this.gethome()
				console.log('触底了哦')
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
	.u-icon__img{
		border-radius: 50%;
	}

	.u-page__tag-item{
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
</style>
