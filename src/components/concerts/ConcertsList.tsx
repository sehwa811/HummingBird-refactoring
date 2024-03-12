"use client";
import ConcertList from "@/src/components/concerts/ConcertList";
import { ChangeEvent, useState } from "react";
import "@/src/styles/ConcertList.css";
import { Performance } from "../../types/performance";

type Props = {
  concerts: Performance[];
};
export default function ConcertsList({ concerts }: Props) {

  return (
    <div className="flex p-4">
      <div className="concertListPosts gap-1">
        {concerts.map((concert: Performance) => (
          <div className="flex flex-col mb-9">
            <ConcertList concert={concert} />
          </div>
        ))}
      </div>
    </div>
  );
}
