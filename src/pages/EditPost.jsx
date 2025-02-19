import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

  return post ? (
    <div className='py-8 bg-gray-900 text-black'>
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">Edit Post</h1>
            <PostForm post={post} />
        </div>
    </div>
  ) : null
}

export default EditPost
