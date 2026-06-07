import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PublicSpace() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    userEmail: "",
    caption: "",
    mediaUrl: "",
    mediaType: "photo",
    friendCount: 0,
  });

  const [posts, setPosts] = useState<any[]>([]);
  const [comment, setComment] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchPosts = async () => {
    const res = await axios.get(`${API}/api/public-space`);
    setPosts(res.data.posts);
  };

  const createPost = async () => {
    try {
      await axios.post(`${API}/api/public-space/create`, {
        ...formData,
        friendCount: Number(formData.friendCount),
      });

      alert("Post created successfully");
      fetchPosts();
    } catch (error: any) {
      alert(error.response?.data?.message || "Post failed");
    }
  };

  const likePost = async (id: string) => {
    await axios.put(`${API}/api/public-space/like/${id}`);
    fetchPosts();
  };

  const sharePost = async (id: string) => {
    await axios.put(`${API}/api/public-space/share/${id}`);
    alert("Post shared successfully");
    fetchPosts();
  };

  const addComment = async (id: string, userEmail: string) => {
    await axios.post(`${API}/api/public-space/comment/${id}`, {
      userEmail,
      comment,
    });

    setComment("");
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-5">Public Space</h1>

      <div className="border p-5 rounded mb-8 bg-white shadow">
        <h2 className="text-xl font-bold mb-4">Create Post</h2>

        <input
          type="email"
          name="userEmail"
          placeholder="Your Email"
          className="border p-3 w-full mb-3"
          onChange={handleChange}
        />

        <textarea
          name="caption"
          placeholder="Write caption"
          className="border p-3 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="mediaUrl"
          placeholder="Photo or Video URL"
          className="border p-3 w-full mb-3"
          onChange={handleChange}
        />

        <select
          name="mediaType"
          className="border p-3 w-full mb-3"
          onChange={handleChange}
        >
          <option value="photo">Photo</option>
          <option value="video">Video</option>
        </select>

        <input
          type="number"
          name="friendCount"
          placeholder="Number of Friends"
          className="border p-3 w-full mb-3"
          onChange={handleChange}
        />

        <button
          onClick={createPost}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Post
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">All Posts</h2>

      {posts.map((post) => (
        <div key={post._id} className="border p-5 rounded mb-5 bg-white shadow">
          <p className="font-bold">{post.userEmail}</p>
          <p className="my-3">{post.caption}</p>

          {post.mediaType === "photo" ? (
            <img
              src={post.mediaUrl}
              alt="post"
              className="w-full h-64 object-cover rounded"
            />
          ) : (
            <video controls className="w-full h-64 rounded">
              <source src={post.mediaUrl} />
            </video>
          )}

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => likePost(post._id)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Like ({post.likes})
            </button>

            <button
              onClick={() => sharePost(post._id)}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Share ({post.shares})
            </button>
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Write comment"
              className="border p-2 w-full mb-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              onClick={() => addComment(post._id, post.userEmail)}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Comment
            </button>
          </div>

          <div className="mt-3">
            <h3 className="font-bold">Comments:</h3>
            {post.comments?.map((c: any, index: number) => (
              <p key={index} className="text-sm border-b py-1">
                {c.userEmail}: {c.comment}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}