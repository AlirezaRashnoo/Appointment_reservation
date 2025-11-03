// /** @type {import('tailwindcss').Config} */
// export default {
//     darkMode: ["class"],
//     content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}"
//   ],
//   theme: {
//   	extend: {
//   		colors: {
//   			bodyColor: '#fff',
//   			mainColor: '#0099FF',
//   			primeryColor: '#eafff6',
//   			secoundColor: '#d6e1e6',
//   			textColorSecound: '#00cf7c',
//   			background: 'hsl(var(--background))',
//   			foreground: 'hsl(var(--foreground))',
//   			card: {
//   				DEFAULT: 'hsl(var(--card))',
//   				foreground: 'hsl(var(--card-foreground))'
//   			},
//   			popover: {
//   				DEFAULT: 'hsl(var(--popover))',
//   				foreground: 'hsl(var(--popover-foreground))'
//   			},
//   			primary: {
//   				DEFAULT: 'hsl(var(--primary))',
//   				foreground: 'hsl(var(--primary-foreground))'
//   			},
//   			secondary: {
//   				DEFAULT: 'hsl(var(--secondary))',
//   				foreground: 'hsl(var(--secondary-foreground))'
//   			},
//   			muted: {
//   				DEFAULT: 'hsl(var(--muted))',
//   				foreground: 'hsl(var(--muted-foreground))'
//   			},
//   			accent: {
//   				DEFAULT: 'hsl(var(--accent))',
//   				foreground: 'hsl(var(--accent-foreground))'
//   			},
//   			destructive: {
//   				DEFAULT: 'hsl(var(--destructive))',
//   				foreground: 'hsl(var(--destructive-foreground))'
//   			},
//   			border: 'hsl(var(--border))',
//   			input: 'hsl(var(--input))',
//   			ring: 'hsl(var(--ring))',
//   			chart: {
//   				'1': 'hsl(var(--chart-1))',
//   				'2': 'hsl(var(--chart-2))',
//   				'3': 'hsl(var(--chart-3))',
//   				'4': 'hsl(var(--chart-4))',
//   				'5': 'hsl(var(--chart-5))'
//   			}
//   		},
//   		fontFamily: {
//   			Dana: 'Dana',
//   			DanaMedium: 'Dana Medium',
//   			DanaDemiBold: 'Dana DemiBold',
//   			MorabbaLight: 'Morabba Light',
//   			MorabbaMedium: 'Morabba Medium',
//   			MorabbaBold: 'Morabba Bold'
//   		},
//   		boxShadow: {
//   			Main: '0 3px 8px #d6e1e6'
//   		},
//   		container: {
//   			center: true,
//   			padding: {
//   				DEFAULT: '1rem',
//   				lg: '2rem'
//   			}
//   		},
//   		borderRadius: {
//   			lg: 'var(--radius)',
//   			md: 'calc(var(--radius) - 2px)',
//   			sm: 'calc(var(--radius) - 4px)'
//   		}
//   	}
//   },
//   screens:{
//     'xs' : '480px',
//     'sm' : '640px',
//     'md' : '768px',
//     'lg' : '1024px',
//     'xl' : '1280px',
//   },
//   plugins: [
//     function({ addVariant }){
//       addVariant('child','& > *');
//       addVariant('child-hover','& > *:hover');
//     },
//       require("tailwindcss-animate")
// ],
// }







