import React, { useEffect } from "react";
import { Sidebar, TourForm } from "../../component";
import { observer } from "mobx-react";
import { ITour, toursStore, IFormTour, tourFormStore } from "../../stores";
import { PaginationTours } from "../../component/pagination-tours";

type Props = {};

export const formatDateToDDMMYYYY = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const addDaysToDate = (dateString: string, days: number) => {
  const date = new Date(dateString);

  date.setDate(date.getDate() + days);

  return formatDateToDDMMYYYY(date);
};

export const Tours: React.FC<Props> = observer(() => {
  const handleChangeTour = (updatedTour: Partial<ITour>) => {
    Object.entries(updatedTour).forEach(([key, value]) => {
      tourFormStore.setField(
        key as keyof IFormTour,
        value as IFormTour[keyof IFormTour]
      );
    });

    tourFormStore.setTypeOfForm("update");
  };

  useEffect(() => {
    toursStore.getTours();
  }, []);

  return (
    <div className="sb-nav-fixed">
      <Sidebar />

      <div className="p-4 sm:ml-40">
        <div className="flex flex-wrap justify-between items-start">
          <div>
            <button
              type="button"
              onClick={() => {
                tourFormStore.resetForm();
                tourFormStore.setTypeOfForm("add");
              }}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Add New Tour
            </button>
          </div>
        </div>

        {tourFormStore.typeOfForm && <TourForm />}

        {<PaginationTours />}

        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 w-2/12">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Gía (VND)
                </th>
                <th scope="col" className="px-6 py-3">
                  Ảnh mô tả
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày bắt đầu
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày kết thúc
                </th>
                <th scope="col" className="px-6 py-3">
                  Địa chỉ
                </th>
                <th scope="col" className="px-6 py-3 w-3/12">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {toursStore.paginatedTours.map((tour, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {tour.name}
                  </th>
                  {/* <td className="px-6 py-4">{tour.description}</td> */}
                  <td className="px-6 py-4">{tour.price}</td>
                  <td className="px-6 py-4">
                    <div>
                      <img src={tour.image} alt={tour.name} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {formatDateToDDMMYYYY(new Date(tour.startDate))}
                  </td>
                  <td className="px-6 py-4">
                    {addDaysToDate(tour.startDate, tour.durationDay)}
                  </td>
                  <td className="px-6 py-4">{tour.place}</td>
                  <td className="px-6 py-4">
                    <span className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleChangeTour(tour)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          Object.entries(tour).forEach(([key, value]) => {
                            return tourFormStore.setField(
                              key as keyof IFormTour,
                              value as IFormTour[keyof IFormTour]
                            );
                          });
                          tourFormStore.setTypeOfForm("detail");
                        }}
                        type="button"
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          Object.entries(tour).forEach(([key, value]) => {
                            tourFormStore.setField(
                              key as keyof IFormTour,
                              value as IFormTour[keyof IFormTour]
                            );
                          });
                          // open confirm delete
                          tourFormStore.setTypeOfForm("delete");
                        }}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
