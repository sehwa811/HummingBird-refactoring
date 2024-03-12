import { useQuery } from "@tanstack/react-query";
import { apiWithAuth } from "@/src/utils/api/instance";
import { useRouter } from "next/navigation";

export const useUser = () => {
  const router = useRouter();

  let accessToken = null;

  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  return useQuery(
    ["userInfo", accessToken],
    async () => {
      try {
        const response = await apiWithAuth().get("/user/info");

        if (response.data.status !== "SUCCESS") {
          // localStorage.removeItem("accessToken");
          return;
        }

        return response.data;
      } catch (error) {
        // localStorage.removeItem("accessToken");
        throw error;
      }
    },
    {
      enabled: !!accessToken,
      retry: false
    },
  );
};
