import { Skeleton } from '@mantine/core';

export default function SkeletonArticle() {
    return (
      <>
        <Skeleton height={50} mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </>
    );
  }


