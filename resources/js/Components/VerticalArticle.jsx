import { Link } from "@inertiajs/inertia-react";
import { Badge, Card, Flex, Group, Image, Text } from "@mantine/core";

export default function ArticleVertical({ article }) {
    return (
        <Link href={`/articles/${article.slug}`}>
                <Card  padding="lg" radius="md" >
      <Card.Section>
        <Image
          src={article.img}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Flex direction="column" mt="sm" mb="xs">
        
        <Badge w="fit-content" variant="light">
        {article.category}
      </Badge>
      <Text lineClamp={1} fw={700} mt="xs">
        {article.title}
      </Text>
      </Flex>

      <Text size="sm" c="dimmed">
        {article.body}
      </Text>

    </Card>
        </Link>
    );
}
