"use client";
import Link from "next/link";
import HeaderUserInformation from "@/src/components/header/HeaderUserInformation";

export default function Header() {
  return (
    <header className="myHeader">
      <Link href="/">
        <img
          src="/design/CI/Symbol_navy.svg"
          alt="header home"
          className="h-7 w-auto"
        />
      </Link>
      <HeaderUserInformation />
    </header>
  );
}
