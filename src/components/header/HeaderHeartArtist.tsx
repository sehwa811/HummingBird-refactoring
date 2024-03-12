"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { heartArtist, pushArtist } from "../../utils/api/artists.api";

import BackButton from "../../../public/svg/BackButton.svg";
import LikeFilled from "../../../public/svg/LikeFilled.svg";
import LikeDefault from "../../../public/svg/LikeDefault.svg";
import AlarmDefault from "../../../public/svg/AlarmDefault.svg";
import ShareDefault from "../../../public/svg/ShareDefault.svg";
import AlarmFilled from "../../../public/svg/Alarmfilled.svg";
import CustomModal from "../common/CustomModal.component";
import ArtistPush from "../modal/ArtistPush.component";
import ArtistHeart from "../modal/ArtistHeart.component";
import { useUser } from "../../hooks/useUser";
import Link from "next/link";

interface IHeaderHeartBtn {
  artistId: string;
  isHearted: boolean;
  isAlarmed: boolean;
}

export default function HeaderHeartArtist({
                                            artistId,
                                            isHearted,
                                            isAlarmed,
                                          }: IHeaderHeartBtn) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isHeartModalOpen, setIsHeartModalOpen] = useState<boolean>(false);
  const [isPushModalOpen, setIsPushModalOpen] = useState<boolean>(false);
  const { data: user, isLoading, isError } = useUser();

  const mutateHeartArtist = async (data: {
    artistId: string;
    isHearted: boolean;
  }) => {
    const { artistId, isHearted } = data;
    return heartArtist(artistId, isHearted);
  };

  const mutatePushArtist = async (data: {
    artistId: string;
    isAlarmed: boolean;
  }) => {
    const { artistId, isAlarmed } = data;
    return pushArtist(artistId, isAlarmed);
  };

  const createPushMutation = useMutation(mutatePushArtist, {
    onSuccess: () => {
      queryClient.resetQueries(["artistDetail"]);
    },
    onError: () => {
    },
  });

  const createMutation = useMutation(mutateHeartArtist, {
    onSuccess: () => {
      queryClient.resetQueries(["artistDetail"]);
    },
    onError: () => {
    },
  });

  const handleOnHeartClick = () => {
    setIsHeartModalOpen((prev) => !prev);
    createMutation.mutateAsync({ artistId, isHearted });
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
              {isHearted ? <LikeFilled /> : <LikeDefault />}
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
          <ArtistHeart
            isHearted={isHearted}
            closeModal={() => {
              setIsHeartModalOpen(false);
              //window.location.reload();
            }}
          />
        </CustomModal>
        <CustomModal isOpen={isPushModalOpen}>
          <ArtistPush
            artistId={artistId}
            isAlarmed={isAlarmed}
            closeModal={() => {
              setIsPushModalOpen(false);
              //window.location.reload();
              createPushMutation.mutateAsync({ artistId, isAlarmed });
            }}
          />
        </CustomModal>
      </div>
    </header>
  );
}
