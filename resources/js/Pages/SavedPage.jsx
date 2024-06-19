import React from "react";
import ArticlesLayout from "@/Layouts/ArticlesLayout";
import { usePage } from "@inertiajs/inertia-react";

function SavedPage() {
    const { user, posts, total_posts } = usePage().props;

    return (
        <ArticlesLayout
            user={user}
            initialArticles={posts}
            total_posts={total_posts}
            url="/posts-saved"
            title="Saved"
        />
    );
}

export default SavedPage;
