import { apiWithAuth } from "./instance";

export const userLogout = async () => await apiWithAuth().get("logout");

export const userSignout = async () => await apiWithAuth().post("user/remove");
