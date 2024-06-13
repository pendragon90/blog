import React from "react";
import ArticleVertical from "./VerticalArticle";
import { Grid, Group } from "@mantine/core";

function PopularArticles() {
    return (
        <>
            <h1 className="text-lg font-bold mt-5 mb-3">Popular Article</h1>

            <Grid>
                <Grid.Col span={12}>
                    <ArticleVertical />
                </Grid.Col>
                <Grid.Col span={12}>
                    <ArticleVertical />
                </Grid.Col>
            </Grid>
        </>
    );
}

export default PopularArticles;
