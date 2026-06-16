import { validateRequest } from "@/app/auth";
import PageTitle from "../../../components/page-title";
import db from "@/app/lib/db";
import dayjs from "dayjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { requireRealestateUser } from "../../../lib/auth";

async function Account() {
  await requireRealestateUser();
  const { user } = await validateRequest();
  const propertiesCount = await db.property.count({
    where: { userId: user?.id },
  });

  const userSubscription: any = await db.subscriptionEstate.findFirst({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* <!-- Start:: Account Section --> */}
      <section className="section !py-6">
        <div className="container">
          <div className="box">
            <div className="box-header">
              <div className="box-title">
                <PageTitle title="My Account" />
              </div>
            </div>

            {/* User Profile Section */}
            <div className="box-body">
              <div className="grid grid-cols-12 gap-6">
                {/* User Info Card */}
                <div className="lg:col-span-4 col-span-12">
                  <div className="box border border-defaultborder dark:border-defaultborder/10">
                    <div className="box-body text-center px-3 sm:px-4 py-4">
                      {/* AVATAR */}
                      <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                          {user?.avatarUrl ? (
                            <Image
                              src={user.avatarUrl}
                              alt={user.username || "User"}
                              width={96}
                              height={96}
                              className="rounded-full object-cover w-full h-full"
                            />
                          ) : (
                            <i className="ri-user-line text-primary text-3xl sm:text-4xl"></i>
                          )}
                        </div>
                      </div>

                      {/* NAME */}
                      <h4 className="font-semibold text-base sm:text-lg mb-1 break-words">
                        {user?.username || "User"}
                      </h4>

                      {/* EMAIL */}
                      <p className="text-xs sm:text-sm text-textmuted dark:text-textmuted/50 mb-3 break-all">
                        {user?.email}
                      </p>

                      {/* BADGES */}
                      <div className="flex flex-wrap justify-center gap-2">
                        <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-primary/10 text-primary flex items-center">
                          <i className="bi bi-house me-1"></i>
                          {propertiesCount} Properties
                        </span>

                        <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-success/10 text-success flex items-center">
                          <i className="bi bi-check-circle me-1"></i>
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Basic Details Section */}
                <div className="lg:col-span-8 col-span-12">
                  <div className="box">
                    <div className="box-header">
                      <div className="box-title">
                        <i className="ri-user-line me-2 text-primary"></i>
                        Basic Details
                      </div>
                    </div>
                    <div className="box-body">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div className="flex flex-col p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-transparent">
                          <label className="form-label text-xs sm:text-sm text-textmuted dark:text-textmuted/50 flex items-center">
                            <i className="ri-user-3-line me-2"></i>
                            Name
                          </label>
                          <p className="font-semibold text-sm sm:text-base text-defaulttextcolor dark:text-defaulttextcolor/70 break-words">
                            {user?.username || "Not provided"}
                          </p>
                        </div>

                        <div className="flex flex-col p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-transparent">
                          <label className="form-label text-xs sm:text-sm text-textmuted dark:text-textmuted/50 flex items-center">
                            <i className="ri-mail-line me-2"></i>
                            Email
                          </label>
                          <p className="font-semibold text-sm sm:text-base text-defaulttextcolor dark:text-defaulttextcolor/70 break-all">
                            {user?.email || "Not provided"}
                          </p>
                        </div>

                        <div className="flex flex-col p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-transparent">
                          <label className="form-label text-xs sm:text-sm text-textmuted dark:text-textmuted/50 flex items-center">
                            <i className="ri-home-3-line me-2"></i>
                            Properties Posted
                          </label>
                          <p className="font-semibold text-sm sm:text-base text-defaulttextcolor dark:text-defaulttextcolor/70">
                            {propertiesCount}
                          </p>
                        </div>

                        <div className="flex flex-col p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-transparent">
                          <label className="form-label text-xs sm:text-sm text-textmuted dark:text-textmuted/50 flex items-center">
                            <i className="ri-shield-user-line me-2"></i>
                            Role
                          </label>
                          <p className="font-semibold text-sm sm:text-base text-defaulttextcolor dark:text-defaulttextcolor/70">
                            {user?.roleestate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Details Section */}
            <div className="box-body !pt-0">
              <div className="box">
                <div className="box-header">
                  <div className="box-title">
                    <i className="ri-vip-crown-line me-2 text-primary"></i>
                    Subscription Details
                  </div>
                </div>
                <div className="box-body">
                  {userSubscription ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="flex flex-col">
                        <label className="form-label text-textmuted dark:text-textmuted/50">
                          <i className="ri-medal-line me-2"></i>
                          Plan
                        </label>
                        <div className="flex items-center">
                          <span className="font-semibold text-defaulttextcolor dark:text-defaulttextcolor/70 me-2">
                            {userSubscription?.plan.name || "N/A"}
                          </span>
                          <span className="badge bg-primary/10 text-primary">
                            Active
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="form-label text-textmuted dark:text-textmuted/50">
                          <i className="ri-money-dollar-circle-line me-2"></i>
                          Price
                        </label>
                        <p className="font-semibold text-defaulttextcolor dark:text-defaulttextcolor/70">
                          ${userSubscription?.plan.price || "0.00"}
                          <span className="text-xs text-textmuted ms-1">
                            /month
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <label className="form-label text-textmuted dark:text-textmuted/50">
                          <i className="ri-calendar-event-line me-2"></i>
                          Purchased On
                        </label>
                        <p className="font-semibold text-defaulttextcolor dark:text-defaulttextcolor/70">
                          {dayjs(userSubscription?.createdAt).format(
                            "DD MMM YYYY",
                          )}
                          <span className="text-xs text-textmuted block">
                            {dayjs(userSubscription?.createdAt).format(
                              "hh:mm A",
                            )}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <label className="form-label text-textmuted dark:text-textmuted/50">
                          <i className="ri-bill-line me-2"></i>
                          Payment ID
                        </label>
                        <p className="font-semibold text-defaulttextcolor dark:text-defaulttextcolor/70 text-sm">
                          {userSubscription?.paymentId || "N/A"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mb-4">
                        <i className="ri-vip-crown-line text-5xl text-gray-300"></i>
                      </div>
                      <h5 className="text-gray-500 mb-2">
                        No Active Subscription
                      </h5>
                      <p className="text-gray-400 mb-4">
                        Subscribe to unlock premium features and post more
                        properties
                      </p>
                      <Link
                        href="/realestate/user/subscriptions"
                        className="ti-btn ti-btn-primary"
                      >
                        <i className="ri-add-line me-2"></i>
                        View Subscription Plans
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End:: Account Section --> */}
    </div>
  );
}

export default Account;
