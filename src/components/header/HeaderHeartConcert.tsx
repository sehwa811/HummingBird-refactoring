"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import BackButton from "../../../public/svg/BackButton.svg";
import LikeFilled from "../../../public/svg/LikeFilled.svg";
import LikeDefault from "../../../public/svg/LikeDefault.svg";
import AlarmDefault from "../../../public/svg/AlarmDefault.svg";
import ShareDefault from "../../../public/svg/ShareDefault.svg";
import AlarmFilled from "../../../public/svg/Alarmfilled.svg";
import CustomModal from "../common/CustomModal.component";
import ConcertHeart from "../modal/ConcertHeart.component";
import {
  heartConcert,
  postConcertPush,
} from "../../utils/api/pushNotification.api";
import ConcertPush from "../modal/ConcertPush.component";
import { useUser } from "@/src/hooks/useUser";
import Link from "next/link";

interface IHeaderHeartBtn {
  performanceId: number;
  isHearted: boolean;
  isAlarmed: boolean;
}

export default function HeaderHeartConcert({
  performanceId,
  isHearted,
  isAlarmed
}: IHeaderHeartBtn) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isHeartModalOpen, setIsHeartModalOpen] = useState<boolean>(false);
  const [isPushModalOpen, setIsPushModalOpen] = useState<boolean>(false);
  const [beforeTime, setBeforeTime] = useState<number>(0);
  const { data: user, isLoading, isError } = useUser();
  const [pressedHeart, setPressedHeart] = useState<boolean>(false);

  useEffect(() => {
    setPressedHeart(isHearted); // 초기 설정
  }, []);

  const mutateHeartConcert = async (data: {
    performanceId: number;
    isHearted: boolean;
  }) => {
    const { performanceId, isHearted } = data;
    return heartConcert(performanceId, isHearted);
  };

  const mutateConcertPush = async (data: {
    performanceId: number;
    beforeTime: number;
  }) => {
    return postConcertPush(data);
  };

  const createMutation = useMutation(mutateHeartConcert, {
    onSuccess: () => {
      queryClient.invalidateQueries(["concertDetail", performanceId]);
      setPressedHeart(prev => !prev)
    },
    onError: (error) => {
      console.log("heart error message: " + error)
    },
  });

  const createPushMutation = useMutation(mutateConcertPush, {
    onSuccess: () => {
      queryClient.invalidateQueries(["concertDetail", performanceId]);
    },
    onError: () => {},
  });

  const handleOnHeartClick = () => {
    setIsHeartModalOpen((prev) => !prev);
    if (pressedHeart) {
      createMutation.mutateAsync({ performanceId, isHearted : true });
    } else {
      createMutation.mutateAsync({ performanceId, isHearted : false });
    }
  };

  const handleOnPushClick = () => {
    setIsPushModalOpen((prev) => !prev);
  };

  return (
    <header className="headerPrev">
      <button onClick={() => router.back()}>
        <BackButton />
      </button>
      <div className="flex gap-4">
        {!!user ? (
          <div className="flex gap-4">
            <button>{<ShareDefault />}</button>
            <button
              className="rounded-full w-10 h-10 flex items-center justify-center"
              onClick={handleOnHeartClick}
            >
              {pressedHeart ? <LikeFilled /> : <LikeDefault />}
            </button>
            <button
              className="rounded-full w-10 h-10 flex items-center justify-center"
              onClick={handleOnPushClick}
            >
              {isAlarmed ? <AlarmFilled /> : <AlarmDefault />}
            </button>
          </div>
        ) : (
          <Link href="/login">
            <img
              src="/svg/DefalutImage.svg"
              alt="User Profile"
              className="rounded-full w-10 h-10"
            />
          </Link>
        )}
        <CustomModal isOpen={isHeartModalOpen}>
          <ConcertHeart
            isHearted={isHearted}
            closeModal={() => {
              setIsHeartModalOpen(false);
            }}
          />
        </CustomModal>
        <CustomModal isOpen={isPushModalOpen}>
          <ConcertPush
            setPushBeforeTime={setBeforeTime}
            isAlarmed={isAlarmed}
            closeModal={async() => {
              setIsPushModalOpen(false);

              await createPushMutation.mutateAsync({ performanceId, beforeTime });
            }}
          />
        </CustomModal>
      </div>
    </header>
  );
}
