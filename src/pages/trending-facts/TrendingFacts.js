import React from 'react';
import { BlogPostCard } from '../../components/_dashboard/blog';
import './style.css';

const TrendingFacts = () => {
  // Define the data object
  const data = {
    title: 'Sample Blog Post',
    author: 'John Doe',
    createdAt: '2022-02-20T12:00:00Z'
  };

  return (
    <>
      <div className="blog-container">
        <BlogPostCard post={data} index="1" />
        <BlogPostCard post={data} index="2" />
        <BlogPostCard post={data} index="3" />
      </div>
    </>
  );
};

export default TrendingFacts;
