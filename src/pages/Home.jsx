import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom';
function Home() {
    const [posts, setPosts] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        const checkAuth = async () => {
            const authenticated = await appwriteService.isAuthenticated();
            setIsLoggedIn(authenticated);
        };
        checkAuth();

        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    
        return (
            <div className="w-full py-8  mt-4 text-center bg-cyan-00 ">
                <Container>
                    <div className="flex flex-wrap ">
                        <div className="p-2 w-full">
                            {!isLoggedIn && (
                                <h1 className="text-4xl underline font-bold hover:text-gray-500  ">
                                    <Link to="/login">
                                        Login to read posts
                                    </Link>
                                </h1>
                            )}
                            <p className='my-7 text-white text-2xl'>
                                ShashBlogs is a creative platform where you can upload images and write blogs on any topic. Share poetry, travel stories, tech insights, or personal reflections effortlessly. With a sleek interface and interactive features, ShashBlogs lets you connect, express, and inspire  because every story deserves to be told.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    

}

export default Home