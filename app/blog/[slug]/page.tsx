import React from 'react';
import { BlogPostDetail } from '../../../src/components/BlogPostDetail';

export default function Page({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug || 'quantum-physics-and-the-observer-in-bhagavad-gita';
  return <BlogPostDetail slug={slug} />;
}
