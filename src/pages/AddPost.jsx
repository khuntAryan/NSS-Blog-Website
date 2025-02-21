import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import authService from '../appwrite/auth'; // Ensure correct path
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = "aryan@gmail.com"; 

function AddPost() {
    const [userEmail, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      authService.getCurrentUser()
            .then(user => {
                if (user) {
                    setUserEmail(user.email);
                } else {
                    navigate('/'); 
                }
            })
            .catch(() => navigate('/'))
            .finally(() => setLoading(false));
    }, [navigate]);

    if (loading) {
        return <div className="text-center text-white py-8">Loading...</div>;
    }

    if (userEmail !== ADMIN_EMAIL) {
        return (
            <div className="text-center text-red-500 py-8 font-bold">
                Only admin can create a post.
            </div>
        );
    }

    return (
        <div className='py-8 bg-gray-900 text-white'>
            <Container>
                <h1 className="text-3xl font-bold text-orange-500 mb-6">Create a New Post</h1>
                <PostForm />
            </Container>
        </div>
    );
}

export default AddPost;
