import { apiWithAuth } from "./instance";

export const postDeviceToken = async (deviceToken: string) =>
  await apiWithAuth()
    .post(`user/fcm-token?token=${deviceToken}`)
    .then((res) => res.data);

export const postConcertPush = async (data: {
  performanceId: number;
  beforeTime: number;
}) =>
  await apiWithAuth()
    .post("/notification", data)
    .then((res) => res.data);

export const heartConcert = async (performanceId: number, isHearted: boolean) =>
  await apiWithAuth()
    .post(`performance/${performanceId}/heart?isHearted=${isHearted}`)
    .then((res) => res.data);
