import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Terminal from "../components/Terminal";
import { motion } from "framer-motion";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    if (!post) {
        return (
            <div className="text-center py-20 text-white">
                <p className="text-xl animate-pulse">Loading post...</p>
            </div>
        );
    }

    // Function to split and animate parsed HTML content
    const animateParsedContent = (html) => {
        const lines = html.split(/<br\s*\/?>/i ); // splitting by <br> tags
        return lines.map((line, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.2 }}
            >
                {parse(line)}
            </motion.div>
        ));
    };

    return (
        <div className="py-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen flex justify-center text-white relative overflow-hidden">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[160%] h-96 bg-gradient-to-tr from-orange-400/10 to-pink-400/5 rounded-full blur-3xl opacity-20 animate-spin-slow" />

            <Container>
                <div className="max-w-4xl mx-auto rounded-3xl bg-black/80 p-8 text-sm font-mono leading-relaxed shadow-[0_4px_60px_rgba(255,255,255,0.05)] border border-gray-700 relative backdrop-blur-md">

                    {/* Terminal buttons top-left corner */}
                    <div className="absolute top-5 left-5 flex space-x-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full shadow-md" />
                        <span className="w-3 h-3 bg-yellow-500 rounded-full shadow-md" />
                        <span className="w-3 h-3 bg-green-500 rounded-full shadow-md" />
                    </div>

                    {/* Edit/Delete Buttons top-right */}
                    {isAuthor && (
                        <div className="absolute top-5 right-5 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-600 hover:bg-green-700">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-600 hover:bg-red-700" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}

                    {/* Terminal Content with Animation */}
                    <div className="mt-12 space-y-4 animate-fade-in-up">
                        <Terminal
                            lines={[`Post Title: ${post.title}`]}
                        />

                        {/* Image Display */}
                        {post.featuredImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="w-full max-w-md mx-auto mt-6"
                            >
                                <img
                                    src={post.featuredImage}
                                    alt="Featured"
                                    className="rounded-lg shadow-lg w-full h-auto"
                                />
                            </motion.div>
                        )}

                        {/* Animated Post Content */}
                        <div className="pt-6 text-white space-y-4 text-[15px]">
                            {animateParsedContent(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
