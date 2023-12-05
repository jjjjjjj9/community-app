/**
 * 响应拦截
 * @param {Object} http 
 */
module.exports = (vm) => {
    uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
        const data = response.data
        // 自定义参数
        const custom = response.config?.custom
        
        return data
    }, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
        return Promise.reject(response)
    })
}