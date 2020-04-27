import React from 'react';
import Styled from 'styled-components';

const Wrapper = Styled.footer`
    padding: 48px 0;
    color: black;
    background-color: #FAFAFA;
    text-align: center;
    
    a {
        margin: 0 3px;
        color: black;
    }
`;

const Footer = (): JSX.Element => (
    <Wrapper>
        ©
        { new Date().getFullYear()}
        <a href="https://github.com/pinggod" target="_blank" rel="noopener noreferrer">Zeno Sun</a>
        , powered by
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js</a>
        and many other excellent projects.
    </Wrapper>
);

export default Footer;
