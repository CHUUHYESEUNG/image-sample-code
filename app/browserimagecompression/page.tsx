"use client";

import { atom, useRecoilState } from "recoil";
import Resizer from "react-image-file-resizer";
import { ChangeEvent } from "react";
import imageCompression from "browser-image-compression";

type ImageFile = File & {
  readonly type: "image/jpeg" | "image/png";
};

const fileState = atom<File | string | null>({
  key: "fileState",
  default: null,
});

const previewState = atom<string | null>({
  key: "previewState",
  default: null,
});

const fileUrlState = atom<string>({
  key: "fileUrlState",
  default: "",
});

export default function ReactImageFileResizer() {
  const [, setFile] = useRecoilState(fileState);
  const [fileUrl, setFileUrl] = useRecoilState(fileUrlState);

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
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Browser Image Compression</h1>
      <input
        type="file"
        accept="image/jpg,image/png,image/jpeg"
        id="profile_img_upload"
        onChange={handleFileOnChange}
      />
      {/* 
        <label for="profile_img_upload">
          <img src={camera} alt="camera" />
        </label> */}

      <img className="top_bar_profile_img" src={fileUrl} alt="profile_img" />
    </div>
  );
}
