import React, { useRef } from "react";
import "./home.css";
import { Header, ToursView } from "../../views";
import { observer } from "mobx-react";
import { toursStore } from "../../stores/tours.store";

type Props = {};

export const Home: React.FC<Props> = observer(() => {
  const keyWordRef = useRef<HTMLInputElement>(null);
  const dateSearchRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Header />
      <main>
        <div className="main bg-cover bg-center h-[calc(100vh-72px)] relative flex justify-center items-center p-2 text-white">
          <div className="container">
            <h1 className="text-4xl md:text-6xl text-left">
              <b>Khám phá</b>
              <br />
              thành phố tuyệt vời của bạn
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mt-5">
              Tìm những địa điểm tuyệt vời để lưu trú, ăn uống, mua sắm hoặc ghé
              thăm từ các chuyên gia địa phương
            </p>
            <form className="bg-white w-[clamp(300px,100%,768px)] flex mt-5 text-black">
              <input
                ref={keyWordRef}
                className="p-5 flex-1 focus:outline-none"
                type="text"
                placeholder="Tìm kiếm tour"
              />
              {typeof toursStore.searchKeyword !== "string" ? (
                <button
                  className="p-1 w-[clamp(50px,20%,200px)] bg-red-500 text-white text-sm"
                  type="button"
                  onClick={() => {
                    if (keyWordRef.current?.value === "") return;

                    toursStore.setSearchKeyword(
                      keyWordRef.current?.value as string
                    );
                  }}
                >
                  Tìm kiếm
                </button>
              ) : (
                <button
                  className="p-1 w-[clamp(50px,20%,200px)] bg-red-500 text-white text-sm"
                  type="button"
                  onClick={() => {
                    toursStore.setSearchKeyword(undefined);
                  }}
                >
                  Reset
                </button>
              )}
            </form>
            <p className="text-lg md:text-xl text-gray-200 mt-5">
              Hoặc tìm theo thời gian
            </p>
            <form className="bg-white w-[clamp(300px,100%,768px)] flex mt-5 text-black">
              <input
                ref={dateSearchRef}
                className="p-5 flex-1 focus:outline-none"
                type="date"
              />
              {typeof toursStore.searchKeyword !== "string" ? (
                <button
                  className="p-1 w-[clamp(50px,20%,200px)] bg-red-500 text-white text-sm"
                  type="button"
                  onClick={() => {
                    if (dateSearchRef.current?.value === "") return;

                    toursStore.setSearchKeyword(
                      dateSearchRef.current?.value as string
                    );
                  }}
                >
                  Tìm kiếm
                </button>
              ) : (
                <button
                  className="p-1 w-[clamp(50px,20%,200px)] bg-red-500 text-white text-sm"
                  type="button"
                  onClick={() => {
                    toursStore.setSearchKeyword(undefined);
                  }}
                >
                  Reset
                </button>
              )}
            </form>
          </div>
        </div>
        <div id="special-offers" className="p-2 bg-gray-100">
          <div>
            <div className="mt-10 px-12">
              <p className="text-gray-500 text-xs">Ưu đãi đặc biệt</p>
              <h2 className="mt-2 text-2xl">
                Khám phá những ưu đãi <strong>hàng đầu</strong>
              </h2>
            </div>
            <ToursView />
          </div>
        </div>
      </main>
    </>
  );
});
