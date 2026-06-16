"use client"
import SpkDatepickr from "@/shared/@spk-reusable-components/spk-packages/datepicker-component";
import SunEditorComponent from "@/shared/@spk-reusable-components/spk-packages/editor-component";
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import { Multipleselectdata, Multipleselectdata1, multiselectdata } from "@/shared/data/apps/projects/createprojectdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useState } from "react";
import CreatableSelect from 'react-select/creatable';
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

const CreateProject = () => {

    const [files, setFiles] = useState<any>([]);

    const [isSearchable] = useState(true);

    const [startDate, setStartDate] = useState(new Date());
    const handleDateChange = (date: Date | null) => {
        if (date) {
            setStartDate(date);
        }
    };


    const [startDate1, setStartDate1] = useState(new Date());
    const handleDateChange1 = (date: Date | null) => {
        if (date) {
            setStartDate1(date);
        }
    };

    const components = {
        DropdownIndicator: null,
    };

    const createOption = (label: string) => ({
        label,
        value: label,
    });

    const [inputValue, setInputValue] = useState('');
    const [value1, setValue1] = useState([
        createOption("Marketing"),
        createOption("Sales"),
        createOption("Development"),
        createOption("Design"),
        createOption("Research"),

    ]);
    const handleKeyDown = (event: { key: any; preventDefault: () => void; }) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setValue1((prev) => [...prev, createOption(inputValue)]);
                setInputValue('');
                event.preventDefault();
        }
    };

    const defaultContent = ` <div id="project-descriptioin-editor">
    <p>lorem Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33.</p>
    <p><br/></p>
    <ol>
        <li className="ql-size-normal">Ensure data security and compliance with relevant regulations.</li>
        <li className="">Train staff on the enhanced system within two weeks of deployment.</li>
        <li className="">Implement a scalable solution to accommodate future growth.</li>
        <li className="">Decrease the time required for inventory audits by 50%.</li>
        <li className="">Achieve a 10% reduction in excess inventory costs.</li>
    </ol>`;

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Projects-Createproject" />
            <Pageheader Heading="Create Project" breadcrumbs={['Apps','Projects']} currentpage="Create Project" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Create Project
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="xl:col-span-4 col-span-12">
                                    <label htmlFor="input-label" className="ti-form-label">Project Name :</label>
                                    <input type="text" className="form-control" id="input-label" placeholder="Enter Project Name" />
                                </div>
                                <div className="xl:col-span-4 col-span-12">
                                    <label htmlFor="input-label1" className="ti-form-label">Project Manager :</label>
                                    <input type="text" className="form-control" id="input-label1" placeholder="Project Manager Name" />
                                </div>
                                <div className="xl:col-span-4 col-span-12">
                                    <label htmlFor="input-label1" className="ti-form-label">Client / Stakeholder :</label>
                                    <input type="text" className="form-control" placeholder="Enter Client Name" />
                                </div>
                                <div className="xl:col-span-12 col-span-12 mb-4">
                                    <label className="ti-form-label">Project Description :</label>
                                    <div id="project-descriptioin-editor">
                                        <SunEditorComponent height={'200px'} defaulContent={defaultContent} />
                                    </div>
                                </div>

                                <div className="xl:col-span-6 col-span-12">
                                    <label className="ti-form-label">Start Date :</label>
                                    <div className="form-group">
                                        <div className="input-group custom-picker">
                                            <div className="input-group-text text-muted"> <i className="ri-calendar-line"></i> </div>
                                            <SpkDatepickr className="form-control flatpickr-input" Timeinput="Time:"
                                                dateFormat="yy/MM/dd h:mm aa"
                                                placeholderText='Choose date with time'
                                                showTimeInput selected={startDate} onChange={handleDateChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="ti-form-label">End Date :</label>
                                    <div className="form-group">
                                        <div className="input-group custom-picker">
                                            <div className="input-group-text text-muted"> <i className="ri-calendar-line"></i> </div>
                                            <SpkDatepickr className="form-control flatpickr-input" Timeinput="Time:"
                                                dateFormat="yy/MM/dd h:mm aa"
                                                placeholderText='Choose date with time'
                                                showTimeInput selected={startDate1} onChange={handleDateChange1} />
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="ti-form-label">Status :</label>
                                    <SpkSelect searchable={isSearchable} name="choices-single-default" option={Multipleselectdata1} mainClass="default basic-multi-select" id="choices-single-default"
                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[Multipleselectdata1[1]]} />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="ti-form-label">Priority :</label>
                                    <SpkSelect searchable={isSearchable} name="choices-single-default2" option={Multipleselectdata} mainClass="default basic-multi-select" id="choices-single-default2"
                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[Multipleselectdata[0]]} />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="ti-form-label">Assigned To</label>
                                    <SpkSelect multi name="assigned-team-members" option={multiselectdata} mainClass="basic-multi-select" classNameprefix="Select2" id="assigned-team-members"
                                        defaultvalue={[multiselectdata[0], multiselectdata[9], multiselectdata[4]]} />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="ti-form-label">Tags</label>
                                    <CreatableSelect
                                        className="tags-data" id="choices-text-unique-values"
                                        components={components}
                                        classNamePrefix='Select2'
                                        inputValue={inputValue}
                                        isClearable
                                        isMulti
                                        menuIsOpen={false}
                                        onChange={(newValue) => {
                                            // Ensure newValue is an array (or empty array) of objects
                                            if (Array.isArray(newValue)) {
                                                setValue1(newValue);
                                            } else {
                                                // Handle the case when newValue is not an array
                                                setValue1([]);
                                            }
                                        }}
                                        onInputChange={(newValue) => setInputValue(newValue)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type something and press enter..."
                                        value={value1} />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <label htmlFor="file-input" className="ti-form-label">Attachments</label>
                                    <FilePond
                                        files={files}
                                        onupdatefiles={setFiles}
                                        allowMultiple={true}
                                        maxFiles={3}
                                        server="/api"
                                        name="files" /* sets the file input name, it's filepond by default */
                                        labelIdle='Drag & Drop your file here or click ' />
                                </div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <SpkButton variant="primary" customClass="ti-btn btn-wave ms-auto float-end">Create Project</SpkButton>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}

        </Fragment>
    );
};

export default CreateProject;