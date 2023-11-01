"use client";

import React, { ChangeEvent } from "react";
import heic2any from "heic2any";

export default function HeicConvert() {
  const convertHeicToJpg = async (file: File) => {
    const result = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.5,
    });

    console.log(result);

    const url = URL.createObjectURL(result);
    //console.log(url);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      convertHeicToJpg(file);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>HeicConvert</h1>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}
