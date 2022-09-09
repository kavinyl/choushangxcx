module.exports = {
	publicPath:'./',
	outputDir:'dist',
	devServer: {
		proxy: {
			'/api': {
				target: 'http://123.60.71.74:20001/',
				changeOrigin:true,
				pathRewrite:{
					'^/api':''
				}
			}
		}
	}
}
