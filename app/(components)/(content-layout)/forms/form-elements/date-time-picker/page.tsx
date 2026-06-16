"use client"
import SpkDatepickr from "@/shared/@spk-reusable-components/spk-packages/datepicker-component";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment, useState } from "react";

interface DateTimePickerProps { }

const DateTimePicker: FC<DateTimePickerProps> = () => {
    const [dates, setDates] = useState<{ [key: string]: Date | null }>({});

    const handleDateChange = (key: string, date: Date | null) => {
        setDates((prevDates) => ({
            ...prevDates,
            [key]: date,
        }));
    };
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Date & Time Pickers" />
            <Pageheader Heading="Date & Time Pickers" breadcrumbs={['Forms', ' Form Elements']} currentpage="Date & Time Pickers" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Basic Date picker
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group custom-picker">
                                    <div className="input-group-text !text-textmuted dark:text-textmuted/50 !border-defaultborder dark:!border-defaultborder/10"> <i className="ri-calendar-line"></i> </div>

                                    <SpkDatepickr className="form-control" placeholderText='Choose date' selected={dates["startDate"]} onChange={(date) => handleDateChange("startDate", date)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Date picker With Time
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group custom-picker">
                                    <div className="input-group-text !text-textmuted dark:text-textmuted/50 !border-defaultborder dark:!border-defaultborder/10"> <i className="ri-calendar-line"></i> </div>

                                    <SpkDatepickr className="form-control"
                                        selected={dates["startDate1"]}
                                        onChange={(date) => handleDateChange("startDate1", date)}
                                        Timeinput="Time:"
                                        dateFormat="yy/MM/dd h:mm aa"
                                        placeholderText='Choose date with time'
                                        showTimeInput
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Human Friendly dates
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group custom-picker">
                                    <div className="input-group-text !text-textmuted dark:text-textmuted/50 !border-defaultborder dark:!border-defaultborder/10"> <i className="ri-calendar-line"></i> </div>

                                    <SpkDatepickr className="form-control" selected={dates["startDate2"]} placeholderText='Human friendly dates'
                                        onChange={(date) => handleDateChange("startDate2", date)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Date range picker
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group custom-picker">
                                    <div className="input-group-text !text-textmuted dark:text-textmuted/50 !border-defaultborder dark:!border-defaultborder/10"> <i className="ri-calendar-line"></i> </div>

                                    <SpkDatepickr className="form-control" selected={dates["startDate3"]} placeholderText='Date range picker'
                                        onChange={(date) => handleDateChange("startDate3", date)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Month Picker
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group mb-0">
                                <div className="input-group custom-picker custom-date-picker">
                                    <div className="input-group-text !text-textmuted dark:text-textmuted/50 !border-defaultborder dark:!border-defaultborder/10"> <i className="ri-time-line"></i> </div>

                                    <SpkDatepickr className="form-control"  placeholderText='Month picker'
                                        selected={dates["startDate4"]}
                                        onChange={(date) => handleDateChange("startDate4", date)}
                                        dateFormat="MM/yyyy"
                                        Yearpicker={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Locale with time
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group custom-picker">
                                    <div className="input-group-text !text-textmuted dark:text-textmuted/50 !border-defaultborder dark:!border-defaultborder/10"> <i className="ri-time-line"></i> </div>

                                    <SpkDatepickr className="form-control" placeholderText='Choose time'
                                        selected={dates["startDate5"]}
                                        onChange={(date) => handleDateChange("startDate5", date)}
                                        Localtime="pt-BR"
                                        showTimeSelect
                                        timeFormat="p"
                                        timeIntervals={15}
                                        dateFormat="Pp"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Basic Time picker
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group custom-picker">
                                    <div className="input-group-text !text-textmuted dark:text-textmuted/50 !border-defaultborder dark:!border-defaultborder/10"> <i className="ri-time-line"></i> </div>

                                    <SpkDatepickr className="form-control" placeholderText='Choose time'
                                        selected={dates["startDate6"]}
                                        onChange={(date) => handleDateChange("startDate6", date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        Caption="Time"
                                        dateFormat="h:mm aa"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Time Picker with Limits
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group custom-picker">
                                    <div className="input-group-text !text-textmuted dark:text-textmuted/50 !border-defaultborder dark:!border-defaultborder/10"> <i className="ri-time-line"></i> </div>

                                    <SpkDatepickr 
                                        className="form-control" placeholderText='Time Picker with Limits'
                                        selected={dates["startDate7"]}
                                        onChange={(date) => handleDateChange("startDate7", date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        Caption="Time"
                                        dateFormat="h:mm aa"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="grid grid-cols-12">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Inline Time Picker
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="form-group mb-0">

                                        <SpkDatepickr className="form-control" selected={dates["startDate8"]}
                                            onChange={(date) => handleDateChange("startDate8", date)} Inline={true} showTimeSelect showTimeSelectOnly={true} timeIntervals={15} Caption="Time"
                                            dateFormat="h:mm aa" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Inline Calendar
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group overflow-auto">

                                <SpkDatepickr selected={dates["startDatei"]}
                                    onChange={(date) => handleDateChange("startDatei", date)} className="form-control" Inline={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}
        </Fragment>
    );
};

export default DateTimePicker;