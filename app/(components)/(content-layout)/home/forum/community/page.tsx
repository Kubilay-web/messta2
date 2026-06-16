import React from "react";
import UserCard from "@/app/projects/components/stackoverflow/cards/UserCard";
import DataRenderer from "@/app/projects/components/stackoverflow/DataRenderer";
import LocalSearch from "@/app/projects/components/stackoverflow/search/LocalSearch";
import CommonFilter from "@/app/projects/components/stackoverflow/filters/CommonFilter";
import { UserFilters } from "@/app/constants/filter";
import ROUTES from "@/app/constants/routes";
import { EMPTY_USERS } from "@/app/constants/states";
import Pagination from "@/app/projects/components/stackoverflow/Pagination";

export const dynamic = "force-dynamic";

interface RouteParams {
  searchParams: Promise<{ page?: string; pageSize?: string; query?: string; filter?: string }>;
}

const Community = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const queryParam = query ? query : "";
  const filterParam = filter ? filter : undefined;

  try {
    const params = new URLSearchParams({
      page: String(page || 1),
      pageSize: String(pageSize || 10),
      query: queryParam,
    });

    if (filterParam) {
      params.append("filter", filterParam);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/community?${params.toString()}`,
    );

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Bir hata oluştu.");
    }

    const { users, isNext } = result.data;

    return (
      <div>
        <h1 className="h1-bold text-[#1E293B] dark:text-[#F1F5F9]">
          All Users
        </h1>

        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearch
            route={ROUTES.COMMUNITY}
            imgSrc="/assets/stackoverflow/icons/search.svg"
            placeholder="Search users..."
            otherClasses="flex-1"
          />

          <CommonFilter
            filters={UserFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
        </div>

        <DataRenderer
          success={true}
          error={null}
          data={users}
          empty={EMPTY_USERS}
          render={(users) => (
            <div className="mt-12 flex flex-wrap gap-6">
              {users.length > 0 ? (
                users.map((user) => <UserCard key={user.id} {...user} />)
              ) : (
                <p>No users found</p>
              )}
            </div>
          )}
        />

        <Pagination page={page} isNext={isNext} />
      </div>
    );
  } catch (error: any) {
    return (
      <div>
        <h1 className="h1-bold text-[#1E293B] dark:text-[#F1F5F9]">
          All Users
        </h1>

        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearch
            route={ROUTES.COMMUNITY}
            imgSrc="/assets/stackoverflow/icons/search.svg"
            placeholder="Search users..."
            otherClasses="flex-1"
          />
        </div>

        <DataRenderer
          success={false}
          error={error.message}
          data={EMPTY_USERS}
          empty={EMPTY_USERS}
          render={() => <p>{error.message}</p>}
        />
      </div>
    );
  }
};

export default Community;
