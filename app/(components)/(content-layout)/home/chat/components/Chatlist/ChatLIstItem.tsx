import React from "react";
import Avatar from "../common/Avatar";
import { useChatStore } from "@/app/chat-store/useChatSotre";
import { calculateTime } from "../../utils/CalculateTime";
import { userInfo } from "os";
import MessageStatus from "../common/MessageStatus";
import { useSession } from "@/app/SessionProvider";
import { FaCamera, FaMicrophone } from "react-icons/fa";

function ChatListItem({
  data,
  isContactPage = false,
  onContactClick,
  toggleContactList,
}) {
  // Zustand'dan aktif chat'i set etmek için kullanılan fonksiyonu alıyoruz
  const setActiveChat = useChatStore((state) => state.setActiveChat);
  const { user } = useSession();

  console.log(setActiveChat);

  const handleContact = () => {
    setActiveChat(data); // Tıklanan kullanıcının bilgilerini store'a kaydediyoruz
    console.log("Active chat clicked: ", data.id, data);
    // toggleContactList();
  };

  return (
    <div
      onClick={handleContact}
      className={`flex bg-white cursor-pointer items-center hover:bg-gray-50`}
    >
      <div className="min-w-fit px-5 pt-3 pb-1">
        <Avatar type="lg" image={data.avatarUrl} />
      </div>
      <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full">
        <div className="flex justify-between">
          <div>
            <span className="font-semibold text-gray-900 truncate">{data?.username}</span>
          </div>
           {/* {!isContactPage && (
            <div>
              <span
                className={`${
                  !data.totalUnreadMessages > 0
                    ? "text-secondary"
                    : "text-colors-icon-green"
                } text-sm`}
              >
                {calculateTime(data.createdAt)}
              </span>
            </div>
          )}  */}
        </div>

        <div className="flex border-b border-colors-conversation-border pb-2 pt-1 p3-2">
          <div className="flex justify-between w-full">
            <span className="text-secondary line-clamp-1 text-sms">
              {isContactPage ? (
                data?.bio
              ) : (
                <div className="flex items-center gap-1 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[200px] xl:max-w-[300px]">
                  {data.senderId === user.id && (
                    <MessageStatus messageStatus={data.messageStatus} />
                  )}
                  {data.type === "text" && (
                    <span className="text-sm text-gray-500 truncate">{data.message}</span>
                  )}
                  {data.type === "audio" && (
                    <span className="flex gap-1 items-center">
                      <FaMicrophone className="text-colors-panel-header-icon" />
                      Audio
                    </span>
                  )}

                  {data.type === "image" && (
                    <span className="flex gap-1 items-center">
                      <FaCamera className="text-colors-panel-header-icon" />
                      Image
                    </span>
                  )}
                </div>
              )}
            </span>

            {data.totalUnreadMessages > 0 && <span className="bg-colors-icon-green px-[5px] rounded-full text-sm">{data.totalUnreadMessages}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatListItem;
