import React from 'react';
import Link from 'next/link';
import Styled from 'styled-components';
import { posts } from '../utils/posts';
import { formatDate } from '../utils/date';

const Post = Styled.a`
  display: flex;
  align-items: baseline;
  margin-bottom: 8px;
  color: black;
  text-decoration: none;
`;

const Title = Styled.h3`
  font-size: 16px;
  font-weight: normal;
`;

const Time = Styled.time`
  margin-left: 8px;
  color: gray;
`;

const Home = (): JSX.Element[] | null => {
  if (posts.length === 0) {
    return null;
  }

  return posts.map((post, index) => {
    return (
      <Link passHref key={index} href={post.meta.slug} >
        <Post>
          <Title>{post.meta.title}</Title>
          <Time>{formatDate(post.meta.date)}</Time>
        </Post>
      </Link>
    );
  });
};

export default Home;
