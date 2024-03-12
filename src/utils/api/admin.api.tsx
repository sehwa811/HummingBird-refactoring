import  { apiWithAuth } from "./instance";

export const postPerformance = async (data: FormData) => {
  return apiWithAuth()
    .post("performance/", data)
    .then((res) => res.data);
};
