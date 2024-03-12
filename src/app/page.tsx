"use client";

import CarouselPosts from "@/src/components/home/CarouselPosts";
import MainConcertsPosts from "@/src/components/home/MainConcertsPosts";
import ArtistsCarousel from "@/src/components/home/ArtistsCarousel";
import AllConcertsList from "@/src/components/home/AllConcertsList";
import AllArtistsList from "@/src/components/home/AllArtistsList";
import "../styles/MainPage.css";
import Header from "@/src/components/header/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainPage from "@/src/components/common/MainPage";
import { getToken } from "firebase/messaging";

//import { messaging } from "@/src/core/notification/settingFCM";
import { registerServiceWorker } from "../utils/common/notification";
import { useMutation } from "@tanstack/react-query";
import { postDeviceToken } from "../utils/api/pushNotification.api";

type AppCheckTokenResult = {
  token: string;
};

export default function Page() {
  const router = useRouter();

  /* const { mutate: createMutation } = useMutation(postDeviceToken, {
    onSuccess: () => console.log("device token 전송 성공"),
    onError: () => console.log("device token 전송 에러"),
  });

  async function getDeviceToken() {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    });
    await createMutation(token);
  }

  async function notificationSetting() {
    const permission = await Notification.requestPermission();

    registerServiceWorker();
    getDeviceToken();
    return;
  } */

  useEffect(() => {
    const proceedWithoutLogin = localStorage.getItem("proceedWithoutLogin");
    const accessToken = localStorage.getItem("accessToken");

    if (proceedWithoutLogin !== "true" && !accessToken) {
      router.push("/login");
    }

    //notificationSetting();
  }, [router]);

  return (
      <MainPage />
  );
}
