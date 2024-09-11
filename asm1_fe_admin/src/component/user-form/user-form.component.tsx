import React from "react";
import { ERole, userFormStore } from "../../stores/user-form.store";
import { observer } from "mobx-react";

type Props = {};

export const UserForm: React.FC<Props> = observer(() => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    userFormStore.setField(
      e.target.name as keyof typeof userFormStore.formData,
      e.target.value
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userFormStore.typeOfForm === "update") {
      userFormStore.updateUser();
    } else {
      userFormStore.submitAddForm();
    }
  };

  return (
    <div className="my-3">
      <h1 className="text-left">
        {userFormStore.typeOfForm?.toUpperCase()} USER
      </h1>
      {userFormStore.typeOfForm === "delete" ? (
        <div className="w-full border-2 p-4 rounded-md flex flex-wrap">
          <h2>
            Bạn có chắc muốn xoá người dùng: {userFormStore.formData.username} ?
          </h2>
          <div className="w-full flex flex-wrap justify-between">
            <button
              type="button"
              onClick={() => {
                userFormStore.resetForm();
              }}
              className="w-[48%] text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              CANCEL
            </button>
            <button
              type="button"
              onClick={() => {
                userFormStore.deleteUser();
              }}
              className="w-[48%] text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {userFormStore.typeOfForm?.toUpperCase()}
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
              name="fullname"
              id="fullname"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={userFormStore.formData.fullname}
              onChange={handleChange}
              disabled={userFormStore.typeOfForm === "detail"}
            />
            <label
              htmlFor="fullname"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Họ và tên
            </label>
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <input
              type="email"
              name="email"
              id="email"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={userFormStore.formData.email}
              onChange={handleChange}
              disabled={
                userFormStore.typeOfForm === "update" ||
                userFormStore.typeOfForm === "detail"
              }
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Email
            </label>
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={userFormStore.formData.phoneNumber}
              onChange={handleChange}
              disabled={userFormStore.typeOfForm === "detail"}
            />
            <label
              htmlFor="phoneNumber"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Số điện thoại
            </label>
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <input
              type="text"
              name="address"
              id="address"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={userFormStore.formData.address}
              onChange={handleChange}
              disabled={userFormStore.typeOfForm === "detail"}
            />
            <label
              htmlFor="address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Địa chỉ
            </label>
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <input
              type="text"
              name="username"
              id="username"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={userFormStore.formData.username}
              onChange={handleChange}
              disabled={
                userFormStore.typeOfForm === "update" ||
                userFormStore.typeOfForm === "detail"
              }
            />
            <label
              htmlFor="username"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Tài khoản
            </label>
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <input
              type="password"
              name="password"
              id="password"
              className="block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={userFormStore.formData.password}
              onChange={handleChange}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Mật khẩu
            </label>
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <label
              htmlFor="roleId"
              className=" disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block mb-2 text-sm text-gray-400"
            >
              Vai trò
            </label>
            <select
              name="roleId"
              id="roleId"
              value={userFormStore.formData.roleId}
              onChange={handleChange}
              disabled={userFormStore.typeOfForm === "detail"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={ERole.admin}>Admin</option>
              <option value={ERole.user}>User</option>
            </select>
          </div>

          <div className="w-full flex flex-wrap justify-between">
            <button
              type="button"
              onClick={() => {
                userFormStore.resetForm();
              }}
              className="w-[48%] text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="w-[48%] text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {userFormStore.typeOfForm?.toUpperCase()}
            </button>
          </div>
        </form>
      )}
    </div>
  );
});
