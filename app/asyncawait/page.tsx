"use client";

import { useEffect } from "react";

export function promiseTimer(time: number) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

export default function Asyncawait() {
  const onTimer = () => {
    promiseTimer(1000).then(function (time) {
      console.log("time:" + time);
    });
  };

  return (
    <div>
      <button className="bg-blue-100" onClick={onTimer}>
        Timer
      </button>
    </div>
  );
}
