import { Container, Grid, Text } from "@mantine/core";
import React, { useState, useEffect, useCallback } from "react";
import Article from "@/Components/Article/Article";
import SkeletonArticle from "@/Components/SkeletonArticle/SkeletonArticle";
import { usePage, useForm } from "@inertiajs/inertia-react";
import ArticlesLayout from "@/Layouts/ArticlesLayout";

export default function CategoryArticlePage() {
    const { user, category } = usePage().props;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const { data, get } = useForm({
        take: 10,
        page: 1
    });

    const fetchArticles = async (pageNum) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            get(`/posts/categories/${category.id}`, {
                data: { ...data, page: pageNum },
                preserveScroll: true,
                preserveState: true,
                onSuccess: (response) => {
                    resolve(response.props.posts.data);
                },
                onError: () => {
                    console.error("Error loading more posts");
                    reject();
                },
            });
        }).finally(() => setLoading(false));
    };

    const loadMoreArticles = useCallback(async () => {
        if (loading || !hasMore) return;
        const newArticles = await fetchArticles(page + 1);
        setArticles((prev) => [...prev, ...newArticles]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(newArticles.length > 0);
    }, [loading, hasMore, page, fetchArticles]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            loadMoreArticles();
        }
    }, [loadMoreArticles]);

    useEffect(() => {
        const initialFetch = async () => {
            const initialArticles = await fetchArticles(1);
            setArticles(initialArticles);
            setHasMore(initialArticles.length > 0);
        };
        initialFetch();
    }, []); // Fetch articles only once on mount

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <ArticlesLayout user={user}>
                    <Text fz="lg" fw={500} mt="md" mb="md">
                        {category.name}
                    </Text>
                    <Grid>
                        {articles.map((article, index) => (
                            <Grid.Col
                                key={index}
                                span={{ base: 12, md: 6, lg: 4 }}
                            >
                                <Article post={article} />
                            </Grid.Col>
                        ))}
                        {loading &&
                            [...Array(4)].map((_, index) => (
                                <Grid.Col
                                    key={index}
                                    span={{ base: 12, md: 6, lg: 4 }}
                                >
                                    <SkeletonArticle />
                                </Grid.Col>
                            ))}
                    </Grid>
        </ArticlesLayout>
    );
}
