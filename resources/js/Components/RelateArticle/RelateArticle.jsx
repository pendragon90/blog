import { Button, Grid, Group, Text } from "@mantine/core";
import ArticleVertical from "../VerticalArticle";
import { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";

export default function RelateArticle({ article, relate_article, total_relate_articles }) {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState(Array.isArray(relate_article.data) ? relate_article.data : []);

    const { get } = useForm({
        article: article.data.slug,
        take: 10, // Adjust this if you want to load more articles at a time
        relate_article_page: page + 1,
    });

    const loadMoreArticles = (e) => {
        e.preventDefault();
        setLoading(true);
        get(`/articles/${article.data.slug}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (response) => {
                setArticles((prev) => [
                    ...prev,
                    ...response.props.relate_article.data,
                ]);
                setPage((prev) => prev + 1);
                setLoading(false);
            },
            onError: () => {
                console.error("Error loading more articles");
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
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <Grid.Col key={index} span={{ base: 12, md: 6, lg: 6 }}>
                            <ArticleVertical article={article} />
                        </Grid.Col>
                    ))
                ) : (
                    <Text>No related articles available.</Text>
                )}
            </Grid>
            {total_relate_articles > 5 && (
                <Button onClick={loadMoreArticles} disabled={loading}>
                    {loading ? "Loading..." : "Show more"}
                </Button>
            )}
        </Group>
    );
}
