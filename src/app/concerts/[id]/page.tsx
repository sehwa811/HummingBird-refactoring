"use client";

import { useParams, useRouter } from "next/navigation";
import instance, { apiWithAuth } from "@/src/utils/api/instance";
import { useQuery } from "@tanstack/react-query";
import ChatComponent from "@/src/components/concerts/ChatRoom";
import ConcertDetailPageTemplate from "@/src/templates/ConcertDetailPageTemplage";
import { useUser } from "@/src/hooks/useUser";
import { useState } from "react";
import CustomModal from "@/src/components/common/CustomModal.component";
import { getWeekday } from "@/src/utils/common/dateUtils";

type ConcertDetailType = {
  performance_id: number;
  past: boolean;
  is_heart_pressed: boolean;
  name: string;
  artist_name: string;
  artist_id: string;
  photo: string;
  location: string;
  description: string;
  runtime: number;
  date: string[];
  regular_ticketing: TicketingInfo[];
  earlybird_ticketing: TicketingInfo[];
  room_id: string;
  alarmed: boolean;
};

type TicketingInfo = {
  date: string;
  platform: string;
  link: string;
};

export default function Concert() {
  const performance_id = useParams<{ id: string }>().id;
  const router = useRouter();
  const [posterModal, setPosterModal] = useState<boolean>(false);
  const { data: userInfo } = useUser();
  const goToArtistPage = () => {
    if (concertDetail?.artist_id) {
      router.push(`/artists/${concertDetail.artist_id}`);
    }
  };
  const {
    data: concertDetail,
    isLoading,
    isError,
  } = useQuery<ConcertDetailType>(
    ["concertDetail", performance_id],
    async () => {
      let response;
      if (userInfo?.data) {
        response = await apiWithAuth().get(`/performance/${performance_id}`);
      } else {
        response = await instance.get(`/performance/${performance_id}`);
      }

      if (response && response.status === 200) {
        return response.data.data;
      }
      throw new Error("Failed to fetch concert details");
    },
  );

  return (
    <div className="concert-details-wrapper">
      {!isLoading && !isError && concertDetail && (
        <ConcertDetailPageTemplate
          performanceId={concertDetail.performance_id}
          isHearted={concertDetail.is_heart_pressed}
          isAlarmed={concertDetail.alarmed}
        >
          <img
            src={concertDetail.photo}
            alt={`${concertDetail.artist_name} concert poster`}
            className="w-full h-auto max-w-[430px] fixed z-0 pt-1 px-0.5"
            onClick={(e) => {
              e.stopPropagation();
              setPosterModal(true);
            }}
          />
          <CustomModal isOpen={posterModal}>
            <img
              src={concertDetail.photo}
              alt={`${concertDetail.artist_name} concert poster`}
              className="w-full"
              onClick={() => setPosterModal(false)}
            />
          </CustomModal>
          <div className="bg-white w-full top-[22rem] z-5 relative rounded-t-[30px] pt-5 flex flex-col">
            <div className="mx-6 h-max flex flex-col gap-3">
              <h1 className="pt-2 text-xl font-semibold text-[#191926]">{concertDetail.name}</h1>
              <p
                className="text-gray-400 cursor-pointer"
                onClick={goToArtistPage}
              >
                {concertDetail.artist_name}
              </p>
              {concertDetail.runtime !== 0 &&
                <p className="font-medium">시간 | {concertDetail.runtime}분</p>
              }
              <div className="flex gap-1">
                <span>기간 |</span>
                <div className="">
                  {concertDetail.date.map((date, index) => (
                    <div key={index}>
                      {date.split(" ")[0]} {getWeekday(date)} {date.split(" ")[1]}
                    </div>
                  ))}
                </div>
              </div>
              <span>장소 | {concertDetail.location}</span>
              <span className="flex gap-2"> 티켓 예매 |
                {concertDetail.regular_ticketing.map((ticket, index) => (
                  <div key={index} className=" pb-1 gap-2">
                    <a href={ticket.link} target="_blank" rel="noopener noreferrer" className="flex gap-1 mb-1">
                      {ticket.platform}
                      <img src="/design/icon/퍼플/move.svg" alt="link_move" className="" />
                    </a>
                    <div className="text-sm -mt-1 text-gray-400">
                      {ticket.date.split(" ")[0]} {getWeekday(ticket.date)} {ticket.date.split(" ")[1]}
                    </div>
                  </div>
                ))}
              </span>

            </div>
            <ChatComponent performanceId={concertDetail.room_id} />
          </div>
        </ConcertDetailPageTemplate>
      )}
    </div>
  );
}
