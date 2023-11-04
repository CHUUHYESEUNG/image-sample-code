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
  const onPromiseTimer = () => {
    console.log("start");
    promiseTimer(1000)
      .then(function (time: any) {
        console.log("time:" + time);
        return promiseTimer(time + 1000);
      })
      .then(function (time: any) {
        console.log("time:" + time);
        return promiseTimer(time + 1000);
      })
      .then(function (time: any) {
        console.log("time:" + time);
        //return promiseTimer(time + 1000);
        console.log("end");
      });
    //console.log("end"); // start, end가 바로 나온다. timer는 비동기기 때문에 보내고 자기 일 하는 것.
  };

  const onAsyncTimer = async () => {
    console.log("start");
    let time: any = await promiseTimer(1000);
    console.log("time:" + time);
    time = await promiseTimer(time + 1000);
    console.log("time:" + time);
    time = await promiseTimer(time + 1000);
    console.log("time:" + time);
    console.log("end");
  };
  //   console.log('parent start');
  //   onAsyncTimer()     -> 현재에는 button 클릭시 실행이지만 자동 실행하려면 함수 호출
  //   console.log(onAsyncTimer());       -> Promise를 암시적으로 리턴
  //   console.log('parent end'); -> 위 케이스와 마찬가지로 parent start, end를 먼저 보내고 자신의 할 일을 한다.

  const onAsync2Timer = async () => {
    console.log("parent start");
    await onAsyncTimer();
    console.log("parent end");
  };

  const onAsync3Timer = async () => {
    console.log("parent parent start");
    onAsync2Timer().then(() => {
      console.log("parent parent end");
    });
  };

  return (
    <div>
      <button className="bg-blue-100 p-10" onClick={onPromiseTimer}>
        Promise Timer
      </button>
      <button className="bg-blue-300 p-10" onClick={onAsyncTimer}>
        Async-await Timer
      </button>
      <button className="bg-blue-400 p-10" onClick={onAsync2Timer}>
        Async-await2 Timer
      </button>
      <button className="bg-blue-500 p-10" onClick={onAsync3Timer}>
        Async-await3 Timer
      </button>
    </div>
  );
}
