import * as React from "react";

export default function BuilderIO() {
  return (
    <div className="flex flex-col items-center pt-8 pb-20 bg-white">
      <div className="flex gap-5 px-5 w-full max-w-[1248px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex-auto my-auto text-3xl font-medium tracking-tight leading-8 text-lime-800">
          World Peas
        </div>
        <div className="flex gap-5 justify-between items-center text-base leading-5 text-center text-black max-md:flex-wrap max-md:max-w-full">
          <div className="self-stretch my-auto">Shop</div>
          <div className="self-stretch my-auto">Newstand</div>
          <div className="self-stretch my-auto">Who we are</div>
          <div className="self-stretch my-auto">My profile</div>
          <div className="justify-center self-stretch px-6 py-4 font-semibold text-white bg-lime-800 rounded-lg max-md:px-5">
            Basket (3)
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-between items-start self-stretch px-20 pt-16 pb-8 mt-8 w-full text-black bg-white max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-wrap">
          <div className="grow text-6xl tracking-tighter leading-[76.8px] max-md:text-4xl">
            Produce
          </div>
          <div className="flex-auto self-end mt-8 text-xl leading-7">
            <span className="font-medium">Fresh</span>
            <span className="font-light"> — August 21, 2023</span>
          </div>
        </div>
        <div className="flex gap-2 mt-3.5 text-base font-semibold leading-5 text-center">
          <div className="justify-center px-4 py-3.5 text-white whitespace-nowrap bg-lime-800 rounded-3xl">
            Default
          </div>
          <div className="justify-center px-4 py-3.5 whitespace-nowrap bg-white rounded-3xl border border-solid border-stone-300">
            A-Z
          </div>
          <div className="justify-center px-5 py-3.5 bg-white rounded-3xl border border-solid border-stone-300">
            List view
          </div>
        </div>
      </div>
      <div className="px-5 mt-10 w-full max-w-[1250px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full ">
            <div className="flex flex-col grow pb-8 w-full text-xl font-semibold leading-7 rounded-3xl overflow-hidden border-2 border-solid bg-stone-50 border-neutral-200 max-md:mt-8">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/457abcd58d45a0b36d20f55592ac9c44de726b07ccc9157bb9a9ab632ffee1ae?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/457abcd58d45a0b36d20f55592ac9c44de726b07ccc9157bb9a9ab632ffee1ae?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/457abcd58d45a0b36d20f55592ac9c44de726b07ccc9157bb9a9ab632ffee1ae?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/457abcd58d45a0b36d20f55592ac9c44de726b07ccc9157bb9a9ab632ffee1ae?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/457abcd58d45a0b36d20f55592ac9c44de726b07ccc9157bb9a9ab632ffee1ae?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/457abcd58d45a0b36d20f55592ac9c44de726b07ccc9157bb9a9ab632ffee1ae?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/457abcd58d45a0b36d20f55592ac9c44de726b07ccc9157bb9a9ab632ffee1ae?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/457abcd58d45a0b36d20f55592ac9c44de726b07ccc9157bb9a9ab632ffee1ae?apiKey=4ce8508c7451461789d3c92c5a3da3ff&"
                className="w-full aspect-[1.33]"
              />
              <div className="flex flex-col self-start mt-7 ml-6 max-md:ml-2.5">
                <div className="text-black">Heirloom tomato</div>
                <div className="mt-3.5 text-lime-800">$5.99 / lb</div>
                <div className="mt-7 text-base leading-6 text-neutral-500">
                  Grown in San Juan Capistrano, CA
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow pb-8 w-full text-xl font-semibold leading-7 rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 max-md:mt-8">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1f65230af54f1daaacfa8768ba1dbc2b4f61ec5c4fadf41cdcb799c4bcc9b4b7?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1f65230af54f1daaacfa8768ba1dbc2b4f61ec5c4fadf41cdcb799c4bcc9b4b7?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1f65230af54f1daaacfa8768ba1dbc2b4f61ec5c4fadf41cdcb799c4bcc9b4b7?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1f65230af54f1daaacfa8768ba1dbc2b4f61ec5c4fadf41cdcb799c4bcc9b4b7?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1f65230af54f1daaacfa8768ba1dbc2b4f61ec5c4fadf41cdcb799c4bcc9b4b7?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1f65230af54f1daaacfa8768ba1dbc2b4f61ec5c4fadf41cdcb799c4bcc9b4b7?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1f65230af54f1daaacfa8768ba1dbc2b4f61ec5c4fadf41cdcb799c4bcc9b4b7?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1f65230af54f1daaacfa8768ba1dbc2b4f61ec5c4fadf41cdcb799c4bcc9b4b7?apiKey=4ce8508c7451461789d3c92c5a3da3ff&"
                className="w-full aspect-[1.33]"
              />
              <div className="flex flex-col self-start mt-7 ml-6 max-md:ml-2.5">
                <div className="text-black">Organic ginger</div>
                <div className="mt-2.5 text-lime-800">$12.99 / lb</div>
                <div className="mt-7 text-base leading-6 text-neutral-500">
                  Grown in Huntington Beach, CA
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow pb-8 w-full text-xl font-semibold leading-7 rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 max-md:mt-8">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0e285d51565505d015da894b673bed9e3f6edcd230e3c41175a247017869c6d3?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0e285d51565505d015da894b673bed9e3f6edcd230e3c41175a247017869c6d3?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0e285d51565505d015da894b673bed9e3f6edcd230e3c41175a247017869c6d3?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0e285d51565505d015da894b673bed9e3f6edcd230e3c41175a247017869c6d3?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0e285d51565505d015da894b673bed9e3f6edcd230e3c41175a247017869c6d3?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0e285d51565505d015da894b673bed9e3f6edcd230e3c41175a247017869c6d3?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0e285d51565505d015da894b673bed9e3f6edcd230e3c41175a247017869c6d3?apiKey=4ce8508c7451461789d3c92c5a3da3ff&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0e285d51565505d015da894b673bed9e3f6edcd230e3c41175a247017869c6d3?apiKey=4ce8508c7451461789d3c92c5a3da3ff&"
                className="w-full aspect-[1.33]"
              />
              <div className="flex flex-col self-start mt-7 ml-6 max-md:ml-2.5">
                <div className="text-black">Organic ginger</div>
                <div className="mt-2.5 text-lime-800">$12.99 / lb</div>
                <div className="mt-7 text-base leading-6 text-neutral-500">
                  Grown in Huntington Beach, CA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

