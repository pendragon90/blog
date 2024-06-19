import React from "react";
import ArticlesLayout from "@/Layouts/ArticlesLayout";
import { usePage } from "@inertiajs/inertia-react";

function Home() {
    const { user, posts, total_posts } = usePage().props;

    return (
        <ArticlesLayout
            user={user}
            initialArticles={posts}
            total_posts={total_posts}
            url="/"
            title="Latest"
        />
    );
}

export default Home;
