import { useState, useEffect } from "react";
import { Container, PostCard, Logo } from "../components";
import appwriteService from "../appwrite/config";
import { Loader2 } from "lucide-react";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        // Sort posts by creation date (newest first)
        const sortedPosts = [...posts.documents].sort((a, b) => 
          new Date(b.$createdAt) - new Date(a.$createdAt)
        );
        setPosts(sortedPosts);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">
      {/* Static SVG Wave Background */}
      <div className="absolute top-0 left-0 w-full z-0">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-[160px]"
          preserveAspectRatio="none"
        >
          <path
            fill="#1e293b"
            fillOpacity="1"
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,170.7C672,149,768,139,864,133.3C960,128,1056,128,1152,138.7C1248,149,1344,171,1392,181.3L1440,192L1440,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Watermark Logo */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="scale-[3] opacity-10">
          <Logo className="w-auto h-auto" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 py-20 px-4">
        <Container>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-10 h-10 text-gray-400 animate-spin mb-3" />
              <p className="text-gray-300 text-lg">
                Loading events, this may take a few seconds...
              </p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {posts.map((post) => (
                <div key={post.$id} className="transition-all hover:scale-105 duration-300">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-orange-300">
                No events available right now.
              </h2>
              <p className="text-gray-300 mt-2 text-center max-w-sm">
                Stay tuned! New updates will be posted soon.
              </p>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default AllPosts;