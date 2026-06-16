
import Image from "next/image";

interface Selectoption {
	value: string;
	label: string;
}
export const Selectoption1: Selectoption[] = [
	{ value: "Selection-1", label: "Selection-1" },
	{ value: "Selection-2", label: "Selection-2" },
	{ value: "Selection-3", label: "Selection-3" },
	{ value: "Selection-4", label: "Selection-4" },
	{ value: "Selection-5", label: "Selection-5" }
];
export const Selectoption2: Selectoption[] = [
	{ value: "Multiple-1", label: "Multiple-1" },
	{ value: "Multiple-2", label: "Multiple-2" },
	{ value: "Multiple-3", label: "Multiple-3" },
	{ value: "Multiple-4", label: "Multiple-4" },
	{ value: "Multiple-5", label: "Multiple-5" }
];
export const Selectoption3: Selectoption[] = [
	{ value: "Texas", label: "Texas" },
	{ value: "Georgia", label: "Georgia" },
	{ value: "California", label: "California" },
	{ value: "Washington D.C", label: "Washington D.C" },
	{ value: "Virginia", label: "Virginia" }
];

export const Selectoption4: Selectoption[] = [
	{ value: "Kevin", label: "Kevin" },
	{ value: "Maya", label: "Maya" },
	{ value: "Bradus", label: "Bradus" },
	{ value: "Goldhens", label: "Goldhens" },
	{ value: "Angeline", label: "Angeline" }
];

export const Selectmaxoption: Selectoption[] = [
	{ value: "Andrew", label: "Andrew" },
	{ value: "Maya", label: "Maya" },
	{ value: "Brodus Axel", label: "Brodus Axel" },
	{ value: "Goldhens", label: "Goldhens" },
	{ value: "Angelina", label: "Angelina" }
];

export const Selectoption5 = [
	{
		value: "Andrew", label: (
			<div className="flex items-center">
				<Image fill src="../../assets/images/faces/1.jpg" alt="Option 1" className="me-2 me-2" />
				Andrew
			</div>
		)
	},
	{
		value: "Maya", label: (
			<div className="flex items-center">
				<Image fill src="../../assets/images/faces/2.jpg" alt="Option 1" className="me-2" />
				Maya
			</div>
		)
	},
	{
		value: "Brodus Axel", label: (
			<div className="flex items-center">
				<Image fill src="../../assets/images/faces/3.jpg" alt="Option 1" className="me-2" />
				Brodus Axel
			</div>
		)
	},
	{
		value: "Goldhens", label: (
			<div className="flex items-center">
				<Image fill src="../../assets/images/faces/4.jpg" alt="Option 1" className="me-2" />
				Goldhens
			</div>
		)
	},
	{
		value: "Angelina", label: (
			<div className="flex items-center">
				<Image fill src="../../assets/images/faces/5.jpg" alt="Option 1" className="me-2" />
				Angelina
			</div>
		)
	}
];
interface Option {
	value: string;
	label: string;
}

export const options: Option[] = [
	{ value: 's-1', label: 'Selection-1' },
	{ value: 's-2', label: 'Selection-2' },
	{ value: 's-3', label: 'Selection-3' },
	{ value: 's-4', label: 'Selection-4' },
	{ value: 's-5', label: 'Selection-5' },
];
export const options1: Option[] = [
	{ value: 's-1', label: 'Selection-1' },
	{ value: 's-2', label: 'Selection-2' },
	{ value: 's-3', label: 'Selection-3' },
];