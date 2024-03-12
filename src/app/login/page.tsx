"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    const proceedWithoutLogin = localStorage.getItem("proceedWithoutLogin");
    if (proceedWithoutLogin === "true") {
      localStorage.removeItem("proceedWithoutLogin");
    }
  });

  const router = useRouter();

  const handleKakaoLogin = () => {
    router.push("http://api.hummingbird.kr:8080/oauth2/authorization/kakao");
  };

  return (
    <div className="bg-black h-screen flex flex-col items-center">
      <div className="relative max-w-sm top-16 pb-4">
        <img
          src="/design/illustration/humming%20bird.svg"
          alt="Hummingbird text"
          className="pl-5 pb-14"
        />
        <img
          src="/design/illustration/Onboarding%20page.svg"
          alt="Hummingbird onboarding"
          className="w-full pb-10"
        />
      </div>

      {/*로그인*/}
      <div className="flex flex-col relative w-full p-4 gap-3">
        <button
          onClick={handleKakaoLogin}
          className="flex bg-yellow-300 rounded-full px-6 py-2 items-center"
        >
          <img src="/design/Logo/logo_kakao.svg" alt="kakao logo" />
          <span className="text-base w-full pr-6">카카오 로그인</span>
        </button>

        {/*<button*/}
        {/*  onClick={handleKakaoLogin}*/}
        {/*  className="rounded-full px-6 py-2 flex justify-center items-center"*/}
        {/*  style={{ background: "#ececec" }}*/}
        {/*>*/}
        {/*  <img src="/design/Logo/logo_google.svg" alt="google logo" />*/}
        {/*  <span className="text-base w-full font-bold">구글 로그인</span>*/}
        {/*</button>*/}

        <p
          className="text-white text-center cursor-pointer pt-5"
          onClick={() => {
            localStorage.setItem("proceedWithoutLogin", "true");
            router.push("/");
          }}
        >
          로그인 없이 진행 할게요
        </p>
      </div>
    </div>
  );
}
