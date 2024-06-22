import React from "react";
import { usePage } from "@inertiajs/inertia-react";
import {
    Badge,
    Button,
    Group,
    Image,
    Text,
    Title,
} from "@mantine/core";
import AppLayout from "@/Layouts/AppLayout";
import Comments from "@/Components/Comments/Comments";
import RelateArticle from "@/Components/RelateArticle/RelateArticle";
import UserInfo from "@/Components/UserInfo/UserInfo";
import { AddComment } from "@/Components/TextComment";

function ArticleDetailPage() {
    const { user, article,relate_article, comments,total_relate_articles, total_comments } = usePage().props;
console.log(article)
    return (
        <AppLayout user={user}>
            <Image radius="md" src={article.data.img} height={200} alt="ya" mt="md" />
            <Title order={1}>{article.data.title}</Title>
            <UserInfo />
            <section>
                <p>{article.data.body}</p>
            </section>
            <section>
                <Text fz="lg" fw={500} mb="md" mt="xl">
                    Total Comments ({total_comments})
                </Text>
                <AddComment article={article} />
                <Comments user={user} article={article} initialComments={comments} totalComments={total_comments} />
            </section>
            <RelateArticle article={article} relate_article={relate_article} total_relate_articles={total_relate_articles} />
        </AppLayout>
    );
}

export default ArticleDetailPage;
