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
import { IconHeart, IconBookmark } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link, useForm } from "@inertiajs/inertia-react";
import classes from './Article.module.css';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';

const Article = ({ post }) => {
  const theme = useMantineTheme();

  // Initialize state for likes
  const [likesCount, setLikesCount] = useState(post.total_likes);
  const [isLiked, setIsLiked] = useState(post.user_has_liked);

  const { post: postData } = useForm();

  const handleLike = (e) => {
    e.preventDefault();
    postData(`/posts/${post.slug}/like`, {
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

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }}>
        <Card.Section mb="sm">
          <Image
            src={post.img}
            alt={post.title}
            height={180}
          />
        </Card.Section>
      </Link>
      
      <Badge w="fit-content" variant="light">
        decorations
      </Badge>

      <Text lineClamp={1} fw={700} className={classes.title} mt="xs">
        {post.title}
      </Text>

      <div>
        <Text fz="xs" c="dimmed">
          posted {post.date} ago
        </Text>
      </div>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            {likesCount} people liked this
          </Text>
          <Group gap={0}>
            <button onClick={handleLike}>
              {isLiked ? (
                <IoMdHeart className='text-red-600 h-5' />
              ) : (
                <IoIosHeartEmpty className='text-red-600 h-5'/>
              )}
            </button>
            <ActionIcon variant="subtle" color="gray">
              <IconBookmark
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.yellow[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default Article;
