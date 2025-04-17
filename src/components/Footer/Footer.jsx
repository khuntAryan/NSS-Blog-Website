
import Logo from '../Logo';
import { Mail, MapPin } from "lucide-react";

function Footer() {
  return (
    <section className="relative overflow-hidden bg-black text-gray-300 w-full min-h-min py-10 border-t-4 border-orange-500">
      <div className="relative z-10 mx-auto max-w-none w-full px-6 lg:px-12">
        <div className="-m-6 flex flex-wrap justify-between">
          
          {/* Left Side: Logo & Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-1/3">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-6 flex items-center">
                <Logo width="120px" />
              </div>
              <p className="text-sm text-gray-500">&copy; 2024 DevUI. All Rights Reserved.</p>
            </div>
          </div>

          {/* NSS Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-1/3">
            <div className="h-full">
              <h3 className="text-sm font-semibold uppercase text-orange-400 mb-5">National Service Scheme</h3>
              <p className="text-gray-400 text-sm mb-4">
                NSS promotes youth involvement in community service and nation-building.  
                <strong> “NOT ME, BUT YOU” </strong> is its guiding motto, inspiring social responsibility.
              </p>
              <a href="https://www.srmist.edu.in/nss/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
                Learn More
              </a>
            </div>
          </div>

          {/* NSS Contact Info */}
          <div className="w-full p-6 md:w-1/2 lg:w-1/3">
            <div className="h-full">
              <h3 className="text-sm font-semibold uppercase text-orange-400 mb-5">Contact Us</h3>
              <p className="flex items-center mb-2 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                NSS Cell, Geopolymer Concrete Building, Besides Fab Lab,
              </p>
              <p className="ml-7 text-gray-400 text-sm">SRM Institute of Science and Technology,</p>
              <p className="ml-7 text-gray-400 text-sm">Kattankulathur, Chengalpattu District – 603 203</p>

              <p className="flex items-center mt-4 text-gray-400 text-sm">
                <Mail className="w-5 h-5 mr-2 text-orange-500" />
                <a href="mailto:nsscell@srmist.edu.in" className="text-orange-500 hover:underline">
                  nsscell@srmist.edu.in
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Created by Aryan Khunt */}
      <div className="absolute bottom-2 right-4 text-gray-600 text-xs">
        Created by Aryan Khunt
      </div>
    </section>
  );
}

export default Footer;
