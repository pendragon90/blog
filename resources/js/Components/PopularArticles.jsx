import React, { useEffect, useState } from "react";
import ArticleVertical from "./VerticalArticle";
import { Flex } from "@mantine/core";
import axios from "axios";
import './css/PopularArticles.css'

function PopularArticles() {
    const [postsPopular, setPostsPopular] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("/api/posts/popular");
                setPostsPopular(res.data.posts);
            } catch (error) {
                console.error("Error fetching posts popular:", error);
            }
        };

        fetchPosts();
    }, []);

    console.log(postsPopular)

    return (
        <div className="popular-articles-container">
            <h1 className="text-lg font-bold mt-5 mb-3">Popular Articles</h1>
            <div className="scrollable-articles">
                <Flex gap="md" direction="column" className="bg-white p-5">
                    {postsPopular.length > 0
                        ? postsPopular.map((post) => (
                              <ArticleVertical key={post.slug} post={post} />
                          ))
                        : "No popular articles found."}
                </Flex>
            </div>
        </div>
    );
}

export default PopularArticles;