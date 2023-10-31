import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-24 space-y-12 items-center justify-center">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold"> Image Resizing Sample </h1>
        <div className="flex flex-col space-y-2">
          <Link
            className="text-blue-500 hover:underline"
            href="/reactimagefileresizer"
          >
            1. React-image-file-resizer
          </Link>
          <Link
            className="text-blue-500 hover:underline"
            href="/browserimagecompression"
          >
            2. Browser-image-compression
          </Link>
          <Link className="text-blue-500 hover:underline" href="/heicconvert">
            3. Heic-Convert
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
  );
}
