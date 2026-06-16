"use client"
import React, { FC, Fragment, useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import SimpleBar from "simplebar-react";
import listPlugin from "@fullcalendar/list";
import Seo from "@/shared/layouts-components/seo/seo";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Swal from 'sweetalert2';
import Image from "next/image";

interface FullCalendarProps { }

const FullCalender: FC<FullCalendarProps> = () => {

  let eventGuid = 0;
  const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
  const INITIAL_EVENTS = [
    {
      id: createEventId(),
      title: "Meeting",
      start: todayStr,
    },
    {
      id: createEventId(),
      title: "Meeting Time",
      start: todayStr + "T16:00:00",
    },
  ];

  function createEventId() {
    return String(eventGuid++);
  }

  const initialstate1 = {
    calendarEvents: [
      {
        title: "Atlanta Monster",
        start: new Date("2019-04-04 00:00"),
        id: "1001",
      },
      {
        title: "My Favorite Murder",
        start: new Date("2019-04-05 00:00"),
        id: "1002",
      },
    ],

    events: [
      {
        title: "Calendar Events",
        id: "1",
        bg: "primary",
      },
      {
        title: "Birthday Events",
        id: "2",
        bg: "secondary",
      },
      {
        title: "Holiday Calendar",
        id: "3",
        bg: "success",
      },
      {
        title: "Office Events",
        id: "4",
        bg: "info",
        border: "border-info-transparent"
      },
      {
        title: "Other Events",
        id: "5",
        bg: "warning",
      },
      {
        title: "Festival Events",
        id: "6",
        bg: "danger",
      },
      {
        title: "Timeline Events",
        id: "7",
        bg: "tealmain",
      },
    ],
  };
  const [state] = useState(initialstate1);

  useEffect(() => {
    const draggableEl: any = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        const title = eventEl.getAttribute("title");
        const id = eventEl.getAttribute("data");
        const classValue = eventEl.getAttribute("class");
        return {
          title: title,
          id: id,
          className: classValue,
        };
      },
    });
  }, []);

  function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  const handleEventClick = (clickInfo: any) => {
    Swal.fire({
      title: `Are you sure you want to delete the event '${clickInfo.event.title}'?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result: any) => {
      if (result.isConfirmed) {
        clickInfo.event.remove();
        Swal.fire('Deleted!', 'Your event has been deleted.', 'success');
      }
    });
  };

  const handleEvents = () => { };

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  return (
    <Fragment>
      <div className="container-fluid">
        {/* <!-- Page Header --> */}
        <Seo title="Full Calendar" />
        <Pageheader Heading="Full Calendar" breadcrumbs={['Apps']} currentpage="Full Calendar" />
        {/* <!-- Page Header Close --> */}

        {/* <!-- Start::row-1 --> */}
        <div className="grid grid-cols-12 gap-x-6">
          <div className="xl:col-span-9 col-span-12">
            <div className="box">
              <div className="box-header justify-between">
                <div className="box-title">All Events</div>
                <button className="ti-btn ti-btn-primary btn-wave"><i className="ri-add-line align-middle me-1 font-medium d-inline-block"></i>Create New Event</button>
              </div>
              <div className="box-body !p-0">
                <div id="external-events" className="border-bottom p-4 flex items-center flex-wrap gap-3">
                  {state.events.map((event) => (
                    <div
                      className={`fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event bg-${event.bg}-transparent !bg-${event.bg}/[0.15] !text-${event.bg}  !border-0 `}
                      title={event.title}
                      key={event.id}>
                      <div className={`fc-event-main !text-${event.bg}`}>{event.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="box">
              <div className="box-header">
                <div className="box-title">Full Calendar</div>
              </div>
              <div className="box-body">
                <div id='calendar2'>
                  <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek" }}
                    initialView="dayGridMonth" editable={true} selectable={true} selectMirror={true} dayMaxEvents={true}
                    initialEvents={INITIAL_EVENTS} select={handleDateSelect} eventContent={renderEventContent} eventClick={handleEventClick}
                    eventsSet={handleEvents}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-3 col-span-12">
            <div className="box">
              <div className="box-body !p-0">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h6 className="font-medium">
                      Activity :
                    </h6>
                    <button className="ti-btn ti-btn-soft-primary ti-btn-sm btn-wave">View All</button>
                  </div>
                </div>
                <SimpleBar className="p-4 border-b border-defaultborder dark:border-defaultborder/10" id="full-calendar-activity">

                  <ul className="ti-list-unstyled mb-0 fullcalendar-events-activity">
                    <li>
                      <div className="flex items-center justify-between flex-wrap">
                        <p className="mb-1 font-medium">
                          Monday,Jan 1,2024
                        </p>
                        <span className="badge bg-light text-default mb-1">12:00PM - 1:00PM</span>
                      </div>
                      <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.75rem]">
                        Meeting with a client about new project requirement.
                      </p>
                    </li>
                    <li>
                      <div className="flex items-center justify-between flex-wrap">
                        <p className="mb-1 font-medium">
                          Thursday, Dec 29,2022
                        </p>
                        <span className="badge bg-success text-white mb-1">Completed</span>
                      </div>
                      <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.75rem]">
                        Birthday party of niha suka
                      </p>
                    </li>
                    <li>
                      <div className="flex items-center justify-between flex-wrap">
                        <p className="mb-1 font-medium">
                          Wednesday, Jan 3,2024
                        </p>
                        <span className="badge bg-warning/[0.15] text-warning mb-1">Reminder</span>
                      </div>
                      <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.75rem]">
                        WOrk taget for new project is completing
                      </p>
                    </li>
                    <li>
                      <div className="flex items-center justify-between flex-wrap">
                        <p className="mb-1 font-medium">
                          Friday,Jan 8,2024
                        </p>
                        <span className="badge bg-light text-default mb-1">06:00PM - 09:00PM</span>
                      </div>
                      <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.75rem]">
                        Watch new movie with family
                      </p>
                    </li>
                    <li>
                      <div className="flex items-center justify-between flex-wrap">
                        <p className="mb-1 font-medium">
                          Saturday, Jan 07,2024
                        </p>
                        <span className="badge bg-danger/[0.15] mb-1 text-danger">Due Date</span>
                      </div>
                      <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.75rem]">
                        Last day to pay the electricity bill and water bill.need to check the bank details.
                      </p>
                    </li>
                  </ul>
                </SimpleBar>

                <div className="p-6">
                  <Image fill src="../../assets/images/media/media-81.svg" className="full-calendar-image img-fluid" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!--End::row-1 --> */}
      </div>
    </Fragment>
  );
};

export default FullCalender;