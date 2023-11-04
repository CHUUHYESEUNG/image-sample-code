"use client";

import React, { useRef } from "react";
import { atom, useRecoilState } from "recoil";
import ReactSignatureCanvas from "react-signature-canvas";
import "./style.css";

const isSignState = atom<boolean>({
  key: "isSignState",
  default: false,
});

const isSignUrlState = atom<string | null>({
  key: "isSignUrlState",
  default: null,
});

export default function Signature() {
  const signCanvas = useRef<any>(null);
  const [isSigned, setIsSigned] = useRecoilState(isSignState);
  const [isSignUrl, setIsSignUrl] = useRecoilState(isSignUrlState);

  const save = () => {
    const savedSignImageUrl = signCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    if (savedSignImageUrl) setIsSignUrl(savedSignImageUrl);
    // Download
    const link = document.createElement("a");
    link.href = savedSignImageUrl;
    link.download = "sign_image.png";
    link.click();
  };

  const clear = () => {
    signCanvas.current.clear();
    setIsSigned(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Signature Canvas Test</h1>
      <div>
        <ReactSignatureCanvas
          ref={signCanvas}
          canvasProps={{
            className: "signCanvas canvasStyle",
          }}
          clearOnResize={false}
          backgroundColor="rgb(230, 230, 230)"
          onBegin={() => {
            setIsSigned(true);
          }}
        />
      </div>
      <button onClick={() => clear()}>clear</button>
      <button disabled={!isSigned} onClick={() => save()}>
        save
      </button>
      {isSignUrl ? <img className={"signImage"} src={isSignUrl} /> : null}
    </div>
  );
}
