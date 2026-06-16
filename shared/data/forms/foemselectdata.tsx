
import dynamic from "next/dynamic";
const Creatable = dynamic(() => import("react-select/creatable"), { ssr: false });
import React, { KeyboardEventHandler, useState } from "react";
import CreatableSelect from 'react-select/creatable';
interface Selectdata {
	value: string;
	label: string;
}

export const Multipleselectdata = [
	{ value: "Choice 1", label: "Choice 1" },
	{ value: "Choice 2", label: "Choice 2" },
	{ value: "Choice 3", label: "Choice 3" },
	{ value: "Choice 4", label: "Choice 4" },
	{ value: "Choice 5", label: "Choice 5" },
	{ value: "Choice 6", label: "Choice 6", disabled: 'true' },
];
export const Multipleselectdata1: Selectdata[] = [
	{ value: "Choice 1", label: "Choice 1" },
	{ value: "Choice 2", label: "Choice 2" },
	{ value: "Choice 3", label: "Choice 3" },
	{ value: "Choice 4", label: "Choice 4" }
];

//
const Group1: Selectdata[] = [
	{ value: "Montreal", label: "Montreal" },
	{ value: "Toronto", label: "Toronto" },
	{ value: "Vancouver", label: "Vancouver" }
];
const Group2: Selectdata[] = [
	{ value: "Paris", label: "Paris" },
	{
		value: "Lyon",
		label: "Lyon"
	},
	{
		value: "Marseille",
		label: "Marseille"
	},

];

const Group3: Selectdata[] = [
	{
		value: "Madrid",
		label: "Madrid"
	},
	{
		value: "Barcelona",
		label: "Barcelona",
	},
	{
		value: "Malaga",
		label: "Malaga"
	},

];
const Group4: Selectdata[] = [
	{
		value: "London",
		label: "London"
	},
	{
		value: "Manchester",
		label: "Manchester"
	},
	{
		value: "Liverpool",
		label: "Liverpool"
	},

];
const Group5 = [
	{
		value: "New York",
		label: "New York"
	},
	{
		value: "Washington",
		label: "Washington",
		isDisabled: "isDisabled"
	},
	{
		value: "Michigan",
		label: "Michigan"
	},

];
const groupeddata = [
	{
		label: "CA",
		options: Group1
	},
	{
		label: "FR",
		options: Group2
	},
	{
		label: "SP",
		options: Group3
	},
	{
		label: "UK",
		options: Group4
	},
	{
		label: "US",
		options: Group5
	}

];
export function SingleGroup() {
	const [selected, setSelected] = useState<any>([]);

	return (
		<div>
			<Creatable
				classNamePrefix="Select2"
				options={groupeddata}
				value={selected}
				onChange={setSelected}
			/>
		</div>
	);
}

export function MultiGroup() {
	const [selected, setSelected] = useState<any>([]);

	return (
		<div>
			<Creatable isMulti
			defaultValue={[groupeddata[4], groupeddata[5]]}
				classNamePrefix="Select2"
				options={groupeddata}
				value={selected}
				onChange={setSelected}
			/>
		</div>
	);
}
export const Optionwithnosearch: Selectdata[] = [
	{ value: "Label One", label: "Label One" },
	{ value: "Label Two", label: "Label Two" },
	{ value: "Label Three", label: "Label Three" },
	{ value: "Label Four", label: "Label Four" },
	{ value: "Label Five", label: "Label Five" },
	{ value: "Label Six", label: "Label Six" },
];

interface select {
	id:number;
	label:string;
	value:string;
	}
	
//Default Select
export const defaultselect:select[] = [
    {id:1, label:"Open this select menu", value:'Open this select menu'},
    {id:2, label:"1", value:'1'},
    {id:3, label:"2", value:'2'},
    {id:4, label:"3", value:'3'},
]

