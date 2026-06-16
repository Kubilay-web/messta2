"use client"
import SpkDatepickr from "@/shared/@spk-reusable-components/spk-packages/datepicker-component";
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Assigneddata, Prioritydata, Statusdata } from "@/shared/data/pages/todolistdata";
const Todolistdata = dynamic(() => import("@/shared/data/pages/todolistdata"), { ssr: false });


const TodoList = () => {


    //Datepicker
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
            <Seo title="Todo List" />
            <Pageheader Heading="Todo List" breadcrumbs={['Pages']} currentpage="Todo List" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-body !p-0">
                            <div className="p-4 grid border-b border-e-[dashed] border-defaultborder dark:border-defaultborder/10">
                                <Link scroll={false} href="#!" className="hs-dropdown-toggle ti-btn ti-btn-primary flex items-center justify-cente" data-hs-overlay="#todo-compose"> <i className="ri-add-circle-line text-[1rem] align-middle me-1"></i>Create New Task
                                </Link>
                                <div id="todo-compose" className="hs-overlay hidden ti-modal">
                                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                                        <div className="ti-modal-content">
                                            <div className="ti-modal-header">
                                                <h6 className="modal-title text-[1rem] font-semibold" id="mail-ComposeLabel">Modal title</h6>
                                                <button type="button" className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor" data-hs-overlay="#todo-compose">
                                                    <span className="sr-only">Close</span>
                                                    <i className="ri-close-line"></i>
                                                </button>
                                            </div>
                                            <div className="ti-modal-body px-4">
                                                <div className="grid grid-cols-12 gap-x-6 gap-y-2">
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="task-name" className="ti-form-label">Task Name</label>
                                                        <input type="text" className="form-control" id="task-name" placeholder="Task Name" />
                                                    </div>
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label className="ti-form-label">Assigned To</label>
                                                        <SpkSelect multi name="choices-multiple-remove-button" id="choices-multiple-remove-button" option={Assigneddata} mainClass="basic-multi-select"
                                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[Assigneddata[0]]} />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Assigned Date</label>
                                                        <div className="form-group custom-todo">
                                                            <div className="input-group custom-input-pickr">
                                                                <div className="input-group-text text-textmuted dark:text-textmuted/50"> <i className="ri-calendar-line"></i> </div>
                                                                <SpkDatepickr className="form-control" selected={dates["startDate"]} onChange={(date) => handleDateChange("startDate", date)} Timeinput="Time:" dateFormat="yy/MM/dd h:mm aa" placeholderText='Choose date with time' showTimeInput />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Target Date</label>
                                                        <div className="form-group custom-todo">
                                                            <div className="input-group custom-input-pickr">
                                                                <div className="input-group-text text-textmuted dark:text-textmuted/50"> <i className="ri-calendar-line"></i> </div>
                                                                <SpkDatepickr className="form-control" selected={dates["startDate1"]} onChange={(date) => handleDateChange("startDate1", date)} Timeinput="Time:" dateFormat="yy/MM/dd h:mm aa" placeholderText='Choose date with time' showTimeInput />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Status</label>
                                                        <SpkSelect name="choices-single-default1" id="choices-single-default1" option={Statusdata} mainClass="basic-multi-select"
                                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[Statusdata[0]]} />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Priority</label>
                                                        <SpkSelect name="choices-single-default" id="choices-single-default" option={Prioritydata} mainClass="basic-multi-select"
                                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[Prioritydata[0]]} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ti-modal-footer">
                                                <button type="button" className="ti-btn ti-btn-light"
                                                    data-hs-overlay="#todo-compose">Cancel</button>
                                                <button type="button" className="ti-btn ti-btn-primary">Create</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 task-navigation border-b border-e-[dashed]  border-defaultborder dark:border-defaultborder/10">
                                <ul className="list-unstyled task-main-nav mb-0">
                                    <li className="px-0 pt-0">
                                        <span className="text-[0.6875rem] text-textmuted dark:text-textmuted/50 opacity-70 font-medium">TASKS</span>
                                    </li>
                                    <li className="active">
                                        <Link scroll={false} href="#!">
                                            <div className="flex items-center">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-task-line align-middle text-[0.875rem]"></i>
                                                </span>
                                                <span className="flex-grow text-nowrap">
                                                    All Tasks
                                                </span>
                                                <span className="badge bg-success/[0.15] text-success !rounded-full">167</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link scroll={false} href="#!">
                                            <div className="flex items-center">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-star-line align-middle text-[0.875rem]"></i>
                                                </span>
                                                <span className="flex-grow text-nowrap">
                                                    Starred
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link scroll={false} href="#!">
                                            <div className="flex items-center">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-delete-bin-5-line align-middle text-[0.875rem]"></i>
                                                </span>
                                                <span className="flex-grow text-nowrap">
                                                    Trash
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="px-0 pt-2">
                                        <span className="text-[0.6875rem] text-textmuted dark:text-textmuted/50 opacity-70 font-medium">CATEGORIES</span>
                                    </li>
                                    <li>
                                        <Link scroll={false} href="#!">
                                            <div className="flex items-center flex-wrap">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-price-tag-line align-middle text-[0.875rem] font-medium text-primary"></i>
                                                </span>
                                                <span className="flex-grow text-nowrap">
                                                    Personal
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link scroll={false} href="#!">
                                            <div className="flex items-center flex-wrap">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-price-tag-line align-middle text-[0.875rem] font-medium text-secondary"></i>
                                                </span>
                                                <span className="flex-grow text-nowrap">
                                                    Work
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link scroll={false} href="#!">
                                            <div className="flex items-center flex-wrap">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-price-tag-line align-middle text-[0.875rem] font-medium text-warning"></i>
                                                </span>
                                                <span className="flex-grow text-nowrap">
                                                    Health & Fitness
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link scroll={false} href="#!">
                                            <div className="flex items-center flex-wrap">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-price-tag-line align-middle text-[0.875rem] font-medium text-success"></i>
                                                </span>
                                                <span className="flex-grow text-nowrap">
                                                    Daily Goals
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link scroll={false} href="#!">
                                            <div className="flex items-center flex-wrap">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-price-tag-line align-middle text-[0.875rem] font-medium text-danger"></i>
                                                </span>
                                                <span className="flex-grow text-nowrap">
                                                    Financial Management
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-3 text-center">
                                <Image fill src="../../assets/images/media/media-66.png" alt="" className="!inline-flex" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-9 col-span-12">
                    <div className="box">
                        <div className="box-header justify-between">
                            <div>
                                <input className="form-control" type="text" placeholder="Search Here" aria-label=".form-control-sm example" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <div className="ti-dropdown hs-dropdown">
                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-light btn-wave !m-0" data-bs-toggle="dropdown" aria-expanded="false"> Sort By<i className="ri-arrow-down-s-line align-middle ms-2 d-inline-block"></i>
                                    </Link>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">New</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Popular</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Relevant</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="box-body !p-0 relative" id="todo-content">
                            <Todolistdata />
                        </div>
                        <div className="box-footer">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <div> Showing 10 Entries <i className="bi bi-arrow-right  rtl:rotate-180 inline-flex  ms-2 font-semibold"></i> </div>
                                <div>
                                    <nav aria-label="Page navigation" className="pagination-style-4">
                                        <ul className="ti-pagination mb-0">
                                            <li className="page-item"> <Link scroll={false} className="page-link disabled" href="#!"> Prev </Link> </li>
                                            <li className="page-item"><Link scroll={false} className="page-link active" href="#!">1</Link></li>
                                            <li className="page-item"><Link scroll={false} className="page-link" href="#!">2</Link></li>
                                            <li className="page-item"> <Link scroll={false} className="page-link text-primary" href="#!"> next </Link> </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default TodoList;