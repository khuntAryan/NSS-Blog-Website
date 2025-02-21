import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

const ADMIN_EMAIL = "aryan@gmail.com"; // Change this to your admin's email

function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState(null); // Store logged-in user's email
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the logged-in user's email
        appwriteService.getCurrentUser()
            .then(user => {
                if (user) {
                    setUserEmail(user.email);
                } else {
                    navigate('/'); // Redirect if user is not logged in
                }
            })
            .catch(() => navigate('/'));
        
        if (slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    } else {
                        navigate('/'); // Redirect if post not found
                    }
                })
                .catch(() => navigate('/'))
                .finally(() => setLoading(false));
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    if (loading) {
        return <div className="text-center text-white py-8">Loading...</div>;
    }

    if (userEmail !== ADMIN_EMAIL) {
        return (
            <div className="text-center text-red-500 py-8 font-bold">
                Only admin can post a post.
            </div>
        );
    }

    return post ? (
        <div className='py-8 bg-gray-900 text-black'>
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">Edit Post</h1>
                <PostForm post={post} />
            </div>
        </div>
    ) : (
        <div className="text-center text-white py-8">Post not found</div>
    );
}

export default EditPost;
