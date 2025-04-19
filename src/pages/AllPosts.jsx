import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getPosts(); // ✅ No empty array
                if (response) {
                    setPosts(response.documents);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []); // ✅ Runs only once when component mounts

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center w-full">No posts available</p>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
