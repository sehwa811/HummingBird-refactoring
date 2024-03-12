import React from "react";
import { ChatMessage } from "@/src/components/concerts/ChatRoom";
import moment from "moment";

interface ChatMessageComponentProps {
  message: ChatMessage;
  currentNickname: string;
  showDate?: boolean;
}

export const ChatMessageComponent: React.FC<ChatMessageComponentProps> = ({ message, currentNickname, showDate }) => {
  const isSentByCurrentUser = message.nickname === currentNickname;
  const messageBubbleClass = isSentByCurrentUser ? "bg-purple-400" : "bg-white";
  const textColorClass = isSentByCurrentUser ? "text-white" : "text-black";

  const sendTime = moment(message.send_time, "YYYY-MM-DD HH:mm:ss").format("hh:mm");
  const sendMeridiem = moment(message.send_time, "YYYY-MM-DD HH:mm:ss").format("a") == "am" ? "오전" : "오후";

  return (
    <div className={`flex-col mb-2`}>
      {/*유저 정보*/}
      {!isSentByCurrentUser &&
        <div style={{ display: "flex", alignItems: "center" }}>
          {message.profile_image ?
            <img className="h-7 w-auto rounded-full" src={message.profile_image} alt="" />
            :
            <img className="h-7 w-auto rounded-full" src="/svg/DefalutImage.svg"/>
          }
          <div className="font-bold" style={{ marginLeft: "10px", flexBasis: "100%" }}>
            {message.nickname}
          </div>
        </div>
      }
      {/*채팅 내용*/}
      {!isSentByCurrentUser ? (
        <div className="flex">
          <div className={`px-4 py-2 ml-7 rounded-2xl ${messageBubbleClass} ${textColorClass}`}>
            <p>{message.content}</p>
          </div>
          <div className="text-xs self-end ml-1.5 mb-1">{sendMeridiem} {sendTime}</div>
        </div>
      ) : (
        <div className="flex justify-end">
          <div className="text-xs self-end mr-1.5 mb-1">{sendMeridiem} {sendTime}</div>
          <div className={`px-4 py-2 rounded-2xl ${messageBubbleClass} ${textColorClass}`}>
            <p>{message.content}</p>
          </div>
        </div>
      )}
    </div>

  );
};
