import React from "react";
import { observer } from "mobx-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { postFormStore } from "../../stores";

type Props = {};

export const PostForm: React.FC<Props> = observer(() => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    postFormStore.setField(
      e.target.name as keyof typeof postFormStore.formData,
      e.target.value
    );
  };

  const handleDescriptionChange = (event: any, editor: any) => {
    const data = editor.getData();
    postFormStore.setField("description", data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (postFormStore.typeOfForm === "update") {
      postFormStore.updatePost();
    } else {
      postFormStore.submitAddForm();
    }
  };

  return (
    <div className="my-3">
      <h1 className="text-left">
        {postFormStore.typeOfForm?.toUpperCase()} POST
      </h1>
      {postFormStore.typeOfForm === "delete" ? (
        <div className="w-full border-2 p-4 rounded-md flex flex-wrap">
          <h2>
            Bạn có chắc muốn xoá bài viết này: {postFormStore.formData.name}?
          </h2>
          <div className="w-full flex flex-wrap justify-between">
            <button
              type="button"
              onClick={() => {
                postFormStore.resetForm();
              }}
              className="w-[48%] text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              CANCEL
            </button>
            <button
              type="button"
              onClick={() => {
                postFormStore.deletePost();
              }}
              className="w-[48%] text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {postFormStore.typeOfForm?.toUpperCase()}
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
              value={postFormStore.formData.name}
              onChange={handleChange}
              disabled={postFormStore.typeOfForm === "detail"}
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Post Title
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
              data={postFormStore.formData.description}
              onChange={handleDescriptionChange}
              disabled={postFormStore.typeOfForm === "detail"}
            />
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <input
              type="text"
              name="image"
              id="image"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={postFormStore.formData.image}
              onChange={handleChange}
              disabled={postFormStore.typeOfForm === "detail"}
            />
            <label
              htmlFor="image"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Image
            </label>
          </div>

          <div className="w-full flex flex-wrap justify-between">
            <button
              type="button"
              onClick={() => {
                postFormStore.resetForm();
              }}
              className="w-[48%] text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={postFormStore.typeOfForm === "detail"}
              className="w-[48%] text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {postFormStore.typeOfForm?.toUpperCase()}
            </button>
          </div>
        </form>
      )}
    </div>
  );
});
