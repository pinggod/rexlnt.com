import React from 'react';
import { MDXProvider } from '@mdx-js/react'
import Styled, { createGlobalStyle } from 'styled-components';
import { Helmet as Head, HelmetProvider } from 'react-helmet-async';
import * as MDX from '../components/mdx';
import Header from '../components/header';
import Footer from '../components/footer';
import 'react-medium-image-zoom/dist/styles.css';

const GlobalStyle = createGlobalStyle`
    ::selection {
        color: #FFFFFF;
        background-color: rgb(15, 122, 216);
    }

    html, body {
        width: 100%;
        height: 100%;
        font-size: 16px;
        line-height: 1.6;
        font-family: 'Source Sans Pro', Arial, sans-serif;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    html, body,
    h1, h2, h3, h4, h5, h6,
    ul, p {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: underline;
    }

    button:focus, button:active {
        outline: none;
    }
`;

const Layout = Styled.section`
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 0 auto;

    @media screen and (max-width: 848px) {
        margin: 0 24px;
    }
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
    // code: MDX.Code,
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
        <HelmetProvider>
            <Head>
                <title>Blog · Zeno Sun</title>
                <meta name="description" content="Zeno Sun's personal blog" />
                <link rel="shortcut icon" href="/favicon.jpg"></link>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css" />
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-137858782-1"></script>
                <script>
                    {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-137858782-1');`}
                </script>
            </Head>
            <GlobalStyle />
            <Layout>
                <Header />
                <MDXProvider components={components}>
                    <Component {...pageProps} />
                </MDXProvider>
                <Footer />
            </Layout>
        </HelmetProvider>
    );
};

export default App;
