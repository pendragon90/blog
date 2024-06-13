import {
    Button,
    Grid,
    Text,
    Avatar,
    Paper,
} from "@mantine/core";
import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import ReplyComment from "./ReplyComment";
import { BsChat } from "react-icons/bs";
import { AddReply, OptionsComment, EditComment } from "../TextComment";
import { useForm } from "@inertiajs/inertia-react";

const Comments = ({ user, post, initialComments, totalComments }) => {
    const [comments, setComments] = useState(initialComments.data);
    const [expandedComments, setExpandedComments] = useState({});
    const [editOpened, setEditOpened] = useState({});
    const [replyOpened, setReplyOpened] = useState({});
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const handleToggleComments = (commentId) => {
        setExpandedComments((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const handleToggleReply = (commentId) => {
        setReplyOpened((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const handleEditToggle = (commentId) => {
        setEditOpened((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const { get } = useForm({
        post: post.data.slug,
        take: 10, // Adjust this if you want to load more comments at a time
        comment_page: page + 1,
    });

    const loadMoreComments = (e) => {
        e.preventDefault();
        setLoading(true);
        get(`/posts/${post.data.slug}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (response) => {
                setComments((prev) => [
                    ...prev,
                    ...response.props.comments.data,
                ]);
                setPage((prev) => prev + 1);
                setLoading(false);
            },
            onError: () => {
                console.error("Error loading more comments");
                setLoading(false);
            },
        });
    };

    return (
        <div className="mb-10">
            <Grid mb="md">
                {comments.map((comment) => (
                    <Grid.Col key={comment.id} span={12}>
                        <Paper withBorder radius="md" className="p-5">
                            <div className="flex justify-between">
                                <div className="flex gap-3">
                                    <Avatar
                                        src={comment.author.avatar}
                                        alt={comment.author.name}
                                        radius="xl"
                                    />
                                    <div>
                                        <Text fz="sm">
                                            {comment.author.name}
                                        </Text>
                                        <Text fz="xs" c="dimmed">
                                            {comment.created_at}
                                        </Text>
                                    </div>
                                </div>
                                {user &&
                                    user.data.slug === comment.author.slug && (
                                        <OptionsComment
                                            post={post}
                                            comment={comment}
                                            open={() =>
                                                handleEditToggle(comment.id)
                                            }
                                        />
                                    )}
                            </div>
                            <div className="mt-3">
                                {editOpened[comment.id] ? (
                                    <EditComment
                                        post={post}
                                        comment={comment}
                                        close={() =>
                                            handleEditToggle(comment.id)
                                        }
                                    />
                                ) : (
                                    <>
                                        <p>{comment.comment}</p>
                                        <div className="mt-3 flex gap-5 justify-start">
                                            <div
                                                onClick={() =>
                                                    handleToggleComments(
                                                        comment.id,
                                                    )
                                                }
                                                className="flex gap-2 items-center cursor-pointer"
                                            >
                                                <BsChat className="h-4" />
                                                <span>
                                                    {comment.total_replies}
                                                </span>
                                            </div>
                                            <span
                                                onClick={() =>
                                                    handleToggleReply(
                                                        comment.id,
                                                    )
                                                }
                                                className="cursor-pointer"
                                            >
                                                Reply
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Paper>
                        {replyOpened[comment.id] && (
                            <AddReply post={post} comment={comment} />
                        )}
                        <ReplyComment
                            user={user}
                            isExpanded={expandedComments[comment.id]}
                            replies={comment.replies}
                            post={post}
                            comment={comment}
                        />
                    </Grid.Col>
                ))}
            </Grid>
            {totalComments > 10 && (
                <Button onClick={loadMoreComments} disabled={loading}>
                    {loading ? "Loading..." : "Show more"}
                </Button>
            )}
        </div>
    );
};

export default Comments;
