/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				// matching all API routes
				source: '/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
					},
				],
			},
		]
	},
	images: {
		unoptimized: true,
	},
	async redirects() {
		return [
			{
				source: '/shop',
				destination: '/shop/product-list',
				permanent: true,
			},
		]
	},
}

module.exports = nextConfig
