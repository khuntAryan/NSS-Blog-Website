import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { Mail, MapPin, Phone } from "lucide-react";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center bg-black text-white min-h-[800px]">
        <Container>
          <div className="flex flex-wrap pt-16">
            <div className="p-2 w-full">
              <h1 className="text-3xl font-bold text-orange-500 hover:text-gray-300 ">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-gray-900 text-black min-h-[700px]">
      <Container>
        <div className="pt-16 bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-black text-4xl font-extrabold mb-2">
            National Service Scheme (NSS)
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            The ideals of Mahatma Gandhi provide inspiration for the NSS's ideological stance.
            <strong>“NOT ME, BUT YOU”</strong> is the NSS motto.
          </p>
          <div className="flex justify-center mb-4">
            <img src="https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2024/07/nss.png"
              alt="Logo" className="w-32 h-32" />
          </div>

          <hr className="border-t-2 border-gray-300 my-6 w-3/4 mx-auto" />


          <div className="text-gray-700 text-base mt-4 text-justify">
            <h3 className="text-2xl font-bold mb-2 text-center">NSS Overview</h3>
            <p className="mb-4">
              National Service Scheme (NSS) is a widely recognized and influential youth-centric program in colleges across the country.  NSS was established in 1969, the year Mahatma Gandhi celebrated his birth, with the primary goal of fostering the character and personality of student youth via volunteer community service. The ideals of Mahatma Gandhi provide inspiration for the NSS’s ideological stance. <strong>“NOT ME, BUT YOU”</strong>is the NSS motto.

              NSS was commissioned by SRM Institute of Science and Technology in 2003. The activities of the SRMIST NSS mainly focus on Community Development Services, Social Services, Environmental Awareness Programs, Health Awareness Programs and Technology Transfer Programs. The NSS at SRMIST has guidelines to conduct various Regular and Special Camping activities.

              Apart from social activities, SRMIST NSS Cell offers NSS Course 21GNM102L to Engineering students during their first-year course of study. Every Semester around 800 students take up the course and gets benefitted.


            </p>
          </div>

          <hr className="border-t-4 border-gray-300 my-6 w-3/4 mx-auto" />

          {/* Advisor's Message Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              { title: "1.	Blood Donation - BA", imageUrl: "https://media.istockphoto.com/id/1414901355/vector/world-blood-donor-day-vector-background.jpg?s=612x612&w=0&k=20&c=rOcujEhfwrptwsq1YZxQv6mibq0Woq0T5Q4VDWo7C5A=" },
              { title: "2.	Environmental protection Activity - EA", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWvTo6QOYCd9fBMmv5Xw0NheisbpuqfshInQ&s" },
              { title: "3.	Swachh Bharath - CA", imageUrl: "https://us.123rf.com/450wm/creativevectoart/creativevectoart2009/creativevectoart200900160/155924702-clean-india-is-the-english-meaning-of-swachh-bharat-writtten-in-hindi-poster-design-for-2-october.jpg?ver=6" },
              { title: "4.	Road Safety Awareness - RA", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVUauiJE2yCcPW7gm1Mkadys5D8m1QLqLLCw&s"},
              { title: "5.	Social Service Programme - SA", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRknP4ixucIgCvUaI5cxkv8Hb-0a91Uf-S2kA&s" },
              { title: "6.	Health & Hygiene Programme - HA", imageUrl: "https://www.shutterstock.com/image-vector/illustration-hand-pocket-sanitizer-call-260nw-1673509405.jpg" },
              { title: "7.	Skill Developmental Activities - DA", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkmaUFeYu4Y72DWRsJvV3kNgGAqF1vv2co4w&s"},
              { title: "8.	National Day& Celebration - NA", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ubxqfm06HWbz7zK9_wAImMWqmtARaT-HLw&s"},
              { title: "9.	National Camps - TC", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnMzUOSalgZ6egjGioUmnNfDMKMvme45Qt3A&s"}
            ].map((item, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg text-white text-center">
                <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.description}</p>
                
              </div>
            ))}
          </div>




          {/* Coordinator's Message Section */}


        </div>
        <div className="bg-gray-900 text-white py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-orange-500">Contact Us</h2>
            <p className="text-gray-400 text-center mt-2">Feel free to reach out for any queries or assistance!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
              {/* Contact Information */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">NSS Programme Coordinator</h3>
                <p className="flex items-center text-gray-300 mb-2">
                  <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                  NSS Cell, Geopolymer Concrete Building, Besides Fab Lab,
                </p>
                <p className="text-gray-300 ml-7">SRM Institute of Science and Technology,</p>
                <p className="text-gray-300 ml-7">Kattankulathur, Chengalpattu District – 603 203</p>

                <p className="flex items-center mt-4 text-gray-300">
                  <Mail className="w-5 h-5 mr-2 text-orange-500" />
                  <a href="mailto:nsscell@srmist.edu.in" className="text-blue-400 hover:underline">
                    nsscell@srmist.edu.in
                  </a>
                </p>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                  <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Optional Google Maps */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-center mb-4">Find Us on Google Maps</h3>
              <div className="flex justify-center">
                <iframe
                  title="NSS SRM Location"
                  className="w-full md:w-3/4 h-64 rounded-lg shadow-lg"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.103043722113!2d80.04321381423464!3d12.823936821352993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5260f77f4500df%3A0x99c2e8f7f1e5e2a5!2sSRM%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1632982345678"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-8">
          <h3 className="text-2xl font-bold mb-4  text-white">Follow Us</h3>
          <div className="flex space-x-6">
            <a href="https://www.facebook.com/SRMUniversityOfficial" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook" className="w-12 h-12 hover:opacity-75" />
            </a>
            <a href="https://x.com/SRM_Univ" target="_blank" rel="noopener noreferrer">
              <img src="https://banner2.cleanpng.com/20240119/xzi/transparent-x-logo-cross-design-black-and-white-photograph-sim-black-and-white-cross-with-letters-x-and-1710899162518.webp"
                alt="Twitter" className="w-12 h-12 hover:opacity-75" />
            </a>
            <a href="https://www.instagram.com/SRMUniversityOfficial/" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram" className="w-12 h-12 hover:opacity-75" />
            </a>
            <a href="https://www.linkedin.com/company/srm-ist-chennai" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                alt="LinkedIn" className="w-12 h-12 hover:opacity-75" />
            </a>
            <a href="https://www.youtube.com/user/SRMeducation" target="_blank" rel="noopener noreferrer">
              <img src="https://i.pinimg.com/1200x/7d/dc/54/7ddc545046b212d9ecc8eef83569222b.jpg"
                alt="YouTube" className="w-12 h-12 hover:opacity-75" />
            </a>
          </div>
        </div>

      </Container>
    </div>
  );
}

export default Home;