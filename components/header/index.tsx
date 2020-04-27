import React from 'react';
import Link from 'next/link';
import Styled from 'styled-components';

const Wrapper = Styled.header`
    padding: 48px 0;
    font-family: 'Lobster';
    color: black;
    background-color: #FAFAFA;
`;

const CenterWrapper = Styled.section`
    max-width: 800px;
    margin: 0 auto;
`;

const A = Styled.a`
    display: block;
    color: black;
    font-size: 36px;
    font-weight: 900;
    text-decoration: none;
`;

const Header = (): JSX.Element => (
    <Wrapper>
        <CenterWrapper>
            <Link href='/' passHref>
                <A>Stop and Go</A>
            </Link>
            <p>coding, gaming, cooking, reading, cycling</p>
        </CenterWrapper>
    </Wrapper>
);

export default Header;
