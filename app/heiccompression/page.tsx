"use client";

import { atom, useRecoilState } from "recoil";
import React, { ChangeEvent } from "react";
import heic2any from "heic2any";
import imageCompression from "browser-image-compression";

type ImageFile = File & {
  readonly type: "image/jpeg" | "image/png";
};

const fileState = atom<File | string | null>({
  key: "fileState",
  default: null,
});

const fileUrlState = atom<string>({
  key: "fileUrlState",
  default: "",
});

export default function HeicCompression() {
  const [, setFile] = useRecoilState(fileState);
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

  const handleFileOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      let file = (await e.target.files[0]) as ImageFile;

      const options = {
        maxSizeMB: 60,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: 0.5,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob
        ); // true
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        ); // smaller than maxSizeMB

        setFile(compressedFile);

        // resize된 이미지의 url을 받아 fileUrl에 저장
        const promise = imageCompression.getDataUrlFromFile(compressedFile);
        promise.then((result) => {
          setFileUrl(result);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1>1. Heic Convert </h1>

      <div className="flex flex-col items-center justify-between p-24">
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>{fileUrl && <img src={fileUrl} alt="Example" />}</div>

      <h1>2. Image Compression </h1>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg"
          id="profile_img_upload"
          onChange={handleFileOnChange}
        />

        <img className="top_bar_profile_img" src={fileUrl} alt="profile_img" />
      </div>
    </>
  );
}
