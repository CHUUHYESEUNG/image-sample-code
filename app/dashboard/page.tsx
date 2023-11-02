"use client";

import Link from "next/link";
import { RecoilRoot } from "recoil";

export default async function Dashboard() {
  return (
    <RecoilRoot>
      <div className="flex min-h-screen flex-col items-center justify-between">
        <h1>Dashboard</h1>

        <main className="flex flex-col min-h-screen space-y-12 items-center justify-center">
          <section className="space-y-4">
            <h1 className="text-4xl font-bold"> Image Resizing Sample </h1>
            <div className="flex flex-col space-y-2">
              {/* <Link
                className="text-blue-500 hover:underline"
                href="/reactimagefileresizer"
              >
                1. React-image-file-resizer
              </Link> */}
              <Link
                className="text-blue-500 hover:underline"
                href="/browserimagecompression"
              >
                2. Browser-image-compression
              </Link>
              <Link
                className="text-blue-500 hover:underline"
                href="/heicconvert"
              >
                3. Heic-Convert
              </Link>
              <Link
                className="text-blue-500 hover:underline"
                href="/heiccompression"
              >
                4. Heic-Convert to Browser-image-compression
              </Link>
            </div>
          </section>
          <hr />
          <section className="space-y-4">
            <h1 className="text-4xl font-bold"> Free Drawing </h1>
            <Link className="text-blue-500 hover:underline" href="/signature">
              1. react-signature-canvas
            </Link>
          </section>
          <hr />
          <section className="space-y-4">
            <h1 className="text-4xl font-bold"> React + S3 </h1>
            <Link className="text-blue-500 hover:underline" href="/awssdk">
              1. aws-sdk
            </Link>
          </section>
        </main>
      </div>
    </RecoilRoot>
  );
}
