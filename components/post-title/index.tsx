import React from 'react';
import Styled from 'styled-components';
import { Helmet as Head } from 'react-helmet-async';
import { Post } from '../../utils/posts';

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
        <Time>{new Date(props.meta.date).toLocaleDateString()}</Time>
    </Wrapper>
);

export default PostTitle;
