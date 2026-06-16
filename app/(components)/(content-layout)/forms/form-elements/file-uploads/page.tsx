"use client"
import React, { FC, Fragment, useState } from "react";
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
//filepond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import Seo from "@/shared/layouts-components/seo/seo";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

interface FileUploadsProps { }

const FileUploads: FC<FileUploadsProps> = () => {

    const uploader = Uploader({
        // Get production API keys from Upload.io
        apiKey: 'free'
    });

    //React filepond

    const [files, setFiles] = useState<any>([]);
    const [files1, setFiles1] = useState<any>([]);
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="File Uploads" />
            <Pageheader Heading="File Uploads" breadcrumbs={['Forms', ' Form Elements']} currentpage="File Uploads" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Basic File Input</h5>
                        </div>
                        <div className="box-body">
                            <div>
                                <label htmlFor="file-input" className="sr-only">Choose file</label>
                                <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/50
                                       file:border-0
                                      file:bg-light file:me-4
                                      file:py-3 file:px-4
                                      dark:file:bg-black/20 dark:file:text-white/50"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">File Input Buttons</h5>
                        </div>
                        <div className="box-body">
                            <div>
                                <label className="block">
                                    <span className="sr-only">Choose Profile photo</span>
                                    <input type="file" className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 text-textmuted dark:text-textmuted/50
                                        file:me-4 file:py-2 file:px-4
                                        file:rounded-s-sm file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-primary file:text-white
                                        hover:file:bg-primary focus-visible:outline-none
                                      "/>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-1 --> */}

            {/* <!-- Start::row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">File Input Sizes</h5>
                        </div>
                        <div className="box-body space-y-3">
                            <div>
                                <label htmlFor="small-file-input" className="sr-only">Choose file</label>
                                <input type="file" name="small-file-input" id="small-file-input" className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/50
                                       file:border-0
                                      file:bg-light file:me-4
                                      file:py-2 file:px-4
                                      dark:file:bg-black/20 dark:file:text-white/50"/>
                            </div>

                            <div>
                                <label htmlFor="file-input-medium" className="sr-only">Choose file</label>
                                <input type="file" name="file-input-medium" id="file-input-medium" className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/50
                                       file:border-0
                                      file:bg-light file:me-4
                                      file:py-3 file:px-4
                                      dark:file:bg-black/20 dark:file:text-white/50"/>
                            </div>

                            <div>
                                <label htmlFor="large-file-input" className="sr-only">Choose file</label>
                                <input type="file" name="large-file-input" id="large-file-input" className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 text-textmuted dark:text-textmuted/50
                                       file:border-0
                                      file:bg-light file:me-4
                                      file:py-3 file:px-4 file:sm:py-5
                                      dark:file:bg-black/20 dark:file:text-white/50"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Dropzone File Upload</h5>
                        </div>
                        <div className="box-body">
                              <UploadButton uploader={uploader} options={{ multi: true }} >
                                {({ onClick }) =>
                                    <input className='dropzone w-full h-[148px] dz-clickable file_input text-center' onClick={onClick} placeholder='Drop files here to upload' />
                                }
                                </UploadButton>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Start::row-2 --> */}

            {/* <!-- End::row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Single File Upload</h5>
                        </div>
                        <div className="box-body">
                            <FilePond className="basic-filepond" accepted-file-types={["application/pdf", "image/png", "image/jpeg", "image/gif"]}
                                server="/api" allowReorder={true} files={files1} onupdatefiles={setFiles1} allowMultiple={false} allowImagePreview={true} maxFiles={10} name="filepond"
                                labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>' />
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Multiple File Upload</h5>
                        </div>
                        <div className="box-body">
                            <FilePond className="multiple-filepond" accepted-file-types={["application/pdf", "image/png", "image/jpeg", "image/gif"]}
                                server="/api" allowReorder={true} files={files} onupdatefiles={setFiles} allowMultiple={true} allowImagePreview={true} maxFiles={10} name="filepond"
                                labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>' />
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">circular File Upload</h5>
                        </div>
                        <div className="box-body">
                            <FilePond className="filepond circular-filepond" labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
                                stylePanelLayout='compact circle'
                                styleLoadIndicatorPosition='center bottom'
                                styleButtonRemoveItemPosition='center bottom' />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-3 --> */}
        </Fragment>
    );
};

export default FileUploads;