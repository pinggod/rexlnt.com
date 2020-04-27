import React from 'react';
import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react'
import Styled from 'styled-components';
import * as MDX from '../components/mdx';
import Header from '../components/header';
import Footer from '../components/footer';
import 'react-medium-image-zoom/dist/styles.css';
import './_app.css';

const Layout = Styled.section`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Main = Styled.main`
    flex: 1 1 0;    
`;

const components = {
    wrapper: MDX.Wrapper,
    p: MDX.P,
    h1: MDX.H1,
    h2: MDX.H2,
    h3: MDX.H3,
    h4: MDX.H4,
    h5: MDX.H5,
    h6: MDX.H6,
    blockquote: MDX.Blockquote,
    ul: MDX.Ul,
    ol: MDX.Ol,
    li: MDX.Li,
    table: MDX.Table,
    tr: MDX.Tr,
    td: MDX.Td,
    th: MDX.Th,
    pre: MDX.Pre,
    inlineCode: MDX.InlineCode,
    em: MDX.Em,
    strong: MDX.Strong,
    hr: MDX.Hr,
    a: MDX.Link,
    img: MDX.Image,
    del: MDX.Delete,
}

const App = ({ Component, pageProps }: any): JSX.Element => {
    return (
        <>
            <Head>
                <title>Blog · Zeno Sun</title>
                <meta name="description" content="Zeno Sun's personal blog" />
                <link rel="shortcut icon" href="/favicon.jpg"></link>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css" />
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-137858782-1"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-137858782-1');`,
                }} />
            </Head>
            <Layout>
                <Header />
                <Main>
                    <MDXProvider components={components}>
                        <Component {...pageProps} />
                    </MDXProvider>
                </Main>
                <Footer />
            </Layout>
        </>
    );
};

export default App;
