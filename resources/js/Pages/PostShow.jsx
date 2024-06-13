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

function PostShow() {
    const { user, post,relate_post, comments,total_relate_posts, total_comments } = usePage().props;

    return (
        <AppLayout user={user}>
            <Image radius="md" src={post.data.img} height={200} alt="ya" mt="md" />
            <Title order={1}>{post.data.title}</Title>
            <UserInfo />
            <Group mb="xl" mt="md">
                {post.data.tags.map((tag, index) => (
                    <Badge key={index} size="lg" color="lime.4">
                        {tag}
                    </Badge>
                ))}
            </Group>
            <section>
                <p>{post.data.body}</p>
            </section>
            <section>
                <Text fz="lg" fw={500} mb="md" mt="xl">
                    Total Comments ({total_comments})
                </Text>
                <AddComment post={post} />
                <Comments user={user} post={post} initialComments={comments} totalComments={total_comments} />
            </section>
            <RelateArticle post={post} relate_post={relate_post} total_relate_posts={total_relate_posts} />
        </AppLayout>
    );
}

export default PostShow;
