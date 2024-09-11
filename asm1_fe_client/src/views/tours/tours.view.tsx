import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { toursStore } from "../../stores/tours.store";

type Props = {};

export const formatDateToDDMMYYYY = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const addDaysToDate = (dateString: number, days: number) => {
  const date = new Date(dateString);

  date.setDate(date.getDate() + days);

  return formatDateToDDMMYYYY(date);
};

export const ToursView: React.FC<Props> = observer((props) => {
  useEffect(() => {
    toursStore.fetchTours();
  }, []);

  return (
    <div
      id="offers"
      className="my-10 lg:mx-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {toursStore.displayTour.map((tour, index) => {
        return (
          <a
            key={tour.id}
            href={`tours/${tour.id}`}
            className="border drop-shadow-md rounded-md cursor-pointer bg-white overflow-hidden transition-transform hover:-translate-y-1"
          >
            <img
              className="w-full h-[200px] object-cover"
              src={tour.image}
              alt={tour.name}
            />
            <div className="p-2 h-[calc(100%-200px)] flex flex-col">
              <div className="flex justify-between items-start">
                <div className="max-w-[70%] break-words">
                  <div className="text-lg">{tour.name}</div>
                  <div className="flex items-center">
                    <div>
                      <i
                        className="fa-solid fa-star fa-xs"
                        style={{ color: "#ffd43b" }}
                      />
                      <i
                        className="fa-solid fa-star fa-xs ml-1"
                        style={{ color: "#ffd43b" }}
                      />
                      <i
                        className="fa-solid fa-star fa-xs ml-1"
                        style={{ color: "#ffd43b" }}
                      />
                      <i
                        className="fa-solid fa-star fa-xs ml-1"
                        style={{ color: "#ffd43b" }}
                      />
                      <i
                        className="fa-solid fa-star fa-xs ml-1"
                        style={{ color: "#ffd43b" }}
                      />
                    </div>
                    <div className="text-xs ml-2">15 views</div>
                  </div>
                </div>
                <div className="text-cyan-400">
                  {tour.price}
                  <br />
                  VND
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-4">
                từ {formatDateToDDMMYYYY(new Date(tour.startDate))} tới{" "}
                {addDaysToDate(tour.startDate, tour.durationDay)}
              </div>
              <hr className="my-4" />
              <div className="flex items-end justify-between mt-auto">
                <div className="flex items-end">
                  <i
                    className="fa-regular fa-map"
                    style={{ color: "#bababa" }}
                  />
                  <div className="ml-2 text-xs text-gray-400">{tour.place}</div>
                </div>
                <div className="ml-4">
                  <button
                    className="p-1 text-xs bg-lime-500 text-white rounded-sm min-w-16"
                    type="button"
                  >
                    Đặt ngay
                  </button>
                </div>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
});
