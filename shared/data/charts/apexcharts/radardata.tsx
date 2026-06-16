
//Basic Radar Chart

export const Radarseries = [{
	name: "Series 1",
	data: [80, 50, 30, 40, 100, 20],
}]
export const Radaroptions = {
	chart: {
		height: 320,
		type: "radar",
		events: {
			mounted: (chart: { windowResizeHandler: () => void; }) => {
				chart.windowResizeHandler();
			}
		},
	},
	title: {
		text: "Basic Radar Chart",
		align: "left",
		style: {
			fontSize: "13px",
			fontWeight: "bold",
			color: "#8c9097"
		},
	},
	colors: ["#5c67f7"],
	xaxis: {
		categories: ["January", "February", "March", "April", "May", "June"]
	}
}

// Radar Chart-Multiple Series

export const Multiseries = [{
	name: "Series 1",
	data: [80, 50, 30, 40, 100, 20],
}, {
	name: "Series 2",
	data: [20, 30, 40, 80, 20, 80],
}, {
	name: "Series 3",
	data: [44, 76, 78, 13, 43, 10],
}]
export const Multioptions = {
	chart: {
		height: 320,
		type: "radar",
		dropShadow: {
			enabled: true,
			blur: 1,
			left: 1,
			top: 1
		},
		events: {
			mounted: (chart: { windowResizeHandler: () => void; }) => {
				chart.windowResizeHandler();
			}
		},
	},
	title: {
		text: "Radar Chart - Multi Series",
		align: "left",
		style: {
			fontSize: "13px",
			fontWeight: "bold",
			color: "#8c9097"
		},
	},
	colors: ["#5c67f7", "#e354d4", "#ff8e6f"],
	stroke: {
		width: 2
	},
	fill: {
		opacity: 0.1
	},
	markers: {
		size: 0
	},
	xaxis: {
		categories: ["2011", "2012", "2013", "2014", "2015", "2016"]
	}
}

// Radar Chart Polygon Fill

export const Ploygonseries = [{
	name: "Series 1",
	data: [20, 100, 40, 30, 50, 80, 33],
}]
export const Polygonoptions = {
	chart: {
		height: 320,
		type: "radar",
		events: {
			mounted: (chart: { windowResizeHandler: () => void; }) => {
				chart.windowResizeHandler();
			}
		},
	},
	dataLabels: {
		enabled: true
	},
	plotOptions: {
		radar: {
			size: 80,
			polygons: {
				strokeColors: "#e9e9e9",
			}
		}
	},
	title: {
		text: "Radar with Polygon Fill",
		align: "left",
		style: {
			fontSize: "13px",
			fontWeight: "bold",
			color: "#8c9097"
		},
	},
	colors: ['#e354d4'],
	markers: {
		size: 4,
		colors: ["#fff"],
		strokeWidth: 2,
	},
	tooltip: {
		y: {
			formatter: (val: { toString: () => any; }) => {
				return val.toString(); // Convert to string
			}
		}
	},
	xaxis: {
		categories: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	},
	yaxis: {
		tickAmount: 7,
		labels: {
			formatter: (val: { toString: () => any; }, i: number) => {
				if (i % 2 === 0) {
					return val.toString(); // Convert to string
				} else {
					return "";
				}
			}
		}
	}
}
