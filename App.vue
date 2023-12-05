<script>
	export default {
		onLaunch: function() {
			uni.login({
				provider: 'weixin',
				success: loginRes => {
					uni.$u.http.post('AdminUser/getOpenid', {
						"code": loginRes.code
					})
					.then(res => {
						// console.log(res)
						uni.setStorageSync("userData", res.data)
					})
				},
				fail: () => {
					return false;
				}
			});
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "/common/iconfont.css";
	@import "@/uni_modules/uview-ui/index.scss";
	@import "common/demo.scss";
	@import "common/index.scss";
	page{
		background-color: #f3f5f7;
	}
</style>
