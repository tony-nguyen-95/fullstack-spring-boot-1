import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { tourFormStore } from "../../stores/tour-form.store";

const formatDateYYYYMMDD = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

type Props = {};

export const TourForm: React.FC<Props> = observer(() => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    tourFormStore.setField(
      e.target.name as keyof typeof tourFormStore.formData,
      e.target.value
    );
  };

  const handleDescriptionChange = (event: any, editor: any) => {
    const data = editor.getData();
    tourFormStore.setField("description", data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (tourFormStore.typeOfForm === "update") {
      tourFormStore.updateTour();
    } else {
      tourFormStore.submitAddForm();
    }
  };

  return (
    <div className="my-3">
      <h1 className="text-left">
        {tourFormStore.typeOfForm?.toUpperCase()} TOUR
      </h1>
      {tourFormStore.typeOfForm === "delete" ? (
        <div className="w-full border-2 p-4 rounded-md flex flex-wrap">
          <h2>
            Are you sure you want to delete the tour:{" "}
            {tourFormStore.formData.name}?
          </h2>
          <div className="w-full flex flex-wrap justify-between">
            <button
              type="button"
              onClick={() => {
                tourFormStore.resetForm();
              }}
              className="w-[48%] text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              CANCEL
            </button>
            <button
              type="button"
              onClick={() => {
                tourFormStore.deleteTour();
              }}
              className="w-[48%] text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {tourFormStore.typeOfForm?.toUpperCase()}
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full border-2 p-4 rounded-md flex flex-wrap"
        >
          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <input
              type="text"
              name="name"
              id="name"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={tourFormStore.formData.name}
              onChange={handleChange}
              disabled={tourFormStore.typeOfForm === "detail"}
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Tour Name
            </label>
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <input
              type="text"
              name="image"
              id="image"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={tourFormStore.formData.image}
              onChange={handleChange}
              disabled={tourFormStore.typeOfForm === "detail"}
            />
            <label
              htmlFor="image"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Image Source
            </label>
          </div>

          <div className="relative z-0 w-full pr-4 mb-5 group text-left">
            <label
              htmlFor="description"
              className="block mb-2 text-sm text-gray-400"
            >
              Description
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={tourFormStore.formData.description}
              onChange={handleDescriptionChange}
              disabled={tourFormStore.typeOfForm === "detail"}
            />
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={
                tourFormStore.typeOfForm === "update" ||
                tourFormStore.typeOfForm === "detail"
                  ? formatDateYYYYMMDD(
                      new Date(tourFormStore.formData.startDate)
                    )
                  : tourFormStore.formData.startDate
              }
              onChange={handleChange}
              disabled={tourFormStore.typeOfForm === "detail"}
            />
            <label
              htmlFor="startDate"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Start Date
            </label>
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <input
              type="number"
              name="durationDay"
              id="durationDay"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={tourFormStore.formData.durationDay}
              onChange={handleChange}
              disabled={tourFormStore.typeOfForm === "detail"}
            />
            <label
              htmlFor="durationDay"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Duration (Days)
            </label>
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <input
              type="number"
              name="price"
              id="price"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={tourFormStore.formData.price}
              onChange={handleChange}
              disabled={tourFormStore.typeOfForm === "detail"}
            />
            <label
              htmlFor="price"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-
              8"
            >
              Price
            </label>
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <input
              type="text"
              name="place"
              id="place"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={tourFormStore.formData.place}
              onChange={handleChange}
              disabled={tourFormStore.typeOfForm === "detail"}
            />
            <label
              htmlFor=""
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Place
            </label>
          </div>

          <div className="w-full flex flex-wrap justify-between">
            <button
              type="button"
              onClick={() => {
                tourFormStore.resetForm();
              }}
              className="w-[48%] text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={tourFormStore.typeOfForm === "detail"}
              className="w-[48%] text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {tourFormStore.typeOfForm?.toUpperCase()}
            </button>
          </div>
        </form>
      )}
    </div>
  );
});
