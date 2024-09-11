import { observer } from "mobx-react";
import React from "react";
import authStore from "../../stores/authen.store";

type Props = {};

export const Header: React.FC<Props> = observer((props) => {
  return (
    <header className="bg-red-100 sticky top-0 z-10 flex justify-center items-center">
      <div className="py-3 px-4 container flex justify-between items-center">
        <a href="/" className="uppercase text-xl font-bold">
          TOUR BOOKING
        </a>
        <nav className="flex items-center">
          <a className="hover:opacity-70 transition-opacity" href="/">
            Home
          </a>
          <a className="hover:opacity-70 transition-opacity ml-6" href="/tours">
            Booking
          </a>
          <a className="hover:opacity-70 transition-opacity ml-6" href="/posts">
            News
          </a>
          {authStore.isLogin ? (
            <div className="px-4 flex flex-wrap items-center">
              <h4>Chào, {authStore.userLogined?.username}</h4>
              <button
                onClick={() => authStore.logout()}
                className="hover:opacity-70 transition-opacity ml-3 bg-black text-white p-3 rounded-md"
              >
                Đăng Xuất
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1">
              <a
                className="hover:opacity-70 transition-opacity ml-6 bg-black text-white p-3 rounded-md"
                href="/login"
              >
                Đăng Nhập
              </a>
              <a
                className="hover:opacity-70 transition-opacity ml-6 bg-black text-white p-3 rounded-md"
                href="/register"
              >
                Đăng Kí
              </a>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
});
