import React, { useEffect, useState } from "react";
import { API } from "../../apis";
import { formatDateToDDMMYYYY } from "../tours";

type Props = {};

export interface IPost {
  id: number;
  name: string;
  image: string;
  description: string;
  createdDate: string;
}

export const PostsView: React.FC<Props> = (props) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    API.get("/posts")
      .then((result) => {
        if (result.data) {
          setPosts(result.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div
      id="offers"
      className="my-10 lg:mx-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {posts.map((post, index) => {
        return (
          <a
            key={post.id}
            href={`posts/${post.id}`}
            className="border drop-shadow-md rounded-md cursor-pointer bg-white overflow-hidden transition-transform hover:-translate-y-1"
          >
            <img
              className="w-full h-[200px] object-cover"
              src={post.image}
              alt={post.name}
            />
            <div className="p-2 h-[calc(100%-200px)] flex flex-col">
              <div className="flex justify-between items-start">
                <div className="max-w-[70%] break-words">
                  <div className="text-lg">{post.name}</div>
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
              </div>
              <div className="text-xs text-gray-400 mt-4">
                Ngày đăng {formatDateToDDMMYYYY(new Date(post.createdDate))}
              </div>
              <hr className="my-4" />
              <div className="flex items-end justify-between mt-auto">
                <div className="ml-4">
                  <button
                    className="p-1 text-xs bg-lime-500 text-white rounded-sm min-w-16"
                    type="button"
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};
