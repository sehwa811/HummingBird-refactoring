import { apiWithAuth } from "./instance";

export type getHeartConcertsProps = {
  page: number;
  size: number;
  sort: string;
};

export const getHeartConcerts = (page: number, sort: string) =>
  apiWithAuth()
    .get(`performance/user/heart?page=${page}&size=6&sort=${sort}`)
    .then((res) => res.data);

export const getHeartArtists = () =>
  apiWithAuth()
    .get("/artist/heart")
    .then((res) => res.data);
