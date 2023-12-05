<template>
	<view>
		<view class="body_gong" >
			<u-parse :content="list.content"></u-parse>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {}
			}
		},
		onLoad() {
			this.gethome()
		},
		onShow() {
			
		},
		methods: {
			gethome(id) {
				uni.$u.http.post('Basic/byDate', {lxid:3}).then(res => {
					this.list = res.data;
					
				})
			},
			
			
		},
		
	}
</script>

<style>
</style>