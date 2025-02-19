import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-8 bg-gray-900 text-white'>
        <Container>
            <h1 className="text-3xl font-bold text-orange-500 mb-6">Create a New Post</h1>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost
