import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { BasicIpfsData } from "./api/ipfs";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BasicIpfsData[] | null>(null);

  const [note, setNote] = useState<BasicIpfsData | any>(null);
  const [file, setFile] = useState<any>("");

  const handleLoad = async () => {
    setLoading(true);
    const params = localStorage.getItem("cid");

    if (!params) {
      alert("No note or file to retrieve");
    }
    const { data } = await axios.get(`/api/ipfs?cid=${params}`);
    console.log("FRINTEND", data);
    setResult(data);
    setLoading(false);
  };

  const handleSetFileName = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
    setFile(files?.item(0)?.name);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (note && file) alert("You cant upload note and image at the same time");

    if (note !== "") {
      const { data } = await axios.post("/api/ipfs", { txt: note });
      localStorage.setItem("cid", data.path);
    } else {
      const { data } = await axios.post("/api/ipfs", { txt: file });
      localStorage.setItem("cid", data.path);
    }
    setIsLoading(false);
  };

  // avoiding ternary operators for classes
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <Head>
        <title>IPFS Notes</title>
        <meta name="description" content="IPFS Notes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <div className="flex flex-col gap-3">
          <div className="text-3xl font-bold underline">IPFS Notes</div>
          {!!result ? (
            <div className="flex flex-col">
              <span>Content: {result.content}</span>
              <span>CID: {result.cid}</span>
            </div>
          ) : null}
          <div>
            <button
              onClick={handleLoad}
              className={classNames(
                "bg-slate-300 hover:bg-slate-500 text-black rounded-md p-2 drop-shadow-md w-32",
                loading ? "animate-pulse" : ""
              )}
            >
              {loading ? "Loading..." : "Retrieve Data"}
            </button>
          </div>
        </div> */}

        <section className="w-full px-8 py-16 bg-gray-100 xl:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center md:flex-row">
              <div className="w-full space-y-5 md:w-3/5 md:pr-6">
                <div className="text-3xl font-bold underline">IPFS Notes</div>
                {!!result
                  ? result.map((data, index) => (
                      <div className="flex flex-col" key={index}>
                        <span>Content: {data.content}</span>
                        <span>CID: {data.cid}</span>
                      </div>
                    ))
                  : null}
                <div>
                  <button
                    onClick={handleLoad}
                    className={classNames(
                      "bg-slate-300 hover:bg-slate-500 text-black rounded-md p-2 drop-shadow-md w-32",
                      loading ? "animate-pulse" : ""
                    )}
                  >
                    {loading ? "Loading..." : "Retrieve Data"}
                  </button>
                </div>
              </div>

              <div className="w-full mt-16 md:mt-0 md:w-2/5">
                <div
                  className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7"
                  data-rounded="rounded-lg"
                  data-rounded-max="rounded-full"
                >
                  <h3 className="mb-6 text-2xl font-medium text-center">
                    Add Note
                  </h3>
                  <textarea
                    className="peer my-10 block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-800 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlTextarea1"
                    rows={5}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Your message"
                  ></textarea>
                  <div className="flex justify-center">
                    <div className="mb-3 w-96">
                      <label
                        htmlFor="formFile"
                        className="mb-2 inline-block text-neutral-900 dark:text-neutral-800 text-center"
                      >
                        Or Add File
                      </label>
                      <input
                        className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
                        type="file"
                        id="formFile"
                        onChange={handleSetFileName}
                      />
                    </div>
                  </div>
                  <div className="block">
                    <button
                      className="w-full px-3 py-4 font-medium text-white bg-blue-600 rounded-lg"
                      data-primary="blue-600"
                      data-rounded="rounded-lg"
                      onClick={handleSubmit}
                    >
                      {isLoading ? "Loading..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
