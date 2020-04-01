import React from 'react';
// import Link from 'next/link';
import Styled from 'styled-components';

const Wrapper = Styled.footer`
    margin: 48px 0;
    color: gray;

    a {
        color: gray;
    }
`;

const Footer = (): JSX.Element => (
    <Wrapper>
        ©
        { new Date().getFullYear()}
        &nbsp;
        <a href="https://github.com/pinggod" target="_blank" rel="noopener noreferrer">Zeno Sun</a>
        , powered by
        &nbsp;
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js</a>
        &nbsp;
        and many other excellent projects.
    </Wrapper>
);

export default Footer;
