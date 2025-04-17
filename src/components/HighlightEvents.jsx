import { useNavigate } from "react-router-dom";

const HighlightEvents = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-black text-white py-24 px-6 rounded-3xl overflow-hidden shadow-xl">
      
      {/* ✨ Subtle floating glow blobs */}
      <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-orange-500 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 bg-pink-500 opacity-20 rounded-full blur-3xl z-0" />

      <div className="relative z-10 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-orange-400 drop-shadow-md">
          Discover the Latest NSS Events!
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Stay in the loop and never miss a moment of impact.
        </p>

        <button
          onClick={() => navigate("/all-posts")}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 text-white font-bold rounded-full shadow-lg hover:shadow-[0_0_20px_#fb923c] transition-all duration-300"
        >
          🚀 Explore All Events
        </button>
      </div>
    </div>
  );
};

export default HighlightEvents;
