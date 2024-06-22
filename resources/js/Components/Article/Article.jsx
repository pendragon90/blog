import {
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  useMantineTheme,
  rem,
} from '@mantine/core';
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import React, { useState } from 'react';
import { Link, useForm } from "@inertiajs/inertia-react";
import classes from './Article.module.css';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';

const Article = ({ article }) => {
  const theme = useMantineTheme();

  // Initialize state for likes and saves
  const [likesCount, setLikesCount] = useState(article.total_likes);
  const [isLiked, setIsLiked] = useState(article.user_has_liked);
  const [isSaved, setIsSaved] = useState(article.user_has_saved);

  const { post } = useForm();

  const handleLike = (e) => {
    e.preventDefault();
    post(`/articles/${article.slug}/like`, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (response) => {
        // Toggle the like state
        setIsLiked(!isLiked);
        // Update the likes count
        setLikesCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
      },
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    articleData(`/articles/${article.slug}/save`, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (response) => {
        // Toggle the save state
        setIsSaved(!isSaved);
      },
    });
  };

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Link href={`/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
        <Card.Section mb="sm">
          <Image
            src={article.img}
            alt={article.title}
            height={180}
          />
        </Card.Section>
      </Link>
      
      <Badge w="fit-content" variant="light">
        {article.category}
      </Badge>

      <Text lineClamp={1} fw={700} className={classes.title} mt="xs">
        {article.title}
      </Text>

      <div>
        <Text fz="xs" c="dimmed">
          articleed {article.date} ago
        </Text>
      </div>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            {likesCount} people liked this
          </Text>
          <Group gap={0}>
            <ActionIcon variant="subtle" color="gray" onClick={handleLike}>
              {isLiked ? (
                <IoMdHeart className='text-red-600 h-5' />
              ) : (
                <IoIosHeartEmpty className='text-red-600 h-5'/>
              )}
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray" onClick={handleSave}>
              {isSaved ? (
                <IoBookmark className='text-yellow-600 h-5' />
              ) : (
                <IoBookmarkOutline className='text-yellow-600 h-5' />
              )}
            </ActionIcon>
          </Group>
        </Group>
        <Text fz="xs" c="dimmed" mt="xs">
          {article.views} views
        </Text>
      </Card.Section>
    </Card>
  );
}

export default Article;