// /** @type {import('tailwindcss').Config} */
// export default {
// 	darkMode: ["class"],
// 	content: [
// 	  "./index.html",
// 	  "./src/**/*.{js,ts,jsx,tsx}"
// 	],
// 	theme: {
// 	  extend: {
// 		colors: {
// 		  bodyColor: '#fff',
// 		  mainColor: '#0099FF',
// 		  primeryColor: '#eafff6',
// 		  secoundColor: '#d6e1e6',
// 		  textColorSecound: '#00cf7c',
// 		  background: 'hsl(var(--background))',
// 		  foreground: 'hsl(var(--foreground))',
// 		  card: {
// 			DEFAULT: 'hsl(var(--card))',
// 			foreground: 'hsl(var(--card-foreground))'
// 		  },
// 		  popover: {
// 			DEFAULT: 'hsl(var(--popover))',
// 			foreground: 'hsl(var(--popover-foreground))'
// 		  },
// 		  primary: {
// 			DEFAULT: 'hsl(var(--primary))',
// 			foreground: 'hsl(var(--primary-foreground))'
// 		  },
// 		  secondary: {
// 			DEFAULT: 'hsl(var(--secondary))',
// 			foreground: 'hsl(var(--secondary-foreground))'
// 		  },
// 		  muted: {
// 			DEFAULT: 'hsl(var(--muted))',
// 			foreground: 'hsl(var(--muted-foreground))'
// 		  },
// 		  accent: {
// 			DEFAULT: 'hsl(var(--accent))',
// 			foreground: 'hsl(var(--accent-foreground))'
// 		  },
// 		  destructive: {
// 			DEFAULT: 'hsl(var(--destructive))',
// 			foreground: 'hsl(var(--destructive-foreground))'
// 		  },
// 		  border: 'hsl(var(--border))',
// 		  input: 'hsl(var(--input))',
// 		  ring: 'hsl(var(--ring))',
// 		  chart: {
// 			'1': 'hsl(var(--chart-1))',
// 			'2': 'hsl(var(--chart-2))',
// 			'3': 'hsl(var(--chart-3))',
// 			'4': 'hsl(var(--chart-4))',
// 			'5': 'hsl(var(--chart-5))'
// 		  }
// 		},
// 		fontFamily: {
// 		  Dana: 'Dana',
// 		  DanaMedium: 'Dana Medium',
// 		  DanaDemiBold: 'Dana DemiBold',
// 		  MorabbaLight: 'Morabba Light',
// 		  MorabbaMedium: 'Morabba Medium',
// 		  MorabbaBold: 'Morabba Bold'
// 		},
// 		boxShadow: {
// 		  Main: '0 3px 8px #d6e1e6'
// 		},
// 		container: {
// 		  center: true,
// 		  padding: {
// 			DEFAULT: '1rem',
// 			lg: '2rem'
// 		  }
// 		},
// 		borderRadius: {
// 		  lg: 'var(--radius)',
// 		  md: 'calc(var(--radius) - 2px)',
// 		  sm: 'calc(var(--radius) - 4px)'
// 		}
// 	  }
// 	},
// 	screens: {
// 	  'xs': '480px',
// 	  'sm': '640px',
// 	  'md': '768px',
// 	  'lg': '1024px',
// 	  'xl': '1280px',
// 	},
// 	plugins: [
// 	  function ({ addVariant }) {
// 		addVariant('child', '& > *');
// 		addVariant('child-hover', '& > *:hover');
// 	  },
// 	  require("tailwindcss-animate"),
// 	  require("daisyui")
// 	],
// 	daisyui: {
// 	  themes: ["light", "dark", "cupcake"]
// 	}
//   }
  












/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
	  extend: {
		colors: {
		  bodyColor: '#fff',
		  mainColor: '#0099FF',
		  primeryColor: '#eafff6',
		  secoundColor: '#d6e1e6',
		  textColorSecound: '#00cf7c',
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))'
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))'
		  },
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))'
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))'
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))'
		  },
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  chart: {
			'1': 'hsl(var(--chart-1))',
			'2': 'hsl(var(--chart-2))',
			'3': 'hsl(var(--chart-3))',
			'4': 'hsl(var(--chart-4))',
			'5': 'hsl(var(--chart-5))'
		  }
		},
		fontFamily: {
		  Dana: ['Dana', 'sans-serif'],
		  DanaMedium: ['Dana Medium', 'sans-serif'],
		  DanaDemiBold: ['Dana DemiBold', 'sans-serif'],
		  MorabbaLight: ['Morabba Light', 'sans-serif'],
		  MorabbaMedium: ['Morabba Medium', 'sans-serif'],
		  MorabbaBold: ['Morabba Bold', 'sans-serif']
		},
		boxShadow: {
		  Main: '0 3px 8px #d6e1e6'
		},
		container: {
		  center: true,
		  padding: {
			DEFAULT: '1rem',
			lg: '2rem'
		  }
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		}
	  }
	},
	screens: {
	  'xs': '480px',
	  'sm': '640px',
	  'md': '768px',
	  'lg': '1024px',
	  'xl': '1280px',
	},
	plugins: [
	  function ({ addVariant }) {
		addVariant('child', '& > *');
		addVariant('child-hover', '& > *:hover');
	  },
	  require("tailwindcss-animate"),
	  require("daisyui")
	],
	daisyui: {
	  themes: ["light", "dark", "cupcake"]
	}
  }
  