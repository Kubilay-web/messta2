import React from "react";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import ROUTES from "@/app/constants/routes";

const UserCard = ({ id, displayName, image, username }: User) => (
  <div className="shadow-light100_darknone w-full xs:w-[230px]">
    <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
      <UserAvatar
        id={id}
        name={displayName} // name yerine displayName kullanılıyor
        imageUrl={image || "/assets/images/default-user.avif"}
        className="size-[100px] rounded-full object-cover"
        fallbackClassName="text-3xl tracking-widest"
      />

      <Link href={ROUTES.PROFILE(id)}>
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {displayName}
          </h3>{" "}
          {/* displayName kullanıldı */}
          <p className="body-regular text-dark400_light500 mt-2">@{username}</p>
        </div>
      </Link>
    </article>
  </div>
);

export default UserCard;
