import { MapPin, Mail } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="relative bg-neutral-950 text-white py-16 px-6 overflow-hidden">
      {/* 🌐 Floating gradient blobs */}
      <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-gray-600 opacity-10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 bg-gray-500 opacity-10 rounded-full blur-3xl z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center text-white drop-shadow-md">
          Contact Us
        </h2>
        <p className="text-gray-400 text-center mt-2 text-base">
          Feel free to reach out for any queries or assistance!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          {/* 📍 NSS Info */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-white">
              NSS Programme Coordinator
            </h3>
            <p className="flex items-center text-gray-300 mb-2">
              <MapPin className="w-5 h-5 mr-2 text-gray-400" />
              NSS Cell, Geopolymer Concrete Building, Besides Fab Lab,
            </p>
            <p className="text-gray-300 ml-7">
              SRM Institute of Science and Technology,
            </p>
            <p className="text-gray-300 ml-7">
              Kattankulathur, Chengalpattu District – 603 203
            </p>

            <p className="flex items-center mt-4 text-gray-300">
              <Mail className="w-5 h-5 mr-2 text-gray-400" />
              <a
                href="mailto:nsscell@srmist.edu.in"
                className="text-gray-200 hover:underline"
              >
                nsscell@srmist.edu.in
              </a>
            </p>
          </div>

          {/* 📨 Contact Form */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Send Us a Message
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              ></textarea>
              <button
                type="submit"
                className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow hover:shadow-md transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* 🗺️ Google Map */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-center text-white mb-6">
            Find Us on Google Maps
          </h3>
          <div className="flex justify-center">
            <iframe
              title="NSS SRM Location"
              className="w-full md:w-3/4 h-72 rounded-xl border border-white/10 shadow-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.103043722113!2d80.04321381423464!3d12.823936821352993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5260f77f4500df%3A0x99c2e8f7f1e5e2a5!2sSRM%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1632982345678"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
