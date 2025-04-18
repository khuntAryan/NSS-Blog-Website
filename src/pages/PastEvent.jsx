import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ID } from "../appwrite/config";
import service from "../appwrite/config";



const PastEvent = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.createPost({
        title,
        slug: ID.unique(),  // Using a unique slug (could be any unique identifier)
        content: desc,
        featuredImage: "",  // Add an image URL or logic if needed
        status: "active",    // Example status; change it based on your needs
        userId: "",         // Add logic for user ID if needed
      });
      alert("Event submitted to Appwrite!");
      setTitle("");
      setDesc("");
      navigate("/"); // Navigate to the homepage (or anywhere you like)
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Post a Past Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Event Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PastEvent;
