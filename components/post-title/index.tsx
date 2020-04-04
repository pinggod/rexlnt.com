import React from 'react';
import Head from 'next/head';
import Styled from 'styled-components';
import { Post } from '../../utils/posts';
import { formatDate } from '../../utils/date';

const Wrapper = Styled.div`
    margin-bottom: 32px;
`;

const Title = Styled.h1`
    font-size: 24px;
    font-weight: normal;
`;

const Time = Styled.time`
    color: gray;
`;

const PostTitle = (props: Post): JSX.Element => (
    <Wrapper>
        <Head>
            <title>{props.meta.title}{` · Zeno Sun's Blog`}</title>
        </Head>
        <Title>{props.meta.title}</Title>
        <Time>{formatDate(props.meta.date)}</Time>
    </Wrapper>
);

export default PostTitle;
