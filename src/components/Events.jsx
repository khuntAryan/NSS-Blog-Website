import { useEffect, useState } from "react";
import { Client, Databases, ID } from "appwrite";
import authService from "../appwrite/auth";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconSignature,
} from "@tabler/icons-react";

// Setup Appwrite
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("676707eb003094b1b6ec");

const databases = new Databases(client);
const databaseId = "67670848003983e9d87f";
const collectionId = "680221ed00055dd00c7f";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

export default function Events() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      {
        title: form.title,
        content: form.content,
      },
      [
        `read("users")`,    // Readable by any logged-in user
        `write("user:${user.$id}")`  // Writable only by the creator
      ]
    );
    setForm({ title: "", content: "" });
    setShowModal(false);
    fetchEvents();
  } catch (err) {
    console.error("Error submitting event:", err);
  }
};

  return (
    <div className="max-w-5xl mx-auto p-4">
      {isAryan && (
        <div className="mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Event
          </button>
        </div>
      )}

      <BentoGrid className="max-w-4xl mx-auto">
        {events.map((event, i) => (
          <BentoGridItem
            key={event.$id}
            title={event.title}
            description={event.content}
            header={<Skeleton />}
            icon={
              i % 3 === 0 ? (
                <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />
              ) : i % 3 === 1 ? (
                <IconClipboardCopy className="h-4 w-4 text-neutral-500" />
              ) : (
                <IconSignature className="h-4 w-4 text-neutral-500" />
              )
            }
            className={i % 7 === 3 || i % 7 === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>

      {/* Modal for Aryan */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                placeholder="Content"
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
                className="w-full p-2 border rounded"
                rows={4}
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
