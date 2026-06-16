"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import SpkDatepickr from "@/shared/@spk-reusable-components/spk-packages/datepicker-component";
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import { Listviewassigneddata, Prioritydata, Statusdata, TaskStatusOptions, TaskStatusSeries, TotalTasks, taskData } from "@/shared/data/apps/task/list-view-data";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import CountUp from "react-countup";

const ListView = () => {

    const [dates, setDates] = useState<any>({});
    const handleDateChange = (key: string, date: Date | null) => {
        if (date) {
            setDates((prevDates: any) => ({
                ...prevDates,
                [key]: date,
            }));
        } else {
            setDates((prevDates: { [x: string]: any; }) => {
                const { [key]: removedKey, ...rest } = prevDates;
                return rest;
            });
        }
    };
    const [manageTaskData, setManageTaskData] = useState([...TotalTasks]);

    const handleDelete = (idToRemove: number) => {
        const updatedTaskData = manageTaskData.filter((item: any) => item.id !== idToRemove);
        setManageTaskData(updatedTaskData);
    };

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Task List View" />
            <Pageheader Heading="Task List View" breadcrumbs={['Apps', 'Tasks']} currentpage="Task List View" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-6 col-span-12">
                            <div className="grid grid-cols-12 gap-x-6">
                                {taskData.map((task) => (
                                    <div className="xxl:col-span-6 col-span-12" key={task.id}>
                                        <div className="box">
                                            <div className="box-body !p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className={`svg-icon-background ${task.color}/[0.15] mb-3 svg-primary mx-auto`}>
                                                        {task.icon}
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h6 className="mb-2 text-[0.75rem]">{task.title} Tasks</h6>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <h4 className="font-medium mb-0">
                                                                    {/*<span className="count-up" data-count={task.count}>
                                                                        {task.count}
                                                                    </span>*/}
                                                                    <CountUp className="count-up" end={task.count} />
                                                                    {task.count === 33 ? "k" : ""}
                                                                </h4>
                                                                <span className={`badge ${task.color} text-white`}>
                                                                    {task.badge}
                                                                </span>
                                                            </div>
                                                            <p className="text-textmuted dark:text-textmuted/50 text-[0.6875rem] mb-0 leading-none">
                                                                <span className={`me-1 inline-block font-medium ${task.trend.direction === 'up' ? 'text-success' : 'text-danger'}`}>
                                                                    <i className={`ri-arrow-${task.trend.direction}-s-line me-1 align-middle`}></i>
                                                                    {task.trend.value}
                                                                </span>
                                                                <span> this month</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="xl:col-span-6 col-span-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Tasks Statistics
                                    </div>
                                </div>
                                <div className="box-body !px-0 !pb-0">
                                    <div id="task-list-stats">
                                        <Spkapexcharts chartOptions={TaskStatusOptions} chartSeries={TaskStatusSeries} type="bar" width={"100%"} height={193} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header justify-between">
                            <div className="box-title">
                                Total Tasks
                            </div>
                            <div className="flex">
                                <Link scroll={false} href="#!" className="hs-dropdown-toggle  ti-btn ti-btn-primary ti-btn-sm !m-0" data-hs-overlay="#create-task"><i
                                    className="ri-add-line font-semibold align-middle"></i> Create Task
                                </Link>
                                <div id="create-task" className="hs-overlay hidden ti-modal">
                                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                                        <div className="ti-modal-content">
                                            <div className="ti-modal-header">
                                                <h6 className="modal-title" id="staticBackdropLabel2">Add Task </h6>
                                                <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#create-task">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3.5 h-3.5"
                                                        width="8" height="8" viewBox="0 0 8 8" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="ti-modal-body">
                                                <div className="grid grid-cols-12 gap-x-6 gap-y-2">
                                                    <div className="xl:col-span-6 col-span-12"> <label htmlFor="task-name"
                                                        className="ti-form-label">Task Name</label>
                                                        <input type="text" className="form-control" id="task-name" placeholder="Task Name" />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="task-id" className="ti-form-label">Task ID</label>
                                                        <input type="text" className="form-control" id="task-id" placeholder="Task ID" />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12"> <label
                                                        className="ti-form-label">Assigned Date</label>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <div className="input-group-text text-muted"> <i className="ri-calendar-line"></i> </div>
                                                                <SpkDatepickr className="form-control flatpickr-input" selected={dates["timeDate"] ? new Date(dates["timeDate"]) : null} onChange={(date) => handleDateChange("timeDate", date)} Timeinput="Time:" dateFormat="yy/MM/dd h:mm aa" placeholderText='Choose date with time' showTimeInput />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12"> <label
                                                        className="ti-form-label">Due Date</label>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <div className="input-group-text text-muted"> <i className="ri-calendar-line"></i> </div>
                                                                <SpkDatepickr className="form-control flatpickr-input" selected={dates["timeDate1"] ? new Date(dates["timeDate1"]) : null} onChange={(date) => handleDateChange("timeDate1", date)} Timeinput="Time:" dateFormat="yy/MM/dd h:mm aa" placeholderText='Choose date with time' showTimeInput />

                                                             
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Status</label>
                                                        <SpkSelect name="state" option={Statusdata} mainClass="js-example-placeholder-multiple w-full js-states"
                                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[Statusdata[0]]}
                                                        />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Priority</label>
                                                        <SpkSelect name="state" option={Prioritydata} mainClass="js-example-placeholder-multiple w-full js-states"
                                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[Prioritydata[0]]}
                                                        />
                                                    </div>
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label className="ti-form-label">Assigned To</label>
                                                        <SpkSelect multi name="state" option={Listviewassigneddata} mainClass="js-example-placeholder-multiple w-full js-states"
                                                            menuplacement='auto' classNameprefix="Select2" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ti-modal-footer">
                                                <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-light" data-hs-overlay="#create-task"> Cancel </button>
                                                <Link scroll={false} className="ti-btn ti-btn-primary" href="#!">Add Task </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- End::add task modal --> */}
                                <div className="ti-dropdown hs-dropdown ms-2">
                                    <button className="ti-btn ti-btn-icon ti-btn-soft-secondary ti-btn-sm btn-wave waves-light !m-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ti ti-dots-vertical"></i>
                                    </button>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">New Tasks</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Pending Tasks</Link> </li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Completed Tasks</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Inprogress Tasks</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="box-body !p-0">
                            <div className="table-responsive">
                                <Spktables showCheckbox={true} tableClass="ti-custom-table ti-custom-table-head w-full" header={[{ title: 'Task' }, { title: 'Task ID' },
                                { title: 'Assigned Date' }, { title: 'Status' }, { title: 'Due Date' }, { title: 'Priority' }, { title: 'Assigned To' }, { title: 'Actions' }
                                ]}>
                                    {manageTaskData.map((idx) => (
                                        <tr className="task-list" key={idx.id}>
                                            <td className="task-checkbox"><input className="form-check-input"
                                                type="checkbox" value="" aria-label="..." defaultChecked={idx.checked} /></td>
                                            <td>
                                                <span className="font-medium">{idx.name}</span>
                                            </td>
                                            <td>
                                                <span className="font-medium">{idx.spk}</span>
                                            </td>
                                            <td>{idx.startDate} </td>
                                            <td>
                                                <span className={`font-medium text-${idx.statuscolor}`}>{idx.status}</span>
                                            </td>
                                            <td>{idx.endDate}</td>
                                            <td>
                                                <span className={`badge bg-${idx.bdgpriority}/[0.15] text-${idx.bdgpriority}`}>{idx.priority}</span>
                                            </td>
                                            <td>
                                                <div className="avatar-list-stacked">
                                                    {idx.assignees.map((img,index) => (
                                                        <span className="avatar avatar-sm avatar-rounded" key={index}>
                                                            <Image fill src={img} alt="img" />
                                                        </span>
                                                    ))}
                                                    {idx.assignees.length > 2 && (
                                                        <Link scroll={false} className="avatar avatar-sm bg-primary avatar-rounded text-white" href="#!">
                                                            +{idx.assignees.length - 2}
                                                        </Link>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="hs-tooltip ti-main-tooltip">
                                                    <button type="button" className="hs-tooltip-toggle ti-btn ti-btn-soft-primary ti-btn-icon ti-btn-sm !m-0 !me-1">
                                                        <i className="ri-edit-line"></i>
                                                        <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.65rem] !rounded-sm !font-medium !text-white shadow-sm " role="tooltip">
                                                            Edit
                                                        </span>
                                                    </button>
                                                </div>
                                                <button className="ti-btn ti-btn-soft-danger ti-btn-icon ms-1 ti-btn-sm task-delete-btn !m-0" onClick={() => handleDelete(idx.id)}><i className="ri-delete-bin-5-line"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </Spktables>
                            </div>
                        </div>
                        <div className="box-footer">
                            <nav aria-label="Page navigation">
                                <nav aria-label="Page navigation" className="pagination-style-4 float-end">
                                    <ul className="ti-pagination mb-0">
                                        <li className="page-item"> <Link scroll={false} className="page-link disabled" href="#!"> Prev </Link> </li>
                                        <li className="page-item"><Link scroll={false} className="page-link active" href="#!">1</Link></li>
                                        <li className="page-item"><Link scroll={false} className="page-link" href="#!">2</Link> </li>
                                        <li className="page-item"><Link scroll={false} className="page-link" href="#!">3</Link></li>
                                        <li className="page-item"><Link scroll={false} className="page-link" href="#!">4</Link></li>
                                        <li className="page-item"> <Link scroll={false} className="page-link text-primary" href="#!"> next </Link> </li>
                                    </ul>
                                </nav>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}

        </Fragment>
    );
};

export default ListView;