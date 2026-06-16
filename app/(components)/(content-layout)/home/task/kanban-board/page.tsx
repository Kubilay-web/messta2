"use client"
import SpkKanbanboard from "@/shared/@spk-reusable-components/apps/spk-kanbanboard";
import SpkDatepickr from "@/shared/@spk-reusable-components/spk-packages/datepicker-component";
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import { Option1, Option2, Option3, tasks, Taskdata1, Taskdata2, Taskdata3, Taskdata4, avatars } from "@/shared/data/apps/task/kanbanboarddata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { FilePond } from "react-filepond";
import SimpleBar from "simplebar-react";

const KanbanBoard = () => {
    const [files, setFiles] = useState<any>([]);
    const [startDate, setStartDate] = useState(new Date());
    const handleDateChange = (date: Date | null) => {
        // Ensure date is defined before setting it
        if (date) {
            setStartDate(date);
        }
    };

    const leftContainerRef = useRef(null);
    const rightContainerRef = useRef(null);
    const topContainerRef = useRef(null);
    const bottomContainerRef = useRef(null);
    const lastContainerRef = useRef(null);

    const slidesArrow = (selector: any) => document.querySelector(selector);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const dragula = require("dragula");
            const windowElement = window;

            if (leftContainerRef.current && rightContainerRef.current) {
                const containers = [
                    leftContainerRef.current,
                    rightContainerRef.current,
                    topContainerRef.current,
                    bottomContainerRef.current,
                    lastContainerRef.current
                ];
                const drake = dragula(containers);

                // Your other dragula-related logic here...

                if (slidesArrow(".firstdrag")?.classList.contains("task-Null")) {
                    slidesArrow(".view-more-button")?.classList.add("d-none");
                }
            }

            OnDivChange();
        }
    }, []);

    const elementsToModify = [
        leftContainerRef,
        rightContainerRef,
        topContainerRef,
        bottomContainerRef,
        lastContainerRef
    ];

    const OnDivChange = () => {
        elementsToModify.forEach((elementId) => {
            const element: any = elementId.current;
            if (element?.children.length <= 0) {
                element?.classList.add("task-Null");
                element?.parentNode.parentElement.parentElement.querySelector(".view-more-button")?.classList.add("hidden");
            } else {
                element?.classList.remove("task-Null");
                element?.parentNode.parentElement.parentElement.querySelector(".view-more-button")?.classList.remove("hidden");
            }
        });
    };

    return (
        <Fragment>
            {/* <!-- Page Header --> */}
            <Seo title="Kanban Board" />
            <Pageheader Heading="Kanban Board" breadcrumbs={['Apps', 'Tasks']} currentpage="Kanban Board" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-body p-4">
                            <div className="md:flex items-center justify-between flex-wrap gap-4">
                                <div className="grid grid-cols-12 gap-2 md:w-[30%]">
                                    <div className="xl:col-span-5 col-span-12">
                                        <SpkButton customClass="hs-dropdown-toggle  ti-btn bg-primary  btn-wave text-white !font-medium" Overlay="#add-board"><i className="ri-add-line !text-[1rem]"></i>New Board</SpkButton>
                                    </div>
                                    <div className="xl:col-span-7 col-span-12">
                                        <SpkSelect name="choices-single-default" id="choices-single-default" option={Option1} mainClass=" w-full !rounded-md" placeholder="Sort By"
                                            menuplacement='auto' classNameprefix="Select2" />
                                    </div>
                                </div>
                                <div className="avatar-list-stacked my-3 md:my-0">
                                    {avatars.slice(0, 6).map((avatar, index) => (
                                        <span className="avatar avatar-rounded" key={index}>
                                            <Image fill src={avatar} alt="img" />
                                        </span>
                                    ))}
                                    <Link className="avatar bg-primary avatar-rounded text-white" href="#!">
                                        +8
                                    </Link>
                                </div>
                                <div className="flex" role="search">
                                    <input className="form-control w-full !rounded-sm me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <SpkButton customClass="ti-btn ti-btn-light !m-0" buttontype="submit">Search</SpkButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start::row-2 --> */}
            <div className="mamix-kanban-board text-defaulttextcolor dark:text-defaulttextcolor/80 text-defaultsize">
                <div className="kanban-tasks-type new">
                    <div className="mb-4">
                        <div className="flex justify-between items-center">
                            <span className="block font-semibold text-[.9375rem]">NEW - 04</span>
                            <div>
                                <Link scroll={false} href="#!" className="hs-dropdown-toggle  ti-btn !py-1 !px-2 !font-medium !text-[0.75rem] bg-white dark:bg-bodybg text-default border-0" data-hs-overlay="#add-task"><i className="ri-add-line"></i>Add Task</Link>
                            </div>
                        </div>
                    </div>
                    <SimpleBar className="kanban-tasks" id="new-tasks">
                        <div id="new-tasks-draggable" data-view-btn="new-tasks" ref={leftContainerRef} onMouseEnter={OnDivChange}>
                            {tasks.map((idx: any) => (
                                <SpkKanbanboard key={idx.id} cardClass="new" obj={idx} />
                            ))}
                        </div>
                    </SimpleBar>
                    <div className="grid mt-4">
                        <SpkButton buttontype="button" customClass="ti-btn ti-btn-soft-primary">View More</SpkButton>

                    </div>
                </div>
                <div className="kanban-tasks-type todo">
                    <div className="mb-4">
                        <div className="flex justify-between items-center">
                            <span className="block font-semibold text-[.9375rem]">TODO - 36</span>
                            <div>
                                <Link scroll={false} href="#!" className="hs-dropdown-toggle  ti-btn !py-1 !px-2 !font-medium  !text-[0.75rem] bg-white dark:bg-bodybg text-default border-0" data-hs-overlay="#add-task"><i className="ri-add-line"></i>Add Task </Link>
                            </div>
                        </div>
                    </div>

                    <SimpleBar className="kanban-tasks" id="todo-tasks">
                        <div id="todo-tasks-draggable" data-view-btn="todo-tasks" ref={rightContainerRef} onMouseEnter={OnDivChange}>
                            {Taskdata1.map((idx: any) => (
                                <SpkKanbanboard key={idx.id} cardClass="todo" obj={idx} />
                            ))}
                        </div>
                    </SimpleBar>
                    <div className="grid mt-4">
                        <SpkButton buttontype="button" customClass="ti-btn ti-btn-soft-primary">View More</SpkButton>

                    </div>
                </div>
                <div className="kanban-tasks-type in-progress">
                    <div className="mb-4">
                        <div className="flex justify-between items-center">
                            <span className="block font-semibold text-[.9375rem]">ON GOING - 25</span>
                            <div>
                                <Link scroll={false} href="#!" className="hs-dropdown-toggle  ti-btn !py-1 !px-2 !font-medium !text-[0.75rem] bg-white dark:bg-bodybg text-default border-0" data-hs-overlay="#add-task"><i className="ri-add-line"></i>Add Task
                                </Link>
                            </div>
                        </div>
                    </div>
                    <SimpleBar className="kanban-tasks" id="inprogress-tasks">
                        <div id="inprogress-tasks-draggable" data-view-btn="inprogress-tasks" ref={topContainerRef} onMouseEnter={OnDivChange}>
                            {Taskdata2.map((idx: any) => (
                                <SpkKanbanboard key={idx.id} cardClass="inprogress" obj={idx} />
                            ))}
                        </div>
                    </SimpleBar>
                    <div className="grid mt-4">
                        <SpkButton buttontype="button" customClass="ti-btn ti-btn-soft-primary">View More</SpkButton>
                    </div>
                </div>
                <div className="kanban-tasks-type inreview">
                    <div className="mb-4">
                        <div className="flex justify-between items-center">
                            <span className="block font-semibold text-[.9375rem]">IN REVIEW - 02</span>
                            <div>
                                <Link scroll={false} href="#!" className="hs-dropdown-toggle  ti-btn !py-1 !px-2 !font-medium !text-[0.75rem] bg-white dark:bg-bodybg text-default border-0" data-hs-overlay="#add-task"><i className="ri-add-line"></i>Add Task
                                </Link>
                            </div>
                        </div>
                    </div>
                    <SimpleBar className="kanban-tasks" id="inreview-tasks">
                        <div id="inreview-tasks-draggable" data-view-btn="inreview-tasks" ref={bottomContainerRef} onMouseEnter={OnDivChange}>
                            {Taskdata3.map((idx: any) => (
                                <SpkKanbanboard key={idx.id} obj={idx} />
                            ))}
                        </div>
                    </SimpleBar>
                    <div className="grid mt-4">
                        <SpkButton buttontype="button" customClass="ti-btn ti-btn-soft-primary">View More</SpkButton>
                    </div>
                </div>
                <div className="kanban-tasks-type completed">
                    <div className="mb-4">
                        <div className="flex justify-between items-center">
                            <span className="block font-semibold text-[.9375rem]">COMPLETED - 36</span>
                            <div>
                                <Link scroll={false} href="#!" className="hs-dropdown-toggle  ti-btn !py-1 !px-2 !font-medium !text-[0.75rem] bg-white dark:bg-bodybg text-default border-0" data-hs-overlay="#add-task"><i className="ri-add-line"></i>Add Task</Link>
                            </div>
                        </div>
                    </div>
                    <SimpleBar className="kanban-tasks" id="completed-tasks">
                        <div id="completed-tasks-draggable" data-view-btn="completed-tasks" ref={lastContainerRef} onMouseEnter={OnDivChange}>
                            {Taskdata4.map((idx: any) => (
                                <SpkKanbanboard key={idx.id} obj={idx} />
                            ))}
                        </div>
                    </SimpleBar>
                    <div className="grid mt-4">
                        <SpkButton buttontype="button" customClass="ti-btn ti-btn-soft-primary">View More</SpkButton>
                    </div>
                </div>
            </div>
            {/* <!--End::row-2 --> */}

            {/* <!-- Start::add board modal --> */}
            <div id="add-board" className="hs-overlay hidden ti-modal">
                <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                    <div className="ti-modal-content">
                        <div className="ti-modal-header">
                            <h6 className="modal-title text-[1rem] !text-default dark:text-defaulttextcolor/80 font-semibold">Add Board</h6>
                            <SpkButton buttontype="button" customClass="hs-dropdown-toggle !text-[1rem] !font-semibold " Overlay="#add-board">
                                <span className="sr-only">Close</span>
                                <i className="ri-close-line"></i>
                            </SpkButton>
                        </div>
                        <div className="ti-modal-body px-6">
                            <div className="grid grid-cols-12 gy-2">
                                <div className="xl:col-span-12 col-span-12">
                                    <label htmlFor="task-name" className="form-label">Task Name</label>
                                    <input type="text" className="form-control w-full !rounded-md" id="task-name" placeholder="Task Name" />
                                </div>
                            </div>
                        </div>
                        <div className="ti-modal-footer">
                            <SpkButton buttontype="button" variant="light"
                                customClass="hs-dropdown-toggle ti-btn align-middle"
                                Overlay="#add-board">
                                Cancel
                            </SpkButton>
                            <SpkButton buttontype="button" customClass="ti-btn bg-primary text-white !font-medium">Add Task</SpkButton>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::add board modal --> */}

            {/* <!-- Start::add task modal --> */}
            <div id="add-task" className="hs-overlay hidden ti-modal">
                <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                    <div className="ti-modal-content">
                        <div className="ti-modal-header">
                            <h6 className="modal-title text-[1rem] font-semibold text-default dark:text-defaulttextcolor/80" id="mail-ComposeLabel">Add Task</h6>
                            <SpkButton buttontype="button" customClass="hs-dropdown-toggle !text-[1rem] !font-semibold " Overlay="#add-task">
                                <span className="sr-only">Close</span>
                                <i className="ri-close-line"></i>
                            </SpkButton>
                        </div>
                        <div className="ti-modal-body px-4 !overflow-visible">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="task-name" className="form-label">Task Name</label>
                                    <input type="text" className="form-control w-full !rounded-md" id="task-name2" placeholder="Task Name" />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="task-id" className="form-label">Task ID</label>
                                    <input type="text" className="form-control w-full !rounded-md" id="task-id" placeholder="Task ID" />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <label htmlFor="text-area" className="form-label">Task Description</label>
                                    <textarea className="form-control w-full !rounded-md" id="text-area" rows={2} placeholder="Write Description"></textarea>
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <label htmlFor="text-area" className="form-label">Task Images</label>
                                    <FilePond files={files} onupdatefiles={setFiles} allowMultiple={true} maxFiles={3} server="/api" name="files" labelIdle='Drag & Drop your file here or click ' />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <label className="form-label">Assigned To</label>
                                    <SpkSelect multi name="choices-multiple-remove-button1" id="choices-multiple-remove-button1" option={Option2} menuplacement='auto' classNameprefix="Select2" />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="form-label">Target Date</label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-text text-muted !rounded-e-none"> <i className="ri-calendar-line"></i> </div>
                                           <div className="flex-grow">
                                           <SpkDatepickr className="form-control flatpickr-input" Timeinput="Time:"
                                                dateFormat="yy/MM/dd h:mm aa"
                                                placeholderText='Choose date with time'
                                                showTimeInput selected={startDate} onChange={handleDateChange} />
                                           </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="form-label">Tags</label>
                                    <SpkSelect multi name="colors" option={Option3} mainClass="w-full !rounded-md" menuplacement='top' classNameprefix="Select2" />
                                </div>
                            </div>
                        </div>
                        <div className="ti-modal-footer">
                            <SpkButton buttontype="button" variant="light"
                                customClass="hs-dropdown-toggle ti-btn align-middle"
                                Overlay="#add-task">
                                Close
                            </SpkButton>
                            <SpkButton buttontype="button" customClass="ti-btn bg-primary text-white !font-medium">Create</SpkButton>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::add task modal --> */}
        </Fragment>
    );
};

export default KanbanBoard;