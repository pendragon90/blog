import React, { useCallback, useEffect, useState } from "react";
import Footer from "../Components/Footer/Footer";
import SideNav from "@/Components/SideNav";
import PopularArticles from "@/Components/PopularArticles";
import { Button, Container, Grid, Group, Input, Text } from "@mantine/core";
import Article from "@/Components/Article/Article";
import SkeletonArticle from "@/Components/SkeletonArticle/SkeletonArticle";
import { useForm } from "@inertiajs/inertia-react";
import AppLayout from "./AppLayout";

function ArticlesLayout({ user,initialArticles, total_posts,url,title }) {
    const [articles, setArticles] = useState(initialArticles.data);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialArticles.data.length < total_posts);

    const { get } = useForm({
        page: page + 1,
        take: 10,
    });

    const loadMoreArticles = useCallback(() => {
        if (loading || !hasMore) return;

        setLoading(true);
        get(url, {
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
        <AppLayout user={user}>
            <Text fz="lg" fw={500} mt="md" mb="md">{title}</Text>
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
        </AppLayout>
    );
}

export default ArticlesLayout;
