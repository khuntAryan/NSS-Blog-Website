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
                <p className="text-xl">Loading post...</p>
            </div>
        );
    }

    // Function to split and animate parsed HTML content
    const animateParsedContent = (html) => {
        const lines = html.split(/<br\s*\/?>/i); // splitting by <br> tags
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
        <div className="py-10 bg-gray-900 min-h-screen flex justify-center text-white">
            <Container>
                <div className="max-w-4xl mx-auto rounded-xl bg-black p-6 text-sm font-mono leading-relaxed shadow-2xl border border-gray-700 relative">

                    {/* Terminal buttons top-left corner */}
                    <div className="absolute top-4 left-4 flex space-x-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full" />
                        <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <span className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>

                    {/* Edit/Delete Buttons top-right */}
                    {isAuthor && (
                        <div className="absolute top-4 right-4 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-600 hover:bg-green-700">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-600 hover:bg-red-700" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}

                    {/* Terminal Content with Animation */}
                    <div className="mt-10 space-y-4">
                        <Terminal
                            lines={[
                                `Post Title: ${post.title}`,
                            ]}
                        />

                        {/* Animated Post Content */}
                        <div className="pt-4 text-white space-y-2">
                            {animateParsedContent(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
