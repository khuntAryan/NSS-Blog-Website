import React, { useCallback } from "react";
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
            let file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (post) {
                if (file && post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            } else {
                if (!file) throw new Error("File upload failed");

                const dbPost = await appwriteService.createPost({
                    ...data,
                    featuredImage: file.$id,
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

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <label htmlFor="title" className="block font-medium">Title:</label>
                <Input
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    className="mb-4"
                    {...register("title", { required: "Title is required" })}
                />

                <label htmlFor="slug" className="block font-medium">Slug:</label>
                <Input
                    id="slug"
                    name="slug"
                    placeholder="Generated slug"
                    className="mb-4"
                    {...register("slug", { required: "Slug is required" })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                <label htmlFor="content" className="block font-medium">Content:</label>
                <RTE
                    id="content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            <div className="w-1/3 px-2">
                <label htmlFor="image" className="block font-medium">Featured Image:</label>
                <Input
                    id="image"
                    name="image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <label htmlFor="status" className="block font-medium">Status:</label>
                <Select
                    id="status"
                    name="status"
                    options={["active", "inactive"]}
                    className="mb-4"
                    {...register("status", { required: "Status is required" })}
                />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
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
