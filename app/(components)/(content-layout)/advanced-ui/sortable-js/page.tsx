"use client"
import { Drag, Drag1, Drag10, Drag11, Drag2, Drag3, Drag4, Drag5, Drag6, Drag7, Drag8, Drag9 } from "@/shared/data/adavanec-ui/sortablejsdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment, useState } from "react";
import { ReactSortable } from "react-sortablejs";

interface SortableJsProps { }

const SortableJs: FC<SortableJsProps> = () => {
// Initialize all lists in one object
  const [lists, setLists] = useState({
    list: Drag,
    list1: Drag1,
    list2: Drag2,
    list3: Drag3,
    list4: Drag4,
    list5: Drag5,
    list6: Drag6,
    list7: Drag7,
    list8: Drag8,
    list9: Drag9,
    list10: Drag10,
    list11: Drag11
  });

  // Function to update a list by its key
  const updateList = (key:any, newList:any) => {
    setLists(prev => ({
      ...prev,
      [key]: newList
    }));
  };

    type ListItem = {
        id: number;
        text: string;
    };

    const [sortlist, setsortList] = React.useState<ListItem[]>([
        { id: 1, text: "Analyze market trends." },
        { id: 2, text: "Edit video content." },
        { id: 3, text: "Plan social media calendar." },
        { id: 4, text: "Update company policies." },
        { id: 5, text: "Compile sales reports." },
        { id: 6, text: "Schedule client calls." },
    ]);

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Sortable JS" />
            <Pageheader Heading="Sortable JS" breadcrumbs={['Advanced Ui']} currentpage="Sortable JS" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                SIMPLE LIST
                            </div>
                        </div>
                        <div className="box-body custom-sort">
                            <ol className="ti-list-group !p-0 !border-0 sortable-list list-group-numbered" id="simple-list">
                                <ReactSortable filter=".addImageButtonContainer" dragClass="sortableDrag" list={lists.list}   setList={newList => updateList('list', newList)} group="shared" animation={200} easing="ease-out">
                                    {lists.list.map(item => (
                                        <li className="ti-list-group-item" key={item.id}>{item.name}</li>
                                    ))}
                                </ReactSortable>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-8 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">SHARED LISTS</div>
                        </div>
                        <div className="box-body custom-sort">
                            <div className="grid grid-cols-12 sm:gap-x-6">
                                <div className="xl:col-span-6 col-span-12">
                                    <ol className="ti-list-group !p-0 !border-0 sortable-list list-group-numbered" id="shared-left">
                                        <ReactSortable filter=".addImageButtonContainer" dragClass="sortableDrag" list={lists.list1} group={'shared'} setList={newList => updateList('list1', newList)} animation={200} easing="ease-out">
                                            {lists.list1.map(item => (
                                                <li className="ti-list-group-item" key={item.id}>{item.name}</li>
                                            ))}
                                        </ReactSortable>
                                    </ol>
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <ol className="ti-list-group !p-0 !border-0 sortable-list list-group-numbered" id="shared-right">
                                        <ReactSortable filter=".addImageButtonContainer" dragClass="sortableDrag" list={lists.list2} group={'shared'} setList={newList => updateList('list2', newList)} animation={200} easing="ease-out">
                                            {lists.list2.map(item => (
                                                <li className="ti-list-group-item" key={item.id}>{item.name}</li>
                                            ))}
                                        </ReactSortable>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                CLONING
                            </div>
                        </div>
                        <div className="box-body custom-sort">
                            <div className="grid grid-cols-12 sm:gap-x-6">
                                <div className="xl:col-span-6 col-span-12">
                                    <ul className="ti-list-group !p-0 !border-0 sortable-list" id="cloning-left">
                                        <ReactSortable filter=".addImageButtonContainer" dragClass="sortableDrag" group={{ name: 'shared', pull: 'clone' }} list={lists.list8}  setList={newList => updateList('list8', newList)} direction={'horizontal'} animation={200} easing="ease-out">
                                            {lists.list8.map(item => (
                                                <li className="ti-list-group-item" key={item.id}>{item.name}</li>
                                            ))}
                                        </ReactSortable>
                                    </ul>
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <ul className="ti-list-group !p-0 !border-0 sortable-list" id="cloning-right">
                                        <ReactSortable filter=".addImageButtonContainer" dragClass="sortableDrag" group={{ name: 'shared', pull: 'clone' }} list={lists.list9}  setList={newList => updateList('list9', newList)} direction={'horizontal'} animation={150} swapThreshold={1} easing="ease-out">
                                            {lists.list9.map(item => (
                                                <li className="ti-list-group-item" key={item.id}>{item.name}</li>
                                            ))}
                                        </ReactSortable>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                DISABLING SORTING
                            </div>
                        </div>
                        <div className="box-body custom-sort">
                            <div className="grid grid-cols-12 sm:gap-x-6">
                                <div className="xl:col-span-6 col-span-12">
                                    <ul className="ti-list-group !p-0 !border-0 sortable-list" id="disabling-sorting-left">
                                        <ReactSortable filter=".addImageButtonContainer" dragClass="sortableDrag" list={lists.list10} group={{ name: 'shared', pull: 'clone', put: false }}  setList={newList => updateList('list10', newList)} animation={200} easing="ease-out">
                                            {lists.list10.map((item: any) => (
                                                <li className="ti-list-group-item" key={item.id}>{item.name}</li>
                                            ))}
                                        </ReactSortable>
                                    </ul>
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <ul className="ti-list-group !p-0 !border-0 sortable-list" id="disabling-sorting-right">
                                        <ReactSortable filter=".addImageButtonContainer" dragClass="sortableDrag" list={lists.list3}  setList={newList => updateList('list3', newList)} animation={200} easing="ease-out" group={'shared'}>
                                            {lists.list3.map(item => (
                                                <li className="ti-list-group-item" key={item.id}>{item.name}</li>
                                            ))}
                                        </ReactSortable>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                SORTING WITH HANDLE
                            </div>
                        </div>
                        <div className="box-body">
                            <ol className="ti-list-group !p-0 !border-0 sortable-list list-item-numbered" id="sorting-with-handle">
                                <ReactSortable list={sortlist} setList={setsortList} handle=".handle" animation={150} className="list-group sortable-list list-item-numbered" tag="ol">
                                    {sortlist.map((item) => (
                                        <li key={item.id} className="ti-list-group-item" data-id={item.id}>
                                            <i className="ri-drag-move-2-fill me-2 text-dark text-[1rem] handle leading-none"></i>
                                            {item.text}
                                        </li>
                                    ))}
                                </ReactSortable>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                SORTING WITH FILTER
                            </div>
                        </div>
                        <div className="box-body">
                            <ul className="ti-list-group !p-0 !border-0 sortable-list" id="sorting-with-filter">
                                <ReactSortable filter=".addImageButtonContainer" dragClass="sortableDrag" list={lists.list4}  setList={newList => updateList('list4', newList)} animation={200} easing="ease-out">
                                    {lists.list4.map(item => (
                                        <li className={`ti-list-group-item ${item.filter}`} key={item.id}>{item.name}</li>
                                    ))}
                                </ReactSortable>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}

            {/* <!-- Start:: row-4 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                SORTABLE GRID
                            </div>
                        </div>
                        <div className="box-body" id="sortable-grid">
                            <ReactSortable filter=".addImageButtonContainer" dragClass="sortableDrag" list={lists.list7}  setList={newList => updateList('list7', newList)} animation={200} easing="ease-out">
                                {lists.list7.map(item => (
                                    <div className="grid-square" key={item.id}>
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                ))}
                            </ReactSortable>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-4 --> */}

            {/* <!-- Start:: row-5 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                NESTED SORTABLE
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="nestedSortables" className="ti-list-group !p-0 !border-0 col nested-sortable">
                            <ReactSortable
                                    filter=".addImageButtonContainer"
                                    dragClass="sortableDrag"
                                    list={lists.list11}
                                    group={'nested'}
                                    fallbackOnBody={true}
                                    setList={newList => updateList('list11', newList)}
                                    animation={200}
                                    easing="ease-out"
                                >
                                    {lists.list11.map(item => (
                                        <div
                                            key={item.id}
                                            className={`ti-list-group-item rounded-tl-md rounded-tr-md ${item.children ? 'nested-1' : 'nested-2'}`}
                                            draggable={item.draggable === false ? 'false' : 'true'}
                                        >
                                            {item.name}
                                            {item.children && (
                                                <div className="list-group nested-sortable">
                                                    {item.children.map(child => (
                                                        <div
                                                            key={child.id}
                                                            className={`ti-list-group-item rounded-bl-md rounded-br-md ${child.children ? 'nested-2' : 'nested-2'} ${child.class} `}
                                                            draggable={child.draggable === false ? 'false' : 'true'}
                                                        >
                                                            {child.name}
                                                            {child.children && (
                                                                <div className="list-group nested-sortable">
                                                                    {child.children.map(grandchild => (
                                                                        <div
                                                                            key={grandchild.id}
                                                                            className="ti-list-group-item nested-3"
                                                                            draggable={grandchild.draggable === false ? 'false' : 'true'}
                                                                        >
                                                                            {grandchild.name}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </ReactSortable>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        MULTIPLE DRAG
                                    </div>
                                </div>
                                <div className="box-body">
                                    <ul className="ti-list-group !p-0 !border-0 sortable-list" id="multiple-drag">
                                        <ReactSortable filter=".addImageButtonContainer" selectedClass= "selected"   multiDrag={true} fallbackTolerance={3} dragClass="sortableDrag" list={lists.list5}  setList={newList => updateList('list5', newList)} animation={200} easing="ease-out">
                                            {lists.list5.map(item => (
                                                <li className="ti-list-group-item" key={item.id}>{item.name}.</li>
                                            ))}
                                        </ReactSortable>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        SWAP
                                    </div>
                                </div>
                                <div className="box-body">
                                    <ul className="ti-list-group !p-0 !border-0 sortable-list" id="sortable-swap">
                                        <ReactSortable multiDrag filter=".addImageButtonContainer" dragClass="sortableDrag" list={lists.list6} swap={true}  setList={newList => updateList('list6', newList)} animation={200} easing="ease-out">
                                            {lists.list6.map(item => (
                                                <li className="ti-list-group-item" key={item.id}>{item.name}</li>
                                            ))}
                                        </ReactSortable>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-5 --> */}
        </Fragment>
    );
};

export default SortableJs;