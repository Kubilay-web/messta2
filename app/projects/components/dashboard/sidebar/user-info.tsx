import { Avatar, AvatarFallback, AvatarImage } from "@/app/projects/components/ui/avatar";
import { Badge } from "@/app/projects/components/ui/badge";
import { Button } from "@/app/projects/components/ui/button";
import React from "react";

interface UserInfoProps {
  user: any;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const role = user?.roleshop.toString();

  return (
    <div>
      <div>
        <Button
          className="mb-4 mt-5 flex w-full items-center justify-between py-10"
          variant="ghost"
        >
          <div className="flex items-center gap-2 text-left">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatarUrl} alt={user?.username} />
              <AvatarFallback className="bg-primary text-white">
                {user?.username}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-y-1">
              {user?.username}
              <span className="text-muted-foreground">{user?.email}</span>
              <span className="w-fit">
                <Badge variant="secondary" className="capitalize">
                  {role?.toLocaleLowerCase()} Dashboard
                </Badge>
              </span>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;
