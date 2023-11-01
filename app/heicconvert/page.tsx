"use client";

import { atom, useRecoilState } from "recoil";
import React, { ChangeEvent } from "react";
import heic2any from "heic2any";

const fileUrlState = atom<string>({
  key: "fileUrlState",
  default: "",
});

export default function HeicConvert() {
  const [fileUrl, setFileUrl] = useRecoilState(fileUrlState);

  const convertHeicToJpg = async (file: File) => {
    const result = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.5,
    });

    console.log(result);

    const fileUrl = URL.createObjectURL(result); // blob파일을 URL로 변환
    console.log(`imageUrl : ${fileUrl}`);
    setFileUrl(fileUrl);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      convertHeicToJpg(file);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between p-24">
        <h1>HeicConvert</h1>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>{fileUrl && <img src={fileUrl} alt="Example" />}</div>
    </>
  );
}
