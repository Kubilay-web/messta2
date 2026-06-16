"use client"
import SpkprojectTimeline from "@/shared/@spk-reusable-components/apps/spk-projecttimeline";
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import { files, tasks, timelineData } from "@/shared/data/apps/task/taskdetailsdata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const TaskDetails = () => {

    return (
        <Fragment>
            {/* <!-- Page Header --> */}
            <Seo title="Task Details" />
            <Pageheader Heading="Task Details" breadcrumbs={['Apps', 'Tasks']} currentpage="Task Details" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-8 col-span-12">
                    <div className="box">
                        <div className="box-header justify-between">
                            <div className="box-title">Task Summary</div>
                            <div className="btn-list">
                                <button type="button" className="ti-btn ti-btn-success ti-btn-sm btn-wave !m-0 me-0"><i className="ri-edit-line me-1 align-middle"></i>Edit Task</button>
                            </div>
                        </div>
                        <div className="box-body">
                            <h5 className="font-medium mb-4 task-title">
                                Launch Marketing Campaign
                            </h5>
                            <div className="text-[0.9375rem] font-medium mb-2">Task Description :</div>
                            <p className="text-textmuted dark:text-textmuted/50 task-description">The current website design needs a refresh to improve user experience and enhance visual appeal. The goal is to create a modern and responsive design that aligns with the latest web design trends. The updated design should ensure seamless navigation, easy readability, and a cohesive visual identity.</p>
                            <div className="text-[0.9375rem] font-medium mb-2">Key tasks :</div>
                            <div>
                                <ul className="task-details-key-tasks mb-0 ps-[2rem]">
                                    <li>Conduct market research to identify target audience and competition.</li>
                                    <li>Develop a comprehensive marketing campaign strategy.</li>
                                    <li>Create engaging and relevant content for the campaign.</li>
                                    <li>Execute the marketing campaign.</li>
                                    <li>Monitor the campaign's performance and gather data for analysis.</li>
                                    <li>Make adjustments based on campaign performance analysis.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                <div>
                                    <span className="block text-textmuted dark:text-textmuted/50 text-[0.75rem]">Assigned By</span>
                                    <div className="flex items-center">
                                        <div className="me-2 leading-none">
                                            <span className="avatar avatar-xs avatar-rounded">
                                                <Image fill src="../../../assets/images/faces/15.jpg" alt="" />
                                            </span>
                                        </div>
                                        <span className="block text-[0.875rem] font-medium">J.J.Miller</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-textmuted dark:text-textmuted/50 text-[0.75rem]">Assigned Date</span>
                                    <span className="block text-[0.875rem] font-medium">24,Dec 2024</span>
                                </div>
                                <div>
                                    <span className="block text-textmuted dark:text-textmuted/50 text-[0.75rem]">Due Date</span>
                                    <span className="block text-[0.875rem] font-medium">05,Jan 2024</span>
                                </div>
                                <div className="task-details-progress">
                                    <span className="block text-textmuted dark:text-textmuted/50 text-[0.75rem] mb-1">Progress</span>
                                    <div className="flex items-center">
                                        <div className="progress progress-xs progress-animate flex-grow me-2" role="progressbar" aria-valuenow={70} aria-valuemin={0} aria-valuemax={100}>
                                            <div className="progress-bar bg-primary" style={{ width: '70%' }}></div>
                                        </div>
                                        <div className="text-textmuted dark:text-textmuted/50 text-[0.6875rem]">70%</div>
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-textmuted dark:text-textmuted/50 text-[0.75rem]">Efforts</span>
                                    <span className="block text-[0.875rem] font-medium">45H : 35M : 45S</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Task Discussions</div>
                        </div>
                        <div className="box-body">
                            <ul className="ti-list-unstyled profile-timeline">
                                {timelineData.map((item, index) => (
                                    <SpkprojectTimeline
                                        key={index}
                                        avatar={item.avatar}
                                        title={item.title}
                                        titleClass={item.titleClass}
                                        desClass={item.desClass}
                                        imgclass={item.imgclass}
                                        description={item.description}
                                        timestamp={item.timestamp}
                                        media={item.media || []}
                                        sharedWith={item.sharedWith || []}
                                        SpanContent={item.data}
                                        color={item.color}
                                    />
                                ))}
                            </ul>
                        </div>
                        <div className="box-footer">
                            <div className="sm:flex items-center leading-none">
                                <div className="sm:me-3 mb-2 sm:mb-0">
                                    <span className="avatar avatar-md avatar-rounded">
                                        <Image fill src="../../../assets/images/faces/9.jpg" alt="" />
                                    </span>
                                </div>
                                <div className="flex-grow me-sm-2">
                                    <div className="input-group inline-flex">
                                        <input type="text" className="form-control w-[50%] border !border-s shadow-none" placeholder="Post Anything" aria-label="Recipient's username with two button addons" />
                                        <SpkButton customClass="ti-btn ti-btn-outline-light btn-wave waves-effect waves-light !border-s-0 !m-0" buttontype="button"><i className="bi bi-emoji-smile"></i></SpkButton>
                                        <SpkButton customClass="ti-btn ti-btn-outline-light btn-wave waves-effect waves-light !border-s-0 !m-0" buttontype="button"><i className="bi bi-paperclip"></i></SpkButton>
                                        <SpkButton customClass="ti-btn ti-btn-outline-light btn-wave waves-effect waves-light !border-s-0 !border-e-0 !m-0" buttontype="button"><i className="bi bi-camera"></i></SpkButton>
                                        <SpkButton customClass="ti-btn ti-btn-primary btn-wave waves-effect waves-light !m-0" buttontype="button">Post</SpkButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-header">
                            <div className="box-title">
                                Additional Details
                            </div>
                        </div>
                        <div className="box-body !p-0">
                            <div className="table-responsive">
                                <Spktables tableClass="ti-custom-table ti-custom-table-head w-full" >
                                    <tr>
                                        <td><span className="font-medium">Task ID :</span></td>
                                        <td>SPK - 123</td>
                                    </tr>
                                    <tr>
                                        <td><span className="font-medium">Task Tags :</span></td>
                                        <td>
                                            <span className="badge bg-light border dark:border-defaultborder/10 text-default me-1">Web Design</span>
                                            <span className="badge bg-light border dark:border-defaultborder/10 text-default">Responsive Design</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span className="font-medium">Project Name :</span></td>
                                        <td>
                                            Evergreen Garden Redesign
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span className="font-medium">Project Status :</span></td>
                                        <td>
                                            <span className="font-medium text-secondary">Inprogress</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span className="font-medium">Project Priority :</span></td>
                                        <td>
                                            <span className="badge bg-danger/[0.15] text-danger">High</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span className="font-medium">Assigned To :</span></td>
                                        <td>
                                            <div className="avatar-list-stacked d-flex -space-x-3">
                                                <div className="hs-tooltip ti-main-tooltip custom-avatar-first">
                                                    <span className="hs-tooltip-toggle avatar avatar-sm avatar-rounded">
                                                        <Image fill src="../../../assets/images/faces/2.jpg" alt="img" />
                                                        <span
                                                            className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-primary !text-[0.65rem] !rounded-sm !font-medium !text-white shadow-sm "
                                                            role="tooltip">
                                                            Simon
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="hs-tooltip ti-main-tooltip">
                                                    <span className="hs-tooltip-toggle avatar avatar-sm avatar-rounded">
                                                        <Image fill src="../../../assets/images/faces/8.jpg" alt="img" />
                                                        <span
                                                            className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-primary !text-[0.65rem] !rounded-sm !font-medium !text-white shadow-sm "
                                                            role="tooltip">
                                                            Sasha
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="hs-tooltip ti-main-tooltip">
                                                    <span className="hs-tooltip-toggle avatar avatar-sm avatar-rounded">
                                                        <Image fill src="../../../assets/images/faces/5.jpg" alt="img" />
                                                        <span
                                                            className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-primary !text-[0.65rem] !rounded-sm !font-medium !text-white shadow-sm "
                                                            role="tooltip">
                                                            Anagha
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="hs-tooltip ti-main-tooltip">
                                                    <span className="hs-tooltip-toggle avatar avatar-sm avatar-rounded">
                                                        <Image fill src="../../../assets/images/faces/10.jpg" alt="img" />
                                                        <span
                                                            className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-primary !text-[0.65rem] !rounded-sm !font-medium !text-white shadow-sm "
                                                            role="tooltip">
                                                            Hishen
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </Spktables>
                            </div>
                        </div>
                    </div>
                    <div className="box overflow-hidden">
                        <div className="box-header justify-between">
                            <div className="box-title">Sub Tasks</div>
                            <div>
                                <button type="button" className="ti-btn ti-btn-soft-secondary ti-btn-sm btn-wave"><i className="ri-add-line me-1 align-middle"></i>Sub Task</button>
                            </div>
                        </div>
                        <div className="box-body">
                            <ul className="ti-list-group">
                                {tasks.map((task) => (
                                    <li key={task.id} className="ti-list-group-item">
                                        <div className="flex items-center">
                                            <div className="me-2">
                                                <input
                                                    className="form-check-input form-checked-success"
                                                    type="checkbox"
                                                    value=""
                                                    id={`successChecked${task.id}`}
                                                    defaultChecked={task.isChecked} />
                                            </div>
                                            <div className="font-medium">{task.text}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="box overflow-hidden">
                        <div className="box-header">
                            <div className="box-title">
                                Attachments
                            </div>
                        </div>
                        <div className="box-body !p-0">
                            <ul className="ti-list-group ti-list-group-flush">
                                {files.map((file, index) => (
                                    <li key={index} className="ti-list-group-item">
                                        <div className="flex items-center flex-wrap gap-2">
                                            <div className="leading-none">
                                                <span className={`avatar avatar-rounded ${file.imgcls} bg-light`}>
                                                    <Image fill src={file.image} alt={file.name} />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <Link scroll={false} href="#!">
                                                    <span className="block font-medium">{file.name}</span>
                                                </Link>
                                                <span className="block text-textmuted dark:text-textmuted/50 text-[0.75rem] font-normal">{file.size}</span>
                                            </div>
                                            <div className="btn-list">
                                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-info btn-wave" >
                                                    <i className="ri-edit-line"></i>
                                                </button>
                                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-danger btn-wave">
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default TaskDetails;