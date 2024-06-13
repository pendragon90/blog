import { Link } from '@inertiajs/inertia-react';
import { Card, Image, Text } from '@mantine/core';

export default function ArticleVertical({ post }) {
  // Check if post is defined and has the necessary properties
  if (!post || !post.slug || !post.img || !post.title) {
    return null; // or render some placeholder or error message
  }

  return (
    <Link href={`/posts/${post.slug}`}>
    <Card
    withBorder
      padding="lg"
      component="a"
      
    >
      <Card.Section>
        <Image
          src={post.img}
          alt={post.title}
        />
      </Card.Section>

      <Text fw={500} size="md" mt="md">
        {post.title}
      </Text>
    </Card>
    </Link>
  );
}
