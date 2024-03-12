import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client, over, Subscription } from "stompjs";
import { useUser } from "@/src/hooks/useUser";
import dayjs from "dayjs";
import instance from "@/src/utils/api/instance";
import { ChatMessageComponent } from "@/src/components/concerts/ChatMessageComponent";
import moment from "moment";
import { useRouter } from "next/navigation";
import { totalmem } from "node:os";

export interface ChatMessage {
  type: "ENTER" | "TALK";
  room_id: string;
  nickname: string;
  content: string;
  send_time: string;
  profile_image: string;
  is_sent?: boolean;
}

interface ChatComponentProps {
  performanceId: string;
}

const ChatRoom: React.FC<ChatComponentProps> = ({ performanceId }) => {
  const router = useRouter();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const lastDateRef = useRef<string>("");

  const [content, setContent] = useState<string>("");
  const stompClient = useRef<Client | null>(null);

  const { data: userInfo } = useUser();
  const [nickname, setNickname] = useState<string>("Guest");

  const [hasMoreMessages, setHasMoreMessages] = useState(false);

  const publishEnterMessage = () => {
    if (stompClient.current?.connected) {
      stompClient.current.send(`/pub/chat/message`, {}, JSON.stringify({
        type: "ENTER",
        room_id: performanceId
      }));
    }
  };

  // 닉네임 설정
  useEffect(() => {
    if (userInfo?.data.nickname) {
      setNickname(userInfo.data.nickname);
    }
  }, [userInfo]);

  // 채팅방 메시지 불러오기
  useEffect(() => {
    instance.get(`chat/room/${performanceId}/message`, {
      params: { page: currentPage, size: 5 },
    }).then((res) => {
      if (res.status === 200 && res.data.status === "SUCCESS") {
        if (currentPage === 0) {
          setMessages(res.data.data.chat_message_list);
        } else {
          setMessages(prevMessages => [...res.data.data.chat_message_list, ...prevMessages]);
        }
        if (res.data.data.total_pages - 1 > currentPage) {
          setHasMoreMessages(true);
        } else {
          setHasMoreMessages(false);
        }
      }
    })
      .catch((error) => {
        console.error("Fetching messages failed: ", error);
      });
  }, [currentPage]);

  // 채팅방 소캣연결
  useEffect(() => {
    const sock = new SockJS("http://api.hummingbird.kr:8080/ws/chat");
    stompClient.current = over(sock);
    let subscription: Subscription | null = null;

    stompClient.current.connect({}, () => {
      console.log("Connected via SockJS");
      subscription = subscribeToRoom(performanceId);
      publishEnterMessage();
    }, (error: any) => {
      console.error("Connection error:", error);
    });

    const cleanup = () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      disconnect();
    };

    return cleanup;
  }, [performanceId]);

  const disconnect = () => {
    if (stompClient.current?.connected) {
      stompClient.current.disconnect(() => {
        console.log("Disconnected");
      });
    }
  };

  const subscribeToRoom = (roomId: string): Subscription | null => {
    if (stompClient.current && stompClient.current.connected) {
      return stompClient.current.subscribe(`/sub/chat/room/${roomId}`
        , (message: { body: string }) => {
          const newMessage: ChatMessage = JSON.parse(message.body);
          setMessages(prevMessages => [...prevMessages, newMessage]);
        });
    }
    return null;
  };

  const sendMessage = (type: "ENTER" | "TALK") => {
    if (!stompClient.current?.connected) {
      console.error("The client is not connected to the WebSocket.");
      return;
    }
    const chatMessage: ChatMessage = {
      type: type,
      room_id: performanceId,
      nickname: nickname,
      content: content,
      profile_image: userInfo?.data.profile_image || "",
      send_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };

    stompClient.current.send(`/pub/chat/message`, {}, JSON.stringify(chatMessage));
    scrollToBottom();
    setContent("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop } = messagesContainerRef.current;
      if (scrollTop === 0) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  return (
    <div className="flex flex-col my-4 bg-gray-100 max-h-[550px] min-h-[350px]">
      <div className="flex p-4">
        <p className="text-2xl font-semibold px-2.5">
          실시간<br></br>내한공연 Talk!<br />
        </p>
        <img
          src="/design/icon/그레이/Initialization.svg"
          alt="refresh_button"
          className="absolute right-5 translate-y-6 cursor-pointer"
          onClick={scrollToBottom}
        />
      </div>
      {/*채팅 목록*/}
      <div className="flex-grow px-4 mb-2 overflow-y-scroll">
        {hasMoreMessages &&
          <img
            src="/design/icon/퍼플/up.svg"
            className="flex items-center mb-2 rounded-2xl p-2 w-30 h-8 hover:bg-gray-300 mx-auto"
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            alt="more-chat"
          />
        }
        {messages?.length > 0 ? (
          messages?.map((message, index) => {
              const messageDate = moment(message.send_time).format("YYYY.MM.DD");
              const showDate = lastDateRef.current !== messageDate;
              if (showDate) {
                lastDateRef.current = messageDate;
              }
              return (
                <div>
                  {showDate && (
                    <div className="text-center text-[14px] text-white mb-2 bg-[#949494] rounded-2xl py-2 w-24 mx-auto">
                      {moment(message.send_time).format("YYYY.MM.DD")}
                    </div>
                  )}
                  <ChatMessageComponent
                    key={index}
                    message={message}
                    currentNickname={nickname}
                  />
                  {index === messages.length - 1 && <div ref={messagesEndRef} />}
                </div>
              );
            },
          )
        ) : (
          <p className="text-center translate-y-20 text-[#A5A5A5] text-xl">채팅이 없습니다</p>
        )}
      </div>
      {/*채팅 입력*/}
      {userInfo?.data.nickname ? (
        <div className="border-2 border-transparent flex items-center bg-white rounded-3xl mb-2 mx-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter" && content) {
                sendMessage("TALK");
              }
            }}
            className="flex-grow p-2 border-gray-300 outline-none rounded-l-lg ml-2"
            placeholder="하고싶은 말을 써주세요"
          />
          <button
            onClick={() => sendMessage("TALK")}
            className="flex justify-center items-center h-9 w-9 bg-black text-white p-2 rounded-full mr-2"
          >
            <img src="/design/icon/화이트/send.svg" alt="send" className="w-5 h-5" />
          </button>
        </div>
        ) : (
        <div className="border-2 border-gray-200 flex items-center rounded-3xl">
          <input
            type="text"
            value={content}
            className="flex-grow p-2 border-gray-300 rounded-l-lg ml-2 cursor-pointer"
            placeholder="로그인해야 채팅이 가능합니다."
            disabled={true}
            onClick={() => {
              router.push("/login");
            }}
          />
        </div>
        )
      }
    </div>
  );
};

export default ChatRoom;
