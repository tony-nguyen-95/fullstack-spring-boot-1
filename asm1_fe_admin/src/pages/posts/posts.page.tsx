import React, { useEffect } from "react";
import { Sidebar, PostForm } from "../../component";
import { observer } from "mobx-react";
import { IPost, postStore, IFormPost, postFormStore } from "../../stores";
import { formatDateToDDMMYYYY } from "../tours";
// import { PaginationPosts } from "../../component";

type Props = {};

export const Posts: React.FC<Props> = observer(() => {
  const handleChangePost = (updatedPost: Partial<IPost>) => {
    Object.entries(updatedPost).forEach(([key, value]) => {
      postFormStore.setField(
        key as keyof IFormPost,
        value as IFormPost[keyof IFormPost]
      );
    });

    postFormStore.setTypeOfForm("update");
  };

  useEffect(() => {
    postStore.getPosts();
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
                postFormStore.resetForm();
                postFormStore.setTypeOfForm("add");
              }}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Add New Post
            </button>
          </div>
        </div>

        {postFormStore.typeOfForm && <PostForm />}

        {/* {<PaginationPosts />} */}

        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 w-2/12">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Created Date
                </th>
                <th scope="col" className="px-6 py-3 w-3/12">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {postStore.paginatedPosts.map((post, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {post.name}
                  </th>
                  <td className="px-6 py-4">
                    <div>
                      <img src={post.image} alt={post.name} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {formatDateToDDMMYYYY(new Date(post.createdDate))}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleChangePost(post)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          Object.entries(post).forEach(([key, value]) => {
                            return postFormStore.setField(
                              key as keyof IFormPost,
                              value as IFormPost[keyof IFormPost]
                            );
                          });
                          postFormStore.setTypeOfForm("detail");
                        }}
                        type="button"
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          Object.entries(post).forEach(([key, value]) => {
                            postFormStore.setField(
                              key as keyof IFormPost,
                              value as IFormPost[keyof IFormPost]
                            );
                          });
                          postFormStore.setTypeOfForm("delete");
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
