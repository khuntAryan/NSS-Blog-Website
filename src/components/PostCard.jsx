import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import appwriteService from '../appwrite/config';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { Loader2 } from 'lucide-react';

const truncateContent = (content, wordLimit = 20) => {
  const words = content.split(' ');
  return words.length <= wordLimit ? content : words.slice(0, wordLimit).join(' ') + '...';
};

const hashtags = [
  '#NSS', '#SRMIST', '#SRMUniversity', '#SRMNSS', '#NSSUnit',
  '#CampusLife', '#SRMEvents', '#YouthForNation', '#NotMeButYou'
];

function PostCard({ $id, title, description }) {
  const [postContent, setPostContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPost($id).then((post) => {
      if (post) {
        setPostContent(post.content);
      }
      setLoading(false);
    });
  }, [$id]);

  const sanitizedContent = postContent ? DOMPurify.sanitize(postContent) : '';
  const truncatedContent = sanitizedContent ? truncateContent(sanitizedContent) : '';
  const randomHashtag = hashtags[Math.floor(Math.random() * hashtags.length)];

  return (
    <Link to={`/post/${$id}`} className="group">
      <div className="bg-gradient-to-br from-[#111] to-[#1c1c1c] border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-[0_0_30px_#fb923c55] transition-all duration-300 h-full flex flex-col justify-between">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-6 h-6 text-orange-400 animate-spin" />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 text-white font-bold flex items-center justify-center text-lg shadow-inner">
                {title?.charAt(0)?.toUpperCase()}
              </div>
              <h3 className="text-xl text-orange-300 font-semibold leading-snug">
                {title}
              </h3>
            </div>

            {/* Description */}
            {description && (
              <p className="text-gray-400 mb-3 text-sm">
                {description}
              </p>
            )}

            {/* Content */}
            {truncatedContent && (
              <div className="bg-black/30 border border-white/10 p-4 rounded-xl text-white text-sm leading-relaxed mb-4 backdrop-blur-md">
                {parse(truncatedContent)}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
              <span className="italic">{randomHashtag}</span>
              <span className="text-blue-400 group-hover:text-blue-500 transition">
                Know more →
              </span>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

PostCard.propTypes = {
  $id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default PostCard;
