import Select, { Props as SelectProps } from 'react-select';

interface SpkSelectProps {
    option: SelectProps['options'];
    defaultvalue?: SelectProps['value'];
    mainClass?: string;
    onfunchange?: (value: any) => void;
    disabled?: boolean;
    getValue?: SelectProps['value'];
    clearable?: boolean;
    multi?: boolean;
    searchable?: boolean;
    placeholder?: string;
    autofocus?: boolean;
    noOptionsmessage?: any;
    name?: string
    menuplacement?: any;
    classNameprefix?: string;
    id?: string;
}

const SpkSelect: React.FC<SpkSelectProps> = ({ option, menuplacement, id, autofocus, noOptionsmessage, classNameprefix, defaultvalue, mainClass, onfunchange, disabled, name, getValue, clearable, multi, searchable, placeholder, ...rest }) => {

    return (
        <>
            <Select name={name} options={option} className={mainClass} id={id} onChange={onfunchange as SelectProps['onChange']} isDisabled={disabled} isMulti={multi}
                menuPlacement={menuplacement} classNamePrefix={classNameprefix} defaultValue={defaultvalue} value={getValue} isClearable={clearable} isSearchable={searchable} placeholder={placeholder}
                autoFocus={autofocus} noOptionsMessage={noOptionsmessage} {...rest}
            />
        </>
    )
}
export default SpkSelect;