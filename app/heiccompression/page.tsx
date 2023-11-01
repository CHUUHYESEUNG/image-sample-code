"use client";

import { atom, useRecoilState } from "recoil";
import React, { ChangeEvent } from "react";
import heic2any from "heic2any";
import imageCompression from "browser-image-compression";

const ALLOW_FILE_EXTENSION = "jpg, jpeg, png, heic"; // 허용 가능한 확장자

type ImageFile = File & {
  readonly type: "image/jpeg" | "image/png" | "image/heic";
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
  const [file, setFile] = useRecoilState(fileState);
  const [fileUrl, setFileUrl] = useRecoilState(fileUrlState);

  const convertHeicToJpg = async (file: File) => {
    const result = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.5,
    });

    //setFile(result);

    console.log(result);

    const fileUrl = URL.createObjectURL(result); // blob파일을 URL로 변환
    console.log(`imageUrl : ${fileUrl}`);
    setFileUrl(fileUrl);
  };

  const removeFileName = (originalFileName: string): string => {
    // 순수 파일 확장자 return
    const lastIndex = originalFileName.lastIndexOf(".");

    if (lastIndex < 0) {
      return "";
    }

    return originalFileName.substring(lastIndex + 1).toLowerCase();
  };

  const handleFileOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // 들어온 파일의 확장자가 heic이냐 아니냐로 구분
    // 만약 heic, jpg, png, jpeg가 아니라면 제대로 된 파일 달라고 유효성 검사 해야함.
    // heic이냐 아니냐에 따라 분기 처리
    // 사진 최대 용량 2MB 언더

    if (e.target.files === undefined) return;

    if (e.target.files && e.target.files.length > 0) {
      let file = (await e.target.files[0]) as ImageFile;
      let fileName = await e.target.files[0].name;

      let fileExtension = removeFileName(fileName).toLowerCase();
      if (fileExtension === "heic") {
        // Heic to jpg
        //let file = e.target.files?.[0];
        //if (file) {
        //setFile(convertHeicToJpg(file));
        // convertHeicToJpg(file) 반환값이 promise<void> 객체여서 setFile 인자 타입과 Sync 맞춰야 한다.
        //}
      }

      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: 0.5,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob
        );
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        );

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
      <div className="flex flex-col items-center justify-between p-24">
        <h1>Heic Convert to Image Compression</h1>
        <input
          type="file"
          accept=".jpg,.png,.jpeg,.heic"
          id="profile_img_upload"
          onChange={handleFileOnChange}
        />
      </div>
      <div>{fileUrl && <img src={fileUrl} />}</div>
    </>
  );
}
