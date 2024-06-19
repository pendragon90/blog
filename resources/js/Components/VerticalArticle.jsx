import { Link } from "@inertiajs/inertia-react";
import { Badge, Card, Flex, Group, Image, Text } from "@mantine/core";

export default function ArticleVertical({ post }) {
    return (
        <Link href={`/posts/${post.slug}`}>
                <Card  padding="lg" radius="md" >
      <Card.Section>
        <Image
          src={post.img}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Flex direction="column" mt="sm" mb="xs">
        
        <Badge w="fit-content" variant="light">
        {post.category}
      </Badge>
      <Text lineClamp={1} fw={700} mt="xs">
        {post.title}
      </Text>
      </Flex>

      <Text size="sm" c="dimmed">
        {post.body}
      </Text>

    </Card>
        </Link>
    );
}
