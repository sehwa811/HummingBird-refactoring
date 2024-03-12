"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect} from "react";
import { useRouter } from "next/navigation";

export default function loginSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("code");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken.toString());
      // alert("로그인z 성공!");
      // router.push("/");
    }
  }, []);

  return (
    <>
    </>
  );
}
