import React from "react";
import ArticlesLayout from "@/Layouts/ArticlesLayout";
import { usePage } from "@inertiajs/inertia-react";

function Home() {
    const { user, articles, total_articles } = usePage().props;
    return (
        <ArticlesLayout
            user={user}
            initialArticles={articles}
            total_articles={total_articles}
            url="/"
            title="Latest"
        />
    );
}

export default Home;
