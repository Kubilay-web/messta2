"use client"
import SpkprojectTimeline from "@/shared/@spk-reusable-components/apps/spk-projecttimeline";
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import SpkBadge from "@/shared/@spk-reusable-components/uielements/spk-badge";
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import SpkDropdown from "@/shared/@spk-reusable-components/uielements/spk-dropdown";
import SpkOverlay from "@/shared/@spk-reusable-components/uielements/spk-overlay";
import { files, tasks, teamMembers, timelineData } from "@/shared/data/apps/projects/projectoverviewdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const ProjectsOverview = () => {

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Projects Overview" />
            <Pageheader Heading="Projects Overview" breadcrumbs={['Apps', 'Projects']} currentpage="Projects Overview" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-8 col-span-12">
                    <div className="box">
                        <div className="box-header justify-between">
                            <div className="box-title">
                                Project Details
                            </div>
                            <div>
                                <Link scroll={false} href="/apps/projects/create-project" className="ti-btn ti-btn-sm ti-btn-secondary btn-wave"><i className="ri-add-line align-middle me-1 font-medium"></i>Create Project</Link>
                            </div>
                        </div>
                        <div className="box-body">
                            <h5 className="font-medium mb-4 task-title">
                                Inventory Management System Enhancement
                            </h5>
                            <div className="text-[0.9375rem] font-medium mb-2">Project Description :</div>
                            <p className="text-textmuted dark:text-textmuted/50 task-description mb-4">The Inventory Management System Enhancement project aims to improve our existing system to streamline inventory processes and enhance overall operational efficiency. This project will involve critical updates and feature additions to optimize our inventory management.</p>
                            <div className="text-[0.9375rem] font-medium mb-2">Key tasks :</div>
                            <div className="mb-3">
                                <ul className="task-details-key-tasks mb-0 ps-[2rem]">
                                    <li>Assess the current inventory management system to identify pain points, limitations, and areas in need of improvement.</li>
                                    <li>Redesign the user interface for improved user experience, making it more intuitive and user-friendly.</li>
                                    <li>Optimize the database structure and performance for faster data retrieval and storage.</li>
                                    <li>Implement barcode scanning functionality to expedite product entry and tracking.</li>
                                    <li>Develop an automated reorder system that alerts staff when inventory levels reach predefined thresholds.</li>
                                    <li> Create reporting and analytics capabilities to provide insights into inventory turnover and forecasting.</li>
                                </ul>
                            </div>
                            <div className="text-[0.9375rem] font-medium mb-2">Skills :</div>
                            <div>
                                <SpkBadge variant="light" customClass="ext-default border border-defaultborder dark:border-defaultborder/10 me-1">Teamwork</SpkBadge>
                                <SpkBadge variant="light" customClass="ext-default border border-defaultborder dark:border-defaultborder/10 me-1">Graphic Design</SpkBadge>
                                <SpkBadge variant="light" customClass="ext-default border border-defaultborder dark:border-defaultborder/10 me-1">Responsive Design</SpkBadge>
                                <SpkBadge variant="light" customClass="ext-default border border-defaultborder dark:border-defaultborder/10 me-1">Web Accessibility</SpkBadge>
                                <SpkBadge variant="light" customClass="ext-default border border-defaultborder dark:border-defaultborder/10 me-1">Front-End Build Tools</SpkBadge>
                                <SpkBadge variant="light" customClass="ext-default border border-defaultborder dark:border-defaultborder/10 me-1">RESTful APIs</SpkBadge>
                                <SpkBadge variant="light" customClass="ext-default border border-defaultborder dark:border-defaultborder/10 me-1">Performance Testing</SpkBadge>
                                <SpkBadge variant="light" customClass="ext-default border border-defaultborder dark:border-defaultborder/10 me-1">API Development</SpkBadge>
                                <SpkBadge variant="light" customClass="ext-default border border-defaultborder dark:border-defaultborder/10">Vue.js</SpkBadge>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                <div>
                                    <span className="block text-textmuted dark:text-textmuted/50 text-[0.75rem]">Project Manager</span>
                                    <div className="flex items-center">
                                        <div className="me-2 leading-none">
                                            <span className="avatar avatar-xs avatar-rounded">
                                                <Image fill src="../../../assets/images/faces/13.jpg" alt="" />
                                            </span>
                                        </div>
                                        <span className="block text-[0.875rem] font-medium">S.K.Jacob</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-textmuted dark:text-textmuted/50 text-[0.75rem]">Start Date</span>
                                    <span className="block text-[0.875rem] font-medium">22,Dec 2024</span>
                                </div>
                                <div>
                                    <span className="block text-textmuted dark:text-textmuted/50 text-[0.75rem]">End Date</span>
                                    <span className="block text-[0.875rem] font-medium">10,Feb 2024</span>
                                </div>
                                <div>
                                    <span className="block text-textmuted dark:text-textmuted/50 text-[0.75rem]">Assigned To</span>
                                    <div className="avatar-list-stacked d-flex -space-x-3 rtl:space-x-reverse">
                                        <SpkOverlay>
                                            <span className="hs-tooltip-toggle avatar avatar-sm avatar-rounded">
                                                <Image fill src="../../../assets/images/faces/2.jpg" alt="img" />
                                                <span
                                                    className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-primary !text-[0.65rem] !rounded-sm !font-medium !text-white shadow-sm "
                                                    role="tooltip">
                                                    Simon
                                                </span>
                                            </span>
                                        </SpkOverlay>
                                        <SpkOverlay>
                                            <span className="hs-tooltip-toggle avatar avatar-sm avatar-rounded">
                                                <Image fill src="../../../assets/images/faces/8.jpg" alt="img" />
                                                <span
                                                    className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-primary !text-[0.65rem] !rounded-sm !font-medium !text-white shadow-sm "
                                                    role="tooltip">
                                                    Sasha
                                                </span>
                                            </span>
                                        </SpkOverlay>
                                        <SpkOverlay>
                                            <span className="hs-tooltip-toggle avatar avatar-sm avatar-rounded">
                                                <Image fill src="../../../assets/images/faces/5.jpg" alt="img" />
                                                <span
                                                    className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-primary !text-[0.65rem] !rounded-sm !font-medium !text-white shadow-sm "
                                                    role="tooltip">
                                                    Anagha
                                                </span>
                                            </span>
                                        </SpkOverlay>
                                        <SpkOverlay>
                                            <span className="hs-tooltip-toggle avatar avatar-sm avatar-rounded">
                                                <Image fill src="../../../assets/images/faces/10.jpg" alt="img" />
                                                <span
                                                    className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-primary !text-[0.65rem] !rounded-sm !font-medium !text-white shadow-sm "
                                                    role="tooltip">
                                                    Hishen
                                                </span>
                                            </span>
                                        </SpkOverlay>
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-textmuted dark:text-textmuted/50 text-[0.75rem]">Status</span>
                                    <span className="block"><SpkBadge customClass="bg-primary/[0.15] text-primary" >In Progress</SpkBadge></span>
                                </div>
                                <div>
                                    <span className="block text-textmuted dark:text-textmuted/50 text-[0.75rem]">Priority</span>
                                    <span className="block text-[0.875rem] font-medium"><SpkBadge customClass="bg-success/[0.15] text-success" >Low</SpkBadge></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Project Discussions</div>
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
                                <div className="sm:me-4 mb-2 sm:mb-0 relative">
                                    <Image fill src="../../../assets/images/faces/9.jpg" alt="" className="avatar avatar-md avatar-rounded" />
                                </div>
                                <div className="flex-grow sm:me-2">
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
                    <div className="box">
                        <div className="box-header justify-between">
                            <div className="box-title">
                                Project Team
                            </div>
                            <div>
                                <SpkButton variant="light" Size="sm" customClass="ti-btn" buttontype="button"><i className="ri-add-line align-middle me-1 font-medium"></i>Add Member</SpkButton>
                            </div>
                        </div>
                        <div className="box-body !p-0">
                            <div className="table-responsive">
                                <Spktables tableClass="ti-custom-table ti-custom-table-head w-full" header={[{ title: 'Name' }, { title: 'Designation' }, { title: 'Actions' },]}>
                                    {teamMembers.map((member, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="flex items-center">
                                                    <div className="me-2 leading-none">
                                                        <span className="avatar avatar-xs avatar-rounded">
                                                            <Image fill src={member.avatar} alt={member.name} />
                                                        </span>
                                                    </div>
                                                    <div className="font-medium text-[0.8125rem]">{member.name}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <SpkBadge customClass={` ${member.badgeClass}`}>{member.role}</SpkBadge>
                                            </td>
                                            <td>
                                                <SpkDropdown Linktag={true} Linkclass="ti-btn ti-btn-icon ti-btn-sm bg-light" Icon={true} IconClass="fe fe-more-vertical">
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!"><i className="ri-eye-line align-middle me-1 inline-block"></i>View</Link></li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!"><i className="ri-edit-line align-middle me-1 inline-block"></i>Edit</Link></li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!"><i className="ri-delete-bin-line me-1 align-middle inline-block"></i>Delete</Link></li>
                                                </SpkDropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </Spktables>
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box-header justify-between">
                            <div className="box-title">Project Goals</div>
                            <div className="ti-btn ti-btn-sm ti-btn-light btn-wave"><i className="ri-add-line align-middle me-1 font-medium"></i>Add Goal</div>
                        </div>
                        <div className="box-body">
                            <ul className="ti-list-group">
                                {tasks.map((task, index) => (
                                    <li className="ti-list-group-item" key={index}>
                                        <div className="flex items-center">
                                            <div className="me-2">
                                                <input
                                                    className="form-check-input form-checked-success"
                                                    type="checkbox"
                                                    id={`successChecked${index + 1}`}
                                                    defaultChecked={task.checked}
                                                />
                                            </div>
                                            <div className="font-medium">{task.label}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 text-center">
                                <SpkButton variant="success" customClass="ti-btn" buttontype="button">View All</SpkButton>
                            </div>
                        </div>
                    </div>
                    <div className="box overflow-hidden">
                        <div className="box-header">
                            <div className="box-title">
                                Project Documents
                            </div>
                        </div>
                        <div className="box-body !p-0">
                            <ul className="ti-list-group ti-list-group-flush">
                                {files.map((file, index) => (
                                    <li className="ti-list-group-item" key={index}>
                                        <div className="flex items-center flex-wrap gap-2">
                                            <div className="leading-none">
                                                <span className={`avatar avatar-rounded ${file.imgcls}   bg-light`}>
                                                    <Image fill src={file.imageSrc} alt={file.name} />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <Link scroll={false} href="#!">
                                                    <span className="block font-medium">{file.name}</span>
                                                </Link>
                                                <span className="block text-textmuted dark:text-textmuted/50 text-[0.75rem] font-normal">
                                                    {file.size}
                                                </span>
                                            </div>
                                            <div className="btn-list">
                                                <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-info btn-wave">
                                                    <i className="ri-edit-line"></i>
                                                </button>
                                                <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-danger btn-wave">
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

export default ProjectsOverview;