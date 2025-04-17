'use client';
import { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container } from '../components';

import NSSOverview from '../components/NSSOverview';
import ContactUs from '../components/ContactUs';
import SocialLinks from '../components/SocialLinks';
// import Event from '../components/Events';
import Logo from '../components/Logo';
import Spline from '@splinetool/react-spline';
import HighlightEvents from '@/components/HighlightEvents';
import Events from '@/components/Events';
import IntroSection from '@/components/IntroSection';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="relative z-0 w-full min-h-screen text-white overflow-hidden">
      
      {/* ✅ Fullscreen Spline Background */}
      <div className="fixed top-0 left-0 w-screen h-screen -z-10">
        <Spline scene="https://prod.spline.design/C4poXIGQkQ-4gHO9/scene.splinecode" />
      </div>

      {/* 📦 Content */}
      <div className="relative z-10 pt-[80px] pb-[80px] bg-black bg-opacity-80">
        <Container>
          <IntroSection/>
          {posts.length === 0 ? (
            <div className="flex flex-wrap pt-16">
              <div className="p-2 w-full text-center">
                <h1 className="text-3xl font-bold text-orange-500 hover:text-gray-300">
                  NSS SRM BLOG WEBSITE
                </h1>
              </div>
            </div>
          ) : (
            <>
              <div className="pt-16 p-6 rounded-lg text-center backdrop-blur-md bg-white/5 border border-gray-700">
                <h2 className="text-white text-4xl font-extrabold mb-2">
                  National Service Scheme (NSS)
                </h2>
                <p className="text-gray-300 text-sm mb-4">
                  The ideals of Mahatma Gandhi provide inspiration for the NSS&#39;s ideological stance.
                  <strong className="text-orange-400"> “NOT ME, BUT YOU” </strong> is the NSS motto.
                </p>

                <div className="flex justify-center items-center gap-6 mb-4">
                  <Logo width="120px" />
                </div>

                <hr className="border-t border-gray-500 my-6 w-3/4 mx-auto" />
                <NSSOverview />
                <HighlightEvents/>
                <Events/>
              </div>

              <div className="mt-12">
                <ContactUs />
                <SocialLinks />
              </div>
            </>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Home;
