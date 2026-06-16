"use client";
import { User } from "@prisma/client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

function UsersTable({ users }: { users: User[] }) {
  // Stats data
  const stats = {
    total: users.length,
    admins: users.filter(user => user.roleestate === "ADMIN").length,
    users: users.filter(user => user.roleestate === "USER").length,
  };

  return (
    <div>
      {/* <!-- Start:: Landing Banner --> */}
    

      {/* <!-- Start:: Users Table Section --> */}
      <section className="section !py-6">
        <div className="container">


          {/* Users Table */}
          <div className="box">
            <div className="box-header">
              <div className="box-title">
                Users Management
                <span className="badge bg-primary ms-2">{users.length}</span>
              </div>
    
            </div>

            {users.length === 0 ? (
              <div className="box-body text-center py-10">
                <div className="mb-4">
                  <i className="bi bi-people text-5xl text-gray-300"></i>
                </div>
                <h5 className="text-gray-500 mb-2">No users found</h5>
                <p className="text-gray-400">Start by adding your first user</p>
              </div>
            ) : (
              <div className="box-body !p-0">
                {/* Desktop Table View */}
                <div className="hidden lg:block">
                  <div className="overflow-x-auto">
                    <table className="ti-custom-table ti-custom-table-head">
                      <thead>
                        <tr>
                          <th scope="col" className="!px-6 !py-3">User</th>
                          <th scope="col" className="!px-6 !py-3">Email</th>
                          <th scope="col" className="!px-6 !py-3">Role</th>
                          <th scope="col" className="!px-6 !py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b border-defaultborder dark:border-defaultborder/10">
                            <td className="!px-6 !py-4">
                              <div className="flex items-center gap-3">
                                <div className="avatar avatar-md avatar-rounded">
                                  <Image
                                    src={user.avatarUrl || '/default-avatar.png'}
                                    alt={user.username || 'User'}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-semibold mb-0">{user.username || 'N/A'}</p>
                                </div>
                              </div>
                            </td>
                            <td className="!px-6 !py-4">
                              <span className="text-textmuted dark:text-textmuted/50">{user.email}</span>
                            </td>
                            <td className="!px-6 !py-4">
                              <span className={`badge ${
                                user.roleestate === 'ADMIN' ? 'bg-danger/10 text-danger' :
                                'bg-primary/10 text-primary'
                              }`}>
                                {user.roleestate || 'USER'}
                              </span>
                            </td>
                    
                            <td className="!px-6 !py-4">
                              <span className="text-textmuted dark:text-textmuted/50 text-sm">
                                {dayjs(user.createdAt).format("MMM DD, YYYY")}
                                <br />
                                <span className="text-xs">{dayjs(user.createdAt).format("HH:mm A")}</span>
                              </span>
                            </td>
                     
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden">
                  <div className="grid grid-cols-1 gap-4 p-4">
                    {users.map((user) => (
                      <div key={user.id} className="box border border-defaultborder dark:border-defaultborder/10">
                        <div className="box-body">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="avatar avatar-md avatar-rounded">
                                <Image
                                  src={user.avatarUrl || '/default-avatar.png'}
                                  alt={user.username || 'User'}
                                  width={40}
                                  height={40}
                                  className="rounded-full object-cover"
                                />
                              </div>
                              <div>
                                <h6 className="font-semibold mb-0">{user.username || 'N/A'}</h6>
                                <p className="text-textmuted dark:text-textmuted/50 text-xs mb-0">{user.email}</p>
                              </div>
                            </div>
                 
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                              <p className="text-textmuted dark:text-textmuted/50 text-xs mb-1">User ID</p>
                              <p className="text-sm font-medium">{user.id.substring(0, 12)}...</p>
                            </div>
                            <div>
                              <p className="text-textmuted dark:text-textmuted/50 text-xs mb-1">Registered</p>
                              <p className="text-sm font-medium">{dayjs(user.createdAt).format("MMM DD, YYYY")}</p>
                            </div>
                          </div>
                          
                
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* <!-- End:: Users Table Section --> */}
    </div>
  );
}

export default UsersTable;