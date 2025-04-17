'use client';

import { TypewriterEffect } from "./ui/typewriter-effect";

const IntroSection = () => {
  const words = [
    { text: "Welcome", className: "text-white tracking-wide" },
    { text: "to", className: "text-white tracking-wide" },
    { text: "the", className: "text-white tracking-wide" },
    { text: "Official", className: "text-white tracking-wide" },
    { text: "SRM", className: "text-blue-500 tracking-wide" },
    { text: "NSS", className: "text-red-500 tracking-wide" },
    { text: "Blog", className: "text-white tracking-wide" },
    { text: "Website", className: "text-white tracking-wide" },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-10 px-4 md:px-12 bg-black text-white gap-8">
      {/* Left Side: Typewriter */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
        <div className="w-full">
          <p className="text-neutral-400 text-sm mg-x-auto md:text-base mb-2" style={{ marginLeft: "55px" }}>
            Stay updated with our latest posts, activities, and initiatives.
          </p>
          <TypewriterEffect words={words} />
        </div>
      </div>

      {/* Right Side: University Image */}
      <div className="w-full md:w-1/2">
        <img
          src="https://i.ytimg.com/vi/Hf4kUE8j3Do/maxresdefault.jpg"
          alt="SRM University"
          className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default IntroSection;
