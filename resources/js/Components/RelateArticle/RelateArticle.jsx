import { Button, Grid, Group, Text } from "@mantine/core";
import ArticleVertical from "../VerticalArticle";
import { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";

export default function RelateArticle({ post, relate_post, total_relate_posts }) {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState(Array.isArray(relate_post.data) ? relate_post.data : []);

    const { get } = useForm({
        post: post.data.slug,
        take: 10, // Adjust this if you want to load more posts at a time
        relate_post_page: page + 1,
    });

    const loadMorePosts = (e) => {
        e.preventDefault();
        setLoading(true);
        get(`/posts/${post.data.slug}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (response) => {
                setPosts((prev) => [
                    ...prev,
                    ...response.props.relate_post.data,
                ]);
                setPage((prev) => prev + 1);
                setLoading(false);
            },
            onError: () => {
                console.error("Error loading more posts");
                setLoading(false);
            },
        });
    };

    return (
        <Group>
            <Text fz="lg" fw={500}>
                Related Articles
            </Text>
            <Grid>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <Grid.Col key={index} span={{ base: 12, md: 6, lg: 6 }}>
                            <ArticleVertical post={post} />
                        </Grid.Col>
                    ))
                ) : (
                    <Text>No related articles available.</Text>
                )}
            </Grid>
            {total_relate_posts > 5 && (
                <Button onClick={loadMorePosts} disabled={loading}>
                    {loading ? "Loading..." : "Show more"}
                </Button>
            )}
        </Group>
    );
}
