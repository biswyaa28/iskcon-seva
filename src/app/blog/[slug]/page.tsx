import React from 'react';
import { BlogPostDetail } from '../../../components/BlogPostDetail';

export default function Page({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug || 'quantum-physics-and-the-observer-in-bhagavad-gita';
  return <BlogPostDetail slug={slug} />;
}
