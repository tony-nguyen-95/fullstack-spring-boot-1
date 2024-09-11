import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../apis";
import { addDaysToDate, formatDateToDDMMYYYY, Header } from "../../views";
import authStore from "../../stores/authen.store";
import { observer } from "mobx-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ITour } from "../../stores/tours.store";

type Props = {};

export const TourDetail: React.FC<Props> = observer((props) => {
  const { tourId } = useParams<{ tourId: string }>(); // Get tourId from URL parameters
  const [tour, setTour] = useState<ITour | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [errorBooking, setErrorBooking] = useState<string | undefined>(
    undefined
  );

  const navigate = useNavigate();

  const handleSubmitBooking = (e: any) => {
    e.preventDefault();
    setErrorBooking(undefined);

    if (adults === 0 && children === 0) {
      return setErrorBooking("Số lượng người không được bằng 0");
    }

    API.post("/booking", {
      userId: authStore.userLogined?.id,
      tourId: tour?.id,
      adults,
      children,
    }).then((result) => {
      if (result.data) {
        const sweetAlert = withReactContent(Swal);

        sweetAlert.fire({
          title: <p>Đặt tour thành công!</p>,
          timer: 800,
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const result = await API.get(`/tours`);
        setTour(
          result.data.find(
            (_tour: ITour) => _tour.id === parseInt(tourId || "")
          )
        );
      } catch (err) {
        setError("Failed to load tour details.");
      } finally {
        setLoading(false);
      }
    };

    if (tourId) {
      fetchTour();
    }
  }, [tourId]); // Dependency array includes tourId

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />
      {tour ? (
        <>
          <main className="mt-4 container p-2 md:p-10">
            <img
              src={tour.image}
              alt={tour.name}
              className="aspect-[2] object-cover"
            />
            <div className="text-sm text-gray-400 mt-4">
              từ {formatDateToDDMMYYYY(new Date(tour.startDate))} tới{" "}
              {addDaysToDate(tour.startDate, tour.durationDay)}
            </div>
            <div className="text-3xl mt-2">{tour.name}</div>
            <div className="text-cyan-400 text-2xl my-2">{tour.price} VND</div>
            <div className="flex items-center">
              <div className="flex items-center">
                <i className="fa-solid fa-map" style={{ color: "#ff793b" }} />
                <div className="ml-2 text-sm text-gray-400">{tour.place}</div>
              </div>
              <div className="flex items-center ml-4">
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
            <p
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: tour.description }}
            />
            {authStore.isLogin ? (
              <div id="booking" className="mt-8">
                <h2 className="text-lg font-bold">Đặt tour</h2>
                <form
                  onSubmit={handleSubmitBooking}
                  className="mt-4"
                  id="booking"
                >
                  <div className="flex items-center mt-2 w-full flex-col md:flex-row">
                    {errorBooking && (
                      <h5 className="text-red-400 text-base">{errorBooking}</h5>
                    )}
                    <div className="flex items-start flex-col flex-1 w-full">
                      <label htmlFor="adults" className="text-zinc-400">
                        Người lớn ({tour.price / 2} VND / người)
                      </label>
                      <input
                        type="number"
                        name="adults"
                        id="adults"
                        className="w-full p-2 border focus:outline-none mt-1"
                        value={adults}
                        onChange={(e: any) =>
                          setAdults(parseInt(e.target.value))
                        }
                        required
                      />
                    </div>
                    <div className="flex items-start flex-col flex-1 w-full md:ml-4">
                      <label htmlFor="child" className="text-zinc-400">
                        Trẻ em ({tour.price / 4} VND / người)
                      </label>
                      <input
                        type="number"
                        name="child"
                        id="child"
                        className="w-full p-2 border focus:outline-none mt-1"
                        value={children}
                        onChange={(e: any) =>
                          setChildren(parseInt(e.target.value))
                        }
                        required
                      />
                    </div>
                  </div>
                  <button
                    className="my-4 p-2 w-full bg-red-500 text-white text-base font-semibold"
                    type="submit"
                  >
                    Đặt tour
                  </button>
                </form>
              </div>
            ) : (
              <button
                className="my-4 p-2 w-full bg-red-500 text-white text-base font-semibold"
                onClick={() => navigate("/login")}
              >
                Đăng nhập để đặt vé
              </button>
            )}
          </main>
        </>
      ) : (
        <div>Tour not found</div>
      )}
    </div>
  );
});
