import instance, { apiWithAuth } from "./instance";

//공연 등록 페이지
export const searchArtists = async (value: string) => {
  return await apiWithAuth()
    .get(`spotify/search/${value}`)
    .then((res) => res.data);
};

export const artistSaveToDb = async (artistId: string | null) => {
  return apiWithAuth()
    .post(`spotify/${artistId}`)
    .then((res) => res.data);
};

//아티스트 리스트 페이지
export const getArtistsList = (sortOption: string) =>
  instance.get(`artist?sort=${sortOption}`).then((res) => res.data);

//아티스트 디테일
export const getArtistDetail = (artistId: string) =>
  instance.get(`artist/${artistId}/`).then((res) => res.data);

export const getPerformanceOfArtist = (artistId: string, boolean: boolean) =>
  instance
    .get(`performance/artist/${artistId}?scheduled=${boolean}`)
    .then((res) => res.data);

//아티스트 좋아요
export const heartArtist = async (artistId: string, isHearted: boolean) =>
  await apiWithAuth()
    .post(`artist/${artistId}/heart?isHearted=${isHearted}`)
    .then((res) => res.data);

export const pushArtist = async (artistId: string, isHearted: boolean) =>
  await apiWithAuth()
    .post(`artist/${artistId}/alarm?isHearted=${isHearted}`)
    .then((res) => res.data);
