<template>
	<view>
		<view class="body_gong">
			<view class="u-page__item">
				<u-collapse accordion border>
					<view v-for="(itme,index) in list" :key="index">
						<u-collapse-item :title="index+1+'、'+itme.title">
							<u-parse :content="itme.content"></u-parse>
						</u-collapse-item>
					</view>
					
				</u-collapse>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.gethome()
		},
		onShow() {

		},
		methods: {
			gethome(id) {
				uni.$u.http.post('Basic/list', {}).then(res => {
					this.list = res.data;

				})
			},


		},

	}
</script>

<style lang="scss">
	

	.u-cell__title-text{
		font-size: 26rpx;
		line-height: 40rpx;
		color: #1c487f !important;
		font-weight: 600;
	}
</style>
