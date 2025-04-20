import { useEffect, useState } from "react";
import { Client, Databases, ID } from "appwrite";
import authService from "../appwrite/auth";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconSignature,
} from "@tabler/icons-react";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("676707eb003094b1b6ec");

const databases = new Databases(client);
const databaseId = "67670848003983e9d87f";
const collectionId = "680221ed00055dd00c7f";

const cloudinaryConfig = {
  cloudName: 'dhk96ss3x',
  uploadPreset: 'events_upload'
};

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

export default function Events() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    Date: "",
    image: null,
    imagePreview: ""
  });
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const isAryan = user?.email === "aryan@gmail.com";

  useEffect(() => {
    authService.getCurrentUser().then(setUser);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await databases.listDocuments(databaseId, collectionId);
      setEvents(res.documents.reverse());
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setForm(prev => ({
        ...prev,
        image: file,
        imagePreview: previewUrl
      }));
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const documentData = {
        title: form.title,
        content: form.content,
        Date: form.Date
      };

      if (form.image) {
        const imageUrl = await uploadImageToCloudinary(form.image);
        if (imageUrl) {
          documentData.ImageUrl = imageUrl;
        }
      }

      await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        documentData,
        [`read("users")`, `write("user:${user.$id}")`]
      );

      setForm({
        title: "",
        content: "",
        Date: "",
        image: null,
        imagePreview: ""
      });
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      console.error("Full error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const displayedEvents = showAll ? events : events.slice(0, 8);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {isAryan && (
        <div className="mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            + Add Event
          </button>
        </div>
      )}

      {/* Wrap BentoGrid + popup together */}
      <div className="relative">
        <BentoGrid className="max-w-4xl mx-auto">
          {displayedEvents.map((event, i) => (
            <BentoGridItem
              key={event.$id}
              title={<div className="line-clamp-1 text-ellipsis overflow-hidden px-2 font-medium">{event.title}</div>}
              description={null}
              header={
                <div
                  onClick={() => setSelectedEvent(event)}
                  className="cursor-pointer h-full overflow-hidden rounded-t-xl"
                >
                  {event.ImageUrl ? (
                    <img
                      src={event.ImageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover min-h-[10rem] hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Skeleton />
                  )}
                </div>
              }
              icon={
                i % 3 === 0 ? (
                  <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />
                ) : i % 3 === 1 ? (
                  <IconClipboardCopy className="h-4 w-4 text-neutral-500" />
                ) : (
                  <IconSignature className="h-4 w-4 text-neutral-500" />
                )
              }
              className={`${i % 7 === 3 || i % 7 === 6 ? "md:col-span-2" : ""} cursor-pointer bg-white dark:bg-neutral-900 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-neutral-100 dark:border-neutral-800`}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </BentoGrid>

        {selectedEvent && (
          <div className="absolute inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white dark:bg-neutral-900 p-6 rounded-xl w-full max-w-md shadow-xl border border-neutral-200 dark:border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{selectedEvent.title}</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {selectedEvent.ImageUrl && (
                <img
                  src={selectedEvent.ImageUrl}
                  alt={selectedEvent.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <div className="text-neutral-700 dark:text-neutral-300 space-y-4">
                <p className="text-sm">{selectedEvent.content}</p>

                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
                  <div className="text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400 block">Date</span>
                    <p className="font-medium">{selectedEvent.Date || "Not specified"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {events.length > 8 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg w-full max-w-md shadow-lg border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Title</label>
                <input
                  type="text"
                  placeholder="Event title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-2 border rounded bg-black text-white"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Content</label>
                <textarea
                  placeholder="Event description"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full p-2 border rounded bg-black text-white"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Date</label>
                <input
                  type="text"
                  placeholder="Event date"
                  value={form.Date}
                  onChange={(e) => setForm({ ...form, Date: e.target.value })}
                  className="w-full p-2 border rounded bg-black text-white"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Event Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded"
                />
                {form.imagePreview && (
                  <div className="mt-2">
                    <img
                      src={form.imagePreview}
                      alt="Preview"
                      className="max-h-40 rounded object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
