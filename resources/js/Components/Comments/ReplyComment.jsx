import React, { useState } from "react";
import { Avatar, Group, Paper, Text, Grid, Textarea } from "@mantine/core";
import { OptionsReplyComment, EditReply } from "../TextComment";

const ReplyComment = ({ user,isExpanded, article, comment, replies }) => {
  const [editOpened, setEditOpened] = useState(false);
  const handleEditToggle = (commentId) => {
    setEditOpened((prev) => ({
        ...prev,
        [commentId]: !prev[commentId],
    }));
};

    return (
        <>
            <Grid mt="md">
                {replies &&
                    replies.map((reply) => (
                        <Grid.Col key={reply.id} span={{ base: 12 }}>
                            <Paper
                                withBorder
                                radius="md"
                                style={{
                                    display: isExpanded ? "block" : "none",
                                }}
                                className='ml-10 p-5'
                            >
                                <div className="flex justify-between">
                                    <div className="flex gap-3">
                                        <Avatar
                                            src={reply.author.avatar}
                                            alt={reply.author.name}
                                            radius="xl"
                                        />
                                        <div>
                                            <Text fz="sm">
                                                {reply.author.name}
                                            </Text>
                                            <Text fz="xs" c="dimmed">
                                                12
                                            </Text>
                                        </div>
                                    </div>
                                    {user && user.data.slug === reply.author.slug && (
                                    <OptionsReplyComment
                                        article={article}
                                        comment={comment}
                                        reply={reply}
                                        open={()=>handleEditToggle(reply.id)}
                                    />
                                    )} 
                                </div>
                                {editOpened[reply.id] ? (
<EditReply article={article} comment={comment} reply={reply} close={() => handleEditToggle(reply.id)} />
                                ) : (
                                <Text pl={54} pt="sm" size="sm">
                                    {reply.comment}
                                </Text>
                                )}
                            </Paper>
                        </Grid.Col>
                    ))}
            </Grid>
        </>
    );
};

export default ReplyComment;
