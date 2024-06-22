import React, { useEffect, useState } from "react";
import ArticleVertical from "./VerticalArticle";
import { Flex } from "@mantine/core";
import axios from "axios";
import './css/PopularArticles.css'

function PopularArticles() {
    const [articlesPopular, setArticlesPopular] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get("/api/articles/popular");
                setArticlesPopular(res.data.articles);
            } catch (error) {
                console.error("Error fetching articles popular:", error);
            }
        };

        fetchArticles();
    }, []);

    console.log(articlesPopular)

    return (
        <div className="popular-articles-container">
            <h1 className="text-lg font-bold mt-5 mb-3">Popular Articles</h1>
            <div className="scrollable-articles">
                <Flex gap="md" direction="column" className="bg-white p-5">
                    {articlesPopular.length > 0
                        ? articlesPopular.map((article) => (
                              <ArticleVertical key={article.slug} article={article} />
                          ))
                        : "No popular articles found."}
                </Flex>
            </div>
        </div>
    );
}

export default PopularArticles;