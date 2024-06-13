import Articles from "@/Components/Articles/Articles";
import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/inertia-react";
import { Container } from "@mantine/core";
import React from "react";

function Home() {
    const { user, post, total_posts } = usePage().props;
    return (
        <AppLayout user={user}>
            <Container size="responsive" className="flex gap-5">
                <Articles initialArticles={post} totalPosts={total_posts} />
            </Container>
        </AppLayout>
    );
}

export default Home;
