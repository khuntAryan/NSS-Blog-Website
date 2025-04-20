import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth?.userData);

    const submit = async (data) => {
        try {
            if (post) {
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                });
                if (dbPost) navigate(`/post/${dbPost.$id}`);
            } else {
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData?.$id,
                });
                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        return value && typeof value === "string"
            ? value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
            : "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="relative isolate">
            {/* Gradient Glow Background */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 blur-2xl"
                style={{
                    background:
                        "radial-gradient(circle at top left, rgba(255, 115, 0, 0.3), transparent 70%)",
                }}
            />

            {/* Actual Form */}
            <form
                onSubmit={handleSubmit(submit)}
                className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-5 text-gray-200 ring-1 ring-gray-700"
            >
                <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-300 mb-1">
                        Title
                    </label>
                    <Input
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        className="bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        {...register("title", { required: "Title is required" })}
                    />
                </div>

                <div>
                    <label htmlFor="slug" className="block text-sm font-semibold text-gray-300 mb-1">
                        Slug
                    </label>
                    <Input
                        id="slug"
                        name="slug"
                        placeholder="Generated slug"
                        className="bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        {...register("slug", { required: "Slug is required" })}
                        onInput={(e) =>
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                        }
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-semibold text-gray-300 mb-1">
                        Content
                    </label>
                    <RTE
                        id="content"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-semibold text-gray-300 mb-1">
                        Status
                    </label>
                    <Select
                        id="status"
                        name="status"
                        options={["active", "inactive"]}
                        className="bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        {...register("status", { required: "Status is required" })}
                    />
                </div>

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-600" : "bg-orange-600"}
                    className="w-full hover:bg-opacity-90"
                >
                    {post ? "Update Post" : "Create Post"}
                </Button>
            </form>
        </div>
    );
}

PostForm.propTypes = {
    post: PropTypes.shape({
        $id: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        status: PropTypes.oneOf(["active", "inactive"]),
        featuredImage: PropTypes.string,
    }),
};
