import React from 'react';
import DatePicker from 'react-datepicker';


interface SpkDatepickrProps {
  selected?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  onChange: (date: Date | null) => void;
  dateFormat?: string;
  showTimeSelect?: boolean;
  timeFormat?: string;
  timeIntervals?: number;
  minDate?: Date;
  maxDate?: Date;
  isClearable?: boolean;
  placeholderText?: string;
  className?: string;
  Timeinput?: string;
  disabled?: boolean;
  Inline?: boolean;
  showTimeInput?: boolean;
  Iconvisible?: boolean;
  showTimeSelectOnly?: boolean;
  Caption?: string;
  Localtime?: string;
  Yearpicker?: boolean;
  selectsRange?:any;
}

const SpkDatepickr: React.FC<SpkDatepickrProps> = ({
  selected,
  onChange,
  dateFormat = 'dd/MM/yyyy',
  showTimeSelect = false,
  timeFormat = 'HH:mm',
  timeIntervals = 30,
  minDate,
  maxDate,
  Timeinput,
  isClearable,
  placeholderText = 'Select a date',
  className = '',
  disabled = false,
  Iconvisible ,
  showTimeSelectOnly ,
  showTimeInput ,
  Localtime ,
  Caption ,
  Inline,
  startDate,
  endDate,
  selectsRange,
  Yearpicker,
  ...props
}) => {
  return (
    <DatePicker
      selected={selected}
      selectsRange={selectsRange}
      startDate={startDate}
      endDate={endDate}
      onChange={onChange}
      dateFormat={dateFormat}
      timeInputLabel={Timeinput}
      showTimeSelect={showTimeSelect}
      timeFormat={timeFormat}
      timeIntervals={timeIntervals}
      showTimeSelectOnly={showTimeSelectOnly}
      minDate={minDate}
      maxDate={maxDate}
      isClearable={isClearable}
      placeholderText={placeholderText}
      className={className}
      disabled={disabled}
      showIcon={Iconvisible}
      inline={Inline}
      showTimeInput={showTimeInput}
      timeCaption={Caption}
      showMonthYearPicker={Yearpicker}
      locale={Localtime}
      {...props} // Forward any additional props to DatePicker
    />
  );
};

export default SpkDatepickr;
