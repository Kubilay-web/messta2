
interface defaultalerts {
	id: number
	text: string
	class: string
}
export const Defaultalerts: defaultalerts[] = [
	{ id: 1, text: "Top", class: "top" },
	{ id: 2, text: "Right", class: "auto" },
	{ id: 3, text: "Bottom", class: "bottom" },
	{ id: 4, text: "Left", class: "left" },
];
interface colorheader {
	id: number
	text: string
	class: string
	color: string
	color1: string
	color2: string
}
export const Colorheaderalerts: colorheader[] = [
	{ id: 1, text: "Primary", class: "top", color: "outline-primary", color1: "primary", color2: "" },
	{ id: 2, text: "Primary1", class: "top", color: "outline-primary1", color1: "primary1", color2: "" },
	{ id: 3, text: "Primary2", class: "top", color: "outline-primary2", color1: "primary2", color2: "" },
	{ id: 4, text: "Primary3", class: "top", color: "outline-primary3", color1: "primary3", color2: "" },
	{ id: 5, text: "Secondary", class: "right", color: "outline-secondary", color1: "secondary", color2: "" },
	{ id: 6, text: "Info", class: "bottom", color: "outline-info", color1: "info", color2: "bs-popover-auto" },
	{ id: 7, text: "Warning", class: "left", color: "outline-warning", color1: "warning", color2: "" },
	{ id: 8, text: "Success", class: "top", color: "outline-success", color1: "success", color2: "" },
	{ id: 9, text: "Danger", class: "top", color: "outline-danger", color1: "danger", color2: "" },
];
interface coloralerts {
	id: number
	text: string
	class: string
	color1: string
}
export const Colredalerts: coloralerts[] = [
	{ id: 1, text: "Primary", class: "top", color1: "primary" },
	{ id: 2, text: "Primary1", class: "top", color1: "primary1" },
	{ id: 3, text: "Primary2", class: "top", color1: "primary2" },
	{ id: 4, text: "Primary3", class: "top", color1: "primary3" },
	{ id: 5, text: "Secondary", class: "right", color1: "secondary" },
	{ id: 6, text: "Info", class: "bottom", color1: "info" },
	{ id: 7, text: "Warning", class: "left", color1: "warning" },
	{ id: 8, text: "Success", class: "top", color1: "success" },
	{ id: 9, text: "Danger", class: "right", color1: "danger" },
	{ id: 10, text: "Teal", class: "bottom", color1: "teal" },
	{ id: 11, text: "Purple", class: "left", color1: "purple" },
];
interface dismiss {
	id: number
	color: string
	class: string
}
export const Dismissiblealerts: dismiss[] = [
	{ id: 1, color: "primary", class: "top" },
	{ id: 2, color: "secondary", class: "right" },
	{ id: 3, color: "info", class: "left" },
	{ id: 4, color: "warning", class: "bottom" },
];

