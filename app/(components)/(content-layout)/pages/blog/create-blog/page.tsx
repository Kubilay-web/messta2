"use client"
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import SunEditorComponent from "@/shared/@spk-reusable-components/spk-packages/editor-component";
//filepond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import React, { Fragment, useState } from "react";
import SpkDatepickr from "@/shared/@spk-reusable-components/spk-packages/datepicker-component";
import { option, option1, option2 } from '@/shared/data/pages/blog/blog-details-data';

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

const BlogCreate = () => {

    const [startDate, setStartDate] = useState(new Date());
    //Datepicker function
    const handleDateChange = (date: any) => {
        // Ensure date is defined before setting it
        if (date) {
            setStartDate(date);
        }
    };
//
const [startDate4, setStartDate4] = useState(new Date());
const handleDateChange4 = (date: Date | null) => {
    // Ensure date is defined before setting it
    if (date) {
        setStartDate4(date);
    }
};
    //Filepond 
    const [files, setFiles] = useState<any>([]);

    

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Blog Create" />
            <Pageheader Heading="Blog Create" breadcrumbs={['Pages', ' Blog']} currentpage="Blog Create" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">New Blog</div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                <div className="xl:col-span-12 col-span-12">
                                    <label htmlFor="blog-title" className="ti-form-label">Blog Title</label>
                                    <input type="text" className="form-control" id="blog-title" placeholder="Blog Title" />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <label htmlFor="blog-category" className="ti-form-label">Blog Category</label>
                                    <SpkSelect option={option2} mainClass="basic-multi-select" name="blog-category" id="blog-category"
                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[option2[0]]} />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="blog-author" className="ti-form-label">Blog Author</label>
                                    <input type="text" className="form-control" id="blog-author" placeholder="Enter Name" />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="blog-author-email" className="ti-form-label">Email</label>
                                    <input type="text" className="form-control" id="blog-author-email" placeholder="Enter Email" />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="publish-date" className="ti-form-label">Publish Date</label>
                                    <SpkDatepickr className="form-control flatpickr-input" selected={startDate}  placeholderText="Choose date" onChange={handleDateChange} />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="publish-time" className="ti-form-label">Publish Time</label>
                                    <SpkDatepickr className="form-control"
                                        selected={startDate4}
                                        onChange={handleDateChange4}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        Caption="Time"
                                        dateFormat="h:mm aa"
                                    />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="product-status-add" className="ti-form-label">Published Status</label>
                                    <SpkSelect option={option1} mainClass="basic-multi-select" name="product-status-add" id="product-status-add"
                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[option1[0]]} />

                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="blog-tags" className="ti-form-label">Blog Tags</label>
                                    <SpkSelect multi option={option} mainClass="basic-multi-select" name="blog-tags" id="blog-tags"
                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[option[0]]} />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <label className="ti-form-label">Blog Content</label>
                                    <SunEditorComponent height={'200px'} />
                                </div>
                                <div className="xl:col-span-12 col-span-12 blog-images-container">
                                    <label htmlFor="blog-author-email" className="ti-form-label">Blog Images</label>
                                    <FilePond
                                        files={files}
                                        onupdatefiles={setFiles}
                                        allowMultiple={true}
                                        maxFiles={3}
                                        server="/api"
                                        name="files" /* sets the file input name, it's filepond by default */
                                        labelIdle='Drag & Drop your file here or click '
                                    />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <label className="ti-form-label">Blog Type</label>
                                    <div className="flex items-center">
                                        <div className="form-check me-3 !flex items-center">
                                            <input className="form-check-input" type="radio" name="blog-type" id="blog-free1" defaultChecked />
                                            <label className="form-check-label" htmlFor="blog-free1">
                                                Free
                                            </label>
                                        </div>
                                        <div className="form-check !flex items-center">
                                            <input className="form-check-input" type="radio" name="blog-type" id="blog-paid1" />
                                            <label className="form-check-label" htmlFor="blog-paid1">
                                                Paid
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="btn-list text-end">
                                <button type="button" className="ti-btn ti-btn-sm ti-btn-light me-2">Save As Draft</button>
                                <button type="button" className="ti-btn ti-btn-sm ti-btn-primary">Post Blog</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default BlogCreate;