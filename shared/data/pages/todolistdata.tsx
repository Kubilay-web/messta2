import PrelineScript from "@/app/PrelineScript";
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import Link from "next/link";
import { Fragment, useState } from "react";
import { ReactSortable } from "react-sortablejs";

export const Data = [
    {
        id: 1,
        checked: false,
        title: 'Complete Project Proposal',
        status: 'In Progress',
        dueDate: '2024-03-10',
        priority: 'Medium',
        progress: 40,
        badgeColor: 'secondary',
        statusColor: 'primary',
        progressColor: "primary",
    },
    {
        id: 2,
        checked: true,
        title: 'Client Meeting',
        status: 'Not Started',
        dueDate: '2024-03-15',
        priority: 'High',
        progress: 70,
        badgeColor: 'danger',
        statusColor: 'success',
        progressColor: "secondary",
    },
    {
        id: 3,
        checked: false,
        title: 'Research Market Trends',
        status: 'Completed',
        dueDate: '2024-03-12',
        priority: 'Low',
        progress: 62,
        badgeColor: 'success',
        statusColor: 'warning',
        progressColor: "success",
    },
    {
        id: 4,
        checked: true,
        title: 'Update Website Content',
        status: 'Not Started',
        dueDate: '2024-03-18',
        priority: 'Medium',
        progress: 85,
        badgeColor: 'secondary',
        statusColor: 'success',
        progressColor: "info",
    },
    {
        id: 5,
        checked: true,
        title: 'Team Meeting',
        status: 'Pending',
        dueDate: '2024-03-22',
        priority: 'High',
        progress: 55,
        badgeColor: 'danger',
        statusColor: 'secondary',
        progressColor: "warning",
    },
    {
        id: 6,
        checked: false,
        title: 'Prepare Monthly Report',
        status: 'Not Started',
        dueDate: '2024-03-28',
        priority: 'Low',
        progress: 96,
        badgeColor: 'success',
        statusColor: 'success',
        progressColor: "danger",
    },
    {
        id: 7,
        checked: false,
        title: 'Review Project Milestones',
        status: 'In Progress',
        dueDate: '2024-03-14',
        priority: 'High',
        progress: 78,
        badgeColor: 'danger',
        statusColor: 'success',
        progressColor: "tealmain",
    },
    {
        id: 8,
        checked: true,
        title: 'Customer Feedback Analysis',
        status: 'Not Started',
        dueDate: '2024-03-20',
        priority: 'Medium',
        progress: 71,
        badgeColor: 'secondary',
        statusColor: 'success',
        progressColor: "pinkmain",
    },
    {
        id: 9,
        checked: false,
        title: 'Training Session',
        status: 'Not Started',
        dueDate: '2024-03-24',
        priority: 'Low',
        progress: 60,
        badgeColor: 'success',
        statusColor: 'success',
        progressColor: "dark",
    },
    {
        id: 10,
        checked: false,
        title: 'Finalize Budget',
        status: 'Not Started',
        dueDate: '2024-03-25',
        priority: 'Low',
        progress: 80,
        badgeColor: 'success',
        statusColor: 'success',
        progressColor: "orangemain",
    },
]

const Todolistdata = () => {
    const [sortList, setSortList] = useState(Data);
    const [selectAll, setSelectAll] = useState(false);
    ////

    const handleSelectAll = (e:any) => {
        setSelectAll(e.target.checked);
        setSortList((prevList) =>
            prevList.map((item) => ({
                ...item,
                check: e.target.checked,
            }))
        );
    };

    const handleCheckboxToggle = (id:any) => {
        setSortList((prevList) =>
            prevList.map((item:any) =>
                item.id === id ? { ...item, check: !item.check } : item
            )
        );
    };
    return (
        <Fragment>
            <PrelineScript/>
            <div>
                <div className="table-responsive">
                <Spktables tableClass="ti-custom-table text-nowrap" tableRowclass="border-b !border-defaultborder dark:!border-defaultborder/10" checked={selectAll} onChange={handleSelectAll} showCheckbox={true} Bodytag={false} header={[
                                            { title: '', headerClassname: 'todolist-handle-drag' },
                                            { title: 'Task Title' },
                                            { title: 'Status' },
                                            { title: 'Dead Line' },
                                            { title: 'Priority' },
                                            { title: 'Progress', headerClassname: 'todolist-progress' },
                                            { title: 'Action', headerClassname: 'text-end' }
                                        ]}>
                        <ReactSortable
                                                list={sortList}
                                                setList={setSortList}
                                                handle=".todo-handle"
                                                animation={150}
                                                tag="tbody"
                                                id="todo-drag"
                                            >
                            {Data.map((idx) => (
                                <tr className="todo-box" key={idx.id}>
                                    <td className="task-checkbox"><input className="form-check-input" type="checkbox" value="" aria-label="..." onChange={() => handleCheckboxToggle(idx.id)} defaultChecked={idx.checked} /></td>
                                    <td>
                                        <button className="ti-btn ti-btn-icon ti-btn-sm btn-wave ti-btn-light todo-handle">: :</button>
                                    </td>
                                    <td>
                                        <span className="font-medium">{idx.title}</span>
                                    </td>
                                    <td>
                                        <span className={`font-medium text-${idx.statusColor}`}><i className="ri-circle-line font-semibold text-[0.4375rem] me-2 leading-none align-middle"></i>{idx.status}</span>
                                    </td>
                                    <td>{idx.dueDate}</td>
                                    <td>
                                        <span className={`badge bg-${idx.badgeColor} text-white`}>{idx.priority}</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="progress progress-animate progress-xs w-100" role="progressbar" aria-valuenow={idx.progress} aria-valuemin={0} aria-valuemax={100}>
                                                <div className={`progress-bar progress-bar-striped progress-bar-animated !bg-${idx.progressColor}`} style={{ width: `${idx.progress}%` }}></div>
                                            </div>
                                            <div className="ms-2">{idx.progress}%</div>
                                        </div>
                                    </td>
                                    <td className="text-end">
                                        
                                        <div className="ti-dropdown hs-dropdown">
                                            <Link scroll={false} aria-label="anchor" className="ti-btn ti-btn-light ti-btn-icon ti-btn-sm btn-wave" href="#!" data-bs-toggle="dropdown">
                                                <i className="ri-more-2-fill text-textmuted dark:text-textmuted/50"></i>
                                            </Link>
                                            <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!"><i className="ri-edit-line me-2"></i>Edit</Link></li>
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!"><i className="ri-delete-bin-5-line me-2"></i>Delete</Link></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </ReactSortable>
                        </Spktables>

                </div>
            </div>
        </Fragment>
    )
}

export default Todolistdata


    //Assigned Selectdata
    export  const Assigneddata = [
        { value: 'Angelina May', label: 'Angelina May' },
        { value: 'Kiara advain', label: 'Kiara advain' },
        { value: 'Hercules Jhon', label: 'Hercules Jhon' },
        { value: 'Mayor Kim', label: 'Mayor Kim' },
    ]
    //Status data
    export  const Statusdata = [
        { value: 'Select', label: 'Select' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Not Started', label: 'Not Started' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Pending', label: 'Pending' },
    ]
    //Priority data
    export const Prioritydata = [
        { value: 'Select', label: 'Select' },
        { value: 'Critical', label: 'Critical' },
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' },
    ]