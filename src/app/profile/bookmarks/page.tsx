"use client";

import { useRef, useState } from "react";
import ToggleButton from "@/src/components/profile/ToggleButton.component";
import SortChange from "../../../../public/svg/SortChange.svg";
import HeartArtists from "@/src/components/profile/bookmarks/HeartArtists.component";
import HeartPerformances from "@/src/components/profile/bookmarks/HeartPerformances.component";
import ActionSheet, { ActionSheetRef } from "actionsheet-react";

import "../../../styles/ActionSheetButton.styles.css";

type sortTypes = {
  sort: string;
  display: string;
};

export default function Bookmarks() {
  const [isConcert, setIsConcert] = useState<boolean>(true);
  const [sortPerform, setSortPerform] = useState<sortTypes>({
    sort: "heart-input",
    display: "좋아요한 시간순",
  });
  const ref = useRef<ActionSheetRef>();

  const handleOpen = () => {
    ref.current && ref.current.open();
  };

  const handleClose = () => {
    ref.current && ref.current.close();
  };

  const changeSortType = (type: string) => {
    handleClose();
    switch (type) {
      case "heart":
        setSortPerform({
          sort: "heart-input",
          display: "좋아요한 시간순",
        });
        break;
      case "ticketing":
        setSortPerform({
          sort: "ticketing",
          display: "티켓팅 날짜순",
        });
        break;
      case "date":
        setSortPerform({
          sort: "date",
          display: "공연 날짜순",
        });
        break;
      case "name":
        setSortPerform({
          sort: "name",
          display: "이름순",
        });
        break;
      default:
        return;
    }
  };

  return (
    <div className="p-5">
      <div className="py-2.5">
        <div className="text-2xl font-semibold pr-2.5 pl-2.5">
          관심있는{" "}
          <p className="inline text-2xl font-semibold text-[#AB74FF]">
            {isConcert ? "공연" : "아티스트"}
          </p>
          {isConcert ? "을" : "를"}
          <p>확인해보세요</p>
        </div>
      </div>
      <div className="flex gap-4 justify-between align-middle py-2.5">
        <div className="flex gap-4 justify-items-center align-middle">
          <ToggleButton
            title="공연"
            isActive={isConcert}
            onClick={() => {
              setIsConcert(true);
              changeSortType("heart");
            }}
          />
          <ToggleButton
            title="아티스트"
            isActive={!isConcert}
            onClick={() => {
              setIsConcert(false);
              changeSortType("heart");
            }}
          />
        </div>
        <button
          className="flex items-center justify-items-center text-sm text-[#A5A5A5]"
          onClick={handleOpen}
        >
          <SortChange />
          {sortPerform.display}
        </button>
        <ActionSheet ref={ref}>
          {isConcert ? (
            <div className="actionSheet">
              <button
                onClick={() => changeSortType("heart")}
                className="actionSheet-button"
              >
                좋아요한 시간 순
              </button>
              <button
                onClick={() => changeSortType("ticketing")}
                className="actionSheet-button"
              >
                티켓팅 날짜순
              </button>
              <button
                onClick={() => changeSortType("date")}
                className="actionSheet-button"
              >
                공연 날짜순
              </button>
            </div>
          ) : (
            <div className="actionSheet">
              <button
                onClick={() => changeSortType("heart")}
                className="actionSheet-button"
              >
                좋아요 한 시간 순
              </button>
              <button
                onClick={() => changeSortType("name")}
                className="actionSheet-button"
              >
                이름순
              </button>
            </div>
          )}
        </ActionSheet>
      </div>
      {isConcert ? (
        <HeartPerformances sort={sortPerform.sort} />
      ) : (
        <HeartArtists />
      )}
    </div>
  );
}