const components = {
    DropdownIndicator: null,
  };
  
  interface Option {
    readonly label: string;
    readonly value: string;
  }
  
  const createOption = (label: string) => ({
    label,
    value: label,
  });

  export function Tomselect() {
    
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState<readonly Option[]>([]);
  
    const handleKeyDown: KeyboardEventHandler = (event) => {
      if (!inputValue) return;
      switch (event.key) {
        case 'Enter':
        case 'Tab':
          setValue((prev) => [...prev, createOption(inputValue)]);
          setInputValue('');
          event.preventDefault();
      }
    };
  
    return (
      <div>
        <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      classNamePrefix='Select2'
      menuIsOpen={false}
      onChange={(newValue) => setValue(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder="Type something and press enter..."
      value={value}
    />
      </div>
    );
  }

  //Basic Tom Select
interface basic {
	value:string;
	label:string;
  }
  export const basicselect:basic[] = [
	  {value:"Select a person...", label:"Select a person..."},
	  {value:"Thomas Edison", label:"Thomas Edison"},
	  {value:"Nikola", label:"Nikola"},
	  {value:"Nikola Tesla",label:"Nikola Tesla" },
	  {value:"Arnold Schwarzenegger",label:"Arnold Schwarzenegger" },
  ]
  //Multiple dropdown select
interface multi {
	value:string;
	label:string;
  }
  export const multiDropdownSelect:multi[] = [
	  { value: "Alabama", label: "Alabama" },
	  { value: "Alaska", label: "Alaska" },
	  { value: "Arizona", label: "Arizona" },
	  { value: "Arkansas", label: "Arkansas" },
	  { value: "California", label: "California" },
	  { value: "Colorado", label: "Colorado" },
	  { value: "Connecticut", label: "Connecticut" },
	  { value: "Delaware", label: "Delaware" },
	  { value: "District of Columbia", label: "District of Columbia" },
	  { value: "Florida", label: "Florida" },
	  { value: "Georgia", label: "Georgia" },
	  { value: "Hawaii", label: "Hawaii" },
	  { value: "Idaho", label: "Idaho" },
	  { value: "Illinois", label: "Illinois" },
	  { value: "Indiana", label: "Indiana" },
	  { value: "Iowa", label: "Iowa" },
	  { value: "Kansas", label: "Kansas" },
	  { value: "Kentucky", label: "Kentucky" },
	  { value: "Louisiana", label: "Louisiana" },
	  { value: "Maine", label: "Maine" },
	  { value: "Maryland", label: "Maryland" },
	  { value: "Massachusetts", label: "Massachusetts" },
	  { value: "Michigan", label: "Michigan" },
	  { value: "Minnesota", label: "Minnesota" },
	  { value: "Mississippi", label: "Mississippi" },
	  { value: "Missouri", label: "Missouri" },
	  { value: "Montana", label: "Montana" },
	  { value: "Nebraska", label: "Nebraska" },
	  { value: "Nevada", label: "Nevada" },
	  { value: "New Hampshire", label: "New Hampshire" },
	  { value: "New Jersey", label: "New Jersey" },
	  { value: "New Mexico", label: "New Mexico" },
	  { value: "New York", label: "New York" },
	  { value: "North Carolina", label: "North Carolina" },
	  { value: "North", label: "North" },
	  { value: "Ohio", label: "Ohio" },
	  { value: "Oklahoma", label: "Oklahoma" },
	  { value: "Oregon", label: "Oregon" },
	  { value: "Pennsylvania", label: "Pennsylvania" },
	  { value: "Rhode Island", label: "Rhode Island" },
	  { value: "South Carolina", label: "South Carolina" },
	  { value: "South Dakota", label: "South Dakota" },
	  { value: "Tennessee", label: "Tennessee" },
	  { value: "Texas", label: "Texas" },
	  { value: "Utah", label: "Utah" },
	  { value: "Vermont", label: "Vermont" },
	  { value: "Virginia", label: "Virginia" },
	  { value: "Washington", label: "Washington" },
	  { value: "West Virginia", label: "West Virginia" },
	  { value: "Wisconsin", label: "Wisconsin" },
	  { value: "Wyoming", label: "Montana" }
	];
  
  