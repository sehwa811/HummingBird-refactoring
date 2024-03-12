"use client";

import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";

import { registerServiceWorker } from "@/src/utils/common/notification";

export default async function notificationSetting() {
  const permission = await Notification.requestPermission();

  registerServiceWorker();

  return;
}
