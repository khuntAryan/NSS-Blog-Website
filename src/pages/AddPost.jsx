import { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import authService from '../appwrite/auth'; 
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const ADMIN_EMAIL = "aryan@gmail.com"; 

function AddPost() {
    const [userEmail, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        authService.getCurrentUser()
            .then(user => {
                if (user && user.email) {
                    setUserEmail(user.email.toLowerCase());
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

    if (userEmail !== ADMIN_EMAIL.toLowerCase()) {
        return (
            <div className="mt-8 flex flex-col items-center justify-center max-w-md mx-auto bg-gray-100 rounded-xl p-6 shadow-lg">
                <AlertCircle className="text-red-500 w-10 h-10 mb-3" aria-hidden="true" />
                <h2 className="text-xl font-bold text-gray-800">Access Denied!</h2>
                <p className="text-gray-600 mt-2 text-center text-sm">
                    You don’t have permission to create a post. This action is restricted to admins only.
                </p>
                <Link
                    to="/"
                    className="mt-4 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Go Back Home
                </Link>
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