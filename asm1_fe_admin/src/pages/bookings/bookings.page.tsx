import React, { useEffect, useState } from "react";
import { Sidebar } from "../../component";
import { observer } from "mobx-react";
import { API } from "../../apis";

type Props = {};

interface Booking {
  id: number;
  nameTour: string;
  image: string;
  adults: number;
  children: number;
  createdDate: string; // You can use Date if you want to parse it as a Date object
  status: string;
  tourId: number;
  userId: number;
  username: string;
  price: number;
}

export const Bookings: React.FC<Props> = observer(() => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await API.get("/booking");
        setBookings(result.data);
      } catch (err) {
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="sb-nav-fixed">
      <Sidebar />

      <div className="p-4 sm:ml-40">
        {/* {<Paginationbookings />} */}

        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  STT
                </th>
                <th scope="col" className="px-6 py-3 w-2/12">
                  Ảnh chuyến du lịch
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên chuyến
                </th>
                <th scope="col" className="px-6 py-3">
                  Số lượng người lớn
                </th>
                <th scope="col" className="px-6 py-3">
                  Số lượng trẻ em
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày đặt
                </th>
                <th scope="col" className="px-6 py-3">
                  Tổng tiền
                </th>
                <th scope="col" className="px-6 py-3 w-3/12">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <img src={booking.image} alt={booking.nameTour} />
                  </td>
                  <td className="px-6 py-4">{booking.nameTour}</td>
                  <td className="px-6 py-4">{booking.adults}</td>
                  <td className="px-6 py-4">{booking.children}</td>
                  <td className="px-6 py-4">{booking.createdDate}</td>
                  <td className="px-6 py-4">
                    {booking.adults * (booking.price / 2) +
                      booking.children * (booking.price / 4)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        // onClick={() => handleChangebooking(booking)}
                        className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
                      >
                        Pending
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
