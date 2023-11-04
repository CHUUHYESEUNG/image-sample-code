"use client";

import { atom, useRecoilState } from "recoil";
import React, { ChangeEvent } from "react";
import heic2any from "heic2any";
import imageCompression from "browser-image-compression";

const fileState = atom<File | string>({
    key: "fileState",
    default: "",
});

const fileNameState = atom<string>({
    key: "fileNameState",
    default: "",
});

const fileUrlState = atom<string>({
    key: "fileUrlState",
    default: "",
});

export default function HeicCompression() {
    let [imgFile, setImgFile] = useRecoilState(fileState);
    let [imgFileName, setImgFileName] = useRecoilState(fileNameState);
    let [fileUrl, setFileUrl] = useRecoilState(fileUrlState);

    const convertHeicToJpg = async (file: File) => {
        const blobResult = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.5,
        });

        console.log(blobResult);
        const fileUrl = URL.createObjectURL(blobResult); // blob파일을 URL로 변환
        console.log(`imageUrl : ${fileUrl}`);
        setFileUrl(fileUrl);

        const result: File = new File([blobResult], "convertimage.jpeg", {
            type: "image/jpeg",
            lastModified: new Date().getTime(),
        });

        setImgFileName("convertimage.jpeg");

        return result;
    };

    const removeFileName = (originalFileName: string): string => {
        // 순수 파일 확장자 return
        const lastIndex = originalFileName.lastIndexOf(".");

        if (lastIndex < 0) {
            return "";
        }

        return originalFileName.substring(lastIndex + 1).toLowerCase();
    };

    async function getFileFromPromise(
        promiseFile: Promise<File>
    ): Promise<File> {
        const promiseToFile = await promiseFile;
        return promiseToFile;
    }

    const handleFileOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === undefined) return;

        if (e.target.files && e.target.files.length > 0) {
            imgFile = e.target.files?.[0];
            imgFileName = e.target.files[0].name;
            console.log(`before compression : ${imgFileName}`);
            console.log(
                `before compression size : ${
                    e.target.files?.[0].size / 1024 / 1024
                } MB `
            );
            let fileExtension = removeFileName(imgFileName).toLowerCase();

            // heic or not
            if (fileExtension === "heic") {
                await getFileFromPromise(convertHeicToJpg(imgFile))
                    .then((file) => {
                        imgFile = file;

                        console.log(imgFile);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            // compression options
            const options = {
                maxSizeMB: 2,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                initialQuality: 0.5,
            };

            try {
                const compressedFile = await imageCompression(imgFile, options);
                setImgFile(compressedFile);
                console.log(compressedFile);
                //console.log(`after compression : ${imgFileName}`);
                console.log(
                    `after compression size : ${
                        compressedFile.size / 1024 / 1024
                    } MB`
                );

                // resize된 이미지의 url을 받아 fileUrl에 저장
                const imgPromise =
                    imageCompression.getDataUrlFromFile(compressedFile);
                imgPromise.then((result) => {
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
