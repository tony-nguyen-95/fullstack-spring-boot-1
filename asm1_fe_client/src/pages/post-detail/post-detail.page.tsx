import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../apis";
import { formatDateToDDMMYYYY, Header, IPost } from "../../views";
import { observer } from "mobx-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Rate } from "../../components";
import authStore from "../../stores/authen.store";

type Props = {};

export interface IComment {
  id: number;
  userId: number;
  postId: number;
  username: string;
  text: string;
  rate: number;
  created_date: string;
}

export const PostDetail: React.FC<Props> = observer((props) => {
  const { postId } = useParams<{ postId: string }>(); // Get postId from URL parameters
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commentsByPostId, setCommentsByPostId] = useState<IComment[]>([]);

  // State for the comment form
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(5); // Default rating of 5 stars
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchComment = async (postId: number | string) => {
    try {
      const response = await API.get(`/comments?post_id=${postId}`);

      setCommentsByPostId(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch comment by Post Id
  useEffect(() => {
    if (postId) {
      fetchComment(postId);
    }
  }, [postId]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await API.get(`/posts`);
        setPost(
          result.data.find(
            (_post: IPost) => _post.id === parseInt(postId || "")
          )
        );
      } catch (err) {
        setError("Failed to load post details.");
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!comment || rating < 1 || rating > 5) {
      setSubmitError("Please enter a valid comment and rating.");
      return;
    }

    try {
      await API.post("/comments", {
        postId: post?.id,
        userId: authStore.userLogined?.id,
        text: comment,
        rate: rating,
      });

      const sweetAlert = withReactContent(Swal);
      sweetAlert.fire({
        title: <p>Comment submitted successfully!</p>,
        timer: 800,
        icon: "success",
      });

      // Reset the form after submission
      setComment("");
      setRating(5);

      if (postId) {
        fetchComment(postId);
      }
    } catch (err) {
      setSubmitError("There was an error submitting your comment.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />
      {post ? (
        <>
          <main className="mt-4 container p-2 md:p-10">
            <img
              src={post.image}
              alt={post.name}
              className="aspect-[2] object-cover"
            />
            <div className="text-sm text-gray-400 mt-4">
              Ngày đăng {formatDateToDDMMYYYY(new Date(post.createdDate))} bởi
              Admin
            </div>
            <div className="text-3xl mt-2">{post.name}</div>
            <div className="flex items-center">
              <div className="flex items-center">
                <i className="fa-solid fa-map" style={{ color: "#ff793b" }} />
              </div>
              <div className="flex items-center ml-4">
                <div>
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa-solid fa-star fa-xs ${
                        i < rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-xs ml-2">15 views</div>
              </div>
            </div>
            <p
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
            <div className="my-8">
              <h3 className="text-lg">Comments</h3>

              {commentsByPostId.length === 0 ? (
                <h4>Bài viết chưa có nhận xét nào!</h4>
              ) : (
                commentsByPostId.map((cm, index) => {
                  return (
                    <Rate
                      author={cm.username}
                      key={cm.id}
                      text={cm.text}
                      rate={cm.rate}
                    />
                  );
                })
              )}
            </div>
          </main>

          {/* Comment Form */}
          {authStore.isLogin ? (
            <section className="mx-8 mb-24">
              <h3 className="text-2xl">Leave a Comment</h3>
              <form onSubmit={handleSubmitComment} className="mt-4">
                <div className="mb-4">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium"
                  >
                    Your Comment
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    rows={5}
                    placeholder="Write your comment here..."
                    required
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="rating" className="block text-sm font-medium">
                    Rating
                  </label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    required
                  >
                    {[...Array(5)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Star{i > 0 && "s"}
                      </option>
                    ))}
                  </select>
                </div>

                {submitError && <p className="text-red-500">{submitError}</p>}

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit Comment
                </button>
              </form>
            </section>
          ) : (
            <div className="mb-56">
              <a
                href="/login"
                className="mt-8 mb-56 mx-8 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login to comment
              </a>
            </div>
          )}
        </>
      ) : (
        <div className="my-12 mx-8 w-full">Post not found</div>
      )}
    </div>
  );
});
