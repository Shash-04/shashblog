import React from 'react'
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom'

const PostCard = ({
    $id,
    title,
    featuredimage,
}) => {
    return (
        <Link to={`/post/${$id}`}>
            <div className=' w-full rounded-xl bg-gray-200 p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(featuredimage)} alt={title}
                        className='rounded-xl' />
                </div>
                <h2
                    className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
