import React, { useEffect, useState } from "react";
import ArticleVertical from "./VerticalArticle";
import { Flex, Grid } from "@mantine/core";
import axios from "axios";
import './css/PopularArticles.css'
import SkeletonArticle from "./Skeleton/SkeletonArticle";

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

    return (
        <div className="popular-articles-container">
            <h1 className="text-lg font-bold mt-5 mb-3">Popular Articles</h1>
            <div className="scrollable-articles">
                <Grid gap="md" direction="column" className="bg-white p-5">
                    {articlesPopular.length > 0
                        ? articlesPopular.map((article,index) => (
                            <Grid.Col key={index} span={{ base: 12 }}>
                                <ArticleVertical key={article.slug} article={article} />
                            </Grid.Col>
                          ))
                        : (
                            [...Array(4)].map((_, index) => (
                                <Grid.Col key={index} span={{ base: 12 }}>
                                    <SkeletonArticle />
                                </Grid.Col>
                            ))
                        )}
                </Grid>
            </div>
        </div>
    );
}

export default PopularArticles;