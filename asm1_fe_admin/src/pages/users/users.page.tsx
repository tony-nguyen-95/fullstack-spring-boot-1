import React, { useEffect, useMemo, useState } from "react";
import { Pagination, Sidebar, UserForm } from "../../component";
import { observer } from "mobx-react";
import { IFormUser, userFormStore, IUser, usersStore } from "../../stores";

type Props = {};

export const Users: React.FC<Props> = observer(() => {
  const [searchString, setSearchString] = useState<string>("");

  const [isOnSearch, setIsOnSearch] = useState(false);

  const displayUsers: IUser[] = useMemo(() => {
    if (!isOnSearch) {
      return usersStore.paginatedUsers;
    }

    return usersStore.users.filter(
      (user) =>
        user.email.toLowerCase().includes(searchString.toLowerCase()) ||
        user.phoneNumber.toLowerCase().includes(searchString.toLowerCase())
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersStore.paginatedUsers, isOnSearch, searchString]);

  const handleChangeStatusUser = (
    updatedUser: Partial<IFormUser>,
    isOnlyStatus: boolean = false
  ) => {
    Object.entries(updatedUser).forEach(([key, value]) => {
      userFormStore.setField(
        key as keyof IFormUser,
        value as IFormUser[keyof IFormUser]
      );
    });

    if (isOnlyStatus) {
      userFormStore.updateStatusUser();
      userFormStore.updateUser();
    } else {
      userFormStore.setTypeOfForm("update");
    }
  };

  useEffect(() => {
    usersStore.getUser();
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
                userFormStore.resetForm();
                userFormStore.setTypeOfForm("add");
              }}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Thêm mới
            </button>
          </div>

          <form className="w-1/2">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search users by Phone or Email, ..."
                value={searchString}
                onChange={(e: any) => {
                  setSearchString(e.target.value);
                }}
              />
              {isOnSearch ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchString("");
                    setIsOnSearch(false);
                  }}
                  className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsOnSearch(true);
                  }}
                  className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              )}
            </div>
          </form>
        </div>

        {userFormStore.typeOfForm && <UserForm />}

        {!isOnSearch && <Pagination />}

        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 w-2/12">
                  Họ tên
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Số điện thoại
                </th>
                <th scope="col" className="px-6 py-3">
                  Tài khoản
                </th>
                <th scope="col" className="px-6 py-3">
                  Vai trò
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-3 w-3/12">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {displayUsers.map((user, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.fullname}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phoneNumber}</td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">
                    {user.roleId === 1 ? "User" : "Admin"}
                  </td>
                  <td className="px-6 py-4">{user.status}</td>
                  <td className="px-6 py-4">
                    <span className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          handleChangeStatusUser(user as IFormUser)
                        }
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => {
                          Object.entries(user).forEach(([key, value]) => {
                            userFormStore.setField(
                              key as keyof IFormUser,
                              value as IFormUser[keyof IFormUser]
                            );
                          });
                          userFormStore.setTypeOfForm("detail");
                        }}
                        type="button"
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                      >
                        Chi tiết
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          Object.entries(user).forEach(([key, value]) => {
                            userFormStore.setField(
                              key as keyof IFormUser,
                              value as IFormUser[keyof IFormUser]
                            );
                          });
                          // open comfirm delele
                          userFormStore.setTypeOfForm("delete");
                        }}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Xoá
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleChangeStatusUser(user as IFormUser, true)
                        }
                        className={`focus:outline-none text-white ${
                          user.status === "active"
                            ? "bg-red-700 hover:bg-red-800"
                            : "bg-green-700 hover:bg-green-800"
                        }  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5`}
                      >
                        {user.status === "active" ? "Khoá" : "Mở"}
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
