import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postInput, setPostInput] = useState({
    title: "",
    body: "",
    userId: "",
  });
  const [showUsers, setShowUsers] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
      setShowUsers(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        postInput
      );
      setPosts([...posts, response.data]);
      fetchComments(response.data.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      setComments(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostInput({ ...postInput, [name]: value });
  };

  const toggleUsers = () => {
    setShowUsers(!showUsers);
  };

  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
      <button
        onClick={fetchUsers}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 transition duration-300"
      >
        Fetch Users
      </button>
      {loading && <ClipLoader color="#4A90E2" />}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <h2 className="text-2xl mb-2 font-semibold flex items-center">
          Users
          <button onClick={toggleUsers} className="ml-2">
            {showUsers ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </h2>
        {showUsers && (
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(users, null, 2)}
          </pre>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-2xl mb-2 font-semibold">Create Post</h2>
        <input
          type="text"
          name="title"
          value={postInput.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="border p-2 mr-2 rounded"
        />
        <input
          type="text"
          name="body"
          value={postInput.body}
          onChange={handleInputChange}
          placeholder="Body"
          className="border p-2 mr-2 rounded"
        />
        <select
          name="userId"
          value={postInput.userId}
          onChange={handleInputChange}
          className="border p-2 mr-2 rounded"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          onClick={createPost}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-300"
        >
          Create Post
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl mb-2 font-semibold">Posts</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(posts, null, 2)}
        </pre>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl mb-2 font-semibold">Comments</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(comments, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default Dashboard;
