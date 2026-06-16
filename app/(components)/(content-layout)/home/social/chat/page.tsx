"use client";
import {
  activeChats,
  allChats,
  ChatData,
  ChatGroups,
  ContactData,
} from "@/shared/data/pages/chatdata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import useInitializeChatClient from "../messages/useInitializeChatClient";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import { MessageInput, MessageList, Chat as StreamChat } from "stream-chat-react";
import ChatSidebar from "../messages/ChatSidebar";

const Chat = () => {

  const [activeUser, setActiveUser] = useState({
    name: "Emma Johnson",
    image: "../../assets/images/faces/5.jpg",
    status: "online",
  });

  const handleChatClick = (user: any) => {
    setActiveUser({
      name: user.name,
      image: user.avatar,
      status: user.status,
    });
  };

  const chartWrapperRef = useRef<HTMLDivElement | null>(null); // Create a reference to the chart wrapper

  const toggleChat = () => {
    chartWrapperRef.current?.classList.add("responsive-chat-open");
  };

  const toggleChat1 = () => {
    chartWrapperRef.current?.classList.remove("responsive-chat-open");
  };

  //////////////////

  const chatClient = useInitializeChatClient();

  const { resolvedTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!chatClient) {
    return <Loader2 className="mx-auto my-3 animate-spin" />;
  }



  

  return (
    <Fragment>
      <StreamChat
        client={chatClient}
        theme={
          resolvedTheme === "dark"
            ? "str-chat__theme-dark"
            : "str-chat__theme-light"
        }
      >
        <div className="container-fluid">
          {/* <!-- Page Header --> */}
          <Seo title="Chat" />
          <Pageheader
            Heading="Chat"
            breadcrumbs={["Pages"]}
            currentpage="Chat"
          />
          {/* <!-- Page Header Close --> */}

          <div
            ref={chartWrapperRef}
            className="main-chart-wrapper lg:gap-2 gap-0 !mb-2 lg:flex"
          >
            <div className="chat-info border border-defaultborder dark:border-defaultborder/10">
              <nav
                className="-mb-0.5 flex gap-x-6 justify-between !border-b flex-wrap border-defaultborder dark:border-defaultborder/10"
                role="tablist"
              >
                <Link
                  scroll={false}
                  className="hs-tab-active:font-medium hs-tab-active:border-primary hs-tab-active:text-primary p-6 inline-flex font-medium items-center gap-2 border-b-[2px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor hover:text-primary active"
                  href="#!"
                  id="friends1"
                  data-hs-tab="#friends-1"
                  aria-controls="friends-1"
                >
                  {" "}
                  FRIENDS
                </Link>
                <Link
                  scroll={false}
                  className="hs-tab-active:font-medium hs-tab-active:border-primary hs-tab-active:text-primary p-6 inline-flex font-medium items-center gap-2 border-b-[2px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor hover:text-primary"
                  href="#!"
                  id="group2"
                  data-hs-tab="#group-2"
                  aria-controls="group-2"
                >
                  {" "}
                  GROUPS
                </Link>
                <Link
                  scroll={false}
                  className="hs-tab-active:font-medium hs-tab-active:border-primary hs-tab-active:text-primary p-6 inline-flex font-medium items-center gap-2 border-b-[2px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor hover:text-primary"
                  href="#!"
                  id="contact3"
                  data-hs-tab="#contact-3"
                  aria-controls="contact-3"
                >
                  {" "}
                  CONTACTS
                </Link>
              </nav>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane show active border-0 chat-users-tab"
                  id="friends-1"
                  aria-labelledby="friends1"
                  role="tabpanel"
                  tabIndex={0}
                >
                  <SimpleBar>
                    <ul
                      className="ti-list-unstyled mb-0 mt-2 chat-users-tab"
                      id="chat-msg-scroll"
                    >
                      <li className="pb-0">
                        <p className="text-textmuted dark:text-textmuted/50 text-[0.6875rem] font-medium mb-2 opacity-70">
                          ACTIVE CHATS
                        </p>
                      </li>
                      {activeChats.map((idx) => (
                        <li
                          key={idx.id}
                          className={`checkforactive ${
                            activeUser.name === idx.name ? "active" : ""
                          }  ${idx.isActive ? "chat-msg-unread" : ""}`}
                          onClick={() => handleChatClick(idx)}
                        >
                          <Link scroll={false} href="#!">
                            <div className="flex items-top">
                              <div className="me-1 leading-none">
                                <span className="avatar avatar-md online me-2 avatar-rounded">
                                  <Image fill src={idx.avatar} alt="img" />
                                </span>
                              </div>
                              <div className="flex-grow" onClick={toggleChat}>
                                <p className="mb-0 font-medium">
                                  {idx.name}
                                  <span className="float-end text-textmuted dark:text-textmuted/50 font-normal text-[0.6875rem]">
                                    {idx.time}
                                  </span>
                                </p>
                                <p
                                  className={`text-[0.75rem] mb-0 ${
                                    idx.status === "typing"
                                      ? "chat-msg-typing"
                                      : ""
                                  }`}
                                >
                                  <span className="chat-msg truncate">
                                    {idx.message}
                                  </span>

                                  {idx.status === "read" && (
                                    <span className="chat-read-icon float-end align-middle">
                                      <i className="ri-check-double-fill"></i>
                                    </span>
                                  )}
                                  {idx.unreadCount && (
                                    <span className="badge bg-danger !rounded-full float-end text-white">
                                      {idx.unreadCount}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                      <li className="pb-0">
                        <p className="text-textmuted dark:text-textmuted/50 text-[0.6875rem] font-medium mb-2 opacity-70">
                          ALL CHATS
                        </p>
                      </li>
                      {/* {allChats.map((idx) => (
                        <li
                          key={idx.id}
                          className="chat-inactive checkforactive"
                          onClick={() => handleChatClick(idx)}
                        >
                          <Link scroll={false} href="#!">
                            <div className="flex items-top">
                              <div className="me-1 leading-none">
                                <span className="avatar avatar-md offline me-2 avatar-rounded">
                                  <Image fill src={idx.avatar} alt="img" />
                                </span>
                              </div>
                              <div className="flex-grow" onClick={toggleChat}>
                                <p className="mb-0 font-medium">
                                  {idx.name}
                                  <span className="float-end text-textmuted dark:text-textmuted/50 font-normal text-[0.6875rem]">
                                    {idx.time}
                                  </span>
                                </p>
                                <p className="text-[0.75rem] mb-0">
                                  <span className="chat-msg truncate">
                                    {idx.message}
                                  </span>
                                  {idx.status === "read" && (
                                    <span className="chat-read-icon float-end align-middle">
                                      <i className="ri-check-double-fill"></i>
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))} */}

                      

                    </ul>
                  </SimpleBar>

                </div>
                <div
                  className="tab-pane border-0 chat-groups-tab hidden"
                  id="group-2"
                  role="tabpanel"
                  aria-labelledby="group2"
                  tabIndex={0}
                >
                  <SimpleBar>
                    <div id="groups-tab-pane">
                      <ul className="list-unstyled mb-0 mt-2">
                        <li className="pb-0">
                          <p className="text-textmuted dark:text-textmuted/50 text-[0.6875rem] font-medium mb-1 opacity-70">
                            MY CHAT GROUPS
                          </p>
                        </li>
                        {ChatGroups.map((group) => (
                          <li key={group.id}>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="mb-0">{`${group.id}) ${group.name}`}</p>
                                <p className="mb-0">
                                  <span
                                    className={`badge ${group.badgeColor} ${group.badgeTextColor}`}
                                  >
                                    {group.onlineCount} Online
                                  </span>
                                </p>
                              </div>
                              <div className="avatar-list-stacked my-auto">
                                {group.members.map((member, index) => (
                                  <span
                                    key={index}
                                    className="avatar avatar-sm avatar-rounded"
                                  >
                                    <Image
                                      fill
                                      src={member}
                                      alt={`member-${index}`}
                                    />
                                  </span>
                                ))}
                                <Link
                                  scroll={false}
                                  className="avatar avatar-sm bg-primary text-white avatar-rounded"
                                  href="#!"
                                >
                                  +{group.extraMembers}
                                </Link>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <ul className="list-unstyled mb-0 mt-2 ">
                        <li className="pb-1">
                          <p className="text-textmuted dark:text-textmuted/50 text-[0.6875rem] font-medium mb-1 opacity-70">
                            GROUP CHATS
                          </p>
                        </li>
                        {ChatData.map((idx, index) => (
                          <li
                            key={index}
                            className={`checkforactive ${idx.cardclass}`}
                            onClick={() => handleChatClick(idx)}
                          >
                            <Link scroll={false} href="#!">
                              <div className="flex items-top">
                                <div className="me-1 leading-none">
                                  <span
                                    className={`avatar avatar-md ${idx.status} me-2 avatar-rounded`}
                                  >
                                    <Image fill src={idx.avatar} alt="img" />
                                  </span>
                                </div>
                                <div className="flex-grow" onClick={toggleChat}>
                                  <p className="mb-0 font-medium">
                                    {idx.name}
                                    <span className="float-end text-textmuted dark:text-textmuted/50 font-normal text-[0.6875rem]">
                                      {idx.time}
                                    </span>
                                  </p>
                                  <p className={`text-[0.75rem] ${idx.color}`}>
                                    <span className="chat-msg truncate">
                                      {idx.message}
                                    </span>

                                    {idx.unreadCount > 0 ? (
                                      <span className="badge bg-success/[0.15] !rounded-full text-success float-end">
                                        {idx.unreadCount}
                                      </span>
                                    ) : (
                                      ""
                                    )}

                                    {idx.readicon === true ? (
                                      <span className="chat-read-icon float-end align-middle">
                                        <i className="ri-check-double-fill"></i>
                                      </span>
                                    ) : null}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SimpleBar>
                </div>
                <div
                  className="tab-pane border-0 chat-contacts-tab hidden"
                  id="contact-3"
                  role="tabpanel"
                  aria-labelledby="contact3"
                  tabIndex={0}
                >
                  <SimpleBar>
                    <ul
                      className="ti-list-unstyled mb-0 chat-contacts-tab"
                      id="contacts-tab-pane"
                    >
                      {ContactData.map((idx) => (
                        <div key={idx.letter}>
                          <li className="py-[0.625rem] px-[1.25rem] border-b border-defaultborder dark:border-defaultborder/10">
                            <span className="text-default font-semibold">
                              {idx.letter}
                            </span>
                          </li>
                          {idx.contact.map((details, index) => (
                            <li
                              className="py-[0.625rem] px-[1.25rem] border-b border-defaultborder dark:border-defaultborder/10"
                              key={index}
                            >
                              <div className="flex items-center gap-4">
                                <div className="leading-none">
                                  {details.bgColor ? (
                                    <span
                                      className={`avatar avatar-rounded avatar-sm bg-${details.bgColor} text-white`}
                                    >
                                      {details.text}
                                    </span>
                                  ) : (
                                    <span className="avatar avatar-rounded avatar-sm">
                                      <Image
                                        fill
                                        src={details.avatar as string}
                                        alt=""
                                      />
                                    </span>
                                  )}
                                </div>
                                <div className="flex-grow">
                                  <span className="block font-semibold">
                                    {details.name}
                                  </span>
                                </div>
                                <div className="hs-dropdown [--placement:bottom-right] rtl:[--placement:bottom-left] relative inline-flex">
                                  <Link
                                    scroll={false}
                                    aria-label="anchor"
                                    href="#!"
                                    data-bs-toggle="dropdown"
                                    className="ti-btn ti-btn-icon ti-btn-sm ti-btn-outline-light"
                                  >
                                    <i className="ri-more-2-fill"></i>
                                  </Link>
                                  <ul
                                    className="ti-dropdown-menu hs-dropdown-menu hidden"
                                    role="menu"
                                  >
                                    <li>
                                      <Link
                                        scroll={false}
                                        className="ti-dropdown-item"
                                        href="#!"
                                      >
                                        <i className="ri-message-2-line me-2"></i>
                                        Chat
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        scroll={false}
                                        className="ti-dropdown-item"
                                        href="#!"
                                      >
                                        <i className="ri-phone-line me-2"></i>
                                        Audio Call
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        scroll={false}
                                        className="ti-dropdown-item"
                                        href="#!"
                                      >
                                        <i className="ri-live-line me-2"></i>
                                        Video Call
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        scroll={false}
                                        className="ti-dropdown-item"
                                        href="#!"
                                      >
                                        <i className="ri-edit-line me-2"></i>
                                        Edit
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        scroll={false}
                                        className="ti-dropdown-item"
                                        href="#!"
                                      >
                                        <i className="ri-spam-2-line me-2"></i>
                                        Block
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        scroll={false}
                                        className="ti-dropdown-item"
                                        href="#!"
                                      >
                                        <i className="ri-delete-bin-line me-2"></i>
                                        Delete
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                          ))}
                        </div>
                      ))}
                    </ul>
                  </SimpleBar>
                </div>
              </div>
            </div>
            <div className="main-chat-area !border  border-defaultborder dark:border-defaultborder/10">
              <div className="flex items-center border-b  border-defaultborder dark:border-defaultborder/10 main-chat-head flex-wrap p-3">
                <div className="me-2 leading-none">
                  <span className="avatar avatar-md online avatar-rounded chatstatusperson">
                    <Image
                      fill
                      className="chatimageperson"
                      src={activeUser.image}
                      alt="img"
                    />
                  </span>
                </div>
                <div className="flex-grow">
                  <p className="mb-0 font-medium text-[0.875rem] leading-none">
                    <Link
                      scroll={false}
                      href="#!"
                      data-hs-overlay="#hs-overlay-example"
                      className="chatnameperson responsive-userinfo-open"
                    >
                      {activeUser.name}
                    </Link>
                  </p>
                  <p className="text-textmuted dark:text-textmuted/50 mb-0 chatpersonstatus">
                    online
                  </p>
                </div>
                <div className="flex flex-wrap rightIcons">
                  <button
                    aria-label="button"
                    type="button"
                    className="ti-btn ti-btn-icon ti-btn-soft-primary !my-1 !ms-2 ti-btn-sm"
                  >
                    <i className="ti ti-phone"></i>
                  </button>
                  <button
                    aria-label="button"
                    type="button"
                    className="ti-btn ti-btn-icon ti-btn-soft-secondary !my-1 !ms-2 ti-btn-sm"
                  >
                    <i className="ti ti-video"></i>
                  </button>
                  <button
                    aria-label="button"
                    type="button"
                    className="ti-btn ti-btn-icon ti-btn-outline-light !my-1 !ms-2 responsive-userinfo-open ti-btn-sm"
                  >
                    <i
                      className="ti ti-user-circle"
                      id="responsive-chat-close"
                    ></i>
                  </button>
                  <div className="ti-dropdown hs-dropdown ms-2">
                    <button
                      aria-label="button"
                      className="ti-btn ti-btn-icon ti-btn-soft-success !my-1 btn-wave waves-light ti-btn-sm"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ti ti-dots-vertical"></i>
                    </button>
                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                      <li>
                        <Link
                          scroll={false}
                          className="ti-dropdown-item"
                          href="#!"
                        >
                          <i className="ri-user-3-line me-1"></i>Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          scroll={false}
                          className="ti-dropdown-item"
                          href="#!"
                        >
                          <i className="ri-format-clear me-1"></i>Clear Chat
                        </Link>
                      </li>
                      <li>
                        <Link
                          scroll={false}
                          className="ti-dropdown-item"
                          href="#!"
                        >
                          <i className="ri-user-unfollow-line me-1"></i>Delete
                          User
                        </Link>
                      </li>
                      <li>
                        <Link
                          scroll={false}
                          className="ti-dropdown-item"
                          href="#!"
                        >
                          <i className="ri-user-forbid-line me-1"></i>Block User
                        </Link>
                      </li>
                      <li>
                        <Link
                          scroll={false}
                          className="ti-dropdown-item"
                          href="#!"
                        >
                          <i className="ri-error-warning-line me-1"></i>Report
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <button
                    aria-label="button"
                    type="button"
                    className="ti-btn ti-btn-icon ti-btn-outline-light !my-1 !ms-2 responsive-chat-close ti-btn-sm"
                    onClick={toggleChat1}
                  >
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              </div>
              <SimpleBar>
                <div className="chat-content" id="main-chat-content">
                  <ul className="list-unstyled">
                    <li className="chat-day-label">
                      <span>Today</span>
                    </li>
                    <li className="chat-item-start">
                      <div className="chat-list-inner">
                        <div className="chat-user-profile">
                          <span className="avatar avatar-md online avatar-rounded chatstatusperson">
                            <Image
                              fill
                              className="chatimageperson"
                              src={activeUser.image}
                              alt="img"
                            />
                          </span>
                        </div>
                        <div className="ms-3">
                          <span className="chatting-user-info">
                            <span className="chatnameperson">
                              {activeUser.name}
                            </span>{" "}
                            <span className="msg-sent-time">11:48PM</span>
                          </span>
                          <div className="main-chat-msg">
                            <div>
                              <p className="mb-0">
                                Hey there! &#128522; How's it going?
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="chat-item-end">
                      <div className="chat-list-inner">
                        <div className="me-3">
                          <span className="chatting-user-info">
                            <span className="msg-sent-time">
                              <span className="chat-read-mark align-middle d-inline-flex">
                                <i className="ri-check-double-line"></i>
                              </span>
                              11:50PM
                            </span>
                            You
                          </span>
                          <div className="main-chat-msg">
                            <div>
                              <p className="mb-0">
                                Hey! I'm good, thanks. Just finished some work.
                                How about you?
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="chat-user-profile">
                          <span className="avatar avatar-md online avatar-rounded">
                            <Image
                              fill
                              src="../../assets/images/faces/15.jpg"
                              alt="img"
                            />
                          </span>
                        </div>
                      </div>
                    </li>
                    <li className="chat-item-start">
                      <div className="chat-list-inner">
                        <div className="chat-user-profile">
                          <span className="avatar avatar-md online avatar-rounded chatstatusperson">
                            <Image
                              fill
                              className="chatimageperson"
                              src={activeUser.image}
                              alt="img"
                            />
                          </span>
                        </div>
                        <div className="ms-3">
                          <span className="chatting-user-info">
                            <span className="chatnameperson">
                              {activeUser.name}
                            </span>
                            <span className="msg-sent-time">11:51PM</span>
                          </span>
                          <div className="main-chat-msg">
                            <div>
                              <p className="mb-0">
                                Not too bad, just chilling. Have any exciting
                                plans for the weekend?
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="chat-item-end">
                      <div className="chat-list-inner">
                        <div className="me-3">
                          <span className="chatting-user-info">
                            <span className="msg-sent-time">
                              <span className="chat-read-mark align-middle d-inline-flex">
                                <i className="ri-check-double-line"></i>
                              </span>
                              11:52PM
                            </span>
                            You
                          </span>
                          <div className="main-chat-msg">
                            <div>
                              <p className="mb-0">
                                Not really, just relaxing. Maybe catch up on
                                some movies. You?
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="chat-user-profile">
                          <span className="avatar avatar-md online avatar-rounded">
                            <Image
                              fill
                              src="../../assets/images/faces/15.jpg"
                              alt="img"
                            />
                          </span>
                        </div>
                      </div>
                    </li>
                    <li className="chat-item-start">
                      <div className="chat-list-inner">
                        <div className="chat-user-profile">
                          <span className="avatar avatar-md online avatar-rounded chatstatusperson">
                            <Image
                              fill
                              className="chatimageperson"
                              src={activeUser.image}
                              alt="img"
                            />
                          </span>
                        </div>
                        <div className="ms-3">
                          <span className="chatting-user-info">
                            <span className="chatnameperson">
                              {activeUser.name}
                            </span>{" "}
                            <span className="msg-sent-time">11:55PM</span>
                          </span>
                          <div className="main-chat-msg">
                            <div>
                              <p className="mb-0">
                                Same here. Thinking of trying out that new cafe
                                downtown. Heard they have amazing coffee.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="chat-item-end">
                      <div className="chat-list-inner">
                        <div className="me-3">
                          <span className="chatting-user-info">
                            <span className="msg-sent-time">
                              <span className="chat-read-mark align-middle d-inline-flex">
                                <i className="ri-check-double-line"></i>
                              </span>
                              11:52PM
                            </span>
                            You
                          </span>
                          <div className="main-chat-msg">
                            <div className="">
                              <p className="mb-0">
                                Oh, nice! Let me know how it is. I might check
                                it out too.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="chat-user-profile">
                          <span className="avatar avatar-md online avatar-rounded">
                            <Image
                              fill
                              src="../../assets/images/faces/15.jpg"
                              alt="img"
                            />
                          </span>
                        </div>
                      </div>
                    </li>
                    <li className="chat-item-start">
                      <div className="chat-list-inner">
                        <div className="chat-user-profile">
                          <span className="avatar avatar-md online avatar-rounded">
                            <Image
                              fill
                              className="chatimageperson"
                              src={activeUser.image}
                              alt="img"
                            />
                          </span>
                        </div>
                        <div className="ms-3">
                          <span className="chatting-user-info chatnameperson">
                            {activeUser.name}{" "}
                            <span className="msg-sent-time">11:45PM</span>
                          </span>
                          <div className="main-chat-msg">
                            <div>
                              <p className="mb-0">
                                No spoilers, promise! Enjoy the binge-watching
                                session. &#128516;
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </SimpleBar>
              <div className="chat-footer">
                <Link
                  scroll={false}
                  aria-label="anchor"
                  className="ti-btn ti-btn-icon me-2 ti-btn-success emoji-picker"
                  href="#!"
                >
                  <i className="ri-emotion-line"></i>
                </Link>
                <input
                  className="form-control chat-message-space"
                  placeholder="Type your message here..."
                  type="text"
                />
                <Link
                  scroll={false}
                  aria-label="anchor"
                  className="ti-btn ti-btn-primary ms-2 flex items-center justify-center ti-btn-icon btn-send"
                  href="#!"
                >
                  <i className="ri-send-plane-2-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </StreamChat>
    </Fragment>
  );
};

export default Chat;
