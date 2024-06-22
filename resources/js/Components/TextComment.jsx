import { useForm } from "@inertiajs/react";
import { Button, Menu, Modal, Textarea, rem } from "@mantine/core";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDelete, MdEdit } from "react-icons/md";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

export function AddComment({ article }) {
    const { post, setData } = useForm({
        article_id: article.data.id,
        comment: "",
    });
    const SubmitComment = (e) => {
        e.preventDefault();
        post(`/articles/${article.data.slug}/comments`, {
            onSuccess: () => {
                notifications.show({
                  title: `Add Comment Completed! 🎉`,
                  color: 'green'
                })
              }
        });
    };
    return (
        <form onSubmit={SubmitComment} className="flex flex-col gap-5 mb-5">
            <Textarea
                onChange={(e) => setData("comment", e.target.value)}
                label="Add Comment"
            />
            <Button
                type="submit"
                variant="filled"
                style={{ width: "max-content" }}
            >
                Send
            </Button>
        </form>
    );
}

export function EditComment({ article, comment, close }) {
    const { patch, data, setData } = useForm({
        article_id: article.data.id,
        comment: comment.comment,
    });
    const SubmitComment = (e) => {
        e.preventDefault();
        patch(`/articles/${article.data.slug}/comments/${comment.id}`, {
            onSuccess: () => {
                notifications.show({
                    title: `Edit Comment Completed! 🎉`,
                    color: 'green'
                });
                close();
            }
        });
    };
    return (
        <form onSubmit={SubmitComment}>
            <Textarea
                onChange={(e) => setData("comment", e.target.value)}
                defaultValue={data.comment}
            />
            <div className="flex gap-3 mt-3">
                <Button type="submit" color="green">
                    Update
                </Button>
                <Button onClick={close} color="red">
                    Cancel
                </Button>
            </div>
        </form>
    );
}

export function OptionsComment({ article, comment,open }) {
    const [
        deleteCommentOpened,
        { open: openDeleteComment, close: closeDeleteComment },
    ] = useDisclosure(false);
    const { delete: destroy, setData } = useForm({
        comment_id: null,
    });

    const handleDeleteComment = (e) => {
        e.preventDefault();
        destroy(`/articles/${article.data.slug}/comments/${comment.id}`, {
            onSuccess: () => {
                notifications.show({
                  title: `Delete Comment Completed! 🎉`,
                  color: 'green'
                })
              }
        });
    };
    return (
        <>
            <Modal
                opened={deleteCommentOpened}
                onClose={closeDeleteComment}
                title="Confirm delete"
            >
                <div className="flex gap-3">
                    <Button onClick={closeDeleteComment} color="yellow">
                        No
                    </Button>
                    <Button onClick={handleDeleteComment} color="red">
                        Yes
                    </Button>
                </div>
            </Modal>
            <Menu>
                <Menu.Target>
                    <Button variant="transparent">
                        <SlOptionsVertical className="h-4 text-black" />
                    </Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item
                        onClick={open}
                        color="yellow"
                        leftSection={
                            <MdEdit
                                style={{
                                    width: rem(14),
                                    height: rem(14),
                                }}
                            />
                        }
                    >
                        Edit
                    </Menu.Item>
                    <Menu.Item
                        onClick={openDeleteComment}
                        color="red"
                        leftSection={
                            <MdDelete
                                style={{
                                    width: rem(14),
                                    height: rem(14),
                                }}
                            />
                        }
                    >
                        Delete
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
}
export function AddReply({ article, comment }) {
    const { post, setData } = useForm({
        comment_id: comment.id,
        article_id: article.id,
        comment: "",
    });
    const SubmitComment = (e) => {
        e.preventDefault();
        post(`/articles/${article.data.slug}/comments/${comment.id}`);
    };
    return (
        <form onSubmit={SubmitComment} className="flex flex-col gap-5 mb-5">
            <Textarea
                onChange={(e) => setData("comment", e.target.value)}
                label="Add Reply"
            />
            <Button
                type="submit"
                variant="filled"
                style={{ width: "max-content" }}
            >
                Send
            </Button>
        </form>
    );
}

export function EditReply({ article, comment,reply, close }) {
    const { patch, data, setData } = useForm({
        article_id: article.data.id,
        comment: reply.comment,
    });
    const SubmitComment = (e) => {
        e.preventDefault();
        patch(`/articles/${article.data.slug}/comments/${comment.id}/replies/${reply.id}`, {
            onSuccess: () => {
                notifications.show({
                  title: `Edit Comment Completed! 🎉`,
                  color: 'green'
                })
              }
        });
    };
    console.log(comment);
    return (
        <form onSubmit={SubmitComment}>
            <Textarea
                onChange={(e) => setData("comment", e.target.value)}
                defaultValue={data.comment}
            />
            <div className="flex gap-3 mt-3">
                <Button type="submit" color="green">
                    Update
                </Button>
                <Button onClick={close} color="red">
                    Cancel
                </Button>
            </div>
        </form>
    );
}

export function OptionsReplyComment({ article, comment, reply,open }) {
    const [
        deleteCommentOpened,
        { open: openDeleteComment, close: closeDeleteComment },
    ] = useDisclosure(false);
    const { delete: destroy, setData } = useForm({
        comment_id: null,
    });

    const handleDeleteComment = (e) => {
        e.preventDefault();
        destroy(`/articles/${article.data.slug}/comments/${comment.id}/replies/${reply.id}`, {
            onSuccess: () => {
                notifications.show({
                  title: `Delete Comment Completed! 🎉`,
                  color: 'green'
                })
              }
        });
    };
    return (
        <>
            <Modal
                opened={deleteCommentOpened}
                onClose={closeDeleteComment}
                title="Confirm delete"
            >
                <div className="flex gap-3">
                    <Button onClick={closeDeleteComment} color="yellow">
                        No
                    </Button>
                    <Button onClick={handleDeleteComment} color="red">
                        Yes
                    </Button>
                </div>
            </Modal>
            <Menu>
                <Menu.Target>
                    <Button variant="transparent">
                        <SlOptionsVertical className="h-4 text-black" />
                    </Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item
                        onClick={open}
                        color="yellow"
                        leftSection={
                            <MdEdit
                                style={{
                                    width: rem(14),
                                    height: rem(14),
                                }}
                            />
                        }
                    >
                        Edit
                    </Menu.Item>
                    <Menu.Item
                        onClick={openDeleteComment}
                        color="red"
                        leftSection={
                            <MdDelete
                                style={{
                                    width: rem(14),
                                    height: rem(14),
                                }}
                            />
                        }
                    >
                        Delete
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
}