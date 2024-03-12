import React from 'react';
import Link from "next/link";
import '../../styles/MainPage.css'
export default function AllConcertsList() {
  return (
    <Link href="/concerts" style={{display:'flex', justifyContent:'center', margin:'20px 0'}}>
      <button className="custom-button">
        전체 공연 보러가기
        <img src="/design/icon/화이트/move.svg"/>
      </button>
    </Link>
  );
}
