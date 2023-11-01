"use client";

import { atom, useRecoilState } from "recoil";
import Resizer from "react-image-file-resizer";
import { ChangeEvent } from "react";

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

export default function ReactImageFileResizer() {
  const [, setSelectedFile] = useRecoilState(fileState);
  const [previewUrl, setPreviewUrl] = useRecoilState(previewState);

  const onResizingImage = (file: File) => {
    let resizedUri;
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file" // outputType : base64, blob or file, default type is base64
      );
    });
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // 이미지 리사이징
      const file = (await e.target.files[0]) as ImageFile;

      // 파일 형식이 지원되는지 확인 (JPEG, JPG, PNG)
      const supportedFormats = ["image/jpeg", "image/png"];
      if (!supportedFormats.includes(file.type)) {
        alert(
          "지원되지 않는 이미지 형식입니다. JPEG, JPG, PNG 형식의 이미지를 업로드해주세요."
        );
        return;
      }

      const resizedImage = (await onResizingImage(file)) as ImageFile;
      //console.log(typeof resizedImage); // object
      console.log(resizedImage);

      setSelectedFile(resizedImage);

      // FileReader 객체 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        // 파일 읽기가 완료되면, 미리보기 URL을 상태에 저장
        setPreviewUrl(reader.result as string); // 원본인 것 같다.
      };
      //reader.readAsDataURL(file);             // 원본
      reader.readAsDataURL(resizedImage); // 리사이즈된 이미지
    }
  };

  const onFileUpload = () => {
    console.log("onFileUpload");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>React-image-file-resizer</h1>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>파일 업로드</button>
      </div>
      {/* <button onClick={onResizingImage}></button> */}
      {previewUrl && <img src={previewUrl} alt="preview" />}
    </div>
  );
}
