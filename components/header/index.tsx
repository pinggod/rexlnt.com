import React from 'react';
import Link from 'next/link';
import Styled from 'styled-components';

const Wrapper = Styled.header`
    padding: 48px 0;
    font-family: 'Dancing Script';
`;

const A = Styled.a`
    display: inline-block;
    color: #222;
    font-size: 24px;
    text-decoration: none;
`;

const SubTitle = Styled.p`
    color: #999;
`;

const Header = (): JSX.Element => (
    <Wrapper>
        <Link href='/' passHref>
            <A>Stop and Go</A>
        </Link>
        <SubTitle>coding, gaming, cooking, reading, cycling</SubTitle>
    </Wrapper>
);

export default Header;
