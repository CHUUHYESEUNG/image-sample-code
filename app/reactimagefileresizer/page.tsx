"use client";

import { atom, useRecoilState } from "recoil";
import Resizer from "react-image-file-resizer";
import { ChangeEvent } from "react";

const fileState = atom<File | null>({
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

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // 이미지 리사이징

      setSelectedFile(e.target.files[0]);

      // FileReader 객체 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        // 파일 읽기가 완료되면, 미리보기 URL을 상태에 저장
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
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
      {previewUrl && <img src={previewUrl} alt="preview" width="100" />}
    </div>
  );
}
