import Link from "next/link";
import SpkDropdown from "../uielements/spk-dropdown";
import SpkBadge from "../uielements/spk-badge";

import Image from "next/image";

interface SpkKanbanboardProps {
    cardClass?: string;

    obj: {
        id: string;
        createdDate: string;
        timeLeft: string;
        labels: string[]; // assuming labels are just strings
        title: string;
        description: string;
        likes: number;
        comments: number;
        mainbadge: string;
        avatars: string[];
        imageUrl?: string; // optional imageUrl property
    };
}

const SpkKanbanboard: React.FC<SpkKanbanboardProps> = ({ cardClass, obj }) => {
    return (
        <div className={`box kanban-tasks ${cardClass}`} key={obj.id}>
            <div className="box-body !p-0">
                <div className={`p-4 kanban-board-head `}>
                    <div className="flex text-[#8c9097] dark:text-white/50 justify-between mb-1 text-[.75rem] font-medium">
                        <div className="inline-flex">
                            <i className="ri-time-line me-1 align-middle"></i>Created - {obj.createdDate}
                        </div>
                        <div>{obj.timeLeft}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="task-badges">
                            <span className="badge !text-dark !border border-defaultborder dark:border-defaultborder/10">#SPK - {obj.id}</span>
                            {obj.labels.map(({ label, bdgclass }: any, index) => (
                                <span key={index} className={`badge ${bdgclass}`}>
                                    {label}
                                </span>
                            ))}
                        </div>
                        <div className="hs-dropdown ti-dropdown ltr:[--placement:bottom-right] rtl:[--placement:bottom-left]">
                            <Link scroll={false}
                                aria-label="anchor"
                                href="#!"
                                className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"
                                aria-expanded="false"
                            >
                                <i className="fe fe-more-vertical"></i>
                            </Link>
                            <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                <li><Link scroll={false} className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium !inline-flex" href="#!"><i className="ri-eye-line me-1 align-middle"></i>View</Link></li>
                                <li><Link scroll={false} className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium !inline-flex" href="#!"><i className="ri-delete-bin-line me-1 align-middle"></i>Delete</Link></li>
                                <li><Link scroll={false} className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium !inline-flex" href="#!"><i className="ri-edit-line me-1 align-middle"></i>Edit</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="kanban-content !mt-1">
                        {obj.imageUrl && (
                            <div className="task-image mt-2">
                                <Image fill src={obj.imageUrl} className="img-fluid rounded kanban-image" alt="Task Image" />
                            </div>
                        )}

                        <h6 className={` ${obj.imageUrl ? 'font-semibold mb-0 mt-2 text-[1rem]' : 'font-medium mb-1 text-[.9375rem]'}`}>
                            {obj.title}
                        </h6>

                        <div className="kanban-task-description">{obj.description}</div>
                    </div>
                </div>
                <div className="p-4 border-t dark:border-defaultborder/10 border-dashed">
                    <div className="flex items-center justify-between">
                        <div className="inline-flex items-center">
                            <Link scroll={false} href="#!" className="inline-flex items-center me-2 text-primary">
                                <span className="me-1"><i className="ri-thumb-up-fill align-middle font-normal"></i></span>
                                <span className="font-semibold text-[.75rem]">{obj.likes}</span>
                            </Link>
                            <Link scroll={false} href="#!" className="inline-flex items-center text-[#8c9097] dark:text-white/50">
                                <span className="me-1"><i className="ri-message-2-line align-middle font-normal"></i></span>
                                <span className="font-semibold text-[.75rem]">{obj.comments}</span>
                            </Link>
                        </div>
                        <div className="avatar-list-stacked">
                            {obj.avatars.map((avatar, index) => (
                                <span key={index} className="avatar avatar-sm avatar-rounded">
                                    <Image fill src={avatar} alt="avatar" />
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpkKanbanboard;
