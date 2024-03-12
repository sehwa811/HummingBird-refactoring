"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const hostname = window.location.hostname
    console.log(hostname)
  });

  return (
    <div>
    </div>
  )
}
