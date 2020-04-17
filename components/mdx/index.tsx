import React from 'react';
import Styled from "styled-components";
import ImageWithZoom from "react-medium-image-zoom";
import PostTitle from '../post-title';
import { Post } from '../../utils/posts';

const Main = Styled.main`
    overflow: hidden;

    .katex {
        color: #1a4876;
        margin: 0 8px;
        font-family: Times New Roman, serif;
    }
`;

export const Wrapper = (props: Post): JSX.Element => {
    return (
        <Main>
            {props.meta && <PostTitle meta={props.meta} />}
            {props.children}
        </Main>
    );
};

export const Pre = Styled.pre`
    position: relative;
    margin: 16px 0;
    padding: 4px 16px;
    border-radius: 4px;
    border: 1px solid #eee;
    overflow-x: scroll;
    tab-size: 4;
    hyphens: none;

    code {
        font-size: 12px;
        font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;
        background: none;
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
        color: #6a737d;
    }
    .token.punctuation {
        color: #24292e;
    }
    .token.namespace {
        opacity: 1;
    }
    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.deleted {
        color: #e36209;
    }
    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.url,
    .token.inserted {
        color: #005cc5;
    }
    .token.atrule,
    .token.attr-value,
    .token.keyword {
        color: #d73a49;
    }
    .token.entity {
        color: #657b83;
    }
    .token.function,
    .token.class-name {
        color: #6f42c1;
    }
    .token.regex,
    .token.important,
    .token.variable {
        color: rgb(225, 109, 117);
    }
    .token.operator {
        color: #e36209;
    }
    .token.important,
    .token.bold {
        font-weight: bold;
    }
    .token.italic {
        font-style: italic;
    }
    .token.entity {
        cursor: help;
    }
`;

export const InlineCode = Styled.code`
    margin: 0 4px;
    padding: 2px 8px;
    border-radius: 4px;
    background: rgb(255, 255, 221);
`;

export const Link = Styled.a.attrs({
    target: '_blank',
    rel: 'noopener noreferrer'
})`
    color: rgb(153, 51, 51);
`;

export const Image = (props: any): JSX.Element => (
    <ImageWithZoom zoomMargin={40} >
        <img {...props} style={{ width: '100%' }} />
    </ImageWithZoom>
);

export const P = Styled.div`
    margin-bottom: 16px;
    word-break: break-word;
    hyphens: auto;
`;

export const H1 = Styled.h1`
    font-size: 22px;
    font-weight: bold;
`;

export const H2 = Styled.h2`
    font-size: 22px;
    font-weight: bold;
`;

export const H3 = Styled.h3`
    font-size: 22px;
    font-weight: bold;
`;

export const H4 = Styled.h4`
    font-size: 18px;
    font-weight: bold;
`;

export const H5 = Styled.h5`
    font-size: 18px;
    font-weight: bold;
`;

export const H6 = Styled.h6`
    font-size: 18px;
    font-weight: bold;
`;

export const Blockquote = Styled.div`
    font-family: Zhuyin Kaiti, Han Kaiti, Kai, KaiTi, KaiTi SC, STKaiti, serif;

    p {
        margin: 0;
    }
`;

export const Ul = Styled.ul`
    margin: 8px 0 8px 32px;
`;

export const Ol = Styled.ol`
    margin: 8px 0;
`;

export const Li = Styled.li`
    font-weight: 400;
`;

export const Table = Styled.table`
    width: 100%;
    border-spacing: 0px;
    margin: 16px 0px;
`;

export const Tr = Styled.tr`
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
`;

export const Th = Styled.th`
    padding: 4px 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    font-weight: 600;
    text-align: left;
`;

export const Td = Styled.td`
    padding: 4px 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    font-weight: 400;
    text-align: left;
`;

export const Em = Styled.em`
    font-style: italic;
`;

export const Strong = Styled.strong`
    font-weight: bold;
`;

export const Delete = Styled.del`
    color: black;
`;

export const Hr = Styled.hr`
    margin: 48px 0;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
