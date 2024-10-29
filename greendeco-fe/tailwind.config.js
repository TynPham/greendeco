/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	important: '#__next',
	theme: {
		extend: {
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',
					sm: '2rem',
					lg: '2.5rem',
					xl: '3rem',
					'2xl': '4rem',
				},
			},
			backgroundColor: {
				'light-green': '#ECF4F1',
			},
			backgroundImage: {
				'product-list':
					"url('https://www.everwallpaper.co.uk/cdn/shop/collections/Bird-and-Floral-Art-Wallpaper-Mural.jpg?v=1660109731')",
				test: "linear-gradient(to left bottom, rgba(255,255,255,0),rgba(86, 119, 118, 0.2), rgba(70, 79, 65, 0.95)), url('https://www.everwallpaper.co.uk/cdn/shop/collections/Bird-and-Floral-Art-Wallpaper-Mural.jpg?v=1660109731')",
				'search-banner':
					"linear-gradient(to bottom, rgba(86, 119, 118, 0.55), rgba(86, 160, 140, 0.75), rgba(86, 129, 118, 0.9)), url('https://wallpapers.com/images/hd/green-plant-aesthetic-56nw3y24prsozi0l.jpg')",
				adminLogin:
					"linear-gradient(to left bottom, rgba(255,255,255,0), rgba(86, 119, 118, 0.5)), url('https://hips.hearstapps.com/hmg-prod/images/best-online-plant-delivery-1638314748.jpg')",
			},
			boxShadow: {
				15: '  0px 1px 1px 0px inset rgba(255, 255, 255, 0.1), 0px 50px 100px -20px rgba(50, 50, 93, 0.25), 0px 30px 60px -30px rgba(0, 0, 0, 0.3)',
				18: ' 0px 13px 27px -5px rgba(50, 50, 93, 0.25), 0px 8px 16px -8px rgba(0, 0, 0, 0.3) ',
				26: ' 0px 50px 100px -20px rgba(50, 50, 93, 0.25) , 0px 30px 60px -30px rgba(0, 0, 0, 0.3) ',
				30: ' 0px 14px 28px rgba(0, 0, 0, 0.25),0px 10px 10px rgba(0, 0, 0, 0.22) ',
				38: ' 0px 10px 15px -3px rgba(0, 0, 0, 0.1),0px 4px 6px -2px rgba(0, 0, 0, 0.05) ',
				63: ' 6px 2px 16px 0px rgba(136, 165, 191, 0.48),-6px -2px 16px 0px  rgba(255, 255, 255, 0.8)',
			},
			fontSize: {
				heading: '2.8rem',
				'heading-1': '2.4rem',
				'heading-2': '2.2rem',
				'heading-3': '1.8rem',
				'heading-4': '1.6rem',
				'heading-allcap-lg': '1.8rem',
				'heading-allcap-md': '1.6rem',
				'body-xl': '2.1rem',
				'body-lg': '1.8rem',
				'body-md': '1.6rem',
				'body-sm': '1.4rem',
				'body-xsm': '1.2rem',
			},
			fontWeight: {
				bold: 700,
				regular: 400,
				'semi-bold': 600,
				light: 300,
			},
			spacing: {
				compact: '0.8rem',
				cozy: '1.6rem',
				common: '2rem',
				comfortable: '3.2rem',
				'away-from-header': '10rem',
			},
			colors: {
				primary: {
					580: {
						DEFAULT: '#BFCBA8',
						80: '#CCD5B9',
						60: '#D9E0CB',
						40: '#E5EADC',
						20: '#F2F5EE',
					},
					625: {
						DEFAULT: '#5B8A72',
						80: '#78A68E',
						60: '#99BCAA',
						40: '#bbd2c7',
						20: '#dde9e3',
					},
					5555: {
						DEFAULT: '#56776C',
						80: '#71998c',
						60: '#95b2a8',
						40: '#b8ccc5',
						20: '#dce5e2',
					},
					418: {
						DEFAULT: '#464F41',
						80: '#6a7762',
						60: '#8e9c87',
						40: '#b4bdaf',
						20: '#d9ded7',
					},
				},
				secondary: {
					376: '#8DBF2E',
					186: '#CC2647',
					1495: '#FF8B28',
					116: '#F2CE1B',
					100: '#F6EB69',
				},
				'action-link': '#01a049',
				neutral: {
					gray: {
						1: '#FFFFFF',
						2: '#F8F8F8',
						3: '#eeeeee',
						4: '#dcdcdc',
						5: '#cecece',
						6: '#BABABA',
						7: '#A0A0A0',
						8: '#999999',
						9: '#666666',
						10: '#333333',
					},
				},
				status: {
					error: {
						DEFAULT: '#E90000',
						mid: '#FF807F',
						light: '#ffe7e7',
					},
					success: {
						DEFAULT: '#53AF3B',
						light: '#DDEFD8',
					},
					warning: {
						DEFAULT: '#fb9716',
						light: '#fdeede',
					},
				},
				'order-status': {
					draft: '#FFB400',
					processing: '#0085FF',
					completed: '#4FF600',
					cancelled: '#FC0000',
				},
			},
		},
	},
	plugins: [],
}
