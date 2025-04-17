
import { motion } from "framer-motion";

const items = [
  { title: "Facebook", href: "https://www.facebook.com/SRMUniversityOfficial", img: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" },
  { title: "Twitter", href: "https://x.com/SRM_Univ", img: "https://banner2.cleanpng.com/20240119/xzi/transparent-x-logo-cross-design-black-and-white-photograph-sim-black-and-white-cross-with-letters-x-and-1710899162518.webp" },
  { title: "Instagram", href: "https://www.instagram.com/SRMUniversityOfficial/", img: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" },
  { title: "LinkedIn", href: "https://www.linkedin.com/company/srm-ist-chennai", img: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" },
  { title: "YouTube", href: "https://www.youtube.com/user/SRMeducation", img: "https://i.pinimg.com/1200x/7d/dc/54/7ddc545046b212d9ecc8eef83569222b.jpg" },
];

const Dock = () => {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex gap-6 bg-gray-800 px-6 py-4 rounded-full shadow-lg">
        {items.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center w-12 h-12"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={item.img} alt={item.title} className="w-10 h-10" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Dock;
