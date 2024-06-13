import { Grid, Text } from "@mantine/core";
import Article from "../Article/Article";
import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "@inertiajs/inertia-react";
import SkeletonArticle from "../SkeletonArticle/SkeletonArticle";

export default function Articles({ initialArticles, totalPosts }) {
    const [articles, setArticles] = useState(initialArticles.data);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialArticles.data.length < totalPosts);

    const { get,post } = useForm({
        page: page + 1,
        take: 10,
    });

    const loadMoreArticles = useCallback(() => {
        if (loading || !hasMore) return;

        setLoading(true);
        get('/', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (response) => {
                const newArticles = response.props.post.data;
                setArticles((prev) => [...prev, ...newArticles]);
                setPage((prev) => prev + 1);
                setLoading(false);
                setHasMore(newArticles.length > 0);
            },
            onError: () => {
                console.error("Error loading more articles");
                setLoading(false);
            },
        });
    }, [get, loading, hasMore]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        loadMoreArticles();
    }, [loadMoreArticles]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div>
            <Text fz="lg" fw={500} mt="md" mb="md">Home</Text>
            <Grid>
                {articles.map((article, index) => (
                    <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
                        <Article post={article} />
                    </Grid.Col>
                ))}
                {loading && [...Array(4)].map((_, index) => (
                    <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
                        <SkeletonArticle />
                    </Grid.Col>
                ))}
            </Grid>
        </div>
    );
}
