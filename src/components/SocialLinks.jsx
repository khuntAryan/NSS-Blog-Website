
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const socialLinks = [
  { title: "Facebook", href: "https://www.facebook.com/SRMUniversityOfficial", icon: Facebook },
  { title: "Twitter", href: "https://x.com/SRM_Univ", icon: Twitter },
  { title: "Instagram", href: "https://www.instagram.com/SRMUniversityOfficial/", icon: Instagram },
  { title: "LinkedIn", href: "https://www.linkedin.com/company/srm-ist-chennai", icon: Linkedin },
  { title: "YouTube", href: "https://www.youtube.com/user/SRMeducation", icon: Youtube },
];

const SocialLinks = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <h3 className="text-2xl font-bold mb-4 text-white">Follow Us</h3>
      <div className="flex bg-gray-800 px-6 py-4 rounded-full shadow-lg gap-6">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-gray-900 rounded-full shadow-lg text-white"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <link.icon className="w-8 h-8 text-white" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
