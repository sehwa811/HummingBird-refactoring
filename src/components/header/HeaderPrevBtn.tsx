"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import HeaderUserInformation from "@/src/components/header/HeaderUserInformation";
import BackButton from "../../../public/svg/BackButton.svg";

export default function HeaderPrevBtn() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="headerPrev">
      {pathname.includes("/profile") ?
        <button onClick={() => router.push("/")}>
          <BackButton />
        </button>
        :
        <button onClick={() => router.back()}>
          <BackButton />
        </button>
      }
      {pathname.includes("/profile") ? <></> : <HeaderUserInformation />}
    </header>
  );
}
