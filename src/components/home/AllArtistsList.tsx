import React from "react";
import Link from "next/link";
import "../../styles/MainPage.css";

export default function AllArtistsList() {
  return (
    <Link href="/artists" style={{display:'flex', justifyContent:'center', padding:'10px 0'}}>
      <button className="custom-button">
        전체 가수 보러가기
        <img src="/design/icon/화이트/move.svg" />
      </button>
    </Link>
  );
}
