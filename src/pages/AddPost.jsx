import { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import authService from '../appwrite/auth';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const ADMIN_EMAIL = "aryan@gmail.com";

function AddPost() {
    const [userEmail, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        authService.getCurrentUser()
            .then(user => {
                if (user?.email) {
                    setUserEmail(user.email.toLowerCase());
                } else {
                    navigate('/');
                }
            })
            .catch(() => navigate('/'))
            .finally(() => setLoading(false));
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-300">
                Loading...
            </div>
        );
    }

    if (userEmail !== ADMIN_EMAIL.toLowerCase()) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-300 px-4">
                <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-md">
                    <div className="flex flex-col items-center text-center">
                        <AlertCircle className="text-red-500 w-10 h-10 mb-3" aria-hidden="true" />
                        <h2 className="text-xl font-bold text-white">Access Denied!</h2>
                        <p className="text-gray-400 mt-2 text-sm">
                            You don’t have permission to create a post. This action is restricted to admins only.
                        </p>
                        <Link
                            to="/"
                            className="mt-4 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Go Back Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
            <Container>
                <h1 className="text-3xl font-bold text-orange-400 mb-6">Create a New Post</h1>
                <PostForm />
            </Container>
        </div>
    );
}

export default AddPost;
