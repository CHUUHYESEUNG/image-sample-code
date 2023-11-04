"use client";

const timer = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

export default function Asyncawait() {
  // Promise
  timer
    .then(function () {
      console.log("작업1");
    })
    .then(function () {
      console.log("작업2");
    })
    .then(function () {
      console.log("작업3");
    });

  return <div>asyncawait</div>;
}
