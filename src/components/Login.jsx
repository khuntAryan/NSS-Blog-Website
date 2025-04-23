import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyYOZllJlZZM8VeKPrGcCWtjc6nBW1sg5mQ&s",
    ];
    
    
    return (
        <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen">
            {/* Login Form - Left */}
            <div className="w-full md:w-1/2 p-8 md:p-16">
                <div className="mx-auto max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                  
                    <h2 className="text-center text-black text-2xl font-bold leading-tight">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have an account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(login)} className="mt-8">
                        <div className="space-y-5 text-black">
                            <Input
                                label="Email: "
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) =>
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    },
                                })}
                            />
                            <Input
                                label="Password: "
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            <Button type="submit" className="w-full">
                                Sign in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {/* 3D Marquee - Right */}
            <div className="w-full md:w-1/2 p-4 md:p-8">
                <div className="bg-gray-950/5 rounded-3xl p-4 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
                    <ThreeDMarquee images={images} />
                </div>
            </div>
        </div>
    );
}

export default Login;
