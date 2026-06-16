
// Basic Pie Chart

export const Basicpieseries = [44, 55, 13, 43, 22]
export const Basicpieoptions = {
	chart: {
		height: 300,
		type: "pie",
		events: {
			mounted: (chart: { windowResizeHandler: () => void; }) => {
				chart.windowResizeHandler();
			}
		},
	},
	colors: ["#5c67f7", "#e354d4", "#ff8e6f", "#0ca3e7", "#fe5454"],
	labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
	legend: {
		position: "bottom"
	},
	dataLabels: {
		dropShadow: {
			enabled: false
		}
	},
}

// Simple Donut Chart

export const Donutseries = [44, 55, 41, 17, 15]
export const Donutoptions = {
	chart: {
		type: "donut",
		height: 290,
		events: {
			mounted: (chart: { windowResizeHandler: () => void; }) => {
				chart.windowResizeHandler();
			}
		},
	},
	legend: {
		position: "bottom"
	},
	colors: ["#5c67f7", "#e354d4", "#ff8e6f", "#0ca3e7", "#fe5454"],
	dataLabels: {
		dropShadow: {
			enabled: false
		}
	},
}

//Updating Donut Chart

export const Updatedseries = [44, 55, 13, 33]
export const Updatedoptions = {
	chart: {
		width: 300,
		type: 'donut',
	},
	dataLabels: {
		enabled: false,
	},
	colors: ["rgb(0,143,251)", "rgb(69,214,91)", "rgb(243,156,18)", "rgb(255,69,96)", "rgb(231,76,60)"],

	responsive: [{
		breakpoint: 480,
		options: {
			chart: {
				width: 260
			},
			legend: {
				show: false
			}
		}
	}],
	legend: {
		show: true,
		position: 'bottom',
	}
}

//Monochrome Pie Chart

export const Piemonoseries = [25, 15, 44, 55, 41, 17]
export const Piemonooptions = {
	chart: {
		height: "280",
		type: "pie",
		events: {
			mounted: (chart: { windowResizeHandler: () => void; }) => {
				chart.windowResizeHandler();
			}
		},
		labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	},

	theme: {
		monochrome: {
			enabled: true,
			color: "#5c67f7",
		}
	},
	plotOptions: {
		pie: {
			dataLabels: {
				offset: -5
			}
		}
	},
	title: {
		text: "Monochrome Pie",
		align: "left",
		style: {
			fontSize: "13px",
			fontWeight: "bold",
			color: "#8c9097"
		},
	},
	dataLabels: {
		dropShadow: {
			enabled: false
		}
	},
	legend: {
		show: false
	}
}

//Gradient Donut Chart

export const Piegradientseries = [44, 55, 41, 17, 15]
export const Piegardientoptions = {
	chart: {
		height: 300,
		type: "donut",
		events: {
			mounted: (chart: { windowResizeHandler: () => void; }) => {
				chart.windowResizeHandler();
			}
		},
	},
	plotOptions: {
		pie: {
			startAngle: -90,
			endAngle: 270
		}
	},
	dataLabels: {
		enabled: false
	},
	fill: {
		type: "gradient",
	},
	legend: {
		formatter: function (val: string, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex: string | number; }) {
			return val + " - " + opts.w.globals.series[opts.seriesIndex];
		},
		position: "bottom"
	},
	colors: ["#5c67f7", "#e354d4", "#ff8e6f", "#0ca3e7", "#fe5454"],
	title: {
		text: "Gradient Donut with custom Start-angle",
		align: "left",
		style: {
			fontSize: "13px",
			fontWeight: "bold",
			color: "#8c9097"
		},
	},
}

//Donut Chart With Patterns

export const Piechartseries = [44, 55, 41, 17, 15]
export const Piechartoptions = {
	chart: {
		height: 300,
		type: "donut",
		dropShadow: {
			enabled: true,
			color: "#111",
			top: -1,
			left: 3,
			blur: 3,
			opacity: 0.2
		},
		events: {
			mounted: (chart: { windowResizeHandler: () => void; }) => {
				chart.windowResizeHandler();
			}
		},
	},
	stroke: {
		width: 0,
	},
	plotOptions: {
		pie: {
			donut: {
				labels: {
					show: true,
					total: {
						showAlways: true,
						show: true
					}
				}
			}
		}
	},
	colors: ["#5c67f7", "#e354d4", "#ff8e6f", "#0ca3e7", "#fe5454"],
	labels: ["Comedy", "Action", "Mamix", "Drama", "Horror"],
	dataLabels: {
		enabled: true,
		style: {
			colors: ["#111"]
		},
		background: {
			enabled: true,
			foreColor: "#fff",
			borderWidth: 0
		}
	},
	fill: {
		type: "pattern",
		opacity: 1,
		pattern: {
			style: ["verticalLines", "squares", "horizontalLines", "circles", "slantedLines"],
		},
	},
	states: {
		hover: {
		}
	},
	theme: {
		palette: "palette2"
	},
	title: {
		text: "Favourite Movie Type",
		align: "left",
		style: {
			fontSize: "13px",
			fontWeight: "bold",
			color: "#8c9097"
		},
	},
	responsive: [{
		breakpoint: 480,
		options: {
			chart: {
				width: 200
			},
			legend: {
				position: "bottom"
			}
		}
	}]
}

//Image Filled Pie Chart

export const Pieimgseries = [44, 33, 54, 45]
export const Pieimgoptions = {
	chart: {
		height: 300,
		type: "pie",
		events: {
			mounted: (chart: { windowResizeHandler: () => void; }) => {
				chart.windowResizeHandler();
			}
		},
	},
	colors: ["#93C3EE", "#E5C6A0", "#669DB5", "#94A74A"],
	fill: {
		type: "image",
		opacity: 0.85,
		image: {
			src: ["../../../assets/images/media/media-21.jpg", "../../../assets/images/media/media-21.jpg", "../../../assets/images/media/media-21.jpg", "../../../assets/images/media/media-21.jpg"],
			width: 25
		},
	},
	stroke: {
		width: 4
	},
	dataLabels: {
		enabled: true,
		style: {
			colors: ["#111"]
		},
		background: {
			enabled: true,
			foreColor: "#fff",
			borderWidth: 0
		}
	},
	legend: {
		position: "bottom"
	},
}