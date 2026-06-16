"use client"
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });

import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import SpkBadge from "@/shared/@spk-reusable-components/uielements/spk-badge";
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import SpkDropdown from "@/shared/@spk-reusable-components/uielements/spk-dropdown";
import { Projectselectdata, avatarImages, projects } from "@/shared/data/apps/projects/Projectlistdata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const ProjectsList = () => {

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Projects List" />
            <Pageheader Heading="Projects List" breadcrumbs={['Apps', 'Projects']} currentpage="Projects List" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-body !p-6">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex flex-wrap gap-1 newproject">
                                    <Link href={"/apps/projects/create-project/"} className="ti-btn  btn-wave ti-btn-primary me-2 !mb-0">
                                        <i className="ri-add-line me-1 font-semibold align-middle"></i>New Project
                                    </Link>
                                    <SpkSelect name="choices-single-default" option={Projectselectdata} mainClass="basic-multi-select" id="choices-single-default"
                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[Projectselectdata[0]]} />

                                </div>
                                <div className="avatar-list-stacked">
                                    {avatarImages.map((src, index) => (
                                        <span key={index} className="avatar avatar-sm avatar-rounded">
                                            <Image fill src={src} alt={`avatar-${index}`} />
                                        </span>
                                    ))}
                                    <Link scroll={false} className="avatar avatar-sm bg-primary avatar-rounded text-white" href="#!">
                                        +8
                                    </Link>
                                </div>
                                <div className="flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search Project" aria-label="Search" />
                                    <SpkButton variant="light" customClass="ti-btn  !m-0" buttontype="submit">Search</SpkButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-1 --> */}

            {/* <!-- Start::row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-body !p-0">
                            <div className="table-responsive">
                                <Spktables tableClass="ti-custom-table ti-custom-table-head w-full whitespace-nowrap" header={[{ title: 'Project Name' }, { title: 'Description' }, { title: 'Team' }, { title: 'Assigned Date' }, { title: 'Due Date' }, { title: 'Status' }, { title: 'Priority' }, { title: 'Actions' }]}>
                                    {projects.map(project => (
                                        <tr key={project.id}>
                                            <td>
                                                <div className="flex items-center">
                                                    <div className="me-2">
                                                        <span className={`avatar avatar-rounded p-1 ${project.LogoColor}/[0.15]`}>
                                                            <Image fill src={project.companyLogo} alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <Link href="#!" className="font-medium text-[0.875rem] block truncate project-list-title">
                                                            {project.projectTitle}
                                                        </Link>
                                                        <span className="text-textmuted dark:text-textmuted/50 block text-[0.75rem]">
                                                            Total <span className="font-medium text-default">{project.tasksCompleted}</span> tasks completed
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-textmuted dark:text-textmuted/50 mb-0 project-list-description">
                                                    {project.description}
                                                </p>
                                            </td>
                                            <td>
                                                <div className="avatar-list-stacked">
                                                    {project.teamMembers.map((member, index) => (
                                                        <span key={index} className="avatar avatar-sm avatar-rounded">
                                                            <Image fill src={member} alt="img" />
                                                        </span>
                                                    ))}
                                                    {project.length && (
                                                        <Link scroll={false} className="avatar avatar-sm bg-primary avatar-rounded text-white" href="#!">
                                                            +{project.length}
                                                        </Link>
                                                    )}
                                                </div>
                                            </td>
                                            <td>{project.startDate}</td>
                                            <td>{project.endDate}</td>
                                            <td>
                                                <div>
                                                    <div className="progress progress-xs progress-animate" role="progressbar" aria-valuenow={project.progress} aria-valuemin={0} aria-valuemax={100}>
                                                        <div className="progress-bar bg-primary" style={{ width: `${project.progress}%` }}></div>
                                                    </div>
                                                    <div className="mt-1">
                                                        <span className="text-primary font-medium">{project.progress}%</span> Completed
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <SpkBadge customClass={`badge ${project.priority === 'Low' ? 'bg-success/[0.15] text-success'
                                                    : project.priority === 'Medium' ? 'bg-info/[0.15] text-info'
                                                        : project.priority === 'High' ? 'bg-danger/[0.15] text-danger'
                                                            : ''}`}>{project.priority}
                                                </SpkBadge>
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
                </div>
            </div>
            {/* <!--End::row-2 --> */}
            <nav className="overflow-auto mb-4 float-end !bg-white dark:!bg-bodybg !rounded-md">
                <ul className="ti-pagination">
                    <li><Link scroll={false} className="page-link" href="#!"> Previous </Link></li>
                    <li><Link scroll={false} className="page-link" href="#!" aria-current="page">1</Link></li>
                    <li><Link scroll={false} className="page-link" href="#!">2</Link></li>
                    <li><Link scroll={false} className="page-link" href="#!">3</Link></li>
                    <li><Link scroll={false} className="page-link" href="#!"> Next </Link></li>
                </ul>
            </nav>
        </Fragment>
    );
};

export default ProjectsList;